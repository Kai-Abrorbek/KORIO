import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, type PipelineStage } from 'mongoose';
import {
  resolveTimezone,
  startOfDay,
  startOfMonth,
} from '../common/date.util';
import { isSuperActive } from '../users/super.util';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  VoiceTutorSession,
  VoiceTutorSessionDocument,
} from './schemas/voice-tutor-session.schema';

export type VoiceTutorTier = 'free' | 'super' | 'max';

/**
 * 한도 종류.
 *  - trial : 평생 딱 한 번 주는 맛보기 시간 (free 10분, super 30분). 매일 차지 않는다.
 *            여러 번 나눠 써도 되고, 다 쓰면 끝 — MAX 업셀로 이어진다
 *  - daily : 매일 다시 차는 시간 (max 하루 60분)
 */
export type VoiceTutorQuotaKind = 'trial' | 'daily';

/**
 * 기본값 (Kai, 2026-09-30). env 로 바꿀 수 있다:
 *   VOICE_TUTOR_FREE_TRIAL_MINUTES=10
 *   VOICE_TUTOR_SUPER_TRIAL_MINUTES=30
 *   VOICE_TUTOR_MAX_DAILY_MINUTES=60
 *   VOICE_TUTOR_MAX_MONTHLY_MINUTES=0   (0 = 한 달 상한 없음)
 *
 * ⚠️ 원가: 새 튜터는 분당 대략 $0.03~0.05. MAX 가 하루 60분을 매일 채우면
 *    월 1,800분 ≈ $55~90 인데 MAX 실수령은 월 ~$13.6 이다. 대부분은 그만큼
 *    안 쓰지만 헤비 유저는 적자다 — 손해를 막으려면 MAX_MONTHLY 를 300 안팎으로 건다.
 */
function envMinutes(name: string, fallback: number): number {
  const raw = Number(process.env[name]);
  return Number.isFinite(raw) && raw >= 0 ? raw : fallback;
}

const policy = () => ({
  free: { kind: 'trial' as const, minutes: envMinutes('VOICE_TUTOR_FREE_TRIAL_MINUTES', 10) },
  super: { kind: 'trial' as const, minutes: envMinutes('VOICE_TUTOR_SUPER_TRIAL_MINUTES', 30) },
  max: { kind: 'daily' as const, minutes: envMinutes('VOICE_TUTOR_MAX_DAILY_MINUTES', 60) },
  maxMonthly: envMinutes('VOICE_TUTOR_MAX_MONTHLY_MINUTES', 0),
});

/** 한 수업 최대 길이(분). 워커가 이 시간에 방을 닫는다. SUPER 맛보기 30분을 한 번에 쓸 수 있게 */
export const VOICE_TUTOR_SESSION_MAX_MIN = 30;
/** 이것보다 적게 남았으면 시작을 막는다 — 인사만 하고 끊기는 수업은 원가만 쓴다 */
const MIN_START_SEC = 30;

export interface VoiceTutorQuota {
  tier: VoiceTutorTier;
  isMax: boolean;
  kind: VoiceTutorQuotaKind;
  /** trial = 평생 맛보기 분, daily = 하루 분 */
  limitMin: number;
  usedMin: number;
  /** MAX 한 달 상한 (0 = 없음) */
  monthlyLimitMin: number;
  /** 지금 시작하면 쓸 수 있는 최대 길이(초). 0 이면 못 쓴다 */
  allowedSec: number;
}

/**
 * 새 Voice Tutor 사용량·한도.
 *
 * ⚠️ 앱에서 제일 비싼 기능이다. 한도는 UI 가 아니라 **세션 발급 지점**에서
 *    막는다 (클라가 우회할 수 없는 자리). 세션 길이는 워커 dispatch 의
 *    maxDurationSec 로도 걸려서, 앱이 종료를 안 보내도 그 이상은 못 쓴다.
 *
 * 사용 시간 = (endedAt ?? 지금) - createdAt, 단 그 세션에 허락한 allowedSec 까지.
 * 앱이 죽어서 end 가 안 와도 무한히 쌓이지 않는다.
 *
 * 맛보기는 **그 등급으로 쓴 세션만** 센다 (session.tier). free 로 10분 쓰고 SUPER 가
 * 되면 SUPER 맛보기 30분은 새로 받는다. tier 가 없는 옛 세션은 free 로 본다.
 */
@Injectable()
export class VoiceTutorQuotaService {
  constructor(
    @InjectModel(User.name) private readonly users: Model<UserDocument>,
    @InjectModel(VoiceTutorSession.name)
    private readonly sessions: Model<VoiceTutorSessionDocument>,
  ) {}

  async getQuota(userId: string): Promise<VoiceTutorQuota> {
    const user = await this.users
      .findById(userId)
      .select('timezone isSuper superExpiresAt superTier')
      .lean();
    const tier: VoiceTutorTier = !isSuperActive(user ?? {})
      ? 'free'
      : user?.superTier === 'max'
        ? 'max'
        : 'super';
    const rules = policy();
    const rule = rules[tier];
    const uid = new Types.ObjectId(userId);

    let usedSec: number;
    let remainingSec: number;
    if (rule.kind === 'trial') {
      usedSec = await this.usedSeconds(
        tier === 'free'
          ? { userId: uid, $or: [{ tier: 'free' }, { tier: null }, { tier: { $exists: false } }] }
          : { userId: uid, tier },
      );
      remainingSec = rule.minutes * 60 - usedSec;
    } else {
      const tz = resolveTimezone(user?.timezone);
      const now = new Date();
      usedSec = await this.usedSeconds({ userId: uid, createdAt: { $gte: startOfDay(now, tz) } });
      remainingSec = rule.minutes * 60 - usedSec;
      if (rules.maxMonthly > 0) {
        const monthSec = await this.usedSeconds({
          userId: uid,
          createdAt: { $gte: startOfMonth(now, tz) },
        });
        remainingSec = Math.min(remainingSec, rules.maxMonthly * 60 - monthSec);
      }
    }
    const allowed = Math.max(0, Math.min(VOICE_TUTOR_SESSION_MAX_MIN * 60, remainingSec));
    return {
      tier,
      isMax: tier === 'max',
      kind: rule.kind,
      limitMin: rule.minutes,
      usedMin: Math.floor(usedSec / 60),
      monthlyLimitMin: tier === 'max' ? rules.maxMonthly : 0,
      allowedSec: allowed >= MIN_START_SEC ? Math.floor(allowed) : 0,
    };
  }

  /** 한도를 넘었으면 여기서 막는다. 세션을 만들기 직전에 부른다 */
  async assertCanStart(userId: string): Promise<VoiceTutorQuota> {
    const quota = await this.getQuota(userId);
    if (quota.allowedSec <= 0) {
      throw new ForbiddenException(
        quota.kind === 'trial'
          ? 'VOICE_TUTOR_TRIAL_USED'
          : quota.usedMin >= quota.limitMin - 1
            ? 'VOICE_TUTOR_DAILY_LIMIT_REACHED'
            : 'VOICE_TUTOR_MONTHLY_LIMIT_REACHED',
      );
    }
    return quota;
  }

  private async usedSeconds(match: PipelineStage.Match['$match']): Promise<number> {
    const rows = await this.sessions.aggregate<{ total: number }>([
      { $match: match },
      {
        $project: {
          sec: {
            $min: [
              {
                $divide: [
                  {
                    $subtract: [{ $ifNull: ['$endedAt', '$$NOW'] }, '$createdAt'],
                  },
                  1000,
                ],
              },
              { $ifNull: ['$allowedSec', VOICE_TUTOR_SESSION_MAX_MIN * 60] },
            ],
          },
        },
      },
      { $group: { _id: null, total: { $sum: '$sec' } } },
    ]);
    return Math.max(0, Math.round(rows[0]?.total ?? 0));
  }
}
