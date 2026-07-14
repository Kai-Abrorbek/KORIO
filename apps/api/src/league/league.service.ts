import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument, UserLeague } from '../users/schemas/user.schema';
import {
  UserStats,
  UserStatsDocument,
} from '../users/schemas/user-stats.schema';
import { LeagueRoom, LeagueRoomDocument } from './schemas/league-room.schema';
import { BOT_PROFILES, TIER_BOT_MULTIPLIER } from './league.bots';

const MIN_MEMBERS = 8; // 방에 최소 이만큼은 있게 (봇으로 채움)

const TIER_ORDER: UserLeague[] = [
  UserLeague.BRONZE,
  UserLeague.SILVER,
  UserLeague.GOLD,
  UserLeague.PLATINUM,
  UserLeague.DIAMOND,
];
const ROOM_SIZE = 10;
const PROMOTE_COUNT = 3; // 상위 3명 승급
const DEMOTE_COUNT = 3; // 하위 3명 강등
const CHALLENGE_XP = 210;
const ONLINE_WINDOW_MS = 5 * 60 * 1000; // 5분 내 활동 = 온라인

@Injectable()
export class LeagueService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserStats.name) private statsModel: Model<UserStatsDocument>,
    @InjectModel(LeagueRoom.name) private roomModel: Model<LeagueRoomDocument>,
  ) {}

  // ISO 주차 키 ("2026-W26")
  getWeekKey(d = new Date()): string {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const day = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - day);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const week = Math.ceil(
      (((date as any) - (yearStart as any)) / 86400000 + 1) / 7,
    );
    return `${date.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
  }

  // 이번 주 월요일 0시 ~ 다음 월요일
  private weekRange(d = new Date()) {
    const date = new Date(d);
    const day = date.getDay() || 7;
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (day - 1)); // 월요일
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 7);
    return { start, end };
  }

  // 주간 XP 집계 (UserStats)
  private async getWeeklyXp(
    userIds: Types.ObjectId[],
  ): Promise<Map<string, number>> {
    const { start, end } = this.weekRange();
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
      .select('league nickname profileImage previousLeagueRank')
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
      .select('nickname profileImage league isBot lastActiveAt streak')
      .lean();
    const xpMap = await this.getWeeklyXp(room!.members);

    const now = Date.now();
    const ranked = members
      .map((m: any) => ({
        id: m._id.toString(),
        nickname: m.nickname,
        profileImage: m.profileImage || '',
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

    return {
      tier,
      tierIndex: TIER_ORDER.indexOf(tier),
      weekKey,
      endsAt: end,
      daysLeft,
      promoteCount:
        TIER_ORDER.indexOf(tier) < TIER_ORDER.length - 1 ? PROMOTE_COUNT : 0,
      demoteCount: TIER_ORDER.indexOf(tier) > 0 ? DEMOTE_COUNT : 0,
      roomSize: room!.members.length,
      members: ranked,
      myRank: me?.rank ?? 0,
      previousRank: user.previousLeagueRank ?? me?.rank ?? 0,
      boostXp: CHALLENGE_XP,
    };
  }

  // 티어 메타 (프론트 표시용)
  getTiers() {
    return {
      tiers: TIER_ORDER.map((t, i) => ({ id: t, index: i })),
      promoteCount: PROMOTE_COUNT,
      demoteCount: DEMOTE_COUNT,
    };
  }

  // 정산 (cron 또는 수동 호출) — 지난주 방들 승강등 처리
  async settleWeek(targetWeekKey?: string) {
    const weekKey =
      targetWeekKey ?? this.getWeekKey(new Date(Date.now() - 7 * 86400000));
    const rooms = await this.roomModel.find({ weekKey, settled: false });

    for (const room of rooms) {
      const xpMap = await this.getWeeklyXp(room.members);
      const ranked = [...room.members].sort(
        (a, b) =>
          (xpMap.get(b.toString()) ?? 0) - (xpMap.get(a.toString()) ?? 0),
      );
      const tierIdx = TIER_ORDER.indexOf(room.tier);

      // 승급
      if (tierIdx < TIER_ORDER.length - 1) {
        for (const uid of ranked.slice(0, PROMOTE_COUNT)) {
          await this.userModel.updateOne(
            { _id: uid, isBot: { $ne: true } }, // ✅ 봇 제외
            { league: TIER_ORDER[tierIdx + 1] },
          );
        }
      }
      // 강등
      if (tierIdx > 0) {
        for (const uid of ranked.slice(-DEMOTE_COUNT)) {
          await this.userModel.updateOne(
            { _id: uid, isBot: { $ne: true } }, // ✅ 봇 제외
            { league: TIER_ORDER[tierIdx - 1] },
          );
        }
      }
      await this.roomModel.findByIdAndUpdate(room._id, { settled: true });
    }
    return { settled: rooms.length, weekKey };
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
      .select('league isBot')
      .lean();
    if (!user || (user as any).isBot) return;

    const tier = user.league ?? UserLeague.BRONZE;

    const exists = await this.roomModel
      .findOne({
        weekKey,
        tier,
        members: new Types.ObjectId(userId),
      })
      .select('_id')
      .lean();
    if (exists) return;

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

  // 순위 애니메이션 본 뒤 현재 순위를 저장 (다시 안 나오게)
  async ackRank(userId: string) {
    const league = await this.getMyLeague(userId);
    await this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      { $set: { previousLeagueRank: league.myRank ?? 0 } },
    );
    return { rank: league.myRank ?? 0 };
  }
}
