import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { StudyPeriod, VolumePoint } from "@/types/stats";
import { CATEGORY_COLORS, CATEGORY_LIST } from "@/mocks/stats.mock";
import StatsCard from "../shared/StatsCard";
import PeriodSelector from "../shared/PeriodSelector";

interface Props {
  points: VolumePoint[];
  avgPerDay: number;
}

const CHART_HEIGHT = 140;
const BAR_GAP = 14;

function StackedBar({
  point,
  maxTotal,
  index,
}: {
  point: VolumePoint;
  maxTotal: number;
  index: number;
}) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const total =
    point.vocab +
    point.grammar +
    point.expression +
    point.conversation +
    point.listening;

  const height = useSharedValue(0);

  useEffect(() => {
    height.value = withDelay(
      index * 60,
      withTiming((total / maxTotal) * CHART_HEIGHT, {
        duration: 700,
        easing: Easing.out(Easing.cubic),
      }),
    );
  }, [total, maxTotal, index, height]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  if (total === 0) {
    return <View style={styles.barEmpty} />;
  }

  return (
    <Animated.View style={[styles.barFill, animatedStyle]}>
      {CATEGORY_LIST.map((cat) => {
        const v = point[cat];
        if (v === 0) return null;
        return (
          <View
            key={cat}
            style={{
              flex: v,
              backgroundColor: CATEGORY_COLORS[cat],
            }}
          />
        );
      })}
    </Animated.View>
  );
}

export default function StudyVolumeChart({ points, avgPerDay }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const themed = getStyles(theme);
  const [period, setPeriod] = useState<StudyPeriod>("week");

  const totals = points.map(
    (p) => p.vocab + p.grammar + p.expression + p.conversation + p.listening,
  );
  const maxTotal = Math.max(...totals, 1);

  return (
    <StatsCard>
      <PeriodSelector value={period} onChange={setPeriod} />
      <Text style={themed.title}>{t("stats.studyVolume")}</Text>
      <Text style={themed.subtitle}>
        {t("stats.avgVolume")}{" "}
        <Text style={themed.accent}>
          {t("stats.problemsCount", { count: avgPerDay })}
        </Text>
        {t("stats.avgVolumeSuffix")}
      </Text>

      {/* 카테고리 범례 */}
      <View style={themed.legendRow}>
        {CATEGORY_LIST.map((cat) => (
          <View key={cat} style={themed.legendItem}>
            <View
              style={[
                themed.legendDot,
                { backgroundColor: CATEGORY_COLORS[cat] },
              ]}
            />
            <Text style={themed.legendText}>{t(`stats.category.${cat}`)}</Text>
          </View>
        ))}
      </View>

      <View style={themed.chart}>
        <View style={themed.bars}>
          {points.map((p, i) => (
            <View key={i} style={themed.barCol}>
              <StackedBar point={p} maxTotal={maxTotal} index={i} />
            </View>
          ))}
        </View>
        <View style={themed.labels}>
          {points.map((p, i) => (
            <Text
              key={i}
              style={[
                themed.labelText,
                p.label === "오늘" && themed.labelTextActive,
              ]}
            >
              {p.label}
            </Text>
          ))}
        </View>
      </View>
    </StatsCard>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    title: {
      fontSize: 17,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 13,
      color: theme.textSecondary,
      marginBottom: 14,
    },
    accent: {
      color: "#776ee2",
      fontWeight: "700",
    },
    legendRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginBottom: 18,
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    legendDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    legendText: {
      fontSize: 11,
      color: theme.textSecondary,
      fontWeight: "600",
    },
    chart: {
      gap: 8,
    },
    bars: {
      flexDirection: "row",
      justifyContent: "space-between",
      height: CHART_HEIGHT,
      alignItems: "flex-end",
      paddingHorizontal: 4,
    },
    barCol: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-end",
      marginHorizontal: BAR_GAP / 4,
    },
    barFill: {
      width: "100%",
      borderRadius: 6,
      overflow: "hidden",
    },
    barEmpty: {
      width: "100%",
      height: 4,
      backgroundColor: theme.border,
      borderRadius: 2,
    },
    labels: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 4,
    },
    labelText: {
      fontSize: 12,
      color: theme.textSecondary,
      fontWeight: "600",
      flex: 1,
      textAlign: "center",
    },
    labelTextActive: {
      color: theme.text,
      fontWeight: "700",
    },
  });
