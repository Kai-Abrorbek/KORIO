import type { Href } from "expo-router";

/**
 * 연속 학습 보상 상자(3·6·9…일째)를 축하 흐름 사이에 끼운다.
 *
 * 축하 순서: 연속 학습 도장 → **연속 보상 상자** → 스코어 상승 → 노드 상자 → 원래 가던 곳.
 * 화면마다 "다음에 어디로" 를 직접 정하던 구조라, 상자 하나를 끼우려면 그 결정을
 * 통째로 상자 화면에 맡긴다: 원래 가려던 곳을 `next` 로 싸서 넘기고, 상자 화면은
 * 받고 나면 거기로 간다.
 *
 * 보석 카운터가 이어지게 뒤 화면의 gemTotal 에 이번 보석을 더해 준다 —
 * 안 더하면 노드 상자 화면이 200 적은 숫자에서 다시 세기 시작한다.
 */
export function viaStreakChest(
  next: Href,
  p: {
    streakChestGems?: string;
    streakChestDays?: string;
    gemTotal?: string;
    category?: string;
    from?: string;
  },
): Href {
  const gems = Number(p.streakChestGems ?? 0);
  if (!gems) return next;

  const base = Number(p.gemTotal ?? 0) || 0;
  let after: Href = next;
  if (typeof next === "object" && next && "params" in next && next.params) {
    const params = next.params as Record<string, string>;
    if (params.gemTotal !== undefined) {
      after = {
        ...next,
        params: { ...params, gemTotal: String((Number(params.gemTotal) || 0) + gems) },
      } as Href;
    }
  }

  return {
    pathname: "/chest-reward",
    params: {
      grade: "gold",
      gems: String(gems),
      gemTotal: String(base),
      kind: "streak",
      days: p.streakChestDays ?? "",
      category: p.category ?? "",
      from: p.from ?? "",
      next: JSON.stringify(after),
    },
  };
}
