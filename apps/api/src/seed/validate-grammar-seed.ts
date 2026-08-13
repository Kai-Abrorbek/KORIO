/**
 * 문법 페이지 시드 검증.
 *
 * 문법 설명은 틀려도 화면이 멀쩡히 뜬다. 대신 학습자가 잘못 배운다.
 * 특히 받침 규칙은 표에 예시를 손으로 적기 때문에 조용히 어긋나기 쉬워서,
 * 규칙을 코드로 다시 계산해 대조한다.
 *
 * 실행: pnpm --filter api seed:validate-grammar
 */

import { GRAMMAR_SEED } from './data/grammar/grammar.data';

const errors: string[] = [];
const warnings: string[] = [];

const fail = (code: string, msg: string) => errors.push(`${code}: ${msg}`);
const warn = (code: string, msg: string) => warnings.push(`${code}: ${msg}`);

const L4 = (v: any) =>
  v &&
  typeof v === 'object' &&
  ['ko', 'uz', 'en', 'ru'].every(
    (l) => typeof v[l] === 'string' && v[l].trim().length > 0,
  );

/** 한글 음절에 받침이 있는지 */
function hasBatchim(word: string): boolean | null {
  const last = word.trim().slice(-1);
  const o = last.charCodeAt(0);
  if (!(o >= 0xac00 && o <= 0xd7a3)) return null;
  return (o - 0xac00) % 28 !== 0;
}

/**
 * 받침에 따라 갈리는 패턴. base 에서 규칙대로 만든 결과가
 * conjugations 의 result 와 같아야 한다.
 */
const BATCHIM_RULES: Record<string, { withB: string; withoutB: string }> = {
  'topic-eun-neun': { withB: '은', withoutB: '는' },
  'copula-ieyo': { withB: '이에요', withoutB: '예요' },
  'neg-i-ga-animnida': { withB: '이 아닙니다', withoutB: '가 아닙니다' },
  'exist-i-ga-isseoyo': { withB: '이 있어요', withoutB: '가 있어요' },
  'and-hago-gwa-wa': { withB: '과', withoutB: '와' },
  'here-is-n': { withB: '이에요', withoutB: '예요' },
};

const seenCodes = new Set<string>();
const seenOrder = new Set<string>();

for (const g of GRAMMAR_SEED) {
  const code: string = g.code;

  if (!code) {
    errors.push('code 없는 항목이 있다');
    continue;
  }
  if (seenCodes.has(code)) fail(code, 'code 가 중복이다');
  seenCodes.add(code);

  const section = g.section ?? 1;
  const slot = `${section}/${g.order}`;
  if (seenOrder.has(slot)) fail(code, `section ${section} 안에서 order 가 겹친다`);
  seenOrder.add(slot);

  if (!g.pattern) fail(code, 'pattern 이 없다');

  // 4개 언어
  for (const field of ['summary', 'explanation', 'conjugationRule'] as const) {
    if (!L4(g[field])) fail(code, `${field} 에 빠진 언어가 있다`);
  }
  for (const [i, tag] of (g.tags ?? []).entries()) {
    if (!L4(tag)) fail(code, `tags[${i}] 에 빠진 언어가 있다`);
  }
  for (const [i, ex] of (g.examples ?? []).entries()) {
    if (!ex.ko) fail(code, `examples[${i}] 에 한국어 문장이 없다`);
    if (!L4(ex.gloss)) fail(code, `examples[${i}].gloss 에 빠진 언어가 있다`);
    // 하이라이트는 문장 안에 실제로 있어야 화면에서 강조된다
    if (ex.highlight && !ex.ko.includes(ex.highlight)) {
      fail(code, `examples[${i}] 의 highlight '${ex.highlight}' 가 문장에 없다`);
    }
  }
  for (const [i, d] of (g.dialogue ?? []).entries()) {
    if (!d.ko) fail(code, `dialogue[${i}] 에 한국어가 없다`);
    if (!L4(d.gloss)) fail(code, `dialogue[${i}].gloss 에 빠진 언어가 있다`);
    if (d.highlight && !d.ko.includes(d.highlight)) {
      fail(code, `dialogue[${i}] 의 highlight '${d.highlight}' 가 문장에 없다`);
    }
    if (!['left', 'right'].includes(d.side)) {
      fail(code, `dialogue[${i}].side 는 left 또는 right 여야 한다`);
    }
  }
  for (const [i, c] of (g.cautions ?? []).entries()) {
    if (!L4(c)) fail(code, `cautions[${i}] 에 빠진 언어가 있다`);
  }
  if (g.similar && !L4(g.similar.note)) {
    fail(code, 'similar.note 에 빠진 언어가 있다');
  }

  // 퀴즈 — 정답이 정확히 하나여야 채점이 성립한다.
  // 문법당 5문항이 기준이다. 2~3개면 한 번 풀고 끝이라 규칙이 안 붙는다.
  const QUIZ_TARGET = 5;
  if (!g.quiz?.length) warn(code, '퀴즈가 없다');
  else if (g.quiz.length < QUIZ_TARGET) {
    warn(code, `퀴즈 ${g.quiz.length}문항 — ${QUIZ_TARGET}문항이 기준이다`);
  }
  for (const [i, q] of (g.quiz ?? []).entries()) {
    if (!L4(q.question)) fail(code, `quiz[${i}].question 에 빠진 언어가 있다`);
    const correct = (q.options ?? []).filter((o: any) => o.correct);
    if (correct.length !== 1) {
      fail(code, `quiz[${i}] 의 정답이 ${correct.length}개다 (정확히 1개)`);
    }
    if ((q.options ?? []).length < 3) {
      warn(code, `quiz[${i}] 보기가 ${q.options?.length ?? 0}개뿐이다`);
    }
    const texts = (q.options ?? []).map((o: any) => o.text);
    if (texts.length !== new Set(texts).size) {
      fail(code, `quiz[${i}] 보기에 중복이 있다`);
    }
  }

  // 받침 규칙 — 표의 예시를 규칙으로 다시 만들어 대조한다
  const rule = BATCHIM_RULES[code];
  if (rule) {
    if (!g.conjugations?.length) fail(code, '활용 예시가 없다');
    for (const { base, result } of g.conjugations ?? []) {
      const b = hasBatchim(base);
      if (b === null) {
        warn(code, `'${base}' 는 한글이 아니라 받침을 못 본다`);
        continue;
      }
      const expected = base + (b ? rule.withB : rule.withoutB);
      if (result !== expected) {
        fail(
          code,
          `'${base}' 는 받침이 ${b ? '있' : '없'}으니 '${expected}' 여야 하는데 '${result}' 라고 돼 있다`,
        );
      }
    }
  }
}

const bySection = new Map<number, string[]>();
for (const g of GRAMMAR_SEED) {
  const s = g.section ?? 1;
  bySection.set(s, [...(bySection.get(s) ?? []), g.pattern]);
}
console.log(`🔍 문법 ${GRAMMAR_SEED.length}개`);
for (const [s, list] of [...bySection.entries()].sort((a, b) => a[0] - b[0])) {
  console.log(`   섹션 ${s}  ${list.join(' · ')}`);
}

for (const w of warnings) console.warn(`⚠️  ${w}`);

if (errors.length) {
  console.error(`\n❌ ${errors.length}건`);
  errors.forEach((e) => console.error(`- ${e}`));
  process.exit(1);
}
console.log('\n🎉 문법 시드 검증 통과');
