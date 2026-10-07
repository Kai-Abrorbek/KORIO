"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/features/auth/session";
import { qs } from "@/shared/api/client";
import { useQuery } from "@/shared/api/use-query";
import { ErrorState } from "@/shared/ui/primitives";
import { QUESTION_TYPES } from "./types";
import s from "./live-content-page.module.css";

type Tab = "path" | "questions" | "quality" | "library" | "localization";
type Issue = {
  code: string;
  kind: "structural" | "signal";
  severity: "warning" | "critical";
  label: string;
  evidence: string;
};
type Location = {
  section: number | null;
  unit: number | null;
  node: { id: string; code: string | null; title: string; order: number | null; isActive: boolean } | null;
  lesson: { id: string; code: string | null; title: string; order: number | null; isActive: boolean } | null;
};
type Question = {
  id: string;
  code: string | null;
  type: string;
  level: string;
  isActive: boolean;
  preview: string;
  locations: Location[];
  issues: Issue[];
  metrics: {
    sampleSize: number;
    answeredCount: number;
    correctRate: number | null;
    skipRate: number | null;
    avgDurationMs: number | null;
    windowDays: number;
  };
  detail?: Record<string, unknown>;
};
type QuestionPage = { items: Question[]; total: number; page: number; pageSize: number };

const TABS: { key: Tab; label: string }[] = [
  { key: "path", label: "학습 경로" },
  { key: "questions", label: "문제 관리" },
  { key: "quality", label: "문제 품질" },
  { key: "library", label: "Grammar · Expressions · Hangul" },
  { key: "localization", label: "번역 상태" },
];

const DETAIL_LABELS: Record<string, string> = {
  instruction: "지시문", answer: "정답", answerI18n: "정답 번역", answerTranslation: "정답 의미",
  options: "선택지", optionsI18n: "선택지 번역", choices: "그림 선택지", blankAnswers: "빈칸 정답",
  acceptedAnswers: "허용 정답", hint: "힌트", explanation: "해설", npcText: "대화 문구",
  npcTextI18n: "대화 문구 번역", sentencePrefix: "문장 앞부분", sentenceSuffix: "문장 뒷부분",
  sentenceTemplate: "문장 템플릿", dialogLines: "대화", pairs: "매칭 쌍", grading: "채점 기준",
  buildRows: "조립 행", audioText: "음성 텍스트", audioUrl: "음성 URL", imageUrl: "이미지 URL",
  passage: "지문", passageTitle: "지문 제목", wrongWord: "오류 단어", baseWord: "기본형",
  targetForm: "목표 형태", difficulty: "난이도", tags: "태그", xpReward: "XP 보상",
};

const questionLabel = (question: Question) => question.code || `코드 누락 · ID ${question.id}`;
const nodeLabel = (location: Location) => location.node
  ? `Node ${location.node.order ?? "순서 없음"} ${location.node.title || "제목 없음"} (${location.node.code || "코드 누락"}, ID ${location.node.id})`
  : "Node 연결 누락";
const lessonLabel = (location: Location) => location.lesson
  ? `Lesson ${location.lesson.order ?? "순서 없음"} ${location.lesson.title || "제목 없음"} (${location.lesson.code || "코드 누락"}, ID ${location.lesson.id})`
  : "Lesson 연결 누락";
const fullPath = (location: Location, question: Question) =>
  `Section ${location.section ?? "확인 불가"} → Unit ${location.unit ?? "확인 불가"} → ${nodeLabel(location)} → ${lessonLabel(location)} → Question ${questionLabel(question)} (ID ${question.id})`;

const present = (value: unknown): boolean => {
  if (value === null || value === undefined || value === "") return false;
  if (Array.isArray(value)) return value.some(present);
  if (typeof value === "object") return Object.values(value).some(present);
  return true;
};
const display = (value: unknown): string => {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(item => typeof item === "string" ? item : JSON.stringify(item, null, 2)).join("\n");
  return JSON.stringify(value, null, 2);
};

function IssueBadge({ issue }: { issue: Issue }) {
  return <span className={`${s.issue} ${issue.kind === "structural" ? s.structural : s.signal}`} title={issue.evidence}>
    {issue.kind === "structural" ? "구조 점검" : "지표 후보"} · {issue.severity === "critical" ? "우선 확인" : "확인"} · {issue.label}
  </span>;
}

function LocationPath({ location, question, compact = false }: { location: Location; question: Question; compact?: boolean }) {
  return <div className={`${s.path}${compact ? ` ${s.compactPath}` : ""}`}>
    <span>Section {location.section ?? "확인 불가"}</span><b aria-hidden="true">›</b>
    <span>Unit {location.unit ?? "확인 불가"}</span><b aria-hidden="true">›</b>
    {location.node ? <span title={`Node ID ${location.node.id}`}>Node {location.node.order ?? "순서 없음"} · {location.node.title || "제목 없음"} <code>{location.node.code || "코드 누락"}</code></span> : <span className={s.noLocation}>Node 연결 누락</span>}<b aria-hidden="true">›</b>
    {location.lesson ? <span title={`Lesson ID ${location.lesson.id}`}>Lesson {location.lesson.order ?? "순서 없음"} · {location.lesson.title || "제목 없음"} <code>{location.lesson.code || "코드 누락"}</code></span> : <span className={s.noLocation}>Lesson 연결 누락</span>}<b aria-hidden="true">›</b>
    <span>Question <code>{questionLabel(question)}</code></span>
  </div>;
}

function QuestionDrawer({ id, onClose }: { id: string; onClose: () => void }) {
  const result = useQuery<Question>(`/admin/content/questions/${encodeURIComponent(id)}`);
  const [copied, setCopied] = useState("");
  const question = result.data;
  const copy = async (key: string, value: string) => {
    try { await navigator.clipboard.writeText(value); setCopied(key); }
    catch { setCopied("복사할 수 없습니다. 화면의 코드와 경로를 직접 선택해 주세요."); }
  };
  const detail = question?.detail ?? {};
  const detailEntries = Object.entries(detail).filter(([key, value]) => present(value) && key in DETAIL_LABELS);

  return <div className="admin-drawer-backdrop" onMouseDown={onClose}>
    <aside className={`admin-drawer ${s.drawer}`} role="dialog" aria-modal="true" aria-label="문제 상세" onMouseDown={event => event.stopPropagation()}>
      <button type="button" className="btn btn-ghost" onClick={onClose}>← 목록으로</button>
      {result.error ? <ErrorState code={result.error} onRetry={result.reload}/> : result.loading || !question ? <div className="skeleton" style={{ height: 300, marginTop: 20 }}/> : <>
        <div className={s.drawerHeading}>
          <div><p className={s.eyebrow}>READ ONLY · 문제 상세</p><h3>{questionLabel(question)}</h3><p>{question.preview || "미리보기 문구 없음"}</p></div>
          <span className={`admin-pill ${question.isActive ? "good" : ""}`}>{question.isActive ? "활성" : "비활성"}</span>
        </div>
        <div className={s.identity}><div><small>문제 코드</small><code>{question.code || "코드 누락"}</code></div><div><small>문제 ID</small><code>{question.id}</code></div><button type="button" onClick={() => copy("id", `code: ${question.code || "코드 누락"}\nid: ${question.id}`)}>{copied === "id" ? "복사됨" : "코드·ID 복사"}</button></div>
        <section className={s.drawerSection}><h4>학습 경로</h4>{question.locations.length ? question.locations.map((location, index) => <div className={s.locationCard} key={`${location.lesson?.id ?? "missing"}-${index}`}><LocationPath location={location} question={question}/><div className={s.pathIds}>Node ID <code>{location.node?.id ?? "연결 누락"}</code> · Lesson ID <code>{location.lesson?.id ?? "연결 누락"}</code></div><button type="button" onClick={() => copy(`path-${index}`, fullPath(location, question))}>{copied === `path-${index}` ? "경로 복사됨" : "전체 경로 복사"}</button></div>) : <p className={s.noLocation}>연결된 레슨 경로가 없습니다. 연결 상태를 확인해 주세요.</p>}</section>
        <section className={s.drawerSection}><h4>진단 근거</h4>{question.issues.length ? question.issues.map((issue, index) => <div className={s.issueDetail} key={`${issue.code}-${index}`}><IssueBadge issue={issue}/><p>{issue.evidence}</p><small>진단 코드: <code>{issue.code}</code> · {issue.kind === "structural" ? "콘텐츠 구조 검사" : "학습 지표 기반 점검 후보"}</small></div>) : <p className={s.muted}>현재 진단 규칙에서 표시할 문제가 없습니다. 모든 콘텐츠의 정답을 보증한다는 뜻은 아닙니다.</p>}</section>
        <section className={s.drawerSection}><h4>최근 {question.metrics.windowDays}일 학습 지표</h4><div className="admin-detail-grid"><div><small>시도 수</small><strong>{question.metrics.sampleSize.toLocaleString("ko-KR")}회</strong></div><div><small>답변 수</small><strong>{question.metrics.answeredCount.toLocaleString("ko-KR")}회</strong></div><div><small>정답률 · 답변 기준</small><strong>{question.metrics.correctRate === null ? "자료 없음" : `${question.metrics.correctRate.toFixed(1)}%`}</strong></div><div><small>건너뛰기율 · 시도 기준</small><strong>{question.metrics.skipRate === null ? "자료 없음" : `${question.metrics.skipRate.toFixed(1)}%`}</strong></div><div><small>평균 풀이 시간</small><strong>{question.metrics.avgDurationMs === null ? "자료 없음" : `${Math.round(question.metrics.avgDurationMs / 1000)}초`}</strong></div></div><p className={s.muted}>비건너뛰기 답변 20회 미만은 낮은 정답률만으로 문제 후보로 판정하지 않습니다. 데이터가 없다는 사실은 정상이라는 증거가 아닙니다.</p></section>
        <section className={s.drawerSection}><h4>문제 구성 확인</h4><p className={s.muted}>원본 콘텐츠를 읽기 전용으로 보여줍니다. 수정은 앱·DB의 별도 작업에서 진행해 주세요.</p><div className={s.detailList}><div><small>유형</small><pre>{question.type}</pre></div><div><small>레벨</small><pre>{question.level}</pre></div>{detailEntries.map(([key, value]) => <div key={key}><small>{DETAIL_LABELS[key]}</small><pre>{display(value)}</pre></div>)}</div></section>
        {copied && !["id", ...question.locations.map((_, index) => `path-${index}`)].includes(copied) && <p role="status" className={s.copyError}>{copied}</p>}
      </>}
    </aside>
  </div>;
}

export function LiveContentPage() {
  const router = useRouter();
  const params = useSearchParams();
  const requested = params.get("tab");
  const tab: Tab = TABS.some(item => item.key === requested) ? requested as Tab : "questions";
  const { can } = useSession();
  const permitted = can("content:read");
  const [searchDraft, setSearchDraft] = useState("");
  const [search, setSearch] = useState("");
  const [section, setSection] = useState("");
  const [unit, setUnit] = useState("");
  const [type, setType] = useState("");
  const [active, setActive] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const listTab = tab === "questions" || tab === "quality";
  const path = permitted && listTab ? `/admin/content/questions${qs({ page, pageSize: 20, search, section, unit, type, active, onlyIssues: tab === "quality" ? "true" : "" })}` : null;
  const result = useQuery<QuestionPage>(path);
  const data = result.data;
  const pageCount = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;
  const changeTab = (next: Tab) => { setPage(1); setSelectedId(null); router.push(next === "questions" ? "/content" : `/content?tab=${next}`, { scroll: false }); };

  if (!permitted) return <div className="admin-card admin-empty">콘텐츠 조회 권한이 없습니다.</div>;
  return <div className={`admin-page ${s.page}`}>
    <div className="admin-page-head"><div><h2>Content Diagnostics</h2><p>콘텐츠를 변경하지 않고 문제의 위치와 점검 근거를 찾습니다.</p></div><span className="admin-pill blue">실데이터 · 읽기 전용</span></div>
    <nav className="admin-tabs" aria-label="콘텐츠 관리 탭">{TABS.map(item => <button type="button" key={item.key} className={tab === item.key ? "is-active" : ""} onClick={() => changeTab(item.key)}>{item.label}</button>)}</nav>
    {!listTab ? <section className="admin-card admin-empty"><h3>{TABS.find(item => item.key === tab)?.label}</h3><p>이 탭의 운영 조회 API는 아직 연결되지 않았습니다. 문제 관리와 문제 품질 탭에서 실제 문제 위치와 진단 근거를 확인할 수 있습니다.</p></section> : <>
      <section className={s.summary}><div><span>{tab === "quality" ? "점검할 문제 후보" : "문제 탐색"}</span><strong>{data ? data.total.toLocaleString("ko-KR") : result.loading ? "…" : "—"}</strong><p>{tab === "quality" ? "현재 검색 조건에 해당하는 서버 전체 문제 후보 수" : "현재 검색 조건에 해당하는 서버 전체 문제 수"}</p></div><p>{tab === "quality" ? "구조 검사와 최근 30일의 비건너뛰기 답변 20회 이상에서 나온 저정답률 후보를 표시합니다. 후보는 오류 확정이 아니며 직접 확인이 필요합니다." : "문제 코드나 ID를 검색하고 학습 경로를 확인하세요. 이 화면에는 저장·삭제·순서 변경 기능이 없습니다."}</p></section>
      <form className={`admin-toolbar ${s.filters}`} onSubmit={event => { event.preventDefault(); setSearch(searchDraft.trim()); setPage(1); }}>
        <label><span>문제 코드·ID</span><input value={searchDraft} onChange={event => setSearchDraft(event.target.value)} placeholder="코드 또는 ID"/></label>
        <label><span>Section</span><input type="number" min="1" step="1" value={section} onChange={event => { setSection(event.target.value); setPage(1); }} placeholder="전체"/></label>
        <label><span>Unit</span><input type="number" min="1" step="1" value={unit} onChange={event => { setUnit(event.target.value); setPage(1); }} placeholder="전체"/></label>
        <label><span>문제 유형</span><select value={type} onChange={event => { setType(event.target.value); setPage(1); }}><option value="">전체 유형</option>{QUESTION_TYPES.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
        <label><span>상태</span><select value={active} onChange={event => { setActive(event.target.value); setPage(1); }}><option value="all">전체</option><option value="true">활성</option><option value="false">비활성</option></select></label>
        <button type="submit">검색</button><button type="button" onClick={result.reload}>새로고침</button>
      </form>
      <section className="admin-card"><div className="admin-card-head"><div><h3>{tab === "quality" ? "문제 후보 목록" : "전체 문제 목록"}</h3><p className={s.headNote}>{tab === "quality" ? "서버 전체에서 진단 후 필터링 · 후보만 표시" : "문제별 경로와 현재 진단 상태"}</p></div><span className="admin-pill blue">{data ? `${data.total.toLocaleString("ko-KR")}개` : "조회 중"}</span></div>
        {result.error ? <ErrorState code={result.error} onRetry={result.reload}/> : result.loading || !data ? <div className="skeleton" style={{ height: 360 }}/> : data.items.length ? <div className={s.list}>{data.items.map(question => <article className={s.row} key={question.id}>
          <div className={s.rowMain}><div className={s.rowTop}><button type="button" className={s.codeButton} onClick={() => setSelectedId(question.id)}>{questionLabel(question)}</button><span className="admin-pill">{question.type}</span><span className={`admin-pill ${question.isActive ? "good" : ""}`}>{question.isActive ? "활성" : "비활성"}</span></div><p className={s.preview}>{question.preview || "미리보기 문구 없음"}</p><code className={s.questionId}>ID {question.id}</code></div>
          <div className={s.rowPaths}>{question.locations.length ? question.locations.map((location, index) => <LocationPath key={`${location.lesson?.id ?? "missing"}-${index}`} location={location} question={question} compact/>) : <span className={s.noLocation}>연결된 레슨 경로 없음</span>}</div>
          <div className={s.rowFoot}><div className={s.issueList}>{question.issues.length ? question.issues.map((issue, index) => <IssueBadge key={`${issue.code}-${index}`} issue={issue}/>) : <span className={s.noIssue}>현재 진단 규칙에서 발견된 문제 없음</span>}</div><span className={s.sample}>최근 {question.metrics.windowDays}일 · 시도 {question.metrics.sampleSize.toLocaleString("ko-KR")}회</span><button type="button" className={s.detailButton} onClick={() => setSelectedId(question.id)}>상세 보기 →</button></div>
        </article>)}</div> : <div className="admin-empty">{tab === "quality" ? "현재 조건에서 표시할 문제 후보가 없습니다. 모든 콘텐츠가 정상이라는 보증은 아닙니다." : "검색 조건에 맞는 문제가 없습니다."}</div>}
        {data && <div className="admin-pagination"><span>{data.total.toLocaleString("ko-KR")}개 중 {data.total ? `${(page - 1) * data.pageSize + 1}–${Math.min(page * data.pageSize, data.total)}` : "0"}개 · {page}/{pageCount}페이지</span><div><button type="button" disabled={page <= 1} onClick={() => setPage(value => value - 1)}>이전</button><button type="button" disabled={page >= pageCount} onClick={() => setPage(value => value + 1)}>다음</button></div></div>}
      </section>
      <p className={s.disclaimer}>진단은 구조적 연결·필수값 검사와 제한된 학습 지표를 근거로 합니다. 내용의 의미, 번역의 정확성, 정답의 적절성은 자동으로 확정할 수 없습니다. 실제 수정은 이 어드민 밖에서 진행합니다.</p>
    </>}
    {selectedId && <QuestionDrawer key={selectedId} id={selectedId} onClose={() => setSelectedId(null)}/>}
  </div>;
}
