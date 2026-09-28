"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import type { AnswerGradeResult, AnswerState } from "../model/lesson";
import styles from "./lesson-chrome.module.css";

/**
 * 레슨 화면의 틀 — 모바일 components/lesson 의 LessonHeader · FeedbackBar ·
 * CheckButton · QuitLessonModal 과 같은 모양·동작.
 *
 * 문구는 우즈벡어 원문(locales/uz lesson.*) 그대로 — 카탈로그가 UI 언어로 바꾼다.
 */

/* ───────────────────────── LessonHeader ───────────────────────── */

export function LessonHeader({
  answerState,
  combo,
  energy,
  hearts,
  isSuper,
  maxHearts,
  onClose,
  progress,
  showCombo,
  showHearts,
  badge,
}: {
  progress: number; // 0~1
  combo: number;
  energy: number;
  answerState: AnswerState;
  onClose: () => void;
  isSuper: boolean;
  hearts: number;
  maxHearts: number;
  showHearts: boolean;
  showCombo: boolean;
  /** 에너지 자리에 대신 둘 것 (레벨 테스트의 "Sinov" 등) */
  badge?: ReactNode;
}) {
  // 정답이면 바가 한 번 부풀고 광택이 훑고 지나간다
  const [flashKey, setFlashKey] = useState(0);
  useEffect(() => {
    if (answerState === "correct") setFlashKey((value) => value + 1);
  }, [answerState]);

  // 콤보 숫자가 오를 때마다 팝
  const [comboKey, setComboKey] = useState(0);
  const previousCombo = useRef(combo);
  useEffect(() => {
    if (combo > previousCombo.current && combo >= 1) setComboKey((value) => value + 1);
    previousCombo.current = combo;
  }, [combo]);

  return (
    <header className={styles.header}>
      {combo >= 1 && showCombo ? (
        <div className={styles.comboWrap}>
          <b className={styles.comboText} key={comboKey}>
            <span>Combo</span> <span data-no-translate>x{combo}</span>
          </b>
        </div>
      ) : null}

      <div className={styles.headerRow}>
        <button aria-label="Yopish" className={styles.close} onClick={onClose} type="button">
          <MobileIcon name="close" size={28} />
        </button>

        <div className={styles.track}>
          <span
            className={`${styles.fill} ${flashKey ? styles.fillBump : ""}`}
            key={flashKey}
            style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
          >
            <i className={styles.fillHighlight} />
            <i className={styles.shimmer} />
          </span>
        </div>

        {badge ? (
          <div className={styles.badge}>{badge}</div>
        ) : showHearts ? (
          <div aria-label={`${hearts} / ${maxHearts}`} className={styles.hearts}>
            {Array.from({ length: maxHearts }, (_, index) => (
              <MobileIcon className={index < hearts ? styles.heartOn : styles.heartOff} key={index} name="heart" size={22} />
            ))}
          </div>
        ) : isSuper ? (
          <span className={styles.superBadge}><b>SUPER</b></span>
        ) : (
          <span className={styles.energyBadge} key={energy}>
            <i><MobileIcon family="material-community" name="lightning-bolt" size={14} /></i>
            <b data-no-translate>{energy}</b>
          </span>
        )}
      </div>
    </header>
  );
}

/* ───────────────────────── CheckButton ───────────────────────── */

/**
 * 모든 문제 타입 공용 확인 버튼. 입체(바텀 두께) + 누르면 내려앉는다.
 * 위에 "건너뛰기" 링크를 같이 띄울 수 있다.
 */
export function CheckButton({
  above,
  disabled = false,
  label = "Tekshirish",
  loading = false,
  onClick,
  onSkip,
  skipLabel,
  tone = "primary",
}: {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  skipLabel?: string;
  onSkip?: () => void;
  tone?: "primary" | "success" | "danger";
  /** 확인 버튼 위, 같이 바닥에 붙어 있을 것 (번역 쓰기의 마이크 버튼 등) */
  above?: ReactNode;
}) {
  const off = disabled || loading;
  return (
    <div className={styles.checkWrap}>
      {above}
      {skipLabel && onSkip ? (
        <button className={styles.skipLink} onClick={onSkip} type="button">{skipLabel}</button>
      ) : null}
      <button
        className={`${styles.check} ${styles[`tone_${tone}`]}`}
        disabled={off}
        onClick={() => {
          if (off) return;
          window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
          onClick();
        }}
        type="button"
      >
        <span>{loading ? <i className={styles.checkSpinner} /> : label}</span>
      </button>
    </div>
  );
}

/* ───────────────────────── FeedbackBar ───────────────────────── */

const HILL_W = 400;
const HILL_H = 72;
const SEGMENTS = 44;
type Bump = { c: number; w: number; h: number };
const LAYERS: { bumps: Bump[]; travel: number; amp: number }[] = [
  { bumps: [{ c: -0.1, w: 0.3, h: 1 }, { c: 0.42, w: 0.24, h: 0.78 }, { c: 0.85, w: 0.32, h: 0.92 }], travel: 1.5, amp: 58 },
  { bumps: [{ c: 0.08, w: 0.26, h: 0.9 }, { c: 0.6, w: 0.3, h: 1 }], travel: 1.3, amp: 50 },
  { bumps: [{ c: -0.05, w: 0.34, h: 0.95 }, { c: 0.55, w: 0.26, h: 0.82 }, { c: 1.0, w: 0.28, h: 0.9 }], travel: 1.15, amp: 42 },
];
const HILL_COLORS = {
  correct: ["#A5E86B", "#C2F58F", "#D7FFB8"],
  guidance: ["#FFD36A", "#FFE39A", "#FFF1C7"],
  wrong: ["#FFB3B5", "#FFC9CB", "#FFDFE0"],
};
const SHARDS = [
  { x: 0.08, size: 14, dx: -26, dy: -46, rot: -140, delay: 0.02 },
  { x: 0.22, size: 9, dx: 14, dy: -62, rot: 120, delay: 0.1 },
  { x: 0.38, size: 17, dx: -10, dy: -38, rot: 90, delay: 0 },
  { x: 0.52, size: 8, dx: 22, dy: -58, rot: -100, delay: 0.14 },
  { x: 0.66, size: 13, dx: 8, dy: -44, rot: 150, delay: 0.06 },
  { x: 0.8, size: 10, dx: 28, dy: -54, rot: -80, delay: 0.12 },
  { x: 0.92, size: 15, dx: 18, dy: -40, rot: 110, delay: 0.04 },
];

/** 둥근 언덕 실루엣. p(0→1) 가 커질수록 오른쪽으로 흘러가며 낮아진다 */
function hillPath(p: number, bumps: Bump[], travel: number, amp: number) {
  const step = HILL_W / SEGMENTS;
  const shift = p * travel;
  const fade = Math.max(0, 1 - p);
  let d = "";
  for (let index = 0; index <= SEGMENTS; index += 1) {
    const u = index / SEGMENTS;
    let rise = 0;
    for (const bump of bumps) {
      const dx = (u - (bump.c + shift)) / bump.w;
      rise += bump.h * Math.exp(-dx * dx);
    }
    const y = HILL_H - rise * amp * fade;
    d += index === 0 ? `M 0 ${y}` : ` L ${index * step} ${y}`;
  }
  return `${d} L ${HILL_W} ${HILL_H} L 0 ${HILL_H} Z`;
}

export function FeedbackBar({
  answer,
  answerTranslation,
  explanation,
  gradingFeedback,
  nextLabel = "Davom etish",
  onNext,
  state,
  busy = false,
}: {
  state: AnswerState;
  answer?: string;
  answerTranslation?: string;
  explanation?: string;
  gradingFeedback?: AnswerGradeResult | null;
  onNext: () => void;
  nextLabel?: string;
  busy?: boolean;
}) {
  const [progress, setProgress] = useState(0);

  // 피드백이 뜰 때마다 언덕이 한 번 훑고 지나간다 (2.25초, ease-out)
  useEffect(() => {
    if (state === "idle") return;
    let frame = 0;
    const started = performance.now() + 60;
    const tick = (now: number) => {
      const t = Math.max(0, Math.min(1, (now - started) / 2250));
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    setProgress(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [state]);

  if (state === "idle") return null;

  const correct = state === "correct";
  const guidance =
    gradingFeedback?.result === "almost" ||
    gradingFeedback?.result === "target_missing" ||
    gradingFeedback?.source === "fallback";
  const tone = guidance ? "guidance" : correct ? "correct" : "wrong";
  const colors = HILL_COLORS[tone];
  const label = gradingFeedback?.title ?? (correct ? "Juda zo'r!" : "Noto'g'ri!");
  const meaning = answerTranslation || explanation || "";
  const corrected = gradingFeedback?.correction || (!correct ? answer : "");

  return (
    <aside className={`${styles.feedback} ${styles[`fb_${tone}`]}`}>
      <div className={styles.hillWrap}>
        <svg aria-hidden="true" preserveAspectRatio="none" viewBox={`0 0 ${HILL_W} ${HILL_H}`}>
          {colors.map((color, index) => (
            <path d={hillPath(progress, LAYERS[index]!.bumps, LAYERS[index]!.travel, LAYERS[index]!.amp)} fill={color} key={color} />
          ))}
        </svg>
        {SHARDS.map((shard, index) => {
          const p = Math.max(0, Math.min(1, (progress - shard.delay) / (1 - shard.delay)));
          return (
            <i
              className={styles.shard}
              key={index}
              style={{
                height: shard.size,
                left: `${shard.x * 100}%`,
                opacity: p === 0 ? 0 : 1 - p,
                transform: `translate(${shard.dx * p}px, ${shard.dy * p}px) rotate(${shard.rot * p}deg) scale(${0.6 + p * 0.5})`,
                width: shard.size,
              } as CSSProperties}
            />
          );
        })}
      </div>

      <div className={styles.fbBody}>
        <div className={styles.fbHead}>
          {/* 정답·오답 반응을 캐릭터로 — 아이콘보다 감정이 바로 읽힌다 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className={styles.fbMascot} src={correct ? "/characters/hangulmon_correct.png" : "/characters/hangulmon_wrong.png"} />
          <strong className={styles.fbTitle}>
            {!gradingFeedback && meaning ? `${label} Ma'nosi:` : label}
          </strong>
          <span className={styles.fbIcons}>
            <MobileIcon name="share-outline" size={26} />
            <MobileIcon name="flag-outline" size={26} />
          </span>
        </div>
        {corrected ? <p className={styles.fbAnswer} data-no-translate>{corrected}</p> : null}
        {gradingFeedback?.feedback ? <p className={styles.fbFeedback}>{gradingFeedback.feedback}</p> : null}
        {meaning ? <p className={styles.fbMeaning} data-no-translate>{meaning}</p> : null}
        <button className={styles.fbButton} disabled={busy} onClick={onNext} type="button">
          <span>{busy ? <i className={styles.checkSpinner} /> : nextLabel}</span>
        </button>
      </div>
    </aside>
  );
}

/* ───────────────────────── QuitLessonModal ───────────────────────── */

export function QuitLessonModal({ onContinue, onQuit, visible }: { visible: boolean; onContinue: () => void; onQuit: () => void }) {
  if (!visible) return null;
  return (
    <div aria-modal="true" className={styles.quitBackdrop} role="dialog">
      <button aria-label="Davom etish" className={styles.quitDismiss} onClick={onContinue} type="button" />
      <section className={styles.quitSheet}>
        <i className={styles.quitHandle} />
        {/* 나가려는 걸 붙잡는 자리라 안절부절 표정 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className={styles.quitMascot} src="/characters/hangulmon_waiting.png" />
        <h2>Shoshmang, bu darsga atigi 1 daqiqa qoldi!</h2>
        <button className={styles.quitContinue} onClick={onContinue} type="button">Davom etish</button>
        <button className={styles.quitLeave} onClick={onQuit} type="button">To&apos;xtatish</button>
      </section>
    </div>
  );
}

/* ───────────────────────── ReviewIntro ───────────────────────── */

/** 본편이 끝나고 틀린 문제 복습으로 넘어가기 전 한 번 — 앱의 reviewIntro 단계 */
export function ReviewIntro({ onContinue }: { onContinue: () => void }) {
  return (
    <section className={styles.reviewIntro}>
      <div className={styles.reviewCenter}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src="/characters/hangulmon_review.png" />
        <p className={styles.reviewBubble}>Endi xato qilgan savollarni ishlaymizmi?</p>
      </div>
      <button className={styles.quitContinue} onClick={onContinue} type="button">Davom etish</button>
    </section>
  );
}
