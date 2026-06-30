import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument, UserLeague } from '../users/schemas/user.schema';
import {
  UserStats,
  UserStatsDocument,
} from '../users/schemas/user-stats.schema';
import { LeagueRoom, LeagueRoomDocument } from './schemas/league-room.schema';

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

  // 내 리그방 가져오기 (없으면 배정)
  async getMyLeague(userId: string) {
    const weekKey = this.getWeekKey();
    const user = await this.userModel
      .findById(userId)
      .select('league nickname profileImage')
      .lean();
    if (!user) throw new NotFoundException('User not found');
    const tier = user.league ?? UserLeague.BRONZE;

    let room = await this.roomModel.findOne({
      weekKey,
      tier,
      members: new Types.ObjectId(userId),
    });

    if (!room) {
      // 자리 있는 방 찾기
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

    // 멤버 정보 + 주간 XP
    const members = await this.userModel
      .find({ _id: { $in: room!.members } })
      .select('nickname profileImage league')
      .lean();
    const xpMap = await this.getWeeklyXp(room!.members);

    const ranked = members
      .map((m) => ({
        id: m._id.toString(),
        nickname: m.nickname,
        profileImage: m.profileImage || '',
        xp: xpMap.get(m._id.toString()) ?? 0,
        isMe: m._id.toString() === userId,
      }))
      .sort((a, b) => b.xp - a.xp)
      .map((m, i) => ({ ...m, rank: i + 1 }));

    const { end } = this.weekRange();

    return {
      tier,
      tierIndex: TIER_ORDER.indexOf(tier),
      weekKey,
      endsAt: end,
      promoteCount:
        TIER_ORDER.indexOf(tier) < TIER_ORDER.length - 1 ? PROMOTE_COUNT : 0,
      demoteCount: TIER_ORDER.indexOf(tier) > 0 ? DEMOTE_COUNT : 0,
      roomSize: room!.members.length,
      members: ranked,
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
          await this.userModel.findByIdAndUpdate(uid, {
            league: TIER_ORDER[tierIdx + 1],
          });
        }
      }
      // 강등
      if (tierIdx > 0) {
        for (const uid of ranked.slice(-DEMOTE_COUNT)) {
          await this.userModel.findByIdAndUpdate(uid, {
            league: TIER_ORDER[tierIdx - 1],
          });
        }
      }
      await this.roomModel.findByIdAndUpdate(room._id, { settled: true });
    }
    return { settled: rooms.length, weekKey };
  }
}
