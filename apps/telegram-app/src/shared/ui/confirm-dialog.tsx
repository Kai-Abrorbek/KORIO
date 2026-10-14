"use client";

import type { CSSProperties } from "react";

import { uzt } from "../i18n/uz-text";
import { useTelegramBackOverride } from "../telegram/back-button";
import { MobileIcon, type IoniconName } from "./mobile-icon";
import styles from "./confirm-dialog.module.css";

/**
 * 앱 안 확인창 — 텔레그램 기본 팝업·window.confirm 대신. 모바일 ConfirmDialog 와 같은 모양.
 *
 * - 열고 닫기는 페이드만 (튀어나오기·흔들림 금지)
 * - 위: 색 동그라미 아이콘, 제목, 설명 / 아래: 3D 확인 버튼 + (있으면) 테두리 취소 버튼
 * - 문구는 i18n 키로 받는다 (번역기가 data-i18n 으로 바꿔 끼운다)
 * - 텔레그램 뒤로가기 = 취소
 */
export type ConfirmTone = "danger" | "primary" | "warning";

const TONE: Record<ConfirmTone, { color: string; depth: string }> = {
  danger: { color: "#FF4B4B", depth: "#D93636" },
  primary: { color: "#776EE2", depth: "#5A50C9" },
  warning: { color: "#FF9600", depth: "#D97C00" },
};

export function ConfirmDialog({
  cancelKey,
  confirmKey,
  icon,
  messageKey,
  onCancel,
  onConfirm,
  open,
  titleKey,
  tone = "danger",
}: {
  open: boolean;
  tone?: ConfirmTone;
  icon: IoniconName;
  titleKey: string;
  messageKey?: string;
  confirmKey: string;
  /** 없으면 버튼 하나 (알림창) */
  cancelKey?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  useTelegramBackOverride(open ? onCancel : null);
  if (!open) return null;
  const look = TONE[tone];
  return (
    <div
      aria-modal="true"
      className={styles.root}
      role={cancelKey ? "dialog" : "alertdialog"}
      style={{ "--tone": look.color, "--tone-depth": look.depth } as CSSProperties}
    >
      <button aria-label={uzt(cancelKey ?? confirmKey)} className={styles.backdrop} onClick={onCancel} type="button" />
      <section className={styles.card}>
        <span aria-hidden="true" className={styles.badge}>
          <span>
            <MobileIcon name={icon} size={30} />
          </span>
        </span>
        <h2 data-i18n={titleKey}>{uzt(titleKey)}</h2>
        {messageKey ? <p data-i18n={messageKey}>{uzt(messageKey)}</p> : null}
        <div className={styles.actions}>
          <button
            className={styles.confirm}
            onClick={() => {
              window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
              onConfirm();
            }}
            type="button"
          >
            <span data-i18n={confirmKey}>{uzt(confirmKey)}</span>
          </button>
          {cancelKey ? (
            <button className={styles.cancel} onClick={onCancel} type="button">
              <span data-i18n={cancelKey}>{uzt(cancelKey)}</span>
            </button>
          ) : null}
        </div>
      </section>
    </div>
  );
}
