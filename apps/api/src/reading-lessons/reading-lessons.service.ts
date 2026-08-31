import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LessonsService } from '../lessons/lessons.service';
import { UsersService } from '../users/users.service';
import { StudyCategory } from '../users/utils/study-category.util';
import { User, UserDocument } from '../users/schemas/user.schema';
import { CompleteReadingLessonDto } from './dto/complete-reading-lesson.dto';
import { ReadingGlossService, type WordGloss } from './reading-gloss.service';
import { normalizeWord } from './reading-words.util';
import { ListReadingLessonsQueryDto } from './dto/list-reading-lessons-query.dto';
import {
  READING_BASE_XP,
  READING_PRONUNCIATION_XP,
  READING_QUIZ_XP_PER_CORRECT,
  READING_REPEAT_XP_RATE,
  READING_WRITING_MAX_CHARS,
  READING_WRITING_MIN_CHARS,
  READING_WRITING_XP,
} from './reading-lessons.const';
import {
  ReadingLessonProgress,
  ReadingLessonProgressDocument,
} from './schemas/reading-lesson-progress.schema';
import {
  ReadingLesson,
  ReadingLessonDocument,
} from './schemas/reading-lesson.schema';

@Injectable()
export class ReadingLessonsService {
  private readonly logger = new Logger(ReadingLessonsService.name);

  constructor(
    @InjectModel(ReadingLesson.name)
    private readonly readingLessonModel: Model<ReadingLessonDocument>,
    @InjectModel(ReadingLessonProgress.name)
    private readonly progressModel: Model<ReadingLessonProgressDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly lessonsService: LessonsService,
    private readonly usersService: UsersService,
    private readonly glossService: ReadingGlossService,
  ) {}

  async list(query: ListReadingLessonsQueryDto, userId?: string) {
    const items = await this.readingLessonModel
      .find({ level: query.level, isActive: true })
      .select({
        code: 1,
        level: 1,
        unit: 1,
        order: 1,
        title: 1,
        topic: 1,
        estimatedMinutes: 1,
        media: 1,
      })
      .sort({ order: 1, unit: 1 })
      .lean();

    // 목록에서 완료 표시를 하려면 진도가 같이 와야 한다. 레슨마다 따로
    // 조회하면 N+1 이라 이 레벨 것을 한 번에 읽는다.
    const progressByCode = new Map<string, ReadingLessonProgressDocument>();
    if (userId) {
      const rows = await this.progressModel
        .find({ userId: new Types.ObjectId(userId), level: query.level })
        .lean();
      for (const row of rows) {
        progressByCode.set(row.lessonCode, row as never);
      }
    }

    return {
      level: query.level,
      total: items.length,
      items: items.map((item) => ({
        id: item._id.toString(),
        code: item.code,
        level: item.level,
        unit: item.unit,
        order: item.order,
        title: item.title,
        topic: item.topic,
        estimatedMinutes: item.estimatedMinutes,
        media: item.media,
        progress: this.toProgressSummary(progressByCode.get(item.code)),
      })),
    };
  }

  async getByCode(code: string, userId?: string) {
    const lesson = await this.readingLessonModel
      .findOne({ code, isActive: true })
      .lean();

    if (!lesson) {
      throw new NotFoundException('READING_LESSON_NOT_FOUND');
    }

    const [progress, cachedGlosses] = await Promise.all([
      userId
        ? this.progressModel
            .findOne({ userId: new Types.ObjectId(userId), lessonCode: code })
            .lean()
        : null,
      // 런타임에 채워둔 뜻을 시드 것과 합쳐서 내려보낸다. 앱은 어느 쪽에서
      // 왔는지 알 필요가 없고, 한 번 받으면 탭은 네트워크 없이 즉시 뜬다.
      this.glossService.cachedFor(code),
    ]);

    return {
      ...lesson,
      id: lesson._id.toString(),
      _id: undefined,
      __v: undefined,
      glossary: this.mergeGlossary(
        (lesson.glossary ?? []) as unknown as WordGloss[],
        cachedGlosses,
      ),
      progress: this.toProgressSummary(progress as never),
    };
  }

  /**
   * 시드 뜻 + 런타임 보충 뜻을 합친다. 시드가 우선이다 — 사람이 검수한 쪽이
   * 자동 생성보다 낫고, 시드를 채워 넣으면 자동 생성분이 자연히 밀려난다.
   */
  private mergeGlossary(seeded: WordGloss[], cached: WordGloss[]): WordGloss[] {
    const byWord = new Map<string, WordGloss>();
    for (const gloss of cached) byWord.set(normalizeWord(gloss.word), gloss);
    for (const gloss of seeded) byWord.set(normalizeWord(gloss.word), gloss);
    return [...byWord.values()];
  }

  /**
   * 단어 하나 뜻보기 (시드에 없을 때만 오는 경로).
   *
   * 본문 텍스트는 서버가 DB 에서 만든다 — 클라가 보낸 문장을 믿으면 아무
   * 텍스트나 넣어서 번역시킬 수 있다.
   */
  async glossWord(code: string, word: string) {
    const lesson = await this.readingLessonModel
      .findOne({ code, isActive: true })
      .select('passage glossary')
      .lean();
    if (!lesson) throw new NotFoundException('READING_LESSON_NOT_FOUND');

    // 시드에 이미 있으면 모델을 부를 이유가 없다
    const seeded = (lesson.glossary ?? []).find(
      (gloss) => normalizeWord(gloss.word) === normalizeWord(word),
    );
    if (seeded) return { gloss: seeded };

    const passageText = lesson.passage
      .map((paragraph) =>
        paragraph.segments.map((segment) => segment.text).join(''),
      )
      .join('\n\n');

    const gloss = await this.glossService.resolve(code, word, passageText);
    return { gloss };
  }

  /**
   * 레슨 완료 처리.
   *
   * 클라가 보내는 건 "무엇을 골랐는지" 와 "무엇을 썼는지" 뿐이다. 정답 수도
   * XP 도 받지 않는다 — 받으면 그 값을 그대로 믿게 되고, 그러면 아무나
   * 원하는 만큼 XP 를 만들 수 있다.
   *
   * 낭독은 여기서 아예 안 받는다. 발음 평가 중에 서버가 직접 찍은 값
   * (pronunciationCompletedAt)만 본다.
   */
  async complete(
    userId: string,
    code: string,
    dto: CompleteReadingLessonDto,
  ) {
    const lesson = await this.readingLessonModel
      .findOne({ code, isActive: true })
      .select('code level questions')
      .lean();
    if (!lesson) throw new NotFoundException('READING_LESSON_NOT_FOUND');

    const uId = new Types.ObjectId(userId);
    const before = await this.progressModel.findOne({
      userId: uId,
      lessonCode: code,
    });

    // ── 채점 (서버가 한다) ──
    const answerByQuestion = new Map<string, number>();
    for (const answer of dto.answers ?? []) {
      answerByQuestion.set(answer.questionId, answer.choiceIndex);
    }
    const quizTotal = lesson.questions?.length ?? 0;
    const quizCorrect = (lesson.questions ?? []).filter(
      (question) => answerByQuestion.get(question.id) === question.answerIndex,
    ).length;

    // ── 쓰기 ──
    const writingText = (dto.writingText ?? '')
      .trim()
      .slice(0, READING_WRITING_MAX_CHARS);
    const writingCounts =
      Array.from(writingText).length >= READING_WRITING_MIN_CHARS;

    // ── 낭독 (서버가 관찰한 값만) ──
    const pronunciationDone = !!before?.pronunciationCompletedAt;

    // ── XP ──
    // 이번에 "새로 얻은 것" 만 센다. 다시 풀 때는 배율을 깎는다.
    const repeat = (before?.completions ?? 0) > 0;
    const rawXp =
      READING_BASE_XP +
      quizCorrect * READING_QUIZ_XP_PER_CORRECT +
      (pronunciationDone ? READING_PRONUNCIATION_XP : 0) +
      (writingCounts ? READING_WRITING_XP : 0);
    const xpToAward = repeat
      ? Math.round(rawXp * READING_REPEAT_XP_RATE)
      : rawXp;

    const progress = await this.progressModel.findOneAndUpdate(
      { userId: uId, lessonCode: code },
      {
        $setOnInsert: { userId: uId, lessonCode: code, level: lesson.level },
        $set: {
          // 최고 기록만 남긴다. 다시 풀어서 더 못 맞혀도 깎지 않는다
          bestQuizCorrect: Math.max(before?.bestQuizCorrect ?? 0, quizCorrect),
          quizTotal,
          completedAt: new Date(),
          ...(writingCounts
            ? { writingText, writingSubmittedAt: new Date() }
            : {}),
        },
        $inc: { completions: 1, totalXpEarned: xpToAward },
      },
      { upsert: true, returnDocument: 'after' },
    );

    // 통계는 확인 문제 수만큼 listening 버킷에 넣는다.
    // 읽기 자체는 문제 개념이 없어서 최소 1건으로 잡는다.
    await this.lessonsService
      .recordStudy(userId, {
        questionCount: Math.max(1, quizTotal),
        wrongCount: Math.max(0, quizTotal - quizCorrect),
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
      `읽기 레슨 완료: user=${userId} code=${code} ` +
        `quiz=${quizCorrect}/${quizTotal} 낭독=${pronunciationDone} ` +
        `쓰기=${writingCounts} xp=${xpToAward}${repeat ? ' (재도전)' : ''}`,
    );

    return {
      success: true,
      xpEarned: xpResult.added,
      totalXP: xpResult.totalXP,
      quizCorrect,
      quizTotal,
      repeat,
      progress: this.toProgressSummary(progress),
    };
  }

  /**
   * 낭독 진행 상황을 기록한다. 발음 평가(speech)가 부른다.
   *
   * 클라가 "다 읽었어요" 라고 주장하는 경로를 만들지 않으려고 이렇게 했다.
   * 서버가 오디오를 채점하면서 직접 본 사실만 남는다.
   */
  async markReadingProgress(
    userId: string,
    lessonCode: string,
    level: number,
    readWords: number,
    totalWords: number,
  ) {
    const uId = new Types.ObjectId(userId);
    const complete = totalWords > 0 && readWords >= totalWords;

    await this.progressModel
      .updateOne(
        { userId: uId, lessonCode },
        {
          $setOnInsert: { userId: uId, lessonCode, level },
          $set: { totalWords },
          $max: { bestReadWords: readWords },
          ...(complete
            ? { $currentDate: { pronunciationCompletedAt: true } }
            : {}),
        },
        { upsert: true },
      )
      .catch((error) => {
        // 진도 기록 실패로 발음 평가 응답까지 막지는 않는다
        this.logger.warn(`낭독 진도 기록 실패: ${error?.message}`);
      });
  }

  /** 화면이 쓰는 모양으로 진도를 줄인다. 없으면 빈 값 */
  private toProgressSummary(
    progress?: ReadingLessonProgressDocument | null,
  ) {
    return {
      completed: !!progress?.completedAt,
      completions: progress?.completions ?? 0,
      bestQuizCorrect: progress?.bestQuizCorrect ?? 0,
      quizTotal: progress?.quizTotal ?? 0,
      pronunciationCompleted: !!progress?.pronunciationCompletedAt,
      bestReadWords: progress?.bestReadWords ?? 0,
      totalWords: progress?.totalWords ?? 0,
      writingSubmitted: !!progress?.writingSubmittedAt,
      totalXpEarned: progress?.totalXpEarned ?? 0,
    };
  }
}
