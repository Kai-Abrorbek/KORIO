"use client";

import { useMemo, useState } from "react";

import { CheckButton } from "../lesson-chrome";
import { haptic, shuffle, type QuestionProps } from "./shared";
import q from "./questions.module.css";
import styles from "./reading.module.css";

/**
 * 지문 빈칸 채우기 (cloze_passage) — 모바일 questions/ClozePassage.
 * 지문의 ___ 가 빈칸, 진행 점, 인라인 빈칸(채운 건 다시 누르면 빠짐), 가운데 정렬 단어 뱅크.
 * 답은 "단어1|단어2|…".
 */
export function ClozePassage({ answerState, onAnswer, question }: QuestionProps) {
  const locked = answerState !== "idle";
  const parts = useMemo(() => (question.passage ?? "").split("___"), [question.passage]);
  const blankTotal = parts.length - 1;
  const [filled, setFilled] = useState<(string | null)[]>(() => Array(blankTotal).fill(null));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const bank = useMemo(() => shuffle(question.options ?? []), [question.id]);
  const used = filled.filter(Boolean) as string[];
  const activeIndex = filled.findIndex((value) => value === null);
  const allFilled = activeIndex === -1;

  const place = (word: string) => {
    if (locked || allFilled) return;
    haptic();
    setFilled((current) => {
      const next = [...current];
      next[next.findIndex((value) => value === null)] = word;
      return next;
    });
  };
  const remove = (index: number) => {
    if (locked) return;
    haptic();
    setFilled((current) => {
      const next = [...current];
      next[index] = null;
      return next;
    });
  };

  return (
    <div className={q.q}>
      <h1 className={styles.clozeTitle}>Matndagi bo&apos;sh joylarni to&apos;ldiring</h1>
      <div className={styles.dots}>
        {filled.map((value, index) => (
          <i className={value ? styles.dotFilled : index === activeIndex ? styles.dotActive : undefined} key={index} />
        ))}
      </div>

      <div className={styles.paper}>
        <p className={styles.passage} data-no-translate>
          {parts.map((part, index) => (
            <span key={index}>
              {part}
              {index < blankTotal ? (
                <button
                  className={`${styles.blank} ${filled[index] ? styles.blankFilled : index === activeIndex ? styles.blankActive : styles.blankIdle}`}
                  disabled={locked || !filled[index]}
                  onClick={() => filled[index] && remove(index)}
                  type="button"
                >
                  {" "}
                  {filled[index] ?? "＿＿＿"}{" "}
                </button>
              ) : null}
            </span>
          ))}
        </p>
      </div>

      <div className={styles.clozeBank}>
        {bank.map((word, index) => {
          const isUsed = used.includes(word);
          return (
            <button className={`${styles.clozeChip} ${isUsed ? styles.clozeChipUsed : ""}`} data-no-translate disabled={locked || isUsed} key={`${word}-${index}`} onClick={() => place(word)} type="button">
              {word}
            </button>
          );
        })}
      </div>

      <CheckButton disabled={!allFilled || locked} onClick={() => allFilled && !locked && onAnswer(used.join("|"))} />
    </div>
  );
}
