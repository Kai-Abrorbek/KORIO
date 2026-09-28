"use client";

import { useMemo, useState } from "react";

import { MobileIcon } from "../../../../shared/ui/mobile-icon";
import { CheckButton } from "../lesson-chrome";
import { haptic, shuffle, useLessonSpeech, type QuestionProps } from "./shared";
import q from "./questions.module.css";
import styles from "./verb-transform.module.css";

/**
 * 동사 활용 (verb_transform) — 모바일 questions/VerbTransform.
 * 기본형 → 목표형 카드, 음절 칩을 눌러 활용형을 조립(미리보기 탭/⌫ 로 한 글자 빼기).
 * 다 채우면 미리보기가 한 번 밝아지고 그대로 둔다.
 */
export function VerbTransform({ answerState, onAnswer, question }: QuestionProps) {
  const { speak } = useLessonSpeech();
  const locked = answerState !== "idle";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const bank = useMemo(() => shuffle(question.options ?? []).map((char, index) => ({ char, id: `s-${index}` })), [question.id]);
  const [placedIds, setPlacedIds] = useState<string[]>([]);
  const built = placedIds.map((id) => bank.find((item) => item.id === id)?.char ?? "").join("");
  const complete = built.length >= (question.answer?.length ?? 1);

  const pop = () => {
    if (locked || placedIds.length === 0) return;
    haptic();
    setPlacedIds((current) => current.slice(0, -1));
  };

  return (
    <div className={q.q}>
      <h1 className={styles.title}>To&apos;g&apos;ri shaklga o&apos;zgartiring</h1>

      <div className={styles.morph}>
        <button className={styles.base} onClick={() => speak(question.baseWord ?? "")} type="button">
          <b data-no-translate>{question.baseWord}</b>
          <MobileIcon name="volume-medium" size={16} />
        </button>
        <span className={styles.arrow}>
          <MobileIcon name="arrow-forward" size={22} />
        </span>
        <span className={styles.target} data-no-translate>
          {question.targetForm}
        </span>
      </div>

      <div className={`${styles.preview} ${complete ? styles.previewDone : ""}`}>
        {built ? (
          <button className={styles.previewText} data-no-translate onClick={pop} type="button">
            {built}
          </button>
        ) : (
          <span className={styles.placeholder}>{"＿".repeat(question.answer?.length ?? 3)}</span>
        )}
        {placedIds.length > 0 ? (
          <button aria-label="O'chirish" className={styles.backspace} onClick={pop} type="button">
            <MobileIcon name="backspace-outline" size={22} />
          </button>
        ) : null}
      </div>

      <div className={styles.bank}>
        {bank.map((syllable) => {
          const used = placedIds.includes(syllable.id);
          return (
            <button
              className={`${styles.syl} ${used ? styles.sylUsed : ""}`}
              data-no-translate
              disabled={locked || used}
              key={syllable.id}
              onClick={() => {
                if (locked || used) return;
                haptic();
                setPlacedIds((current) => [...current, syllable.id]);
              }}
              type="button"
            >
              {syllable.char}
            </button>
          );
        })}
      </div>

      <CheckButton disabled={!built || locked} onClick={() => built && !locked && onAnswer(built)} />
    </div>
  );
}
