import type { ConsoleRange } from "@/widgets/console-context";

export type MetricKey = "dau" | "wau" | "mau" | "signups" | "studiedToday" | "lessons" | "minutes" | "premium" | "free" | "conversion";
export interface MetricDefinition {
  key: MetricKey;
  label: string;
  unit: "count" | "minutes" | "percent";
  favorable: "up" | "down" | "neutral";
  base: number;
  slope: number;
  amplitude: number;
}
export interface MetricSeries extends MetricDefinition {
  labels: string[];
  values: number[];
  current: number;
  previous: number;
  delta: number;
}
export interface DashboardBreakdown { label: string; count: number; change?: number; href: string; }
export interface DashboardAlert { id: string; severity: "critical" | "warning" | "info"; title: string; detail: string; href: string; }

/** 실제 지표가 아닌, 시간 필터와 화면 동작을 검증하기 위한 결정적인 예시값. */
export const METRICS: MetricDefinition[] = [
  { key: "dau", label: "DAU · 일간 학습자", unit: "count", favorable: "up", base: 818, slope: 3.2, amplitude: 28 },
  { key: "wau", label: "WAU · 주간 학습자", unit: "count", favorable: "up", base: 3842, slope: 12, amplitude: 86 },
  { key: "mau", label: "MAU · 월간 학습자", unit: "count", favorable: "up", base: 11460, slope: 25, amplitude: 145 },
  { key: "signups", label: "신규 가입", unit: "count", favorable: "up", base: 120, slope: 1.25, amplitude: 11 },
  { key: "studiedToday", label: "오늘 학습한 사용자", unit: "count", favorable: "up", base: 815, slope: 3.1, amplitude: 31 },
  { key: "lessons", label: "완료한 레슨", unit: "count", favorable: "up", base: 1780, slope: 7.5, amplitude: 49 },
  { key: "minutes", label: "평균 학습 시간", unit: "minutes", favorable: "up", base: 17.4, slope: .03, amplitude: .6 },
  { key: "premium", label: "Premium 사용자", unit: "count", favorable: "up", base: 1080, slope: 2.2, amplitude: 17 },
  { key: "free", label: "Free 사용자", unit: "count", favorable: "neutral", base: 9800, slope: 21, amplitude: 90 },
  { key: "conversion", label: "Free → Premium 전환", unit: "percent", favorable: "up", base: 8.3, slope: .012, amplitude: .19 },
];

const DAY = 86_400_000;
const ANCHOR_DAY = Date.parse("2026-09-20T00:00:00.000Z") / DAY;
const hash = (key: string) => [...key].reduce((sum, char) => sum + char.charCodeAt(0), 0);
export function mockSeries(def: MetricDefinition, range: ConsoleRange): MetricSeries {
  const days = range.days;
  const end = new Date(`${range.to}T00:00:00.000Z`).getTime();
  const offset = hash(def.key) % 13;
  const labels = Array.from({ length: days }, (_, i) => new Date(end - (days - 1 - i) * DAY).toISOString().slice(0, 10));
  const valueOn = (date: string) => {
    const absolute = Math.floor(new Date(`${date}T00:00:00.000Z`).getTime() / DAY);
    const trend = def.slope * (absolute - ANCHOR_DAY);
    const wave = Math.sin((absolute + offset) * .73) * def.amplitude + Math.sin((absolute + offset) * .19) * def.amplitude * .45;
    return Math.max(0, Math.round((def.base + trend + wave) * (def.unit === "count" ? 1 : 10)) / (def.unit === "count" ? 1 : 10));
  };
  const values = labels.map(valueOn);
  const current = values.at(-1) ?? 0;
  const previous = valueOn(new Date(end - days * DAY).toISOString().slice(0, 10));
  return { ...def, labels, values, current, previous, delta: previous ? Math.round(((current - previous) / previous) * 1000) / 10 : 0 };
}

/** 대시보드가 기대하는 계약. 실제 API 연결 시 구현체만 교체한다. */
export interface DashboardSource {
  metrics(range: ConsoleRange): Promise<MetricSeries[]>;
  breakdown(range: ConsoleRange): Promise<DashboardBreakdown[]>;
  alerts(range: ConsoleRange): Promise<DashboardAlert[]>;
}

export const mockDashboardSource: DashboardSource = {
  async metrics(range) { return METRICS.map(def => mockSeries(def, range)); },
  async breakdown(range) {
    const multiplier = range.days === 1 ? 1 : Math.max(1, Math.round(range.days * .68));
    return [
      { label: "신규 가입", count: 20 * multiplier, href: "/users" },
      { label: "온보딩 완료", count: 16 * multiplier, href: "/analytics" },
      { label: "첫 레슨 시작", count: 12 * multiplier, href: "/analytics?tab=funnel" },
      { label: "레슨 완료", count: 76 * multiplier, href: "/analytics" },
      { label: "Premium 전환", count: 3 * multiplier, change: 3 * multiplier, href: "/subscriptions" },
      { label: "구독 취소", count: 1 * multiplier, change: -1 * multiplier, href: "/subscriptions" },
    ];
  },
  async alerts() {
    return [
      { id: "q-127", severity: "critical", title: "문제 정답률 급락", detail: "문법 질문 GR-127 · 정답률 18%", href: "/content?tab=quality" },
      { id: "l-42", severity: "warning", title: "레슨 42 이탈 증가", detail: "문제 4 → 5 구간 이탈률 24%", href: "/analytics?tab=funnel" },
      { id: "i18n", severity: "info", title: "번역 누락 7건", detail: "UZ 5건 · RU 2건", href: "/content?tab=localization" },
    ];
  },
};

export function formatMetric(metric: Pick<MetricDefinition, "unit">, value: number): string {
  if (metric.unit === "minutes") return `${value.toLocaleString("ko-KR", { maximumFractionDigits: 1 })}분`;
  if (metric.unit === "percent") return `${value.toLocaleString("ko-KR", { maximumFractionDigits: 1 })}%`;
  return value.toLocaleString("ko-KR");
}
