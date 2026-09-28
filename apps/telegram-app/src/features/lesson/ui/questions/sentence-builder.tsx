"use client";

import { useEffect, useRef } from "react";

import { CheckButton } from "../lesson-chrome";
import { useChipWords } from "./answer-chip";
import { AnswerArea, NpcSpeakers, WordBank, isLongBank, useCompact } from "./builder-kit";
import { AUTO_SPEECH_DELAY_MS, useLessonSpeech, type QuestionProps } from "./shared";
import styles from "./builder.module.css";
import q from "./questions.module.css";

/**
 * 듣고 문장 만들기 (sentence_builder) — 모바일 questions/SentenceBuilder.
 * 뜨자마자 한 번 읽고(audioText || answer), 캐릭터 옆 말풍선에 스피커·거북이,
 * 룰드 라인 답 영역에 칩을 올린다. 칩이 많으면 뱅크를 바텀시트로 내린다.
 */
export function SentenceBuilder({ answerState, combo, instanceKey, onAnswer, question }: QuestionProps) {
  const { speakAuto } = useLessonSpeech();
  const compact = useCompact();
  const speechText = question.audioText || question.answer;
  const { moveToZone, placed, swap, tap, words } = useChipWords(question.options, instanceKey, true);
  const auto = useRef(false);

  useEffect(() => {
    if (auto.current) return;
    auto.current = true;
    const timer = window.setTimeout(() => speakAuto(speechText), AUTO_SPEECH_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [speakAuto, speechText]);

  const locked = answerState !== "idle";
  return (
    <div className={q.q}>
      <h1 className={styles.sbTitle}>{question.question}</h1>
      <NpcSpeakers answerState={answerState} combo={combo} compact={compact} question={question} text={speechText} />
      <AnswerArea answerState={answerState} compact={compact} onDragToZone={moveToZone} onSwap={swap} onTap={tap} placed={placed} words={question.options ?? []} />
      <WordBank answerState={answerState} long={isLongBank(question, compact)} onDragToZone={moveToZone} onTap={tap} words={words} />
      <CheckButton disabled={placed.length === 0 || locked} onClick={() => !locked && placed.length && onAnswer(placed.map((word) => word.word).join(" "))} />
    </div>
  );
}

/**
 * 단어 배열 (word_arrange) — 모바일 questions/WordArrange. SentenceBuilder 와 같은 화면인데
 * 섞지 않고(서버 순서), 읽는 건 언제나 정답 문장이다.
 */
export function WordArrange({ answerState, combo, instanceKey, onAnswer, question }: QuestionProps) {
  const { speakAuto } = useLessonSpeech();
  const compact = useCompact();
  const { moveToZone, placed, swap, tap, words } = useChipWords(question.options, instanceKey);
  const auto = useRef(false);

  useEffect(() => {
    if (auto.current) return;
    auto.current = true;
    const timer = window.setTimeout(() => speakAuto(question.answer), AUTO_SPEECH_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [question.answer, speakAuto]);

  const locked = answerState !== "idle";
  return (
    <div className={q.q}>
      <h1 className={styles.waTitle}>{question.question}</h1>
      <NpcSpeakers answerState={answerState} combo={combo} compact={compact} question={question} tailTop="15%" text={question.answer} />
      <AnswerArea answerState={answerState} compact={compact} onDragToZone={moveToZone} onSwap={swap} onTap={tap} placed={placed} words={question.options ?? []} />
      <WordBank answerState={answerState} long={isLongBank(question, compact)} onDragToZone={moveToZone} onTap={tap} words={words} />
      <CheckButton disabled={placed.length === 0 || locked} onClick={() => !locked && placed.length && onAnswer(placed.map((word) => word.word).join(" "))} />
    </div>
  );
}
