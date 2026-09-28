"use client";

import { useState } from "react";

import { useTelegramAuth } from "../../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../../shared/ui/mobile-icon";
import { assessSpeech, type SpeechAssessResult } from "../../api/lesson";
import { useWebSpeechRecorder } from "../../model/use-web-speech-recorder";
import { LessonCharacter } from "../lesson-character";
import { useLessonSpeech, type QuestionProps } from "./shared";
import q from "./questions.module.css";
import styles from "./speaking.module.css";

type Phase = "idle" | "recording" | "analyzing" | "done";

// 단어 칩 색 — 초록(잘함) / 노랑(아쉬움) / 빨강(틀림)
const TONE = {
  bad: { bg: "#ffdfe0", border: "#ff4b4b", text: "#c02121" },
  good: { bg: "#d7ffb8", border: "#58cc02", text: "#3c8000" },
  warn: { bg: "#fff3c4", border: "#ffc800", text: "#8a6a00" },
} as const;

function wordToneOf(word: { accuracy: number; errorType: string }): keyof typeof TONE {
  if (word.errorType === "Omission" || word.errorType === "Mispronunciation") return word.accuracy >= 60 ? "warn" : "bad";
  if (word.accuracy >= 80) return "good";
  if (word.accuracy >= 60) return "warn";
  return "bad";
}

const HINTS = {
  analyzing: "Talaffuz tekshirilmoqda…",
  checkFailed: "Hozir tekshirib bo'lmadi. Birozdan so'ng urinib ko'ring",
  listening: "Eshityapman…",
  micDenied: "Mikrofon ruxsati kerak. Sozlamalardan yoqing",
  micFailed: "Mikrofonni ochib bo'lmadi",
  noSpeech: "Ovoz eshitilmadi. Yana bir marta gapirasizmi?",
  notSupportedHere: "Bu muhitda mikrofon ishlamaydi. Ilovadan foydalaning",
  tapToSpeak: "Bosing va gapiring",
  tooShort: "Juda qisqa. Gapni oxirigacha ayting",
} as const;

const WAVE = [10, 18, 28, 16, 32, 20, 30, 14, 24, 18, 12];

/**
 * 말하기 (speaking) — 모바일 questions/Speaking.
 * 말풍선(읽기 버튼 + 문장) 아래 캐릭터, 가로 마이크 바(녹음 중엔 흰 파형, 확인 중엔 회전).
 * 결과 카드: 발음 점수 + 단어별 색 칩 + 정확도/유창성/완성도 + "이렇게 들었어요".
 * 못 알아들은 건 오답이 아니다 — 채점하지 않고 다시 말하게 둔다.
 */
export function Speaking({ answerState, onAnswer, onSkip, question }: QuestionProps) {
  const { request } = useTelegramAuth();
  const { speak, speaking } = useLessonSpeech();
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<SpeechAssessResult | null>(null);
  const [error, setError] = useState<keyof typeof HINTS | null>(null);
  const locked = answerState !== "idle";

  const recorder = useWebSpeechRecorder({
    onError: (code) => {
      setPhase("idle");
      setError(code === "unsupported" ? "notSupportedHere" : code === "permission" ? "micDenied" : code === "too_short" ? "tooShort" : "micFailed");
    },
    onResult: async (wav) => {
      setPhase("analyzing");
      try {
        const assessed = await assessSpeech(request, question.id, wav);
        if (assessed.status !== "success") {
          setError("noSpeech");
          setPhase("idle");
          return;
        }
        setResult(assessed);
        setPhase("done");
        onAnswer(assessed.passed ? "all_correct" : "__speaking_low__");
      } catch {
        setError("checkFailed");
        setPhase("idle");
      }
    },
  });

  const pressMic = async () => {
    if (locked || phase === "analyzing") return;
    if (phase === "recording") {
      recorder.stop();
      return;
    }
    setError(null);
    setResult(null);
    const started = await recorder.start();
    if (started) setPhase("recording");
  };

  const tone = !result || result.passed ? TONE.good : result.scores.pron >= result.threshold.pron - 15 ? TONE.warn : TONE.bad;
  const hint = error ?? (phase === "recording" ? "listening" : phase === "analyzing" ? "analyzing" : phase === "idle" ? "tapToSpeak" : null);

  return (
    <div className={q.q}>
      <h1 className={styles.title}>{question.question}</h1>

      <div className={styles.npcArea}>
        <div className={styles.bubble}>
          <button aria-label="Tinglash" className={`${styles.speaker} ${speaking ? styles.speakerOn : ""}`} onClick={() => speak(question.answer)} type="button">
            <MobileIcon name="volume-high" size={24} />
          </button>
          <div className={styles.bubbleTextWrap}>
            <p data-no-translate>{question.answer}</p>
            <span />
          </div>
          <i className={styles.tailBorder} />
          <i className={styles.tailInner} />
        </div>
        <LessonCharacter height={result ? 100 : 230} seed={question.id} state={answerState} />
      </div>

      {result ? (
        <section className={styles.result}>
          <div className={styles.resultHead}>
            <b style={{ color: tone.border }}>{Math.round(result.scores.pron)}</b>
            <span>Talaffuz bahosi</span>
          </div>
          {result.words?.length ? (
            <div className={styles.wordRow} data-no-translate>
              {result.words.map((word, index) => {
                const wordTone = TONE[wordToneOf(word)];
                return (
                  <span className={styles.wordChip} key={`${word.word}-${index}`} style={{ background: wordTone.bg, borderBottomColor: wordTone.border, color: wordTone.text }}>
                    {word.word}
                  </span>
                );
              })}
            </div>
          ) : null}
          <div className={styles.metrics}>
            <span>
              <b>{Math.round(result.scores.accuracy)}</b>
              <small>Aniqlik</small>
            </span>
            <span>
              <b>{Math.round(result.scores.fluency)}</b>
              <small>Ravonlik</small>
            </span>
            <span>
              <b>{Math.round(result.scores.completeness)}</b>
              <small>To&apos;liqlik</small>
            </span>
          </div>
          {result.transcript && result.transcript !== result.referenceText ? (
            <p className={styles.heard}>
              <span>Men shunday eshitdim</span>
              <span data-no-translate>{` · ${result.transcript}`}</span>
            </p>
          ) : null}
        </section>
      ) : null}

      <div className={styles.bottom}>
        {hint && !locked ? <p className={`${styles.hint} ${error ? styles.hintError : ""}`}>{HINTS[hint]}</p> : null}
        <button aria-label="Gapirish" className={`${styles.mic} ${locked ? styles.micLocked : ""}`} disabled={locked || phase === "analyzing"} onClick={() => void pressMic()} type="button">
          {phase === "recording" ? (
            <span className={styles.wave}>
              {WAVE.map((height, index) => (
                <i key={index} style={{ animationDelay: `${index * 60}ms`, height }} />
              ))}
            </span>
          ) : phase === "analyzing" ? (
            <MobileIcon className={styles.spin} name="sync" size={30} />
          ) : (
            <MobileIcon name="mic" size={32} />
          )}
        </button>
        <button className={styles.skip} onClick={onSkip} type="button">
          Gapirish savolini o&apos;tkazib yuborish
        </button>
      </div>
    </div>
  );
}
