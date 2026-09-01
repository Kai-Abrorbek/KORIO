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

export type ReadingWordStatus = "passed" | "failed" | "not_read";

export interface ReadingWordResult {
  /** 본문 전체 기준 단어 번호 */
  index: number;
  word: string;
  /** 안 읽은 단어는 null */
  accuracy: number | null;
  status: ReadingWordStatus;
}

export interface ReadingAssessResult extends AssessResult {
  startWordIndex: number;
  nextWordIndex: number;
  failedWordIndex: number | null;
  passedWordCount: number;
  totalWords: number;
  complete: boolean;
  referenceWords: string[];
  wordResults: ReadingWordResult[];
  /**
   * 이번 오디오에서 채점이 끝난 지점(ms).
   * 앱은 여기까지만 버리고 나머지는 다음 구간으로 이어 붙인다 — 그래야
   * 한 호흡에 참조보다 많이 읽어도 뒷부분이 안 날아간다.
   */
  consumedMs: number;
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

  /** 표현 카드 — 참조 문장은 서버가 expressionId로 조회한다 */
  assessExpression: (
    expressionId: string,
    wav: ArrayBuffer,
  ): Promise<AssessResult> =>
    api.postBinary(
      `/speech/assess-expression?expressionId=${encodeURIComponent(
        expressionId,
      )}`,
      wav,
      WAV_CONTENT_TYPE,
    ),

  /** 읽기 연습 — 참조 구간은 lessonCode와 위치로 서버가 DB에서 결정한다 */
  assessReading: (
    lessonCode: string,
    startWordIndex: number,
    wordCount: number,
    wav: ArrayBuffer,
  ): Promise<ReadingAssessResult> =>
    api.postBinary(
      `/speech/assess-reading?lessonCode=${encodeURIComponent(
        lessonCode,
      )}&startWordIndex=${startWordIndex}&wordCount=${wordCount}`,
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
