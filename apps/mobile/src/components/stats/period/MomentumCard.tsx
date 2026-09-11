import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import type { HeatmapDay } from "@/types/stats";
import StatsCard from "../shared/StatsCard";

const STRIP_HEIGHT = 62;
const WINDOW = 14; // 지난주 7 + 이번주 7

/** intensity 0~4 → 색. 0 은 트랙 색을 쓴다 */
const LEVEL_COLORS = ["", "#D9D5F7", "#B9B1F1", "#948AEA", "#6C5FE0"];

function RhythmBar({
  intensity,
  index,
  emptyColor,
}: {
  intensity: number;
  index: number;
  emptyColor: string;
}) {
  // 막대마다 컴포넌트로 뺀 건 스타일이 아니라 훅 규칙 때문이다 —
  // map 안에서 useSharedValue 를 부르면 날짜 수가 바뀌는 순간 순서가 깨진다
  const h = useSharedValue(0);
  const target = intensity > 0 ? 0.22 + (intensity / 4) * 0.78 : 0.08;

  useEffect(() => {
    h.value = 0;
    h.value = withDelay(
      index * 35,
      withTiming(target * STRIP_HEIGHT, {
        duration: 520,
        easing: Easing.out(Easing.cubic),
      }),
    );
  }, [target, index, h]);

  const style = useAnimatedStyle(() => ({ height: h.value }));

  return (
    <Animated.View
      style={[
        styles.bar,
        {
          backgroundColor:
            intensity > 0 ? LEVEL_COLORS[intensity] : emptyColor,
        },
        style,
      ]}
    />
  );
}

interface Props {
  /** 연간 히트맵. PeriodView 가 이미 받아온 걸 그대로 쓴다 — 요청을 더 하지 않는다 */
  days: HeatmapDay[];
}

/**
 * 최근 2주 리듬.
 *
 * 연간 히트맵은 "꾸준했나" 를 보여주지만 칸이 365개라 최근 흐름이 안 읽힌다.
 * 유저가 바꿀 수 있는 건 이번 주뿐이라, 지난주와 이번 주만 나란히 놓는다.
 * 숫자 하나(며칠 했나)와 비교 한 줄이면 "더 해야겠다" 까지 간다.
 *
 * 연속 학습일은 여기서 계산하지 않는다 — 그 값은 서버가 타임존까지 보고
 * 정하는 값이라, 앱이 따로 세면 두 숫자가 서로 다르게 나온다.
 */
export default function MomentumCard({ days }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);

  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const recent = sorted.slice(-WINDOW);
  if (recent.length < 8) return null;

  const half = Math.ceil(recent.length / 2);
  const prev = recent.slice(0, half);
  const curr = recent.slice(half);

  const studied = (list: HeatmapDay[]) =>
    list.filter((d) => d.intensity > 0).length;
  const thisWeek = studied(curr);
  const lastWeek = studied(prev);
  const delta = thisWeek - lastWeek;

  const deltaIcon: keyof typeof Ionicons.glyphMap =
    delta > 0 ? "trending-up" : delta < 0 ? "trending-down" : "remove";
  const deltaColor =
    delta > 0 ? "#1D9E75" : delta < 0 ? "#FF6B6B" : theme.textSecondary;
  const deltaText =
    delta > 0
      ? t("stats.momentum.up", { n: delta })
      : delta < 0
        ? t("stats.momentum.down", { n: Math.abs(delta) })
        : t("stats.momentum.same");

  return (
    <StatsCard>
      <View style={s.header}>
        <Text style={s.title}>{t("stats.momentum.title")}</Text>
        <View style={s.delta}>
          <Ionicons name={deltaIcon} size={14} color={deltaColor} />
          <Text style={[s.deltaText, { color: deltaColor }]}>{deltaText}</Text>
        </View>
      </View>

      <Text style={s.big}>
        {t("stats.momentum.thisWeek", { n: thisWeek })}
      </Text>

      <View style={[s.strip, { height: STRIP_HEIGHT }]}>
        {recent.map((d, i) => (
          <View key={d.date} style={s.slot}>
            {i === half && <View style={s.divider} />}
            <RhythmBar
              intensity={d.intensity}
              index={i}
              emptyColor={theme.border}
            />
          </View>
        ))}
      </View>

      <View style={s.footRow}>
        <Text style={s.footLabel}>{t("stats.momentum.lastWeek")}</Text>
        <Text style={[s.footLabel, s.footLabelActive]}>
          {t("stats.momentum.thisWeekShort")}
        </Text>
      </View>
    </StatsCard>
  );
}

const styles = StyleSheet.create({
  bar: { width: "100%", borderRadius: 4, minHeight: 4 },
});

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    title: { fontSize: 16, fontWeight: "800", color: theme.text },
    delta: { flexDirection: "row", alignItems: "center", gap: 4 },
    deltaText: { fontSize: 11.5, fontWeight: "800" },
    big: {
      fontSize: 20,
      fontWeight: "900",
      color: theme.text,
      letterSpacing: -0.4,
      marginBottom: 16,
    },
    strip: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 5,
    },
    slot: { flex: 1, justifyContent: "flex-end" },
    divider: {
      position: "absolute",
      left: -4,
      top: -6,
      bottom: -4,
      width: 1,
      backgroundColor: theme.border,
    },
    footRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 8,
    },
    footLabel: {
      fontSize: 10.5,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    footLabelActive: { color: theme.text, fontWeight: "900" },
  });
