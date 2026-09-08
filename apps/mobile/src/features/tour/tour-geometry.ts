import type { TourRect } from "./tour.store";

/**
 * 투어 기하 계산.
 *
 * TourOverlay 는 RN 컴포넌트라 그대로는 테스트가 안 된다. 실제로 틀리기
 * 쉬운 건 렌더가 아니라 좌표라서, 좌표 계산만 여기로 떼어냈다.
 */

/** 구멍 주변 여백 */
export const PAD = 8;
/** 말풍선과 구멍 사이 간격 */
export const GAP = 14;
export const BUBBLE_MAX_W = 320;
/** 말풍선이 아래로 넘칠지 판단할 때 쓰는 어림 높이 */
export const BUBBLE_EST_H = 210;

/**
 * 화면 전체를 덮되 대상 자리만 뚫은 SVG path.
 *
 * 바깥 사각형 + 안쪽 둥근 사각형을 한 path 에 넣고 fillRule="evenodd" 로
 * 안쪽을 비운다. View 4장으로 둘러싸는 방법은 모서리를 못 둥글리고
 * 스크롤·회전 때 어긋난다.
 */
export function spotlightPath(
  w: number,
  h: number,
  hole: TourRect,
  radius: number,
): string {
  const x = hole.x - PAD;
  const y = hole.y - PAD;
  const rw = hole.width + PAD * 2;
  const rh = hole.height + PAD * 2;
  const r = Math.max(0, Math.min(radius, rw / 2, rh / 2));
  return (
    `M0 0 H${w} V${h} H0 Z ` +
    `M${x + r} ${y} ` +
    `H${x + rw - r} A${r} ${r} 0 0 1 ${x + rw} ${y + r} ` +
    `V${y + rh - r} A${r} ${r} 0 0 1 ${x + rw - r} ${y + rh} ` +
    `H${x + r} A${r} ${r} 0 0 1 ${x} ${y + rh - r} ` +
    `V${y + r} A${r} ${r} 0 0 1 ${x + r} ${y} Z`
  );
}

export interface BubblePlacement {
  width: number;
  top: number;
  left: number;
  /** 구멍 위에 놓였는지 (꼬리 방향 결정용) */
  above: boolean;
}

/**
 * 말풍선 자리.
 *
 * 기본은 구멍 아래. 아래로 넘치면 위로 올린다. 좌우로는 구멍 중앙에
 * 맞추되 화면 밖으로 나가지 않게 붙인다.
 */
export function placeBubble(
  hole: TourRect,
  screen: { width: number; height: number },
  insets: { top: number; bottom: number },
): BubblePlacement {
  const width = Math.round(Math.min(BUBBLE_MAX_W, screen.width - 32));
  const below = hole.y + hole.height + PAD + GAP;
  const above = below + BUBBLE_EST_H > screen.height - insets.bottom - 20;
  const top = above
    ? Math.max(insets.top + 12, hole.y - PAD - GAP - BUBBLE_EST_H)
    : below;
  const left = Math.min(
    Math.max(16, hole.x + hole.width / 2 - width / 2),
    Math.max(16, screen.width - width - 16),
  );
  // 소수 좌표는 프레임마다 반올림이 달라져 미세한 떨림으로 보인다
  return { width, top: Math.round(top), left: Math.round(left), above };
}

/**
 * 대상을 화면 안으로 넣기 위해 스크롤할 양 (양수 = 아래로).
 *
 * 0 이면 그대로 두면 된다. 6px 미만은 무시한다 — 그 정도로 스크롤하면
 * 화면만 덜컹하고 보이는 건 달라지지 않는다.
 */
export function scrollDeltaFor(
  hole: TourRect,
  screenHeight: number,
  safeTop = 110,
  bubbleRoom = 300,
): number {
  const safeBottom = screenHeight - bubbleRoom;
  let dy = 0;
  if (hole.y + hole.height > safeBottom) dy = hole.y + hole.height - safeBottom;
  else if (hole.y < safeTop) dy = hole.y - safeTop;
  return Math.abs(dy) < 6 ? 0 : dy;
}
