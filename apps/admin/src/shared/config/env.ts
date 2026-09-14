/**
 * API 주소.
 *
 * 기본은 같은 오리진의 `/api` 다 — 개발에서는 Next 가, 배포에서는 Caddy 가
 * 그걸 NestJS 로 넘긴다. 같은 오리진이면 CORS 설정이 하나 줄고, 무엇보다
 * Telegram Mini App 이 그것 때문에 통째로 막혔던 전례가 있다.
 *
 * ⚠️ 그래도 API 의 ALLOWED_ORIGINS 에 이 도메인을 넣어야 한다. 브라우저는
 *    **같은 오리진이어도** POST 에 Origin 헤더를 붙인다.
 */
export function apiBaseUrl(): string {
  const value = process.env.NEXT_PUBLIC_API_URL?.trim();
  return value ? value.replace(/\/+$/, "") : "/api";
}
