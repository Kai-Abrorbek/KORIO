/**
 * 스토리 영상 "Ayni shu 57 soniya" (우즈벡어 · 9:16 · 30fps · 57초).
 *
 * 이야기 — 이 영상 자체가 57초짜리 릴스라는 걸 대놓고 센다. 하루 2시간 릴스 = 1년 730시간.
 * 같은 사람·같은 폰이 두 갈래로 나뉜다: A 는 릴스만, B 는 그중 10분을 KORIO 에.
 * 1·7·30·90일 — A 의 세상 글자는 끝내 못 읽는 기호로 남고, B 의 세상은 하나씩 해독된다.
 * 90일째 서울에서 누가 "한국어 할 줄 알아요?" 묻는다. A 의 대답은 부서지고 B 는 대답한다.
 * 마지막에 구석의 타이머가 가운데로 와서 KORIO 아이콘으로 뒤집힌다.
 */
export const STORY_FPS = 30;

export const STORY = {
  hook: { from: 0, dur: 120 },
  feed: { from: 120, dur: 210 },
  split: { from: 330, dur: 90 },
  days: { from: 420, dur: 660 },
  meet: { from: 1080, dur: 300 },
  gains: { from: 1380, dur: 180 },
  end: { from: 1560, dur: 150 },
} as const;

export const STORY_TOTAL = STORY.end.from + STORY.end.dur;

/** 하루 한 칸 (Days 장면 안) */
export const BEAT = 165;

export type Beat = {
  day: string;
  reels: number;
  streak: number;
  clip: string;
  clipLen: number;
  scene: string | null;
  /** B 쪽 세상 글자 (해독된다) → 뜻 */
  sign: string;
  meaning: string;
  /** B 가 얻은 것 */
  gain: string;
};

export const BEATS: Beat[] = [
  {
    day: "1-kun",
    reels: 144,
    streak: 1,
    clip: "hangul",
    clipLen: 96,
    scene: null,
    sign: "한",
    meaning: "“han” — birinchi bo‘g‘iningiz",
    gain: "Hangulni o‘qiy boshladingiz",
  },
  {
    day: "7-kun",
    reels: 1008,
    streak: 7,
    clip: "lesson",
    clipLen: 108,
    scene: "scene_cvs",
    sign: "편의점",
    meaning: "kichik do‘kon · 24/7",
    gain: "Ko‘chadagi yozuvlarni tushunasiz",
  },
  {
    day: "30-kun",
    reels: 4320,
    streak: 30,
    clip: "speaking",
    clipLen: 144,
    scene: "scene_hangang",
    sign: "어디에서 왔어요?",
    meaning: "Qayerdan keldingiz?",
    gain: "Savollarga javob bera olasiz",
  },
  {
    day: "90-kun",
    reels: 12960,
    streak: 90,
    clip: "tutor",
    clipLen: 525,
    scene: "scene_namsan",
    sign: "한국어능력시험",
    meaning: "TOPIK — koreys tili imtihoni",
    gain: "AI ustoz bilan erkin suhbatlashasiz",
  },
];
