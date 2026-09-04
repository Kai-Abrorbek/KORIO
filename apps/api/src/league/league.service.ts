import { Injectable, NotFoundException } from '@nestjs/common';
import {
  LEAGUE_TIMEZONE,
  dayKey,
  startOfDay,
  startOfDayPlus,
  startOfWeek,
} from '../common/date.util';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument, UserLeague } from '../users/schemas/user.schema';
import {
  UserStats,
  UserStatsDocument,
} from '../users/schemas/user-stats.schema';
import { LeagueRoom, LeagueRoomDocument } from './schemas/league-room.schema';
import { BOT_PROFILES, TIER_BOT_MULTIPLIER } from './league.bots';
import { Cron } from '@nestjs/schedule';
import { DEFAULT_AVATAR_CONFIG } from '../users/avatar/avatar.constants';

const MIN_MEMBERS = 8; // 방에 최소 이만큼은 있게 (봇으로 채움)

const TIER_ORDER: UserLeague[] = [
  UserLeague.BRONZE,
  UserLeague.SILVER,
  UserLeague.GOLD,
  UserLeague.SAPPHIRE,
  UserLeague.RUBY,
  UserLeague.EMERALD,
  UserLeague.AMETHYST,
  UserLeague.PEARL,
  UserLeague.OBSIDIAN,
  UserLeague.DIAMOND,
];

// 티어별 승급/강등 인원 + 1·2·3위 젬 상자 (위로 갈수록 승급 빡세게, 보상 큼)
const TIER_CONFIG: Record<
  UserLeague,
  { promote: number; demote: number; chest: [number, number, number] }
> = {
  [UserLeague.BRONZE]: { promote: 15, demote: 0, chest: [20, 15, 10] },
  [UserLeague.SILVER]: { promote: 12, demote: 5, chest: [25, 18, 12] },
  [UserLeague.GOLD]: { promote: 10, demote: 5, chest: [30, 22, 15] },
  [UserLeague.SAPPHIRE]: { promote: 8, demote: 5, chest: [40, 28, 18] },
  [UserLeague.RUBY]: { promote: 7, demote: 5, chest: [50, 35, 22] },
  [UserLeague.EMERALD]: { promote: 6, demote: 5, chest: [65, 45, 28] },
  [UserLeague.AMETHYST]: { promote: 5, demote: 6, chest: [80, 55, 35] },
  [UserLeague.PEARL]: { promote: 5, demote: 6, chest: [100, 70, 45] },
  [UserLeague.OBSIDIAN]: { promote: 5, demote: 7, chest: [130, 90, 55] },
  [UserLeague.DIAMOND]: { promote: 0, demote: 7, chest: [200, 130, 80] },
};

const ROOM_SIZE = 30;
const CHALLENGE_XP = 210;
const ONLINE_WINDOW_MS = 5 * 60 * 1000; // 5분 내 활동 = 온라인

import { NotificationsService } from '../notifications/notifications.service';
import { PushService } from '../push/push.service';
import { PushType } from '../push/push.types';
import { NotificationType } from '../notifications/schemas/notification.schema';

@Injectable()
export class LeagueService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserStats.name) private statsModel: Model<UserStatsDocument>,
    @InjectModel(LeagueRoom.name) private roomModel: Model<LeagueRoomDocument>,
    private readonly notifications: NotificationsService,
    private readonly push: PushService,
  ) {}

  // 주 경계(월 00:00) 직후에 정산.
  //
  // 리그는 방 안의 모두가 같은 창으로 비교돼야 하므로 유저별 시간대를 쓸 수 없다.
  // 주 시장 기준(LEAGUE_TIMEZONE = Asia/Tashkent)으로 고정한다. 예전에는 서버
  // 로컬(KST)이라 월요일 00:05 KST = **일요일 저녁 20:05 타슈켄트** 였다 —
  // 유저는 아직 일요일 밤인데 리그가 끝나 있었다.
  @Cron('5 0 * * 1', { timeZone: LEAGUE_TIMEZONE })
  async handleWeeklySettlement() {
    console.log('🏆 주간 리그 자동 정산 시작...');
    const result = await this.settleWeek(); // 지난주 방들
    console.log(`✅ 자동 정산 완료: ${result.settled}개 방`);
  }

  // ISO 주차 키 ("2026-W26"). 날짜는 리그 기준 시간대로 읽는다.
  getWeekKey(d = new Date()): string {
    const [y, m, day0] = dayKey(d, LEAGUE_TIMEZONE).split('-').map(Number);
    const date = new Date(Date.UTC(y, m - 1, day0));
    const day = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - day);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const week = Math.ceil(
      (((date as any) - (yearStart as any)) / 86400000 + 1) / 7,
    );
    return `${date.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
  }

  // 이번 주 월요일 0시 ~ 다음 월요일 (리그 기준 시간대)
  private weekRange(d = new Date()) {
    const start = startOfWeek(d, LEAGUE_TIMEZONE);
    const end = startOfDayPlus(start, 7, LEAGUE_TIMEZONE);
    return { start, end };
  }

  // ISO 주차 키("2026-W33") -> 그 주 월요일 0시 ~ 다음 월요일 0시 (getWeekKey 역함수)
  // ISO 규칙상 1월 4일은 항상 그 해 1주차에 속한다.
  private weekRangeFromKey(weekKey: string) {
    const [yStr, wStr] = (weekKey ?? '').split('-W');
    const year = Number(yStr);
    const week = Number(wStr);
    if (!year || !week) return this.weekRange();

    // 1월 4일이 속한 주의 월요일이 그 해 1주차의 시작이다 (ISO 규칙)
    const jan4 = startOfDay(new Date(Date.UTC(year, 0, 4, 12)), LEAGUE_TIMEZONE);
    const week1Monday = startOfWeek(jan4, LEAGUE_TIMEZONE);

    const start = startOfDayPlus(week1Monday, (week - 1) * 7, LEAGUE_TIMEZONE);
    const end = startOfDayPlus(start, 7, LEAGUE_TIMEZONE);
    return { start, end };
  }

  // 주간 XP 집계 (UserStats) — range 미지정 시 이번 주
  private async getWeeklyXp(
    userIds: Types.ObjectId[],
    range?: { start: Date; end: Date },
  ): Promise<Map<string, number>> {
    const { start, end } = range ?? this.weekRange();
    const rows = await this.statsModel.aggregate([
      { $match: { userId: { $in: userIds }, date: { $gte: start, $lt: end } } },
      { $group: { _id: '$userId', xp: { $sum: '$xpEarned' } } },
    ]);
    const map = new Map<string, number>();
    rows.forEach((r) => map.set(r._id.toString(), r.xp));
    return map;
  }

  private botOnline(nickname: string): boolean {
    const slot = Math.floor(Date.now() / (5 * 60 * 1000));
    let seed = slot;
    for (let i = 0; i < nickname.length; i++)
      seed = (seed * 31 + nickname.charCodeAt(i)) % 997;
    return seed % 2 === 0;
  }

  // 내 리그방 가져오기 (없으면 배정)
  async getMyLeague(userId: string) {
    const weekKey = this.getWeekKey();
    const user = await this.userModel
      .findById(userId)
      .select('league nickname profileImage avatar previousLeagueRank')
      .lean();
    if (!user) throw new NotFoundException('User not found');
    const tier = user.league ?? UserLeague.BRONZE;

    let room = await this.roomModel.findOne({
      weekKey,
      tier,
      members: new Types.ObjectId(userId),
    });

    if (!room) {
      room = await this.roomModel.findOne({
        weekKey,
        tier,
        settled: false,
        $expr: { $lt: [{ $size: '$members' }, ROOM_SIZE] },
      });
      if (!room) {
        room = await this.roomModel.create({ tier, weekKey, members: [] });
      }
      await this.roomModel.findByIdAndUpdate(room._id, {
        $addToSet: { members: new Types.ObjectId(userId) },
      });
      room = await this.roomModel.findById(room._id);
    }

    // ✅ 봇으로 채우기 (실유저 적을 때)
    const realCount = await this.userModel.countDocuments({
      _id: { $in: room!.members },
      isBot: { $ne: true },
    });

    await this.fillWithBots(room!._id as Types.ObjectId, room!.members.length);
    room = await this.roomModel.findById(room!._id);

    // 멤버 정보 + 주간 XP
    const members = await this.userModel
      .find({ _id: { $in: room!.members } })
      .select('nickname profileImage avatar league isBot lastActiveAt streak')
      .lean();
    const xpMap = await this.getWeeklyXp(room!.members);

    const now = Date.now();
    const ranked = members
      .map((m: any) => ({
        id: m._id.toString(),
        nickname: m.nickname,
        profileImage: m.profileImage || '',
        avatar: m.isBot
          ? undefined
          : m.avatar || {
              ...DEFAULT_AVATAR_CONFIG,
            },
        xp: m.isBot
          ? this.botXp(m.nickname, tier, weekKey)
          : (xpMap.get(m._id.toString()) ?? 0),
        isMe: m._id.toString() === userId,
        streak: m.streak ?? 0,
        // ✅ 온라인: 봇은 랜덤(고정 시드), 실유저는 lastActiveAt 기준
        online: m.isBot
          ? this.botOnline(m.nickname)
          : !!m.lastActiveAt &&
            now - new Date(m.lastActiveAt).getTime() < ONLINE_WINDOW_MS,
      }))
      .sort((a, b) => b.xp - a.xp)
      .map((m, i) => ({ ...m, rank: i + 1 }));

    const { end } = this.weekRange();
    const me = ranked.find((m) => m.isMe);
    const daysLeft = Math.max(
      0,
      Math.ceil((end.getTime() - Date.now()) / 86400000),
    );

    const prevRank =
      user.previousLeagueRank && user.previousLeagueRank > 0
        ? user.previousLeagueRank
        : (me?.rank ?? 0);

    return {
      tier,
      tierIndex: TIER_ORDER.indexOf(tier),
      weekKey,
      endsAt: end,
      daysLeft,
      promoteCount: TIER_CONFIG[tier]?.promote ?? 0,
      demoteCount: TIER_CONFIG[tier]?.demote ?? 0,
      roomSize: room!.members.length,
      members: ranked,
      myRank: me?.rank ?? 0,
      previousRank: prevRank,
      boostXp: CHALLENGE_XP,
    };
  }

  // 티어 메타 (프론트 표시용)
  getTiers() {
    return {
      tiers: TIER_ORDER.map((t, i) => ({
        id: t,
        index: i,
        promote: TIER_CONFIG[t].promote,
        demote: TIER_CONFIG[t].demote,
        chest: TIER_CONFIG[t].chest,
      })),
    };
  }

  // 정산 (cron 또는 수동 호출) — 지난주 방들 승강등 처리
  async settleWeek(targetWeekKey?: string) {
    const weekKey =
      targetWeekKey ?? this.getWeekKey(new Date(Date.now() - 7 * 86400000));
    // 정산 대상 주의 XP 창. 이걸 안 넘기면 getWeeklyXp 가 "이번 주"를 보게 되는데
    // 정산 시점(월 00:05)엔 전원 0 XP 라 순위가 방 입장순으로 뒤섞인다.
    const range = this.weekRangeFromKey(weekKey);
    const rooms = await this.roomModel.find({ weekKey, settled: false });

    let settledCount = 0;
    for (const room of rooms) {
      // 방을 **먼저** 원자적으로 집는다.
      //
      // 예전엔 보상을 다 준 뒤 마지막에 settled: true 를 찍었다. 그 사이에
      // 다른 인스턴스(무중단 배포 중 새 컨테이너, 또는 관리자 수동 정산)가
      // 같은 방을 읽으면 둘 다 settled:false 로 보고 $inc:{gems} 를 두 번
      // 넣는다 — 젬이 두 배로 나간다. 집은 쪽만 진행한다.
      //
      // 대신 보상 중 크래시가 나면 그 방은 미정산으로 남는다. 이건
      // settled 를 false 로 되돌리고 수동 엔드포인트로 다시 돌리면 된다 —
      // 두 배 지급보다 낫다.
      const claimed = await this.roomModel.findOneAndUpdate(
        { _id: room._id, settled: false },
        { $set: { settled: true } },
      );
      if (!claimed) continue;
      settledCount++;

      const cfg = TIER_CONFIG[room.tier] ?? TIER_CONFIG[UserLeague.BRONZE];
      const tierIdx = TIER_ORDER.indexOf(room.tier);
      const xpMap = await this.getWeeklyXp(room.members, range);
      const ranked = [...room.members].sort(
        (a, b) =>
          (xpMap.get(b.toString()) ?? 0) - (xpMap.get(a.toString()) ?? 0),
      );
      const n = ranked.length;

      for (let i = 0; i < n; i++) {
        const uid = ranked[i];
        const rank = i + 1;
        const gems = i < 3 ? (cfg.chest[i] ?? 0) : 0;

        let change: 'promote' | 'demote' | 'stay' = 'stay';
        let toTier = room.tier;
        if (i < cfg.promote && tierIdx < TIER_ORDER.length - 1) {
          change = 'promote';
          toTier = TIER_ORDER[tierIdx + 1];
        } else if (i >= n - cfg.demote && cfg.demote > 0 && tierIdx > 0) {
          change = 'demote';
          toTier = TIER_ORDER[tierIdx - 1];
        }

        const update: any = {
          $set: {
            pendingLeagueResult: {
              weekKey,
              finalRank: rank,
              fromTier: room.tier,
              toTier,
              change,
              gems,
            },
          },
        };
        if (change !== 'stay') update.$set.league = toTier;
        if (gems > 0) update.$inc = { gems };

        // 봇 제외 (필터로 봇이면 no-op)
        const res = await this.userModel.updateOne(
          { _id: uid, isBot: { $ne: true } },
          update,
        );

        // 실제 유저에게만 알림 (봇은 matchedCount 0)
        if (res.matchedCount > 0) {
          const type =
            change === 'promote'
              ? NotificationType.LEAGUE_PROMOTED
              : change === 'demote'
                ? NotificationType.LEAGUE_DEMOTED
                : NotificationType.LEAGUE_RESULT;

          await this.notifications
            .create(uid.toString(), type, {
              params: { rank, gems, fromTier: room.tier, toTier },
              link: '/(tabs)/league',
            })
            .catch(() => {});

          // 주간 정산은 앱을 안 열고 있을 때(월요일 새벽) 돈다.
          // 인앱 알림만 남기면 다음에 열 때까지 아무도 모른다.
          // dedupKey 에 주차를 넣어 정산이 두 번 돌아도 한 번만 울리게 한다.
          await this.push
            .send(uid.toString(), pushTypeOf(change), {
              params: { rank, gems },
              link: '/(tabs)/league',
              dedupKey: `league:${weekKey}`,
            })
            .catch(() => {});
        }
      }

    }
    return { settled: settledCount, weekKey };
  }

  // 챌린지 시작 시 현재 순위를 저장 (끝나고 애니메이션에 쓸 "이전 순위")
  async snapshotRank(userId: string) {
    const league = await this.getMyLeague(userId);
    const myRank = league.myRank ?? 0;

    await this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      { $set: { previousLeagueRank: myRank } },
    );

    return { previousRank: myRank };
  }

  // 봇 유저 확보 (없으면 생성)
  private async ensureBots(): Promise<UserDocument[]> {
    const existing = await this.userModel.find({ isBot: true }).lean();
    if (existing.length >= BOT_PROFILES.length) return existing as any;

    const have = new Set(existing.map((b: any) => b.nickname));
    const toCreate = BOT_PROFILES.filter((b) => !have.has(b.nickname)).map(
      (b) => ({
        nickname: b.nickname,
        email: `bot_${b.nickname.toLowerCase()}@korio.bot`,
        password: 'bot',
        isBot: true,
        league: UserLeague.BRONZE,
      }),
    );

    if (toCreate.length)
      await this.userModel
        .insertMany(toCreate, { ordered: false })
        .catch(() => {});
    return this.userModel.find({ isBot: true }).lean() as any;
  }

  // 봇의 주간 XP (실제 UserStats 대신 계산으로 생성 — 주차+티어 시드 고정)
  private botXp(nickname: string, tier: string, weekKey: string): number {
    const profile = BOT_PROFILES.find((b) => b.nickname === nickname);
    const base = profile?.base ?? 50;
    const mult = TIER_BOT_MULTIPLIER[tier] ?? 1;

    // 주차별로 살짝 다르게 (같은 주엔 항상 같은 값)
    let seed = 0;
    const key = `${nickname}-${weekKey}`;
    for (let i = 0; i < key.length; i++)
      seed = (seed * 31 + key.charCodeAt(i)) % 1000;
    const variance = 0.7 + (seed % 60) / 100; // 0.7 ~ 1.3

    return Math.round(base * mult * variance);
  }

  // 방에 봇 채우기 (실유저 수가 적으면)
  private async fillWithBots(roomId: Types.ObjectId, currentCount: number) {
    const need = MIN_MEMBERS - currentCount;
    if (need <= 0) return;

    const bots = await this.ensureBots();
    const room = await this.roomModel.findById(roomId).lean();
    const already = new Set(
      (room?.members ?? []).map((m: any) => m.toString()),
    );

    const pick = bots
      .filter((b: any) => !already.has(b._id.toString()))
      .slice(0, need)
      .map((b: any) => b._id);

    if (pick.length) {
      await this.roomModel.findByIdAndUpdate(roomId, {
        $addToSet: { members: { $each: pick } },
      });
    }
  }

  // XP 적립 시 호출 — 방 없으면 배정만 (조회 없이 가볍게)
  async ensureJoined(userId: string) {
    const weekKey = this.getWeekKey();
    const user = await this.userModel
      .findById(userId)
      .select('league isBot previousLeagueRank')
      .lean();
    if (!user || (user as any).isBot) return;

    const tier = user.league ?? UserLeague.BRONZE;

    const exists = await this.roomModel
      .findOne({ weekKey, tier, members: new Types.ObjectId(userId) })
      .select('_id')
      .lean();

    if (!exists) {
      let room = await this.roomModel.findOne({
        weekKey,
        tier,
        settled: false,
        $expr: { $lt: [{ $size: '$members' }, ROOM_SIZE] },
      });
      if (!room)
        room = await this.roomModel.create({ tier, weekKey, members: [] });

      await this.roomModel.findByIdAndUpdate(room._id, {
        $addToSet: { members: new Types.ObjectId(userId) },
      });
    }
  }

  // XP 적립 직전 호출 — 아직 기록 없으면 현재 순위를 저장
  async snapshotIfNeeded(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('previousLeagueRank isBot')
      .lean();
    if (!user || (user as any).isBot) return;
    if (user.previousLeagueRank && user.previousLeagueRank > 0) return; // 이미 기록 있음

    const league = await this.getMyLeague(userId);
    await this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      { $set: { previousLeagueRank: league.myRank ?? 0 } },
    );
  }

  // 순위 애니메이션 본 뒤 현재 순위를 저장 (다시 안 나오게)
  async ackRank(userId: string, rank: number) {
    await this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      { $set: { previousLeagueRank: rank } },
    );
    return { rank };
  }

  async getPendingResult(userId: string) {
    const user = await this.userModel
      .findById(new Types.ObjectId(userId))
      .select('pendingLeagueResult')
      .lean();
    return user?.pendingLeagueResult ?? null;
  }

  async clearPendingResult(userId: string) {
    await this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      { $set: { pendingLeagueResult: null } },
    );
    return { ok: true };
  }
}

/** 승강등 결과 → 푸시 종류 */
function pushTypeOf(change: string): PushType {
  if (change === 'promote') return PushType.LEAGUE_PROMOTED;
  if (change === 'demote') return PushType.LEAGUE_DEMOTED;
  return PushType.LEAGUE_RESULT;
}
