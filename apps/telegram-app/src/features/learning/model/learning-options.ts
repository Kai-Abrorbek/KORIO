export type StudyMode = "guided" | "free";

export type LearnMode =
  | "vocabulary"
  | "grammarPractice"
  | "grammar"
  | "expression"
  | "speaking"
  | "conversation"
  | "listening"
  | "topik"
  // 글자부터 — 영어 코스의 알파벳 (한국어 한글은 아직 단발 바로가기라 모드가 아니다)
  | "alphabet";

/**
 * 학습 코스(= 배우는 언어). 학습 모드와 다른 축이다 — "무엇을" 배우느냐가 코스,
 * "어떻게" 배우느냐가 모드. 앱 constants/learnCourses · api COURSE_MODES 와 같은 표다.
 * 코스를 늘릴 때: 여기 한 줄 + 서버 COURSE_MODES + userCourses.list.<key> 번역.
 */
export type LearnCourse = "ko" | "en";

export const LEARN_COURSES: Record<
  LearnCourse,
  { key: "korean" | "english"; flag: string; modes: readonly LearnMode[] }
> = {
  ko: {
    key: "korean",
    flag: "🇰🇷",
    modes: [
      "vocabulary",
      "grammarPractice",
      "grammar",
      "expression",
      "speaking",
      "conversation",
      "listening",
      "topik",
    ],
  },
  // conversation = AI 음성 튜터 (영어 튜터)
  en: { key: "english", flag: "🇺🇸", modes: ["alphabet", "vocabulary", "grammarPractice", "grammar", "expression", "speaking", "conversation"] },
};

/**
 * 영어 코스의 분야 선택 화면에 노출하는 카드.
 *
 * `hangul`은 화면에서 알파벳 카드로 바뀌고, 단어 카드·발음·게임은
 * 학습 모드와 별개의 바로가기라 `LEARN_COURSES.en.modes`에 포함되지 않는다.
 */
export const ENGLISH_CATEGORY_CARDS = [
  "hangul",
  "vocabulary",
  "grammar",
  "grammarPractice",
  "expression",
  "speaking",
  "wordCard",
  "pronunciation",
  "games",
  "conversation",
] as const;

export const DEFAULT_LEARNING_COURSES = {
  ko: { courseId: "ko-general", targetLanguage: "ko", speechLocale: "ko-KR" },
  en: { courseId: "en-general", targetLanguage: "en", speechLocale: "en-US" },
} as const;

export function learningScopePath(path: string, course: LearnCourse): string {
  if (!isCourseScopedRequest(path)) return path;
  const [pathname, search = ""] = path.split("?");
  const query = new URLSearchParams(search);
  const scope = query.has("courseId")
    ? Object.values(DEFAULT_LEARNING_COURSES).find(
        (entry) => entry.courseId === query.get("courseId"),
      )
    : query.has("targetLanguage")
      ? Object.values(DEFAULT_LEARNING_COURSES).find(
          (entry) => entry.targetLanguage === query.get("targetLanguage"),
        )
      : DEFAULT_LEARNING_COURSES[course];
  if (scope && !query.has("courseId")) query.set("courseId", scope.courseId);
  if (scope && !query.has("targetLanguage"))
    query.set("targetLanguage", scope.targetLanguage);
  return `${pathname}?${query.toString()}`;
}

export const isLearningRequest = (path: string): boolean =>
  /^\/(words|lessons|grammar|study-path|learn-progress|speech|expressions)(?:[/?]|$)/.test(path);

// 일일 퀘스트도 지금 코스를 붙여 보낸다 — 문제 퀘스트는 코스마다 따로 센다 (공통 퀘스트는 그대로).
// 학습 요청은 아니라서 코스가 바뀌어도 응답을 버리지 않고 lang 도 건드리지 않는다.
export const isCourseScopedRequest = (path: string): boolean =>
  isLearningRequest(path) || /^\/retention(?:[/?]|$)/.test(path);

export function learnCourseOf(value: unknown): LearnCourse {
  return value === "en" ? "en" : "ko";
}

export type LearningIconName =
  | "albums"
  | "barbell"
  | "book"
  | "chatbubble"
  | "chatbubbles"
  | "compass"
  | "construct"
  | "footsteps"
  | "game"
  | "headset"
  | "lock"
  | "mic"
  | "ribbon"
  | "text";

export type LearningFeature =
  | "lesson"
  | "words"
  | "games"
  | "hangul"
  | "pronunciation"
  | "grammar"
  | "expression"
  | "listening"
  | "topik"
  | "tutor";

export interface LearningCategory {
  category: string;
  color: string;
  description: string;
  feature: LearningFeature;
  guided: boolean;
  icon: LearningIconName;
  key: string;
  label: string;
}

export const LEARNING_CATEGORIES: LearningCategory[] = [
  {
    key: "hangul",
    category: "hangul",
    icon: "text",
    color: "#7e57c2",
    guided: true,
    feature: "hangul",
    label: "Hangul",
    description: "Harflardan boshlang",
  },
  {
    key: "vocab",
    category: "vocabulary",
    icon: "book",
    color: "#ff7043",
    guided: false,
    feature: "lesson",
    label: "Lug'at",
    description: "So'zlarni o'rganing",
  },
  {
    key: "grammar",
    category: "grammar",
    icon: "construct",
    color: "#5c6bc0",
    guided: false,
    feature: "grammar",
    label: "Grammatika",
    description: "Qoidalarni o'rganing",
  },
  {
    key: "grammarPractice",
    category: "grammarPractice",
    icon: "barbell",
    color: "#7e57c2",
    guided: false,
    feature: "lesson",
    label: "Grammatika mashqi",
    description: "Bo‘sh joy va gap yig‘ish",
  },
  {
    key: "topik",
    category: "topik",
    icon: "ribbon",
    color: "#ab47bc",
    guided: true,
    feature: "topik",
    label: "TOPIK",
    description: "Imtihonga tayyorgarlik",
  },
  {
    key: "conversation",
    category: "conversation",
    icon: "chatbubbles",
    color: "#ec407a",
    guided: true,
    feature: "tutor",
    label: "Jonli suhbat",
    description: "Haqiqiy suhbat mashqi",
  },
  {
    key: "speaking",
    category: "speaking",
    icon: "mic",
    color: "#776ee2",
    guided: false,
    feature: "expression",
    label: "Gapirish",
    description: "Mavzu bo'yicha gaplarni takrorlang",
  },
  {
    key: "expression",
    category: "expression",
    icon: "chatbubble",
    color: "#26a69a",
    guided: false,
    feature: "expression",
    label: "Iboralar",
    description: "Ko'p ishlatiladigan iboralar",
  },
  {
    key: "listening",
    category: "listening",
    icon: "headset",
    color: "#42a5f5",
    guided: true,
    feature: "listening",
    label: "Tinglash",
    description: "Tinglash mashqi",
  },
  {
    key: "pronunciation",
    category: "pronunciation",
    icon: "mic",
    color: "#ffa726",
    guided: true,
    feature: "pronunciation",
    label: "Talaffuz",
    description: "Tovushlarni farqlang",
  },
  {
    key: "games",
    category: "games",
    icon: "game",
    color: "#5f4fd8",
    guided: true,
    feature: "games",
    label: "O'yinlar",
    description: "O'ynab takrorlang",
  },
  {
    key: "wordCard",
    category: "wordCard",
    icon: "albums",
    color: "#26c6da",
    guided: true,
    feature: "words",
    label: "So'z kartalari",
    description: "Kartalarni varaqlab yodlang",
  },
];

const FREE_FEATURES: LearningFeature[] = [
  "lesson",
  "words",
  "games",
  "hangul",
  "pronunciation",
];

const TASTER_FEATURES: LearningFeature[] = ["tutor"];

export function hasLearningTaster(feature: LearningFeature): boolean {
  return TASTER_FEATURES.includes(feature);
}

export function canUseLearningFeature(
  user: { isSuper?: boolean; superExpiresAt?: string | null },
  feature: LearningFeature,
): boolean {
  if (FREE_FEATURES.includes(feature)) return true;
  if (!user.isSuper) return false;
  if (!user.superExpiresAt) return true;
  const expiration = new Date(user.superExpiresAt).getTime();
  return Number.isNaN(expiration) || expiration > Date.now();
}

export function learningDestination(
  category: string,
  topikLevel: "1" | "2" = "1",
  course: LearnCourse = "ko",
): string | null {
  const destinations: Record<string, string> = {
    // 회화는 코스마다 다른 튜터다 — 영어 코스면 영어 튜터
    conversation: course === "en" ? "/tutor?lang=en" : "/tutor",
    expression: "/expressions",
    games: "/games",
    grammar: "/grammar-list",
    grammarPractice: "/roadmap?category=grammar",
    hangul: "/hangul",
    listening: "/reading-listening-levels",
    pronunciation: "/pronunciation-practice",
    speaking: "/speaking",
    topik: `/topik-sections?level=${topikLevel}`,
    vocabulary: "/roadmap",
    alphabet: "/alphabet",
    wordCard: "/word-study",
  };
  return destinations[category] ?? null;
}

/**
 * 학습 로드의 목적지. 급수를 아직 안 골랐으면 고르는 화면부터.
 * 로컬 hasPickedLevel 은 마지막 getMe 코스의 값이라, 다른 코스로 막 바꾼 거면 믿지 않고
 * 로드로 보낸다 — 서버가 그 코스의 levelPicked 를 주고 화면이 급수 고르기로 넘긴다.
 */
export function guidedDestination(
  hasPickedLevel?: boolean,
  course: LearnCourse = "ko",
): string {
  if (course !== "ko") return "/study-path";
  return hasPickedLevel ? "/study-path" : "/study-level";
}

export function continueLearningDestination(user: {
  learnCourse?: string;
  hasPickedLevel?: boolean;
  learnMode?: string;
  studyMode?: StudyMode;
  topikLevel?: "1" | "2";
}): string {
  if (!user.learnMode) return "/courses";
  // 학습 로드는 코스마다 같은 구조 (영어도 그 코스의 하루치)
  if (user.studyMode === "guided" && user.learnMode === "vocabulary") {
    return guidedDestination(user.hasPickedLevel, learnCourseOf(user.learnCourse));
  }
  return (
    learningDestination(
      user.learnMode,
      user.topikLevel ?? "1",
      learnCourseOf(user.learnCourse),
    ) ??
    "/course-categories"
  );
}
