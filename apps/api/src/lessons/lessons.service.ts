import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Lesson,
  LessonCategory,
  LessonDocument,
} from './schemas/lesson.schema';
import { LessonNode, LessonNodeDocument } from './schemas/node.schema';
import { Question, QuestionDocument } from './schemas/question.schema';
import {
  UserProgress,
  UserProgressDocument,
} from '../users/schemas/user-progress.schema';
import {
  UserStats,
  UserStatsDocument,
} from '../users/schemas/user-stats.schema';
import { CompleteLessonDto } from './dto/complete-lesson.dto';
import { User, UserDocument } from '../users/schemas/user.schema';
import { buildMilestones, calcScore } from './score.util';
import { LeagueService } from '../league/league.service';
import { rollChestReward } from './xp.util';
import { UsersService } from '../users/users.service';
import { buildCategoryInc, LESSON_TO_STUDY } from './utils/category.util';
import { StudyCategory } from '../users/utils/study-category.util';
import { CompletePracticeDto } from './dto/complete-practice.dto';
import { calcLessonXp, calcPracticeXp } from './economy.const';
import { getSectionMeta, pickSectionText } from './section.const';
import { SELF_LEVEL_BAND, sectionRangeForLevel } from './placement.const';
import { SelfReportedLevel } from '../common/enums/self-level.enum';
import { HangulLevel } from '../common/enums/hangul-level.enum';

const LEGEND_XP = 40;

const SMART_GRADING_TYPES = new Set([
  'type_answer',
  'translate_type',
  'listen_type',
  'listen_fill',
]);

import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../notifications/schemas/notification.schema';
import { CATCH_UP_UNITS, STUDY_QUIZ_SIZE } from './study-path.const';
import {
  lessonCountFor,
  lessonSlice,
  type StudyQuizKind,
} from '../study-path/study-path.types';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name)
    private lessonModel: Model<LessonDocument>,
    @InjectModel(LessonNode.name)
    private nodeModel: Model<LessonNodeDocument>,
    @InjectModel(Question.name)
    private questionModel: Model<QuestionDocument>,
    @InjectModel(UserProgress.name)
    private userProgressModel: Model<UserProgressDocument>,
    @InjectModel(UserStats.name)
    private userStatsModel: Model<UserStatsDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private leagueService: LeagueService,
    private usersService: UsersService,
    private readonly notifications: NotificationsService,
  ) {}

  /**
   * 번역 문제(translate_builder / translate_type)의 말풍선에 들어갈 "옮길 원문".
   * 반드시 학습자 언어여야 "내 말 → 한국어" 문제가 된다.
   *
   * 시드에 두 가지 형태가 섞여 있다.
   * - 신규(227개): instruction 이 문제마다 다르고 uz/en/ru 가 곧 옮길 문장이다.
   *   ko 만 지시문("...라고 말하기") 형태라 한국어 UI 에서는 영어로 떨어뜨린다.
   *   (학습자 언어가 한국어인 경우는 실제로 없고, 있어도 정답 노출이라 안 된다)
   * - 구형(203개): instruction 이 공용 지시문("다음 문장을 번역하세요")이고
   *   옮길 원문은 npcText 에 들어 있다.
   */
  private translateSourceText(q: any, lang: string): string {
    if (q.type !== 'translate_builder' && q.type !== 'translate_type')
      return '';

    if (q.npcText) return q.npcText;

    const sourceLang = lang === 'ko' ? 'en' : lang;
    return q.instruction?.[sourceLang] || q.instruction?.en || '';
  }

  private extractI18n(obj: any, lang: string): string {
    if (!obj) return '';
    return obj[lang] || obj['uz'] || obj['en'] || '';
  }

  private extractNativeI18n(obj: any, lang: string): string {
    const sourceLang = lang === 'ko' ? 'en' : lang;
    return this.extractI18n(obj, sourceLang);
  }

  private extractNativeOptions(obj: any, lang: string): string[] {
    if (!obj) return [];
    const sourceLang = lang === 'ko' ? 'en' : lang;
    const options = obj[sourceLang] || obj.uz || obj.en;
    return Array.isArray(options) ? options : [];
  }

  private formatQuestion(q: any, lang: string) {
    const nativeOptions =
      q.type === 'sentence_builder'
        ? this.extractNativeOptions(q.optionsI18n, lang)
        : [];
    const usesNativeBuilder = nativeOptions.length > 0;
    const nativeAnswer = usesNativeBuilder
      ? this.extractNativeI18n(q.answerI18n, lang)
      : '';

    return {
      id: q._id.toString(),
      type: q.type,
      level: q.level,
      question: this.extractI18n(q.instruction, lang),
      sourceText: this.translateSourceText(q, lang),
      npcText: q.npcText || '',
      options: usesNativeBuilder ? nativeOptions : q.options || [],
      choices: q.choices || [], // ← 이거 추가
      answer: usesNativeBuilder && nativeAnswer ? nativeAnswer : q.answer,
      sentencePrefix: q.sentencePrefix || '',
      sentenceSuffix: q.sentenceSuffix || '',
      sentenceTemplate: q.sentenceTemplate || '',
      blankAnswers: q.blankAnswers || [],
      dialogLines: q.dialogLines || [],
      pairs: q.pairs || [],
      hint: this.extractI18n(q.hint, lang),
      explanation: this.extractI18n(q.explanation, lang),
      answerTranslation: this.extractI18n(q.answerTranslation, lang),
      acceptedAnswers: usesNativeBuilder ? [] : q.acceptedAnswers || [],
      // 세부 rubric은 서버에만 둔다. 기존 타이핑 시드는 안전한 exact 폴백을 쓴다.
      smartGradingEnabled: SMART_GRADING_TYPES.has(q.type),
      buildRows: q.buildRows || [], // grammar_build 전용
      difficulty: q.difficulty ?? 3,
      tags: q.tags || [],
      audioText: q.audioText || (usesNativeBuilder ? q.answer : ''),
      audioUrl: q.audioUrl || '',
      imageUrl: q.imageUrl || '',
      // 중급 5종 전용 필드
      passage: q.passage || '',
      passageTitle: q.passageTitle || '',
      wrongWord: q.wrongWord || '',
      baseWord: q.baseWord || '',
      targetForm: q.targetForm || '',
      xpReward: q.xpReward || 10,
    };
  }

  public async getQuestionsByIds(
    questionIds: Types.ObjectId[],
    lang: string = 'uz',
  ) {
    if (!questionIds.length) return [];

    const questions = await this.questionModel
      .find({ _id: { $in: questionIds }, isActive: true })
      .lean();
    const questionMap = new Map(
      questions.map((question) => [question._id.toString(), question]),
    );

    return questionIds
      .map((id) => questionMap.get(id.toString()))
      .filter((question): question is NonNullable<typeof question> =>
        Boolean(question),
      )
      .map((question) => this.formatQuestion(question, lang));
  }

  // 레슨 상세 + 문제들 (lessonId로 조회)
  public async getLessonById(lessonId: string, lang: string = 'uz') {
    const lesson = await this.lessonModel.findById(lessonId).lean();
    if (!lesson) throw new NotFoundException('레슨을 찾을 수 없습니다');

    const questions = await this.questionModel
      .find({ _id: { $in: lesson.questionIds }, isActive: true })
      .lean();

    const questionMap = new Map(questions.map((q) => [q._id.toString(), q]));
    const sortedQuestions = lesson.questionIds
      .map((id) => questionMap.get(id.toString()))
      .filter(Boolean)
      .map((q) => this.formatQuestion(q, lang));

    return {
      lessonId: lesson._id.toString(),
      lessonTitle: this.extractI18n(lesson.title, lang),
      category: lesson.category,
      grammarCode: lesson.grammarCode ?? null, // 문법 트랙이면 어떤 문법인지
      totalXp: lesson.xpReward,
      questions: sortedQuestions,
    };
  }

  // 레슨 완료 저장
  public async completeLesson(
    lessonId: string,
    userId: string,
    dto: CompleteLessonDto,
  ) {
    const lesson = await this.lessonModel
      .findById(new Types.ObjectId(lessonId))
      .lean();
    if (!lesson) throw new NotFoundException('레슨을 찾을 수 없습니다');

    // 진행도와 오답 노트에는 현재 레슨이 실제로 참조하는 질문 _id만 저장한다.
    // 시드 교체 전 id나 조작된 id가 들어오면 유령 오답 참조가 다시 생길 수 있다.
    const lessonQuestionIdSet = new Set(
      (lesson.questionIds ?? []).map((id) => id.toString()),
    );
    const wrongQuestionIds = [
      ...new Set((dto.wrongQuestionIds ?? []).map(String)),
    ].filter((id) => lessonQuestionIdSet.has(id));

    // ✅ XP = 기본값 + 콤보 (서버 계산, 클라 xpEarned 무시)
    const xpEarned = calcLessonXp(
      lesson.xpReward ?? 0,
      dto.combo,
      dto.correctAnswers,
    );

    await this.userProgressModel.findOneAndUpdate(
      {
        userId: new Types.ObjectId(userId),
        lessonId: new Types.ObjectId(lessonId),
      },
      {
        userId: new Types.ObjectId(userId),
        lessonId: new Types.ObjectId(lessonId),
        isCompleted: dto.isCompleted,
        xpEarned,
        correctAnswers: dto.correctAnswers,
        totalAnswers: dto.totalAnswers,
        combo: dto.combo,
        speedSeconds: dto.speedSeconds,
        wrongQuestionIds,
        completedAt: new Date(),
      },
      { upsert: true, returnDocument: 'after' },
    );

    // 통계 기록 (카테고리는 문제 타입에서 유도 — recordStudy 가 처리)
    await this.recordStudy(userId, {
      questionIds: lesson.questionIds,
      wrongQuestionIds,
      speedSeconds: dto.speedSeconds,
      xpEarned,
      // TOPIK 처럼 레슨 단위로 성격이 정해지는 건 통째로 그 버킷에
      overrideCategory:
        lesson.category === 'topik' ? StudyCategory.TOPIK : undefined,
    });

    // ── 연속 학습일 갱신 (오늘 기록 저장된 뒤에 호출해야 함) ──
    await this.usersService.syncStreak(userId).catch(() => {});
    await this.userModel
      .updateOne(
        { _id: new Types.ObjectId(userId) },
        { $set: { lastStudiedAt: new Date() } },
      )
      .catch(() => {});

    await this.leagueService.snapshotIfNeeded(userId).catch(() => {});

    // ── 노드 완성 감지 → 상자 ──
    let chest: { grade: string; gems: number } | null = null;

    const node = await this.nodeModel.findById(lesson.nodeId).lean();
    if (node && node.nodeType !== 'chest') {
      // 이 노드의 모든 레슨 완료됐는지 확인
      const nodeLessonIds = (node.lessonIds ?? []).map((x: any) =>
        x.toString(),
      );
      const doneCount = await this.userProgressModel.countDocuments({
        userId: new Types.ObjectId(userId),
        lessonId: { $in: node.lessonIds },
        isCompleted: true,
      });
      const nodeComplete =
        nodeLessonIds.length > 0 && doneCount >= nodeLessonIds.length;

      // 아직 이 노드 상자 안 열었으면 → 지급
      const already = await this.userModel.exists({
        _id: new Types.ObjectId(userId),
        openedChests: node._id,
      });

      if (nodeComplete && !already) {
        // 노드 전체 무실수 여부 (이 노드 레슨들 중 wrongQuestionIds 있었나)
        const nodeProgresses = await this.userProgressModel
          .find({
            userId: new Types.ObjectId(userId),
            lessonId: { $in: node.lessonIds },
          })
          .select('wrongQuestionIds')
          .lean();
        const perfect = nodeProgresses.every(
          (p) => (p.wrongQuestionIds?.length ?? 0) === 0,
        );

        chest = rollChestReward({ section: node.section ?? 1, perfect });

        // 보석 지급 + 상자 연 기록 (서버에서, 조작 불가)
        await this.userModel.findByIdAndUpdate(userId, {
          $inc: { gems: chest.gems },
          $addToSet: { openedChests: node._id },
        });

        await this.notifications
          .create(userId, NotificationType.CHEST, {
            params: { grade: chest.grade, gems: chest.gems },
            link: '/roadmap',
          })
          .catch(() => {});
      }
    }

    // ── 유저 totalXP 반영 ──
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        userId,
        { $inc: { totalXP: xpEarned } },
        { returnDocument: 'after' },
      )
      .select('totalXP gems energy')
      .lean();

    await this.leagueService.ensureJoined(userId).catch(() => {});

    return {
      success: true,
      xpEarned,
      totalXP: updatedUser?.totalXP ?? 0,
      gems: updatedUser?.gems ?? 0,
      energy: updatedUser?.energy ?? 0,
      chest, // ✅ 노드 완성 시 { grade, gems }, 아니면 null
    };
  }

  /**
   * 복습 · 단어연습 등 레슨이 아닌 학습 완료 처리.
   * XP 는 서버가 모드로 결정하고(클라 값 무시), 통계는 실제 푼 문제 기준으로 남긴다.
   */
  async completePractice(userId: string, dto: CompletePracticeDto) {
    const ids = (dto.questionIds ?? []).filter((id) =>
      Types.ObjectId.isValid(id),
    );
    const wrong = new Set(dto.wrongQuestionIds ?? []).size;
    const correct = Math.max(0, ids.length - wrong);
    const xp = calcPracticeXp(dto.mode, dto.combo ?? 0, correct);

    // 문제 수 · 학습 시간 · 카테고리 (XP 는 아래 addXp 가 기록하므로 여기선 0)
    await this.recordStudy(userId, {
      questionIds: ids.map((id) => new Types.ObjectId(id)),
      wrongQuestionIds: dto.wrongQuestionIds,
      speedSeconds: dto.speedSeconds,
      xpEarned: 0,
    });

    // totalXP · UserStats.xpEarned · 리그 반영
    const res = await this.addXp(userId, xp);

    return { success: true, xpEarned: xp, totalXP: res.totalXP ?? 0 };
  }

  /**
   * 학습 기록 1건 반영. 모든 학습 모드(레슨 · 복습 · 카테고리별 연습 · 게임 · AI 대화)가
   * 이 함수 하나만 호출하면 통계가 정확히 쌓인다.
   *
   * 카테고리는 문제의 lessonCategory(없으면 타입)에서 자동 유도되므로
   * 호출부는 카테고리를 몰라도 된다.
   */
  async recordStudy(
    userId: string,
    params: {
      questionIds?: Types.ObjectId[];
      questionTypes?: string[];
      /** 타입 개념이 없는 모드(게임 등)용 — 푼 문제 수만 넘김 */
      questionCount?: number;
      /** 지정하면 타입과 무관하게 전부 이 버킷으로 */
      overrideCategory?: StudyCategory;
      wrongQuestionIds?: string[];
      wrongCount?: number;
      speedSeconds?: number;
      xpEarned?: number;
    },
  ) {
    // 카테고리 판정에 필요한 최소 정보만 모은다
    let items: { type?: string; lessonCategory?: string }[] = (
      params.questionTypes ?? []
    ).map((type) => ({ type }));

    if (!items.length && params.questionIds?.length) {
      const qs = await this.questionModel
        .find({ _id: { $in: params.questionIds } })
        .select('type lessonCategory')
        .lean();
      items = qs.map((q) => ({
        type: q.type,
        lessonCategory: (q as any).lessonCategory,
      }));
    }

    // 문제 개념이 없는 모드는 questionCount 만큼 override 버킷에 넣는다
    if (!items.length && params.questionCount && params.overrideCategory) {
      items = new Array(params.questionCount).fill({});
    }

    const total = items.length;
    const xp = params.xpEarned ?? 0;
    if (!total && !xp) return;

    const wrong =
      params.wrongCount ?? new Set(params.wrongQuestionIds ?? []).size;
    // 비정상 값 방어 (음수 · 3시간 초과)
    const seconds = Math.min(Math.max(params.speedSeconds ?? 0, 0), 3 * 3600);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await this.userStatsModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId), date: today },
      {
        $inc: {
          studyTimeSeconds: seconds,
          totalQuestions: total,
          correctQuestions: Math.max(0, total - wrong),
          xpEarned: xp,
          ...buildCategoryInc(items, params.overrideCategory),
        },
      },
      { upsert: true, returnDocument: 'after' },
    );
  }

  public async getLevelTestQuestions(
    self: SelfReportedLevel = SelfReportedLevel.BASIC_GREETINGS,
    lang: string = 'uz',
  ) {
    const band =
      SELF_LEVEL_BAND[self] ??
      SELF_LEVEL_BAND[SelfReportedLevel.BASIC_GREETINGS];
    const levels = band.questionLevels.length
      ? band.questionLevels
      : ['1', '2'];

    // 밴드 안에서 랜덤 추출 후 쉬운→어려운 정렬
    const questions = await this.questionModel.aggregate([
      { $match: { level: { $in: levels }, isActive: true } },
      { $sample: { size: 14 } },
      { $sort: { level: 1 } },
    ]);

    return questions.map((q) => this.formatQuestion(q, lang));
  }

  // 로드맵 조회
  public async getRoadmap(
    userId: string,
    lang: string = 'uz',
    category?: string,
  ) {
    // 모든 노드 조회 (section, unit, order 순)
    const meUser = await this.userModel
      .findById(new Types.ObjectId(userId))
      .select('legendNodes placementLevel hangulLevel hangulCompletedAt')
      .lean();

    const startSection = sectionRangeForLevel(meUser?.placementLevel ?? 1)[0];

    const legendSet = new Set(
      ((meUser?.legendNodes ?? []) as any[]).map((x) => x.toString()),
    );

    // 카테고리 필터: 'vocabulary'/미지정은 기존 전체 로드맵(현재 그대로),
    // 그 외(grammar 등)는 해당 category 노드만 렌더.
    const nodeFilter: Record<string, any> = { isActive: true };
    if (category && category !== 'vocabulary') {
      nodeFilter.category = category;
    }
    const nodes = await this.nodeModel
      .find(nodeFilter)
      .sort({ section: 1, unit: 1, order: 1 })
      .lean();

    // 모든 레슨 조회
    const lessons = await this.lessonModel.find({ isActive: true }).lean();

    // lessonId → lesson 맵
    const lessonMap = new Map(lessons.map((l) => [l._id.toString(), l]));

    // 유저 진행도 조회
    const progresses = await this.userProgressModel
      .find({ userId: new Types.ObjectId(userId) })
      .lean();

    const progressMap = new Map(
      progresses.map((p) => [p.lessonId.toString(), p]),
    );

    // 유닛별 그룹핑
    const unitMap = new Map<string, any>();

    for (const node of nodes) {
      const unitKey = `${node.section}-${node.unit}`;

      if (!unitMap.has(unitKey)) {
        unitMap.set(unitKey, {
          id: `unit-${node.section}-${node.unit}`,
          sectionNumber: node.section,
          unitNumber: node.unit,
          title: this.extractI18n(node.title, lang),
          color: '#776ee2',
          status: 'locked',
          nodes: [],
        });
      }

      // 노드 안의 레슨들 진행도 계산
      const nodeLessons = node.lessonIds.map((lid) => {
        const lesson = lessonMap.get(lid.toString());
        const progress = progressMap.get(lid.toString());
        return {
          lessonId: lid.toString(),
          title: lesson ? this.extractI18n(lesson.title, lang) : '',
          isCompleted: progress?.isCompleted ?? false,
        };
      });

      const completedCount = nodeLessons.filter((l) => l.isCompleted).length;
      const totalCount = nodeLessons.length; // 보통 4

      const startLesson =
        nodeLessons.find((l) => !l.isCompleted) ?? nodeLessons[0];
      const startLessonObj = startLesson
        ? lessonMap.get(startLesson.lessonId)
        : null;

      const unit = unitMap.get(unitKey);
      unit.nodes.push({
        id: node._id.toString(),
        type: 'star',
        status: 'locked',
        title: this.extractI18n(node.title, lang),
        completedLessons: completedCount,
        totalLessons: totalCount,
        lessons: nodeLessons,
        lessonId: startLesson?.lessonId,
        xpReward: startLessonObj?.xpReward ?? 0, // ✅ 시작할 레슨의 XP
        legendCompleted: legendSet.has(node._id.toString()),
      });
    }

    // ── 한글을 못 읽는 유저: 섹션1 유닛1 맨 앞에 "한글 배우기" 노드를 끼운다 ──
    // 별도 화면으로 튕기지 않고 로드맵 위 첫 관문으로 보이게. 끝내야 다음이 열린다.
    // 메인(어휘) 트랙에만 넣는다. 문법 등 별도 카테고리 로드맵에는 안 넣음.
    const needsHangul =
      (!category || category === 'vocabulary') &&
      meUser?.hangulLevel === HangulLevel.NONE;

    if (needsHangul) {
      const firstUnit = unitMap.get('1-1');
      if (firstUnit) {
        const hangulDone = !!meUser?.hangulCompletedAt;
        firstUnit.nodes.unshift({
          id: 'hangul-intro',
          type: 'hangul',
          status: 'locked', // 아래 상태 계산이 덮어씀
          title: this.extractI18n(
            {
              ko: '한글 배우기',
              uz: 'Hangulni o‘rganish',
              en: 'Learn Hangul',
              ru: 'Изучить хангыль',
            } as any,
            lang,
          ),
          // 레슨이 없는 노드라 완료 판정을 1/1 로 흉내내서 기존 로직에 태운다
          completedLessons: hangulDone ? 1 : 0,
          totalLessons: 1,
          lessons: [],
          xpReward: 0,
          legendCompleted: false,
        });
      }
    }

    // unit/node status 계산
    const units = Array.from(unitMap.values());
    let foundCurrentUnit = false;
    let score = 0;

    for (const unit of units) {
      const allNodesCompleted =
        unit.sectionNumber < startSection ||
        unit.nodes.every((n: any) => n.completedLessons === n.totalLessons);

      if (allNodesCompleted) {
        score++;
        unit.status = 'completed';
        unit.nodes.forEach((n: any) => (n.status = 'completed'));
      } else if (!foundCurrentUnit) {
        unit.status = 'current';
        foundCurrentUnit = true;

        let foundCurrentNode = false;
        for (const node of unit.nodes) {
          if (node.completedLessons === node.totalLessons) {
            node.status = 'completed';
          } else if (!foundCurrentNode) {
            node.status = 'current';
            foundCurrentNode = true;
          }
          // 나머지는 locked 유지
        }
      }
    }

    // ── 현재 섹션만 노출 (듀오링고 방식) ──
    // 다음 섹션 유닛까지 같이 보여주면 "다음 섹션 잠김" 안내와 모순된다.
    const currentUnit = units.find((u: any) => u.status === 'current');
    const currentSection =
      currentUnit?.sectionNumber ?? units[units.length - 1]?.sectionNumber ?? 1;

    const sectionUnits = units.filter(
      (u: any) => u.sectionNumber === currentSection,
    );

    // 다음 섹션이 실제로 존재할 때만 안내 카드용 정보를 내려준다
    const nextNumber = currentSection + 1;
    const hasNext = units.some((u: any) => u.sectionNumber === nextNumber);
    const nextMeta = hasNext ? getSectionMeta(nextNumber) : null;
    const nextFirstUnit = hasNext
      ? Math.min(
          ...units
            .filter((u: any) => u.sectionNumber === nextNumber)
            .map((u: any) => u.unitNumber),
        )
      : 0;

    return {
      units: sectionUnits,
      score,
      currentSection,
      nextSection: nextMeta
        ? {
            sectionNumber: nextNumber,
            title: pickSectionText(nextMeta.title, lang),
            description: pickSectionText(nextMeta.description, lang),
            firstUnitNumber: nextFirstUnit,
          }
        : null,
    };
  }

  public async getLessons(userId: string) {
    const nodes = await this.nodeModel
      .find({ isActive: true })
      .sort({ section: 1, unit: 1, order: 1 })
      .lean();

    return nodes.map((node) => ({
      id: node._id.toString(),
      title: node.title,
      section: node.section,
      unit: node.unit,
      order: node.order,
      lessonCount: node.lessonIds.length,
    }));
  }

  // 유저의 모든 틀린 문제 (중복 제거)
  public async getMistakes(userId: string) {
    const progresses = await this.userProgressModel
      .find({ userId: new Types.ObjectId(userId) })
      .select('wrongQuestionIds')
      .lean();

    // 모든 wrongQuestionIds 합치고 중복 제거
    const idSet = new Set<string>();
    progresses.forEach((p) =>
      (p.wrongQuestionIds ?? []).forEach((id) => idSet.add(id)),
    );
    const ids = [...idSet].filter((id) => Types.ObjectId.isValid(id));

    if (ids.length === 0) return { count: 0, questions: [] };

    const questions = await this.questionModel
      .find({ _id: { $in: ids.map((id) => new Types.ObjectId(id)) } })
      .select('type instruction answer npcText')
      .lean();

    return {
      count: questions.length,
      questions: questions.map((q) => ({
        id: q._id.toString(),
        type: q.type,
        instruction: q.instruction, // i18n {ko,uz,en,ru}
        answer: q.answer,
        npcText: q.npcText,
      })),
    };
  }

  // 유저가 배운 단어 (완료 레슨의 word_matching pairs)
  public async getLearnedWords(userId: string) {
    // 완료한 레슨 id
    const completed = await this.userProgressModel
      .find({ userId: new Types.ObjectId(userId), isCompleted: true })
      .select('lessonId')
      .lean();
    const lessonIds = completed.map((p) => p.lessonId);
    if (lessonIds.length === 0) return { count: 0, words: [] };

    // 그 레슨들의 question id 모으기
    const lessons = await this.lessonModel
      .find({ _id: { $in: lessonIds } })
      .select('questionIds')
      .lean();

    const qIds = new Set<string>();
    lessons.forEach((l) =>
      (l.questionIds ?? []).forEach((q: any) => qIds.add(q.toString())),
    );

    if (qIds.size === 0) return { count: 0, words: [] };

    // pairs 있는 question에서 단어 추출
    const questions = await this.questionModel
      .find({
        _id: { $in: [...qIds].map((id) => new Types.ObjectId(id)) },
        'pairs.0': { $exists: true },
      })
      .select('pairs')
      .lean();

    const wordMap = new Map<string, { korean: string; native: string }>();
    questions.forEach((q) =>
      (q.pairs ?? []).forEach((p: any) => {
        if (p.korean && !wordMap.has(p.korean)) {
          wordMap.set(p.korean, { korean: p.korean, native: p.native });
        }
      }),
    );

    const words = [...wordMap.values()];
    return { count: words.length, words };
  }

  // 배운 단어로 word_matching 연습 문제 생성
  public async getWordPracticeQuestions(userId: string) {
    const { words } = await this.getLearnedWords(userId);
    if (words.length === 0) return { questions: [] };

    // 셔플
    const shuffled = [...words].sort(() => Math.random() - 0.5);

    // 4쌍씩 묶어서 문제 생성 (마지막 그룹이 2개 미만이면 버림)
    const PER = 4;
    const questions: any[] = [];
    for (let i = 0; i < shuffled.length; i += PER) {
      const group = shuffled.slice(i, i + PER);
      if (group.length < 2) break;
      questions.push({
        id: `wp-${i}`,
        type: 'word_matching',
        question: '', // 프론트에서 i18n 지시문 붙임
        instruction: {
          ko: '알맞은 짝을 연결하세요',
          uz: "To'g'ri juftlikni bog'lang",
          en: 'Match the pairs',
          ru: 'Соедините пары',
        },
        pairs: group.map((w) => ({ korean: w.korean, native: w.native })),
      });
    }

    return { questions };
  }

  // 복습 완료: 맞춘 문제들을 모든 progress의 오답 목록에서 제거
  public async resolveMistakes(userId: string, correctIds: string[]) {
    const validIds = correctIds.filter((id) => Types.ObjectId.isValid(id));
    if (validIds.length === 0) return { removed: 0 };

    // 이 유저의 모든 progress에서 해당 오답 id들 제거
    await this.userProgressModel.updateMany(
      { userId: new Types.ObjectId(userId) },
      { $pull: { wrongQuestionIds: { $in: validIds } } },
    );

    return { removed: validIds.length };
  }

  // 복습용: 틀린 문제 전체 (실제로 풀 수 있는 형태)
  async getMistakeQuestions(userId: string, lang: string = 'uz') {
    const progresses = await this.userProgressModel
      .find({ userId: new Types.ObjectId(userId) })
      .select('wrongQuestionIds')
      .lean();

    const idSet = new Set<string>();
    progresses.forEach((p) =>
      (p.wrongQuestionIds ?? []).forEach((id) => idSet.add(id)),
    );
    const ids = [...idSet].filter((id) => Types.ObjectId.isValid(id));
    if (ids.length === 0) return { questions: [] };

    const questions = await this.questionModel
      .find({
        _id: { $in: ids.map((id) => new Types.ObjectId(id)) },
        isActive: true,
      })
      .lean();

    return { questions: questions.map((q) => this.formatQuestion(q, lang)) };
  }

  // 노드 복습: 노드의 모든 레슨 문제 중 랜덤 N개
  async getNodeReview(nodeId: string, lang: string = 'uz', limit = 20) {
    if (!Types.ObjectId.isValid(nodeId)) return { questions: [] };

    const node = await this.nodeModel
      .findById(nodeId)
      .select('lessonIds')
      .lean();
    if (!node || !node.lessonIds?.length) return { questions: [] };

    // 노드의 레슨들 → questionIds 모으기
    const lessons = await this.lessonModel
      .find({ _id: { $in: node.lessonIds } })
      .select('questionIds')
      .lean();

    const qIds = new Set<string>();
    lessons.forEach((l) =>
      (l.questionIds ?? []).forEach((q: any) => qIds.add(q.toString())),
    );
    if (qIds.size === 0) return { questions: [] };

    // 문제 가져와서 셔플 후 limit개
    const questions = await this.questionModel
      .find({
        _id: { $in: [...qIds].map((id) => new Types.ObjectId(id)) },
        isActive: true,
      })
      .lean();

    const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, limit);
    return { questions: shuffled.map((q) => this.formatQuestion(q, lang)) };
  }

  // XP만 추가 (복습/레전드처럼 진행도 저장 없이 XP만)
  async addXp(userId: string, amount: number) {
    const xp = Math.max(0, Math.min(1000, Math.floor(amount || 0)));
    if (xp === 0) return { added: 0, totalXP: null };

    // ✅ XP 주기 전 현재 순위 기록 (애니메이션 비교용)
    await this.leagueService.snapshotIfNeeded(userId).catch(() => {});

    const uId = new Types.ObjectId(userId);
    const user = await this.userModel
      .findByIdAndUpdate(
        uId,
        { $inc: { totalXP: xp } },
        { returnDocument: 'after' },
      )
      .select('totalXP')
      .lean();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    await this.userStatsModel.updateOne(
      { userId: uId, date: today },
      { $inc: { xpEarned: xp } },
      { upsert: true },
    );

    await this.leagueService.ensureJoined(userId).catch(() => {});
    return { added: xp, totalXP: user?.totalXP ?? null };
  }

  /** (section, unit) 보다 앞선 모든 노드 조건 — 섹션 경계 포함 */
  // ─────────────────────────────────────────────────────────
  // 학습 로드 모드 — 하루(=유닛) 단위 문제 뽑기
  // ─────────────────────────────────────────────────────────

  /**
   * 하루치 노드에 쓸 문제. 하루 = 한 유닛이라 모두 (섹션, 유닛)으로 좁힌다.
   *
   * - review      전날(또는 쉰 기간) 배운 것 다시 풀기
   * - vocabQuiz   오늘 어휘 문제
   * - grammarQuiz 오늘 문법 문제 (문법 트랙 시드)
   * - final       마무리 — 오늘 틀린 것 우선
   */
  async getUnitPractice(
    userId: string,
    section: number,
    unit: number,
    kind: StudyQuizKind,
    lang = 'uz',
    lesson = 1,
  ) {
    if (kind === 'review') {
      return this.getCatchUpReview(userId, section, unit, lang);
    }
    if (kind === 'final') {
      return this.getUnitFinal(userId, section, unit, lang);
    }

    const track = kind === 'grammarQuiz' ? 'grammar' : 'vocabulary';
    const all = await this.collectUnitQuestions(section, unit, track);
    if (!all.length) return { questions: [] };

    // 어휘는 두 노드가 유닛 전체를 절반씩 맡는다
    let pool = all;
    if (kind === 'vocabQuiz1' || kind === 'vocabQuiz2') {
      const half = Math.ceil(all.length / 2);
      pool = kind === 'vocabQuiz1' ? all.slice(0, half) : all.slice(half);
    }

    const lessonCount = lessonCountFor(kind, pool.length);
    const index = Math.min(Math.max(1, lesson), lessonCount) - 1;
    const { start, end } = lessonSlice(pool.length, lessonCount, index);

    return {
      questions: pool
        .slice(start, end)
        .map((q) => this.formatQuestion(q, lang)),
    };
  }

  /**
   * 유닛·트랙별 문제 수를 한 번에 센다. 학습 로드 화면이 "문제가 없는 노드는
   * 아예 안 만든다"를 판단하는 데 쓴다 — 유닛마다 따로 물으면 쿼리가 유닛
   * 수만큼 늘어난다.
   *
   * 반환 키: `${unit}:${'vocabulary'|'grammar'}`
   */
  async countSectionQuestions(section: number): Promise<Map<string, number>> {
    const rows = await this.nodeModel.aggregate([
      { $match: { section, isActive: true } },
      {
        $lookup: {
          from: 'lessons',
          localField: 'lessonIds',
          foreignField: '_id',
          as: 'unitLessons',
        },
      },
      {
        $project: {
          unit: 1,
          category: 1,
          count: {
            $sum: {
              $map: {
                input: '$unitLessons',
                as: 'lesson',
                in: { $size: { $ifNull: ['$$lesson.questionIds', []] } },
              },
            },
          },
        },
      },
      {
        $group: {
          _id: { unit: '$unit', category: '$category' },
          count: { $sum: '$count' },
        },
      },
    ]);

    const result = new Map<string, number>();
    for (const row of rows as any[]) {
      const track = row._id?.category === 'grammar' ? 'grammar' : 'vocabulary';
      const key = `${row._id?.unit}:${track}`;
      result.set(key, (result.get(key) ?? 0) + (row.count ?? 0));
    }
    return result;
  }

  /**
   * 그 유닛의 노드 → 레슨 → 문제. 내용이 같은 문제는 하나만 남긴다.
   *
   * 문법 트랙 노드는 category='grammar' 로 심어져 있고, 어휘 트랙 노드는
   * category 가 아예 없다. 그래서 어휘 쪽은 $ne 로 거른다(필드가 없는 문서도
   * $ne 에 걸린다).
   */
  private async collectUnitQuestions(
    section: number,
    unit: number,
    track: 'vocabulary' | 'grammar',
  ) {
    const categoryFilter =
      track === 'grammar'
        ? LessonCategory.GRAMMAR
        : { $ne: LessonCategory.GRAMMAR };
    const nodes = await this.nodeModel
      .find({
        section,
        unit,
        isActive: true,
        category: categoryFilter as any,
      })
      .select('lessonIds')
      .lean();
    if (!nodes.length) return [];

    const lessonIds = nodes.flatMap((n) => n.lessonIds ?? []);
    const lessons = await this.lessonModel
      .find({ _id: { $in: lessonIds } })
      .select('questionIds')
      .lean();

    const qIds = new Set<string>();
    lessons.forEach((l) =>
      (l.questionIds ?? []).forEach((q: any) => qIds.add(q.toString())),
    );
    if (!qIds.size) return [];

    const questions = await this.questionModel
      .find({
        _id: { $in: [...qIds].map((id) => new Types.ObjectId(id)) },
        isActive: true,
      })
      .lean();

    // 레슨 분할이 매번 같은 조각을 주려면 순서가 고정이어야 한다.
    // 셔플하면 "레슨 3" 이 매번 다른 문제가 되어 전체를 한 번씩 커버하지 못한다.
    return this.dedupeByContent(questions).sort((a: any, b: any) =>
      a._id.toString().localeCompare(b._id.toString()),
    );
  }

  /**
   * 한 영역이 문제를 독차지하지 않게 라운드로빈으로 뽑는다.
   * 시드 규칙(한 레슨 안에서 한 영역 60% 이하)을 뽑기 단계에서도 지킨다.
   */
  private pickBalanced(questions: any[], limit: number) {
    const byCategory = new Map<string, any[]>();
    for (const q of this.shuffle(questions)) {
      const key = q.lessonCategory ?? 'etc';
      const bucket = byCategory.get(key) ?? [];
      bucket.push(q);
      byCategory.set(key, bucket);
    }

    // 난이도 순으로 정렬해 각 영역 안에서 쉬운 것부터 나오게 한다
    const buckets = [...byCategory.values()].map((items) =>
      [...items].sort((a, b) => (a.difficulty ?? 3) - (b.difficulty ?? 3)),
    );

    const picked: any[] = [];
    let round = 0;
    while (picked.length < limit) {
      const before = picked.length;
      for (const bucket of buckets) {
        if (picked.length >= limit) break;
        const item = bucket[round];
        if (item) picked.push(item);
      }
      if (picked.length === before) break; // 모든 버킷 소진
      round += 1;
    }
    return picked;
  }

  /**
   * 하루의 첫 노드 — 지난 수업 복습.
   *
   * 오래 쉬었을수록 더 거슬러 올라간다. 며칠 만에 돌아온 사람에게 전날 것만
   * 보여주면 그 앞이 통째로 날아간 채로 진도가 나간다.
   * 틀렸던 문제를 먼저 채우고, 모자라면 그 구간 문제로 채운다.
   */
  private async getCatchUpReview(
    userId: string,
    section: number,
    unit: number,
    lang: string,
  ) {
    const limit = STUDY_QUIZ_SIZE.review;
    const me = await this.userModel
      .findById(new Types.ObjectId(userId))
      .select('lastStudiedAt')
      .lean();

    const idleDays = this.daysSince(me?.lastStudiedAt);
    const span =
      CATCH_UP_UNITS.find((rule) => idleDays >= rule.days)?.units ?? 1;

    const scope = this.previousUnits(section, unit, span);
    if (!scope.length) return { questions: [] };

    const pastLessons = await this.lessonModel
      .find({ _id: { $in: await this.lessonIdsInUnits(scope) } })
      .select('_id')
      .lean();
    if (!pastLessons.length) return { questions: [] };

    const wrongFirst = await this.wrongQuestionIds(
      userId,
      pastLessons.map((l) => l._id),
      limit,
    );

    const rows = wrongFirst.length
      ? await this.questionModel
          .find({
            _id: { $in: wrongFirst.map((id) => new Types.ObjectId(id)) },
            isActive: true,
          })
          .lean()
      : [];

    // find 는 순서를 보장하지 않으므로 "최근에 틀린 순"을 다시 세운다
    const byId = new Map(rows.map((q: any) => [q._id.toString(), q]));
    const picked = wrongFirst
      .map((id) => byId.get(id))
      .filter((q): q is any => Boolean(q));

    // 틀린 게 없거나 모자라면 그 구간 문제로 채운다. 복습 노드는 하루의 첫
    // 관문이라 비워두면 흐름이 거기서 끊긴다.
    if (picked.length < limit) {
      const seen = new Set(picked.map((q: any) => q._id.toString()));
      for (const target of scope) {
        if (picked.length >= limit) break;
        const pool = await this.collectUnitQuestions(
          target.section,
          target.unit,
          'vocabulary',
        );
        for (const q of this.pickBalanced(pool, limit)) {
          if (picked.length >= limit) break;
          if (seen.has(q._id.toString())) continue;
          seen.add(q._id.toString());
          picked.push(q);
        }
      }
    }

    return {
      questions: picked
        .slice(0, limit)
        .map((q) => this.formatQuestion(q, lang)),
    };
  }

  /**
   * 하루의 마지막 노드 — 오늘 배운 걸 확인한다.
   * 오늘 틀렸던 문제를 먼저 넣고 어휘·문법을 섞어 채운다. 그날 안에 구멍을
   * 메우는 게 마무리의 목적이라 "어려운 문제 모음"이 아니다.
   */
  private async getUnitFinal(
    userId: string,
    section: number,
    unit: number,
    lang: string,
  ) {
    const limit = STUDY_QUIZ_SIZE.final;
    const [vocab, grammar] = await Promise.all([
      this.collectUnitQuestions(section, unit, 'vocabulary'),
      this.collectUnitQuestions(section, unit, 'grammar'),
    ]);
    const pool = [...vocab, ...grammar];
    if (!pool.length) return { questions: [] };

    const unitLessons = await this.lessonModel
      .find({ _id: { $in: await this.lessonIdsInUnits([{ section, unit }]) } })
      .select('_id')
      .lean();
    const wrongIds = new Set(
      await this.wrongQuestionIds(
        userId,
        unitLessons.map((l) => l._id),
        limit,
      ),
    );

    const wrong = pool.filter((q: any) => wrongIds.has(q._id.toString()));
    const rest = pool.filter((q: any) => !wrongIds.has(q._id.toString()));
    const picked = [
      ...this.shuffle(wrong).slice(0, limit),
      ...this.pickBalanced(rest, limit),
    ].slice(0, limit);

    return { questions: picked.map((q) => this.formatQuestion(q, lang)) };
  }

  /** (섹션, 유닛) 목록에 속한 레슨 id 들 */
  private async lessonIdsInUnits(
    scope: { section: number; unit: number }[],
  ): Promise<Types.ObjectId[]> {
    if (!scope.length) return [];
    const nodes = await this.nodeModel
      .find({ isActive: true, $or: scope })
      .select('lessonIds')
      .lean();
    return nodes.flatMap((n) => (n.lessonIds ?? []) as Types.ObjectId[]);
  }

  /** 최근에 틀린 순으로 문제 id. 같은 문제는 한 번만 */
  private async wrongQuestionIds(
    userId: string,
    lessonIds: Types.ObjectId[],
    limit: number,
  ): Promise<string[]> {
    if (!lessonIds.length) return [];
    const progresses = await this.userProgressModel
      .find({
        userId: new Types.ObjectId(userId),
        lessonId: { $in: lessonIds },
        wrongQuestionIds: { $ne: [] },
      })
      .select('wrongQuestionIds completedAt')
      .sort({ completedAt: -1 })
      .lean();

    const ordered: string[] = [];
    const seen = new Set<string>();
    for (const p of progresses) {
      for (const id of p.wrongQuestionIds ?? []) {
        if (!Types.ObjectId.isValid(id) || seen.has(id)) continue;
        seen.add(id);
        ordered.push(id);
        if (ordered.length >= limit) return ordered;
      }
    }
    return ordered;
  }

  /** (섹션, 유닛) 바로 앞의 유닛 span 개. 섹션 경계를 넘어서도 이어진다 */
  private previousUnits(section: number, unit: number, span: number) {
    const scope: { section: number; unit: number }[] = [];
    let s = section;
    let u = unit;
    for (let i = 0; i < span; i += 1) {
      u -= 1;
      if (u < 1) {
        s -= 1;
        if (s < 1) break;
        // 이전 섹션의 마지막 유닛 번호를 모르므로 넉넉히 잡지 않고 멈춘다.
        // 섹션 첫날의 복습은 그 섹션 안에서만 본다.
        break;
      }
      scope.push({ section: s, unit: u });
    }
    return scope;
  }

  /** 마지막 학습일로부터 며칠 지났나. 기록이 없으면 0 */
  private daysSince(date?: Date | null): number {
    if (!date) return 0;
    const diff = Date.now() - new Date(date).getTime();
    return Math.max(0, Math.floor(diff / (24 * 60 * 60 * 1000)));
  }

  /** 정답·지문·보기가 모두 같으면 같은 문제로 보고 하나만 남긴다 */
  private dedupeByContent(questions: any[]) {
    const seen = new Set<string>();
    return questions.filter((q: any) => {
      const key = [
        q.answer ?? '',
        q.npcText ?? '',
        q.sentencePrefix ?? '',
        q.sentenceSuffix ?? '',
        q.sentenceTemplate ?? '',
        (q.blankAnswers ?? []).join(','),
        (q.options ?? []).join(','),
        (q.pairs ?? []).map((p: any) => `${p.korean}:${p.native}`).join(','),
        (q.dialogLines ?? []).map((d: any) => d.text).join(','),
      ]
        .join('|')
        .trim()
        .toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  private shuffle<T>(items: readonly T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const a = result[i];
      const b = result[j];
      if (a === undefined || b === undefined) continue;
      result[i] = b;
      result[j] = a;
    }
    return result;
  }

  private beforeFilter(section: number, unit: number) {
    return {
      $or: [{ section: { $lt: section } }, { section, unit: { $lt: unit } }],
    };
  }

  // 유닛 점프 테스트 문제 뽑기 (targetUnit 직전까지 레슨 문제 중 25개)
  async getUnitJumpTest(
    userId: string,
    targetSection: number,
    targetUnit: number,
    lang = 'uz',
    limit = 25,
  ) {
    // targetUnit "이전"의 모든 노드 (같은 섹션 기준)
    const nodes = await this.nodeModel
      .find(this.beforeFilter(targetSection, targetUnit))
      .select('lessonIds')
      .lean();

    if (!nodes.length) return { questions: [] };

    const lessonIds = nodes.flatMap((n) => n.lessonIds ?? []);
    const lessons = await this.lessonModel
      .find({ _id: { $in: lessonIds } })
      .select('questionIds')
      .lean();

    const qIds = new Set<string>();
    lessons.forEach((l) =>
      (l.questionIds ?? []).forEach((q: any) => qIds.add(q.toString())),
    );
    if (!qIds.size) return { questions: [] };

    const questions = await this.questionModel
      .find({
        _id: { $in: [...qIds].map((id) => new Types.ObjectId(id)) },
        isActive: true,
      })
      .lean();

    // 내용 기준 중복 제거 (정답+지문+보기+대화가 같으면 하나만)
    const seen = new Set<string>();
    const unique = questions.filter((q: any) => {
      const parts = [
        q.answer ?? '',
        q.npcText ?? '',
        q.sentencePrefix ?? '',
        q.sentenceSuffix ?? '',
        q.sentenceTemplate ?? '',
        (q.blankAnswers ?? []).join(','),
        (q.options ?? []).join(','),
        (q.pairs ?? []).map((p: any) => `${p.korean}:${p.native}`).join(','),
        (q.dialogLines ?? []).map((d: any) => d.text).join(','),
      ];
      const key = parts.join('|').trim().toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const shuffled = unique.sort(() => Math.random() - 0.5).slice(0, limit);
    return { questions: shuffled.map((q) => this.formatQuestion(q, lang)) };
  }

  // 점프 통과 → 사이 레슨 전부 완료 처리 (XP 없이)
  async completeUnitJump(
    userId: string,
    targetSection: number,
    targetUnit: number,
  ) {
    const nodes = await this.nodeModel
      .find(this.beforeFilter(targetSection, targetUnit))
      .select('lessonIds')
      .lean();

    const lessonIds = nodes.flatMap((n) => n.lessonIds ?? []);
    if (!lessonIds.length) return { completed: 0 };

    // 각 레슨을 UserProgress에 완료로 upsert (XP 0)
    const ops = lessonIds.map((lid) => ({
      updateOne: {
        filter: { userId: new Types.ObjectId(userId), lessonId: lid },
        update: {
          $set: { isCompleted: true },
          $setOnInsert: {
            userId: new Types.ObjectId(userId),
            lessonId: lid,
            correctAnswers: 0,
            totalAnswers: 0,
            wrongQuestionIds: [],
          },
        },
        upsert: true,
      },
    }));

    await this.userProgressModel.bulkWrite(ops);
    return { completed: lessonIds.length };
  }

  async getScore(userId: string, lang = 'uz') {
    const uId = new Types.ObjectId(userId);

    // 전체 노드 (chest 제외)
    const nodes = await this.nodeModel
      .find({ isActive: true, nodeType: { $ne: 'chest' } })
      .select('section unit lessonIds')
      .lean();

    // 유저 완료 레슨
    const done = await this.userProgressModel
      .find({ userId: uId, isCompleted: true })
      .select('lessonId')
      .lean();
    const doneSet = new Set(done.map((d: any) => d.lessonId.toString()));

    // 유닛별로 노드 묶기
    const unitMap = new Map<string, { section: number; nodes: any[] }>();
    for (const n of nodes) {
      const key = `${n.section}-${n.unit}`;
      if (!unitMap.has(key))
        unitMap.set(key, { section: n.section, nodes: [] });
      unitMap.get(key)!.nodes.push(n);
    }

    // 유닛 완주 판정 = 그 유닛의 모든 노드의 모든 레슨 완료
    let completedUnits = 0;
    const sectionUnits = new Map<number, number>();

    for (const [, u] of unitMap) {
      sectionUnits.set(u.section, (sectionUnits.get(u.section) ?? 0) + 1);

      const allDone = u.nodes.every((n) => {
        const ids = (n.lessonIds ?? []).map((x: any) => x.toString());
        return ids.length > 0 && ids.every((id) => doneSet.has(id));
      });
      if (allDone) completedUnits++;
    }

    // 섹션별 유닛 수 → 마일스톤 (섹션 늘어나면 자동 확장)
    const milestones = buildMilestones(
      [...sectionUnits.entries()].map(([section, units]) => {
        const meta = getSectionMeta(section);
        return {
          section,
          units,
          title: meta
            ? pickSectionText(meta.title, lang)
            : `Section ${section}`,
        };
      }),
    );

    return calcScore(completedUnits, milestones);
  }

  async completeLegend(userId: string, nodeId: string) {
    const node = await this.nodeModel
      .findById(new Types.ObjectId(nodeId))
      .lean();
    if (!node) throw new NotFoundException('노드를 찾을 수 없습니다');

    const uId = new Types.ObjectId(userId);

    // 이미 클리어했으면 XP 안 줌 (반복 파밍 차단)
    const already = await this.userModel.exists({
      _id: uId,
      legendNodes: node._id,
    });
    if (already) {
      const u = await this.userModel.findById(uId).select('totalXP').lean();
      return {
        success: true,
        alreadyDone: true,
        xpEarned: 0,
        totalXP: u?.totalXP ?? 0,
      };
    }

    await this.userModel.updateOne(
      { _id: uId },
      { $addToSet: { legendNodes: node._id } },
    );

    // 레전드도 학습 통계에 반영 (문제 수 · 카테고리)
    const legendLessons = await this.lessonModel
      .find({ _id: { $in: node.lessonIds ?? [] } })
      .select('questionIds')
      .lean();
    const legendQuestionIds = legendLessons.flatMap((l) => l.questionIds ?? []);
    await this.recordStudy(userId, {
      questionIds: legendQuestionIds,
      xpEarned: 0,
    }).catch(() => {});

    // XP는 서버가 정함 (통계·리그 반영까지 addXp가 처리)
    const res = await this.addXp(userId, LEGEND_XP);

    return {
      success: true,
      alreadyDone: false,
      xpEarned: LEGEND_XP,
      totalXP: res.totalXP ?? 0,
    };
  }
}
