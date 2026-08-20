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
   * 레슨 노드의 진행도·상태는 getRoadmap 이 이미 계산하므로 다시 만들지 않는다.
   * 여기서는 그 위에 문법 · 단어 · 실전 · 복습 · 마무리를 얹기만 한다.
   */
  async getStudyPath(userId: string, lang = 'uz'): Promise<StudyPathResponse> {
    const roadmap: any = await this.lessonsService.getRoadmap(userId, lang);
    const units: any[] = roadmap.units ?? [];
    const section: number = roadmap.currentSection ?? 1;

    const [me, grammarRows, wordSummary, unitsBefore] = await Promise.all([
      this.userModel
        .findById(userId)
        .select('completedGrammar completedStudyNodes')
        .lean(),
      this.grammarModel
        .find({ isActive: true, section })
        .select('code unit')
        .lean(),
      this.safeWordSummary(userId, section),
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

    const days: StudyDay[] = units.map((unit, index) => {
      const nodes = this.buildNodes(unit, {
        section,
        doneGrammar,
        doneNodes,
        grammarCodes: grammarByUnit.get(unit.unitNumber) ?? [],
        words: wordsByUnit.get(unit.unitNumber),
      });

      return {
        id: `day-${section}-${unit.unitNumber}`,
        dayNumber: unitsBefore + index + 1,
        section,
        unit: unit.unitNumber,
        title: unit.title ?? '',
        status: 'locked' as StudyNodeStatus,
        nodes,
      };
    });

    const currentDayIndex = this.applyStatuses(days);

    return {
      currentSection: section,
      currentDayIndex,
      days,
      nextSection: roadmap.nextSection ?? null,
    };
  }

  /** 실전 · 복습 · 마무리 노드 완료 기록. 보상은 각 화면이 이미 준다 */
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

  private buildNodes(
    unit: any,
    ctx: {
      section: number;
      doneGrammar: Set<string>;
      doneNodes: Set<string>;
      grammarCodes: string[];
      words?: UnitWordSummary;
    },
  ): StudyNode[] {
    const nodes: StudyNode[] = [];
    const draft = (node: Omit<StudyNode, 'status'>): StudyNode => ({
      ...node,
      status: 'locked',
    });

    // 1. 문법 — 오늘 배울 규칙. 시드가 아직 없는 유닛이면 통째로 뺀다
    if (ctx.grammarCodes.length) {
      const done = ctx.grammarCodes.filter((code) =>
        ctx.doneGrammar.has(code),
      ).length;
      nodes.push(
        draft({
          id: 'grammar',
          kind: 'grammar',
          completed: done,
          total: ctx.grammarCodes.length,
        }),
      );
    }

    // 2. 단어 — 한 번이라도 본 단어는 new 를 벗어난다
    if (ctx.words && ctx.words.words > 0) {
      nodes.push(
        draft({
          id: 'words',
          kind: 'words',
          completed: ctx.words.words - ctx.words.new,
          total: ctx.words.words,
        }),
      );
    }

    // 3. 레슨 — 기존 로드맵 노드를 순서 그대로
    for (const node of unit.nodes ?? []) {
      if (node.type === 'chest' || node.type === 'score') continue;
      nodes.push(
        draft({
          id: `lesson:${node.id}`,
          kind: 'lesson',
          completed: node.completedLessons ?? 0,
          total: node.totalLessons ?? 1,
          title: node.title,
          lessonId: node.lessonId,
          nodeId: node.id,
          xpReward: node.xpReward,
          legendCompleted: node.legendCompleted,
          ...(node.type === 'hangul' ? { special: 'hangul' as const } : {}),
        }),
      );
    }

    // 4~6. 실전 · 복습 · 마무리 — 유저 문서의 완료 키로만 판단한다
    for (const kind of STUDY_COMPLETABLE_KINDS) {
      const done = ctx.doneNodes.has(
        studyNodeKey(ctx.section, unit.unitNumber, kind),
      );
      nodes.push(
        draft({
          id: kind,
          kind,
          completed: done ? 1 : 0,
          total: 1,
        }),
      );
    }

    return nodes;
  }

  /**
   * 앞에서부터 채워 나가는 모드이므로 상태는 한 번에 훑어 정한다.
   * 첫 "덜 끝난 날"이 오늘이고, 그 뒤는 잠긴다. 오늘 안에서도 같은 규칙.
   *
   * 레슨을 앞서 진행한 유저는 그날 레슨이 이미 completed 라 문법·단어만
   * 채우면 바로 넘어간다 — 진행도를 되돌리는 게 아니라 빠진 것만 메운다.
   */
  private applyStatuses(days: StudyDay[]): number {
    let foundCurrent = false;
    let currentIndex = 0;

    days.forEach((day, index) => {
      const allDone =
        day.nodes.length > 0 &&
        day.nodes.every((node) => node.completed >= node.total);

      // 다 끝낸 날은 언제나 완료로 보인다. 레슨을 앞서 진행한 유저가
      // 뒤쪽 날을 이미 끝냈을 수 있는데, 그걸 잠긴 것처럼 보여줄 이유는 없다.
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
          if (node.completed >= node.total) {
            node.status = 'completed';
          } else if (!foundCurrentNode) {
            node.status = 'current';
            foundCurrentNode = true;
          }
        }
        return;
      }

      day.status = 'locked';
      // 잠긴 날이어도 이미 끝낸 노드는 끝난 것으로 보여준다
      day.nodes.forEach((node) => {
        if (node.completed >= node.total) node.status = 'completed';
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
