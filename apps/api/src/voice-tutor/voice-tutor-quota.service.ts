import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
 * 등급별 하루·한 달 한도(분).
 *
 * 옛 튜터(tutor.const.ts)와 같은 숫자에서 출발한다. 옛 튜터 원가 계산:
 * MAX 구독 실수령 월 ~$13.6, 새 튜터 원가는 분당 대략 $0.03~0.05
 * (gpt-transcribe + GPT 텍스트 + ElevenLabs v4 Turbo). 월 120분이면
 * 최악에도 $6 안쪽이라 흑자다.
 *
 * env 로 바꿀 수 있다: VOICE_TUTOR_DAILY_MINUTES_{FREE,SUPER,MAX},
 * VOICE_TUTOR_MONTHLY_MINUTES_{FREE,SUPER,MAX}
 */
const DEFAULT_DAILY: Record<VoiceTutorTier, number> = { free: 2, super: 5, max: 20 };
const DEFAULT_MONTHLY: Record<VoiceTutorTier, number> = { free: 5, super: 20, max: 120 };

/** 한 수업 최대 길이(분). 워커가 이 시간에 방을 닫는다 */
export const VOICE_TUTOR_SESSION_MAX_MIN = 20;
/** 이것보다 적게 남았으면 시작을 막는다 — 인사만 하고 끊기는 수업은 원가만 쓴다 */
const MIN_START_SEC = 30;

function minutes(kind: 'DAILY' | 'MONTHLY', tier: VoiceTutorTier): number {
  const raw = Number(process.env[`VOICE_TUTOR_${kind}_MINUTES_${tier.toUpperCase()}`]);
  if (Number.isFinite(raw) && raw >= 0) return raw;
  return kind === 'DAILY' ? DEFAULT_DAILY[tier] : DEFAULT_MONTHLY[tier];
}

export interface VoiceTutorQuota {
  tier: VoiceTutorTier;
  isMax: boolean;
  dailyLimitMin: number;
  monthlyLimitMin: number;
  dailyUsedMin: number;
  monthlyUsedMin: number;
  /** 지금 시작하면 쓸 수 있는 최대 길이(초). 0 이면 못 쓴다 */
  allowedSec: number;
}

/**
 * 새 Voice Tutor 사용량·한도.
 *
 * ⚠️ 이 기능은 앱에서 제일 비싸다. 한도는 UI 가 아니라 **세션 발급 지점**에서
 *    막는다 (클라가 우회할 수 없는 자리). 세션 길이는 워커 dispatch 의
 *    maxDurationSec 로도 걸려서, 앱이 종료를 안 보내도 그 이상은 못 쓴다.
 *
 * 사용 시간 = (endedAt ?? 지금) - createdAt, 단 그 세션에 허락한 allowedSec 까지.
 * 앱이 죽어서 end 가 안 와도 무한히 쌓이지 않는다.
 *
 * 경계는 유저 시간대로 자른다 (우즈벡·한국 유저가 섞여 있다).
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
    const tz = resolveTimezone(user?.timezone);
    const now = new Date();
    const [dailySec, monthlySec] = await Promise.all([
      this.usedSecondsSince(userId, startOfDay(now, tz)),
      this.usedSecondsSince(userId, startOfMonth(now, tz)),
    ]);
    const dailyLimitMin = minutes('DAILY', tier);
    const monthlyLimitMin = minutes('MONTHLY', tier);
    const allowed = Math.max(
      0,
      Math.min(
        VOICE_TUTOR_SESSION_MAX_MIN * 60,
        dailyLimitMin * 60 - dailySec,
        monthlyLimitMin * 60 - monthlySec,
      ),
    );
    return {
      tier,
      isMax: tier === 'max',
      dailyLimitMin,
      monthlyLimitMin,
      dailyUsedMin: Math.floor(dailySec / 60),
      monthlyUsedMin: Math.floor(monthlySec / 60),
      allowedSec: allowed >= MIN_START_SEC ? Math.floor(allowed) : 0,
    };
  }

  /** 한도를 넘었으면 여기서 막는다. 세션을 만들기 직전에 부른다 */
  async assertCanStart(userId: string): Promise<VoiceTutorQuota> {
    const quota = await this.getQuota(userId);
    if (quota.allowedSec <= 0) {
      throw new ForbiddenException(
        quota.dailyUsedMin * 60 >= quota.dailyLimitMin * 60 - MIN_START_SEC
          ? 'VOICE_TUTOR_DAILY_LIMIT_REACHED'
          : 'VOICE_TUTOR_MONTHLY_LIMIT_REACHED',
      );
    }
    return quota;
  }

  private async usedSecondsSince(userId: string, since: Date): Promise<number> {
    const rows = await this.sessions.aggregate<{ total: number }>([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          createdAt: { $gte: since },
        },
      },
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
