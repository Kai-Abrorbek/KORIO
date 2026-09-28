"use client";

import { useEffect, useMemo, useState } from "react";

import { MobileIcon } from "../../../../shared/ui/mobile-icon";
import { CheckButton } from "../lesson-chrome";
import { answersOf, blankCount, BlankSentence, fillTemplate, isComplete, parseBlanks, templateOf, toAnswerPayload } from "./blank-sentence";
import { useCompact } from "./builder-kit";
import { shuffle, useLessonSpeech, type QuestionProps } from "./shared";
import q from "./questions.module.css";
import styles from "./fill-in-blank.module.css";

const CORRECT = "#1cb454";
const WRONG = "#ff4b4b";

/**
 * 빈칸 채우기 (fill_in_blank) — 모바일 questions/FillInBlank.
 * 문장 카드(진행 알약 n/total + 빈칸 문장 + 완성 문장 듣기) 아래에 선택지 묶음.
 * 선택지를 누르면 활성 빈칸에 들어가고, 이미 쓰인 걸 다시 누르면 빠진다.
 */
export function FillInBlank({ answerState, onAnswer, question }: QuestionProps) {
  const { speak, speaking, stop } = useLessonSpeech();
  const compact = useCompact();
  const locked = answerState !== "idle";
  const instruction = question.question?.trim() || "Bo'sh joyga mos so'zni tanlang";

  // 시드는 정답을 첫 칸에 적어 둔다 — 그대로 내보내면 자리로 답을 외운다
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo(() => shuffle(question.options ?? []), [question.id]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tokens = useMemo(() => parseBlanks(templateOf(question)), [question.sentenceTemplate, question.sentencePrefix, question.sentenceSuffix]);
  const total = blankCount(tokens);
  const speechText = useMemo(() => {
    const full = fillTemplate(tokens, answersOf(question)) || question.audioText?.trim() || "";
    // 문장 끝 괄호(기본형 힌트)는 화면엔 두고 읽지는 않는다
    return full.replace(/\s*\([^()]*\)\s*$/u, "").trim();
  }, [question, tokens]);

  const [values, setValues] = useState<(string | null)[]>(() => Array(total).fill(null));
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    stop();
    setValues(Array(total).fill(null));
    setActiveIndex(0);
  }, [question.id, stop, total]);

  const pickOption = (option: string) => {
    if (locked) return;
    const used = values.indexOf(option);
    if (used !== -1) {
      const next = [...values];
      next[used] = null;
      setValues(next);
      setActiveIndex(used);
      return;
    }
    const target = values[activeIndex] === null ? activeIndex : values.indexOf(null);
    if (target === -1) return;
    const next = [...values];
    next[target] = option;
    const following = next.findIndex((value) => value === null);
    setValues(next);
    setActiveIndex(following === -1 ? target : following);
  };

  const clearBlank = (index: number) => {
    if (locked) return;
    setActiveIndex(index);
    setValues((current) => {
      if (current[index] === null) return current;
      const next = [...current];
      next[index] = null;
      return next;
    });
  };

  const complete = isComplete(tokens, values);
  const filled = values.filter((value) => value?.trim()).length;
  const accent = answerState === "correct" ? CORRECT : answerState === "wrong" ? WRONG : "#776ee2";

  const playSentence = () => {
    if (!speechText) return;
    if (speaking) stop();
    else speak(speechText);
  };

  return (
    <div className={`${q.q} ${styles.container}`} style={{ ["--fb-accent" as string]: accent }}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>
          <MobileIcon name="create-outline" size={22} />
        </span>
        <h1 className={styles.title}>{instruction}</h1>
      </div>

      <section className={`${styles.card} ${compact ? styles.cardCompact : ""}`}>
        <div className={styles.cardTop}>
          <span className={styles.pill}>
            <MobileIcon name={complete ? "checkmark-circle" : "ellipsis-horizontal"} size={16} />
            <b>
              {filled}/{total}
            </b>
          </span>
        </div>
        <div className={styles.sentenceRow}>
          <BlankSentence activeIndex={activeIndex} answerState={answerState} fontSize={18} mode="select" onBlankPress={clearBlank} tokens={tokens} values={values} />
        </div>
        <span className={styles.divider} />
        <button
          aria-label={speaking ? "Ovozni to'xtatish" : "To'liq gapni tinglash"}
          className={`${styles.listen} ${speaking ? styles.listenOn : ""}`}
          disabled={!speechText}
          onClick={playSentence}
          type="button"
        >
          <span className={styles.listenIcon}>
            <MobileIcon name={speaking ? "stop" : "volume-high"} size={20} />
          </span>
          <b>{speaking ? "Ovozni to'xtatish" : "To'liq gapni tinglash"}</b>
          <MobileIcon name={speaking ? "pulse" : "chevron-forward"} size={18} />
        </button>
      </section>

      <section className={styles.options}>
        <div className={styles.optionsHeader}>
          <b>Variantlar</b>
          {complete ? <MobileIcon name="checkmark-circle" size={20} /> : null}
        </div>
        <div className={styles.optionsRow}>
          {options.map((option, index) => {
            const selected = values.includes(option);
            return (
              <button
                aria-pressed={selected}
                className={`${styles.option} ${selected ? styles.optionOn : ""} ${locked && !selected ? styles.optionLocked : ""}`}
                data-no-translate
                disabled={locked}
                key={`${option}-${index}`}
                onClick={() => pickOption(option)}
                style={{ animationDelay: `${index * 45}ms` }}
                type="button"
              >
                <span>{option}</span>
                {selected ? <MobileIcon name="checkmark-circle" size={18} /> : null}
              </button>
            );
          })}
        </div>
      </section>

      <CheckButton disabled={!complete || locked} onClick={() => complete && !locked && onAnswer(toAnswerPayload(question, tokens, values))} />
    </div>
  );
}
