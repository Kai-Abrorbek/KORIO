import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import type { TopikLevel } from "@/components/topik";
import {
  type TopikPalette,
  useTopikTheme,
} from "@/components/topik/topikTheme";
import { TopikService } from "@/services/topik.service";
import type { TopikAttemptMode, TopikExam } from "@/types/topik";
import { toTopikLanguage, topikText } from "@/types/topik";

const MODES: Array<{
  key: TopikAttemptMode;
  icon: keyof typeof Ionicons.glyphMap;
  titleKey: string;
  descriptionKey: string;
}> = [
  {
    key: "guided",
    icon: "bulb-outline",
    titleKey: "topik.modes.guided",
    descriptionKey: "topik.modes.guidedDescription",
  },
  {
    key: "mock_exam",
    icon: "timer-outline",
    titleKey: "topik.modes.mockExam",
    descriptionKey: "topik.modes.mockExamDescription",
  },
];

export default function TopikHomeScreen() {
  const { t, i18n } = useTranslation();
  const language = toTopikLanguage(i18n.resolvedLanguage ?? i18n.language);
  const palette = useTopikTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);
  const params = useLocalSearchParams<{
    level?: TopikLevel;
    section?: "reading" | "listening";
  }>();
  const levelParam = Array.isArray(params.level)
    ? params.level[0]
    : params.level;
  const level: TopikLevel = levelParam === "1" ? "1" : "2";
  const sectionParam = Array.isArray(params.section)
    ? params.section[0]
    : params.section;
  const section = sectionParam === "listening" ? "listening" : "reading";
  const examType = level === "1" ? "topik_i" : "topik_ii";
  const roman = level === "1" ? "I" : "II";
  const [exams, setExams] = useState<TopikExam[]>([]);
  const [selectedExamCode, setSelectedExamCode] = useState<string | null>(null);
  const [mode, setMode] = useState<TopikAttemptMode>("guided");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadExams = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await TopikService.listExams();
      const matchingExams = data.filter(
        (exam) => exam.examType === examType && exam.section === section,
      );
      setExams(matchingExams);
      setSelectedExamCode((current) =>
        matchingExams.some((exam) => exam.code === current)
          ? current
          : (matchingExams[0]?.code ?? null),
      );
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [examType, section]);

  useEffect(() => {
    void loadExams();
  }, [loadExams]);

  const selectedExam = exams.find((exam) => exam.code === selectedExamCode);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel={t("topik.common.back")}
          onPress={() => router.back()}
          style={styles.iconButton}
        >
          <Ionicons name="chevron-back" size={25} color={palette.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>
          {t("topik.home.header", {
            level: roman,
            section: t(`topik.home.${section}`),
          })}
        </Text>
        <Pressable
          accessibilityLabel={t("topik.home.openStats")}
          onPress={() => router.push("/topik-stats")}
          style={styles.iconButton}
        >
          <Ionicons name="stats-chart" size={21} color={palette.primary} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>
              TOPIK {roman} · {t(`topik.home.${section}`).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.heroTitle}>
            {t(
              section === "listening"
                ? "topik.home.listeningHeroTitle"
                : "topik.home.heroTitle",
            )}
          </Text>
          <Text style={styles.heroDescription}>
            {t(
              section === "listening"
                ? "topik.home.listeningHeroDescription"
                : "topik.home.heroDescription",
            )}
          </Text>
          <View style={styles.heroMetrics}>
            <View>
              <Text style={styles.metricValue}>
                {selectedExam?.totalQuestions ?? "—"}
              </Text>
              <Text style={styles.metricLabel}>
                {t("topik.common.questions")}
              </Text>
            </View>
            <View style={styles.metricDivider} />
            <View>
              <Text style={styles.metricValue}>
                {selectedExam?.durationMinutes ?? "—"}
              </Text>
              <Text style={styles.metricLabel}>
                {t("topik.common.minutes")}
              </Text>
            </View>
            <View style={styles.metricDivider} />
            <View>
              <Text style={styles.metricValue}>
                {selectedExam?.totalPoints ?? "—"}
              </Text>
              <Text style={styles.metricLabel}>{t("topik.common.points")}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {t("topik.home.examSelection")}
          </Text>
          <Text style={styles.sectionCaption}>
            {t(
              section === "listening"
                ? "topik.home.listeningTest"
                : "topik.home.readingTest",
            )}
          </Text>
        </View>

        {loading ? (
          <View style={styles.stateCard}>
            <ActivityIndicator color={palette.primary} />
            <Text style={styles.stateText}>{t("topik.home.loading")}</Text>
          </View>
        ) : error ? (
          <View style={styles.stateCard}>
            <Ionicons
              name="cloud-offline-outline"
              size={28}
              color={palette.danger}
            />
            <Text style={styles.stateTitle}>{t("topik.home.loadError")}</Text>
            <Pressable onPress={loadExams} style={styles.retryButton}>
              <Text style={styles.retryText}>{t("topik.common.retry")}</Text>
            </Pressable>
          </View>
        ) : exams.length === 0 ? (
          <View style={styles.stateCard}>
            <Ionicons
              name="documents-outline"
              size={29}
              color={palette.textMuted}
            />
            <Text style={styles.stateTitle}>
              {t("topik.home.emptyTitle", {
                level: roman,
                section: t(`topik.home.${section}`),
              })}
            </Text>
            <Text style={styles.stateText}>
              {t("topik.home.emptyDescription")}
            </Text>
          </View>
        ) : (
          <View style={styles.examList}>
            {exams.map((exam) => {
              const selected = exam.code === selectedExamCode;
              return (
                <Pressable
                  key={exam.id}
                  onPress={() => setSelectedExamCode(exam.code)}
                  style={[styles.examCard, selected && styles.examCardSelected]}
                >
                  <View style={styles.examNumber}>
                    <Text style={styles.examNumberText}>
                      {String(exam.round ?? 1).padStart(2, "0")}
                    </Text>
                  </View>
                  <View style={styles.examInfo}>
                    <Text style={styles.examTitle}>
                      {topikText(exam.title, language)}
                    </Text>
                    <Text style={styles.examMeta}>
                      {t("topik.home.examMeta", {
                        questions: exam.totalQuestions,
                        minutes: exam.durationMinutes,
                        points: exam.totalPoints,
                      })}
                    </Text>
                  </View>
                  <Ionicons
                    name={selected ? "checkmark-circle" : "ellipse-outline"}
                    size={23}
                    color={selected ? palette.primary : palette.textMuted}
                  />
                </Pressable>
              );
            })}
          </View>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t("topik.home.studyMode")}</Text>
          <Text style={styles.sectionCaption}>{t("topik.home.mode")}</Text>
        </View>
        <View style={styles.modeList}>
          {MODES.map((item) => {
            const selected = item.key === mode;
            const color =
              item.key === "guided" ? palette.warning : palette.primary;
            return (
              <Pressable
                key={item.key}
                onPress={() => setMode(item.key)}
                style={[styles.modeCard, selected && styles.modeCardSelected]}
              >
                <View
                  style={[
                    styles.modeIcon,
                    {
                      backgroundColor: palette.isDark
                        ? palette.surfaceMuted
                        : `${color}18`,
                    },
                  ]}
                >
                  <Ionicons name={item.icon} size={25} color={color} />
                </View>
                <View style={styles.modeInfo}>
                  <Text style={styles.modeTitle}>{t(item.titleKey)}</Text>
                  <Text style={styles.modeDescription}>
                    {t(item.descriptionKey)}
                  </Text>
                </View>
                <View style={[styles.radio, selected && styles.radioSelected]}>
                  {selected && <View style={styles.radioDot} />}
                </View>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          disabled={!selectedExam}
          onPress={() =>
            selectedExam &&
            router.push({
              pathname: "/topik-exam",
              params: { examCode: selectedExam.code, mode },
            })
          }
          style={({ pressed }) => [
            styles.startButton,
            !selectedExam && styles.buttonDisabled,
            pressed && selectedExam && styles.buttonPressed,
          ]}
        >
          <Text style={styles.startButtonText}>
            {mode === "guided"
              ? t("topik.home.startGuided")
              : t("topik.home.startMock")}
          </Text>
          <Ionicons name="arrow-forward" size={21} color={palette.white} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (palette: TopikPalette) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: palette.bg },
    header: {
      height: 58,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 14,
      backgroundColor: palette.bg,
      // marginTop: 30,
    },
    iconButton: {
      width: 42,
      height: 42,
      alignItems: "center",
      justifyContent: "center",
    },
    headerTitle: { color: palette.text, fontSize: 16, fontWeight: "900" },
    content: { paddingHorizontal: 18, paddingBottom: 42, gap: 18 },
    hero: {
      overflow: "hidden",
      borderRadius: 22,
      backgroundColor: palette.hero,
      padding: 23,
    },
    heroBadge: {
      alignSelf: "flex-start",
      borderRadius: 20,
      backgroundColor: palette.heroBadge,
      paddingHorizontal: 11,
      paddingVertical: 6,
    },
    heroBadgeText: {
      color: palette.heroMuted,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.1,
    },
    heroTitle: {
      color: palette.white,
      fontSize: 23,
      lineHeight: 32,
      fontWeight: "900",
      marginTop: 16,
      letterSpacing: -0.8,
    },
    heroDescription: {
      color: palette.heroMuted,
      fontSize: 13,
      lineHeight: 20,
      marginTop: 10,
    },
    heroMetrics: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      marginTop: 22,
      borderTopWidth: 1,
      borderTopColor: palette.heroDivider,
      paddingTop: 16,
    },
    metricValue: {
      color: palette.white,
      fontSize: 18,
      fontWeight: "900",
      textAlign: "center",
    },
    metricLabel: {
      color: palette.heroSubtle,
      fontSize: 10,
      marginTop: 2,
      textAlign: "center",
    },
    metricDivider: {
      width: 1,
      height: 29,
      backgroundColor: palette.heroDividerStrong,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginTop: 3,
    },
    sectionTitle: { color: palette.text, fontSize: 17, fontWeight: "900" },
    sectionCaption: {
      color: palette.textMuted,
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 1,
    },
    examList: { gap: 10 },
    examCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 14,
      backgroundColor: palette.surface,
      padding: 14,
    },
    examCardSelected: {
      borderColor: palette.primary,
      backgroundColor: palette.primarySoft,
    },
    examNumber: {
      width: 44,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      backgroundColor: palette.primaryStrong,
    },
    examNumberText: { color: palette.white, fontSize: 16, fontWeight: "900" },
    examInfo: { flex: 1, gap: 4 },
    examTitle: { color: palette.text, fontSize: 14, fontWeight: "900" },
    examMeta: { color: palette.textSecondary, fontSize: 11 },
    modeList: { gap: 10 },
    modeCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 14,
      backgroundColor: palette.surface,
      padding: 14,
    },
    modeCardSelected: {
      borderColor: palette.primary,
      backgroundColor: palette.primarySoft,
    },
    modeIcon: {
      width: 48,
      height: 48,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    modeInfo: { flex: 1, gap: 3 },
    modeTitle: { color: palette.text, fontSize: 14, fontWeight: "900" },
    modeDescription: {
      color: palette.textSecondary,
      fontSize: 11,
      lineHeight: 17,
    },
    radio: {
      width: 21,
      height: 21,
      borderWidth: 2,
      borderColor: palette.borderStrong,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
    },
    radioSelected: { borderColor: palette.primary },
    radioDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: palette.primary,
    },
    startButton: {
      minHeight: 57,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      borderRadius: 16,
      backgroundColor: palette.primaryStrong,
      marginTop: 5,
      // marginBottom: 20,
    },
    startButtonText: { color: palette.white, fontSize: 14, fontWeight: "900" },
    buttonDisabled: { opacity: 0.45 },
    buttonPressed: { opacity: 0.82 },
    stateCard: {
      minHeight: 128,
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderRadius: 14,
      backgroundColor: palette.surface,
      padding: 20,
    },
    stateTitle: {
      color: palette.text,
      fontSize: 14,
      fontWeight: "800",
      textAlign: "center",
    },
    stateText: {
      color: palette.textSecondary,
      fontSize: 11,
      textAlign: "center",
    },
    retryButton: {
      borderRadius: 9,
      backgroundColor: palette.primaryStrong,
      paddingHorizontal: 17,
      paddingVertical: 9,
      marginTop: 4,
    },
    retryText: { color: palette.white, fontSize: 13, fontWeight: "800" },
  });
