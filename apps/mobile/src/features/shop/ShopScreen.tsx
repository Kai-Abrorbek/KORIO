import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import EnergyScreen from "@/components/energy/EnergyScreen";
import { useTheme } from "@/hooks/useTheme";
import { EnergyService, type EnergyState } from "@/services/energy.service";
import {
  ShopService,
  type GemPass,
  type GemPassList,
} from "@/services/shop.service";
import { ApiError } from "@/services/api";
import { useAuthStore } from "@/store/auth.store";
import WithdrawCard from "./WithdrawCard";

/**
 * 상점 (Do'kon) — 데이터만 담당한다.
 *
 * 화면은 기존 에너지 화면(components/energy/EnergyScreen)을 그대로 쓴다.
 * 배터리 배지·그라디언트·큰 트랙바 같은 디자인이 이미 잡혀 있어서, 새로
 * 그리면 마감이 뒤로 간다. 섹션만 늘렸다.
 */
export default function ShopScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  const [energy, setEnergy] = useState<EnergyState | null>(null);
  const [passList, setPassList] = useState<GemPassList | null>(null);
  const [passesUnavailable, setPassesUnavailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const syncUser = (next: { energy?: number; gems?: number }) => {
    const cur = useAuthStore.getState().user;
    if (cur) useAuthStore.getState().setUserData({ ...cur, ...next } as never);
  };

  const load = useCallback(() => {
    void Promise.all([
      EnergyService.getState().catch(() => null),
      ShopService.getGemPasses().catch((e: unknown) => {
        // 서버에 아직 이 엔드포인트가 없으면(배포 전) 목록이 빈 채로 뜬다.
        // 조용히 비워두면 "상품이 없다" 로 읽히므로 화면이 이유를 말하게 한다.
        if (e instanceof ApiError) setPassesUnavailable(true);
        return null;
      }),
    ])
      .then(([e, p]) => {
        if (e) {
          setEnergy(e);
          syncUser({ energy: e.energy, gems: e.gems });
        }
        if (p) {
          setPassList(p);
          setPassesUnavailable(false);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  /** 서버는 에러 코드만 준다. 여기서 유저 언어로 바꾼다 */
  const explain = (e: unknown) =>
    t(`shop.errors.${(e as { message?: string })?.message}`, {
      defaultValue: t("shop.errors.UNKNOWN"),
    });

  const run = async (fn: () => Promise<void>) => {
    if (busy) return;
    setBusy(true);
    try {
      await fn();
    } catch (e) {
      Alert.alert("", explain(e));
    } finally {
      setBusy(false);
    }
  };

  const buyPass = (pass: GemPass) =>
    run(async () => {
      const res = await ShopService.redeemGemPass(pass.id);
      syncUser({ gems: res.gems });
      Alert.alert("", t("shop.passDone", { n: res.days }));
      load();
    });

  const refill = () =>
    run(async () => {
      const next = await EnergyService.refill();
      setEnergy(next);
      syncUser({ energy: next.energy, gems: next.gems });
      load();
    });

  const claimFree = () =>
    run(async () => {
      const next = await EnergyService.claimFree();
      setEnergy(next);
      syncUser({ energy: next.energy, gems: next.gems });
    });

  const close = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.bg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#776ee2" />
      </View>
    );
  }

  const gems = passList?.gems ?? energy?.gems ?? 0;
  const until = passList?.premiumUntil ? new Date(passList.premiumUntil) : null;
  const untilLabel = until
    ? `${until.getFullYear()}.${String(until.getMonth() + 1).padStart(2, "0")}.${String(until.getDate()).padStart(2, "0")}`
    : null;

  return (
    <EnergyScreen
      energy={energy?.energy ?? 0}
      maxEnergy={energy?.maxEnergy ?? 25}
      gems={gems}
      etaHours={energy?.etaHours ?? 0}
      etaMinutes={energy?.etaMinutes ?? 0}
      secondsToNext={energy?.secondsToNext ?? 0}
      refillCost={energy?.refillCost ?? 350}
      freeRemaining={energy?.freeRemaining ?? 0}
      canRefill={gems >= (energy?.refillCost ?? 350)}
      isSuper={energy?.isSuper ?? false}
      passes={passList?.passes ?? []}
      passesUnavailable={passesUnavailable}
      premiumUntilLabel={untilLabel}
      busy={busy}
      onBuyPass={buyPass}
      onClose={close}
      onTrySuper={() => router.push("/premium")}
      onRefill={refill}
      onFree={claimFree}
    >
      <WithdrawCard gems={gems} />
    </EnergyScreen>
  );
}
