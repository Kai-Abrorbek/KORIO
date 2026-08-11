import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "@/utils/haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { TopikNoticeModal } from "@/components/topik";
import type { TopikLevel } from "@/components/topik/TopikLevelModal";
import {
  type TopikPalette,
  useTopikTheme,
} from "@/components/topik/topikTheme";

type SectionKey = "reading" | "listening" | "writing";

interface SectionOption {
  key: SectionKey;
  order: string;
  icon: keyof typeof Ionicons.glyphMap;
  available: boolean;
}

const SECTIONS: SectionOption[] = [
  {
    key: "reading",
    order: "01",
    icon: "book-outline",
    available: true,
  },
  {
    key: "listening",
    order: "02",
    icon: "headset-outline",
    available: true,
  },
  {
    key: "writing",
    order: "03",
    icon: "create-outline",
    available: true,
  },
];

export default function TopikSectionsScreen() {
  const { t } = useTranslation();
  const palette = useTopikTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);
  const [comingSoonSection, setComingSoonSection] =
    useState<SectionOption | null>(null);
  const params = useLocalSearchParams<{ level?: TopikLevel }>();
  const levelParam = Array.isArray(params.level)
    ? params.level[0]
    : params.level;
  const level: TopikLevel = levelParam === "1" ? "1" : "2";
  const roman = level === "1" ? "I" : "II";
  const sections = SECTIONS.filter(
    (section) => level === "2" || section.key !== "writing",
  );
  const sectionColors = {
    reading: palette.readingGradient,
    listening: palette.listeningGradient,
    writing: palette.writingGradient,
  };
  const heroColors =
    level === "1" ? palette.levelOneHero : palette.levelTwoHero;

  const openSection = (section: SectionOption) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (section.available) {
      router.push({
        pathname: "/topik",
        params: { level, section: section.key },
      });
      return;
    }
    setComingSoonSection(section);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel={t("topik.common.back")}
          hitSlop={10}
          onPress={() => router.back()}
          style={styles.headerButton}
        >
          <Ionicons name="chevron-back" size={24} color={palette.text} />
        </Pressable>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerEyebrow}>
            {t("topik.sections.eyebrow")}
          </Text>
          <Text style={styles.headerTitle}>TOPIK {roman}</Text>
        </View>
        <View style={styles.headerMark}>
          <Ionicons name="ribbon-outline" size={20} color={palette.primary} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={heroColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroGlowLarge} />
          <View style={styles.heroGlowSmall} />
          <View style={styles.heroTopRow}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>TOPIK {roman}</Text>
            </View>
            <View style={styles.planBadge}>
              <Ionicons name="sparkles" size={12} color={palette.warningText} />
              <Text style={styles.planBadgeText}>
                {t("topik.sections.planBadge")}
              </Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>{t("topik.sections.heroTitle")}</Text>
          <Text style={styles.heroDescription}>
            {t("topik.sections.heroDescription")}
          </Text>
          <View style={styles.heroFeatures}>
            <View style={styles.heroFeature}>
              <Ionicons
                name="analytics-outline"
                size={15}
                color={palette.white}
              />
              <Text style={styles.heroFeatureText}>
                {t("topik.sections.personalAnalysis")}
              </Text>
            </View>
            <View style={styles.heroFeatureDivider} />
            <View style={styles.heroFeature}>
              <Ionicons name="bulb-outline" size={15} color={palette.white} />
              <Text style={styles.heroFeatureText}>
                {t("topik.sections.guidedExplanation")}
              </Text>
            </View>
            <View style={styles.heroFeatureDivider} />
            <View style={styles.heroFeature}>
              <Ionicons name="repeat-outline" size={15} color={palette.white} />
              <Text style={styles.heroFeatureText}>
                {t("topik.sections.weaknessReview")}
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionEyebrow}>
              {t("topik.sections.focusEyebrow")}
            </Text>
            <Text style={styles.sectionTitle}>
              {t("topik.sections.chooseSection")}
            </Text>
          </View>
          <Text style={styles.sectionCount}>
            {t("topik.sections.areaCount", { count: sections.length })}
          </Text>
        </View>

        <View style={styles.cardList}>
          {sections.map((section, index) => (
            <Animated.View
              key={section.key}
              entering={FadeInDown.delay(index * 90).duration(420)}
            >
              <Pressable
                accessibilityRole="button"
                onPress={() => openSection(section)}
                style={({ pressed }) => [
                  styles.sectionCard,
                  pressed && styles.sectionCardPressed,
                ]}
              >
                <View style={styles.cardTopRow}>
                  <LinearGradient
                    colors={sectionColors[section.key]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.sectionIcon}
                  >
                    <Ionicons
                      name={section.icon}
                      size={27}
                      color={palette.white}
                    />
                  </LinearGradient>
                  <View style={styles.sectionCopy}>
                    <Text style={styles.sectionEnglish}>
                      {section.order} ·{" "}
                      {t(`topik.sections.${section.key}.title`).toUpperCase()}
                    </Text>
                    <Text style={styles.cardTitle}>
                      {t(`topik.sections.${section.key}.title`)}
                    </Text>
                  </View>
                  {section.available ? (
                    <View style={styles.liveBadge}>
                      <View style={styles.liveDot} />
                      <Text style={styles.liveText}>
                        {t("topik.sections.available")}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.soonBadge}>
                      <Ionicons
                        name="time-outline"
                        size={12}
                        color={palette.textMuted}
                      />
                      <Text style={styles.soonText}>
                        {t("topik.sections.comingSoon")}
                      </Text>
                    </View>
                  )}
                </View>

                <Text style={styles.cardDescription}>
                  {t(`topik.sections.${section.key}.description`)}
                </Text>

                <View style={styles.featureRow}>
                  {(
                    t(`topik.sections.${section.key}.features`, {
                      returnObjects: true,
                    }) as string[]
                  ).map((feature) => (
                    <View key={feature} style={styles.featureChip}>
                      <Text style={styles.featureChipText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.cardFooterCopy}>
                    <Ionicons
                      name={
                        section.available
                          ? "checkmark-circle"
                          : "lock-closed-outline"
                      }
                      size={15}
                      color={
                        section.available ? palette.success : palette.textMuted
                      }
                    />
                    <Text
                      style={[
                        styles.cardFooterText,
                        section.available && styles.cardFooterTextLive,
                      ]}
                    >
                      {section.available
                        ? t("topik.sections.availableDescription")
                        : t("topik.sections.comingSoonDescription")}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.arrowCircle,
                      !section.available && styles.arrowCircleDisabled,
                    ]}
                  >
                    <Ionicons
                      name="arrow-forward"
                      size={18}
                      color={
                        section.available ? palette.white : palette.textMuted
                      }
                    />
                  </View>
                </View>
              </Pressable>
            </Animated.View>
          ))}
        </View>

        <View style={styles.recommendation}>
          <View style={styles.recommendationIcon}>
            <Ionicons name="bulb" size={18} color={palette.warning} />
          </View>
          <View style={styles.recommendationCopy}>
            <Text style={styles.recommendationTitle}>
              {t("topik.sections.recommendationTitle")}
            </Text>
            <Text style={styles.recommendationText}>
              {t("topik.sections.recommendationDescription")}
            </Text>
          </View>
        </View>
      </ScrollView>

      <TopikNoticeModal
        visible={Boolean(comingSoonSection)}
        icon={comingSoonSection?.icon ?? "sparkles"}
        gradientColors={
          comingSoonSection
            ? sectionColors[comingSoonSection.key]
            : palette.listeningGradient
        }
        title={t("topik.sections.comingSoonTitle", {
          section: comingSoonSection
            ? t(`topik.sections.${comingSoonSection.key}.title`)
            : "",
        })}
        message={t("topik.sections.comingSoonMessage")}
        primaryLabel={t("topik.common.confirm")}
        onClose={() => setComingSoonSection(null)}
      />
    </SafeAreaView>
  );
}

const getStyles = (palette: TopikPalette) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: palette.bg },
    header: {
      height: 62,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
      backgroundColor: palette.bg,
    },
    headerButton: {
      width: 42,
      height: 42,
      alignItems: "center",
      justifyContent: "center",
    },
    headerTitleWrap: { flex: 1, alignItems: "center" },
    headerEyebrow: {
      color: palette.textMuted,
      fontSize: 8,
      fontWeight: "900",
      letterSpacing: 1.25,
    },
    headerTitle: {
      color: palette.text,
      fontSize: 17,
      fontWeight: "900",
      marginTop: 1,
    },
    headerMark: {
      width: 42,
      height: 42,
      alignItems: "center",
      justifyContent: "center",
    },
    content: { paddingHorizontal: 16, paddingBottom: 42 },
    hero: { overflow: "hidden", borderRadius: 26, padding: 21, minHeight: 260 },
    heroGlowLarge: {
      position: "absolute",
      width: 220,
      height: 220,
      right: -85,
      top: -70,
      borderRadius: 110,
      backgroundColor: palette.heroGlow,
    },
    heroGlowSmall: {
      position: "absolute",
      width: 110,
      height: 110,
      left: -42,
      bottom: -46,
      borderRadius: 55,
      backgroundColor: palette.heroGlowSoft,
    },
    heroTopRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    levelBadge: {
      borderRadius: 9,
      backgroundColor: palette.heroGlass,
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    levelBadgeText: {
      color: palette.white,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 0.7,
    },
    planBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      borderRadius: 12,
      backgroundColor: palette.heroGlassDark,
      paddingHorizontal: 9,
      paddingVertical: 6,
    },
    planBadgeText: {
      color: palette.warningText,
      fontSize: 8,
      fontWeight: "900",
      letterSpacing: 0.7,
    },
    heroTitle: {
      color: palette.white,
      fontSize: 25,
      lineHeight: 34,
      fontWeight: "900",
      letterSpacing: -0.7,
      marginTop: 26,
    },
    heroDescription: {
      color: palette.heroDescription,
      fontSize: 12,
      lineHeight: 19,
      marginTop: 10,
      maxWidth: 325,
    },
    heroFeatures: {
      flexDirection: "row",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: palette.heroDivider,
      marginTop: 23,
      paddingTop: 15,
    },
    heroFeature: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
    },
    heroFeatureText: { color: palette.white, fontSize: 10, fontWeight: "800" },
    heroFeatureDivider: {
      width: 1,
      height: 17,
      backgroundColor: palette.heroDividerStrong,
    },
    sectionHeading: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginTop: 28,
      marginBottom: 14,
    },
    sectionEyebrow: {
      color: palette.textMuted,
      fontSize: 8,
      fontWeight: "900",
      letterSpacing: 1.2,
    },
    sectionTitle: {
      color: palette.text,
      fontSize: 19,
      fontWeight: "900",
      letterSpacing: -0.4,
      marginTop: 4,
    },
    sectionCount: { color: palette.textMuted, fontSize: 10, fontWeight: "700" },
    cardList: { gap: 12 },
    sectionCard: {
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 22,
      backgroundColor: palette.surface,
      padding: 16,
      shadowColor: palette.shadow,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.055,
      shadowRadius: 14,
      elevation: 2,
    },
    sectionCardPressed: { opacity: 0.84, transform: [{ scale: 0.99 }] },
    cardTopRow: { flexDirection: "row", alignItems: "center" },
    sectionIcon: {
      width: 58,
      height: 58,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 18,
    },
    sectionCopy: { flex: 1, marginLeft: 12 },
    sectionEnglish: {
      color: palette.textSubtle,
      fontSize: 8,
      fontWeight: "900",
      letterSpacing: 1,
    },
    cardTitle: {
      color: palette.text,
      fontSize: 20,
      fontWeight: "900",
      marginTop: 2,
    },
    liveBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      borderRadius: 11,
      backgroundColor: palette.successSoft,
      paddingHorizontal: 8,
      paddingVertical: 6,
    },
    liveDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: palette.success,
    },
    liveText: { color: palette.successText, fontSize: 9, fontWeight: "900" },
    soonBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      borderRadius: 11,
      backgroundColor: palette.surfaceMuted,
      paddingHorizontal: 8,
      paddingVertical: 6,
    },
    soonText: { color: palette.textMuted, fontSize: 9, fontWeight: "800" },
    cardDescription: {
      color: palette.textSecondary,
      fontSize: 12,
      lineHeight: 19,
      marginTop: 13,
    },
    featureRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
      marginTop: 12,
    },
    featureChip: {
      borderRadius: 8,
      backgroundColor: palette.surfaceMuted,
      paddingHorizontal: 8,
      paddingVertical: 5,
    },
    featureChipText: {
      color: palette.textSecondary,
      fontSize: 9,
      fontWeight: "700",
    },
    cardFooter: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderTopWidth: 1,
      borderTopColor: palette.divider,
      marginTop: 14,
      paddingTop: 13,
    },
    cardFooterCopy: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    cardFooterText: {
      color: palette.textMuted,
      fontSize: 10,
      fontWeight: "700",
    },
    cardFooterTextLive: { color: palette.successText },
    arrowCircle: {
      width: 34,
      height: 34,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 17,
      backgroundColor: palette.primaryStrong,
    },
    arrowCircleDisabled: { backgroundColor: palette.surfaceMuted },
    recommendation: {
      flexDirection: "row",
      gap: 11,
      borderWidth: 1,
      borderColor: palette.warning,
      borderRadius: 17,
      backgroundColor: palette.warningSoft,
      marginTop: 18,
      marginBottom: 20,
      padding: 14,
    },
    recommendationIcon: {
      width: 36,
      height: 36,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      backgroundColor: palette.surfaceElevated,
    },
    recommendationCopy: { flex: 1 },
    recommendationTitle: {
      color: palette.warningText,
      fontSize: 12,
      fontWeight: "900",
    },
    recommendationText: {
      color: palette.textSecondary,
      fontSize: 10,
      lineHeight: 16,
      marginTop: 4,
    },
  });
