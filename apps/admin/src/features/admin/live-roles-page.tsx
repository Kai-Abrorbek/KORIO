"use client";

import { useState } from "react";
import { api, ApiError } from "@/shared/api/client";
import { useQuery } from "@/shared/api/use-query";
import { ErrorState } from "@/shared/ui/primitives";
import { useSession } from "@/features/auth/session";

type Role = "super_admin" | "content_admin" | "support" | "analyst";
type ChangeableRole = Exclude<Role, "super_admin"> | "none";
interface Account { id: string; email: string; nickname: string; role: Role; lastLoginAt: string | null; createdAt: string | null }
interface Overview { roles: { role: Role; permissions: string[] }[]; permissions: string[]; accounts: Account[]; policy: string }
const ROLE_LABEL: Record<Role, string> = { super_admin: "최고 관리자", content_admin: "콘텐츠 관리자", support: "지원", analyst: "분석가" };
const OPTIONS: { value: ChangeableRole; label: string }[] = [{ value: "content_admin", label: "콘텐츠 관리자" }, { value: "support", label: "지원" }, { value: "analyst", label: "분석가" }, { value: "none", label: "권한 회수" }];

export function LiveRolesPage() {
  const { me } = useSession();
  const query = useQuery<Overview>("/admin/administrators");
  const [change, setChange] = useState<{ account: Account; role: ChangeableRole } | null>(null);
  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const choose = (account: Account, role: ChangeableRole) => {
    if (role === account.role) return;
    setChange({ account, role }); setPassword(""); setReason(""); setError("");
  };
  const close = () => { setChange(null); setPassword(""); setReason(""); setError(""); };
  const save = async () => {
    if (!change || pending || !password || !reason.trim()) return;
    setPending(true); setError("");
    try {
      await api.patch(`/admin/administrators/${encodeURIComponent(change.account.id)}/role`, { role: change.role, password, reason: reason.trim() });
      setMessage(`${change.account.email}의 권한을 ${change.role === "none" ? "회수" : ROLE_LABEL[change.role]}했습니다. 기존 앱·관리자 로그인이 무효화됐습니다.`);
      close(); query.reload();
    } catch (failure) {
      setError(failure instanceof ApiError ? failure.code : "NETWORK_ERROR");
    } finally { setPassword(""); setPending(false); }
  };
  return <div className="admin-page">
    <p className="page-sub">관리자 계정과 현재 서버의 권한 정책 · 최고 관리자 전용</p>
    {query.error ? <section className="admin-card"><ErrorState code={query.error} onRetry={query.reload}/></section> : !query.data ? <div className="admin-card skeleton" style={{ height: 400 }}/> : <>
      {message && <div className="admin-card admin-card-body"><span className="admin-pill good">{message}</span></div>}
      <section className="admin-card"><div className="admin-card-head"><h3>권한 매트릭스</h3><span className="admin-pill blue">현재 서버 정책</span></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>권한</th>{query.data.roles.map(item => <th key={item.role}>{ROLE_LABEL[item.role]}</th>)}</tr></thead><tbody>{query.data.permissions.map(permission => <tr key={permission}><td><code>{permission}</code></td>{query.data!.roles.map(item => <td key={item.role}><span className={`admin-pill ${item.permissions.includes(permission) ? "good" : ""}`}>{item.permissions.includes(permission) ? "허용" : "—"}</span></td>)}</tr>)}</tbody></table></div></section>
      <section className="admin-card"><div className="admin-card-head"><h3>관리자 계정</h3><span className="admin-pill blue">{query.data.accounts.length}명</span></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>이메일</th><th>이름</th><th>역할</th><th>최근 관리자 로그인</th><th className="right">변경</th></tr></thead><tbody>{query.data.accounts.map(account => <tr key={account.id}><td><strong>{account.email}</strong></td><td>{account.nickname || "—"}</td><td><span className="admin-pill blue">{ROLE_LABEL[account.role]}</span></td><td>{account.lastLoginAt ? new Date(account.lastLoginAt).toLocaleString("ko-KR") : "기록 없음"}</td><td className="right">{account.role === "super_admin" || account.id === me?.userId ? <span className="admin-pill">보호됨</span> : <select aria-label={`${account.email} 역할 변경`} value={account.role} onChange={event => choose(account, event.target.value as ChangeableRole)}>{OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select>}</td></tr>)}</tbody></table>{!query.data.accounts.length && <div className="admin-empty">등록된 관리자 계정이 없습니다.</div>}</div><div className="admin-card-body"><p className="page-sub">{query.data.policy} 역할 변경에는 현재 로그인한 관리자의 전용 비밀번호와 사유가 필요합니다. 변경 즉시 대상 계정의 앱·관리자 세션이 모두 무효화됩니다.</p></div></section>
    </>}
    {change && <div className="admin-modal-backdrop" onMouseDown={() => !pending && close()}><section className="admin-modal" role="dialog" aria-modal="true" aria-label="관리자 역할 변경 확인" onMouseDown={event => event.stopPropagation()}><h3>관리자 역할 변경</h3><p>{change.account.email}: {ROLE_LABEL[change.account.role]} → {change.role === "none" ? "권한 회수" : ROLE_LABEL[change.role]}<br/>대상의 기존 앱·관리자 로그인은 즉시 무효화됩니다.</p><label className="admin-field">내 관리자 비밀번호<input type="password" autoComplete="current-password" maxLength={200} value={password} onChange={event => setPassword(event.target.value)}/></label><label className="admin-field">변경 사유<textarea maxLength={500} value={reason} onChange={event => setReason(event.target.value)} placeholder="감사 로그에 기록할 사유"/></label>{error && <p className="admin-pill bad" role="alert">변경 실패: {error}</p>}<div className="admin-modal-actions"><button className="btn btn-ghost" disabled={pending} onClick={close}>취소</button><button className="btn btn-primary" disabled={pending || !password || !reason.trim()} onClick={() => void save()}>{pending ? "변경 중…" : "권한 변경 확인"}</button></div></section></div>}
  </div>;
}
