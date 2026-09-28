"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { romanize } from "../../../shared/lib/romanize";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import type { TutorQuota, TutorState } from "../model/tutor";
import { TutorCharacter } from "./tutor-character";
import {
  TUTOR_ACCENT,
  TUTOR_ERROR_LABELS,
  TUTOR_PERSONALITY_LABELS,
  TUTOR_STATE_LABELS,
  hexA,
} from "./tutor-labels";
import styles from "./tutor-call.module.css";

const fmt = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

/** 표현이 "나왔는지" 볼 때는 띄어쓰기·문장부호를 버리고 본다 */
const norm = (value: string) => value.replace(/[^가-힣a-z0-9]/gi, "").toLowerCase();

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
  busy: boolean;
  caption: string;
  captionPrev: string;
  elapsedSec: number;
  error: string | null;
  examples: string[];
  maxSec: number;
  micOn: boolean;
  onClose: () => void;
  onEnd: () => void;
  onExplain: (text: string) => Promise<string>;
  onPickAnother: () => void;
  onResumeAudio: () => void;
  onUpsell: () => void;
  /** 정확한 한국어 목소리로 들려준다. 끝날 때까지 기다린다 */
  playKorean: (text: string, slow: boolean) => Promise<void>;
  quota: TutorQuota | null;
  state: TutorState;
  targets: string[];
  teacher: { id: string; avatar: string; color: string } | null;
  teacherName?: string;
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
 * 통화 중 화면 — 모바일 screens/TutorCallScreen.tsx.
 *
 * 라이트 모드에서도 어둡게 간다. 통화 화면은 몰입이 전부라 흰 배경이면 채팅창처럼 보인다.
 * 대신 흰 표현 카드가 유일한 밝은 덩어리라서 눈이 거기로 간다.
 */
export function TutorCall(p: TutorCallProps) {
  const height = useViewportHeight();
  const [showText, setShowText] = useState(true);
  const [explain, setExplain] = useState("");
  const [explaining, setExplaining] = useState(false);
  const [roman, setRoman] = useState(true);
  const [copied, setCopied] = useState(false);
  const [doneCount, setDoneCount] = useState(0);
  const doneRef = useRef<Set<string>>(new Set());

  const accent = TUTOR_ACCENT[p.state] ?? TUTOR_ACCENT.idle;
  const teacherColor = p.teacher?.color ?? "#8B82EE";
  const remain = p.maxSec > 0 ? Math.max(0, p.maxSec - p.elapsedSec) : 0;
  const nearEnd = p.active && p.maxSec > 0 && remain <= 30;
  const avatarSize = height < 700 ? 132 : height < 820 ? 154 : 172;

  useEffect(() => {
    setExplain("");
  }, [p.caption]);

  // 오늘의 표현을 유저가 직접 말했을 때만 채운다. 선생님이 말한 건 진도가 아니다
  useEffect(() => {
    if (!p.userSaid || p.targets.length === 0) return;
    const said = norm(p.userSaid);
    if (!said) return;
    let changed = false;
    for (const expression of p.targets) {
      if (doneRef.current.has(expression)) continue;
      const key = norm(expression);
      if (key.length >= 2 && said.includes(key)) {
        doneRef.current.add(expression);
        changed = true;
      }
    }
    if (changed) setDoneCount(doneRef.current.size);
  }, [p.userSaid, p.targets]);

  /** 지금 화면에서 "따라 할 한 문장" */
  const focus = useMemo(() => {
    if (p.examples[0]) return p.examples[0];
    const next = p.targets.find((expression) => !doneRef.current.has(expression));
    return next ?? p.targets[0] ?? "";
    // doneCount 가 바뀌면 다음 표현으로 넘어간다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.examples, p.targets, doneCount]);

  const replayText = p.caption.trim() || focus;
  const { playKorean, withMicMuted, onExplain } = p;

  const play = useCallback(
    (text: string, slow: boolean) => {
      if (!text.trim()) return;
      window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
      void withMicMuted(() => playKorean(text.trim(), slow));
    },
    [playKorean, withMicMuted],
  );

  const loadExplain = useCallback(async () => {
    const source = p.caption.trim() || focus.trim();
    if (!source || explaining) return;
    setShowText(true);
    setExplaining(true);
    try {
      setExplain(await onExplain(source));
    } finally {
      setExplaining(false);
    }
  }, [explaining, focus, onExplain, p.caption]);

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

  const rootVars = {
    "--accent": accent,
    "--blob-a": hexA(teacherColor, 0.34),
    "--blob-b": hexA(accent, 0.2),
    "--key-light": hexA(teacherColor, 0.5),
    "--glow-dur": `${p.state === "speaking" ? 820 : p.state === "listening" ? 2000 : 3000}ms`,
    "--wave-dur": `${p.state === "speaking" ? 400 : 820}ms`,
    "--play-bg": hexA(teacherColor, 0.16),
    "--teacher": teacherColor,
  } as CSSProperties;

  return (
    <main className={styles.root} style={rootVars}>
      {/* 배경 네 겹: 저녁 방 그라데이션 · 표류하는 색 덩어리 둘 · 호흡하는 키라이트 · 비스듬한 빛 */}
      <div aria-hidden="true" className={styles.backdrop}>
        <i className={styles.blobA} />
        <i className={styles.blobB} />
        <i className={styles.keyLight} />
        <i className={styles.streak} />
      </div>

      <div className={styles.stage}>
        <TutorCharacter
          avatar={p.teacher?.avatar ?? "🧑‍🏫"}
          color={teacherColor}
          size={avatarSize}
          state={p.state}
        />
      </div>

      <i aria-hidden="true" className={styles.scrim} />

      <header className={styles.header}>
        <button aria-label="Yopish" className={styles.iconButton} onClick={p.onClose} type="button">
          <MobileIcon name="chevron-down" size={26} />
        </button>

        <div className={styles.idText}>
          <div className={styles.idNameRow}>
            <strong>{p.teacherName ?? "AI suhbat ustozi"}</strong>
            <span aria-hidden="true">{p.teacher?.avatar ?? "🧑‍🏫"}</span>
          </div>
          <p className={styles.idRole}>
            {p.teacherPersonality && TUTOR_PERSONALITY_LABELS[p.teacherPersonality] ? (
              <>
                <span>{TUTOR_PERSONALITY_LABELS[p.teacherPersonality]}</span>
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
              {fmt(remain)}
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
            {p.topicTitle ? <strong>{p.topicTitle}</strong> : <strong data-i18n="tutor.freeTalk">Erkin suhbat</strong>}
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

        {/* 선생님이 말하는 중엔 비켜준다 */}
        {p.active && p.state !== "speaking" ? (
          <p className={styles.cheer}>{"Yana bir oz!\nSen uddalaysan!"}</p>
        ) : null}
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

          {explain ? <p className={styles.explainText} data-no-translate="">{explain}</p> : null}
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

      {p.active ? (
        <div className={styles.pills}>
          <Pill disabled={!replayText.trim()} emoji="🐌" label="Sekinroq ayting" onClick={() => play(replayText, true)} />
          <Pill disabled={!replayText.trim()} emoji="🔄" label="Qayta eshitish" onClick={() => play(replayText, false)} />
          <Pill
            disabled={explaining || !(p.caption.trim() || focus.trim())}
            emoji={explaining ? "⏳" : "💡"}
            label="Tushuntiring"
            onClick={() => void loadExplain()}
          />
        </div>
      ) : null}

      {p.error ? (
        <p className={styles.error}>{TUTOR_ERROR_LABELS[p.error] ?? TUTOR_ERROR_LABELS.generic}</p>
      ) : null}

      {!p.active && !p.analyzing && p.quota ? (
        <div className={styles.quota}>
          <p>{`Bugun ${Math.max(0, p.quota.dailyLimitMin - p.quota.dailyUsedMin)} daqiqa qoldi (kuniga ${p.quota.dailyLimitMin} daqiqa)`}</p>
          {!p.quota.isMax ? (
            <button onClick={p.onUpsell} type="button">KORIO MAX bilan kuniga 20 daqiqa</button>
          ) : null}
        </div>
      ) : null}

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
          <button className={styles.again} disabled={p.busy || p.analyzing} onClick={p.onPickAnother} type="button">
            <MobileIcon name="refresh" size={19} />
            <span>Boshqa mavzu tanlash</span>
          </button>
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
          <p>Suhbat tahlil qilinmoqda...</p>
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
