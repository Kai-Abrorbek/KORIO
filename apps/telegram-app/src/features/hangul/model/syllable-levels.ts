export type GuideMode = "stroke" | "silhouette" | "blank";

export interface SyllableLevel {
  guide: GuideMode;
  id: number;
  key: "basic" | "wide" | "tail" | "tallTail" | "wideTail" | "complex";
  showAnswer: boolean;
  syllables: string[];
}

export const SYLLABLE_LEVELS: SyllableLevel[] = [
  { id: 1, key: "basic", guide: "stroke", showAnswer: true, syllables: ["가", "나", "너", "다", "시", "자"] },
  { id: 2, key: "wide", guide: "stroke", showAnswer: true, syllables: ["고", "구", "도", "무", "소", "주"] },
  { id: 3, key: "tail", guide: "silhouette", showAnswer: true, syllables: ["용", "옥", "움", "윤", "읍", "안"] },
  { id: 4, key: "tallTail", guide: "silhouette", showAnswer: false, syllables: ["산", "밥", "김", "말", "신", "별"] },
  { id: 5, key: "wideTail", guide: "blank", showAnswer: false, syllables: ["곰", "물", "국", "눈", "본", "즙"] },
  { id: 6, key: "complex", guide: "blank", showAnswer: false, syllables: ["과", "왕", "꿈", "꽃", "의", "원"] },
];

export const STROKE_TOLERANCE_RATIO = 1.65;

export const SYLLABLE_LEVEL_COPY: Record<
  SyllableLevel["key"],
  { description: string; title: string }
> = {
  basic: {
    description: "가, 나, 다 — unli o'ngda turadigan eng oson bo'g'in",
    title: "Undosh + unli",
  },
  wide: {
    description: "고, 구, 소 — unli undoshning tagiga tushadi",
    title: "Unli pastda",
  },
  tail: {
    description: "옥, 움, 용 — bo'g'in ostiga yana bitta undosh qo'shiladi",
    title: "Batchim qo'shish",
  },
  tallTail: {
    description: "산, 밥, 김 — endi tayyor bo'g'in ko'rsatilmaydi",
    title: "Uch bo'lakli bo'g'in",
  },
  wideTail: {
    description: "곰, 물, 국 — hech qanday yo'l-yo'riqsiz",
    title: "Bo'sh katakka yozish",
  },
  complex: {
    description: "과, 꿈, 꽃 — qo'sh unli va qo'sh undoshlar",
    title: "Murakkab bo'g'inlar",
  },
};
