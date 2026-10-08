/**
 * 봇 웹훅으로 오는 업데이트 중 우리가 읽는 부분만 (Bot API 문서 기준).
 * 그 밖의 필드는 받아도 무시한다.
 */
export interface TgUser {
  id: number;
  is_bot?: boolean;
  username?: string;
  language_code?: string;
}

export interface TgSuccessfulPayment {
  currency: string;
  total_amount: number;
  invoice_payload: string;
  telegram_payment_charge_id: string;
  provider_payment_charge_id?: string;
  /** Stars 구독일 때만. 지금은 기간권만 팔아서 안 온다 */
  subscription_expiration_date?: number;
  is_recurring?: boolean;
  is_first_recurring?: boolean;
}

export interface TgRefundedPayment {
  currency: string;
  total_amount: number;
  invoice_payload: string;
  telegram_payment_charge_id: string;
  provider_payment_charge_id?: string;
}

export interface TgMessage {
  message_id: number;
  from?: TgUser;
  chat: { id: number; type: string };
  text?: string;
  successful_payment?: TgSuccessfulPayment;
  refunded_payment?: TgRefundedPayment;
}

export interface TgPreCheckoutQuery {
  id: string;
  from: TgUser;
  currency: string;
  total_amount: number;
  invoice_payload: string;
}

/** 인라인 버튼 누름 (카드 입금 승인/거절) */
export interface TgCallbackQuery {
  id: string;
  from: TgUser;
  data?: string;
  message?: { message_id: number; chat: { id: number } };
}

export interface TgUpdate {
  update_id?: number;
  message?: TgMessage;
  pre_checkout_query?: TgPreCheckoutQuery;
  callback_query?: TgCallbackQuery;
}
