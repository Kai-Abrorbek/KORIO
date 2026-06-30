export interface WordPair {
  ko: string;
  native: string;
}

export interface MemoryLevel {
  level: number;
  pairs: number; // 쌍 개수
  columns: number; // 그리드 열
  previewMs: number; // 시작 전체공개 시간
  timeSec: number; // 제한시간
}

export const MEMORY_LEVELS: MemoryLevel[] = [
  { level: 1, pairs: 3, columns: 3, previewMs: 2500, timeSec: 60 },
  { level: 2, pairs: 4, columns: 4, previewMs: 2500, timeSec: 75 },
  { level: 3, pairs: 6, columns: 4, previewMs: 2200, timeSec: 90 },
  { level: 4, pairs: 8, columns: 4, previewMs: 2000, timeSec: 110 },
  { level: 5, pairs: 10, columns: 5, previewMs: 1800, timeSec: 130 },
];
