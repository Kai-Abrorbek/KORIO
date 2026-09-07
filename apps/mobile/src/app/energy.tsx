import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useTranslation } from "react-i18next";
import EnergyScreen from "@/components/energy/EnergyScreen";
import { EnergyService, EnergyState } from "@/services/energy.service";
import { useAuthStore } from "@/store/auth.store";

export default function EnergyRoute() {
  const router = useRouter();
  const { t } = useTranslation();
  const setUserData = useAuthStore((s) => s.setUserData);
  const user = useAuthStore((s) => s.user);
  const [state, setState] = useState<EnergyState | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    EnergyService.getState()
      .then((s) => {
        setState(s);
        // 스토어 최신 user를 직접 읽어서 동기화 (의존성에 user 안 넣음)
        const cur = useAuthStore.getState().user;
        if (cur) {
          useAuthStore
            .getState()
            .setUserData({ ...cur, energy: s.energy, gems: s.gems } as any);
        }
      })
      .catch((e) => console.error("에너지 로드 실패:", e))
      .finally(() => setLoading(false));
  }, []); // ← user 뺌

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const close = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  /**
   * 서버는 에러 코드만 준다 (NOT_ENOUGH_GEMS 등). 여기서 유저 언어로 바꾼다.
   *
   * 예전엔 e?.response?.data?.message 를 읽었는데 그건 axios 모양이다.
   * 이 앱의 api 래퍼는 fetch 라 항상 undefined 였고, 결국 언제나 한국어
   * 고정 문구가 떴다 — 우즈벡 유저한테도.
   */
  const explain = (e: any) =>
    t(`energy.errors.${e?.message}`, {
      defaultValue: t("energy.errors.UNKNOWN"),
    });

  const handleRefill = async () => {
    try {
      const s = await EnergyService.refill();
      setState(s);
      if (user) setUserData({ ...user, energy: s.energy, gems: s.gems } as any);
    } catch (e: any) {
      Alert.alert("", explain(e));
    }
  };

  const handleFree = async () => {
    try {
      const s = await EnergyService.claimFree();
      setState(s);
      if (user) setUserData({ ...user, energy: s.energy, gems: s.gems } as any);
    } catch (e: any) {
      Alert.alert("", explain(e));
    }
  };

  return (
    <EnergyScreen
      energy={state?.energy ?? 0}
      maxEnergy={state?.maxEnergy ?? 25}
      gems={state?.gems ?? 0}
      etaHours={state?.etaHours ?? 0}
      etaMinutes={state?.etaMinutes ?? 0}
      secondsToNext={state?.secondsToNext ?? 0}
      refillCost={state?.refillCost ?? 350}
      freeRemaining={state?.freeRemaining ?? 0}
      canRefill={(state?.gems ?? 0) >= (state?.refillCost ?? 350)}
      onClose={close}
      onTrySuper={() => {
        router.push("/premium");
      }}
      onRefill={handleRefill}
      onWidgetBoost={() => {}}
      onWatchAd={() => {}} // 광고: 나중에
      onFree={handleFree}
    />
  );
}
