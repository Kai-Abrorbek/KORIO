"use client";

import { useState } from "react";
import { qs } from "@/shared/api/client";
import { useQuery } from "@/shared/api/use-query";
import { useSession } from "@/features/auth/session";
import { ErrorState } from "@/shared/ui/primitives";
import type { AuditEntry } from "@/shared/data/mock-audit";

interface AuditPageResponse { items: AuditEntry[]; total: number; page: number; pageSize: number }

export function LiveAuditPage() {
  const { can } = useSession();
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<AuditEntry | null>(null);
  const result = useQuery<AuditPageResponse>(`/admin/audit${qs({ search, action, page, pageSize: 20 })}`);
  if (!can("audit:read")) return <div className="admin-card admin-empty">감사 로그 조회 권한이 없습니다.</div>;
  return <div className="admin-page">
    <p className="page-sub">서버에 기록된 관리자 행동입니다. 감사 로그는 수정하거나 삭제할 수 없습니다.</p>
    <div className="admin-toolbar"><input aria-label="감사 로그 검색" maxLength={100} placeholder="관리자·대상·사유 검색" value={search} onChange={event => { setSearch(event.target.value); setPage(1); }}/><input aria-label="행동 필터" maxLength={100} placeholder="행동 이름 (예: admin.role_change)" value={action} onChange={event => { setAction(event.target.value); setPage(1); }}/><button type="button" onClick={result.reload}>새로고침</button></div>
    <section className="admin-card">{result.error ? <ErrorState code={result.error} onRetry={result.reload}/> : result.loading || !result.data ? <div className="admin-card skeleton" style={{ height: 300 }}/> : <><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>시간</th><th>관리자</th><th>행동</th><th>대상</th><th>사유</th><th>결과</th></tr></thead><tbody>{result.data.items.map(row => <tr key={row.id} onClick={() => setSelected(row)} style={{ cursor: "pointer" }}><td>{new Date(row.at).toLocaleString("ko-KR")}</td><td>{row.adminEmail}</td><td><strong>{row.action}</strong></td><td>{row.targetLabel || row.targetId || "—"}</td><td>{row.reason || "—"}</td><td><span className={`admin-pill ${row.success ? "good" : "bad"}`}>{row.success ? "성공" : "실패"}</span></td></tr>)}</tbody></table>{!result.data.items.length && <div className="admin-empty">일치하는 감사 로그가 없습니다.</div>}</div><div className="admin-toolbar"><span>{result.data.total.toLocaleString("ko-KR")}건 · {page}페이지</span><button type="button" disabled={page <= 1} onClick={() => setPage(value => value - 1)}>이전</button><button type="button" disabled={page * result.data.pageSize >= result.data.total} onClick={() => setPage(value => value + 1)}>다음</button></div></>}</section>
    {selected && <div className="admin-drawer-backdrop" onMouseDown={() => setSelected(null)}><aside className="admin-drawer" onMouseDown={event => event.stopPropagation()}><button className="btn btn-ghost" onClick={() => setSelected(null)}>← 닫기</button><h3 style={{ marginTop: 18 }}>{selected.action}</h3><p className="page-sub">{new Date(selected.at).toLocaleString("ko-KR")}</p><div className="admin-detail-grid" style={{ marginTop: 20 }}>{[["관리자", selected.adminEmail], ["역할", selected.adminRole], ["대상", selected.targetLabel || selected.targetId], ["대상 타입", selected.targetType], ["IP", selected.ip], ["사유", selected.reason || "—"]].map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}</div><h4 style={{ marginTop: 24 }}>변경 내역</h4><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>필드</th><th>이전</th><th>이후</th></tr></thead><tbody>{Object.entries(selected.changes ?? {}).map(([field, diff]) => <tr key={field}><td>{field}</td><td>{String(diff.from)}</td><td>{String(diff.to)}</td></tr>)}</tbody></table>{!Object.keys(selected.changes ?? {}).length && <div className="admin-empty">값 변경 내역이 없습니다.</div>}</div></aside></div>}
  </div>;
}
