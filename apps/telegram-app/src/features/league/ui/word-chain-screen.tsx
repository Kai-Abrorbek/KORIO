"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import {
  calcTurnScore,
  lastSyllable,
  pickAiStarter,
  type ChainHintsResponse,
  type ChainTurn,
  type ChainTurnResponse,
  type EndReason,
  type GamePhase,
} from "../model/word-chain";
import { useLeagueChallenge } from "../model/use-league-challenge";
import styles from "./word-chain-screen.module.css";

const MAX_HEARTS = 3;
const MAX_HINTS = 3;
const TURN_TIME = 10;

function WordBubble({ latest, turn }: { latest: boolean; turn: ChainTurn }) {
  const ai = turn.player === "ai";
  const characters = [...turn.word];
  return (
    <div className={`${styles.bubbleRow} ${ai ? styles.aiRow : styles.userRow}`}>
      {ai ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt="Hangulmon" className={styles.avatar} height={36} src="/characters/hangulmon_default.png" width={36} />
      ) : null}
      <div className={`${styles.wordBubble} ${ai ? styles.aiBubble : styles.userBubble} ${latest ? styles.latest : ""}`}>
        <strong>
          {characters.map((character, index) => <span className={latest && index === characters.length - 1 ? styles.lastCharacter : ""} key={`${character}-${index}`}>{character}</span>)}
        </strong>
        {turn.roman ? <small>{turn.roman}</small> : null}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className={`${styles.bubbleRow} ${styles.aiRow} ${styles.typingRow}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="Hangulmon o'ylayapti" className={styles.avatar} height={36} src="/characters/hangulmon_thinking.png" width={36} />
      <div className={styles.typingBubble}><i /><i /><i /></div>
    </div>
  );
}

function HintToast({ hints, onDismiss }: { hints: string[]; onDismiss: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, 4000);
    return () => window.clearTimeout(timer);
  }, [onDismiss]);
  return (
    <aside className={styles.hintToast}>
      <header><MobileIcon name="bulb" size={18} /><strong>Bu so&apos;zlar qanday?</strong></header>
      <div>{hints.map((hint, index) => <span key={`${hint}-${index}`}>{hint}</span>)}</div>
    </aside>
  );
}

function EndModal({ bestCombo, onExit, onRestart, reason, score, turnCount }: {
  bestCombo: number;
  onExit: () => void;
  onRestart?: () => void;
  reason: EndReason;
  score: number;
  turnCount: number;
}) {
  const win = reason === "ai-surrender";
  return (
    <div className={styles.endOverlay}>
      <section className={styles.endSheet}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="Hangulmon" className={styles.endMascot} height={100} src={`/characters/hangulmon_${win ? "celebrating" : "wrong"}.png`} width={100} />
        <h1 className={win ? styles.win : styles.lose}>{win ? "G'alaba!" : "Mag'lubiyat..."}</h1>
        <p>{win ? "AI so'z topa olmadi!" : "Yuraklar tugadi"}</p>
        <div className={styles.endStats}>
          <div><MobileIcon name="flash" size={20} /><strong>{score}</strong><span>Ball</span></div>
          <i />
          <div><MobileIcon className={styles.turnIcon} name="repeat" size={20} /><strong>{turnCount}</strong><span>Yurish</span></div>
          <i />
          <div><MobileIcon className={styles.comboIcon} name="flame" size={20} /><strong>{bestCombo}</strong><span>Eng yuqori kombo</span></div>
        </div>
        {onRestart ? <button className={styles.restart} onClick={onRestart} type="button">Qayta o&apos;ynash</button> : null}
        <button className={styles.endExit} onClick={onExit} type="button">Chiqish</button>
      </section>
    </div>
  );
}

export function WordChainScreen() {
  const { request } = useTelegramAuth();
  const { finish, goBack, isChallenge } = useLeagueChallenge();
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [turns, setTurns] = useState<ChainTurn[]>([]);
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set());
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(MAX_HINTS);
  const [timeLeft, setTimeLeft] = useState(TURN_TIME);
  const [endReason, setEndReason] = useState<EndReason | null>(null);
  const [errorFlash, setErrorFlash] = useState(0);
  const [hints, setHints] = useState<string[]>([]);
  const [hintVisible, setHintVisible] = useState(false);
  const [value, setValue] = useState("");
  const submitting = useRef(false);
  const heartsRef = useRef(MAX_HEARTS);
  const chat = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const timers = useRef(new Set<number>());

  const schedule = useCallback((callback: () => void, delay: number) => {
    const timer = window.setTimeout(() => {
      timers.current.delete(timer);
      callback();
    }, delay);
    timers.current.add(timer);
    return timer;
  }, []);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current.clear();
  }, []);

  const endGame = useCallback((reason: EndReason) => {
    setEndReason(reason);
    setPhase("ended");
    if (reason === "ai-surrender") window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
  }, []);

  const loseHeart = useCallback(() => {
    heartsRef.current -= 1;
    setHearts(heartsRef.current);
    if (heartsRef.current <= 0) endGame("no-hearts");
    setCombo(0);
  }, [endGame]);

  const startGame = useCallback(() => {
    const starter = pickAiStarter();
    setTurns([{ id: "ai-0", player: "ai", word: starter.word, roman: starter.roman }]);
    setUsedWords(new Set([starter.word]));
    setPhase("user-turn");
    setTimeLeft(TURN_TIME);
  }, []);

  useEffect(() => {
    startGame();
    return clearTimers;
  }, [clearTimers, startGame]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (chat.current) chat.current.scrollTop = chat.current.scrollHeight;
    }, 100);
    return () => window.clearTimeout(timer);
  }, [phase, turns.length]);

  useEffect(() => {
    if (phase !== "user-turn") return;
    if (timeLeft <= 0) {
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("error");
      loseHeart();
      setTimeLeft(TURN_TIME);
      return;
    }
    const timer = window.setTimeout(() => setTimeLeft((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [loseHeart, phase, timeLeft]);

  useEffect(() => {
    if (phase !== "user-turn") {
      input.current?.blur();
      return;
    }
    const timer = window.setTimeout(() => input.current?.focus(), 200);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const requiredStart = turns.length ? lastSyllable(turns[turns.length - 1]!.word) : "";
  const userTurn = phase === "user-turn";

  const submitWord = async (word: string) => {
    if (!userTurn || submitting.current) return;
    submitting.current = true;
    const previous = turns.length ? turns[turns.length - 1]!.word : null;
    setPhase("ai-thinking");
    try {
      const response = await request<ChainTurnResponse>("/words/chain/turn", {
        body: JSON.stringify({ prev: previous, used: [...usedWords], word: word.trim() }),
        method: "POST",
      });
      if (!response.accepted || !response.word) {
        window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("warning");
        setErrorFlash((current) => current + 1);
        setPhase("user-turn");
        loseHeart();
        return;
      }

      const myWord = response.word.ko;
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
      const nextCombo = combo + 1;
      setTurns((current) => [...current, { id: `user-${current.length}`, player: "user", word: myWord, roman: "" }]);
      setUsedWords((current) => new Set(current).add(myWord));
      setScore((current) => current + calcTurnScore(myWord, nextCombo));
      setCombo(nextCombo);
      setBestCombo((current) => Math.max(current, nextCombo));
      setTimeLeft(TURN_TIME);

      if (!response.reply) {
        schedule(() => endGame("ai-surrender"), 700);
        return;
      }

      const reply = response.reply;
      schedule(() => {
        setTurns((current) => [...current, { id: `ai-${current.length}`, player: "ai", word: reply.ko, roman: "" }]);
        setUsedWords((current) => new Set(current).add(reply.ko));
        setPhase("user-turn");
        setTimeLeft(TURN_TIME);
      }, 900 + Math.random() * 700);
    } catch {
      setPhase("user-turn");
    } finally {
      submitting.current = false;
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const word = value.trim();
    if (!word || !userTurn) return;
    setValue("");
    void submitWord(word);
  };

  const showHint = async () => {
    if (hintsLeft <= 0 || !userTurn) return;
    try {
      const exclude = encodeURIComponent([...usedWords].slice(0, 60).join(","));
      const response = await request<ChainHintsResponse>(`/words/chain/hints?start=${encodeURIComponent(requiredStart)}&exclude=${exclude}`);
      const nextHints = (response.words ?? []).map((word) => word.ko);
      if (!nextHints.length) return;
      setHints(nextHints);
      setHintVisible(true);
      setHintsLeft((current) => current - 1);
    } catch {
      // 힌트를 못 받아도 현재 게임은 계속한다.
    }
  };

  const restart = () => {
    clearTimers();
    submitting.current = false;
    heartsRef.current = MAX_HEARTS;
    setTurns([]);
    setUsedWords(new Set());
    setHearts(MAX_HEARTS);
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setHintsLeft(MAX_HINTS);
    setTimeLeft(TURN_TIME);
    setEndReason(null);
    setHintVisible(false);
    setPhase("idle");
    schedule(startGame, 100);
  };

  const dismissHint = useCallback(() => setHintVisible(false), []);

  const exit = () => {
    if (isChallenge) {
      void finish(score);
      return;
    }
    if (phase === "ended") {
      goBack();
      return;
    }
    if (window.confirm("O'yinni tugatamizmi?\n\nJoriy progress saqlanmaydi")) goBack();
  };

  const timerProgress = Math.max(0, Math.min(1, timeLeft / TURN_TIME));
  const ringColor = timerProgress > .5 ? "#58cc02" : timerProgress > .25 ? "#ffd000" : "#ff4b4b";
  const ringOffset = 150.796 * (1 - timerProgress);

  return (
    <main className={styles.page}>
      <header className={styles.statBar}>
        <button aria-label="Yopish" onClick={exit} type="button"><MobileIcon name="close" size={26} /></button>
        <div className={styles.hearts}>{Array.from({ length: MAX_HEARTS }, (_, index) => <MobileIcon className={index < hearts ? styles.heartFull : styles.heartEmpty} key={index} name={index < hearts ? "heart" : "heart-outline"} size={20} />)}</div>
        <div className={styles.statRight}>
          {combo >= 2 ? <span className={styles.combo} key={combo}>🔥 {combo}</span> : null}
          <span className={styles.scoreBadge}><MobileIcon name="flash" size={14} />{score}</span>
        </div>
      </header>

      <section className={`${styles.syllableTarget} ${userTurn ? styles.active : ""}`}>
        <span>Keyingi bo&apos;g&apos;in</span>
        <i />
        <strong>{requiredStart}</strong>
      </section>

      <div className={styles.chat} ref={chat}>
        {turns.map((turn, index) => <WordBubble key={turn.id} latest={index === turns.length - 1} turn={turn} />)}
        {phase === "ai-thinking" ? <TypingIndicator /> : null}
      </div>

      <div className={styles.inputWrap}>
        <form className={`${styles.inputRow} ${errorFlash ? styles.inputShake : ""}`} key={errorFlash} onSubmit={onSubmit}>
          <div className={styles.timerRing} style={{ color: ringColor }}>
            <svg height="56" viewBox="0 0 56 56" width="56">
              <circle className={styles.ringTrack} cx="28" cy="28" fill="none" r="24" strokeWidth="4" />
              <circle cx="28" cy="28" fill="none" r="24" stroke="currentColor" strokeDasharray="150.796" strokeDashoffset={ringOffset} strokeLinecap="round" strokeWidth="4" />
            </svg>
            <strong>{timeLeft}</strong>
          </div>
          <div className={`${styles.inputBox} ${!userTurn ? styles.disabled : ""}`}>
            <input autoCapitalize="none" autoComplete="off" autoCorrect="off" disabled={!userTurn} maxLength={12} onChange={(event) => setValue(event.target.value)} placeholder="Hangul yozing..." ref={input} value={value} />
          </div>
          <button aria-label="Yuborish" className={styles.send} disabled={!userTurn || !value.trim()} type="submit"><MobileIcon name="arrow-up" size={22} /></button>
        </form>
        <button className={styles.hintButton} disabled={!userTurn || hintsLeft === 0} onClick={() => void showHint()} type="button"><MobileIcon name="bulb" size={16} />Maslahat ({hintsLeft})</button>
      </div>

      {hintVisible ? <HintToast hints={hints} onDismiss={dismissHint} /> : null}
      {endReason ? <EndModal bestCombo={bestCombo} onExit={() => isChallenge ? void finish(score) : goBack()} onRestart={isChallenge ? undefined : restart} reason={endReason} score={score} turnCount={turns.length} /> : null}
    </main>
  );
}
