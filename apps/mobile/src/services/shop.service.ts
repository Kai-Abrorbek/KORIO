import api from "./api";

/** 보석으로 사는 프리미엄 기간권 (서버 payments/gems/gem-pass.const.ts) */
export interface GemPass {
  id: string;
  days: number;
  gems: number;
  /** 하루당 보석 */
  perDay: number;
  affordable: boolean;
  /** 쌓기 상한을 넘겨서 못 사는 경우 */
  overStack: boolean;
}

export interface GemPassList {
  gems: number;
  /** 지금 프리미엄이 언제까지인지 (없으면 null) */
  premiumUntil: string | null;
  stackedDays: number;
  maxStackDays: number;
  passes: GemPass[];
}

export interface GemPassRedeemed {
  passId: string;
  days: number;
  gemsSpent: number;
  gems: number;
  premiumUntil: string;
}

export const ShopService = {
  getGemPasses: (): Promise<GemPassList> => api.get("/payments/gem-passes"),

  redeemGemPass: (passId: string): Promise<GemPassRedeemed> =>
    api.post("/payments/gem-passes/redeem", { passId }),
};
