/**
 * 선생님 한 줄을 한국어 구간 / 설명 언어 구간으로 나눈다.
 *
 * ── 왜 필요한가 ──
 *
 * 새 튜터는 "글로 생각하고(LLM) → 소리로 읽는다(TTS)" 구조다. LLM 은
 * 설명 언어 안에 한국어를 섞어 쓴다:
 *
 *   Aa, «저는 커피를 마시고 싶어요» demoqchi edingizmi?
 *
 * 이걸 한 목소리가 읽어야 하는데, 통째로 한 번에 읽히면 업체에 따라
 * 한국어를 우즈벡어 억양으로 읽거나 그 반대가 된다. 그래서 구간을 잘라
 * "이건 한국어로 읽어" 를 구간마다 따로 알려주고, **같은 목소리로** 합성한
 * 뒤 이어 붙인다.
 *
 * ── 왜 글자로 자르나 ──
 *
 * 한글은 한국어에만 쓰인다. 설명 언어는 라틴(우즈벡어·영어) 아니면
 * 키릴(러시아어)이라 한글과 절대 안 겹친다. 모델한테 태그를 달라고 하면
 * 빼먹거나 태그를 소리 내 읽는다 — 글자는 거짓말을 안 한다.
 *
 * 문장부호·공백·숫자는 언어가 없다. 기본은 **앞 구간에 붙인다** (쉼표나
 * 마침표가 앞말의 억양을 닫으니까). 예외 두 개:
 *   - 여는 따옴표/괄호는 뒷말 몫이다:  "Aa, «저는"  →  "Aa," + "«저는"
 *   - 숫자는 붙어 있는 말의 언어로 읽는다:  "3개" 는 한국어, "커피 2 ta" 의 2 는 우즈벡어
 */

export type SegmentLang = 'ko' | 'native';

export interface Segment {
  lang: SegmentLang;
  /** TTS 에 그대로 넣을 글. 한국어 구간은 따옴표를 뗐다 */
  text: string;
  /**
   * 이 구간 다음에 둘 쉼(ms). 따로 합성한 조각을 이어 붙일 때 쓴다.
   * 마지막 구간은 0.
   */
  pauseAfterMs: number;
}

const HANGUL = /[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7A3\uD7B0-\uD7FF]/;
const LETTER = /\p{L}/u;

/** 뒷말에 붙어야 하는 여는 따옴표·괄호 */
const OPENERS = '«“„‘‚"\'([「『〈《';
/**
 * 꼬리의 여는 부호. 공백(또는 맨 앞) 뒤에 올 때만 "여는" 부호다 —
 * `"안녕하세요" deng` 의 두 번째 `"` 는 글자에 바로 붙어 있으니 닫는 부호다.
 */
const TRAILING_OPENERS = new RegExp(`(?:^|(?<=\\s))[${escapeClass(OPENERS)}]+\\s*$`);
/** 한국어 구간에서는 따옴표를 전부 뗀다 — 소리 낼 게 아니다 */
const QUOTES = /[«»“”„‟‘’‚‛"'「」『』〈〉《》]/g;

/** 경계 문장부호 → 쉼 길이. 따로 합성한 조각 사이에 사람처럼 숨을 넣는다 */
const PAUSE_SENTENCE_MS = 350; // . ! ? …
const PAUSE_COLON_MS = 300; //   "Qani, takrorlang:" 다음 — 들을 준비 시간
const PAUSE_COMMA_MS = 180; //   , ; —
const PAUSE_INLINE_MS = 60; //   문장 가운데서 언어만 바뀔 때 ("«먹다» emas")

export function hasKorean(text: string): boolean {
  return HANGUL.test(text);
}

type Kind = SegmentLang | 'neutral';

function kindOf(ch: string): Kind {
  if (HANGUL.test(ch)) return 'ko';
  if (LETTER.test(ch)) return 'native';
  return 'neutral';
}

export function splitByKorean(input: string): Segment[] {
  const text = input.replace(/\s+/g, ' ').trim();
  if (!text) return [];

  const runs: { lang: SegmentLang; text: string }[] = [];
  let lead = ''; // 첫 글자가 나오기 전의 문장부호 — 첫 구간 몫

  for (const ch of text) {
    const kind = kindOf(ch);
    const cur = runs[runs.length - 1];

    if (kind === 'neutral') {
      if (cur) cur.text += ch;
      else lead += ch;
      continue;
    }
    if (cur?.lang === kind) {
      cur.text += ch;
      continue;
    }

    // 언어가 바뀌는 자리. 앞 구간 꼬리에서 새 구간 몫을 떼어 온다.
    let carry = lead;
    lead = '';
    if (cur) {
      const cut = carryStart(cur.text, kind);
      carry = cur.text.slice(cut) + carry;
      cur.text = cur.text.slice(0, cut);
    }
    runs.push({ lang: kind, text: carry + ch });
  }

  if (!runs.length) {
    // 글자가 하나도 없다 ("?!" 나 "123") — 설명 언어로 읽는다
    return [{ lang: 'native', text, pauseAfterMs: 0 }];
  }

  const out: Segment[] = [];
  for (const run of runs) {
    const spoken = speakable(run.text, run.lang);
    if (!spoken) continue;
    out.push({ lang: run.lang, text: spoken, pauseAfterMs: pauseAfter(run.text) });
  }

  // 글자 없는 조각을 버리면서 같은 언어가 나란히 붙을 수 있다 — 합친다
  const merged: Segment[] = [];
  for (const seg of out) {
    const prev = merged[merged.length - 1];
    if (prev?.lang === seg.lang) {
      prev.text = `${prev.text} ${seg.text}`;
      prev.pauseAfterMs = seg.pauseAfterMs;
    } else {
      merged.push({ ...seg });
    }
  }
  if (merged.length) merged[merged.length - 1].pauseAfterMs = 0;
  return merged;
}

/**
 * 앞 구간(prev)의 어디부터를 다음 구간(next 언어) 으로 넘길지.
 *
 *   "Aa, «"        + 저…   → "«" 를 넘긴다
 *   "Men 3"        + 개    → "3" 을 넘긴다 (붙어 있는 숫자는 한국어로 읽는다)
 *   "커피 2 "      + ta    → "2 " 를 넘긴다 (띄어 쓴 숫자는 뒷말로 읽는다)
 */
function carryStart(prev: string, next: SegmentLang): number {
  let cut = prev.length;

  // 여는 따옴표·괄호 (+ 그 앞뒤 공백)
  const opener = TRAILING_OPENERS.exec(prev);
  if (opener) cut = opener.index;

  const head = prev.slice(0, cut);
  if (next === 'ko') {
    // 한글에 바로 붙은 숫자: "3개", "10분"
    const glued = /\p{Nd}+$/u.exec(head);
    if (glued && cut === prev.length) cut = glued.index;
  } else {
    // 띄어 쓴 숫자는 뒤따르는 설명 언어 몫: "아메리카노 2 ta"
    const spaced = /(?<=\s)\p{Nd}[\p{Nd}.,]*\s*$/u.exec(head);
    if (spaced) cut = spaced.index;
  }
  return cut;
}

/** TTS 에 넣을 모양으로 다듬는다. 읽을 글자가 없으면 빈 문자열 */
function speakable(raw: string, lang: SegmentLang): string {
  let t = raw;
  if (lang === 'ko') t = t.replace(QUOTES, ' ');
  t = t
    .replace(/\s+/g, ' ')
    // 조각 맨 앞의 닫는 부호·쉼표 (원문 맨 앞에서만 생긴다)
    .replace(/^[\s»”’)\]」』〉》,.;:!?—–-]+/, '')
    // 조각 끝의 대시는 소리가 없다 — 쉼은 pauseAfterMs 가 만든다
    .replace(/[\s—–-]+$/, '')
    .trim();
  return LETTER.test(t) ? t : '';
}

function pauseAfter(raw: string): number {
  const tail = raw.replace(QUOTES, '').trimEnd();
  if (/[.!?…]$/.test(tail)) return PAUSE_SENTENCE_MS;
  if (/:$/.test(tail)) return PAUSE_COLON_MS;
  if (/[,;—–-]$/.test(tail)) return PAUSE_COMMA_MS;
  return PAUSE_INLINE_MS;
}

function escapeClass(chars: string): string {
  return chars.replace(/[\\\]\[^-]/g, '\\$&');
}
