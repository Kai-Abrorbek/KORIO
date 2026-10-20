import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  resolveCourseScope,
  type CourseScope,
} from '../common/learning-course';
import { LessonsService } from '../lessons/lessons.service';
import { StudyPathService } from '../study-path/study-path.service';
import { ExpressionRoadmapService } from '../expressions/roadmap/expression-roadmap.service';
import {
  ExpressionPack,
  ExpressionPackDocument,
  type ExpressionLanguage,
  type LocalizedExpressionText,
} from '../expressions/schemas/expression-pack.schema';
import {
  Expression,
  ExpressionDocument,
} from '../expressions/schemas/expression.schema';
import {
  UserSpeakingProgress,
  UserSpeakingProgressDocument,
} from '../expressions/schemas/user-speaking-progress.schema';
import { Grammar, GrammarDocument } from '../grammer/schemas/grammar.schema';
import {
  ReadingLesson,
  ReadingLessonDocument,
} from '../reading-lessons/schemas/reading-lesson.schema';
import {
  ReadingLessonProgress,
  ReadingLessonProgressDocument,
} from '../reading-lessons/schemas/reading-lesson-progress.schema';
import {
  TopikExam,
  TopikExamDocument,
} from '../topik/schemas/topik-exam.schema';
import {
  TopikAttempt,
  TopikAttemptDocument,
  TopikAttemptStatus,
} from '../topik/schemas/topik-attempt.schema';
import {
  TopikExamType,
  TopikPublishStatus,
} from '../topik/schemas/topik-content.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  courseHasMode,
  courseOf,
  type LearnCourse,
  type LearnMode,
  type StudyMode,
  type TopikLevel,
} from '../users/learn-mode.constants';
import type { LearnMeasure, LearnProgress } from './learn-progress.types';
import {
  measure,
  pickExpressionTopic,
  pickGrammarSection,
  speakingDone,
  sumRoadmapLessons,
} from './learn-progress.util';

interface Ctx {
  courseScope: CourseScope;
  userId: string;
  oid: Types.ObjectId;
  lang: ExpressionLanguage;
  studyMode: StudyMode;
  topikLevel: TopikLevel;
  completedGrammar: string[];
}

type Provider = (ctx: Ctx) => Promise<LearnMeasure | null>;

export interface LearnProgressQuery {
  courseId?: string;
  targetLanguage?: string;
  course?: LearnCourse;
  mode?: LearnMode;
  studyMode?: StudyMode;
  topikLevel?: TopikLevel;
  lang?: ExpressionLanguage;
}

/**
 * 홈 카드의 진행도. 지금 코스·모드에서 **그 모드 화면이 보여 주는 범위**를 기준으로 센다.
 *
 * 예전에는 모드와 상관없이 모든 로드맵 노드(어휘+문법 트랙이 한데 섞인 채, 비활성까지)를
 * 섹션-유닛으로 묶어 "첫 미완료 유닛" 비율을 줬다. 그래서 표현을 공부해도 어휘 유닛 숫자가 떴고,
 * 유닛이 바뀔 때마다 0 으로 떨어졌다.
 *
 * 범위를 섹션·급·주제로 잡은 이유: 코스 전체로 세면 하루에 1~2% 씩밖에 안 움직이고,
 * 유닛으로 세면 너무 자주 0 으로 돌아간다. 각 모드 화면이 한 번에 보여 주는 덩어리와 맞춘다.
 *
 * 새 코스·모드는 providers 표에 한 줄 붙이면 된다. 없는 칸은 null (홈이 링 대신 아이콘을 그린다).
 */
@Injectable()
export class LearnProgressService {
  private readonly logger = new Logger(LearnProgressService.name);

  private readonly providers: Partial<
    Record<LearnCourse, Partial<Record<LearnMode, Provider>>>
  > = {
    ko: {
      vocabulary: (ctx) =>
        ctx.studyMode === 'guided'
          ? this.studyLevel(ctx)
          : this.roadmapSection(ctx),
      grammarPractice: (ctx) => this.roadmapSection(ctx, 'grammar'),
      grammar: (ctx) => this.grammarSection(ctx),
      expression: (ctx) => this.expressionTopic(ctx),
      speaking: (ctx) => this.speakingTopic(ctx),
      listening: (ctx) => this.readingLevel(ctx),
      topik: (ctx) => this.topikExams(ctx),
      // conversation: AI 튜터와의 대화는 끝이 있는 콘텐츠가 아니라 셀 진도가 없다
    },
    // English vocabulary uses its own free roadmap, never the Korean guided planner.
    en: { vocabulary: (ctx) => this.roadmapSection(ctx) },
  };

  constructor(
    private readonly lessonsService: LessonsService,
    private readonly studyPathService: StudyPathService,
    private readonly expressionRoadmapService: ExpressionRoadmapService,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Grammar.name)
    private readonly grammarModel: Model<GrammarDocument>,
    @InjectModel(ExpressionPack.name)
    private readonly packModel: Model<ExpressionPackDocument>,
    @InjectModel(Expression.name)
    private readonly expressionModel: Model<ExpressionDocument>,
    @InjectModel(UserSpeakingProgress.name)
    private readonly speakingModel: Model<UserSpeakingProgressDocument>,
    @InjectModel(ReadingLesson.name)
    private readonly readingModel: Model<ReadingLessonDocument>,
    @InjectModel(ReadingLessonProgress.name)
    private readonly readingProgressModel: Model<ReadingLessonProgressDocument>,
    @InjectModel(TopikExam.name)
    private readonly examModel: Model<TopikExamDocument>,
    @InjectModel(TopikAttempt.name)
    private readonly attemptModel: Model<TopikAttemptDocument>,
  ) {}

  /**
   * 앱이 지금 화면에 띄운 코스·모드를 같이 보낸다 — 모드를 막 바꾼 직후엔 서버 저장이
   * 뒤따라오는 중일 수 있어서다. 안 보내면 계정에 저장된 값으로 센다.
   */
  async get(
    userId: string,
    query: LearnProgressQuery = {},
  ): Promise<LearnProgress | null> {
    const me = await this.userModel
      .findById(userId)
      .select('targetLanguage learnMode studyMode topikLevel completedGrammar')
      .lean();
    if (!me) return null;

    const courseScope = resolveCourseScope({
      courseId: query.courseId,
      targetLanguage:
        query.targetLanguage ??
        query.course ??
        (query.courseId ? undefined : courseOf(me.targetLanguage)),
    });
    const course = courseScope.targetLanguage as LearnCourse;
    if (query.course && query.course !== course) return null;
    const mode = query.mode ?? me.learnMode ?? 'vocabulary';
    if (!courseHasMode(course, mode)) return null;
    const provider =
      this.providers[course]?.[mode] ??
      (mode === 'vocabulary'
        ? (ctx: Ctx) => this.roadmapSection(ctx)
        : undefined);
    if (!provider) return null;

    const ctx: Ctx = {
      courseScope,
      userId,
      oid: new Types.ObjectId(userId),
      lang: query.lang ?? 'uz',
      studyMode: query.studyMode ?? me.studyMode ?? 'guided',
      topikLevel: query.topikLevel ?? me.topikLevel ?? '1',
      completedGrammar: me.completedGrammar ?? [],
    };

    try {
      const measured = await provider(ctx);
      return measured ? { course, mode, ...measured } : null;
    } catch (error) {
      // 홈 카드 하나 때문에 홈이 깨지면 안 된다 — 링만 빠진다
      this.logger.warn(
        `learn progress failed (${course}/${mode}): ${(error as Error).message}`,
      );
      return null;
    }
  }

  /** 자율 로드맵 — 로드맵 화면이 보여 주는 지금 섹션의 레슨 */
  private async roadmapSection(ctx: Ctx, category?: 'grammar') {
    const roadmap = await this.lessonsService.getRoadmap(
      ctx.userId,
      ctx.lang,
      category,
      false,
      undefined,
      ctx.courseScope,
    );
    const { done, total } = sumRoadmapLessons(roadmap.units ?? []);
    const section = Number(roadmap.currentSection) || 1;
    return measure('section', section, 'lesson', done, total);
  }

  /** 학습 로드 — 지금 급의 하루 (1과 = 이틀). 학습 로드 화면의 스코어와 같은 숫자다 */
  private async studyLevel(ctx: Ctx) {
    const path = await this.studyPathService.getStudyPath(ctx.userId, ctx.lang);
    const days = path.days ?? [];
    const done = days.filter((day) => day.status === 'completed').length;
    return measure('level', path.currentLevel ?? 1, 'day', done, days.length);
  }

  /** 문법 설명 — 마지막으로 공부한 문법이 있는 섹션 */
  private async grammarSection(ctx: Ctx) {
    const rows = await this.grammarModel
      .find({ isActive: true })
      .select('code section')
      .lean();
    const picked = pickGrammarSection(rows, ctx.completedGrammar);
    if (!picked) return null;
    return measure(
      'section',
      picked.section,
      'grammar',
      picked.done,
      picked.total,
    );
  }

  /** 표현 — 이어서 할 노드가 있는 주제 */
  private async expressionTopic(ctx: Ctx) {
    const roadmap = await this.expressionRoadmapService.getRoadmap(
      ctx.userId,
      ctx.lang,
    );
    const topic = pickExpressionTopic(roadmap.topics, roadmap.continueNodeCode);
    if (!topic) return null;
    return measure(
      'topic',
      topic.index + 1,
      'expression',
      topic.learned,
      topic.total,
      {
        title: topic.title,
        percent: topic.percent,
      },
    );
  }

  /** 말하기 — 마지막으로 말한 주제 (없으면 첫 주제) 의 문장 */
  private async speakingTopic(ctx: Ctx) {
    const packs = await this.packModel
      .find({ isActive: true })
      .sort({ order: 1 })
      .select('_id code title')
      .lean();
    if (!packs.length) return null;
    const last = await this.speakingModel
      .findOne({ userId: ctx.oid })
      .sort({ lastSpokenAt: -1, updatedAt: -1 })
      .lean();
    const index = Math.max(
      0,
      packs.findIndex((pack) => pack.code === last?.packCode),
    );
    const pack = packs[index];
    const total = await this.expressionModel.countDocuments({
      packId: pack._id,
      isActive: true,
    });
    const row = last?.packCode === pack.code ? last : null;
    return measure(
      'topic',
      index + 1,
      'sentence',
      speakingDone(row, total),
      total,
      {
        title: localize(pack.title, ctx.lang, pack.code),
      },
    );
  }

  /** 읽기·듣기 — 마지막으로 읽은 급 (없으면 콘텐츠가 있는 첫 급) */
  private async readingLevel(ctx: Ctx) {
    const last = await this.readingProgressModel
      .findOne({ userId: ctx.oid })
      .sort({ updatedAt: -1 })
      .select('level')
      .lean();
    const first = last
      ? null
      : await this.readingModel
          .findOne({ isActive: true })
          .sort({ level: 1 })
          .select('level')
          .lean();
    const level = last?.level ?? first?.level;
    if (!level) return null;
    const lessons = await this.readingModel
      .find({ level, isActive: true })
      .select('code')
      .lean();
    const done = await this.readingProgressModel.countDocuments({
      userId: ctx.oid,
      level,
      lessonCode: { $in: lessons.map((lesson) => lesson.code) },
      completedAt: { $ne: null },
    });
    return measure('level', level, 'reading', done, lessons.length);
  }

  /** TOPIK — 고른 급수(I/II)의 기출 회차 중 한 번이라도 제출한 것 */
  private async topikExams(ctx: Ctx) {
    const examType =
      ctx.topikLevel === '2' ? TopikExamType.TOPIK_II : TopikExamType.TOPIK_I;
    const exams = await this.examModel
      .find({
        examType,
        status: TopikPublishStatus.PUBLISHED,
        isActive: true,
        isQuestionBank: { $ne: true },
      })
      .select('_id')
      .lean();
    if (!exams.length) return null;
    const doneIds = await this.attemptModel.distinct('examId', {
      userId: ctx.oid,
      status: TopikAttemptStatus.SUBMITTED,
      examId: { $in: exams.map((exam) => exam._id) },
    });
    return measure(
      'topik',
      ctx.topikLevel === '2' ? 2 : 1,
      'exam',
      doneIds.length,
      exams.length,
    );
  }
}

function localize(
  value: Partial<LocalizedExpressionText> | undefined,
  lang: ExpressionLanguage,
  fallback: string,
) {
  return (
    value?.[lang] ||
    value?.uz ||
    value?.en ||
    value?.ru ||
    value?.ko ||
    fallback
  );
}
