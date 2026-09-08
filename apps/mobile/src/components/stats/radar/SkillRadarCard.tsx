import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { StatsService } from "@/services/stats.service";
import type { SkillRadar } from "@/types/stats";
import StatsCard from "../shared/StatsCard";
import RadarChart from "./RadarChart";

/** 진단 종류별 아이콘·색 */
const DIAG_STYLE: Record<string, { icon: keyof typeof Ionicons.glyphMap; color: string }> = {
  noData: { icon: "hourglass-outline", color: "#9AA0A6" },
  balanced: { icon: "checkmark-circle", color: "#1D9E75" },
  weakSpot: { icon: "alert-circle", color: "#E2A83A" },
  untouched: { icon: "add-circle", color: "#45B7D1" },
  accuracyDrop: { icon: "trending-down", color: "#FF6B6B" },
};

/**
 * 스킬 레이더 카드.
 *
 * 기존 통계는 "얼마나 했나"(시간·문제 수)를 보여준다. 이건 "무엇을 잘하고
 * 무엇이 약한가"를 본다. 유저가 통계를 보는 이유는 대개 후자다.
 *
 * 그래프만 두면 "그래서 뭘 하라고?" 로 끝나기 때문에, 위에 한 줄 진단을
 * 붙이고 아래에 축별 정확도를 깔았다. 그래프 → 진단 → 근거 순으로 읽힌다.
 */
export default function SkillRadarCard() {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const { width } = useWindowDimensions();
  const [data, setData] = useState<SkillRadar | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let alive = true;
      StatsService.getSkills()
        .then((res) => alive && setData(res))
        .catch((err) => console.error("skills 로드 실패:", err))
        .finally(() => alive && setLoading(false));
      return () => {
        alive = false;
      };
    }, []),
  );

  if (loading && !data) {
    return (
      <StatsCard>
        <View style={s.loading}>
          <ActivityIndicator color={theme.primary} />
        </View>
      </StatsCard>
    );
  }
  if (!data) return null;

  const { skills, diagnosis } = data;
  const labels = skills.map((sk) => t(`stats.category.${sk.category}`));
  // 카드 좌우 여백(16*2) + 내부 패딩(18*2) 을 뺀 폭에 맞춘다
  const chartSize = Math.min(300, width - 32 - 36);

  const diagStyle = DIAG_STYLE[diagnosis.key] ?? DIAG_STYLE.balanced;
  const diagText = t(`stats.radar.diagnosis.${diagnosis.key}`, {
    category: diagnosis.category
      ? t(`stats.category.${diagnosis.category}`)
      : "",
    strongest: diagnosis.strongest
      ? t(`stats.category.${diagnosis.strongest}`)
      : "",
    weakest: diagnosis.weakest ? t(`stats.category.${diagnosis.weakest}`) : "",
  });

  return (
    <StatsCard>
      <View style={s.header}>
        <Text style={s.title}>{t("stats.radar.title")}</Text>
        <Text style={s.range}>
          {t("stats.radar.range", { days: data.rangeDays })}
        </Text>
      </View>

      {/* 한 줄 진단 — 그래프보다 먼저 읽히게 위에 둔다 */}
      <Animated.View
        entering={FadeIn.duration(400)}
        style={[s.diag, { borderLeftColor: diagStyle.color }]}
      >
        <Ionicons name={diagStyle.icon} size={18} color={diagStyle.color} />
        <Text style={s.diagText}>{diagText}</Text>
      </Animated.View>

      <View style={s.chartWrap}>
        <RadarChart
          skills={skills}
          labels={labels}
          weakest={diagnosis.key === "noData" ? null : diagnosis.weakest}
          size={chartSize}
          theme={theme}
        />
      </View>

      {/* 축별 근거 */}
      <View style={s.list}>
        {[...skills]
          .sort((a, b) => b.score - a.score)
          .map((sk, i) => {
            const isWeak = diagnosis.weakest === sk.category && diagnosis.key !== "noData";
            const isStrong = diagnosis.strongest === sk.category && i === 0;
            return (
              <Animated.View
                key={sk.category}
                entering={FadeInDown.delay(i * 45).duration(320)}
                style={s.row}
              >
                <Text style={s.rowName} numberOfLines={1}>
                  {t(`stats.category.${sk.category}`)}
                </Text>

                <View style={s.barTrack}>
                  <View
                    style={[
                      s.barFill,
                      {
                        width: `${Math.max(3, sk.score)}%`,
                        backgroundColor: isWeak
                          ? "#FF6B6B"
                          : isStrong
                            ? "#1D9E75"
                            : theme.primary,
                      },
                    ]}
                  />
                </View>

                <Text style={s.rowValue}>
                  {sk.attempted === 0
                    ? t("stats.radar.notYet")
                    : sk.accuracy === null
                      ? `${sk.attempted}`
                      : `${Math.round(sk.accuracy * 100)}%`}
                </Text>
              </Animated.View>
            );
          })}
      </View>

      <Text style={s.foot}>
        {t("stats.radar.foot", { count: data.totalAttempted })}
      </Text>
    </StatsCard>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    loading: { paddingVertical: 60, alignItems: "center" },
    header: {
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    title: { fontSize: 16, fontWeight: "800", color: theme.text },
    range: { fontSize: 11.5, color: theme.textSecondary, fontWeight: "600" },
    diag: {
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
      backgroundColor: theme.bg,
      borderRadius: 12,
      borderLeftWidth: 3,
      paddingVertical: 11,
      paddingHorizontal: 12,
      marginBottom: 6,
    },
    diagText: {
      flex: 1,
      fontSize: 13,
      lineHeight: 18,
      fontWeight: "600",
      color: theme.text,
    },
    chartWrap: { alignItems: "center", paddingVertical: 8 },
    list: { gap: 9, marginTop: 6 },
    row: { flexDirection: "row", alignItems: "center", gap: 10 },
    rowName: {
      width: 62,
      fontSize: 12,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    barTrack: {
      flex: 1,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.bg,
      overflow: "hidden",
    },
    barFill: { height: "100%", borderRadius: 4 },
    rowValue: {
      width: 46,
      textAlign: "right",
      fontSize: 12,
      fontWeight: "800",
      color: theme.text,
    },
    foot: {
      marginTop: 14,
      fontSize: 11,
      color: theme.textSecondary,
      textAlign: "center",
    },
  });
