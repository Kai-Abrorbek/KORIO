"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { qs } from "@/shared/api/client";
import { useQuery } from "@/shared/api/use-query";
import { ErrorState } from "@/shared/ui/primitives";
import { LineChart } from "@/shared/ui/charts";
import { CohortTable } from "@/features/dashboard/cohort-table";
import type { ActiveUsersResponse, OverviewResponse, RetentionResponse } from "@/features/dashboard/types";
import { useConsole } from "@/widgets/console-context";

type Tab = "overview" | "funnel" | "questions" | "retention";
type Lesson = { id: string; code: string | null; title: string; section: number; unit: number; nodeId: string; nodeTitle: string; order: number; category: string; starts: number; completes: number; completionRate: number | null; answered: number; correct: number; accuracy: number | null; avgMinutes: number | null };
type PathResponse = { since: string | null; definition: string; lessons: Lesson[] };
type FunnelResponse = { lesson: { id: string; code: string | null; title: string }; since: string | null; starts: number; completes: number; active: number; abandoned: number; definition: string; steps: { index: number; questionId: string; code: string | null; type: string; reached: number }[] };
type QuestionResponse = { since: string | null; limited: boolean; definition: string; items: { id: string; code: string | null; type: string; preview: string; attempts: number; answered: number; correctRate: number | null; skipRate: number | null; avgSeconds: number | null }[] };
const tabs: { id: Tab; label: string }[] = [{ id: "overview", label: "학습 분석" }, { id: "funnel", label: "레슨 퍼널" }, { id: "questions", label: "문제 분석" }, { id: "retention", label: "리텐션" }];
const number = (value: number) => value.toLocaleString("ko-KR");
const percent = (value: number | null) => value === null ? "—" : `${value}%`;
const started = (value: string | null) => value ? `계측 시작 ${new Date(value).toLocaleDateString("ko-KR")}` : "아직 수집된 기록이 없습니다";

function Status<T>({ query, children, empty }: { query: { data: T | null; error: string | null; reload: () => void }; children: (data: T) => React.ReactNode; empty?: string }) {
  if (query.error) return <section className="admin-card"><ErrorState code={query.error} onRetry={query.reload}/></section>;
  if (!query.data) return <div className="admin-card skeleton" style={{ height: 220 }}/ >;
  return <>{children(query.data) || <div className="admin-card admin-empty">{empty ?? "표시할 기록이 없습니다."}</div>}</>;
}

export function LiveAnalyticsPage() {
  const { range } = useConsole();
  const [tab, setTab] = useState<Tab>("overview");
  const [section, setSection] = useState<number | null>(null);
  const [unit, setUnit] = useState<number | null>(null);
  const [lessonId, setLessonId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [questionType, setQuestionType] = useState("all");
  const [retentionWeeks, setRetentionWeeks] = useState(8);
  useEffect(() => {
    const sync = () => {
      const requested = new URLSearchParams(window.location.search).get("tab");
      setTab(tabs.some(item => item.id === requested) ? requested as Tab : "overview");
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const suffix = qs({ from: range.from, to: range.to });
  const path = useQuery<PathResponse>(`/admin/analytics/learning-path${suffix}`);
  const active = useQuery<ActiveUsersResponse>(tab === "overview" ? `/admin/analytics/active-users${suffix}` : null);
  const overview = useQuery<OverviewResponse>(tab === "overview" ? `/admin/analytics/overview${suffix}` : null);
  const question = useQuery<QuestionResponse>(tab === "questions" ? `/admin/analytics/questions${suffix}` : null);
  const retention = useQuery<RetentionResponse>(tab === "retention" ? `/admin/analytics/retention?weeks=${retentionWeeks}` : null, { refreshMs: 120_000 });
  const selectedLesson = lessonId || path.data?.lessons.find(item => item.starts > 0)?.id || path.data?.lessons[0]?.id || "";
  const funnel = useQuery<FunnelResponse>(tab === "funnel" && selectedLesson ? `/admin/analytics/lesson-funnel${qs({ lessonId: selectedLesson, from: range.from, to: range.to })}` : null);
  const sections = useMemo(() => [...new Set(path.data?.lessons.map(item => item.section) ?? [])].sort((a, b) => a - b), [path.data]);
  const selectedSection = section !== null && sections.includes(section) ? section : sections[0] ?? null;
  const units = useMemo(() => [...new Set(path.data?.lessons.filter(item => item.section === selectedSection).map(item => item.unit) ?? [])].sort((a, b) => a - b), [path.data, selectedSection]);
  const selectedUnit = unit !== null && units.includes(unit) ? unit : units[0] ?? null;
  const lessons = path.data?.lessons.filter(item => item.section === selectedSection && item.unit === selectedUnit) ?? [];
  const questionTypes = [...new Set(question.data?.items.map(item => item.type) ?? [])].sort();
  const filteredQuestions = question.data?.items.filter(item => (questionType === "all" || item.type === questionType) && `${item.code ?? ""} ${item.preview}`.toLowerCase().includes(search.toLowerCase())) ?? [];
  const changeTab = (next: Tab) => {
    setTab(next);
    window.history.pushState(null, "", next === "overview" ? "/analytics" : `/analytics?tab=${next}`);
  };

  return <div className="admin-page">
    <div className="admin-page-head"><div><h2>학습 분석</h2><p>학습 기록으로 이탈과 어려운 문제를 찾습니다. 수집 전 데이터는 추정하지 않습니다.</p></div><span className="admin-pill blue">{range.label} · 자동 새로고침</span></div>
    <nav className="admin-tabs" aria-label="분석 탭">{tabs.map(item => <button key={item.id} className={tab === item.id ? "is-active" : ""} onClick={() => changeTab(item.id)}>{item.label}</button>)}</nav>

    {tab === "overview" && <>
      <div className="admin-grid three">{["activeLearners", "lessonsCompleted", "avgStudyMinutes"].map(key => { const value = overview.data?.kpis.find(item => item.key === key); return <div className="admin-card admin-kpi" key={key}><div className="admin-kpi-label">{({ activeLearners: "선택 기간 학습자", lessonsCompleted: "완료 레슨", avgStudyMinutes: "학습자당 평균 시간" } as Record<string, string>)[key]}</div><div className="admin-kpi-value">{overview.error ? "오류" : value ? `${number(value.value)}${key === "avgStudyMinutes" ? "분" : ""}` : "—"}</div><div className="admin-kpi-note">{key === "avgStudyMinutes" ? "앱이 보고한 학습 시간" : "실제 학습 기록 기준"}</div></div>; })}</div>
      <section className="admin-card"><div className="admin-card-head"><h3>일간 학습자</h3></div><div className="admin-card-body"><Status query={active}>{data => <><LineChart labels={data.series.map(point => point.date)} series={[{ key: "dau", label: "DAU", color: "var(--series-1)", values: data.series.map(point => point.dau) }]} area height={260}/><p className="bm-data-note">각 사용자 현지 날짜에 문제를 풀거나 XP를 얻은 고유 계정 수입니다.</p></>}</Status></div></section>
      <Status query={path}>{data => <><p className="bm-data-note">{started(data.since)} · {data.definition}</p><section className="admin-card"><div className="admin-card-head"><h3>Section별 학습 시도</h3></div><div className="admin-card-body">{sections.length ? sections.map(value => { const rows = data.lessons.filter(item => item.section === value); const starts = rows.reduce((sum, item) => sum + item.starts, 0); const completes = rows.reduce((sum, item) => sum + item.completes, 0); return <button className="an-question-alert" key={value} onClick={() => setSection(value)}><span>Section {value}</span><strong>{number(starts)}회 시작 · {number(completes)}회 완료 · {percent(starts ? Math.round(completes / starts * 1000) / 10 : null)}</strong></button>; }) : <div className="admin-empty">등록된 레슨이 없습니다.</div>}</div></section><div className="admin-grid"><section className="admin-card"><div className="admin-card-head"><h3>Unit별</h3><select aria-label="Section 선택" value={selectedSection ?? ""} onChange={event => { setSection(Number(event.target.value)); setUnit(null); }}>{sections.map(value => <option key={value} value={value}>Section {value}</option>)}</select></div><div className="admin-card-body">{units.map(value => { const rows = data.lessons.filter(item => item.section === selectedSection && item.unit === value); const starts = rows.reduce((sum, item) => sum + item.starts, 0); const completes = rows.reduce((sum, item) => sum + item.completes, 0); return <button className="an-question-alert" key={value} onClick={() => setUnit(value)}><span>Unit {value} · {rows.length}개 레슨</span><strong>{number(starts)}회 시작 · {percent(starts ? Math.round(completes / starts * 1000) / 10 : null)} 완료</strong></button>; })}</div></section><section className="admin-card"><div className="admin-card-head"><h3>레슨별</h3><select aria-label="Unit 선택" value={selectedUnit ?? ""} onChange={event => setUnit(Number(event.target.value))}>{units.map(value => <option key={value} value={value}>Unit {value}</option>)}</select></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Node / Lesson</th><th className="right">시작</th><th className="right">완료</th><th className="right">완료율</th><th className="right">정답률</th><th className="right">평균</th></tr></thead><tbody>{lessons.map(item => <tr key={item.id} onClick={() => { setLessonId(item.id); changeTab("funnel"); }} style={{ cursor: "pointer" }}><td><strong>{item.title || item.code || item.id}</strong><br/><small>{item.nodeTitle || "Node 이름 없음"}</small></td><td className="right">{number(item.starts)}</td><td className="right">{number(item.completes)}</td><td className="right">{percent(item.completionRate)}</td><td className="right">{percent(item.accuracy)}</td><td className="right">{item.avgMinutes === null ? "—" : `${item.avgMinutes}분`}</td></tr>)}</tbody></table></div></section></div></>}</Status>
    </>}

    {tab === "funnel" && <Status query={path}>{data => <><div className="admin-toolbar"><label>레슨 <select value={selectedLesson} onChange={event => setLessonId(event.target.value)}>{data.lessons.map(item => <option key={item.id} value={item.id}>S{item.section} U{item.unit} · {item.title || item.code || item.id}</option>)}</select></label></div>{selectedLesson ? <Status query={funnel}>{detail => <><p className="bm-data-note">{started(detail.since)} · {detail.definition}</p><div className="admin-grid three"><div className="admin-card admin-kpi"><div className="admin-kpi-label">레슨 시작</div><div className="admin-kpi-value">{number(detail.starts)}</div></div><div className="admin-card admin-kpi"><div className="admin-kpi-label">완료</div><div className="admin-kpi-value">{number(detail.completes)}</div></div><div className="admin-card admin-kpi"><div className="admin-kpi-label">이탈 / 진행 중</div><div className="admin-kpi-value">{number(detail.abandoned)} / {number(detail.active)}</div></div></div><section className="admin-card"><div className="admin-card-head"><h3>{detail.lesson.title || detail.lesson.code} · 문제 도달</h3></div><div className="admin-card-body"><div className="an-funnel-row"><div className="an-funnel-meta"><span>레슨 시작</span><strong>{number(detail.starts)}회</strong></div><div className="admin-hbar-track"><span style={{ width: "100%" }}/></div></div>{detail.steps.map(step => <div className="an-funnel-row" key={`${step.questionId}-${step.index}`}><div className="an-funnel-meta"><Link href={`/content?tab=questions&question=${step.questionId}`}>{step.index + 1}. {step.code || step.type || "문제"} →</Link><strong>{number(step.reached)}회</strong><small>{percent(detail.starts ? Math.round(step.reached / detail.starts * 1000) / 10 : null)}</small></div><div className="admin-hbar-track"><span style={{ width: `${detail.starts ? step.reached / detail.starts * 100 : 0}%` }}/></div></div>)}<div className="an-funnel-row"><div className="an-funnel-meta"><span>레슨 완료</span><strong>{number(detail.completes)}회</strong><small>{percent(detail.starts ? Math.round(detail.completes / detail.starts * 1000) / 10 : null)}</small></div><div className="admin-hbar-track"><span style={{ width: `${detail.starts ? detail.completes / detail.starts * 100 : 0}%` }}/></div></div></div></section></>}</Status> : <div className="admin-card admin-empty">등록된 레슨이 없습니다.</div>}</>}</Status>}

    {tab === "questions" && <Status query={question}>{data => <><p className="bm-data-note">{started(data.since)} · {data.definition}{data.limited ? " · 표본이 500개를 넘어 일부만 표시됩니다." : ""}</p><div className="admin-toolbar"><input aria-label="문제 검색" placeholder="문제 코드·지시문 검색" value={search} onChange={event => setSearch(event.target.value)}/><select aria-label="문제 유형" value={questionType} onChange={event => setQuestionType(event.target.value)}><option value="all">모든 유형</option>{questionTypes.map(value => <option key={value} value={value}>{value}</option>)}</select></div><section className="admin-card"><div className="admin-card-head"><h3>문제별 응답 · {number(filteredQuestions.length)}개</h3></div>{filteredQuestions.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>문제</th><th>유형</th><th className="right">응답</th><th className="right">정답률</th><th className="right">건너뛰기</th><th className="right">평균 풀이</th></tr></thead><tbody>{filteredQuestions.map(item => <tr key={item.id}><td><Link href={`/content?tab=questions&question=${item.id}`}><strong>{item.code || item.id}</strong> · {item.preview || "지시문 없음"} →</Link></td><td>{item.type}</td><td className="right">{number(item.attempts)}</td><td className="right"><span className={`admin-pill ${item.correctRate !== null && item.correctRate < 30 && item.answered >= 20 ? "bad" : "blue"}`}>{percent(item.correctRate)}</span></td><td className="right">{percent(item.skipRate)}</td><td className="right">{item.avgSeconds === null ? "—" : `${item.avgSeconds}초`}</td></tr>)}</tbody></table></div> : <div className="admin-empty">선택 기간에 응답한 문제가 없습니다.</div>}</section><p className="bm-data-note">정답률이 낮아도 응답 20건 미만이면 경고로 단정하지 않습니다. 이탈률은 문제 응답만으로 정확히 계산할 수 없어 레슨 퍼널에서 도달 수를 확인합니다.</p></>}</Status>}

    {tab === "retention" && <><div className="admin-toolbar"><label>가입 주차 <select value={retentionWeeks} onChange={event => setRetentionWeeks(Number(event.target.value))}><option value={8}>최근 8주</option><option value={12}>최근 12주</option><option value={26}>최근 26주</option></select></label></div><Status query={retention}>{data => <><section className="admin-card"><div className="admin-card-head"><h3>가입 주차별 학습 재방문</h3></div><div className="admin-card-body"><CohortTable cohorts={data.cohorts}/></div></section><p className="bm-data-note">D1·D7·D30은 가입 후 해당 일차에 학습한 비율입니다. 최근 코호트는 아직 도달하지 않은 일차를 —로 표시합니다. 앱 실행만으로는 재방문으로 세지 않습니다.</p></>}</Status></>}
  </div>;
}
