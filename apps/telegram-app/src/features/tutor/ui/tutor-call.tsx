"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { romanize } from "../../../shared/lib/romanize";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import type { TutorState, VoiceTutorEmotion } from "../model/voice-tutor";
import { TUTOR_ACCENT, TUTOR_STATE_LABELS, hexA, tutorErrorText } from "./tutor-labels";
import { TutorMascot } from "./tutor-mascot";
import styles from "./tutor-call.module.css";

const fmt = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

/** 표현이 "나왔는지" 볼 때는 띄어쓰기·문장부호를 버리고 본다 */
const norm = (value: string) => value.replace(/[^가-힣a-z0-9]/gi, "").toLowerCase();

/** "저는 ~라고 해요" 같은 틀은 ~ 앞뒤 조각이 순서대로 다 나오면 쓴 걸로 본다 (모바일과 같다) */
function matchesTarget(saidNorm: string, target: string): boolean {
  const parts = target.split("~").map(norm).filter((part) => part.length >= 1);
  if (parts.join("").length < 2) return false;
  let from = 0;
  for (const part of parts) {
    const at = saidNorm.indexOf(part, from);
    if (at < 0) return false;
    from = at + part.length;
  }
  return true;
}

/** KORIO 보라. 마스코트 안테나에 쓴다 */
const BRAND = "#776ee2";

/**
 * 통화 화면 배경 — 깊은 밤바다 톤 (모바일 SCENE 과 같은 값).
 * 청록 바탕이면 라벤더 마스코트와 노란 눈이 보색으로 떠서 캐릭터가 주인공이 된다.
 */
const SCENE = { drift: "#2EC4B6", key: "#B3A6FF" };

const WAVE = [
  { delay: 0, peak: 0.42 },
  { delay: 90, peak: 0.86 },
  { delay: 180, peak: 1 },
  { delay: 270, peak: 0.68 },
  { delay: 360, peak: 0.34 },
];

export interface TutorCallProps {
  active: boolean;
  analyzing: boolean;
  audioBlocked: boolean;
  canReplay: boolean;
  caption: string;
  captionPrev: string;
  elapsedSec: number;
  /** 선생님 답의 감정 — 마스코트 표정 */
  emotion?: VoiceTutorEmotion;
  /** 에러 코드 */
  error: string | null;
  /** 지금 따라 할 문장. 방금 선생님이 고쳐 준 표현이 오면 그게 1순위다 */
  focusHint: string;
  /** 이 수업 최대 길이(초). 있으면 타이머가 남은 시간을 보여 준다 */
  limitSec: number;
  micOn: boolean;
  onClose: () => void;
  onEnd: () => void;
  onExplain: () => void;
  onReplay: () => void;
  onResumeAudio: () => void;
  onSlower: () => void;
  /** 정확한 한국어 목소리로 들려준다. 끝날 때까지 기다린다 */
  playKorean: (text: string, slow: boolean) => Promise<void>;
  state: TutorState;
  /** 이번 주제에서 써 볼 표현 (주제 수업일 때만) */
  targets: string[];
  teacherName?: string;
  /** 성격 이름 (우즈벡어 원문) */
  teacherPersonality?: string;
  toggleMic: () => void;
  topicTitle?: string;
  userSaid: string;
  withMicMuted: (play: () => Promise<void>) => Promise<void>;
}

function useViewportHeight() {
  const [height, setHeight] = useState(800);
  useEffect(() => {
    const read = () => setHeight(window.innerHeight);
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);
  return height;
}

/**
 * 새 Voice Tutor 통화 화면 — 모바일 VoiceTutorCallScreen.tsx.
 *
 * 예전 텔레그램 튜터 화면에서 바꾼 것 (모바일과 같다): 배경을 밤바다 청록으로,
 * 오른쪽 위 응원 문구 제거, 가운데 이모지 → 마스코트, 막혔을 때 버튼 셋은
 * 선생님(워커)에게 직접 요청, 타이머는 남은 시간.
 */
export function TutorCall(p: TutorCallProps) {
  const height = useViewportHeight();
  const [showText, setShowText] = useState(true);
  const [roman, setRoman] = useState(true);
  const [copied, setCopied] = useState(false);
  const [doneCount, setDoneCount] = useState(0);
  const doneRef = useRef<Set<string>>(new Set());

  const accent = TUTOR_ACCENT[p.state] ?? TUTOR_ACCENT.idle;
  const remain = p.limitSec > 0 ? Math.max(0, p.limitSec - p.elapsedSec) : null;
  const nearEnd = p.active && remain !== null && remain <= 30;
  const avatarSize = height < 700 ? 132 : height < 820 ? 154 : 172;

  // 오늘의 표현을 유저가 직접 말했을 때만 채운다. 선생님이 말한 건 진도가 아니다
  useEffect(() => {
    if (!p.userSaid || p.targets.length === 0) return;
    const said = norm(p.userSaid);
    if (!said) return;
    let changed = false;
    for (const expression of p.targets) {
      if (doneRef.current.has(expression)) continue;
      if (matchesTarget(said, expression)) {
        doneRef.current.add(expression);
        changed = true;
      }
    }
    if (changed) setDoneCount(doneRef.current.size);
  }, [p.userSaid, p.targets]);

  /** 지금 화면에서 "따라 할 한 문장" */
  const focus = useMemo(() => {
    if (p.focusHint) return p.focusHint;
    const next = p.targets.find((expression) => !doneRef.current.has(expression));
    return next ?? p.targets[0] ?? "";
    // doneCount 가 바뀌면 다음 표현으로 넘어간다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.focusHint, p.targets, doneCount]);

  const { playKorean, withMicMuted } = p;

  const play = useCallback(
    (text: string, slow: boolean) => {
      if (!text.trim()) return;
      window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
      void withMicMuted(() => playKorean(text.trim(), slow));
    },
    [playKorean, withMicMuted],
  );

  const copy = useCallback(async () => {
    if (!focus) return;
    try {
      await navigator.clipboard.writeText(focus);
    } catch {
      // 클립보드가 막힌 WebView 에서도 체크 표시는 보여준다
    }
    window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }, [focus]);

  const hasTargets = p.targets.length > 0;
  const pct = hasTargets ? doneCount / p.targets.length : 0;
  const waveActive = p.state === "speaking" || p.state === "listening";
  const errorText = tutorErrorText(p.error);

  const rootVars = {
    "--accent": accent,
    "--blob-a": hexA(SCENE.drift, 0.26),
    "--blob-b": hexA(accent, 0.16),
    "--key-light": hexA(SCENE.key, 0.38),
    "--glow-dur": `${p.state === "speaking" ? 820 : p.state === "listening" ? 2000 : 3000}ms`,
    "--wave-dur": `${p.state === "speaking" ? 400 : 820}ms`,
    "--play-bg": hexA(BRAND, 0.16),
    "--teacher": BRAND,
  } as CSSProperties;

  return (
    <main className={styles.root} style={rootVars}>
      {/* 배경 네 겹: 밤바다 그라데이션 · 표류하는 빛 둘 · 호흡하는 키라이트 · 비스듬한 빛 */}
      <div aria-hidden="true" className={styles.backdrop}>
        <i className={styles.blobA} />
        <i className={styles.blobB} />
        <i className={styles.keyLight} />
        <i className={styles.streak} />
      </div>

      <div className={styles.stage}>
        <TutorMascot emotion={p.emotion} size={Math.round(avatarSize * 0.86)} state={p.state} tint={BRAND} />
      </div>

      <i aria-hidden="true" className={styles.scrim} />

      <header className={styles.header}>
        <button aria-label="Yopish" className={styles.iconButton} onClick={p.onClose} type="button">
          <MobileIcon name="chevron-down" size={26} />
        </button>

        <div className={styles.idText}>
          <div className={styles.idNameRow}>
            <strong data-no-translate="">{p.teacherName ?? "Ovozli AI ustoz"}</strong>
          </div>
          <p className={styles.idRole}>
            {p.teacherPersonality ? (
              <>
                <span>{p.teacherPersonality}</span>
                <i>·</i>
              </>
            ) : null}
            <span>Koreys tili ustozi</span>
          </p>
        </div>

        <div className={styles.headerRight}>
          {p.active ? (
            <span className={`${styles.timer} ${nearEnd ? styles.timerWarn : ""}`}>
              <MobileIcon name="time-outline" size={13} />
              {fmt(remain ?? p.elapsedSec)}
            </span>
          ) : null}
          <button
            aria-label="Lotin yozuvi"
            aria-pressed={roman}
            className={`${styles.tune} ${roman ? styles.tuneOn : ""}`}
            onClick={() => setRoman((value) => !value)}
            type="button"
          >
            <MobileIcon name="options-outline" size={18} />
          </button>
        </div>
      </header>

      <div className={styles.topRow}>
        <div className={styles.progressCard}>
          <div className={styles.progressTop}>
            <span aria-hidden="true">{p.topicTitle ? "☕" : "💬"}</span>
            {p.topicTitle ? (
              <strong data-no-translate="">{p.topicTitle}</strong>
            ) : (
              <strong data-i18n="voiceTutor.call.freeTalk">Erkin suhbat</strong>
            )}
          </div>
          {hasTargets ? (
            <>
              <small className={styles.progressStep}>{`Bosqich ${doneCount} / ${p.targets.length}`}</small>
              <div className={styles.progressBarRow}>
                <span className={styles.track}>
                  <i style={{ transform: `scaleX(${Math.max(0, Math.min(1, pct))})` }} />
                </span>
                <b>{Math.round(pct * 100)}%</b>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className={styles.spacer} />

      {showText ? (
        <section aria-live="polite" className={styles.glass}>
          <div className={styles.waveRow}>
            <span className={styles.wave}>
              {WAVE.map((bar, index) => (
                <i
                  className={waveActive ? styles.waveBarOn : styles.waveBar}
                  key={index}
                  style={{ "--peak": bar.peak, animationDelay: `${bar.delay}ms` } as CSSProperties}
                />
              ))}
            </span>
            <b className={styles.waveLabel}>{TUTOR_STATE_LABELS[p.state]}</b>
          </div>

          {p.userSaid && p.active ? (
            <div className={styles.userRow}>
              <p data-no-translate="">{p.userSaid}</p>
              <i />
            </div>
          ) : null}

          {p.captionPrev ? <p className={styles.captionPrev} data-no-translate="">{p.captionPrev}</p> : null}

          {p.caption ? (
            <p className={styles.caption} data-no-translate="" key={p.caption}>{p.caption}</p>
          ) : (
            <p className={styles.captionIdle}>
              {p.active ? "Avval salomlashing" : TUTOR_STATE_LABELS[p.state]}
            </p>
          )}
        </section>
      ) : null}

      {/* 따라 할 한 문장. 화면에서 유일하게 밝은 덩어리다 */}
      {focus && p.active ? (
        <section className={styles.card}>
          <span className={styles.cardBadge}>Bugungi ibora</span>
          <div className={styles.cardBody}>
            <button aria-label="Eshitish" className={styles.cardPlay} onClick={() => play(focus, false)} type="button">
              <MobileIcon name="volume-high" size={18} />
            </button>
            <button className={styles.cardTextWrap} onClick={() => play(focus, false)} type="button">
              <strong data-no-translate="">{focus}</strong>
              {roman ? <small data-no-translate="">{romanize(focus)}</small> : null}
            </button>
            <button aria-label="Nusxalash" className={`${styles.cardCopy} ${copied ? styles.cardCopied : ""}`} onClick={() => void copy()} type="button">
              <MobileIcon name={copied ? "checkmark" : "copy-outline"} size={18} />
            </button>
          </div>
        </section>
      ) : null}

      {/* 막혔을 때 바로 누를 세 가지 — 선생님(워커)에게 직접 요청한다 */}
      {p.active ? (
        <div className={styles.pills}>
          <Pill disabled={p.state === "connecting"} emoji="🐌" label="Sekinroq ayting" onClick={p.onSlower} />
          <Pill disabled={!p.canReplay} emoji="🔄" label="Qayta eshitish" onClick={p.onReplay} />
          <Pill disabled={p.state === "connecting"} emoji="💡" label="Tushuntiring" onClick={p.onExplain} />
        </div>
      ) : null}

      {errorText ? <p className={styles.error}>{errorText}</p> : null}

      {/* 통화 조작. 항상 하단 고정 */}
      <footer className={styles.controls}>
        {p.active ? (
          <>
            <RoundButton
              icon={p.micOn ? "mic" : "mic-off"}
              label={p.micOn ? "Mikrofonni o'chirish" : "Mikrofonni yoqish"}
              on={!p.micOn}
              onClick={p.toggleMic}
            />
            <div className={styles.endCol}>
              <button aria-label="Darsni tugatish" className={styles.end} onClick={p.onEnd} type="button">
                <MobileIcon name="call" size={28} />
              </button>
              <span>Darsni tugatish</span>
            </div>
            <RoundButton
              icon={showText ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
              label={showText ? "Matnni yashirish" : "Matnni ko'rsatish"}
              on={!showText}
              onClick={() => setShowText((value) => !value)}
            />
          </>
        ) : (
          <div className={styles.controlsIdle} />
        )}
      </footer>

      <p className={styles.brand}>
        <span data-no-translate="">KORIO · </span>
        <span>Bugun mashq — ertaga natija</span>
        <span data-no-translate=""> ♡</span>
      </p>

      {/* 웹 전용: 브라우저가 자동재생을 막으면 선생님 목소리가 안 들린다 — 한 번 탭해서 푼다 */}
      {p.audioBlocked && p.active ? (
        <button className={styles.audioUnlock} onClick={p.onResumeAudio} type="button">
          <MobileIcon name="volume-high" size={20} />
          <span>Ustozni eshitish uchun bosing</span>
        </button>
      ) : null}

      {p.analyzing ? (
        <div className={styles.analyzing}>
          <span className={styles.spinner} />
          <p>Bugungi dars yakunlanmoqda...</p>
        </div>
      ) : null}
    </main>
  );
}

function Pill({ disabled, emoji, label, onClick }: { disabled?: boolean; emoji: string; label: string; onClick: () => void }) {
  return (
    <button className={styles.pill} disabled={disabled} onClick={onClick} type="button">
      <span aria-hidden="true">{emoji}</span>
      <b>{label}</b>
    </button>
  );
}

function RoundButton({ icon, label, on, onClick }: { icon: IoniconName; label: string; on?: boolean; onClick: () => void }) {
  return (
    <div className={styles.ctrlCol}>
      <button
        aria-label={label}
        aria-pressed={on}
        className={`${styles.round} ${on ? styles.roundOn : ""}`}
        onClick={() => {
          window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
          onClick();
        }}
        type="button"
      >
        <MobileIcon name={icon} size={22} />
      </button>
      <span>{label}</span>
    </div>
  );
}
