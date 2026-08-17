import { SpeakingTier } from './speech.constants';

export type SpeechStatus = 'success' | 'no_speech' | 'error';

/** Azure 가 매기는 단어별 판정 */
export type WordErrorType =
  | 'None'
  | 'Omission' // 안 말함
  | 'Insertion' // 참조에 없는 걸 말함
  | 'Mispronunciation' // 잘못 발음
  | 'UnexpectedBreak'
  | 'MissingBreak'
  | 'Monoton';

export interface AssessedWord {
  word: string;
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
  /** 기준 통과 여부. 레슨 채점은 이 값만 본다. */
  passed: boolean;
  /** 인식된 문장 (유저가 실제로 말한 것) */
  transcript: string;
  referenceText: string;
  scores: SpeechScores;
  words: AssessedWord[];
  threshold: { tier: SpeakingTier; pron: number; completeness: number };
}

export interface TranscribeResult {
  status: SpeechStatus;
  text: string;
}
