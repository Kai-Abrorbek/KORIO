import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Lesson,
  LessonCategory,
  LessonDocument,
} from './schemas/lesson.schema';
import { LessonNode, LessonNodeDocument } from './schemas/node.schema';
import {
  Question,
  QuestionDocument,
  QuestionType,
} from './schemas/question.schema';
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
import {
  UserMistake,
  UserMistakeDocument,
} from '../users/schemas/user-mistake.schema';
import { buildMilestones, calcScore } from './score.util';
import { LeagueService } from '../league/league.service';
import { rollChestReward } from './xp.util';
import { ChestService } from './chest.service';
import { UsersService } from '../users/users.service';
import { startOfDay } from '../common/date.util';
import { buildCategoryInc, LESSON_TO_STUDY } from './utils/category.util';
import { StudyCategory } from '../users/utils/study-category.util';
import { CompletePracticeDto } from './dto/complete-practice.dto';
import {
  MAX_SESSION_ANSWERS,
  calcLessonXp,
  calcPracticeXp,
  clampCount,
} from './economy.const';
import { getSectionMeta, pickSectionText } from './section.const';
import { SELF_LEVEL_BAND, sectionRangeForLevel } from './placement.const';
import { SelfReportedLevel } from '../common/enums/self-level.enum';
import { HangulLevel } from '../common/enums/hangul-level.enum';

const LEGEND_XP = 300;

/** answerTranslation 을 문제 지문으로 먼저 보여주는 타입 (정답 노출 주의) */
const GRAMMAR_PROMPT_TYPES = new Set([
  QuestionType.GRAMMAR_BLANK,
  QuestionType.GRAMMAR_BUILD,
]);

/** 틀린 문제를 "해소"로 보기까지 필요한 연속 정답 수 */
const MISTAKE_RESOLVE_STREAK = 2;

/** 오답 노트에 한 번에 보여줄 최대 문항 수 */
const MISTAKE_NOTE_LIMIT = 200;

const SMART_GRADING_TYPES = new Set([
  'type_answer',
  'translate_type',
  'listen_type',
  'listen_fill',
]);

import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../notifications/schemas/notification.schema';
import {
  JumpAttempt,
  JumpAttemptDocument,
} from './schemas/jump-attempt.schema';
import {
  CATCH_UP_UNITS,
  STUDY_QUIZ_SIZE,
  UNIT_FINAL_MIN_DIFFICULTY,
} from './study-path.const';
import {
  lessonCountFor,
  lessonSlice,
  vocabNodeCount,
  type StudyQuizKind,
} from '../study-path/study-path.types';
import {
  buildJumpNodeFilter,
  buildJumpQuestionFilter,
  normalizeJumpTestCategory,
  type JumpTestCategory,
} from './jump-test.util';

@Injectable()
export class LessonsService {
  private readonly logger = new Logger(LessonsService.name);

  constructor(
    @InjectModel(Lesson.name)
    private lessonModel: Model<LessonDocument>,
    @InjectModel(LessonNode.name)
    private nodeModel: Model<LessonNodeDocument>,
    private readonly chestService: ChestService,
    @InjectModel(Question.name)
    private questionModel: Model<QuestionDocument>,
    @InjectModel(UserProgress.name)
    private userProgressModel: Model<UserProgressDocument>,
    @InjectModel(UserStats.name)
    private userStatsModel: Model<UserStatsDocument>,
    @InjectModel(UserMistake.name)
    private userMistakeModel: Model<UserMistakeDocument>,
    @InjectModel(JumpAttempt.name)
    private jumpAttemptModel: Model<JumpAttemptDocument>,
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
      // 문법 빈칸·조립은 answerTranslation 을 "뜻 문장"으로 문제에 먼저 보여준다.
      // 그런데 시드의 ko 자리에는 한국어 정답 문장이 통째로 들어 있어서, 한국어
      // UI 로 보면 빈칸 위에 답이 적힌 꼴이 된다. 번역 문제에서 쓰던 규칙
      // (ko → en 폴백)을 여기에도 적용한다. 실제 학습자 언어가 한국어인 경우는 없다.
      answerTranslation: GRAMMAR_PROMPT_TYPES.has(q.type)
        ? this.extractNativeI18n(q.answerTranslation, lang)
        : this.extractI18n(q.answerTranslation, lang),
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

  /**
   * 문제가 다루는 대상(단어·표현)을 뽑는다.
   *
   * 같은 단어를 연달아 묻지 않으려고 쓰는 키다. 문제 스키마에 "이 문제의
   * 단어" 필드가 따로 없어서, 정답 자리에 오는 값을 순서대로 본다.
   * 문장부호·공백·대소문자는 무시한다 ("안녕히 계세요" 와 "안녕히 계세요." 는
   * 같은 것으로 봐야 한다).
   *
   * 빈 문자열이면 "대상 없음" 이다 — 그런 문제끼리는 중복으로 치지 않는다.
   */
  private subjectKeyOf(question: any): string {
    const raw =
      question?.baseWord ||
      question?.answer ||
      question?.audioText ||
      (question?.blankAnswers ?? [])[0] ||
      (question?.pairs ?? [])[0]?.korean ||
      '';
    return String(raw)
      .normalize('NFC')
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]/gu, '');
  }

  /**
   * 같은 대상을 다루는 문제가 연달아 나오지 않게 최소한으로 자리를 바꾼다.
   *
   * ⚠️ 통째로 섞지 않는다. 시드의 문제 순서는 교육 순서다 — 그림으로 먼저
   * 만나고, 연결하고, 빈칸을 채우고, 마지막에 말한다. 셔플해 버리면 한 번도
   * 본 적 없는 단어를 말하라고 시키게 된다.
   *
   * 그래서 순서를 그대로 두고, **바로 앞과 대상이 같을 때만** 뒤에서 다른
   * 대상을 하나 끌어온다. 결과는 결정적이라 같은 레슨이 매번 같은 순서로
   * 나온다 (2단계 복습이 문제 id 를 추적하므로 이게 낫다).
   */
  private spreadBySubject<T>(items: T[]): T[] {
    const pending = [...items];
    const out: T[] = [];
    let lastKey = '';

    while (pending.length) {
      let index = 0;
      const headKey = this.subjectKeyOf(pending[0]);
      if (headKey && headKey === lastKey) {
        // 바로 앞과 같은 대상이다. 뒤에서 다른 대상을 하나 당겨온다
        const alternative = pending.findIndex(
          (item, i) => i > 0 && this.subjectKeyOf(item) !== lastKey,
        );
        if (alternative > 0) index = alternative;
      }
      const [picked] = pending.splice(index, 1);
      out.push(picked);
      lastKey = this.subjectKeyOf(picked);
    }
    return out;
  }

  /**
   * 노드에 붙일 아이콘.
   *
   * 지금까지 모든 노드가 별 하나였다. 로드맵을 내려가도 전부 같은 모양이라
   * 무엇을 배우는 자리인지 구분이 안 됐다.
   *
   * 노드가 들고 있는 레슨의 카테고리에서 유도한다 — 로드맵을 만들 때 레슨을
   * 이미 전부 읽어두므로 추가 조회가 없다. 유닛의 마지막 노드는 내용과 무관하게
   * 깃발을 준다. 한 유닛이 어디서 끝나는지 눈으로 보이는 게 낫다.
   */
  private nodeIconFor(
    categories: (string | undefined)[],
    isLastInUnit: boolean,
  ): string {
    if (isLastInUnit) return 'flag';

    const count = new Map<string, number>();
    for (const category of categories) {
      if (!category) continue;
      count.set(category, (count.get(category) ?? 0) + 1);
    }
    const dominant = [...count.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];

    switch (dominant) {
      case LessonCategory.LISTENING:
        return 'headset';
      case LessonCategory.CONVERSATION:
        return 'chatbubbles';
      case LessonCategory.GRAMMAR:
        return 'construct';
      case LessonCategory.EXPRESSION:
        return 'sparkles';
      case LessonCategory.TOPIK:
        return 'school';
      default:
        return 'book';
    }
  }

  // 레슨 상세 + 문제들 (lessonId로 조회)
  public async getLessonById(lessonId: string, lang: string = 'uz') {
    const lesson = await this.lessonModel.findById(lessonId).lean();
    if (!lesson) throw new NotFoundException('레슨을 찾을 수 없습니다');

    const questions = await this.questionModel
      .find({ _id: { $in: lesson.questionIds }, isActive: true })
      .lean();

    const questionMap = new Map(questions.map((q) => [q._id.toString(), q]));
    const ordered = lesson.questionIds
      .map((id) => questionMap.get(id.toString()))
      .filter(Boolean);
    // 시드에는 한 단어의 여러 유형이 몰려 있다(그림→연결→빈칸→말하기).
    // 그대로 내보내면 같은 단어를 네 번 연속으로 묻는 꼴이 된다.
    const sortedQuestions = this.spreadBySubject(ordered).map((q) =>
      this.formatQuestion(q, lang),
    );

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
    // correctAnswers / combo 는 클라가 보내는 값이라 상한을 둔다. 레슨이 실제로
    // 가진 문제 수의 2배(본풀이 + 복습 라운드)까지만 인정한다.
    const answerCap = Math.min(
      MAX_SESSION_ANSWERS,
      Math.max(1, lessonQuestionIdSet.size * 2),
    );
    const correctAnswers = clampCount(dto.correctAnswers, answerCap);
    const totalAnswers = clampCount(dto.totalAnswers, answerCap);
    const combo = clampCount(dto.combo, correctAnswers);

    const baseXp = await this.resolveLessonBaseXp(lesson);
    const xpEarned = calcLessonXp(baseXp, combo, correctAnswers);

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
        correctAnswers,
        totalAnswers,
        combo,
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

        // 보석을 바로 넣지 않고 **받아갈 상자로 쌓아둔다.**
        // 총량은 그대로고 주는 시점만 옮긴 것이다 — 예전에는 알림 하나 뜨고
        // 끝이라 유저가 보상을 받았다는 걸 거의 몰랐다.
        await this.chestService.earn(userId, node._id.toString(), {
          section: node.section ?? 1,
          perfect,
        });
        // 같은 노드로 두 번 벌지 않게 하는 기존 표식은 그대로 쓴다
        await this.userModel.findByIdAndUpdate(userId, {
          $addToSet: { openedChests: node._id },
        });

        // ⚠️ chest 는 null 로 둔다.
        //
        // 레슨 완료 화면은 이 값이 있으면 곧바로 상자 열기 화면으로 넘어간다.
        // 이제 보석은 여기서 안 주고 로드맵의 상자에서 받으므로, 값을 채우면
        // **0개짜리 상자가 열린다.** 보상은 로드맵 상자 하나에서만 나온다.

        await this.notifications
          .create(userId, NotificationType.CHEST, {
            params: { grade: 'pending', gems: 0 },
            link: '/roadmap',
          })
          .catch(() => {});
      }
    }

    // ── 유닛을 통째로 끝냈나 → 스코어가 오르는 순간 ──
    //
    // 스코어는 완주한 유닛 수라서 유닛 하나를 다 끝내야 1 오른다. 그런데 그
    // 순간을 아무도 알려주지 않아서, 유저는 숫자가 언제 왜 올랐는지 몰랐다.
    // 여기서 잡아 화면이 축하하게 한다.
    const unitCompleted = node
      ? await this.checkUnitCompleted(userId, node.section, node.unit)
      : null;

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
      /** 이 레슨으로 유닛을 통째로 끝냈으면 채워진다. 스코어가 오른 순간이다 */
      unitCompleted,
    };
  }

  /**
   * 방금 이 유닛을 통째로 끝냈는지.
   *
   * "끝냈다" 판정은 로드맵·스코어와 같은 규칙이어야 한다 — 그 유닛의 모든
   * 노드의 모든 레슨이 완료. 여기만 다르게 세면 축하는 떴는데 숫자는 그대로인
   * 일이 생긴다.
   *
   * 돌려주는 score 는 갱신된 전체 스코어라 화면이 "N 이 됐다" 를 바로 띄운다.
   */
  private async checkUnitCompleted(
    userId: string,
    section: number,
    unit: number,
  ): Promise<{ section: number; unit: number; score: number } | null> {
    const uId = new Types.ObjectId(userId);
    const unitNodes = await this.nodeModel
      .find({ section, unit, isActive: true, nodeType: { $ne: 'chest' } })
      .select('lessonIds')
      .lean();
    if (!unitNodes.length) return null;

    const lessonIds = unitNodes.flatMap((n) => n.lessonIds ?? []);
    if (!lessonIds.length) return null;

    const done = await this.userProgressModel.countDocuments({
      userId: uId,
      lessonId: { $in: lessonIds },
      isCompleted: true,
    });
    if (done < lessonIds.length) return null;

    // 스코어 계산기를 그대로 쓴다. 화면에 띄울 숫자가 헤더·드롭다운과 같아야 한다
    const score = await this.getScore(userId);
    return { section, unit, score: score.score };
  }

  /**
   * 레슨의 기본 XP.
   *
   * 정상 경로에서는 시드가 `lesson.xpReward` 를 채워준다. 그런데 이 값이
   * 0 이거나 없으면 calcLessonXp 의 기본값이 그대로 0 이 되어 **XP 가
   * 콤보 보너스만 남는다.** 아무 에러도 안 나서 눈치채기 어렵다.
   *
   * 문제마다 자기 xpReward 를 들고 있으므로 그걸 합쳐 되살리고, 경고를 남겨
   * 어떤 레슨이 그런 상태인지 로그로 드러낸다.
   */
  private async resolveLessonBaseXp(lesson: {
    _id: any;
    code?: string;
    xpReward?: number;
    questionIds?: any[];
  }): Promise<number> {
    if ((lesson.xpReward ?? 0) > 0) return lesson.xpReward as number;

    const ids = lesson.questionIds ?? [];
    if (!ids.length) return 0;

    const rows = await this.questionModel
      .find({ _id: { $in: ids } })
      .select('xpReward')
      .lean();
    const base = rows.reduce((sum, q) => sum + (q.xpReward ?? 0), 0);

    this.logger.warn(
      `레슨 ${lesson.code ?? lesson._id} 의 xpReward 가 0 이다 — ` +
        `문제 ${rows.length}개 합계 ${base} 로 대체했다. 시드를 다시 돌려라.`,
    );
    return base;
  }

  /**
   * 복습 · 단어연습 등 레슨이 아닌 학습 완료 처리.
   * XP 는 서버가 모드로 결정하고(클라 값 무시), 통계는 실제 푼 문제 기준으로 남긴다.
   */
  async completePractice(userId: string, dto: CompletePracticeDto) {
    // 중복 제거 + 상한. 유효한 ObjectId 를 수만 개 만들어 보내면 콤보 보너스가
    // 그만큼 늘어나는 구멍이 있었다.
    const ids = [
      ...new Set(
        (dto.questionIds ?? []).filter((id) => Types.ObjectId.isValid(id)),
      ),
    ].slice(0, MAX_SESSION_ANSWERS);
    const wrong = new Set(dto.wrongQuestionIds ?? []).size;
    const correct = Math.max(0, ids.length - wrong);
    const combo = clampCount(dto.combo, correct);
    const xp = calcPracticeXp(dto.mode, combo, correct);

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

    // 하루 경계는 **이 유저의 시간대** 로 자른다. 서버 로컬(KST) 로 자르면
    // 타슈켄트 유저가 저녁 8시 이후에 푼 문제가 다음 날 기록으로 넘어간다.
    const today = startOfDay(new Date(), await this.usersService.getTimezone(userId));

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

    // 오답 장부는 모드와 무관하게 여기 한 곳에서 갱신한다
    await this.recordMistakes(
      userId,
      params.questionIds ?? [],
      params.wrongQuestionIds ?? [],
    );
  }

  /**
   * 틀린 문제 장부 갱신.
   *
   * 레슨을 거치지 않는 모드(학습 로드의 유닛 문제 등)도 오답이 남아야
   * 복습·마무리가 "틀린 것부터" 뽑을 수 있다. 그래서 lessonId 없이
   * userId × questionId 로만 기록한다.
   */
  private async recordMistakes(
    userId: string,
    questionIds: Types.ObjectId[],
    wrongIds: string[],
  ) {
    if (!questionIds.length) return;

    const user = new Types.ObjectId(userId);
    const now = new Date();
    const wrong = new Set(wrongIds.map(String));

    const ops = questionIds.map((questionId) => {
      if (wrong.has(questionId.toString())) {
        return {
          updateOne: {
            filter: { userId: user, questionId },
            update: {
              $inc: { wrongCount: 1 },
              // 다시 틀렸으면 연속 정답은 처음부터. 해소도 취소한다
              $set: { streak: 0, lastWrongAt: now, resolvedAt: null },
            },
            upsert: true,
          },
        };
      }

      // 맞힌 문제는 장부에 이미 있을 때만 손댄다. 한 번도 안 틀린 문제를
      // 새로 만들면 장부가 전체 문제 수만큼 커진다.
      return {
        updateOne: {
          filter: { userId: user, questionId, resolvedAt: null },
          update: { $inc: { streak: 1 } },
        },
      };
    });

    await this.userMistakeModel.bulkWrite(ops as any, { ordered: false });

    // 연속 두 번 맞히면 해소. 한 번으로 지우면 요행이 걸러지지 않는다
    await this.userMistakeModel.updateMany(
      {
        userId: user,
        resolvedAt: null,
        streak: { $gte: MISTAKE_RESOLVE_STREAK },
      },
      { $set: { resolvedAt: now } },
    );
  }

  /**
   * 아직 해소되지 않은 오답 문제 id. 최근에 틀린 순.
   * scope 를 주면 그 문제들 안에서만 찾는다.
   */
  private async openMistakeIds(
    userId: string,
    scope: Types.ObjectId[] | null,
    limit: number,
  ): Promise<string[]> {
    const filter: Record<string, any> = {
      userId: new Types.ObjectId(userId),
      resolvedAt: null,
    };
    if (scope) {
      if (!scope.length) return [];
      filter.questionId = { $in: scope };
    }

    const rows = await this.userMistakeModel
      .find(filter)
      .select('questionId')
      .sort({ lastWrongAt: -1 })
      .limit(limit)
      .lean();

    return rows.map((row: any) => row.questionId.toString());
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

    // 밴드 안에서 랜덤 추출 후 쉬운→어려운 정렬.
    // 문법 트랙 전용 타입은 뺀다 — 그 문제들은 "지금 연습 중인 문법"이라는
    // 맥락 위에서만 말이 되는데, 레벨 테스트에는 그 맥락이 없다.
    // 처음 앱을 연 사람이 첫 화면에서 문법 드릴을 만나게 된다.
    const questions = await this.questionModel.aggregate([
      {
        $match: {
          level: { $in: levels },
          isActive: true,
          type: {
            $nin: [QuestionType.GRAMMAR_BLANK, QuestionType.GRAMMAR_BUILD],
          },
        },
      },
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
    /**
     * 급수(=섹션 두 개) 전체를 한 번에 내려준다. 학습 로드 모드용.
     * 자율 로드맵은 현재 섹션만 보여주고 "다음 섹션 잠김" 카드로 막지만,
     * 학습 로드는 순서대로 쭉 가는 게 전부라 중간에 벽이 서면 안 된다.
     */
    wholeLevel = false,
    /**
     * 이미 지나온 섹션을 다시 펼쳐 볼 때 그 섹션 번호. 섹션 목록에서 완료한
     * 섹션을 누르면 온다. **현재 섹션보다 뒤는 무시한다** — 이 값으로 아직
     * 안 연 섹션을 열 수 있으면 점프 테스트가 무의미해진다.
     */
    viewSection?: number,
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

    // 카테고리 필터.
    //
    // 예전에는 어휘일 때 필터를 아예 안 걸었다 ("기존 전체 로드맵"). 그때는 노드가
    // 어휘밖에 없어서 문제가 없었는데, 문법 트랙을 시딩한 뒤로 그 노드까지 어휘
    // 로드맵에 딸려 들어왔다. 자유 학습 → 어휘로 들어가면 문법 빈칸 문제가 나온다.
    //
    // 어휘 트랙 = category 가 없는 옛 노드 + 명시적으로 vocabulary 인 노드.
    // (node.schema 주석: "미지정 = 기존 메인(어휘) 트랙")
    const nodeFilter: Record<string, any> = { isActive: true };
    if (category && category !== 'vocabulary') {
      nodeFilter.category = category;
    } else {
      nodeFilter.$or = [
        { category: { $exists: false } },
        { category: null },
        { category: LessonCategory.VOCABULARY },
      ];
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
      const nodeCategories = node.lessonIds.map(
        (lid) => lessonMap.get(lid.toString())?.category as string | undefined,
      );

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
        // type 은 'star' 로 둔다 — 화면이 이 값으로 현재 노드 애니메이션을
        // 고르기 때문이다. 생김새는 iconName 으로만 바꾼다.
        type: 'star',
        status: 'locked',
        title: this.extractI18n(node.title, lang),
        // 마지막 노드 판정은 유닛을 다 모은 뒤에 한다 (여기선 아직 모른다)
        iconName: this.nodeIconFor(nodeCategories, false),
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

    units.forEach((unit: any, index: number) => {
      // 스코어 노드에 쓸 **전역 순번**.
      //
      // 예전에는 화면이 unit.unitNumber 를 그대로 썼는데, 유닛 번호는 섹션마다
      // 1 부터 다시 시작한다. 그래서 다음 섹션으로 넘어가면 스코어가 1 로
      // 되돌아갔다 — "계속 1 만 유지" 로 보이던 게 이것이다.
      // 노드 순서대로 쌓은 배열이라 여기 index 가 곧 전체 진도다.
      unit.scoreValue = index + 1;

      // 유닛의 마지막 노드는 깃발. 어디서 한 유닛이 끝나는지 눈에 보여야 한다
      const last = unit.nodes[unit.nodes.length - 1];
      if (last && last.type === 'star') last.iconName = 'flag';
    });

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

    const [levelStart, levelEnd] = sectionRangeForLevel(
      meUser?.placementLevel ?? 1,
    );
    // 지나온 섹션 다시보기. 현재 섹션 이하이고 실제로 유닛이 있을 때만 받아준다
    const canView =
      !wholeLevel &&
      !!viewSection &&
      viewSection <= currentSection &&
      units.some((u: any) => u.sectionNumber === viewSection);
    const shownSection = canView ? (viewSection as number) : currentSection;
    const isPastSection = shownSection < currentSection;

    const sectionUnits = units.filter((u: any) =>
      wholeLevel
        ? u.sectionNumber >= levelStart && u.sectionNumber <= levelEnd
        : u.sectionNumber === shownSection,
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
      // 안 받은 상자가 있으면 화면이 상자 노드를 빛나게 한다
      pendingChests: await this.chestService.pendingCount(userId),
      currentSection,
      /** 지금 화면이 그리고 있는 섹션 (다시보기면 과거 섹션) */
      viewingSection: shownSection,
      /** 지나온 섹션을 펼쳐 본 상태 — 화면이 "현재 위치로" 버튼을 띄운다 */
      isPastSection,
      // 지난 섹션을 보고 있을 때 "다음 섹션 잠김" 카드를 띄우면
      // 이미 연 섹션을 또 잠긴 것처럼 안내하게 된다
      nextSection: isPastSection
        ? null
        : nextMeta
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
    // 장부에서 읽는다. UserProgress 를 훑던 시절엔 레슨을 거치지 않는 모드
    // (학습 로드의 유닛 문제 등)에서 틀린 게 오답 노트에 안 잡혔다.
    const ids = await this.openMistakeIds(userId, null, MISTAKE_NOTE_LIMIT);

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

    // 오답 노트에서 맞힌 것들은 그 자리에서 해소로 본다. 노트는 유저가
    // 의식하고 다시 푸는 자리라 연속 두 번을 기다릴 필요가 없다.
    const now = new Date();
    await this.userMistakeModel.updateMany(
      {
        userId: new Types.ObjectId(userId),
        questionId: { $in: validIds.map((id) => new Types.ObjectId(id)) },
        resolvedAt: null,
      },
      { $set: { resolvedAt: now, streak: MISTAKE_RESOLVE_STREAK } },
    );

    return { removed: validIds.length };
  }

  // 복습용: 틀린 문제 전체 (실제로 풀 수 있는 형태)
  async getMistakeQuestions(userId: string, lang: string = 'uz') {
    const ids = await this.openMistakeIds(userId, null, MISTAKE_NOTE_LIMIT);
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

    const today = startOfDay(new Date(), await this.usersService.getTimezone(userId));
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
    group = 1,
    lesson = 1,
  ) {
    if (kind === 'review') {
      return this.getCatchUpReview(userId, section, unit, lang);
    }
    if (kind === 'recap') {
      return this.getUnitRecap(userId, section, unit, lang);
    }
    if (kind === 'final') {
      return this.getUnitFinal(userId, section, unit, lang);
    }

    const track = kind === 'grammarQuiz' ? 'grammar' : 'vocabulary';
    const all = await this.collectUnitQuestions(section, unit, track);
    if (!all.length) return { questions: [] };

    // 어휘는 유닛 전체를 100문제짜리 노드로 나눠 가진다. 그 노드 몫을 먼저
    // 떼고, 그 안에서 다시 링 단위로 자른다.
    let pool = all;
    if (kind === 'vocabQuiz') {
      const nodes = vocabNodeCount(all.length);
      const index = Math.min(Math.max(1, group), nodes) - 1;
      const { start, end } = lessonSlice(all.length, nodes, index);
      pool = all.slice(start, end);
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
   * 급수 졸업 시험 문제.
   *
   * 그 급이 맡은 두 섹션 전체에서 뽑는다. 어려운 문제를 앞에 두되 어휘·문법을
   * 섞는다 — 한 영역만 나오면 실력을 확인하는 게 아니라 운을 보는 게 된다.
   */
  async getLevelExam(sections: number[], lang = 'uz', limit = 25) {
    const pool = await this.collectSectionQuestions(sections);
    if (!pool.length) return { questions: [] };

    const hard = pool.filter(
      (q: any) => (q.difficulty ?? 3) >= UNIT_FINAL_MIN_DIFFICULTY,
    );
    const picked = this.pickBalanced(hard.length >= limit ? hard : pool, limit);

    return { questions: picked.map((q) => this.formatQuestion(q, lang)) };
  }

  /** 섹션 여러 개의 모든 문제. 유닛마다 따로 물으면 쿼리가 유닛 수만큼 늘어난다 */
  private async collectSectionQuestions(sections: number[]) {
    if (!sections.length) return [];

    const nodes = await this.nodeModel
      .find({ section: { $in: sections }, isActive: true })
      .select('lessonIds')
      .lean();
    if (!nodes.length) return [];

    const lessons = await this.lessonModel
      .find({ _id: { $in: nodes.flatMap((n) => n.lessonIds ?? []) } })
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

    return this.dedupeByContent(questions);
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

    const scope = await this.previousUnits(section, unit, span);
    if (!scope.length) return { questions: [] };

    // 되돌아볼 구간의 문제를 먼저 모으고, 그 안에서 오답을 앞에 세운다
    const pool: any[] = [];
    for (const target of scope) {
      pool.push(
        ...(await this.collectUnitQuestions(
          target.section,
          target.unit,
          'vocabulary',
        )),
      );
    }
    if (!pool.length) return { questions: [] };

    const picked = await this.mistakesFirst(userId, pool, limit);
    return { questions: picked.map((q) => this.formatQuestion(q, lang)) };
  }

  /**
   * 아직 못 맞힌 문제를 앞에 세우고, 모자라면 그 구간 문제로 채운다.
   * 복습 계열 노드가 공통으로 쓰는 규칙 — 비워두면 하루 흐름이 끊긴다.
   */
  private async mistakesFirst(userId: string, pool: any[], limit: number) {
    const byId = new Map(pool.map((q: any) => [q._id.toString(), q]));
    const openIds = await this.openMistakeIds(
      userId,
      pool.map((q: any) => q._id),
      limit,
    );

    const picked: any[] = [];
    const seen = new Set<string>();
    for (const id of openIds) {
      const q = byId.get(id);
      if (!q || seen.has(id)) continue;
      seen.add(id);
      picked.push(q);
    }

    if (picked.length < limit) {
      const rest = pool.filter((q: any) => !seen.has(q._id.toString()));
      for (const q of this.pickBalanced(rest, limit)) {
        if (picked.length >= limit) break;
        picked.push(q);
      }
    }

    return picked.slice(0, limit);
  }

  /**
   * 2일차 첫 노드 — 어제(1일차) 배운 것 되짚기.
   * 그 유닛에서 틀렸던 문제를 먼저 채우고, 모자라면 유닛 앞쪽 어휘 문제로
   * 채운다. 어제 배운 걸 다시 만나는 게 목적이라 새 문제만 주면 안 된다.
   */
  private async getUnitRecap(
    userId: string,
    section: number,
    unit: number,
    lang: string,
  ) {
    const limit = STUDY_QUIZ_SIZE.review;
    const all = await this.collectUnitQuestions(section, unit, 'vocabulary');
    if (!all.length) return { questions: [] };

    // 1일차가 맡은 앞쪽 구간에서만 고른다 — 아직 안 본 뒤쪽을 미리 보여주지 않게
    const pool = all.slice(0, Math.ceil(all.length / 2));
    const picked = await this.mistakesFirst(userId, pool, limit);

    return { questions: picked.map((q) => this.formatQuestion(q, lang)) };
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

    const picked = await this.mistakesFirst(userId, pool, limit);
    return { questions: picked.map((q) => this.formatQuestion(q, lang)) };
  }

  /**
   * (섹션, 유닛) 바로 앞의 유닛 span 개.
   *
   * 섹션 경계를 넘어서도 이어진다. 학습 로드는 급수 전체를 한 흐름으로 보는데
   * 섹션 첫날에서 복습이 끊기면 그 앞이 통째로 날아간 채로 진도가 나간다.
   * 이전 섹션의 마지막 유닛 번호는 알 수 없으므로 노드에서 찾는다.
   */
  private async previousUnits(section: number, unit: number, span: number) {
    if (span <= 0) return [];

    const rows = await this.nodeModel
      .find({
        isActive: true,
        $or: [{ section: { $lt: section } }, { section, unit: { $lt: unit } }],
      })
      .select('section unit')
      .sort({ section: -1, unit: -1 })
      .lean();

    const scope: { section: number; unit: number }[] = [];
    const seen = new Set<string>();
    for (const row of rows as any[]) {
      const key = `${row.section}-${row.unit}`;
      if (seen.has(key)) continue;
      seen.add(key);
      scope.push({ section: row.section, unit: row.unit });
      if (scope.length >= span) break;
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

  // 유닛 점프 테스트 문제 뽑기 (targetUnit 직전까지 레슨 문제 중 25개)
  /** 점프 테스트에서 틀려도 되는 개수. 서버가 정한다 (클라가 못 바꾸게) */
  private jumpHeartLimit(targetSection: number): number {
    return targetSection >= 2 ? 3 : 5;
  }

  async getUnitJumpTest(
    userId: string,
    targetSection: number,
    targetUnit: number,
    lang = 'uz',
    categoryValue?: string,
    limit = 25,
  ) {
    const category = normalizeJumpTestCategory(categoryValue);
    if (!category) {
      throw new BadRequestException('INVALID_JUMP_CATEGORY');
    }

    // 목표 지점 "이전"의 같은 트랙 노드만 조회한다.
    const nodes = await this.nodeModel
      .find(buildJumpNodeFilter(targetSection, targetUnit, category))
      .select('lessonIds')
      .lean();

    if (!nodes.length) return { attemptId: null, questions: [] };

    const lessonIds = nodes.flatMap((n) => n.lessonIds ?? []);
    const lessons = await this.lessonModel
      .find({ _id: { $in: lessonIds } })
      .select('questionIds')
      .lean();

    const qIds = new Set<string>();
    lessons.forEach((l) =>
      (l.questionIds ?? []).forEach((q: any) => qIds.add(q.toString())),
    );
    if (!qIds.size) return { attemptId: null, questions: [] };

    // 어휘 점프는 문법을 제외하고, 문법 점프는 전용 문법 유형만 포함한다.
    const questions = await this.questionModel
      .find(
        buildJumpQuestionFilter(
          [...qIds].map((id) => new Types.ObjectId(id)),
          category,
        ),
      )
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

    // 섞은 뒤에도 같은 단어가 붙어 나올 수 있다. 한 번 더 벌려준다
    const shuffled = this.spreadBySubject(
      unique.sort(() => Math.random() - 0.5),
    ).slice(0, limit);

    // 어떤 범위로, 어떤 문제를, 몇 개까지 틀려도 되는 조건으로 냈는지 서버가 기억한다.
    // 완료 요청은 오직 이 기록을 근거로만 처리된다.
    const heartLimit = this.jumpHeartLimit(targetSection);
    const attempt = await this.jumpAttemptModel.create({
      userId: new Types.ObjectId(userId),
      section: targetSection,
      unit: targetUnit,
      category,
      questionIds: shuffled.map((q: any) => q._id),
      heartLimit,
      status: 'open',
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2시간
    });

    return {
      attemptId: attempt._id.toString(),
      heartLimit,
      questions: shuffled.map((q) => this.formatQuestion(q, lang)),
    };
  }

  // 점프 통과 → 사이 레슨 전부 완료 처리 (XP 없이)
  /**
   * 점프 테스트 완료 처리.
   *
   * 범위(section/unit)와 합격 기준은 요청이 아니라 **응시 기록**에서 읽는다.
   * 클라가 보내는 건 "이 문제들을 틀렸다" 뿐이고, 그것도 실제로 내준 문제
   * 목록과 교집합만 인정한다. 합격 여부는 서버가 계산한다.
   */
  async completeUnitJump(
    userId: string,
    attemptId: string,
    wrongQuestionIds: string[],
  ) {
    if (!Types.ObjectId.isValid(attemptId)) {
      throw new BadRequestException('INVALID_ATTEMPT');
    }

    // open 인 응시를 원자적으로 집는다. 동시에 두 번 불러도 한 번만 통과한다.
    const attempt = await this.jumpAttemptModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(attemptId),
        userId: new Types.ObjectId(userId),
        status: 'open',
        expiresAt: { $gt: new Date() },
      },
      { $set: { status: 'failed' } }, // 일단 닫고, 통과면 아래서 되돌린다
      { returnDocument: 'after' },
    );
    if (!attempt) throw new BadRequestException('ATTEMPT_NOT_FOUND_OR_USED');

    // 실제로 내준 문제만 오답으로 인정. 없는 id 를 채워 보내도 소용없고,
    // 반대로 오답을 숨기면 자기 손해라 굳이 막을 이유가 없다.
    const issued = new Set(attempt.questionIds.map((id) => id.toString()));
    const wrong = new Set(
      (wrongQuestionIds ?? []).map(String).filter((id) => issued.has(id)),
    );
    const wrongCount = wrong.size;
    const passed = wrongCount < attempt.heartLimit;

    attempt.wrongCount = wrongCount;
    attempt.status = passed ? 'passed' : 'failed';
    await attempt.save();

    if (!passed) {
      return { passed: false, wrongCount, heartLimit: attempt.heartLimit, completed: 0 };
    }

    const result = await this.applyUnitJump(
      userId,
      attempt.section,
      attempt.unit,
      normalizeJumpTestCategory(attempt.category) ?? 'vocabulary',
    );
    return {
      passed: true,
      wrongCount,
      heartLimit: attempt.heartLimit,
      // 무엇이 열렸는지 화면이 정확히 말할 수 있게 범위를 같이 준다.
      // 예전에는 unit 만 넘겨서, 섹션을 통째로 건너뛰어도 "유닛 1 잠금 해제"
      // 라고 떴다 — 열린 건 섹션인데 유닛 하나로 안내한 것이다.
      section: attempt.section,
      unit: attempt.unit,
      ...result,
    };
  }

  /** 실제 진도 반영. 합격이 확인된 뒤에만 불린다 */
  private async applyUnitJump(
    userId: string,
    targetSection: number,
    targetUnit: number,
    category: JumpTestCategory,
  ) {
    const nodes = await this.nodeModel
      .find(buildJumpNodeFilter(targetSection, targetUnit, category))
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

  /**
   * 자유 학습(로드맵) 스코어.
   *
   * ⚠️ 학습 로드 모드 스코어(/study-path/score)와 **다른 값이다.** 두 모드는
   * 진도를 각각 다른 곳에 쌓는다 — 자유는 레슨 완료(UserProgress), 로드는
   * 하루 노드 완료(user.completedStudyNodes). 예전에는 두 화면이 이걸 같이
   * 불러서 같은 숫자가 떴다.
   */
  async getScore(userId: string, lang = 'uz') {
    const uId = new Types.ObjectId(userId);

    // 자유 학습 로드맵이 보여주는 노드와 같은 범위로 센다.
    // 예전에는 문법 트랙 노드까지 전부 셌는데, 그러면 화면에 보이지도 않는
    // 진도가 숫자에 섞인다 (로드맵 노드 필터와 같은 조건이다).
    const nodes = await this.nodeModel
      .find({
        isActive: true,
        nodeType: { $ne: 'chest' },
        $or: [
          { category: { $exists: false } },
          { category: null },
          { category: LessonCategory.VOCABULARY },
        ],
      })
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

    // 배치로 건너뛴 구간은 완주로 본다.
    //
    // 로드맵(getRoadmap)이 이미 그렇게 세고 있어서, 여기만 다르게 세면
    // **헤더 숫자와 드롭다운 숫자가 서로 달라진다.** 3급으로 배치받은 사람이
    // 헤더는 12, 드롭다운은 0 을 보는 식이다. 세는 규칙은 한 벌이어야 한다.
    const me = await this.userModel
      .findById(uId)
      .select('placementLevel')
      .lean();
    const startSection = sectionRangeForLevel(me?.placementLevel ?? 1)[0];

    // 유닛 완주 판정 = 그 유닛의 모든 노드의 모든 레슨 완료
    let completedUnits = 0;
    const sectionUnits = new Map<number, number>();
    /** 섹션별 첫 유닛 번호. 잠긴 섹션으로 점프할 때 목표가 된다 */
    const sectionFirstUnit = new Map<number, number>();

    for (const [key, u] of unitMap) {
      sectionUnits.set(u.section, (sectionUnits.get(u.section) ?? 0) + 1);
      const unitNumber = Number(key.split('-')[1]);
      const known = sectionFirstUnit.get(u.section);
      if (known === undefined || unitNumber < known) {
        sectionFirstUnit.set(u.section, unitNumber);
      }

      const allDone =
        u.section < startSection ||
        u.nodes.every((n) => {
          const ids = (n.lessonIds ?? []).map((x: any) => x.toString());
          return ids.length > 0 && ids.every((id) => doneSet.has(id));
        });
      if (allDone) completedUnits++;
    }

    // 섹션별 유닛 수 → 마일스톤 (섹션 늘어나면 자동 확장)
    const milestones = buildMilestones(
      [...sectionUnits.entries()].map(([section, units]) => ({
        section,
        units,
        title: pickSectionText(getSectionMeta(section).title, lang),
        firstUnit: sectionFirstUnit.get(section) ?? 1,
      })),
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
