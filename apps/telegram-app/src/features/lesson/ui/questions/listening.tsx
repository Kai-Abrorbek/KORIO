"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { MobileIcon } from "../../../../shared/ui/mobile-icon";
import { CheckButton } from "../lesson-chrome";
import { AUTO_SPEECH_DELAY_MS, haptic, shuffle, useLessonSpeech, type QuestionProps } from "./shared";
import q from "./questions.module.css";
import styles from "./reading.module.css";

/**
 * 듣고 고르기(listening)가 들려줄 말 — 앱 utils/listening.ts 와 같다.
 * 시드의 "여자: … 남자: …" 화자 표시는 빼고 읽는다. audioText 가 없는 옛 문항만 정답으로 대신한다.
 */
const SPEAKER_LABEL = /(^|[\s.?!,])([가-힣A-Za-z]{1,4})\s*:\s*/g;
export function listeningScript(question: { audioText?: string; answer?: string }): string {
  const raw = (question.audioText || question.answer || "").trim();
  return raw.replace(SPEAKER_LABEL, "$1 ").replace(/\s+/g, " ").trim();
}

/**
 * 듣고 고르기 (listening) — 모바일 questions/Listening 과 같다. TOPIK 듣기처럼
 * 대화(audioText)를 듣고, 질문(instruction)에 맞는 답을 보기 4개 중에서 고른다.
 * 들려준 문장은 화면에 안 보여준다 — 귀로 풀어야 한다.
 *
 * ⚠️ 예전엔 audioText 를 무시하고 정답 문장을 읽은 뒤 같은 문장을 고르게 해서 찍기였다.
 */
export function Listening({ answerState, onAnswer, onSkip, question }: QuestionProps) {
  const { speak, speakAuto, speaking } = useLessonSpeech();
  const auto = useRef(false);
  const [selected, setSelected] = useState<string | null>(null);
  const locked = answerState !== "idle";
  const script = listeningScript(question);
  // 시드는 정답을 첫 칸에 적어 둔다 — 자리로 외우지 않게 섞는다 (한 문제 안에선 고정)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo(() => shuffle(question.options ?? []), [question.id]);

  useEffect(() => {
    if (auto.current || !script) return;
    auto.current = true;
    const timer = window.setTimeout(() => speakAuto(script), AUTO_SPEECH_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [script, speakAuto]);

  return (
    <div className={q.q}>
      <h1 className={styles.clozeTitle} data-no-translate={question.question ? true : undefined} style={{ marginBottom: 18 }}>
        {question.question || "Eshiting va tanlang"}
      </h1>

      <div className={q.audioRow} style={{ marginBottom: 22 }}>
        <button
          aria-label="Tinglash"
          className={`${q.bigSpeaker} ${speaking ? q.pulsing : ""}`}
          onClick={() => speak(script)}
          type="button"
        >
          <MobileIcon name="volume-high" size={36} />
        </button>
        <button aria-label="Sekin tinglash" className={q.slowSpeaker} onClick={() => speak(script, { slow: true })} type="button">
          <MobileIcon family="material-community" name="turtle" size={30} />
        </button>
      </div>

      {options.map((option, index) => {
        const selectedHere = selected === option;
        return (
          <button
            className={`${styles.option} ${selectedHere ? styles.optionOn : ""}`}
            disabled={locked}
            key={option}
            onClick={() => {
              if (locked) return;
              haptic();
              setSelected((current) => (current === option ? null : option));
            }}
            type="button"
          >
            <span className={styles.optionBadge}>{String.fromCharCode(65 + index)}</span>
            <span className={styles.optionText} data-no-translate>
              {option}
            </span>
          </button>
        );
      })}

      <CheckButton
        disabled={!selected || locked}
        onClick={() => selected && !locked && onAnswer(selected)}
        onSkip={onSkip}
        skipLabel={!locked ? "Tinglash mashqini o'tkazib yuborish" : undefined}
      />
    </div>
  );
}
