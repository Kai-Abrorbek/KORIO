"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useRouter } from "next/navigation";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import type { StrokePoint } from "../model/hangul";
import { jamoToCharacterId } from "../model/hangul-jamo";
import {
  STROKE_TOLERANCE_RATIO,
  SYLLABLE_LEVEL_COPY,
  SYLLABLE_LEVELS,
  type SyllableLevel,
} from "../model/syllable-levels";
import {
  buildSyllable,
  SYLLABLE_VIEWBOX,
  type SyllablePlan,
} from "../model/syllable-strokes";
import {
  scoreStroke,
  type StrokeScore,
} from "../model/stroke-matching";
import { useHangulReporter } from "../model/use-hangul-reporter";
import { SyllableCanvas } from "./syllable-canvas";
import styles from "./syllable-drawing.module.css";

const SCORE_COLORS: Record<StrokeScore, string> = {
  fail: "#FF4B4B",
  good: "#58CC02",
  okay: "#1FA9F7",
  perfect: "#FFD000",
};
const STROKE_POINTS: Record<StrokeScore, number> = {
  fail: 0,
  good: 75,
  okay: 45,
  perfect: 100,
};
const SCORE_LABELS: Record<StrokeScore, string> = {
  fail: "Qaytadan yozamiz",
  good: "Barakalla",
  okay: "Yaxshi",
  perfect: "Mukammal!",
};
const LEVEL_COLORS = [
  ["#7B72E8", "#5F55D6"],
  ["#4EA8F5", "#2E86DA"],
  ["#3FC28A", "#22A06B"],
  ["#F2A93B", "#DC8B1C"],
  ["#F0703F", "#D2521F"],
  ["#E14B7A", "#C22B5C"],
] as const;
const STORAGE_KEY = "syllable-draw";

function readStoredStars(): Record<number, number> {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as {
      stars?: Record<string, number>;
      state?: { stars?: Record<string, number> };
    };
    const stored = parsed.state?.stars ?? parsed.stars ?? {};
    return Object.fromEntries(
      Object.entries(stored).map(([level, stars]) => [Number(level), stars]),
    );
  } catch {
    return {};
  }
}

function useSyllableStars() {
  const [stars, setStars] = useState<Record<number, number>>(readStoredStars);
  const recordResult = useCallback((levelId: number, result: number) => {
    setStars((current) => {
      const best = current[levelId] ?? 0;
      if (result <= best) return current;
      const next = { ...current, [levelId]: result };
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ state: { stars: next }, version: 0 }),
      );
      return next;
    });
  }, []);
  return { recordResult, stars };
}

function isLevelUnlocked(levelId: number, stars: Record<number, number>) {
  return levelId <= 1 || (stars[levelId - 1] ?? 0) > 0;
}

function LevelSelect({
  onExit,
  onPick,
  stars,
}: {
  onExit: () => void;
  onPick: (level: SyllableLevel) => void;
  stars: Record<number, number>;
}) {
  return (
    <main className={styles.levelPage}>
      <header>
        <button aria-label="Chiqish" onClick={onExit} type="button">
          <MobileIcon name="close" size={28} />
        </button>
      </header>
      <div className={styles.levelScroll}>
        <h1>Harflarni birlashtirib yozish</h1>
        <p>
          Undosh va unli qo&apos;shilsa bitta bo&apos;g&apos;in bo&apos;ladi.
          <br />
          Qo&apos;l bilan yozib o&apos;rganamiz.
        </p>

        {SYLLABLE_LEVELS.map((level, index) => {
          const unlocked = isLevelUnlocked(level.id, stars);
          const earned = stars[level.id] ?? 0;
          const [color, depth] = LEVEL_COLORS[index]!;
          const copy = SYLLABLE_LEVEL_COPY[level.key];
          return (
            <div
              className={styles.levelEntrance}
              key={level.id}
              style={{ "--level-delay": index * 55 + "ms" } as CSSProperties}
            >
              <button
                className={[
                  styles.levelWrap,
                  unlocked ? "" : styles.levelLocked,
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={!unlocked}
                onClick={() => {
                  window.Telegram?.WebApp.HapticFeedback?.impactOccurred(
                    "light",
                  );
                  onPick(level);
                }}
                style={
                  {
                    "--level-color": unlocked ? color : "#fff",
                    "--level-depth": unlocked ? depth : "#eceaf6",
                  } as CSSProperties
                }
                type="button"
              >
                <i className={styles.levelDepth} />
                <span className={styles.levelCard}>
                  <i className={styles.levelShine} />
                  <span className={styles.levelBadge}>
                    {unlocked ? (
                      level.id
                    ) : (
                      <MobileIcon name="lock-closed" size={17} />
                    )}
                  </span>
                  <span className={styles.levelTexts}>
                    <strong>{copy.title}</strong>
                    <small>
                      {unlocked
                        ? copy.description
                        : "Avval oldingi bosqichni yeching"}
                    </small>
                  </span>
                  {unlocked ? (
                    <span className={styles.levelStars}>
                      {[1, 2, 3].map((star) => (
                        <MobileIcon
                          key={star}
                          name={star <= earned ? "star" : "star-outline"}
                          size={13}
                          style={{
                            color:
                              star <= earned
                                ? "#FFD000"
                                : "rgba(255,255,255,.5)",
                          }}
                        />
                      ))}
                    </span>
                  ) : null}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}

function ResultView({
  level,
  onBackToList,
  onExit,
  onNext,
  onRecord,
  onRetry,
  percent,
  stars,
}: {
  level: SyllableLevel;
  onBackToList: () => void;
  onExit: () => void;
  onNext: (level: SyllableLevel) => void;
  onRecord: (levelId: number, stars: number) => void;
  onRetry: () => void;
  percent: number;
  stars: number;
}) {
  const nextLevel = SYLLABLE_LEVELS.find(
    (candidate) => candidate.id === level.id + 1,
  );

  useEffect(() => {
    onRecord(level.id, stars);
    window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
  }, [level.id, onRecord, stars]);

  return (
    <main className={styles.resultPage}>
      <header>
        <button aria-label="Chiqish" onClick={onBackToList} type="button">
          <MobileIcon name="close" size={26} />
        </button>
      </header>
      <section className={styles.resultBody}>
        <div className={styles.resultStars}>
          {[1, 2, 3].map((star) => (
            <span key={star} style={{ "--star-delay": star * 130 + "ms" } as CSSProperties}>
              <MobileIcon
                name={star <= stars ? "star" : "star-outline"}
                size={star === 2 ? 56 : 44}
                style={{ color: star <= stars ? "#FFD000" : "#ECEAF6" }}
              />
            </span>
          ))}
        </div>
        <strong>{percent}%</strong>
        <p>Aniqlik</p>
      </section>
      <footer className={styles.bottomBar}>
        <button
          className={styles.resultPrimary}
          onClick={() => {
            if (nextLevel && stars > 0) onNext(nextLevel);
            else onExit();
          }}
          type="button"
        >
          {nextLevel && stars > 0 ? "Keyingi bosqich" : "Chiqish"}
        </button>
        <button className={styles.ghostButton} onClick={onRetry} type="button">
          Qaytadan
        </button>
      </footer>
    </main>
  );
}

function PlayLevel({
  level,
  onBackToList,
  onExit,
  onNext,
  onRecord,
  onRetry,
}: {
  level: SyllableLevel;
  onBackToList: () => void;
  onExit: () => void;
  onNext: (level: SyllableLevel) => void;
  onRecord: (levelId: number, stars: number) => void;
  onRetry: () => void;
}) {
  const plans = useMemo(
    () =>
      level.syllables
        .map(buildSyllable)
        .filter((plan): plan is SyllablePlan => plan !== null),
    [level],
  );
  const [index, setIndex] = useState(0);
  const [strokeIndex, setStrokeIndex] = useState(0);
  const [scores, setScores] = useState<(StrokeScore | null)[]>([]);
  const [userStrokes, setUserStrokes] = useState<
    (StrokePoint[] | null)[]
  >([]);
  const [feedback, setFeedback] = useState<StrokeScore | null>(null);
  const [earned, setEarned] = useState(0);
  const [done, setDone] = useState(false);
  const failedThisSyllable = useRef(false);
  const timer = useRef<number | null>(null);
  const { flush, record } = useHangulReporter("syllable-drawing");

  const plan = plans[index]!;
  const totalStrokes = useMemo(
    () => plans.reduce((sum, item) => sum + item.strokes.length, 0),
    [plans],
  );

  useEffect(() => {
    setStrokeIndex(0);
    setScores(new Array<StrokeScore | null>(plan.strokes.length).fill(null));
    setUserStrokes(
      new Array<StrokePoint[] | null>(plan.strokes.length).fill(null),
    );
    setFeedback(null);
    failedThisSyllable.current = false;
  }, [index, plan]);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  const goNextStroke = () => {
    if (strokeIndex + 1 < plan.strokes.length) {
      setStrokeIndex(strokeIndex + 1);
      return;
    }
    const correct = !failedThisSyllable.current;
    for (const jamo of plan.jamo) {
      const characterId = jamoToCharacterId(jamo);
      if (characterId) record(characterId, correct);
    }
    if (index + 1 < plans.length) {
      setIndex(index + 1);
    } else {
      setDone(true);
      void flush();
    }
  };

  const handleStroke = (points: StrokePoint[]) => {
    if (feedback) return;
    const stroke = plan.strokes[strokeIndex]!;
    const result = scoreStroke(
      stroke.points,
      points,
      SYLLABLE_VIEWBOX,
      stroke.jamoScale * STROKE_TOLERANCE_RATIO,
    );
    window.Telegram?.WebApp.HapticFeedback?.notificationOccurred(
      result.score === "fail" ? "error" : "success",
    );
    setFeedback(result.score);
    if (result.score === "fail") {
      failedThisSyllable.current = true;
      timer.current = window.setTimeout(() => setFeedback(null), 850);
      return;
    }
    setScores((current) =>
      current.map((score, currentIndex) =>
        currentIndex === strokeIndex ? result.score : score,
      ),
    );
    setUserStrokes((current) =>
      current.map((strokePoints, currentIndex) =>
        currentIndex === strokeIndex ? points : strokePoints,
      ),
    );
    setEarned((value) => value + result.points);
    timer.current = window.setTimeout(() => {
      setFeedback(null);
      goNextStroke();
    }, 780);
  };

  const retryStroke = () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    setFeedback(null);
    const undo = scores[strokeIndex];
    if (!undo) return;
    setEarned((value) => value - STROKE_POINTS[undo]);
    setScores((current) =>
      current.map((score, currentIndex) =>
        currentIndex === strokeIndex ? null : score,
      ),
    );
    setUserStrokes((current) =>
      current.map((stroke, currentIndex) =>
        currentIndex === strokeIndex ? null : stroke,
      ),
    );
    failedThisSyllable.current = true;
  };

  if (done) {
    const percent = Math.round(
      (earned / Math.max(1, totalStrokes * 100)) * 100,
    );
    const stars = percent >= 85 ? 3 : percent >= 62 ? 2 : 1;
    return (
      <ResultView
        level={level}
        onBackToList={onBackToList}
        onExit={onExit}
        onNext={onNext}
        onRecord={onRecord}
        onRetry={onRetry}
        percent={percent}
        stars={stars}
      />
    );
  }

  const clearedBefore = plans
    .slice(0, index)
    .reduce((sum, item) => sum + item.strokes.length, 0);
  const cleared = clearedBefore + scores.filter(Boolean).length;
  const progress = cleared / Math.max(1, totalStrokes);

  return (
    <main className={styles.playPage}>
      <header className={styles.playTopBar}>
        <button aria-label="Chiqish" onClick={onBackToList} type="button">
          <MobileIcon name="close" size={26} />
        </button>
        <div><i style={{ width: progress * 100 + "%" }} /></div>
        <span>{index + 1}/{plans.length}</span>
      </header>

      <section className={styles.promptCard}>
        <div className={styles.jamoRow}>
          {plan.jamo.map((jamo, jamoIndex) => (
            <span className={styles.jamoItem} key={jamoIndex}>
              {jamoIndex > 0 ? <b>+</b> : null}
              <i>{jamo}</i>
            </span>
          ))}
          {level.showAnswer ? (
            <span className={styles.jamoItem}>
              <MobileIcon name="arrow-forward" size={17} />
              <i className={styles.answerChip}>{plan.syllable}</i>
            </span>
          ) : null}
        </div>
        <p>
          {level.showAnswer
            ? "Bo'g'inga qarab xuddi shunday yozing"
            : "Bu harflar qo'shilsa qaysi bo'g'in chiqadi?"}
        </p>
      </section>

      <p className={styles.strokeCounter}>
        {strokeIndex + 1} / {plan.strokes.length}-chiziq
      </p>

      <section className={styles.canvasArea}>
        <SyllableCanvas
          completedScores={scores}
          currentStrokeIndex={strokeIndex}
          disabled={Boolean(feedback)}
          guide={level.guide}
          onStrokeFinished={handleStroke}
          strokes={plan.strokes}
          userStrokes={userStrokes}
        />
        {feedback ? (
          <div
            className={styles.feedback}
            style={
              { "--feedback-color": SCORE_COLORS[feedback] } as CSSProperties
            }
          >
            {SCORE_LABELS[feedback]}
          </div>
        ) : null}
      </section>

      <footer className={styles.bottomBar}>
        <button className={styles.redrawButton} onClick={retryStroke} type="button">
          <MobileIcon name="refresh" size={18} />
          Bu chiziqni qayta
        </button>
      </footer>
    </main>
  );
}

export function SyllableDrawingGame() {
  const router = useRouter();
  const [level, setLevel] = useState<SyllableLevel | null>(null);
  const [run, setRun] = useState(0);
  const { recordResult, stars } = useSyllableStars();

  const exit = () => {
    if (window.history.length > 1) router.back();
    else router.replace("/hangul");
  };

  const pick = (nextLevel: SyllableLevel) => {
    setLevel(nextLevel);
    setRun((value) => value + 1);
  };

  if (!level) {
    return <LevelSelect onExit={exit} onPick={pick} stars={stars} />;
  }
  return (
    <PlayLevel
      key={level.id + "-" + run}
      level={level}
      onBackToList={() => setLevel(null)}
      onExit={exit}
      onNext={pick}
      onRecord={recordResult}
      onRetry={() => setRun((value) => value + 1)}
    />
  );
}
