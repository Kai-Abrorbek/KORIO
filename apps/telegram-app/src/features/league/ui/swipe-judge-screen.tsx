"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import type { GameWord } from "../model/use-game-words";
import { useGameWords } from "../model/use-game-words";
import { useLeagueChallenge } from "../model/use-league-challenge";
import styles from "./swipe-judge-screen.module.css";

const GAME_SECONDS = 60;
const SWIPE_THRESHOLD = 110;
const FEVER_AT = 5;

interface JudgeCard {
  ko: string;
  shown: string;
  isTrue: boolean;
}

function meaningOf(word: GameWord) {
  return word.uz || word.en;
}

function shuffle<T>(items: T[]) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const random = Math.floor(Math.random() * (index + 1));
    [result[index], result[random]] = [result[random]!, result[index]!];
  }
  return result;
}

function makeDeck(pool: GameWord[]): JudgeCard[] {
  return shuffle(pool).map((word) => {
    const isTrue = Math.random() < 0.5;
    let shown = meaningOf(word);
    if (!isTrue) {
      const others = pool.filter((item) => item.id !== word.id);
      const other = others[Math.floor(Math.random() * others.length)];
      shown = other ? meaningOf(other) : shown;
    }
    return { isTrue, ko: word.ko, shown };
  });
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function SwipeJudgeScreen() {
  const { words: pool, loading, failed, reload } = useGameWords(40, 5);
  const { finish, isChallenge } = useLeagueChallenge();
  const [deck, setDeck] = useState<JudgeCard[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [over, setOver] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [motion, setMotion] = useState<"fling" | "snap" | null>(null);

  const dragStart = useRef<number | null>(null);
  const translateRef = useRef(0);
  const lockRef = useRef(false);
  const advanceTimer = useRef<number | null>(null);

  useEffect(() => {
    if (pool?.length) setDeck(makeDeck(pool));
  }, [pool]);

  useEffect(() => {
    if (over) return;
    const timer = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          setOver(true);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [over]);

  useEffect(() => () => {
    if (advanceTimer.current !== null) window.clearTimeout(advanceTimer.current);
  }, []);

  const updateTranslate = (value: number) => {
    translateRef.current = value;
    setTranslateX(value);
  };

  const advance = useCallback(() => {
    setIndex((current) => {
      const next = current + 1;
      if (next >= deck.length) {
        if (pool?.length) setDeck(makeDeck(pool));
        return 0;
      }
      return next;
    });
    setMotion(null);
    updateTranslate(0);
    lockRef.current = false;
  }, [deck.length, pool]);

  const judge = useCallback((saidTrue: boolean) => {
    const card = deck[index];
    if (!card) return;
    const okay = saidTrue === card.isTrue;
    setTotal((value) => value + 1);
    if (okay) {
      window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
      setCorrect((value) => value + 1);
      setCombo((value) => value + 1);
      setScore((value) => value + (combo + 1 >= FEVER_AT ? 20 : 10));
    } else {
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("error");
      setCombo(0);
    }
    advanceTimer.current = window.setTimeout(advance, 160);
  }, [advance, combo, deck, index]);

  const fling = (direction: 1 | -1) => {
    lockRef.current = true;
    setMotion("fling");
    updateTranslate(direction * 520);
    judge(direction === 1);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (over || lockRef.current) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = event.clientX - translateRef.current;
    setMotion(null);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null || lockRef.current) return;
    updateTranslate(event.clientX - dragStart.current);
  };

  const finishPointer = () => {
    if (dragStart.current === null || lockRef.current) return;
    dragStart.current = null;
    if (Math.abs(translateRef.current) > SWIPE_THRESHOLD) {
      fling(translateRef.current > 0 ? 1 : -1);
    } else {
      setMotion("snap");
      updateTranslate(0);
    }
  };

  const restart = () => {
    if (pool?.length) setDeck(makeDeck(pool));
    if (advanceTimer.current !== null) window.clearTimeout(advanceTimer.current);
    dragStart.current = null;
    lockRef.current = false;
    setIndex(0);
    setScore(0);
    setCombo(0);
    setCorrect(0);
    setTotal(0);
    setTimeLeft(GAME_SECONDS);
    setOver(false);
    setMotion(null);
    updateTranslate(0);
  };

  const exit = () => void finish(score);
  const card = deck[index];
  const nextCard = deck.length ? deck[(index + 1) % deck.length] : undefined;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const fever = combo >= FEVER_AT;
  const progress = clamp(Math.abs(translateX) / SWIPE_THRESHOLD);
  const trueOpacity = clamp((translateX - 30) / (SWIPE_THRESHOLD - 30));
  const falseOpacity = clamp((-translateX - 30) / (SWIPE_THRESHOLD - 30));
  const cardStyle = {
    "--card-rotation": `${(translateX / 250) * 14}deg`,
    "--card-x": `${translateX}px`,
    "--false-opacity": falseOpacity,
    "--true-opacity": trueOpacity,
  } as CSSProperties;
  const nextStyle = {
    opacity: 0.6 + progress * 0.4,
    transform: `scale(${0.94 + progress * 0.06})`,
  };

  if (loading || failed || !deck.length) {
    return (
      <main className={styles.page}>
        <div className={styles.gate}>
          {loading || !deck.length && !failed ? <i /> : <><p>Yuklab bo&apos;lmadi. Birozdan so&apos;ng urinib ko&apos;ring</p><button onClick={reload} type="button">Qayta urinish</button></>}
        </div>
      </main>
    );
  }

  return (
    <main className={`${styles.page} ${fever ? styles.fever : ""}`}>
      <header className={styles.header}>
        <button aria-label="Yopish" className={styles.close} onClick={exit} type="button"><MobileIcon name="close" size={26} /></button>
        <div className={styles.timer}><MobileIcon name="time" size={16} /><span>{timeLeft}s</span></div>
        <strong className={styles.score}>{score}</strong>
      </header>

      {fever ? <p className={styles.feverText}>⚡ Fever x2</p> : <p className={styles.combo}>{combo >= 2 ? `🔥 x${combo}` : "\u00a0"}</p>}

      <div className={styles.deckArea}>
        {nextCard ? <div className={`${styles.card} ${styles.cardBehind}`} style={nextStyle}><strong>{nextCard.ko}</strong></div> : null}
        {card && !over ? (
          <div
            className={`${styles.card} ${styles.activeCard} ${motion === "fling" ? styles.fling : motion === "snap" ? styles.snap : ""}`}
            onPointerCancel={finishPointer}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={finishPointer}
            style={cardStyle}
          >
            <span className={`${styles.stamp} ${styles.trueStamp}`}>O</span>
            <span className={`${styles.stamp} ${styles.falseStamp}`}>X</span>
            <strong>{card.ko}</strong>
            <i />
            <p>{card.shown}</p>
          </div>
        ) : null}
      </div>

      <div className={styles.hints}>
        <span className={styles.wrong}><MobileIcon name="arrow-back" size={18} />Xato bo&apos;lsa</span>
        <span className={styles.right}>To&apos;g&apos;ri bo&apos;lsa<MobileIcon name="arrow-forward" size={18} /></span>
      </div>

      {over ? (
        <div className={styles.overlay}>
          <section className={styles.endCard}>
            <span className={styles.endEmoji}>🃏</span>
            <h1>O&apos;yin tugadi!</h1>
            <div className={styles.endStats}>
              <div><strong>{score}</strong><span>Ball</span></div>
              <div><strong>{accuracy}%</strong><span>Aniqlik</span></div>
              <div><strong>{correct}</strong><span>To&apos;g&apos;ri javoblar</span></div>
            </div>
            {!isChallenge ? <button className={styles.again} onClick={restart} type="button">Yana o&apos;ynash</button> : null}
            <button className={styles.exit} onClick={exit} type="button">Chiqish</button>
          </section>
        </div>
      ) : null}
    </main>
  );
}
