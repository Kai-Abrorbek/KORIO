import { withPremiumScreen } from "@/features/subscription/usePremiumScreen";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import type { TopikLevel } from "@/components/topik";
import { type TopikPalette } from "@/components/topik/topikTheme";
import { useTopikDashboardTheme } from "@/components/topik/topikDashboardTheme";
import { TopikService } from "@/services/topik.service";
import type {
  TopikAttemptMode,
  TopikCompletedExam,
  TopikExam,
} from "@/types/topik";
import { toTopikLanguage, topikText } from "@/types/topik";
import { getContentLang } from "@/store/settings.store";

const MODES: {
  key: TopikAttemptMode;
  icon: keyof typeof Ionicons.glyphMap;
  descriptionKey: string;
}[] = [
  {
    key: "guided",
    icon: "bulb-outline",
    descriptionKey: "topik.modes.guidedDescription",
  },
  {
    key: "mock_exam",
    icon: "timer-outline",
    descriptionKey: "topik.modes.mockExamDescription",
  },
];

const WRITING_PRACTICE_TYPES: {
  number: 51 | 52 | 53 | 54;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { number: 51, icon: "mail-outline" },
  { number: 52, icon: "git-compare-outline" },
  { number: 53, icon: "bar-chart-outline" },
  { number: 54, icon: "reader-outline" },
];

function TopikHomeScreen() {
  const { t } = useTranslation();
  const language = toTopikLanguage(getContentLang());
  const palette = useTopikDashboardTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);
  const params = useLocalSearchParams<{
    level?: TopikLevel;
    section?: "reading" | "listening" | "writing";
  }>();
  const levelParam = Array.isArray(params.level)
    ? params.level[0]
    : params.level;
  const level: TopikLevel = levelParam === "1" ? "1" : "2";
  const sectionParam = Array.isArray(params.section)
    ? params.section[0]
    : params.section;
  const section =
    sectionParam === "listening"
      ? "listening"
      : sectionParam === "writing"
        ? "writing"
        : "reading";
  const examType = level === "1" ? "topik_i" : "topik_ii";
  const roman = level === "1" ? "I" : "II";
  const [exams, setExams] = useState<TopikExam[]>([]);
  const [completedExams, setCompletedExams] = useState<TopikCompletedExam[]>(
    [],
  );
  const [selectedExamCode, setSelectedExamCode] = useState<string | null>(null);
  const [mode, setMode] = useState<TopikAttemptMode>("guided");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [completedOnly, setCompletedOnly] = useState(false);

  const loadExams = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const [data, completedIds] = await Promise.all([
        TopikService.listExams(),
        TopikService.getCompletedExams().catch(() => []),
      ]);
      const matchingExams = data
        .filter(
          (exam) => exam.examType === examType && exam.section === section,
        )
        .sort(
          (left, right) =>
            (right.round ?? 0) - (left.round ?? 0) ||
            (right.year ?? 0) - (left.year ?? 0) ||
            right.code.localeCompare(left.code),
        );
      setExams(matchingExams);
      setCompletedExams(completedIds);
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

  useFocusEffect(
    useCallback(() => {
      void loadExams();
    }, [loadExams]),
  );

  const selectedExam = exams.find((exam) => exam.code === selectedExamCode);
  const completedByExamId = useMemo(
    () => new Map(completedExams.map((item) => [item.examId, item])),
    [completedExams],
  );
  const selectedCompleted = selectedExam
    ? completedByExamId.get(selectedExam.id)
    : undefined;
  const visibleExams = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return exams
      .filter((exam) => !completedOnly || completedByExamId.has(exam.id))
      .filter(
        (exam) =>
          !query ||
          String(exam.round ?? "").includes(query) ||
          exam.code.toLocaleLowerCase().includes(query) ||
          topikText(exam.title, language).toLocaleLowerCase().includes(query),
      )
      .sort(
        (left, right) =>
          (right.round ?? 0) - (left.round ?? 0) ||
          (right.year ?? 0) - (left.year ?? 0) ||
          right.code.localeCompare(left.code),
      );
  }, [completedByExamId, completedOnly, exams, language, search]);

  const openResult = (exam: TopikExam, attemptId: string) => {
    router.push(
      section === "writing"
        ? {
            pathname: "/topik-writing",
            params: { examCode: exam.code, reviewAttemptId: attemptId },
          }
        : { pathname: "/topik-result", params: { attemptId } },
    );
  };

  const openPicker = () => {
    setSearch("");
    setCompletedOnly(false);
    setPickerVisible(true);
  };

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
        <View style={styles.headerCopy}>
          <Text style={styles.headerTitle}>{t(`topik.home.${section}`)}</Text>
          <Text style={styles.headerSubtitle}>TOPIK {roman}</Text>
        </View>
        <Pressable
          accessibilityLabel={t("topik.home.openStats")}
          onPress={() =>
            router.push({
              pathname: "/topik-stats",
              params: {
                level: examType === "topik_i" ? "1" : "2",
                section,
              },
            })
          }
          style={styles.iconButton}
        >
          <Ionicons name="stats-chart" size={21} color={palette.primary} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {t("topik.home.roundSelection")}
          </Text>
          <Text style={styles.sectionCaption}>
            {t("topik.home.examCount", { count: exams.length })}
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
          <View style={styles.selectedExamCard}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("topik.home.changeRound")}
              onPress={openPicker}
              style={({ pressed }) => [
                styles.selectedExamMain,
                pressed && styles.buttonPressed,
              ]}
            >
              <View style={styles.selectedExamCopy}>
                <Text style={styles.selectedEyebrow}>
                  {t("topik.home.selectedRound")}
                </Text>
                <Text style={styles.selectedExamTitle} numberOfLines={2}>
                  {selectedExam ? topikText(selectedExam.title, language) : "—"}
                </Text>
                <Text style={styles.examMeta}>
                  {selectedExam &&
                    t(
                      mode === "mock_exam"
                        ? "topik.home.examMeta"
                        : "topik.home.examMetaUntimed",
                      {
                        questions: selectedExam.totalQuestions,
                        minutes: selectedExam.durationMinutes,
                        points: selectedExam.totalPoints,
                      },
                    )}
                </Text>
              </View>
              <View style={styles.changeRoundButton}>
                <Text style={styles.changeRoundText}>
                  {t("topik.home.changeRound")}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color={palette.primary}
                />
              </View>
            </Pressable>
            {selectedCompleted && selectedExam && (
              <Pressable
                accessibilityRole="button"
                onPress={() =>
                  openResult(selectedExam, selectedCompleted.latestAttemptId)
                }
                style={styles.completedRow}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color={palette.success}
                />
                <Text style={styles.completedBadgeText}>
                  {t("topik.home.completed")}
                </Text>
                <Text style={styles.completedResultText}>
                  {t("topik.home.viewResult")}
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={16}
                  color={palette.primary}
                />
              </Pressable>
            )}
          </View>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t("topik.home.studyMode")}</Text>
        </View>
        <View style={styles.modeList}>
          {MODES.map((item) => {
            const selected = item.key === mode;
            return (
              <Pressable
                key={item.key}
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
                onPress={() => setMode(item.key)}
                style={[styles.modeCard, selected && styles.modeCardSelected]}
              >
                <View style={styles.modeTop}>
                  <Ionicons
                    name={item.icon}
                    size={22}
                    color={selected ? palette.primary : palette.textSecondary}
                  />
                  <Ionicons
                    name={selected ? "radio-button-on" : "radio-button-off"}
                    size={21}
                    color={selected ? palette.primary : palette.textMuted}
                  />
                </View>
                <Text style={styles.modeTitle}>
                  {t(
                    item.key === "guided"
                      ? "topik.modes.practice"
                      : "topik.home.mockShort",
                  )}
                </Text>
                <Text style={styles.modeDescription}>
                  {t(item.descriptionKey)}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {section === "writing" && selectedExam && (
          <View style={styles.practiceSection}>
            <View style={styles.practiceHeading}>
              <View style={styles.practiceHeadingCopy}>
                <Text style={styles.sectionTitle}>
                  {t("topik.home.writingPracticeTitle")}
                </Text>
                <Text style={styles.practiceDescription}>
                  {t("topik.home.writingPracticeDescription")}
                </Text>
              </View>
              <View style={styles.practiceBadge}>
                <Text style={styles.practiceBadgeText}>
                  {t("topik.home.writingPracticeBadge")}
                </Text>
              </View>
            </View>

            <View style={styles.practiceGrid}>
              {WRITING_PRACTICE_TYPES.map((item) => (
                <Pressable
                  key={item.number}
                  onPress={() =>
                    router.push({
                      pathname: "/topik-writing",
                      params: {
                        examCode: selectedExam.code,
                        mode: "guided",
                        questionNumber: String(item.number),
                      },
                    })
                  }
                  style={({ pressed }) => [
                    styles.practiceCard,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <View style={styles.practiceCardTop}>
                    <View style={styles.practiceIcon}>
                      <Ionicons
                        name={item.icon}
                        size={20}
                        color={palette.primary}
                      />
                    </View>
                    <Text style={styles.practiceNumber}>{item.number}</Text>
                  </View>
                  <Text style={styles.practiceTitle}>
                    {t(`topik.home.writingPractice${item.number}Title`)}
                  </Text>
                  <Text style={styles.practiceText}>
                    {t(`topik.home.writingPractice${item.number}Description`)}
                  </Text>
                  <View style={styles.practiceAction}>
                    <Text style={styles.practiceActionText}>
                      {t("topik.home.practiceNow")}
                    </Text>
                    <Ionicons
                      name="arrow-forward"
                      size={14}
                      color={palette.primary}
                    />
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* 유형별 학습 (합격 레시피) */}
        {level === "2" && (
          <Pressable
            style={styles.recipeEntry}
            onPress={() =>
              router.push({
                pathname: "/topik-recipes",
              })
            }
          >
            <View style={styles.recipeEntryIcon}>
              <Ionicons name="restaurant-outline" size={22} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.recipeEntryTitle}>
                {t("topik.recipe.golden")}
              </Text>
              <Text style={styles.recipeEntryCaption}>
                {t("topik.recipe.pastQuestions")} · {t("topik.recipe.grammar")}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={palette.textSubtle}
            />
          </Pressable>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <Pressable
          disabled={!selectedExam}
          onPress={() =>
            selectedExam &&
            router.push({
              pathname:
                section === "writing" ? "/topik-writing" : "/topik-exam",
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
      </View>
      <Modal
        visible={pickerVisible}
        animationType="slide"
        onRequestClose={() => setPickerVisible(false)}
      >
        <SafeAreaView style={styles.pickerScreen}>
          <View style={styles.pickerHeader}>
            <View>
              <Text style={styles.pickerEyebrow}>
                TOPIK {roman} · {t(`topik.home.${section}`)}
              </Text>
              <Text style={styles.pickerTitle}>
                {t("topik.home.chooseRound")}
              </Text>
            </View>
            <Pressable
              accessibilityLabel={t("topik.common.close")}
              onPress={() => setPickerVisible(false)}
              style={styles.pickerClose}
            >
              <Ionicons name="close" size={23} color={palette.text} />
            </Pressable>
          </View>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color={palette.textSecondary} />
            <TextInput
              accessibilityLabel={t("topik.home.searchRounds")}
              value={search}
              onChangeText={setSearch}
              placeholder={t("topik.home.searchRounds")}
              placeholderTextColor={palette.textMuted}
              style={styles.searchInput}
              returnKeyType="search"
            />
            {search.length > 0 && (
              <Pressable
                accessibilityLabel={t("topik.common.close")}
                onPress={() => setSearch("")}
              >
                <Ionicons
                  name="close-circle"
                  size={19}
                  color={palette.textMuted}
                />
              </Pressable>
            )}
          </View>
          <View style={styles.pickerFilters}>
            <Pressable
              onPress={() => setCompletedOnly(false)}
              style={[
                styles.filterChip,
                !completedOnly && styles.filterChipSelected,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  !completedOnly && styles.filterTextSelected,
                ]}
              >
                {t("topik.home.allRounds")}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setCompletedOnly(true)}
              style={[
                styles.filterChip,
                completedOnly && styles.filterChipSelected,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  completedOnly && styles.filterTextSelected,
                ]}
              >
                {t("topik.home.completed")}
              </Text>
            </Pressable>
            <Text style={styles.pickerCount}>
              {t("topik.home.examCount", { count: visibleExams.length })}
            </Text>
          </View>
          <FlatList
            data={visibleExams}
            keyExtractor={(exam) => exam.id}
            contentContainerStyle={styles.pickerList}
            keyboardShouldPersistTaps="handled"
            initialNumToRender={12}
            maxToRenderPerBatch={12}
            windowSize={7}
            ListEmptyComponent={
              <Text style={styles.noRounds}>
                {t("topik.home.noMatchingRounds")}
              </Text>
            }
            renderItem={({ item }) => {
              const selected = item.code === selectedExamCode;
              const completed = completedByExamId.has(item.id);
              return (
                <Pressable
                  accessibilityRole="radio"
                  accessibilityState={{ checked: selected }}
                  onPress={() => {
                    setSelectedExamCode(item.code);
                    setPickerVisible(false);
                  }}
                  style={[
                    styles.pickerRow,
                    selected && styles.pickerRowSelected,
                  ]}
                >
                  <View style={styles.pickerRowCopy}>
                    <Text style={styles.pickerRowTitle} numberOfLines={2}>
                      {topikText(item.title, language)}
                    </Text>
                    <Text style={styles.pickerRowMeta}>
                      {t("topik.home.roundMeta", {
                        questions: item.totalQuestions,
                        minutes: item.durationMinutes,
                      })}
                    </Text>
                    {completed && (
                      <Text style={styles.pickerCompleted}>
                        {t("topik.home.completed")}
                      </Text>
                    )}
                  </View>
                  <Ionicons
                    name={selected ? "radio-button-on" : "radio-button-off"}
                    size={23}
                    color={selected ? palette.primary : palette.textMuted}
                  />
                </Pressable>
              );
            }}
          />
        </SafeAreaView>
      </Modal>
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
    },
    iconButton: {
      width: 42,
      height: 42,
      alignItems: "center",
      justifyContent: "center",
    },
    headerCopy: { flex: 1, alignItems: "center", gap: 1 },
    headerTitle: { color: palette.text, fontSize: 17, fontWeight: "900" },
    headerSubtitle: { color: palette.textSecondary, fontSize: 11 },
    content: {
      paddingHorizontal: 20,
      paddingTop: 30,
      paddingBottom: 40,
      gap: 19,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginTop: 3,
    },
    recipeEntry: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      padding: 16,
      borderRadius: 16,
      backgroundColor: palette.surface,
      borderWidth: 1,
      borderColor: palette.border,
    },
    recipeEntryIcon: {
      width: 44,
      height: 44,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: palette.primary,
    },
    recipeEntryTitle: {
      color: palette.text,
      fontSize: 16,
      fontWeight: "900",
    },
    recipeEntryCaption: {
      color: palette.textSubtle,
      fontSize: 12,
      fontWeight: "600",
      marginTop: 3,
    },
    sectionTitle: { color: palette.text, fontSize: 18, fontWeight: "900" },
    sectionCaption: {
      color: palette.textMuted,
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 1,
    },
    selectedExamCard: {
      overflow: "hidden",
      borderWidth: 1,
      borderColor: palette.primary,
      borderRadius: 16,
      backgroundColor: palette.primarySoft,
    },
    selectedExamMain: {
      minHeight: 125,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 18,
    },
    selectedExamCopy: { flex: 1, gap: 7 },
    selectedEyebrow: {
      color: palette.primary,
      fontSize: 11,
      fontWeight: "800",
    },
    selectedExamTitle: { color: palette.text, fontSize: 19, fontWeight: "900" },
    changeRoundButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      borderRadius: 9,
      backgroundColor: palette.surface,
      paddingHorizontal: 9,
      paddingVertical: 9,
    },
    changeRoundText: {
      color: palette.primary,
      fontSize: 11,
      fontWeight: "900",
    },
    completedResultText: {
      color: palette.primary,
      fontSize: 11,
      fontWeight: "900",
      marginLeft: "auto",
    },
    practiceSection: { gap: 12, marginTop: 4 },
    practiceHeading: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12,
    },
    practiceHeadingCopy: { flex: 1, gap: 4 },
    practiceDescription: {
      color: palette.textSecondary,
      fontSize: 11,
      lineHeight: 17,
    },
    practiceBadge: {
      borderRadius: 999,
      backgroundColor: palette.primarySoft,
      paddingHorizontal: 9,
      paddingVertical: 6,
    },
    practiceBadgeText: {
      color: palette.primary,
      fontSize: 9,
      fontWeight: "900",
    },
    practiceGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    practiceCard: {
      width: "48.5%",
      minHeight: 168,
      gap: 7,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 17,
      backgroundColor: palette.surfaceElevated,
      padding: 13,
      shadowColor: palette.shadow,
      shadowOpacity: palette.isDark ? 0.16 : 0.05,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 2,
    },
    practiceCardTop: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    practiceIcon: {
      width: 36,
      height: 36,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      backgroundColor: palette.primarySoft,
    },
    practiceNumber: {
      color: palette.textSubtle,
      fontSize: 18,
      fontWeight: "900",
    },
    practiceTitle: { color: palette.text, fontSize: 13, fontWeight: "900" },
    practiceText: {
      flex: 1,
      color: palette.textSecondary,
      fontSize: 10,
      lineHeight: 15,
    },
    practiceAction: { flexDirection: "row", alignItems: "center", gap: 4 },
    practiceActionText: {
      color: palette.primary,
      fontSize: 10,
      fontWeight: "900",
    },
    examMeta: { color: palette.textSecondary, fontSize: 11 },
    completedRow: {
      minHeight: 46,
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      borderTopWidth: 1,
      borderTopColor: palette.divider,
      paddingHorizontal: 18,
      paddingVertical: 8,
    },
    completedBadgeText: {
      color: palette.successText,
      fontSize: 9,
      fontWeight: "900",
    },
    modeList: { flexDirection: "row", gap: 10 },
    modeCard: {
      flex: 1,
      minHeight: 138,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 16,
      backgroundColor: palette.surface,
      padding: 15,
    },
    modeCardSelected: {
      borderColor: palette.primary,
      backgroundColor: palette.primarySoft,
    },
    modeTop: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 18,
    },
    modeTitle: { color: palette.text, fontSize: 15, fontWeight: "900" },
    modeDescription: {
      color: palette.textSecondary,
      fontSize: 11,
      lineHeight: 17,
      marginTop: 5,
    },
    startButton: {
      minHeight: 56,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      borderRadius: 16,
      backgroundColor: palette.primaryStrong,
    },
    startButtonText: { color: palette.white, fontSize: 16, fontWeight: "900" },
    footer: {
      borderTopWidth: 1,
      borderTopColor: palette.border,
      backgroundColor: palette.surface,
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 13,
    },
    pickerScreen: { flex: 1, backgroundColor: palette.bg },
    pickerHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 18,
    },
    pickerEyebrow: {
      color: palette.textSecondary,
      fontSize: 11,
      marginBottom: 5,
    },
    pickerTitle: { color: palette.text, fontSize: 23, fontWeight: "900" },
    pickerClose: {
      width: 42,
      height: 42,
      alignItems: "center",
      justifyContent: "center",
    },
    searchBox: {
      minHeight: 50,
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 13,
      backgroundColor: palette.surface,
      marginHorizontal: 20,
      paddingHorizontal: 14,
    },
    searchInput: {
      flex: 1,
      color: palette.text,
      fontSize: 14,
      paddingVertical: 10,
    },
    pickerFilters: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    filterChip: {
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 100,
      backgroundColor: palette.surface,
      paddingHorizontal: 14,
      paddingVertical: 8,
    },
    filterChipSelected: {
      borderColor: palette.primary,
      backgroundColor: palette.primarySoft,
    },
    filterText: {
      color: palette.textSecondary,
      fontSize: 12,
      fontWeight: "800",
    },
    filterTextSelected: { color: palette.primary },
    pickerCount: {
      color: palette.textSecondary,
      fontSize: 11,
      marginLeft: "auto",
    },
    pickerList: { paddingHorizontal: 20, paddingBottom: 28, gap: 9 },
    pickerRow: {
      minHeight: 76,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 14,
      backgroundColor: palette.surface,
      paddingHorizontal: 15,
      paddingVertical: 12,
    },
    pickerRowSelected: {
      borderColor: palette.primary,
      backgroundColor: palette.primarySoft,
    },
    pickerRowCopy: { flex: 1, gap: 4 },
    pickerRowTitle: { color: palette.text, fontSize: 15, fontWeight: "900" },
    pickerRowMeta: { color: palette.textSecondary, fontSize: 11 },
    pickerCompleted: {
      color: palette.successText,
      fontSize: 10,
      fontWeight: "800",
    },
    noRounds: {
      color: palette.textSecondary,
      textAlign: "center",
      padding: 28,
    },
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

// 구독 전용 화면. 버튼 게이트를 안 거치고 들어오는 길(홈의 "이어서 학습하기",
// 딥링크)이 있어서 화면 자체에서도 막는다.
export default withPremiumScreen(TopikHomeScreen, "topik");
