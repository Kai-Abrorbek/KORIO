"use client";

import { useState } from "react";
import { api } from "@/shared/api/client";

interface BatchResult { requested: number; accepted: number; mailed?: number; notAccepted: number; failed: number; results: { userId: string; accepted: boolean; mailed?: boolean; error: boolean }[] }

export function SelectedPushPanel({ recipients, onClear, onResult }: { recipients: Map<string, string>; onClear: () => void; onResult: (requestedIds: string[], remainingIds: string[]) => void }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [reason, setReason] = useState("");
  /** 푸시가 닿지 않는 사람에게 메일로도 (메일이 있고 수신 거부 안 한 사람만) */
  const [email, setEmail] = useState(true);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [requestPayload, setRequestPayload] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  function changed(setter: (value: string) => void, value: string) {
    setter(value); setRequestId(null); setMessage("");
  }

  async function send() {
    if (busy || !recipients.size || recipients.size > 100 || !title.trim() || !body.trim() || reason.trim().length < 5) return;
    if (!window.confirm(`체크한 ${recipients.size}명에게 동일한 알림을 발송할까요? 발송 후 취소할 수 없습니다.`)) return;
    const requestedIds = [...recipients.keys()];
    const payload = JSON.stringify({ userIds: requestedIds, title: title.trim(), body: body.trim(), reason: reason.trim(), email });
    const key = requestId && requestPayload === payload ? requestId : crypto.randomUUID();
    setRequestId(key); setRequestPayload(payload); setBusy(true); setMessage("");
    try {
      const result = await api.post<BatchResult>("/admin/users/push/batch", {
        requestId: key, userIds: requestedIds, title: title.trim(), body: body.trim(), reason: reason.trim(), email,
      });
      const remainingIds = result.results.filter(item => !item.accepted && !item.mailed).map(item => item.userId);
      setMessage(`${result.requested}명 중 푸시 접수 ${result.accepted}명 · 메일 ${result.mailed ?? 0}명 · 미접수 ${result.notAccepted}명 · 오류 ${result.failed}명. ${remainingIds.length ? "미접수 대상은 선택 상태로 남겼습니다. 재발송 전 실제 수신 여부와 기기 토큰·알림 설정을 확인하세요. " : ""}기기 도착은 별도 영수증 확인 전까지 확정되지 않습니다.`);
      setRequestId(null); onResult(requestedIds, remainingIds);
      if (!result.notAccepted && !result.failed) { setTitle(""); setBody(""); setReason(""); }
    } catch (error) {
      setMessage(`일괄 발송 요청 실패: ${error instanceof Error ? error.message : "알 수 없는 오류"}. 같은 요청으로 재시도할 수 있습니다.`);
    } finally { setBusy(false); }
  }

  return <section className="admin-card" style={{ padding: 20, display: "grid", gap: 10 }}>
    <div><h3>선택 사용자 알림 발송</h3><p className="page-sub">목록에서 체크한 사용자 {recipients.size}명에게 같은 알림을 보냅니다. 페이지를 넘겨도 선택은 유지됩니다 (최대 100명). 앱 알림 허용과 유효한 기기 토큰이 필요합니다.</p></div>
    {recipients.size > 0 && <div className="page-sub" aria-label="선택한 사용자">선택: {[...recipients.values()].slice(0, 5).join(", ")}{recipients.size > 5 ? ` 외 ${recipients.size - 5}명` : ""}</div>}
    <input aria-label="알림 제목" placeholder="알림 제목" maxLength={80} value={title} onChange={event => changed(setTitle, event.target.value)} />
    <textarea aria-label="알림 내용" placeholder="알림 내용" maxLength={500} value={body} onChange={event => changed(setBody, event.target.value)} style={{ minHeight: 90 }} />
    <input aria-label="발송 사유" placeholder="발송 사유 (5자 이상, 감사 기록에 남음)" maxLength={500} value={reason} onChange={event => changed(setReason, event.target.value)} />
    <label className="page-sub" style={{ display: "flex", alignItems: "center", gap: 8 }}><input type="checkbox" checked={email} onChange={event => { setEmail(event.target.checked); setRequestId(null); }} style={{ width: "auto" }} />이메일로도 보내기 — 푸시가 닿지 않는 사람(알림 꺼짐·토큰 없음)에게 같은 내용을 메일로 보냅니다. 메일이 없거나 수신 거부한 사람은 제외.</label>
    <div className="admin-toolbar"><button type="button" className="btn btn-primary" disabled={busy || !recipients.size || recipients.size > 100 || !title.trim() || !body.trim() || reason.trim().length < 5} onClick={send}>{busy ? "발송 중…" : `${recipients.size}명에게 발송`}</button><button type="button" disabled={busy || !recipients.size} onClick={onClear}>선택 해제</button></div>
    {message && <p role="status" className="page-sub">{message}</p>}
  </section>;
}
