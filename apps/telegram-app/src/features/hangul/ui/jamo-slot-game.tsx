"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { jamoToCharacterId } from "../model/hangul-jamo";
import {
  buildReel,
  comboMultiplier,
  generateTarget,
  REEL_POOLS,
  reelSpeed,
  type JamoTarget,
} from "../model/jamo-slot";
import { useHangulReporter } from "../model/use-hangul-reporter";
import styles from "./jamo-slot.module.css";

const ITEM_HEIGHT = 66;
const REEL_LENGTH = 8;
const LIVES = 3;
const INPUT_LAG_MS = 110;

type Phase = "ready" | "spinning" | "resolved" | "ended";

interface ReelMotion {
  millisecondsPerItem: number;
  running: boolean;
  startOffset: number;
  startTime: number;
}

function impactMedium() {
  window.Telegram?.WebApp.HapticFeedback?.impactOccurred("medium");
}

function notify(type: "error" | "success") {
  window.Telegram?.WebApp.HapticFeedback?.notificationOccurred(type);
}

function Reel({
  items,
  locked,
  offset,
  snapping,
  wrong,
}: {
  items: string[];
  locked: boolean;
  offset: number;
  snapping: boolean;
  wrong: boolean;
}) {
  const strip = useMemo(() => [...items, ...items, ...items], [items]);
  const translated =
    ITEM_HEIGHT - (offset % Math.max(1, items.length)) * ITEM_HEIGHT;
  return (
    <div
      className={[
        styles.reel,
        locked ? styles.reelLocked : "",
        wrong ? styles.reelWrong : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={snapping ? styles.reelStripSnapping : styles.reelStrip}
        style={{ transform: "translateY(" + translated + "px)" }}
      >
        {strip.map((character, index) => (
          <div className={styles.reelItem} key={index}>
            {character}
          </div>
        ))}
      </div>
      <i className={styles.reelWindow} />
      <i className={styles.fadeTop} />
      <i className={styles.fadeBottom} />
    </div>
  );
}

function answersFor(target: JamoTarget) {
  return target.reels === 3
    ? [target.cho, target.jung, target.jong]
    : [target.cho, target.jung];
}

export function JamoSlotGame() {
  const router = useRouter();
  const [round, setRound] = useState(1);
  const [target, setTarget] = useState<JamoTarget>(() => generateTarget(1));
  const [reelItems, setReelItems] = useState<string[][]>([]);
  const [activeReel, setActiveReel] = useState(0);
  const [locked, setLocked] = useState<boolean[]>([]);
  const [wrongReel, setWrongReel] = useState<number | null>(null);
  const [snappingReel, setSnappingReel] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("ready");
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [gained, setGained] = useState(0);
  const [gainRun, setGainRun] = useState(0);
  const [offsets, setOffsets] = useState<number[]>([]);
  const offsetsRef = useRef<number[]>([]);
  const motions = useRef<ReelMotion[]>([]);
  const timers = useRef<number[]>([]);
  const { flush, record } = useHangulReporter("jamo-slot");

  const answers = useMemo(() => answersFor(target), [target]);

  useEffect(() => {
    const activeTimers = timers.current;
    let frame = 0;
    const animate = (now: number) => {
      let changed = false;
      const next = [...offsetsRef.current];
      for (let index = 0; index < motions.current.length; index += 1) {
        const motion = motions.current[index];
        if (!motion?.running) continue;
        next[index] =
          motion.startOffset +
          (now - motion.startTime) / motion.millisecondsPerItem;
        changed = true;
      }
      if (changed) {
        offsetsRef.current = next;
        setOffsets(next);
      }
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(frame);
      for (const timer of activeTimers) window.clearTimeout(timer);
    };
  }, []);

  const setupRound = useCallback((nextRound: number) => {
    const nextTarget = generateTarget(nextRound);
    const nextAnswers = answersFor(nextTarget);
    const pools = [REEL_POOLS.cho, REEL_POOLS.jung, REEL_POOLS.jong];
    const items = nextAnswers.map((answer, index) =>
      buildReel(answer, pools[index]!, REEL_LENGTH),
    );
    const base = reelSpeed(nextRound);
    const now = performance.now();
    const nextMotions = items.map((item, index) => ({
      millisecondsPerItem: base + (index * 260) / item.length,
      running: true,
      startOffset: 0,
      startTime: now,
    }));

    setTarget(nextTarget);
    setReelItems(items);
    setLocked(new Array<boolean>(nextAnswers.length).fill(false));
    setActiveReel(0);
    setWrongReel(null);
    setSnappingReel(null);
    setPhase("spinning");
    offsetsRef.current = new Array<number>(items.length).fill(0);
    motions.current = nextMotions;
    setOffsets(offsetsRef.current);
  }, []);

  useEffect(() => {
    setupRound(1);
  }, [setupRound]);

  const stopAllReels = () => {
    motions.current = motions.current.map((motion) => ({
      ...motion,
      running: false,
    }));
  };

  const finish = (finalScore: number) => {
    setPhase("ended");
    stopAllReels();
    void flush();
    void finalScore;
  };

  const restartUnlockedReels = (
    currentRound: number,
    currentLocked: boolean[],
    currentItems: string[][],
  ) => {
    const base = reelSpeed(currentRound);
    const now = performance.now();
    motions.current = currentItems.map((item, index) => {
      const current = offsetsRef.current[index] ?? 0;
      return {
        millisecondsPerItem: base + (index * 260) / item.length,
        running: !currentLocked[index],
        startOffset: current,
        startTime: now,
      };
    });
  };

  const handleStop = () => {
    if (phase !== "spinning") return;

    const index = activeReel;
    const items = reelItems[index];
    const motion = motions.current[index];
    if (!items || !motion) return;

    motion.running = false;
    const millisecondsPerItem =
      reelSpeed(round) + (index * 260) / items.length;
    const lag = INPUT_LAG_MS / millisecondsPerItem;
    const currentOffset = offsetsRef.current[index] ?? 0;
    const snappedOffset = Math.round(currentOffset - lag);
    const landedIndex =
      ((snappedOffset % items.length) + items.length) % items.length;
    const landed = items[landedIndex];

    offsetsRef.current = offsetsRef.current.map((offset, offsetIndex) =>
      offsetIndex === index ? snappedOffset : offset,
    );
    setOffsets(offsetsRef.current);
    setSnappingReel(index);
    const snapTimer = window.setTimeout(() => setSnappingReel(null), 220);
    timers.current.push(snapTimer);

    const correct = landed === answers[index];
    const characterId = jamoToCharacterId(answers[index]);
    if (characterId) record(characterId, correct);

    if (correct) {
      impactMedium();
      const nextLocked = [...locked];
      nextLocked[index] = true;
      setLocked(nextLocked);

      const last = index === answers.length - 1;
      if (!last) {
        setActiveReel(index + 1);
        return;
      }

      notify("success");
      const nextCombo = combo + 1;
      const multiplier = comboMultiplier(nextCombo);
      const points = Math.round((100 + round * 10) * multiplier);
      setCombo(nextCombo);
      setMaxCombo((value) => Math.max(value, nextCombo));
      setScore((value) => value + points);
      setGained(points);
      setGainRun((value) => value + 1);
      setPhase("resolved");
      stopAllReels();

      const roundTimer = window.setTimeout(() => {
        setRound((currentRound) => {
          const nextRound = currentRound + 1;
          setupRound(nextRound);
          return nextRound;
        });
      }, 850);
      timers.current.push(roundTimer);
      return;
    }

    notify("error");
    setWrongReel(index);
    setCombo(0);
    const remaining = lives - 1;
    setLives(remaining);

    const retryTimer = window.setTimeout(() => {
      setWrongReel(null);
      if (remaining <= 0) {
        finish(score);
      } else {
        setPhase("spinning");
        restartUnlockedReels(round, locked, reelItems);
      }
    }, 620);
    timers.current.push(retryTimer);
  };

  const exit = () => {
    if (window.history.length > 1) router.back();
    else router.replace("/hangul");
  };

  if (phase === "ended") {
    return (
      <main className={[styles.slotPage, styles.endPage].join(" ")}>
        <section className={styles.endWrap}>
          <span className={styles.endEmoji}>🎰</span>
          <h1>O‘yin tugadi!</h1>
          <strong>{score}</strong>
          <div className={styles.endStats}>
            <div>
              <strong>{round - 1}</strong>
              <span>Yig‘ilgan harf</span>
            </div>
            <div>
              <strong>{maxCombo}</strong>
              <span>Eng yuqori kombo</span>
            </div>
          </div>
        </section>
        <footer className={styles.footer}>
          <button
            className={styles.retryButton}
            onClick={() => {
              setScore(0);
              setCombo(0);
              setMaxCombo(0);
              setLives(LIVES);
              setRound(1);
              setupRound(1);
            }}
            type="button"
          >
            Qayta o‘ynash
          </button>
          <button className={styles.exitButton} onClick={exit} type="button">
            Chiqish
          </button>
        </footer>
      </main>
    );
  }

  return (
    <main className={styles.slotPage}>
      <header className={styles.header}>
        <button aria-label="Chiqish" onClick={exit} type="button">
          <MobileIcon name="close" size={28} />
        </button>
        <div className={styles.lives}>
          {Array.from({ length: LIVES }).map((_, index) => (
            <MobileIcon
              key={index}
              name={index < lives ? "heart" : "heart-outline"}
              size={22}
              style={{ color: index < lives ? "#FF5C5C" : "#ECEAF6" }}
            />
          ))}
        </div>
        <strong className={styles.score}>{score}</strong>
      </header>

      <section className={styles.targetArea}>
        <p>Shu harfni yig‘</p>
        <div className={styles.targetBubble} key={round}>
          {target.syllable}
        </div>
        <span>{target.roman}</span>
        {gainRun > 0 ? (
          <b className={styles.gain} key={gainRun}>
            +{gained}
          </b>
        ) : null}
      </section>

      {combo > 1 ? (
        <div className={styles.combo} key={combo}>
          {combo} kombo ×{comboMultiplier(combo)}
        </div>
      ) : null}

      <section
        className={[
          styles.reelRow,
          wrongReel !== null ? styles.reelRowWrong : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {reelItems.map((items, index) => (
          <div className={styles.reelSlot} key={index}>
            <Reel
              items={items}
              locked={Boolean(locked[index])}
              offset={offsets[index] ?? 0}
              snapping={snappingReel === index}
              wrong={wrongReel === index}
            />
            {activeReel === index &&
            !locked[index] &&
            phase === "spinning" ? (
              <span className={styles.activeMark}>
                <MobileIcon name="caret-up" size={20} />
              </span>
            ) : null}
          </div>
        ))}
      </section>

      <footer className={styles.footer}>
        <button
          className={[
            styles.stopButton,
            phase !== "spinning" ? styles.stopButtonOff : "",
          ]
            .filter(Boolean)
            .join(" ")}
          disabled={phase !== "spinning"}
          onClick={handleStop}
          type="button"
        >
          STOP
        </button>
      </footer>
    </main>
  );
}
