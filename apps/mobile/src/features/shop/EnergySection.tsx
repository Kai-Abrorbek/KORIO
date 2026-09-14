import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import { BatteryBadge, ENERGY_COLORS } from "@/components/energy/BatteryBadge";

/**
 * 상점의 에너지 구역.
 *
 * ⚠️ **SUPER 유저에게는 이 구역을 통째로 렌더하지 않는다.** SUPER 는 에너지를
 *    쓰지 않으므로(consume 이 그냥 돌아온다) 잔량도 충전도 의미가 없다. 예전에는
 *    큰 트랙바만 남아 "25/25" 를 보여줬는데, 안 쓰는 숫자를 띄워두면 유저는
 *    이게 뭔가 의미가 있다고 믿는다. 호출부(ShopScreen)에서 아예 안 그린다.
 */
interface Props {
  energy: number;
  maxEnergy: number;
  etaHours: number;
  etaMinutes: number;
  refillCost: number;
  freeRemaining: number;
  canRefill: boolean;
  busy: boolean;
  onRefill: () => void;
  onFree: () => void;
}

export default function EnergySection({
  energy,
  maxEnergy,
  etaHours,
  etaMinutes,
  refillCost,
  freeRemaining,
  canRefill,
  busy,
  onRefill,
  onFree,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);

  const isFull = energy >= maxEnergy;
  const pct = Math.max(0, Math.min(1, energy / maxEnergy));

  // 트랙바는 값이 바뀔 때 스르륵 찬다. 툭 바뀌면 충전된 게 안 보인다.
  const fill = useSharedValue(pct);
  useEffect(() => {
    fill.value = withTiming(pct, { duration: 520 });
  }, [pct, fill]);
  const fillStyle = useAnimatedStyle(() => ({
    width: `${fill.value * 100}%`,
  }));

  // "N시간 N분" 을 1초마다 실제로 깎는다
  const [remainSec, setRemainSec] = useState(etaHours * 3600 + etaMinutes * 60);
  useEffect(() => {
    setRemainSec(etaHours * 3600 + etaMinutes * 60);
  }, [etaHours, etaMinutes]);
  useEffect(() => {
    if (isFull) return;
    const id = setInterval(() => setRemainSec((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(id);
  }, [isFull]);

  const rh = Math.floor(remainSec / 3600);
  const rm = Math.floor((remainSec % 3600) / 60);

  const tap = (fn: () => void) => () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    fn();
  };

  const refillOff = isFull || !canRefill || busy;
  const freeOff = freeRemaining <= 0 || isFull || busy;

  return (
    <>
      <View style={s.sectionHead}>
        <Text style={s.sectionLabel}>{t("shop.energyTitle")}</Text>
        {!isFull && (
          <View style={s.etaWrap}>
            <Ionicons name="time-outline" size={13} color={theme.textSecondary} />
            <Text style={s.etaText}>
              {t("energy.timeToFull", { h: rh, m: rm })}
            </Text>
          </View>
        )}
      </View>

      {/* 잔량 */}
      <View style={s.barRow}>
        <View style={s.track}>
          <Animated.View style={[s.trackFill, fillStyle]} />
          <Text style={s.trackText}>{`${energy} / ${maxEnergy}`}</Text>
        </View>
        <View style={[s.barCap, isFull && s.barCapFull]}>
          <Ionicons name="flash" size={18} color={isFull ? "#fff" : "#B9B9C4"} />
        </View>
      </View>

      {/* 충전하기 — 가득이면 서버가 ENERGY_ALREADY_FULL 로 막지만,
          버튼이 눌리는 것 자체가 "보석이 나갈 수도 있다" 로 읽힌다 */}
      <Pressable
        onPress={tap(onRefill)}
        disabled={refillOff}
        style={({ pressed }) => [
          s.row,
          refillOff && s.rowOff,
          pressed && !refillOff && s.rowPressed,
        ]}
      >
        <BatteryBadge value={maxEnergy} fill="pink" fillFraction={1} size={46} />
        <View style={s.rowMid}>
          <Text style={s.rowLabel}>{t("energy.refill")}</Text>
          {isFull && <Text style={s.rowSub}>{t("energy.full")}</Text>}
        </View>
        <View style={s.priceChip}>
          <Ionicons name="diamond" size={15} color="#3BB6E5" />
          <Text style={s.priceText}>{refillCost.toLocaleString("en-US")}</Text>
        </View>
      </Pressable>

      {/* 무료 +5 (하루 제한). 가득이면 하루치 무료분을 태우므로 막는다 */}
      <Pressable
        onPress={tap(onFree)}
        disabled={freeOff}
        style={({ pressed }) => [
          s.row,
          freeOff && s.rowOff,
          pressed && !freeOff && s.rowPressed,
        ]}
      >
        <BatteryBadge value={5} fill="gray" size={46} />
        <View style={s.rowMid}>
          <Text style={s.rowLabel}>{t("energy.plusFive")}</Text>
        </View>
        <Text
          style={[
            s.action,
            { color: freeRemaining > 0 ? ENERGY_COLORS.blue : theme.textSecondary },
          ]}
        >
          {freeRemaining > 0
            ? t("energy.freeCount", { n: freeRemaining })
            : t("energy.freeDone")}
        </Text>
      </Pressable>
    </>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    sectionHead: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      marginTop: 22,
      marginBottom: 10,
    },
    sectionLabel: {
      fontSize: 13,
      fontWeight: "900",
      letterSpacing: 0.6,
      color: theme.textSecondary,
      textTransform: "uppercase",
    },
    etaWrap: { flexDirection: "row", alignItems: "center", gap: 4 },
    etaText: { fontSize: 12, fontWeight: "700", color: theme.textSecondary },
    barRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 20,
      marginBottom: 14,
    },
    track: {
      flex: 1,
      height: 24,
      backgroundColor: theme.border,
      borderRadius: 8,
      justifyContent: "center",
      overflow: "hidden",
    },
    trackFill: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      backgroundColor: ENERGY_COLORS.pink,
      borderRadius: 8,
    },
    trackText: {
      textAlign: "center",
      fontSize: 15,
      fontWeight: "900",
      color: "#fff",
    },
    barCap: {
      width: 50,
      height: 24,
      borderRadius: 8,
      backgroundColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    barCapFull: { backgroundColor: ENERGY_COLORS.pink },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      marginHorizontal: 20,
      marginBottom: 12,
      borderRadius: 18,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 5,
      paddingVertical: 13,
      paddingHorizontal: 15,
    },
    rowPressed: { transform: [{ translateY: 3 }], borderBottomWidth: 2 },
    rowOff: { opacity: 0.5 },
    rowMid: { flex: 1, gap: 2 },
    rowLabel: { fontSize: 16, fontWeight: "900", color: theme.text },
    rowSub: { fontSize: 12, fontWeight: "700", color: theme.textSecondary },
    action: { fontSize: 14, fontWeight: "900" },
    priceChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 12,
      backgroundColor: theme.bg === "#ffffff" ? "#F2FAFE" : "#2E2E39",
    },
    priceText: { fontSize: 15, fontWeight: "900", color: "#3BB6E5" },
  });
