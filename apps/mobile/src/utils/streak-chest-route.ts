import { router, type Href } from "expo-router";
import { useAuthStore } from "@/store/auth.store";

/** 학습 모드를 완료했을 때 서버가 주는 축하 묶음 (LessonsService.celebrateStudyDay) */
export interface StudyCelebration {
  dailyStreak: {
    streak: number;
    longest: number;
    week: { date: string; studied: boolean; isToday: boolean; future: boolean }[];
  } | null;
  streakChest: { grade: string; gems: number; streak: number } | null;
  /** 상자까지 받은 뒤의 보석 */
  gems: number;
}

/**
 * 축하가 끝나고 갈 곳.
 *  - Href: 그 화면으로 교체 (TOPIK 결과처럼 다음 화면이 정해져 있을 때)
 *  - "back": 축하 화면을 위에 띄웠다가 닫고 원래 화면으로 돌아온다
 *    (말하기·표현처럼 완료 화면이 제자리에 떠 있을 때)
 */
export type CelebrationNext = Href | "back";

/**
 * 연속 학습 보상 상자(3·6·9…일째)를 축하 흐름 사이에 끼운다.
 *
 * 축하 순서: 연속 학습 도장 → **연속 보상 상자** → 스코어 상승 → 노드 상자 → 원래 가던 곳.
 * 원래 가려던 곳을 `next` 로 싸서 넘기고, 상자 화면은 받고 나면 거기로 간다.
 *
 * 보석 카운터가 이어지게 뒤 화면의 gemTotal 에 이번 보석을 더해 준다 —
 * 안 더하면 노드 상자 화면이 200 적은 숫자에서 다시 세기 시작한다.
 */
export function viaStreakChest(
  next: CelebrationNext,
  p: {
    streakChestGems?: string;
    streakChestDays?: string;
    gemTotal?: string;
    category?: string;
    from?: string;
  },
): Href {
  const gems = Number(p.streakChestGems ?? 0);
  if (!gems) return next as Href;

  const base = Number(p.gemTotal ?? 0) || 0;
  let after: CelebrationNext = next;
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
      next: after === "back" ? "back" : JSON.stringify(after),
    },
  };
}

/** 축하 화면의 `next` 파라미터를 풀어 그리로 간다 */
export function goNext(next: string | undefined, fallback: () => void) {
  if (next === "back") {
    if (router.canGoBack()) router.back();
    else fallback();
    return;
  }
  if (next) {
    try {
      router.replace(JSON.parse(next) as Href);
      return;
    } catch {
      // 깨진 값이면 기본 경로로
    }
  }
  fallback();
}

/**
 * 어휘 외 학습 모드(표현·말하기·TOPIK·문법·리스닝)를 완료한 뒤 축하를 띄운다.
 * 축하할 게 없으면 false — 호출한 쪽이 원래대로 진행한다.
 */
export function openCelebration(
  celebration: StudyCelebration | null | undefined,
  next: CelebrationNext,
): boolean {
  if (!celebration) return false;
  const { dailyStreak, streakChest } = celebration;
  if (!dailyStreak && !streakChest) return false;
  // 상자 보석은 이미 들어갔다 — 헤더 숫자도 맞춰 둔다
  if (streakChest) {
    useAuthStore.getState().updateUser({ gems: celebration.gems } as any);
  }

  const gemTotal = String(
    Math.max(0, (celebration.gems ?? 0) - (streakChest?.gems ?? 0)),
  );
  const nextParam = next === "back" ? "back" : JSON.stringify(next);
  // 제자리 완료 화면이면 위에 띄우고(닫으면 돌아옴), 다음 화면이 있으면 교체
  const go = (href: Href) =>
    next === "back" ? router.push(href) : router.replace(href);

  if (dailyStreak) {
    go({
      pathname: "/streak-day",
      params: {
        streak: String(dailyStreak.streak),
        week: JSON.stringify(dailyStreak.week),
        streakChestGems: streakChest ? String(streakChest.gems) : "",
        streakChestDays: streakChest ? String(streakChest.streak) : "",
        gemTotal,
        next: nextParam,
      },
    });
    return true;
  }

  go(
    viaStreakChest(next, {
      streakChestGems: String(streakChest!.gems),
      streakChestDays: String(streakChest!.streak),
      gemTotal,
    }),
  );
  return true;
}
