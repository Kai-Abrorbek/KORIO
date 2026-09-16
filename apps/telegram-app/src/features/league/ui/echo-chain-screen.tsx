"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { useKoreanSpeech } from "../../../shared/browser/use-korean-speech";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useGameWords } from "../model/use-game-words";
import { useLeagueChallenge } from "../model/use-league-challenge";
import styles from "./echo-chain-screen.module.css";

const GRID = 9;
const MAX_HEARTS = 3;
const GAP_MS = 950;
type Phase = "listen" | "input" | "between";

function shuffle<T>(items: T[]) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const random = Math.floor(Math.random() * (index + 1));
    [result[index], result[random]] = [result[random]!, result[index]!];
  }
  return result;
}

export function EchoChainScreen() {
  const { request } = useTelegramAuth();
  const { finish, isChallenge } = useLeagueChallenge();
  const { words: pool, loading, failed, reload } = useGameWords(GRID * 2, 4);
  const { prewarm, speak, stop } = useKoreanSpeech(request);
  const gridWords = useMemo(() => shuffle(pool ?? []).slice(0, GRID), [pool]);
  const [round, setRound] = useState(1);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<Phase>("between");
  const [sequence, setSequence] = useState<number[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [tapFlash, setTapFlash] = useState<{ index: number; okay: boolean } | null>(null);
  const [over, setOver] = useState(false);
  const inputPosition = useRef(0);
  const timers = useRef<number[]>([]);
  const started = useRef(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  useEffect(() => {
    if (gridWords.length) prewarm(gridWords.map((word) => word.ko));
  }, [gridWords, prewarm]);

  const playSequence = useCallback((nextSequence: number[]) => {
    setPhase("listen");
    setPlayingIndex(null);
    nextSequence.forEach((gridIndex, index) => {
      timers.current.push(window.setTimeout(() => {
        const word = gridWords[gridIndex];
        if (!word) return;
        setPlayingIndex(gridIndex);
        speak(word.ko);
      }, 400 + index * GAP_MS));
    });
    timers.current.push(window.setTimeout(() => {
      setPlayingIndex(null);
      inputPosition.current = 0;
      setPhase("input");
    }, 400 + nextSequence.length * GAP_MS));
  }, [gridWords, speak]);

  const startRound = useCallback((nextRound: number) => {
    const cells = gridWords.length;
    if (!cells) return;
    const nextSequence = Array.from(
      { length: nextRound + 1 },
      () => Math.floor(Math.random() * cells),
    );
    setSequence(nextSequence);
    playSequence(nextSequence);
  }, [gridWords.length, playSequence]);

  useEffect(() => {
    if (started.current || !gridWords.length) return;
    started.current = true;
    const timer = window.setTimeout(() => startRound(1), 500);
    return () => window.clearTimeout(timer);
  }, [gridWords.length, startRound]);

  useEffect(() => () => {
    clearTimers();
    stop();
  }, [clearTimers, stop]);

  const tapCard = (gridIndex: number) => {
    if (phase !== "input" || over) return;
    const expected = sequence[inputPosition.current];
    if (gridIndex === expected) {
      window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
      const word = gridWords[gridIndex];
      if (word) speak(word.ko);
      setTapFlash({ index: gridIndex, okay: true });
      timers.current.push(window.setTimeout(() => setTapFlash(null), 250));
      inputPosition.current += 1;
      if (inputPosition.current >= sequence.length) {
        setPhase("between");
        setScore((value) => value + round * 20);
        const nextRound = round + 1;
        setRound(nextRound);
        timers.current.push(window.setTimeout(() => startRound(nextRound), 1100));
      }
      return;
    }

    window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("error");
    setTapFlash({ index: gridIndex, okay: false });
    timers.current.push(window.setTimeout(() => setTapFlash(null), 400));
    setPhase("between");
    setHearts((value) => {
      const next = value - 1;
      if (next <= 0) setOver(true);
      else timers.current.push(window.setTimeout(() => startRound(round), 900));
      return next;
    });
  };

  const restart = () => {
    clearTimers();
    stop();
    setRound(1);
    setHearts(MAX_HEARTS);
    setScore(0);
    setOver(false);
    setPhase("between");
    setPlayingIndex(null);
    setTapFlash(null);
    inputPosition.current = 0;
    timers.current.push(window.setTimeout(() => startRound(1), 400));
  };

  const exit = () => {
    clearTimers();
    stop();
    void finish(score);
  };

  if (loading || failed || gridWords.length < GRID) {
    return (
      <main className={styles.page}>
        <div className={styles.gate}>
          {loading || gridWords.length < GRID && !failed ? <i /> : <><p>Yuklab bo&apos;lmadi. Birozdan so&apos;ng urinib ko&apos;ring</p><button onClick={reload} type="button">Qayta urinish</button></>}
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <button aria-label="Yopish" className={styles.close} onClick={exit} type="button"><MobileIcon name="close" size={26} /></button>
        <div className={styles.round}>Raund {round}</div>
        <div className={styles.hearts}>
          {Array.from({ length: MAX_HEARTS }, (_, index) => <MobileIcon key={index} name={index < hearts ? "heart" : "heart-outline"} size={20} />)}
        </div>
      </header>

      <div className={`${styles.status} ${phase === "input" ? styles.input : ""}`}>
        {phase === "listen" ? <><MobileIcon name="volume-high" size={22} /><strong>Diqqat bilan eshiting...</strong></> : phase === "input" ? <><MobileIcon name="hand-left" size={22} /><strong>Tartib bilan bosing! ({inputPosition.current + 1}/{sequence.length})</strong></> : <strong>&nbsp;</strong>}
      </div>

      <p className={styles.score}>{score}</p>

      <div className={styles.grid}>
        {gridWords.map((word, gridIndex) => {
          const playing = playingIndex === gridIndex;
          const flash = tapFlash?.index === gridIndex ? tapFlash : null;
          return (
            <button
              className={`${styles.cell} ${playing ? styles.playing : ""} ${flash?.okay === true ? styles.correct : flash?.okay === false ? styles.wrong : ""} ${phase === "listen" && !playing ? styles.dim : ""}`}
              disabled={phase !== "input" || over}
              key={word.id}
              onClick={() => tapCard(gridIndex)}
              type="button"
            >
              {word.ko}
            </button>
          );
        })}
      </div>

      {over ? (
        <div className={styles.overlay}>
          <section className={styles.endCard}>
            <span className={styles.endEmoji}>🔊</span>
            <h1>O&apos;yin tugadi!</h1>
            <div className={styles.endStats}>
              <div><strong>{score}</strong><span>Ball</span></div>
              <div><strong>{round}</strong><span>Eng yuqori raund</span></div>
            </div>
            {!isChallenge ? <button className={styles.again} onClick={restart} type="button">Yana o&apos;ynash</button> : null}
            <button className={styles.exit} onClick={exit} type="button">Chiqish</button>
          </section>
        </div>
      ) : null}
    </main>
  );
}
