"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { useLeagueChallenge } from "../model/use-league-challenge";
import styles from "./match-game-screen.module.css";

type Side = "left" | "right";
type PairStatus = "idle" | "selected" | "wrong" | "correct";

interface Pair { id: string; ko: string; native: string }
interface Slot { key: string; pair: Pair; status: PairStatus; vanishing?: boolean }
interface GameWord { id: string; ko: string; uz: string; en: string; ru: string }
interface Reward {
  xp: number;
  stars: number | null;
  bubble?: string;
  headline?: string;
  subline?: string;
  final?: boolean;
}

const BOARD_PAIRS = 5;
const GAME_SECONDS = 60;
const GREEN_MS = 620;
const FADE_MS = 420;
const MILESTONES = [
  { count: 5, xp: 5, star: false },
  { count: 10, xp: 10, star: false },
  { count: 30, xp: 30, star: true },
];
const MARKERS = [
  { label: 5, pos: .35 },
  { label: 10, pos: .6 },
  { label: 30, pos: .85 },
];
const STOPS: Array<[number, number]> = [[0, 0], [5, .35], [10, .6], [30, .85]];

let keySequence = 0;
const nextKey = () => `c${keySequence++}`;

function shuffle<T>(items: T[]) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const random = Math.floor(Math.random() * (index + 1));
    [result[index], result[random]] = [result[random]!, result[index]!];
  }
  return result;
}

function draw(pool: Pair[], used: Set<string>) {
  const available = pool.filter((pair) => !used.has(pair.id));
  return available.length ? available[Math.floor(Math.random() * available.length)]! : null;
}

function progressWidth(matched: number) {
  const value = Math.min(matched, 30);
  for (let index = 1; index < STOPS.length; index += 1) {
    const [countBefore, widthBefore] = STOPS[index - 1]!;
    const [countAfter, widthAfter] = STOPS[index]!;
    if (value <= countAfter) {
      return widthBefore + ((widthAfter - widthBefore) * (value - countBefore)) / (countAfter - countBefore);
    }
  }
  return .85;
}

function starTier(matched: number) {
  if (matched >= 30) return 3;
  if (matched >= 15) return 2;
  if (matched >= 5) return 1;
  return 0;
}

function MatchProgress({ matched }: { matched: number }) {
  return (
    <div className={styles.progress}>
      <i style={{ width: `${progressWidth(matched) * 100}%` }} />
      {MARKERS.map((marker) => {
        const reached = matched >= marker.label;
        return <b className={reached ? styles.markerReached : ""} key={marker.label} style={{ left: `${marker.pos * 100}%` }}>{marker.label}</b>;
      })}
    </div>
  );
}

function PairCard({ onClick, slot }: { onClick: () => void; slot: Slot }) {
  return (
    <button
      className={[
        styles.pairCard,
        styles[slot.status],
        slot.vanishing ? styles.vanishing : styles.appearing,
      ].join(" ")}
      disabled={slot.status === "correct" || slot.vanishing}
      onClick={onClick}
      type="button"
    >
      <span>{slot.pair.native}</span>
      {slot.status === "correct" ? <><i /><em>✦</em><em>✦</em></> : null}
    </button>
  );
}

function XpReward({ onContinue, reward }: { onContinue: () => void; reward: Reward }) {
  return (
    <div className={styles.reward}>
      {reward.stars !== null ? (
        <div className={styles.stars}>
          {[0, 1, 2].map((index) => <MobileIcon className={index < reward.stars! ? styles.starOn : ""} key={index} name="star" size={index === 1 ? 64 : 52} />)}
        </div>
      ) : null}
      {reward.bubble ? <div className={styles.rewardBubble}>{reward.bubble}<i /></div> : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" className={styles.rewardMascot} src="/characters/hangulmon_great.png" />
      {reward.headline || reward.subline ? (
        <div className={styles.rewardText}>
          {reward.headline ? <h2>{reward.headline}</h2> : null}
          {reward.subline ? <p>{reward.subline}</p> : null}
        </div>
      ) : null}
      <button onClick={onContinue} type="button">Davom etish</button>
    </div>
  );
}

export function MatchGameScreen() {
  const { request } = useTelegramAuth();
  const { finish, goBack, isChallenge } = useLeagueChallenge();
  const [loading, setLoading] = useState(true);
  const [left, setLeft] = useState<Slot[]>([]);
  const [right, setRight] = useState<Slot[]>([]);
  const [selection, setSelection] = useState<{ side: Side; index: number } | null>(null);
  const [matched, setMatched] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [reward, setReward] = useState<Reward | null>(null);
  const pool = useRef<Pair[]>([]);
  const usedIds = useRef(new Set<string>());
  const matchedRef = useRef(0);
  const earnedXp = useRef(0);
  const combo = useRef(0);
  const bestCombo = useRef(0);
  const paused = useRef(false);
  const ended = useRef(false);

  useEffect(() => {
    let active = true;
    const start = (words: Pair[]) => {
      if (!active) return;
      pool.current = words;
      const picked = shuffle(words).slice(0, BOARD_PAIRS);
      usedIds.current = new Set(picked.map((pair) => pair.id));
      setLeft(shuffle(picked).map((pair) => ({ key: nextKey(), pair, status: "idle" })));
      setRight(shuffle(picked).map((pair) => ({ key: nextKey(), pair, status: "idle" })));
      setLoading(false);
    };
    const gamePool = () => request<{ words: GameWord[] }>(`/words/game-pool?count=${BOARD_PAIRS * 3}&maxLen=5`);
    void request<{ words: Array<{ korean: string; native: string }> }>("/lessons/learned-words")
      .then((response) => {
        const learned = (response.words ?? [])
          .filter((word) => word.korean && word.native)
          .map((word) => ({ id: word.korean, ko: word.korean, native: word.native }));
        if (learned.length >= BOARD_PAIRS + 3) return start(learned);
        const seen = new Set(learned.map((pair) => pair.id));
        return gamePool()
          .then((response) => start([...learned, ...(response.words ?? []).map((word) => ({ id: word.id, ko: word.ko, native: word.uz || word.en })).filter((pair) => !seen.has(pair.id))]))
          .catch(() => start(learned));
      })
      .catch(() => gamePool()
        .then((response) => start((response.words ?? []).map((word) => ({ id: word.id, ko: word.ko, native: word.uz || word.en }))))
        .catch(() => start([])));
    return () => { active = false; };
  }, [request]);

  const endGame = useCallback(() => {
    if (ended.current) return;
    ended.current = true;
    paused.current = true;
    setReward({
      xp: earnedXp.current,
      stars: starTier(matchedRef.current),
      headline: "Vaqt tugadi!",
      subline: `Jami ${matchedRef.current} ta juftladingiz!`,
      final: true,
    });
  }, []);

  useEffect(() => {
    if (loading) return;
    const timer = window.setInterval(() => {
      if (paused.current) return;
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          endGame();
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [endGame, loading]);

  const setStatus = (side: Side, index: number, status: PairStatus) => {
    const setter = side === "left" ? setLeft : setRight;
    setter((current) => current.map((slot, slotIndex) => slotIndex === index ? { ...slot, status } : slot));
  };

  const checkMilestone = (count: number) => {
    const milestone = MILESTONES.find((item) => item.count === count);
    if (!milestone) return;
    earnedXp.current += milestone.xp;
    paused.current = true;
    setReward({
      xp: milestone.xp,
      stars: milestone.star ? 1 : null,
      bubble: milestone.star ? undefined : `Voy, ${milestone.xp} XP — zo'r-ku!`,
      headline: milestone.star ? `${milestone.xp} XP va bitta yulduz oldingiz!` : undefined,
      subline: milestone.star ? "Davom etib keyingi yulduzni ham olamizmi?" : undefined,
    });
  };

  const onMatched = (pairId: string, leftIndex: number, rightIndex: number) => {
    setMatched((current) => {
      const next = current + 1;
      matchedRef.current = next;
      checkMilestone(next);
      return next;
    });
    const otherSlots = right.map((slot, index) => ({ slot, index })).filter(({ slot, index }) => index !== rightIndex && slot.status === "idle" && !slot.vanishing);
    const movedIndex = otherSlots.length ? otherSlots[Math.floor(Math.random() * otherSlots.length)]!.index : rightIndex;
    window.setTimeout(() => {
      setLeft((current) => current.map((slot, index) => index === leftIndex ? { ...slot, vanishing: true } : slot));
      setRight((current) => current.map((slot, index) => index === rightIndex || index === movedIndex ? { ...slot, vanishing: true } : slot));
    }, GREEN_MS);
    window.setTimeout(() => {
      usedIds.current.delete(pairId);
      let nextPair = draw(pool.current, usedIds.current);
      if (!nextPair) {
        usedIds.current = new Set([...left, ...right].filter((slot) => slot.status !== "correct").map((slot) => slot.pair.id));
        nextPair = draw(pool.current, usedIds.current);
      }
      if (!nextPair) return;
      usedIds.current.add(nextPair.id);
      setLeft((current) => current.map((slot, index) => index === leftIndex ? { key: nextKey(), pair: nextPair!, status: "idle" } : slot));
      setRight((current) => {
        const next = [...current];
        const moved = next[movedIndex]!.pair;
        if (movedIndex === rightIndex) next[rightIndex] = { key: nextKey(), pair: nextPair!, status: "idle" };
        else {
          next[rightIndex] = { key: nextKey(), pair: moved, status: "idle" };
          next[movedIndex] = { key: nextKey(), pair: nextPair!, status: "idle" };
        }
        return next;
      });
    }, GREEN_MS + FADE_MS);
  };

  const evaluate = (first: { side: Side; index: number }, second: { side: Side; index: number }) => {
    const selectedLeft = first.side === "left" ? first : second;
    const selectedRight = first.side === "left" ? second : first;
    const correct = left[selectedLeft.index]!.pair.id === right[selectedRight.index]!.pair.id;
    setSelection(null);
    if (correct) {
      combo.current += 1;
      bestCombo.current = Math.max(bestCombo.current, combo.current);
      setStatus("left", selectedLeft.index, "correct");
      setStatus("right", selectedRight.index, "correct");
      onMatched(left[selectedLeft.index]!.pair.id, selectedLeft.index, selectedRight.index);
    } else {
      combo.current = 0;
      setStatus("left", selectedLeft.index, "wrong");
      setStatus("right", selectedRight.index, "wrong");
      window.setTimeout(() => {
        setStatus("left", selectedLeft.index, "idle");
        setStatus("right", selectedRight.index, "idle");
      }, 520);
    }
  };

  const handlePress = (side: Side, index: number) => {
    if (paused.current) return;
    const slot = (side === "left" ? left : right)[index];
    if (!slot || slot.status === "correct" || slot.status === "wrong" || slot.vanishing) return;
    if (!selection) {
      setSelection({ side, index });
      setStatus(side, index, "selected");
    } else if (selection.side === side && selection.index === index) {
      setStatus(side, index, "idle");
      setSelection(null);
    } else if (selection.side === side) {
      setStatus(selection.side, selection.index, "idle");
      setStatus(side, index, "selected");
      setSelection({ side, index });
    } else {
      setStatus(side, index, "selected");
      evaluate(selection, { side, index });
    }
  };

  const exit = () => isChallenge ? void finish(0) : goBack();
  const continueReward = () => {
    const final = reward?.final;
    setReward(null);
    if (final) {
      if (isChallenge) void finish(matchedRef.current);
      else goBack();
    } else paused.current = false;
  };
  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, "0");

  if (loading) return <main className={styles.loading}><i /></main>;

  return (
    <main className={styles.matchPage}>
      <header>
        <button aria-label="Yopish" onClick={exit} type="button"><MobileIcon name="close" size={28} /></button>
        <MatchProgress matched={matched} />
        <span className={styles.timer}><MobileIcon family="material-community" name="timer-outline" size={18} /><b>{minutes}:{seconds}</b></span>
      </header>
      <h1>Ma&apos;nosi bir xil so&apos;zlarni juftlang</h1>
      <section className={styles.board}>
        <div>{left.map((slot, index) => <PairCard key={slot.key} onClick={() => handlePress("left", index)} slot={{ ...slot, pair: { ...slot.pair, native: slot.pair.ko } }} />)}</div>
        <div>{right.map((slot, index) => <PairCard key={slot.key} onClick={() => handlePress("right", index)} slot={slot} />)}</div>
      </section>
      {reward ? <XpReward onContinue={continueReward} reward={reward} /> : null}
    </main>
  );
}
