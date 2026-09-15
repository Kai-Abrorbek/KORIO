"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import {
  HANGUL_CHARACTERS,
  type HangulCharacter,
  type HangulMemoryCard,
} from "../model/hangul";
import { useHangulReporter } from "../model/use-hangul-reporter";
import styles from "./hangul-memory-game.module.css";

const PAIRS = 8;
const FLIP_BACK_DELAY = 900;

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function buildDeck(characters: HangulCharacter[]): HangulMemoryCard[] {
  const picked = shuffle(characters).slice(0, PAIRS);
  const cards: HangulMemoryCard[] = [];
  for (const character of picked) {
    cards.push({
      characterId: character.id,
      display: character.char,
      id: character.id + "-h",
      isFlipped: false,
      isMatched: false,
      type: "hangul",
    });
    cards.push({
      characterId: character.id,
      display: character.romanization,
      id: character.id + "-r",
      isFlipped: false,
      isMatched: false,
      type: "roman",
    });
  }
  return shuffle(cards);
}

function hapticImpact() {
  window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
}

function hapticNotification(type: "error" | "success") {
  window.Telegram?.WebApp.HapticFeedback?.notificationOccurred(type);
}

function MemoryCardView({
  card,
  disabled,
  onPress,
}: {
  card: HangulMemoryCard;
  disabled: boolean;
  onPress: () => void;
}) {
  const state = [
    styles.cardArea,
    card.isFlipped ? styles.cardFlipped : "",
    card.isMatched ? styles.cardMatched : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.cardWrap}>
      <i
        className={[
          styles.matchedGlow,
          card.isMatched ? styles.matchedGlowActive : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />
      <button
        aria-label={card.isFlipped ? card.display : "Karta"}
        className={state}
        disabled={disabled}
        onClick={onPress}
        type="button"
      >
        <span className={styles.coverFace}>
          <span className={styles.coverShine} />
          <span className={styles.backGlyph}>가</span>
          <span className={styles.backBadge}>한</span>
        </span>
        <span
          className={[
            styles.contentFace,
            card.type === "hangul"
              ? styles.contentHangul
              : styles.contentRoman,
          ].join(" ")}
        >
          <i className={styles.typeDot} />
          <span
            className={
              card.type === "hangul" ? styles.hangulText : styles.romanText
            }
          >
            {card.display}
          </span>
        </span>
      </button>
    </div>
  );
}

function StatPill({
  color,
  icon,
  label,
}: {
  color: string;
  icon: IoniconName;
  label: string;
}) {
  return (
    <div className={styles.statPill}>
      <MobileIcon name={icon} size={16} style={{ color }} />
      <span>{label}</span>
    </div>
  );
}

function WinOverlay({
  moves,
  onExit,
  onRestart,
  stars,
  time,
}: {
  moves: number;
  onExit: () => void;
  onRestart: () => void;
  stars: number;
  time: string;
}) {
  return (
    <div className={styles.winOverlay}>
      <div className={styles.winBackdrop} />
      <section className={styles.winSheet}>
        <h2>Ajoyib!</h2>
        <div className={styles.starsRow}>
          {[0, 1, 2].map((index) => (
            <span
              className={styles.winStar}
              key={index}
              style={
                { "--star-delay": 400 + index * 220 + "ms" } as CSSProperties
              }
            >
              <MobileIcon
                name={index < stars ? "star" : "star-outline"}
                size={56}
                style={{ color: index < stars ? "#FFD000" : "#D8D8E0" }}
              />
            </span>
          ))}
        </div>
        <div className={styles.winStats}>
          <div>
            <small>Vaqt</small>
            <strong>{time}</strong>
          </div>
          <i />
          <div>
            <small>Harakat</small>
            <strong>{moves}</strong>
          </div>
        </div>
        <button className={styles.winPrimary} onClick={onRestart} type="button">
          Qayta o&apos;ynash
        </button>
        <button className={styles.winSecondary} onClick={onExit} type="button">
          Chiqish
        </button>
      </section>
    </div>
  );
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return minutes + ":" + rest.toString().padStart(2, "0");
}

export function HangulMemoryGame() {
  const router = useRouter();
  const params = useSearchParams();
  const category = params.get("category") === "vowel" ? "vowel" : "consonant";
  const characters = useMemo(
    () =>
      HANGUL_CHARACTERS.filter(
        (character) => character.category === category,
      ),
    [category],
  );
  const [cards, setCards] = useState<HangulMemoryCard[]>(() =>
    buildDeck(characters),
  );
  const [firstId, setFirstId] = useState<string | null>(null);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [won, setWon] = useState(false);
  const { flush, record } = useHangulReporter("memory-match");

  useEffect(() => {
    if (won) return;
    const timer = window.setInterval(
      () => setElapsed((value) => value + 1),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [won]);

  useEffect(() => {
    if (matches !== PAIRS || won) return;
    setWon(true);
    void flush();
    hapticNotification("success");
  }, [flush, matches, won]);

  const exit = () => {
    if (window.history.length > 1) router.back();
    else router.replace("/hangul");
  };

  const handleCardPress = (id: string) => {
    if (processing || won) return;
    const card = cards.find((candidate) => candidate.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    hapticImpact();
    setCards((current) =>
      current.map((candidate) =>
        candidate.id === id ? { ...candidate, isFlipped: true } : candidate,
      ),
    );

    if (!firstId) {
      setFirstId(id);
      return;
    }

    setMoves((value) => value + 1);
    setProcessing(true);
    const first = cards.find((candidate) => candidate.id === firstId);

    window.setTimeout(() => {
      if (first && first.characterId === card.characterId) {
        record(first.characterId, true);
        setCards((current) =>
          current.map((candidate) =>
            candidate.id === firstId || candidate.id === id
              ? { ...candidate, isMatched: true }
              : candidate,
          ),
        );
        setMatches((value) => value + 1);
        hapticNotification("success");
      } else {
        setCards((current) =>
          current.map((candidate) =>
            candidate.id === firstId || candidate.id === id
              ? { ...candidate, isFlipped: false }
              : candidate,
          ),
        );
        hapticNotification("error");
      }
      setFirstId(null);
      setProcessing(false);
    }, FLIP_BACK_DELAY);
  };

  const restart = () => {
    setCards(buildDeck(characters));
    setFirstId(null);
    setMatches(0);
    setMoves(0);
    setElapsed(0);
    setProcessing(false);
    setWon(false);
  };

  const stars = won
    ? moves <= PAIRS + 3
      ? 3
      : moves <= PAIRS + 7
        ? 2
        : 1
    : 0;

  return (
    <main className={styles.gamePage}>
      <div className={styles.topBar}>
        <button aria-label="Chiqish" onClick={exit} type="button">
          <MobileIcon name="close" size={28} />
        </button>
        <div className={styles.statRow}>
          <StatPill
            color="#1FA9F7"
            icon="time-outline"
            label={formatTime(elapsed)}
          />
          <StatPill
            color="#776ee2"
            icon="swap-horizontal-outline"
            label={moves.toString()}
          />
          <StatPill
            color="#58CC02"
            icon="checkmark-circle-outline"
            label={matches + "/" + PAIRS}
          />
        </div>
      </div>

      <div className={styles.progressTrack}>
        <i style={{ width: (matches / PAIRS) * 100 + "%" }} />
      </div>

      <p className={styles.title}>Bir xil harf va talaffuzni juftlang</p>

      <section className={styles.grid}>
        {cards.map((card) => (
          <MemoryCardView
            card={card}
            disabled={processing || won}
            key={card.id}
            onPress={() => handleCardPress(card.id)}
          />
        ))}
      </section>

      {won ? (
        <WinOverlay
          moves={moves}
          onExit={exit}
          onRestart={restart}
          stars={stars}
          time={formatTime(elapsed)}
        />
      ) : null}
    </main>
  );
}
