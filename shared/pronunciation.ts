/** Platform-neutral contracts and rules for the existing listening-card game. */
export type PronunciationLanguage = "ko" | "en";
export type PronLevel = "lv1" | "lv2" | "lv3" | "lv4";

export interface PronOption {
  word: string;
  /** Contrast label: a Korean jamo or an English phoneme, without IPA slashes. */
  jamo: string;
}

export interface PronStage {
  step: number;
  a: string;
  b: string;
  pos: "front" | "back" | "middle";
  /** Exactly one {0} marks the separately highlighted example word. */
  leftBubble: string;
  leftWord: string;
  rightBubble: string;
  rightWord: string;
  pairs: [PronOption, PronOption][];
}

export interface PronLevelData {
  storyKey: string;
  stages: PronStage[];
}

export const PRON_LEVELS: PronLevel[] = ["lv1", "lv2", "lv3", "lv4"];
export const HARD_UNLOCK_SCORE = 80;
export const STAGE_PASS_SCORE = 60;

export function resolvePronunciationLanguage(
  value: unknown,
  fallback: PronunciationLanguage = "ko",
): PronunciationLanguage {
  return value === "ko" || value === "en" ? value : fallback;
}

/** Korean keys remain byte-for-byte compatible with previously saved scores. */
export function pronunciationScoreKey(
  level: PronLevel,
  step: number,
  mode: "easy" | "hard",
  language: PronunciationLanguage = "ko",
): string {
  const key = `${level}:${step}:${mode}`;
  return language === "ko" ? key : `${language}:${key}`;
}

export function createPronunciationCurriculum(
  data: Record<PronLevel, PronLevelData>,
) {
  const findStage = (level: PronLevel, step: number) =>
    data[level].stages.find((stage) => stage.step === step);

  const stageQuestionCount = (level: PronLevel, step: number) =>
    (findStage(level, step)?.pairs.length ?? 0) * 2;

  const stageQuestionPlan = (
    level: PronLevel,
    step: number,
  ): { pair: [PronOption, PronOption]; answer: 0 | 1 }[] => {
    const stage = findStage(level, step);
    if (!stage) return [];
    const plan = stage.pairs.flatMap((pair) => [
      { pair, answer: 0 as const },
      { pair, answer: 1 as const },
    ]);
    // Preserve the original game: each word is heard once, then Fisher–Yates.
    for (let i = plan.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const current = plan[i];
      const replacement = plan[j];
      if (!current || !replacement) continue;
      plan[i] = replacement;
      plan[j] = current;
    }
    return plan;
  };

  return {
    data,
    levelTotal: (level: PronLevel) => data[level].stages.length * 2,
    findStage,
    stageQuestionPlan,
    stageQuestionCount,
    correctNeededFor: (level: PronLevel, step: number, score: number) => {
      const total = stageQuestionCount(level, step);
      return { total, need: Math.ceil((score / 100) * total) };
    },
  };
}
