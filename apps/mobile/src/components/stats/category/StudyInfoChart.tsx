import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
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
import {
  CategoryChartPoint,
  CategoryStats,
  StudyCategory,
  StudyPeriod,
} from "@/types/stats";
import { StatsService } from "@/services/stats.service";
import StatsCard from "../shared/StatsCard";
import PeriodSelector from "../shared/PeriodSelector";
import { CATEGORY_COLORS } from "@/constants/stats";

interface Props {
  category: StudyCategory;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CHART_WIDTH = SCREEN_WIDTH - 32 - 36;
const CHART_HEIGHT = 150;
const SEG_GAP = 3; // 색 구간 사이 간격
const SEG_MIN = 4; // 값이 있으면 최소 이만큼은 보이게

function getColors(category: StudyCategory) {
  const base = CATEGORY_COLORS[category] ?? "#776ee2";
  return {
    newWords: base,
    knownWords: `${base}99`, // 60%
    reviewWords: `${base}4D`, // 30%
    accuracy: base,
  };
}

const COLORS = {
  newWords: "#FFCD3C",
  knownWords: "#A6D5FF",
  reviewWords: "#A78BFA",
  accuracy: "#776ee2",
};

function getVisibleLabelIndices(period: StudyPeriod, count: number): number[] {
  if (period === "week" || period === "year") {
    return Array.from({ length: count }, (_, i) => i);
  }
  if (period === "month") {
    const idx: number[] = [];
    for (let i = 4; i < count; i += 5) idx.push(i);
    if (idx[idx.length - 1] !== count - 1) idx.push(count - 1);
    return idx;
  }
  const step = Math.max(1, Math.floor(count / 6));
  const idx: number[] = [];
  for (let i = 0; i < count; i += step) idx.push(i);
  if (idx[idx.length - 1] !== count - 1) idx.push(count - 1);
  return idx;
}

function StackedBar({
  point,
  maxTotal,
  index,
  barWidth,
  colors,
}: {
  point: CategoryChartPoint;
  maxTotal: number;
  index: number;
  barWidth: number;
  colors: ReturnType<typeof getColors>;
}) {
  const theme = useTheme();
  const total = point.newWords + point.knownWords + point.reviewWords;
  const height = useSharedValue(0);

  useEffect(() => {
    height.value = 0;
    height.value = withDelay(
      index * 40,
      withTiming(maxTotal > 0 ? (total / maxTotal) * CHART_HEIGHT : 0, {
        duration: 600,
        easing: Easing.out(Easing.cubic),
      }),
    );
  }, [total, maxTotal, index]);

  const animatedStyle = useAnimatedStyle(() => ({ height: height.value }));

  if (total === 0) {
    return (
      <View
        style={{
          width: barWidth,
          height: 4,
          borderRadius: 2,
          backgroundColor: theme.border,
          alignSelf: "flex-end",
        }}
      />
    );
  }

  return (
    <Animated.View
      style={[
        {
          width: barWidth,
          flexDirection: "column-reverse",
          gap: SEG_GAP,
        },
        animatedStyle,
      ]}
    >
      {(
        [
          ["newWords", point.newWords],
          ["knownWords", point.knownWords],
          ["reviewWords", point.reviewWords],
        ] as const
      ).map(([key, v]) =>
        v > 0 ? (
          <View
            key={key}
            style={{
              flex: v,
              minHeight: SEG_MIN,
              borderRadius: Math.min(4, barWidth / 2),
              backgroundColor: colors[key],
            }}
          />
        ) : null,
      )}
    </Animated.View>
  );
}

export default function StudyInfoChart({ category }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const themed = getStyles(theme);

  const [period, setPeriod] = useState<StudyPeriod>("week");
  const [stats, setStats] = useState<CategoryStats | null>(null);
  const [loading, setLoading] = useState(false);
  const colors = getColors(category);

  useEffect(() => {
    setLoading(true);
    StatsService.getCategory(category, period)
      .then(setStats)
      .catch((err) => console.error("category chart 로드 실패:", err))
      .finally(() => setLoading(false));
  }, [category, period]);

  if (!stats) {
    return (
      <StatsCard>
        <View style={themed.headerRow}>
          <PeriodSelector value={period} onChange={setPeriod} />
        </View>
        <View style={{ paddingVertical: 40, alignItems: "center" }}>
          <ActivityIndicator color={theme.primary} />
        </View>
      </StatsCard>
    );
  }

  const chart = stats.chart;
  const totals = chart.map((p) => p.newWords + p.knownWords + p.reviewWords);
  const maxTotal = Math.max(...totals, 1);
  const grandTotal = totals.reduce((a, b) => a + b, 0);
  const visibleLabels = getVisibleLabelIndices(period, chart.length);

  const todayKey = new Date().toISOString().split("T")[0];
  const fmt = (v: number | null) => (v == null ? "-" : v.toString());

  const gap = 4;
  const barWidth =
    chart.length > 0
      ? Math.max(4, (CHART_WIDTH - (chart.length - 1) * gap) / chart.length)
      : 0;

  return (
    <StatsCard>
      <View style={themed.headerRow}>
        <PeriodSelector value={period} onChange={setPeriod} />
        {loading && (
          <ActivityIndicator
            size="small"
            color={theme.primary}
            style={{ marginLeft: 8 }}
          />
        )}
      </View>

      <Text style={themed.title}>{t("stats.studyInfo")}</Text>

      {/* 막대 차트 */}
      <View style={[themed.chartArea, { height: CHART_HEIGHT }]}>
        {chart.map((p, i) => (
          <View
            key={i}
            style={{
              width: barWidth,
              marginRight: i === chart.length - 1 ? 0 : gap,
              height: CHART_HEIGHT,
              justifyContent: "flex-end",
            }}
          >
            <StackedBar
              point={p}
              maxTotal={maxTotal}
              index={i}
              barWidth={barWidth}
              colors={colors}
            />
          </View>
        ))}
      </View>

      {/* x축 라벨 */}
      <View style={themed.labelRow}>
        {chart.map((p, i) => {
          const isToday = p.date === todayKey || i === chart.length - 1;
          return (
            <View
              key={i}
              style={{
                width: barWidth,
                marginRight: i === chart.length - 1 ? 0 : gap,
                alignItems: "center",
              }}
            >
              {visibleLabels.includes(i) ? (
                <Text
                  style={[themed.labelText, isToday && themed.labelTextActive]}
                >
                  {p.label}
                </Text>
              ) : null}
            </View>
          );
        })}
      </View>

      {/* Total + Legend */}
      <View style={themed.totalRow}>
        <View>
          <Text style={themed.totalLabel}>Total</Text>
          <Text style={themed.totalValue}>{grandTotal}</Text>
        </View>

        <View style={themed.legendCol}>
          <LegendRow
            color={COLORS.newWords}
            label={t("stats.newWords")}
            value={fmt(stats.newWordsToday)}
          />
          <LegendRow
            color={COLORS.knownWords}
            label={t("stats.knownWords")}
            value={fmt(stats.knownWordsToday)}
          />
          <LegendRow
            color={COLORS.reviewWords}
            label={t("stats.reviewWords")}
            value={fmt(stats.reviewWordsToday)}
          />
          <LegendRow
            color={COLORS.accuracy}
            label={t("stats.reviewAccuracy")}
            value={
              stats.reviewAccuracy == null ? "-" : `${stats.reviewAccuracy}%`
            }
            outline
          />
        </View>
      </View>
    </StatsCard>
  );
}

function LegendRow({
  color,
  label,
  value,
  outline,
}: {
  color: string;
  label: string;
  value: string;
  outline?: boolean;
}) {
  const theme = useTheme();
  const themed = getStyles(theme);
  return (
    <View style={themed.legendItem}>
      <View
        style={[
          themed.legendDot,
          outline
            ? {
                borderWidth: 1.5,
                borderColor: color,
                backgroundColor: "transparent",
              }
            : { backgroundColor: color },
        ]}
      />
      <Text style={themed.legendLabel}>{label}</Text>
      <Text style={themed.legendValue}>{value}</Text>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 14,
    },
    title: {
      fontSize: 17,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 12,
    },
    chartArea: {
      flexDirection: "row",
      alignItems: "flex-end",
      paddingVertical: 4,
    },
    labelRow: {
      flexDirection: "row",
      marginTop: 6,
      marginBottom: 16,
    },
    labelText: {
      fontSize: 11,
      color: theme.textSecondary,
      fontWeight: "600",
    },
    labelTextActive: {
      color: theme.text,
      fontWeight: "800",
    },
    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 16,
      paddingTop: 6,
    },
    totalLabel: {
      fontSize: 13,
      color: theme.textSecondary,
      fontWeight: "600",
    },
    totalValue: {
      fontSize: 24,
      fontWeight: "800",
      color: theme.text,
      marginTop: 2,
    },
    legendCol: {
      flex: 1,
      gap: 6,
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    legendDot: {
      width: 9,
      height: 9,
      borderRadius: 5,
    },
    legendLabel: {
      flex: 1,
      fontSize: 12,
      color: theme.text,
      fontWeight: "600",
    },
    legendValue: {
      fontSize: 13,
      color: theme.textSecondary,
      fontWeight: "700",
      minWidth: 24,
      textAlign: "right",
    },
  });
