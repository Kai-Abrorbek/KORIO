"use client";

import { qs } from "@/shared/api/client";
import { useQuery } from "@/shared/api/use-query";
import { BarChart, Donut, Legend, LineChart } from "@/shared/ui/charts";
import { RangePicker, useDateRange } from "@/shared/ui/date-range";
import { dateOnly, full } from "@/shared/ui/format";
import {
  ChartCard,
  ChartSkeleton,
  EmptyState,
  ErrorState,
  KpiCard,
  Unavailable,
} from "@/shared/ui/primitives";
import { CohortTable } from "./cohort-table";
import { Funnel } from "./funnel";
import type {
  ActiveUsersResponse,
  FunnelResponse,
  OverviewResponse,
  RetentionResponse,
  SubscriptionsResponse,
} from "./types";

const DAY_MS = 86_400_000;

/** 서버의 fillSeries 와 같은 날짜 목록. 스파크라인 배열에 x축을 붙이는 데 쓴다 */
function daysOf(fromISO: string, toISO: string): string[] {
  const out: string[] = [];
  const to = new Date(toISO).getTime();
  for (let t = new Date(fromISO).getTime(); t <= to; t += DAY_MS) {
    out.push(new Date(t).toISOString().slice(0, 10));
  }
  return out;
}

export function DashboardPage() {
  const { range, days, setDays } = useDateRange(30);
  const suffix = qs({ from: range.from, to: range.to });

  const overview = useQuery<OverviewResponse>(`/admin/analytics/overview${suffix}`);
  const active = useQuery<ActiveUsersResponse>(`/admin/analytics/active-users${suffix}`);
  const funnel = useQuery<FunnelResponse>("/admin/analytics/funnel");
  const subs = useQuery<SubscriptionsResponse>(`/admin/analytics/subscriptions${suffix}`);
  const retention = useQuery<RetentionResponse>("/admin/analytics/retention?weeks=10");

  const signups = overview.data?.kpis.find((k) => k.key === "newUsers");
  const signupDays = overview.data ? daysOf(overview.data.range.from, overview.data.range.to) : [];

  return (
    <div className="stack">
      <div className="page-head">
        <p className="page-sub">
          최근 {days}일 · 모든 증감은 <b>직전 {days}일</b>과의 비교다
        </p>
        <RangePicker days={days} onChange={setDays} />
      </div>

      {/* ── KPI ── */}
      {overview.error ? (
        <div className="card">
          <ErrorState code={overview.error} onRetry={overview.reload} />
        </div>
      ) : overview.loading || !overview.data ? (
        <div className="kpi-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="skeleton" key={i} style={{ height: 106 }} />
          ))}
        </div>
      ) : (
        <>
          <div className="kpi-grid">
            {overview.data.kpis.map((k) => (
              <KpiCard kpi={k} key={k.key} />
            ))}
          </div>
          <Unavailable items={overview.data.unavailable} />
        </>
      )}

      {/* ── 활동 ── */}
      <div className="chart-grid">
        <ChartCard
          wide
          title="활성 학습자"
          sub="'앱을 열었다'가 아니라 '실제로 문제를 풀었다'는 기준이다"
          right={
            <Legend
              items={[
                { key: "dau", label: "DAU", color: "var(--series-1)" },
                { key: "wau", label: "WAU (7일)", color: "var(--series-2)" },
                { key: "mau", label: "MAU (30일)", color: "var(--series-3)" },
              ]}
            />
          }
        >
          {active.error ? (
            <ErrorState code={active.error} onRetry={active.reload} />
          ) : active.loading || !active.data ? (
            <ChartSkeleton height={220} />
          ) : (
            <LineChart
              labels={active.data.series.map((p) => p.date)}
              series={[
                { key: "dau", label: "DAU", color: "var(--series-1)", values: active.data.series.map((p) => p.dau) },
                { key: "wau", label: "WAU", color: "var(--series-2)", values: active.data.series.map((p) => p.wau) },
                { key: "mau", label: "MAU", color: "var(--series-3)", values: active.data.series.map((p) => p.mau) },
              ]}
              height={260}
              endLabels
            />
          )}
        </ChartCard>

        <ChartCard title="신규 가입" sub={`최근 ${days}일`}>
          {overview.loading || !signups ? (
            <ChartSkeleton height={200} />
          ) : (
            <LineChart
              labels={signupDays.slice(0, signups.sparkline.length)}
              series={[
                {
                  key: "signups",
                  label: "가입",
                  color: "var(--series-4)",
                  values: signups.sparkline,
                },
              ]}
              height={200}
              area
            />
          )}
        </ChartCard>

        <ChartCard
          title="구독"
          sub={
            subs.data?.eventsSince
              ? `구독 이력은 ${dateOnly(subs.data.eventsSince)}부터 쌓인다`
              : undefined
          }
        >
          {subs.error ? (
            <ErrorState code={subs.error} onRetry={subs.reload} />
          ) : subs.loading || !subs.data ? (
            <ChartSkeleton height={168} />
          ) : (
            <>
              <Donut
                parts={[
                  { key: "premium", label: "프리미엄", value: subs.data.active, color: "var(--series-1)" },
                  { key: "free", label: "무료", value: subs.data.free, color: "var(--border-strong)" },
                ]}
              />
              <div className="chart-sub" style={{ marginTop: 2 }}>
                체험을 시작한 적 있는 사용자 <b className="tnum">{full(subs.data.trials)}</b>명
              </div>
            </>
          )}
        </ChartCard>

        <ChartCard
          wide
          title="구독 신규 / 이탈"
          sub="갱신(supersede)은 이탈로 세지 않는다 — 섞으면 갱신 때마다 이탈이 튄다"
          right={
            <Legend
              items={[
                { key: "new", label: "신규", color: "var(--series-2)" },
                { key: "churn", label: "이탈", color: "var(--series-3)" },
              ]}
            />
          }
        >
          {subs.loading || !subs.data ? (
            <ChartSkeleton height={200} />
          ) : subs.data.newSeries.every((p) => p.value === 0) &&
            subs.data.churnSeries.every((p) => p.value === 0) ? (
            <EmptyState
              title="이 기간에 구독 변동이 없다"
              body="결제가 실연동되기 전까지는 구독 이벤트가 거의 안 쌓인다."
            />
          ) : (
            <BarChart
              labels={subs.data.newSeries.map((p) => p.date)}
              series={[
                { key: "new", label: "신규", color: "var(--series-2)", values: subs.data.newSeries.map((p) => p.value) },
                { key: "churn", label: "이탈", color: "var(--series-3)", values: subs.data.churnSeries.map((p) => p.value) },
              ]}
              height={200}
            />
          )}
        </ChartCard>

        <ChartCard wide title="학습 퍼널" sub="전체 기간 누적 · 오른쪽 숫자는 직전 단계 대비 전환율">
          {funnel.error ? (
            <ErrorState code={funnel.error} onRetry={funnel.reload} />
          ) : funnel.loading || !funnel.data ? (
            <ChartSkeleton height={280} />
          ) : (
            <Funnel steps={funnel.data.steps} />
          )}
        </ChartCard>

        <ChartCard
          wide
          title="코호트 리텐션"
          sub="가입 주차별 · '—' 는 아직 그 날짜에 도달하지 않은 코호트다 (0% 가 아니다)"
        >
          {retention.error ? (
            <ErrorState code={retention.error} onRetry={retention.reload} />
          ) : retention.loading || !retention.data ? (
            <ChartSkeleton height={240} />
          ) : (
            <CohortTable cohorts={retention.data.cohorts} />
          )}
        </ChartCard>
      </div>
    </div>
  );
}
