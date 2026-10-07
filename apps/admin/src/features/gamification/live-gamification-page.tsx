"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { qs } from "@/shared/api/client";
import { useQuery } from "@/shared/api/use-query";
import { LineChart } from "@/shared/ui/charts";
import { ErrorState } from "@/shared/ui/primitives";
import { useConsole } from "@/widgets/console-context";

type Bucket = { key: string; label: string; count: number };
type Overview = {
  xp: { earned: number; earners: number; lifetimeOnProfiles: number; series: { date: string; value: number; learners: number }[]; distribution: Bucket[] };
  streak: { usersWithStreak: number; averageStored: number | null; distribution: Bucket[] };
  league: { weekKey: string; timezone: string; rooms: number; participants: number; distribution: { tier: string; count: number }[] };
  quests: { month: string; participants: number; claims: number; completed: number; target: number };
  alerts: { userId: string; nickname: string; date: string; xp: number }[];
  definitions: { period: string; snapshot: string; league: string; quests: string; alerts: string; challenge: string };
};
type SettingItem = { label: string; value: number; unit: string; key: string };
type Settings = {
  readOnly: boolean; note: string;
  groups: { title: string; source: string; items: SettingItem[] }[];
  streakGoals: { days: number; gems: number }[];
  questRewards: Record<string, number>;
  leagueChallenges: { tier: string; id: string; xpPerPoint: number; maxXp: number; energyCost: number }[];
};
type Tab = "overview" | "settings";
const num = (value: number) => value.toLocaleString("ko-KR");

function Bars({ rows, color = "var(--brand)" }: { rows: { key: string; label: string; count: number }[]; color?: string }) {
  const max = Math.max(1, ...rows.map(row => row.count));
  return <div>{rows.map(row => <div className="admin-hbar" key={row.key}><span className="admin-hbar-label">{row.label}</span><div className="admin-hbar-track"><span style={{ width: `${row.count / max * 100}%`, background: color }}/></div><span className="admin-hbar-value">{num(row.count)}</span></div>)}</div>;
}

export function LiveGamificationPage() {
  const { range } = useConsole();
  const [tab, setTab] = useState<Tab>("overview");
  useEffect(() => {
    const sync = () => setTab(new URLSearchParams(window.location.search).get("tab") === "settings" ? "settings" : "overview");
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const overview = useQuery<Overview>(tab === "overview" ? `/admin/gamification/overview${qs({ from: range.from, to: range.to })}` : null);
  const settings = useQuery<Settings>(tab === "settings" ? "/admin/gamification/settings" : null, { refreshMs: 0 });
  const changeTab = (next: Tab) => {
    setTab(next);
    window.history.pushState(null, "", next === "overview" ? "/gamification" : "/gamification?tab=settings");
  };

  return <div className="admin-page">
    <div className="admin-page-head"><div><h2>게이미피케이션</h2><p>XP·연속 학습·리그·퀘스트의 실제 이용 현황과 서버 규칙입니다.</p></div><span className="admin-pill blue">{tab === "overview" ? `${range.label} · 자동 새로고침` : "서버 설정 · 읽기 전용"}</span></div>
    <nav className="admin-tabs" aria-label="게이미피케이션 탭"><button className={tab === "overview" ? "is-active" : ""} onClick={() => changeTab("overview")}>활동 분석</button><button className={tab === "settings" ? "is-active" : ""} onClick={() => changeTab("settings")}>설정</button></nav>

    {tab === "overview" && (overview.error ? <section className="admin-card"><ErrorState code={overview.error} onRetry={overview.reload}/></section> : !overview.data ? <div className="admin-card skeleton" style={{ height: 420 }}/> : <>
      <div className="admin-grid four">
        <div className="admin-card admin-kpi"><div className="admin-kpi-label">선택 기간 획득 XP</div><div className="admin-kpi-value">{num(overview.data.xp.earned)}</div><div className="admin-kpi-note">{num(overview.data.xp.earners)}명이 획득</div></div>
        <div className="admin-card admin-kpi"><div className="admin-kpi-label">연속 학습 중</div><div className="admin-kpi-value">{num(overview.data.streak.usersWithStreak)}</div><div className="admin-kpi-note">현재 저장된 Streak가 1일 이상</div></div>
        <div className="admin-card admin-kpi"><div className="admin-kpi-label">이번 주 리그 참여</div><div className="admin-kpi-value">{num(overview.data.league.participants)}</div><div className="admin-kpi-note">{overview.data.league.weekKey} · {num(overview.data.league.rooms)}개 방</div></div>
        <div className="admin-card admin-kpi"><div className="admin-kpi-label">이번 달 퀘스트 참여</div><div className="admin-kpi-value">{num(overview.data.quests.participants)}</div><div className="admin-kpi-note">{overview.data.quests.month} · 목표 완료 {num(overview.data.quests.completed)}명</div></div>
      </div>
      <p className="bm-data-note">{overview.data.definitions.period} {overview.data.definitions.snapshot}</p>
      <section className="admin-card"><div className="admin-card-head"><h3>날짜별 획득 XP</h3><span className="admin-pill blue">선택 기간</span></div><div className="admin-card-body"><LineChart labels={overview.data.xp.series.map(point => point.date)} series={[{ key: "xp", label: "획득 XP", color: "var(--series-1)", values: overview.data.xp.series.map(point => point.value) }]} area height={280}/><p className="bm-data-note">누적 프로필 XP 합계 {num(overview.data.xp.lifetimeOnProfiles)}는 기간 획득 XP와 다른 현재 스냅샷입니다.</p></div></section>
      <div className="admin-grid"><section className="admin-card"><div className="admin-card-head"><h3>누적 XP 분포</h3></div><div className="admin-card-body"><Bars rows={overview.data.xp.distribution}/></div></section><section className="admin-card"><div className="admin-card-head"><h3>현재 Streak 분포</h3></div><div className="admin-card-body"><Bars rows={overview.data.streak.distribution} color="var(--series-4)"/><p className="bm-data-note">전체 계정 평균 저장값 {overview.data.streak.averageStored === null ? "—" : `${overview.data.streak.averageStored}일`} · 조회 시점까지 갱신되지 않은 계정이 있을 수 있습니다.</p></div></section></div>
      <div className="admin-grid"><section className="admin-card"><div className="admin-card-head"><h3>현재 리그 등급</h3></div><div className="admin-card-body"><Bars rows={overview.data.league.distribution.map(row => ({ key: row.tier, label: row.tier, count: row.count }))} color="var(--series-6)"/><p className="bm-data-note">{overview.data.definitions.league} 등급 분포는 현재 사용자 문서 기준입니다.</p></div></section><section className="admin-card"><div className="admin-card-head"><h3>월간 퀘스트</h3></div><div className="admin-card-body"><div className="admin-detail-grid"><div><small>퀘스트 보상 수령</small><strong>{num(overview.data.quests.claims)}회</strong></div><div><small>완주 목표</small><strong>{overview.data.quests.target}회</strong></div><div><small>목표 완료 계정</small><strong>{num(overview.data.quests.completed)}명</strong></div></div><p className="bm-data-note">{overview.data.definitions.quests}</p></div></section></div>
      <section className="admin-card"><div className="admin-card-head"><h3>일일 XP 상한 근접 · 검토 후보</h3><span className="admin-pill warn">자동 판정 아님</span></div><div className="admin-card-body">{overview.data.alerts.length ? overview.data.alerts.map(item => <div className="admin-alert-row" key={`${item.userId}-${item.date}`}><span className="admin-pill warn">{item.date}</span><div><strong>{item.nickname || item.userId}</strong><div className="page-sub">하루 XP {num(item.xp)}</div></div><Link href="/users">사용자 목록 →</Link></div>) : <div className="admin-empty">선택 기간에 상한 90% 이상인 기록이 없습니다.</div>}<p className="bm-data-note">{overview.data.definitions.alerts}</p></div></section>
      <section className="admin-card admin-card-body"><strong>리그 챌린지 참여율</strong><p className="page-sub">{overview.data.definitions.challenge} 수치를 추정해 표시하지 않습니다.</p></section>
    </>)}

    {tab === "settings" && (settings.error ? <section className="admin-card"><ErrorState code={settings.error} onRetry={settings.reload}/></section> : !settings.data ? <div className="admin-card skeleton" style={{ height: 420 }}/> : <>
      <section className="admin-card admin-card-body"><strong>현재 서버 설정 · 읽기 전용</strong><p className="page-sub">{settings.data.note}</p><Link href="/settings">실시간 숫자 설정 관리 →</Link></section>
      {settings.data.groups.map(group => <section className="admin-card" key={group.title}><div className="admin-card-head"><h3>{group.title}</h3><span className="page-sub">{group.source}</span></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>항목</th><th>현재 값</th><th>서버 상수</th><th>변경</th></tr></thead><tbody>{group.items.map(item => <tr key={item.key}><td><strong>{item.label}</strong></td><td>{num(item.value)} {item.unit}</td><td><code>{item.key}</code></td><td><span className="admin-pill">코드 수정·배포</span></td></tr>)}</tbody></table></div></section>)}
      <div className="admin-grid"><section className="admin-card"><div className="admin-card-head"><h3>연속 학습 목표 보상</h3></div><div className="admin-card-body"><Bars rows={settings.data.streakGoals.map(item => ({ key: String(item.days), label: `${item.days}일`, count: item.gems }))} color="var(--series-4)"/><p className="bm-data-note">막대는 Gems 보상량입니다.</p></div></section><section className="admin-card"><div className="admin-card-head"><h3>일일 퀘스트 보상</h3></div><div className="admin-card-body"><Bars rows={Object.entries(settings.data.questRewards).map(([key, count]) => ({ key, label: key, count }))}/></div></section></div>
      <section className="admin-card"><div className="admin-card-head"><h3>리그별 챌린지 규칙</h3></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>리그</th><th>종목</th><th className="right">점수당 XP</th><th className="right">한 판 XP 상한</th><th className="right">에너지</th></tr></thead><tbody>{settings.data.leagueChallenges.map(item => <tr key={item.tier}><td><strong>{item.tier}</strong></td><td>{item.id}</td><td className="right">{item.xpPerPoint}</td><td className="right">{item.maxXp}</td><td className="right">{item.energyCost}</td></tr>)}</tbody></table></div></section>
    </>)}
  </div>;
}
