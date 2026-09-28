"use client";

import { useMemo, useState } from "react";

import { MobileIcon } from "../../../../shared/ui/mobile-icon";
import { CheckButton } from "../lesson-chrome";
import { haptic, shuffle, useLessonSpeech, type QuestionProps } from "./shared";
import q from "./questions.module.css";
import styles from "./dialog.module.css";

const SPEAKER = {
  npc: { avatar: "👨‍🏫", label: "A" },
  user: { avatar: "👩‍🎓", label: "B" },
} as const;

/**
 * 대화 완성 (dialog_complete) — 모바일 questions/DialogComplete.
 * A·B 장면 카드(줄마다 읽기 버튼, 차례로 떠오름) + 점선 답 말풍선 + 번호 선택지(채점 후 정답 초록/오답 빨강).
 */
export function DialogComplete({ answerState, onAnswer, question }: QuestionProps) {
  const { speak, speaking } = useLessonSpeech();
  const [selected, setSelected] = useState<string | null>(null);
  const [speakingLine, setSpeakingLine] = useState<number | null>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo(() => shuffle(question.options ?? []), [question.id]);
  const locked = answerState !== "idle";

  return (
    <div className={`${q.q} ${styles.dcContainer}`}>
      <div className={styles.dcHeader}>
        <span className={styles.dcHeaderIcon}>
          <MobileIcon name="chatbubbles" size={22} />
        </span>
        <div className={styles.dcHeaderCopy}>
          <small>DIALOGUE</small>
          <h1>{question.question}</h1>
        </div>
      </div>

      <section className={styles.scene}>
        <div className={styles.sceneHeader}>
          <i />
          <b>A · B</b>
          <span>🔊</span>
        </div>
        <span className={styles.timeline} />
        {(question.dialogLines ?? []).map((line, index) => {
          const meta = SPEAKER[line.speaker];
          const user = line.speaker === "user";
          const lineSpeaking = speaking && speakingLine === index;
          const avatar = (
            <span className={styles.avatar}>
              {meta.avatar}
              <i className={user ? styles.badgeUser : undefined}>{meta.label}</i>
            </span>
          );
          return (
            <div className={`${styles.message} ${user ? styles.messageUser : ""}`} key={`${line.speaker}-${index}-${line.text}`} style={{ animationDelay: `${index * 90}ms` }}>
              {!user ? avatar : null}
              <div className={`${styles.bubble} ${user ? styles.bubbleUser : ""}`}>
                <div className={styles.bubbleTop}>
                  <b>{meta.label}</b>
                  <button
                    aria-label="Tinglash"
                    className={lineSpeaking ? styles.audioOn : undefined}
                    onClick={() => {
                      setSpeakingLine(index);
                      speak(line.text);
                    }}
                    type="button"
                  >
                    <MobileIcon name={lineSpeaking ? "volume-high" : "volume-medium"} size={17} />
                  </button>
                </div>
                <p data-no-translate>{line.text}</p>
              </div>
              {user ? avatar : null}
            </div>
          );
        })}

        <div className={styles.answerRow}>
          <div className={`${styles.answerBubble} ${selected ? styles.answerFilled : ""}`}>
            <div className={styles.answerTop}>
              <b>B</b>
              <MobileIcon name={selected ? "checkmark-circle" : "ellipsis-horizontal"} size={18} />
            </div>
            <p className={selected ? styles.answerText : styles.answerPlaceholder} data-no-translate>
              {selected ?? "— — —"}
            </p>
          </div>
          <span className={styles.avatar}>
            👩‍🎓<i className={styles.badgeUser}>B</i>
          </span>
        </div>
      </section>

      <div className={styles.optionsHeader} data-no-translate>
        <b>CHOICES</b>
        <small>{options.length} choices</small>
      </div>
      <div className={styles.options}>
        {options.map((option, index) => {
          const isSelected = selected === option;
          const correct = locked && option === question.answer;
          const wrong = locked && isSelected && option !== question.answer;
          return (
            <button
              className={`${styles.option} ${isSelected ? styles.optionSelected : ""} ${correct ? styles.optionCorrect : ""} ${wrong ? styles.optionWrong : ""}`}
              key={`${option}-${index}`}
              onClick={() => !locked && setSelected(option)}
              type="button"
            >
              <span className={styles.optionIndex}>{index + 1}</span>
              <span className={styles.optionText} data-no-translate>
                {option}
              </span>
              {isSelected && !locked ? <MobileIcon className={styles.markPrimary} name="checkmark-circle" size={23} /> : null}
              {correct ? <MobileIcon className={styles.markCorrect} name="checkmark-circle" size={23} /> : null}
              {wrong ? <MobileIcon className={styles.markWrong} name="close-circle" size={23} /> : null}
            </button>
          );
        })}
      </div>

      <CheckButton disabled={!selected || locked} onClick={() => selected && !locked && onAnswer(selected)} />
    </div>
  );
}

interface OrderLine {
  speaker: "npc" | "user";
  text: string;
  origIdx: number;
}

/**
 * 대화 순서 맞추기 (dialog_order) — 모바일 questions/DialogOrder.
 * KORIO Chat 창에 누른 순서대로 말풍선이 쌓이고(누르면 읽음), 쌓인 걸 누르면 빠진다.
 */
export function DialogOrder({ answerState, onAnswer, question }: QuestionProps) {
  const { speak } = useLessonSpeech();
  const locked = answerState !== "idle";
  // dialogLines 는 정답 순서로 시드됨 → 화면에선 섞는다
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const shuffled = useMemo<OrderLine[]>(() => shuffle((question.dialogLines ?? []).map((line, index) => ({ ...line, origIdx: index }))), [question.id]);
  const [placed, setPlaced] = useState<OrderLine[]>([]);
  const bank = shuffled.filter((line) => !placed.some((item) => item.origIdx === line.origIdx));
  const done = shuffled.length > 0 && bank.length === 0;

  return (
    <div className={q.q}>
      <h1 className={styles.doTitle}>Suhbatni tartib bilan joylashtiring</h1>

      <section className={styles.chat}>
        <div className={styles.chatHeader}>
          <span className={styles.chatAvatar}>🦉</span>
          <b>KORIO Chat</b>
          <i />
        </div>
        <div className={styles.chatContent}>
          {placed.length === 0 ? <p className={styles.emptyHint}>Suhbatni tugatish uchun quyidagi xabarlarni bosing</p> : null}
          {placed.map((line, index) => {
            const user = line.speaker === "user";
            return (
              <div className={`${styles.chatRow} ${user ? styles.chatRowUser : ""}`} key={line.origIdx}>
                <button
                  className={`${styles.chatBubble} ${user ? styles.chatBubbleUser : styles.chatBubbleNpc}`}
                  disabled={locked}
                  onClick={() => {
                    if (locked) return;
                    haptic();
                    setPlaced((current) => current.filter((item) => item.origIdx !== line.origIdx));
                  }}
                  type="button"
                >
                  <span data-no-translate>{line.text}</span>
                  <small>{index + 1}</small>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <div className={styles.doBank}>
        {bank.map((line) => (
          <button
            className={styles.doBankBubble}
            disabled={locked}
            key={line.origIdx}
            onClick={() => {
              if (locked) return;
              haptic();
              speak(line.text);
              setPlaced((current) => [...current, line]);
            }}
            type="button"
          >
            <MobileIcon name={line.speaker === "user" ? "person" : "chatbubble-ellipses"} size={14} />
            <span data-no-translate>{line.text}</span>
          </button>
        ))}
      </div>

      <CheckButton
        disabled={!done || locked}
        onClick={() => done && !locked && onAnswer(placed.every((line, index) => line.origIdx === index) ? "all_correct" : "__wrong_order__")}
      />
    </div>
  );
}
