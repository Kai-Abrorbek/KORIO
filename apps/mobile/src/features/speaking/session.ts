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

// ── 문장 가리기 ────────────────────────────────────────────────────────────
//
// 뜻만 보고 말하는 연습을 단계적으로 만든다. 처음부터 다 가리면 따라 말할
// 근거가 없어서 그냥 막히고, 끝까지 다 보여주면 읽기 연습이 된다. 그래서
// 세션 안에서 진행할수록 가려지는 단어가 늘어나고, 중간중간 한 번은 한국어와
// 뜻을 전부 가려서 소리만 듣고 말하게 한다.
//
// 기준을 표현의 section 이 아니라 **세션 내 위치**로 잡은 이유: section 은
// 주제마다 분포가 달라서 어떤 주제는 첫 문장부터 다 가려지고 어떤 주제는
// 끝까지 하나도 안 가려진다. 위치 기준이면 어느 주제를 열어도 같은 곡선이다.

/** 이 문장 수까지는 그대로 보여준다 (워밍업) */
const MASK_WARMUP = 3;
/** 가리는 단어가 한 개 늘어나는 간격 */
const MASK_STEP = 5;
/** 이 간격마다 한 번은 듣기만 — 한국어·뜻 전부 가림 */
const LISTEN_ONLY_EVERY = 6;

export type SpeakingMaskMode = "none" | "partial" | "listen";

export interface SpeakingMask {
  mode: SpeakingMaskMode;
  /** 가릴 단어 번호 (공백 분리 기준, 오름차순) */
  hidden: number[];
  /** 뜻까지 가리는지 */
  hideMeaning: boolean;
}

const NO_MASK: SpeakingMask = { mode: "none", hidden: [], hideMeaning: false };

/** FNV-1a. 같은 문장이면 항상 같은 자리가 가려지게 하는 데만 쓴다 */
function hashString(text: string): number {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index++) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * `position` 은 세션 내 문장 번호(0-based), `seed` 는 표현 id.
 *
 * 가리는 자리를 무작위로 매번 다시 뽑지 않는다 — 같은 문장을 다시 말할 때
 * 자리가 바뀌면 어디를 못 맞혔는지 감각이 안 쌓인다. id 로 섞어서 고정한다.
 */
export function speakingMaskFor(
  position: number,
  sentence: string,
  seed: string,
): SpeakingMask {
  const words = sentence.split(/\s+/).filter(Boolean);
  if (!words.length || position < MASK_WARMUP) return NO_MASK;

  if ((position + 1) % LISTEN_ONLY_EVERY === 0) {
    return {
      mode: "listen",
      hidden: words.map((_, index) => index),
      hideMeaning: true,
    };
  }

  const count = Math.min(
    words.length,
    1 + Math.floor((position - MASK_WARMUP) / MASK_STEP),
  );
  const order = words
    .map((word, index) => ({ index, key: hashString(`${seed}:${index}:${word}`) }))
    .sort((a, b) => a.key - b.key)
    .map((item) => item.index);

  return {
    mode: "partial",
    hidden: order.slice(0, count).sort((a, b) => a - b),
    hideMeaning: false,
  };
}
