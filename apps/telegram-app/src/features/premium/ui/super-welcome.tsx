"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { playSfx } from "../../../shared/browser/sfx";
import { uzt } from "../../../shared/i18n/uz-text";
import { Confetti } from "../../../shared/ui/confetti";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import { BOW_BOTTOM_AT, BOW_CHEER_AT, HaneulmonBow } from "../../app-review/ui/haneulmon-bow";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { haptic } from "../../retention/model/retention";
import { Button3D } from "../../retention/ui/parts";
import styles from "./super-welcome.module.css";

/** 등급마다 보여 줄 혜택 넷 (premium.features.* 문구) — 앱 super-welcome 과 같다 */
const PERKS: Record<"super" | "max", { icon: IoniconName; key: string }[]> = {
  max: [
    { icon: "mic", key: "aiTutor" },
    { icon: "chatbubbles", key: "tutorTopics" },
    { icon: "infinite", key: "unlimitedEnergy" },
    { icon: "diamond", key: "monthlyGems" },
  ],
  super: [
    { icon: "infinite", key: "unlimitedEnergy" },
    { icon: "close-circle", key: "noAds" },
    { icon: "refresh", key: "unlimitedReview" },
    { icon: "diamond", key: "monthlyGems" },
  ],
};

/** 타임라인 (ms) — 앱과 같은 값. 1) 인사 + 손편지 2) 왕관 '통' 3) 혜택 도장 → 시작 버튼 */
const LETTER_AT = BOW_BOTTOM_AT + 160;
const CROWN_AT = BOW_CHEER_AT + 90;
const CROWN_LAND_AT = CROWN_AT + 420;
const TITLE_AT = CROWN_LAND_AT + 150;
const PERKS_AT = CROWN_LAND_AT + 800;
const PERK_GAP = 260;
const CTA_AT = PERKS_AT + PERK_GAP * 4 + 350;

const STAGE = 170;
const DAY_MS = 86_400_000;
const ms = (value: number) => `${value}ms`;

/**
 * 구독 결제 직후 감사 연출 (앱 app/super-welcome 과 같다). 탭하면 끝 장면으로 건너뛴다.
 * 동작 줄이기면 끝 장면만.
 */
export function SuperWelcome({ tier, onDone }: { tier: "super" | "max"; onDone: () => void }) {
  const { user } = useTelegramAuth();
  const tierName = tier === "max" ? "MAX" : "SUPER";
  const name = user?.nickname?.trim() || "KORIO";
  const days = user?.createdAt
    ? Math.max(1, Math.floor((Date.now() - new Date(user.createdAt).getTime()) / DAY_MS) + 1)
    : Math.max(0, user?.streak ?? 0);
  const letterKey = days > 1 ? "superWelcome.letter" : "superWelcome.letterFirst";

  const [reduced] = useState(
    () => typeof window !== "undefined" && (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false),
  );
  const [skipped, setSkipped] = useState(reduced);
  const [landed, setLanded] = useState(reduced);
  const [ctaReady, setCtaReady] = useState(reduced);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (reduced) {
      haptic("success");
      return;
    }
    const list = timers.current;
    const later = (fn: () => void, at: number) => list.push(window.setTimeout(fn, at));
    later(() => window.Telegram?.WebApp.HapticFeedback?.impactOccurred("medium"), BOW_BOTTOM_AT);
    later(() => {
      setLanded(true);
      playSfx("level-up");
      haptic("success");
    }, CROWN_LAND_AT);
    for (let i = 0; i < 4; i += 1) later(() => haptic("light"), PERKS_AT + i * PERK_GAP);
    later(() => setCtaReady(true), CTA_AT);
    return () => list.forEach((id) => window.clearTimeout(id));
  }, [reduced]);

  /** 탭 — 끝 장면으로 */
  const skip = () => {
    if (skipped && ctaReady) return;
    timers.current.forEach((id) => window.clearTimeout(id));
    setSkipped(true);
    setLanded(true);
    setCtaReady(true);
  };

  const timeline = {
    "--crown-at": ms(CROWN_AT),
    "--land-at": ms(CROWN_LAND_AT),
    "--letter-at": ms(LETTER_AT),
    "--stage": `${STAGE}px`,
    "--title-at": ms(TITLE_AT),
    "--words-at": ms(BOW_BOTTOM_AT - 120),
  } as CSSProperties;

  return (
    <div
      aria-modal="true"
      className={`${styles.root} ${skipped ? styles.done : ""}`}
      onClick={skip}
      role="dialog"
      style={timeline}
    >
      <div className={styles.body}>
        <div className={styles.stage}>
          <i aria-hidden className={`${styles.ring} ${landed ? styles.ringGo : ""}`} />
          <div className={`${styles.squash} ${landed && !skipped ? styles.squashGo : ""}`}>
            {skipped ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt="" className={styles.cheer} src="/characters/hangulmon_celebrating.png" />
            ) : (
              <HaneulmonBow reducedMotion={false} size={STAGE} />
            )}
          </div>
          <span aria-hidden className={styles.crown}>
            <svg viewBox="-4 -4 108 78">
              <path d="M8 58 L4 18 L28 36 L50 6 L72 36 L96 18 L92 58 Z" fill="#FFD900" stroke="#E5AE00" strokeLinejoin="round" strokeWidth="3" />
              <path d="M14 30 L28 41 L50 13 L52 20 L30 46 L16 37 Z" fill="#FFF3A6" opacity="0.7" />
              <path d="M8 54 H92 V66 Q92 70 88 70 H12 Q8 70 8 66 Z" fill="#E5AE00" stroke="#C99400" strokeWidth="2" />
              <circle cx="4" cy="17" fill="#FFD900" r="5" stroke="#E5AE00" strokeWidth="2" />
              <circle cx="50" cy="6" fill="#FFD900" r="6" stroke="#E5AE00" strokeWidth="2" />
              <circle cx="96" cy="17" fill="#FFD900" r="5" stroke="#E5AE00" strokeWidth="2" />
              <circle cx="28" cy="62" fill="#E5379B" r="4" />
              <circle cx="50" cy="62" fill="#776EE2" r="5" />
              <circle cx="72" cy="62" fill="#E5379B" r="4" />
            </svg>
          </span>
        </div>

        <strong className={styles.hangul} lang="ko">감사합니다</strong>
        {/* 손편지 한 줄 — 왼쪽부터 써진다 */}
        <p className={styles.letter} data-i18n={letterKey}>
          {uzt(letterKey, { days, name })}
        </p>

        <div className={styles.titleRow}>
          <span className={`${styles.tag} ${tier === "max" ? styles.tagMax : ""}`} data-no-translate>
            <MobileIcon name="star" size={12} />
            {tierName}
          </span>
          <h2 data-i18n="superWelcome.title">{uzt("superWelcome.title", { tier: tierName })}</h2>
        </div>

        <ul className={styles.perks}>
          {PERKS[tier].map((perk, index) => (
            <li key={perk.key} style={{ "--perk-at": ms(PERKS_AT + index * PERK_GAP) } as CSSProperties}>
              <i>
                <MobileIcon name={perk.icon} size={18} />
              </i>
              <span data-i18n={`premium.features.${perk.key}`}>{uzt(`premium.features.${perk.key}`)}</span>
              <MobileIcon className={styles.check} name="checkmark-circle" size={20} />
            </li>
          ))}
        </ul>
      </div>

      <footer className={styles.footer}>
        {ctaReady ? (
          <div className={styles.cta} onClick={(event) => event.stopPropagation()}>
            <Button3D
              className={styles.gold}
              i18nKey="superWelcome.cta"
              label={uzt("superWelcome.cta", { tier: tierName })}
              onClick={onDone}
              tone="amber"
            />
          </div>
        ) : (
          <small data-i18n="superWelcome.skip">{uzt("superWelcome.skip")}</small>
        )}
      </footer>

      {landed && !reduced ? <Confetti /> : null}
    </div>
  );
}
