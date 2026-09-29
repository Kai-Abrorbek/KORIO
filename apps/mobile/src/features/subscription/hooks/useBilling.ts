import { useCallback, useEffect, useRef, useState } from "react";
import { getAvailablePurchases as queryPurchases, useIAP } from "expo-iap";
import type { Purchase } from "expo-iap";
import { SubscriptionApi } from "../services/subscription.api";
import type { SubscriptionTier } from "../services/products";
import {
  SUBSCRIPTION_SKUS,
  buildSubscriptionRequest,
  extractRestorable,
  extractToken,
  findReplaceable,
  isStoreBillingSupported,
  toStorePlans,
  type StorePlan,
} from "../services/billing.service";

type Phase = "idle" | "loading" | "purchasing" | "verifying" | "restoring";

/**
 * Google Play 결제 한 사이클.
 *
 * 순서가 중요하다:
 *   결제 → purchaseToken → 서버 검증 → finishTransaction
 *
 * finishTransaction 을 서버 검증 **전에** 부르면, 검증이 실패했을 때
 * 거래는 이미 소비돼 버려서 유저는 돈을 냈는데 프리미엄이 없는 상태가 된다.
 * 반대로 검증 뒤에 부르면, 검증이 실패해도 거래가 살아있어서 다음 실행 때
 * purchaseUpdated 로 다시 들어온다(자동 복구).
 */
export function useBilling(onPremiumChanged?: () => void) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [plans, setPlans] = useState<StorePlan[]>([]);
  const [error, setError] = useState<string | null>(null);
  // 같은 토큰을 두 번 처리하지 않게 (리스너가 중복 발화하는 경우가 있다)
  const handling = useRef<Set<string>>(new Set());

  const {
    connected,
    subscriptions,
    fetchProducts,
    requestPurchase,
    finishTransaction,
  } = useIAP({
    onPurchaseSuccess: (purchase) => {
      void handlePurchase(purchase);
    },
    onPurchaseError: (e) => {
      // 유저가 그냥 닫은 것도 에러로 온다. 그건 에러 문구를 띄우지 않는다.
      const cancelled = /cancel/i.test(e?.code ?? "") || /cancel/i.test(e?.message ?? "");
      setPhase("idle");
      setError(cancelled ? null : (e?.message ?? "PURCHASE_FAILED"));
    },
    onError: (e) => setError(e?.message ?? null),
  });

  /** 상품 목록 조회. 가격은 스토어가 준 값을 그대로 쓴다 */
  const loadPlans = useCallback(async () => {
    if (!isStoreBillingSupported || !connected) return;
    setPhase("loading");
    try {
      await fetchProducts({ skus: SUBSCRIPTION_SKUS, type: "subs" });
    } catch (e) {
      setError((e as Error)?.message ?? "LOAD_PLANS_FAILED");
    } finally {
      setPhase("idle");
    }
  }, [connected, fetchProducts]);

  useEffect(() => {
    void loadPlans();
  }, [loadPlans]);

  useEffect(() => {
    setPlans(toStorePlans(subscriptions ?? []));
  }, [subscriptions]);

  /** 결제 결과 처리. 서버 검증이 끝난 뒤에만 거래를 닫는다 */
  const handlePurchase = useCallback(
    async (purchase: Purchase) => {
      const info = extractToken(purchase);
      // pending(계좌이체 등)은 아직 돈이 안 빠졌다. 서버 알림으로 들어온다.
      if (!info) {
        setPhase("idle");
        return;
      }
      if (handling.current.has(info.purchaseToken)) return;
      handling.current.add(info.purchaseToken);

      setPhase("verifying");
      try {
        await SubscriptionApi.verifyGooglePurchase(
          info.purchaseToken,
          info.productId,
        );
        // 서버가 인정한 뒤에야 거래를 닫는다
        await finishTransaction({ purchase, isConsumable: false });
        onPremiumChanged?.();
        setError(null);
      } catch (e) {
        // 거래를 닫지 않았으므로 다음 실행 때 다시 들어온다
        setError((e as Error)?.message ?? "VERIFY_FAILED");
      } finally {
        handling.current.delete(info.purchaseToken);
        setPhase("idle");
      }
    },
    [finishTransaction, onPremiumChanged],
  );

  const subscribe = useCallback(
    async (plan: StorePlan) => {
      setError(null);
      setPhase("purchasing");
      try {
        // 이미 Play 구독이 있으면 교체로 산다 (안 그러면 이중 결제)
        const owned = await queryPurchases().catch(() => [] as Purchase[]);
        const current = findReplaceable(owned, plan.productId);
        await requestPurchase(buildSubscriptionRequest(plan, current));
        // 결과는 onPurchaseSuccess 로 온다
      } catch (e) {
        setPhase("idle");
        setError((e as Error)?.message ?? "PURCHASE_FAILED");
      }
    },
    [requestPurchase],
  );

  /** 재설치·기기변경 복원 */
  const restore = useCallback(async () => {
    if (!isStoreBillingSupported) return;
    setPhase("restoring");
    setError(null);
    try {
      // 훅의 availablePurchases 는 다음 렌더에야 채워진다. 여기서 읽으면
      // 첫 탭엔 항상 비어 있어서 "복원할 구매 없음" 이 떴다 → 결과를 직접 받는다
      const owned = await queryPurchases();
      const items = extractRestorable(owned);
      if (!items.length) {
        setError("NO_PURCHASES_TO_RESTORE");
        return;
      }
      await SubscriptionApi.restoreGooglePurchases(items);
      onPremiumChanged?.();
    } catch (e) {
      setError((e as Error)?.message ?? "RESTORE_FAILED");
    } finally {
      setPhase("idle");
    }
  }, [onPremiumChanged]);

  const plansByTier = (tier: SubscriptionTier) =>
    plans.filter((p) => p.tier === tier);

  return {
    supported: isStoreBillingSupported,
    connected,
    plans,
    plansByTier,
    phase,
    busy: phase !== "idle",
    error,
    subscribe,
    restore,
    reloadPlans: loadPlans,
  };
}
