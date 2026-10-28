/**
 * 촬영용 가짜 데이터 — 화면이 진짜처럼 보이게 하는 우즈벡 학습자 "Aziz" 한 명의 하루.
 * 앱 코드의 타입(텔레그램 미니앱 api/*)과 같은 모양이다.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const REPO = join(import.meta.dirname, "..", "..", "..");
const read = (path) => readFileSync(join(REPO, path), "utf8");

/** 꾸미기 카탈로그 (api cosmetics.const.ts) */
const COSMETICS = [...read("apps/api/src/cosmetics/cosmetics.const.ts").matchAll(
  /\{ id: '([\w-]+)', slot: '(\w+)', rarity: '(\w+)', price: (\d+)/g,
)].map(([, id, slot, rarity, price]) => ({ id, slot, rarity, price: Number(price) }));

/** 한글 글자 id (텔레그램 hangul model) */
const HANGUL_IDS = [...read("apps/telegram-app/src/features/hangul/model/hangul.ts").matchAll(/id: "([cv]-[\w-]+)"/g)].map(
  (m) => m[1],
);

const AVATAR_VERSION = Number(read("apps/telegram-app/src/shared/model/avatar.ts").match(/AVATAR_VERSION = (\d+)/)?.[1] ?? 1);

const pick = (slot) =>
  COSMETICS.filter((item) => item.slot === slot).sort(
    (a, b) => ["common", "rare", "epic", "legendary"].indexOf(b.rarity) - ["common", "rare", "epic", "legendary"].indexOf(a.rarity),
  )[0]?.id;

export const AVATAR = {
  version: AVATAR_VERSION,
  skinTone: "skin_06",
  bodyShape: "body_balanced",
  expression: "expression_smile",
  eyeColor: "eyes_charcoal",
  hairstyle: "hair_wave",
  hairColor: "haircolor_charcoal",
  eyewear: "eyewear_none",
  facialHair: "facial_none",
  headwear: "headwear_none",
  outfit: "outfit_hoodie",
  background: "background_lilac",
  aura: pick("aura") ?? "aura_none",
  scene: "scene_none",
  pet: pick("pet") ?? "pet_none",
  costume: "costume_none",
  hand: "hand_none",
  hat: "hat_none",
  title: "title_none",
};

export const USER = {
  id: "promo-aziz",
  nickname: "Aziz",
  isOnboardingCompleted: true,
  hasPickedLevel: true,
  learnCourse: "ko",
  learnMode: "vocabulary",
  studyMode: "free",
  topikLevel: "1",
  league: "gold",
  gems: 1240,
  energy: 25,
  streak: 30,
  longestStreak: 30,
  totalXP: 12450,
  level: "beginner",
  languageLevel: 2,
  isSuper: true,
  superPlan: "max",
  superExpiresAt: "2027-12-31T00:00:00.000Z",
  hangulCompletedAt: null,
  avatar: AVATAR,
  joinedYear: 2026,
};

const NAMES = [
  "Malika", "Jasur", "Дмитрий", "Nilufar", "Sardor", "Анна", "Bekzod", "Dilnoza", "Shohruh", "Иван",
  "Kamola", "Otabek", "Zarina", "Umid", "Gulnora", "Сергей", "Firuz", "Мария", "Doston",
];

function leagueMembers() {
  const xps = [5120, 4380, 3920, 3610, 3200, 2950, 2700, 2410, 2180, 1960, 1720, 1530, 1310, 1100, 920, 760, 540, 380, 210, 90];
  return xps.map((xp, i) => {
    const me = i === 2;
    return {
      id: me ? USER.id : `m${i}`,
      nickname: me ? USER.nickname : NAMES[i > 2 ? i - 1 : i],
      avatar: me ? AVATAR : undefined,
      xp,
      rank: i + 1,
      isMe: me,
      streak: me ? 30 : (i * 7) % 23,
      online: i % 3 === 0,
    };
  });
}

/** 한글 진도 — learned 글자만큼 배운 상태 */
function hangulProgress(learned) {
  return {
    pattern: "^/hangul/progress(\\?|$)",
    body: {
      hangulCompletedAt: null, justCompleted: false, learnedCount: learned, total: HANGUL_IDS.length,
      progress: HANGUL_IDS.slice(0, learned).map((characterId, i) => ({
        characterId, correctCount: 6, wrongCount: 1, score: 90, mastery: i < learned * 0.7 ? 3 : i < learned * 0.9 ? 2 : 1,
      })),
    },
  };
}

/** 장면 → [{ pattern(정규식 문자열), method?, body }] */
export function mocksFor(scene) {
  const common = [{ pattern: "^/users/me(\\?|$)", body: USER }];
  switch (scene) {
    case "leagueResult":
      return [
        ...common,
        {
          pattern: "^/league/result(\\?|$)",
          method: "GET",
          body: {
            weekKey: "2026-W43", finalRank: 2, fromTier: "silver", toTier: "gold",
            change: "promote", gems: 18, reason: null, weeklyXp: 4820, requiredXp: 800,
          },
        },
      ];
    case "league":
      return [
        ...common,
        { pattern: "^/league/result(\\?|$)", method: "GET", body: null },
        {
          pattern: "^/league/me(\\?|$)",
          body: {
            previousRank: 7, tier: "gold", tierIndex: 2, weekKey: "2026-W43",
            endsAt: "2026-10-26T19:00:00.000Z", daysLeft: 3, promoteCount: 7, demoteCount: 3,
            roomSize: 20, boostXp: 0, keepXp: 1500, myWeeklyXp: 3920, members: leagueMembers(),
          },
        },
      ];
    case "hangul":
      return [...common, hangulProgress(28)];
    // 홈 → Kurslar → Koreys tili → 학습 카드 → Hangul → 글자 · 게임 (사용법 영상 한 번에)
    case "hangulTour":
      return [...common, ...homeMocks(), hangulProgress(12)];
    case "hangulGames":
      return [...common, hangulProgress(12)];
    // 어휘(Lug'at) 사용법: 홈 → 학습 카드 → 로드맵 / 로드맵에서 노드 · 상자 · 건너뛰기 / 문제 유형
    case "vocabTour":
      return [...common, ...homeMocks(), ...vocabMocks()];
    case "vocabMap":
      return [...common, ...vocabMocks()];
    case "vocabMatch":
      return [...common, ...lessonMocks([WORD_MATCHING])];
    case "vocabBuilder":
      return [...common, ...lessonMocks([SENTENCE_BUILDER])];
    case "avatar":
      return [
        ...common,
        {
          pattern: "^/cosmetics(\\?|$)",
          body: {
            gems: USER.gems,
            owned: COSMETICS.map((item) => item.id),
            equipped: { aura: AVATAR.aura, pet: AVATAR.pet },
            items: COSMETICS,
          },
        },
      ];
    case "lesson":
      return [...common, ...lessonMocks([IMAGE_CHOICE, SPEAKING])];
    case "speaking":
      return [...common, ...lessonMocks([SPEAKING])];
    case "topik":
      return [
        ...common,
        { pattern: "^/topik/recipes/[^/]+/practice/solutions", body: [{ id: TOPIK_QUESTION.id, correctChoiceKey: "3", solution: null }] },
        {
          pattern: "^/topik/recipes/[^/]+/practice(\\?|$)",
          body: {
            groupCode: "r40",
            label: { ko: "40~42번", uz: "40–42-savollar", en: "Questions 40–42", ru: "Вопросы 40–42" },
            title: { ko: "안내문 읽기", uz: "E’lon o‘qish", en: "Reading notices", ru: "Чтение объявлений" },
            questions: [TOPIK_QUESTION],
          },
        },
      ];
    case "stickers": {
      // capture/render-stickers.mts 가 api 그리기 엔진으로 미리 그려 둔 8장
      const file = join(import.meta.dirname, "..", "frames", "sticker-preview.json");
      const preview = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : { avatarKey: "", stickers: [] };
      return [
        ...common,
        { pattern: "^/stickers/preview(\\?|$)", body: preview },
        {
          pattern: "^/stickers(\\?|$)",
          body: {
            enabled: true, price: 300, refreshPrice: 0, gems: USER.gems, busy: false,
            telegram: { linked: true, username: "aziz_uz" }, pack: null, stickers: [],
          },
        },
      ];
    }
    case "home":
      return [...common, ...homeMocks()];
    case "quests":
      return [...common, ...questsMocks(false)];
    case "quests-ready":
      return [...common, ...questsMocks(true)];
    case "stats":
      return [...common, ...statsMocks()];
    default:
      return common;
  }
}

/** TOPIK I 읽기 40~42번 모양 — 안내문을 읽고 맞지 않는 것 고르기 */
const block = (text) => ({ type: "paragraph", segments: [{ type: "text", text, key: "", label: "" }] });
const TOPIK_QUESTION = {
  id: "promo-topik-1",
  code: "promo-r40",
  number: 40,
  type: "reading_mismatch",
  responseType: "multiple_choice",
  points: 3,
  prompt: [block("다음을 읽고 맞지 않는 것을 고르십시오.")],
  stimulus: {
    kind: "advertisement",
    title: "행복 빵집",
    subtitle: "새로 문을 열었습니다!",
    blocks: [block("매일 아침 8시에 빵을 구워요.")],
    bulletItems: ["영업시간: 오전 8시 ~ 오후 9시", "월요일은 쉽니다"],
    infoItems: [], labeledSentences: [], givenText: [], imageUrl: "", imageAlt: "", visualVariant: "",
  },
  audio: null,
  presentation: { template: "", choiceLayout: "one_column", visualVariant: "", showBorder: true, preserveChoiceOrder: true },
  choices: [
    "이 빵집은 새로 열었습니다.",
    "아침 8시에 빵을 굽습니다.",
    "월요일에도 빵을 살 수 있습니다.",
    "밤 9시까지 문을 엽니다.",
  ].map((text, i) => ({ key: String(i + 1), text, order: i + 1, imageAssetKey: "", imageAlt: "" })),
  tags: [],
  difficulty: 2,
};

/** 레슨 문제 — 앱 LessonQuestion 모양 */
const IMAGE_CHOICE = {
  id: "promo-q1",
  type: "image_choice",
  level: "beginner",
  question: "«Olma» qaysi biri?",
  answer: "사과",
  choices: [
    { emoji: "🍎", label: "사과", text: "사과" },
    { emoji: "🍌", label: "바나나", text: "바나나" },
    { emoji: "🍞", label: "빵", text: "빵" },
    { emoji: "☕", label: "커피", text: "커피" },
  ],
  xpReward: 10,
};

const SPEAKING = {
  id: "promo-q2",
  type: "speaking",
  level: "beginner",
  question: "Ovoz chiqarib ayting",
  answer: "이거 정말 맛있어요",
  audioText: "이거 정말 맛있어요",
  answerTranslation: "Bu juda mazali",
  xpReward: 10,
};

const WORD_MATCHING = {
  id: "promo-q3",
  type: "word_matching",
  level: "beginner",
  question: "Koreyscha so'z va ma'nosini moslang",
  answer: "",
  pairs: [
    { korean: "안녕하세요", native: "Salom" },
    { korean: "학생", native: "Talaba" },
    { korean: "선생님", native: "O'qituvchi" },
    { korean: "의사", native: "Shifokor" },
  ],
  xpReward: 15,
};

const SENTENCE_BUILDER = {
  id: "promo-q4",
  type: "sentence_builder",
  level: "beginner",
  question: "Eshitgan gapingizni yig'ing",
  audioText: "저는 학생이에요",
  answer: "저는 학생이에요",
  answerTranslation: "Men talabaman",
  options: ["학생이에요", "의사예요", "저는", "선생님"],
  xpReward: 15,
};

/**
 * 어휘 로드맵 — 1단원 끝(전설 노드 하나 · 받을 상자), 2단원 진행 중(Dars 2/5), 3·4단원 잠김(3단원 첫 노드는 건너뛰기 시험)
 * 상자 · 점수 배지는 화면(prepareRoadmapUnits)이 끼운다.
 */
function vocabRoadmap() {
  const unit = (n, title, status, nodes) => ({ id: `u${n}`, unitNumber: n, sectionNumber: 1, title, status, color: "", scoreValue: n, nodes });
  const node = (id, type, title, status, done, total, extra = {}) => ({ id, type, title, status, completedLessons: done, totalLessons: total, lessonId: "promo", xpReward: 10, ...extra });
  return {
    currentSection: 1,
    score: 1,
    pendingChests: 1,
    nextSection: { sectionNumber: 2, title: "Kundalik hayot", description: "Kun tartibi, vaqt va joylar", firstUnitNumber: 9 },
    units: [
      unit(1, "Salomlashish", "completed", [
        node("n11", "star", "Salom!", "completed", 4, 4, { legendCompleted: true }),
        node("n12", "headphone", "Tanishuv", "completed", 4, 4),
        node("n13", "speech", "Millatlar", "completed", 4, 4),
        node("n14", "star", "Kasblar", "completed", 4, 4),
        node("n15", "headphone", "Ha va yo'q", "completed", 4, 4),
        node("n16", "star", "Takrorlash", "completed", 4, 4),
      ]),
      unit(2, "Oila", "current", [
        node("n21", "star", "Oila a'zolari", "completed", 5, 5),
        node("n22", "speech", "Bu kim?", "completed", 5, 5),
        node("n23", "headphone", "Mening oilam", "current", 2, 5),
        node("n24", "star", "Yosh", "locked", 0, 5),
        node("n25", "speech", "Uy", "locked", 0, 5),
        node("n26", "star", "Takrorlash", "locked", 0, 5),
      ]),
      unit(3, "Taomlar", "locked", [
        node("n31", "star", "Ovqatlar", "locked", 0, 5),
        node("n32", "headphone", "Restoranda", "locked", 0, 5),
        node("n33", "speech", "Mazali!", "locked", 0, 5),
        node("n34", "star", "Takrorlash", "locked", 0, 5),
      ]),
      unit(4, "Kun tartibi", "locked", [
        node("n41", "star", "Ertalab", "locked", 0, 5),
        node("n42", "headphone", "Vaqt", "locked", 0, 5),
        node("n43", "star", "Takrorlash", "locked", 0, 5),
      ]),
    ],
  };
}

function vocabMocks() {
  return [
    { pattern: "^/users/me/learn-mode", method: "PATCH", body: { learnMode: "vocabulary", topikLevel: "1", learnCourse: "ko" } },
    { pattern: "^/lessons/roadmap", body: vocabRoadmap() },
    {
      pattern: "^/lessons/score",
      body: {
        completedUnits: 1, nextScore: 2, progress: 0.4, score: 1,
        milestones: [
          { section: 1, score: 1, units: 8, firstUnit: 1, progress: 0.4, status: "current", title: "Asoslar" },
          { section: 2, score: 9, units: 8, firstUnit: 9, progress: 0, status: "locked", title: "Kundalik hayot" },
        ],
      },
    },
    { pattern: "^/lessons/chests/claim", method: "POST", body: { claimed: 1, gems: 30, totalGems: USER.gems + 30, grade: "gold" } },
  ];
}

function lessonMocks(questions) {
  return [
    {
      pattern: "^/lessons/promo(\\?|$)",
      method: "GET",
      body: { category: "vocabulary", lessonId: "promo", lessonTitle: "Taomlar", totalXp: 45, attemptId: null, questions },
    },
    { pattern: "^/lessons/questions/[^/]+/grade", body: { isCorrect: true, result: "correct", feedback: "" } },
    {
      pattern: "^/speech/assess",
      method: "POST",
      body: {
        passed: true,
        referenceText: "이거 정말 맛있어요",
        scores: { accuracy: 96, completeness: 100, fluency: 94, pron: 95, prosody: null },
        status: "success",
        threshold: { completeness: 60, pron: 60, tier: "normal" },
        transcript: "이거 정말 맛있어요",
        words: [
          { word: "이거", accuracy: 97, errorType: "None" },
          { word: "정말", accuracy: 93, errorType: "None" },
          { word: "맛있어요", accuracy: 96, errorType: "None" },
        ],
      },
    },
  ];
}

/** 최근 7일 (10월 16~22일) — 매일 공부, 분야가 고르게 */
const WEEK = ["2026-10-16", "2026-10-17", "2026-10-18", "2026-10-19", "2026-10-20", "2026-10-21", "2026-10-22"];
const MINUTES = [18, 26, 22, 31, 24, 35, 28];

function homeMocks() {
  return [
    {
      pattern: "^/retention/summary",
      body: {
        gems: USER.gems,
        streak: USER.streak,
        freeze: { owned: 2, max: 3, price: 200, superWeekly: 1, notice: null },
        quests: {
          day: "2026-10-22",
          items: [],
          slots: [
            { id: "easy", slot: "easy", kind: "xp", category: null, promo: false, course: null, target: 30, progress: 30, done: true, claimed: true, gems: 5 },
            { id: "normal", slot: "normal", kind: "correct", category: null, promo: false, course: "ko", target: 20, progress: 14, done: false, claimed: false, gems: 10 },
            { id: "hard", slot: "hard", kind: "minutes", category: null, promo: false, course: null, target: 15, progress: 9, done: false, claimed: false, gems: 15 },
          ],
          rerolls: { used: 0, max: 1, left: 1 },
          chest: { gems: 20, ready: false, claimed: false },
        },
        checkin: null,
        comeback: null,
        xpBoost: null,
        streakGoal: { options: [], streakChest: { everyDays: 7, gems: 30 }, active: { days: 60, gems: 120, progress: 30, startDay: "2026-09-23" }, result: null },
      },
    },
    {
      pattern: "^/learn-progress",
      body: { progress: { course: "ko", mode: "vocabulary", scope: "section", scopeNumber: 3, title: null, unit: "lesson", done: 14, total: 20, percent: 70 } },
    },
    {
      pattern: "^/users/me/stats/weekly",
      body: {
        days: WEEK.map((date, i) => ({
          date,
          studyTimeSeconds: MINUTES[i] * 60,
          totalQuestions: 40 + i * 6,
          correctQuestions: 36 + i * 5,
          xpEarned: 120 + i * 15,
          categories: { vocab: 14 + i, grammar: 8 + (i % 3) * 2, expression: 5, conversation: 3 + (i % 2), listening: 6, topik: i % 2 ? 4 : 0 },
        })),
      },
    },
    { pattern: "^/notifications/unread-count", body: { count: 0 } },
  ];
}

function statsMocks() {
  const label = (date) => ["Ya", "Du", "Se", "Ch", "Pa", "Ju", "Sh"][new Date(date).getDay()];
  const heatmap = Array.from({ length: 364 }, (_, i) => {
    const date = new Date(Date.UTC(2025, 9, 24) + i * 86400000).toISOString().slice(0, 10);
    const recent = i > 300;
    return { date, intensity: recent ? ((i * 7) % 4) + 1 : i % 5 === 0 ? 0 : (i * 13) % 5 };
  });
  return [
    {
      pattern: "^/users/me/stats/period",
      body: {
        heatmap,
        range: "week",
        studiedLanguages: ["ko", "en"],
        targetLanguage: "ko",
        studyTime: {
          avgPerDayLabel: "26 daq",
          rangeLabel: "16–22 oktabr",
          points: WEEK.map((date, i) => ({ date, label: label(date), minutes: MINUTES[i] })),
        },
        studyVolume: {
          avgPerDay: 58,
          points: WEEK.map((date, i) => ({
            date, label: label(date),
            vocab: 18 + i * 2, grammar: 9 + (i % 3) * 3, expression: 6 + (i % 2) * 2, conversation: 4 + i, listening: 7, topik: i % 2 ? 6 : 2, other: 1,
          })),
        },
        today: {
          avgProblems: 58,
          avgTimeLabel: "26 daq",
          studyTimeLabel: "28 daq",
          totalQuestions: 64,
          weekdayIndex: 4,
          categories: [
            { category: "vocab", newCount: 12, reviewAccuracy: 94, reviewCount: 18, total: 30 },
            { category: "grammar", newCount: 4, reviewAccuracy: 88, reviewCount: 8, total: 12 },
            { category: "conversation", newCount: 6, reviewAccuracy: null, reviewCount: 0, total: 6 },
            { category: "listening", newCount: 5, reviewAccuracy: 90, reviewCount: 3, total: 8 },
            { category: "topik", newCount: 8, reviewAccuracy: null, reviewCount: 0, total: 8 },
          ],
        },
        todayHasData: true,
      },
    },
    {
      pattern: "^/users/me/stats/category",
      body: {
        chart: WEEK.map((date, i) => ({ date, label: label(date), newWords: 10 + (i % 3) * 3, knownWords: 120 + i * 14, reviewWords: 12 + i * 2 })),
        knownWordsToday: 214,
        newWordsToday: 12,
        reviewAccuracy: 94,
        reviewWordsToday: 18,
        todayTime: "28 daq",
        totalProblems: 2140,
        totalTime: "41 soat",
        trophyLevel: 3,
      },
    },
    {
      pattern: "^/users/me/stats/skills",
      body: {
        diagnosis: { category: "listening", key: "weakSpot", spread: 22, strongest: "vocab", weakest: "listening" },
        rangeDays: 90,
        totalAttempted: 2140,
        skills: [
          { category: "vocab", accuracy: 0.93, attempted: 820, correct: 763, daysSinceLast: 0, reliable: true, score: 92 },
          { category: "grammar", accuracy: 0.86, attempted: 410, correct: 353, daysSinceLast: 0, reliable: true, score: 84 },
          { category: "expression", accuracy: 0.88, attempted: 260, correct: 229, daysSinceLast: 1, reliable: true, score: 80 },
          { category: "conversation", accuracy: 0.81, attempted: 190, correct: 154, daysSinceLast: 0, reliable: true, score: 76 },
          { category: "listening", accuracy: 0.74, attempted: 230, correct: 170, daysSinceLast: 2, reliable: true, score: 70 },
          { category: "topik", accuracy: 0.79, attempted: 230, correct: 182, daysSinceLast: 0, reliable: true, score: 74 },
        ],
      },
    },
    {
      pattern: "^/study-path(\\?|$)",
      body: {
        courseId: "ko-general", levelPicked: true, currentDayIndex: 13, currentLevel: 2, currentSection: 3,
        days: Array.from({ length: 20 }, (_, i) => ({
          dayNumber: i + 1, id: `d${i + 1}`, phase: 1, section: 3, sectionStart: i === 0, unit: Math.floor(i / 5) + 1,
          status: i < 13 ? "completed" : i === 13 ? "current" : "locked", title: `${i + 1}-kun`,
          nodes: ["words", "grammar", "vocabQuiz"].map((kind, k) => {
            const done = i < 13 || (i === 13 && k === 0);
            return {
              count: 10, done, group: k + 1, groupCount: 3, id: `d${i + 1}-${kind}`, kind,
              lessonCount: 2, lessonsDone: done ? 2 : 0, nextLesson: done ? 2 : 0,
              status: done ? "completed" : i === 13 && k === 1 ? "current" : "locked",
            };
          }),
        })),
        levelExam: { available: false, passed: false },
        nextLevel: { description: "", level: 3, title: "3-daraja" },
        pendingChests: 0,
        score: 1240,
      },
    },
  ];
}

/**
 * 퀘스트 페이지 상태 확인용 — ready=false: 받을 보상 · 도장 · 진행 중 · SUPER 보너스 · 월간 보상 칸,
 * ready=true: 셋 다 끝나 상자를 열 수 있다
 */
function questsMocks(ready) {
  const slot = (id, kind, target, progress, done, claimed, gems, extra = {}) => ({
    id, slot: id, kind, category: null, promo: false, course: null, target, progress, done, claimed, gems, ...extra,
  });
  const slots = ready
    ? [
        slot("easy", "xp", 30, 30, true, true, 5),
        slot("normal", "category", 20, 20, true, true, 10, { category: "vocab", course: "ko" }),
        slot("hard", "minutes", 15, 15, true, false, 15),
      ]
    : [
        slot("easy", "xp", 30, 30, true, true, 5),
        slot("normal", "category", 20, 20, true, false, 10, { category: "vocab", course: "ko" }),
        slot("hard", "minutes", 15, 9, false, false, 15),
        slot("bonus", "shareProgress", 1, 0, false, false, 20, { promo: true }),
      ];
  return [
    {
      pattern: "^/retention/summary",
      body: {
        gems: USER.gems,
        streak: USER.streak,
        freeze: { owned: 2, max: 3, price: 200, superWeekly: 1, notice: null },
        quests: {
          day: "2026-10-22",
          items: [],
          slots,
          rerolls: { used: 0, max: 1, left: 1 },
          chest: { gems: 20, ready, claimed: false },
        },
        monthly: {
          month: "2026-10",
          count: 18,
          target: 30,
          daysLeft: 9,
          milestones: [
            { at: 5, gems: 20, badge: false, reached: true, claimed: true },
            { at: 12, gems: 40, badge: false, reached: true, claimed: ready },
            { at: 20, gems: 60, badge: false, reached: false, claimed: false },
            { at: 30, gems: 0, badge: true, reached: false, claimed: false },
          ],
          badges: ["2026-08", "2026-09"],
        },
        checkin: null,
        comeback: null,
        xpBoost: null,
        streakGoal: { options: [], streakChest: { everyDays: 7, gems: 30 }, active: null, result: null },
      },
    },
  ];
}
