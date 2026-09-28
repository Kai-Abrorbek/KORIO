"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { MobileIcon } from "../../../../shared/ui/mobile-icon";
import { CheckButton } from "../lesson-chrome";
import { AUTO_SPEECH_DELAY_MS, shuffle, useLessonSpeech, type QuestionProps } from "./shared";
import styles from "./questions.module.css";

/**
 * 듣고 단어 고르기 (listening) — 모바일 questions/Listening.
 * 뜨자마자 한 번 읽고, 큰 스피커(읽는 동안 두근) + 거북이(느리게),
 * 점선 칸에 단어를 눌러 쌓고(다시 누르면 빠짐), 아래 은행엔 빈자리를 남긴다.
 */
interface Word {
  id: string;
  word: string;
  placed: boolean;
  order: number;
}

export function Listening({ answerState, onAnswer, question }: QuestionProps) {
  const { speak, speakAuto, speaking } = useLessonSpeech();
  const auto = useRef(false);
  const initial = useMemo(
    () => shuffle(question.options ?? question.answer.split(" ")).map((word, index) => ({ id: `w-${index}`, order: 0, placed: false, word })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [question.id],
  );
  const [words, setWords] = useState<Word[]>(initial);

  useEffect(() => {
    if (auto.current) return;
    auto.current = true;
    const timer = window.setTimeout(() => speakAuto(question.answer), AUTO_SPEECH_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [question.answer, speakAuto]);

  const locked = answerState !== "idle";
  const placed = words.filter((word) => word.placed).sort((a, b) => a.order - b.order);

  const place = (id: string) => {
    if (locked) return;
    setWords((current) => {
      const max = Math.max(0, ...current.filter((word) => word.placed).map((word) => word.order));
      return current.map((word) => (word.id === id ? { ...word, order: max + 1, placed: true } : word));
    });
  };
  const unplace = (id: string) => {
    if (locked) return;
    setWords((current) => current.map((word) => (word.id === id ? { ...word, placed: false } : word)));
  };

  return (
    <div className={styles.q}>
      <h1 className={styles.title} style={{ marginBottom: 24 }}>Eshitganingizni tanlang</h1>

      <div className={styles.audioRow}>
        <button
          aria-label="Tinglash"
          className={`${styles.bigSpeaker} ${speaking ? styles.pulsing : ""}`}
          onClick={() => speak(question.answer)}
          type="button"
        >
          <MobileIcon name="volume-high" size={36} />
        </button>
        <button aria-label="Sekin tinglash" className={styles.slowSpeaker} onClick={() => speak(question.answer, { slow: true })} type="button">
          <MobileIcon family="material-community" name="turtle" size={30} />
        </button>
      </div>

      <div className={styles.placedArea}>
        {placed.length === 0 ? (
          <p className={styles.placeholder}>So&apos;zni bosing yoki sudrab olib keling</p>
        ) : (
          <div className={styles.chipRow}>
            {placed.map((word) => (
              <button className={styles.chip} data-no-translate disabled={locked} key={word.id} onClick={() => unplace(word.id)} type="button">
                {word.word}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className={styles.divider} />

      <div className={styles.chipRow}>
        {words.map((word) =>
          word.placed ? (
            <span aria-hidden="true" className={`${styles.chip} ${styles.chipGhost}`} key={word.id}>
              <span style={{ opacity: 0 }}>{word.word}</span>
            </span>
          ) : (
            <button className={styles.chip} data-no-translate disabled={locked} key={word.id} onClick={() => place(word.id)} type="button">
              {word.word}
            </button>
          ),
        )}
      </div>

      <CheckButton
        disabled={placed.length === 0 || locked}
        onClick={() => placed.length > 0 && !locked && onAnswer(placed.map((word) => word.word).join(" "))}
      />
    </div>
  );
}
