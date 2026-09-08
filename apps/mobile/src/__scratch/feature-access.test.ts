/**
 * 무료 유저 권한.
 *
 * 여기가 틀리면 두 방향으로 다 사고다:
 *  - 유료 유저를 잠그면 환불 요청이 오고
 *  - 무료 유저에게 원가 나가는 기능을 열면 돈이 샌다
 *
 * 실행: npx tsx src/__scratch/feature-access.test.ts
 */
import {
  canUseFeature,
  featureOfLearnMode,
  isPremiumNow,
  FREE_FEATURES,
  PREMIUM_FEATURES,
  hasTaster,
  type Feature,
} from "../features/subscription/access";

let fail = 0;
const say = (ok: boolean, msg: string) => {
  if (!ok) fail++;
  console.log(`${ok ? "✅" : "❌"} ${msg}`);
};

const NOW = new Date("2026-09-08T12:00:00Z").getTime();
const future = new Date(NOW + 5 * 86400000).toISOString();
const past = new Date(NOW - 5 * 86400000).toISOString();

// ── isPremiumNow ─────────────────────────────────────────────
say(isPremiumNow(null, NOW) === false, "user 없음 → 무료");
say(isPremiumNow({}, NOW) === false, "isSuper 없음 → 무료");
say(isPremiumNow({ isSuper: false, superExpiresAt: future }, NOW) === false,
  "isSuper false 면 만료일이 남아 있어도 무료");
say(isPremiumNow({ isSuper: true, superExpiresAt: future }, NOW) === true,
  "만료 전이면 프리미엄");
say(isPremiumNow({ isSuper: true, superExpiresAt: past }, NOW) === false,
  "★ 체험 끝났는데 store 에 isSuper 가 남아 있어도 무료로 본다");
say(isPremiumNow({ isSuper: true, superExpiresAt: null }, NOW) === true,
  "만료일 없으면 무기한 프리미엄");
say(isPremiumNow({ isSuper: true, superExpiresAt: "" }, NOW) === true,
  "빈 문자열은 만료일 없음과 같게 (유료 유저를 잠그지 않는다)");
say(isPremiumNow({ isSuper: true, superExpiresAt: "쓰레기" }, NOW) === true,
  "값이 깨졌으면 막지 않는다 — 서버가 어차피 막는다");
say(isPremiumNow({ isSuper: true, superExpiresAt: new Date(NOW).toISOString() }, NOW) === false,
  "만료 시각 정각은 만료로 본다");

// ── 무료 기능 ────────────────────────────────────────────────
const freeUser = { isSuper: false };
for (const f of FREE_FEATURES) {
  say(canUseFeature(freeUser, f, NOW) === true, `무료 유저도 ${f} 는 쓴다`);
}
for (const f of PREMIUM_FEATURES) {
  say(canUseFeature(freeUser, f, NOW) === false, `무료 유저는 ${f} 못 쓴다`);
}

// 유저가 콕 집어 말한 예외 4종
for (const f of ["words", "games", "hangul", "pronunciation"] as Feature[]) {
  say(FREE_FEATURES.includes(f), `★ ${f} 는 에너지를 안 써도 무료로 푼다`);
}
// 에너지 기능은 무료
say(FREE_FEATURES.includes("lesson"), "★ 에너지를 쓰는 레슨은 무료");
// 겹치면 안 된다
say(
  FREE_FEATURES.every((f) => !PREMIUM_FEATURES.includes(f)),
  "무료/유료 목록이 겹치지 않는다",
);

// ── 프리미엄 유저는 전부 ──────────────────────────────────────
const superUser = { isSuper: true, superExpiresAt: future };
for (const f of [...FREE_FEATURES, ...PREMIUM_FEATURES]) {
  say(canUseFeature(superUser, f, NOW) === true, `프리미엄은 ${f} 다 쓴다`);
}
// 체험이 끝난 순간 유료 기능이 닫힌다
const expired = { isSuper: true, superExpiresAt: past };
say(canUseFeature(expired, "topik", NOW) === false, "★ 체험 만료 → 토픽 잠김");
say(canUseFeature(expired, "lesson", NOW) === true, "★ 체험 만료 → 레슨은 계속 됨");
say(canUseFeature(expired, "games", NOW) === true, "★ 체험 만료 → 게임은 계속 됨");

// ── learnMode 매핑 ───────────────────────────────────────────
const MAP: [string | undefined, Feature][] = [
  ["vocabulary", "lesson"],
  ["grammarPractice", "lesson"],
  ["grammar", "grammar"],
  ["expression", "expression"],
  ["listening", "listening"],
  ["topik", "topik"],
  ["conversation", "tutor"],
  [undefined, "lesson"],
  ["듣도보도못한모드", "lesson"],
];
for (const [mode, expect] of MAP) {
  say(featureOfLearnMode(mode) === expect, `learnMode ${mode} → ${expect}`);
}

// ── 맛보기 ───────────────────────────────────────────────────
say(hasTaster("tutor") === true, "튜터는 서버가 무료 2분을 열어둬서 맛보기 있음");
say(hasTaster("topik") === false, "토픽은 맛보기 없음");

console.log(fail ? `\n❌ ${fail}건 실패` : "\n✅ 전부 통과");
process.exit(fail ? 1 : 0);
