/**
 * 게임에 쓸 단어를 고르는 규칙.
 *
 * 게임은 **배우는 자리가 아니라 굳히는 자리**다. 처음 보는 단어를 카드로
 * 뒤집어 봐야 외워지지 않는다. 그래서 이미 만난 단어를 먼저 쓰고, 모자랄
 * 때만 쉬운 것부터 채운다.
 *
 * 순수 함수로 모아둔다 — DB 없이 규칙만 검사할 수 있게.
 */

/** 게임 판에 올릴 수 있는 단어인지. 길면 카드에서 잘리고 띄어쓰기가 있으면 짝이 안 맞는다 */
export function isPlayable(
  headword: string,
  maxLen: number,
  meaning: { uz?: string; en?: string; ru?: string; ko?: string },
): boolean {
  const w = (headword ?? '').trim();
  if (!w || w.length > maxLen) return false;
  // 띄어쓰기·문장부호가 있으면 한 낱말이 아니다 (구·문장이 섞여 있다)
  if (/[\s.,!?~·\-]/.test(w)) return false;
  // 한글만. 숫자·라틴 문자가 섞인 항목은 게임에 안 맞는다
  if (!/^[가-힣]+$/.test(w)) return false;
  // 뜻이 최소 두 언어는 있어야 짝맞추기·OX 를 만들 수 있다
  const filled = [meaning.uz, meaning.en, meaning.ru, meaning.ko].filter(
    (v) => !!v && v.trim().length > 0,
  );
  return filled.length >= 2;
}

/**
 * 끝말잇기에서 다음 단어가 시작할 수 있는 글자들.
 *
 * 두음법칙 때문에 하나가 아니다. "사랑" 다음에는 "랑" 뿐 아니라 "낭" 으로
 * 시작하는 단어도 인정하는 게 한국어를 아는 사람의 상식이다. 이걸 빼면
 * 유저가 맞는 답을 냈는데 틀렸다고 하는 상황이 계속 생긴다.
 */
export function allowedStarts(lastChar: string): string[] {
  const ch = (lastChar ?? '').trim().slice(-1);
    if (!/^[가-힣]$/.test(ch)) return [];

  const code = ch.charCodeAt(0) - 0xac00;
  const cho = Math.floor(code / 588);
  const jung = Math.floor((code % 588) / 28);
  const jong = code % 28;

  const out = new Set<string>([ch]);
  const make = (c: number, j: number, t: number) =>
    String.fromCharCode(0xac00 + c * 588 + j * 28 + t);

  // ㄹ(5) → ㄴ(2): 라→나, 로→노 …
  if (cho === 5) out.add(make(2, jung, jong));
  // ㄹ/ㄴ + ㅣ계 모음 → ㅇ(11): 력→역, 뇨→요 …
  //   ㅣ(20) ㅑ(2) ㅕ(6) ㅛ(12) ㅠ(17) ㅒ(3) ㅖ(7)
  const I_LIKE = [20, 2, 6, 12, 17, 3, 7];
  if ((cho === 5 || cho === 2) && I_LIKE.includes(jung)) {
    out.add(make(11, jung, jong));
  }

  return [...out];
}

/** 끝말잇기 판정 결과. 앱은 이 코드로 i18n 문구를 고른다 */
export type ChainReject =
  | 'TOO_SHORT'
  | 'NOT_HANGUL'
  | 'WRONG_START'
  | 'ALREADY_USED'
  | 'UNKNOWN_WORD';

export interface ChainCheck {
  ok: boolean;
  reason?: ChainReject;
}

/**
 * 사전 조회 **전에** 걸러낼 수 있는 것들.
 *
 * DB 를 때리기 전에 하는 검사라, 오타 한 번에 조회가 나가지 않는다.
 */
export function precheckChainWord(
  word: string,
  prev: string | null,
  used: string[],
): ChainCheck {
  const w = (word ?? '').trim();
  if (w.length < 2) return { ok: false, reason: 'TOO_SHORT' };
  if (!/^[가-힣]+$/.test(w)) return { ok: false, reason: 'NOT_HANGUL' };
  if (used.some((u) => u.trim() === w)) {
    return { ok: false, reason: 'ALREADY_USED' };
  }
  if (prev) {
    const starts = allowedStarts(prev.trim().slice(-1));
    if (starts.length && !starts.includes(w[0])) {
      return { ok: false, reason: 'WRONG_START' };
    }
  }
  return { ok: true };
}
