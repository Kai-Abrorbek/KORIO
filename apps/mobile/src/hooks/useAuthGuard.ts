import { useEffect, useState } from "react";
import { useGlobalSearchParams, useRouter, useSegments } from "expo-router";
import { useAuthStore } from "@/store/auth.store";

/**
 * 로그인 없이 볼 수 있고, **로그인했으면 오히려 못 보는** 화면.
 * 로그인한 사람이 뒤로가기나 딥링크로 로그인 화면에 다시 들어가면
 * "로그인" 버튼이 있는 죽은 화면을 보게 된다.
 */
const PUBLIC_ONLY = new Set(["welcome", "auth"]);

/**
 * 로그인 여부와 무관하게 열려 있는 화면.
 *
 * 온보딩(설문 + 수준 진단)은 가입 전에 돈다. 이게 이 앱의 가입 유도 경로다 —
 * 진단 결과까지 보여준 뒤 결과 화면에서 로그인으로 넘긴다.
 * 서버도 그렇게 열려 있다: GET /lessons/level-test 와 POST /onboarding/* 는
 * 가드가 없고, 비로그인 결과는 sessionId 로 저장됐다가 가입할 때 붙는다.
 */
const ALWAYS_OPEN = new Set(["onboarding"]);

/**
 * 레벨 테스트만은 예외로 /lesson 위에서 돈다.
 *
 * 문제 22종을 다 그릴 수 있는 화면이 lesson.tsx 뿐이라서다.
 * (app/onboarding/level-test.tsx 라는 같은 기능의 화면이 남아 있지만 8종만
 *  렌더해서 나머지가 빈 화면이 된다. 아무도 호출하지 않는다 — 지울 것)
 *
 * 그래서 경로만으로는 판단할 수 없고 mode 를 같이 본다. 이 예외로 열리는 건
 * 레벨 테스트 흐름뿐이고, 그 안에서 부르는 API 는 원래 공개 엔드포인트다.
 */
const LEVEL_TEST_ROUTE = "lesson";

/**
 * 저장된 로그인 정보가 복원됐는지.
 *
 * persist 가 AsyncStorage 라 복원이 비동기다. 복원 전에는 isLoggedIn 이 무조건
 * false 라서, 그 상태로 판단하면 이미 로그인한 사람을 로그인 화면으로 밀어낸다.
 * 그리고 복원이 끝나도 되돌리는 규칙이 없으면 거기 갇힌다.
 */
export function useAuthHydrated(): boolean {
  const [hydrated, setHydrated] = useState(() =>
    useAuthStore.persist.hasHydrated(),
  );

  useEffect(() => {
    if (hydrated) return;
    return useAuthStore.persist.onFinishHydration(() => setHydrated(true));
  }, [hydrated]);

  return hydrated;
}

/**
 * 화면 접근 규칙을 한 곳에서 강제한다.
 *
 *   비로그인 + 보호된 화면   → 로그인으로
 *   로그인   + 로그인/웰컴   → 온보딩 미완이면 온보딩, 아니면 메인
 *   그 외                    → 그대로 둔다
 *
 * 온보딩을 끝낸 사람이 온보딩 화면에 있는 경우는 일부러 안 막는다.
 * `onboarding/level-test` 가 마지막 문제를 풀자마자 isOnboardingCompleted 를
 * 켜는데, 거기서 쫓아내면 결과 화면을 못 보고 튕긴다.
 */
export function useAuthGuard(): boolean {
  const router = useRouter();
  const segments = useSegments();
  const hydrated = useAuthHydrated();

  const params = useGlobalSearchParams<{ mode?: string }>();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const onboarded = useAuthStore((s) => !!s.user?.isOnboardingCompleted);

  useEffect(() => {
    if (!hydrated) return;

    const root = segments[0];
    // 루트(스플래시)는 자기가 알아서 분기한다. 여기서 또 건드리면 두 번 이동한다
    if (root === undefined) return;

    const publicOnly = PUBLIC_ONLY.has(root);
    const inLevelTest = root === LEVEL_TEST_ROUTE && params.mode === "levelTest";

    if (!isLoggedIn) {
      if (!publicOnly && !ALWAYS_OPEN.has(root) && !inLevelTest) {
        router.replace("/auth/login");
      }
      return;
    }

    if (publicOnly) {
      router.replace(onboarded ? "/(tabs)" : "/onboarding/survey");
    }
  }, [hydrated, isLoggedIn, onboarded, segments, params.mode, router]);

  return hydrated;
}
