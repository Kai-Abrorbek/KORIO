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
  GAP,
  BUBBLE_MAX_W,
  MIN_BUBBLE_ROOM,
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
// 핵심 성질: **말풍선의 높이를 쓰지 않는다.** 높이를 쓰면
// 위치→onLayout→높이→위치 되먹임이 생겨 말풍선이 떤다.
const topTarget = placeBubble(rect(100, 120), SCREEN, INSETS);
say(topTarget.above === false, "위쪽 대상이면 말풍선은 아래에");
say(topTarget.top === 120 + 50 + PAD + GAP, "아래에 놓으면 구멍 바로 밑에 붙는다");
say(topTarget.bottom === undefined, "★ 아래 배치는 top 만 준다 (높이 불필요)");

const bottomTarget = placeBubble(rect(100, 700), SCREEN, INSETS);
say(bottomTarget.above === true, "★ 아래 공간이 좁으면 위로 올린다");
say(bottomTarget.top === undefined, "★ 위 배치는 top 을 안 준다");
say(
  bottomTarget.bottom === SCREEN.height - (700 - PAD) + GAP,
  "★ 위에 놓으면 아래 모서리를 고정한다 — 길어져도 '다음' 이 안 밀린다",
);

// 경계: 아래 공간이 딱 MIN_BUBBLE_ROOM 일 때
const holeY = SCREEN.height - INSETS.bottom - 12 - GAP - MIN_BUBBLE_ROOM - PAD - 50;
say(
  placeBubble(rect(100, holeY, 100, 50), SCREEN, INSETS).above === false,
  `아래 여유가 ${MIN_BUBBLE_ROOM} 이면 아래에 놓는다`,
);
say(
  placeBubble(rect(100, holeY + 5, 100, 50), SCREEN, INSETS).above === true,
  "그보다 좁아지면 위로 넘어간다",
);

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
// 예전에 말풍선이 위아래로 떨었다. 위치를 자기 실측 높이로 정하는데,
// 위치가 바뀌면 onLayout 이 다시 뜨고 안드로이드가 절대 위치에 따라 높이를
// 다른 정수로 반올림해서 A→B→A→B 로 영원히 왕복했다.
// 이제 높이를 아예 안 쓴다. 그 성질을 여기서 못 박는다.
const intish = (n: number | undefined) => n === undefined || Number.isInteger(n);
for (const [name, r] of [
  ["가운데", rect(145, 300, 100, 50)],
  ["소수 좌표", rect(100.333, 470.6667, 331.4, 70.28)],
  ["화면 위쪽", rect(12.5, 88.5, 56.5, 56.5)],
  ["화면 아래쪽", rect(320.7, 770.3, 56.2, 56.9)],
] as const) {
  const b = placeBubble(r, SCREEN, INSETS);
  say(
    intish(b.top) && intish(b.bottom) && Number.isInteger(b.left) && Number.isInteger(b.width),
    `★ ${name}: 말풍선 좌표가 정수 (소수면 프레임마다 반올림이 달라진다)`,
  );
  say(
    (b.top === undefined) !== (b.bottom === undefined),
    `${name}: top / bottom 중 딱 하나만 준다`,
  );
}

// 같은 입력이면 같은 출력, 그리고 높이는 입력에 없다 (되먹임 불가)
const a1 = placeBubble(rect(100, 470), SCREEN, INSETS);
const a2 = placeBubble(rect(100, 470), SCREEN, INSETS);
say(
  a1.top === a2.top && a1.bottom === a2.bottom && a1.left === a2.left,
  "★ 같은 입력이면 같은 자리",
);
say(
  placeBubble.length === 3,
  "★ 인자는 (구멍, 화면, 인셋) 셋뿐 — 말풍선 높이가 낄 자리가 없다",
);

// 1px 움직여도 결과가 1px 만 움직인다 (증폭되지 않는다)
const anchorOf = (b: ReturnType<typeof placeBubble>) => b.top ?? b.bottom ?? 0;
for (const y of [120, 300, 470, 700]) {
  const p1 = placeBubble(rect(100, y), SCREEN, INSETS);
  const p2 = placeBubble(rect(100, y + 1), SCREEN, INSETS);
  if (p1.above === p2.above) {
    say(
      Math.abs(anchorOf(p1) - anchorOf(p2)) <= 1,
      `★ y=${y}: 대상이 1px 움직이면 말풍선도 1px 만 움직인다`,
    );
  }
}

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
