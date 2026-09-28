"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { speechLanguageOf } from "../../../../shared/browser/use-korean-speech";
import { useContentLanguage } from "../../../../shared/i18n/language-context";
import { MobileIcon } from "../../../../shared/ui/mobile-icon";
import { CheckButton } from "../lesson-chrome";
import { LessonCharacter } from "../lesson-character";
import { answersOf, blankCount, BlankSentence, fillTemplate, isComplete, parseBlanks, templateOf, toAnswerPayload } from "./blank-sentence";
import { AUTO_SPEECH_DELAY_MS, useLessonSpeech, type QuestionProps } from "./shared";
import q from "./questions.module.css";
import styles from "./typed-questions.module.css";

/** 말풍선 지문이 한국어인지 학습자 언어인지 — 글자를 보고 가른다 */
const HANGUL = /[ㄱ-ㆎ가-힣]/;

function useBlankValues(question: QuestionProps["question"]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tokens = useMemo(() => parseBlanks(templateOf(question)), [question.sentenceTemplate, question.sentencePrefix, question.sentenceSuffix]);
  const total = blankCount(tokens);
  const [values, setValues] = useState<(string | null)[]>(() => Array(total).fill(""));
  useEffect(() => setValues(Array(total).fill("")), [question.id, total]);
  const setValue = (index: number, text: string) =>
    setValues((current) => {
      const next = [...current];
      next[index] = text;
      return next;
    });
  return { setValue, tokens, values };
}

/** 캐릭터 옆 말풍선의 스피커 두 칸(보통 | 거북이) — ListenType·ListenFill */
function AudioBubble({ minHeight, text }: { minHeight: number; text: string }) {
  const { speak, speaking } = useLessonSpeech();
  return (
    <div className={styles.bubble} style={{ minHeight }}>
      <span className={styles.tailBorder} />
      <span className={styles.tailInner} />
      <button aria-label="Tinglash" className={`${styles.audioHalf} ${speaking ? styles.audioOn : ""}`} onClick={() => speak(text)} type="button">
        <MobileIcon name="volume-high" size={28} />
      </button>
      <span className={styles.audioDivider} />
      <button aria-label="Sekin tinglash" className={styles.audioHalf} onClick={() => speak(text, { slow: true })} type="button">
        <MobileIcon family="material-community" name="turtle" size={26} />
      </button>
    </div>
  );
}

/**
 * 뜻 보고 한국어 쓰기 (type_answer) — 모바일 questions/TypeAnswer.
 * 말풍선엔 npcText(한국어 지문) 또는 answerTranslation(학습자 언어 뜻). 둘 다 없으면 말풍선을 안 그린다 —
 * 정답을 띄우느니 빈칸이 낫다. 빈칸은 여러 개 가능, 하나뿐이면 줄 전체 입력칸.
 */
export function TypeAnswer({ answerState, isChecking, onAnswer, question }: QuestionProps) {
  const contentLanguage = useContentLanguage();
  const { speak, speaking } = useLessonSpeech();
  const { setValue, tokens, values } = useBlankValues(question);
  const inputRefs = useRef<Record<number, HTMLInputElement | HTMLTextAreaElement | null>>({});
  const locked = answerState !== "idle" || isChecking;
  const promptText = question.npcText || question.answerTranslation || "";
  const promptLanguage = HANGUL.test(promptText) ? "ko-KR" : speechLanguageOf(contentLanguage);
  const complete = isComplete(tokens, values);
  const check = () => {
    if (!complete || locked) return;
    onAnswer(toAnswerPayload(question, tokens, values));
  };

  return (
    <div className={q.q}>
      <h1 className={styles.title} style={{ marginBottom: 24 }}>
        {promptText && !question.npcText ? "Bu ma‘noni koreyscha yozing" : question.question || "Bu ma‘noni koreyscha yozing"}
      </h1>

      <div className={styles.npcRow} style={{ marginBottom: 32 }}>
        <LessonCharacter height={150} seed={question.id} state={answerState} />
        {promptText ? (
          <div className={`${styles.bubble} ${styles.textBubble}`}>
            <span className={styles.tailBorder} />
            <span className={styles.tailInner} />
            <button
              aria-label="Tinglash"
              className={`${styles.promptSpeaker} ${speaking ? styles.promptSpeakerOn : ""}`}
              onClick={() => speak(promptText, { language: promptLanguage })}
              type="button"
            >
              <MobileIcon name="volume-medium" size={24} />
            </button>
            <div className={styles.bubbleTextWrap}>
              <p className={styles.bubbleText} data-no-translate>
                {promptText}
              </p>
              <span className={styles.dashed} />
            </div>
          </div>
        ) : null}
      </div>

      <BlankSentence answerState={answerState} autoFocusFirst fontSize={22} inputRefs={inputRefs} mode="input" onChange={setValue} onSubmit={check} tokens={tokens} values={values} />

      <CheckButton disabled={!complete || locked} loading={isChecking} onClick={check} />
    </div>
  );
}

/** 듣고 받아쓰기 (listen_type) — 모바일 questions/ListenType */
export function ListenType({ answerState, isChecking, onAnswer, question }: QuestionProps) {
  const { speakAuto } = useLessonSpeech();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const locked = answerState !== "idle" || isChecking;
  const audioText = question.answer;

  useEffect(() => {
    if (!audioText) return;
    const timer = window.setTimeout(() => speakAuto(audioText), AUTO_SPEECH_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [audioText, speakAuto]);

  const check = () => {
    if (!input.trim() || locked) return;
    onAnswer(input.trim());
  };

  return (
    <div className={q.q}>
      <h1 className={styles.title} style={{ fontSize: 24 }}>
        {question.question || "Eshitganingizni yozing"}
      </h1>
      <div className={styles.npcRow} style={{ marginBottom: 28 }}>
        <LessonCharacter height={170} seed={question.id} state={answerState} />
        <AudioBubble minHeight={90} text={audioText} />
      </div>
      <div className={styles.inputCard} onClick={() => inputRef.current?.focus()} role="presentation" style={{ padding: "20px 18px" }}>
        <textarea
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          className={styles.input}
          disabled={locked}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Eshitilgan so'zlarni kiriting"
          ref={inputRef}
          spellCheck={false}
          value={input}
        />
      </div>
      <CheckButton disabled={!input.trim() || locked} loading={isChecking} onClick={check} />
    </div>
  );
}

/** 듣고 빈칸 채우기 (listen_fill) — 모바일 questions/ListenFill */
export function ListenFill({ answerState, isChecking, onAnswer, onSkip, question }: QuestionProps) {
  const { speakAuto } = useLessonSpeech();
  const { setValue, tokens, values } = useBlankValues(question);
  const inputRefs = useRef<Record<number, HTMLInputElement | HTMLTextAreaElement | null>>({});
  const locked = answerState !== "idle" || isChecking;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const audioText = useMemo(() => fillTemplate(tokens, answersOf(question)), [tokens, question.blankAnswers, question.answer]);

  useEffect(() => {
    if (!audioText) return;
    const timer = window.setTimeout(() => speakAuto(audioText), AUTO_SPEECH_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [audioText, speakAuto]);

  const complete = isComplete(tokens, values);
  const check = () => {
    if (!complete || locked) return;
    onAnswer(toAnswerPayload(question, tokens, values));
  };

  return (
    <div className={q.q}>
      <h1 className={styles.title}>{question.question || "Tushib qolgan so'zni kiriting"}</h1>
      <div className={styles.npcRow} style={{ marginBottom: 24 }}>
        <LessonCharacter height={160} seed={question.id} state={answerState} />
        <AudioBubble minHeight={76} text={audioText} />
      </div>
      <div className={styles.inputCard} onClick={() => inputRefs.current[0]?.focus()} role="presentation" style={{ padding: "24px 18px" }}>
        <BlankSentence answerState={answerState} autoFocusFirst fontSize={21} inputRefs={inputRefs} mode="input" onChange={setValue} onSubmit={check} tokens={tokens} values={values} />
      </div>
      <CheckButton
        disabled={!complete || locked}
        loading={isChecking}
        onClick={check}
        onSkip={onSkip}
        skipLabel={!locked ? "Tinglash mashqini o'tkazib yuborish" : undefined}
      />
    </div>
  );
}
