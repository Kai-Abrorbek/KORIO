import type { AssessResult } from "@/services/stt.service";

export type SpeakingResults = Record<string, AssessResult>;

/** A retry replaces the previous attempt; a phrase only counts once. */
export function summarizeSpeaking(results: SpeakingResults) {
  const assessed = Object.entries(results).filter(([, result]) => result.status === "success");
  return {
    spoken: assessed.length,
    average: assessed.length
      ? Math.round(assessed.reduce((sum, [, result]) => sum + result.scores.pron, 0) / assessed.length)
      : null,
    retryIds: assessed.filter(([, result]) => !result.passed).map(([id]) => id),
  };
}

export function normalizeSpeakingWord(word: string) {
  return word.normalize("NFC").replace(/[^\p{L}\p{N}]/gu, "");
}
