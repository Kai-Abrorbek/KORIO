import {
  DEFAULT_LEARNING_COURSES,
  type LearnCourse,
} from "../../learning/model/learning-options";

export interface WordPreferences {
  autoPlay: boolean;
  cardIndex: number;
  section: number;
  unit: number;
}

function preferenceKey(course: LearnCourse, userId: string) {
  return `korio.telegram.word-scope:${encodeURIComponent(userId)}:${DEFAULT_LEARNING_COURSES[course].courseId}`;
}

export function readWordPreferences(
  course: LearnCourse,
  userId: string | undefined,
): WordPreferences | null {
  if (typeof window === "undefined" || !userId) return null;
  try {
    const value = JSON.parse(
      window.localStorage.getItem(preferenceKey(course, userId)) ?? "null",
    ) as Partial<WordPreferences> | null;
    if (
      !value ||
      !Number.isInteger(value.section) || Number(value.section) < 1 ||
      !Number.isInteger(value.unit) || Number(value.unit) < 1
    ) return null;
    return {
      autoPlay: typeof value.autoPlay === "boolean" ? value.autoPlay : true,
      cardIndex: Number.isInteger(value.cardIndex) && Number(value.cardIndex) >= 0
        ? Number(value.cardIndex) : 0,
      section: Number(value.section),
      unit: Number(value.unit),
    };
  } catch {
    return null;
  }
}

export function saveWordPreferences(
  course: LearnCourse,
  userId: string | undefined,
  preferences: WordPreferences,
) {
  if (typeof window === "undefined" || !userId) return;
  try {
    window.localStorage.setItem(preferenceKey(course, userId), JSON.stringify(preferences));
  } catch {
    // Storage can be unavailable in private Telegram webviews. Learning still works.
  }
}
