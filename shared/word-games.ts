/** Data adapters for the existing word games, not a second game engine. */
export type GameLanguage = "ko" | "en";

export function resolveGameLanguage(
  value: unknown,
  fallback: GameLanguage = "ko",
): GameLanguage {
  return value === "en" || value === "ko" ? value : fallback;
}

// The legacy API calls the headword `ko`, even for an explicitly English pool.
export interface GameWordRecord {
  id: string;
  ko: string;
  uz: string;
  en: string;
  ru: string;
  meaningKo?: string;
}

export interface MatchingPair {
  id: string;
  ko: string;
  native: string;
}

export function gameWordMeaning(
  word: Omit<GameWordRecord, "id" | "ko">,
  locale: string,
): string {
  const base = locale.trim().toLowerCase().split(/[-_]/)[0];
  if (base === "ko") return word.meaningKo || word.uz || word.en;
  if (base === "uz") return word.uz || word.en;
  if (base === "ru") return word.ru || word.en || word.uz;
  return word.en || word.uz;
}

/** Preserve learned-first selection, excluding ambiguous duplicate card labels. */
export function matchingPool(
  learned: { korean: string; native: string }[],
  filler: GameWordRecord[],
  locale: string,
  language: GameLanguage = "ko",
): MatchingPair[] {
  const candidates = [
    ...learned.map((word) => ({
      id: word.korean,
      ko: word.korean,
      native: word.native,
    })),
    ...filler.map((word) => ({
      id: word.id,
      ko: word.ko,
      native: gameWordMeaning(word, locale),
    })),
  ];
  const ids = new Set<string>();
  const headwords = new Set<string>();
  const meanings = new Set<string>();
  return candidates.filter((pair) => {
    const headword = (pair.ko ?? "").trim().normalize("NFC").toLowerCase();
    const meaning = (pair.native ?? "").trim().normalize("NFC").toLowerCase();
    if (!pair.id || !headword || !meaning || headword === meaning) return false;
    if (language === "en" && !/^[a-z]+$/i.test(headword)) return false;
    if (ids.has(pair.id) || headwords.has(headword) || meanings.has(meaning))
      return false;
    ids.add(pair.id);
    headwords.add(headword);
    meanings.add(meaning);
    return true;
  });
}

/** Enable each English game only after that game's implementation is verified. */
export function isWordGameAvailable(
  id: string,
  language: GameLanguage,
): boolean {
  return language === "ko" || id === "matchGame" || id === "wordMemory";
}
