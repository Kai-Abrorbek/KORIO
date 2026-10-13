import api from "./api";
import type { PayoutBrand } from "@/features/shop/payoutCard";

export type PayoutStatus = "pending" | "processing" | "completed" | "rejected" | "cancelled";
export type PayoutRejectReason = "invalid_card" | "name_mismatch" | "suspicious" | "other";

/** 유저에게 보이는 출금 신청 — 카드는 끝 4자리만 */
export interface GemPayout {
  id: string;
  gems: number;
  amountUzs: number;
  brand: PayoutBrand;
  cardLast4: string;
  cardHolder: string;
  status: PayoutStatus;
  rejectReason: PayoutRejectReason | null;
  createdAt: string | null;
  completedAt: string | null;
  rejectedAt: string | null;
}

export interface PayoutOverview {
  /** 서버(어드민 숫자 설정)가 정한다 */
  minGems: number;
  somPerGem: number;
  gems: number;
  /** 진행 중인 신청 (한 번에 하나) */
  open: GemPayout | null;
  /** 최근 5건 (열린 것 포함) */
  recent: GemPayout[];
}

export const PayoutService = {
  overview: () => api.get<PayoutOverview>("/gem-payouts/me"),
  create: (input: { brand: PayoutBrand; cardNumber: string; cardHolder: string; gems: number }) =>
    api.post<{ request: GemPayout; gems: number }>("/gem-payouts", input),
  cancel: (id: string) =>
    api.post<{ request: GemPayout; gems: number }>(`/gem-payouts/${id}/cancel`, {}),
};
