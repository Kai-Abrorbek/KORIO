"use client";

import { useMemo, useState } from "react";

import { MobileIcon } from "../../../../shared/ui/mobile-icon";
import { CheckButton } from "../lesson-chrome";
import { haptic, shuffle, useLessonSpeech, type QuestionProps } from "./shared";
import q from "./questions.module.css";
import styles from "./reading.module.css";

/**
 * 읽고 답하기 (reading_quiz) — 모바일 questions/ReadingQuiz.
 * 종이 느낌 지문 카드(📖 제목, 읽어주기, n 단어) → 질문 → A/B/C 배지 3D 선택지.
 */
export function ReadingQuiz({ answerState, onAnswer, question }: QuestionProps) {
  const { speak, speaking } = useLessonSpeech();
  const [selected, setSelected] = useState<string | null>(null);
  const locked = answerState !== "idle";
  const passage = question.passage ?? "";
  // 시드는 정답을 첫 칸에 적어 둔다 — 자리로 외우지 않게 섞는다
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo(() => shuffle(question.options ?? []), [question.id]);
  const wordCount = passage.split(/\s+/).filter(Boolean).length;

  return (
    <div className={q.q}>
      <h1 className={styles.clozeTitle} style={{ marginBottom: 14 }}>
        Matnni o&apos;qib, savolga javob bering
      </h1>

      <section className={styles.paper} style={{ padding: 18 }}>
        <div className={styles.paperHeader}>
          <span className={styles.paperTitleWrap}>
            <span className={styles.paperIcon}>📖</span>
            {question.passageTitle ? (
              <b data-no-translate>{question.passageTitle}</b>
            ) : null}
          </span>
          <button aria-label="Tinglash" className={`${styles.speakBtn} ${speaking ? styles.speakBtnOn : ""}`} onClick={() => speak(passage)} type="button">
            <MobileIcon name={speaking ? "volume-high" : "volume-medium"} size={20} />
          </button>
        </div>
        <p className={styles.readingPassage} data-no-translate>
          {passage}
        </p>
        <div className={styles.paperFooter}>
          <small>{`${wordCount} so'z`}</small>
        </div>
      </section>

      <p className={styles.questionText} data-no-translate>
        {question.question}
      </p>

      {options.map((option, index) => {
        const selectedHere = selected === option;
        return (
          <button
            className={`${styles.option} ${selectedHere ? styles.optionOn : ""}`}
            disabled={locked}
            key={option}
            onClick={() => {
              if (locked) return;
              haptic();
              setSelected((current) => (current === option ? null : option));
            }}
            type="button"
          >
            <span className={styles.optionBadge}>{String.fromCharCode(65 + index)}</span>
            <span className={styles.optionText} data-no-translate>
              {option}
            </span>
          </button>
        );
      })}

      <CheckButton disabled={!selected || locked} onClick={() => selected && !locked && onAnswer(selected)} />
    </div>
  );
}
