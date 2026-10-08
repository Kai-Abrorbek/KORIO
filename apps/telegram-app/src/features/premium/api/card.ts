import type { CardConfig, CardOrder } from "../model/card";

type Request = <T>(path: string, init?: RequestInit) => Promise<T>;

/** 켜져 있는지 · 우리 카드 · so'm 가격표 · 진행 중 주문 */
export function fetchCardConfig(request: Request) {
  return request<CardConfig>("/payments/card/config");
}

/** 주문 → 고유 금액 */
export function createCardOrder(request: Request, productId: string) {
  return request<CardOrder>("/payments/card/orders", {
    body: JSON.stringify({ productId }),
    method: "POST",
  });
}

export function fetchCardOrder(request: Request, orderId: string) {
  return request<CardOrder>(`/payments/card/orders/${orderId}`);
}

export function cancelCardOrder(request: Request, orderId: string) {
  return request<CardOrder>(`/payments/card/orders/${orderId}/cancel`, { method: "POST" });
}

/** 영수증 스크린샷 + 보낸 카드 끝 4자리 (multipart) */
export function submitCardReceipt(
  request: Request,
  orderId: string,
  receipt: Blob,
  payerLast4: string,
  receiverLast4: string | null,
) {
  const form = new FormData();
  const type = receipt.type || "image/jpeg";
  const ext = type === "image/png" ? "png" : type === "image/webp" ? "webp" : "jpg";
  form.append("receipt", receipt, `receipt.${ext}`);
  form.append("payerLast4", payerLast4);
  if (receiverLast4) form.append("receiverLast4", receiverLast4);
  return request<CardOrder>(`/payments/card/orders/${orderId}/receipt`, {
    body: form,
    method: "POST",
  });
}
