"use client";

import { Sparkline } from "./charts";
import { compact, full, percent } from "./format";

/* ════════════════════════ 카드 ════════════════════════ */

export function ChartCard({
  title,
  sub,
  right,
  children,
  wide = false,
}: {
  title: string;
  sub?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <section className={`card chart-card${wide ? " col-span-2" : ""}`}>
      <div className="chart-head">
        <div>
          <div className="chart-title">{title}</div>
          {sub && <div className="chart-sub">{sub}</div>}
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}

/* ════════════════════════ KPI ════════════════════════ */

export interface Kpi {
  key: string;
  value: number;
  prev: number | null;
  deltaPct: number | null;
  sparkline: number[];
  unit?: string;
  note?: string;
}

/**
 * 지표 하나가 "좋다/나쁘다" 인지 어떻게 아느냐.
 *
 * ⚠️ **오르는 게 항상 좋은 게 아니다.** 지표마다 방향이 다르고, 방향이 없는
 *    지표도 있다(무료 유저 수는 늘어도 줄어도 그 자체로는 판단할 수 없다).
 *    색을 잘못 칠하면 화면이 거짓말을 한다.
 */
type Direction = "up-good" | "down-good" | "neutral";

const META: Record<string, { label: string; direction: Direction; hint?: string }> = {
  activeLearners: { label: "학습한 사람", direction: "up-good" },
  newUsers: { label: "신규 가입", direction: "up-good" },
  studiedToday: { label: "오늘 학습", direction: "up-good" },
  lessonsCompleted: { label: "완료한 레슨", direction: "up-good" },
  avgStudyMinutes: { label: "1인 평균 학습", direction: "up-good" },
  premiumUsers: { label: "프리미엄", direction: "up-good" },
  freeUsers: { label: "무료", direction: "neutral" },
  premiumRate: { label: "프리미엄 비율", direction: "up-good" },
};

/** 서버가 붙여 보내는 주석. 숫자의 뜻이 보이는 것과 다를 때만 붙는다 */
const NOTE: Record<string, string> = {
  STUDIED_NOT_OPENED:
    "'앱을 열었다'가 아니라 '실제로 문제를 풀었다'는 뜻이다. 학습 앱에서 의미 있는 쪽은 이쪽이라 기본으로 잡았다.",
  CLIENT_REPORTED: "앱이 신고한 값이다. 서버가 잰 시간이 아니라 오차가 있을 수 있다.",
};

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const meta = META[kpi.key] ?? { label: kpi.key, direction: "neutral" as Direction };
  const d = kpi.deltaPct;

  const tone =
    d === null || d === 0 || meta.direction === "neutral"
      ? "is-flat"
      : (d > 0) === (meta.direction === "up-good")
        ? "is-up"
        : "is-down";

  const value =
    kpi.unit === "percent"
      ? percent(kpi.value)
      : kpi.key === "avgStudyMinutes"
        ? `${kpi.value}분`
        : full(kpi.value);

  return (
    <article className="card kpi">
      <div className="kpi-label">
        {meta.label}
        {kpi.note && NOTE[kpi.note] && (
          <span className="kpi-note" title={NOTE[kpi.note]} aria-label={NOTE[kpi.note]}>
            <IconInfo />
          </span>
        )}
      </div>
      <div className="kpi-value tnum">{value}</div>
      <div className="kpi-foot">
        {d === null ? (
          <span className="dim">비교 기간 없음</span>
        ) : (
          <>
            <span className={`kpi-delta ${tone} tnum`}>
              {d > 0 ? <IconUp /> : d < 0 ? <IconDown /> : null}
              {d > 0 ? "+" : ""}
              {percent(d)}
            </span>
            <span>직전 {kpi.prev === null ? "" : compact(kpi.prev)}</span>
          </>
        )}
      </div>
      {kpi.sparkline.length > 1 && <Sparkline values={kpi.sparkline} />}
    </article>
  );
}

/* ════════════════════════ 상태 화면 ════════════════════════ */

export function EmptyState({ title, body }: { title: string; body?: string }) {
  return (
    <div className="empty">
      <IconEmpty />
      <div className="empty-title">{title}</div>
      {body && <div className="empty-body">{body}</div>}
    </div>
  );
}

export function ErrorState({ code, onRetry }: { code: string; onRetry?: () => void }) {
  return (
    <div className="empty">
      <div className="empty-title">불러오지 못했습니다</div>
      {/* 코드를 숨기면 원인을 알 수 없다. Telegram Mini App 때 이것 때문에 며칠 날렸다 */}
      <div className="empty-body tnum">{code}</div>
      {onRetry && (
        <button className="btn btn-ghost" onClick={onRetry} style={{ marginTop: 6 }}>
          다시 시도
        </button>
      )}
    </div>
  );
}

export function ChartSkeleton({ height = 220 }: { height?: number }) {
  return <div className="skeleton" style={{ height, width: "100%" }} />;
}

/**
 * 계산할 수 없는 지표.
 *
 * ⚠️ **추정치를 진짜처럼 보여주지 않는다.** 어드민이 숫자를 믿고 결정을 내리는
 *    화면이라, 그럴듯한 가짜 하나가 없는 것보다 훨씬 나쁘다.
 */
export function Unavailable({
  items,
}: {
  items: readonly { key: string; reason: string; detail: string }[];
}) {
  if (!items.length) return null;
  const LABEL: Record<string, string> = { mrr: "MRR (월 반복 매출)" };
  return (
    <div className="stack" style={{ gap: 8 }}>
      {items.map((m) => (
        <div className="unavailable" key={m.key}>
          <IconWarn />
          <div>
            <div className="unavailable-title">{LABEL[m.key] ?? m.key} — 아직 계산할 수 없다</div>
            <div className="unavailable-body">{m.detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════ 아이콘 ════════════════════════ */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
function IconUp() {
  return <svg width="11" height="11" viewBox="0 0 24 24" {...S}><path d="M12 19V5M5 12l7-7 7 7" /></svg>;
}
function IconDown() {
  return <svg width="11" height="11" viewBox="0 0 24 24" {...S}><path d="M12 5v14M19 12l-7 7-7-7" /></svg>;
}
function IconInfo() {
  return <svg width="12" height="12" viewBox="0 0 24 24" {...S}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>;
}
function IconWarn() {
  return <svg width="15" height="15" viewBox="0 0 24 24" {...S}><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><path d="M12 9v4M12 17h.01" /></svg>;
}
function IconEmpty() {
  return <svg width="22" height="22" viewBox="0 0 24 24" {...S} strokeWidth={1.6} style={{ opacity: 0.55 }}><path d="M3 3v18h18" /><path d="M7 16h.01M11 16h.01M15 16h.01M19 16h.01" /></svg>;
}
