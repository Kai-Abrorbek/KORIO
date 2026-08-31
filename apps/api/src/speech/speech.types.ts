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
  /** 이 단어가 오디오에서 끝나는 지점(ms). 읽기 연습에서만 채워진다 */
  endMs?: number | null;
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

/** 참조 본문의 단어 하나가 이번 녹음에서 어떻게 됐는지 */
export type ReadingWordStatus = 'passed' | 'failed' | 'not_read';

export interface ReadingWordResult {
  /** 본문 전체 기준 단어 번호 */
  index: number;
  word: string;
  /** Azure 가 매긴 점수. 안 읽은 단어는 null */
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
  /** 이번 구간 단어별 결과. 화면 디버깅과 향후 상세 표시에 쓴다 */
  wordResults: ReadingWordResult[];
  /**
   * 이번 오디오에서 채점이 끝난 지점(ms).
   * 앱은 여기까지만 버리고 나머지는 다음 요청에 이어 붙인다.
   */
  consumedMs: number;
}
