/**
 * 에너지 회복 + 콤보 보너스 규칙.
 *
 * 콤보 보너스는 서버가 "정말 4연속 맞혔는지" 를 확인할 수 없다 (채점이 앱에
 * 있다). 그래서 간격·횟수·에너지 상한이 유일한 방어선이고, 여기가 뚫리면
 * 엔드포인트를 반복 호출하는 것만으로 에너지가 계속 찬다 = 구독 압력이
 * 통째로 사라진다. 그래서 이 규칙들은 DB 없이도 매번 검사한다.
 *
 * 실행: npx ts-node src/__scratch/energy-rules.test.ts   (-T 붙이지 말 것)
 */
import {
  claimsSince,
  computeEnergy,
  decideComboBonus,
  minutesToFull,
} from '../energy/energy.util';
import {
  COMBO_BONUS_COOLDOWN_SEC,
  COMBO_BONUS_DAILY_LIMIT,
  COMBO_BONUS_MAX,
  COMBO_BONUS_THRESHOLD,
  ENERGY_CONFIG,
} from '../energy/energy.constants';

let fail = 0;
const say = (ok: boolean, msg: string) => {
  if (!ok) fail++;
  console.log(`${ok ? '✅' : '❌'} ${msg}`);
};

const NOW = new Date('2026-09-07T12:00:00Z');
const ago = (sec: number) => new Date(NOW.getTime() - sec * 1000);
const MIN = 60 * 1000;
const { MAX, REGEN_MINUTES } = ENERGY_CONFIG;

// ── 시간 회복 ────────────────────────────────────────────────
{
  const r = computeEnergy({ energy: 0, energyUpdatedAt: new Date(NOW.getTime() - 120 * MIN) }, false, NOW);
  say(r.energy === 2, '2시간 지나면 2개 회복 (1개/60분)');
}
{
  // 90분 = 1개 + 30분. 남은 30분은 다음 주기로 넘어가야 한다.
  // 안 넘기면 자주 부르는 유저가 영원히 회복을 못 받는다
  const r = computeEnergy({ energy: 0, energyUpdatedAt: new Date(NOW.getTime() - 90 * MIN) }, false, NOW);
  say(r.energy === 1, '90분이면 1개만');
  say(r.secondsToNext === 30 * 60, '남은 30분이 다음 주기로 이월된다');
}
{
  const r = computeEnergy({ energy: 0, energyUpdatedAt: new Date(NOW.getTime() - 59 * MIN) }, false, NOW);
  say(r.energy === 0, '59분으로는 회복 없음');
  say(r.secondsToNext === 60, '1분 뒤에 1개');
}
{
  const r = computeEnergy({ energy: MAX, energyUpdatedAt: new Date(NOW.getTime() - 999 * MIN) }, false, NOW);
  say(r.energy === MAX && r.isFull && r.secondsToNext === 0, '꽉 찼으면 그대로');
}
{
  const r = computeEnergy({ energy: 3, energyUpdatedAt: new Date(NOW.getTime() - 999 * MIN) }, true, NOW);
  say(r.energy === MAX && r.isFull, '슈퍼는 항상 MAX');
}
{
  const r = computeEnergy({ energy: 0, energyUpdatedAt: new Date(NOW.getTime() - 9999 * MIN) }, false, NOW);
  say(r.energy === MAX, '오래 놔둬도 MAX 를 안 넘는다');
}
say(minutesToFull(MAX, 0, false) === 0, '꽉 찼으면 남은 시간 0');
say(minutesToFull(3, 0, true) === 0, '슈퍼는 남은 시간 0');
say(
  minutesToFull(MAX - 2, 30 * 60, false) === 30 + REGEN_MINUTES,
  '2개 남았으면 (다음 1개 남은 시간 + 60분)',
);

// ── claimsSince ─────────────────────────────────────────────
{
  const kept = claimsSince([ago(10), ago(100000), ago(5)], ago(60));
  say(kept.length === 2, '기준 시각 이후 것만 남긴다');
  say(claimsSince(undefined, ago(60)).length === 0, '배열이 없어도 안 터진다');
}

// ── 콤보 보너스 ──────────────────────────────────────────────
const decide = (energy: number, claimsToday: Date[] = [], isSuper = false) =>
  decideComboBonus({ energy, isSuper, claimsToday, now: NOW });

say(decide(0, [], true).reason === 'SUPER', '슈퍼는 안 준다 (이미 무제한)');
say(decide(MAX).reason === 'FULL', '꽉 찼으면 안 준다');
say(decide(COMBO_BONUS_THRESHOLD + 1).reason === 'ENOUGH_ENERGY', '임계값 초과면 안 준다');
say(decide(COMBO_BONUS_THRESHOLD).granted === 4, '임계값 딱 걸치면 준다');
say(decide(10).granted === 6, '10 이하면 6');
say(decide(5).granted === COMBO_BONUS_MAX, '5 이하면 8');
say(decide(0).granted === COMBO_BONUS_MAX, '바닥이면 8');

// 이 두 개가 서버의 유일한 방어선이다
{
  const d = decide(0, [ago(COMBO_BONUS_COOLDOWN_SEC - 5)]);
  say(d.granted === 0 && d.reason === 'COOLDOWN', '쿨다운 안이면 안 준다');
}
{
  const d = decide(0, [ago(COMBO_BONUS_COOLDOWN_SEC + 1)]);
  say(d.granted > 0, '쿨다운 지나면 준다');
}
{
  // 가장 최근 것으로 판단해야 한다. 정렬 안 된 배열이 와도 마찬가지
  const d = decide(0, [ago(9999), ago(5), ago(500)]);
  say(d.reason === 'COOLDOWN', '순서가 뒤섞여도 가장 최근 것으로 판단');
}
{
  const many = Array.from({ length: COMBO_BONUS_DAILY_LIMIT }, () => ago(9999));
  say(decide(0, many).reason === 'DAILY_LIMIT', '하루 한도를 채우면 안 준다');
  say(decide(0, many.slice(1)).granted > 0, '한도 직전까지는 준다');
}

// ── 절대 깨지면 안 되는 것 ────────────────────────────────────
{
  // 보너스만으로 MAX 를 찍을 수 있으면 에너지 시스템이 의미가 없어진다
  let worst = 0;
  let overflow = false;
  for (let e = 0; e <= MAX; e++) {
    const g = decide(e).granted;
    if (e + g > MAX) overflow = true;
    // 실제로 지급이 일어난 경우만 본다. 안 주면 에너지는 그대로다
    if (g > 0) worst = Math.max(worst, e + g);
  }
  say(!overflow, '어떤 에너지에서도 MAX 를 넘겨 주지 않는다');
  say(worst < MAX, `보너스만으로 도달 가능한 최대는 ${worst} (< ${MAX})`);
  say(
    worst <= COMBO_BONUS_THRESHOLD + COMBO_BONUS_MAX,
    '지급 상한이 임계값+최대치를 넘지 않는다',
  );
}

console.log(fail ? `\n❌ ${fail}건 실패` : '\n🎉 전부 통과');
process.exit(fail ? 1 : 0);
