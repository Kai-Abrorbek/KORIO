"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

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

export interface RewardDialogProps {
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
}

/** 열림·닫힘 페이드 길이 — CSS .dialogRoot transition 과 같게 */
const FADE_MS = 180;

/**
 * 가운데 뜨는 보상 대화상자 — 복귀 보상·복구펜 알림·목표 결과·출석 선물 (앱 RewardDialog).
 *
 * ⚠️ 연출 애니메이션 금지 (2026-10-06). 튀어나오기·후광 맥박·칩 팝이 흔들려 보였다.
 *    열림/닫힘은 **불투명도 페이드 하나만**. 닫힐 때도 페이드아웃이 보이도록
 *    open 이 false 가 돼도 FADE_MS 동안 붙여 두고, 그동안은 마지막 내용을 그린다.
 */
export function RewardDialog({ open, ...props }: RewardDialogProps & { open: boolean }) {
  const lastShown = useRef(props);
  if (open) lastShown.current = props;
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // 붙은 다음 프레임에 켜야 transition 이 돈다
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }
    setShown(false);
    const timer = window.setTimeout(() => setMounted(false), FADE_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  if (!mounted) return null;
  const {
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
  } = open ? props : lastShown.current;
  const dismiss = onBackdrop ?? onSecondary;
  return (
    <div
      aria-modal="true"
      className={`${styles.dialogRoot} ${shown && open ? styles.dialogShown : ""}`}
      role="dialog"
    >
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
                style={{ "--cc": chip.color } as CSSProperties}
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
