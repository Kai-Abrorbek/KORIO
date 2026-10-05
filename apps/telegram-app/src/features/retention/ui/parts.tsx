"use client";

import type { CSSProperties, ReactNode } from "react";

import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import styles from "./retention.module.css";

type Tone = "purple" | "green" | "orange" | "amber" | "pink" | "blue";

const TONE_CLASS: Record<Tone, string> = {
  amber: styles.amber ?? "",
  blue: styles.blue ?? "",
  green: styles.green ?? "",
  orange: styles.orange ?? "",
  pink: styles.pink ?? "",
  purple: "",
};

/** 입체 버튼 — 아래 두께가 있고 누르면 내려앉는다 (앱 Button3D) */
export function Button3D({
  label,
  onClick,
  tone = "purple",
  icon,
  disabled,
  loading,
  compact,
  className = "",
}: {
  label: string;
  onClick?: () => void;
  tone?: Tone;
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <button
      className={[
        styles.btn3d,
        TONE_CLASS[tone],
        compact ? styles.compact : "",
        className,
      ].join(" ")}
      disabled={disabled || loading}
      onClick={() => {
        window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
        onClick?.();
      }}
      type="button"
    >
      {loading ? <i className={styles.spin} /> : (
        <>
          {icon}
          {label}
        </>
      )}
    </button>
  );
}

export interface RewardChip {
  icon: IoniconName;
  color: string;
  label: string;
}

/**
 * 가운데 뜨는 보상 대화상자 — 복귀 보상·복구펜 알림·목표 결과·출석 선물 (앱 RewardDialog).
 */
export function RewardDialog({
  mood = "great",
  title,
  body,
  rewards = [],
  primaryLabel,
  onPrimary,
  primaryTone = "purple",
  secondaryLabel,
  onSecondary,
  loading,
  onBackdrop,
}: {
  mood?: string;
  title: string;
  body?: string;
  rewards?: RewardChip[];
  primaryLabel: string;
  onPrimary: () => void;
  primaryTone?: Tone;
  secondaryLabel?: string;
  onSecondary?: () => void;
  loading?: boolean;
  onBackdrop?: () => void;
}) {
  const dismiss = onBackdrop ?? onSecondary;
  return (
    <div aria-modal="true" className={styles.dialogRoot} role="dialog">
      <button
        aria-label="close"
        className={styles.dialogBackdrop}
        onClick={() => dismiss?.()}
        style={{ border: 0 }}
        type="button"
      />
      <section className={styles.dialog}>
        <span className={styles.dialogMascot}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={`/characters/hangulmon_${mood}.png`} />
        </span>
        <h2>{title}</h2>
        {body ? <p>{body}</p> : null}
        {rewards.length ? (
          <div className={styles.dialogRewards}>
            {rewards.map((chip, index) => (
              <span
                className={styles.dialogChip}
                key={index}
                style={
                  {
                    "--cc": chip.color,
                    animationDelay: `${0.22 + index * 0.12}s`,
                  } as CSSProperties
                }
              >
                <i><MobileIcon name={chip.icon} size={18} /></i>
                {chip.label}
              </span>
            ))}
          </div>
        ) : null}
        <Button3D
          className={styles.dialogPrimary}
          label={primaryLabel}
          loading={loading}
          onClick={onPrimary}
          tone={primaryTone}
        />
        {secondaryLabel ? (
          <button className={styles.dialogSecondary} onClick={onSecondary} type="button">
            {secondaryLabel}
          </button>
        ) : null}
      </section>
    </div>
  );
}
