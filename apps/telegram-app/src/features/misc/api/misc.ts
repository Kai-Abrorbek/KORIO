import type {
  EnergyState,
  GemPassList,
  GemPassRedeemed,
  PublicUser,
  ScoreData,
} from "../model/misc";
import type { PayoutBrand, PayoutChanged, PayoutOverview } from "../model/payout";
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
