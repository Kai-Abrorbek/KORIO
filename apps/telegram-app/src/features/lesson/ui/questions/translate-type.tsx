"use client";

import { useState } from "react";

import { useTelegramAuth } from "../../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../../shared/ui/mobile-icon";
import { transcribeSpeech } from "../../api/lesson";
import { useWebSpeechRecorder } from "../../model/use-web-speech-recorder";
import { CheckButton } from "../lesson-chrome";
import { type QuestionProps } from "./shared";
import q from "./questions.module.css";
import styles from "./translate-type.module.css";

const CORRECT = "#22b573";
const WRONG = "#ff4b4b";

function cleanSourceText(value: string) {
  const stripped = value.replace(/^(?:Koreyscha yozing|Type in Korean|Напишите по-корейски)\s*:\s*/iu, "");
  if (stripped === value) return value;
  return stripped.replace(/^["“«]\s*/u, "").replace(/\s*["”»]$/u, "").trim();
}

const VOICE_ERRORS: Record<string, string> = {
  checkFailed: "Hozir tekshirib bo'lmadi. Birozdan so'ng urinib ko'ring",
  micDenied: "Mikrofon ruxsati kerak. Sozlamalardan yoqing",
  micFailed: "Mikrofonni ochib bo'lmadi",
  noSpeech: "Ovoz eshitilmadi. Yana bir marta gapirasizmi?",
  notSupportedHere: "Bu muhitda mikrofon ishlamaydi. Ilovadan foydalaning",
  tooShort: "Juda qisqa. Gapni oxirigacha ayting",
};

/**
 * 번역해서 쓰기 (translate_type) — 모바일 questions/TranslateType.
 * 그라데이션 원문 카드 → 답 카드(포커스·채점 색, 지우기, n/300) → 바닥에 마이크(받아쓰기) + 확인.
 * 마이크는 발음 평가가 아니라 받아쓰기만 해서 입력칸을 채운다. 채점은 텍스트 비교가 맡는다.
 */
export function TranslateType({ answerState, isChecking, onAnswer, question }: QuestionProps) {
  const { request } = useTelegramAuth();
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const compact = typeof window !== "undefined" && window.innerHeight < 740;

  const locked = answerState !== "idle" || isChecking;
  const accent = answerState === "correct" ? CORRECT : answerState === "wrong" ? WRONG : "#776ee2";
  const sourceText = cleanSourceText(question.sourceText?.trim() || question.npcText?.trim() || question.question?.trim() || "");

  const recorder = useWebSpeechRecorder({
    onError: (code) =>
      setVoiceError(
        code === "unsupported" ? VOICE_ERRORS.notSupportedHere! : code === "permission" ? VOICE_ERRORS.micDenied! : code === "too_short" ? VOICE_ERRORS.tooShort! : VOICE_ERRORS.micFailed!,
      ),
    onResult: async (wav) => {
      setTranscribing(true);
      try {
        const result = await transcribeSpeech(request, wav);
        if (result.status === "success" && result.text.trim()) setInput(result.text.trim());
        else setVoiceError(VOICE_ERRORS.noSpeech!);
      } catch {
        setVoiceError(VOICE_ERRORS.checkFailed!);
      } finally {
        setTranscribing(false);
      }
    },
  });
  const recording = recorder.recording;

  const toggleVoice = () => {
    if (locked || transcribing) return;
    if (recording) {
      recorder.stop();
      return;
    }
    setVoiceError(null);
    void recorder.start();
  };

  const check = () => {
    if (!input.trim() || locked || recording || transcribing) return;
    onAnswer(input.trim());
  };

  const mic = (
    <button
      aria-label="Gapirish uchun bosing"
      className={`${styles.mic} ${recording ? styles.micOn : ""}`}
      disabled={locked || transcribing}
      onClick={toggleVoice}
      type="button"
    >
      <span className={`${styles.micIcon} ${recording ? styles.micPulse : ""}`}>
        <MobileIcon name={transcribing ? "sparkles" : recording ? "stop" : "mic"} size={20} />
      </span>
      <span className={styles.micCopy}>
        <b>{recording ? "Tinglanmoqda..." : transcribing ? "Talaffuz tekshirilmoqda…" : "Gapirish uchun bosing"}</b>
        {!compact && !recording ? <small>Gapirsangiz, javob maydoniga yoziladi</small> : null}
      </span>
      <MobileIcon name={recording ? "pulse" : "chevron-forward"} size={18} />
    </button>
  );

  return (
    <div className={`${q.q} ${styles.container}`} style={{ ["--tt-accent" as string]: accent }}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>
          <MobileIcon name="language" size={23} />
        </span>
        <div className={styles.headerCopy}>
          <h1>Quyidagi gapni tarjima qiling</h1>
          <p>Ma&apos;noni tabiiy koreyscha gap bilan ifodalang</p>
        </div>
        {question.hard ? (
          <span className={styles.hardBadge}>
            <MobileIcon family="material-community" name="dumbbell" size={14} />
            <b>Qiyin mashq</b>
          </span>
        ) : null}
      </div>

      <section className={`${styles.source} ${compact ? styles.sourceCompact : ""}`}>
        <span className={styles.orbLarge} />
        <span className={styles.orbSmall} />
        <div className={styles.sourceTop}>
          <span className={styles.sourceLabel}>
            <MobileIcon name="chatbubble-ellipses-outline" size={15} />
            <b>Tarjima qilinadigan gap</b>
          </span>
          <span className={styles.direction}>
            <b>Koreyschaga</b>
            <MobileIcon name="arrow-forward" size={13} />
          </span>
        </div>
        <div className={styles.quoteRow}>
          <p data-no-translate>{sourceText}</p>
        </div>
      </section>

      <section className={`${styles.answer} ${compact ? styles.answerCompact : ""} ${focused || answerState !== "idle" ? styles.answerOn : ""}`}>
        <div className={styles.answerTop}>
          <span className={styles.answerLabel}>
            <i>
              <MobileIcon name={answerState === "correct" ? "checkmark" : answerState === "wrong" ? "close" : "create-outline"} size={17} />
            </i>
            <b>Koreyscha javobingiz</b>
          </span>
          {input && !locked ? (
            <button aria-label="Yozilgan javobni tozalash" className={styles.clear} onClick={() => setInput("")} type="button">
              <MobileIcon name="close-circle" size={18} />
              <b>Tozalash</b>
            </button>
          ) : null}
        </div>
        <textarea
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          className={styles.input}
          disabled={locked}
          maxLength={300}
          onBlur={() => setFocused(false)}
          onChange={(event) => {
            setInput(event.target.value);
            if (voiceError) setVoiceError(null);
          }}
          onFocus={() => setFocused(true)}
          placeholder="Koreyscha gapni kiriting"
          spellCheck={false}
          value={input}
        />
        <span className={styles.answerDivider} />
        <div className={styles.answerFooter}>
          <i />
          <span>Javobni koreyscha yozing</span>
          <small>{input.length}/300</small>
        </div>
      </section>

      {voiceError && !locked ? (
        <div className={styles.error}>
          <MobileIcon name="alert-circle" size={17} />
          <span>{voiceError}</span>
        </div>
      ) : null}

      <CheckButton above={mic} disabled={!input.trim() || locked || recording || transcribing} loading={isChecking} onClick={check} />
    </div>
  );
}
