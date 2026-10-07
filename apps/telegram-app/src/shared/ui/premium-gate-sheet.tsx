"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, type CSSProperties } from "react";

import { uzt } from "../i18n/uz-text";
import { MobileIcon } from "./mobile-icon";
import { useSwipeToClose } from "./use-swipe-to-close";
import styles from "./premium-gate-sheet.module.css";

interface Pitch {
  color: string;
  perks: string[];
}

const FALLBACK: Pitch = { color: "#5C6BC0", perks: ["grammar", "expression", "listening"] };

/** 기능별로 뭘 팔지 — 앱 PremiumGateModal 의 PITCH 와 같다 (색·자랑거리 3줄) */
const PITCH: Record<string, Pitch> = {
  grammar: FALLBACK,
  expression: { color: "#26A69A", perks: ["expression", "conversation", "grammar"] },
  listening: { color: "#42A5F5", perks: ["listening", "expression", "topik"] },
  topik: { color: "#AB47BC", perks: ["topik", "grammar", "listening"] },
  tutor: { color: "#EC407A", perks: ["conversation", "expression", "listening"] },
};

/**
 * 구독 유도 시트 — 앱 components/subscription/PremiumGateModal 과 같은 모양·문구.
 * 잠긴 기능을 누르면 뜬다. CTA 는 하나만 크게, 나머지(맛보기/나중에)는 작게.
 *
 * ⚠️ 등장은 배경 페이드 하나뿐이다 (슬라이드·스프링·팝 금지). 끌어내리면 닫힌다.
 */
export function PremiumGateSheet({
  feature,
  onClose,
  onTaster,
}: {
  feature: string | null;
  onClose: () => void;
  /** 있으면 "나중에" 대신 "먼저 무료로 맛보기" — 앱과 같다 */
  onTaster?: () => void;
}) {
  const router = useRouter();
  const sheetRef = useRef<HTMLElement>(null);
  useSwipeToClose(sheetRef, onClose);
  const pitch = (feature && PITCH[feature]) || FALLBACK;
  const titleKey = feature && PITCH[feature] ? feature : "default";

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const goPremium = () => {
    window.Telegram?.WebApp.HapticFeedback?.impactOccurred("medium");
    onClose();
    router.push("/premium");
  };

  return (
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <section
        aria-label="KORIO SUPER"
        aria-modal="true"
        className={styles.sheet}
        onClick={(event) => event.stopPropagation()}
        ref={sheetRef}
        role="dialog"
        style={{ "--pitch": pitch.color } as CSSProperties}
      >
        <div className={styles.grabber} aria-hidden="true" />

        <div className={styles.hero}>
          <i className={styles.heroGlow} aria-hidden="true" />
          <Image
            alt="Haneulmon"
            className={styles.mascot}
            height={82}
            src="/characters/hangulmon_confident.png"
            unoptimized
            width={82}
          />
          <span className={styles.lockBadge}>
            <MobileIcon name="lock-closed" size={16} />
          </span>
        </div>

        <h2 className={styles.title} data-i18n={`premiumGate.title.${titleKey}`}>
          {uzt(`premiumGate.title.${titleKey}`)}
        </h2>
        <p className={styles.sub} data-i18n="premiumGate.sub">{uzt("premiumGate.sub")}</p>

        <ul className={styles.perks}>
          {pitch.perks.map((perk) => (
            <li className={styles.perkRow} key={perk}>
              <span className={styles.perkDot}>
                <MobileIcon name="checkmark" size={13} />
              </span>
              <span className={styles.perkText} data-i18n={`premiumGate.perk.${perk}`}>
                {uzt(`premiumGate.perk.${perk}`)}
              </span>
            </li>
          ))}
          <li className={styles.perkRow}>
            <span className={`${styles.perkDot} ${styles.perkDotEnergy}`}>
              <MobileIcon name="infinite" size={13} />
            </span>
            <span className={styles.perkText} data-i18n="premiumGate.perk.energy">
              {uzt("premiumGate.perk.energy")}
            </span>
          </li>
        </ul>

        <button className={styles.cta} onClick={goPremium} type="button">
          <MobileIcon name="sparkles" size={17} />
          <span data-i18n="premiumGate.cta">{uzt("premiumGate.cta")}</span>
        </button>

        {onTaster ? (
          <button
            className={styles.taster}
            data-i18n="premiumGate.taster"
            onClick={() => {
              onClose();
              onTaster();
            }}
            type="button"
          >
            {uzt("premiumGate.taster")}
          </button>
        ) : (
          <button className={styles.later} data-i18n="premiumGate.later" onClick={onClose} type="button">
            {uzt("premiumGate.later")}
          </button>
        )}
      </section>
    </div>
  );
}
