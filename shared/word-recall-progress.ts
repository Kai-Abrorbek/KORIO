/** One presentation of a recall card, retained across retries of a failed save. */
export interface RecallSaveAttempt {
  reviewed: boolean;
  mastered: boolean;
  pending: Promise<boolean> | null;
}

export const createRecallSaveAttempt = (): RecallSaveAttempt => ({
  reviewed: false,
  mastered: false,
  pending: null,
});

/** Review first, then acknowledge independent recall through the existing master API. */
export async function saveRecallProgress({
  attempt,
  wordId,
  correct,
  hadHelp,
  review,
  master,
  isActive,
}: {
  attempt: RecallSaveAttempt;
  wordId: string;
  correct: boolean;
  hadHelp: boolean;
  review: (id: string, result: "good" | "again") => Promise<unknown>;
  master: (id: string) => Promise<unknown>;
  isActive: () => boolean;
}): Promise<boolean> {
  if (attempt.pending) return attempt.pending;
  const operation = (async () => {
    if (!isActive()) return false;
    if (!attempt.reviewed) {
      await review(wordId, correct && !hadHelp ? "good" : "again");
      attempt.reviewed = true;
    }
    if (correct && !hadHelp && !attempt.mastered) {
      if (!isActive()) return false;
      await master(wordId);
      attempt.mastered = true;
    }
    return isActive();
  })();
  attempt.pending = operation;
  try {
    return await operation;
  } finally {
    if (attempt.pending === operation) attempt.pending = null;
  }
}
