/**
 * 연속 학습 보상 상자(3·6·9…일째)를 축하 흐름 사이에 끼운다 (앱 utils/streak-chest-route 와 같음).
 *
 * 축하 순서: 연속 학습 도장 → **연속 보상 상자** → 스코어 상승 → 노드 상자 → 원래 가던 곳.
 * 원래 가려던 URL 을 `next` 로 싸서 상자 화면에 넘기고, 상자 화면은 받고 나면 거기로 간다.
 * 보석 카운터가 이어지게 뒤 화면의 gemTotal 에 이번 보석을 더해 준다.
 */
export function viaStreakChest(next: string, params: URLSearchParams): string {
  const gems = Number(params.get("streakChestGems")) || 0;
  if (!gems) return next;

  const base = Number(params.get("gemTotal")) || 0;
  let after = next;
  const [path, query = ""] = next.split("?");
  if (query) {
    const nextParams = new URLSearchParams(query);
    if (nextParams.has("gemTotal")) {
      nextParams.set("gemTotal", String((Number(nextParams.get("gemTotal")) || 0) + gems));
      after = `${path}?${nextParams.toString()}`;
    }
  }

  const chest = new URLSearchParams({
    category: params.get("category") ?? "",
    days: params.get("streakChestDays") ?? "",
    from: params.get("from") ?? "",
    gemTotal: String(base),
    gems: String(gems),
    grade: "gold",
    kind: "streak",
    next: after,
  });
  return `/chest-reward?${chest.toString()}`;
}
