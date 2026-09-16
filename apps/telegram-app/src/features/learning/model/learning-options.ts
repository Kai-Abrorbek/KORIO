export type StudyMode = "guided" | "free";

export type LearnMode =
  | "vocabulary"
  | "grammarPractice"
  | "grammar"
  | "expression"
  | "speaking"
  | "conversation"
  | "listening"
  | "topik";

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
): string | null {
  const destinations: Record<string, string> = {
    conversation: "/tutor",
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
    wordCard: "/word-study",
  };
  return destinations[category] ?? null;
}

export function guidedDestination(hasPickedLevel?: boolean): string {
  return hasPickedLevel ? "/study-path" : "/study-level";
}

export function continueLearningDestination(user: {
  hasPickedLevel?: boolean;
  learnMode?: string;
  studyMode?: StudyMode;
  topikLevel?: "1" | "2";
}): string {
  if (!user.learnMode) return "/courses";
  if (user.studyMode === "guided" && user.learnMode === "vocabulary") {
    return guidedDestination(user.hasPickedLevel);
  }
  return (
    learningDestination(user.learnMode, user.topikLevel ?? "1") ??
    "/course-categories"
  );
}
