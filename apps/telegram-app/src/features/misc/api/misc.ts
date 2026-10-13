import type {
  EnergyState,
  GemPassList,
  GemPassRedeemed,
  PublicUser,
  ScoreData,
} from "../model/misc";
import type { PayoutBrand, PayoutChanged, PayoutOverview } from "../model/payout";
import type { GemHistoryPage, GemHistoryType, GemSummary } from "../model/gems";
import { getContentLang } from "../../../shared/i18n/content-language";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export function getEnergy(request: AuthenticatedRequest) {
  return request<EnergyState>("/energy");
}

export function refillEnergy(request: AuthenticatedRequest) {
  return request<EnergyState>("/energy/refill", { body: "{}", method: "POST" });
}

export function claimFreeEnergy(request: AuthenticatedRequest) {
  return request<EnergyState>("/energy/free", { body: "{}", method: "POST" });
}

export function getGemPasses(request: AuthenticatedRequest) {
  return request<GemPassList>("/payments/gem-passes");
}

export function redeemGemPass(request: AuthenticatedRequest, passId: string) {
  return request<GemPassRedeemed>("/payments/gem-passes/redeem", {
    body: JSON.stringify({ passId }),
    method: "POST",
  });
}

export function getScore(request: AuthenticatedRequest) {
  return request<ScoreData>(`/lessons/score?lang=${getContentLang()}`);
}

export function getPublicUser(request: AuthenticatedRequest, userId: string) {
  return request<PublicUser>(`/users/${encodeURIComponent(userId)}`);
}

/** 보석 출금 — 최소 수량·진행 중인 신청·최근 결과 */
export function getGemPayouts(request: AuthenticatedRequest) {
  return request<PayoutOverview>("/gem-payouts/me");
}

export function createGemPayout(
  request: AuthenticatedRequest,
  input: { brand: PayoutBrand; cardNumber: string; cardHolder: string; gems: number },
) {
  return request<PayoutChanged>("/gem-payouts", { body: JSON.stringify(input), method: "POST" });
}

export function cancelGemPayout(request: AuthenticatedRequest, id: string) {
  return request<PayoutChanged>(`/gem-payouts/${encodeURIComponent(id)}/cancel`, { body: "{}", method: "POST" });
}

/** 보석 내역 — 잔액·이번 달 받은/쓴 보석 */
export function getGemSummary(request: AuthenticatedRequest) {
  return request<GemSummary>("/gems/summary");
}

/** 보석 내역 한 페이지 (최근 것부터). before 는 앞 페이지의 nextCursor */
export function getGemHistory(request: AuthenticatedRequest, type: GemHistoryType, before: string | null) {
  const query = new URLSearchParams({ type });
  if (before) query.set("before", before);
  return request<GemHistoryPage>(`/gems/history?${query.toString()}`);
}
