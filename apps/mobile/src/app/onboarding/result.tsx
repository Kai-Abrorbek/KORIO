import { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  withDelay,
  FadeInDown,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useOnboardingStore } from "@/store/onboarding.store";
import BoriMascot from "@/components/BoriMascot";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const COLORS = [
  "#7F77DD",
  "#FF6B6B",
  "#4ECDC4",
  "#FAC775",
  "#96CEB4",
  "#DDA0DD",
];

function ConfettiPiece({ index }: { index: number }) {
  const x = useSharedValue(Math.random() * SCREEN_WIDTH);
  const y = useSharedValue(-20);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const delay = Math.random() * 2000;
    const duration = 2000 + Math.random() * 2000;

    y.value = withDelay(
      delay,
      withRepeat(
        withTiming(SCREEN_HEIGHT * 0.6, { duration, easing: Easing.linear }),
        -1,
        false,
      ),
    );
    rotate.value = withDelay(
      delay,
      withRepeat(withTiming(360, { duration: 1000 }), -1, false),
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  const color = COLORS[index % COLORS.length];
  const size = 6 + Math.random() * 8;
  const isCircle = index % 2 === 0;

  return (
    <Animated.View
      style={[
        style,
        {
          position: "absolute",
          width: size,
          height: isCircle ? size : size * 2,
          borderRadius: isCircle ? size : 2,
          backgroundColor: color,
        },
      ]}
    />
  );
}

export default function ResultScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const { detectedLevel, levelTestScore, correctAnswers } =
    useOnboardingStore();

  // Bori 둥둥 애니메이션
  const boriY = useSharedValue(0);

  useEffect(() => {
    boriY.value = withRepeat(
      withSequence(
        withTiming(-12, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, []);

  const boriStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: boriY.value }],
  }));

  const levelInfo = {
    beginner: {
      label: t("onboarding.result.beginner"),
      color: "#1D9E75",
      bg: "#E3F8EC",
      icon: "leaf" as const,
      description: t("onboarding.result.beginnerDesc"),
    },
    intermediate: {
      label: t("onboarding.result.intermediate"),
      color: "#45B7D1",
      bg: "#E3F4FF",
      icon: "trending-up" as const,
      description: t("onboarding.result.intermediateDesc"),
    },
    advanced: {
      label: t("onboarding.result.advanced"),
      color: "#FF6B6B",
      bg: "#FFE5EC",
      icon: "flame" as const,
      description: t("onboarding.result.advancedDesc"),
    },
  };

  const info =
    levelInfo[detectedLevel as keyof typeof levelInfo] ?? levelInfo.beginner;

  return (
    <View style={styles.container}>
      {/* confetti */}
      {Array.from({ length: 20 }).map((_, i) => (
        <ConfettiPiece key={i} index={i} />
      ))}

      {/* Bori 둥둥 */}
      <Animated.View style={[styles.mascotContainer, boriStyle]}>
        <BoriMascot size={180} />
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(300).duration(600)}
        style={styles.content}
      >
        <Text style={styles.title}>{t("onboarding.result.title")}</Text>

        <View style={[styles.levelCard, { backgroundColor: info.bg }]}>
          <Ionicons name={info.icon} size={32} color={info.color} />
          <Text style={[styles.levelLabel, { color: info.color }]}>
            {info.label}
          </Text>
          <Text style={styles.levelDescription}>{info.description}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{correctAnswers}/10</Text>
            <Text style={styles.statLabel}>정답</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{levelTestScore}점</Text>
            <Text style={styles.statLabel}>점수</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(600).duration(600)}
        style={styles.footer}
      >
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.replace("/welcome")}
        >
          <Text style={styles.primaryButtonText}>
            {t("onboarding.result.startLearning")}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      marginBottom: 20,
    },
    mascotContainer: {
      alignItems: "center",
      paddingTop: 80,
    },
    content: {
      flex: 1,
      padding: 24,
      gap: 20,
    },
    title: {
      fontSize: 26,
      fontWeight: "800",
      color: theme.text,
      textAlign: "center",
    },
    levelCard: {
      borderRadius: 20,
      padding: 24,
      alignItems: "center",
      gap: 8,
    },
    levelLabel: {
      fontSize: 28,
      fontWeight: "800",
    },
    levelDescription: {
      fontSize: 14,
      color: theme.textSecondary,
      textAlign: "center",
    },
    statsRow: {
      flexDirection: "row",
      gap: 12,
    },
    statCard: {
      flex: 1,
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 16,
      alignItems: "center",
      gap: 4,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    statValue: {
      fontSize: 24,
      fontWeight: "800",
      color: theme.text,
    },
    statLabel: {
      fontSize: 13,
      color: theme.textSecondary,
    },
    footer: {
      padding: 24,
      paddingBottom: 40,
    },
    primaryButton: {
      backgroundColor: theme.primary,
      borderRadius: 999,
      padding: 18,
      alignItems: "center",
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 24,
      elevation: 8,
    },
    primaryButtonText: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "700",
    },
  });
