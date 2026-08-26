import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import type { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { darken } from "@/utils/color";

interface Props {
  dayNumber: number;
  title: string;
  /** 1 = 배우기, 2 = 익히기 */
  phase: 1 | 2;
  color: string;
  done: number;
  total: number;
  /** 지금 배우는 급수. 누르면 다시 고를 수 있다 */
  level: number;
  onLevelPress: () => void;
}

/**
 * 오늘 하루의 상태를 한 줄로 보여주는 상단 배너.
 * 로드맵 배너(SectionBanner)와 같은 입체 톤을 쓰되, 여기서는 "며칠째 · 얼마나
 * 남았나"가 핵심이라 진행 바를 전면에 둔다.
 */
export default function DayBanner({
  dayNumber,
  title,
  phase,
  color,
  done,
  total,
  level,
  onLevelPress,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const ratio = total > 0 ? Math.min(1, done / total) : 0;
  const complete = total > 0 && done >= total;
  const fill = useSharedValue(0);

  useEffect(() => {
    // 화면에 들어오자마자 0에서 차오르게 — 어제보다 얼마나 왔는지 보인다
    fill.value = withTiming(ratio, {
      duration: 620,
      easing: Easing.out(Easing.cubic),
    });
  }, [fill, ratio]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${fill.value * 100}%`,
  }));

  return (
    <View style={styles.outer}>
      <View style={[styles.glow, { backgroundColor: color }]} />
      <View style={[styles.depth, { backgroundColor: darken(color, 42) }]} />

      <LinearGradient
        colors={[color, darken(color, 15)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.orbLarge} pointerEvents="none" />
        <View style={styles.orbSmall} pointerEvents="none" />
        <View style={styles.shine} pointerEvents="none" />

        <View style={styles.dayBadge}>
          <View style={styles.dayBadgeInner}>
            {complete ? (
              <Ionicons name="checkmark" size={24} color="#fff" />
            ) : (
              <Text style={styles.dayNumber}>{dayNumber}</Text>
            )}
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.eyebrow} numberOfLines={1}>
            {complete
              ? t("studyPath.dayComplete")
              : t(
                  phase === 1
                    ? "studyPath.phaseLearn"
                    : "studyPath.phasePractice",
                  { n: dayNumber },
                )}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          <View style={styles.progressRow}>
            <View style={styles.track}>
              <Animated.View style={[styles.fill, fillStyle]}>
                <View style={styles.fillShine} pointerEvents="none" />
              </Animated.View>
            </View>
            <Text style={styles.count}>
              {t("studyPath.progressOf", { done, total })}
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.levelBtn}
          onPress={onLevelPress}
          hitSlop={8}
          accessibilityLabel={t("studyLevel.change")}
        >
          <Text style={styles.levelText}>
            {t("studyPath.levelShort", { n: level })}
          </Text>
          <Ionicons
            name="swap-vertical"
            size={13}
            color="rgba(255,255,255,0.9)"
          />
        </Pressable>
      </LinearGradient>
    </View>
  );
}

const getStyles = (_theme: ThemeColors) =>
  StyleSheet.create({
    outer: { marginHorizontal: 14, marginBottom: 12, position: "relative" },
    glow: {
      position: "absolute",
      left: 14,
      right: 14,
      top: 12,
      bottom: -10,
      borderRadius: 28,
      opacity: 0.2,
    },
    depth: {
      position: "absolute",
      top: 8,
      left: 0,
      right: 0,
      bottom: -1,
      borderRadius: 24,
    },
    container: {
      minHeight: 92,
      flexDirection: "row",
      alignItems: "center",
      overflow: "hidden",
      borderRadius: 24,
      paddingVertical: 14,
      paddingLeft: 14,
      paddingRight: 16,
      borderWidth: 1.5,
      borderColor: "rgba(255,255,255,0.28)",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.17,
      shadowRadius: 16,
      elevation: 9,
    },
    shine: {
      position: "absolute",
      top: 0,
      left: 18,
      right: 40,
      height: 2,
      borderRadius: 999,
      backgroundColor: "rgba(255,255,255,0.52)",
    },
    orbLarge: {
      position: "absolute",
      width: 108,
      height: 108,
      borderRadius: 999,
      right: -35,
      top: -48,
      backgroundColor: "rgba(255,255,255,0.12)",
    },
    orbSmall: {
      position: "absolute",
      width: 46,
      height: 46,
      borderRadius: 999,
      left: 80,
      bottom: -31,
      backgroundColor: "rgba(255,255,255,0.1)",
    },
    dayBadge: {
      width: 54,
      height: 54,
      borderRadius: 19,
      padding: 4,
      marginRight: 12,
      backgroundColor: "rgba(255,255,255,0.2)",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.26)",
    },
    dayBadgeInner: {
      flex: 1,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.15)",
    },
    dayNumber: {
      fontSize: 23,
      fontWeight: "900",
      color: "#fff",
      letterSpacing: -0.5,
    },
    body: { flex: 1, minWidth: 0, gap: 2 },
    eyebrow: {
      fontSize: 12,
      fontWeight: "800",
      color: "rgba(255,255,255,0.82)",
      letterSpacing: 0.35,
    },
    title: {
      fontSize: 17.5,
      fontWeight: "900",
      color: "#fff",
      letterSpacing: -0.2,
    },
    progressRow: {
      marginTop: 7,
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
    },
    track: {
      flex: 1,
      height: 9,
      borderRadius: 999,
      overflow: "hidden",
      backgroundColor: "rgba(0,0,0,0.18)",
    },
    fill: {
      height: "100%",
      borderRadius: 999,
      backgroundColor: "#FFFFFF",
      minWidth: 9,
    },
    fillShine: {
      position: "absolute",
      top: 2,
      left: 5,
      right: 5,
      height: 2.5,
      borderRadius: 999,
      backgroundColor: "rgba(255,255,255,0.65)",
    },
    count: {
      fontSize: 12,
      fontWeight: "900",
      color: "rgba(255,255,255,0.92)",
    },
    levelBtn: {
      marginLeft: 10,
      alignSelf: "flex-start",
      minHeight: 30,
      borderRadius: 11,
      paddingHorizontal: 9,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: "rgba(255,255,255,0.18)",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.26)",
    },
    levelText: { color: "#FFFFFF", fontSize: 12, fontWeight: "900" },
  });
