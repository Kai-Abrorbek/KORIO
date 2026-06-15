import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Lesson, LessonDocument } from './schemas/lesson.schema';
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
      choices: q.choices || [], // ← 이거 추가
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

  // 레슨 상세 + 문제들 (lessonId로 조회)
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

  // 레슨 완료 저장
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
      { upsert: true, returnDocument: 'after' },
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
      { upsert: true, returnDocument: 'after' },
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

  // 로드맵 조회
  async getRoadmap(userId: string, lang: string = 'uz') {
    // 모든 노드 조회 (section, unit, order 순)
    const nodes = await this.nodeModel
      .find({ isActive: true })
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

      const unit = unitMap.get(unitKey);
      unit.nodes.push({
        id: node._id.toString(),
        type: 'star',
        status: 'locked', // 나중에 계산
        title: this.extractI18n(node.title, lang),
        completedLessons: completedCount,
        totalLessons: totalCount,
        lessons: nodeLessons,
        // 레슨 시작할 때 첫 번째 미완료 레슨 ID 전달
        lessonId:
          nodeLessons.find((l) => !l.isCompleted)?.lessonId ??
          nodeLessons[0]?.lessonId,
      });
    }

    // unit/node status 계산
    const units = Array.from(unitMap.values());
    let foundCurrentUnit = false;

    for (const unit of units) {
      const allNodesCompleted = unit.nodes.every(
        (n: any) => n.completedLessons === n.totalLessons,
      );

      if (allNodesCompleted) {
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

    return { units };
  }

  async getLessons(userId: string) {
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
}
