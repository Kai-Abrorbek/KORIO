"use client";

import { useState } from "react";
import { api } from "@/shared/api/client";
import { useQuery } from "@/shared/api/use-query";
import { useSession } from "@/features/auth/session";

type Kind = "gems" | "energy_refill" | "streak_freeze" | "super_days";
type Grant = { id: string; kind: Kind; amount: number; status: string; adminEmail: string; reason: string; appliedAt: string | null };
const labels: Record<Kind, string> = { gems: "보석", energy_refill: "에너지 가득 충전", streak_freeze: "연속 학습 보호권", super_days: "SUPER 이용권" };

export function UserActionsPanel({ userId, onUpdated }: { userId: string; onUpdated: () => void }) {
  const { can } = useSession();
  const history = useQuery<{ items: Grant[] }>(`/admin/users/${userId}/rewards`);
  const [kind, setKind] = useState<Kind>("gems");
  const [amount, setAmount] = useState(50);
  const [reason, setReason] = useState("");
  const [rewardKey, setRewardKey] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [pushReason, setPushReason] = useState("");
  const [pushKey, setPushKey] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function grant() {
    if (busy || reason.trim().length < 5) return;
    if (!window.confirm(`${labels[kind]} ${kind === "gems" ? `${amount}개` : kind === "super_days" ? `${amount}일` : "1개"}를 이 사용자에게 지급할까요?`)) return;
    setBusy(true); setMessage("");
    const requestId = rewardKey ?? crypto.randomUUID();
    setRewardKey(requestId);
    try {
      const result = await api.post<{ duplicate: boolean }>(`/admin/users/${userId}/rewards`, { requestId, kind, amount: kind === "gems" || kind === "super_days" ? amount : 1, reason: reason.trim() });
      setMessage(result.duplicate ? "이미 처리된 요청입니다. 중복 지급하지 않았어요." : "보상을 지급했어요.");
      setRewardKey(null); setReason(""); history.reload(); onUpdated();
    } catch (error) { setMessage(`지급 실패: ${error instanceof Error ? error.message : "알 수 없는 오류"}. 같은 요청으로 재시도할 수 있어요.`); }
    finally { setBusy(false); }
  }

  async function sendPush() {
    if (busy || !title.trim() || !body.trim() || pushReason.trim().length < 5) return;
    if (!window.confirm("선택한 이 사용자에게만 푸시를 발송할까요?")) return;
    setBusy(true); setMessage("");
    const requestId = pushKey ?? crypto.randomUUID();
    setPushKey(requestId);
    try {
      const result = await api.post<{ accepted: boolean; note: string }>(`/admin/users/${userId}/push`, { requestId, title: title.trim(), body: body.trim(), reason: pushReason.trim() });
      setMessage(result.accepted ? "푸시 서비스가 요청을 접수했어요. 실제 기기 도착은 영수증 확인 전까지 확정되지 않습니다." : "발송되지 않았어요. 알림 설정·기기 토큰 또는 중복 요청을 확인해 주세요.");
      setPushKey(null);
      if (result.accepted) { setTitle(""); setBody(""); setPushReason(""); }
    } catch (error) { setMessage(`발송 실패: ${error instanceof Error ? error.message : "알 수 없는 오류"}. 같은 요청으로 재시도할 수 있어요.`); }
    finally { setBusy(false); }
  }

  return <div style={{ display: "grid", gap: 18, marginTop: 24 }}>
    {can("operations:write") && <section className="admin-card" style={{ padding: 18 }}><h4>사용자 보상 지급</h4><p className="page-sub">보상은 실제 계정에 반영되며, 지급 기록과 사유가 남습니다.</p>
      <div className="admin-toolbar"><select aria-label="보상 종류" value={kind} onChange={event => { const next = event.target.value as Kind; setKind(next); setAmount(next === "gems" ? 50 : 1); setRewardKey(null); }}>{Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
        {kind === "gems" ? <input aria-label="보석 수" type="number" min={1} max={10000} value={amount} onChange={event => { setAmount(Number(event.target.value)); setRewardKey(null); }}/>
          : kind === "super_days" ? <select aria-label="이용권 기간" value={amount} onChange={event => { setAmount(Number(event.target.value)); setRewardKey(null); }}>{[1, 7, 14, 30].map(days => <option key={days} value={days}>{days}일권</option>)}</select> : null}
      </div><input aria-label="지급 사유" placeholder="지급 사유 (5자 이상)" value={reason} onChange={event => { setReason(event.target.value); setRewardKey(null); }} style={{ width: "100%" }}/>
      <button type="button" className="btn btn-primary" disabled={busy || reason.trim().length < 5 || (kind === "gems" && (!Number.isInteger(amount) || amount < 1 || amount > 10000))} onClick={grant} style={{ marginTop: 10 }}>보상 지급</button>
    </section>}
    {can("users:write") && <section className="admin-card" style={{ padding: 18 }}><h4>개별 푸시 알림</h4><p className="page-sub">선택한 사용자 한 명에게만 발송합니다. 사용자의 알림 허용과 유효한 기기 토큰이 필요합니다.</p>
      <input aria-label="알림 제목" placeholder="알림 제목" maxLength={80} value={title} onChange={event => { setTitle(event.target.value); setPushKey(null); }} style={{ width: "100%" }}/>
      <textarea aria-label="알림 내용" placeholder="알림 내용" maxLength={500} value={body} onChange={event => { setBody(event.target.value); setPushKey(null); }} style={{ width: "100%", minHeight: 90, marginTop: 8 }}/>
      <input aria-label="발송 사유" placeholder="발송 사유 (5자 이상)" value={pushReason} onChange={event => { setPushReason(event.target.value); setPushKey(null); }} style={{ width: "100%", marginTop: 8 }}/>
      <button type="button" className="btn btn-primary" disabled={busy || !title.trim() || !body.trim() || pushReason.trim().length < 5} onClick={sendPush} style={{ marginTop: 10 }}>이 사용자에게 발송</button>
    </section>}
    {message && <p role="status" className="page-sub">{message}</p>}
    <section><h4>최근 보상 내역</h4>{history.loading ? <p className="page-sub">불러오는 중…</p> : history.error ? <p className="page-sub">내역을 불러오지 못했어요: {history.error}</p> : !history.data?.items.length ? <p className="page-sub">지급 내역이 없습니다.</p> : history.data.items.map(item => <div key={item.id} style={{ padding: "9px 0", borderBottom: "1px solid var(--border, #eee)" }}><strong>{labels[item.kind]} {item.kind === "gems" ? `${item.amount}개` : item.kind === "super_days" ? `${item.amount}일` : "1개"}</strong> <span className="page-sub">{item.status === "applied" ? "지급 완료" : "처리 대기"} · {item.adminEmail} · {item.appliedAt ? new Date(item.appliedAt).toLocaleString("ko-KR") : "—"}</span><div className="page-sub">{item.reason}</div></div>)}</section>
  </div>;
}
