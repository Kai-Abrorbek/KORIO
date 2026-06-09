import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { StatsTab } from "@/types/stats";

interface Props {
  value: StatsTab;
  onChange: (t: StatsTab) => void;
}

export default function TopTabs({ value, onChange }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const offset = useSharedValue(value === "period" ? 0 : 1);

  useEffect(() => {
    offset.value = withTiming(value === "period" ? 0 : 1, { duration: 200 });
  }, [value, offset]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: offset.value * 70,
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => onChange("period")}
          activeOpacity={0.7}
        >
          <Text style={[styles.text, value === "period" && styles.textActive]}>
            {t("stats.tabs.period")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => onChange("category")}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.text, value === "category" && styles.textActive]}
          >
            {t("stats.tabs.category")}
          </Text>
        </TouchableOpacity>
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
