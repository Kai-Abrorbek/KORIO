import { useCallback } from "react";
import { useAuthStore } from "@/store/auth.store";
import { usePremiumGateStore } from "@/store/premium-gate.store";
import { canUseFeature, hasTaster, isPremiumNow, type Feature } from "./access";

/**
 * 기능 진입 게이트.
 *
 * 사용법은 에너지 게이트(guardLessonStart)와 같은 모양으로 맞췄다:
 *   const { requirePremium } = useFeatureAccess();
 *   onPress={() => requirePremium("topik", () => router.push("/topik-sections"))}
 *
 * 통과하면 onAllowed 를 실행하고, 막히면 구독 모달을 띄운다.
 */
export function useFeatureAccess() {
  // 셀렉터로 딱 두 값만 구독한다. user 통째로 구독하면 XP 가 바뀔 때마다
  // 게이트를 쓰는 화면이 전부 리렌더된다.
  const isSuper = useAuthStore((s) => s.user?.isSuper);
  const superExpiresAt = useAuthStore((s) => s.user?.superExpiresAt);
  const openGate = usePremiumGateStore((s) => s.open);

  const user = { isSuper, superExpiresAt };
  const isPremium = isPremiumNow(user);

  const canUse = useCallback(
    (feature: Feature) => canUseFeature(user, feature),
    [isSuper, superExpiresAt],
  );

  const requirePremium = useCallback(
    (feature: Feature, onAllowed: () => void, taster?: () => void) => {
      if (canUseFeature(user, feature)) {
        onAllowed();
        return true;
      }
      // 맛보기가 있는 기능이면 모달에서 들어갈 길을 남긴다
      openGate(feature, hasTaster(feature) ? (taster ?? onAllowed) : undefined);
      return false;
    },
    [isSuper, superExpiresAt, openGate],
  );

  return { isPremium, canUse, requirePremium };
}
