/**
 * 순위 점수 규칙.
 *
 * 점수 **계산식 자체는 몽고 표현식에만 있다**(rank.service.ts) — 같은 공식을
 * 두 벌 두면 어긋나고, 어긋나면 내 점수와 남의 점수가 다른 잣대로 매겨진다.
 * 여기서는 그 표현식이 기대는 순수 함수(로그 스케일과 그 역함수, 칭호 경계)를
 * 본다.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  RANK_WEIGHTS,
  SCORE_SCALE,
  XP_CEIL,
  tierFor,
  volumeScoreOf,
  xpForVolumeScore,
  xpGapFor,
} from '../users/rank/rank.const';

test('가중치 합이 1 이다', () => {
  const sum =
    RANK_WEIGHTS.proficiency + RANK_WEIGHTS.volume + RANK_WEIGHTS.consistency;
  assert.ok(Math.abs(sum - 1) < 1e-9, `합이 ${sum}`);
});

test('학습량은 로그라서 초반 성장이 크게 반영된다', () => {
  const early = volumeScoreOf(1_000) - volumeScoreOf(0);
  const late = volumeScoreOf(51_000) - volumeScoreOf(50_000);
  // 같은 1,000 XP 라도 초반이 훨씬 크게 움직여야 한다.
  // 선형이면 둘이 같고, 그러면 순위가 사실상 XP 순서가 된다
  assert.ok(early > late * 5, `초반 ${early} vs 후반 ${late}`);
});

test('학습량 점수는 0~1 을 벗어나지 않는다', () => {
  assert.equal(volumeScoreOf(0), 0);
  assert.equal(volumeScoreOf(-999), 0);
  assert.equal(volumeScoreOf(XP_CEIL), 1);
  assert.equal(volumeScoreOf(XP_CEIL * 50), 1);
});

test('역함수가 원래 XP 를 되돌려준다', () => {
  for (const xp of [0, 1, 500, 12_345, 99_999]) {
    const back = xpForVolumeScore(volumeScoreOf(xp));
    assert.ok(Math.abs(back - xp) < 1, `${xp} → ${back}`);
  }
});

test('다음 순위까지 필요한 XP', () => {
  // 점수 차이가 0 이면 이미 같은 자리다
  assert.equal(xpGapFor(10_000, 0), 0);
  // 조금 벌어졌으면 조금만 하면 된다
  const small = xpGapFor(10_000, 1)!;
  const big = xpGapFor(10_000, 10)!;
  assert.ok(small > 0 && big > small, `${small} / ${big}`);
  // 학습량을 만점 받아도 못 메우는 차이는 null (실력·꾸준함에서 벌어진 것)
  assert.equal(xpGapFor(XP_CEIL, SCORE_SCALE * RANK_WEIGHTS.volume), null);
});

test('칭호 경계', () => {
  assert.equal(tierFor(0.1), 'legend');
  assert.equal(tierFor(1), 'legend');
  assert.equal(tierFor(1.1), 'master');
  assert.equal(tierFor(5), 'master');
  assert.equal(tierFor(10), 'elite');
  assert.equal(tierFor(25), 'rising');
  assert.equal(tierFor(50), 'steady');
  assert.equal(tierFor(50.1), 'starter');
  assert.equal(tierFor(100), 'starter');
});
