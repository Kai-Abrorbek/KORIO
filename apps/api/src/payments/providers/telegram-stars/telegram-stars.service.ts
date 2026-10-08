import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthProvider } from '../../../common/enums/provider.enum';
import { User, UserDocument } from '../../../users/schemas/user.schema';
import {
  SubscriptionService,
  type OneTimePassResult,
} from '../../subscriptions/subscription.service';
import {
  TelegramApiError,
  TelegramBotApi,
  telegramAdminIds,
} from './telegram-bot.api';
import { CardPaymentService } from '../../card/card-payment.service';
import {
  STARS_INVOICE_PHOTO_PATH,
  starsCatalog,
  starsProductById,
  starsToMicros,
} from './telegram-stars.const';
import {
  decodeStarsPayload,
  encodeStarsPayload,
} from './telegram-stars.payload';
import {
  botDate,
  botLang,
  botText,
  invoiceDescription,
  invoiceTitle,
  type BotLang,
} from './telegram-stars.texts';
import type {
  TgMessage,
  TgPreCheckoutQuery,
  TgUpdate,
  TgUser,
} from './telegram.types';

const TERMS_URL = 'https://korio.online/terms';
const PRIVACY_URL = 'https://korio.online/privacy';
const DEFAULT_MINI_APP_URL = 'https://telegram.korio.online';
const DEFAULT_SUPPORT_CONTACT = '@Abror_bek_0 · abror0dev@gmail.com';

/** /start 의 "KORIO 열기" 버튼·인보이스 그림이 가리킬 미니앱 주소. 빈 값이면 끈다 */
function miniAppUrl(): string {
  const raw = process.env.TELEGRAM_MINI_APP_URL;
  return (raw === undefined ? DEFAULT_MINI_APP_URL : raw)
    .trim()
    .replace(/\/+$/, '');
}

/**
 * 텔레그램 Stars 결제 — 미니앱이 인보이스를 열고, 봇 웹훅이 결과를 받는다.
 *
 *   미니앱 ─ POST /payments/telegram/invoice ─▶ createInvoiceLink (payload = KORIO 계정·상품·가격)
 *   미니앱 ─ WebApp.openInvoice(link)
 *   텔레그램 ─ pre_checkout_query ─▶ 10초 안에 answerPreCheckoutQuery
 *   텔레그램 ─ message.successful_payment ─▶ Subscription 기간권 한 행 → user.isSuper 투영
 *
 * 구글 플레이처럼 "앱이 토큰을 보내고 서버가 스토어에 묻는" 구조가 아니라
 * 텔레그램이 결과를 **밀어주는** 구조라서 PaymentProvider(verifyPurchase)에
 * 끼우지 않았다. 반영은 같은 SubscriptionService 로 모인다.
 *
 * 결제 반영이 실패하면 던진다 → 웹훅이 500 → 텔레그램이 같은 업데이트를 다시
 * 보낸다. 반영은 결제 id 로 멱등이라서 몇 번 와도 한 건이다.
 */
@Injectable()
export class TelegramStarsService {
  private readonly logger = new Logger(TelegramStarsService.name);
  /** 유저별 결제 처리 줄 — 같은 유저의 결제 두 건이 같은 시작일을 계산하지 않게 */
  private readonly queues = new Map<string, Promise<unknown>>();

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly subscriptions: SubscriptionService,
    private readonly bot: TelegramBotApi,
    // 카드 입금 승인 버튼(callback_query)·/cardcheck 도 같은 봇 웹훅으로 들어온다
    private readonly cards: CardPaymentService,
  ) {}

  /** 미니앱 요금제 카드 */
  catalog() {
    return {
      enabled: this.bot.enabled,
      currency: 'XTR' as const,
      products: starsCatalog(),
    };
  }

  /** 미니앱이 openInvoice 로 열 링크. 가격·상품은 서버가 정한다 */
  async createInvoice(userId: string, productId: string, lang?: string) {
    const product = starsProductById(productId);
    if (!product) throw new BadRequestException('UNKNOWN_PRODUCT');
    if (!this.bot.enabled)
      throw new ServiceUnavailableException('STARS_UNAVAILABLE');

    const user = await this.userModel
      .findById(userId)
      .select('_id appLanguage')
      .lean();
    if (!user) throw new NotFoundException('USER_NOT_FOUND');

    const l = botLang(lang, (user as { appLanguage?: string }).appLanguage);
    const title = invoiceTitle(l, product.tier, product.months);
    const params: Record<string, unknown> = {
      title,
      description: invoiceDescription(l, product.tier),
      payload: encodeStarsPayload(userId, product),
      currency: 'XTR',
      prices: [{ label: title, amount: product.stars }],
    };
    const app = miniAppUrl();
    if (app) params.photo_url = `${app}${STARS_INVOICE_PHOTO_PATH}`;

    try {
      const link = await this.bot.call<string>('createInvoiceLink', params);
      return { link, productId: product.id, stars: product.stars };
    } catch (error) {
      this.logger.error(
        `인보이스 생성 실패: user=${userId} ${product.id} ${String(error)}`,
      );
      throw new ServiceUnavailableException('STARS_INVOICE_FAILED');
    }
  }

  /** 웹훅 한 건 */
  async handleUpdate(update: TgUpdate): Promise<void> {
    if (update.callback_query) {
      await this.cards
        .handleCallback(update.callback_query)
        .catch((error) => this.logger.warn(`버튼 처리 실패: ${String(error)}`));
      return;
    }
    if (update.pre_checkout_query) {
      await this.onPreCheckout(update.pre_checkout_query);
      return;
    }
    const msg = update.message;
    if (!msg) return;
    if (msg.successful_payment) {
      await this.onPaid(msg); // 실패하면 던진다 → 재전송
      return;
    }
    if (msg.refunded_payment) {
      await this.onRefunded(msg);
      return;
    }
    if (msg.text?.startsWith('/')) {
      await this.onCommand(msg).catch((error) =>
        this.logger.warn(`봇 명령 처리 실패: ${String(error)}`),
      );
    }
  }

  /** 받아도 되는 결제면 null, 아니면 거절 이유 */
  async checkPreCheckout(q: TgPreCheckoutQuery): Promise<string | null> {
    if (q.currency !== 'XTR') return 'CURRENCY';
    const payload = decodeStarsPayload(q.invoice_payload);
    if (!payload) return 'PAYLOAD';
    if (q.total_amount !== payload.stars) return 'AMOUNT';
    const exists = await this.userModel.exists({ _id: payload.userId });
    return exists ? null : 'USER';
  }

  /**
   * 결제 직전 확인. 텔레그램은 10초 안에 답을 못 받으면 결제를 취소한다.
   * 여기서는 던지지 않는다 — 실패해도 다시 보내주지 않는 업데이트다.
   */
  private async onPreCheckout(q: TgPreCheckoutQuery) {
    const reason = await this.checkPreCheckout(q).catch(() => 'ERROR');
    if (reason)
      this.logger.warn(`결제 직전 검사 거절: ${reason} from=${q.from?.id}`);
    try {
      await this.bot.call(
        'answerPreCheckoutQuery',
        reason
          ? {
              pre_checkout_query_id: q.id,
              ok: false,
              error_message: botText(
                botLang(q.from?.language_code),
                'precheckoutFailed',
              ),
            }
          : { pre_checkout_query_id: q.id, ok: true },
        6000,
      );
    } catch (error) {
      this.logger.error(`결제 직전 답장 실패: ${String(error)}`);
    }
  }

  private async onPaid(msg: TgMessage) {
    const pay = msg.successful_payment!;
    const payload = decodeStarsPayload(pay.invoice_payload);
    if (!payload || pay.currency !== 'XTR') {
      // 우리가 만든 인보이스가 아니다. 다시 보내도 같으니 던지지 않고 크게 남긴다
      this.logger.error(
        `알 수 없는 Stars 결제: charge=${pay.telegram_payment_charge_id} ` +
          `currency=${pay.currency} amount=${pay.total_amount}`,
      );
      return;
    }

    const { product } = payload;
    const payerId = msg.from?.id != null ? String(msg.from.id) : undefined;
    const result = await this.serial(payload.userId, () =>
      this.subscriptions.applyOneTimePass({
        userId: payload.userId,
        provider: 'telegram_stars',
        platform: 'telegram',
        tier: product.tier,
        plan: product.plan,
        productId: `stars_${product.id}`,
        days: product.days,
        externalTransactionId: pay.telegram_payment_charge_id,
        payerId,
        priceMicros: starsToMicros(pay.total_amount),
        currency: 'XTR',
      }),
    );

    if (!result.applied) return; // 재전송 — 이미 반영했고 이미 알렸다
    this.logger.log(
      `Stars 결제: user=${payload.userId} ${product.id} ${pay.total_amount}⭐ ` +
        `→ ${result.expiresAt.toISOString()} (payer=${payerId ?? '?'})`,
    );
    await this.notifyPaid(msg.chat.id, payload.userId, result).catch((error) =>
      this.logger.warn(`결제 확인 메시지 실패: ${String(error)}`),
    );
  }

  private async notifyPaid(
    chatId: number,
    userId: string,
    result: OneTimePassResult,
  ) {
    const user = await this.userModel
      .findById(userId)
      .select('appLanguage timezone')
      .lean<{ appLanguage?: string; timezone?: string }>();
    const lang = botLang(user?.appLanguage);
    await this.bot.call('sendMessage', {
      chat_id: chatId,
      text: botText(lang, 'paid', {
        tier: result.tier.toUpperCase(),
        date: botDate(lang, result.expiresAt, user?.timezone),
      }),
    });
  }

  /** 텔레그램이 알려준 환불 (우리가 /refund 로 한 것도 이리 한 번 더 온다) */
  private async onRefunded(msg: TgMessage) {
    const refund = msg.refunded_payment!;
    const charge = refund.telegram_payment_charge_id;
    const sub = await this.subscriptions.findByTransaction(
      'telegram_stars',
      charge,
    );
    if (!sub || sub.revokedAt) return;
    await this.subscriptions.revokeRefunded('telegram_stars', charge);
    const lang = await this.langFor(msg.from);
    await this.bot
      .call('sendMessage', {
        chat_id: msg.chat.id,
        text: botText(lang, 'refunded', {
          tier: (sub.tier ?? 'super').toUpperCase(),
        }),
      })
      .catch(() => undefined);
  }

  private async onCommand(msg: TgMessage) {
    const [head, ...args] = (msg.text ?? '').trim().split(/\s+/);
    const command = head.split('@')[0].toLowerCase();
    const reply = (text: string, extra: Record<string, unknown> = {}) =>
      this.bot.call('sendMessage', { chat_id: msg.chat.id, text, ...extra });

    switch (command) {
      case '/start': {
        const app = miniAppUrl();
        if (!app || msg.chat.type !== 'private') return;
        const lang = await this.langFor(msg.from);
        await reply(botText(lang, 'start'), {
          reply_markup: {
            inline_keyboard: [
              [{ text: botText(lang, 'open'), web_app: { url: app } }],
            ],
          },
        });
        return;
      }
      case '/paysupport': {
        const lang = await this.langFor(msg.from);
        const contact =
          (process.env.TELEGRAM_SUPPORT_CONTACT ?? '').trim() ||
          DEFAULT_SUPPORT_CONTACT;
        await reply(botText(lang, 'paySupport', { contact }));
        return;
      }
      case '/terms': {
        const lang = await this.langFor(msg.from);
        await reply(
          botText(lang, 'terms', { terms: TERMS_URL, privacy: PRIVACY_URL }),
        );
        return;
      }
      case '/refund': {
        // 운영자 전용. 모르는 사람에게는 명령이 있는지도 알리지 않는다
        if (!msg.from || !telegramAdminIds().includes(String(msg.from.id)))
          return;
        await reply(await this.refund(args[0] ?? ''));
        return;
      }
      case '/cardcheck': {
        // 운영자 전용 — 카드 입금 설정(카드번호 검사 결과·대기 건수)
        if (!msg.from || !telegramAdminIds().includes(String(msg.from.id)))
          return;
        await reply(await this.cards.describe());
        return;
      }
      default:
        return;
    }
  }

  /**
   * 운영자 환불: Stars 를 돌려주고 그 결제로 받은 기간을 회수한다.
   * 결과를 운영자에게 보여줄 한 줄로 돌려준다 (한국어 — 운영자용).
   */
  async refund(chargeId: string): Promise<string> {
    if (!chargeId) return '사용법: /refund <telegram_payment_charge_id>';
    const sub = await this.subscriptions.findByTransaction(
      'telegram_stars',
      chargeId,
    );
    if (!sub) return `그 결제 id 로 된 구독이 없어요: ${chargeId}`;
    if (!sub.payerId)
      return '결제한 텔레그램 id 가 기록돼 있지 않아요 — 수동으로 처리해야 해요.';

    try {
      await this.bot.call('refundStarPayment', {
        user_id: Number(sub.payerId),
        telegram_payment_charge_id: chargeId,
      });
    } catch (error) {
      const already =
        error instanceof TelegramApiError &&
        /ALREADY_REFUNDED/i.test(error.description);
      if (!already) {
        return `환불 실패: ${error instanceof TelegramApiError ? error.description : String(error)}`;
      }
    }
    const revoked = await this.subscriptions.revokeRefunded(
      'telegram_stars',
      chargeId,
    );
    this.logger.log(
      `Stars 환불: charge=${chargeId} user=${String(sub.userId)} 회수 ${revoked}건`,
    );
    return `환불 완료 — ${sub.productId}, user ${String(sub.userId)}, 회수 ${revoked}건`;
  }

  /** 봇 답장 언어: KORIO 앱 언어 → 텔레그램 언어 → 우즈벡어 */
  private async langFor(from?: TgUser): Promise<BotLang> {
    if (!from) return 'uz';
    const user = await this.userModel
      .findOne({ provider: AuthProvider.TELEGRAM, providerId: String(from.id) })
      .select('appLanguage')
      .lean<{ appLanguage?: string }>()
      .catch(() => null);
    return botLang(user?.appLanguage, from.language_code);
  }

  /** 같은 key 의 작업을 하나씩 */
  private serial<T>(key: string, job: () => Promise<T>): Promise<T> {
    const previous = this.queues.get(key) ?? Promise.resolve();
    const run = previous.catch(() => undefined).then(job);
    const tail = run.catch(() => undefined);
    this.queues.set(key, tail);
    void tail.then(() => {
      if (this.queues.get(key) === tail) this.queues.delete(key);
    });
    return run;
  }
}
