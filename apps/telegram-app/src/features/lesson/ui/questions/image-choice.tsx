"use client";

import { useMemo, useState } from "react";

import { MobileIcon } from "../../../../shared/ui/mobile-icon";
import { CheckButton } from "../lesson-chrome";
import { shuffle, useLessonSpeech, type QuestionProps } from "./shared";
import styles from "./questions.module.css";

/**
 * 그림 고르기 (image_choice) — 모바일 questions/ImageChoice.
 * "Yangi so'z" 배지 → 지시문 → 🔊 + 단어(점선 밑줄) → 2×2 카드 → 확인.
 * 시드는 정답을 첫 칸에 적어 두므로 문제 id 로 한 번 섞는다 (자리로 외우지 않게).
 */
export function ImageChoice({ answerState, onAnswer, question }: QuestionProps) {
  const { speak } = useLessonSpeech();
  const [selected, setSelected] = useState<string | null>(null);
  const choices = useMemo(
    () =>
      shuffle(
        question.choices?.length
          ? question.choices
          : (question.options ?? []).map((option) => ({ emoji: "❓", label: option, text: option })),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [question.id],
  );
  const judged = answerState !== "idle";

  const pick = (text: string) => {
    if (judged) return;
    setSelected(text);
    speak(text);
  };

  const cardClass = (text: string) => {
    if (judged) {
      if (text === question.answer) return styles.icCorrect;
      if (text === selected) return styles.icWrong;
      return styles.icDim;
    }
    return selected === text ? styles.icSelected : "";
  };

  return (
    <div className={styles.q}>
      <div className={styles.newBadge}>
        <MobileIcon name="star" size={13} />
        <span>Yangi so&apos;z</span>
      </div>
      <h1 className={styles.title} style={{ marginBottom: 20 }}>To&apos;g&apos;ri rasmni tanlang</h1>

      <div className={styles.wordRow}>
        <button aria-label="Tinglash" className={styles.ttsBtn} onClick={() => speak(question.answer)} type="button">
          <MobileIcon name="volume-high" size={22} />
        </button>
        <b className={styles.wordText} data-no-translate>{question.answer}</b>
      </div>

      <div className={styles.icGrid}>
        {choices.map((choice, index) => (
          <button
            className={`${styles.icCard} ${cardClass(choice.text)}`}
            key={choice.text}
            onClick={() => pick(choice.text)}
            style={{ animationDelay: `${index * 60}ms` }}
            type="button"
          >
            {judged && choice.text === question.answer ? (
              <i className={styles.icMark} style={{ color: "#1CB454" }}><MobileIcon name="checkmark-circle" size={22} /></i>
            ) : null}
            {judged && choice.text === selected && choice.text !== question.answer ? (
              <i className={styles.icMark} style={{ color: "#FF4B4B" }}><MobileIcon name="close-circle" size={22} /></i>
            ) : null}
            {choice.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt="" className={styles.icImage} src={choice.imageUrl} />
            ) : (
              <span className={styles.icEmoji}>{choice.emoji ?? "🖼️"}</span>
            )}
            <b className={styles.icLabel} data-no-translate>{choice.label}</b>
          </button>
        ))}
      </div>

      <div className={styles.spacer} />
      <CheckButton disabled={!selected || judged} onClick={() => selected && !judged && onAnswer(selected)} />
    </div>
  );
}
