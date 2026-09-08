import React from "react";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/auth.store";
import { usePremiumGateStore } from "@/store/premium-gate.store";
import { canUseFeature, type Feature } from "./access";

/**
 * 화면 자체를 막는 게이트.
 *
 * 버튼에 다는 게이트(useFeatureAccess)만으로는 부족하다 — 홈의
 * "이어서 학습하기" 는 계정에 저장된 learnMode 로 곧장 가고, 체험이 끝난
 * 계정은 그 값이 아직 topik/grammar 로 남아 있다. 그 경로로 들어오면
 * 버튼을 거치지 않으므로 여기서 되돌린다.
 *
 * 뒤로 갈 곳이 없으면 홈으로 보낸다 (딥링크로 바로 들어온 경우).
 */
export function usePremiumScreen(feature: Feature) {
  const router = useRouter();
  const isSuper = useAuthStore((s) => s.user?.isSuper);
  const superExpiresAt = useAuthStore((s) => s.user?.superExpiresAt);
  const openGate = usePremiumGateStore((s) => s.open);

  const allowed = canUseFeature({ isSuper, superExpiresAt }, feature);

  useEffect(() => {
    if (allowed) return;
    // 화면이 한 프레임 그려진 뒤에 빠져나가야 네비게이션이 꼬이지 않는다
    const id = setTimeout(() => {
      if (router.canGoBack()) router.back();
      else router.replace("/(tabs)");
      openGate(feature);
    }, 0);
    return () => clearTimeout(id);
  }, [allowed, feature, openGate, router]);

  return allowed;
}

/**
 * 화면 컴포넌트를 통째로 감싸는 형태.
 *
 * 훅을 쓰려면 컴포넌트 안에서 "모든 훅 뒤에" early return 을 넣어야 하는데,
 * 화면마다 훅 개수가 달라서 실수하기 쉽다. 밖에서 감싸면 그 문제가 없다.
 */
export function withPremiumScreen<P extends object>(
  Screen: React.ComponentType<P>,
  feature: Feature,
): React.ComponentType<P> {
  return function PremiumGuarded(props: P) {
    const allowed = usePremiumScreen(feature);
    if (!allowed) return null;
    return <Screen {...props} />;
  };
}
