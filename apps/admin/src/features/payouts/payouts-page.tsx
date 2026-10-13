"use client";

import { useState } from "react";
import { ApiError, api, qs } from "@/shared/api/client";
import { useQuery } from "@/shared/api/use-query";
import { useSession } from "@/features/auth/session";
import { ErrorState } from "@/shared/ui/primitives";
import { full } from "@/shared/ui/format";
import styles from "./payouts.module.css";

type Status = "pending" | "processing" | "completed" | "rejected" | "cancelled";
type Filter = "open" | Status | "";
type RejectReason = "invalid_card" | "name_mismatch" | "suspicious" | "other";

interface PayoutUser {
  id: string;
  nickname: string;
  username: string;
  email: string;
  provider: string;
  providerId: string;
  phoneLast4: string;
  gems: number;
  appLanguage: string;
  joinedAt: string | null;
}

interface Payout {
  id: string;
  gems: number;
  amountUzs: number;
  brand: string;
  cardNumber: string;
  cardLast4: string;
  cardHolder: string;
  status: Status;
  open: boolean;
  rejectReason: RejectReason | null;
  adminNote: string;
  handledBy: { adminId: string; email: string } | null;
  createdAt: string | null;
  processingAt: string | null;
  completedAt: string | null;
  rejectedAt: string | null;
  cancelledAt: string | null;
  refunded: boolean;
  user: PayoutUser | null;
}

type PayoutDetail = Payout & { history: Omit<Payout, "user">[] };

interface PayoutPage {
  items: Payout[];
  total: number;
  page: number;
  pageSize: number;
  counts: Partial<Record<Status, number>>;
  minGems: number;
}

const STATUS_LABEL: Record<Status, string> = {
  pending: "접수",
  processing: "송금 중",
  completed: "송금 완료",
  rejected: "반려",
  cancelled: "유저 취소",
};
const STATUS_TONE: Record<Status, string> = {
  pending: "warn",
  processing: "blue",
  completed: "good",
  rejected: "bad",
  cancelled: "",
};
const BRAND_LABEL: Record<string, string> = { uzcard: "Uzcard", humo: "Humo", visa: "Visa", mastercard: "Mastercard" };
const REASON_LABEL: Record<RejectReason, string> = {
  invalid_card: "카드 번호가 틀림 · 송금 불가",
  name_mismatch: "카드 주인 이름이 다름",
  suspicious: "부정 획득 의심",
  other: "기타",
};
const ERROR_TEXT: Record<string, string> = {
  PAYOUT_STATE_CHANGED: "그 사이 상태가 바뀌었어요 (다른 관리자 처리 또는 유저 취소). 최신 상태로 다시 불러왔어요.",
  PAYOUT_NOT_FOUND: "요청을 찾을 수 없어요.",
  PAYOUT_BAD_STATUS: "바꿀 수 없는 상태예요.",
};
const FILTERS: { value: Filter; label: string; count?: (c: PayoutPage["counts"]) => number }[] = [
  { value: "open", label: "처리할 것", count: c => (c.pending ?? 0) + (c.processing ?? 0) },
  { value: "pending", label: "접수", count: c => c.pending ?? 0 },
  { value: "processing", label: "송금 중", count: c => c.processing ?? 0 },
  { value: "completed", label: "송금 완료", count: c => c.completed ?? 0 },
  { value: "rejected", label: "반려", count: c => c.rejected ?? 0 },
  { value: "cancelled", label: "유저 취소", count: c => c.cancelled ?? 0 },
  { value: "", label: "전체" },
];

const when = (value: string | null | undefined) => (value ? new Date(value).toLocaleString("ko-KR") : "—");
const som = (n: number) => `${full(n)} so'm`;
/** 열린 건은 전체 번호, 끝난 건은 서버가 이미 가려서 준다 */
const groupCard = (card: string) => (/^\d{16}$/.test(card) ? card.replace(/(\d{4})(?=\d)/g, "$1 ") : card);
const userName = (user: PayoutUser | null) =>
  user ? user.nickname || (user.username ? `@${user.username}` : "") || user.email || user.id : "삭제된 유저";
const errorText = (error: unknown) =>
  error instanceof ApiError ? ERROR_TEXT[error.code] ?? error.code : error instanceof Error ? error.message : "알 수 없는 오류";

export function PayoutsPage() {
  const { can } = useSession();
  const [filter, setFilter] = useState<Filter>("open");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const list = useQuery<PayoutPage>(`/admin/gem-payouts${qs({ status: filter, page, pageSize: 20 })}`);

  if (!can("payouts:read")) return <div className="admin-card admin-empty">출금 요청을 볼 권한이 없습니다.</div>;
  const data = list.data;
  const pageCount = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h2>보석 출금 요청</h2>
          <p>유저가 상점에서 신청한 보석 → 카드 출금. 직접 송금한 뒤 상태를 바꾸면 유저에게 알림(앱·푸시·텔레그램)이 갑니다. 신청 순간 보석은 이미 빠져 있고, 반려하면 자동으로 돌려줍니다.</p>
        </div>
        <span className="admin-pill blue">{data ? `최소 ${full(data.minGems)} 보석 · 1 보석 = 1 so'm` : "실데이터"}</span>
      </div>

      <nav className="admin-tabs" aria-label="출금 상태">
        {FILTERS.map(item => (
          <button
            key={item.value || "all"}
            type="button"
            className={filter === item.value ? "is-active" : ""}
            onClick={() => { setFilter(item.value); setPage(1); }}
          >
            {item.label}
            {data && item.count && <span className={styles.tabCount}>{full(item.count(data.counts))}</span>}
          </button>
        ))}
      </nav>

      <section className="admin-card">
        {list.error ? (
          <ErrorState code={list.error} onRetry={list.reload} />
        ) : list.loading || !data ? (
          <div className="skeleton" style={{ height: 300 }} />
        ) : (
          <>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>신청</th><th>유저</th><th>송금액</th><th>카드</th><th>받는 사람</th><th>상태</th></tr>
                </thead>
                <tbody>
                  {data.items.map(item => (
                    <tr key={item.id} onClick={() => setSelectedId(item.id)} style={{ cursor: "pointer" }}>
                      <td>{when(item.createdAt)}</td>
                      <td><strong>{userName(item.user)}</strong><br /><small>{item.user?.provider ?? ""}</small></td>
                      <td><strong className="tnum">{som(item.amountUzs)}</strong><br /><small>{full(item.gems)} 보석</small></td>
                      <td className="tnum">{BRAND_LABEL[item.brand] ?? item.brand}<br /><small>•••• {item.cardLast4}</small></td>
                      <td>{item.cardHolder}</td>
                      <td><span className={`admin-pill ${STATUS_TONE[item.status]}`}>{STATUS_LABEL[item.status]}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!data.items.length && <div className="admin-empty">{filter === "open" ? "처리할 출금 요청이 없어요." : "일치하는 요청이 없습니다."}</div>}
            </div>
            <div className="admin-toolbar">
              <span>{page} / {pageCount}페이지 · {full(data.total)}건</span>
              <button type="button" disabled={page <= 1} onClick={() => setPage(value => value - 1)}>이전</button>
              <button type="button" disabled={page >= pageCount} onClick={() => setPage(value => value + 1)}>다음</button>
              <button type="button" onClick={list.reload}>새로고침</button>
            </div>
          </>
        )}
      </section>

      {selectedId && (
        <PayoutDrawer
          id={selectedId}
          canWrite={can("payouts:write")}
          onClose={() => setSelectedId(null)}
          onChanged={list.reload}
        />
      )}
    </div>
  );
}

function PayoutDrawer({ id, canWrite, onClose, onChanged }: { id: string; canWrite: boolean; onClose: () => void; onChanged: () => void }) {
  const detail = useQuery<PayoutDetail>(`/admin/gem-payouts/${id}`, { refreshMs: 0 });
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ tone: "good" | "bad"; text: string } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState<RejectReason>("invalid_card");
  const [note, setNote] = useState("");
  const item = detail.data;

  async function copy(key: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(current => (current === key ? null : current)), 1500);
    } catch {
      setNotice({ tone: "bad", text: "복사하지 못했어요. 직접 선택해서 복사해 주세요." });
    }
  }

  async function change(status: "processing" | "completed" | "rejected") {
    if (!item || busy) return;
    const ask =
      status === "processing"
        ? "송금을 시작할까요? 이 순간부터 유저는 신청을 취소할 수 없어요."
        : status === "completed"
          ? `${item.cardHolder} (${BRAND_LABEL[item.brand] ?? item.brand} •••• ${item.cardLast4}) 에게 ${som(item.amountUzs)} 송금을 끝냈나요?\n\n완료로 바꾸면 유저에게 알림이 가고 되돌릴 수 없어요.`
          : `반려할까요? (${REASON_LABEL[reason]})\n\n${full(item.gems)} 보석이 유저에게 돌아가고 알림이 가요. 되돌릴 수 없어요.`;
    if (!window.confirm(ask)) return;
    setBusy(true);
    setNotice(null);
    try {
      await api.post(`/admin/gem-payouts/${id}/status`, {
        status,
        ...(status === "rejected" ? { reason } : {}),
        ...(note.trim() ? { note: note.trim() } : {}),
      });
      setNotice({
        tone: "good",
        text: status === "processing" ? "송금 중으로 바꿨어요." : status === "completed" ? "송금 완료 처리했고 유저에게 알렸어요." : "반려했고 보석을 돌려준 뒤 유저에게 알렸어요.",
      });
      setRejecting(false);
      setNote("");
    } catch (error) {
      setNotice({ tone: "bad", text: errorText(error) });
    } finally {
      setBusy(false);
      detail.reload();
      onChanged();
    }
  }

  const copyRow = (key: string, label: string, shown: string, value: string, mono = false) => (
    <div className={styles.copyRow}>
      <div>
        <small>{label}</small>
        <strong className={mono ? styles.mono : undefined}>{shown}</strong>
      </div>
      {item?.open && (
        <button type="button" className="btn btn-ghost" onClick={() => void copy(key, value)}>
          {copied === key ? "복사됨 ✓" : "복사"}
        </button>
      )}
    </div>
  );

  return (
    <div className="admin-drawer-backdrop" onMouseDown={onClose}>
      <aside className="admin-drawer" onMouseDown={event => event.stopPropagation()}>
        <button type="button" className="btn btn-ghost" onClick={onClose}>← 닫기</button>
        {detail.error ? (
          <ErrorState code={detail.error} onRetry={detail.reload} />
        ) : detail.loading && !item ? (
          <div className="skeleton" style={{ height: 300, marginTop: 20 }} />
        ) : item ? (
          <>
            <div className={styles.hero}>
              <span className={`admin-pill ${STATUS_TONE[item.status]}`}>{STATUS_LABEL[item.status]}</span>
              <div className={`${styles.amount} tnum`}>{som(item.amountUzs)}</div>
              <p className="page-sub">{full(item.gems)} 보석 · 신청 {when(item.createdAt)}</p>
            </div>

            <h4 className={styles.sectionTitle}>송금 정보</h4>
            <div className={styles.transfer}>
              {copyRow("card", "카드 번호", groupCard(item.cardNumber), item.cardNumber, true)}
              {copyRow("holder", "받는 사람 (카드 이름)", item.cardHolder, item.cardHolder)}
              {copyRow("amount", "보낼 금액", som(item.amountUzs), String(item.amountUzs))}
              <div className={styles.copyRow}>
                <div><small>카드 종류</small><strong>{BRAND_LABEL[item.brand] ?? item.brand}</strong></div>
              </div>
            </div>
            {!item.open && <p className="page-sub">끝난 요청이라 카드 번호는 가려서 보관해요.</p>}
            {item.open && canWrite && (
              <section className={styles.actions}>
                <label className="admin-field">
                  관리자 메모 (선택 · 유저에게 안 보임)
                  <textarea value={note} maxLength={500} onChange={event => setNote(event.target.value)} placeholder="송금 영수증 번호 등" />
                </label>
                {rejecting ? (
                  <>
                    <label className="admin-field">
                      반려 사유 (유저에게 보여요)
                      <select value={reason} onChange={event => setReason(event.target.value as RejectReason)}>
                        {(Object.keys(REASON_LABEL) as RejectReason[]).map(key => <option key={key} value={key}>{REASON_LABEL[key]}</option>)}
                      </select>
                    </label>
                    <div className={styles.buttons}>
                      <button type="button" className="btn btn-ghost" disabled={busy} onClick={() => setRejecting(false)}>취소</button>
                      <button type="button" className={`btn ${styles.danger}`} disabled={busy} onClick={() => void change("rejected")}>
                        {busy ? "처리 중…" : "반려하고 보석 돌려주기"}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className={styles.buttons}>
                    <button type="button" className={`btn btn-ghost ${styles.dangerGhost}`} disabled={busy} onClick={() => setRejecting(true)}>반려</button>
                    {item.status === "pending" && (
                      <button type="button" className="btn btn-ghost" disabled={busy} onClick={() => void change("processing")}>송금 시작</button>
                    )}
                    <button type="button" className={`btn ${styles.success}`} disabled={busy} onClick={() => void change("completed")}>
                      {busy ? "처리 중…" : "송금 완료"}
                    </button>
                  </div>
                )}
              </section>
            )}
            {item.open && !canWrite && <p className="page-sub" style={{ marginTop: 18 }}>상태를 바꿀 권한이 없어요.</p>}
            {notice && <p role="status" className={`admin-pill ${notice.tone}`} style={{ marginTop: 14 }}>{notice.text}</p>}


            <h4 className={styles.sectionTitle}>유저</h4>
            <div className="admin-detail-grid">
              {[
                ["닉네임", item.user?.nickname || "—"],
                ["아이디", item.user?.username ? `@${item.user.username}` : "—"],
                ["이메일", item.user?.email || "—"],
                ["가입 경로", item.user ? `${item.user.provider || "—"}${item.user.providerId ? ` · ${item.user.providerId}` : ""}` : "—"],
                ["전화 끝자리", item.user?.phoneLast4 ? `•••• ${item.user.phoneLast4}` : "—"],
                ["현재 보석", item.user ? full(item.user.gems) : "—"],
                ["앱 언어", item.user?.appLanguage || "—"],
                ["가입일", when(item.user?.joinedAt)],
              ].map(([label, value]) => (
                <div key={label}><small>{label}</small><strong className={styles.wrap}>{value}</strong></div>
              ))}
            </div>
            {item.user && <p className="page-sub" style={{ marginTop: 8 }}>유저 ID <span className={styles.mono}>{item.user.id}</span></p>}

            <h4 className={styles.sectionTitle}>처리 기록</h4>
            <ol className={styles.timeline}>
              <li><span>신청</span>{when(item.createdAt)}</li>
              {item.processingAt && <li><span>송금 시작</span>{when(item.processingAt)}</li>}
              {item.completedAt && <li><span>송금 완료</span>{when(item.completedAt)}</li>}
              {item.rejectedAt && <li><span>반려</span>{when(item.rejectedAt)} · {item.rejectReason ? REASON_LABEL[item.rejectReason] : "—"}</li>}
              {item.cancelledAt && <li><span>유저 취소</span>{when(item.cancelledAt)}</li>}
              {item.refunded && <li><span>보석 반환</span>{full(item.gems)} 보석 돌려줌</li>}
              {item.handledBy && <li><span>처리자</span>{item.handledBy.email}</li>}
              {item.adminNote && <li><span>메모</span>{item.adminNote}</li>}
            </ol>

            {item.history.length > 0 && (
              <>
                <h4 className={styles.sectionTitle}>이 유저의 다른 신청</h4>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead><tr><th>신청</th><th>금액</th><th>카드</th><th>상태</th></tr></thead>
                    <tbody>
                      {item.history.map(h => (
                        <tr key={h.id}>
                          <td>{when(h.createdAt)}</td>
                          <td className="tnum">{som(h.amountUzs)}</td>
                          <td className="tnum">{BRAND_LABEL[h.brand] ?? h.brand} •••• {h.cardLast4}<br /><small>{h.cardHolder}</small></td>
                          <td><span className={`admin-pill ${STATUS_TONE[h.status]}`}>{STATUS_LABEL[h.status]}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        ) : null}
      </aside>
    </div>
  );
}
