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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const bank = useMemo(() => shuffle(question.options ?? []), [question.id]);
  // 빈칸마다 뱅크 칩의 **위치**를 담는다. 같은 단어("조언" ×2)가 두 빈칸의 정답일 때
  // 글자로 "썼는지" 보면 하나만 골라도 같은 글자 칩이 전부 꺼진다 (모바일 ClozePassage 와 같음).
  const [filled, setFilled] = useState<(number | null)[]>(() => Array(blankTotal).fill(null));
  const filledWords = filled.map((i) => (i === null ? null : (bank[i] ?? null)));
  const used = filledWords.filter(Boolean) as string[];
  const activeIndex = filled.findIndex((value) => value === null);
  const allFilled = activeIndex === -1;

  const place = (bankIndex: number) => {
    if (locked || allFilled || filled.includes(bankIndex)) return;
    haptic();
    setFilled((current) => {
      const next = [...current];
      next[next.findIndex((value) => value === null)] = bankIndex;
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
          <i className={value !== null ? styles.dotFilled : index === activeIndex ? styles.dotActive : undefined} key={index} />
        ))}
      </div>

      <div className={styles.paper}>
        <p className={styles.passage} data-no-translate>
          {parts.map((part, index) => (
            <span key={index}>
              {part}
              {index < blankTotal ? (
                <button
                  className={`${styles.blank} ${filledWords[index] ? styles.blankFilled : index === activeIndex ? styles.blankActive : styles.blankIdle}`}
                  disabled={locked || filled[index] === null}
                  onClick={() => filled[index] !== null && remove(index)}
                  type="button"
                >
                  {" "}
                  {filledWords[index] ?? "＿＿＿"}{" "}
                </button>
              ) : null}
            </span>
          ))}
        </p>
      </div>

      <div className={styles.clozeBank}>
        {bank.map((word, index) => {
          const isUsed = filled.includes(index);
          return (
            <button className={`${styles.clozeChip} ${isUsed ? styles.clozeChipUsed : ""}`} data-no-translate disabled={locked || isUsed} key={`${word}-${index}`} onClick={() => place(index)} type="button">
              {word}
            </button>
          );
        })}
      </div>

      <CheckButton disabled={!allFilled || locked} onClick={() => allFilled && !locked && onAnswer(used.join("|"))} />
    </div>
  );
}
