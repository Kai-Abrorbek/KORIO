import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import Svg, { Path, Circle, Line, G, Text as SvgText } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { StudyPeriod, TimePoint } from "@/types/stats";
import { StatsService } from "@/services/stats.service";
import StatsCard from "../shared/StatsCard";
import PeriodSelector from "../shared/PeriodSelector";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CHART_WIDTH = SCREEN_WIDTH - 32 - 36;
const CHART_HEIGHT = 180;
const PADDING_X = 8;
const PADDING_Y = 14;
const LABEL_HEIGHT = 18;

function buildSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cpX = (p0.x + p1.x) / 2;
    d += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}

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

export default function StudyTimeChart() {
  const { t } = useTranslation();
  const theme = useTheme();
  const themed = getStyles(theme);

  const [period, setPeriod] = useState<StudyPeriod>("week");
  const [points, setPoints] = useState<TimePoint[]>([]);
  const [avgPerDayLabel, setAvgPerDayLabel] = useState("");
  const [rangeLabel, setRangeLabel] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    StatsService.getPeriod(period)
      .then((d) => {
        setPoints(d.studyTime.points);
        setAvgPerDayLabel(d.studyTime.avgPerDayLabel);
        setRangeLabel(d.studyTime.rangeLabel);
      })
      .catch((err) => console.error("studyTime 로드 실패:", err))
      .finally(() => setLoading(false));
  }, [period]);

  const max = Math.max(...points.map((p) => p.minutes), 1);
  const stepX =
    points.length > 1 ? (CHART_WIDTH - PADDING_X * 2) / (points.length - 1) : 0;

  const coords = points.map((p, i) => ({
    x: PADDING_X + i * stepX,
    y:
      CHART_HEIGHT -
      PADDING_Y -
      (p.minutes / max) * (CHART_HEIGHT - PADDING_Y * 2 - LABEL_HEIGHT),
  }));

  const pathD = buildSmoothPath(coords);

  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    });
  }, [pathD]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 1000 - progress.value * 1000,
  }));

  const [rangeStart, rangeEnd] = rangeLabel.split(" - ");
  const visibleLabels = getVisibleLabelIndices(period, points.length);

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

      <Text style={themed.title}>{t("stats.studyTime")}</Text>
      <Text style={themed.subtitle}>
        {t(`stats.avgStudyTime.${period}`)}{" "}
        <Text style={themed.accent}>{avgPerDayLabel}</Text>
        {t("stats.avgStudyTimeSuffix")}
      </Text>

      <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Line
            key={`h${i}`}
            x1={0}
            x2={CHART_WIDTH}
            y1={
              PADDING_Y +
              i * ((CHART_HEIGHT - PADDING_Y * 2 - LABEL_HEIGHT) / 4)
            }
            y2={
              PADDING_Y +
              i * ((CHART_HEIGHT - PADDING_Y * 2 - LABEL_HEIGHT) / 4)
            }
            stroke={theme.border}
            strokeWidth={1}
            strokeOpacity={0.5}
          />
        ))}

        <AnimatedPath
          d={pathD}
          stroke="#776ee2"
          strokeWidth={2.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1000}
          animatedProps={animatedProps}
        />

        <G>
          {coords.map((c, i) =>
            points[i].minutes > 0 ? (
              <Circle key={i} cx={c.x} cy={c.y} r={3} fill="#776ee2" />
            ) : null,
          )}
        </G>

        <G>
          {visibleLabels.map((i) =>
            points[i] ? (
              <SvgText
                key={i}
                x={coords[i].x}
                y={CHART_HEIGHT - 2}
                fontSize={10}
                fill={theme.textSecondary}
                fontWeight="600"
                textAnchor="middle"
              >
                {points[i].label}
              </SvgText>
            ) : null,
          )}
        </G>
      </Svg>

      <View style={themed.rangeRow}>
        <Text style={themed.rangeText}>{rangeStart}</Text>
        <Text style={themed.rangeText}>{rangeEnd}</Text>
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
    subtitle: { fontSize: 13, color: theme.textSecondary, marginBottom: 18 },
    accent: { color: "#776ee2", fontWeight: "700" },
    rangeRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 4,
    },
    rangeText: { fontSize: 11, color: theme.textSecondary },
  });
