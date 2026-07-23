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
import { User, UserDocument } from '../users/schemas/user.schema';
import { buildMilestones, calcScore } from './score.util';
import { LeagueService } from '../league/league.service';
import { calcLessonXp } from './economy.const';
import { rollChestReward } from './xp.util';
import { UsersService } from '../users/users.service';

const LEGEND_XP = 40;

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
        wrongQuestionIds: dto.wrongQuestionIds,
        completedAt: new Date(),
      },
      { upsert: true, returnDocument: 'after' },
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    await this.userStatsModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId), date: today },
      {
        $inc: {
          studyTimeSeconds: dto.speedSeconds ?? 0,
          totalQuestions: dto.totalAnswers ?? 0,
          correctQuestions: dto.correctAnswers ?? 0,
          xpEarned,
          [`${lesson.category}Count`]: dto.totalAnswers ?? 0,
        },
      },
      { upsert: true, returnDocument: 'after' },
    );

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

  public async getLevelTestQuestions(lang: string = 'uz') {
    const easyQuestions = await this.questionModel.aggregate([
      { $match: { level: { $in: ['1', '2', '3'] }, isActive: true } },
      { $sample: { size: 10 } },
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
  public async getRoadmap(userId: string, lang: string = 'uz') {
    // 모든 노드 조회 (section, unit, order 순)
    const meUser = await this.userModel
      .findById(new Types.ObjectId(userId))
      .select('legendNodes')
      .lean();

    const legendSet = new Set(
      ((meUser?.legendNodes ?? []) as any[]).map((x) => x.toString()),
    );

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

    // unit/node status 계산
    const units = Array.from(unitMap.values());
    let foundCurrentUnit = false;
    let score = 0;

    for (const unit of units) {
      const allNodesCompleted = unit.nodes.every(
        (n: any) => n.completedLessons === n.totalLessons,
      );

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

    return { units, score };
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
      .find({ section: targetSection, unit: { $lt: targetUnit } })
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
      .find({ section: targetSection, unit: { $lt: targetUnit } })
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

  async getScore(userId: string) {
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
      [...sectionUnits.entries()].map(([section, units]) => ({
        section,
        units,
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
