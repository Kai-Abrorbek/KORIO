import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import {
  BatteryBadge,
  SuperInfinityBadge,
  ENERGY_COLORS,
} from "./BatteryBadge";
import { useEffect, useState } from "react";

interface Props {
  energy?: number;
  maxEnergy?: number;
  gems?: number;
  etaHours?: number;
  etaMinutes?: number;
  refillCost?: number;
  nextRefillHours?: number;
  onClose?: () => void;
  onTrySuper?: () => void;
  onRefill?: () => void;
  onWidgetBoost?: () => void;
  onWatchAd?: () => void;
  secondsToNext?: number;
  freeRemaining?: number;
  canRefill?: boolean;
  onFree?: () => void;
}

export default function EnergyScreen({
  energy = 5,
  maxEnergy = 25,
  gems = 20,
  etaHours = 19,
  etaMinutes = 4,
  refillCost = 350,
  nextRefillHours = 1,
  onClose,
  onTrySuper,
  onRefill,
  onWidgetBoost,
  onWatchAd,
  secondsToNext = 0,
  freeRemaining = 0,
  canRefill = false,
  onFree,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const fillPct = Math.max(0, Math.min(1, energy / maxEnergy)) * 100;
  const isFull = energy >= maxEnergy;
  // "N시간 N분" 실시간 감소 (1초마다)
  const [remainSec, setRemainSec] = useState(etaHours * 3600 + etaMinutes * 60);

  useEffect(() => {
    setRemainSec(etaHours * 3600 + etaMinutes * 60);
  }, [etaHours, etaMinutes]);

  useEffect(() => {
    if (energy >= maxEnergy) return;
    const id = setInterval(() => setRemainSec((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [energy, maxEnergy]);

  const rh = Math.floor(remainSec / 3600);
  const rm = Math.floor((remainSec % 3600) / 60);

  return (
    <View style={s.container}>
      {/* 헤더 */}
      <View style={s.header}>
        <TouchableOpacity onPress={onClose} hitSlop={12}>
          <Ionicons name="close" size={28} color={theme.textSecondary} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{t("energy.title")}</Text>
        <View style={s.gem}>
          <Ionicons name="diamond" size={20} color={ENERGY_COLORS.gem} />
          <Text style={s.gemText}>{gems}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 충전 상태 */}
        <View style={s.chargeRow}>
          <Text style={s.chargeLabel}>
            {isFull ? t("energy.full") : t("energy.charging")}
          </Text>
          {!isFull && (
            <View style={s.etaWrap}>
              <Ionicons name="flash" size={16} color={theme.textSecondary} />
              <Text style={s.etaText}>
                {t("energy.timeToFull", { h: rh, m: rm })}
              </Text>
            </View>
          )}
        </View>

        {/* 큰 진행 바 */}
        <View style={s.barRow}>
          <View style={s.track}>
            <View style={[s.trackFill, { width: `${fillPct}%` }]} />
            <Text style={s.trackText}>{`${energy} / ${maxEnergy}`}</Text>
          </View>
          <View style={[s.barCap, isFull && s.barCapFull]}>
            <Ionicons
              name="flash"
              size={20}
              color={isFull ? "#fff" : "#B9B9C4"}
            />
          </View>
        </View>

        {/* SUPER 카드 */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onTrySuper}
          style={s.superCard}
        >
          <LinearGradient
            colors={[ENERGY_COLORS.superA, ENERGY_COLORS.superB]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={s.superStrip}
          >
            <Text style={s.superStripText}>SUPER</Text>
          </LinearGradient>
          <View style={s.superBody}>
            <SuperInfinityBadge size={50} />
            <Text style={s.rowLabel}>{t("energy.unlimited")}</Text>
            <Text style={[s.action, { color: ENERGY_COLORS.magenta }]}>
              {t("energy.freeTrial")}
            </Text>
          </View>
        </TouchableOpacity>

        {/* 충전하기 */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onRefill}
          disabled={isFull || !canRefill}
          style={[s.card, (isFull || !canRefill) && { opacity: 0.5 }]}
        >
          <BatteryBadge value={maxEnergy} fill="gray" size={50} />
          <Text style={[s.rowLabel, { color: ENERGY_COLORS.numGray }]}>
            {t("energy.refill")}
          </Text>
          <View style={s.gem}>
            <Ionicons name="diamond" size={18} color="#B9B9C4" />
            <Text style={[s.gemText, { color: theme.textSecondary }]}>
              {refillCost}
            </Text>
          </View>
        </TouchableOpacity>

        {/* 위젯 부스트 */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onWidgetBoost}
          style={s.card}
        >
          <View style={s.newBadge}>
            <Text style={s.newBadgeText}>{t("energy.new")}</Text>
          </View>
          <BatteryBadge value={8} fill="pink" fillFraction={0.32} size={50} />
          <Text style={s.rowLabel}>{t("energy.widgetBoost")}</Text>
          <Text style={[s.action, { color: ENERGY_COLORS.blue }]}>
            {t("energy.install")}
          </Text>
        </TouchableOpacity>

        {/* 광고로 +5 */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onWatchAd}
          style={s.card}
        >
          <BatteryBadge value={5} fill="pink" fillFraction={0.42} size={50} />
          <Text style={s.rowLabel}>{t("energy.plusFive")}</Text>
          <Text style={[s.action, { color: ENERGY_COLORS.blue }]}>
            {t("energy.watchAd")}
          </Text>
        </TouchableOpacity>

        {/* 자동 충전 (비활성) */}
        {/* 무료 +5 (하루 제한) */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onFree}
          disabled={freeRemaining <= 0}
          style={[s.card, freeRemaining <= 0 && { opacity: 0.5 }]}
        >
          <BatteryBadge value={5} fill="gray" size={50} />
          <Text
            style={[
              s.rowLabel,
              freeRemaining <= 0 && { color: ENERGY_COLORS.numGray },
            ]}
          >
            {t("energy.plusFive")}
          </Text>
          <Text
            style={[
              s.action,
              {
                color:
                  freeRemaining > 0 ? ENERGY_COLORS.blue : theme.textSecondary,
              },
            ]}
          >
            {freeRemaining > 0
              ? t("energy.freeCount", { n: freeRemaining })
              : t("energy.freeDone")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 56,
      paddingHorizontal: 20,
      paddingBottom: 8,
    },
    headerTitle: { fontSize: 20, fontWeight: "800", color: theme.text },
    gem: { flexDirection: "row", alignItems: "center", gap: 5 },
    gemText: { fontSize: 18, fontWeight: "800", color: ENERGY_COLORS.gemText },
    chargeRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      marginTop: 28,
      marginBottom: 10,
    },
    chargeLabel: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    etaWrap: { flexDirection: "row", alignItems: "center", gap: 4 },
    etaText: { fontSize: 16, fontWeight: "700", color: theme.textSecondary },
    barRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      paddingHorizontal: 20,
      marginBottom: 28,
    },
    track: {
      flex: 1,
      height: 25,
      backgroundColor: "#E9E9EF",
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
      fontSize: 17,
      fontWeight: "800",
      color: theme.surface,
    },
    barCap: {
      width: 56,
      height: 25,
      borderRadius: 8,
      backgroundColor: "#E9E9EF",
      alignItems: "center",
      justifyContent: "center",
    },
    barCapFull: {
      backgroundColor: ENERGY_COLORS.pink,
    },
    superCard: {
      marginHorizontal: 20,
      marginBottom: 16,
      borderRadius: 18,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      overflow: "hidden",
    },
    superStrip: {
      paddingVertical: 8,
      paddingHorizontal: 18,
    },
    superStripText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "900",
      fontStyle: "italic",
      letterSpacing: 1,
    },
    superBody: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 16,
      gap: 14,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      marginHorizontal: 20,
      marginBottom: 16,
      borderRadius: 18,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      paddingVertical: 18,
      paddingHorizontal: 16,
    },
    rowLabel: { flex: 1, fontSize: 19, fontWeight: "800", color: theme.text },
    action: { fontSize: 16, fontWeight: "800" },
    newBadge: {
      position: "absolute",
      top: -10,
      right: 16,
      backgroundColor: ENERGY_COLORS.pink,
      borderRadius: 99,
      paddingHorizontal: 12,
      paddingVertical: 4,
    },
    newBadgeText: { color: "#fff", fontSize: 12, fontWeight: "800" },
  });
