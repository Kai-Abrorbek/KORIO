/**
 * 스킬 레이더 점수.
 *
 * 여기가 틀리면 유저에게 "네 약점은 듣기야" 라고 **틀린 진단**을 하게 된다.
 * 통계 화면에서 제일 신뢰를 잃기 쉬운 자리라 규칙을 못 박아 둔다.
 *
 * 실행: npx ts-node src/__scratch/skill-radar.test.ts   (-T 금지)
 */
import { StudyCategory } from '../users/utils/study-category.util';
import {
  computeSkillScores,
  diagnose,
  recencyScore,
  smoothedAccuracy,
  RADAR_CATEGORIES,
  MIN_SAMPLE,
  type SkillInput,
} from '../users/utils/skill-radar.util';

let fail = 0;
const say = (ok: boolean, msg: string) => {
  if (!ok) fail++;
  console.log(`${ok ? '✅' : '❌'} ${msg}`);
};

const C = StudyCategory;
const mk = (
  category: StudyCategory,
  attempted: number,
  correct: number | null,
  daysSinceLast: number | null = 1,
): SkillInput => ({ category, attempted, correct, daysSinceLast });

/** 안 건드린 분야까지 채워서 6축을 맞춘다 */
const full = (given: SkillInput[]): SkillInput[] =>
  RADAR_CATEGORIES.map(
    (c) => given.find((g) => g.category === c) ?? mk(c, 0, null, null),
  );

const scoreOf = (rows: ReturnType<typeof computeSkillScores>, c: StudyCategory) =>
  rows.find((r) => r.category === c)!;

// ── 축 구성 ──────────────────────────────────────────────────
say(RADAR_CATEGORIES.length === 6, '레이더는 6축');
say(!RADAR_CATEGORIES.includes(C.OTHER), "★ '기타' 는 축에서 뺀다 (분류 실패 버킷)");

// ── 평활 정확도 ──────────────────────────────────────────────
say(smoothedAccuracy(1, 1) < 0.8, '★ 1문제 맞혔다고 100% 로 안 본다');
say(smoothedAccuracy(1, 1) > 0.7, '그래도 평균보다는 높게 본다');
say(smoothedAccuracy(200, 200) > 0.95, '표본이 크면 실제 정답률에 수렴');
say(smoothedAccuracy(200, 0) < 0.05, '많이 풀고 다 틀리면 바닥으로');
say(Math.abs(smoothedAccuracy(0, 0) - 0.7) < 1e-9, '표본 0 이면 기준점 그대로');

// ── 최근성 ───────────────────────────────────────────────────
say(recencyScore(0) === 1, '오늘 했으면 만점');
say(recencyScore(null) === 0, '한 적 없으면 0');
say(recencyScore(15) > 0.4 && recencyScore(15) < 0.6, '보름 지나면 절반쯤');
say(recencyScore(60) === 0, '두 달 지나면 0 (음수로 안 내려간다)');

// ── 점수 범위 ────────────────────────────────────────────────
const wide = computeSkillScores(
  full([mk(C.VOCAB, 500, 490, 0), mk(C.LISTENING, 3, 0, 40)]),
);
for (const r of wide) {
  say(r.score >= 0 && r.score <= 100, `${r.category} 점수가 0~100 안 (${r.score})`);
}

// ── 핵심: 한 문제 맞힌 분야가 최강이 되면 안 된다 ─────────────
const trap = computeSkillScores(
  full([
    mk(C.VOCAB, 300, 240, 0), // 많이 풀고 80%
    mk(C.TOPIK, 1, 1, 0), // 딱 하나 맞힘
  ]),
);
say(
  scoreOf(trap, C.VOCAB).score > scoreOf(trap, C.TOPIK).score,
  '★ 300문제 80% 가 1문제 100% 보다 강하다',
);

// ── 반대 함정: 많이 풀고 많이 틀린 게 최강이 되면 안 된다 ─────
const trap2 = computeSkillScores(
  full([
    mk(C.VOCAB, 400, 120, 0), // 30% 정답률
    mk(C.GRAMMAR, 60, 55, 0), // 92% 정답률
  ]),
);
say(
  scoreOf(trap2, C.GRAMMAR).score > scoreOf(trap2, C.VOCAB).score,
  '★ 많이 푸는 것만으로 강점이 되지 않는다',
);

// ── 정확도를 모르는 옛 기록 ──────────────────────────────────
const legacy = computeSkillScores(full([mk(C.VOCAB, 200, null, 0)]));
say(scoreOf(legacy, C.VOCAB).accuracy === null, '정확도 모르면 null 로 내려간다');
say(
  scoreOf(legacy, C.VOCAB).score > 50,
  '★ 정확도를 모른다고 바닥으로 깔지 않는다 (옛 유저 전부 0점 방지)',
);

// ── 한 분야만 몰아쳐도 레이더가 찌그러지지 않는다 ────────────
const skew = computeSkillScores(
  full([mk(C.VOCAB, 1000, 800, 0), mk(C.GRAMMAR, 30, 24, 2)]),
);
say(
  scoreOf(skew, C.GRAMMAR).score > 30,
  '★ 학습량 33배 차이여도 작은 축이 0 에 붙지 않는다 (sqrt 압축)',
);

// ── 안 건드린 분야 ───────────────────────────────────────────
const untouchedRow = scoreOf(skew, C.TOPIK);
say(untouchedRow.attempted === 0, '안 한 분야는 attempted 0');
say(untouchedRow.accuracy === null, '안 한 분야는 정확도 없음');
say(untouchedRow.reliable === false, '안 한 분야는 진단 근거로 못 씀');
say(untouchedRow.score < 30, '안 한 분야는 낮게');

// ── reliable 경계 ────────────────────────────────────────────
const edge = computeSkillScores(
  full([mk(C.VOCAB, MIN_SAMPLE, 5, 0), mk(C.GRAMMAR, MIN_SAMPLE - 1, 5, 0)]),
);
say(scoreOf(edge, C.VOCAB).reliable === true, `${MIN_SAMPLE}문제면 판단 가능`);
say(scoreOf(edge, C.GRAMMAR).reliable === false, `${MIN_SAMPLE - 1}문제면 아직`);

// ── 진단 ─────────────────────────────────────────────────────
const empty = diagnose(computeSkillScores(full([])));
say(empty.key === 'noData', '데이터 없으면 noData');
say(empty.strongest === null, 'noData 면 강점도 없다');

const tiny = diagnose(computeSkillScores(full([mk(C.VOCAB, 3, 3, 0)])));
say(tiny.key === 'noData', `★ ${MIN_SAMPLE}문제 미만이면 진단 안 한다`);

// 안 건드린 분야가 있으면 그게 1순위
const gap = diagnose(
  computeSkillScores(full([mk(C.VOCAB, 200, 180, 0), mk(C.GRAMMAR, 150, 140, 1)])),
);
say(gap.key === 'untouched', '★ 아예 안 한 분야가 있으면 그걸 먼저 짚는다');
say(gap.category !== null, 'untouched 면 어느 분야인지 알려준다');
say(gap.category !== C.VOCAB && gap.category !== C.GRAMMAR, '한 분야를 짚는다');

// 전부 건드렸고 한 곳만 정답률이 낮으면 accuracyDrop
const allTouched = (extra: SkillInput[]) =>
  RADAR_CATEGORIES.map(
    (c) => extra.find((g) => g.category === c) ?? mk(c, 60, 50, 1),
  );
const low = diagnose(computeSkillScores(allTouched([mk(C.LISTENING, 80, 30, 1)])));
say(low.key === 'accuracyDrop', '★ 정답률 낮은 분야가 있으면 그걸 짚는다');
say(low.category === C.LISTENING, '낮은 분야를 정확히 지목');

// 전부 고르면 balanced
const even = diagnose(computeSkillScores(allTouched([])));
say(even.key === 'balanced', '고르게 하고 있으면 balanced');
say(even.spread < 25, 'balanced 면 편차가 작다');
say(even.strongest !== null && even.weakest !== null, 'balanced 여도 강·약은 알려준다');

// 편차가 크면 weakSpot
const skewed = diagnose(
  computeSkillScores(
    allTouched([
      mk(C.VOCAB, 600, 540, 0),
      mk(C.TOPIK, 12, 9, 28),
    ]),
  ),
);
say(
  skewed.key === 'weakSpot' || skewed.key === 'accuracyDrop',
  `편차가 크면 약점을 짚는다 (${skewed.key}, spread=${skewed.spread})`,
);
say(skewed.weakest === C.TOPIK, '가장 약한 축을 맞게 고른다');
say(skewed.strongest === C.VOCAB, '가장 강한 축을 맞게 고른다');

// spread 는 항상 0 이상
say(even.spread >= 0 && skewed.spread >= 0, 'spread 는 음수가 안 된다');

console.log(fail ? `\n❌ ${fail}건 실패` : '\n✅ 전부 통과');
process.exit(fail ? 1 : 0);
