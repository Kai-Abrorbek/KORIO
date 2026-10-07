"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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
type PathIssue = { code: string; severity: "warning" | "critical"; label: string; evidence: string };
type PathLesson = {
  id: string; code: string | null; title: string; order: number | null; category: string;
  level: string; isActive: boolean; questionCount: number; declaredQuestionCount: number;
  issues: PathIssue[]; nodeId?: string;
};
type PathNode = {
  id: string; code: string | null; title: string; order: number | null; nodeType: string;
  category: string; isActive: boolean; lessonCount: number; issues: PathIssue[]; lessons: PathLesson[];
};
type PathUnit = {
  section: number; unit: number; nodeCount: number; lessonCount: number;
  activeNodeCount: number; activeLessonCount: number;
  tracks: { category: string; nodeCount: number; lessonCount: number }[];
};
type PathOverview = {
  sections: { section: number; unitCount: number; nodeCount: number; lessonCount: number; units: PathUnit[] }[];
  totals: { sections: number; units: number; nodes: number; lessons: number };
};
type PathUnitDetail = {
  section: number; unit: number; items: PathNode[]; total: number; page: number; pageSize: number;
  orphanLessons: PathLesson[]; orphanTotal: number; orphanPage: number; orphanPageSize: number;
};
type LibraryKind = "grammar" | "expression" | "hangul";
type LibrarySource = "database" | "static";
type LibraryItem = {
  kind: LibraryKind;
  id: string;
  code: string | null;
  title: string;
  subtitle: string;
  section: number | null;
  unit: number | null;
  placements: { section: number; unit: number; order: number; isCore: boolean }[];
  isActive: boolean;
  source: LibrarySource;
  translationCoverage: { ko: boolean; uz: boolean; en: boolean; ru: boolean } | null;
  coverageField: "summary" | "meaning" | null;
  links: { pack: { id: string; code: string | null; title: string } | null; node: { id: string; code: string | null; title: string } | null; practiceQuestionCount: number } | null;
};
type LibraryPage = { kind: LibraryKind; source: LibrarySource; items: LibraryItem[]; total: number; page: number; pageSize: number };
type LibraryDetail = LibraryItem & { content: Record<string, unknown> };
type LocalizationEntity = "all" | "node" | "lesson" | "question" | "grammar" | "expressionPack" | "expressionNode" | "expression";
type LocalizationLanguage = "all" | "uz" | "en" | "ru";
type LocalizationStatus = "missing" | "complete" | "all";
type LocalizationLocation = {
  section: number | null;
  unit: number | null;
  node: { id: string; code: string | null; title: string; order: number | null } | null;
  lesson: { id: string; code: string | null; title: string; order: number | null } | null;
  question: { id: string; code: string | null } | null;
};
type LocalizationItem = {
  id: string;
  entity: Exclude<LocalizationEntity, "all">;
  code: string | null;
  label: string;
  active: boolean;
  location: LocalizationLocation | null;
  locations: LocalizationLocation[];
  missing: { field: string; language: Exclude<LocalizationLanguage, "all">; reason: string }[];
  missingCount: number;
  checkedFieldCount: number;
  status: "missing" | "complete";
};
type LocalizationPage = { items: LocalizationItem[]; total: number; page: number; pageSize: number };

const TRACK_LABELS: Record<string, string> = {
  vocabulary: "어휘", grammar: "문법", expression: "표현", conversation: "회화", listening: "듣기", topik: "TOPIK",
};
const trackLabel = (category: string) => TRACK_LABELS[category] || category || "트랙 미지정";
const positivePage = (value: string | null) => {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
};

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

function PathIssues({ issues }: { issues: PathIssue[] }) {
  if (!issues.length) return null;
  return <div className={s.pathIssues}>{issues.map((issue, index) => <div className={s.pathIssue} key={`${issue.code}-${index}`}>
    <span className={`${s.issue} ${s.structural}`}>구조 점검 · {issue.severity === "critical" ? "우선 확인" : "확인"} · {issue.label}</span>
    <p>{issue.evidence}</p>
  </div>)}</div>;
}

function PathLessonRow({ lesson, orphan = false }: { lesson: PathLesson; orphan?: boolean }) {
  return <article className={s.lessonRow}>
    <div className={s.lessonNumber}>L{lesson.order ?? "?"}</div>
    <div className={s.lessonBody}>
      <div className={s.lessonHeading}><strong>{lesson.title || "제목 없음"}</strong><span className={`admin-pill ${lesson.isActive ? "good" : ""}`}>{lesson.isActive ? "활성" : "비활성"}</span></div>
      <div className={s.pathMeta}><span>{trackLabel(lesson.category)}</span><span>{lesson.level || "레벨 미지정"}</span><span>문제 {lesson.questionCount.toLocaleString("ko-KR")}개</span>{lesson.declaredQuestionCount !== lesson.questionCount && <span>참조 {lesson.declaredQuestionCount.toLocaleString("ko-KR")}개</span>}</div>
      <div className={s.pathIdentity}><code>{lesson.code || "코드 누락"}</code><code>ID {lesson.id}</code>{orphan && <code>Node ID {lesson.nodeId || "확인 불가"}</code>}</div>
      <PathIssues issues={lesson.issues}/>
    </div>
    <Link className={s.lessonLink} href={`/content?tab=questions&lessonId=${encodeURIComponent(lesson.id)}`}>연결된 문제 보기 →</Link>
  </article>;
}

function PathPager({ current, total, pageSize, onChange }: { current: number; total: number; pageSize: number; onChange: (page: number) => void }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return <div className="admin-pagination"><span>{total.toLocaleString("ko-KR")}개 · {current}/{pages}페이지</span><div><button type="button" disabled={current <= 1} onClick={() => onChange(current - 1)}>이전</button><button type="button" disabled={current >= pages} onClick={() => onChange(current + 1)}>다음</button></div></div>;
}

function StudyPath() {
  const router = useRouter();
  const params = useSearchParams();
  const overview = useQuery<PathOverview>("/admin/content/path", { refreshMs: 120_000 });
  const allUnits = overview.data?.sections.flatMap(section => section.units) ?? [];
  const selected = allUnits.find(unit => String(unit.section) === params.get("section") && String(unit.unit) === params.get("unit")) ?? allUnits[0];
  const nodePage = positivePage(params.get("pathPage"));
  const orphanPage = positivePage(params.get("orphanPage"));
  const detail = useQuery<PathUnitDetail>(selected ? `/admin/content/path/units${qs({ section: selected.section, unit: selected.unit, page: nodePage, pageSize: 20, orphanPage })}` : null, { refreshMs: 120_000 });
  const navigate = (section: number, unit: number, pathPage = 1, nextOrphanPage = 1) => {
    const query = new URLSearchParams({ tab: "path", section: String(section), unit: String(unit) });
    if (pathPage > 1) query.set("pathPage", String(pathPage));
    if (nextOrphanPage > 1) query.set("orphanPage", String(nextOrphanPage));
    router.push(`/content?${query.toString()}`, { scroll: false });
  };

  return <div className={s.pathExplorer}>
    <section className={s.summary}><div><span>학습 경로</span><strong>{overview.data ? overview.data.totals.sections.toLocaleString("ko-KR") : overview.loading ? "…" : "—"}</strong><p>Section · 실제 DB 기준</p></div><p>Section → Unit → 트랙 → Node → Lesson 순서로 콘텐츠 연결을 확인합니다. 문제 수는 존재하는 문제 문서 기준이며, 이 화면에서는 저장하거나 순서를 변경할 수 없습니다.</p></section>
    {overview.error ? <ErrorState code={overview.error} onRetry={overview.reload}/> : overview.loading || !overview.data ? <div className="skeleton" style={{ height: 420 }}/> : !allUnits.length ? <section className="admin-card admin-empty">조회된 학습 경로가 없습니다. DB에 Node 또는 Lesson 데이터가 있는지 확인해 주세요.</section> : <>
      <div className={s.pathStats}>
        <div><small>Unit</small><strong>{overview.data.totals.units.toLocaleString("ko-KR")}</strong></div>
        <div><small>Node</small><strong>{overview.data.totals.nodes.toLocaleString("ko-KR")}</strong></div>
        <div><small>Lesson</small><strong>{overview.data.totals.lessons.toLocaleString("ko-KR")}</strong></div>
      </div>
      <div className={s.pathLayout}>
        <aside className={`admin-card ${s.unitSidebar}`} aria-label="Section 및 Unit 탐색">
          <div className="admin-card-head"><div><h3>학습 구조</h3><p className={s.headNote}>Section을 펼쳐 Unit을 선택하세요</p></div><button type="button" className={s.refreshButton} onClick={overview.reload}>새로고침</button></div>
          <div className={s.sectionList}>{overview.data.sections.map(section => <details key={section.section} open={section.section === selected?.section}>
            <summary><span>Section {section.section}</span><small>{section.unitCount} Unit · {section.nodeCount} Node · {section.lessonCount} Lesson</small></summary>
            <div className={s.unitList}>{section.units.map(unit => <button key={`${unit.section}-${unit.unit}`} type="button" className={`${s.unitButton} ${selected?.section === unit.section && selected?.unit === unit.unit ? s.selectedUnit : ""}`} onClick={() => navigate(unit.section, unit.unit)} aria-current={selected?.section === unit.section && selected?.unit === unit.unit ? "true" : undefined}>
              <span><strong>Unit {unit.unit}</strong><small>{unit.nodeCount} Node · {unit.lessonCount} Lesson</small></span>
              <span className={s.trackTags}>{unit.tracks.map(track => <em key={track.category} title={`${track.nodeCount} Node · ${track.lessonCount} Lesson`}>{trackLabel(track.category)}</em>)}</span>
            </button>)}</div>
          </details>)}</div>
        </aside>
        <section className={`admin-card ${s.unitDetail}`}>
          <div className="admin-card-head"><div><p className={s.eyebrow}>READ ONLY · 학습 경로</p><h3>Section {selected?.section} · Unit {selected?.unit}</h3><p className={s.headNote}>트랙별 연결 상태 · Node {selected?.nodeCount ?? 0}개(활성 {selected?.activeNodeCount ?? 0}) · Lesson {selected?.lessonCount ?? 0}개(활성 {selected?.activeLessonCount ?? 0})</p></div><span className="admin-pill blue">실데이터</span></div>
          <div className={s.unitTrackSummary}>{selected?.tracks.map(track => <div key={track.category}><strong>{trackLabel(track.category)}</strong><span>{track.nodeCount} Node · {track.lessonCount} Lesson</span></div>)}</div>
          {detail.error ? <ErrorState code={detail.error} onRetry={detail.reload}/> : detail.loading || !detail.data ? <div className="skeleton" style={{ height: 440, margin: 18 }}/> : <>
            <div className={s.unitContentHead}><h4>Node → Lesson</h4><span>현재 페이지의 노드 · {detail.data.total.toLocaleString("ko-KR")}개 전체</span></div>
            {detail.data.items.length ? <div className={s.nodeGroups}>{Array.from(new Set(detail.data.items.map(node => node.category))).map(category => <section key={category} className={s.trackGroup}>
              <h5>{trackLabel(category)} 트랙</h5>
              {detail.data!.items.filter(node => node.category === category).map(node => <article key={node.id} className={s.nodeCard}>
                <div className={s.nodeHeading}><div className={s.nodeOrdinal}>{node.order ?? "?"}</div><div className={s.nodeTitle}><div><strong>{node.title || "제목 없음"}</strong><span className={`admin-pill ${node.isActive ? "good" : ""}`}>{node.isActive ? "활성" : "비활성"}</span></div><p>{node.nodeType || "유형 미지정"} · Lesson {node.lessonCount.toLocaleString("ko-KR")}개</p></div></div>
                <div className={s.pathIdentity}><code>{node.code || "코드 누락"}</code><code>ID {node.id}</code></div>
                <PathIssues issues={node.issues}/>
                <div className={s.nodeLessons}>{node.lessons.length ? node.lessons.map(lesson => <PathLessonRow key={lesson.id} lesson={lesson}/>) : <p className={s.emptyLessons}>연결된 레슨 없음</p>}</div>
              </article>)}
            </section>)}</div> : <div className="admin-empty">이 Unit에 등록된 Node가 없습니다.{detail.data.orphanTotal ? " 아래의 Node 문서가 없는 Lesson을 확인해 주세요." : ""}</div>}
            <PathPager current={detail.data.page} total={detail.data.total} pageSize={detail.data.pageSize} onChange={next => navigate(selected!.section, selected!.unit, next, orphanPage)}/>
            <div className={s.orphanSection}><div className={s.unitContentHead}><h4>Node 문서가 없는 Lesson</h4><span>{detail.data.orphanTotal.toLocaleString("ko-KR")}개</span></div>
              {detail.data.orphanLessons.length ? <div className={s.orphanList}>{detail.data.orphanLessons.map(lesson => <PathLessonRow key={lesson.id} lesson={lesson} orphan/>)}</div> : <p className={s.emptyLessons}>이 Unit에서 Node 문서가 없는 Lesson은 발견되지 않았습니다. 다른 구조·콘텐츠 문제가 없다는 보증은 아닙니다.</p>}
              {detail.data.orphanTotal > detail.data.orphanPageSize && <PathPager current={detail.data.orphanPage} total={detail.data.orphanTotal} pageSize={detail.data.orphanPageSize} onChange={next => navigate(selected!.section, selected!.unit, nodePage, next)}/>}
            </div>
          </>}
        </section>
      </div>
      <p className={s.disclaimer}>구조 진단은 문서 참조와 필수값을 확인하는 용도입니다. 비활성 상태 자체를 오류로 취급하지 않으며, 콘텐츠의 교육적 적절성은 별도로 검토해야 합니다.</p>
    </>}
  </div>;
}

const LIBRARY_KINDS: { value: LibraryKind; label: string }[] = [
  { value: "grammar", label: "Grammar" },
  { value: "expression", label: "Expressions" },
  { value: "hangul", label: "Hangul" },
];

const coverageLabel = (kind: LibraryKind) => kind === "grammar" ? "요약 번역" : "의미 번역";

function LibraryDrawer({ kind, id, onClose }: { kind: LibraryKind; id: string; onClose: () => void }) {
  const result = useQuery<LibraryDetail>(`/admin/content/library/${kind}/${encodeURIComponent(id)}`);
  const item = result.data;
  return <div className="admin-drawer-backdrop" onMouseDown={onClose}>
    <aside className={`admin-drawer ${s.drawer}`} role="dialog" aria-modal="true" aria-label="콘텐츠 상세" onMouseDown={event => event.stopPropagation()}>
      <button type="button" className="btn btn-ghost" onClick={onClose}>← 목록으로</button>
      {result.error ? <ErrorState code={result.error} onRetry={result.reload}/> : result.loading || !item ? <div className="skeleton" style={{ height: 300, marginTop: 20 }}/> : <>
        <div className={s.drawerHeading}><div><p className={s.eyebrow}>READ ONLY · {LIBRARY_KINDS.find(entry => entry.value === kind)?.label}</p><h3>{item.title || item.code || item.id}</h3><p>{item.subtitle || "설명 없음"}</p></div><span className={`admin-pill ${item.isActive ? "good" : ""}`}>{item.isActive ? "활성" : "비활성"}</span></div>
        <div className={s.identity}><div><small>콘텐츠 코드</small><code>{item.code || "코드 없음"}</code></div><div><small>ID</small><code>{item.id}</code></div><div><small>출처</small><span>{item.source === "static" ? "서버 고정 ID 목록" : "DB"}</span></div></div>
        {item.translationCoverage && <section className={s.drawerSection}><h4>{coverageLabel(kind)} 확인</h4><p className={s.muted}>아래 표시는 {item.coverageField === "summary" ? "요약" : "의미"} 필드만 검사합니다. 다른 문장·예시·설명의 번역 완료 여부를 뜻하지 않습니다.</p><div className={s.coverage}>{(["ko", "uz", "en", "ru"] as const).map(language => <span key={language} className={item.translationCoverage?.[language] ? s.covered : s.uncovered}>{language.toUpperCase()} · {item.translationCoverage?.[language] ? "있음" : "없음"}</span>)}</div></section>}
        <section className={s.drawerSection}><h4>위치와 연결</h4>{item.placements.length ? <div className={s.placementList}>{item.placements.map((placement, index) => <div className={s.placement} key={`${placement.section}-${placement.unit}-${placement.order}-${index}`}><span>Section {placement.section} → Unit {placement.unit} · 순서 {placement.order}{placement.isCore ? " · 핵심" : ""}</span></div>)}</div> : item.section !== null && item.unit !== null ? <div className={s.placement}><span>Section {item.section} → Unit {item.unit}</span></div> : <p className={s.muted}>Section·Unit 위치가 제공되지 않았습니다.{kind === "hangul" ? " 한글 ID는 모바일 정적 화면에서 표시됩니다." : ""}</p>}
          {item.links && <div className={s.linkMeta}><span>Pack: {item.links.pack?.title || "연결 없음"} <code>{item.links.pack?.code || item.links.pack?.id || ""}</code></span><span>Node: {item.links.node?.title || "연결 없음"} <code>{item.links.node?.code || item.links.node?.id || ""}</code></span><span>연습 문제 참조 {item.links.practiceQuestionCount.toLocaleString("ko-KR")}개</span></div>}
        </section>
        <section className={s.drawerSection}><h4>원본 필드 · 읽기 전용</h4><p className={s.muted}>서버가 공개한 콘텐츠 필드만 표시합니다. 수정은 별도 콘텐츠 작업에서 진행해 주세요.</p><div className={s.detailList}>{Object.entries(item.content || {}).map(([key, value]) => <div key={key}><small>{key}</small><pre>{display(value)}</pre></div>)}</div></section>
      </>}
    </aside>
  </div>;
}

function ContentLibrary() {
  const [kind, setKind] = useState<LibraryKind>("grammar");
  const [searchDraft, setSearchDraft] = useState("");
  const [search, setSearch] = useState("");
  const [section, setSection] = useState("");
  const [unit, setUnit] = useState("");
  const [active, setActive] = useState("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<{ kind: LibraryKind; id: string } | null>(null);
  const result = useQuery<LibraryPage>(`/admin/content/library${qs({ kind, page, pageSize: 20, search, section: kind === "hangul" ? "" : section, unit: kind === "hangul" ? "" : unit, active: kind === "hangul" ? "all" : active })}`);
  const data = result.data;
  const selectKind = (value: LibraryKind) => { setKind(value); setPage(1); setSelected(null); setSearchDraft(""); setSearch(""); setSection(""); setUnit(""); setActive("all"); };

  return <div className={s.pathExplorer}>
    <section className={s.summary}><div><span>콘텐츠 라이브러리</span><strong>{data ? data.total.toLocaleString("ko-KR") : result.loading ? "…" : "—"}</strong><p>현재 유형·검색 조건의 전체 항목 수</p></div><p>Grammar와 Expressions는 실제 DB에서 읽습니다. Hangul은 서버가 검증에 사용하는 고정 ID 40개만 제공하며 글자·이름·예시의 원본은 모바일 정적 콘텐츠입니다. 이 화면에서 수정하지 않습니다.</p></section>
    <div className={s.kindTabs} role="group" aria-label="콘텐츠 유형">{LIBRARY_KINDS.map(entry => <button type="button" key={entry.value} className={kind === entry.value ? s.kindSelected : ""} onClick={() => selectKind(entry.value)} aria-pressed={kind === entry.value}>{entry.label}</button>)}</div>
    <form className={`admin-toolbar ${s.filters}`} onSubmit={event => { event.preventDefault(); setSearch(searchDraft.trim()); setPage(1); }}>
      <label><span>코드·내용 검색</span><input value={searchDraft} onChange={event => setSearchDraft(event.target.value)} placeholder={kind === "hangul" ? "한글 ID" : "코드 또는 내용"}/></label>
      {kind !== "hangul" && <><label><span>Section</span><input type="number" min="1" step="1" value={section} onChange={event => { setSection(event.target.value); setPage(1); }} placeholder="전체"/></label><label><span>Unit</span><input type="number" min="1" step="1" value={unit} onChange={event => { setUnit(event.target.value); setPage(1); }} placeholder="전체"/></label><label><span>상태</span><select value={active} onChange={event => { setActive(event.target.value); setPage(1); }}><option value="all">전체</option><option value="true">활성</option><option value="false">비활성</option></select></label></>}
      <button type="submit">검색</button><button type="button" onClick={result.reload}>새로고침</button>
    </form>
    <section className="admin-card"><div className="admin-card-head"><div><h3>{LIBRARY_KINDS.find(entry => entry.value === kind)?.label} 목록</h3><p className={s.headNote}>{kind === "hangul" ? "서버 고정 ID · DB 문서 아님 · 표시 텍스트는 모바일 정적 콘텐츠" : `${coverageLabel(kind)}만 언어별 존재 여부 표시`}</p></div><span className="admin-pill blue">{data ? `${data.total.toLocaleString("ko-KR")}개` : "조회 중"}</span></div>
      {result.error ? <ErrorState code={result.error} onRetry={result.reload}/> : result.loading || !data ? <div className="skeleton" style={{ height: 360 }}/> : data.items.length ? <div className={s.libraryList}>{data.items.map(item => <article className={s.libraryRow} key={item.id}>
        <div className={s.libraryMain}><button type="button" className={s.codeButton} onClick={() => setSelected({ kind: item.kind, id: item.id })}>{item.title || item.code || item.id}</button><p>{item.subtitle || (kind === "hangul" ? "표시 정보는 모바일 정적 콘텐츠에서 관리" : "설명 없음")}</p><div className={s.pathIdentity}><code>{item.code || "코드 없음"}</code><code>ID {item.id}</code><span className={`admin-pill ${item.isActive ? "good" : ""}`}>{item.isActive ? "활성" : "비활성"}</span></div></div>
        <div className={s.librarySide}>{item.placements.length ? <div className={s.libraryPlacements}>{item.placements.map((placement, index) => <span key={`${placement.section}-${placement.unit}-${placement.order}-${index}`}>S{placement.section} · U{placement.unit} · #{placement.order}</span>)}</div> : item.section !== null && item.unit !== null ? <span>Section {item.section} · Unit {item.unit}</span> : <span>경로 위치 없음</span>}{item.translationCoverage && <div className={s.coverage}>{(["ko", "uz", "en", "ru"] as const).map(language => <span key={language} className={item.translationCoverage?.[language] ? s.covered : s.uncovered}>{language.toUpperCase()}</span>)}</div>}</div>
        <button type="button" className={s.detailButton} onClick={() => setSelected({ kind: item.kind, id: item.id })}>상세 보기 →</button>
      </article>)}</div> : <div className="admin-empty">현재 조건에 맞는 콘텐츠가 없습니다.{kind === "hangul" ? " 한글 ID는 서버의 고정 목록에서 제공됩니다." : " DB 또는 검색 조건을 확인해 주세요."}</div>}
      {data && <PathPager current={data.page} total={data.total} pageSize={data.pageSize} onChange={setPage}/>}
    </section>
    <p className={s.disclaimer}>번역 배지는 {kind === "grammar" ? "Grammar 요약" : kind === "expression" ? "Expression 의미" : "한글에 적용되지 않는"} 필드 기준입니다. 다른 주요 번역 필드의 누락은 ‘번역 상태’ 탭에서 확인해 주세요.</p>
    {selected && <LibraryDrawer key={`${selected.kind}-${selected.id}`} kind={selected.kind} id={selected.id} onClose={() => setSelected(null)}/>}
  </div>;
}

const LOCALIZATION_ENTITIES: { value: LocalizationEntity; label: string }[] = [
  { value: "all", label: "전체 콘텐츠" }, { value: "node", label: "Node" },
  { value: "lesson", label: "Lesson" }, { value: "question", label: "Question" },
  { value: "grammar", label: "Grammar" }, { value: "expressionPack", label: "Expression Pack" },
  { value: "expressionNode", label: "Expression Node" }, { value: "expression", label: "Expression" },
];
const localizationEntityLabel = (entity: LocalizationItem["entity"]) => LOCALIZATION_ENTITIES.find(item => item.value === entity)?.label || entity;

function LocalizationPath({ location, entity }: { location: LocalizationLocation; entity: LocalizationItem["entity"] }) {
  return <div className={s.localPath}>
    {location.section !== null && <span>Section {location.section}</span>}
    {location.unit !== null && <span>Unit {location.unit}</span>}
    {location.node && <span>Node {location.node.order ?? "?"} · {location.node.title || location.node.code || location.node.id}</span>}
    {location.lesson && <span>Lesson {location.lesson.order ?? "?"} · {location.lesson.title || location.lesson.code || location.lesson.id}</span>}
    {location.question && <span>Question {location.question.code || location.question.id}</span>}
    {(entity === "node" || entity === "lesson" || entity === "question") && location.section !== null && location.unit !== null && <Link href={`/content?tab=path&section=${location.section}&unit=${location.unit}`}>학습 경로 Unit 보기 →</Link>}
    {location.lesson && <Link href={`/content?tab=questions&lessonId=${encodeURIComponent(location.lesson.id)}`}>레슨 문제 보기 →</Link>}
  </div>;
}

function LocalizationDrawer({ item, onClose }: { item: LocalizationItem; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const paths = item.locations?.length ? item.locations : item.location ? [item.location] : [];
  const copy = async () => {
    try { await navigator.clipboard.writeText(`${localizationEntityLabel(item.entity)}\ncode: ${item.code || "없음"}\nid: ${item.id}\n${item.missing.map(gap => `${gap.field} · ${gap.language}: ${gap.reason}`).join("\n")}`); setCopied(true); }
    catch { setCopied(false); }
  };
  return <div className="admin-drawer-backdrop" onMouseDown={onClose}>
    <aside className={`admin-drawer ${s.drawer}`} role="dialog" aria-modal="true" aria-label="번역 상태 상세" onMouseDown={event => event.stopPropagation()}>
      <button type="button" className="btn btn-ghost" onClick={onClose}>← 목록으로</button>
      <div className={s.drawerHeading}><div><p className={s.eyebrow}>READ ONLY · 번역 상태 · {localizationEntityLabel(item.entity)}</p><h3>{item.label || item.code || item.id}</h3><p>{item.status === "missing" ? "선택 범위에서 누락된 필드를 확인하세요." : "선택 범위의 검사 필드에 누락이 없습니다."}</p></div><span className={`admin-pill ${item.active ? "good" : ""}`}>{item.active ? "활성" : "비활성"}</span></div>
      <div className={s.identity}><div><small>코드</small><code>{item.code || "코드 없음"}</code></div><div><small>ID</small><code>{item.id}</code></div><div><small>검사한 필드</small><span>{item.checkedFieldCount.toLocaleString("ko-KR")}개</span></div><button type="button" onClick={copy}>{copied ? "근거 복사됨" : "코드·근거 복사"}</button></div>
      <section className={s.drawerSection}><h4>누락 근거 · {item.missingCount.toLocaleString("ko-KR")}건</h4>{item.missing.length ? <div className={s.gapList}>{item.missing.map((gap, index) => <div className={s.gapCard} key={`${gap.field}-${gap.language}-${index}`}><span className={s.gapLanguage}>{gap.language.toUpperCase()}</span><div><strong>{gap.field}</strong><p>{gap.reason}</p></div></div>)}</div> : <p className={s.muted}>선택한 언어의 검사 필드에서 누락이 발견되지 않았습니다. 번역의 의미나 정확성을 보증하지는 않습니다.</p>}</section>
      <section className={s.drawerSection}><h4>콘텐츠 위치</h4>{paths.length ? <div className={s.placementList}>{paths.map((path, index) => <LocalizationPath key={`${path.lesson?.id || path.node?.id || index}-${index}`} location={path} entity={item.entity}/>)}</div> : <p className={s.muted}>이 항목에는 Section·Unit 학습 경로 연결이 없습니다. 위 코드와 ID로 원본 콘텐츠를 찾으세요.</p>}</section>
      <p className={s.disclaimer}>누락은 서버의 주요 번역 필드 검사 규칙을 뜻합니다. 중첩된 예문·선택지 등은 포함되지 않으며, 의도적인 공란·대체 언어·번역 품질은 직접 검토해 주세요. 이 화면에서는 수정할 수 없습니다.</p>
    </aside>
  </div>;
}

function LocalizationAudit() {
  const [entity, setEntity] = useState<LocalizationEntity>("all");
  const [language, setLanguage] = useState<LocalizationLanguage>("all");
  const [status, setStatus] = useState<LocalizationStatus>("missing");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<LocalizationItem | null>(null);
  const result = useQuery<LocalizationPage>(`/admin/content/localization${qs({ page, pageSize: 20, entity, language, status })}`, { refreshMs: 120_000 });
  const data = result.data;
  const scope = language === "all" ? "UZ · EN · RU" : language.toUpperCase();

  return <div className={s.pathExplorer}>
    <section className={s.summary}><div><span>{status === "missing" ? "번역 누락 항목" : status === "complete" ? "검사 완료 항목" : "검사 대상 항목"}</span><strong>{data ? data.total.toLocaleString("ko-KR") : result.loading ? "…" : "—"}</strong><p>현재 필터에 맞는 서버 전체 콘텐츠 문서 수</p></div><p>선택한 언어({scope})의 주요 번역 필드 누락을 확인합니다. 이 숫자는 현재 상태 필터에 맞는 문서 수이며 누락 필드의 합계가 아닙니다. 공란이 의도적인지와 번역의 정확성은 별도로 판단해야 합니다.</p></section>
    <div className={`admin-toolbar ${s.filters}`}>
      <label><span>콘텐츠 유형</span><select value={entity} onChange={event => { setEntity(event.target.value as LocalizationEntity); setPage(1); }}>{LOCALIZATION_ENTITIES.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
      <label><span>언어</span><select value={language} onChange={event => { setLanguage(event.target.value as LocalizationLanguage); setPage(1); }}><option value="all">전체 · UZ/EN/RU</option><option value="uz">Uzbek · UZ</option><option value="en">English · EN</option><option value="ru">Russian · RU</option></select></label>
      <label><span>상태</span><select value={status} onChange={event => { setStatus(event.target.value as LocalizationStatus); setPage(1); }}><option value="missing">누락 있음</option><option value="complete">검사 필드 완료</option><option value="all">전체</option></select></label>
      <button type="button" onClick={result.reload}>새로고침</button>
    </div>
    <section className="admin-card"><div className="admin-card-head"><div><h3>번역 필드 점검</h3><p className={s.headNote}>필수·적용 대상 필드를 서버에서 검사 · 선택 언어 {scope}</p></div><span className="admin-pill blue">{data ? `${data.total.toLocaleString("ko-KR")}개 문서` : "조회 중"}</span></div>
      {result.error ? <ErrorState code={result.error} onRetry={result.reload}/> : result.loading || !data ? <div className="skeleton" style={{ height: 360 }}/> : data.items.length ? <div className={s.localizationList}>{data.items.map(item => <article className={s.localizationRow} key={`${item.entity}-${item.id}`}>
        <div className={s.localizationHead}><div><span className="admin-pill">{localizationEntityLabel(item.entity)}</span><button type="button" className={s.codeButton} onClick={() => setSelected(item)}>{item.label || item.code || item.id}</button><span className={`admin-pill ${item.active ? "good" : ""}`}>{item.active ? "활성" : "비활성"}</span></div><span className={item.status === "missing" ? s.gapCount : s.okCount}>{item.status === "missing" ? `누락 ${item.missingCount}건` : "검사 필드 완료"}</span></div>
        <div className={s.pathIdentity}><code>{item.code || "코드 없음"}</code><code>ID {item.id}</code><span>검사 {item.checkedFieldCount}개 필드·언어 항목</span></div>
        {item.missing.length ? <div className={s.gapPreview}>{item.missing.slice(0, 4).map((gap, index) => <span key={`${gap.field}-${gap.language}-${index}`} title={gap.reason}>{gap.language.toUpperCase()} · {gap.field}</span>)}{item.missing.length > 4 && <span>외 {item.missing.length - 4}건</span>}</div> : <p className={s.muted}>선택 언어의 검사 필드에 누락 없음</p>}
        <div className={s.localizationFoot}><div>{(item.locations?.length ? item.locations : item.location ? [item.location] : []).slice(0, 2).map((path, index) => <LocalizationPath key={`${path.lesson?.id || path.node?.id || index}-${index}`} location={path} entity={item.entity}/>)}</div><button type="button" className={s.detailButton} onClick={() => setSelected(item)}>근거 보기 →</button></div>
      </article>)}</div> : <div className="admin-empty">현재 조건에 맞는 콘텐츠 문서가 없습니다.{status === "missing" ? " 표시할 누락이 없다는 뜻이며 번역 품질을 보증하지는 않습니다." : " 다른 유형·언어·상태를 선택해 보세요."}</div>}
      {data && <PathPager current={data.page} total={data.total} pageSize={data.pageSize} onChange={setPage}/>}
    </section>
    <p className={s.disclaimer}>번역 상태는 주요 최상위 필드의 존재 여부 검사입니다. 예문·대화·퀴즈·문제 선택지의 중첩 번역과 Hangul의 모바일 정적 표시 문구는 포함되지 않습니다.</p>
    {selected && <LocalizationDrawer key={`${selected.entity}-${selected.id}`} item={selected} onClose={() => setSelected(null)}/>}
  </div>;
}

export function LiveContentPage() {
  const router = useRouter();
  const params = useSearchParams();
  const requested = params.get("tab");
  const tab: Tab = TABS.some(item => item.key === requested) ? requested as Tab : "path";
  const lessonId = tab === "questions" ? params.get("lessonId") || "" : "";
  const { can } = useSession();
  const permitted = can("content:read");
  const [searchDraft, setSearchDraft] = useState("");
  const [search, setSearch] = useState("");
  const [section, setSection] = useState("");
  const [unit, setUnit] = useState("");
  const [type, setType] = useState("");
  const [active, setActive] = useState("all");
  const [pageSelection, setPageSelection] = useState({ lessonId: "", page: 1 });
  const page = pageSelection.lessonId === lessonId ? pageSelection.page : 1;
  const setPage = (value: number | ((current: number) => number)) => setPageSelection(current => ({ lessonId, page: typeof value === "function" ? value(current.lessonId === lessonId ? current.page : 1) : value }));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const listTab = tab === "questions" || tab === "quality";
  const path = permitted && listTab ? `/admin/content/questions${qs({ page, pageSize: 20, search: lessonId ? "" : search, section: lessonId ? "" : section, unit: lessonId ? "" : unit, type: lessonId ? "" : type, active: lessonId ? "all" : active, lessonId, onlyIssues: tab === "quality" ? "true" : "" })}` : null;
  const result = useQuery<QuestionPage>(path);
  const data = result.data;
  const pageCount = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;
  const changeTab = (next: Tab) => { setPage(1); setSelectedId(null); router.push(next === "path" ? "/content" : `/content?tab=${next}`, { scroll: false }); };
  const clearLessonFilter = () => { setSearchDraft(""); setSearch(""); setSection(""); setUnit(""); setType(""); setActive("all"); setPage(1); router.push("/content?tab=questions", { scroll: false }); };

  if (!permitted) return <div className="admin-card admin-empty">콘텐츠 조회 권한이 없습니다.</div>;
  return <div className={`admin-page ${s.page}`}>
    <div className="admin-page-head"><div><h2>Content Diagnostics</h2><p>콘텐츠를 변경하지 않고 문제의 위치와 점검 근거를 찾습니다.</p></div><span className="admin-pill blue">실데이터 · 읽기 전용</span></div>
    <nav className="admin-tabs" aria-label="콘텐츠 관리 탭">{TABS.map(item => <button type="button" key={item.key} className={tab === item.key ? "is-active" : ""} onClick={() => changeTab(item.key)}>{item.label}</button>)}</nav>
    {tab === "path" ? <StudyPath/> : tab === "library" ? <ContentLibrary/> : tab === "localization" ? <LocalizationAudit/> : <>
      <section className={s.summary}><div><span>{tab === "quality" ? "점검할 문제 후보" : "문제 탐색"}</span><strong>{data ? data.total.toLocaleString("ko-KR") : result.loading ? "…" : "—"}</strong><p>{tab === "quality" ? "현재 검색 조건에 해당하는 서버 전체 문제 후보 수" : "현재 검색 조건에 해당하는 서버 전체 문제 수"}</p></div><p>{tab === "quality" ? "구조 검사와 최근 30일의 비건너뛰기 답변 20회 이상에서 나온 저정답률 후보를 표시합니다. 후보는 오류 확정이 아니며 직접 확인이 필요합니다." : "문제 코드나 ID를 검색하고 학습 경로를 확인하세요. 이 화면에는 저장·삭제·순서 변경 기능이 없습니다."}</p></section>
      {lessonId && <div className={s.lessonFilter}><span>Lesson ID <code>{lessonId}</code>에 연결된 문제만 서버에서 조회 중 · 다른 검색 조건은 적용하지 않음</span><button type="button" onClick={clearLessonFilter}>Lesson 필터 해제 ×</button></div>}
      {!lessonId && <form className={`admin-toolbar ${s.filters}`} onSubmit={event => { event.preventDefault(); setSearch(searchDraft.trim()); setPage(1); }}>
        <label><span>문제 코드·ID</span><input value={searchDraft} onChange={event => setSearchDraft(event.target.value)} placeholder="코드 또는 ID"/></label>
        <label><span>Section</span><input type="number" min="1" step="1" value={section} onChange={event => { setSection(event.target.value); setPage(1); }} placeholder="전체"/></label>
        <label><span>Unit</span><input type="number" min="1" step="1" value={unit} onChange={event => { setUnit(event.target.value); setPage(1); }} placeholder="전체"/></label>
        <label><span>문제 유형</span><select value={type} onChange={event => { setType(event.target.value); setPage(1); }}><option value="">전체 유형</option>{QUESTION_TYPES.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
        <label><span>상태</span><select value={active} onChange={event => { setActive(event.target.value); setPage(1); }}><option value="all">전체</option><option value="true">활성</option><option value="false">비활성</option></select></label>
        <button type="submit">검색</button><button type="button" onClick={result.reload}>새로고침</button>
      </form>}
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
