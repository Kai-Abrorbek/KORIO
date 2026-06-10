import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Lesson, LessonDocument } from './schemas/lesson.schema';
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

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name)
    private lessonModel: Model<LessonDocument>,
    @InjectModel(Question.name)
    private questionModel: Model<QuestionDocument>,
    @InjectModel(UserProgress.name)
    private userProgressModel: Model<UserProgressDocument>,
    @InjectModel(UserStats.name)
    private userStatsModel: Model<UserStatsDocument>,
  ) {}

  private extractI18n(obj: any, lang: string): string {
    if (!obj) return '';
    return obj[lang] || obj['uz'] || obj['en'] || '';
  }

  private formatQuestion(q: any, lang: string) {
    return {
      id: q._id.toString(),
      type: q.type,
      level: q.level,
      question: this.extractI18n(q.instruction, lang),
      npcText: q.npcText || '',
      options: q.options || [],
      answer: q.answer,
      sentencePrefix: q.sentencePrefix || '',
      sentenceSuffix: q.sentenceSuffix || '',
      dialogLines: q.dialogLines || [],
      pairs: q.pairs || [],
      hint: this.extractI18n(q.hint, lang),
      explanation: this.extractI18n(q.explanation, lang),
      audioUrl: q.audioUrl || '',
      imageUrl: q.imageUrl || '',
      xpReward: q.xpReward || 10,
    };
  }

  async getLessons(userId: string) {
    const lessons = await this.lessonModel
      .find({ isActive: true })
      .sort({ section: 1, unit: 1, order: 1 })
      .lean();

    const progresses = await this.userProgressModel
      .find({ userId: new Types.ObjectId(userId) })
      .lean();

    const progressMap = new Map(
      progresses.map((p) => [p.lessonId.toString(), p]),
    );

    return lessons.map((lesson) => ({
      id: lesson._id.toString(),
      title: lesson.title,
      category: lesson.category,
      level: lesson.level,
      section: lesson.section,
      unit: lesson.unit,
      order: lesson.order,
      xpReward: lesson.xpReward,
      questionCount: lesson.questionIds.length,
      progress: progressMap.get(lesson._id.toString()) || null,
    }));
  }

  async getLessonById(lessonId: string, lang: string = 'uz') {
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
      totalXp: lesson.xpReward,
      questions: sortedQuestions,
    };
  }

  async completeLesson(
    lessonId: string,
    userId: string,
    dto: CompleteLessonDto,
  ) {
    await this.userProgressModel.findOneAndUpdate(
      {
        userId: new Types.ObjectId(userId),
        lessonId: new Types.ObjectId(lessonId),
      },
      {
        userId: new Types.ObjectId(userId),
        lessonId: new Types.ObjectId(lessonId),
        isCompleted: dto.isCompleted,
        xpEarned: dto.xpEarned,
        correctAnswers: dto.correctAnswers,
        totalAnswers: dto.totalAnswers,
        combo: dto.combo,
        speedSeconds: dto.speedSeconds,
        wrongQuestionIds: dto.wrongQuestionIds,
        completedAt: new Date(),
      },
      { upsert: true, new: true },
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lesson = await this.lessonModel
      .findById(new Types.ObjectId(lessonId))
      .lean();

    await this.userStatsModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId), date: today },
      {
        $inc: {
          studyTimeSeconds: dto.speedSeconds,
          totalQuestions: dto.totalAnswers,
          correctQuestions: dto.correctAnswers,
          xpEarned: dto.xpEarned,
          [`${lesson?.category}Count`]: dto.totalAnswers,
        },
      },
      { upsert: true, new: true },
    );

    return { success: true, xpEarned: dto.xpEarned };
  }

  async getLevelTestQuestions(lang: string = 'uz') {
    const easyQuestions = await this.questionModel.aggregate([
      { $match: { level: { $in: ['1', '2', '3'] }, isActive: true } },
      { $sample: { size: 6 } },
    ]);

    const hardQuestions = await this.questionModel.aggregate([
      { $match: { level: { $in: ['4', '5', '6'] }, isActive: true } },
      { $sample: { size: 4 } },
    ]);

    const questions = [...easyQuestions, ...hardQuestions].sort(
      () => Math.random() - 0.5,
    );

    return questions.map((q) => this.formatQuestion(q, lang));
  }
}
