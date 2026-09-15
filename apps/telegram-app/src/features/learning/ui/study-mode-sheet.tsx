"use client";

import { useEffect, useRef } from "react";

import type { StudyMode } from "../model/learning-options";
import { LearningIcon } from "./learning-icon";
import styles from "./learning.module.css";

interface StudyModeSheetProps {
  courseLabel: string;
  disabled?: boolean;
  onClose: () => void;
  onSelect: (mode: StudyMode) => void;
}

const OPTIONS: Array<{
  description: string;
  icon: "footsteps" | "compass";
  mode: StudyMode;
  title: string;
}> = [
  {
    mode: "guided",
    icon: "footsteps",
    title: "O'quv yo'li",
    description: "Kurs kabi tartib bilan. Bugun nima qilishni biz aytamiz.",
  },
  {
    mode: "free",
    icon: "compass",
    title: "Erkin o'rganish",
    description: "Xohlagan joydan. Yo'l xaritasini o'zingiz tanlaysiz.",
  },
];

export function StudyModeSheet({
  courseLabel,
  disabled,
  onClose,
  onSelect,
}: StudyModeSheetProps) {
  const pointerStart = useRef<number | null>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <div className={styles.sheetBackdrop} onClick={onClose} role="presentation">
      <section
        aria-label="Qanday o'rganasiz?"
        aria-modal="true"
        className={styles.modeSheet}
        onClick={(event) => event.stopPropagation()}
        onPointerDown={(event) => {
          pointerStart.current = event.clientY;
        }}
        onPointerUp={(event) => {
          if (
            pointerStart.current !== null &&
            event.clientY - pointerStart.current > 100
          ) {
            onClose();
          }
          pointerStart.current = null;
        }}
        role="dialog"
      >
        <div className={styles.sheetGrip} aria-hidden="true" />
        <h2>Qanday o&apos;rganasiz?</h2>
        <p>
          {courseLabel} o&apos;rganishni boshlaymiz. Keyin istalgan payt
          o&apos;zgartirasiz.
        </p>

        <div className={styles.modeOptions}>
          {OPTIONS.map((option) => (
            <button
              className={styles.modeOption}
              disabled={disabled}
              key={option.mode}
              onClick={() => onSelect(option.mode)}
              type="button"
            >
              <span className={styles.modeOptionIcon}>
                <LearningIcon name={option.icon} size={25} />
              </span>
              <span>
                <strong>{option.title}</strong>
                <small>{option.description}</small>
              </span>
              <b aria-hidden="true">›</b>
            </button>
          ))}
        </div>

        <small className={styles.sheetHint}>
          Ikkilanayotgan bo&apos;lsangiz, o&apos;quv yo&apos;lidan boshlang.
        </small>
      </section>
    </div>
  );
}
