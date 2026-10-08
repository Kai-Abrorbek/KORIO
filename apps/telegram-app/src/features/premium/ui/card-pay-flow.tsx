"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { ApiError } from "../../../shared/api/client";
import { uzt } from "../../../shared/i18n/uz-text";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useTelegramBackOverride } from "../../../shared/telegram/back-button";
import { SUPPORT } from "../../settings/model/help";
import {
  cancelCardOrder,
  createCardOrder,
  fetchCardOrder,
  submitCardReceipt,
} from "../api/card";
import {
  CARD_BRAND_LABEL,
  formatCardNumber,
  formatSom,
  type CardConfig,
  type CardOrder,
  type CardProduct,
  type ReceivingCard,
} from "../model/card";
import { PLAN_KEY } from "../model/premium";
import styles from "./card-pay-flow.module.css";

const haptic = (style: "light" | "medium") =>
  window.Telegram?.WebApp.HapticFeedback?.impactOccurred(style);

/** 클립보드 — 텔레그램 웹뷰에서 navigator.clipboard 가 막힌 기기를 위해 옛 방식으로 한 번 더 */
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

const UPLOAD_OK_TYPES = ["image/jpeg", "image/png", "image/webp"];
const UPLOAD_KEEP_BYTES = 3 * 1024 * 1024;
const UPLOAD_MAX_SIDE = 2200;

/**
 * 영수증 사진을 올리기 좋게 — 큰 사진·지원 안 되는 형식(HEIC 등)은 JPEG 로 다시 그린다.
 * 우즈벡 모바일 회선에서 10MB PNG 를 그대로 올리면 한참 걸린다.
 */
async function prepareReceipt(file: File): Promise<Blob> {
  if (UPLOAD_OK_TYPES.includes(file.type) && file.size <= UPLOAD_KEEP_BYTES) return file;
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new window.Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("BAD_IMAGE"));
      el.src = url;
    });
    const scale = Math.min(1, UPLOAD_MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.86),
    );
    if (!blob) throw new Error("BAD_IMAGE");
    return blob;
  } finally {
    URL.revokeObjectURL(url);
  }
}

const ERROR_KEY: Record<string, string> = {
  CARD_PAYMENT_DISABLED: "errDisabled",
  RECEIPT_ALREADY_USED: "errUsed",
  ORDER_EXPIRED: "errExpired",
  ORDER_CLOSED: "errExpired",
  INVALID_RECEIPT: "errBadImage",
  INVALID_LAST4: "last4Error",
  CARD_PAYMENT_ADMIN_UNREACHABLE: "errAdmin",
  TOO_BIG: "errTooBig",
  BAD_IMAGE: "errBadImage",
};
const errorKey = (error: unknown) => {
  const code =
    error instanceof ApiError
      ? error.status === 413
        ? "TOO_BIG"
        : error.code
      : error instanceof Error
        ? error.message
        : "";
  return `cardPay.${ERROR_KEY[code] ?? "errGeneric"}`;
};

function useCountdown(until: string | undefined) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const left = until ? Math.max(0, new Date(until).getTime() - now) : 0;
  const mm = String(Math.floor(left / 60_000)).padStart(2, "0");
  const ss = String(Math.floor((left % 60_000) / 1000)).padStart(2, "0");
  return { left, label: `${mm}:${ss}` };
}

function CopyButton({ value, light }: { value: string; light?: boolean }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);
  return (
    <button
      className={`${styles.copyBtn} ${light ? styles.copyBtnLight : ""} ${copied ? styles.copyBtnDone : ""}`}
      onClick={async (event) => {
        event.stopPropagation();
        if (await copyText(value)) {
          haptic("light");
          setCopied(true);
        }
      }}
      type="button"
    >
      <MobileIcon name={copied ? "checkmark" : "copy-outline"} size={15} />
      <span data-i18n={copied ? "cardPay.copied" : "cardPay.copy"}>
        {uzt(copied ? "cardPay.copied" : "cardPay.copy")}
      </span>
    </button>
  );
}

/** 은행 카드 모양 — 누르면 번호 복사 */
function BankCard({ card }: { card: ReceivingCard }) {
  const [flash, setFlash] = useState(false);
  return (
    <div
      className={`${styles.bankCard} ${card.brand === "humo" ? styles.bankHumo : styles.bankUzcard} ${flash ? styles.bankFlash : ""}`}
      onClick={async () => {
        if (await copyText(card.number)) {
          haptic("light");
          setFlash(true);
          window.setTimeout(() => setFlash(false), 500);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <i className={styles.bankGloss} aria-hidden="true" />
      <div className={styles.bankTop}>
        <span className={styles.bankChip} aria-hidden="true" />
        <b className={styles.bankBrand} data-no-translate>
          {CARD_BRAND_LABEL[card.brand]}
        </b>
      </div>
      <div className={styles.bankNumber} data-no-translate>
        {formatCardNumber(card.number)}
      </div>
      <div className={styles.bankBottom}>
        <span className={styles.bankHolder} data-no-translate>
          {card.holder || " "}
        </span>
        <CopyButton light value={card.number} />
      </div>
    </div>
  );
}

function PlanLine({ tier, months }: { tier: string; months: number }) {
  const key = `premium.plans.${PLAN_KEY[months] ?? "monthly"}`;
  return (
    <>
      <span data-no-translate>{tier.toUpperCase()} · </span>
      <span data-i18n={key}>{uzt(key)}</span>
    </>
  );
}

/* ── 1. 입금 ── */
function TransferStep({
  cards,
  onCancel,
  onNext,
  order,
  receiver,
  setReceiver,
}: {
  cards: ReceivingCard[];
  onCancel: () => void;
  onNext: () => void;
  order: CardOrder;
  receiver: ReceivingCard | null;
  setReceiver: (card: ReceivingCard) => void;
}) {
  const { left, label } = useCountdown(order.expiresAt);
  const discount = order.baseAmount - order.amount;

  return (
    <>
      <div className={styles.body}>
        <section className={styles.amountCard}>
          <span className={styles.amountLabel} data-i18n="cardPay.amountLabel">
            {uzt("cardPay.amountLabel")}
          </span>
          <div className={styles.amountRow}>
            <strong className={styles.amountValue} data-no-translate>
              {formatSom(order.amount)}
            </strong>
            <span className={styles.amountUnit} data-i18n="cardPay.som">
              {uzt("cardPay.som")}
            </span>
            <CopyButton value={String(order.amount)} />
          </div>
          <div className={styles.discountRow}>
            <s data-no-translate>{formatSom(order.baseAmount)}</s>
            <em data-no-translate>−{formatSom(discount)}</em>
            <span data-i18n="cardPay.discountNote">
              {uzt("cardPay.discountNote", { price: formatSom(order.baseAmount) })}
            </span>
          </div>
          <p className={styles.exactHint} data-i18n="cardPay.exactHint">
            {uzt("cardPay.exactHint")}
          </p>
        </section>

        <div className={styles.sectionHead}>
          <span data-i18n="cardPay.cardLabel">{uzt("cardPay.cardLabel")}</span>
          <span className={`${styles.timer} ${left ? "" : styles.timerOver}`}>
            <MobileIcon name="time-outline" size={14} />
            {left ? (
              <span data-i18n="cardPay.timer">{uzt("cardPay.timer", { time: label })}</span>
            ) : null}
          </span>
        </div>

        {cards.length > 1 ? (
          <div className={styles.cardTabs}>
            {cards.map((card) => (
              <button
                aria-pressed={receiver?.last4 === card.last4}
                className={receiver?.last4 === card.last4 ? styles.cardTabActive : ""}
                key={card.number}
                onClick={() => setReceiver(card)}
                type="button"
              >
                <b data-no-translate>{CARD_BRAND_LABEL[card.brand]}</b>
                <span data-no-translate>•• {card.last4}</span>
              </button>
            ))}
          </div>
        ) : null}

        {receiver ? <BankCard card={receiver} /> : null}

        {!left ? (
          <p className={styles.timeOverNote} data-i18n="cardPay.timerOver">
            {uzt("cardPay.timerOver")}
          </p>
        ) : null}

        <ol className={styles.steps}>
          {(["step1", "step2", "step3", "step4"] as const).map((key, index) => (
            <li key={key}>
              <span className={styles.stepNum}>{index + 1}</span>
              <span data-i18n={`cardPay.${key}`}>{uzt(`cardPay.${key}`)}</span>
            </li>
          ))}
        </ol>

        <button className={styles.textBtn} onClick={onCancel} type="button">
          <span data-i18n="cardPay.cancel">{uzt("cardPay.cancel")}</span>
        </button>
      </div>

      <div className={styles.footer}>
        <button className={styles.cta} onClick={onNext} type="button">
          <MobileIcon name="arrow-up-circle" size={20} />
          <span data-i18n="cardPay.paid">{uzt("cardPay.paid")}</span>
        </button>
      </div>
    </>
  );
}

/* ── 2. 영수증 ── */
function UploadStep({
  busy,
  error,
  onSubmit,
}: {
  busy: boolean;
  error: string | null;
  onSubmit: (file: File, last4: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [last4, setLast4] = useState("");
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const last4Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const valid = /^\d{4}$/.test(last4);
  const pick = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.files?.[0];
    if (next) {
      haptic("light");
      setFile(next);
      window.setTimeout(() => last4Ref.current?.focus(), 150);
    }
    event.target.value = "";
  };

  return (
    <>
      <div className={styles.body}>
        <input accept="image/*" className={styles.hiddenInput} onChange={pick} ref={inputRef} type="file" />
        {preview ? (
          <div className={styles.preview}>
            {/* eslint-disable-next-line @next/next/no-img-element -- 로컬 blob 미리보기 */}
            <img alt="" src={preview} />
            <button className={styles.previewChange} onClick={() => inputRef.current?.click()} type="button">
              <MobileIcon name="image-outline" size={15} />
              <span data-i18n="cardPay.changeImage">{uzt("cardPay.changeImage")}</span>
            </button>
          </div>
        ) : (
          <button className={styles.dropzone} onClick={() => inputRef.current?.click()} type="button">
            <span className={styles.dropIcon}>
              <MobileIcon name="receipt-outline" size={30} />
            </span>
            <strong data-i18n="cardPay.pickImage">{uzt("cardPay.pickImage")}</strong>
            <small data-no-translate>JPG · PNG</small>
          </button>
        )}

        <label className={styles.last4Label} data-i18n="cardPay.last4Label" htmlFor="card-last4">
          {uzt("cardPay.last4Label")}
        </label>
        <div className={styles.last4Wrap} onClick={() => last4Ref.current?.focus()}>
          <span className={styles.last4Mask} aria-hidden="true" data-no-translate>
            ••••&nbsp;••••&nbsp;••••
          </span>
          <div className={styles.last4Boxes}>
            {[0, 1, 2, 3].map((index) => (
              <span
                className={`${styles.last4Box} ${last4.length === index ? styles.last4BoxActive : ""} ${
                  last4[index] ? styles.last4BoxFilled : ""
                }`}
                key={index}
              >
                {last4[index] ?? ""}
              </span>
            ))}
            <input
              aria-label={uzt("cardPay.last4Label")}
              autoComplete="off"
              className={styles.last4Input}
              id="card-last4"
              inputMode="numeric"
              maxLength={4}
              onBlur={() => setTouched(true)}
              onChange={(event) => setLast4(event.target.value.replace(/\D/g, "").slice(0, 4))}
              pattern="[0-9]*"
              ref={last4Ref}
              value={last4}
            />
          </div>
        </div>
        <p
          className={`${styles.last4Hint} ${touched && last4 && !valid ? styles.last4HintError : ""}`}
          data-i18n={touched && last4 && !valid ? "cardPay.last4Error" : "cardPay.last4Hint"}
        >
          {uzt(touched && last4 && !valid ? "cardPay.last4Error" : "cardPay.last4Hint")}
        </p>

        {error ? (
          <p className={styles.error} data-i18n={error} role="alert">
            {uzt(error)}
          </p>
        ) : null}
      </div>

      <div className={styles.footer}>
        <button
          className={styles.cta}
          disabled={!file || !valid || busy}
          onClick={() => file && valid && onSubmit(file, last4)}
          type="button"
        >
          {busy ? (
            <>
              <i className={styles.spinner} aria-hidden="true" />
              <span data-i18n="cardPay.sending">{uzt("cardPay.sending")}</span>
            </>
          ) : (
            <>
              <MobileIcon name="paper-plane" size={18} />
              <span data-i18n="cardPay.send">{uzt("cardPay.send")}</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}

function SummaryRows({ order }: { order: CardOrder }) {
  return (
    <dl className={styles.summary}>
      <div>
        <dt data-i18n="cardPay.orderLabel">{uzt("cardPay.orderLabel")}</dt>
        <dd data-no-translate>#{order.code}</dd>
      </div>
      <div>
        <dt data-i18n="cardPay.planLabel">{uzt("cardPay.planLabel")}</dt>
        <dd>
          <PlanLine months={order.months} tier={order.tier} />
        </dd>
      </div>
      <div>
        <dt data-i18n="cardPay.amountLabel">{uzt("cardPay.amountLabel")}</dt>
        <dd>
          <span data-no-translate>{formatSom(order.amount)} </span>
          <span data-i18n="cardPay.som">{uzt("cardPay.som")}</span>
        </dd>
      </div>
      {order.submittedAt ? (
        <div>
          <dt data-i18n="cardPay.sentLabel">{uzt("cardPay.sentLabel")}</dt>
          <dd data-no-translate>
            {new Date(order.submittedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </dd>
        </div>
      ) : null}
    </dl>
  );
}

/* ── 3. 심사 중 / 결과 ── */
function StatusStep({
  busy,
  onClose,
  onRetry,
  order,
}: {
  busy: boolean;
  onClose: () => void;
  onRetry: () => void;
  order: CardOrder;
}) {
  const reviewing = order.status === "submitted";
  const rejected = order.status === "rejected";
  const title = reviewing
    ? "cardPay.reviewTitle"
    : rejected
      ? "cardPay.rejectedTitle"
      : "cardPay.expiredTitle";
  const sub = reviewing
    ? "cardPay.reviewSub"
    : rejected
      ? `cardPay.reason_${order.rejectReason ?? "no_money"}`
      : "cardPay.expiredSub";

  return (
    <>
      <div className={`${styles.body} ${styles.statusBody}`}>
        <div className={styles.statusHero}>
          {reviewing ? (
            <>
              <i className={styles.statusPulse} aria-hidden="true" />
              <Image
                alt=""
                className={styles.statusMascot}
                height={112}
                src="/characters/hangulmon_waiting.png"
                unoptimized
                width={112}
              />
            </>
          ) : (
            <span className={`${styles.statusIcon} ${rejected ? styles.statusIconBad : ""}`}>
              <MobileIcon name={rejected ? "close" : "time-outline"} size={40} />
            </span>
          )}
        </div>
        <h2 className={styles.statusTitle} data-i18n={title}>
          {uzt(title)}
        </h2>
        <p className={styles.statusSub} data-i18n={sub}>
          {uzt(sub)}
        </p>
        <SummaryRows order={order} />
        {rejected ? (
          <button
            className={styles.textBtn}
            onClick={() => {
              const webApp = window.Telegram?.WebApp;
              if (webApp?.openTelegramLink) webApp.openTelegramLink(SUPPORT.telegram);
              else window.open(SUPPORT.telegram, "_blank", "noopener");
            }}
            type="button"
          >
            <MobileIcon name="help-circle-outline" size={16} />
            <span data-i18n="cardPay.help">{uzt("cardPay.help")}</span>
          </button>
        ) : null}
      </div>

      <div className={styles.footer}>
        {reviewing ? (
          <button className={`${styles.cta} ${styles.ctaSoft}`} onClick={onClose} type="button">
            <span data-i18n="cardPay.close">{uzt("cardPay.close")}</span>
          </button>
        ) : (
          <button className={styles.cta} disabled={busy} onClick={onRetry} type="button">
            <MobileIcon name="refresh" size={18} />
            <span data-i18n={rejected ? "cardPay.retry" : "cardPay.newOrder"}>
              {uzt(rejected ? "cardPay.retry" : "cardPay.newOrder")}
            </span>
          </button>
        )}
      </div>
    </>
  );
}

/**
 * Humo·Uzcard 카드 입금 — 전체 화면 (페이드로만 열린다).
 *   입금(고유 금액·카드번호 복사·타이머) → 영수증(사진 + 보낸 카드 끝 4자리) → 심사 중 → 승인/거절
 * 승인되면 onApproved, 상태가 바뀌면 onChanged 로 요금제 화면의 배너를 맞춘다.
 */
export function CardPayFlow({
  config,
  onApproved,
  onChanged,
  onClose,
  product,
  resume,
}: {
  config: CardConfig;
  onApproved: (order: CardOrder) => void;
  onChanged: (order: CardOrder | null) => void;
  onClose: () => void;
  /** 새 주문 */
  product?: CardProduct;
  /** 이어서 보기 (진행 중 주문) */
  resume?: CardOrder;
}) {
  const { request } = useTelegramAuth();
  const [order, setOrder] = useState<CardOrder | null>(resume ?? null);
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fatal, setFatal] = useState<string | null>(null);
  const [receiver, setReceiver] = useState<ReceivingCard | null>(() => {
    const preferred = config.cards.find((card) => card.last4 === resume?.receiverLast4);
    return preferred ?? config.cards[0] ?? null;
  });
  const productId = product?.id ?? resume?.productId ?? null;
  useTelegramBackOverride(uploading ? () => setUploading(false) : onClose);

  const apply = useCallback(
    (next: CardOrder) => {
      setOrder(next);
      onChanged(
        next.status === "awaiting_transfer" || next.status === "submitted" ? next : null,
      );
      if (next.status === "approved") onApproved(next);
    },
    [onApproved, onChanged],
  );

  const startOrder = useCallback(async () => {
    if (!productId) return;
    setBusy(true);
    setFatal(null);
    try {
      apply(await createCardOrder(request, productId));
      setUploading(false);
    } catch (err) {
      setFatal(errorKey(err));
    } finally {
      setBusy(false);
    }
  }, [apply, productId, request]);

  // 새 주문이면 열자마자 만든다
  const started = useRef(false);
  useEffect(() => {
    if (started.current || resume) return;
    started.current = true;
    void startOrder();
  }, [resume, startOrder]);

  // 심사 중이면 8초마다 결과를 본다
  useEffect(() => {
    if (order?.status !== "submitted") return;
    const timer = window.setInterval(() => {
      void fetchCardOrder(request, order.id)
        .then((next) => {
          if (next.status !== "submitted") apply(next);
        })
        .catch(() => undefined);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [apply, order?.id, order?.status, request]);

  const submit = async (file: File, last4: string) => {
    if (!order) return;
    haptic("medium");
    setBusy(true);
    setError(null);
    try {
      const blob = await prepareReceipt(file);
      if (blob.size > 8 * 1024 * 1024) throw new Error("TOO_BIG");
      const next = await submitCardReceipt(request, order.id, blob, last4, receiver?.last4 ?? null);
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
      setUploading(false);
      apply(next);
    } catch (err) {
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("error");
      setError(errorKey(err));
      // 서버가 이미 닫힌 주문이라고 하면 상태를 다시 받아 화면을 맞춘다
      if (err instanceof ApiError && err.status !== 413) {
        void fetchCardOrder(request, order.id).then(apply).catch(() => undefined);
      }
    } finally {
      setBusy(false);
    }
  };

  const cancel = async () => {
    if (order?.status === "awaiting_transfer") {
      await cancelCardOrder(request, order.id).catch(() => undefined);
    }
    onChanged(null);
    onClose();
  };

  const stepTitle = uploading ? "cardPay.uploadTitle" : "cardPay.title";

  let content: ReactNode;
  if (fatal) {
    content = (
      <div className={`${styles.body} ${styles.statusBody}`}>
        <span className={`${styles.statusIcon} ${styles.statusIconBad}`}>
          <MobileIcon name="alert" size={36} />
        </span>
        <p className={styles.statusSub} data-i18n={fatal}>
          {uzt(fatal)}
        </p>
      </div>
    );
  } else if (!order) {
    content = (
      <div className={`${styles.body} ${styles.loading}`}>
        <i />
      </div>
    );
  } else if (order.status === "awaiting_transfer" && !uploading) {
    content = (
      <TransferStep
        cards={config.cards}
        onCancel={() => void cancel()}
        onNext={() => {
          haptic("medium");
          setError(null);
          setUploading(true);
        }}
        order={order}
        receiver={receiver}
        setReceiver={setReceiver}
      />
    );
  } else if (order.status === "awaiting_transfer") {
    content = <UploadStep busy={busy} error={error} onSubmit={(file, last4) => void submit(file, last4)} />;
  } else {
    content = (
      <StatusStep
        busy={busy}
        onClose={onClose}
        onRetry={() => void startOrder()}
        order={order}
      />
    );
  }

  return (
    <div className={styles.screen} role="dialog" aria-modal="true">
      <header className={styles.header}>
        <button
          aria-label="Orqaga"
          className={styles.headerBtn}
          onClick={uploading ? () => setUploading(false) : onClose}
          type="button"
        >
          <MobileIcon name={uploading ? "chevron-back" : "close"} size={22} />
        </button>
        <h1 data-i18n={stepTitle}>{uzt(stepTitle)}</h1>
        <span className={styles.headerPlan}>
          {order ? <PlanLine months={order.months} tier={order.tier} /> : null}
        </span>
      </header>
      {content}
    </div>
  );
}
