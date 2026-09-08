/**
 * 체험 → 무료 전환.
 *
 * 유저가 콕 집어 물어본 자리다: "무료체험이 끝난 다음에 정상적으로
 * 일반 유저로 변경되고 있는지 삔 틈이 없는지".
 *
 * 실행: npx ts-node src/__scratch/trial-expiry.test.ts   (-T 금지)
 */
import {
  TRIAL_DAYS,
  expiredSuperFields,
  isSuperActive,
  isSuperStale,
  trialDaysLeft,
  trialFields,
} from '../users/super.util';

let fail = 0;
const say = (ok: boolean, msg: string) => {
  if (!ok) fail++;
  console.log(`${ok ? '✅' : '❌'} ${msg}`);
};

const day = 86400000;
const future = new Date(Date.now() + 5 * day);
const past = new Date(Date.now() - 5 * day);

// ── 가입 시 붙는 체험 ────────────────────────────────────────
const fresh = trialFields();
say(fresh.isSuper === true, '가입하면 체험이 켜진다');
say(fresh.superPlan === 'trial', "superPlan 이 'trial'");
say(!!fresh.trialStartedAt, '★ 체험 시작 시각이 남는다 (만료 뒤 판단 근거)');
const days = Math.round(
  (fresh.superExpiresAt.getTime() - Date.now()) / day,
);
say(days === TRIAL_DAYS, `만료일이 ${TRIAL_DAYS}일 뒤`);
say(isSuperActive(fresh) === true, '가입 직후는 SUPER');
say(isSuperStale(fresh) === false, '가입 직후는 stale 아님');
say(trialDaysLeft(fresh) === TRIAL_DAYS, '남은 일수가 전부');

// ── 만료 판정 ────────────────────────────────────────────────
const expiredTrial = {
  isSuper: true,
  superPlan: 'trial',
  superExpiresAt: past,
};
say(isSuperActive(expiredTrial) === false, '★ 기간이 지나면 SUPER 아님');
say(isSuperStale(expiredTrial) === true, '★ DB 의 isSuper 가 거짓말 중 → stale');
say(
  trialDaysLeft(expiredTrial) === null,
  '★ 끝난 체험은 0 이 아니라 null (0 은 "오늘 끝나요"와 구분이 안 된다)',
);

// 오늘 끝나는 체험은 0 이 아니라 1 (반올림 올림)
const endsSoon = {
  isSuper: true,
  superPlan: 'trial',
  superExpiresAt: new Date(Date.now() + 3600_000),
};
say(trialDaysLeft(endsSoon) === 1, '1시간 남았으면 1일로 표시');
say(isSuperActive(endsSoon) === true, '1시간 남았으면 아직 SUPER');

// 경계: 정확히 지금
const rightNow = { isSuper: true, superExpiresAt: new Date(Date.now() - 1) };
say(isSuperActive(rightNow) === false, '1ms 지나면 만료');

// ── 만료 시 비우는 필드 한 벌 ────────────────────────────────
const cleared = expiredSuperFields();
say(cleared.isSuper === false, '만료 처리하면 isSuper false');
say(cleared.superPlan === null, "★ superPlan 도 비운다 (예전엔 'trial' 로 남았다)");
say(cleared.superExpiresAt === null, '★ 만료일도 비운다');
say(cleared.superTier === 'super', '등급은 기본값으로 되돌린다 (max 가 남으면 안 됨)');
say(
  !('trialStartedAt' in cleared),
  '★ 체험 시작 기록은 안 건드린다 — 체험을 또 주면 안 되니까',
);

// 비운 뒤의 상태로 다시 판정
const after = { ...expiredTrial, ...cleared };
say(isSuperActive(after) === false, '비운 뒤에도 무료');
say(isSuperStale(after) === false, '★ 비운 뒤엔 stale 아님 (계속 쓰기 반복 안 함)');
say(trialDaysLeft(after) === null, '비운 뒤 남은 일수 없음');

// ── 결제 구독은 체험과 섞이지 않는다 ─────────────────────────
const paid = { isSuper: true, superPlan: 'super_1m', superExpiresAt: future };
say(isSuperActive(paid) === true, '결제 구독은 SUPER');
say(trialDaysLeft(paid) === null, '결제 구독은 체험 일수 없음');
const paidExpired = { ...paid, superExpiresAt: past };
say(isSuperStale(paidExpired) === true, '결제 구독도 만료되면 stale');

// 무기한 (관리자 수동 부여)
const forever = { isSuper: true, superExpiresAt: null };
say(isSuperActive(forever) === true, '만료일 없으면 무기한');
say(isSuperStale(forever) === false, '무기한은 stale 아님');

console.log(fail ? `\n❌ ${fail}건 실패` : '\n✅ 전부 통과');
process.exit(fail ? 1 : 0);
