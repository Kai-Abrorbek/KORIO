"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useGameWords } from "../model/use-game-words";
import { useLeagueChallenge } from "../model/use-league-challenge";
import styles from "./memory-game-screen.module.css";

interface WordPair { ko: string; uz: string }
interface MemoryLevel { level: number; pairs: number; columns: number; previewMs: number; timeSec: number }
interface MemoryCard { id: string; pairId: number; type: "ko" | "uz"; display: string; isFlipped: boolean; isMatched: boolean }

const LEVELS: MemoryLevel[] = [
  { level: 1, pairs: 5, columns: 3, previewMs: 2200, timeSec: 70 },
  { level: 2, pairs: 7, columns: 4, previewMs: 2200, timeSec: 90 },
  { level: 3, pairs: 10, columns: 4, previewMs: 2000, timeSec: 120 },
  { level: 4, pairs: 12, columns: 4, previewMs: 1800, timeSec: 150 },
  { level: 5, pairs: 15, columns: 5, previewMs: 1600, timeSec: 180 },
];

function shuffle<T>(items: T[]) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const random = Math.floor(Math.random() * (index + 1));
    [result[index], result[random]] = [result[random]!, result[index]!];
  }
  return result;
}

function WordCard({ card, fontSize, matchedTrigger, onClick, size }: {
  card: MemoryCard;
  fontSize: number;
  matchedTrigger: number;
  onClick: () => void;
  size: number;
}) {
  const flipped = card.isFlipped || card.isMatched;
  return (
    <button
      className={[
        styles.memoryCard,
        flipped ? styles.flipped : "",
        card.isMatched ? styles.matched : "",
      ].join(" ")}
      disabled={flipped}
      key={`${card.id}-${card.isMatched ? matchedTrigger : 0}`}
      onClick={onClick}
      style={{ "--card-font": `${fontSize}px`, "--card-size": `${size}px` } as CSSProperties}
      type="button"
    >
      <span className={styles.cover}>?</span>
      <span className={card.type === "ko" ? styles.wordKo : styles.wordUz}>{card.display}</span>
    </button>
  );
}

function MemoryBoard({ level, onComplete, words }: {
  level: number;
  onComplete: (result: { cleared: boolean; moves: number; level: number }) => void;
  words: WordPair[];
}) {
  const config = LEVELS.find((item) => item.level === level) ?? LEVELS[0]!;
  const initialCards = useMemo(() => {
    const cards: MemoryCard[] = [];
    shuffle(words).slice(0, config.pairs).forEach((pair, index) => {
      cards.push({ id: `ko-${index}`, pairId: index, type: "ko", display: pair.ko, isFlipped: false, isMatched: false });
      cards.push({ id: `uz-${index}`, pairId: index, type: "uz", display: pair.uz, isFlipped: false, isMatched: false });
    });
    return shuffle(cards);
  }, [config.pairs, words]);
  const [cards, setCards] = useState(initialCards);
  const [firstId, setFirstId] = useState<string | null>(null);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(config.timeSec);
  const [processing, setProcessing] = useState(false);
  const [preview, setPreview] = useState(true);
  const [started, setStarted] = useState(false);
  const [matchedTrigger, setMatchedTrigger] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(390);
  const finished = useRef(false);

  useEffect(() => {
    const update = () => setViewportWidth(Math.min(window.innerWidth, 560));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setPreview(true);
    setStarted(false);
    setCards(initialCards.map((card) => ({ ...card, isFlipped: true })));
    const previewTimer = window.setTimeout(() => {
      setCards((current) => current.map((card) => ({ ...card, isFlipped: false })));
      setPreview(false);
      window.setTimeout(() => setStarted(true), 500);
    }, config.previewMs);
    return () => window.clearTimeout(previewTimer);
  }, [config.previewMs, initialCards]);

  useEffect(() => {
    if (!started || finished.current) return;
    if (timeLeft <= 0) {
      finished.current = true;
      onComplete({ cleared: false, moves, level });
      return;
    }
    const timer = window.setTimeout(() => setTimeLeft((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [level, moves, onComplete, started, timeLeft]);

  useEffect(() => {
    if (matches !== config.pairs || !started || finished.current) return;
    finished.current = true;
    window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
    const timer = window.setTimeout(() => onComplete({ cleared: true, moves, level }), 600);
    return () => window.clearTimeout(timer);
  }, [config.pairs, level, matches, moves, onComplete, started, timeLeft]);

  const handlePress = (id: string) => {
    if (!started || processing) return;
    const card = cards.find((item) => item.id === id);
    if (!card || card.isFlipped || card.isMatched) return;
    if (!firstId) {
      setFirstId(id);
      setCards((current) => current.map((item) => item.id === id ? { ...item, isFlipped: true } : item));
      return;
    }
    if (id === firstId) return;
    const first = cards.find((item) => item.id === firstId)!;
    setCards((current) => current.map((item) => item.id === id ? { ...item, isFlipped: true } : item));
    setMoves((value) => value + 1);
    setProcessing(true);
    const isMatch = first.pairId === card.pairId && first.type !== card.type;
    if (isMatch) {
      window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
      window.setTimeout(() => {
        setCards((current) => current.map((item) => item.pairId === card.pairId ? { ...item, isMatched: true } : item));
        setMatches((value) => value + 1);
        setCombo((value) => value + 1);
        setMatchedTrigger((value) => value + 1);
        setFirstId(null);
        setProcessing(false);
      }, 350);
    } else {
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("error");
      setCombo(0);
      window.setTimeout(() => {
        setCards((current) => current.map((item) => item.id === id || item.id === firstId ? { ...item, isFlipped: false } : item));
        setFirstId(null);
        setProcessing(false);
      }, 900);
    }
  };

  const size = Math.floor((viewportWidth - 32 - config.columns * 12) / config.columns);
  const fontSize = Math.max(13, Math.min(24, size * .28));
  const lastPair = matches === config.pairs - 1;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, "0");
  const lowTime = timeLeft <= 10;

  return (
    <section className={`${styles.game} ${lastPair ? styles.tense : ""}`}>
      <div className={styles.hud}>
        <span><MobileIcon name="checkmark-circle" size={20} /><b>{matches}/{config.pairs}</b></span>
        <strong>{level}-daraja</strong>
        <span className={lowTime ? styles.lowTime : ""}><MobileIcon name="time" size={20} /><b>{minutes}:{seconds}</b></span>
      </div>
      {combo >= 2 ? <p className={styles.combo} key={combo}>🔥 {combo} kombo!</p> : null}
      {preview ? <p className={styles.preview}>Kartalar joyini eslab qoling!</p> : null}
      {lastPair && started ? <p className={styles.lastPair}>Oxirgi juftlik!</p> : null}
      <div className={styles.grid}>
        {cards.map((card) => (
          <WordCard card={card} fontSize={fontSize} key={`${card.id}-${card.isMatched ? matchedTrigger : 0}`} matchedTrigger={matchedTrigger} onClick={() => handlePress(card.id)} size={size} />
        ))}
      </div>
    </section>
  );
}

export function MemoryGameScreen() {
  const { words: pool, loading, failed, reload } = useGameWords(40, 4);
  const words = useMemo(
    () => (pool ?? []).map((word) => ({ ko: word.ko, uz: word.uz || word.en })),
    [pool],
  );
  const [level, setLevel] = useState(1);
  const [phase, setPhase] = useState<"playing" | "win" | "lose">("playing");
  const [gameKey, setGameKey] = useState(0);
  const [stars, setStars] = useState(0);
  const [challengeScore, setChallengeScore] = useState(0);
  const { finish } = useLeagueChallenge();

  const restart = (nextLevel: number) => {
    setLevel(nextLevel);
    setPhase("playing");
    setGameKey((value) => value + 1);
  };

  const handleComplete = useCallback(({ cleared, moves, level: completedLevel }: { cleared: boolean; moves: number; level: number }) => {
    if (cleared) {
      const pairCount = LEVELS.find((item) => item.level === completedLevel)?.pairs ?? 5;
      const earnedStars = moves <= pairCount + 2 ? 3 : moves <= pairCount + 6 ? 2 : 1;
      setStars(earnedStars);
      setChallengeScore((value) => value + completedLevel + earnedStars);
    }
    setPhase(cleared ? "win" : "lose");
  }, []);

  const exit = () => void finish(challengeScore);
  const isLast = level >= LEVELS.length;
  const maxPairs = LEVELS.at(-1)!.pairs;

  if (loading || failed || words.length < maxPairs) {
    return (
      <main className={styles.memoryPage}>
        <button aria-label="Yopish" className={styles.close} onClick={exit} type="button"><MobileIcon name="close" size={28} /></button>
        <div className={styles.gate}>
          {loading ? <i /> : failed ? <><p>Yuklab bo&apos;lmadi. Birozdan so&apos;ng urinib ko&apos;ring</p><button onClick={reload} type="button">Qayta urinish</button></> : null}
        </div>
      </main>
    );
  }

  return (
    <main className={styles.memoryPage}>
      <button aria-label="Yopish" className={styles.close} onClick={exit} type="button"><MobileIcon name="close" size={28} /></button>
      {phase === "playing" ? (
        <MemoryBoard key={gameKey} level={level} onComplete={handleComplete} words={words} />
      ) : (
        <section className={styles.result}>
          <span>{phase === "win" ? "🎉" : "⏰"}</span>
          <h1>{phase === "win" ? "Bajarildi!" : "Vaqt tugadi!"}</h1>
          {phase === "win" ? <div className={styles.resultStars}>{[1, 2, 3].map((index) => <MobileIcon className={index <= stars ? styles.earned : ""} key={index} name="star" size={44} />)}</div> : null}
          {phase === "win" && !isLast ? <button className={styles.primary} onClick={() => restart(level + 1)} type="button">Keyingi daraja</button> : null}
          {phase === "win" && isLast ? <p className={styles.allClear}>Hamma daraja tugadi! 🏆</p> : null}
          <button className={styles.retry} onClick={() => restart(level)} type="button">Qayta</button>
          <button className={styles.exit} onClick={exit} type="button">Chiqish</button>
        </section>
      )}
    </main>
  );
}
