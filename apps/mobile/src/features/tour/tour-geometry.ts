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
  left: number;
  /** 구멍 위에 놓였는지 */
  above: boolean;
  /** above=false 일 때: 컨테이너 위에서부터의 거리 */
  top?: number;
  /** above=true 일 때: 컨테이너 아래에서부터의 거리 */
  bottom?: number;
}

/** 말풍선이 아래에 편히 들어가려면 이만큼은 있어야 한다 */
export const MIN_BUBBLE_ROOM = 240;

/**
 * 말풍선 자리.
 *
 * ⚠️ **말풍선의 실제 높이를 쓰지 않는다.** 그게 이 함수의 요점이다.
 *
 * 예전엔 그려진 뒤 onLayout 으로 높이를 재서 위치를 보정했다. 그런데 위치를
 * 바꾸면 onLayout 이 다시 뜨고, 안드로이드는 뷰의 절대 위치에 따라 높이를
 * 다른 정수로 반올림한다 → 높이가 바뀌고 → 위치가 또 바뀌고 → 무한 왕복.
 * 말풍선이 위아래로 떨었다.
 *
 * 그래서 **높이를 아예 안 물어본다.** 아래에 놓을 땐 top 으로, 위에 놓을 땐
 * bottom 으로 붙인다. 어느 쪽이든 말풍선이 알아서 자라고, 자란다고 자리가
 * 다시 계산되지 않는다. 고리가 존재할 수 없다.
 *
 * 위에 붙이는 게 안전한 실패다: 내용이 예상보다 길어도 말풍선은 위로
 * 자라므로 아래쪽의 "다음" 버튼은 늘 화면 안에 남는다. 아래에 붙이면
 * 반대로 버튼이 화면 밖으로 밀려 투어가 거기서 끊긴다.
 */
export function placeBubble(
  hole: TourRect,
  screen: { width: number; height: number },
  insets: { top: number; bottom: number },
): BubblePlacement {
  const width = Math.round(Math.min(BUBBLE_MAX_W, screen.width - 32));
  const holeTop = hole.y - PAD;
  const holeBottom = hole.y + hole.height + PAD;

  const left = Math.round(
    Math.min(
      Math.max(16, hole.x + hole.width / 2 - width / 2),
      Math.max(16, screen.width - width - 16),
    ),
  );

  const roomBelow = screen.height - insets.bottom - 12 - (holeBottom + GAP);
  if (roomBelow >= MIN_BUBBLE_ROOM) {
    return { width, left, above: false, top: Math.round(holeBottom + GAP) };
  }
  // 아래가 좁으면 위로. 컨테이너 아래에서부터 재서 붙이므로 높이가 필요 없다
  return {
    width,
    left,
    above: true,
    bottom: Math.round(screen.height - holeTop + GAP),
  };
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
