import { LessonCompleteStats } from "@/types/lesson-complete";

export const MOCK_LESSON_COMPLETE: LessonCompleteStats = {
  xp: 32,
  accuracy: {
    value: 62,
    labelKey: "lessonComplete.labels.good",
  },
  time: {
    value: "4:12",
    labelKey: "lessonComplete.labels.fast",
  },
};

// accuracy 값에 따라 라벨 키 선택하는 헬퍼
export function getAccuracyLabelKey(value: number): string {
  if (value >= 95) return "lessonComplete.labels.perfect";
  if (value >= 80) return "lessonComplete.labels.excellent";
  if (value >= 60) return "lessonComplete.labels.good";
  return "lessonComplete.labels.tryHarder";
}
