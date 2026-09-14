import type { Kpi } from "@/shared/ui/primitives";

export interface UnavailableMetric {
  key: string;
  reason: string;
  detail: string;
}

export interface OverviewResponse {
  range: { from: string; to: string; prevFrom: string; prevTo: string; days: number };
  kpis: Kpi[];
  unavailable: UnavailableMetric[];
}

export interface ActiveUsersResponse {
  /** 'STUDIED' — 앱을 연 사람이 아니라 실제로 문제를 푼 사람 */
  definition: string;
  series: { date: string; dau: number; wau: number; mau: number }[];
}

export interface FunnelStep {
  key: string;
  users: number;
  /** 계측을 배포한 시점. 이 단계는 그 뒤로만 셀 수 있다 */
  since?: string | null;
  partial?: boolean;
  conversionFromPrev: number | null;
  conversionFromStart: number | null;
}
export interface FunnelResponse {
  steps: FunnelStep[];
}

export interface SubscriptionsResponse {
  active: number;
  free: number;
  trials: number;
  premiumRate: number;
  newSeries: { date: string; value: number }[];
  churnSeries: { date: string; value: number }[];
  eventsSince: string | null;
  unavailable: UnavailableMetric[];
}

export interface RetentionResponse {
  cohorts: {
    week: string;
    size: number;
    d1: number | null;
    d7: number | null;
    d30: number | null;
  }[];
}
