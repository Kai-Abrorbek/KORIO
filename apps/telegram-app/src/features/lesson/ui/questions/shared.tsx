"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

import { useTelegramAuth } from "../../../auth/model/telegram-auth-context";
import { useKoreanSpeech, type SpeechLanguage } from "../../../../shared/browser/use-korean-speech";
import type { AnswerState, LessonQuestion } from "../../model/lesson";

/**
 * 문제 컴포넌트 공용 — 모바일 components/lesson/QuestionRenderer 의 props 와 같다.
 *
 * 음성은 서버 TTS(Azure, /tts/speech)로 낸다. 예전엔 브라우저 speechSynthesis 를
 * 썼는데, 안드로이드 텔레그램 WebView 에는 한국어 음성이 없는 경우가 많아
 * 듣기 문제가 **소리 없이** 나왔다. 레슨 하나에서 플레이어·선로딩 캐시를 공유한다.
 */
export interface QuestionProps {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  onSkip: () => void;
  /** 카드 안에서 결과를 보여 주는 유형(문법)이 직접 다음으로 넘긴다 */
  onNext: () => void;
  combo: number;
  isChecking: boolean;
  /** 같은 문제를 다시 풀 때 새로 그리기 위한 키 */
  instanceKey: string;
}

export interface LessonSpeech {
  speak: (text: string, options?: { slow?: boolean; onEnd?: () => void; language?: SpeechLanguage; rate?: number }) => void;
  /** 문제가 뜰 때 자동으로 읽기. 설정에서 "Avtomatik o‘qish" 를 끄면 안 읽는다 */
  speakAuto: (text: string) => void;
  stop: () => void;
  prewarm: (texts: string[]) => void;
  speaking: boolean;
}

const SpeechContext = createContext<LessonSpeech | null>(null);
/**
 * 읽는 진행도 0~1 (말풍선 단어 하이라이트용). 매 프레임 바뀌니 따로 둔다 —
 * 같은 컨텍스트에 넣으면 읽는 동안 모든 문제 컴포넌트가 프레임마다 다시 그려진다.
 */
const SpeechProgressContext = createContext(0);

/** 앱의 AUTO_SPEECH_DELAY_MS — 화면이 자리 잡은 직후에 읽는다 */
export const AUTO_SPEECH_DELAY_MS = 60;

function soundSettings(): { autoPlay?: boolean; speechRate?: number } {
  try {
    return JSON.parse(window.localStorage.getItem("korio-sound-settings") ?? "{}") as { autoPlay?: boolean; speechRate?: number };
  } catch {
    return {};
  }
}

function autoPlayEnabled() {
  return soundSettings().autoPlay !== false;
}

/** 앱 useSpeech 의 SLOW_FACTOR — 거북이 = 설정 속도 × 0.55 */
const SLOW_FACTOR = 0.55;

export function LessonSpeechProvider({ children }: { children: ReactNode }) {
  const { request } = useTelegramAuth();
  const korean = useKoreanSpeech(request);
  const { prewarm, progress, speak, speaking, stop } = korean;
  const value = useMemo<LessonSpeech>(
    () => ({
      prewarm: (texts) => prewarm(texts.filter(Boolean)),
      speak: (text, options) =>
        speak(text, {
          language: options?.language,
          onEnd: options?.onEnd,
          rate: options?.rate ?? (options?.slow ? Math.max(0.25, (soundSettings().speechRate ?? 1) * SLOW_FACTOR) : undefined),
        }),
      speakAuto: (text) => {
        if (!autoPlayEnabled()) return;
        speak(text);
      },
      speaking,
      stop,
    }),
    [prewarm, speak, speaking, stop],
  );
  return (
    <SpeechContext.Provider value={value}>
      <SpeechProgressContext.Provider value={progress}>{children}</SpeechProgressContext.Provider>
    </SpeechContext.Provider>
  );
}

export function useLessonSpeech(): LessonSpeech {
  const value = useContext(SpeechContext);
  if (!value) throw new Error("useLessonSpeech must be used inside LessonSpeechProvider");
  return value;
}

export function useSpeechProgress() {
  return useContext(SpeechProgressContext);
}

export function shuffle<T>(items: readonly T[]): T[] {
  const out = [...items];
  for (let index = out.length - 1; index > 0; index -= 1) {
    const random = Math.floor(Math.random() * (index + 1));
    [out[index], out[random]] = [out[random]!, out[index]!];
  }
  return out;
}

export function haptic(kind: "light" | "medium" = "light") {
  window.Telegram?.WebApp.HapticFeedback?.impactOccurred(kind);
}
