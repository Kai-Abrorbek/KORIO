import { ChainWord } from "@/types/word-chain";
import { WORDS_BY_START, WORD_DICT } from "@/mocks/word-chain.words";

export type ValidationResult =
  | { ok: true; chainWord: ChainWord }
  | {
      ok: false;
      reason: "wrong-start" | "not-in-dict" | "already-used" | "too-short";
    };

/** 단어의 마지막 음절 */
export function lastSyllable(word: string): string {
  return word[word.length - 1];
}

/** 유저 입력 검증 */
export function validateUserWord(
  input: string,
  requiredStart: string,
  usedWords: Set<string>,
): ValidationResult {
  const word = input.trim();
  if (word.length < 2) return { ok: false, reason: "too-short" };
  if (word[0] !== requiredStart) return { ok: false, reason: "wrong-start" };
  if (usedWords.has(word)) return { ok: false, reason: "already-used" };
  const chainWord = WORD_DICT.get(word);
  if (!chainWord) return { ok: false, reason: "not-in-dict" };
  return { ok: true, chainWord };
}

/** AI가 단어를 찾음. 없으면 null (=항복) */
export function pickAiWord(
  requiredStart: string,
  usedWords: Set<string>,
): ChainWord | null {
  const candidates = WORDS_BY_START.get(requiredStart);
  if (!candidates) return null;
  const available = candidates.filter((c) => !usedWords.has(c.word));
  if (available.length === 0) return null;
  // 랜덤 선택 (AI가 너무 똑똑하면 재미 없음)
  return available[Math.floor(Math.random() * available.length)];
}

/** 힌트: 가능한 단어 최대 3개 (유저가 모를 때) */
export function getHints(
  requiredStart: string,
  usedWords: Set<string>,
  count = 3,
): ChainWord[] {
  const candidates = WORDS_BY_START.get(requiredStart);
  if (!candidates) return [];
  const available = candidates.filter((c) => !usedWords.has(c.word));
  // 셔플
  return [...available].sort(() => Math.random() - 0.5).slice(0, count);
}

/** AI의 첫 단어 (게임 시작 시) */
export function pickAiStarter(): ChainWord {
  // 한국어에서 흔한 시작 글자 선호 (게임이 빨리 죽지 않게)
  const goodStarters = ["가", "나", "다", "마", "바", "사", "아", "자", "하"];
  for (const s of goodStarters) {
    const list = WORDS_BY_START.get(s);
    if (list && list.length > 0) {
      return list[Math.floor(Math.random() * list.length)];
    }
  }
  // fallback
  return WORDS_BY_START.values().next().value![0];
}

/** 점수 계산: 글자 수 기반 + 콤보 보너스 */
export function calcTurnScore(word: string, combo: number): number {
  const base = word.length * 10;
  const bonus = Math.floor(base * (combo * 0.2));
  return base + bonus;
}
