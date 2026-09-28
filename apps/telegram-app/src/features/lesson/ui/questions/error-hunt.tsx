"use client";

import { useMemo, useState } from "react";

import { CheckButton } from "../lesson-chrome";
import { haptic, shuffle, type QuestionProps } from "./shared";
import q from "./questions.module.css";
import styles from "./error-hunt.module.css";

function notify(kind: "success" | "error") {
  window.Telegram?.WebApp.HapticFeedback?.notificationOccurred(kind);
}

/**
 * 틀린 곳 찾기 (error_hunt) — 모바일 questions/ErrorHunt.
 * 1단계: 문장에서 틀린 단어를 한 번에 찍는다(원샷 — 잘못 찍으면 흔들리고 바로 오답).
 * 2단계: 찾은 단어에 취소선이 그어지고, 고칠 말을 고른다.
 */
export function ErrorHunt({ answerState, onAnswer, question }: QuestionProps) {
  const locked = answerState !== "idle";
  const words = (question.npcText ?? "").split(" ");
  const [foundIdx, setFoundIdx] = useState<number | null>(null);
  const [missedIdx, setMissedIdx] = useState<number | null>(null);
  const [fix, setFix] = useState<string | null>(null);
  const [shake, setShake] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo(() => shuffle(question.options ?? []), [question.id]);
  const stage = foundIdx !== null ? 2 : 1;

  const tapWord = (index: number) => {
    if (locked || stage === 2 || missedIdx !== null) return;
    if (words[index] === question.wrongWord) {
      notify("success");
      setFoundIdx(index);
      return;
    }
    notify("error");
    setMissedIdx(index);
    setShake((count) => count + 1);
    window.setTimeout(() => onAnswer("__wrong_tap__"), 350);
  };

  return (
    <div className={q.q}>
      <h1 className={styles.title}>{stage === 1 ? "Gapdagi xatoni toping" : "To'g'ri shakl bilan tuzating"}</h1>

      <div className={styles.badge}>
        <span>🕵️</span>
        <b>{stage === 1 ? "Xato so'zni bosing — faqat bitta imkoniyat!" : "Topdingiz! Endi tuzatamizmi?"}</b>
      </div>

      <section className={`${styles.sentence} ${shake ? styles.shake : ""}`} key={`shake-${shake}`}>
        <div className={styles.words} data-no-translate>
          {words.map((word, index) => {
            const found = foundIdx === index;
            const missed = missedIdx === index;
            return (
              <button
                className={`${styles.word} ${found || missed ? styles.wordMarked : ""}`}
                disabled={locked || stage === 2}
                key={`${word}-${index}`}
                onClick={() => tapWord(index)}
                type="button"
              >
                <span className={found || missed ? styles.wordRed : undefined}>{word}</span>
                {found ? <i className={styles.strike} /> : null}
              </button>
            );
          })}
        </div>
      </section>

      {stage === 2 ? (
        <div className={styles.fixArea}>
          {options.map((option) => (
            <button
              className={`${styles.fixOption} ${fix === option ? styles.fixOn : ""}`}
              data-no-translate
              disabled={locked}
              key={option}
              onClick={() => {
                haptic();
                setFix((current) => (current === option ? null : option));
              }}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}

      <CheckButton disabled={stage === 1 || !fix || locked} onClick={() => fix && !locked && onAnswer(fix)} />
    </div>
  );
}
