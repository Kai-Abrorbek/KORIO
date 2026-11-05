import type { StorySentence } from "./stories.types";

/**
 * 재생 위치(ms) → 지금 문장·단어. 화면도 오디오도 모르는 순수 함수라
 * scripts/story-timing.test.cjs 가 그대로 돌린다.
 *
 * 단어 쪼개기와 정규화는 서버(apps/api/src/stories/story-content.util.ts)와 같은 규칙이다 —
 * 단어 타이밍이 이 순서·개수와 1:1 로 맞아야 i 번째 단어에 불이 켜진다.
 */

export interface PlayerPosition {
  /** 지금 문장. 아직 시작 전이면 -1 */
  sentence: number;
  /** 지금 단어. -1 = 문장은 왔지만 첫 단어 전, words.length = 다 읽음 */
  word: number;
}

/** 문장 시작 바로 앞(40ms)에 미리 넘어가야 첫 단어가 늦게 켜지지 않는다 */
const SENTENCE_LEAD_MS = 40;
/** 마지막 단어가 끝나고 이만큼 지나면 쉼 — 문장 전체를 "읽음" 으로 */
const SENTENCE_TAIL_MS = 60;

export function locateInStory(
  sentences: Pick<StorySentence, "startMs" | "words">[],
  ms: number,
): PlayerPosition {
  let sentence = 0;
  for (let i = 0; i < sentences.length; i += 1) {
    if (sentences[i].startMs <= ms + SENTENCE_LEAD_MS) sentence = i;
    else break;
  }
  const words = sentences[sentence]?.words ?? [];
  let word = -1;
  for (let i = 0; i < words.length; i += 1) {
    if (words[i].startMs <= ms) word = i;
    else break;
  }
  const last = words[words.length - 1];
  if (last && ms > last.endMs + SENTENCE_TAIL_MS) word = words.length;
  return { sentence, word };
}

export const tokenize = (text: string) => text.split(/\s+/).filter(Boolean);

/**
 * 소문자 + 앞뒤 문장부호 제거 ("“Brave”," → "brave", "«Привет!»" → "привет").
 * 글자 판단은 유니코드 기준이라 어느 언어 이야기든 핵심 단어를 찾는다.
 */
export function normalizeToken(token: string): string {
  return token
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
}
