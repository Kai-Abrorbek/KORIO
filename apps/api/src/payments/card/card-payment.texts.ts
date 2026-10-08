import type { BotLang } from '../providers/telegram-stars/telegram-stars.texts';
import type { CardRejectReason } from './card-payment.const';
import { formatSom } from './card-payment.const';
import type {
  CardPaymentOrder,
  CardReceiptOcr,
} from './card-payment-order.schema';

/** 유저에게 봇이 보내는 글 (4개 언어) */
const USER_TEXT: Record<
  BotLang,
  {
    approved: string;
    rejected: string;
    reasons: Record<CardRejectReason, string>;
  }
> = {
  uz: {
    approved:
      "✅ To'lovingiz tasdiqlandi! KORIO {tier} — {date} gacha faol.\nRahmat! Ilovaga qaytib, o'rganishni davom ettiring.",
    rejected: "❌ To'lov tasdiqlanmadi: {reason}.\nSavol bo'lsa — /paysupport",
    reasons: {
      no_money: 'pul kartaga tushmadi',
      wrong_amount: "o'tkazilgan summa buyurtmadagidan farq qiladi",
      bad_receipt: "chek rasmi aniq emas yoki noto'g'ri",
    },
  },
  ko: {
    approved:
      '✅ 입금이 확인됐어요! KORIO {tier} — {date}까지 이용할 수 있어요.\n고마워요! 앱으로 돌아가서 계속 공부해요.',
    rejected: '❌ 결제가 확인되지 않았어요: {reason}.\n문의 — /paysupport',
    reasons: {
      no_money: '카드로 입금이 들어오지 않았어요',
      wrong_amount: '보낸 금액이 주문 금액과 달라요',
      bad_receipt: '영수증 사진이 흐리거나 맞지 않아요',
    },
  },
  en: {
    approved:
      '✅ Payment confirmed! KORIO {tier} is active until {date}.\nThank you! Head back to the app and keep learning.',
    rejected: '❌ Payment not confirmed: {reason}.\nQuestions — /paysupport',
    reasons: {
      no_money: 'the money did not arrive on the card',
      wrong_amount: 'the amount sent differs from the order',
      bad_receipt: "the receipt image is unclear or doesn't match",
    },
  },
  ru: {
    approved:
      '✅ Оплата подтверждена! KORIO {tier} активен до {date}.\nСпасибо! Возвращайтесь в приложение и продолжайте учиться.',
    rejected: '❌ Оплата не подтверждена: {reason}.\nВопросы — /paysupport',
    reasons: {
      no_money: 'деньги не поступили на карту',
      wrong_amount: 'отправленная сумма отличается от суммы заказа',
      bad_receipt: 'чек нечёткий или не подходит',
    },
  },
};

const fill = (text: string, vars: Record<string, string>) =>
  text.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? '');

export function cardApprovedText(lang: BotLang, tier: string, date: string) {
  return fill(USER_TEXT[lang].approved, { tier: tier.toUpperCase(), date });
}

export function cardRejectedText(lang: BotLang, reason: CardRejectReason) {
  return fill(USER_TEXT[lang].rejected, {
    reason: USER_TEXT[lang].reasons[reason],
  });
}

/* ── 운영자(Kai)용 — 한국어 ── */

export const ADMIN_REASON_LABEL: Record<CardRejectReason, string> = {
  no_money: '돈 안 들어옴',
  wrong_amount: '금액 다름',
  bad_receipt: '사진 문제',
};

const PERIOD_KO: Record<number, string> = {
  1: '1개월',
  3: '3개월',
  6: '6개월',
  12: '1년',
};

/** 주문 코드 — id 끝 6자리. 유저 화면·운영자 메시지·입금 메모가 같은 값을 쓴다 */
export const orderCode = (id: string) => id.slice(-6).toUpperCase();

/** 타슈켄트 시각 HH:MM (MM-DD) */
export function tashkentTime(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Tashkent',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  return `${get('month')}-${get('day')} ${get('hour')}:${get('minute')}`;
}

const MARK = { ok: '✅', base: '🟡', mismatch: '⚠️', unknown: '❔' } as const;

export function ocrLine(
  order: Pick<CardPaymentOrder, 'amount'>,
  ocr: CardReceiptOcr | null,
) {
  if (!ocr) return '🔎 OCR: 읽지 못함 — 사진을 직접 확인';
  const amountNote =
    ocr.amount == null
      ? ''
      : ocr.checks.amount === 'ok'
        ? ''
        : ` (${formatSom(ocr.amount)} ≠ ${formatSom(order.amount)})`;
  const parts = [
    `금액 ${MARK[ocr.checks.amount]}${amountNote}`,
    `받는카드 ${MARK[ocr.checks.receiver]}`,
    `보낸카드 ${MARK[ocr.checks.sender]}`,
  ];
  if (ocr.success === false) parts.push('⚠️ 실패/대기 표시');
  if (ocr.isReceipt === false) parts.push('⚠️ 영수증 아님');
  if (ocr.dateTime) parts.push(`🕒 ${ocr.dateTime}`);
  return `🔎 OCR: ${parts.join(' · ')}`;
}

/** 승인 요청 사진의 캡션 (텔레그램 제한 1024자) */
export function adminCaption(
  order: CardPaymentOrder & { _id: { toString(): string }; createdAt?: Date },
  who: { nickname?: string; telegramId?: string },
  extra: { ocr?: 'pending' | 'done'; decision?: string } = {},
) {
  const lines = [
    `💳 카드 입금 #${orderCode(order._id.toString())}`,
    `👤 ${who.nickname || '(이름 없음)'}${who.telegramId ? ` · tg ${who.telegramId}` : ''}`,
    `📦 ${order.tier.toUpperCase()} · ${PERIOD_KO[order.months] ?? `${order.months}개월`}`,
    `💰 ${formatSom(order.amount)} so'm  (정가 ${formatSom(order.baseAmount)})`,
    `🏦 받는 카드 •• ${order.receiverLast4 ?? '?'} · 보낸 카드 •• ${order.payerLast4 ?? '?'}`,
    `🕒 주문 ${order.createdAt ? tashkentTime(order.createdAt) : '?'} · 제출 ${
      order.submittedAt ? tashkentTime(order.submittedAt) : '?'
    } (타슈켄트)`,
  ];
  if (order.duplicateOf)
    lines.push(
      `⚠️ 같은 사진이 #${orderCode(order.duplicateOf)} 주문에서도 쓰였어`,
    );
  lines.push(
    extra.ocr === 'pending' ? '🔎 OCR 확인 중…' : ocrLine(order, order.ocr),
  );
  lines.push('', '👉 은행 앱 입금 내역에서 위 금액이 들어왔는지 보고 눌러');
  if (extra.decision) lines.splice(lines.length - 2, 2, '', extra.decision);
  return lines.join('\n').slice(0, 1024);
}
