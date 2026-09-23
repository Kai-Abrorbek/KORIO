import type {
  EnergyState,
  GemPassList,
  GemPassRedeemed,
  PublicUser,
  ScoreData,
} from "../model/misc";

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
  return request<ScoreData>("/lessons/score?lang=uz");
}

export function getPublicUser(request: AuthenticatedRequest, userId: string) {
  return request<PublicUser>(`/users/${encodeURIComponent(userId)}`);
}
