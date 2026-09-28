"use client";

import { useCallback, useEffect, useMemo } from "react";

import { speechLanguageOf } from "../../../../shared/browser/use-korean-speech";
import { useContentLanguage } from "../../../../shared/i18n/language-context";
import { MobileIcon } from "../../../../shared/ui/mobile-icon";
import { CheckButton } from "../lesson-chrome";
import { LessonCharacter } from "../lesson-character";
import { useChipWords } from "./answer-chip";
import { AnswerArea, WordBank, isLongBank, useCompact } from "./builder-kit";
import { AUTO_SPEECH_DELAY_MS, useLessonSpeech, useSpeechProgress, type QuestionProps } from "./shared";
import styles from "./translate-builder.module.css";
import q from "./questions.module.css";

/**
 * 번역 조립 (translate_builder) / 대답 조립 (reply_builder) — 모바일 questions/TranslateBuilder.
 *
 * translate — 학습자 언어로 된 뜻을 듣고 보면서 한국어로 옮긴다. 뜻 문장은 그 언어 음성으로 읽는다.
 * reply     — 상대가 한국어로 한 말을 듣고 거기에 맞는 대답을 만든다.
 *
 * 말풍선 문장은 읽는 진행에 맞춰 지금 읽는 단어가 진하게 된다.
 */
export function TranslateBuilder({ answerState, instanceKey, mode = "translate", onAnswer, question }: QuestionProps & { mode?: "translate" | "reply" }) {
  const contentLanguage = useContentLanguage();
  const { speak, speaking, stop } = useLessonSpeech();
  const progress = useSpeechProgress();
  const compact = useCompact();
  const isReply = mode === "reply";
  const sourceText = ((isReply ? question.npcText : question.sourceText || question.question) ?? "").trim();
  const language = isReply ? "ko-KR" : speechLanguageOf(contentLanguage);
  const spokenWords = useMemo(() => sourceText.split(/\s+/u).filter(Boolean), [sourceText]);
  const activeWord = speaking && spokenWords.length > 0 && progress > 0 ? Math.min(spokenWords.length - 1, Math.floor(progress * spokenWords.length)) : -1;
  const { moveToZone, placed, swap, tap, words } = useChipWords(question.options, instanceKey);

  const play = useCallback(() => {
    if (!sourceText) return;
    speak(sourceText, { language });
  }, [language, sourceText, speak]);

  // 앱과 같이 자동 읽기 설정과 상관없이 한 번 읽는다 (무엇을 옮길지가 이 소리다)
  useEffect(() => {
    const timer = window.setTimeout(play, AUTO_SPEECH_DELAY_MS);
    return () => {
      window.clearTimeout(timer);
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  const locked = answerState !== "idle";
  return (
    <div className={`${q.q} ${styles.container}`}>
      <h1 className={styles.title}>{isReply ? "Eshitganingizga koreyschada javob bering" : "Quyidagi gapni tarjima qiling"}</h1>

      <div className={styles.npcRow} style={{ height: compact ? 148 : 184 }}>
        <LessonCharacter height={compact ? 122 : 160} seed={question.id} state={answerState} />
        <div className={styles.bubble}>
          <span className={styles.tailBorder} />
          <span className={styles.tailInner} />
          <button
            aria-label={sourceText}
            className={`${styles.audioBtn} ${speaking ? styles.audioBtnActive : ""}`}
            disabled={!sourceText}
            onClick={play}
            type="button"
          >
            <MobileIcon name={speaking ? "volume-high" : "volume-medium"} size={20} />
          </button>
          <div className={styles.bubbleTextWrap}>
            <p className={styles.bubbleText} data-no-translate>
              {spokenWords.map((word, index) => (
                <span className={index === activeWord ? styles.spokenActive : undefined} key={`${word}-${index}`}>
                  {word.toLocaleLowerCase()}
                  {index < spokenWords.length - 1 ? " " : ""}
                </span>
              ))}
            </p>
            <span className={styles.dashed} />
          </div>
        </div>
      </div>

      <AnswerArea
        answerState={answerState}
        className={compact ? styles.answerCompact : styles.answer}
        compact={compact}
        large
        onDragToZone={moveToZone}
        onSwap={swap}
        onTap={tap}
        placed={placed}
        words={question.options ?? []}
      />
      <WordBank answerState={answerState} centered large long={isLongBank(question, compact)} onDragToZone={moveToZone} onTap={tap} words={words} />

      <CheckButton disabled={placed.length === 0 || locked} onClick={() => !locked && placed.length && onAnswer(placed.map((word) => word.word).join(" "))} />
    </div>
  );
}
