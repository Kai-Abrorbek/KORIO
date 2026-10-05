"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSession } from "@/features/auth/session";
import { leagues, mockUserRepository, type AdminUser, type UserAction, type UserPage, type UserQuery } from "./repository";
import styles from "./users.module.css";

const number = (value: number) => new Intl.NumberFormat("ko-KR").format(value);
const date = (value: string | null) => value ? new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "short", day: "numeric" }).format(new Date(value)) : "—";
const activityLabel = (user: AdminUser) => user.status === "suspended" ? "정지" : Date.UTC(2026, 9, 6) - new Date(user.lastActiveAt).getTime() >= 30 * 86_400_000 ? "휴면" : "활성";
type DetailTab = "overview" | "learning" | "gamification" | "onboarding" | "subscription";
const detailTabs: { id: DetailTab; label: string }[] = [
  { id: "overview", label: "개요" }, { id: "learning", label: "학습" }, { id: "gamification", label: "게이미피케이션" },
  { id: "onboarding", label: "온보딩" }, { id: "subscription", label: "구독" },
];

export function UsersPage() {
  const params = useSearchParams();
  const { can } = useSession();
  const [query, setQuery] = useState<UserQuery>({ status: "all", tier: "all", country: "all", section: "all", league: "all", activity: "all", sort: "newest", page: 1, pageSize: 12 });
  const [result, setResult] = useState<UserPage | null>(null);
  const [segmentUsers, setSegmentUsers] = useState<AdminUser[]>([]);
  const [selected, setSelected] = useState<AdminUser | null>(null);
  const [detailTab, setDetailTab] = useState<DetailTab>("overview");
  const [pending, setPending] = useState<UserAction["action"] | null>(null);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const segmentMode = params.get("tab") === "segments";

  const refresh = useCallback(async () => {
    const [page, allMatching] = await Promise.all([
      mockUserRepository.list(query),
      mockUserRepository.list({ ...query, page: 1, pageSize: 1000 }),
    ]);
    setResult(page);
    setSegmentUsers(allMatching.items);
  }, [query]);
  useEffect(() => { void refresh(); }, [refresh]);

  const updateQuery = (patch: Partial<UserQuery>) => setQuery(current => ({ ...current, ...patch, page: 1 }));
  const open = async (id: string) => {
    const user = await mockUserRepository.get(id);
    setSelected(user);
    setDetailTab("overview");
  };
  const confirmAction = async () => {
    if (!selected || !pending || !reason.trim() || !can("users:write")) return;
    setBusy(true);
    setError("");
    try {
      const updated = await mockUserRepository.act({ userId: selected.id, action: pending, reason });
      setSelected(updated);
      await refresh();
      setNotice(`${updated.nickname}님의 변경 사항이 mock 데이터에 반영됐습니다.`);
      setPending(null);
      setReason("");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "변경에 실패했습니다."); }
    finally { setBusy(false); }
  };

  const users = useMemo(() => result?.items ?? [], [result]);
  const segment = useMemo(() => {
    const count = { active: 0, suspended: 0, free: 0, super: 0, max: 0, onboarding: 0 };
    segmentUsers.forEach(user => { count[user.status]++; count[user.tier]++; if (user.isOnboardingCompleted) count.onboarding++; });
    return count;
  }, [segmentUsers]);
  const totalPages = result ? Math.max(1, Math.ceil(result.total / result.pageSize)) : 1;

  if (!can("users:read")) return <div className="admin-empty">사용자 조회 권한이 없습니다.</div>;

  return <div className="admin-page">
    <div className="admin-page-head"><div><h2>사용자 {segmentMode ? "세그먼트" : "목록"}</h2><p>학습 활동과 구독 상태를 한 곳에서 확인합니다 · 현재 화면은 mock 데이터</p></div><span className="admin-pill blue">{result ? `${number(result.total)}명` : "불러오는 중"}</span></div>
    <div className="admin-tabs"><Link className={!segmentMode ? "is-active" : ""} href="/users">사용자 목록</Link><Link className={segmentMode ? "is-active" : ""} href="/users?tab=segments">사용자 세그먼트</Link></div>
    {notice && <div className={styles.notice} role="status">{notice}<button type="button" onClick={() => setNotice("")} aria-label="알림 닫기">×</button></div>}
    {segmentMode && <div className="admin-grid four">
      <div className="admin-card admin-kpi"><div className="admin-kpi-label">활성 사용자</div><div className="admin-kpi-value">{number(segment.active)}</div><div className="admin-kpi-note">현재 필터 기준</div></div>
      <div className="admin-card admin-kpi"><div className="admin-kpi-label">온보딩 완료</div><div className="admin-kpi-value">{number(segment.onboarding)}</div><div className="admin-kpi-note">현재 필터 기준</div></div>
      <div className="admin-card admin-kpi"><div className="admin-kpi-label">유료 구독</div><div className="admin-kpi-value">{number(segment.super + segment.max)}</div><div className="admin-kpi-note">Super {segment.super} · Max {segment.max}</div></div>
      <div className="admin-card admin-kpi"><div className="admin-kpi-label">학습 잠재군</div><div className="admin-kpi-value">{number(segmentUsers.filter(user => user.status === "active" && user.streak === 0).length)}</div><div className="admin-kpi-note">활성 · 현재 streak 0일</div></div>
    </div>}
    <div className="admin-toolbar">
      <input aria-label="사용자 검색" placeholder="이름, 이메일, 사용자명 검색" value={query.search ?? ""} onChange={event => updateQuery({ search: event.target.value })}/>
      <select aria-label="운영 상태" value={query.status} onChange={event => updateQuery({ status: event.target.value as UserQuery["status"] })}><option value="all">모든 상태</option><option value="active">활성</option><option value="suspended">정지</option></select>
      <select aria-label="구독 등급" value={query.tier} onChange={event => updateQuery({ tier: event.target.value as UserQuery["tier"] })}><option value="all">모든 등급</option><option value="free">Free</option><option value="super">Super</option><option value="max">Max</option></select>
      <select aria-label="국가" value={query.country} onChange={event => updateQuery({ country: event.target.value as UserQuery["country"] })}><option value="all">모든 국가</option><option value="KR">한국</option><option value="UZ">우즈베키스탄</option><option value="OTHER">기타</option></select>
      <select aria-label="현재 Section" value={query.section} onChange={event => updateQuery({ section: event.target.value === "all" ? "all" : Number(event.target.value) })}><option value="all">모든 Section</option>{[1,2,3,4,5,6].map(section => <option key={section} value={section}>Section {section}</option>)}</select>
      <select aria-label="League" value={query.league} onChange={event => updateQuery({ league: event.target.value as UserQuery["league"] })}><option value="all">모든 League</option>{leagues.map(league => <option key={league} value={league}>{league}</option>)}</select>
      <select aria-label="활동" value={query.activity} onChange={event => updateQuery({ activity: event.target.value as UserQuery["activity"] })}><option value="all">모든 활동</option><option value="recent">최근 7일 활동</option><option value="dormant">30일 이상 휴면</option></select>
      <label className={styles.dateFilter}>가입 시작일<input className={styles.dateInput} type="date" aria-label="가입 시작일" value={query.joinedFrom ?? ""} max={query.joinedTo} onChange={event => updateQuery({ joinedFrom: event.target.value })}/></label>
      <label className={styles.dateFilter}>가입 종료일<input className={styles.dateInput} type="date" aria-label="가입 종료일" value={query.joinedTo ?? ""} min={query.joinedFrom} onChange={event => updateQuery({ joinedTo: event.target.value })}/></label>
      <select aria-label="정렬" value={query.sort} onChange={event => updateQuery({ sort: event.target.value as UserQuery["sort"] })}><option value="newest">최근 가입순</option><option value="oldest">오래된 가입순</option><option value="recent">최근 활동순</option><option value="xp">XP 높은순</option></select>
    </div>
    <section className="admin-card"><div className="admin-card-head"><div><h3>사용자</h3><p className={styles.subline}>현재 학습 위치는 최근 LessonAttempt를 바탕으로 구성한 mock 값입니다.</p></div><span className="admin-pill blue">MOCK</span></div>
      <div className="admin-table-wrap"><table className={`admin-table ${styles.wideTable}`}><thead><tr><th>User</th><th>Email</th><th>가입일</th><th>마지막 접속</th><th>Section</th><th>Unit</th><th>Lesson</th><th>XP</th><th>Streak</th><th>Energy</th><th>League</th><th>Subscription</th><th>Status</th><th className="right">상세</th></tr></thead><tbody>{users.map(user => <tr key={user.id}><td><strong>{user.nickname}</strong><div className={styles.secondary}>{user.id}</div></td><td>{user.email}</td><td>{date(user.createdAt)}</td><td>{date(user.lastActiveAt)}</td><td>{user.currentSection}</td><td>{user.currentUnit}</td><td>{user.currentLesson}</td><td className="tnum">{number(user.totalXP)}</td><td>{user.streak}일</td><td>{user.energy} / 5</td><td>{user.league}</td><td><span className={`admin-pill ${user.tier === "free" ? "" : "blue"}`}>{user.tier.toUpperCase()}</span></td><td><span className={`admin-pill ${user.status === "suspended" ? "bad" : activityLabel(user) === "휴면" ? "warn" : "good"}`}>{activityLabel(user)}</span></td><td className="right"><button type="button" className="linklike" onClick={() => void open(user.id)}>보기 →</button></td></tr>)}</tbody></table>{!users.length && <div className="admin-empty">조건에 맞는 사용자가 없습니다.</div>}</div>
      <div className="admin-pagination"><span>{result ? `${number((result.page - 1) * result.pageSize + (users.length ? 1 : 0))}–${number((result.page - 1) * result.pageSize + users.length)} / ${number(result.total)}` : "불러오는 중"}</span><div><button type="button" disabled={(query.page ?? 1) <= 1} onClick={() => setQuery(current => ({ ...current, page: (current.page ?? 1) - 1 }))}>이전</button><span className={styles.pageNumber}>{result?.page ?? 1} / {totalPages}</span><button type="button" disabled={(query.page ?? 1) >= totalPages} onClick={() => setQuery(current => ({ ...current, page: (current.page ?? 1) + 1 }))}>다음</button></div></div>
    </section>
    {selected && <div className="admin-drawer-backdrop" onMouseDown={() => setSelected(null)}><aside className="admin-drawer" role="dialog" aria-modal="true" aria-label={`${selected.nickname} 사용자 상세`} onMouseDown={event => event.stopPropagation()}>
      <div className={styles.drawerHeader}><div><span className={styles.eyebrow}>USER PROFILE · {selected.id}</span><h3>{selected.nickname}</h3><span className={styles.secondary}>{selected.email}</span></div><button type="button" className={styles.close} aria-label="상세 닫기" onClick={() => setSelected(null)}>×</button></div>
      <div className="admin-tabs">{detailTabs.map(tab => <button type="button" key={tab.id} className={detailTab === tab.id ? "is-active" : ""} onClick={() => setDetailTab(tab.id)}>{tab.label}</button>)}</div>
      <div className={styles.detailBody}>
        {detailTab === "overview" && <DetailGrid items={[["운영 상태", selected.status === "active" ? "활성" : "정지"], ["가입일", date(selected.createdAt)], ["최근 활동", date(selected.lastActiveAt)], ["가입 경로", selected.provider], ["국가", selected.country], ["사용자명", `@${selected.username}`]]}/>}
        {detailTab === "learning" && <><DetailGrid items={[["현재 Section", String(selected.currentSection)], ["현재 Unit", String(selected.currentUnit)], ["현재 Lesson", selected.currentLesson], ["전체 진행률", `${selected.overallProgressPercent}%`], ["레슨 완료", `${number(selected.lessonsCompleted)}회`], ["평균 정답률", `${selected.accuracy}%`], ["레슨당 평균 학습", `${Math.round(selected.studyMinutes / Math.max(selected.lessonsCompleted, 1))}분`], ["현재 학습 모드", selected.learnMode]]}/><h4 className={styles.historyTitle}>최근 학습 기록</h4><div className={styles.historyList}>{selected.recentLearning.map(attempt => <div className={styles.historyRow} key={attempt.id}><div><strong>Section {attempt.section} · Unit {attempt.unit} · {attempt.lesson}</strong><span>{attempt.category} · {date(attempt.at)}</span></div><div className={styles.historyRight}><span className={`admin-pill ${attempt.status === "completed" ? "good" : "warn"}`}>{attempt.status === "completed" ? "완료" : "진행 중"}</span><small>{attempt.correctAnswers}/{attempt.totalAnswers} 정답 · +{attempt.xpEarned} XP</small></div></div>)}</div><p className={styles.footnote}>학습 위치와 기록은 LessonAttempt 필드에 맞춘 mock 값입니다. 학습 시간은 앱 신고 값을 가정했습니다.</p></>}
        {detailTab === "gamification" && <><DetailGrid items={[["리그", selected.league], ["총 XP", number(selected.totalXP)], ["연속 학습", `${selected.streak}일`], ["최장 연속", `${selected.longestStreak}일`], ["보석", number(selected.gems)], ["에너지", `${selected.energy} / 5`]]}/><h4 className={styles.historyTitle}>주간 챌린지 보상 기록</h4>{selected.leagueChallengeClaims.length ? <div className={styles.historyList}>{selected.leagueChallengeClaims.map(claimedAt => <div className={styles.historyRow} key={claimedAt}><strong>리그 주간 챌린지 보상 수령</strong><span>{date(claimedAt)}</span></div>)}</div> : <p className={styles.footnote}>최근 수령 기록이 없습니다.</p>}<p className={styles.footnote}>기존 User.leagueChallengeClaims에는 수령 시각만 있어 점수나 순위는 표시하지 않습니다.</p></>}
        {detailTab === "onboarding" && <DetailGrid items={[["온보딩", selected.isOnboardingCompleted ? "완료" : "미완료"], ["배치 레벨", `${selected.placementLevel}급`], ["학습 모드", selected.learnMode], ["체험 시작", date(selected.trialStartedAt)]]}/>}
        {detailTab === "subscription" && <DetailGrid items={[["구독 등급", selected.tier.toUpperCase()], ["요금제", selected.plan ?? "—"], ["만료일", date(selected.superExpiresAt)], ["체험 시작", date(selected.trialStartedAt)]]}/>}
      </div>
      {can("users:write") && <div className={styles.actions}><h4>관리 작업</h4><p>변경 사유를 확인한 뒤 mock 상태에만 반영됩니다.</p><div className={styles.actionButtons}><button type="button" className="btn btn-ghost" onClick={() => setPending(selected.status === "active" ? "suspend" : "reinstate")}>{selected.status === "active" ? "계정 정지" : "정지 해제"}</button><button type="button" className="btn btn-ghost" onClick={() => setPending("resetProgress")}>학습 진도 초기화</button></div></div>}
    </aside></div>}
    {pending && selected && <div className="admin-modal-backdrop"><div className="admin-modal" role="alertdialog" aria-modal="true" aria-labelledby="user-action-title"><h3 id="user-action-title">{pending === "resetProgress" ? "학습 진도를 초기화할까요?" : pending === "suspend" ? "계정을 정지할까요?" : "계정 정지를 해제할까요?"}</h3><p>{selected.nickname} ({selected.email}) · 이 동작은 현재 mock 화면에만 적용됩니다.</p><label className="admin-field">변경 사유<textarea autoFocus value={reason} onChange={event => setReason(event.target.value)} placeholder="운영 사유를 입력하세요"/></label>{error && <p className={styles.error} role="alert">{error}</p>}<div className="admin-modal-actions"><button type="button" className="btn btn-ghost" onClick={() => { setPending(null); setReason(""); setError(""); }}>취소</button><button type="button" className="btn btn-primary" disabled={!reason.trim() || busy} onClick={() => void confirmAction()}>{busy ? "반영 중…" : "확인 후 적용"}</button></div></div></div>}
  </div>;
}

function DetailGrid({ items }: { items: [string, string][] }) {
  return <div className="admin-detail-grid">{items.map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}</div>;
}
