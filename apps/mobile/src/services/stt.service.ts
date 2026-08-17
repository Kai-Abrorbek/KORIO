import api from "./api";

/**
 * 음성 인식(STT) + 발음 평가. 서버가 Azure Speech 를 대신 호출한다.
 * TTS(음성 합성)는 `speech.service.ts` 쪽이다 — 방향이 반대라 파일을 나눴다.
 */

export type SpeechStatus = "success" | "no_speech" | "error";

export type WordErrorType =
  | "None"
  | "Omission"
  | "Insertion"
  | "Mispronunciation"
  | "UnexpectedBreak"
  | "MissingBreak"
  | "Monoton";

export interface AssessedWord {
  word: string;
  /** 0~100 */
  accuracy: number;
  errorType: WordErrorType;
}

export interface SpeechScores {
  pron: number;
  accuracy: number;
  fluency: number;
  completeness: number;
  prosody: number | null;
}

export interface AssessResult {
  status: SpeechStatus;
  /** 레슨 채점은 이 값만 본다 */
  passed: boolean;
  transcript: string;
  referenceText: string;
  scores: SpeechScores;
  words: AssessedWord[];
  threshold: {
    tier: "lenient" | "normal" | "strict";
    pron: number;
    completeness: number;
  };
}

export interface TranscribeResult {
  status: SpeechStatus;
  text: string;
}

const WAV_CONTENT_TYPE = "audio/wav";

export const SttService = {
  /** Speaking 문제 — 참조 문장은 서버가 questionId 로 조회한다 (클라가 못 정함) */
  assess: (questionId: string, wav: ArrayBuffer): Promise<AssessResult> =>
    api.postBinary(
      `/speech/assess?questionId=${encodeURIComponent(questionId)}`,
      wav,
      WAV_CONTENT_TYPE,
    ),

  /** 마이크 받아쓰기 — 발음 평가 없이 인식 결과만 */
  transcribe: (wav: ArrayBuffer): Promise<TranscribeResult> =>
    api.postBinary("/speech/transcribe", wav, WAV_CONTENT_TYPE),
};

/** 단어 점수 → 색 등급. 초록/노랑/빨강 3단계 */
export function wordToneOf(word: AssessedWord): "good" | "warn" | "bad" {
  if (word.errorType === "Omission" || word.errorType === "Mispronunciation") {
    return word.accuracy >= 60 ? "warn" : "bad";
  }
  if (word.accuracy >= 80) return "good";
  if (word.accuracy >= 60) return "warn";
  return "bad";
}
