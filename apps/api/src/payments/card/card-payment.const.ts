import { randomInt } from 'crypto';
import {
  STARS_PRODUCTS,
  type StarsProduct,
} from '../providers/telegram-stars/telegram-stars.const';

/**
 * Humo·Uzcard 카드 입금 (텔레그램 미니앱).
 *
 * 유저가 우리 카드로 직접 돈을 보내고 영수증 스크린샷을 올리면, 운영자가 봇에서
 * 승인 버튼을 눌러 기간권을 준다. 상품(등급·기간)은 Stars 와 같고 값만 so'm 이다.
 *
 * ⚠️ 텔레그램 봇 약관상 미니앱의 디지털 상품은 Stars 로만 팔아야 한다. Kai 가
 *    위험을 알고 넣기로 했다 (2026-10-07). 경고가 오면 CARD_PAYMENT_ENABLED=false
 *    하나로 미니앱에서 즉시 사라진다 — 이미 낸 주문의 승인·영수증 제출은 계속 된다.
 *
 * 가격: 구글 플레이 UZS(원화 × 약 9.7)와 같은 선. 플랫폼마다 값이 다르면 싼 쪽으로
 * 몰린다. 바꾸려면 여기만 고치면 된다.
 */
export const CARD_PRICES_UZS: Record<string, number> = {
  super_1m: 59_000,
  super_3m: 155_000,
  super_6m: 279_000,
  super_12m: 449_000,
  max_1m: 129_000,
  max_3m: 329_000,
  max_6m: 629_000,
  max_12m: 1_139_000,
};

export interface CardProduct extends StarsProduct {
  /** 정가 (so'm) */
  priceUzs: number;
}

export const CARD_PRODUCTS: CardProduct[] = STARS_PRODUCTS.filter(
  (p) => CARD_PRICES_UZS[p.id] != null,
).map((p) => ({ ...p, priceUzs: CARD_PRICES_UZS[p.id] }));

export const cardProductById = (id: string) =>
  CARD_PRODUCTS.find((p) => p.id === id);

export function cardCatalog() {
  return CARD_PRODUCTS.map((p) => {
    const monthly = CARD_PRODUCTS.find(
      (m) => m.tier === p.tier && m.months === 1,
    );
    const full = monthly ? monthly.priceUzs * p.months : p.priceUzs;
    return {
      id: p.id,
      tier: p.tier,
      plan: p.plan,
      months: p.months,
      days: p.days,
      priceUzs: p.priceUzs,
      perMonthUzs: Math.round(p.priceUzs / p.months),
      savePercent:
        p.months > 1
          ? Math.max(0, Math.round((1 - p.priceUzs / full) * 100))
          : 0,
      best: p.months === 12,
    };
  });
}

/** 입금할 시간. 이 안에 보내라고 타이머를 보여준다 */
export const CARD_TRANSFER_WINDOW_MIN = 30;
/**
 * 시간이 지나도 영수증은 이만큼 더 받는다. 이미 돈을 보낸 사람이 타이머를
 * 놓쳤다고 버려지면 안 된다.
 */
export const CARD_SUBMIT_GRACE_MIN = 180;

/**
 * 고유 금액 — 정가에서 1~999 so'm 을 **뺀** 값을 주문마다 다르게 준다.
 *
 * 운영자는 은행 앱 입금 내역에서 금액만 보고 어느 주문인지 바로 안다. 스크린샷은
 * 쉽게 조작되지만 통장에 찍힌 금액은 못 꾸민다. 더하지 않고 빼는 이유: 유저는
 * 표시된 가격보다 절대 더 내지 않는다 (몇백 so'm 은 우리가 덜 받는다).
 *
 * 최근 주문과 금액이 겹치지 않게 고른다 — 같은 금액 두 건이 같은 날 들어오면
 * 다시 헷갈린다.
 */
export const CARD_AMOUNT_OFFSET_MAX = 999;
export const CARD_AMOUNT_UNIQUE_HOURS = 72;

export function pickUniqueAmount(
  base: number,
  taken: Iterable<number>,
): number {
  const used = new Set(taken);
  for (let attempt = 0; attempt < 60; attempt++) {
    const amount = base - randomInt(1, CARD_AMOUNT_OFFSET_MAX + 1);
    if (!used.has(amount)) return amount;
  }
  // 60번 다 겹치면(72시간 안에 같은 상품 수백 건) 비어 있는 값을 차례로 찾는다
  for (let offset = 1; offset <= CARD_AMOUNT_OFFSET_MAX; offset++) {
    if (!used.has(base - offset)) return base - offset;
  }
  return base - randomInt(1, CARD_AMOUNT_OFFSET_MAX + 1);
}

/** 영수증 사진 */
export const CARD_RECEIPT_MAX_BYTES = 8 * 1024 * 1024;
export const CARD_RECEIPT_MIMES = ['image/jpeg', 'image/png', 'image/webp'];

/** 거절 사유 (봇 버튼 · 유저 알림 · 미니앱 화면이 같은 코드를 쓴다) */
export const CARD_REJECT_REASONS = [
  'no_money',
  'wrong_amount',
  'bad_receipt',
] as const;
export type CardRejectReason = (typeof CARD_REJECT_REASONS)[number];

/** 1 234 567 */
export const formatSom = (n: number) =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
