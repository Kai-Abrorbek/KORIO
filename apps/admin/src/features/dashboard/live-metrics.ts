import type { ConsoleRange } from "@/widgets/console-context";
import type { ActiveUsersResponse, OverviewResponse } from "./types";
import { METRICS, type MetricKey, type MetricSeries } from "./mock-source";

const DAY = 86_400_000;
export const LIVE_TREND_KEYS = ["dau", "wau", "mau", "signups"] as const satisfies readonly MetricKey[];
export type LiveTrendKey = (typeof LIVE_TREND_KEYS)[number];

export function previousRange(range: ConsoleRange) {
  const to = Date.parse(`${range.from}T00:00:00.000Z`) - DAY;
  const from = to - (range.days - 1) * DAY;
  return {
    from: new Date(from).toISOString().slice(0, 10),
    to: new Date(to).toISOString().slice(0, 10),
  };
}

export function liveTrends(active: ActiveUsersResponse, overview: OverviewResponse, previousActive: ActiveUsersResponse, previousOverview: OverviewResponse): MetricSeries[] {
  const signups = overview.kpis.find(item => item.key === "newUsers");
  const previousSignups = previousOverview.kpis.find(item => item.key === "newUsers");
  const labels = active.series.map(item => item.date);
  const previousLabels = previousActive.series.map(item => item.date);
  const byKey = (key: LiveTrendKey): [number[], number[]] => key === "signups"
    ? [signups?.sparkline ?? [], previousSignups?.sparkline ?? []]
    : [active.series.map(item => item[key]), previousActive.series.map(item => item[key])];

  return LIVE_TREND_KEYS.map(key => {
    const definition = METRICS.find(item => item.key === key)!;
    const [values, prior] = byKey(key);
    const current = key === "signups" ? signups?.value ?? 0 : values.at(-1) ?? 0;
    const previous = key === "signups" ? previousSignups?.value ?? 0 : prior.at(-1) ?? 0;
    return {
      ...definition,
      labels: key === "signups" ? labels.slice(0, values.length) : labels,
      values,
      current,
      previous,
      delta: previous ? Math.round((current - previous) / previous * 1000) / 10 : 0,
    };
  }).filter(item => item.values.length > 0 && (item.key === "signups" ? item.labels.length === item.values.length : previousLabels.length === item.values.length));
}

/** A date-aligned comparison for the detail chart; never invent values for a missing day. */
export function priorValues(key: LiveTrendKey, prior: ActiveUsersResponse, priorOverview: OverviewResponse): number[] {
  if (key === "signups") return priorOverview.kpis.find(item => item.key === "newUsers")?.sparkline ?? [];
  return prior.series.map(item => item[key]);
}
