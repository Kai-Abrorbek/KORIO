/** Only call from an explicit forward action; displaying a card never finishes it. */
export function getWordBrowseAdvance(
  cardIndex: number,
  total: number,
): { type: "blocked" } | { type: "next"; index: number } | { type: "offer" } {
  if (
    !Number.isSafeInteger(cardIndex) ||
    !Number.isSafeInteger(total) ||
    total < 1 ||
    cardIndex < 0 ||
    cardIndex >= total
  ) {
    return { type: "blocked" };
  }
  return cardIndex === total - 1
    ? { type: "offer" }
    : { type: "next", index: cardIndex + 1 };
}

/** Leave enough time to read correct feedback before the next recall card. */
export const WORD_RECALL_ADVANCE_MS = 650;
