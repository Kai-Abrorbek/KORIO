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
import { StudyPeriod, VolumePoint } from "@/types/stats";
import { CATEGORY_COLORS, CATEGORY_LIST } from "@/mocks/stats.mock";
import { StatsService } from "@/services/stats.service";
import StatsCard from "../shared/StatsCard";
import PeriodSelector from "../shared/PeriodSelector";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CHART_WIDTH = SCREEN_WIDTH - 32 - 36;
const CHART_HEIGHT = 140;

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
}: {
  point: VolumePoint;
  maxTotal: number;
  index: number;
  barWidth: number;
}) {
  const theme = useTheme();
  const total =
    point.vocab +
    point.grammar +
    point.expression +
    point.conversation +
    point.listening;

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
          borderRadius: 4,
          overflow: "hidden",
          flexDirection: "column-reverse",
        },
        animatedStyle,
      ]}
    >
      {CATEGORY_LIST.map((cat) => {
        const v = point[cat];
        if (v === 0) return null;
        return (
          <View
            key={cat}
            style={{ flex: v, backgroundColor: CATEGORY_COLORS[cat] }}
          />
        );
      })}
    </Animated.View>
  );
}

export default function StudyVolumeChart() {
  const { t } = useTranslation();
  const theme = useTheme();
  const themed = getStyles(theme);

  const [period, setPeriod] = useState<StudyPeriod>("week");
  const [points, setPoints] = useState<VolumePoint[]>([]);
  const [avgPerDay, setAvgPerDay] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    StatsService.getPeriod(period)
      .then((d) => {
        setPoints(d.studyVolume.points);
        setAvgPerDay(d.studyVolume.avgPerDay);
      })
      .catch((err) => console.error("studyVolume 로드 실패:", err))
      .finally(() => setLoading(false));
  }, [period]);

  const maxTotal = Math.max(
    1,
    ...points.map(
      (p) => p.vocab + p.grammar + p.expression + p.conversation + p.listening,
    ),
  );

  const visibleLabels = getVisibleLabelIndices(period, points.length);
  const gap = 4;
  const barWidth =
    points.length > 0
      ? Math.max(4, (CHART_WIDTH - (points.length - 1) * gap) / points.length)
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

      <Text style={themed.title}>{t("stats.studyVolume")}</Text>
      {avgPerDay > 0 ? (
        <Text style={themed.subtitle}>
          {t("stats.avgStudyVolume")}{" "}
          <Text style={themed.accent}>
            {t("stats.questionsCount", { count: avgPerDay })}
          </Text>
          {t("stats.avgStudyVolumeSuffix")}
        </Text>
      ) : (
        <Text style={themed.subtitle}>{t("stats.noStudyRecord")}</Text>
      )}

      <View style={themed.legend}>
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

      <View style={[themed.chartArea, { height: CHART_HEIGHT }]}>
        {points.map((p, i) => (
          <View
            key={i}
            style={{
              width: barWidth,
              marginRight: i === points.length - 1 ? 0 : gap,
              height: CHART_HEIGHT,
              justifyContent: "flex-end",
            }}
          >
            <StackedBar
              point={p}
              maxTotal={maxTotal}
              index={i}
              barWidth={barWidth}
            />
          </View>
        ))}
      </View>

      <View style={themed.labelRow}>
        {points.map((p, i) => (
          <View
            key={i}
            style={{
              width: barWidth,
              marginRight: i === points.length - 1 ? 0 : gap,
              alignItems: "center",
            }}
          >
            {visibleLabels.includes(i) ? (
              <Text style={themed.label}>{p.label}</Text>
            ) : null}
          </View>
        ))}
      </View>
    </StatsCard>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 6,
    },
    title: {
      fontSize: 17,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 8,
    },
    subtitle: { fontSize: 13, color: theme.textSecondary, marginBottom: 14 },
    accent: { color: "#776ee2", fontWeight: "700" },
    legend: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      marginBottom: 16,
    },
    legendItem: { flexDirection: "row", alignItems: "center", gap: 5 },
    legendDot: { width: 7, height: 7, borderRadius: 4 },
    legendText: { fontSize: 11, fontWeight: "600", color: theme.textSecondary },
    chartArea: {
      flexDirection: "row",
      alignItems: "flex-end",
      paddingVertical: 4,
    },
    labelRow: { flexDirection: "row", marginTop: 6 },
    label: { fontSize: 10, color: theme.textSecondary, fontWeight: "600" },
  });
