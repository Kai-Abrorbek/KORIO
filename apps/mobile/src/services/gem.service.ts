import api from "./api";

/** 보석 내역 — api gem-ledger. 텔레그램 features/misc/model/gems.ts 와 같은 모양 */
export type GemHistoryType = "all" | "in" | "out";

export interface GemTx {
  id: string;
  /** 들어오면 +, 나가면 − */
  amount: number;
  /** api GEM_SOURCES (chest, league, energy_refill …) */
  source: string;
  params: Record<string, string | number | undefined>;
  createdAt: string;
}

export interface GemHistoryPage {
  items: GemTx[];
  nextCursor: string | null;
}

export interface GemSummary {
  balance: number;
  monthIn: number;
  monthOut: number;
  since: string | null;
}

export const GemService = {
  summary: () => api.get<GemSummary>("/gems/summary"),
  history: (type: GemHistoryType, before?: string | null) =>
    api.get<GemHistoryPage>(
      `/gems/history?type=${type}${before ? `&before=${encodeURIComponent(before)}` : ""}`,
    ),
};
