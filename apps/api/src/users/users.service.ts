import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UserStats, UserStatsDocument } from './schemas/user-stats.schema';
import {
  UserProgress,
  UserProgressDocument,
} from './schemas/user-progress.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserStats.name) private statsModel: Model<UserStatsDocument>,
    @InjectModel(UserProgress.name)
    private progressModel: Model<UserProgressDocument>,
  ) {}

  /** 본인 정보 + 카운트 */
  async getMe(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('-password')
      .lean();
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다');

    const completedLessons = await this.progressModel.countDocuments({
      userId: new Types.ObjectId(userId),
      isCompleted: true,
    });

    return {
      id: user._id.toString(),
      email: user.email,
      nickname: user.nickname,
      username: user.username || '',
      profileImage: user.profileImage || '',
      bio: user.bio || '',
      country: user.country || '',
      level: user.level,
      totalXP: user.totalXP || 0,
      streak: user.streak || 0,
      longestStreak: user.longestStreak || 0,
      league: user.league,
      isSuper: user.isSuper || false,
      streakFreeze: user.streakFreeze || 0,
      gems: user.gems || 0,
      energy: user.energy || 5,
      followingCount: user.following?.length || 0,
      followersCount: user.followers?.length || 0,
      completedLessons,
      targetLanguage: user.targetLanguage,
      dailyGoalMinutes: user.dailyGoalMinutes,
      isOnboardingCompleted: user.isOnboardingCompleted,
      createdAt: (user as any).createdAt,
      lastStudiedAt: user.lastStudiedAt,
    };
  }

  /** 다른 유저 프로필 */
  async getUserById(userId: string, currentUserId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('-password -email')
      .lean();
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다');

    const completedLessons = await this.progressModel.countDocuments({
      userId: new Types.ObjectId(userId),
      isCompleted: true,
    });

    const isFollowing = user.followers?.some(
      (f) => f.toString() === currentUserId,
    );

    return {
      id: user._id.toString(),
      nickname: user.nickname,
      username: user.username || '',
      profileImage: user.profileImage || '',
      bio: user.bio || '',
      country: user.country || '',
      level: user.level,
      totalXP: user.totalXP || 0,
      streak: user.streak || 0,
      league: user.league,
      isSuper: user.isSuper || false,
      followingCount: user.following?.length || 0,
      followersCount: user.followers?.length || 0,
      completedLessons,
      isFollowing,
    };
  }

  /** 본인 프로필 수정 */
  async updateMe(userId: string, dto: Partial<User>) {
    const allowed: (keyof User)[] = [
      'nickname',
      'username',
      'bio',
      'country',
      'profileImage',
      'targetLanguage',
      'dailyGoalMinutes',
    ];
    const update: Partial<User> = {};
    for (const key of allowed) {
      if (dto[key] !== undefined) (update as any)[key] = dto[key];
    }

    const updated = await this.userModel
      .findByIdAndUpdate(userId, { $set: update }, { new: true })
      .select('-password')
      .lean();
    if (!updated) throw new NotFoundException('유저를 찾을 수 없습니다');
    return updated;
  }

  /** 팔로우 */
  async follow(currentUserId: string, targetUserId: string) {
    if (currentUserId === targetUserId) {
      throw new BadRequestException('자기 자신은 팔로우할 수 없습니다');
    }
    const target = await this.userModel.findById(targetUserId);
    if (!target) throw new NotFoundException('대상 유저를 찾을 수 없습니다');

    await this.userModel.findByIdAndUpdate(currentUserId, {
      $addToSet: { following: new Types.ObjectId(targetUserId) },
    });
    await this.userModel.findByIdAndUpdate(targetUserId, {
      $addToSet: { followers: new Types.ObjectId(currentUserId) },
    });

    return { success: true };
  }

  /** 언팔로우 */
  async unfollow(currentUserId: string, targetUserId: string) {
    await this.userModel.findByIdAndUpdate(currentUserId, {
      $pull: { following: new Types.ObjectId(targetUserId) },
    });
    await this.userModel.findByIdAndUpdate(targetUserId, {
      $pull: { followers: new Types.ObjectId(currentUserId) },
    });
    return { success: true };
  }

  /** 팔로잉 목록 */
  async getFollowing(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .populate({
        path: 'following',
        select: 'nickname username profileImage streak totalXP league',
      })
      .lean();
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다');
    return user.following || [];
  }

  /** 팔로워 목록 */
  async getFollowers(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .populate({
        path: 'followers',
        select: 'nickname username profileImage streak totalXP league',
      })
      .lean();
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다');
    return user.followers || [];
  }

  /** 특정 월의 학습한 날짜 리스트 (1-31) */
  async getCalendar(userId: string, year: number, month: number) {
    // month 는 1-12 (0-indexed 가 아니라)
    const start = new Date(year, month - 1, 1, 0, 0, 0);
    const end = new Date(year, month, 1, 0, 0, 0);

    const stats = await this.statsModel
      .find({
        userId: new Types.ObjectId(userId),
        date: { $gte: start, $lt: end },
        $or: [{ xpEarned: { $gt: 0 } }, { totalQuestions: { $gt: 0 } }],
      })
      .lean();

    const completedDays = stats.map((s) => new Date(s.date).getDate());

    return {
      year,
      month,
      completedDays: Array.from(new Set(completedDays)).sort((a, b) => a - b),
    };
  }

  /** 최근 N일 (기본 7일) 일별 학습 통계 */
  async getWeeklyStats(userId: string, endDateStr?: string) {
    const endDate = endDateStr ? new Date(endDateStr) : new Date();
    endDate.setHours(23, 59, 59, 999);
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);

    const stats = await this.statsModel
      .find({
        userId: new Types.ObjectId(userId),
        date: { $gte: startDate, $lte: endDate },
      })
      .sort({ date: 1 })
      .lean();

    // 7일 배열 만들기
    const result: Array<{
      date: string;
      studyTimeSeconds: number;
      totalQuestions: number;
      correctQuestions: number;
      xpEarned: number;
      vocabularyCount: number;
      grammarCount: number;
      expressionCount: number;
      conversationCount: number;
      listeningCount: number;
    }> = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const dayKey = d.toISOString().split('T')[0];
      const stat = stats.find(
        (s) => new Date(s.date).toISOString().split('T')[0] === dayKey,
      );
      result.push({
        date: dayKey,
        studyTimeSeconds: stat?.studyTimeSeconds || 0,
        totalQuestions: stat?.totalQuestions || 0,
        correctQuestions: stat?.correctQuestions || 0,
        xpEarned: stat?.xpEarned || 0,
        vocabularyCount: stat?.vocabularyCount || 0,
        grammarCount: stat?.grammarCount || 0,
        expressionCount: stat?.expressionCount || 0,
        conversationCount: stat?.conversationCount || 0,
        listeningCount: stat?.listeningCount || 0,
      });
    }

    return { days: result };
  }
}
