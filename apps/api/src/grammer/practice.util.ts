/**
 * 문법 연습 문제 자동 생성.
 *
 * 예문의 highlight 가 곧 그 문법 표현("먹고 있어요")이라, 거기를 빈칸으로 파면
 * 어휘가 아니라 문법을 정확히 겨냥한 문제가 된다. 문법을 시드에 추가하면
 * 문제도 따라서 늘어난다.
 */

export type PracticeKind = 'write' | 'build';

export interface WriteQuestion {
  kind: 'write';
  id: string;
  code: string; // 문법 code
  pattern: string; // 문법 패턴 (해설용)
  prompt: string; // 유저 언어 뜻
  prefix: string; // 빈칸 앞 한국어
  answer: string; // 빈칸에 들어갈 말 (= highlight)
  suffix: string; // 빈칸 뒤 한국어
  full: string; // 완성 문장
}

export interface BuildRow {
  options: string[];
  correct: string;
}

export interface BuildQuestion {
  kind: 'build';
  id: string;
  code: string;
  pattern: string;
  prompt: string; // 유저 언어 뜻
  rows: BuildRow[]; // 어절 단위 선택
  full: string; // 완성 문장
}

export type PracticeQuestion = WriteQuestion | BuildQuestion;

interface SourceExample {
  ko: string;
  gloss: string;
  highlight?: string;
}

export interface SourceGrammar {
  code: string;
  pattern: string;
  examples: SourceExample[];
  conjugations: { base: string; result: string }[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 빈칸 문제: highlight 를 파낸다 */
export function buildWriteQuestion(
  g: SourceGrammar,
  ex: SourceExample,
  idx: number,
): WriteQuestion | null {
  if (!ex.highlight || !ex.ko.includes(ex.highlight)) return null;

  const at = ex.ko.indexOf(ex.highlight);
  return {
    kind: 'write',
    id: `w-${g.code}-${idx}`,
    code: g.code,
    pattern: g.pattern,
    prompt: ex.gloss,
    prefix: ex.ko.slice(0, at),
    answer: ex.highlight,
    suffix: ex.ko.slice(at + ex.highlight.length),
    full: ex.ko,
  };
}

/**
 * 조립 문제: 문장을 어절로 쪼개고 각 자리에 오답을 섞는다.
 * 오답은 같은 문장의 다른 어절 + 다른 문법의 어절에서 가져온다
 * (엉뚱한 단어를 넣으면 너무 티가 나서 문제가 안 된다).
 */
export function buildBuildQuestion(
  g: SourceGrammar,
  ex: SourceExample,
  distractorPool: string[],
  idx: number,
  optionsPerRow = 3,
): BuildQuestion | null {
  const tokens = ex.ko.trim().split(/\s+/).filter(Boolean);
  // 어절이 너무 적으면 고를 게 없고, 너무 많으면 화면을 넘는다
  if (tokens.length < 2 || tokens.length > 5) return null;

  const rows: BuildRow[] = tokens.map((correct) => {
    const pool = distractorPool.filter(
      (w) => w !== correct && !tokens.includes(w),
    );
    const picked = shuffle(pool).slice(0, optionsPerRow - 1);
    return { options: shuffle([correct, ...picked]), correct };
  });

  // 오답을 하나도 못 붙인 자리가 있으면 문제가 성립하지 않는다
  if (rows.some((r) => r.options.length < 2)) return null;

  return {
    kind: 'build',
    id: `b-${g.code}-${idx}`,
    code: g.code,
    pattern: g.pattern,
    prompt: ex.gloss,
    rows,
    full: ex.ko,
  };
}

/** 오답 후보: 전체 문법의 어절 + 활용형 */
export function collectDistractors(all: SourceGrammar[]): string[] {
  const set = new Set<string>();
  for (const g of all) {
    for (const ex of g.examples) {
      ex.ko
        .trim()
        .split(/\s+/)
        .forEach((w) => w && set.add(w));
    }
    for (const c of g.conjugations) {
      if (c.result) set.add(c.result);
    }
  }
  return [...set];
}

/**
 * 두 타입을 섞어서 문제 세트 생성.
 * 같은 문법이 연달아 나오지 않게 문법 단위로 라운드로빈한다.
 */
export function generatePracticeSet(
  grammars: SourceGrammar[],
  limit = 12,
): PracticeQuestion[] {
  const distractors = collectDistractors(grammars);

  // 문법별로 만들 수 있는 문제를 모아둔다
  const perGrammar: PracticeQuestion[][] = grammars.map((g) => {
    const made: PracticeQuestion[] = [];
    g.examples.forEach((ex, i) => {
      if (!ex.gloss || !ex.ko) return;
      const w = buildWriteQuestion(g, ex, i);
      if (w) made.push(w);
      const b = buildBuildQuestion(g, ex, distractors, i);
      if (b) made.push(b);
    });
    return shuffle(made);
  });

  // 라운드로빈으로 뽑아 같은 문법이 몰리지 않게
  const out: PracticeQuestion[] = [];
  let round = 0;
  while (out.length < limit) {
    let added = false;
    for (const list of perGrammar) {
      if (round < list.length) {
        out.push(list[round]);
        added = true;
        if (out.length >= limit) break;
      }
    }
    if (!added) break; // 재료 소진
    round++;
  }

  return out;
}
