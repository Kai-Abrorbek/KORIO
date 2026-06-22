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
import { calculateLevel } from '../common/enums/level.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserStats.name) private statsModel: Model<UserStatsDocument>,
    @InjectModel(UserProgress.name)
    private progressModel: Model<UserProgressDocument>,
  ) {}

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

  private getMonthLabel(date: Date, lang: string): string {
    const month = date.getMonth() + 1;
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
        return SHORT_UZ[date.getMonth()];
      case 'ru':
        return SHORT_RU[date.getMonth()];
      case 'en':
      default:
        return SHORT_EN[date.getMonth()];
    }
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

  // ── i18n 라벨 헬퍼 ──
  private getDayLabel(date: Date, isToday: boolean, lang: string): string {
    const TODAY = { ko: '오늘', uz: 'Bugun', en: 'Today', ru: 'Сегодня' };
    if (isToday) return TODAY[lang as keyof typeof TODAY] ?? TODAY.en;

    const DAYS: Record<string, string[]> = {
      ko: ['일', '월', '화', '수', '목', '금', '토'],
      uz: ['Yak', 'Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sha'],
      en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    };
    return DAYS[lang]?.[date.getDay()] ?? DAYS.en[date.getDay()];
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

  private formatDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}.${m}.${day}`;
  }

  private xpToIntensity(xp: number): 0 | 1 | 2 | 3 | 4 {
    if (xp <= 0) return 0;
    if (xp < 50) return 1;
    if (xp < 150) return 2;
    if (xp < 300) return 3;
    return 4;
  }

  // ── Period 통계 ──
  async getPeriodStats(
    userId: string,
    range: 'week' | 'month' | 'year' | 'all' = 'week',
    endDateStr: string | undefined,
    lang: string = 'uz',
  ) {
    const endDate = endDateStr ? new Date(endDateStr) : new Date();
    endDate.setHours(23, 59, 59, 999);

    let startDate: Date;
    let bucketBy: 'day' | 'month';
    let bucketCount: number;

    switch (range) {
      case 'week':
        startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 6);
        bucketBy = 'day';
        bucketCount = 7;
        break;
      case 'month':
        startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 29);
        bucketBy = 'day';
        bucketCount = 30;
        break;
      case 'year':
        startDate = new Date(endDate);
        startDate.setMonth(startDate.getMonth() - 11);
        startDate.setDate(1);
        bucketBy = 'month';
        bucketCount = 12;
        break;
      case 'all': {
        const user = await this.userModel.findById(userId).lean();
        const joined = user?.createdAt
          ? new Date((user as any).createdAt)
          : endDate;
        startDate = new Date(joined.getFullYear(), joined.getMonth(), 1);
        bucketBy = 'month';
        const monthsDiff =
          (endDate.getFullYear() - startDate.getFullYear()) * 12 +
          (endDate.getMonth() - startDate.getMonth()) +
          1;
        bucketCount = Math.max(1, monthsDiff);
        break;
      }
    }
    startDate.setHours(0, 0, 0, 0);

    // 데이터 조회
    const stats = await this.statsModel
      .find({
        userId: new Types.ObjectId(userId),
        date: { $gte: startDate, $lte: endDate },
      })
      .lean();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayKey = today.toISOString().split('T')[0];

    const timePoints: any[] = [];
    const volumePoints: any[] = [];
    let totalStudySeconds = 0;
    let totalQuestions = 0;
    let activeDays = 0;
    let todayHasData = false;

    if (bucketBy === 'day') {
      for (let i = 0; i < bucketCount; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        const dayKey = d.toISOString().split('T')[0];
        const stat = stats.find(
          (s) => new Date(s.date).toISOString().split('T')[0] === dayKey,
        );
        const isToday = dayKey === todayKey;

        const seconds = stat?.studyTimeSeconds || 0;
        const minutes = seconds / 60;
        const vocab = stat?.vocabularyCount || 0;
        const grammar = stat?.grammarCount || 0;
        const expression = stat?.expressionCount || 0;
        const conversation = stat?.conversationCount || 0;
        const listening = stat?.listeningCount || 0;
        const dayTotal =
          vocab + grammar + expression + conversation + listening;

        const label =
          range === 'week'
            ? this.getDayLabel(d, isToday, lang)
            : `${d.getMonth() + 1}/${d.getDate()}`;

        if (isToday && (stat?.totalQuestions || 0) > 0) todayHasData = true;

        timePoints.push({
          date: dayKey,
          label,
          minutes: Math.round(minutes * 10) / 10,
        });
        volumePoints.push({
          date: dayKey,
          label,
          vocab,
          grammar,
          expression,
          conversation,
          listening,
        });

        if (seconds > 0) {
          totalStudySeconds += seconds;
          activeDays++;
        }
        totalQuestions += dayTotal;
      }
    } else {
      // monthly buckets (year, all)
      for (let i = 0; i < bucketCount; i++) {
        const m = new Date(startDate);
        m.setMonth(startDate.getMonth() + i);
        const monthStart = new Date(m.getFullYear(), m.getMonth(), 1);
        const monthEnd = new Date(
          m.getFullYear(),
          m.getMonth() + 1,
          0,
          23,
          59,
          59,
          999,
        );

        const monthStats = stats.filter((s) => {
          const sd = new Date(s.date);
          return sd >= monthStart && sd <= monthEnd;
        });

        const seconds = monthStats.reduce(
          (acc, s) => acc + (s.studyTimeSeconds || 0),
          0,
        );
        const minutes = seconds / 60;
        const vocab = monthStats.reduce(
          (acc, s) => acc + (s.vocabularyCount || 0),
          0,
        );
        const grammar = monthStats.reduce(
          (acc, s) => acc + (s.grammarCount || 0),
          0,
        );
        const expression = monthStats.reduce(
          (acc, s) => acc + (s.expressionCount || 0),
          0,
        );
        const conversation = monthStats.reduce(
          (acc, s) => acc + (s.conversationCount || 0),
          0,
        );
        const listening = monthStats.reduce(
          (acc, s) => acc + (s.listeningCount || 0),
          0,
        );
        const monthTotal =
          vocab + grammar + expression + conversation + listening;
        const monthActiveDays = monthStats.filter(
          (s) => (s.studyTimeSeconds || 0) > 0,
        ).length;

        const label = this.getMonthLabel(m, lang);
        const dateKey = `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}`;

        timePoints.push({
          date: dateKey,
          label,
          minutes: Math.round(minutes * 10) / 10,
        });
        volumePoints.push({
          date: dateKey,
          label,
          vocab,
          grammar,
          expression,
          conversation,
          listening,
        });

        if (seconds > 0) {
          totalStudySeconds += seconds;
          activeDays += monthActiveDays;
        }
        totalQuestions += monthTotal;

        if (monthStart <= today && monthEnd >= today) {
          const todayStat = monthStats.find(
            (s) => new Date(s.date).toISOString().split('T')[0] === todayKey,
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
        rangeLabel: `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`,
        points: timePoints,
      },
      studyVolume: {
        avgPerDay,
        points: volumePoints,
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
    const validCategories = [
      'vocab',
      'grammar',
      'expression',
      'conversation',
      'listening',
    ];
    if (!validCategories.includes(category)) {
      throw new BadRequestException(`Invalid category: ${category}`);
    }
    const fieldMap: Record<string, string> = {
      vocab: 'vocabularyCount',
      grammar: 'grammarCount',
      expression: 'expressionCount',
      conversation: 'conversationCount',
      listening: 'listeningCount',
    };
    const field = fieldMap[category];

    const endDate = endDateStr ? new Date(endDateStr) : new Date();
    endDate.setHours(23, 59, 59, 999);

    // range 별로 startDate / bucket 결정 (getPeriodStats 와 동일 로직)
    let startDate: Date;
    let bucketBy: 'day' | 'month';
    let bucketCount: number;

    switch (range) {
      case 'week':
        startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 6);
        bucketBy = 'day';
        bucketCount = 7;
        break;
      case 'month':
        startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 29);
        bucketBy = 'day';
        bucketCount = 30;
        break;
      case 'year':
        startDate = new Date(endDate);
        startDate.setMonth(startDate.getMonth() - 11);
        startDate.setDate(1);
        bucketBy = 'month';
        bucketCount = 12;
        break;
      case 'all': {
        const user = await this.userModel.findById(userId).lean();
        const joined = user?.createdAt
          ? new Date((user as any).createdAt)
          : endDate;
        startDate = new Date(joined.getFullYear(), joined.getMonth(), 1);
        bucketBy = 'month';
        bucketCount = Math.max(
          1,
          (endDate.getFullYear() - startDate.getFullYear()) * 12 +
            (endDate.getMonth() - startDate.getMonth()) +
            1,
        );
        break;
      }
    }
    startDate.setHours(0, 0, 0, 0);

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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStat = await this.statsModel.findOne({
      userId: new Types.ObjectId(userId),
      date: { $gte: today },
    });
    let todayTimeSeconds = 0;
    if (todayStat) {
      const todayRatio =
        todayStat.totalQuestions > 0
          ? ((todayStat as any)[field] || 0) / todayStat.totalQuestions
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

    const todayKey = today.toISOString().split('T')[0];
    const chart: any[] = [];

    if (bucketBy === 'day') {
      for (let i = 0; i < bucketCount; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        const dayKey = d.toISOString().split('T')[0];
        const stat = periodStats.find(
          (s) => new Date(s.date).toISOString().split('T')[0] === dayKey,
        );
        const isToday = dayKey === todayKey;
        const label =
          range === 'week'
            ? this.getDayLabel(d, isToday, lang)
            : `${d.getMonth() + 1}/${d.getDate()}`;
        const count = stat ? (stat as any)[field] || 0 : 0;
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
        const m = new Date(startDate);
        m.setMonth(startDate.getMonth() + i);
        const monthStart = new Date(m.getFullYear(), m.getMonth(), 1);
        const monthEnd = new Date(
          m.getFullYear(),
          m.getMonth() + 1,
          0,
          23,
          59,
          59,
          999,
        );
        const monthStats = periodStats.filter((s) => {
          const sd = new Date(s.date);
          return sd >= monthStart && sd <= monthEnd;
        });
        const count = monthStats.reduce(
          (acc, s) => acc + ((s as any)[field] || 0),
          0,
        );
        const label = this.getMonthLabel(m, lang);
        const dateKey = `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}`;
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
    const heatmapStart = new Date();
    heatmapStart.setHours(0, 0, 0, 0);
    heatmapStart.setDate(heatmapStart.getDate() - 364);

    const yearStats = await this.statsModel
      .find({
        userId: new Types.ObjectId(userId),
        date: { $gte: heatmapStart },
      })
      .lean();

    const statsByDate = new Map<string, number>();
    for (const s of yearStats) {
      const key = new Date(s.date).toISOString().split('T')[0];
      statsByDate.set(key, (statsByDate.get(key) || 0) + (s.xpEarned || 0));
    }

    const heatmap: any[] = [];
    for (let i = 364; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const xp = statsByDate.get(key) || 0;
      heatmap.push({ date: key, intensity: this.xpToIntensity(xp) });
    }
    return heatmap;
  }
}
