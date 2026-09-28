import { withPremiumScreen } from "@/features/subscription/usePremiumScreen";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "@/utils/haptics";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import type { TopikLevel } from "@/components/topik/TopikLevelModal";
import { useTopikDashboardTheme } from "@/components/topik/topikDashboardTheme";
import type { TopikPalette } from "@/components/topik/topikTheme";
import { TopikService } from "@/services/topik.service";
import type { TopikHistoryItem } from "@/types/topik";

type SectionKey = "reading" | "listening" | "writing";

interface SectionOption {
  key: SectionKey;
  icon: keyof typeof Ionicons.glyphMap;
}

const SECTIONS: SectionOption[] = [
  {
    key: "reading",
    icon: "book-outline",
  },
  {
    key: "listening",
    icon: "headset-outline",
  },
  {
    key: "writing",
    icon: "create-outline",
  },
];

function TopikSectionsScreen() {
  const { t } = useTranslation();
  const palette = useTopikDashboardTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);
  const [recent, setRecent] = useState<TopikHistoryItem | null>(null);
  const params = useLocalSearchParams<{ level?: TopikLevel }>();
  const levelParam = Array.isArray(params.level)
    ? params.level[0]
    : params.level;
  const level: TopikLevel = levelParam === "1" ? "1" : "2";
  const roman = level === "1" ? "I" : "II";
  const sections = SECTIONS.filter(
    (section) => level === "2" || section.key !== "writing",
  );

  useFocusEffect(
    useCallback(() => {
      let active = true;
      setRecent(null);
      TopikService.getHistory(
        level === "1" ? "topik_i" : "topik_ii",
        undefined,
        1,
      )
        .then((items) => {
          if (active) setRecent(items[0] ?? null);
        })
        .catch(() => {
          if (active) setRecent(null);
        });
      return () => {
        active = false;
      };
    }, [level]),
  );

  const openSection = (section: SectionOption) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: "/topik",
      params: { level, section: section.key },
    });
  };

  const openRecent = () => {
    if (!recent) return;
    router.push(
      recent.section === "writing"
        ? {
            pathname: "/topik-writing",
            params: {
              examCode: recent.examCode,
              reviewAttemptId: recent.attemptId,
            },
          }
        : {
            pathname: "/topik-result",
            params: { attemptId: recent.attemptId },
          },
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
          <Text style={styles.headerTitle}>TOPIK {roman}</Text>
        </View>
        <Pressable
          accessibilityLabel={t("topik.home.openStats")}
          onPress={() =>
            router.push({ pathname: "/topik-stats", params: { level } })
          }
          style={styles.headerButton}
        >
          <Ionicons
            name="stats-chart-outline"
            size={22}
            color={palette.primary}
          />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={styles.eyebrow}>{t("topik.sections.todayStudy")}</Text>
          <Text style={styles.introTitle}>
            {t("topik.sections.chooseSection")}
          </Text>
        </View>

        {recent ? (
          <Pressable
            accessibilityRole="button"
            onPress={openRecent}
            style={({ pressed }) => [
              styles.recentCard,
              pressed && styles.sectionCardPressed,
            ]}
          >
            <View style={styles.recentIcon}>
              <Ionicons
                name={
                  SECTIONS.find((item) => item.key === recent.section)?.icon ??
                  "book-outline"
                }
                size={27}
                color={palette.primary}
              />
            </View>
            <View style={styles.recentCopy}>
              <Text style={styles.recentLabel}>
                {t("topik.sections.recentStudy")}
              </Text>
              <Text style={styles.recentTitle} numberOfLines={1}>
                {t(`topik.home.${recent.section}`)} ·{" "}
                {recent.examRound
                  ? t("topik.sections.round", { round: recent.examRound })
                  : `TOPIK ${roman}`}
              </Text>
              <Text style={styles.recentMeta}>
                {t("topik.sections.completedStudy")}
              </Text>
            </View>
            <Text style={styles.recentAction}>
              {t("topik.home.viewResult")}
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => openSection(sections[0])}
            style={styles.recentCard}
          >
            <View style={styles.recentIcon}>
              <Ionicons name="book-outline" size={27} color={palette.primary} />
            </View>
            <View style={styles.recentCopy}>
              <Text style={styles.recentLabel}>
                {t("topik.sections.firstStep")}
              </Text>
              <Text style={styles.recentTitle}>
                {t("topik.sections.startReading")}
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color={palette.primary} />
          </Pressable>
        )}

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionTitle}>
              {t("topik.sections.sectionSelection")}
            </Text>
          </View>
          <Text style={styles.sectionCount}>
            {t("topik.sections.areaCount", { count: sections.length })}
          </Text>
        </View>

        <View style={styles.cardList}>
          {sections.map((section) => {
            const color =
              section.key === "reading"
                ? palette.isDark
                  ? "#FF9D87"
                  : "#D85F47"
                : section.key === "listening"
                  ? palette.isDark
                    ? "#F4C777"
                    : "#B97916"
                  : palette.primary;
            const soft =
              section.key === "reading"
                ? palette.isDark
                  ? "#462D29"
                  : "#FCECE7"
                : section.key === "listening"
                  ? palette.isDark
                    ? "#403626"
                    : "#FFF1D7"
                  : palette.primarySoft;
            return (
              <Pressable
                key={section.key}
                accessibilityRole="button"
                onPress={() => openSection(section)}
                style={({ pressed }) => [
                  styles.sectionCard,
                  pressed && styles.sectionCardPressed,
                ]}
              >
                <View style={[styles.sectionIcon, { backgroundColor: soft }]}>
                  <Ionicons name={section.icon} size={27} color={color} />
                </View>
                <View style={styles.sectionCopy}>
                  <Text style={styles.cardTitle}>
                    {t(`topik.sections.${section.key}.title`)}
                  </Text>
                  <Text style={styles.cardDescription}>
                    {t(`topik.sections.${section.key}.shortDescription`)}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={palette.textSecondary}
                />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            router.push({ pathname: "/topik-stats", params: { level } })
          }
          style={({ pressed }) => [
            styles.statsButton,
            pressed && styles.sectionCardPressed,
          ]}
        >
          <Ionicons
            name="stats-chart-outline"
            size={19}
            color={palette.primary}
          />
          <Text style={styles.statsButtonText}>
            {t("topik.sections.viewStats")}
          </Text>
        </Pressable>
      </View>
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
    headerTitle: {
      color: palette.text,
      fontSize: 17,
      fontWeight: "900",
      marginTop: 1,
    },
    content: { paddingHorizontal: 20, paddingBottom: 24 },
    intro: { marginTop: 29, marginBottom: 21, gap: 7 },
    eyebrow: { color: palette.textSecondary, fontSize: 12, fontWeight: "700" },
    introTitle: {
      color: palette.text,
      fontSize: 25,
      lineHeight: 34,
      fontWeight: "900",
    },
    recentCard: {
      minHeight: 112,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      borderRadius: 17,
      backgroundColor: palette.primarySoft,
      padding: 16,
    },
    recentIcon: {
      width: 54,
      height: 54,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: palette.isDark ? "#2D5050" : "#D3ECE8",
    },
    recentCopy: { flex: 1, gap: 4 },
    recentLabel: {
      color: palette.textSecondary,
      fontSize: 11,
      fontWeight: "700",
    },
    recentTitle: { color: palette.text, fontSize: 16, fontWeight: "900" },
    recentMeta: { color: palette.textSecondary, fontSize: 11 },
    recentAction: { color: palette.primary, fontSize: 12, fontWeight: "900" },
    sectionHeading: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginTop: 30,
      marginBottom: 14,
    },
    sectionTitle: {
      color: palette.text,
      fontSize: 19,
      fontWeight: "900",
      letterSpacing: -0.4,
      marginTop: 4,
    },
    sectionCount: { color: palette.textMuted, fontSize: 10, fontWeight: "700" },
    cardList: { gap: 11 },
    sectionCard: {
      minHeight: 104,
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 17,
      backgroundColor: palette.surface,
      padding: 15,
    },
    sectionCardPressed: { opacity: 0.76 },
    sectionIcon: {
      width: 55,
      height: 55,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 14,
    },
    sectionCopy: { flex: 1, gap: 5 },
    cardTitle: {
      color: palette.text,
      fontSize: 18,
      fontWeight: "900",
      marginTop: 2,
    },
    cardDescription: {
      color: palette.textSecondary,
      fontSize: 12,
      lineHeight: 18,
    },
    footer: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 14,
      borderTopWidth: 1,
      borderTopColor: palette.border,
      backgroundColor: palette.bg,
    },
    statsButton: {
      minHeight: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderWidth: 1,
      borderColor: palette.primary,
      borderRadius: 13,
    },
    statsButtonText: {
      color: palette.primary,
      fontSize: 14,
      fontWeight: "900",
    },
  });

// 구독 전용 화면. 버튼 게이트를 안 거치고 들어오는 길(홈의 "이어서 학습하기",
// 딥링크)이 있어서 화면 자체에서도 막는다.
export default withPremiumScreen(TopikSectionsScreen, "topik");
