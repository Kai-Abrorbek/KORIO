"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";

import { uzt } from "../../../shared/i18n/uz-text";
import { useTelegramBackOverride } from "../../../shared/telegram/back-button";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { SUPPORT_CATEGORY_LOOK, SUPPORT_LIMITS, type SupportCategory } from "../model/support";
import styles from "./support-result-modal.module.css";

export type SupportResult =
  | { kind: "sent"; category: SupportCategory; subject: string }
  | { kind: "failed" }
  /** 하루 한도(5건) · 너무 자주 보냄 */
  | { kind: "limit" };

const SPARKS = [
  { top: 8, left: 16, size: 15, delay: 0 },
  { top: 30, right: 10, size: 12, delay: 500 },
  { bottom: 20, left: 6, size: 11, delay: 1000 },
] as const;

/**
 * 문의 보내기 결과 — 기본 alert 대신. 모바일 SupportResultModal 과 같다.
 * 접수되면 엄지 든 한글몬 + 무엇을 보냈는지 한 줄, 실패하면 다시 시도, 한도면 내일.
 * 모달은 페이드로만 열고 닫는다 (팝 금지). 안쪽만 살짝 움직인다.
 * 텔레그램 뒤로 버튼은 모달을 닫는다.
 */
export function SupportResultModal({
  onClose,
  onRetry,
  result,
}: {
  onClose: () => void;
  onRetry: () => void;
  result: SupportResult | null;
}) {
  // 닫히는 동안에도 내용이 남아 있게 마지막 결과를 들고 있는다
  const [shown, setShown] = useState<SupportResult | null>(result);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (result) {
      setShown(result);
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    setVisible(false);
    const timer = window.setTimeout(() => setShown(null), 220);
    return () => window.clearTimeout(timer);
  }, [result]);

  useTelegramBackOverride(result ? onClose : null);

  if (!shown) return null;
  const sent = shown.kind === "sent";
  const look = shown.kind === "sent" ? SUPPORT_CATEGORY_LOOK[shown.category] : null;

  return (
    <div
      aria-modal="true"
      className={`${styles.backdrop} ${visible ? styles.visible : ""}`}
      onClick={onClose}
      role="dialog"
    >
      <div className={styles.card} onClick={(event) => event.stopPropagation()}>
        {sent ? (
          <div className={styles.mascotWrap}>
            <i aria-hidden="true" className={styles.mascotGlow} />
            {SPARKS.map(({ delay, size, ...pos }, i) => (
              <i
                aria-hidden="true"
                className={styles.spark}
                key={i}
                style={{ ...pos, animationDelay: `${delay}ms` } as CSSProperties}
              >
                <MobileIcon name="sparkles" size={size} />
              </i>
            ))}
            <Image
              alt=""
              className={styles.mascot}
              height={118}
              src="/characters/hangulmon_great_float.png"
              unoptimized
              width={118}
            />
          </div>
        ) : (
          <i className={`${styles.badIcon} ${shown.kind === "limit" ? styles.limitIcon : ""}`}>
            <MobileIcon name={shown.kind === "limit" ? "hourglass" : "cloud-offline"} size={30} />
          </i>
        )}

        <h2 data-i18n={`support.${shown.kind}Title`}>{uzt(`support.${shown.kind}Title`)}</h2>
        <p className={styles.body} data-i18n={`support.${shown.kind}Body`}>
          {uzt(`support.${shown.kind}Body`, { n: SUPPORT_LIMITS.perDay })}
        </p>

        {shown.kind === "sent" && look ? (
          <div className={styles.ticket} style={{ "--c": look.color } as CSSProperties}>
            <span className={styles.ticketChip}>
              <MobileIcon name={look.icon} size={12} />
              <span data-i18n={`support.category.${shown.category}`}>{uzt(`support.category.${shown.category}`)}</span>
            </span>
            <b data-no-translate>{shown.subject}</b>
            <MobileIcon name="checkmark-circle" size={17} />
          </div>
        ) : null}

        <button className={styles.primary} onClick={shown.kind === "failed" ? onRetry : onClose} type="button">
          {shown.kind === "failed" ? (
            <span data-i18n="common.retry">{uzt("common.retry")}</span>
          ) : (
            <span data-i18n="support.ok">{uzt("support.ok")}</span>
          )}
        </button>
        {shown.kind === "failed" ? (
          <button className={styles.secondary} onClick={onClose} type="button">
            <span data-i18n="common.close">{uzt("common.close")}</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
