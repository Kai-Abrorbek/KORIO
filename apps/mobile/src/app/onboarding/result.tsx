import { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useOnboardingStore } from "@/store/onboarding.store";
import { useAuthStore } from "@/store/auth.store";
import HaneulmonMascot from "@/components/home/HaneulmonMascot";
import {
  normalizeOnboardingPlacement,
  resolveOnboardingPlacement,
} from "@/utils/onboarding-placement";

const SPARKLES = [
  { top: 24, left: "10%", color: "#F8C85A", size: 10, delay: 140 },
  { top: 72, left: "84%", color: "#FF8AAE", size: 8, delay: 260 },
  { top: 152, left: "6%", color: "#7F77DD", size: 7, delay: 380 },
  { top: 188, left: "90%", color: "#5CC8BE", size: 11, delay: 500 },
] as const;

function Sparkles() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {SPARKLES.map((sparkle, index) => (
        <Animated.View
          key={index}
          entering={FadeIn.delay(sparkle.delay).duration(500)}
          style={[
            stylesBase.sparkle,
            {
              top: sparkle.top,
              left: sparkle.left,
              width: sparkle.size,
              height: sparkle.size,
              backgroundColor: sparkle.color,
              transform: [{ rotate: index % 2 ? "45deg" : "18deg" }],
            },
          ]}
        />
      ))}
    </View>
  );
}

export default function ResultScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const isDark = theme.bg.toLowerCase() === "#15151d";
  const styles = getStyles(theme, isDark);
  const {
    levelTestScore,
    correctAnswers,
    totalQuestions,
    placementLevel,
    recommendedSection,
    selfReportedLevel,
  } = useOnboardingStore();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const mascotY = useSharedValue(0);

  const fallbackPlacement = resolveOnboardingPlacement(
    selfReportedLevel,
    levelTestScore,
  );
  const safePlacement = normalizeOnboardingPlacement(
    { placementLevel, recommendedSection },
    fallbackPlacement,
  );
  const startSection = safePlacement.recommendedSection;
  const journeySections =
    startSection === 1
      ? [startSection, startSection + 1, startSection + 2]
      : [startSection - 1, startSection, startSection + 1];
  const heroGradient: [string, string, string] = isDark
    ? ["#302A63", "#211E40", "#1A182C"]
    : ["#E8E4FF", "#F4F1FF", "#FFFFFF"];
  const sectionGradient: [string, string] = ["#8B82EE", "#665ACF"];
  const buttonGradient: [string, string] = ["#8178EA", "#6559D2"];

  useEffect(() => {
    mascotY.value = withRepeat(
      withSequence(
        withTiming(-7, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, [mascotY]);

  const mascotStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: mascotY.value }],
  }));

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={heroGradient}
        locations={[0, 0.58, 1]}
        style={styles.heroWash}
      />
      <Sparkles />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Animated.View
            entering={FadeInDown.duration(520)}
            style={styles.eyebrow}
          >
            <View style={styles.eyebrowIcon}>
              <Ionicons name="checkmark" size={14} color="#FFFFFF" />
            </View>
            <Text style={styles.eyebrowText}>
              {t("onboarding.result.eyebrow")}
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(80).duration(560)}
            style={styles.mascotStage}
          >
            <View style={styles.mascotHaloOuter} />
            <View style={styles.mascotHaloInner} />
            <Animated.View style={[styles.mascot, mascotStyle]}>
              <HaneulmonMascot size={116} mood="celebrating" />
            </Animated.View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(150).duration(560)}>
            <Text style={styles.title}>{t("onboarding.result.title")}</Text>
            <Text style={styles.subtitle}>
              {t("onboarding.result.subtitle")}
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(240).duration(620)}
            style={styles.recommendationCard}
          >
            <View style={styles.cardTopRow}>
              <View style={styles.cardLabelIcon}>
                <Ionicons name="navigate" size={15} color="#7469DB" />
              </View>
              <Text style={styles.cardLabel}>
                {t("onboarding.result.recommendationLabel")}
              </Text>
              <View style={styles.personalizedPill}>
                <Ionicons name="sparkles" size={12} color="#7469DB" />
                <Text style={styles.personalizedText}>
                  {t("onboarding.result.personalized")}
                </Text>
              </View>
            </View>

            <LinearGradient
              colors={sectionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.sectionBadge}
            >
              <View>
                <Text style={styles.sectionLabel}>
                  {t("onboarding.result.sectionLabel")}
                </Text>
                <Text style={styles.sectionNumber}>{startSection}</Text>
              </View>
              <View style={styles.flagCircle}>
                <Ionicons name="flag" size={28} color="#6B5FD5" />
              </View>
            </LinearGradient>

            <View style={styles.journey}>
              {journeySections.map((section, index) => {
                const isCurrent = section === startSection;
                const isPrevious = section < startSection;
                return (
                  <View
                    key={`journey-${index}-${section}`}
                    style={styles.journeyItem}
                  >
                    {index > 0 ? (
                      <View
                        style={[
                          styles.journeyLine,
                          (isCurrent || isPrevious) && styles.journeyLineDone,
                        ]}
                      />
                    ) : null}
                    <View
                      style={[
                        styles.journeyNode,
                        isCurrent && styles.journeyNodeCurrent,
                        isPrevious && styles.journeyNodeDone,
                      ]}
                    >
                      {isPrevious ? (
                        <Ionicons name="checkmark" size={15} color="#FFFFFF" />
                      ) : (
                        <Text
                          style={[
                            styles.journeyNodeText,
                            isCurrent && styles.journeyNodeTextCurrent,
                          ]}
                        >
                          {section}
                        </Text>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>

            <Text style={styles.recommendationTitle}>
              {t("onboarding.result.recommendationTitle", {
                section: startSection,
              })}
            </Text>
            <Text style={styles.recommendationBody}>
              {t("onboarding.result.recommendationBody")}
            </Text>

            <View style={styles.readyRow}>
              <View style={styles.readyCheck}>
                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
              </View>
              <View style={styles.readyCopy}>
                <Text style={styles.readyTitle}>
                  {t("onboarding.result.unlocked", { section: startSection })}
                </Text>
                <Text style={styles.readySubtitle}>
                  {t(
                    startSection > 1
                      ? "onboarding.result.reviewOpen"
                      : "onboarding.result.firstSectionReady",
                  )}
                </Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(330).duration(580)}
            style={styles.statsRow}
          >
            <View style={styles.statCard}>
              <View style={[styles.statIcon, styles.correctIcon]}>
                <Ionicons name="checkmark-done" size={17} color="#249B7A" />
              </View>
              <View>
                <Text style={styles.statValue}>
                  {correctAnswers}
                  <Text style={styles.statValueMuted}> / {totalQuestions}</Text>
                </Text>
                <Text style={styles.statLabel}>
                  {t("onboarding.result.correct")}
                </Text>
              </View>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, styles.scoreIcon]}>
                <Ionicons name="analytics" size={17} color="#7469DB" />
              </View>
              <View>
                <Text style={styles.statValue}>{levelTestScore}%</Text>
                <Text style={styles.statLabel}>
                  {t("onboarding.result.score")}
                </Text>
              </View>
            </View>
          </Animated.View>

          {!isLoggedIn ? (
            <Animated.View
              entering={FadeInDown.delay(410).duration(520)}
              style={styles.loginNote}
            >
              <Ionicons name="cloud-done-outline" size={18} color="#7469DB" />
              <Text style={styles.loginNoteText}>
                {t("onboarding.result.loginNote")}
              </Text>
            </Animated.View>
          ) : null}
        </View>
      </ScrollView>

      <Animated.View
        entering={FadeInDown.delay(480).duration(560)}
        style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 14) }]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("onboarding.result.startAtSection", {
            section: startSection,
          })}
          onPress={() => router.replace(isLoggedIn ? "/(tabs)" : "/auth/login")}
          style={({ pressed }) => [
            styles.primaryButtonPressable,
            pressed && styles.primaryButtonPressed,
          ]}
        >
          <LinearGradient
            colors={buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>
              {t("onboarding.result.startAtSection", {
                section: startSection,
              })}
            </Text>
            <View style={styles.buttonArrow}>
              <Ionicons name="arrow-forward" size={18} color="#675BD3" />
            </View>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}

const stylesBase = StyleSheet.create({
  sparkle: {
    position: "absolute",
    borderRadius: 3,
  },
});

const getStyles = (theme: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    heroWash: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 390,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 22,
    },
    content: {
      width: "100%",
      maxWidth: 540,
      alignSelf: "center",
    },
    eyebrow: {
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: isDark ? "rgba(255,255,255,0.09)" : "#FFFFFFB8",
      borderRadius: 999,
      paddingVertical: 7,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: isDark ? "rgba(255,255,255,0.12)" : "#FFFFFF",
    },
    eyebrowIcon: {
      width: 20,
      height: 20,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#7469DB",
    },
    eyebrowText: {
      color: isDark ? "#DAD6FF" : "#554CA9",
      fontSize: 12,
      fontWeight: "800",
      letterSpacing: 0.8,
    },
    mascotStage: {
      height: 132,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 8,
    },
    mascotHaloOuter: {
      position: "absolute",
      width: 126,
      height: 126,
      borderRadius: 63,
      backgroundColor: isDark
        ? "rgba(139,130,238,0.13)"
        : "rgba(255,255,255,0.48)",
    },
    mascotHaloInner: {
      position: "absolute",
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: isDark
        ? "rgba(139,130,238,0.17)"
        : "rgba(255,255,255,0.75)",
    },
    mascot: {
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      color: theme.text,
      fontSize: 27,
      lineHeight: 34,
      fontWeight: "900",
      textAlign: "center",
      letterSpacing: -0.7,
    },
    subtitle: {
      color: theme.textSecondary,
      fontSize: 14,
      lineHeight: 21,
      fontWeight: "500",
      textAlign: "center",
      marginTop: 7,
      paddingHorizontal: 12,
    },
    recommendationCard: {
      marginTop: 20,
      padding: 18,
      borderRadius: 27,
      backgroundColor: isDark ? "#242331" : "#FFFFFF",
      borderWidth: 1,
      borderColor: isDark ? "#3B394D" : "#ECE9F8",
      shadowColor: "#514994",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: isDark ? 0.2 : 0.12,
      shadowRadius: 28,
      elevation: 7,
    },
    cardTopRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 14,
    },
    cardLabelIcon: {
      width: 28,
      height: 28,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? "#37334F" : "#F0EDFF",
    },
    cardLabel: {
      flex: 1,
      color: theme.text,
      fontSize: 14,
      fontWeight: "800",
    },
    personalizedPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      borderRadius: 999,
      paddingVertical: 6,
      paddingHorizontal: 9,
      backgroundColor: isDark ? "#37334F" : "#F4F1FF",
    },
    personalizedText: {
      color: isDark ? "#C9C4FF" : "#665BC6",
      fontSize: 10,
      fontWeight: "800",
    },
    sectionBadge: {
      minHeight: 112,
      borderRadius: 22,
      paddingHorizontal: 22,
      paddingVertical: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      overflow: "hidden",
    },
    sectionLabel: {
      color: "rgba(255,255,255,0.76)",
      fontSize: 12,
      fontWeight: "900",
      letterSpacing: 2.2,
    },
    sectionNumber: {
      color: "#FFFFFF",
      fontSize: 54,
      lineHeight: 60,
      fontWeight: "900",
      letterSpacing: -2,
      fontVariant: ["tabular-nums"],
    },
    flagCircle: {
      width: 60,
      height: 60,
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
      shadowColor: "#30287F",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.22,
      shadowRadius: 12,
      elevation: 5,
    },
    journey: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 17,
      marginBottom: 16,
    },
    journeyItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    journeyLine: {
      width: 38,
      height: 3,
      backgroundColor: isDark ? "#3A3847" : "#E8E5F0",
    },
    journeyLineDone: {
      backgroundColor: "#A9A2EE",
    },
    journeyNode: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? "#34323E" : "#F2F0F6",
      borderWidth: 2,
      borderColor: isDark ? "#44414F" : "#E4E1EA",
    },
    journeyNodeCurrent: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: "#FFFFFF",
      borderColor: "#7D73E3",
      borderWidth: 4,
      shadowColor: "#6A60D4",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.22,
      shadowRadius: 9,
      elevation: 4,
    },
    journeyNodeDone: {
      backgroundColor: "#776EE2",
      borderColor: "#776EE2",
    },
    journeyNodeText: {
      color: theme.textSecondary,
      fontSize: 12,
      fontWeight: "800",
    },
    journeyNodeTextCurrent: {
      color: "#665BD0",
      fontSize: 14,
      fontWeight: "900",
    },
    recommendationTitle: {
      color: theme.text,
      fontSize: 21,
      lineHeight: 28,
      fontWeight: "900",
      textAlign: "center",
      letterSpacing: -0.45,
    },
    recommendationBody: {
      color: theme.textSecondary,
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "500",
      textAlign: "center",
      marginTop: 7,
      paddingHorizontal: 4,
    },
    readyRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      marginTop: 17,
      padding: 13,
      borderRadius: 17,
      backgroundColor: isDark ? "#1D302D" : "#ECF9F4",
    },
    readyCheck: {
      width: 29,
      height: 29,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#2BA47F",
    },
    readyCopy: {
      flex: 1,
      gap: 2,
    },
    readyTitle: {
      color: isDark ? "#BCEBDD" : "#176D57",
      fontSize: 13,
      fontWeight: "800",
    },
    readySubtitle: {
      color: isDark ? "#83B8A8" : "#548B7D",
      fontSize: 11,
      lineHeight: 16,
      fontWeight: "500",
    },
    statsRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: 12,
    },
    statCard: {
      flex: 1,
      minHeight: 68,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 13,
      borderRadius: 18,
      backgroundColor: isDark ? "#242331" : "#FFFFFF",
      borderWidth: 1,
      borderColor: isDark ? "#3B394D" : "#ECE9F5",
    },
    statIcon: {
      width: 34,
      height: 34,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    correctIcon: {
      backgroundColor: isDark ? "#1E3932" : "#E8F7F1",
    },
    scoreIcon: {
      backgroundColor: isDark ? "#383451" : "#F0EDFF",
    },
    statValue: {
      color: theme.text,
      fontSize: 17,
      lineHeight: 21,
      fontWeight: "900",
      fontVariant: ["tabular-nums"],
    },
    statValueMuted: {
      color: theme.textSecondary,
      fontSize: 13,
      fontWeight: "700",
    },
    statLabel: {
      color: theme.textSecondary,
      fontSize: 10,
      lineHeight: 14,
      fontWeight: "600",
    },
    loginNote: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      marginTop: 13,
      paddingHorizontal: 14,
    },
    loginNoteText: {
      flexShrink: 1,
      color: theme.textSecondary,
      fontSize: 11,
      lineHeight: 16,
      fontWeight: "500",
      textAlign: "center",
    },
    footer: {
      paddingTop: 10,
      paddingHorizontal: 20,
      backgroundColor: theme.bg,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: isDark ? "#2C2B35" : "#F0EEF7",
    },
    primaryButtonPressable: {
      width: "100%",
      maxWidth: 540,
      alignSelf: "center",
      borderRadius: 19,
      shadowColor: "#5549BB",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.26,
      shadowRadius: 16,
      elevation: 7,
    },
    primaryButtonPressed: {
      opacity: 0.88,
      transform: [{ scale: 0.99 }],
    },
    primaryButton: {
      minHeight: 56,
      borderRadius: 19,
      paddingLeft: 20,
      paddingRight: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    primaryButtonText: {
      flex: 1,
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "900",
      textAlign: "center",
      paddingLeft: 38,
    },
    buttonArrow: {
      width: 38,
      height: 38,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
    },
  });
