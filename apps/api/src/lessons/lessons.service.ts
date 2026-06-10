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

  async getRoadmap(userId: string, lang: string = 'uz') {
    const lessons = await this.lessonModel
      .find({ isActive: true })
      .sort({ section: 1, unit: 1, order: 1 })
      .lean();

    const userObjectId = new Types.ObjectId(userId);
    const progresses = await this.userProgressModel
      .find({ userId: userObjectId })
      .lean();

    const progressMap = new Map(
      progresses.map((p) => [p.lessonId.toString(), p]),
    );

    // section → unit → lessons 그룹핑
    const unitMap = new Map<string, any>();

    for (const lesson of lessons) {
      const unitKey = `${lesson.section}-${lesson.unit}`;

      if (!unitMap.has(unitKey)) {
        unitMap.set(unitKey, {
          id: `unit-${lesson.section}-${lesson.unit}`,
          sectionNumber: lesson.section,
          unitNumber: lesson.unit,
          title: this.extractI18n(lesson.title, lang),
          color: '#776ee2', // 나중에 unit 스키마에 color 추가
          status: 'locked',
          nodes: [],
        });
      }

      const progress = progressMap.get(lesson._id.toString());
      const isCompleted = progress?.isCompleted ?? false;

      const unit = unitMap.get(unitKey);
      unit.nodes.push({
        id: lesson._id.toString(),
        lessonId: lesson._id.toString(),
        type: 'star',
        status: isCompleted ? 'completed' : 'locked',
        title: this.extractI18n(lesson.title, lang),
        xpReward: lesson.xpReward,
        currentLesson: progress?.correctAnswers ?? 0,
        totalLessons: lesson.questionIds.length,
      });
    }

    // unit status 계산 (첫 번째 미완성 unit = current)
    const units = Array.from(unitMap.values());
    let foundCurrent = false;

    for (const unit of units) {
      const allCompleted = unit.nodes.every(
        (n: any) => n.status === 'completed',
      );
      const anyCompleted = unit.nodes.some(
        (n: any) => n.status === 'completed',
      );

      if (allCompleted) {
        unit.status = 'completed';
      } else if (!foundCurrent) {
        unit.status = 'current';
        foundCurrent = true;
        // 첫 번째 미완성 노드 = current
        let foundCurrentNode = false;
        for (const node of unit.nodes) {
          if (node.status !== 'completed' && !foundCurrentNode) {
            node.status = 'current';
            foundCurrentNode = true;
          }
        }
      }
    }

    return { units };
  }
}
