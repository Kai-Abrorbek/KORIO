"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useTelegramAuth } from "../../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../../shared/ui/mobile-icon";
import { transcribeSpeech } from "../../api/lesson";
import { isAnswerCorrect } from "../../model/lesson";
import { useWebSpeechRecorder } from "../../model/use-web-speech-recorder";
import { useLessonSpeech, type QuestionProps } from "./shared";
import styles from "./grammar.module.css";

/** 한글은 글자폭 ≈ 글자크기, 로마자·숫자·공백은 그 절반쯤 */
function textWidth(text: string, size: number) {
  let width = 0;
  for (const char of text) width += /[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(char) ? size : size * 0.55;
  return width;
}

/**
 * 문법 빈칸 (grammar_blank) — 모바일 questions/GrammarBlank.
 *
 * 엔진(레슨 화면)에는 **첫 시도만** 넘긴다. 틀리면 정답을 보여 주지 않고 카드가 흔들리며
 * 힌트를 한 단계씩 열어 준다(첫 글자 → 전체). 맞힐 때까지 여기서 다시 받는다.
 * 결과는 카드 안에서 보여 주고 "Davom etish" 로 직접 다음으로 넘긴다 — 아래 피드백 바는 안 뜬다.
 */
export function GrammarBlank({ answerState, onAnswer, onNext, question }: QuestionProps) {
  const { speak } = useLessonSpeech();
  const { request } = useTelegramAuth();
  const [transcribing, setTranscribing] = useState(false);
  // 앱에선 아직 빈 버튼인 "Ovoz rejimi" — 여기선 말하면 받아써서 입력칸을 채운다
  const recorder = useWebSpeechRecorder({
    onError: () => undefined,
    onResult: async (wav) => {
      setTranscribing(true);
      try {
        const result = await transcribeSpeech(request, wav);
        if (result.status === "success" && result.text.trim()) setInput(result.text.trim());
      } catch {
        // 못 들었으면 그냥 다시 쓰게 둔다
      } finally {
        setTranscribing(false);
      }
    },
  });
  const prefix = question.sentencePrefix ?? "";
  const suffix = question.sentenceSuffix ?? "";
  const full = prefix + question.answer + suffix;
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

  useEffect(() => {
    setWidth(Math.min(window.innerWidth, 560));
    const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOk) inputRef.current?.blur();
  }, [isOk]);

  // 문장이 길면 글자를 줄인다 — 카드 안쪽 폭에서 두 줄 안에 드는 가장 큰 단계
  const fit = useMemo(() => {
    const inner = width - 36 - 36;
    const pick = (text: string, ladder: number[], extra = 0) => ladder.find((size) => textWidth(text, size) + extra <= inner * 2 * 0.92) ?? ladder[ladder.length - 1]!;
    return { prompt: pick(prompt, [20, 18, 17, 16, 15, 14]), sent: pick(full, [22, 20, 18, 17, 16, 15], 46) };
  }, [full, prompt, width]);

  const revealed = hintLevel === 0 ? "" : hintLevel === 1 ? question.answer.slice(0, 1) : question.answer;

  const focusInput = () => window.setTimeout(() => inputRef.current?.focus(), 30);

  const check = () => {
    const typed = input.trim();
    if (isOk || !typed) return;
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
    setInput("");
    setHintLevel((level) => Math.min(2, level + 1));
    focusInput();
  };

  const sentStyle = { fontSize: fit.sent, lineHeight: `${Math.round(fit.sent * 1.35)}px` };
  const slotWidth = Math.max(64, textWidth(input || revealed || "", fit.sent) + 22);

  return (
    <div className={styles.screen}>
      <div className={styles.scroll}>
        <div className={styles.levelTab}>
          <b data-no-translate>{pattern}</b>
          <MobileIcon name="help-circle" size={16} />
        </div>

        <section className={`${styles.card} ${isOk ? styles.cardOk : ""} ${shake ? styles.cardShake : ""}`} key={`card-${shake}`}>
          <div className={styles.cardTop}>
            <span />
            <div className={styles.cardTopRight}>
              <button aria-label="Sevimli" className={fav ? styles.heartOn : styles.heart} onClick={() => setFav((value) => !value)} type="button">
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

          <p className={styles.prompt} data-no-translate style={{ fontSize: fit.prompt, lineHeight: `${Math.round(fit.prompt * 1.4)}px` }}>
            {prompt}
          </p>

          {isOk && note ? <p className={styles.note}>※ {note}</p> : null}

          {answerState === "wrong" && !isOk ? (
            <div className={styles.wrongBubble}>
              <b>Afsus. Maslahatga qarab, qaytadan kiriting.</b>
              {wrongHint || note ? <span data-no-translate>{wrongHint || note}</span> : null}
            </div>
          ) : null}

          <div className={styles.answerRow} data-no-translate>
            {prefix ? (
              <span className={styles.answerFix} style={sentStyle}>
                {prefix}
              </span>
            ) : null}
            <label className={`${styles.slot} ${isOk ? styles.slotOk : ""}`} style={{ minHeight: fit.sent + 16 }}>
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
          </div>

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
              <button className={`${styles.bigBtn} ${styles.bigRabbit}`} onClick={() => speak(full, { rate: 1 })} type="button">
                <MobileIcon family="material-community" name="rabbit" size={26} />
                <b>Tezlik</b>
              </button>
              <button className={`${styles.bigBtn} ${styles.bigListen}`} onClick={() => speak(full)} type="button">
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
            <button className={styles.checkBubble} disabled={!input.trim()} onClick={check} type="button">
              Tekshirish
            </button>
            <button
              className={`${styles.barSide} ${recorder.recording ? styles.barSideOn : ""}`}
              disabled={transcribing}
              onClick={() => (recorder.recording ? recorder.stop() : void recorder.start())}
              type="button"
            >
              <MobileIcon name={recorder.recording ? "stop" : transcribing ? "sync" : "mic"} size={23} />
              <span>Ovoz rejimi</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
