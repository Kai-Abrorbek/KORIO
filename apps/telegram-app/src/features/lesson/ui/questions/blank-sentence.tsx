"use client";

import { useLayoutEffect, useRef, type MutableRefObject } from "react";

import type { AnswerState, LessonQuestion } from "../../model/lesson";
import styles from "./blank-sentence.module.css";

/* ───────── 모바일 utils/blank-sentence ───────── */

const BLANK_RE = /_{3,}/g;

export type BlankToken = { type: "text"; value: string } | { type: "blank"; index: number };

/** `Oh, ___ a ___ .` → [text, blank(0), text, blank(1), text]. 빈칸이 없으면 끝에 하나 붙인다 */
export function parseBlanks(template: string): BlankToken[] {
  const tokens: BlankToken[] = [];
  let last = 0;
  let index = 0;
  BLANK_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = BLANK_RE.exec(template)) !== null) {
    if (match.index > last) tokens.push({ type: "text", value: template.slice(last, match.index) });
    tokens.push({ index: index++, type: "blank" });
    last = match.index + match[0].length;
  }
  if (last < template.length) tokens.push({ type: "text", value: template.slice(last) });
  if (index === 0) tokens.push({ index: 0, type: "blank" });
  return tokens;
}

export function templateOf(question: LessonQuestion) {
  if (question.sentenceTemplate?.trim()) return question.sentenceTemplate;
  const prefix = question.sentencePrefix ?? "";
  const suffix = question.sentenceSuffix ?? "";
  if (!prefix && !suffix) return "___";
  return `${prefix}___${suffix}`;
}

export function blankCount(tokens: BlankToken[]) {
  return tokens.reduce((count, token) => (token.type === "blank" ? count + 1 : count), 0);
}

export function fillTemplate(tokens: BlankToken[], values: (string | null)[]) {
  return tokens
    .map((token) => (token.type === "text" ? token.value : (values[token.index] ?? "")))
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

export function answersOf(question: LessonQuestion) {
  if (question.blankAnswers?.length) return question.blankAnswers;
  return [question.answer ?? ""];
}

/** 채점용 문자열 — blankAnswers 문항이나 빈칸 여러 개면 완성 문장, 아니면 값 하나 */
export function toAnswerPayload(question: LessonQuestion, tokens: BlankToken[], values: (string | null)[]) {
  if (question.blankAnswers?.length) return fillTemplate(tokens, values);
  if (blankCount(tokens) <= 1) return (values[0] ?? "").trim();
  return fillTemplate(tokens, values);
}

export function isComplete(tokens: BlankToken[], values: (string | null)[]) {
  const total = blankCount(tokens);
  for (let index = 0; index < total; index += 1) if (!values[index]?.trim()) return false;
  return true;
}

/* ───────── 모바일 components/lesson/BlankSentence ───────── */

const CORRECT = "#1cb454";
const WRONG = "#ff4b4b";

/**
 * 빈칸 문장. select — 빈칸을 탭해 활성화하고 선택지에서 골라 넣는다 / input — 빈칸마다 직접 타이핑.
 * 빈칸 하나뿐이고 앞뒤 문장이 없으면(= 문장 전체를 쓰는 문제) 줄 전체 폭 여러 줄 입력칸이 된다.
 */
export function BlankSentence({
  activeIndex = 0,
  answerState,
  autoFocusFirst = false,
  fontSize = 17,
  inputRefs,
  mode,
  onBlankPress,
  onChange,
  onSubmit,
  tokens,
  values,
}: {
  tokens: BlankToken[];
  values: (string | null)[];
  answerState: AnswerState;
  mode: "select" | "input";
  activeIndex?: number;
  onBlankPress?: (index: number) => void;
  onChange?: (index: number, text: string) => void;
  inputRefs?: MutableRefObject<Record<number, HTMLInputElement | HTMLTextAreaElement | null>>;
  onSubmit?: () => void;
  autoFocusFirst?: boolean;
  fontSize?: number;
}) {
  const locked = answerState !== "idle";
  const accent = answerState === "correct" ? CORRECT : answerState === "wrong" ? WRONG : "var(--q-primary,#776ee2)";
  const soleBlank = mode === "input" && tokens.length === 1 && tokens[0]?.type === "blank";

  return (
    <div
      className={`${styles.row} ${soleBlank ? styles.rowFull : ""}`}
      data-no-translate
      style={{ ["--bs-size" as string]: `${fontSize}px`, ["--bs-accent" as string]: accent }}
    >
      {tokens.map((token, position) => {
        if (token.type === "text") {
          return (
            <span className={styles.text} key={`t-${position}`}>
              {token.value}
            </span>
          );
        }
        const value = values[token.index] ?? "";
        const minWidth = Math.max(72, value.length * fontSize * 0.62 + 24);

        if (mode === "input") {
          if (soleBlank) {
            return (
              <label className={`${styles.blank} ${styles.blankFull}`} key={`b-${token.index}`}>
                <AutoTextarea
                  autoFocus={autoFocusFirst}
                  disabled={locked}
                  onChange={(text) => onChange?.(token.index, text)}
                  refCallback={(element) => {
                    if (inputRefs) inputRefs.current[token.index] = element;
                  }}
                  value={value}
                />
                {!value ? <span className={`${styles.hint} ${styles.hintFull}`}>·····</span> : null}
              </label>
            );
          }
          return (
            <label className={styles.blank} key={`b-${token.index}`} style={{ minWidth }}>
              <input
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                autoFocus={autoFocusFirst && token.index === 0}
                className={styles.input}
                disabled={locked}
                enterKeyHint="done"
                onChange={(event) => onChange?.(token.index, event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    onSubmit?.();
                  }
                }}
                ref={(element) => {
                  if (inputRefs) inputRefs.current[token.index] = element;
                }}
                spellCheck={false}
                style={{ width: minWidth - 8 }}
                value={value}
              />
              {!value ? <span className={styles.hint}>·····</span> : null}
            </label>
          );
        }

        const active = mode === "select" && !locked && activeIndex === token.index;
        return (
          <button
            className={`${styles.blank} ${styles.slot} ${value || active ? styles.slotOn : ""} ${active ? styles.slotActive : ""}`}
            disabled={locked}
            key={`b-${token.index}`}
            onClick={() => onBlankPress?.(token.index)}
            style={{ minWidth }}
            type="button"
          >
            <span className={`${styles.text} ${value ? "" : styles.slotEmpty}`}>{value || "___"}</span>
          </button>
        );
      })}
    </div>
  );
}

function AutoTextarea({
  autoFocus,
  disabled,
  onChange,
  refCallback,
  value,
}: {
  autoFocus: boolean;
  disabled: boolean;
  onChange: (text: string) => void;
  refCallback: (element: HTMLTextAreaElement | null) => void;
  value: string;
}) {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }, [value]);
  return (
    <textarea
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect="off"
      autoFocus={autoFocus}
      className={`${styles.input} ${styles.inputFull}`}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      ref={(element) => {
        ref.current = element;
        refCallback(element);
      }}
      rows={1}
      spellCheck={false}
      value={value}
    />
  );
}
