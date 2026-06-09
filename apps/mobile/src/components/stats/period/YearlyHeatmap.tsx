import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { HeatmapDay } from "@/types/stats";
import StatsCard from "../shared/StatsCard";
import PaginationArrows from "../shared/PaginationArrows";

interface Props {
  days: HeatmapDay[];
}

const CELL_SIZE = 6;
const CELL_GAP = 2;
const ROWS_PER_BLOCK = 7;
const WEEKS_PER_BLOCK = 26; // 6 months ~ 26 weeks

const INTENSITY_COLORS = [
  "#F0EFFA",
  "#D9D2F5",
  "#B7ABEC",
  "#9587E0",
  "#776ee2",
];

function HeatCell({ intensity, delay }: { intensity: number; delay: number }) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 220 }));
    scale.value = withDelay(delay, withTiming(1, { duration: 260 }));
  }, [delay, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.cell,
        { backgroundColor: INTENSITY_COLORS[intensity] },
        animatedStyle,
      ]}
    />
  );
}

export default function YearlyHeatmap({ days }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const themed = getStyles(theme);

  // 26주씩 두 블록으로 쪼개기
  const firstBlock = days.slice(0, 26 * 7);
  const secondBlock = days.slice(26 * 7);

  const monthsTop = ["JUN", "JUL", "AUG", "SEP", "OCT", "NOV"];
  const monthsBottom = ["DEC", "JAN", "FEB", "MAR", "APR", "MAY"];
  const dayLabels = ["월", "화", "수", "목", "금", "토", "일"];

  const renderBlock = (
    block: HeatmapDay[],
    blockIndex: number,
    months: string[],
  ) => {
    const weeks: HeatmapDay[][] = [];
    for (let w = 0; w < WEEKS_PER_BLOCK; w++) {
      weeks.push(block.slice(w * 7, w * 7 + 7));
    }

    return (
      <View style={themed.block}>
        {/* 월 라벨 */}
        <View style={themed.monthLabels}>
          <View style={themed.dayLabelSpacer} />
          {months.map((m) => (
            <Text key={m} style={themed.monthText}>
              {m}
            </Text>
          ))}
        </View>

        <View style={themed.grid}>
          {/* 요일 라벨 */}
          <View style={themed.dayLabels}>
            {dayLabels.map((d) => (
              <Text key={d} style={themed.dayText}>
                {d}
              </Text>
            ))}
          </View>

          {/* 셀 격자 */}
          <View style={themed.cellsRow}>
            {weeks.map((week, wi) => (
              <View key={wi} style={themed.weekCol}>
                {Array.from({ length: 7 }).map((_, di) => {
                  const cell = week[di];
                  const intensity = cell?.intensity ?? 0;
                  const delay = blockIndex * 400 + wi * 25;
                  return (
                    <HeatCell key={di} intensity={intensity} delay={delay} />
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Text style={themed.sectionTitle}>{t("stats.periodInfo")}</Text>
      <StatsCard>
        <View style={themed.header}>
          <Text style={themed.title}>{t("stats.yearlyStudy")}</Text>
          <PaginationArrows label={t("stats.recent")} />
        </View>

        <View style={themed.legendRow}>
          <Text style={themed.legendText}>Less</Text>
          <View style={themed.legendDots}>
            {INTENSITY_COLORS.map((c, i) => (
              <View
                key={i}
                style={[
                  styles.cell,
                  { backgroundColor: c, marginHorizontal: 1 },
                ]}
              />
            ))}
          </View>
          <Text style={themed.legendText}>More</Text>
        </View>

        {renderBlock(firstBlock, 0, monthsTop)}
        <View style={{ height: 12 }} />
        {renderBlock(secondBlock, 1, monthsBottom)}
      </StatsCard>
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 1.5,
    marginBottom: CELL_GAP,
  },
});

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    sectionTitle: {
      fontSize: 20,
      fontWeight: "800",
      color: theme.text,
      marginHorizontal: 20,
      marginBottom: 12,
      marginTop: 8,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
    },
    title: {
      fontSize: 17,
      fontWeight: "800",
      color: theme.text,
    },
    legendRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 18,
    },
    legendDots: {
      flexDirection: "row",
      alignItems: "center",
    },
    legendText: {
      fontSize: 12,
      color: theme.textSecondary,
      fontWeight: "600",
    },
    block: {
      gap: 4,
    },
    monthLabels: {
      flexDirection: "row",
      marginLeft: 18,
      justifyContent: "space-between",
      marginBottom: 4,
    },
    dayLabelSpacer: {
      width: 0,
    },
    monthText: {
      fontSize: 9,
      fontWeight: "700",
      color: theme.textSecondary,
      letterSpacing: 0.5,
    },
    grid: {
      flexDirection: "row",
    },
    dayLabels: {
      gap: CELL_GAP,
      marginRight: 4,
      width: 14,
    },
    dayText: {
      fontSize: 8,
      color: theme.textSecondary,
      height: CELL_SIZE + CELL_GAP - 2,
    },
    cellsRow: {
      flexDirection: "row",
      gap: CELL_GAP,
      flex: 1,
    },
    weekCol: {
      flexDirection: "column",
    },
  });
