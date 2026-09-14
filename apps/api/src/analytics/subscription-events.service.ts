import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  SubscriptionEvent,
  SubscriptionEventDocument,
} from './schemas/subscription-event.schema';

/**
 * 구독 상태 전이 기록.
 *
 * ⚠️ LearningEventsService 와 같은 규칙: **절대 위로 던지지 않는다.** 계측이
 *    실패했다고 결제가 실패하면 그건 재앙이다. 실패는 로그만 남긴다.
 */
@Injectable()
export class SubscriptionEventsService {
  private readonly logger = new Logger(SubscriptionEventsService.name);

  constructor(
    @InjectModel(SubscriptionEvent.name)
    private readonly model: Model<SubscriptionEventDocument>,
  ) {}

  async record(params: {
    userId: string | Types.ObjectId;
    subscriptionId?: string | Types.ObjectId | null;
    fromStatus?: string | null;
    toStatus: string;
    provider?: string;
    plan?: string;
    productId?: string;
    reason?: string;
  }): Promise<void> {
    // 상태가 안 바뀐 갱신은 기록하지 않는다 — 갱신 확인이 하루에도 여러 번
    // 들어오는데 그때마다 행이 생기면 취소 추이가 잡음에 묻힌다
    if (params.fromStatus && params.fromStatus === params.toStatus) return;

    try {
      await this.model.create({
        userId: new Types.ObjectId(params.userId),
        subscriptionId: params.subscriptionId
          ? new Types.ObjectId(params.subscriptionId)
          : null,
        fromStatus: params.fromStatus ?? null,
        toStatus: params.toStatus,
        provider: params.provider ?? '',
        plan: params.plan ?? '',
        productId: params.productId ?? '',
        reason: params.reason ?? 'purchase',
        at: new Date(),
      });
    } catch (e) {
      this.logger.warn(`구독 이력 기록 실패: user=${String(params.userId)} ${String(e)}`);
    }
  }
}
