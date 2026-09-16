"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { syllableToCharacterIds } from "../model/hangul-jamo";
import {
  generateQuestion,
  speedComboMultiplier,
  type SpeedQuestion,
} from "../model/speed-round";
import { useHangulReporter } from "../model/use-hangul-reporter";
import styles from "./speed-round.module.css";

type GameState = "countdown" | "playing" | "ended";
type Feedback = "correct" | "wrong" | null;

const GAME_DURATION_MS = 60_000;
const WRONG_PENALTY_MS = 2_000;

function impact(style: "light" | "medium") {
  window.Telegram?.WebApp.HapticFeedback?.impactOccurred(style);
}

function notifyError() {
  window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("error");
}

function CountdownView({
  countdown,
  onExit,
}: {
  countdown: number;
  onExit: () => void;
}) {
  return (
    <main className={styles.countdownPage}>
      <button aria-label="Chiqish" onClick={onExit} type="button">
        <MobileIcon name="close" size={28} />
      </button>
      <p>Tayyor</p>
      <strong key={countdown}>
        {countdown > 0 ? countdown : "Boshla!"}
      </strong>
    </main>
  );
}

function EndView({
  accuracy,
  bestScore,
  correctCount,
  maxCombo,
  onExit,
  onRestart,
  score,
}: {
  accuracy: number;
  bestScore: number;
  correctCount: number;
  maxCombo: number;
  onExit: () => void;
  onRestart: () => void;
  score: number;
}) {
  const isNewBest = score >= bestScore && score > 0;

  useEffect(() => {
    if (isNewBest) {
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
    }
  }, [isNewBest]);

  return (
    <main className={styles.endPage}>
      <h1>Vaqt tugadi!</h1>
      {isNewBest ? (
        <div className={styles.bestBadge}>
          <MobileIcon name="trophy" size={16} />
          Yangi rekord!
        </div>
      ) : null}

      <section className={styles.scoreBigCard}>
        <span className={styles.scoreBigLabel}>Yakuniy ball</span>
        <strong className={styles.scoreBigValue}>{score}</strong>
        <div className={styles.endStats}>
          <div>
            <MobileIcon name="checkmark-circle" size={20} />
            <span>To&apos;g&apos;ri</span>
            <strong>{correctCount}</strong>
          </div>
          <i />
          <div>
            <MobileIcon name="flame" size={20} />
            <span>Eng yuqori kombo</span>
            <strong>{maxCombo}</strong>
          </div>
          <i />
          <div>
            <MobileIcon name="radio-button-on" size={20} />
            <span>Aniqlik</span>
            <strong>{accuracy}%</strong>
          </div>
        </div>
        <div className={styles.bestRow}>
          <MobileIcon name="medal" size={16} />
          Rekord: {bestScore}
        </div>
      </section>

      <button className={styles.primaryButton} onClick={onRestart} type="button">
        <MobileIcon name="refresh" size={18} />
        Qayta o&apos;ynash
      </button>
      <button className={styles.secondaryButton} onClick={onExit} type="button">
        Chiqish
      </button>
    </main>
  );
}

export function SpeedRoundGame() {
  const router = useRouter();
  const [state, setState] = useState<GameState>("countdown");
  const [countdown, setCountdown] = useState(3);
  const [timeMs, setTimeMs] = useState(GAME_DURATION_MS);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [question, setQuestion] = useState<SpeedQuestion>(() =>
    generateQuestion(),
  );
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [floatPoints, setFloatPoints] = useState(0);
  const scoreRef = useRef(score);
  scoreRef.current = score;
  const answerTimer = useRef<number | null>(null);
  const { flush, record } = useHangulReporter("speed-round");

  const endGame = useCallback(() => {
    setState("ended");
    setBestScore((best) => Math.max(best, scoreRef.current));
    void flush();
  }, [flush]);

  useEffect(() => {
    if (state !== "countdown") return;
    if (countdown > 0) {
      const timer = window.setTimeout(
        () => setCountdown((value) => value - 1),
        700,
      );
      return () => window.clearTimeout(timer);
    }
    setState("playing");
  }, [countdown, state]);

  useEffect(() => {
    if (state !== "playing") return;
    const timer = window.setInterval(() => {
      setTimeMs((time) => {
        const next = Math.max(0, time - 100);
        if (next === 0) {
          window.clearInterval(timer);
          endGame();
        }
        return next;
      });
    }, 100);
    return () => window.clearInterval(timer);
  }, [endGame, state]);

  useEffect(() => {
    if (
      state === "playing" &&
      timeMs <= 10_000 &&
      timeMs > 0 &&
      timeMs % 1_000 < 100
    ) {
      impact("light");
    }
  }, [state, timeMs]);

  useEffect(
    () => () => {
      if (answerTimer.current !== null) {
        window.clearTimeout(answerTimer.current);
      }
    },
    [],
  );

  const exit = () => {
    if (window.history.length > 1) router.back();
    else router.replace("/hangul");
  };

  const handleAnswer = (index: number) => {
    if (state !== "playing" || feedback) return;
    setTappedIndex(index);
    const correct = index === question.correctIndex;
    for (const characterId of syllableToCharacterIds(question.syllable)) {
      record(characterId, correct);
    }

    if (correct) {
      const multiplier = speedComboMultiplier(combo);
      const points = 10 * multiplier;
      const nextCombo = combo + 1;
      setFeedback("correct");
      setScore((value) => value + points);
      setCombo(nextCombo);
      setMaxCombo((value) => Math.max(value, nextCombo));
      setCorrectCount((value) => value + 1);
      setFloatPoints(points);
      impact("medium");
    } else {
      setFeedback("wrong");
      setCombo(0);
      setWrongCount((value) => value + 1);
      setTimeMs((time) => Math.max(0, time - WRONG_PENALTY_MS));
      notifyError();
    }

    answerTimer.current = window.setTimeout(() => {
      setFeedback(null);
      setTappedIndex(null);
      setQuestion(generateQuestion(question.syllable));
    }, 400);
  };

  const restart = () => {
    setState("countdown");
    setCountdown(3);
    setTimeMs(GAME_DURATION_MS);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setCorrectCount(0);
    setWrongCount(0);
    setTappedIndex(null);
    setFeedback(null);
    setQuestion(generateQuestion());
  };

  if (state === "countdown") {
    return <CountdownView countdown={countdown} onExit={exit} />;
  }

  if (state === "ended") {
    const attempts = correctCount + wrongCount;
    const accuracy =
      attempts === 0 ? 0 : Math.round((correctCount / attempts) * 100);
    return (
      <EndView
        accuracy={accuracy}
        bestScore={bestScore}
        correctCount={correctCount}
        maxCombo={maxCombo}
        onExit={exit}
        onRestart={restart}
        score={score}
      />
    );
  }

  const timeProgress = timeMs / GAME_DURATION_MS;
  const timeColor =
    timeProgress > 0.5 ? "#58CC02" : timeProgress > 0.2 ? "#FFD000" : "#FF4B4B";
  const multiplier = speedComboMultiplier(combo);

  return (
    <main
      className={[
        styles.speedPage,
        feedback === "wrong" ? styles.screenWrong : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className={styles.topBar}>
        <button aria-label="Chiqish" onClick={exit} type="button">
          <MobileIcon name="close" size={26} />
        </button>
        <div
          className={[
            styles.timeBarWrap,
            timeMs <= 10_000 ? styles.timeBarUrgent : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={styles.timeBarTrack}>
            <i
              style={{
                backgroundColor: timeColor,
                width: timeProgress * 100 + "%",
              }}
            />
          </div>
          <strong>{Math.ceil(timeMs / 1_000)}s</strong>
        </div>
      </header>

      <section className={styles.statsRow}>
        <div
          className={[
            styles.scoreCard,
            score > 0 ? styles.scoreCardAnimated : "",
          ]
            .filter(Boolean)
            .join(" ")}
          key={score}
        >
          <span>Ball</span>
          <strong>{score}</strong>
        </div>
        {combo >= 2 ? (
          <div className={styles.comboCard} key={combo}>
            <MobileIcon
              name="flame"
              size={combo >= 10 ? 28 : combo >= 6 ? 24 : 20}
              style={{
                color:
                  combo >= 10
                    ? "#FF4B4B"
                    : combo >= 6
                      ? "#FFA500"
                      : "#FFD000",
              }}
            />
            <strong>
              {combo} <span>×{multiplier}</span>
            </strong>
          </div>
        ) : null}
      </section>

      <section className={styles.questionArea}>
        <div
          className={[
            styles.questionCard,
            feedback === "correct" ? styles.questionCorrect : "",
            feedback === "wrong" ? styles.questionWrong : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {question.syllable}
        </div>
        {feedback === "correct" ? (
          <strong className={styles.floatPoints} key={score}>
            +{floatPoints}
          </strong>
        ) : null}
      </section>

      <section className={styles.optionsGrid}>
        {question.options.map((option, index) => {
          const tapped = tappedIndex === index;
          const correct = index === question.correctIndex;
          return (
            <button
              className={[
                styles.optionCard,
                tapped && feedback === "correct" && correct
                  ? styles.optionCorrect
                  : "",
                tapped && feedback === "wrong" && !correct
                  ? styles.optionWrong
                  : "",
                feedback === "wrong" && correct
                  ? styles.optionRevealCorrect
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={index}
              onClick={() => handleAnswer(index)}
              type="button"
            >
              {option}
            </button>
          );
        })}
      </section>
    </main>
  );
}
