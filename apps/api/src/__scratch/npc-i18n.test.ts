/**
 * type_answer 말풍선이 학습자 언어로 나가는지.
 *
 * 이 문항들의 말풍선은 한국어 학습 지문이 아니라 "무엇을 쓰라"는 **단서**다.
 * 한국어로 두면 단서를 읽느라 정작 풀어야 할 문제를 못 푼다.
 * 반대로 error_hunt·reply_builder 의 말풍선은 한국어여야만 문제가 성립한다 —
 * 그쪽까지 번역되면 안 된다.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as u1 from '../seed/data/vocabulary/section3/unit1';
import * as u2 from '../seed/data/vocabulary/section3/unit2';
import * as u3 from '../seed/data/vocabulary/section3/unit3';
import * as u4 from '../seed/data/vocabulary/section3/unit4';

/** lessons.service 의 extractI18n 과 같은 규칙 */
const extractI18n = (obj: any, lang: string): string =>
  !obj ? '' : obj[lang] || obj['uz'] || obj['en'] || '';

const HANGUL = /[ㄱ-ㆎ가-힣]/;
const LANGS = ['ko', 'uz', 'en', 'ru'] as const;

const all: [string, any][] = [];
for (const mod of [u1, u2, u3, u4]) {
  for (const bag of Object.values(mod)) {
    if (!bag || typeof bag !== 'object') continue;
    for (const [k, q] of Object.entries(bag as Record<string, any>)) {
      if (q && typeof q === 'object' && 'type' in q) all.push([k, q]);
    }
  }
}

const typeAnswerWithNpc = all.filter(
  ([, q]) => q.type === 'type_answer' && q.npcText,
);

test('section3 의 type_answer 말풍선 71개가 전부 번역돼 있다', () => {
  assert.equal(typeAnswerWithNpc.length, 71);
  for (const [k, q] of typeAnswerWithNpc) {
    assert.ok(q.npcTextI18n, `${k}: npcTextI18n 없음`);
    for (const lang of LANGS) {
      assert.ok(
        typeof q.npcTextI18n[lang] === 'string' && q.npcTextI18n[lang].trim(),
        `${k}: npcTextI18n.${lang} 비어 있음`,
      );
    }
    assert.equal(q.npcTextI18n.ko, q.npcText, `${k}: ko 가 원문과 다르다`);
  }
});

test('우즈벡/영어/러시아어 말풍선이 한국어 문장으로 남아 있지 않다', () => {
  for (const [k, q] of typeAnswerWithNpc) {
    for (const lang of ['uz', 'en', 'ru'] as const) {
      const text: string = q.npcTextI18n[lang];
      // 낱말 인용(떡국·한자·지리산 같은 학습 대상)은 남아도 된다.
      // 통째로 한국어면 번역이 안 된 것이다 — 한글 비율로 가른다
      const hangul = (text.match(/[ㄱ-ㆎ가-힣]/g) ?? []).length;
      assert.ok(
        hangul / text.length < 0.5,
        `${k}.${lang}: 아직 한국어다 — ${text}`,
      );
    }
  }
});

test('번역이 없는 문항은 한국어 원문 그대로 나간다 (error_hunt 등)', () => {
  const untouched = all.filter(([, q]) => q.npcText && !q.npcTextI18n);
  assert.ok(untouched.length > 0, '번역 대상이 아닌 npcText 문항이 있어야 한다');
  for (const [k, q] of untouched) {
    const sent = extractI18n(q.npcTextI18n, 'uz') || q.npcText;
    assert.equal(sent, q.npcText, `${k}: 원문이 바뀌었다`);
    assert.ok(HANGUL.test(sent), `${k}: 한국어가 아니다`);
  }
});

test('예시 문항이 언어별로 제대로 갈린다', () => {
  const q = typeAnswerWithNpc.find(([k]) => k === 's3u1_081_type_answer')?.[1];
  assert.ok(q, 's3u1_081_type_answer 를 못 찾았다');
  assert.equal(extractI18n(q.npcTextI18n, 'ko'), '한 달마다 반복된다는 뜻의 말을 입력하세요.');
  assert.match(extractI18n(q.npcTextI18n, 'uz'), /Har oyda/);
  assert.match(extractI18n(q.npcTextI18n, 'en'), /every month/);
  assert.match(extractI18n(q.npcTextI18n, 'ru'), /каждый месяц/);
});
