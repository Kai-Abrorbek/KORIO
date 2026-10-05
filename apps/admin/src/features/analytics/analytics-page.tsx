"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LineChart } from "@/shared/ui/charts";
import { CohortTable } from "@/features/dashboard/cohort-table";
import { useConsole } from "@/widgets/console-context";
import { METRICS, mockSeries } from "@/features/dashboard/mock-source";
import { mockAnalyticsSource, type StudyRow, type QuestionRow, type FunnelPoint, type CohortRow } from "./mock-source";

type Tab="overview"|"funnel"|"questions"|"retention";
const TABS:{id:Tab;label:string}[]=[{id:"overview",label:"Section · Unit · Lesson"},{id:"funnel",label:"레슨 퍼널"},{id:"questions",label:"문제 분석"},{id:"retention",label:"리텐션"}];
const pct=(n:number)=>`${Math.round(n*10)/10}%`;

function StudyTable({rows,onSelect}: {rows:StudyRow[];onSelect?:(row:StudyRow)=>void}) {
  return <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>콘텐츠</th><th className="right">시작</th><th className="right">완료</th><th className="right">완료율</th><th className="right">정답률</th><th className="right">평균 시간</th></tr></thead><tbody>{rows.map(row=><tr key={row.id} onClick={()=>onSelect?.(row)} style={{cursor:onSelect?"pointer":"default"}}><td><strong>{row.title}</strong></td><td className="right">{row.starts.toLocaleString("ko-KR")}</td><td className="right">{row.completes.toLocaleString("ko-KR")}</td><td className="right"><span className={`admin-pill ${row.completes/row.starts<.65?"bad":"good"}`}>{pct(row.completes/row.starts*100)}</span></td><td className="right">{pct(row.accuracy)}</td><td className="right">{row.minutes}분</td></tr>)}</tbody></table></div>;
}

export function AnalyticsPage() {
  const {range}=useConsole();
  const [tab,setTab]=useState<Tab>("overview");
  const [section,setSection]=useState(1);
  const [unit,setUnit]=useState(1);
  const [lessonId,setLessonId]=useState("S1-U1-L1");
  const [sections,setSections]=useState<StudyRow[]>([]);
  const [units,setUnits]=useState<StudyRow[]>([]);
  const [lessons,setLessons]=useState<StudyRow[]>([]);
  const [questions,setQuestions]=useState<QuestionRow[]>([]);
  const [funnel,setFunnel]=useState<FunnelPoint[]>([]);
  const [cohorts,setCohorts]=useState<CohortRow[]>([]);
  const [type,setType]=useState("all");
  const [selectedQuestion,setSelectedQuestion]=useState<QuestionRow|null>(null);
  useEffect(()=>{const query=new URLSearchParams(window.location.search).get("tab");if(TABS.some(item=>item.id===query))setTab(query as Tab);},[]);
  useEffect(()=>{mockAnalyticsSource.sections().then(setSections);mockAnalyticsSource.questions().then(setQuestions);mockAnalyticsSource.retention().then(setCohorts);},[]);
  useEffect(()=>{mockAnalyticsSource.units(section).then(setUnits);},[section]);
  useEffect(()=>{mockAnalyticsSource.lessons(section,unit).then(setLessons);},[section,unit]);
  useEffect(()=>{mockAnalyticsSource.lessonFunnel(lessonId).then(setFunnel);},[lessonId]);
  const filtered=useMemo(()=>questions.filter(q=>type==="all"||q.type===type),[questions,type]);
  const types=[...new Set(questions.map(q=>q.type))];
  const dau=mockSeries(METRICS[0]!,range);
  const signup=mockSeries(METRICS[3]!,range);

  return <div className="admin-page">
    <div className="admin-page-head"><div><h2>학습 분석</h2><p>Section에서 문제까지 내려가 이탈 지점을 찾습니다. 표시된 수치는 mock 데이터입니다.</p></div><span className="admin-pill blue">{range.label}</span></div>
    <div className="admin-tabs">{TABS.map(item=><button key={item.id} className={tab===item.id?"is-active":""} onClick={()=>{setTab(item.id);window.history.replaceState(null,"",item.id==="overview"?"/analytics":`/analytics?tab=${item.id}`);}}>{item.label}</button>)}</div>
    {tab==="overview" && <>
      <div className="admin-grid three"><div className="admin-card admin-kpi"><div className="admin-kpi-label">학습한 사용자</div><div className="admin-kpi-value">{dau.current.toLocaleString("ko-KR")}</div><div className="admin-kpi-note">선택 기간 마지막 날</div></div><div className="admin-card admin-kpi"><div className="admin-kpi-label">신규 가입</div><div className="admin-kpi-value">{signup.current.toLocaleString("ko-KR")}</div><div className="admin-kpi-note">학습 퍼널 유입</div></div><div className="admin-card admin-kpi"><div className="admin-kpi-label">문제 품질 경고</div><div className="admin-kpi-value">{questions.filter(q=>q.correctRate<35||q.dropRate>20).length}</div><div className="admin-kpi-note">정답률 낮음 또는 이탈 높음</div></div></div>
      <div className="admin-grid"><section className="admin-card"><div className="admin-card-head"><h3>학습 활성 추이</h3></div><div className="admin-card-body"><LineChart labels={dau.labels} series={[{key:"dau",label:"DAU",color:"var(--series-1)",values:dau.values}]} area height={250}/></div></section><section className="admin-card"><div className="admin-card-head"><h3>Section 완료율</h3></div><div className="admin-card-body">{sections.map(row=><div className="admin-hbar" key={row.id}><span className="admin-hbar-label">{row.section}. {row.title}</span><div className="admin-hbar-track"><span style={{width:`${row.completes/row.starts*100}%`}}/></div><span className="admin-hbar-value">{pct(row.completes/row.starts*100)}</span></div>)}</div></section></div>
      <section className="admin-card"><div className="admin-card-head"><h3>Section</h3><span className="admin-pill blue">행을 눌러 Unit 보기</span></div><StudyTable rows={sections} onSelect={row=>{setSection(row.section);setUnit(1);}}/></section>
      <div className="admin-grid"><section className="admin-card"><div className="admin-card-head"><h3>Section {section} · Unit</h3><select value={section} onChange={e=>{setSection(Number(e.target.value));setUnit(1);}}>{sections.map(row=><option key={row.id} value={row.section}>{row.section}. {row.title}</option>)}</select></div><StudyTable rows={units} onSelect={row=>setUnit(row.unit)}/></section><section className="admin-card"><div className="admin-card-head"><h3>Unit {unit} · Lesson</h3><select value={unit} onChange={e=>setUnit(Number(e.target.value))}>{units.map(row=><option key={row.id} value={row.unit}>{row.title}</option>)}</select></div><StudyTable rows={lessons} onSelect={row=>{setLessonId(row.id);setTab("funnel");}}/></section></div>
    </>}
    {tab==="funnel" && <>
      <div className="admin-toolbar"><label>Section <select value={section} onChange={e=>setSection(Number(e.target.value))}>{sections.map(row=><option key={row.id} value={row.section}>{row.section}</option>)}</select></label><label>Unit <select value={unit} onChange={e=>setUnit(Number(e.target.value))}>{units.map(row=><option key={row.id} value={row.unit}>{row.unit}</option>)}</select></label><label>Lesson <select value={lessonId} onChange={e=>setLessonId(e.target.value)}>{lessons.map(row=><option key={row.id} value={row.id}>{row.title}</option>)}</select></label></div>
      <section className="admin-card"><div className="admin-card-head"><h3>문제 단위 이탈</h3><span className="admin-pill blue">Lesson Start → Complete</span></div><div className="admin-card-body">{funnel.map((point,i)=>{const pctOfStart=point.users/(funnel[0]?.users||1)*100;const previous=i?funnel[i-1]!.users:point.users;const drop=i?100-point.users/previous*100:0;return <div key={point.id} className="an-funnel-row"><div className="an-funnel-meta"><span>{point.questionId?<Link href={`/content?tab=questions&question=${point.questionId}`}>{point.label} →</Link>:point.label}</span><strong>{point.users}명</strong><small className={drop>12?"bm-negative":""}>{i?`−${pct(drop)} 이탈`:"100% 시작"}</small></div><div className="admin-hbar-track"><span style={{width:`${pctOfStart}%`,background:drop>12?"var(--series-3)":"var(--brand)"}}/></div></div>;})}</div></section>
      <div className="admin-card admin-card-body"><strong>가장 큰 이탈 지점:</strong> Question 4 → 5 · 15.2% 감소. 해당 문제를 클릭해 편집 화면과 품질 지표를 확인할 수 있습니다.</div>
    </>}
    {tab==="questions" && <>
      <div className="admin-grid"><section className="admin-card"><div className="admin-card-head"><h3>문제 타입별 정답률</h3></div><div className="admin-card-body">{types.map(t=>{const rows=questions.filter(q=>q.type===t);const value=Math.round(rows.reduce((sum,q)=>sum+q.correctRate,0)/rows.length);return <div className="admin-hbar" key={t}><span className="admin-hbar-label">{t}</span><div className="admin-hbar-track"><span style={{width:`${value}%`}}/></div><span className="admin-hbar-value">{value}%</span></div>;})}</div></section><section className="admin-card"><div className="admin-card-head"><h3>품질 주의</h3></div><div className="admin-card-body">{[...questions].sort((a,b)=>b.dropRate-a.dropRate).slice(0,6).map(q=><button key={q.id} className="an-question-alert" onClick={()=>setSelectedQuestion(q)}><span>{q.code} · {q.type}</span><strong>{q.dropRate}% 이탈</strong></button>)}</div></section></div>
      <div className="admin-toolbar"><input aria-label="문제 검색" placeholder="문제 코드·내용 검색" onChange={e=>{const q=e.target.value.toLowerCase();mockAnalyticsSource.questions().then(rows=>setQuestions(rows.filter(row=>`${row.code} ${row.prompt}`.toLowerCase().includes(q))));}}/><select value={type} onChange={e=>setType(e.target.value)}><option value="all">모든 문제 타입</option>{types.map(t=><option key={t} value={t}>{t}</option>)}</select></div>
      <section className="admin-card"><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>문제</th><th>타입</th><th className="right">시도</th><th className="right">정답률</th><th className="right">Skip</th><th className="right">평균 시간</th><th className="right">이탈</th></tr></thead><tbody>{filtered.map(q=><tr key={q.id} onClick={()=>setSelectedQuestion(q)} style={{cursor:"pointer"}}><td><strong>{q.code}</strong> · {q.prompt}</td><td>{q.type}</td><td className="right">{q.attempts}</td><td className="right"><span className={`admin-pill ${q.correctRate<35?"bad":"good"}`}>{q.correctRate}%</span></td><td className="right">{q.skipRate}%</td><td className="right">{q.seconds}초</td><td className="right">{q.dropRate}%</td></tr>)}</tbody></table></div></section>
    </>}
    {tab==="retention" && <><div className="admin-grid three"><div className="admin-card admin-kpi"><div className="admin-kpi-label">D1 평균</div><div className="admin-kpi-value">54.2%</div></div><div className="admin-card admin-kpi"><div className="admin-kpi-label">D7 평균</div><div className="admin-kpi-value">35.1%</div></div><div className="admin-card admin-kpi"><div className="admin-kpi-label">D30 평균</div><div className="admin-kpi-value">22.4%</div></div></div><section className="admin-card"><div className="admin-card-head"><h3>가입 주차별 코호트</h3></div><div className="admin-card-body"><CohortTable cohorts={cohorts}/></div></section><p className="page-sub">—는 아직 해당 일차에 도달하지 않은 코호트입니다. mock 데이터이며 실제 분석은 User.createdAt와 UserStats.date로 연결합니다.</p></>}
    {selectedQuestion && <div className="admin-drawer-backdrop" onMouseDown={()=>setSelectedQuestion(null)}><aside className="admin-drawer" onMouseDown={e=>e.stopPropagation()}><button className="btn btn-ghost" onClick={()=>setSelectedQuestion(null)}>← 닫기</button><h3 style={{marginTop:18}}>{selectedQuestion.code} · 문제 분석</h3><p className="page-sub">{selectedQuestion.prompt}</p><div className="admin-detail-grid" style={{marginTop:20}}>{[["시도",selectedQuestion.attempts],["정답률",`${selectedQuestion.correctRate}%`],["오답률",`${100-selectedQuestion.correctRate-selectedQuestion.skipRate}%`],["Skip",`${selectedQuestion.skipRate}%`],["평균 풀이",`${selectedQuestion.seconds}초`],["이탈",`${selectedQuestion.dropRate}%`]].map(([label,value])=><div key={label}><small>{label}</small><strong>{value}</strong></div>)}</div><Link className="btn btn-primary" style={{marginTop:20}} href={`/content?tab=questions&question=${selectedQuestion.id}`}>문제 편집에서 보기</Link></aside></div>}
  </div>;
}
