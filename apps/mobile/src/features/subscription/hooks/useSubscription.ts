import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import {
  SubscriptionApi,
  type MySubscription,
} from "../services/subscription.api";

/**
 * 프리미엄 권한 하나만 보는 훅.
 *
 * 웹에서 결제했든 안드로이드에서 결제했든 서버가 같은 답을 준다.
 * 화면은 결제 수단을 알 필요가 없다.
 *
 * auth.store 의 isSuper 도 같이 맞춰준다 — 기존 화면 20여 곳이 그걸 읽고 있어서
 * 결제 직후 헤더·로드맵이 바로 바뀌게 하려면 여기서 동기화해야 한다.
 */
export function useSubscription() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const updateUser = useAuthStore((s) => s.updateUser);
  const [sub, setSub] = useState<MySubscription | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!isLoggedIn) {
      setSub(null);
      return null;
    }
    setLoading(true);
    try {
      const res = await SubscriptionApi.me();
      setSub(res);
      updateUser({ isSuper: res.isPremium });
      return res;
    } catch {
      // 권한 조회 실패로 프리미엄을 꺼버리면, 네트워크가 잠깐 끊긴 유료 유저가
      // 기능을 잃는다. 조회 실패는 "모름"이지 "구독 없음"이 아니다.
      return null;
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn, updateUser]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    subscription: sub,
    isPremium: sub?.isPremium ?? false,
    isTrial: sub?.isTrial ?? false,
    trialDaysLeft: sub?.trialDaysLeft ?? null,
    loading,
    refresh,
  };
}
