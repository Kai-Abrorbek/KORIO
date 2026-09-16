"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import type { GameWord } from "../model/use-game-words";
import { useGameWords } from "../model/use-game-words";
import { useLeagueChallenge } from "../model/use-league-challenge";
import styles from "./word-rain-screen.module.css";

const MAX_HEARTS = 3;
const START_FALL_MS = 6000;
const MIN_FALL_MS = 2600;
const SPEEDUP_MS = 220;

function shuffle<T>(items: T[]) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const random = Math.floor(Math.random() * (index + 1));
    [result[index], result[random]] = [result[random]!, result[index]!];
  }
  return result;
}

function meaningOf(word: GameWord) {
  return word.uz || word.en;
}

export function WordRainScreen() {
  const { words: pool, loading, failed, reload } = useGameWords(40, 5);
  const { finish, isChallenge } = useLeagueChallenge();
  const [word, setWord] = useState<GameWord | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [caught, setCaught] = useState(0);
  const [over, setOver] = useState(false);
  const [areaHeight, setAreaHeight] = useState(0);
  const [dropId, setDropId] = useState(0);
  const [popping, setPopping] = useState(false);
  const [flashing, setFlashing] = useState(false);

  const playArea = useRef<HTMLDivElement>(null);
  const fallTrack = useRef<HTMLDivElement>(null);
  const fallAnimation = useRef<Animation | null>(null);
  const nextTimer = useRef<number | null>(null);
  const flashTimer = useRef<number | null>(null);
  const fallMs = useRef(START_FALL_MS);
  const heartsRef = useRef(MAX_HEARTS);
  const comboRef = useRef(0);
  const lockRef = useRef(false);
  const startedRef = useRef(false);
  const startDropRef = useRef<() => void>(() => undefined);

  const pickNext = useCallback(() => {
    if (!pool?.length) return;
    const next = pool[Math.floor(Math.random() * pool.length)]!;
    const wrong = shuffle(pool.filter((item) => item.id !== next.id)).slice(0, 2);
    setWord(next);
    setOptions(shuffle([next, ...wrong].map(meaningOf)));
  }, [pool]);

  const startDrop = useCallback(() => {
    if (heartsRef.current <= 0 || areaHeight <= 0) return;
    if (nextTimer.current !== null) window.clearTimeout(nextTimer.current);
    lockRef.current = false;
    setPopping(false);
    pickNext();
    setDropId((value) => value + 1);
  }, [areaHeight, pickNext]);
  startDropRef.current = startDrop;

  const loseHeart = useCallback(() => {
    window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("error");
    setFlashing(false);
    window.requestAnimationFrame(() => setFlashing(true));
    if (flashTimer.current !== null) window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(() => setFlashing(false), 380);
    comboRef.current = 0;
    setCombo(0);
    heartsRef.current -= 1;
    setHearts(heartsRef.current);
    if (heartsRef.current <= 0) {
      setOver(true);
    } else {
      nextTimer.current = window.setTimeout(() => startDropRef.current(), 600);
    }
  }, []);

  useEffect(() => {
    if (!playArea.current) return;
    const updateHeight = () => setAreaHeight(playArea.current?.getBoundingClientRect().height ?? 0);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(playArea.current);
    return () => observer.disconnect();
  }, [loading, failed]);

  useEffect(() => {
    if (areaHeight <= 0 || startedRef.current) return;
    startedRef.current = true;
    startDrop();
  }, [areaHeight, startDrop]);

  useEffect(() => {
    if (!dropId || !fallTrack.current) return;
    const track = fallTrack.current;
    track.style.transform = "";
    const animation = track.animate(
      [
        { transform: "translateY(-70px)" },
        { transform: `translateY(${areaHeight - 60}px)` },
      ],
      { duration: fallMs.current, easing: "linear", fill: "forwards" },
    );
    fallAnimation.current = animation;
    animation.onfinish = () => {
      if (lockRef.current) return;
      lockRef.current = true;
      loseHeart();
    };
    return () => {
      animation.onfinish = null;
      animation.cancel();
    };
  }, [areaHeight, dropId, loseHeart]);

  useEffect(() => () => {
    fallAnimation.current?.cancel();
    if (nextTimer.current !== null) window.clearTimeout(nextTimer.current);
    if (flashTimer.current !== null) window.clearTimeout(flashTimer.current);
  }, []);

  const freezeFall = () => {
    const animation = fallAnimation.current;
    if (!animation) return;
    animation.pause();
    try {
      animation.commitStyles();
    } catch {
      // Safari 구버전에는 commitStyles가 없다. 취소해도 정답/오답 처리는 동일하다.
    }
    animation.cancel();
    fallAnimation.current = null;
  };

  const onPick = (option: string) => {
    if (!word || lockRef.current || over) return;
    lockRef.current = true;
    freezeFall();
    if (option === meaningOf(word)) {
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
      setPopping(true);
      const nextCombo = comboRef.current + 1;
      comboRef.current = nextCombo;
      setCombo(nextCombo);
      setBestCombo((value) => Math.max(value, nextCombo));
      setCaught((value) => value + 1);
      setScore((value) => value + 10 + Math.min(nextCombo, 10) * 2);
      fallMs.current = Math.max(MIN_FALL_MS, fallMs.current - SPEEDUP_MS);
      nextTimer.current = window.setTimeout(() => startDropRef.current(), 420);
    } else {
      loseHeart();
    }
  };

  const restart = () => {
    fallMs.current = START_FALL_MS;
    heartsRef.current = MAX_HEARTS;
    comboRef.current = 0;
    setHearts(MAX_HEARTS);
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setCaught(0);
    setOver(false);
    nextTimer.current = window.setTimeout(() => startDropRef.current(), 300);
  };

  const exit = () => {
    fallAnimation.current?.cancel();
    void finish(score);
  };

  const heartsView = useMemo(
    () => Array.from({ length: MAX_HEARTS }, (_, index) => (
      <MobileIcon key={index} name={index < hearts ? "heart" : "heart-outline"} size={20} />
    )),
    [hearts],
  );

  if (loading || failed) {
    return (
      <main className={styles.page}>
        <div className={styles.gate}>
          {loading ? <i /> : <><p>Yuklab bo&apos;lmadi. Birozdan so&apos;ng urinib ko&apos;ring</p><button onClick={reload} type="button">Qayta urinish</button></>}
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      {flashing ? <div className={styles.redFlash} /> : null}
      <header className={styles.header}>
        <button aria-label="Yopish" className={styles.close} onClick={exit} type="button"><MobileIcon name="close" size={26} /></button>
        <div className={styles.scorePill}>{score}</div>
        <div className={styles.hearts}>{heartsView}</div>
      </header>

      {combo >= 2 ? <p className={styles.combo} key={combo}>🔥 x{combo}</p> : null}

      <div className={styles.playArea} ref={playArea}>
        {word && !over ? (
          <div className={styles.fallTrack} key={dropId} ref={fallTrack}>
            <div className={`${styles.fallingWord} ${popping ? styles.popping : ""}`}>{word.ko}</div>
          </div>
        ) : null}
        <div className={styles.floor} />
      </div>

      <div className={styles.options}>
        {options.map((option, index) => (
          <button disabled={over} key={`${option}-${index}`} onClick={() => onPick(option)} type="button">{option}</button>
        ))}
      </div>

      {over ? (
        <div className={styles.overlay}>
          <section className={styles.endCard}>
            <span className={styles.endEmoji}>🌧️</span>
            <h1>O&apos;yin tugadi!</h1>
            <div className={styles.endStats}>
              <div><strong>{score}</strong><span>Ball</span></div>
              <div><strong>{caught}</strong><span>Tutilgan so&apos;zlar</span></div>
              <div><strong>x{bestCombo}</strong><span>Eng yaxshi kombo</span></div>
            </div>
            {!isChallenge ? <button className={styles.again} onClick={restart} type="button">Yana o&apos;ynash</button> : null}
            <button className={styles.exit} onClick={exit} type="button">Chiqish</button>
          </section>
        </div>
      ) : null}
    </main>
  );
}
