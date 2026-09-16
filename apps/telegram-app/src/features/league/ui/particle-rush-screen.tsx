"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { PARTICLE_QUESTIONS, type ParticleQuestion } from "../model/particle-questions";
import { useLeagueChallenge } from "../model/use-league-challenge";
import styles from "./particle-rush-screen.module.css";

const START_TIME = 45;
const MAX_TIME = 60;
const BONUS = 2;
const PENALTY = 4;

function shuffle<T>(items: T[]) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const random = Math.floor(Math.random() * (index + 1));
    [result[index], result[random]] = [result[random]!, result[index]!];
  }
  return result;
}

export function ParticleRushScreen() {
  const { finish, isChallenge } = useLeagueChallenge();
  const [pool] = useState(() => shuffle(PARTICLE_QUESTIONS));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [solved, setSolved] = useState(0);
  const [timeLeft, setTimeLeft] = useState(START_TIME);
  const [barDuration, setBarDuration] = useState(900);
  const [over, setOver] = useState(false);
  const [flash, setFlash] = useState<"ok" | "no" | null>(null);
  const lockRef = useRef(false);
  const nextTimer = useRef<number | null>(null);

  const question: ParticleQuestion = pool[questionIndex % pool.length]!;
  const [before, after] = question.sentence.split("___");

  useEffect(() => {
    if (over) return;
    const timer = window.setInterval(() => {
      setBarDuration(900);
      setTimeLeft((value) => {
        const next = value - 1;
        if (next <= 0) {
          window.clearInterval(timer);
          setOver(true);
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [over]);

  useEffect(() => () => {
    if (nextTimer.current !== null) window.clearTimeout(nextTimer.current);
  }, []);

  const nextQuestion = useCallback(() => {
    setFlash(null);
    setQuestionIndex((value) => value + 1);
    lockRef.current = false;
  }, []);

  const pick = (option: string) => {
    if (lockRef.current || over) return;
    lockRef.current = true;
    setBarDuration(250);
    if (option === question.answer) {
      window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
      setFlash("ok");
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setSolved((value) => value + 1);
      setScore((value) => value + 100 + Math.min(nextCombo, 10) * 10);
      setTimeLeft((value) => Math.min(value + BONUS, MAX_TIME));
      nextTimer.current = window.setTimeout(nextQuestion, 300);
    } else {
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("error");
      setFlash("no");
      setCombo(0);
      setTimeLeft((value) => {
        const next = Math.max(value - PENALTY, 0);
        if (next <= 0) setOver(true);
        return next;
      });
      nextTimer.current = window.setTimeout(nextQuestion, 550);
    }
  };

  const restart = () => {
    if (nextTimer.current !== null) window.clearTimeout(nextTimer.current);
    setQuestionIndex(0);
    setScore(0);
    setCombo(0);
    setSolved(0);
    setTimeLeft(START_TIME);
    setBarDuration(0);
    setOver(false);
    setFlash(null);
    lockRef.current = false;
  };

  const exit = () => void finish(score);
  const timeRatio = timeLeft / MAX_TIME;
  const barColor = timeRatio < 0.2 ? "#ff4b4b" : timeRatio < 0.45 ? "#ff9600" : "#1cb454";
  const barStyle = {
    "--bar-color": barColor,
    "--bar-duration": `${barDuration}ms`,
    "--bar-width": `${timeRatio * 100}%`,
  } as CSSProperties;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <button aria-label="Yopish" className={styles.close} onClick={exit} type="button"><MobileIcon name="close" size={26} /></button>
        <strong>{score}</strong>
        <span><MobileIcon name="flash" size={16} />{timeLeft}s</span>
      </header>
      <div className={styles.barTrack}><i style={barStyle} /></div>

      <p className={styles.combo}>{combo >= 2 ? `🔥 x${combo}` : "\u00a0"}</p>

      <div className={styles.body}>
        <section className={`${styles.question} ${flash === "ok" ? styles.correct : flash === "no" ? styles.wrong : ""} ${flash === "no" ? styles.shake : ""}`} key={questionIndex}>
          <div className={styles.sentence}>
            <strong>{before}</strong>
            <span><b>{flash === "ok" ? question.answer : "?"}</b></span>
            <strong>{after}</strong>
          </div>
          <p>{question.uz}</p>
        </section>

        <div className={styles.options}>
          {question.options.map((option) => (
            <button disabled={over} key={`${questionIndex}-${option}`} onClick={() => pick(option)} type="button">{option}</button>
          ))}
        </div>
      </div>

      {over ? (
        <div className={styles.overlay}>
          <section className={styles.endCard}>
            <span className={styles.endEmoji}>⚡</span>
            <h1>O&apos;yin tugadi!</h1>
            <div className={styles.endStats}>
              <div><strong>{score}</strong><span>Ball</span></div>
              <div><strong>{solved}</strong><span>To&apos;g&apos;ri javoblar</span></div>
            </div>
            {!isChallenge ? <button className={styles.again} onClick={restart} type="button">Yana o&apos;ynash</button> : null}
            <button className={styles.exit} onClick={exit} type="button">Chiqish</button>
          </section>
        </div>
      ) : null}
    </main>
  );
}
