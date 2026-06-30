export interface WordPair {
  ko: string;
  uz: string;
}

export interface WordMemoryLevel {
  level: number;
  pairs: number; // 쌍 개수
  columns: number; // 그리드 열
  previewMs: number; // 시작 미리보기 시간
  timeSec: number; // 제한시간
}

// 레벨 5단계: 쌍 5→7→10→12→15 (카드 10→14→20→24→30장)
export const WORD_MEMORY_LEVELS: WordMemoryLevel[] = [
  { level: 1, pairs: 5, columns: 3, previewMs: 2200, timeSec: 70 },
  { level: 2, pairs: 7, columns: 4, previewMs: 2200, timeSec: 90 },
  { level: 3, pairs: 10, columns: 4, previewMs: 2000, timeSec: 120 },
  { level: 4, pairs: 12, columns: 4, previewMs: 1800, timeSec: 150 },
  { level: 5, pairs: 15, columns: 5, previewMs: 1600, timeSec: 180 },
];
