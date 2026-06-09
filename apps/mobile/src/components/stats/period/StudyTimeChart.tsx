import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import Svg, { Path, Circle, Line, G } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { StudyPeriod, TimePoint } from "@/types/stats";
import StatsCard from "../shared/StatsCard";
import PeriodSelector from "../shared/PeriodSelector";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Props {
  points: TimePoint[];
  avgPerDayLabel: string;
  rangeStart: string;
  rangeEnd: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CHART_WIDTH = SCREEN_WIDTH - 32 - 36; // screen - card margin - card padding
const CHART_HEIGHT = 160;
const PADDING_X = 8;
const PADDING_Y = 14;

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

export default function StudyTimeChart({
  points,
  avgPerDayLabel,
  rangeStart,
  rangeEnd,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const themed = getStyles(theme);
  const [period, setPeriod] = useState<StudyPeriod>("week");

  const max = Math.max(...points.map((p) => p.minutes), 1);
  const stepX = (CHART_WIDTH - PADDING_X * 2) / (points.length - 1);

  const coords = points.map((p, i) => ({
    x: PADDING_X + i * stepX,
    y:
      CHART_HEIGHT -
      PADDING_Y -
      (p.minutes / max) * (CHART_HEIGHT - PADDING_Y * 2),
  }));

  const pathD = buildSmoothPath(coords);

  // Animation
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 1100,
      easing: Easing.out(Easing.cubic),
    });
  }, [pathD, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 1000 - progress.value * 1000,
  }));

  return (
    <StatsCard>
      <PeriodSelector value={period} onChange={setPeriod} />
      <Text style={themed.title}>{t("stats.studyTime")}</Text>
      <Text style={themed.subtitle}>
        {t("stats.avgStudyTime")}{" "}
        <Text style={themed.accent}>{avgPerDayLabel}</Text>
        {t("stats.avgStudyTimeSuffix")}
      </Text>

      <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
        {/* 격자 */}
        {[0, 1, 2, 3, 4].map((i) => (
          <Line
            key={`h${i}`}
            x1={0}
            x2={CHART_WIDTH}
            y1={PADDING_Y + i * ((CHART_HEIGHT - PADDING_Y * 2) / 4)}
            y2={PADDING_Y + i * ((CHART_HEIGHT - PADDING_Y * 2) / 4)}
            stroke={theme.border}
            strokeWidth={1}
            strokeOpacity={0.5}
          />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <Line
            key={`v${i}`}
            y1={PADDING_Y}
            y2={CHART_HEIGHT - PADDING_Y}
            x1={(CHART_WIDTH / 4) * i}
            x2={(CHART_WIDTH / 4) * i}
            stroke={theme.border}
            strokeWidth={1}
            strokeOpacity={0.5}
          />
        ))}

        {/* 라인 */}
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

        {/* 정점 점들 (값 있는 곳만) */}
        <G>
          {coords.map((c, i) =>
            points[i].minutes > 0 ? (
              <Circle key={i} cx={c.x} cy={c.y} r={3} fill="#776ee2" />
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
    title: {
      fontSize: 17,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 13,
      color: theme.textSecondary,
      marginBottom: 18,
    },
    accent: {
      color: "#776ee2",
      fontWeight: "700",
    },
    rangeRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 4,
    },
    rangeText: {
      fontSize: 11,
      color: theme.textSecondary,
    },
  });
