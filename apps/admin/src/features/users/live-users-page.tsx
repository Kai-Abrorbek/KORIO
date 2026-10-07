"use client";

import { useState } from "react";
import { qs } from "@/shared/api/client";
import { useQuery } from "@/shared/api/use-query";
import { ErrorState } from "@/shared/ui/primitives";
import { useSession } from "@/features/auth/session";
import { UserActionsPanel } from "./user-actions-panel";

interface LiveUser {
  id: string; email: string; nickname: string; username: string; country: string; provider: string;
  createdAt: string | null; lastActiveAt: string | null; isOnboardingCompleted: boolean;
  placementLevel: number; totalXP: number; streak: number; longestStreak: number;
  league: string; gems: number; energy: number; streakFreeze: number;
  projectedPremium: boolean; projectedTier: string | null; projectedPlan: string | null;
  projectedExpiresAt: string | null; trialStartedAt: string | null;
}
interface UserPageResponse { items: LiveUser[]; total: number; page: number; pageSize: number }
const date = (value: string | null) => value ? new Date(value).toLocaleDateString("ko-KR") : "—";

export function LiveUsersPage() {
  const { can } = useSession();
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const users = useQuery<UserPageResponse>(`/admin/users${qs({ search, country, sort, page, pageSize: 20 })}`);
  const selected = useQuery<LiveUser>(selectedId ? `/admin/users/${selectedId}` : null);
  if (!can("users:read")) return <div className="admin-card admin-empty">사용자 조회 권한이 없습니다.</div>;

  return <div className="admin-page">
    <div className="admin-page-head"><div><h2>사용자 목록</h2><p>실제 계정의 학습 상태를 확인하고 보상 지급·개별 알림을 관리합니다.</p></div><span className="admin-pill blue">{users.data ? `${users.data.total.toLocaleString("ko-KR")}명` : "실데이터"}</span></div>
    <div className="admin-toolbar"><input aria-label="사용자 검색" placeholder="이메일·이름·사용자명 검색" value={search} onChange={event => { setSearch(event.target.value); setPage(1); }}/><select aria-label="국가" value={country} onChange={event => { setCountry(event.target.value); setPage(1); }}><option value="">모든 국가</option><option value="KR">한국</option><option value="UZ">우즈베키스탄</option><option value="OTHER">기타</option></select><select aria-label="정렬" value={sort} onChange={event => { setSort(event.target.value); setPage(1); }}><option value="newest">최근 가입</option><option value="oldest">오래된 가입</option><option value="recent">최근 활동</option><option value="xp">XP 높은 순</option></select><button type="button" onClick={users.reload}>새로고침</button></div>
    <section className="admin-card">{users.error ? <ErrorState code={users.error} onRetry={users.reload}/> : users.loading || !users.data ? <div className="skeleton" style={{ height: 360 }}/> : <><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>사용자</th><th>국가</th><th>가입</th><th>최근 활동</th><th className="right">XP</th><th className="right">Streak</th><th>구독 투영</th></tr></thead><tbody>{users.data.items.map(user => <tr key={user.id} style={{ cursor: "pointer" }} onClick={() => setSelectedId(user.id)}><td><strong>{user.nickname || user.username || "이름 없음"}</strong><br/><small>{user.email || user.id}</small></td><td>{user.country || "—"}</td><td>{date(user.createdAt)}</td><td>{date(user.lastActiveAt)}</td><td className="right">{user.totalXP.toLocaleString("ko-KR")}</td><td className="right">{user.streak}일</td><td><span className={`admin-pill ${user.projectedPremium ? "good" : ""}`}>{user.projectedPremium ? user.projectedTier ?? "Premium" : "Free"}</span></td></tr>)}</tbody></table>{!users.data.items.length && <div className="admin-empty">일치하는 사용자가 없습니다.</div>}</div><div className="admin-toolbar"><span>{page} / {Math.max(1, Math.ceil(users.data.total / users.data.pageSize))}페이지</span><button type="button" disabled={page <= 1} onClick={() => setPage(value => value - 1)}>이전</button><button type="button" disabled={page * users.data.pageSize >= users.data.total} onClick={() => setPage(value => value + 1)}>다음</button></div></>}</section>
    <p className="page-sub">구독 투영은 사용자 문서의 표시용 필드입니다. 실제 프리미엄 권한의 기준은 Subscription 컬렉션입니다.</p>
    {selectedId && <div className="admin-drawer-backdrop" onMouseDown={() => setSelectedId(null)}><aside className="admin-drawer" onMouseDown={event => event.stopPropagation()}><button className="btn btn-ghost" onClick={() => setSelectedId(null)}>← 닫기</button>{selected.error ? <ErrorState code={selected.error} onRetry={selected.reload}/> : selected.loading || !selected.data ? <div className="skeleton" style={{ height: 300, marginTop: 20 }}/> : <><h3 style={{ marginTop: 18 }}>{selected.data.nickname || selected.data.username || "사용자"}</h3><p className="page-sub">{selected.data.email || selected.data.id}</p><div className="admin-detail-grid" style={{ marginTop: 20 }}>{[["가입", date(selected.data.createdAt)], ["최근 활동", date(selected.data.lastActiveAt)], ["온보딩", selected.data.isOnboardingCompleted ? "완료" : "미완료"], ["배치 레벨", selected.data.placementLevel], ["XP", selected.data.totalXP.toLocaleString("ko-KR")], ["Streak", `${selected.data.streak}일`], ["리그", selected.data.league], ["보석", selected.data.gems.toLocaleString("ko-KR")], ["에너지", selected.data.energy], ["보호권", selected.data.streakFreeze], ["체험 시작", date(selected.data.trialStartedAt)]].map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}</div><UserActionsPanel key={selectedId} userId={selectedId} onUpdated={() => { selected.reload(); users.reload(); }}/><p className="page-sub">계정 정지·진행도 초기화는 아직 서버 조치 API가 없어 제공하지 않습니다.</p></>}</aside></div>}
  </div>;
}
