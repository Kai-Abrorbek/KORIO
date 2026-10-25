"use client";

import { useState } from "react";
import { qs } from "@/shared/api/client";
import { useQuery } from "@/shared/api/use-query";
import { useSession } from "@/features/auth/session";
import { ErrorState } from "@/shared/ui/primitives";

type Review = { id: string; userId: string; nickname: string | null; email: string | null; rating: number; comment: string; platform: string | null; appVersion: string | null; locale: string | null; createdAt: string | null };
type ReviewPage = { items: Review[]; total: number; page: number; pageSize: number; stats: { count: number; average: number; distribution: number[] } };
const platformLabel: Record<string, string> = { ios: "iOS", android: "Android", telegram: "Telegram", web: "Web" };
const when = (value: string | null) => value ? new Date(value).toLocaleString("ko-KR") : "—";
const stars = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);
const ratingTone = (n: number) => n >= 4 ? "good" : n === 3 ? "warn" : "bad";

/** 앱 평가 모달(7일에 한 번, 500 보석)로 들어온 별점과 의견 */
export function ReviewsPage() {
  const { can } = useSession();
  const [rating, setRating] = useState("");
  const [page, setPage] = useState(1);
  const reviews = useQuery<ReviewPage>(`/admin/app-reviews${qs({ rating, page, pageSize: 20 })}`);

  if (!can("users:read")) return <div className="admin-card admin-empty">평가를 볼 권한이 없습니다.</div>;
  const stats = reviews.data?.stats;
  const most = stats ? Math.max(1, ...stats.distribution) : 1;
  return <div className="admin-page">
    <div className="admin-page-head"><div><h2>앱 평가</h2><p>홈에서 뜨는 평가 모달로 받은 별점과 의견입니다. 유저당 7일에 한 번, 보내면 보석 500개를 받습니다.</p></div><span className="admin-pill blue">{stats ? `전체 ${stats.count}건` : "실데이터"}</span></div>
    {stats && <section className="admin-card" style={{ padding: 18, display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
      <div><div style={{ fontSize: 34, fontWeight: 800, lineHeight: 1 }}>{stats.count ? stats.average.toFixed(2) : "—"}</div><small>평균 별점</small></div>
      <div style={{ flex: 1, minWidth: 220, display: "grid", gap: 6 }}>{[5, 4, 3, 2, 1].map(n => { const value = stats.distribution[n - 1] ?? 0; return <div key={n} style={{ display: "grid", gridTemplateColumns: "28px 1fr 48px", gap: 8, alignItems: "center", fontSize: 12 }}><span>{n}점</span><div style={{ height: 8, borderRadius: 4, background: "var(--surface-2)" }}><div style={{ width: `${(value / most) * 100}%`, height: "100%", borderRadius: 4, background: n >= 4 ? "#13a754" : n === 3 ? "#ae7d19" : "#d64279" }}/></div><span style={{ textAlign: "right" }}>{value}</span></div>; })}</div>
    </section>}
    <div className="admin-toolbar"><select aria-label="별점" value={rating} onChange={event => { setRating(event.target.value); setPage(1); }}><option value="">모든 별점</option>{[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n}점</option>)}</select><button type="button" onClick={reviews.reload}>새로고침</button></div>
    <section className="admin-card">{reviews.error ? <ErrorState code={reviews.error} onRetry={reviews.reload}/> : reviews.loading || !reviews.data ? <div className="skeleton" style={{ height: 300 }}/> : <><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>별점</th><th>의견</th><th>사용자</th><th>앱</th><th>받은 시각</th></tr></thead><tbody>{reviews.data.items.map(item => <tr key={item.id}><td><span className={`admin-pill ${ratingTone(item.rating)}`} aria-label={`${item.rating}점`}>{stars(item.rating)}</span></td><td style={{ whiteSpace: "pre-wrap", maxWidth: 420 }}>{item.comment || <small>(의견 없음)</small>}</td><td><strong>{item.nickname ?? "—"}</strong><br/><small>{item.email ?? item.userId}</small></td><td>{item.platform ? platformLabel[item.platform] ?? item.platform : "—"}{item.appVersion ? ` ${item.appVersion}` : ""}<br/><small>{item.locale ?? ""}</small></td><td>{when(item.createdAt)}</td></tr>)}</tbody></table>{!reviews.data.items.length && <div className="admin-empty">아직 받은 평가가 없습니다.</div>}</div><div className="admin-toolbar"><span>{page} / {Math.max(1, Math.ceil(reviews.data.total / reviews.data.pageSize))}페이지</span><button type="button" disabled={page <= 1} onClick={() => setPage(value => value - 1)}>이전</button><button type="button" disabled={page * reviews.data.pageSize >= reviews.data.total} onClick={() => setPage(value => value + 1)}>다음</button></div></>}</section>
  </div>;
}
