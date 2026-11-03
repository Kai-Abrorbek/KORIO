"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useTelegramAuth } from "../../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../../shared/ui/mobile-icon";
import { transcribeSpeech } from "../../api/lesson";
import { isAnswerCorrect } from "../../model/lesson";
import { useWebSpeechRecorder } from "../../model/use-web-speech-recorder";
import {
  answersOf,
  blankCount,
  BlankSentence,
  fillTemplate,
  isComplete,
  parseBlanks,
  templateOf,
  toAnswerPayload,
} from "./blank-sentence";
import { useLessonSpeech, type QuestionProps } from "./shared";
import styles from "./grammar.module.css";

/** 한글은 글자폭 ≈ 글자크기, 로마자·숫자·공백은 그 절반쯤 */
function textWidth(text: string, size: number) {
  let width = 0;
  for (const char of text)
    width += /[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(char) ? size : size * 0.55;
  return width;
}

/**
 * 문법 빈칸 (grammar_blank) — 모바일 questions/GrammarBlank.
 *
 * 엔진(레슨 화면)에는 **첫 시도만** 넘긴다. 틀리면 정답을 보여 주지 않고 카드가 흔들리며
 * 힌트를 한 단계씩 열어 준다(첫 글자 → 전체). 맞힐 때까지 여기서 다시 받는다.
 * 결과는 카드 안에서 보여 주고 "Davom etish" 로 직접 다음으로 넘긴다 — 아래 피드백 바는 안 뜬다.
 */
export function GrammarBlank({
  answerState,
  onAnswer,
  onNext,
  question,
}: QuestionProps) {
  const { speak } = useLessonSpeech();
  const { request } = useTelegramAuth();
  const [transcribing, setTranscribing] = useState(false);
  const tokens = useMemo(
    () => parseBlanks(templateOf(question)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      question.sentenceTemplate,
      question.sentencePrefix,
      question.sentenceSuffix,
    ],
  );
  const totalBlanks = blankCount(tokens);
  const multiBlank = totalBlanks > 1;
  const structuredAnswer = Boolean(question.blankAnswers?.length);
  const expectedAnswers = answersOf(question);
  const full = fillTemplate(tokens, expectedAnswers);
  const [values, setValues] = useState<(string | null)[]>(() =>
    Array(totalBlanks).fill(""),
  );
  const [activeBlank, setActiveBlank] = useState(0);
  const inputRefs = useRef<
    Record<number, HTMLInputElement | HTMLTextAreaElement | null>
  >({});
  const setBlankValue = (index: number, text: string) => {
    setActiveBlank(index);
    setValues((current) => {
      const next = [...current];
      next[index] = text;
      return next;
    });
  };
  // 앱에선 아직 빈 버튼인 "Ovoz rejimi" — 여기선 말하면 받아써서 입력칸을 채운다
  const recorder = useWebSpeechRecorder({
    onError: () => undefined,
    onResult: async (wav) => {
      setTranscribing(true);
      try {
        const result = await transcribeSpeech(request, wav);
        if (result.status === "success" && result.text.trim()) {
          if (multiBlank) setBlankValue(activeBlank, result.text.trim());
          else setInput(result.text.trim());
        }
      } catch {
        // 못 들었으면 그냥 다시 쓰게 둔다
      } finally {
        setTranscribing(false);
      }
    },
  });
  const prefix = question.sentencePrefix ?? "";
  const suffix = question.sentenceSuffix ?? "";
  const prompt = question.answerTranslation ?? "";
  const pattern = question.tags?.[0] ?? "";
  const note = question.explanation;
  const wrongHint = question.hint;

  const [input, setInput] = useState("");
  const [reported, setReported] = useState(false);
  const [solvedLate, setSolvedLate] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [fav, setFav] = useState(false);
  const [shake, setShake] = useState(0);
  const [width, setWidth] = useState(360);
  const inputRef = useRef<HTMLInputElement>(null);
  const isOk = answerState === "correct" || solvedLate;

  const focusInput = (index = multiBlank ? activeBlank : 0) =>
    window.setTimeout(() => {
      if (multiBlank) inputRefs.current[index]?.focus();
      else inputRef.current?.focus();
    }, 30);

  useEffect(() => {
    setWidth(Math.min(window.innerWidth, 560));
    const timer = window.setTimeout(
      () =>
        multiBlank ? inputRefs.current[0]?.focus() : inputRef.current?.focus(),
      80,
    );
    return () => window.clearTimeout(timer);
  }, [multiBlank]);

  useEffect(() => {
    setInput("");
    setValues(Array(totalBlanks).fill(""));
    setActiveBlank(0);
    setReported(false);
    setSolvedLate(false);
    setHintLevel(0);
  }, [question.id, totalBlanks]);

  useEffect(() => {
    if (!isOk) return;
    inputRef.current?.blur();
    Object.values(inputRefs.current).forEach((input) => input?.blur());
  }, [isOk]);

  // 문장이 길면 글자를 줄인다 — 카드 안쪽 폭에서 두 줄 안에 드는 가장 큰 단계
  const fit = useMemo(() => {
    const inner = width - 36 - 36;
    const pick = (text: string, ladder: number[], extra = 0) =>
      ladder.find(
        (size) => textWidth(text, size) + extra <= inner * 2 * 0.92,
      ) ?? ladder[ladder.length - 1]!;
    return {
      prompt: pick(prompt, [20, 18, 17, 16, 15, 14]),
      sent: pick(full, [22, 20, 18, 17, 16, 15], 46),
    };
  }, [full, prompt, width]);

  const revealed =
    hintLevel === 0
      ? ""
      : hintLevel === 1
        ? question.answer.slice(0, 1)
        : question.answer;
  const revealedBlanks =
    hintLevel === 0
      ? ""
      : expectedAnswers
          .map((answer) => (hintLevel === 1 ? answer.slice(0, 1) : answer))
          .join(" / ");
  const complete = multiBlank
    ? isComplete(tokens, values)
    : Boolean(input.trim());

  const check = () => {
    if (isOk || !complete) return;
    const typed =
      multiBlank || structuredAnswer
        ? toAnswerPayload(question, tokens, multiBlank ? values : [input])
        : input.trim();
    const right = isAnswerCorrect(typed, question);
    if (!reported) {
      setReported(true);
      onAnswer(typed); // 첫 시도 — 맞든 틀리든 엔진이 기록한다
      if (right) return;
    } else if (right) {
      setSolvedLate(true);
      return;
    }
    window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("error");
    setShake((count) => count + 1);
    if (multiBlank) {
      setValues(Array(totalBlanks).fill(""));
      setActiveBlank(0);
    } else {
      setInput("");
    }
    setHintLevel((level) => Math.min(2, level + 1));
    focusInput(0);
  };

  const sentStyle = {
    fontSize: fit.sent,
    lineHeight: `${Math.round(fit.sent * 1.35)}px`,
  };
  const slotWidth = Math.max(
    64,
    textWidth(input || revealed || "", fit.sent) + 22,
  );

  return (
    <div className={styles.screen}>
      <div className={styles.scroll}>
        <div className={styles.levelTab}>
          <b data-no-translate>{pattern}</b>
          <MobileIcon name="help-circle" size={16} />
        </div>

        <section
          className={`${styles.card} ${isOk ? styles.cardOk : ""} ${shake ? styles.cardShake : ""}`}
          key={`card-${shake}`}
        >
          <div className={styles.cardTop}>
            <span />
            <div className={styles.cardTopRight}>
              <button
                aria-label="Sevimli"
                className={fav ? styles.heartOn : styles.heart}
                onClick={() => setFav((value) => !value)}
                type="button"
              >
                <MobileIcon name="heart" size={20} />
              </button>
              {pattern ? (
                <span className={styles.badge} data-no-translate>
                  {pattern}
                </span>
              ) : null}
            </div>
          </div>

          {isOk ? (
            <span className={styles.checkMark}>
              <MobileIcon name="checkmark-sharp" size={70} />
            </span>
          ) : null}

          <p
            className={styles.prompt}
            data-no-translate
            style={{
              fontSize: fit.prompt,
              lineHeight: `${Math.round(fit.prompt * 1.4)}px`,
            }}
          >
            {prompt}
          </p>

          {isOk && note ? <p className={styles.note}>※ {note}</p> : null}

          {answerState === "wrong" && !isOk ? (
            <div className={styles.wrongBubble}>
              <b>Afsus. Maslahatga qarab, qaytadan kiriting.</b>
              {wrongHint || note ? (
                <span data-no-translate>{wrongHint || note}</span>
              ) : null}
            </div>
          ) : null}

          <div className={styles.answerRow} data-no-translate>
            {multiBlank ? (
              <BlankSentence
                answerState={isOk ? "correct" : "idle"}
                autoFocusFirst
                fontSize={fit.sent}
                inputRefs={inputRefs}
                mode="input"
                onChange={setBlankValue}
                onSubmit={check}
                tokens={tokens}
                values={values}
              />
            ) : (
              <>
                {prefix ? (
                  <span className={styles.answerFix} style={sentStyle}>
                    {prefix}
                  </span>
                ) : null}
                <label
                  className={`${styles.slot} ${isOk ? styles.slotOk : ""}`}
                  style={{ minHeight: fit.sent + 16 }}
                >
                  <input
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    className={`${styles.slotInput} ${isOk ? styles.slotInputOk : ""}`}
                    disabled={isOk}
                    enterKeyHint="done"
                    onChange={(event) => !isOk && setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        check();
                      }
                    }}
                    placeholder={revealed}
                    ref={inputRef}
                    spellCheck={false}
                    style={{ ...sentStyle, width: slotWidth }}
                    value={input}
                  />
                </label>
                {suffix ? (
                  <span className={styles.answerFix} style={sentStyle}>
                    {suffix}
                  </span>
                ) : null}
              </>
            )}
          </div>

          {multiBlank && revealedBlanks && !isOk ? (
            <p className={styles.source} data-no-translate>
              {revealedBlanks}
            </p>
          ) : null}

          {isOk ? (
            <p className={styles.source} data-no-translate>
              {full}
            </p>
          ) : null}
        </section>
      </div>

      <div className={styles.bottom}>
        {isOk ? (
          <>
            <div className={styles.bigRow}>
              <button
                className={`${styles.bigBtn} ${styles.bigRabbit}`}
                onClick={() => speak(full, { rate: 1 })}
                type="button"
              >
                <MobileIcon
                  family="material-community"
                  name="rabbit"
                  size={26}
                />
                <b>Tezlik</b>
              </button>
              <button
                className={`${styles.bigBtn} ${styles.bigListen}`}
                onClick={() => speak(full)}
                type="button"
              >
                <MobileIcon name="volume-high" size={26} />
                <b>Qayta tinglash</b>
              </button>
            </div>
            <button className={styles.nextBtn} onClick={onNext} type="button">
              Davom etish
            </button>
          </>
        ) : (
          <div className={styles.inputBar}>
            <button
              className={styles.barSide}
              onClick={() => {
                setHintLevel((level) => Math.min(2, level + 1));
                focusInput();
              }}
              type="button"
            >
              <MobileIcon name="help-circle" size={23} />
              <span>Yordam</span>
            </button>
            <button
              className={styles.checkBubble}
              disabled={!complete}
              onClick={check}
              type="button"
            >
              Tekshirish
            </button>
            <button
              className={`${styles.barSide} ${recorder.recording ? styles.barSideOn : ""}`}
              disabled={transcribing}
              onClick={() =>
                recorder.recording ? recorder.stop() : void recorder.start()
              }
              type="button"
            >
              <MobileIcon
                name={
                  recorder.recording ? "stop" : transcribing ? "sync" : "mic"
                }
                size={23}
              />
              <span>Ovoz rejimi</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
