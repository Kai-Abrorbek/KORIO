/** 학습 모드를 완료했을 때 서버가 주는 축하 묶음 (LessonsService.celebrateStudyDay) */
export interface StudyCelebration {
  dailyStreak: {
    longest: number;
    streak: number;
    week: { date: string; future: boolean; isToday: boolean; studied: boolean }[];
  } | null;
  streakChest: { gems: number; grade: string; streak: number } | null;
  /** 상자까지 받은 뒤의 보석 */
  gems: number;
}

/**
 * 축하가 끝나고 갈 곳: URL 이면 그리로 교체, "back" 이면 위에 띄웠다가 닫고 돌아온다
 * (앱 utils/streak-chest-route 와 같은 규칙)
 */
export type CelebrationNext = string;

/**
 * 연속 학습 보상 상자(3·6·9…일째)를 축하 흐름 사이에 끼운다.
 *
 * 축하 순서: 연속 학습 도장 → **연속 보상 상자** → 스코어 상승 → 노드 상자 → 원래 가던 곳.
 * 원래 가려던 URL 을 `next` 로 싸서 상자 화면에 넘기고, 상자 화면은 받고 나면 거기로 간다.
 * 보석 카운터가 이어지게 뒤 화면의 gemTotal 에 이번 보석을 더해 준다.
 */
export function viaStreakChest(next: CelebrationNext, params: URLSearchParams): string {
  const gems = Number(params.get("streakChestGems")) || 0;
  if (!gems) return next;

  const base = Number(params.get("gemTotal")) || 0;
  let after = next;
  const [path, query = ""] = next.split("?");
  if (query && next !== "back") {
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

interface MiniRouter {
  back: () => void;
  push: (href: string) => void;
  replace: (href: string) => void;
}

/** 축하 화면의 `next` 를 따라간다. 없으면 fallback */
export function goNext(router: MiniRouter, next: string | null, fallback: () => void) {
  if (next === "back") {
    if (window.history.length > 1) router.back();
    else fallback();
    return;
  }
  if (next && next.startsWith("/")) {
    router.replace(next);
    return;
  }
  fallback();
}

/**
 * 어휘 외 학습 모드(표현·말하기·TOPIK·문법·리스닝)를 완료한 뒤 축하를 띄운다.
 * 축하할 게 없으면 false — 호출한 쪽이 원래대로 진행한다.
 */
export function openCelebration(
  router: MiniRouter,
  celebration: StudyCelebration | null | undefined,
  next: CelebrationNext,
  onGems?: (gems: number) => void,
): boolean {
  if (!celebration) return false;
  const { dailyStreak, streakChest } = celebration;
  if (!dailyStreak && !streakChest) return false;
  // 상자 보석은 이미 들어갔다 — 헤더 숫자도 맞춰 둔다
  if (streakChest) onGems?.(celebration.gems);

  const gemTotal = String(Math.max(0, (celebration.gems ?? 0) - (streakChest?.gems ?? 0)));
  const go = (href: string) => (next === "back" ? router.push(href) : router.replace(href));

  const params = new URLSearchParams({
    gemTotal,
    next,
    streakChestDays: streakChest ? String(streakChest.streak) : "",
    streakChestGems: streakChest ? String(streakChest.gems) : "",
  });
  if (dailyStreak) {
    params.set("streak", String(dailyStreak.streak));
    params.set("week", JSON.stringify(dailyStreak.week));
    go(`/streak-day?${params.toString()}`);
    return true;
  }
  go(viaStreakChest(next, params));
  return true;
}
