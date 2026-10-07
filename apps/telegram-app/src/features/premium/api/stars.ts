import type { MySubscription, StarsCatalog } from "../model/premium";

type Request = <T>(path: string, init?: RequestInit) => Promise<T>;

/** 서버 payments/telegram — Stars 가격표 (가격은 서버가 정한다) */
export function fetchStarsCatalog(request: Request) {
  return request<StarsCatalog>("/payments/telegram/products");
}

/** 결제 버튼 → 인보이스 링크. 미니앱이 WebApp.openInvoice 로 연다 */
export function createStarsInvoice(request: Request, productId: string, lang: string) {
  return request<{ link: string; productId: string; stars: number }>(
    "/payments/telegram/invoice",
    { body: JSON.stringify({ lang, productId }), method: "POST" },
  );
}

/** 프리미엄 권한 — 플랫폼 무관, KORIO 계정 기준 */
export function fetchMySubscription(request: Request) {
  return request<MySubscription>("/payments/subscriptions/me");
}
