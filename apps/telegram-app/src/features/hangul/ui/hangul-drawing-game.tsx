"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { useKoreanSpeech } from "../../../shared/browser/use-korean-speech";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { HANGUL_CHARACTERS } from "../model/hangul";
import { HANGUL_STROKE_CHARACTERS } from "../model/hangul-strokes";
import {
  scoreStroke,
  type StrokeScore,
} from "../model/stroke-matching";
import { useHangulReporter } from "../model/use-hangul-reporter";
import { StrokeCanvas } from "./stroke-canvas";
import styles from "./hangul-drawing.module.css";

const SCORE_LABELS: Record<StrokeScore, string> = {
  fail: "Qaytadan urinib ko''ring",
  good: "Yaxshi",
  okay: "Yomonmas",
  perfect: "Ajoyib!",
};

const SCORE_COLORS: Record<StrokeScore, string> = {
  fail: "#FF4B4B",
  good: "#58CC02",
  okay: "#1FA9F7",
  perfect: "#FFD000",
};

function hapticNotification(type: "error" | "success") {
  window.Telegram?.WebApp.HapticFeedback?.notificationOccurred(type);
}

function FinishView({
  onExit,
  onRestart,
  percent,
  stars,
}: {
  onExit: () => void;
  onRestart: () => void;
  percent: number;
  stars: number;
}) {
  return (
    <main className={styles.finishPage}>
      <h1>Tugadi!</h1>
      <div className={styles.finishStars}>
        {[0, 1, 2].map((index) => (
          <MobileIcon
            key={index}
            name={index < stars ? "star" : "star-outline"}
            size={56}
            style={{ color: index < stars ? "#FFD000" : "#D8D8E0" }}
          />
        ))}
      </div>
      <strong>{percent}%</strong>
      <button className={styles.primaryButton} onClick={onRestart} type="button">
        Qayta urinish
      </button>
      <button className={styles.secondaryButton} onClick={onExit} type="button">
        Chiqish
      </button>
    </main>
  );
}

export function HangulDrawingGame() {
  const router = useRouter();
  const { request } = useTelegramAuth();
  const { prewarm, speak } = useKoreanSpeech(request);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [strokeIndex, setStrokeIndex] = useState(0);
  const [scores, setScores] = useState<(StrokeScore | null)[]>([]);
  const [feedback, setFeedback] = useState<StrokeScore | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [done, setDone] = useState(false);
  const failedCurrentCharacter = useRef(false);
  const { flush, record } = useHangulReporter("hangul-drawing");

  const character = HANGUL_STROKE_CHARACTERS[characterIndex]!;
  const totalCharacters = HANGUL_STROKE_CHARACTERS.length;

  useEffect(() => {
    setStrokeIndex(0);
    setScores(new Array<StrokeScore | null>(character.strokes.length).fill(null));
    setFeedback(null);
    prewarm([character.name]);
  }, [character, prewarm]);

  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => {
      setFeedback(null);
      if (feedback === "fail") return;

      if (strokeIndex + 1 < character.strokes.length) {
        setStrokeIndex(strokeIndex + 1);
        return;
      }

      const characterId =
        HANGUL_CHARACTERS.find((item) => item.char === character.char)?.id ??
        null;
      if (characterId) {
        record(characterId, !failedCurrentCharacter.current);
      }
      failedCurrentCharacter.current = false;

      if (characterIndex + 1 < totalCharacters) {
        setCharacterIndex(characterIndex + 1);
      } else {
        setDone(true);
        void flush();
      }
    }, 1100);
    return () => window.clearTimeout(timer);
  }, [
    character,
    characterIndex,
    feedback,
    flush,
    record,
    strokeIndex,
    totalCharacters,
  ]);

  const onStrokeFinished = (
    points: { x: number; y: number }[],
  ) => {
    if (feedback) return;
    const target = character.strokes[strokeIndex]!.points;
    const result = scoreStroke(target, points, 300);

    hapticNotification(result.score === "fail" ? "error" : "success");
    if (result.score === "fail") {
      failedCurrentCharacter.current = true;
      setFeedback("fail");
      return;
    }

    setScores((current) =>
      current.map((score, index) =>
        index === strokeIndex ? result.score : score,
      ),
    );
    setTotalScore((score) => score + result.points);
    setFeedback(result.score);
  };

  const clear = () => {
    setScores((current) =>
      current.map((score, index) => (index === strokeIndex ? null : score)),
    );
    setFeedback(null);
  };

  const exit = () => {
    if (window.history.length > 1) router.back();
    else router.replace("/");
  };

  if (done) {
    const maximum = HANGUL_STROKE_CHARACTERS.reduce(
      (sum, item) => sum + item.strokes.length * 100,
      0,
    );
    const percent = Math.round((totalScore / Math.max(1, maximum)) * 100);
    const stars = percent >= 85 ? 3 : percent >= 60 ? 2 : 1;
    return (
      <FinishView
        onExit={exit}
        onRestart={() => {
          setCharacterIndex(0);
          setStrokeIndex(0);
          setTotalScore(0);
          setDone(false);
        }}
        percent={percent}
        stars={stars}
      />
    );
  }

  const completed = scores.filter((score) => score !== null).length;
  const progress = completed / Math.max(1, scores.length);

  return (
    <main className={styles.drawingPage}>
      <div className={styles.topBar}>
        <button aria-label="Chiqish" onClick={exit} type="button">
          <MobileIcon name="close" size={28} />
        </button>
        <div className={styles.progressTrack}>
          <i style={{ width: progress * 100 + "%" }} />
        </div>
        <span className={styles.characterIndicator}>
          {characterIndex + 1}/{totalCharacters}
        </span>
      </div>

      <section className={styles.characterInfo}>
        <h1>{character.name}</h1>
        <div>
          <span>{character.romanization}</span>
          <button
            aria-label="Tinglash"
            onClick={() => speak(character.name)}
            type="button"
          >
            <MobileIcon name="volume-medium" size={20} />
          </button>
        </div>
        <p>
          {strokeIndex + 1}/{character.strokes.length} chiziq
        </p>
      </section>

      <section className={styles.canvasArea}>
        <StrokeCanvas
          completedScores={scores}
          currentStrokeIndex={strokeIndex}
          disabled={Boolean(feedback)}
          onStrokeFinished={onStrokeFinished}
          strokes={character.strokes}
        />

        {feedback ? (
          <div
            className={styles.feedback}
            style={
              { "--feedback-color": SCORE_COLORS[feedback] } as CSSProperties
            }
          >
            <MobileIcon
              name={
                feedback === "fail"
                  ? "close-circle"
                  : feedback === "perfect"
                    ? "star"
                    : "checkmark-circle"
              }
              size={22}
            />
            <span>{SCORE_LABELS[feedback]}</span>
          </div>
        ) : null}
      </section>

      <p className={styles.instruction}>
        Chizish tartibiga rioya qilib chizing
      </p>

      <button className={styles.clearButton} onClick={clear} type="button">
        <MobileIcon name="refresh" size={18} />
        Tozalash
      </button>
    </main>
  );
}
