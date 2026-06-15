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
}
