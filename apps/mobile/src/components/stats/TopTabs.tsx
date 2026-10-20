import type { ReactNode } from "react";
import {
  View,
  StyleSheet,
  type LayoutChangeEvent,
} from "react-native";
import { TouchableOpacity } from "@/components/ui/Pressables";
import { useTranslation } from "react-i18next";
import Animated, {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { StatsTab } from "@/types/stats";

interface Props {
  value: StatsTab;
  onChange: (t: StatsTab) => void;
  /** 페이저 위치 (0 = 기간별, 1 = 학습별, 미는 중엔 소수) — 밑줄·글자색이 따라온다 */
  progress: SharedValue<number>;
  /** 탭 줄 오른쪽 끝 (언어 전환) */
  right?: ReactNode;
}

export default function TopTabs({ value, onChange, progress, right }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  // 두 탭 글자의 자리·폭 [x0, w0, x1, w1] — 언어마다 글자 길이가 달라서 잰다
  const marks = useSharedValue([0, 46, 70, 46]);

  const measure = (slot: 0 | 1) => (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    const next = [...marks.value];
    next[slot * 2] = x;
    next[slot * 2 + 1] = width;
    marks.value = next;
  };

  // 밑줄은 두 탭 사이를 미는 만큼 옮겨 간다
  const indicatorStyle = useAnimatedStyle(() => {
    const [x0 = 0, w0 = 46, x1 = 70, w1 = 46] = marks.value;
    // 끝 탭에서 고무줄로 끌려도 밑줄은 끝 탭에서 멈춘다
    const p = Math.min(1, Math.max(0, progress.value));
    return {
      transform: [{ translateX: x0 + (x1 - x0) * p }],
      width: w0 + (w1 - w0) * p,
    };
  });

  // 글자색도 미는 만큼 옮겨 간다
  const firstColor = useAnimatedStyle(
    () => ({
      color: interpolateColor(progress.value, [0, 1], [theme.text, theme.textSecondary]),
    }),
    [theme],
  );
  const secondColor = useAnimatedStyle(
    () => ({
      color: interpolateColor(progress.value, [0, 1], [theme.textSecondary, theme.text]),
    }),
    [theme],
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.tab}
          onLayout={measure(0)}
          onPress={() => onChange("period")}
          activeOpacity={0.7}
        >
          <Animated.Text
            style={[styles.text, value === "period" && styles.textActive, firstColor]}
          >
            {t("stats.tabs.period")}
          </Animated.Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onLayout={measure(1)}
          onPress={() => onChange("category")}
          activeOpacity={0.7}
        >
          <Animated.Text
            style={[styles.text, value === "category" && styles.textActive, secondColor]}
          >
            {t("stats.tabs.category")}
          </Animated.Text>
        </TouchableOpacity>
        {right}
      </View>
      <Animated.View style={[styles.indicator, indicatorStyle]} />
      <View style={styles.bottomLine} />
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      backgroundColor: theme.bg,
    },
    row: {
      flexDirection: "row",
      gap: 24,
    },
    tab: {
      paddingVertical: 12,
    },
    text: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    textActive: {
      color: theme.text,
      fontWeight: "800",
    },
    indicator: {
      width: 46,
      height: 3,
      backgroundColor: theme.text,
      borderRadius: 2,
      position: "absolute",
      bottom: 0,
      left: 20,
    },
    bottomLine: {
      height: 1,
      backgroundColor: theme.border,
      marginTop: -1,
    },
  });
