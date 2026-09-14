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
import type { GemPass } from "@/services/shop.service";

/**
 * 상점(Do'kon) 본문.
 *
 * 원래는 에너지 전용 화면이었다. 보석을 쓸 데가 에너지 하나일 때는 그게
 * 맞았지만, 지금은 프리미엄 기간권이 주 용도다. 디자인(배터리 배지·그라디언트·
 * 큰 트랙바)은 그대로 두고 섹션만 늘렸다.
 *
 * 걷어낸 것: 위젯 부스트 · 광고로 +5 — 둘 다 콜백이 `() => {}` 라 눌러도
 * 아무 일도 일어나지 않았다.
 */
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
  /** SUPER 면 에너지를 아예 안 쓴다 — 충전 줄을 감춘다 */
  isSuper?: boolean;
  passes?: GemPass[];
  /** 서버에서 기간권을 못 받아온 경우 (미배포·네트워크) */
  passesUnavailable?: boolean;
  premiumUntilLabel?: string | null;
  onBuyPass?: (pass: GemPass) => void;
  busy?: boolean;
  children?: React.ReactNode;
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
  isSuper = false,
  passes = [],
  passesUnavailable = false,
  premiumUntilLabel = null,
  onBuyPass,
  busy = false,
  children,
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
        <Text style={s.headerTitle}>{t("home.shop")}</Text>
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

        {/* ── 프리미엄 기간권 ── 보석의 주 용도 */}
        <Text style={s.sectionLabel}>{t("shop.premiumTitle")}</Text>
        <Text style={s.sectionDesc}>{t("shop.premiumDesc")}</Text>

        {premiumUntilLabel && (
          <View style={s.untilChip}>
            <Ionicons name="shield-checkmark" size={15} color="#58CC02" />
            <Text style={s.untilText}>
              {t("shop.premiumUntil", { date: premiumUntilLabel })}
            </Text>
          </View>
        )}

        {passesUnavailable ? (
          // 조용히 빈 목록을 보여주면 "상품이 없다" 로 읽힌다. 왜 안 뜨는지 말한다.
          <View style={[s.card, { justifyContent: "center" }]}>
            <Text style={[s.rowLabel, { color: ENERGY_COLORS.numGray }]}>
              {t("shop.passesUnavailable")}
            </Text>
          </View>
        ) : (
          passes.map((pass) => {
            const base = passes[0]?.perDay ?? 0;
            const save =
              base > 0 ? Math.round((1 - pass.perDay / base) * 100) : 0;
            const blocked = !pass.affordable || pass.overStack || busy;
            return (
              <TouchableOpacity
                key={pass.id}
                activeOpacity={0.9}
                disabled={blocked}
                onPress={() => onBuyPass?.(pass)}
                style={[s.card, blocked && { opacity: 0.5 }]}
              >
                <BatteryBadge value={pass.days} fill="pink" size={50} />
                <View style={{ flex: 1 }}>
                  <View style={s.passTop}>
                    <Text style={s.rowLabel}>
                      {t("shop.days", { n: pass.days })}
                    </Text>
                    {save > 0 && (
                      <View style={s.saveBadge}>
                        <Text style={s.saveText}>
                          {t("shop.save", { n: save })}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={s.passPerDay}>
                    {t("shop.perDay", {
                      n: pass.perDay.toLocaleString("en-US"),
                    })}
                  </Text>
                </View>
                <View style={s.gem}>
                  <Ionicons
                    name="diamond"
                    size={18}
                    color={ENERGY_COLORS.gem}
                  />
                  <Text style={s.gemText}>
                    {pass.gems.toLocaleString("en-US")}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}

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

        {/* ── 에너지 ── */}
        {!isSuper && (
          <Text style={[s.sectionLabel, { marginTop: 18 }]}>
            {t("shop.energyTitle")}
          </Text>
        )}

        {/* 충전하기.
            SUPER 는 에너지를 아예 안 쓰므로(consume 이 그냥 돌아온다) 이 줄을
            보여주면 안 된다 — 보석만 버리게 된다. 서버도 같이 막아뒀다. */}
        {!isSuper && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onRefill}
          disabled={isFull || !canRefill || busy}
          style={[s.card, (isFull || !canRefill || busy) && { opacity: 0.5 }]}
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
        )}

        {/* 위젯 부스트·광고 보기는 걷어냈다 — 콜백이 `() => {}` 라 눌러도
            아무 일도 일어나지 않는 줄이었다. 광고를 붙이면 그때 되살린다. */}

        {/* 무료 +5 (하루 제한). 가득이면 하루 3회뿐인 무료분을 태우므로 막는다 */}
        {!isSuper && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onFree}
          disabled={freeRemaining <= 0 || isFull || busy}
          style={[
            s.card,
            (freeRemaining <= 0 || isFull || busy) && { opacity: 0.5 },
          ]}
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
        )}

        {/* 출금 등 호출부가 얹는 섹션 */}
        {children}
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
    sectionLabel: {
      fontSize: 13,
      fontWeight: "800",
      color: theme.textSecondary,
      letterSpacing: 0.4,
      paddingHorizontal: 20,
      marginBottom: 4,
    },
    sectionDesc: {
      fontSize: 12,
      lineHeight: 18,
      color: theme.textSecondary,
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    untilChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      alignSelf: "flex-start",
      marginHorizontal: 20,
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 12,
      backgroundColor: "#58CC0218",
      marginBottom: 10,
    },
    untilText: { fontSize: 12, fontWeight: "700", color: "#58CC02" },
    passTop: { flexDirection: "row", alignItems: "center", gap: 8 },
    passPerDay: { fontSize: 12, color: theme.textSecondary, marginTop: 2 },
    saveBadge: {
      paddingHorizontal: 7,
      paddingVertical: 2,
      borderRadius: 8,
      backgroundColor: "#58CC0222",
    },
    saveText: { fontSize: 11, fontWeight: "800", color: "#58CC02" },
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
