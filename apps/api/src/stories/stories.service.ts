import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LessonsService } from '../lessons/lessons.service';
import { UsersService } from '../users/users.service';
import { StudyCategory } from '../users/utils/study-category.util';
import { User, UserDocument } from '../users/schemas/user.schema';
import type { CourseScope } from '../common/learning-course';
import { CompleteStoryDto } from './dto/story-query.dto';
import {
  STORY_LISTEN_XP,
  STORY_QUIZ_XP_PER_CORRECT,
  STORY_REPEAT_XP_RATE,
  STORY_SHADOW_XP_PER_SENTENCE,
} from '../lessons/economy.const';
import { STORY_LEVELS, type StoryQueryLanguage } from './stories.const';
import { pickStoryTranslation } from './story-content.util';
import {
  StoryProgress,
  StoryProgressDocument,
} from './schemas/story-progress.schema';
import { Story, StoryDocument } from './schemas/story.schema';

type StoryLean = Story & { _id: Types.ObjectId };
type ProgressLean = StoryProgress & { _id: Types.ObjectId };

const LEVEL_RANK = new Map<string, number>(
  STORY_LEVELS.map((level, index) => [level, index]),
);

/** 레벨 → 순서로 정렬 (A1 1편, A1 2편, … A2 1편 …) */
function byLevelThenOrder(a: StoryLean, b: StoryLean) {
  return (
    (LEVEL_RANK.get(a.level) ?? 99) - (LEVEL_RANK.get(b.level) ?? 99) ||
    a.order - b.order
  );
}

@Injectable()
export class StoriesService {
  private readonly logger = new Logger(StoriesService.name);

  constructor(
    @InjectModel(Story.name)
    private readonly storyModel: Model<StoryDocument>,
    @InjectModel(StoryProgress.name)
    private readonly progressModel: Model<StoryProgressDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly lessonsService: LessonsService,
    private readonly usersService: UsersService,
  ) {}

  /** 코스의 이야기 전부를 레벨별로. 목록은 가볍게 — 본문·타이밍은 안 보낸다 */
  async list(scope: CourseScope, lang: StoryQueryLanguage, userId: string) {
    const [stories, progressRows] = await Promise.all([
      this.storyModel
        .find({ courseId: scope.courseId, isActive: true })
        .select({
          code: 1,
          level: 1,
          order: 1,
          title: 1,
          topic: 1,
          scene: 1,
          narrator: 1,
          audio: 1,
          'sentences.id': 1,
          questions: 1,
        })
        .lean<StoryLean[]>(),
      this.progressModel
        .find({
          userId: new Types.ObjectId(userId),
          courseId: scope.courseId,
        })
        .lean<ProgressLean[]>(),
    ]);
    const progressByCode = new Map(
      progressRows.map((row) => [row.storyCode, row]),
    );
    const sorted = [...stories].sort(byLevelThenOrder);

    return {
      courseId: scope.courseId,
      levels: STORY_LEVELS.map((level) => ({
        level,
        stories: sorted
          .filter((story) => story.level === level)
          .map((story) =>
            this.toSummary(story, lang, progressByCode.get(story.code)),
          ),
      })).filter((group) => group.stories.length > 0),
    };
  }

  /** 한 편 전체. 번역은 요청한 설명 언어 하나만 보낸다 (느린 망에서 3배 아낀다) */
  async getByCode(code: string, lang: StoryQueryLanguage, userId: string) {
    const story = await this.storyModel
      .findOne({ code, isActive: true })
      .lean<StoryLean>();
    if (!story) throw new NotFoundException('STORY_NOT_FOUND');

    const [progress, nextCode] = await Promise.all([
      this.progressModel
        .findOne({ userId: new Types.ObjectId(userId), storyCode: code })
        .lean<ProgressLean>(),
      this.nextStoryCode(story),
    ]);

    return {
      ...this.toSummary(story, lang, progress ?? undefined),
      sentences: story.sentences.map((sentence) => ({
        id: sentence.id,
        text: sentence.text,
        translation: pickStoryTranslation(sentence.translation, lang),
        startMs: sentence.startMs,
        endMs: sentence.endMs,
        words: sentence.words.map((word) => ({
          text: word.text,
          startMs: word.startMs,
          endMs: word.endMs,
        })),
      })),
      vocabulary: story.vocabulary.map((item) => ({
        word: item.word,
        meaning: pickStoryTranslation(item.meaning, lang),
      })),
      questions: story.questions.map((question) => ({
        id: question.id,
        prompt: question.prompt,
        options: question.options,
        answerIndex: question.answerIndex,
      })),
      shadowedSentenceIds: progress?.shadowedSentenceIds ?? [],
      nextCode,
    };
  }

  /**
   * 끝까지 들었다는 보고. 고른 답만 받고 채점·XP 는 서버가 한다.
   * 따라 읽기 XP 는 여기로 안 온다 — 발음 평가 중에 서버가 직접 준다.
   */
  async complete(userId: string, code: string, dto: CompleteStoryDto) {
    const story = await this.storyModel
      .findOne({ code, isActive: true })
      .select('code courseId targetLanguage level order questions')
      .lean<StoryLean>();
    if (!story) throw new NotFoundException('STORY_NOT_FOUND');

    const uId = new Types.ObjectId(userId);
    const before = await this.progressModel
      .findOne({ userId: uId, storyCode: code })
      .lean<ProgressLean>();

    // ── 채점 ──
    const answerByQuestion = new Map<string, number>();
    for (const answer of dto.answers ?? []) {
      answerByQuestion.set(answer.questionId, answer.choiceIndex);
    }
    const quizTotal = story.questions.length;
    const quizCorrect = story.questions.filter(
      (question) => answerByQuestion.get(question.id) === question.answerIndex,
    ).length;
    const answeredCount = story.questions.filter((question) =>
      answerByQuestion.has(question.id),
    ).length;

    // ── XP ── 다시 들을 때는 배율을 깎는다 (0 으로 막지는 않는다 — 다시 듣는 게 듣기 공부다)
    const repeat = (before?.completions ?? 0) > 0;
    const rawXp = STORY_LISTEN_XP + quizCorrect * STORY_QUIZ_XP_PER_CORRECT;
    const xpToAward = repeat ? Math.round(rawXp * STORY_REPEAT_XP_RATE) : rawXp;

    const progress = await this.progressModel.findOneAndUpdate(
      { userId: uId, storyCode: code },
      {
        $setOnInsert: {
          userId: uId,
          storyCode: code,
          courseId: story.courseId,
        },
        $set: {
          bestQuizCorrect: Math.max(before?.bestQuizCorrect ?? 0, quizCorrect),
          quizTotal,
          completedAt: new Date(),
        },
        $inc: { completions: 1, totalXpEarned: xpToAward },
      },
      { upsert: true, returnDocument: 'after' },
    );

    // 통계는 리스닝 버킷. 문제를 건너뛰었으면 "들은 것" 1건으로 센다
    await this.lessonsService
      .recordStudy(userId, {
        targetLanguage: story.targetLanguage,
        questionCount: Math.max(1, answeredCount),
        wrongCount: Math.max(0, answeredCount - quizCorrect),
        overrideCategory: StudyCategory.LISTENING,
      })
      .catch(() => undefined);

    // XP·totalXP·리그는 addXp 가 처리한다 (다른 모드와 같은 경로)
    const xpResult = await this.lessonsService.addXp(userId, xpToAward);

    // 연속 학습일은 오늘 기록이 저장된 뒤에 갱신해야 한다
    await this.usersService.syncStreak(userId).catch(() => undefined);
    await this.userModel
      .updateOne({ _id: uId }, { $set: { lastStudiedAt: new Date() } })
      .catch(() => undefined);

    this.logger.log(
      `이야기 완료: user=${userId} code=${code} quiz=${quizCorrect}/${quizTotal} ` +
        `xp=${xpToAward}${repeat ? ' (다시 듣기)' : ''}`,
    );

    return {
      success: true,
      xpEarned: xpResult.added,
      totalXP: xpResult.totalXP,
      quizCorrect,
      quizTotal,
      repeat,
      completions: progress?.completions ?? 1,
      nextCode: await this.nextStoryCode(story),
    };
  }

  /** 따라 읽기 평가가 참조 문장을 찾는다. 문장은 클라가 아니라 DB 가 정한다 */
  async resolveSentence(code: string, sentenceId: string) {
    const story = await this.storyModel
      .findOne({ code, isActive: true })
      .select('code courseId targetLanguage sentences.id sentences.text')
      .lean<StoryLean>();
    if (!story) throw new NotFoundException('STORY_NOT_FOUND');
    const sentence = story.sentences.find((item) => item.id === sentenceId);
    if (!sentence) throw new NotFoundException('STORY_SENTENCE_NOT_FOUND');
    return {
      storyCode: story.code,
      courseId: story.courseId,
      targetLanguage: story.targetLanguage,
      sentenceId: sentence.id,
      // 화면용 따옴표(“ ” ’)는 발음 평가에 곧은 따옴표로 넘긴다
      referenceText: sentence.text.replace(/[’‘]/g, "'").replace(/[“”]/g, '"'),
    };
  }

  /**
   * 따라 읽기 통과를 기록하고, 이 문장을 처음 통과했으면 XP 를 준다.
   * 발음 평가(speech)가 통과를 직접 확인한 뒤에만 부른다.
   *
   * @returns 이번에 준 XP (이미 통과한 문장이면 0)
   */
  async recordShadowPass(
    userId: string,
    reference: { storyCode: string; courseId: string; sentenceId: string },
  ): Promise<number> {
    const uId = new Types.ObjectId(userId);
    // 문서가 없으면 먼저 만든다. 조건부 갱신에 upsert 를 섞으면 이미 통과한
    // 문장일 때 새 문서를 만들려다 unique 인덱스에 걸린다.
    await this.progressModel.updateOne(
      { userId: uId, storyCode: reference.storyCode },
      {
        $setOnInsert: {
          userId: uId,
          storyCode: reference.storyCode,
          courseId: reference.courseId,
        },
      },
      { upsert: true },
    );
    // 문서 단위로 원자적이라 같은 문장 요청이 동시에 와도 한 번만 통과한다
    const claimed = await this.progressModel.updateOne(
      {
        userId: uId,
        storyCode: reference.storyCode,
        shadowedSentenceIds: { $ne: reference.sentenceId },
      },
      {
        $addToSet: { shadowedSentenceIds: reference.sentenceId },
        $inc: { totalXpEarned: STORY_SHADOW_XP_PER_SENTENCE },
      },
    );
    if (claimed.modifiedCount === 0) return 0;

    const result = await this.lessonsService.addXp(
      userId,
      STORY_SHADOW_XP_PER_SENTENCE,
    );
    return result.added;
  }

  private async nextStoryCode(story: StoryLean): Promise<string | null> {
    const siblings = await this.storyModel
      .find({ courseId: story.courseId, isActive: true })
      .select({ code: 1, level: 1, order: 1 })
      .lean<StoryLean[]>();
    const sorted = siblings.sort(byLevelThenOrder);
    const index = sorted.findIndex((item) => item.code === story.code);
    return index >= 0 ? (sorted[index + 1]?.code ?? null) : null;
  }

  private toSummary(
    story: StoryLean,
    lang: StoryQueryLanguage,
    progress: ProgressLean | undefined,
  ) {
    return {
      code: story.code,
      level: story.level,
      order: story.order,
      title: story.title,
      topic: pickStoryTranslation(story.topic, lang),
      scene: story.scene,
      narrator: { name: story.narrator?.name ?? '' },
      audio: {
        key: story.audio?.key ?? '',
        durationMs: story.audio?.durationMs ?? 0,
      },
      sentenceCount: story.sentences?.length ?? 0,
      progress: {
        completed: (progress?.completions ?? 0) > 0,
        completions: progress?.completions ?? 0,
        bestQuizCorrect: progress?.bestQuizCorrect ?? 0,
        quizTotal: progress?.quizTotal || story.questions?.length || 0,
      },
    };
  }
}
