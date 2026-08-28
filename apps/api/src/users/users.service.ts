import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { UserStats, UserStatsDocument } from './schemas/user-stats.schema';
import {
  UserProgress,
  UserProgressDocument,
} from './schemas/user-progress.schema';
import { calculateLevel, UserLevel } from '../common/enums/level.enum';
import { HangulLevel } from '../common/enums/hangul-level.enum';
import { SelfReportedLevel } from '../common/enums/self-level.enum';
import {
  dateParts,
  dayKey,
  daysBetween,
  resolveTimezone,
  startOfDay,
  startOfDayPlus,
  startOfMonth,
  startOfMonthPlus,
} from '../common/date.util';
import { countryToFlag, langToFlag, levelToNumber } from './utils';
import { LessonNode, LessonNodeDocument } from '../lessons/schemas/node.schema';
import { isSuperActive, isSuperStale } from './super.util';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../notifications/schemas/notification.schema';
import { computeEnergy } from '../energy/energy.util';
import { calcStreak } from './utils/streak.util';
import {
  CategoryCounts,
  StudyCategory,
  STUDY_CATEGORIES,
  emptyCounts,
  sumCounts,
  toCounts,
} from './utils/study-category.util';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { UpdateLearnModeDto } from './dto/update-learn-mode.dto';
import { UpdateStudyModeDto } from './dto/update-study-mode.dto';
import { UpdateTimezoneDto } from './dto/update-timezone.dto';
import { SavePronunciationDto } from './dto/save-pronunciation.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AvatarConfig } from './schemas/avatar.schema';
import {
  AVATAR_VERSION,
  DEFAULT_AVATAR_CONFIG,
  type AvatarConfigValue,
} from './avatar/avatar.constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserStats.name) private statsModel: Model<UserStatsDocument>,
    @InjectModel(UserProgress.name)
    private progressModel: Model<UserProgressDocument>,
    @InjectModel(LessonNode.name) private nodeModel: Model<LessonNodeDocument>,
    private readonly notifications: NotificationsService,
  ) {}

  /**
   * 설문 결과를 유저 문서에 반영한다.
   *
   * saveSurvey 는 sessionId 기준으로 onboarding 컬렉션에만 쓰고,
   * 그게 유저로 복사되는 건 "가입" 시점뿐이다. 그런데 로그인 후에 설문을 보는
   * 경로(login/register → survey)에서는 그 복사가 이미 지나간 뒤라
   * hangulLevel 같은 값이 유저에 영영 안 남는다. 그래서 여기서 직접 반영한다.
   *
   * completeNow=true 면 레벨 테스트를 건너뛰는 완전 초보자라
   * 온보딩까지 마감한다. 안 그러면 isOnboardingCompleted 가 false 로 남아
   * 앱을 다시 켤 때마다 온보딩으로 되돌아간다.
   */
  async syncOnboardingSurvey(
    userId: string,
    dto: {
      hangulLevel?: HangulLevel;
      selfReportedLevel?: SelfReportedLevel;
      dailyGoalMinutes?: number;
      targetLanguage?: string;
      interests?: string[];
      reminderHour?: number;
      completeNow?: boolean;
    },
  ) {
    const update: Record<string, any> = {};
    if (dto.hangulLevel) update.hangulLevel = dto.hangulLevel;
    if (dto.selfReportedLevel) update.selfReportedLevel = dto.selfReportedLevel;
    if (dto.dailyGoalMinutes) update.dailyGoalMinutes = dto.dailyGoalMinutes;
    if (dto.targetLanguage) update.targetLanguage = dto.targetLanguage;
    if (dto.interests?.length) update.interests = dto.interests;
    if (dto.reminderHour !== undefined) update.reminderHour = dto.reminderHour;

    if (dto.completeNow) {
      update.level = UserLevel.BEGINNER;
      update.placementLevel = 1;
      update.isOnboardingCompleted = true;
    }

    await this.userModel.findByIdAndUpdate(
      new Types.ObjectId(userId),
      update,
      {},
    );
    return { success: true };
  }

  /** 로드맵 첫 노드(한글 배우기) 완료 처리. 이미 끝냈으면 시각 유지. */
  async completeHangul(userId: string) {
    const user = await this.userModel.findById(new Types.ObjectId(userId));
    if (!user) throw new NotFoundException('USER_NOT_FOUND');

    if (!user.hangulCompletedAt) {
      user.hangulCompletedAt = new Date();
      await user.save();
    }

    return { success: true, hangulCompletedAt: user.hangulCompletedAt };
  }

  async saveLevelTest(
    userId: string,
    dto: {
      correctAnswers: number;
      totalQuestions: number;
      score: number;
      wrongQuestionIds: string[];
    },
  ) {
    const detectedLevel = calculateLevel(dto.score);

    await this.userModel.findByIdAndUpdate(new Types.ObjectId(userId), {
      level: detectedLevel,
      isOnboardingCompleted: true,
    });

    return {
      success: true,
      detectedLevel,
      score: dto.score,
      correctAnswers: dto.correctAnswers,
    };
  }

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
    const currentUnitProgress = await this.calcCurrentUnitProgress(userId);

    // 스트릭은 파생 데이터 → 읽을 때 계산해야 "끊김"도 즉시 반영됨
    const streak = await this.syncStreak(userId, user.longestStreak || 0);

    // 체험이 끝났으면 DB 의 isSuper 도 내려준다.
    // 안 그러면 만료된 계정이 DB 상으로는 계속 슈퍼로 보인다.
    if (isSuperStale(user)) {
      await this.userModel.updateOne(
        { _id: new Types.ObjectId(userId) },
        { $set: { isSuper: false } },
      );
      user.isSuper = false;
    }

    // 에너지도 파생 데이터다. 저장값을 그대로 주면 시간 회복분이 빠지고,
    // 슈퍼인데도 0 으로 보여서 앱이 레슨 시작을 막는다.
    const superActive = isSuperActive(user);
    const energyNow = computeEnergy(
      { energy: user.energy ?? 0, energyUpdatedAt: user.energyUpdatedAt },
      superActive,
    ).energy;

    return {
      id: user._id.toString(),
      email: user.email,
      nickname: user.nickname,
      username: user.username || '',
      profileImage: user.profileImage || '',
      avatar: user.avatar || {
        ...DEFAULT_AVATAR_CONFIG,
      },
      bio: user.bio || '',
      country: user.country || '',
      // 클라가 기기 시간대와 비교해서 다를 때만 PATCH 하도록 같이 내려준다
      timezone: user.timezone || '',
      level: user.level,
      totalXP: user.totalXP || 0,
      streak: streak.current,
      longestStreak: streak.longest,
      league: user.league,
      isSuper: superActive,
      streakFreeze: user.streakFreeze || 0,
      gems: user.gems || 0,
      energy: energyNow,
      followingCount: user.following?.length || 0,
      followersCount: user.followers?.length || 0,
      completedLessons,
      currentUnitProgress,
      targetLanguage: user.targetLanguage,
      dailyGoalMinutes: user.dailyGoalMinutes,
      isOnboardingCompleted: user.isOnboardingCompleted,
      // 기존 유저 문서엔 이 필드가 없다. 기본값을 내려줘야 앱이
      // 로컬에 남아 있던 (다른 계정의) 값을 그대로 쓰지 않는다.
      learnMode: user.learnMode || 'vocabulary',
      // 기본은 가이드(학습 로드) 모드. 뭘 해야 할지 모르는 유저가 기본값이다
      studyMode: user.studyMode || 'guided',
      topikLevel: user.topikLevel || '1',
      // 계정 화면에서 로그인 방식을 보여주고, 소셜 계정엔 비밀번호 변경을 숨긴다
      provider: user.provider,
      superExpiresAt: user.superExpiresAt ?? null,
      createdAt: (user as any).createdAt,
      lastStudiedAt: user.lastStudiedAt,
      joinedYear: (user as any).createdAt
        ? new Date((user as any).createdAt).getFullYear()
        : new Date().getFullYear(),
      languageLevel: user.placementLevel || 1,
      // 급수를 직접 골랐는지. false 면 학습 로드로 들어갈 때 한 번 물어본다
      hasPickedLevel: !!user.placementLevelSetAt,
      hangulLevel: user.hangulLevel,
      hangulCompletedAt: user.hangulCompletedAt,
      coursePrimaryFlag:
        countryToFlag(user.country) || langToFlag(user.targetLanguage),
      courseExtraCount: 0, // TODO: 멀티 코스 생기면 (코스 수 - 1)
      friendStreaks: [], // TODO: 친구 스트릭 도메인 생기면 채움
    };
  }

  private async calcCurrentUnitProgress(userId: string): Promise<number> {
    const nodes = await this.nodeModel
      .find()
      .sort({ section: 1, unit: 1, order: 1 })
      .lean();
    if (!nodes.length) return 0;

    const progresses = await this.progressModel
      .find({ userId: new Types.ObjectId(userId), isCompleted: true })
      .lean();
    const doneSet = new Set(progresses.map((p) => p.lessonId.toString()));

    // 유닛별 그룹핑
    const unitMap = new Map<string, { done: number; total: number }>();
    for (const node of nodes) {
      const key = `${node.section}-${node.unit}`;
      if (!unitMap.has(key)) unitMap.set(key, { done: 0, total: 0 });
      const u = unitMap.get(key)!;
      for (const lid of node.lessonIds) {
        u.total += 1;
        if (doneSet.has(lid.toString())) u.done += 1;
      }
    }

    // 첫 번째 "미완료" 유닛 = 현재 유닛
    for (const u of unitMap.values()) {
      if (u.total > 0 && u.done < u.total) {
        return Math.round((u.done / u.total) * 100);
      }
    }
    // 전부 완료면 100
    return 100;
  }

  /** 다른 유저 프로필 */
  async getUserById(currentUserId: string, targetId: string) {
    if (!Types.ObjectId.isValid(targetId)) {
      throw new NotFoundException('유저를 찾을 수 없습니다');
    }
    const user = await this.userModel
      .findById(targetId)
      .select('-password -email')
      .lean();
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다');

    const completedLessons = await this.progressModel.countDocuments({
      userId: new Types.ObjectId(targetId),
      isCompleted: true,
    });

    const isFollowing = !!user.followers?.some(
      (f) => f.toString() === currentUserId,
    );

    // 상대가 나를 팔로우하는가 (맞팔하기 버튼 표시용)
    const isFollowedBy = !!user.following?.some(
      (f) => f.toString() === currentUserId,
    );

    // 소셜 프루프: 내가 팔로우하는 사람 중 이 유저도 팔로우하는 사람
    const me = await this.userModel
      .findById(currentUserId)
      .select('following')
      .lean();
    const myFollowing = (me?.following ?? []).map((f) => f.toString());
    const targetFollowers = (user.followers ?? []).map((f) => f.toString());
    const mutualIds = myFollowing.filter((f) => targetFollowers.includes(f));
    const followedByUsers = mutualIds.length
      ? await this.userModel
          .find({ _id: { $in: mutualIds.slice(0, 3) } })
          .select('nickname profileImage')
          .lean()
      : [];
    // 스트릭은 파생값 → 저장값 대신 읽기 전용으로 계산 (write X)
    const streakRows = await this.statsModel
      .find({
        userId: new Types.ObjectId(targetId),
        $or: [{ xpEarned: { $gt: 0 } }, { totalQuestions: { $gt: 0 } }],
      })
      .select('date')
      .lean();

    const targetTz = await this.getTimezone(targetId);
    const { current: streakCurrent } = calcStreak(
      streakRows.map((r) => r.date),
      new Date(),
      targetTz,
    );

    return {
      id: user._id.toString(),
      nickname: user.nickname,
      username: user.username || '',
      profileImage: user.profileImage || '',
      avatar: user.avatar || {
        ...DEFAULT_AVATAR_CONFIG,
      },
      bio: user.bio || '',
      country: user.country || '',
      level: user.level,
      totalXP: user.totalXP || 0,
      streak: streakCurrent,
      league: user.league,
      isSuper: isSuperActive(user),
      followingCount: user.following?.length || 0,
      followersCount: user.followers?.length || 0,
      completedLessons,
      isFollowing,
      isFollowedBy,
      joinedYear: (user as any).createdAt
        ? new Date((user as any).createdAt).getFullYear()
        : new Date().getFullYear(),
      coursePrimaryFlag:
        countryToFlag(user.country) || langToFlag(user.targetLanguage),
      courseExtraCount: 0,
      languageLevel: user.placementLevel || 1,
      followedBy: followedByUsers.map((u) => ({
        id: u._id.toString(),
        nickname: u.nickname,
        profileImage: u.profileImage || '',
      })),
      followedByCount: mutualIds.length,
    };
  }

  private normalizeAvatar(
    avatar?: Partial<AvatarConfigValue> | null,
  ): AvatarConfigValue {
    return {
      ...DEFAULT_AVATAR_CONFIG,
      ...(avatar ?? {}),
      version: AVATAR_VERSION,
    } as AvatarConfigValue;
  }

  async getSuggestions(currentUserId: string, limit = 20) {
    const meId = new Types.ObjectId(currentUserId);
    const me = await this.userModel
      .findById(meId)
      .select('following followers')
      .lean();
    const myFollowing = (me?.following ?? []).map((f) => f.toString());
    const excludeIds = new Set<string>([currentUserId, ...myFollowing]);

    const suggestions: Array<{
      id: string;
      nickname: string;
      username: string;
      profileImage: string;
      avatar: AvatarConfigValue;
      reason?: string;
      reasonUserId?: string;
    }> = [];

    const added = new Set<string>();

    // 1) 친구의 팔로잉 기반 (내가 팔로우하는 사람들이 팔로우하는 유저)
    if (myFollowing.length > 0) {
      const friends = await this.userModel
        .find({ _id: { $in: me?.following ?? [] } })
        .select('nickname following')
        .lean();

      for (const friend of friends) {
        for (const candId of friend.following ?? []) {
          const cid = candId.toString();
          if (excludeIds.has(cid) || added.has(cid)) continue;
          added.add(cid);
          suggestions.push({
            id: cid,
            nickname: '', // 아래서 채움
            username: '',
            profileImage: '',
            reason: 'followedBy', // 프론트 i18n: "OO님이 팔로우 중"
            reasonUserId: friend._id.toString(),
            // reason 표시용 친구 이름
            ...({ reasonName: friend.nickname } as any),
          });
          if (suggestions.length >= limit) break;
        }
        if (suggestions.length >= limit) break;
      }
    }

    // 2) 부족하면 무관한 랜덤 유저로 채움
    if (suggestions.length < limit) {
      const need = limit - suggestions.length;
      const exclude = [...excludeIds, ...added].map(
        (id) => new Types.ObjectId(id),
      );
      const randoms = await this.userModel.aggregate([
        { $match: { _id: { $nin: exclude } } },
        { $sample: { size: need } },
        { $project: { nickname: 1, username: 1, profileImage: 1, avatar: 1 } },
      ]);
      randoms.forEach((u) => {
        suggestions.push({
          id: u._id.toString(),
          nickname: u.nickname,
          username: u.username || '',
          profileImage: u.profileImage || '',
          avatar: this.normalizeAvatar(
            u.avatar as Partial<AvatarConfigValue> | null,
          ),
          // reason 없음 (무관한 추천)
        });
      });
    }

    // 친구기반 추천들의 닉네임/프사 채우기
    const needInfo = suggestions
      .filter((s) => !s.nickname)
      .map((s) => new Types.ObjectId(s.id));
    if (needInfo.length > 0) {
      const infos = await this.userModel
        .find({
          _id: {
            $in: needInfo,
          },
        })
        .select('nickname username profileImage avatar')
        .lean();

      const infoMap = new Map(infos.map((u) => [u._id.toString(), u]));
      suggestions.forEach((s) => {
        if (!s.nickname) {
          const info = infoMap.get(s.id);
          if (info) {
            s.nickname = info.nickname;
            s.username = info.username || '';
            s.profileImage = info.profileImage || '';
            s.avatar = this.normalizeAvatar(
              info.avatar as Partial<AvatarConfigValue> | null,
            );
          }
        }
      });
    }

    // 닉네임 못 채운(삭제된 유저 등) 항목 제거 + 나와의 관계 부여
    const followerSet = new Set((me?.followers ?? []).map((f) => f.toString()));
    return suggestions
      .filter((s) => s.nickname)
      .map((s) => ({
        ...s,
        isFollowing: false, // 추천은 아직 내가 팔로우 안 한 사람
        isFollowedBy: followerSet.has(s.id),
      }));
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
      .findByIdAndUpdate(userId, { $set: update }, { returnDocument: 'after' })
      .select('-password')
      .lean();
    if (!updated) throw new NotFoundException('유저를 찾을 수 없습니다');
    return updated;
  }

  /**
   * @아이디 사용 가능 여부.
   * 저장 시도 후 중복 에러를 보여주는 것보다, 입력하는 동안 알려주는 게 낫다.
   */
  async checkUsername(userId: string, raw: string) {
    const username = (raw || '').trim().toLowerCase();

    // 영문/숫자/밑줄 3~20자. 다른 문자를 허용하면 멘션·검색이 지저분해진다
    if (!/^[a-z0-9_]{3,20}$/.test(username)) {
      return { available: false, reason: 'format' as const };
    }

    const owner = await this.userModel
      .findOne({ username })
      .select('_id')
      .lean();

    // 내가 이미 쓰고 있는 아이디면 그대로 두는 것도 "사용 가능"
    if (owner && owner._id.toString() !== userId) {
      return { available: false, reason: 'taken' as const };
    }
    return { available: true, reason: null };
  }

  /** 비밀번호 변경. 소셜 로그인 계정은 비밀번호가 없다. */
  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.userModel.findById(userId).select('+password');
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다');

    if (!user.password) {
      throw new BadRequestException('SOCIAL_ACCOUNT_NO_PASSWORD');
    }

    const ok = await bcrypt.compare(dto.currentPassword, user.password);
    if (!ok) throw new BadRequestException('WRONG_CURRENT_PASSWORD');

    if (dto.currentPassword === dto.newPassword) {
      throw new BadRequestException('SAME_PASSWORD');
    }

    user.password = await bcrypt.hash(dto.newPassword, 10);
    await user.save();
    return { success: true };
  }

  /**
   * 회원 탈퇴.
   *
   * 유저 문서만 지우면 진행도·통계·알림이 주인 없는 채로 남는다.
   * 팔로우 목록에 남은 내 id 도 같이 정리해야 친구 목록이 깨지지 않는다.
   */
  async deleteAccount(userId: string) {
    const _id = new Types.ObjectId(userId);
    const user = await this.userModel.findById(_id).select('_id').lean();
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다');

    await Promise.all([
      this.progressModel.deleteMany({ userId: _id }),
      this.statsModel.deleteMany({ userId: _id }),
      this.notifications.clearAll(userId).catch(() => undefined),
      // 남이 나를 팔로우한 기록도 지운다
      this.userModel.updateMany(
        { $or: [{ following: _id }, { followers: _id }] },
        { $pull: { following: _id, followers: _id } },
      ),
    ]);

    await this.userModel.deleteOne({ _id });
    return { success: true };
  }

  /** 아바타 전체 설정 저장 */
  /**
   * 현재 학습 중인 모드 저장.
   *
   * 토픽은 급수까지 같이 와야 홈에서 바로 그 급수로 들어갈 수 있다.
   * 급수가 안 왔으면 이전 값을 유지한다 (덮어써서 1급으로 되돌리면 안 됨).
   */
  async updateLearnMode(userId: string, dto: UpdateLearnModeDto) {
    const $set: Record<string, string> = { learnMode: dto.learnMode };
    if (dto.topikLevel) $set.topikLevel = dto.topikLevel;

    const updated = await this.userModel
      .findByIdAndUpdate(
        userId,
        { $set },
        { returnDocument: 'after', runValidators: true },
      )
      .select('learnMode topikLevel')
      .lean();

    if (!updated) throw new NotFoundException('유저를 찾을 수 없습니다');

    return {
      learnMode: updated.learnMode,
      topikLevel: updated.topikLevel,
    };
  }

  /** 가이드(순서대로) ↔ 자율(마음대로). 계정에 붙어야 폰을 바꿔도 따라온다 */
  /**
   * 기기에서 읽은 시간대를 저장한다. 값이 이상하면 기본값으로 떨어뜨려 저장한다 —
   * 검증 실패로 400 을 주면 앱 진입이 막히는데, 시간대는 그럴 만큼 중요하지 않다.
   */
  async updateTimezone(userId: string, dto: UpdateTimezoneDto) {
    const timezone = resolveTimezone(dto.timezone);
    const updated = await this.userModel
      .findByIdAndUpdate(
        userId,
        { $set: { timezone } },
        { returnDocument: 'after' },
      )
      .select('timezone')
      .lean();

    if (!updated) throw new NotFoundException('유저를 찾을 수 없습니다');
    return { timezone: updated.timezone };
  }

  async updateStudyMode(userId: string, dto: UpdateStudyModeDto) {
    const updated = await this.userModel
      .findByIdAndUpdate(
        userId,
        { $set: { studyMode: dto.studyMode } },
        { returnDocument: 'after', runValidators: true },
      )
      .select('studyMode')
      .lean();

    if (!updated) throw new NotFoundException('유저를 찾을 수 없습니다');

    return { studyMode: updated.studyMode };
  }

  /**
   * 발음 연습 결과 저장.
   * 최고점만 남긴다 — 다시 풀어서 못 봤다고 진행률이 깎이면 재도전을 피하게 된다.
   */
  async savePronunciation(userId: string, dto: SavePronunciationDto) {
    const key = `${dto.level}:${dto.step}:${dto.mode}`;

    // 동시에 여러 저장 요청이 와도 더 낮은 점수가 최고점을 덮지 않도록 원자적으로 갱신한다.
    const updated = await this.userModel
      .findByIdAndUpdate(
        userId,
        { $max: { [`pronunciationScores.${key}`]: dto.score } },
        { new: true, runValidators: true },
      )
      .select('pronunciationScores')
      .lean();
    if (!updated) throw new NotFoundException('유저를 찾을 수 없습니다');

    return { scores: updated.pronunciationScores || {} };
  }

  async getPronunciation(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('pronunciationScores')
      .lean();
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다');
    return { scores: user.pronunciationScores || {} };
  }

  async updateAvatar(userId: string, dto: UpdateAvatarDto) {
    const updated = await this.userModel
      .findByIdAndUpdate(
        userId,
        {
          $set: {
            avatar: {
              ...dto,
            },
          },
        },
        {
          returnDocument: 'after',
          runValidators: true,
        },
      )
      .select('avatar')
      .lean();

    if (!updated) {
      throw new NotFoundException('유저를 찾을 수 없습니다');
    }

    return {
      avatar: updated.avatar || {
        ...DEFAULT_AVATAR_CONFIG,
      },
    };
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

    // 팔로우 당한 쪽에 알림. 실패해도 팔로우 자체는 성공시킨다.
    const me = await this.userModel
      .findById(currentUserId)
      .select('nickname profileImage')
      .lean();
    await this.notifications
      .create(targetUserId, NotificationType.FOLLOW, {
        params: { nickname: me?.nickname ?? '' },
        link: `/friend-profile?id=${currentUserId}`,
        imageUrl: me?.profileImage ?? '',
      })
      .catch(() => {});

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

  /** 유저 목록에 현재 유저 기준 관계(isFollowing/isFollowedBy) 부여 */
  private async decorateRelations(users: any[], currentUserId: string) {
    const me = await this.userModel
      .findById(currentUserId)
      .select('following followers')
      .lean();
    const followingSet = new Set(
      (me?.following ?? []).map((f) => f.toString()),
    );
    const followerSet = new Set((me?.followers ?? []).map((f) => f.toString()));
    return users.map((u) => {
      const id = u._id.toString();
      return {
        id,
        nickname: u.nickname,
        username: u.username || '',
        profileImage: u.profileImage || '',
        avatar: u.avatar || {
          ...DEFAULT_AVATAR_CONFIG,
        },
        streak: u.streak || 0,
        totalXP: u.totalXP || 0,
        league: u.league,
        targetLanguage: u.targetLanguage,
        level: u.level,
        isMe: id === currentUserId,
        isFollowing: followingSet.has(id),
        isFollowedBy: followerSet.has(id),
      };
    });
  }

  /** 팔로잉 목록 (targetUserId가 팔로우하는 사람들 + 나와의 관계) */
  async getFollowing(targetUserId: string, currentUserId: string) {
    const user = await this.userModel
      .findById(targetUserId)
      .populate({
        path: 'following',
        select:
          'nickname username profileImage avatar streak totalXP league targetLanguage level',
      })
      .lean();

    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다');
    }

    const following = ((user.following as any[]) || []).map((friend) => ({
      ...friend,
      avatar: friend.avatar || {
        ...DEFAULT_AVATAR_CONFIG,
      },
    }));

    return this.decorateRelations(following, currentUserId);
  }

  /** 팔로워 목록 (targetUserId를 팔로우하는 사람들 + 나와의 관계) */
  async getFollowers(targetUserId: string, currentUserId: string) {
    const user = await this.userModel
      .findById(targetUserId)
      .populate({
        path: 'followers',
        select:
          'nickname username profileImage avatar streak totalXP league targetLanguage level',
      })
      .lean();

    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다');
    }

    const followers = ((user.followers as any[]) || []).map((friend) => ({
      ...friend,
      avatar: friend.avatar || {
        ...DEFAULT_AVATAR_CONFIG,
      },
    }));
    return this.decorateRelations(followers, currentUserId);
  }

  private getMonthLabel(date: Date, lang: string, tz?: string): string {
    const month = dateParts(date, tz).month;
    const SHORT_UZ = [
      'Yan',
      'Fev',
      'Mar',
      'Apr',
      'May',
      'Iyn',
      'Iyl',
      'Avg',
      'Sen',
      'Okt',
      "No'y",
      'Dek',
    ];
    const SHORT_EN = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const SHORT_RU = [
      'Янв',
      'Фев',
      'Мар',
      'Апр',
      'Май',
      'Июн',
      'Июл',
      'Авг',
      'Сен',
      'Окт',
      'Ноя',
      'Дек',
    ];
    switch (lang) {
      case 'ko':
        return `${month}월`;
      case 'uz':
        return SHORT_UZ[month - 1];
      case 'ru':
        return SHORT_RU[month - 1];
      case 'en':
      default:
        return SHORT_EN[month - 1];
    }
  }

  /**
   * UserStats 기준으로 연속 학습일을 계산하고, 값이 바뀌었으면 user 에 반영.
   * 읽기 시점에 계산하므로 "이틀 이상 안 하면 끊김"이 자동으로 반영된다.
   */
  /**
   * 이 유저 기준 시간대. 하루·한 주의 경계를 자를 때 반드시 이걸 거친다.
   * 값이 없으면 APP_TIMEZONE 으로 떨어진다.
   */
  async getTimezone(userId: string): Promise<string> {
    const u = await this.userModel
      .findById(userId)
      .select('timezone')
      .lean();
    return resolveTimezone(u?.timezone);
  }

  async syncStreak(userId: string, prevLongest = 0) {
    const uId = new Types.ObjectId(userId);
    const rows = await this.statsModel
      .find({
        userId: uId,
        $or: [{ xpEarned: { $gt: 0 } }, { totalQuestions: { $gt: 0 } }],
      })
      .select('date')
      .lean();

    const tz = await this.getTimezone(userId);
    const { current, longest } = calcStreak(
      rows.map((r) => r.date),
      new Date(),
      tz,
    );
    const nextLongest = Math.max(longest, current, prevLongest);

    await this.userModel
      .updateOne(
        { _id: uId },
        { $set: { streak: current, longestStreak: nextLongest } },
      )
      .catch(() => {});

    return { current, longest: nextLongest };
  }

  /** 특정 월의 학습한 날짜 리스트 (1-31) + 연속 학습일 */
  async getCalendar(userId: string, year: number, month: number) {
    const tz = await this.getTimezone(userId);
    // month 는 1-12 (0-indexed 가 아니라)
    const start = new Date(year, month - 1, 1, 0, 0, 0);
    const end = new Date(year, month, 1, 0, 0, 0);
    const uId = new Types.ObjectId(userId);
    // 실제로 학습이 있었던 날만 (빈 레코드 제외)
    const studied = {
      $or: [{ xpEarned: { $gt: 0 } }, { totalQuestions: { $gt: 0 } }],
    };

    const [monthStats, allStats] = await Promise.all([
      this.statsModel
        .find({ userId: uId, date: { $gte: start, $lt: end }, ...studied })
        .select('date')
        .lean(),
      // 연속 계산은 월 경계를 넘나들기 때문에 전체 기록이 필요
      this.statsModel
        .find({ userId: uId, ...studied })
        .select('date')
        .lean(),
    ]);

    const completedDays = Array.from(
      new Set(monthStats.map((s) => dateParts(s.date, tz).day)),
    ).sort((a, b) => a - b);

    const { current, longest, days } = calcStreak(
      allStats.map((s) => s.date),
      new Date(),
      tz,
    );

    // 현재 연속 구간 중 이번 달에 속하는 날짜만 (달력 하이라이트용)
    const streakDays = days
      .filter((d) => {
        const dp = dateParts(d, tz);
        return dp.year === year && dp.month === month;
      })
      .map((d) => dateParts(d, tz).day);

    return {
      year,
      month,
      completedDays,
      streakDays,
      streak: current,
      longestStreak: longest,
    };
  }

  /** 최근 N일 (기본 7일) 일별 학습 통계 */
  async getWeeklyStats(userId: string, endDateStr?: string) {
    const tz = await this.getTimezone(userId);
    // 오늘(또는 지정일) 기준 지난 7일: 왼쪽=6일 전, 오른쪽 끝=오늘.
    // 경계는 전부 유저 시간대로 자른다 — 서버 로컬로 자르면 유저의 하루와 어긋난다.
    const base = endDateStr ? new Date(endDateStr) : new Date();
    const startDate = startOfDayPlus(base, -6, tz);
    const endDate = startOfDayPlus(base, 1, tz);

    const stats = await this.statsModel
      .find({
        userId: new Types.ObjectId(userId),
        date: { $gte: startDate, $lt: endDate },
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
      categories: CategoryCounts;
    }> = [];

    for (let i = 0; i < 7; i++) {
      const d = startOfDayPlus(startDate, i, tz);
      const key = dayKey(d, tz);
      const stat = stats.find((s) => dayKey(new Date(s.date), tz) === key);
      result.push({
        date: key,
        studyTimeSeconds: stat?.studyTimeSeconds || 0,
        totalQuestions: stat?.totalQuestions || 0,
        correctQuestions: stat?.correctQuestions || 0,
        xpEarned: stat?.xpEarned || 0,
        categories: toCounts(stat?.categoryCounts as any),
      });
    }
    return { days: result };
  }

  // ── i18n 라벨 헬퍼 ──
  private getDayLabel(
    date: Date,
    isToday: boolean,
    lang: string,
    tz?: string,
  ): string {
    const TODAY = { ko: '오늘', uz: 'Bugun', en: 'Today', ru: 'Сегодня' };
    if (isToday) return TODAY[lang as keyof typeof TODAY] ?? TODAY.en;

    const DAYS: Record<string, string[]> = {
      ko: ['일', '월', '화', '수', '목', '금', '토'],
      uz: ['Yak', 'Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sha'],
      en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    };
    const wd = dateParts(date, tz).weekday;
    return DAYS[lang]?.[wd] ?? DAYS.en[wd];
  }

  private formatTime(seconds: number): string {
    const mm = Math.floor(seconds / 60);
    const ss = Math.floor(seconds % 60);
    return `${mm}:${ss.toString().padStart(2, '0')}`;
  }

  private formatTimeLong(seconds: number, lang: string): string {
    const mm = Math.floor(seconds / 60);
    const ss = Math.floor(seconds % 60);
    const labels: Record<string, [string, string]> = {
      ko: ['분', '초'],
      uz: ['daq', 'son'],
      en: ['m', 's'],
      ru: ['м', 'с'],
    };
    const [m, s] = labels[lang] ?? labels.en;
    if (mm === 0) return `${ss}${s}`;
    return `${mm}${m} ${ss}${s}`;
  }

  private formatDate(d: Date, tz?: string): string {
    const p = dateParts(d, tz);
    const m = String(p.month).padStart(2, '0');
    const day = String(p.day).padStart(2, '0');
    return `${p.year}.${m}.${day}`;
  }

  // ── Period 통계 ──
  async getPeriodStats(
    userId: string,
    range: 'week' | 'month' | 'year' | 'all' = 'week',
    endDateStr: string | undefined,
    lang: string = 'uz',
  ) {
    const tz = await this.getTimezone(userId);
    let todayStudySeconds = 0;
    let todayTotalQ = 0;
    let todayCats: CategoryCounts = emptyCounts();

    // 범위의 끝은 "그 날의 끝" = 다음 날 자정 직전 (유저 tz 기준)
    const endDate = new Date(
      startOfDayPlus(endDateStr ? new Date(endDateStr) : new Date(), 1, tz)
        .getTime() - 1,
    );

    let startDate: Date;
    let bucketBy: 'day' | 'month';
    let bucketCount: number;

    switch (range) {
      case 'week':
        startDate = startOfDayPlus(endDate, -6, tz);
        bucketBy = 'day';
        bucketCount = 7;
        break;
      case 'month':
        startDate = startOfDayPlus(endDate, -29, tz);
        bucketBy = 'day';
        bucketCount = 30;
        break;
      case 'year':
        startDate = startOfMonthPlus(endDate, -11, tz);
        bucketBy = 'month';
        bucketCount = 12;
        break;
      case 'all': {
        const user = await this.userModel.findById(userId).lean();
        const joined = user?.createdAt
          ? new Date((user as any).createdAt)
          : endDate;
        startDate = startOfMonth(joined, tz);
        bucketBy = 'month';
        const a = dateParts(startDate, tz);
        const b = dateParts(endDate, tz);
        bucketCount = Math.max(
          1,
          (b.year - a.year) * 12 + (b.month - a.month) + 1,
        );
        break;
      }
    }
    startDate = startOfDay(startDate, tz);

    // 데이터 조회
    const stats = await this.statsModel
      .find({
        userId: new Types.ObjectId(userId),
        date: { $gte: startDate, $lte: endDate },
      })
      .lean();

    const today = startOfDay(new Date(), tz);
    const todayKey = dayKey(today, tz);

    const timePoints: any[] = [];
    const volumePoints: any[] = [];
    let totalStudySeconds = 0;
    let totalQuestions = 0;
    let activeDays = 0;
    let todayHasData = false;

    if (bucketBy === 'day') {
      for (let i = 0; i < bucketCount; i++) {
        const d = startOfDayPlus(startDate, i, tz);
        const key = dayKey(d, tz);
        const stat = stats.find((s) => dayKey(new Date(s.date), tz) === key);
        const isToday = key === todayKey;

        const seconds = stat?.studyTimeSeconds || 0;
        const minutes = seconds / 60;
        const cats = toCounts(stat?.categoryCounts as any);
        const dayTotal = sumCounts(cats);
        const label =
          range === 'week'
            ? this.getDayLabel(d, isToday, lang, tz)
            : (() => {
                const dp = dateParts(d, tz);
                return `${dp.month}/${dp.day}`;
              })();

        if (isToday) {
          todayStudySeconds = seconds;
          todayTotalQ = dayTotal;
          todayCats = cats;
          if ((stat?.totalQuestions || 0) > 0) todayHasData = true;
        }

        timePoints.push({
          date: dayKey,
          label,
          minutes: Math.round(minutes * 10) / 10,
        });

        volumePoints.push({ date: dayKey, label, ...cats });

        if (seconds > 0) {
          totalStudySeconds += seconds;
          activeDays++;
        }
        totalQuestions += dayTotal;
      }
    } else {
      // monthly buckets (year, all)
      for (let i = 0; i < bucketCount; i++) {
        const monthStart = startOfMonthPlus(startDate, i, tz);
        const monthEnd = new Date(
          startOfMonthPlus(startDate, i + 1, tz).getTime() - 1,
        );
        const m = monthStart;

        const monthStats = stats.filter((s) => {
          const sd = new Date(s.date);
          return sd >= monthStart && sd <= monthEnd;
        });

        const seconds = monthStats.reduce(
          (acc, s) => acc + (s.studyTimeSeconds || 0),
          0,
        );
        const minutes = seconds / 60;
        const cats = monthStats.reduce((acc, st) => {
          const c = toCounts(st.categoryCounts as any);
          for (const k of STUDY_CATEGORIES) acc[k] += c[k];
          return acc;
        }, emptyCounts());
        const monthTotal = sumCounts(cats);
        const monthActiveDays = monthStats.filter(
          (s) => (s.studyTimeSeconds || 0) > 0,
        ).length;

        const label = this.getMonthLabel(m, lang, tz);
        const mp = dateParts(m, tz);
        const dateKey = `${mp.year}-${String(mp.month).padStart(2, '0')}`;

        timePoints.push({
          date: dateKey,
          label,
          minutes: Math.round(minutes * 10) / 10,
        });

        volumePoints.push({ date: dateKey, label, ...cats });

        if (seconds > 0) {
          totalStudySeconds += seconds;
          activeDays += monthActiveDays;
        }
        totalQuestions += monthTotal;

        if (monthStart <= today && monthEnd >= today) {
          const todayStat = monthStats.find(
            (s) => dayKey(new Date(s.date), tz) === todayKey,
          );
          if (todayStat && (todayStat.totalQuestions || 0) > 0) {
            todayHasData = true;
          }
        }
      }
    }

    const avgSeconds =
      activeDays > 0 ? Math.round(totalStudySeconds / activeDays) : 0;
    const totalSpanDays =
      bucketBy === 'day'
        ? bucketCount
        : Math.max(
            1,
            Math.ceil(
              (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
            ),
          );
    const avgPerDay =
      totalSpanDays > 0 ? Math.round(totalQuestions / totalSpanDays) : 0;

    // 평균 라벨: 분 또는 일 단위
    const avgLabel =
      bucketBy === 'day'
        ? this.formatTimeLong(avgSeconds, lang)
        : this.formatTimeLong(avgSeconds, lang);

    // 365일 히트맵 (range 와 무관, 항상 동일)
    const heatmap = await this.buildHeatmap(userId);

    return {
      range,
      todayHasData,
      heatmap,
      studyTime: {
        avgPerDayLabel: avgLabel,
        rangeLabel: `${this.formatDate(startDate, tz)} - ${this.formatDate(endDate, tz)}`,
        points: timePoints,
      },
      studyVolume: {
        avgPerDay,
        points: volumePoints,
      },
      today: {
        studyTimeLabel: `${String(Math.floor(todayStudySeconds / 60)).padStart(2, '0')}:${String(todayStudySeconds % 60).padStart(2, '0')}`,
        totalQuestions: todayTotalQ,
        // 새/복습 split·정답률은 SRS 소스 필요 → 지금은 전부 new, 정답률 null
        categories: Object.entries(todayCats)
          .filter(([, c]) => c > 0)
          .map(([category, c]) => ({
            category,
            total: c,
            newCount: c,
            reviewCount: 0,
            reviewAccuracy: null,
          })),
        weekdayIndex: dateParts(today, tz).weekday,
        avgTimeLabel: avgLabel,
        avgProblems: avgPerDay,
      },
    };
  }

  // ── Category 통계 ──
  async getCategoryStats(
    userId: string,
    category: string,
    range: 'week' | 'month' | 'year' | 'all' = 'week',
    endDateStr: string | undefined,
    lang: string = 'uz',
  ) {
    if (!(STUDY_CATEGORIES as string[]).includes(category)) {
      throw new BadRequestException(`Invalid category: ${category}`);
    }
    const tz = await this.getTimezone(userId);

    // Map 필드는 dot path 로 접근 (categoryCounts.vocab)
    const field = `categoryCounts.${category}`;

    // 범위의 끝은 "그 날의 끝" = 다음 날 자정 직전 (유저 tz 기준)
    const endDate = new Date(
      startOfDayPlus(endDateStr ? new Date(endDateStr) : new Date(), 1, tz)
        .getTime() - 1,
    );

    // range 별로 startDate / bucket 결정 (getPeriodStats 와 동일 로직)
    let startDate: Date;
    let bucketBy: 'day' | 'month';
    let bucketCount: number;

    switch (range) {
      case 'week':
        startDate = startOfDayPlus(endDate, -6, tz);
        bucketBy = 'day';
        bucketCount = 7;
        break;
      case 'month':
        startDate = startOfDayPlus(endDate, -29, tz);
        bucketBy = 'day';
        bucketCount = 30;
        break;
      case 'year':
        startDate = startOfMonthPlus(endDate, -11, tz);
        bucketBy = 'month';
        bucketCount = 12;
        break;
      case 'all': {
        const user = await this.userModel.findById(userId).lean();
        const joined = user?.createdAt
          ? new Date((user as any).createdAt)
          : endDate;
        startDate = startOfMonth(joined, tz);
        bucketBy = 'month';
        const a = dateParts(startDate, tz);
        const b = dateParts(endDate, tz);
        bucketCount = Math.max(
          1,
          (b.year - a.year) * 12 + (b.month - a.month) + 1,
        );
        break;
      }
    }
    startDate = startOfDay(startDate, tz);

    // 전체 합계
    const allStats = await this.statsModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalCategoryCount: { $sum: `$${field}` },
          totalQuestions: { $sum: '$totalQuestions' },
          totalStudyTime: { $sum: '$studyTimeSeconds' },
        },
      },
    ]);
    const all = allStats[0] || {
      totalCategoryCount: 0,
      totalQuestions: 0,
      totalStudyTime: 0,
    };
    const allRatio =
      all.totalQuestions > 0 ? all.totalCategoryCount / all.totalQuestions : 0;
    const totalTimeSeconds = Math.round(all.totalStudyTime * allRatio);

    // 오늘 시간
    const today = startOfDay(new Date(), tz);
    const todayStat = await this.statsModel.findOne({
      userId: new Types.ObjectId(userId),
      date: { $gte: today },
    });
    let todayTimeSeconds = 0;
    if (todayStat) {
      const todayRatio =
        todayStat.totalQuestions > 0
          ? toCounts(todayStat.categoryCounts as any)[
              category as StudyCategory
            ] / todayStat.totalQuestions
          : 0;
      todayTimeSeconds = Math.round(todayStat.studyTimeSeconds * todayRatio);
    }

    // 차트 데이터
    const periodStats = await this.statsModel
      .find({
        userId: new Types.ObjectId(userId),
        date: { $gte: startDate, $lte: endDate },
      })
      .lean();

    const todayKey = dayKey(today, tz);
    const chart: any[] = [];

    if (bucketBy === 'day') {
      for (let i = 0; i < bucketCount; i++) {
        const d = startOfDayPlus(startDate, i, tz);
        const key = dayKey(d, tz);
        const stat = periodStats.find(
          (s) => dayKey(new Date(s.date), tz) === key,
        );
        const isToday = key === todayKey;
        const label =
          range === 'week'
            ? this.getDayLabel(d, isToday, lang, tz)
            : (() => {
                const dp = dateParts(d, tz);
                return `${dp.month}/${dp.day}`;
              })();

        const count = stat
          ? toCounts(stat.categoryCounts as any)[category as StudyCategory]
          : 0;

        chart.push({
          date: dayKey,
          label,
          newWords: count,
          knownWords: 0,
          reviewWords: 0,
        });
      }
    } else {
      for (let i = 0; i < bucketCount; i++) {
        const monthStart = startOfMonthPlus(startDate, i, tz);
        const monthEnd = new Date(
          startOfMonthPlus(startDate, i + 1, tz).getTime() - 1,
        );
        const m = monthStart;
        const monthStats = periodStats.filter((s) => {
          const sd = new Date(s.date);
          return sd >= monthStart && sd <= monthEnd;
        });
        const count = monthStats.reduce(
          (acc, st) =>
            acc + toCounts(st.categoryCounts as any)[category as StudyCategory],
          0,
        );
        const label = this.getMonthLabel(m, lang, tz);
        const mp = dateParts(m, tz);
        const dateKey = `${mp.year}-${String(mp.month).padStart(2, '0')}`;
        chart.push({
          date: dateKey,
          label,
          newWords: count,
          knownWords: 0,
          reviewWords: 0,
        });
      }
    }

    return {
      range,
      trophyLevel: null,
      totalProblems: all.totalCategoryCount,
      todayTime: this.formatTime(todayTimeSeconds),
      totalTime: this.formatTime(totalTimeSeconds),
      newWordsToday: null,
      knownWordsToday: null,
      reviewWordsToday: null,
      reviewAccuracy: null,
      chart, // ⚠️ weekChart → chart 로 변경
    };
  }

  private async buildHeatmap(userId: string) {
    const tz = await this.getTimezone(userId);
    const heatmapStart = startOfDayPlus(new Date(), -364, tz);

    const yearStats = await this.statsModel
      .find({
        userId: new Types.ObjectId(userId),
        date: { $gte: heatmapStart },
      })
      .lean();

    const secondsByDate = new Map<string, number>();
    for (const s of yearStats) {
      const key = dayKey(new Date(s.date), tz);
      secondsByDate.set(
        key,
        (secondsByDate.get(key) || 0) + (s.studyTimeSeconds || 0),
      );
    }

    const heatmap: any[] = [];
    for (let i = 364; i >= 0; i--) {
      const key = dayKey(startOfDayPlus(new Date(), -i, tz), tz);
      const seconds = secondsByDate.get(key) || 0;
      heatmap.push({ date: key, intensity: this.secondsToIntensity(seconds) });
    }
    return heatmap;
  }

  private secondsToIntensity(seconds: number): 0 | 1 | 2 | 3 | 4 {
    if (seconds <= 0) return 0;
    const minutes = seconds / 60;
    if (minutes < 5) return 1;
    if (minutes < 15) return 2;
    if (minutes < 30) return 3;
    return 4;
  }

  async searchUsers(currentUserId: string, q: string) {
    // ?q=a&q=b 로 오면 express 가 배열을 준다. 그대로 .trim() 하면 500.
    const raw = Array.isArray(q) ? q[0] : q;
    const query = (typeof raw === 'string' ? raw : '').trim().slice(0, 60);
    if (!query) return [];

    // 정규식 이스케이프 (특수문자 안전)
    const safe = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(safe, 'i');

    const me = await this.userModel
      .findById(currentUserId)
      .select(
        'nickname username profileImage avatar country targetLanguage totalXP level',
      )
      .lean();
    const followingSet = new Set(
      (me?.following ?? []).map((f) => f.toString()),
    );
    const followerSet = new Set((me?.followers ?? []).map((f) => f.toString()));

    const users = await this.userModel
      .find({
        _id: { $ne: new Types.ObjectId(currentUserId) }, // 본인 제외
        $or: [{ nickname: regex }, { username: regex }],
      })
      .select(
        'nickname username profileImage country targetLanguage totalXP level',
      )
      .limit(30)
      .lean();

    return users.map((u) => ({
      id: u._id.toString(),
      nickname: u.nickname,
      username: u.username || '',
      profileImage: u.profileImage || '',
      avatar: u.avatar || {
        ...DEFAULT_AVATAR_CONFIG,
      },
      isFollowing: followingSet.has(u._id.toString()),
      isFollowedBy: followerSet.has(u._id.toString()),
    }));
  }

  async matchByNames(currentUserId: string, names: string[]) {
    const clean = (names ?? [])
      .map((n) => (typeof n === 'string' ? n : '').trim().slice(0, 60))
      .filter(Boolean)
      .slice(0, 100);
    if (!clean.length) return [];

    const regexes = clean.map(
      (n) => new RegExp(n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
    );

    const me = await this.userModel
      .findById(currentUserId)
      .select('following followers')
      .lean();
    const followingSet = new Set(
      (me?.following ?? []).map((f) => f.toString()),
    );
    const followerSet = new Set((me?.followers ?? []).map((f) => f.toString()));

    const users = await this.userModel
      .find({
        _id: { $ne: new Types.ObjectId(currentUserId) },
        $or: [{ nickname: { $in: regexes } }, { username: { $in: regexes } }],
      })
      .select('nickname username profileImage avatar')
      .limit(50)
      .lean();

    return users.map((u) => ({
      id: u._id.toString(),
      nickname: u.nickname,
      username: u.username || '',
      profileImage: u.profileImage || '',
      avatar: u.avatar || {
        ...DEFAULT_AVATAR_CONFIG,
      },
      isFollowing: followingSet.has(u._id.toString()),
      isFollowedBy: followerSet.has(u._id.toString()),
    }));
  }

  async touchActive(userId: string) {
    await this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      { $set: { lastActiveAt: new Date() } },
    );
    return { ok: true };
  }
}
