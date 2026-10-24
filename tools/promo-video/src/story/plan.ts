/**
 * 스토리 영상 "Ayni shu N soniya" (우즈벡어 · 9:16 · 30fps · 내레이션).
 *
 * 이야기 — 이 영상 자체가 N초짜리 릴스라는 걸 대놓고 센다. 하루 2시간 릴스 = 1년 730시간.
 * 같은 사람·같은 폰이 두 갈래로 나뉜다: A 는 릴스만, B 는 그중 10분을 KORIO 에.
 * 1·7·30·90일 — A 의 세상 글자는 끝내 못 읽는 기호로 남고, B 의 세상은 하나씩 해독된다.
 * 90일째 서울에서 누가 "한국어 할 줄 알아요?" 묻는다. A 의 대답은 부서지고 B 는 대답한다.
 * 마지막에 구석의 타이머가 가운데로 와서 KORIO 아이콘으로 뒤집힌다.
 *
 * 장면 길이는 내레이션(public/audio/story-v-*.mp3, 길이는 voice.generated.json)에 맞췄다.
 * 내레이션을 다시 만들면 길이를 보고 여기 숫자를 다시 맞춘다.
 */
export const STORY_FPS = 30;

/** 장면 안 시각 (장면 시작부터 프레임) — 장면 코드와 소리가 같이 본다 */
export const T = {
  hook: { dur: 156, voice: 6, total: 30, count: 84 },
  feed: {
    dur: 346,
    voiceA: 8,
    voiceB: 92,
    voiceC: 168,
    voiceQ: 264,
    swipes: [10, 34, 58],
    accelFrom: 70,
    peak: 226,
    stop: 252,
    grey: 246,
    pull: 258,
    counts: [
      { at: 34, value: 2, label: "bir kunda" },
      { at: 106, value: 60, label: "bir oyda" },
      { at: 186, value: 730, label: "bir yilda" },
    ],
  },
  split: { dur: 330, voiceA: 4, tear: 58, voiceB: 88, voiceC: 174, labelB: 232 },
  meet: {
    dur: 450,
    voiceA: 10,
    hara: 18,
    bubble: 66,
    voiceHara: 70,
    replyA: 158,
    replyB: 194,
    voiceB: 198,
    crumble: 238,
    cheer: 250,
    rack: 290,
    voiceC: 300,
    voiceD: 350,
  },
  gains: { dur: 390, voiceA: 6, chips: [74, 156, 206, 308], leave: 362 },
  end: { dur: 250, voiceA: 4, flip: 62, voiceB: 70, voiceC: 168 },
} as const;

/** 하루 한 칸 (Days 장면 안). 마지막 날은 화면 속으로 빨려 들어가는 시간까지 길다 */
export const BEAT = 140;
export const LAST_BEAT = 190;
export const DAYS_DUR = BEAT * 3 + LAST_BEAT;
/** 날마다 — 내레이션·해독·얻은 것이 뜨는 시각 (그날 시작부터) */
export const DAY_T = { voice: 4, streak: 8, gain: 30, decode: 26, meaning: 58 };

const order = ["hook", "feed", "split", "days", "meet", "gains", "end"] as const;
const durs: Record<(typeof order)[number], number> = {
  hook: T.hook.dur,
  feed: T.feed.dur,
  split: T.split.dur,
  days: DAYS_DUR,
  meet: T.meet.dur,
  gains: T.gains.dur,
  end: T.end.dur,
};
export const STORY = {} as Record<(typeof order)[number], { from: number; dur: number }>;
let cursor = 0;
for (const id of order) {
  STORY[id] = { from: cursor, dur: durs[id] };
  cursor += durs[id];
}
export const STORY_TOTAL = cursor;
/** 영상 길이(초) — 훅 자막·내레이션이 이 숫자를 말한다 */
export const STORY_SECONDS = Math.round(STORY_TOTAL / STORY_FPS);

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
  /** B 가 얻은 것 (내레이션이 읽는다) */
  gain: string;
  voice: string;
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
    voice: "day-1",
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
    voice: "day-7",
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
    voice: "day-30",
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
    gain: "Sun’iy intellekt ustoz bilan erkin suhbatlashasiz",
    voice: "day-90",
  },
];

/** 내레이션 — 영상 전체 프레임에서 언제 무엇을 트나 */
const at = (id: (typeof order)[number], local: number) => STORY[id].from + local;
export const VOICE: { at: number; name: string }[] = [
  { at: at("hook", T.hook.voice), name: "hook" },
  { at: at("feed", T.feed.voiceA), name: "feed-a" },
  { at: at("feed", T.feed.voiceB), name: "feed-b" },
  { at: at("feed", T.feed.voiceC), name: "feed-c" },
  { at: at("feed", T.feed.voiceQ), name: "feed-q" },
  { at: at("split", T.split.voiceA), name: "split-a" },
  { at: at("split", T.split.voiceB), name: "split-b" },
  { at: at("split", T.split.voiceC), name: "split-c" },
  ...BEATS.map((b, i) => ({ at: at("days", i * BEAT + DAY_T.voice), name: b.voice })),
  { at: at("meet", T.meet.voiceA), name: "meet-a" },
  { at: at("meet", T.meet.voiceHara), name: "meet-hara" },
  { at: at("meet", T.meet.voiceB), name: "meet-b" },
  { at: at("meet", T.meet.voiceC), name: "meet-c" },
  { at: at("meet", T.meet.voiceD), name: "meet-d" },
  { at: at("gains", T.gains.voiceA), name: "gains-a" },
  ...T.gains.chips.map((c, i) => ({ at: at("gains", c), name: `gains-${i + 1}` })),
  { at: at("end", T.end.voiceA), name: "end-a" },
  { at: at("end", T.end.voiceB), name: "end-b" },
  { at: at("end", T.end.voiceC), name: "end-c" },
];
