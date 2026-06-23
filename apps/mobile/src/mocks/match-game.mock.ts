export interface WordPair {
  id: string;
  ko: string;
  uz: string;
  en: string;
  ru: string;
}

// 나중에 DB 단어로 교체. 지금은 mock 풀.
export const WORD_POOL: WordPair[] = [
  { id: "milk", ko: "우유", uz: "sut", en: "milk", ru: "молоко" },
  { id: "tea", ko: "차", uz: "choy", en: "tea", ru: "чай" },
  { id: "coffee", ko: "커피", uz: "qahva", en: "coffee", ru: "кофе" },
  { id: "sugar", ko: "설탕", uz: "shakar", en: "sugar", ru: "сахар" },
  { id: "water", ko: "물", uz: "suv", en: "water", ru: "вода" },
  { id: "rice", ko: "밥", uz: "guruch", en: "rice", ru: "рис" },
  { id: "bread", ko: "빵", uz: "non", en: "bread", ru: "хлеб" },
  { id: "apple", ko: "사과", uz: "olma", en: "apple", ru: "яблоко" },
  { id: "book", ko: "책", uz: "kitob", en: "book", ru: "книга" },
  { id: "school", ko: "학교", uz: "maktab", en: "school", ru: "школа" },
  { id: "friend", ko: "친구", uz: "do'st", en: "friend", ru: "друг" },
  { id: "house", ko: "집", uz: "uy", en: "house", ru: "дом" },
  { id: "paris", ko: "파리", uz: "Parij", en: "Paris", ru: "Париж" },
  { id: "tokyo", ko: "도쿄", uz: "Tokio", en: "Tokyo", ru: "Токио" },
  { id: "mexico", ko: "멕시코", uz: "Meksika", en: "Mexico", ru: "Мексика" },
  { id: "brazil", ko: "브라질", uz: "Braziliya", en: "Brazil", ru: "Бразилия" },
];

export const BOARD_PAIRS = 5; // 화면에 동시에 보이는 짝 수
export const GAME_SECONDS = 60; // 제한 시간

export interface Milestone {
  count: number;
  xp: number;
  star: boolean;
}
export const MILESTONES: Milestone[] = [
  { count: 5, xp: 5, star: false },
  { count: 10, xp: 10, star: false },
  { count: 30, xp: 30, star: true },
];

// progress 정지점: count → 바 채움 비율(0~1). 앞은 빨리, 뒤로 갈수록 천천히.
const STOPS: [number, number][] = [
  [0, 0],
  [5, 0.35],
  [10, 0.6],
  [30, 0.85],
];

export function progressWidth(matched: number): number {
  const n = Math.min(matched, 30);
  for (let i = 1; i < STOPS.length; i++) {
    const [c0, p0] = STOPS[i - 1];
    const [c1, p1] = STOPS[i];
    if (n <= c1) return p0 + ((p1 - p0) * (n - c0)) / (c1 - c0);
  }
  return 0.85;
}

export const MARKERS = [
  { label: 5, pos: 0.35 },
  { label: 10, pos: 0.6 },
  { label: 30, pos: 0.85 },
];

export function starTier(matched: number): number {
  if (matched >= 30) return 3;
  if (matched >= 15) return 2;
  if (matched >= 5) return 1;
  return 0;
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 현재 보드에 없는 짝 하나 뽑기
export function drawPair(usedIds: Set<string>): WordPair | null {
  const avail = WORD_POOL.filter((p) => !usedIds.has(p.id));
  if (avail.length === 0) return null;
  return avail[Math.floor(Math.random() * avail.length)];
}
