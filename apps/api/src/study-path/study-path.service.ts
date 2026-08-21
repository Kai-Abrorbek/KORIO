import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LessonsService } from '../lessons/lessons.service';
import { WordsService } from '../words/words.service';
import { Grammar, GrammarDocument } from '../grammer/schemas/grammar.schema';
import { LessonNode, LessonNodeDocument } from '../lessons/schemas/node.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  STUDY_COMPLETABLE_KINDS,
  StudyCompletableKind,
  StudyDay,
  StudyNode,
  StudyNodeStatus,
  StudyPathResponse,
  studyNodeKey,
} from './study-path.types';

/** 그 유닛 단어 요약 (WordsService.getSectionSummary 의 units 원소) */
interface UnitWordSummary {
  unit: number;
  words: number;
  new: number;
}

@Injectable()
export class StudyPathService {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly wordsService: WordsService,
    @InjectModel(Grammar.name)
    private readonly grammarModel: Model<GrammarDocument>,
    @InjectModel(LessonNode.name)
    private readonly nodeModel: Model<LessonNodeDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * 하루 = 한 유닛. 노출 범위는 기존 로드맵과 같게 현재 섹션만 준다
   * (다음 섹션까지 보이면 "다음 섹션 잠김" 안내와 모순된다).
   *
   * 노드는 항상 같은 여섯 자리다. 다만 다룰 것이 없는 노드는 만들지 않는다 —
   * 문법 시드가 아직 없는 유닛에 빈 문법 노드를 세워두면 하루가 거기서 막힌다.
   */
  async getStudyPath(userId: string, lang = 'uz'): Promise<StudyPathResponse> {
    const roadmap: any = await this.lessonsService.getRoadmap(userId, lang);
    const units: any[] = roadmap.units ?? [];
    const section: number = roadmap.currentSection ?? 1;

    const [me, grammarRows, wordSummary, questionCounts, unitsBefore] =
      await Promise.all([
        this.userModel
          .findById(userId)
          .select('completedGrammar completedStudyNodes')
          .lean(),
        this.grammarModel
          .find({ isActive: true, section })
          .select('code unit')
          .lean(),
        this.safeWordSummary(userId, section),
        this.lessonsService.countSectionQuestions(section),
        this.countUnitsBeforeSection(section),
      ]);

    const doneGrammar = new Set<string>(me?.completedGrammar ?? []);
    const doneNodes = new Set<string>(me?.completedStudyNodes ?? []);

    const grammarByUnit = new Map<number, string[]>();
    for (const row of grammarRows as any[]) {
      const unit = row.unit ?? 1;
      const list = grammarByUnit.get(unit) ?? [];
      list.push(row.code);
      grammarByUnit.set(unit, list);
    }

    const wordsByUnit = new Map<number, UnitWordSummary>(
      (wordSummary?.units ?? []).map((u: UnitWordSummary) => [u.unit, u]),
    );

    const days: StudyDay[] = units.map((unit, index) => ({
      id: `day-${section}-${unit.unitNumber}`,
      dayNumber: unitsBefore + index + 1,
      section,
      unit: unit.unitNumber,
      title: unit.title ?? '',
      status: 'locked' as StudyNodeStatus,
      nodes: this.buildNodes({
        section,
        unit: unit.unitNumber,
        isFirstOfSection: index === 0,
        doneGrammar,
        doneNodes,
        grammarCodes: grammarByUnit.get(unit.unitNumber) ?? [],
        words: wordsByUnit.get(unit.unitNumber),
        vocabQuestions:
          questionCounts.get(`${unit.unitNumber}:vocabulary`) ?? 0,
        grammarQuestions: questionCounts.get(`${unit.unitNumber}:grammar`) ?? 0,
      }),
    }));

    const currentDayIndex = this.applyStatuses(days);

    return {
      currentSection: section,
      currentDayIndex,
      days,
      nextSection: roadmap.nextSection ?? null,
    };
  }

  /** 문제를 푸는 노드(복습·어휘·문법·마무리)의 완료 기록 */
  async completeNode(
    userId: string,
    section: number,
    unit: number,
    kind: StudyCompletableKind,
  ) {
    const key = studyNodeKey(section, unit, kind);
    await this.userModel.updateOne(
      { _id: userId },
      { $addToSet: { completedStudyNodes: key } },
    );
    return { success: true, key };
  }

  // ─────────────────────────────────────────────────────────

  /**
   * 학원 수업 순서 그대로:
   * 지난 수업 복습 → 단어 → 문법 → 어휘 문제 → 문법 문제 → 마무리
   */
  private buildNodes(ctx: {
    section: number;
    unit: number;
    isFirstOfSection: boolean;
    doneGrammar: Set<string>;
    doneNodes: Set<string>;
    grammarCodes: string[];
    words?: UnitWordSummary;
    vocabQuestions: number;
    grammarQuestions: number;
  }): StudyNode[] {
    const nodes: StudyNode[] = [];
    const quizDone = (kind: StudyCompletableKind) =>
      ctx.doneNodes.has(studyNodeKey(ctx.section, ctx.unit, kind));

    const add = (
      kind: StudyNode['kind'],
      count: number,
      done: boolean,
    ): void => {
      if (count <= 0) return; // 다룰 게 없는 노드는 세우지 않는다
      nodes.push({ id: kind, kind, status: 'locked', done, count });
    };

    // 1. 지난 수업 복습 — 섹션 첫날은 되돌아볼 것이 없다
    if (!ctx.isFirstOfSection) {
      add('review', 1, quizDone('review'));
    }

    // 2. 오늘 단어 — 한 번이라도 본 단어는 new 를 벗어난다
    const wordCount = ctx.words?.words ?? 0;
    add('words', wordCount, wordCount > 0 && (ctx.words?.new ?? 0) === 0);

    // 3. 오늘 문법
    add(
      'grammar',
      ctx.grammarCodes.length,
      ctx.grammarCodes.length > 0 &&
        ctx.grammarCodes.every((code) => ctx.doneGrammar.has(code)),
    );

    // 4·5. 오늘 문제 — 시드가 없는 트랙은 노드도 없다
    add('vocabQuiz', ctx.vocabQuestions, quizDone('vocabQuiz'));
    add('grammarQuiz', ctx.grammarQuestions, quizDone('grammarQuiz'));

    // 6. 마무리 — 풀 문제가 하나라도 있어야 의미가 있다
    add('final', ctx.vocabQuestions + ctx.grammarQuestions, quizDone('final'));

    return nodes;
  }

  /**
   * 앞에서부터 채워 나가는 모드라 상태는 한 번에 훑어 정한다.
   * 첫 "덜 끝난 날"이 오늘이고 그 뒤는 잠긴다. 오늘 안에서도 같은 규칙.
   *
   * 레슨을 앞서 진행한 유저는 그날 것들이 이미 끝나 있어 금방 넘어간다 —
   * 진행도를 되돌리는 게 아니라 빠진 것만 메운다.
   */
  private applyStatuses(days: StudyDay[]): number {
    let foundCurrent = false;
    let currentIndex = 0;

    days.forEach((day, index) => {
      const allDone =
        day.nodes.length > 0 && day.nodes.every((node) => node.done);

      // 다 끝낸 날은 언제나 완료로 보인다. 뒤쪽 날을 이미 끝냈을 수 있는데
      // 그걸 잠긴 것처럼 보여줄 이유는 없다.
      if (allDone) {
        day.status = 'completed';
        day.nodes.forEach((node) => (node.status = 'completed'));
        return;
      }

      if (!foundCurrent) {
        foundCurrent = true;
        currentIndex = index;
        day.status = 'current';

        let foundCurrentNode = false;
        for (const node of day.nodes) {
          if (node.done) {
            node.status = 'completed';
          } else if (!foundCurrentNode) {
            node.status = 'current';
            foundCurrentNode = true;
          }
        }
        return;
      }

      day.status = 'locked';
      day.nodes.forEach((node) => {
        if (node.done) node.status = 'completed';
      });
    });

    // 전부 끝냈으면 마지막 날에 머문다
    if (!foundCurrent) currentIndex = Math.max(0, days.length - 1);
    return currentIndex;
  }

  /** 통산 일차용. 이전 섹션들의 유닛 개수를 센다 */
  private async countUnitsBeforeSection(section: number): Promise<number> {
    if (section <= 1) return 0;
    const rows = await this.nodeModel
      .find({ isActive: true, section: { $lt: section } })
      .select('section unit')
      .lean();
    const keys = new Set(rows.map((r: any) => `${r.section}-${r.unit}`));
    return keys.size;
  }

  /** 단어 시드가 없는 섹션이면 단어 노드 없이 나머지만 보여준다 */
  private async safeWordSummary(userId: string, section: number) {
    try {
      return (await this.wordsService.getSectionSummary(userId, section)) as {
        units: UnitWordSummary[];
      };
    } catch {
      return { units: [] as UnitWordSummary[] };
    }
  }
}
