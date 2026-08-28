import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LessonsService } from '../lessons/lessons.service';
import { LEVEL_EXAM } from '../lessons/study-path.const';
import { Question, QuestionDocument } from '../lessons/schemas/question.schema';
import { CompleteLevelExamDto } from './dto/complete-level-exam.dto';
import {
  PLACEMENT_LEVELS,
  clampLevel,
  sectionRangeForLevel,
} from '../lessons/placement.const';
import { pickSectionText } from '../lessons/section.const';
import { WordsService } from '../words/words.service';
import { Grammar, GrammarDocument } from '../grammer/schemas/grammar.schema';
import { LessonNode, LessonNodeDocument } from '../lessons/schemas/node.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  StudyCompletableKind,
  StudyDay,
  StudyNode,
  StudyNodeKind,
  StudyNodeStatus,
  StudyPathResponse,
  StudyPhase,
  lessonCountFor,
  lessonSlice,
  studyNodeKey,
  studyNodePrefix,
  vocabNodeCount,
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
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
  ) {}

  /**
   * 하루 = 한 유닛. 노출 범위는 기존 로드맵과 같게 현재 섹션만 준다
   * (다음 섹션까지 보이면 "다음 섹션 잠김" 안내와 모순된다).
   *
   * 노드는 항상 같은 여섯 자리다. 다만 다룰 것이 없는 노드는 만들지 않는다 —
   * 문법 시드가 아직 없는 유닛에 빈 문법 노드를 세워두면 하루가 거기서 막힌다.
   */
  async getStudyPath(userId: string, lang = 'uz'): Promise<StudyPathResponse> {
    // 급수(=섹션 두 개) 전체를 한 흐름으로 본다. 섹션은 유저에게 의미 있는
    // 단위가 아니라 내부 구분일 뿐이라, 중간에 "다음 섹션 잠김" 벽이 서면
    // 순서대로 쭉 간다는 약속이 깨진다.
    const roadmap: any = await this.lessonsService.getRoadmap(
      userId,
      lang,
      undefined,
      true,
    );
    const units: any[] = roadmap.units ?? [];
    const section: number = roadmap.currentSection ?? 1;

    const sections = [
      ...new Set(units.map((u: any) => u.sectionNumber as number)),
    ].sort((a, b) => a - b);

    const [me, grammarRows, wordSummaries, unitsBefore] = await Promise.all([
      this.userModel
        .findById(userId)
        .select(
          'completedGrammar completedStudyNodes placementLevel completedLevelExams',
        )
        .lean(),
      this.grammarModel
        .find({ isActive: true, section: { $in: sections } })
        .select('code section unit')
        .lean(),
      Promise.all(sections.map((s) => this.safeWordSummary(userId, s))),
      this.countUnitsBeforeSection(sections[0] ?? section),
    ]);

    const questionCounts = new Map<string, number>();
    for (const s of sections) {
      const counts = await this.lessonsService.countSectionQuestions(s);
      for (const [key, value] of counts)
        questionCounts.set(`${s}:${key}`, value);
    }

    const doneGrammar = new Set<string>(me?.completedGrammar ?? []);
    const doneNodes = new Set<string>(me?.completedStudyNodes ?? []);

    const grammarByUnit = new Map<string, string[]>();
    for (const row of grammarRows as any[]) {
      const key = `${row.section ?? 1}:${row.unit ?? 1}`;
      const list = grammarByUnit.get(key) ?? [];
      list.push(row.code);
      grammarByUnit.set(key, list);
    }

    const wordsByUnit = new Map<string, UnitWordSummary>();
    sections.forEach((s, index) => {
      for (const u of wordSummaries[index]?.units ?? []) {
        wordsByUnit.set(`${s}:${u.unit}`, u);
      }
    });

    // 1과 = 이틀. 첫날은 새 내용을 넣고, 둘째 날은 문제로 굳힌다.
    let seenSection = 0;
    const days: StudyDay[] = units.flatMap((unit, index) => {
      const unitSection: number = unit.sectionNumber ?? section;
      const key = `${unitSection}:${unit.unitNumber}`;
      const startsSection = unitSection !== seenSection;
      seenSection = unitSection;

      const ctx = {
        section: unitSection,
        unit: unit.unitNumber,
        isFirstOfSection: index === 0,
        doneGrammar,
        doneNodes,
        grammarCodes: grammarByUnit.get(key) ?? [],
        words: wordsByUnit.get(key),
        vocabQuestions: questionCounts.get(`${key}:vocabulary`) ?? 0,
        grammarQuestions: questionCounts.get(`${key}:grammar`) ?? 0,
      };

      return ([1, 2] as StudyPhase[]).map((phase) => ({
        id: `day-${unitSection}-${unit.unitNumber}-${phase}`,
        dayNumber: (unitsBefore + index) * 2 + phase,
        section: unitSection,
        unit: unit.unitNumber,
        phase,
        // 섹션이 바뀌는 첫날 위에만 구분선을 세운다
        sectionStart: startsSection && phase === 1,
        title: unit.title ?? '',
        status: 'locked' as StudyNodeStatus,
        nodes: this.buildNodes({ ...ctx, phase }),
      }));
    });

    const currentDayIndex = this.applyStatuses(days);

    const level = clampLevel(me?.placementLevel ?? 1);
    // 그 급을 전부 끝내야 졸업 시험이 열린다
    const allDone =
      days.length > 0 && days.every((d) => d.status === 'completed');

    return {
      currentSection: section,
      currentLevel: level,
      currentDayIndex,
      days,
      levelExam: {
        available: allDone,
        passed: (me?.completedLevelExams ?? []).includes(level),
      },
      nextLevel: await this.nextLevelInfo(level, lang),
    };
  }

  /**
   * 이 급을 다 끝냈을 때 안내할 다음 급. 콘텐츠가 없으면 null 이라 화면이
   * 아무것도 띄우지 않는다 — 없는 걸 예고하면 기다리게만 만든다.
   */
  private async nextLevelInfo(level: number, lang: string) {
    const next = level + 1;
    const meta = PLACEMENT_LEVELS.find((m) => m.level === next);
    if (!meta) return null;

    const [start, end] = sectionRangeForLevel(next);
    const ready = await this.nodeModel.exists({
      isActive: true,
      section: { $in: [start, end] },
    });
    if (!ready) return null;

    return {
      level: next,
      title: pickSectionText(meta.title, lang),
      description: pickSectionText(meta.description, lang),
    };
  }

  /**
   * 고를 수 있는 급수 목록.
   *
   * 콘텐츠가 없는 급은 available:false 로 내려서 화면이 잠근다. 시드가 늘면
   * 자동으로 열리도록 노드 유무로 판단한다 — 목록에 하드코딩하지 않는다.
   */
  async getLevels(userId: string, lang = 'uz') {
    const [me, sections] = await Promise.all([
      this.userModel.findById(userId).select('placementLevel').lean(),
      this.nodeModel.distinct('section', { isActive: true }),
    ]);

    const ready = new Set<number>((sections as number[]) ?? []);
    const current = me?.placementLevel ?? 1;

    const levels = PLACEMENT_LEVELS.map((meta) => {
      const [start, end] = sectionRangeForLevel(meta.level);
      // 그 급이 맡은 두 섹션 중 하나라도 있으면 시작할 수 있다
      const available = ready.has(start) || ready.has(end);
      return {
        level: meta.level,
        sections: [start, end] as [number, number],
        title: pickSectionText(meta.title, lang),
        description: pickSectionText(meta.description, lang),
        available,
      };
    });

    return { current, levels };
  }

  /**
   * 급수 직접 선택. 콘텐츠가 없는 급은 거부한다 — 빈 로드맵으로 보내면
   * 앱이 "준비된 학습이 없어요" 만 띄우고 유저는 이유를 모른다.
   */
  async setLevel(userId: string, level: number) {
    const target = clampLevel(level);
    const [start, end] = sectionRangeForLevel(target);
    const ready = (await this.nodeModel.distinct('section', {
      isActive: true,
      section: { $in: [start, end] },
    })) as number[];

    if (!ready.length) throw new BadRequestException('LEVEL_NOT_AVAILABLE');

    await this.userModel.updateOne(
      { _id: userId },
      { $set: { placementLevel: target, placementLevelSetAt: new Date() } },
    );
    return { placementLevel: target };
  }

  /** 급수 졸업 시험 문제 */
  async getLevelExam(userId: string, lang = 'uz') {
    const me = await this.userModel
      .findById(userId)
      .select('placementLevel')
      .lean();
    const level = clampLevel(me?.placementLevel ?? 1);
    const [start, end] = sectionRangeForLevel(level);

    const exam = await this.lessonsService.getLevelExam(
      [start, end],
      lang,
      LEVEL_EXAM.questions,
    );
    return { level, ...exam };
  }

  /**
   * 졸업 시험 결과.
   *
   * 떨어져도 다음 급은 열어준다. 학습 로드의 약속은 "순서대로 가면 된다" 인데
   * 시험이 벽이 되면 떨어진 사람은 거기서 앱을 떠난다. 대신 어느 영역이
   * 약했는지 알려주고, 다시 보고 싶으면 언제든 볼 수 있게 둔다.
   */
  async completeLevelExam(userId: string, dto: CompleteLevelExamDto) {
    const me = await this.userModel
      .findById(userId)
      .select('placementLevel completedLevelExams')
      .lean();
    const level = clampLevel(me?.placementLevel ?? 1);

    const questionIds = (dto.questionIds ?? []).filter((id) =>
      Types.ObjectId.isValid(id),
    );
    const wrongIds = (dto.wrongQuestionIds ?? []).filter((id) =>
      Types.ObjectId.isValid(id),
    );
    const total = questionIds.length;
    const correct = Math.max(0, total - new Set(wrongIds).size);
    const passed = total > 0 && correct / total >= LEVEL_EXAM.passRatio;

    // 오답 장부·통계는 다른 학습과 같은 경로로
    await this.lessonsService.recordStudy(userId, {
      questionIds: questionIds.map((id) => new Types.ObjectId(id)),
      wrongQuestionIds: wrongIds,
      speedSeconds: dto.speedSeconds,
    });

    const xpRes = await this.lessonsService.addXp(
      userId,
      passed ? LEVEL_EXAM.xp : Math.round(LEVEL_EXAM.xp / 3),
    );

    // 통과 보상은 급수당 한 번만
    let gemsEarned = 0;
    if (passed && !(me?.completedLevelExams ?? []).includes(level)) {
      await this.userModel.updateOne(
        { _id: userId },
        {
          $inc: { gems: LEVEL_EXAM.gems },
          $addToSet: { completedLevelExams: level },
        },
      );
      gemsEarned = LEVEL_EXAM.gems;
    }

    const next = await this.nextLevelInfo(level, dto.lang ?? 'uz');
    if (next) {
      await this.userModel.updateOne(
        { _id: userId },
        { $set: { placementLevel: next.level } },
      );
    }

    return {
      passed,
      correct,
      total,
      level,
      nextLevel: next?.level ?? null,
      weakAreas: await this.weakAreas(wrongIds),
      gemsEarned,
      xpEarned: passed ? LEVEL_EXAM.xp : Math.round(LEVEL_EXAM.xp / 3),
      totalXP: xpRes.totalXP ?? 0,
    };
  }

  /** 틀린 문제가 어느 영역에 몰렸는지. 많은 순으로 최대 두 개 */
  private async weakAreas(wrongIds: string[]): Promise<string[]> {
    if (!wrongIds.length) return [];
    const rows = await this.questionModel
      .find({ _id: { $in: wrongIds.map((id) => new Types.ObjectId(id)) } })
      .select('lessonCategory type')
      .lean();

    const counts = new Map<string, number>();
    for (const row of rows as any[]) {
      const key = row.lessonCategory ?? row.type ?? 'etc';
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([key]) => key);
  }

  /** 노드의 링 하나를 끝냈다는 기록 */
  async completeNode(
    userId: string,
    section: number,
    unit: number,
    kind: StudyCompletableKind,
    group = 1,
    lesson = 1,
  ) {
    const key = studyNodeKey(section, unit, kind, group, lesson);
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
    phase: StudyPhase;
    isFirstOfSection: boolean;
    doneGrammar: Set<string>;
    doneNodes: Set<string>;
    grammarCodes: string[];
    words?: UnitWordSummary;
    vocabQuestions: number;
    grammarQuestions: number;
  }): StudyNode[] {
    const nodes: StudyNode[] = [];

    /**
     * 노드 하나를 링 여러 개로 쪼갠다. 끝낸 링은 유저 문서에 남고, 기록이
     * 없어도 이미 그 내용을 다 해치운 유저(자율 모드로 앞서 나간 경우)는
     * 통째로 완료로 본다 — 진행도를 되돌리지 않으려고.
     */
    const add = (
      kind: StudyNodeKind,
      count: number,
      options: {
        group?: number;
        groupCount?: number;
        alreadyDone?: boolean;
      } = {},
    ): void => {
      if (count <= 0) return; // 다룰 게 없는 노드는 세우지 않는다
      const group = options.group ?? 1;
      const groupCount = options.groupCount ?? 1;
      const lessonCount = lessonCountFor(kind, count);
      const prefix = studyNodePrefix(ctx.section, ctx.unit, kind, group);

      let lessonsDone = 0;
      for (let lesson = 1; lesson <= lessonCount; lesson += 1) {
        if (ctx.doneNodes.has(`${prefix}${lesson}`)) lessonsDone += 1;
      }
      if (options.alreadyDone) lessonsDone = lessonCount;

      // 중간을 건너뛰고 끝 링만 했더라도 첫 미완료부터 이어 가게 한다
      let nextLesson = 1;
      for (let lesson = 1; lesson <= lessonCount; lesson += 1) {
        if (!ctx.doneNodes.has(`${prefix}${lesson}`)) {
          nextLesson = lesson;
          break;
        }
        nextLesson = lesson === lessonCount ? 1 : lesson + 1;
      }

      nodes.push({
        id: `${kind}.${group}`,
        kind,
        group,
        groupCount,
        status: 'locked',
        done: lessonsDone >= lessonCount,
        count,
        lessonCount,
        lessonsDone,
        nextLesson,
      });
    };

    // 어휘 문제는 유닛 전체를 100문제짜리 노드로 나눠 이틀에 걸쳐 소화한다
    const vocabNodes = vocabNodeCount(ctx.vocabQuestions);
    const firstDayVocab = Math.ceil(vocabNodes / 2);

    if (ctx.phase === 1) {
      // 1일차 — 배우기: 지난 과 복습 → 단어 → 문법 → 어휘 문제 앞쪽
      if (!ctx.isFirstOfSection) add('review', 1);

      const wordCount = ctx.words?.words ?? 0;
      add('words', wordCount, {
        alreadyDone: wordCount > 0 && (ctx.words?.new ?? 0) === 0,
      });

      add('grammar', ctx.grammarCodes.length, {
        alreadyDone:
          ctx.grammarCodes.length > 0 &&
          ctx.grammarCodes.every((code) => ctx.doneGrammar.has(code)),
      });

      for (let group = 1; group <= firstDayVocab; group += 1) {
        const { start, end } = lessonSlice(
          ctx.vocabQuestions,
          vocabNodes,
          group - 1,
        );
        add('vocabQuiz', end - start, { group, groupCount: vocabNodes });
      }
      return nodes;
    }

    // 2일차 — 익히기: 어제 복습 → 어휘 문제 뒤쪽 → 문법 문제 → 마무리
    add('recap', ctx.vocabQuestions > 0 ? 1 : 0);

    for (let group = firstDayVocab + 1; group <= vocabNodes; group += 1) {
      const { start, end } = lessonSlice(
        ctx.vocabQuestions,
        vocabNodes,
        group - 1,
      );
      add('vocabQuiz', end - start, { group, groupCount: vocabNodes });
    }

    add('grammarQuiz', ctx.grammarQuestions);
    add('final', ctx.vocabQuestions + ctx.grammarQuestions);

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
