import type { SubscriptionTier } from "./premium";

/** 서버 payments/card — Humo·Uzcard 카드 입금 (운영자 승인) */
export type CardBrand = "humo" | "uzcard";

export interface ReceivingCard {
  brand: CardBrand;
  /** 숫자 16자리 */
  number: string;
  holder: string;
  last4: string;
}

export interface CardProduct {
  id: string;
  tier: SubscriptionTier;
  plan: string;
  months: number;
  days: number;
  priceUzs: number;
  perMonthUzs: number;
  savePercent: number;
  best: boolean;
}

export type CardOrderStatus =
  | "awaiting_transfer"
  | "submitted"
  | "approved"
  | "rejected"
  | "expired"
  | "cancelled";

export interface CardOrder {
  id: string;
  /** 주문 코드 (id 끝 6자리) */
  code: string;
  productId: string;
  tier: SubscriptionTier;
  months: number;
  baseAmount: number;
  /** 보내야 하는 고유 금액 */
  amount: number;
  status: CardOrderStatus;
  createdAt: string;
  expiresAt: string;
  submitUntil: string;
  submittedAt: string | null;
  decidedAt: string | null;
  rejectReason: "no_money" | "wrong_amount" | "bad_receipt" | null;
  premiumUntil: string | null;
  receiverLast4: string | null;
}

export interface CardConfig {
  /** 끄기 스위치 (CARD_PAYMENT_ENABLED) — false 면 새 주문 불가 */
  enabled: boolean;
  cards: ReceivingCard[];
  products: CardProduct[];
  transferMinutes: number;
  /** 입금 대기·심사 중인 주문 (꺼져 있어도 끝까지 보여준다) */
  activeOrder: CardOrder | null;
}

/** 1 234 567 */
export const formatSom = (value: number) =>
  String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** 9860 1234 5678 9012 */
export const formatCardNumber = (digits: string) =>
  digits.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");

export const CARD_BRAND_LABEL: Record<CardBrand, string> = {
  humo: "HUMO",
  uzcard: "UZCARD",
};
