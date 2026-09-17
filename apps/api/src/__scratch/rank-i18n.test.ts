/**
 * 순위 화면 문구가 네 언어에 다 있는지.
 *
 * 하나라도 빠지면 그 언어 유저에게 **키 문자열이 그대로 보인다**
 * (`rank.tier.legend` 같은 게 화면에 뜬다). 테스트 없이는 우즈벡어로 앱을
 * 켜 보기 전까지 아무도 모른다.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as fs from 'node:fs';
import * as path from 'node:path';

const LOCALES = ['ko', 'uz', 'en', 'ru'] as const;
const DIR = path.join(__dirname, '../../../mobile/src/locales');

/** rank 블록만 잘라서 키 경로를 뽑는다 (ts 파일이라 파싱 대신 구조로 읽는다) */
function rankKeys(src: string): string[] {
  const start = src.indexOf('\n  rank: {');
  assert.ok(start > 0, 'rank 블록이 없다');
  let depth = 0;
  let i = src.indexOf('{', start);
  const from = i;
  for (; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
      depth--;
      if (depth === 0) break;
    }
  }
  const block = src.slice(from, i + 1);

  const keys: string[] = [];
  const stack: string[] = [];
  for (const line of block.split('\n')) {
    const open = line.match(/^\s*([a-zA-Z0-9_]+):\s*\{\s*$/);
    if (open) {
      stack.push(open[1]!);
      continue;
    }
    if (/^\s*\},?\s*$/.test(line)) {
      stack.pop();
      continue;
    }
    const leaf = line.match(/^\s*([a-zA-Z0-9_]+):\s*["'`]/);
    if (leaf) keys.push([...stack, leaf[1]!].join('.'));
  }
  return keys.sort();
}

const byLang = Object.fromEntries(
  LOCALES.map((l) => [
    l,
    rankKeys(fs.readFileSync(path.join(DIR, `${l}.ts`), 'utf8')),
  ]),
) as Record<(typeof LOCALES)[number], string[]>;

test('네 언어의 rank 키가 정확히 같다', () => {
  const base = byLang.ko;
  assert.ok(base.length >= 20, `키가 너무 적다 (${base.length})`);
  for (const lang of LOCALES) {
    const missing = base.filter((k) => !byLang[lang].includes(k));
    const extra = byLang[lang].filter((k) => !base.includes(k));
    assert.deepEqual(missing, [], `${lang} 에 없는 키`);
    assert.deepEqual(extra, [], `${lang} 에만 있는 키`);
  }
});

test('화면이 실제로 부르는 키가 전부 있다', () => {
  const used = [
    'bannerTitle', 'bannerSub', 'prefix', 'suffix', 'topPercent', 'ofTotal',
    'levelValue', 'xpValue', 'dayValue',
    'nextRank', 'nextRankMaxed', 'first', 'error',
    'unranked.title', 'unranked.desc',
    'tier.legend', 'tier.master', 'tier.elite', 'tier.rising', 'tier.steady', 'tier.starter',
    'breakdown.proficiency', 'breakdown.volume', 'breakdown.consistency',
  ];
  for (const lang of LOCALES) {
    for (const k of used) {
      assert.ok(byLang[lang].includes(k), `${lang}.rank.${k} 없음`);
    }
  }
});

test('안 쓰게 된 levelBanner 키는 남아 있지 않다', () => {
  for (const lang of LOCALES) {
    const src = fs.readFileSync(path.join(DIR, `${lang}.ts`), 'utf8');
    assert.ok(!src.includes('levelBannerTitle'), `${lang}: levelBannerTitle 잔재`);
    assert.ok(!src.includes('levelBannerSub'), `${lang}: levelBannerSub 잔재`);
  }
});
