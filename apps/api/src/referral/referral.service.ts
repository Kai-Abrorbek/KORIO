import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../notifications/schemas/notification.schema';
import { PushService } from '../push/push.service';
import { PushType } from '../push/push.types';
import { Referral, ReferralDocument, ReferralSource } from './schemas/referral.schema';
import { generateCode, isValidCode, normalizeCode } from './referral-code.util';
import {
  CLAIM_WINDOW_DAYS,
  INVITE_BASE_URL,
  MAX_REWARDED_REFERRALS,
  REFERRAL_GEMS,
  REFERRAL_MILESTONES,
} from './referral.constants';

/** 실패 사유. 앱이 이 코드로 i18n 문구를 고른다 */
export type ClaimError =
  | 'INVALID_CODE'
  | 'CODE_NOT_FOUND'
  | 'SELF_REFERRAL'
  | 'ALREADY_CLAIMED'
  | 'WINDOW_CLOSED'
  | 'CIRCULAR';

@Injectable()
export class ReferralService {
  private readonly logger = new Logger(ReferralService.name);

  constructor(
    @InjectModel(Referral.name)
    private readonly refModel: Model<ReferralDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly notifications: NotificationsService,
    private readonly push: PushService,
  ) {}

  // ─────────────────────────── 내 초대 현황 ───────────────────────────

  /**
   * 초대 화면이 필요한 것 전부.
   *
   * 코드는 여기서 처음 발급된다 — 가입 때 전원에게 미리 만들어두면, 초대
   * 기능을 한 번도 안 쓸 대다수 유저 몫까지 코드 공간을 먹는다.
   */
  async getMyInvite(userId: string) {
    const uid = new Types.ObjectId(userId);
    const code = await this.ensureCode(uid);

    const [rows, me] = await Promise.all([
      this.refModel
        .find({ inviterId: uid })
        .sort({ createdAt: -1 })
        .limit(50)
        .populate('inviteeId', 'nickname username profileImage avatar')
        .lean(),
      this.userModel
        .findById(uid)
        .select('referredBy referralMilestonesPaid createdAt')
        .lean(),
    ]);

    const invitedCount = await this.refModel.countDocuments({ inviterId: uid });
    const gemsFromInvites = rows.reduce((sum, r) => sum + (r.gemsEach ?? 0), 0);
    const paid: number[] = (me as any)?.referralMilestonesPaid ?? [];
    const gemsFromMilestones = REFERRAL_MILESTONES.filter((m) =>
      paid.includes(m.count),
    ).reduce((sum, m) => sum + m.gems, 0);

    return {
      code,
      link: `${INVITE_BASE_URL}/${code}`,
      rewardGems: REFERRAL_GEMS,
      invitedCount,
      gemsEarned: gemsFromInvites + gemsFromMilestones,
      /** 아직 아무의 코드도 안 썼고, 기한도 안 지났으면 입력창을 보여준다 */
      canRedeem: this.canRedeem(me as any),
      milestones: REFERRAL_MILESTONES.map((m) => ({
        count: m.count,
        gems: m.gems,
        reached: invitedCount >= m.count,
        claimed: paid.includes(m.count),
      })),
      invited: rows.map((r: any) => ({
        id: r.inviteeId?._id?.toString() ?? '',
        nickname: r.inviteeId?.nickname ?? '',
        username: r.inviteeId?.username ?? '',
        profileImage: r.inviteeId?.profileImage ?? '',
        avatar: r.inviteeId?.avatar ?? null,
        gems: r.gemsEach ?? 0,
        joinedAt: r.createdAt,
      })),
    };
  }

  private canRedeem(me: {
    referredBy?: Types.ObjectId | null;
    createdAt?: Date;
  }): boolean {
    if (me?.referredBy) return false;
    if (!me?.createdAt) return true;
    const days = (Date.now() - new Date(me.createdAt).getTime()) / 86_400_000;
    return days <= CLAIM_WINDOW_DAYS;
  }

  /** 코드가 없으면 만든다. 충돌하면 다시 뽑는다 (사실상 안 일어난다) */
  private async ensureCode(uid: Types.ObjectId): Promise<string> {
    const existing = await this.userModel
      .findById(uid)
      .select('referralCode')
      .lean();
    if ((existing as any)?.referralCode) return (existing as any).referralCode;

    for (let attempt = 0; attempt < 5; attempt++) {
      const code = generateCode();
      try {
        // 이미 코드가 있는 문서에는 안 쓴다 — 동시 요청 두 개가 서로 덮어쓰면
        // 먼저 공유된 링크가 죽는다
        const updated = await this.userModel.findOneAndUpdate(
          { _id: uid, $or: [{ referralCode: null }, { referralCode: { $exists: false } }] },
          { $set: { referralCode: code } },
          { returnDocument: 'after' },
        );
        if (updated?.referralCode) return updated.referralCode;
        // 그 사이 다른 요청이 발급했다
        const now = await this.userModel.findById(uid).select('referralCode').lean();
        if ((now as any)?.referralCode) return (now as any).referralCode;
      } catch (e: any) {
        if (e?.code !== 11000) throw e; // 중복이면 다음 후보로
      }
    }
    throw new BadRequestException('CODE_GENERATION_FAILED');
  }

  // ─────────────────────────── 코드 사용 ───────────────────────────

  /**
   * 초대 코드를 쓴다. 링크로 들어왔든 손으로 쳤든 같은 경로다.
   *
   * 순서가 중요하다: **Referral 문서를 먼저 만들고** 보석을 준다.
   * inviteeId 유니크 인덱스가 잠금이라, 앱이 두 번 보내도·컨테이너가 겹쳐
   * 돌아도 보석은 한 번만 나간다.
   */
  async claim(userId: string, rawCode: string, source: ReferralSource = 'code') {
    const uid = new Types.ObjectId(userId);
    const code = normalizeCode(rawCode);
    if (!isValidCode(code)) return this.fail('INVALID_CODE');

    const me = await this.userModel
      .findById(uid)
      .select('referredBy createdAt nickname profileImage')
      .lean();
    if (!me) throw new NotFoundException('USER_NOT_FOUND');

    if ((me as any).referredBy) return this.fail('ALREADY_CLAIMED');
    if (!this.canRedeem(me as any)) return this.fail('WINDOW_CLOSED');

    const inviter = await this.userModel
      .findOne({ referralCode: code })
      .select('_id nickname profileImage avatar referredBy referralMilestonesPaid')
      .lean();
    if (!inviter) return this.fail('CODE_NOT_FOUND');

    const inviterId = (inviter as any)._id as Types.ObjectId;
    if (inviterId.equals(uid)) return this.fail('SELF_REFERRAL');

    // A 가 B 를 초대해놓고 B 의 코드를 다시 쓰면 둘이 서로 2000 씩 만들어낸다.
    // 계정 두 개만 있으면 되는 가장 흔한 어뷰징이라 여기서 끊는다.
    if ((inviter as any).referredBy && uid.equals((inviter as any).referredBy)) {
      return this.fail('CIRCULAR');
    }

    // 상한을 넘긴 초대는 기록만 남기고 보석은 안 준다
    const rewardedSoFar = await this.refModel.countDocuments({
      inviterId,
      gemsEach: { $gt: 0 },
    });
    const overCap = rewardedSoFar >= MAX_REWARDED_REFERRALS;
    const gems = overCap ? 0 : REFERRAL_GEMS;

    try {
      await this.refModel.create({
        inviterId,
        inviteeId: uid,
        code,
        source,
        gemsEach: gems,
        skippedReason: overCap ? 'INVITER_CAP_REACHED' : '',
      });
    } catch (e: any) {
      // 유니크 위반 = 이미 초대받은 계정
      if (e?.code === 11000) return this.fail('ALREADY_CLAIMED');
      throw e;
    }

    // 여기부터는 장부가 잡혔으니 지급만 남았다
    await this.userModel.updateOne(
      { _id: uid },
      { $set: { referredBy: inviterId }, ...(gems ? { $inc: { gems } } : {}) },
    );
    if (gems) {
      await this.userModel.updateOne({ _id: inviterId }, { $inc: { gems } });
    }

    const milestoneGems = await this.payMilestones(inviterId);
    void this.tellInviter(inviterId, me as any, gems + milestoneGems);

    return {
      success: true as const,
      gems,
      overCap,
      inviter: {
        id: inviterId.toString(),
        nickname: (inviter as any).nickname ?? '',
        profileImage: (inviter as any).profileImage ?? '',
        avatar: (inviter as any).avatar ?? null,
      },
    };
  }

  private fail(error: ClaimError) {
    return { success: false as const, error };
  }

  /**
   * 누적 인원 마일스톤 지급.
   *
   * 조건과 지급을 한 번의 findOneAndUpdate 로 묶는다. 따로 읽고 쓰면 초대가
   * 동시에 두 건 들어올 때 같은 단계를 두 번 준다.
   */
  private async payMilestones(inviterId: Types.ObjectId): Promise<number> {
    const total = await this.refModel.countDocuments({ inviterId });
    let paid = 0;
    for (const m of REFERRAL_MILESTONES) {
      if (total < m.count) continue;
      const res = await this.userModel.findOneAndUpdate(
        { _id: inviterId, referralMilestonesPaid: { $ne: m.count } },
        {
          $addToSet: { referralMilestonesPaid: m.count },
          $inc: { gems: m.gems },
        },
      );
      if (res) paid += m.gems;
    }
    return paid;
  }

  /** 초대가 성사됐다고 초대자에게 알린다. 실패해도 지급은 이미 끝났다 */
  private async tellInviter(
    inviterId: Types.ObjectId,
    invitee: { nickname?: string; profileImage?: string },
    gems: number,
  ) {
    const params = { nickname: invitee?.nickname ?? '', gems };
    await this.notifications
      .create(inviterId.toString(), NotificationType.SYSTEM, {
        params: { ...params, kind: 'referral' },
        link: '/invite',
        imageUrl: invitee?.profileImage ?? '',
      })
      .catch(() => {});
    await this.push
      .send(inviterId, PushType.REFERRAL_JOINED, {
        params,
        link: '/invite',
        dedupKey: `referral:${inviterId}:${Date.now()}`,
      })
      .catch(() => {});
  }
}
