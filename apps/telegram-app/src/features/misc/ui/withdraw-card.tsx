"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";

import { ApiError } from "../../../shared/api/client";
import { uzt } from "../../../shared/i18n/uz-text";
import { alertDialog, confirmDialog } from "../../../shared/telegram/dialogs";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { cancelGemPayout, createGemPayout, getGemPayouts } from "../api/misc";
import {
  PAYOUT_BRANDS,
  brandLabel,
  cardDigits,
  detectPayoutBrand,
  formatCardInput,
  formatHolderInput,
  normalizeHolder,
  payoutCardProblem,
  type GemPayout,
  type PayoutBrand,
  type PayoutOverview,
  type PayoutStatus,
} from "../model/payout";
import styles from "./shop-screen.module.css";

/**
 * 보석 출금 — 모바일 WithdrawCard 와 같은 화면·같은 규칙.
 *
 * 신청하면 서버가 보석을 바로 빼고 요청을 남긴다. 운영자가 어드민(출금 요청)에서 직접 송금하고
 * "송금 완료"를 누르면 알림함·텔레그램 봇 메시지가 온다. 반려하면 보석이 돌아온다.
 * 최소 수량은 서버(어드민 숫자 설정)가 정한다.
 */
const fmt = (n: number) => n.toLocaleString("en-US");
const dateLabel = (iso: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
};

const STATUS_COLOR: Record<PayoutStatus, string> = {
  pending: "#E2A83A",
  processing: "#776ee2",
  completed: "#1DBB7F",
  rejected: "#E5379B",
  cancelled: "#A6A6B3",
};
const STATUS_ICON: Record<PayoutStatus, IoniconName> = {
  pending: "time",
  processing: "paper-plane",
  completed: "checkmark",
  rejected: "arrow-undo",
  cancelled: "close",
};
const STEPS = ["requested", "sending", "done"] as const;

function haptic(kind: "select" | "light" | "success" | "error") {
  const feedback = window.Telegram?.WebApp.HapticFeedback;
  if (kind === "select") feedback?.selectionChanged?.();
  else if (kind === "light") feedback?.impactOccurred?.("medium");
  else feedback?.notificationOccurred?.(kind);
}

/** 문구 하나 = 텍스트 노드 하나 (번역기가 통째로 맞춘다). data-i18n 으로 키를 콕 집는다 */
function T({
  as: Tag = "span",
  className,
  k,
  vars,
}: {
  as?: "span" | "em";
  className?: string;
  k: string;
  vars?: Record<string, string | number>;
}) {
  return (
    <Tag className={className} data-i18n={k}>
      {uzt(k, vars)}
    </Tag>
  );
}

export function WithdrawCard({ gems, onGemsChange }: { gems: number; onGemsChange: (gems: number) => void }) {
  const { request } = useTelegramAuth();
  const [overview, setOverview] = useState<PayoutOverview | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [brand, setBrand] = useState<PayoutBrand | null>(null);
  const [card, setCard] = useState("");
  const [holder, setHolder] = useState("");
  const [holderDone, setHolderDone] = useState(false);
  const [amount, setAmount] = useState("");

  const load = useCallback(() => {
    getGemPayouts(request)
      .then((next) => {
        setOverview(next);
        setLoadFailed(false);
      })
      .catch(() => setLoadFailed(true));
  }, [request]);

  // 처음 + 다시 보일 때마다 — 운영자가 그 사이 처리했을 수 있다
  useEffect(() => {
    load();
    const onVisible = () => {
      if (document.visibilityState === "visible") load();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [load]);

  /** 서버는 에러 코드만 준다 — 우즈벡어 원문을 꺼내면 팝업이 지금 언어로 옮긴다 */
  const explain = (error: unknown) => {
    const code = error instanceof ApiError ? error.code : "UNKNOWN";
    const key = `shop.errors.${code}`;
    const text = uzt(key, { n: fmt(overview?.minGems ?? 0) });
    return text === key ? uzt("shop.errors.UNKNOWN") : text;
  };

  // ── 입력 검사 (모바일과 같다) ──
  const digits = cardDigits(card);
  const detected = detectPayoutBrand(digits);
  const cardProblem = payoutCardProblem(digits, brand);
  const cardError =
    digits.length === 16 && cardProblem
      ? cardProblem
      : detected && brand && detected !== brand
        ? "BRAND_MISMATCH"
        : null;
  const cardOk = Boolean(brand) && !cardProblem;

  const holderName = normalizeHolder(holder);
  const holderBad = holder.trim().length > 0 && !holderName && (holderDone || /[^A-Z '.-]/.test(holder));

  const minGems = overview?.minGems ?? null;
  const somPerGem = overview?.somPerGem ?? 1;
  const amountNum = Number(amount) || 0;
  const tooSmall = minGems !== null && amountNum > 0 && amountNum < minGems;
  const tooBig = amountNum > gems;
  const ready = Boolean(overview) && !busy && cardOk && Boolean(holderName) && amountNum > 0 && !tooSmall && !tooBig;

  const onCardChange = (raw: string) => {
    const next = formatCardInput(raw);
    setCard(next);
    const found = detectPayoutBrand(cardDigits(next));
    if (found && found !== brand) {
      setBrand(found);
      haptic("select");
    }
  };

  const submit = async () => {
    if (!ready || !brand || !holderName) return;
    haptic("light");
    const ok = await confirmDialog(
      [
        uzt("shop.payout.confirmTitle"),
        uzt("shop.payout.confirmAmount", { amount: fmt(amountNum * somPerGem), gems: fmt(amountNum) }),
        `${brandLabel(brand)} •••• ${digits.slice(-4)} · ${holderName}`,
        "",
        uzt("shop.payout.confirmNote"),
      ].join("\n"),
    );
    if (!ok) return;
    setBusy(true);
    try {
      const res = await createGemPayout(request, { brand, cardHolder: holderName, cardNumber: digits, gems: amountNum });
      haptic("success");
      setOverview((cur) =>
        cur ? { ...cur, gems: res.gems, open: res.request, recent: [res.request, ...cur.recent].slice(0, 5) } : cur,
      );
      setCard("");
      setHolder("");
      setHolderDone(false);
      setAmount("");
      setBrand(null);
      onGemsChange(res.gems);
    } catch (error) {
      haptic("error");
      void alertDialog(explain(error));
      load();
    } finally {
      setBusy(false);
    }
  };

  const cancel = async (target: GemPayout) => {
    if (busy) return;
    const ok = await confirmDialog(
      [uzt("shop.payout.cancelTitle"), uzt("shop.payout.cancelBody", { gems: fmt(target.gems) })].join("\n"),
    );
    if (!ok) return;
    setBusy(true);
    try {
      const res = await cancelGemPayout(request, target.id);
      haptic("success");
      setOverview((cur) =>
        cur
          ? {
              ...cur,
              gems: res.gems,
              open: null,
              recent: cur.recent.map((item) => (item.id === res.request.id ? res.request : item)),
            }
          : cur,
      );
      onGemsChange(res.gems);
    } catch (error) {
      void alertDialog(explain(error));
      load();
    } finally {
      setBusy(false);
    }
  };

  const open = overview?.open ?? null;
  const history = (overview?.recent ?? []).filter((item) => item.id !== open?.id).slice(0, 3);
  const selected = PAYOUT_BRANDS.find((item) => item.id === brand);

  const recent =
    history.length > 0 ? (
      <div className={styles.payoutRecent}>
        <T className={styles.payoutRecentTitle} k="shop.payout.recent" />
        {history.map((item) => (
          <RecentRow item={item} key={item.id} />
        ))}
      </div>
    ) : null;

  return (
    <section className={styles.withdraw}>
      <h2 data-i18n="shop.withdrawSection">{uzt("shop.withdrawSection")}</h2>
      {open ? (
        <>
          <OpenPayout busy={busy} onCancel={() => void cancel(open)} request={open} />
          {recent}
        </>
      ) : (
        <>
          {/* 입력 칸이 아래에 있어야 키보드가 올라와도 가려지지 않는다 */}
          {recent}
          <div className={styles.withdrawCard}>
            <header>
              <i>
                <MobileIcon name="arrow-up" size={16} />
              </i>
              <span>
                <strong data-i18n="shop.withdrawTitle">{uzt("shop.withdrawTitle")}</strong>
                <small data-i18n="shop.withdrawDesc">{uzt("shop.withdrawDesc")}</small>
              </span>
            </header>

            {loadFailed && !overview ? (
              <button className={styles.payoutLoadFail} onClick={load} type="button">
                <MobileIcon name="refresh" size={14} />
                <T k="shop.payout.loadFailed" />
              </button>
            ) : null}

            {/* 카드 종류 — 번호를 넣으면 알아서 골라진다 */}
            <div className={styles.brands}>
              {PAYOUT_BRANDS.map((item) => (
                <button
                  className={brand === item.id ? styles.brandOn : ""}
                  key={item.id}
                  onClick={() => {
                    haptic("select");
                    setBrand(item.id);
                  }}
                  style={{ "--brand": item.color } as CSSProperties}
                  type="button"
                >
                  <MobileIcon name={item.id === "visa" || item.id === "mastercard" ? "card-outline" : "card"} size={15} />
                  {item.label}
                  {brand === item.id ? <MobileIcon name="checkmark-circle" size={15} /> : null}
                </button>
              ))}
            </div>

            <label>
              <small data-i18n="shop.withdrawCardNumber">{uzt("shop.withdrawCardNumber")}</small>
              <span
                className={cardError ? styles.fieldBad : cardOk ? styles.fieldDone : ""}
                style={{ "--brand": selected?.color } as CSSProperties}
              >
                <MobileIcon name="card" size={17} />
                <input
                  autoComplete="cc-number"
                  disabled={busy}
                  inputMode="numeric"
                  maxLength={19}
                  onChange={(event) => onCardChange(event.target.value)}
                  placeholder="0000 0000 0000 0000"
                  value={card}
                />
                {cardOk ? <MobileIcon name="checkmark-circle" size={17} /> : null}
                {cardError ? <MobileIcon name="alert-circle" size={17} /> : null}
              </span>
              {cardError === "BRAND" ? (
                <T as="em" className={styles.helperBad} k="shop.payout.cardUnknown" />
              ) : cardError === "BRAND_MISMATCH" ? (
                <T as="em" className={styles.helperBad} k="shop.payout.cardMismatch" vars={{ brand: brandLabel(detected ?? "") }} />
              ) : cardError ? (
                <T as="em" className={styles.helperBad} k="shop.payout.cardInvalid" />
              ) : null}
            </label>

            {/* 카드 주인 이름 — 운영자가 송금할 때 받는 사람과 맞춰 본다 */}
            <label>
              <small data-i18n="shop.payout.holder">{uzt("shop.payout.holder")}</small>
              <span className={holderBad ? styles.fieldBad : holderName ? styles.fieldDone : ""}>
                <MobileIcon name="person" size={17} />
                <input
                  autoCapitalize="characters"
                  autoComplete="cc-name"
                  autoCorrect="off"
                  className={styles.holderInput}
                  disabled={busy}
                  maxLength={40}
                  onBlur={() => setHolderDone(true)}
                  onChange={(event) => {
                    setHolder(formatHolderInput(event.target.value));
                    setHolderDone(false);
                  }}
                  placeholder={uzt("shop.payout.holderPlaceholder")}
                  spellCheck={false}
                  value={holder}
                />
                {holderName ? <MobileIcon name="checkmark-circle" size={17} /> : null}
              </span>
              {holderBad ? (
                <T as="em" className={styles.helperBad} k="shop.payout.holderInvalid" />
              ) : (
                <em data-i18n="shop.payout.holderHint">{uzt("shop.payout.holderHint")}</em>
              )}
            </label>

            <label>
              <small data-i18n="shop.withdrawAmount">{uzt("shop.withdrawAmount")}</small>
              <div className={styles.amount}>
                <span className={tooSmall || tooBig ? styles.fieldBad : ""}>
                  <MobileIcon name="diamond" size={17} />
                  <input
                    disabled={busy}
                    inputMode="numeric"
                    onChange={(event) => setAmount(event.target.value.replace(/\D/g, "").replace(/^0+/, "").slice(0, 9))}
                    placeholder="0"
                    value={amount}
                  />
                </span>
                <button
                  data-i18n="shop.withdrawMax"
                  onClick={() => {
                    haptic("select");
                    setAmount(gems > 0 ? String(gems) : "");
                  }}
                  type="button"
                >
                  {uzt("shop.withdrawMax")}
                </button>
              </div>
              {tooBig ? (
                <em className={styles.helperBad} data-i18n="shop.withdrawTooBig">
                  {uzt("shop.withdrawTooBig", { n: fmt(gems) })}
                </em>
              ) : tooSmall || (amountNum === 0 && minGems !== null) ? (
                <em className={tooSmall ? styles.helperBad : ""} data-i18n="shop.withdrawMin">
                  {uzt("shop.withdrawMin", { n: fmt(minGems ?? 0) })}
                </em>
              ) : (
                <em data-i18n="shop.withdrawPayout">{uzt("shop.withdrawPayout", { n: fmt(amountNum * somPerGem) })}</em>
              )}
            </label>

            <button className={styles.withdrawSubmit} disabled={!ready} onClick={() => void submit()} type="button">
              {busy ? <i className={styles.payoutSpinner} /> : <T k="shop.withdrawSubmit" />}
            </button>
          </div>
        </>
      )}
    </section>
  );
}

/** 진행 중인 신청 — 접수 → 송금 중 → 완료 */
function OpenPayout({ busy, onCancel, request }: { busy: boolean; onCancel: () => void; request: GemPayout }) {
  const color = STATUS_COLOR[request.status];
  const step = request.status === "processing" ? 1 : 0;
  return (
    <div className={`${styles.withdrawCard} ${styles.payoutOpen}`} style={{ "--status": color } as CSSProperties}>
      <header>
        <i className={styles.payoutStatusIcon}>
          <MobileIcon name={STATUS_ICON[request.status]} size={16} />
        </i>
        <span>
          <strong data-i18n="shop.payout.openTitle">{uzt("shop.payout.openTitle")}</strong>
          <small data-i18n="shop.payout.openDesc">{uzt("shop.payout.openDesc")}</small>
        </span>
      </header>

      <div className={styles.payoutAmount}>
        <span>
          <b data-i18n="shop.payout.amount">{uzt("shop.payout.amount", { n: fmt(request.amountUzs) })}</b>
          <small data-no-translate>{`${brandLabel(request.brand)} •••• ${request.cardLast4}`}</small>
          <small data-no-translate>{request.cardHolder}</small>
        </span>
        <em>
          <MobileIcon name="diamond" size={12} />
          {fmt(request.gems)}
        </em>
      </div>

      <ol className={styles.payoutSteps}>
        {STEPS.map((key, i) => (
          <li className={i < step ? styles.stepDone : i === step ? styles.stepActive : ""} key={key}>
            <span>{i < step ? <MobileIcon name="checkmark" size={12} /> : <i />}</span>
            <b data-i18n={`shop.payout.steps.${key}`}>{uzt(`shop.payout.steps.${key}`)}</b>
          </li>
        ))}
      </ol>

      {request.status === "pending" ? (
        <button className={styles.payoutCancel} disabled={busy} onClick={onCancel} type="button">
          {busy ? <i className={styles.payoutSpinner} /> : <T k="shop.payout.cancel" />}
        </button>
      ) : (
        <p className={styles.payoutNote}>
          <MobileIcon name="lock-closed" size={14} />
          <T k="shop.payout.processingNote" />
        </p>
      )}
    </div>
  );
}

function RecentRow({ item }: { item: GemPayout }) {
  const color = STATUS_COLOR[item.status];
  const when = item.completedAt ?? item.rejectedAt ?? item.createdAt;
  return (
    <div className={styles.payoutRow} style={{ "--status": color } as CSSProperties}>
      <i>
        <MobileIcon name={STATUS_ICON[item.status]} size={15} />
      </i>
      <span>
        <span className={styles.payoutRowTop}>
          <b data-i18n="shop.payout.amount">{uzt("shop.payout.amount", { n: fmt(item.amountUzs) })}</b>
          <T className={styles.payoutRowStatus} k={`shop.payout.status.${item.status}`} />
        </span>
        <small data-no-translate>{`${brandLabel(item.brand)} •••• ${item.cardLast4} · ${dateLabel(when)}`}</small>
        {item.status === "rejected" ? (
          <span className={styles.payoutRowReason}>
            <T k={`shop.payout.reasons.${item.rejectReason ?? "other"}`} />
            <T k="shop.payout.refunded" vars={{ gems: fmt(item.gems) }} />
          </span>
        ) : null}
      </span>
    </div>
  );
}
