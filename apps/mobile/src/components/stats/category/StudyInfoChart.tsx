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
import { CategoryDailyPoint, CategoryStats } from "@/types/stats";
import StatsCard from "../shared/StatsCard";
import PaginationArrows from "../shared/PaginationArrows";

interface Props {
  stats: CategoryStats;
}

const CHART_HEIGHT = 150;
const COLORS = {
  newWords: "#FFCD3C",
  knownWords: "#A6D5FF",
  reviewWords: "#A78BFA",
  accuracy: "#776ee2",
};

function StackedBar({
  point,
  maxTotal,
  index,
}: {
  point: CategoryDailyPoint;
  maxTotal: number;
  index: number;
}) {
  const total = point.newWords + point.knownWords + point.reviewWords;
  const height = useSharedValue(0);

  useEffect(() => {
    height.value = withDelay(
      index * 70,
      withTiming((total / maxTotal) * CHART_HEIGHT, {
        duration: 800,
        easing: Easing.out(Easing.cubic),
      }),
    );
  }, [total, maxTotal, index, height]);

  const animatedStyle = useAnimatedStyle(() => ({ height: height.value }));

  if (total === 0) {
    return <View style={styles.barEmpty} />;
  }

  return (
    <Animated.View style={[styles.barFill, animatedStyle]}>
      {point.newWords > 0 && (
        <View
          style={{ flex: point.newWords, backgroundColor: COLORS.newWords }}
        />
      )}
      {point.knownWords > 0 && (
        <View
          style={{ flex: point.knownWords, backgroundColor: COLORS.knownWords }}
        />
      )}
      {point.reviewWords > 0 && (
        <View
          style={{
            flex: point.reviewWords,
            backgroundColor: COLORS.reviewWords,
          }}
        />
      )}
    </Animated.View>
  );
}

export default function StudyInfoChart({ stats }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const themed = getStyles(theme);
  const [windowSize, setWindowSize] = useState(7);

  const totals = stats.weekChart.map(
    (p) => p.newWords + p.knownWords + p.reviewWords,
  );
  const maxTotal = Math.max(...totals, 1);
  const grandTotal = totals.reduce((a, b) => a + b, 0);

  const fmt = (v: number | null) => (v == null ? "-" : v.toString());

  return (
    <StatsCard>
      <View style={themed.header}>
        <Text style={themed.title}>{t("stats.studyInfo")}</Text>
        <PaginationArrows
          label={t("stats.nDays", { count: windowSize })}
          onPrev={() => setWindowSize((s) => Math.max(7, s - 7))}
          onNext={() => setWindowSize((s) => s + 7)}
        />
      </View>

      <View style={themed.chartRow}>
        <View style={themed.bars}>
          {stats.weekChart.map((p, i) => (
            <View key={i} style={themed.barCol}>
              <StackedBar point={p} maxTotal={maxTotal} index={i} />
            </View>
          ))}
        </View>
        <View style={themed.labels}>
          {stats.weekChart.map((p, i) => (
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
            withHelp
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
  withHelp,
}: {
  color: string;
  label: string;
  value: string;
  outline?: boolean;
  withHelp?: boolean;
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

const styles = StyleSheet.create({
  barFill: {
    width: "100%",
    borderRadius: 6,
    overflow: "hidden",
  },
  barEmpty: {
    width: "100%",
    height: 4,
    backgroundColor: "#EFEFF6",
    borderRadius: 2,
  },
});

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 18,
    },
    title: {
      fontSize: 17,
      fontWeight: "800",
      color: theme.text,
    },
    chartRow: {
      gap: 8,
      marginBottom: 18,
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
      marginHorizontal: 4,
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
    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
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
