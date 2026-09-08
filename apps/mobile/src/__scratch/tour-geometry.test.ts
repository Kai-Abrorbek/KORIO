/**
 * 기능 안내 좌표.
 *
 * 여기가 틀리면 스포트라이트가 엉뚱한 데를 뚫거나, 말풍선이 화면 밖으로
 * 나가서 "다음" 버튼을 못 누른다 — 투어가 그 자리에서 끝난다.
 *
 * 실행: npx tsx src/__scratch/tour-geometry.test.ts
 */
import {
  PAD,
  BUBBLE_MAX_W,
  placeBubble,
  scrollDeltaFor,
  spotlightPath,
} from "../features/tour/tour-geometry";
import { HOME_STEPS } from "../features/tour/tours";

let fail = 0;
const say = (ok: boolean, msg: string) => {
  if (!ok) fail++;
  console.log(`${ok ? "✅" : "❌"} ${msg}`);
};

const SCREEN = { width: 390, height: 844 }; // iPhone 14 급
const INSETS = { top: 47, bottom: 34 };
const rect = (x: number, y: number, w = 100, h = 50) => ({
  x,
  y,
  width: w,
  height: h,
});

// ── 스포트라이트 path ────────────────────────────────────────
const p = spotlightPath(390, 844, rect(100, 300), 18);
say(p.startsWith("M0 0 H390 V844 H0 Z"), "★ 바깥은 화면 전체를 덮는다");
say(p.split("M").length === 3, "path 가 두 조각 (바깥 + 구멍)");
say(!p.includes("NaN"), "NaN 이 안 섞인다");
say(p.includes("A"), "구멍 모서리가 둥글다 (호 명령 포함)");

// 구멍이 대상보다 PAD 만큼 크다
say(p.includes(`${100 - PAD + 18} ${300 - PAD}`), `구멍이 대상보다 ${PAD}px 씩 크다`);

// 반지름이 크기보다 클 때 (동그란 버튼: radius 999)
const round = spotlightPath(390, 844, rect(300, 700, 56, 56), 999);
say(!round.includes("NaN"), "★ radius 999 여도 깨지지 않는다 (원형 버튼)");
say(!round.includes("-0 "), "음수 반지름이 안 나온다");

// 아주 작은 대상
const tiny = spotlightPath(390, 844, rect(10, 10, 1, 1), 18);
say(!tiny.includes("NaN"), "1px 대상도 안 깨진다");

// ── 말풍선 자리 ──────────────────────────────────────────────
const top = placeBubble(rect(100, 120), SCREEN, INSETS);
say(top.above === false, "위쪽 대상이면 말풍선은 아래에");
say(top.top > 120 + 50, "말풍선이 구멍 아래에 온다");

const bottom = placeBubble(rect(100, 700), SCREEN, INSETS);
say(bottom.above === true, "★ 아래쪽 대상이면 말풍선을 위로 올린다");
say(bottom.top < 700, "위로 올렸으면 구멍보다 위");
say(bottom.top >= INSETS.top + 12, "★ 상태바를 침범하지 않는다");

// 좌우 클램프
const left = placeBubble(rect(0, 300, 40, 40), SCREEN, INSETS);
say(left.left >= 16, "★ 왼쪽 끝 버튼이어도 말풍선이 화면 밖으로 안 나간다");
const right = placeBubble(rect(340, 300, 50, 50), SCREEN, INSETS);
say(
  right.left + right.width <= SCREEN.width - 16 + 0.001,
  "★ 오른쪽 끝 버튼이어도 안 나간다 (플로팅 AI 버튼 자리)",
);

// 좁은 화면
const narrow = placeBubble(rect(10, 300), { width: 320, height: 640 }, INSETS);
say(narrow.width <= 320 - 32, "좁은 화면에선 말풍선도 좁아진다");
say(narrow.width <= BUBBLE_MAX_W, "최대 폭을 안 넘는다");
say(narrow.left >= 16, "좁은 화면에서도 왼쪽 여백 유지");

// 가운데 대상이면 중앙 정렬
const mid = placeBubble(rect(145, 300, 100, 50), SCREEN, INSETS);
say(
  Math.abs(mid.left + mid.width / 2 - 195) < 1,
  "가운데 대상이면 말풍선도 가운데",
);

// ── 스크롤 계산 ──────────────────────────────────────────────
say(scrollDeltaFor(rect(0, 400), 844) === 0, "화면 중앙이면 스크롤 안 함");
say(scrollDeltaFor(rect(0, 20), 844) < 0, "★ 너무 위면 위로 스크롤 (음수)");
say(scrollDeltaFor(rect(0, 800), 844) > 0, "★ 너무 아래면 아래로 스크롤 (양수)");
say(scrollDeltaFor(rect(0, 106), 844) === 0, "몇 px 차이는 무시한다 (덜컹 방지)");
// 아래로 스크롤한 뒤 대상이 안전 영역 안에 들어오는지
const far = rect(0, 900, 100, 60);
const d = scrollDeltaFor(far, 844);
const after = { ...far, y: far.y - d };
say(
  after.y + after.height <= 844 - 300 + 0.001,
  "★ 스크롤한 만큼 옮기면 실제로 안전 영역 안에 들어온다",
);

// ── 떨림 방지 (좌표 안정성) ──────────────────────────────────
// 말풍선 위치가 자기 높이에 의존하고, 위치가 바뀌면 onLayout 이 다시 뜬다.
// 좌표가 소수면 프레임마다 반올림이 달라져 A→B→A→B 로 영원히 왕복한다.
const intish = (n: number) => Number.isInteger(n);
for (const [name, r] of [
  ["가운데", rect(145, 300, 100, 50)],
  ["소수 좌표", rect(100.333, 470.6667, 331.4, 70.28)],
  ["화면 위쪽", rect(12.5, 88.5, 56.5, 56.5)],
  ["화면 아래쪽", rect(320.7, 770.3, 56.2, 56.9)],
] as const) {
  const b = placeBubble(r, SCREEN, INSETS);
  say(
    intish(b.top) && intish(b.left) && intish(b.width),
    `★ ${name}: 말풍선 좌표가 정수 (top=${b.top} left=${b.left})`,
  );
}

// 같은 입력이면 같은 출력 (순수 함수인지)
const a1 = placeBubble(rect(100, 470), SCREEN, INSETS);
const a2 = placeBubble(rect(100, 470), SCREEN, INSETS);
say(
  a1.top === a2.top && a1.left === a2.left,
  "같은 입력이면 같은 자리 (되먹임이 생길 여지가 없다)",
);

// 1px 움직여도 결과가 1px 만 움직인다 (증폭되지 않는다)
const b1 = placeBubble(rect(100, 470), SCREEN, INSETS);
const b2 = placeBubble(rect(100, 471), SCREEN, INSETS);
say(
  Math.abs(b1.top - b2.top) <= 1,
  "★ 대상이 1px 움직이면 말풍선도 1px 만 움직인다",
);

// 클램프를 반복 적용해도 자리가 안 바뀐다 (실측 높이 보정 시뮬레이션)
function clampTop(top: number, h: number) {
  const maxTop = SCREEN.height - INSETS.bottom - 12 - h;
  const minTop = INSETS.top + 12;
  return Math.round(Math.max(minTop, Math.min(top, Math.max(minTop, maxTop))));
}
for (const h of [120, 210, 340, 700, 1200]) {
  const first = clampTop(placeBubble(rect(100, 700), SCREEN, INSETS).top, h);
  const second = clampTop(first, h);
  const third = clampTop(second, h);
  say(
    first === second && second === third,
    `★ 높이 ${h}: 클램프를 반복해도 자리가 고정 (떨림 없음)`,
  );
  say(
    first >= INSETS.top + 12,
    `높이 ${h}: 상태바를 안 침범한다`,
  );
}
// 말풍선이 화면보다 커도 위로 넘치진 않는다
const huge = clampTop(placeBubble(rect(100, 700), SCREEN, INSETS).top, 2000);
say(huge === INSETS.top + 12, "★ 말풍선이 화면보다 커도 위쪽 여백은 지킨다");

// ── 투어 구성 ────────────────────────────────────────────────
say(HOME_STEPS.length === 5, "홈 투어는 5단계 (넘기면 완주율이 급락한다)");
say(
  new Set(HOME_STEPS.map((s) => s.target)).size === HOME_STEPS.length,
  "대상이 중복되지 않는다",
);
say(
  new Set(HOME_STEPS.map((s) => s.key)).size === HOME_STEPS.length,
  "i18n 키가 중복되지 않는다",
);
say(
  HOME_STEPS.every((s) => s.target.startsWith("home.")),
  "홈 투어 대상은 전부 home.* 네임스페이스",
);
say(
  HOME_STEPS[0].key === "continue",
  "★ 첫 단계는 '학습 시작' — 처음 온 사람이 제일 먼저 알아야 할 것",
);

console.log(fail ? `\n❌ ${fail}건 실패` : "\n✅ 전부 통과");
process.exit(fail ? 1 : 0);
