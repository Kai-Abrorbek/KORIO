import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { EnergyService, type EnergyState } from "@/services/energy.service";
import { ShopService, type GemPassList } from "@/services/shop.service";
import { useAuthStore } from "@/store/auth.store";
import PremiumPassCard from "./PremiumPassCard";
import WithdrawCard from "./WithdrawCard";

/**
 * 상점 (Do'kon).
 *
 * 예전 에너지 화면을 넓힌 것이다. 거기엔 누르면 아무 일도 안 하는 줄이 둘
 * 있었고(위젯 부스트 · 광고 보기 — 콜백이 `() => {}`), 보석을 쓸 데는 에너지
 * 충전 하나뿐이었다. 이제 보석의 주 용도는 프리미엄 기간이다.
 *
 * 순서는 보석을 쓰는 값어치 순이다: 프리미엄 → 에너지 → 출금.
 */
export default function ShopScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const s = styles(theme);

  const [energy, setEnergy] = useState<EnergyState | null>(null);
  const [passes, setPasses] = useState<GemPassList | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const syncUser = (next: { energy?: number; gems?: number }) => {
    const cur = useAuthStore.getState().user;
    if (cur) {
      useAuthStore.getState().setUserData({ ...cur, ...next } as never);
    }
  };

  const load = useCallback(() => {
    void Promise.all([
      EnergyService.getState().catch(() => null),
      ShopService.getGemPasses().catch(() => null),
    ])
      .then(([e, p]) => {
        if (e) {
          setEnergy(e);
          syncUser({ energy: e.energy, gems: e.gems });
        }
        if (p) setPasses(p);
      })
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  /** 서버는 에러 코드만 준다. 여기서 유저 언어로 바꾼다 */
  const explain = (e: unknown) => {
    const code = (e as { message?: string })?.message;
    return t(`shop.errors.${code}`, {
      defaultValue: t("shop.errors.UNKNOWN"),
    });
  };

  const buyPass = async (passId: string, days: number) => {
    if (busy) return;
    setBusy(true);
    try {
      const res = await ShopService.redeemGemPass(passId);
      setPasses((prev) =>
        prev
          ? {
              ...prev,
              gems: res.gems,
              premiumUntil: res.premiumUntil,
              stackedDays: prev.stackedDays + days,
            }
          : prev,
      );
      syncUser({ gems: res.gems });
      Alert.alert("", t("shop.passDone", { n: days }));
      load();
    } catch (e) {
      Alert.alert("", explain(e));
    } finally {
      setBusy(false);
    }
  };

  const refill = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const next = await EnergyService.refill();
      setEnergy(next);
      syncUser({ energy: next.energy, gems: next.gems });
      setPasses((prev) => (prev ? { ...prev, gems: next.gems } : prev));
    } catch (e) {
      Alert.alert("", explain(e));
    } finally {
      setBusy(false);
    }
  };

  const claimFree = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const next = await EnergyService.claimFree();
      setEnergy(next);
      syncUser({ energy: next.energy, gems: next.gems });
    } catch (e) {
      Alert.alert("", explain(e));
    } finally {
      setBusy(false);
    }
  };

  const close = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  const gems = passes?.gems ?? energy?.gems ?? 0;
  const basePerDay = passes?.passes[0]?.perDay ?? 0;
  const until = passes?.premiumUntil ? new Date(passes.premiumUntil) : null;
  const untilLabel = until
    ? `${until.getFullYear()}.${String(until.getMonth() + 1).padStart(2, "0")}.${String(until.getDate()).padStart(2, "0")}`
    : null;

  if (loading) {
    return (
      <View style={[s.container, s.center]}>
        <ActivityIndicator size="large" color="#776ee2" />
      </View>
    );
  }

  return (
    <View style={s.container}>
      <View style={[s.header, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={close} hitSlop={10}>
          <Ionicons name="close" size={28} color={theme.text} />
        </Pressable>
        <Text style={s.headerTitle}>{t("home.shop")}</Text>
        <View style={s.gemChip}>
          <Ionicons name="diamond" size={16} color="#1CB0F6" />
          <Text style={s.gemChipText}>{gems.toLocaleString("en-US")}</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          s.scroll,
          { paddingBottom: insets.bottom + 32 },
        ]}
      >
        {/* ── 프리미엄 기간권 ── */}
        <Text style={s.sectionLabel}>{t("shop.premiumTitle")}</Text>
        <Text style={s.sectionDesc}>{t("shop.premiumDesc")}</Text>

        {untilLabel && (
          <View style={s.untilChip}>
            <Ionicons name="shield-checkmark" size={15} color="#58CC02" />
            <Text style={s.untilText}>
              {t("shop.premiumUntil", { date: untilLabel })}
            </Text>
          </View>
        )}

        {passes?.passes.map((pass) => (
          <PremiumPassCard
            key={pass.id}
            pass={pass}
            basePerDay={basePerDay}
            busy={busy}
            onPress={() => void buyPass(pass.id, pass.days)}
          />
        ))}

        {passes && passes.stackedDays >= passes.maxStackDays && (
          <Text style={s.hint}>
            {t("shop.stackLimit", { n: passes.maxStackDays })}
          </Text>
        )}

        {/* ── 에너지 ── */}
        <Text style={[s.sectionLabel, { marginTop: 26 }]}>
          {t("shop.energyTitle")}
        </Text>

        <View style={s.energyCard}>
          <View style={s.energyTop}>
            <Ionicons name="flash" size={20} color="#FFC800" />
            <Text style={s.energyNum}>
              {energy?.energy ?? 0} / {energy?.maxEnergy ?? 25}
            </Text>
            {!!energy?.etaMinutes || !!energy?.etaHours ? (
              <Text style={s.energyEta}>
                {t("energy.timeToFull", {
                  h: energy?.etaHours ?? 0,
                  m: energy?.etaMinutes ?? 0,
                })}
              </Text>
            ) : null}
          </View>
          <View style={s.energyTrack}>
            <View
              style={[
                s.energyFill,
                {
                  width: `${Math.min(100, ((energy?.energy ?? 0) / (energy?.maxEnergy ?? 25)) * 100)}%`,
                },
              ]}
            />
          </View>

          <Pressable
            disabled={busy || gems < (energy?.refillCost ?? 350)}
            onPress={() => void refill()}
            style={({ pressed }) => [
              s.energyRow,
              (busy || gems < (energy?.refillCost ?? 350)) && { opacity: 0.45 },
              pressed && { opacity: 0.7 },
            ]}
          >
            <Text style={s.energyRowLabel}>{t("energy.refill")}</Text>
            <View style={s.energyRowRight}>
              <Ionicons name="diamond" size={15} color="#1CB0F6" />
              <Text style={s.energyRowValue}>{energy?.refillCost ?? 350}</Text>
            </View>
          </Pressable>

          <Pressable
            disabled={busy || (energy?.freeRemaining ?? 0) <= 0}
            onPress={() => void claimFree()}
            style={({ pressed }) => [
              s.energyRow,
              (busy || (energy?.freeRemaining ?? 0) <= 0) && { opacity: 0.45 },
              pressed && { opacity: 0.7 },
            ]}
          >
            <Text style={s.energyRowLabel}>{t("energy.plusFive")}</Text>
            <Text style={s.energyRowFree}>
              {t("shop.freeLeft", { n: energy?.freeRemaining ?? 0 })}
            </Text>
          </Pressable>
        </View>

        {/* ── 출금 (UI 만) ── */}
        <Text style={[s.sectionLabel, { marginTop: 26 }]}>
          {t("shop.withdrawSection")}
        </Text>
        <WithdrawCard gems={gems} />
      </ScrollView>
    </View>
  );
}

const styles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    center: { alignItems: "center", justifyContent: "center" },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingBottom: 12,
    },
    headerTitle: { fontSize: 18, fontWeight: "800", color: theme.text },
    gemChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 11,
      paddingVertical: 6,
      borderRadius: 14,
      backgroundColor: "#1CB0F618",
    },
    gemChipText: { fontSize: 13, fontWeight: "800", color: "#1CB0F6" },
    scroll: { paddingHorizontal: 20 },
    sectionLabel: {
      fontSize: 13,
      fontWeight: "800",
      color: theme.textSecondary,
      marginBottom: 6,
      letterSpacing: 0.4,
    },
    sectionDesc: {
      fontSize: 12,
      lineHeight: 18,
      color: theme.textSecondary,
      marginBottom: 12,
    },
    untilChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      alignSelf: "flex-start",
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 12,
      backgroundColor: "#58CC0218",
      marginBottom: 12,
    },
    untilText: { fontSize: 12, fontWeight: "700", color: "#58CC02" },
    hint: {
      fontSize: 12,
      lineHeight: 18,
      color: theme.textSecondary,
      textAlign: "center",
      marginTop: 2,
    },
    energyCard: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: 20,
      padding: 18,
      gap: 12,
    },
    energyTop: { flexDirection: "row", alignItems: "center", gap: 8 },
    energyNum: {
      fontSize: 18,
      fontWeight: "800",
      color: theme.text,
      fontVariant: ["tabular-nums"],
    },
    energyEta: {
      flex: 1,
      textAlign: "right",
      fontSize: 11,
      color: theme.textSecondary,
    },
    energyTrack: {
      height: 8,
      borderRadius: 8,
      backgroundColor: theme.border,
      overflow: "hidden",
    },
    energyFill: { height: 8, borderRadius: 8, backgroundColor: "#FFC800" },
    energyRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: 46,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      paddingTop: 10,
    },
    energyRowLabel: { fontSize: 15, fontWeight: "700", color: theme.text },
    energyRowRight: { flexDirection: "row", alignItems: "center", gap: 5 },
    energyRowValue: { fontSize: 15, fontWeight: "800", color: theme.text },
    energyRowFree: { fontSize: 13, fontWeight: "700", color: "#1CB0F6" },
  });
