"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSession } from "@/features/auth/session";
import { ApiError, api, qs } from "@/shared/api/client";
import { useQuery } from "@/shared/api/use-query";
import { useConsole } from "@/widgets/console-context";

type EntryKind = "expense" | "telegram_card_revenue";
type ManualEntry = {
  id: string;
  kind: EntryKind;
  date: string;
  currency: string;
  amountMinor: number;
  category: string;
  reference: string;
  note: string;
  createdAt: string;
  createdBy: string;
  voidedAt: string | null;
  voidReason: string | null;
};
type ManualList = {
  items: ManualEntry[];
  total: number;
  page: number;
  pageSize: number;
  totalsByCurrency: { currency: string; expenseMinor: number; telegramCardRevenueMinor: number }[];
};
type StarsBalance = { status: "ready" | "unconfigured" | "unavailable"; amount: number | null; nanostarAmount: number | null; fetchedAt: string | null };
type StarsSales = { currency: "XTR"; grossStars: number; refundedStars: number; netStars: number; count: number; refundedCount: number; source: "telegram_stars_subscriptions" };
type CardTransfers = { currency: "UZS"; amountMinor: number; count: number; source: "approved_card_payment_orders" };

const EXPENSE_CATEGORIES = ["서버·인프라", "마케팅", "콘텐츠·외주", "운영비", "환불·기타"];

// Card-payment orders store whole Uzbek so'm. Keep manual UZS entries on the
// same scale even though Intl's ISO currency metadata reports two fractions.
function moneyDigits(currency: string) {
  if (currency === "UZS" || currency === "KRW") return 0;
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).resolvedOptions().maximumFractionDigits ?? 2;
}

function formatMoney(minor: number, currency: string) {
  try {
    const digits = moneyDigits(currency);
    return new Intl.NumberFormat("ko-KR", { style: "currency", currency, minimumFractionDigits: digits, maximumFractionDigits: digits }).format(minor / 10 ** digits);
  } catch {
    return `${minor.toLocaleString("ko-KR")} ${currency}`;
  }
}

function parseMinor(raw: string, currency: string) {
  let digits: number;
  try { digits = moneyDigits(currency); } catch { return null; }
  const pattern = digits === 0 ? /^\d+$/ : new RegExp(`^\\d+(?:\\.\\d{1,${digits}})?$`);
  if (!pattern.test(raw) || Number(raw) <= 0) return null;
  const [whole, fraction = ""] = raw.split(".");
  const minor = Number(whole) * 10 ** digits + Number(fraction.padEnd(digits, "0"));
  return Number.isSafeInteger(minor) && minor > 0 ? minor : null;
}

function errorText(error: unknown) {
  return error instanceof ApiError ? error.code : "네트워크 오류가 발생했습니다.";
}

export function LiveFinanceLedger() {
  const { range } = useConsole();
  const { can } = useSession();
  const canWrite = can("admin:manage");
  const [month, setMonth] = useState(range.to.slice(0, 7));
  const [page, setPage] = useState(1);
  const [kind, setKind] = useState<EntryKind>("expense");
  const [date, setDate] = useState(range.to);
  const [currency, setCurrency] = useState("KRW");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]!);
  const [reference, setReference] = useState("");
  const [note, setNote] = useState("");
  const [reason, setReason] = useState("");
  const [requestId, setRequestId] = useState(() => crypto.randomUUID());
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");
  const [voidId, setVoidId] = useState<string | null>(null);
  const [voidReason, setVoidReason] = useState("");

  useEffect(() => { setMonth(range.to.slice(0, 7)); setDate(range.to); setPage(1); }, [range.to]);

  const from = `${month}-01`;
  const to = new Date(Date.UTC(Number(month.slice(0, 4)), Number(month.slice(5, 7)), 0)).toISOString().slice(0, 10);
  const manual = useQuery<ManualList>(`/admin/revenue/manual${qs({ from, to, page, pageSize: 20 })}`, { refreshMs: 30_000 });
  const cards = useQuery<CardTransfers>(`/admin/revenue/card-transfers${qs({ from, to })}`, { refreshMs: 30_000 });
  const stars = useQuery<StarsBalance>("/admin/revenue/stars-balance", { refreshMs: 60_000 });
  const starSales = useQuery<StarsSales>(`/admin/revenue/stars-sales${qs({ from, to })}`, { refreshMs: 30_000 });
  const totals = manual.data?.totalsByCurrency ?? [];
  const currencies = new Set([...totals.map(row => row.currency), ...(cards.data ? ["UZS"] : [])]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setActionError(""); setActionSuccess("");
    const normalizedCurrency = kind === "telegram_card_revenue" ? "UZS" : currency.trim().toUpperCase();
    if (!/^[A-Z]{3}$/.test(normalizedCurrency)) return setActionError("통화는 KRW, UZS처럼 세 글자로 입력해 주세요.");
    const amountMinor = parseMinor(amount.trim(), normalizedCurrency);
    if (amountMinor === null) return setActionError("금액을 통화의 최소 단위에 맞게 입력해 주세요.");
    if (kind === "telegram_card_revenue" && !reference.trim()) return setActionError("예외 카드 매출에는 주문·입금 참조값이 필요합니다.");
    if (reason.trim().length < 5) return setActionError("입력 사유를 5자 이상 적어 주세요.");
    setSaving(true);
    try {
      await api.post("/admin/revenue/manual", { requestId, kind, date, currency: normalizedCurrency, amountMinor, category: category.trim(), reference: reference.trim(), note: note.trim(), reason: reason.trim() });
      setRequestId(crypto.randomUUID());
      setAmount(""); setReference(""); setNote(""); setReason("");
      setActionSuccess("내역을 저장했습니다. 월별 합계에 반영됐습니다.");
      setMonth(date.slice(0, 7)); setPage(1);
      manual.reload();
    } catch (error) { setActionError(errorText(error)); }
    finally { setSaving(false); }
  };

  const voidEntry = async () => {
    if (!voidId || voidReason.trim().length < 5) return setActionError("취소 사유를 5자 이상 적어 주세요.");
    setSaving(true); setActionError(""); setActionSuccess("");
    try {
      await api.post(`/admin/revenue/manual/${encodeURIComponent(voidId)}/void`, { reason: voidReason.trim() });
      setVoidId(null); setVoidReason("");
      setActionSuccess("내역을 취소했습니다. 원본 기록과 감사 로그는 유지됩니다.");
      manual.reload();
    } catch (error) { setActionError(errorText(error)); }
    finally { setSaving(false); }
  };

  const starValue = stars.data?.status === "ready" && stars.data.amount !== null
    ? `${(stars.data.amount + (stars.data.nanostarAmount ?? 0) / 1_000_000_000).toLocaleString("ko-KR", { maximumFractionDigits: 9 })} Stars`
    : stars.loading ? "불러오는 중…" : "조회 불가";

  return <section id="revenue-finance" className="rev-finance-section" aria-label="텔레그램과 운영비 관리">
    <div className="admin-page-head"><div><h2>텔레그램 · 운영 지출</h2><p>승인된 카드 입금은 자동 집계하고, 운영비와 시스템 밖 예외 거래만 직접 기록합니다.</p></div><span className="admin-pill blue">실제 저장 데이터</span></div>
    <div className="admin-grid four rev-finance-kpis">
      <section className="admin-card admin-kpi"><span className="admin-kpi-label">봇 보유 Stars</span><div className="admin-kpi-value">{starValue}</div><span className="admin-kpi-note">{stars.data?.status === "unconfigured" ? "봇 연결이 설정되지 않았습니다" : stars.error || stars.data?.status === "unavailable" ? "Telegram 연결을 확인해 주세요" : stars.data?.fetchedAt ? `조회 ${new Date(stars.data.fetchedAt).toLocaleString("ko-KR")}` : "현금 매출과 합산하지 않습니다"}</span></section>
      <section className="admin-card admin-kpi"><span className="admin-kpi-label">{month} Stars 결제</span><div className="admin-kpi-value">{starSales.loading ? "불러오는 중…" : starSales.error ? "조회 실패" : `${(starSales.data?.netStars ?? 0).toLocaleString("ko-KR")} Stars`}</div><span className="admin-kpi-note">{starSales.data ? `결제 ${starSales.data.count.toLocaleString("ko-KR")}건 · 환불 ${starSales.data.refundedStars.toLocaleString("ko-KR")} Stars` : "결제 내역 기준 · 현금 환산 없음"}</span></section>
      <section className="admin-card admin-kpi"><span className="admin-kpi-label">{month} 승인 카드 입금</span><div className="admin-kpi-value">{cards.loading ? "불러오는 중…" : cards.error ? "조회 실패" : formatMoney(cards.data?.amountMinor ?? 0, "UZS")}</div><span className="admin-kpi-note">{cards.data ? `${cards.data.count.toLocaleString("ko-KR")}건 · 승인일 우즈베키스탄 시간 기준` : "승인 주문 자동 집계"}</span></section>
      <section className="admin-card admin-kpi"><span className="admin-kpi-label">{month} 직접 입력한 지출</span><div className="admin-kpi-value">{manual.loading ? "불러오는 중…" : manual.error ? "조회 실패" : totals.length === 1 ? formatMoney(totals[0]!.expenseMinor, totals[0]!.currency) : `${totals.reduce((count, row) => count + Number(row.expenseMinor > 0), 0)}개 통화`}</div><span className="admin-kpi-note">통화별로만 합산 · Play 수익/Stars와 환산하지 않음</span></section>
    </div>
    <section className="admin-card"><div className="admin-card-head rev-chart-head"><div><h3>월별 지출 · 카드 매출</h3><p className="rev-section-sub">카드 매출은 승인된 Telegram 카드 입금과 예외 수동 입력을 구분합니다.</p></div><label className="rev-month-filter">집계 월 <input type="month" value={month} onChange={event => { if (/^\d{4}-(0[1-9]|1[0-2])$/.test(event.target.value)) { setMonth(event.target.value); setPage(1); } }}/></label></div>
      {manual.error || cards.error ? <div className="admin-empty">월별 내역을 불러오지 못했습니다. <button type="button" onClick={() => { manual.reload(); cards.reload(); }}>다시 시도</button></div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>통화</th><th className="right">승인 카드 입금</th><th className="right">예외 카드 매출</th><th className="right">직접 입력 지출</th><th className="right">확인된 카드 매출 − 지출</th></tr></thead><tbody>{[...currencies].sort().map(code => { const row = totals.find(item => item.currency === code); const auto = code === "UZS" ? cards.data?.amountMinor ?? 0 : 0; const manualCard = row?.telegramCardRevenueMinor ?? 0; const expense = row?.expenseMinor ?? 0; const awaitingCard = code === "UZS" && !cards.data; return <tr key={code}><td><strong>{code}</strong></td><td className="right">{code === "UZS" ? awaitingCard ? "집계 중…" : formatMoney(auto, code) : "—"}</td><td className="right">{formatMoney(manualCard, code)}</td><td className="right bm-negative">{formatMoney(expense, code)}</td><td className="right"><strong>{awaitingCard ? "집계 중…" : formatMoney(auto + manualCard - expense, code)}</strong></td></tr>; })}</tbody></table>{!currencies.size && <div className="admin-empty">{manual.loading || cards.loading ? "집계 중…" : "이 달의 기록이 없습니다."}</div>}</div>}
      <p className="rev-card-note">마지막 차액은 표시된 카드 매출과 직접 입력 지출만 계산한 운영 참고값입니다. Stars 결제는 구독 결제 내역의 XTR 금액이며 환불은 원결제 월에서 차감합니다. Google Play 수익, Stars 현금화, 세금·카드 입금의 실제 은행 정산은 포함하지 않으므로 전체 순이익이나 확정 정산액이 아닙니다.</p>
    </section>
    <div className="admin-grid rev-finance-grid">
      <section className="admin-card"><div className="admin-card-head"><div><h3>직접 기록</h3><p className="rev-section-sub">월 지출 또는 기존 승인 주문에 없는 카드 매출</p></div></div>{canWrite ? <form className="rev-manual-form" onSubmit={submit}>
        <label>구분<select value={kind} onChange={event => { const next = event.target.value as EntryKind; setKind(next); setCurrency(next === "expense" ? "KRW" : "UZS"); setCategory(next === "expense" ? EXPENSE_CATEGORIES[0]! : "예외 카드 입금"); }}><option value="expense">운영 지출</option><option value="telegram_card_revenue">텔레그램 카드 예외 매출</option></select></label>
        <label>발생일<input type="date" required value={date} onChange={event => setDate(event.target.value)}/></label>
        <label>통화<input required maxLength={3} value={kind === "telegram_card_revenue" ? "UZS" : currency} disabled={kind === "telegram_card_revenue"} onChange={event => setCurrency(event.target.value.toUpperCase())} placeholder="KRW"/></label>
        <label>금액<input required inputMode="decimal" value={amount} onChange={event => setAmount(event.target.value)} placeholder={kind === "expense" ? "예: 50000" : "예: 149000"}/></label>
        <label>분류{kind === "expense" ? <select value={category} onChange={event => setCategory(event.target.value)}>{EXPENSE_CATEGORIES.map(item => <option key={item}>{item}</option>)}</select> : <input required value={category} onChange={event => setCategory(event.target.value)} maxLength={80}/>}</label>
        <label>참조값 {kind === "telegram_card_revenue" ? "(필수)" : "(선택)"}<input required={kind === "telegram_card_revenue"} value={reference} onChange={event => setReference(event.target.value)} maxLength={100} placeholder="영수증·입금 거래 ID"/></label>
        <label className="rev-form-wide">메모<input value={note} onChange={event => setNote(event.target.value)} maxLength={500} placeholder="근거·내역 요약"/></label>
        <label className="rev-form-wide">입력 사유 (5자 이상)<input required minLength={5} value={reason} onChange={event => setReason(event.target.value)} maxLength={500} placeholder="예: 10월 서버 비용 청구서 반영"/></label>
        <p className="rev-form-wide rev-section-sub">직접 기록은 실제 송금·결제를 실행하지 않습니다. 근거 자료를 확인한 뒤 입력하세요.</p>
        <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? "저장 중…" : "내역 저장"}</button>
      </form> : <div className="admin-empty">직접 기록은 최고 관리자만 가능합니다.</div>}</section>
      <section className="admin-card"><div className="admin-card-head"><div><h3>{month} 직접 기록 내역</h3><p className="rev-section-sub">{manual.data?.total ?? 0}건 · 취소 기록은 감사 추적을 위해 남습니다.</p></div><button type="button" onClick={manual.reload}>새로고침</button></div>
        {manual.error ? <div className="admin-empty">내역을 불러오지 못했습니다: {manual.error}</div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>날짜 · 구분</th><th>분류 / 참조</th><th className="right">금액</th><th>상태</th></tr></thead><tbody>{manual.data?.items.map(item => <tr key={item.id}><td><strong>{item.date}</strong><small>{item.kind === "expense" ? "운영 지출" : "카드 예외 매출"}</small></td><td>{item.category}<small>{item.reference || item.note || "—"}</small></td><td className="right">{formatMoney(item.amountMinor, item.currency)}</td><td>{item.voidedAt ? <span className="admin-pill warn">취소됨</span> : canWrite ? <button type="button" onClick={() => { setVoidId(item.id); setVoidReason(""); setActionError(""); }}>취소</button> : <span className="admin-pill good">반영 중</span>}</td></tr>)}</tbody></table>{!manual.loading && !manual.data?.items.length && <div className="admin-empty">이 달의 직접 기록이 없습니다.</div>}</div>}
        {(manual.data?.total ?? 0) > 20 && <div className="rev-pagination"><button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)}>이전</button><span>{page} / {Math.ceil((manual.data?.total ?? 0) / 20)}</span><button type="button" disabled={page * 20 >= (manual.data?.total ?? 0)} onClick={() => setPage(page + 1)}>다음</button></div>}
      </section>
    </div>
    {(actionError || actionSuccess) && <p role={actionError ? "alert" : "status"} className={actionError ? "rev-action-error" : "rev-action-success"}>{actionError || actionSuccess}</p>}
    {voidId && <div className="admin-modal-backdrop" onMouseDown={() => setVoidId(null)}><section className="admin-modal" role="dialog" aria-modal="true" aria-label="직접 기록 취소" onMouseDown={event => event.stopPropagation()}><h3>기록 취소</h3><p>원본과 감사 기록은 유지되지만 월별 합계에서는 제외됩니다.</p><label>취소 사유<input autoFocus value={voidReason} minLength={5} maxLength={500} onChange={event => setVoidReason(event.target.value)} placeholder="5자 이상 입력"/></label>{actionError && <p role="alert" className="rev-action-error">{actionError}</p>}<div className="admin-modal-actions"><button type="button" className="btn" onClick={() => setVoidId(null)}>돌아가기</button><button type="button" className="btn btn-primary" disabled={saving || voidReason.trim().length < 5} onClick={voidEntry}>취소 확정</button></div></section></div>}
  </section>;
}
