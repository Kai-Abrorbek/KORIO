import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APP_TIMEZONE } from '../../common/date.util';
import { GooglePlayProvider } from '../providers/google-play/google-play.provider';
import { Subscription, SubscriptionDocument } from './subscription.schema';
import { SubscriptionService } from './subscription.service';

/**
 * 구독 상태 안전망.
 *
 * 왜 필요한가: 자동 갱신을 우리가 아는 유일한 경로가 Google 서버 알림(RTDN)
 * 인데, Pub/Sub 메시지는 유실·지연될 수 있고 우리 서버가 내려가 있는 동안 온
 * 알림은 재시도 끝에 버려진다. 그때 우리 DB 의 expiresAt 은 지난 채로 남고,
 * **돈을 낸 유저가 프리미엄을 잃는다.**
 *
 * 그래서 만료가 임박했거나 이미 지난 구독을 주기적으로 구글에 다시 물어본다.
 * 알림이 제대로 왔으면 이 작업은 아무것도 바꾸지 않는다(멱등).
 */
@Injectable()
export class SubscriptionRefreshService {
  private readonly logger = new Logger(SubscriptionRefreshService.name);

  constructor(
    @InjectModel(Subscription.name)
    private readonly subModel: Model<SubscriptionDocument>,
    private readonly googlePlay: GooglePlayProvider,
    private readonly subscriptions: SubscriptionService,
  ) {}

  /** 매시간. 갱신은 보통 만료 시각 언저리에 일어나므로 하루 한 번은 너무 느리다 */
  @Cron('12 * * * *', { timeZone: APP_TIMEZONE })
  async refreshExpiring() {
    const result = await this.run();
    if (result.checked) {
      this.logger.log(
        `구독 재확인 ${result.checked}건 — 갱신됨 ${result.changed}, 실패 ${result.failed}`,
      );
    }
  }

  /**
   * 만료 임박(2일 내) 또는 이미 지난 구독을 다시 검증한다.
   *
   * 이미 지난 것도 포함하는 이유: 갱신 알림을 놓치면 expiresAt 이 과거로
   * 남는데, 구글에 물어보면 새 만료일을 알려준다. 그때 되살아난다.
   * 완전히 끝난 구독을 영원히 조회하지 않도록 만료 30일 이후는 제외한다.
   */
  async run(limit = 200) {
    const now = Date.now();
    const soon = new Date(now + 2 * 24 * 60 * 60 * 1000);
    const floor = new Date(now - 30 * 24 * 60 * 60 * 1000);
    const staleBefore = new Date(now - 60 * 60 * 1000); // 1시간 내 확인한 건 건너뛴다

    const targets = await this.subModel
      .find({
        provider: 'google_play',
        status: { $ne: 'expired' },
        expiresAt: { $lt: soon, $gt: floor },
        $or: [
          { lastVerifiedAt: { $exists: false } },
          { lastVerifiedAt: { $lt: staleBefore } },
        ],
      })
      .sort({ expiresAt: 1 })
      .limit(limit)
      .lean();

    let changed = 0;
    let failed = 0;

    for (const sub of targets) {
      try {
        const verified = await this.googlePlay.verifyPurchase({
          token: sub.externalTransactionId,
          userId: sub.userId.toString(),
        });
        const before = new Date(sub.expiresAt).getTime();
        await this.subscriptions.supersede(sub.userId.toString(), verified);
        await this.subscriptions.applyVerifiedPurchase(
          sub.userId.toString(),
          verified,
        );
        if (
          verified.expiresAt.getTime() !== before ||
          verified.status !== sub.status
        ) {
          changed++;
        }
      } catch (e) {
        failed++;
        // 구글이 모르는 토큰(환불·삭제)이면 계속 물어봐도 소용없다.
        // 만료로 눕히고 다음부터 대상에서 빠지게 한다.
        const msg = (e as Error).message ?? '';
        if (msg.includes('PURCHASE_NOT_FOUND')) {
          await this.subModel.updateOne(
            { _id: sub._id },
            { $set: { status: 'expired', autoRenew: false, lastVerifiedAt: new Date() } },
          );
          await this.subscriptions.syncUser(sub.userId.toString());
        } else {
          this.logger.warn(
            `구독 ${sub._id} 재확인 실패 (다음 주기에 다시 시도): ${msg}`,
          );
        }
      }
    }

    return { checked: targets.length, changed, failed };
  }
}
