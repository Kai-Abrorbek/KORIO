import { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import Svg, { Path, Circle, Line } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { WeeklyXpPoint } from "@/types/friend-profile";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Props {
  points: WeeklyXpPoint[];
  themName: string;
  themXp: number;
  meXp: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const Y_AXIS_WIDTH = 56;
const CHART_HEIGHT = 200;
const PADDING_Y = 18;
const PADDING_X = 12;

const THEM_COLOR = "#45B7D1";
const ME_COLOR = "#D1D1D6";

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

export default function WeeklyProgressChart({
  points,
  themName,
  themXp,
  meXp,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const themed = getStyles(theme);

  const maxY = Math.max(...points.map((p) => Math.max(p.themXp, p.meXp)), 1);

  const yLabels = [maxY, Math.round((maxY * 2) / 3), Math.round(maxY / 3), 0];

  const chartInnerWidth = SCREEN_WIDTH - 40 - Y_AXIS_WIDTH;
  const stepX = (chartInnerWidth - PADDING_X * 2) / (points.length - 1);

  const themCoords = points.map((p, i) => ({
    x: PADDING_X + i * stepX,
    y: PADDING_Y + (1 - p.themXp / maxY) * (CHART_HEIGHT - PADDING_Y * 2),
  }));

  const meCoords = points.map((p, i) => ({
    x: PADDING_X + i * stepX,
    y: PADDING_Y + (1 - p.meXp / maxY) * (CHART_HEIGHT - PADDING_Y * 2),
  }));

  const themPath = buildSmoothPath(themCoords);
  const mePath = buildSmoothPath(meCoords);

  const themProgress = useSharedValue(0);
  const meProgress = useSharedValue(0);

  useEffect(() => {
    themProgress.value = 0;
    meProgress.value = 0;
    themProgress.value = withTiming(1, {
      duration: 1100,
      easing: Easing.out(Easing.cubic),
    });
    meProgress.value = withTiming(1, {
      duration: 1100,
      easing: Easing.out(Easing.cubic),
    });
  }, [themPath, mePath, themProgress, meProgress]);

  const themAnimProps = useAnimatedProps(() => ({
    strokeDashoffset: 2000 - themProgress.value * 2000,
  }));
  const meAnimProps = useAnimatedProps(() => ({
    strokeDashoffset: 2000 - meProgress.value * 2000,
  }));

  return (
    <View style={themed.wrap}>
      <Text style={themed.title}>{t("friendProfile.weeklyProgress")}</Text>

      <View style={themed.chartRow}>
        {/* Y축 라벨 */}
        <View style={themed.yLabels}>
          {yLabels.map((v) => (
            <Text key={v} style={themed.yLabelText}>
              {v}
            </Text>
          ))}
        </View>

        {/* 차트 */}
        <Svg width={chartInnerWidth} height={CHART_HEIGHT}>
          {/* 그리드 라인 */}
          {[0, 1, 2, 3].map((i) => {
            const y = PADDING_Y + (i / 3) * (CHART_HEIGHT - PADDING_Y * 2);
            return (
              <Line
                key={i}
                x1={0}
                x2={chartInnerWidth}
                y1={y}
                y2={y}
                stroke={theme.border}
                strokeWidth={1}
                strokeOpacity={0.6}
              />
            );
          })}

          {/* 내 라인 (회색, 뒤로) */}
          <AnimatedPath
            d={mePath}
            stroke={ME_COLOR}
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={2000}
            animatedProps={meAnimProps}
          />
          {meCoords.map((c, i) => (
            <Circle key={`me-${i}`} cx={c.x} cy={c.y} r={5} fill={ME_COLOR} />
          ))}

          {/* 친구 라인 (파란색, 강조) */}
          <AnimatedPath
            d={themPath}
            stroke={THEM_COLOR}
            strokeWidth={3.5}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={2000}
            animatedProps={themAnimProps}
          />
          {themCoords.map((c, i) => (
            <Circle
              key={`them-${i}`}
              cx={c.x}
              cy={c.y}
              r={7}
              fill={THEM_COLOR}
            />
          ))}
        </Svg>
      </View>

      {/* X축 라벨 */}
      <View style={[themed.xLabels, { marginLeft: Y_AXIS_WIDTH }]}>
        {points.map((p) => (
          <Text key={p.label} style={themed.xLabelText}>
            {p.label}
          </Text>
        ))}
      </View>

      {/* 범례 */}
      <View style={themed.legendSection}>
        <View style={themed.legendRow}>
          <View style={[themed.legendDot, { backgroundColor: THEM_COLOR }]} />
          <Text style={themed.legendName}>{themName}</Text>
          <Text style={themed.legendXp}>{themXp}XP</Text>
        </View>
        <View style={themed.legendRow}>
          <View style={[themed.legendDot, { backgroundColor: ME_COLOR }]} />
          <Text style={themed.legendName}>{t("friendProfile.me")}</Text>
          <Text style={themed.legendXp}>{meXp}XP</Text>
        </View>
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      paddingHorizontal: 20,
      marginBottom: 32,
    },
    title: {
      fontSize: 18,
      fontWeight: "800",
      color: theme.textSecondary,
      marginBottom: 20,
    },
    chartRow: {
      flexDirection: "row",
    },
    yLabels: {
      width: Y_AXIS_WIDTH,
      height: CHART_HEIGHT,
      justifyContent: "space-between",
      paddingVertical: PADDING_Y - 8,
      paddingRight: 8,
    },
    yLabelText: {
      fontSize: 12,
      color: theme.textSecondary,
      fontWeight: "600",
      textAlign: "right",
    },
    xLabels: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: PADDING_X,
      marginTop: 6,
    },
    xLabelText: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    legendSection: {
      marginTop: 24,
      gap: 14,
    },
    legendRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
    },
    legendDot: {
      width: 14,
      height: 14,
      borderRadius: 7,
    },
    legendName: {
      flex: 1,
      fontSize: 17,
      fontWeight: "800",
      color: theme.text,
    },
    legendXp: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.textSecondary,
    },
  });
