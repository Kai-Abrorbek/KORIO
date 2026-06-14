import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import BoriMascot from "../home/BoriMascot";

interface Props {
  learned: number;
  total: number;
}

export default function MasteryCard({ learned, total }: Props) {
  const { t } = useTranslation();
  const percent = total > 0 ? Math.round((learned / total) * 100) : 0;

  const [displayLearned, setDisplayLearned] = useState(0);
  const [displayPercent, setDisplayPercent] = useState(0);
  const progressW = useSharedValue(0);
  const mascotBob = useSharedValue(0);
  const glowOpacity = useSharedValue(0.4);

  useEffect(() => {
    // 진행도 바 차오름
    progressW.value = withDelay(
      300,
      withSpring(percent / 100, { damping: 14, stiffness: 90 }),
    );

    // 숫자 ticker
    let n = 0;
    const targetN = learned;
    const stepN = Math.max(1, Math.ceil(targetN / 20));
    const intN = setInterval(() => {
      n = Math.min(targetN, n + stepN);
      setDisplayLearned(n);
      if (n >= targetN) clearInterval(intN);
    }, 40);

    let p = 0;
    const stepP = Math.max(1, Math.ceil(percent / 25));
    const intP = setInterval(() => {
      p = Math.min(percent, p + stepP);
      setDisplayPercent(p);
      if (p >= percent) clearInterval(intP);
    }, 40);

    // 마스코트 살랑살랑
    mascotBob.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 1200 }),
        withTiming(0, { duration: 1200 }),
      ),
      -1,
      true,
    );

    // 외곽 glow 펄스
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1800 }),
        withTiming(0.3, { duration: 1800 }),
      ),
      -1,
      true,
    );

    return () => {
      clearInterval(intN);
      clearInterval(intP);
    };
  }, [learned, percent]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressW.value * 100}%` as any,
  }));

  const mascotStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: mascotBob.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <View style={styles.wrap}>
      <Animated.View style={[styles.glow, glowStyle]} />
      <LinearGradient
        colors={["#8B7BFF", "#776ee2", "#5448E0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <Animated.View style={[styles.mascotWrap, mascotStyle]}>
          <BoriMascot size={84} />
        </Animated.View>

        <View style={styles.content}>
          <Text style={styles.label}>{t("hangul.hero.progress")}</Text>
          <View style={styles.numberRow}>
            <Text style={styles.percent}>{displayPercent}</Text>
            <Text style={styles.percentSign}>%</Text>
          </View>
          <Text style={styles.subText}>
            {t("hangul.hero.learned", { learned: displayLearned, total })}
          </Text>

          {/* 진행도 바 */}
          <View style={styles.track}>
            <Animated.View style={[styles.fill, progressStyle]}>
              <View style={styles.fillHighlight} />
            </Animated.View>
          </View>
        </View>

        {/* 코너 장식 */}
        <View style={[styles.corner, styles.cornerTL]}>
          <Ionicons name="sparkles" size={16} color="rgba(255,255,255,0.6)" />
        </View>
        <View style={[styles.corner, styles.cornerBR]}>
          <Ionicons name="sparkles" size={14} color="rgba(255,255,255,0.5)" />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  glow: {
    position: "absolute",
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 28,
    backgroundColor: "#776ee2",
    opacity: 0.4,
  },
  card: {
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    overflow: "hidden",
    minHeight: 130,
  },
  mascotWrap: {
    width: 84,
    height: 84,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  label: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  numberRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 2,
  },
  percent: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "900",
    lineHeight: 46,
  },
  percentSign: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginLeft: 2,
    opacity: 0.85,
  },
  subText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 10,
  },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.25)",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: "#FFD000",
    borderRadius: 4,
    overflow: "hidden",
  },
  fillHighlight: {
    position: "absolute",
    top: 1,
    left: 4,
    right: 4,
    height: 2,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 2,
  },
  corner: {
    position: "absolute",
  },
  cornerTL: { top: 10, left: 12 },
  cornerBR: { bottom: 10, right: 14 },
});
