import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useOnboardingStore } from "../../store/onboarding.store";
import { LearningGoal, LearningStyle } from "../../types/enums";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import AnimatedProgressBar from "@/components/home/AnimatedProgressBar";

export default function SurveyScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const { setSurvey } = useOnboardingStore();
  const [step, setStep] = useState(1); // 1: 목표, 2: 스타일, 3: 하루 시간
  const [selectedGoals, setSelectedGoals] = useState<LearningGoal[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<LearningStyle | null>(
    null,
  );
  const [selectedMinutes, setSelectedMinutes] = useState<number | null>(null);

  const goals = [
    {
      key: LearningGoal.KPOP,
      label: t("onboarding.survey.goals.kpop"),
      icon: "musical-notes",
      color: "#FF6B6B",
    },
    {
      key: LearningGoal.TRAVEL,
      label: t("onboarding.survey.goals.travel"),
      icon: "airplane",
      color: "#4ECDC4",
    },
    {
      key: LearningGoal.WORK,
      label: t("onboarding.survey.goals.work"),
      icon: "briefcase",
      color: "#45B7D1",
    },
    {
      key: LearningGoal.STUDY,
      label: t("onboarding.survey.goals.study"),
      icon: "school",
      color: "#96CEB4",
    },
    {
      key: LearningGoal.FRIEND,
      label: t("onboarding.survey.goals.friend"),
      icon: "people",
      color: "#FFEAA7",
    },
    {
      key: LearningGoal.INTEREST,
      label: t("onboarding.survey.goals.interest"),
      icon: "globe",
      color: "#DDA0DD",
    },
  ];

  const styles_list = [
    {
      key: LearningStyle.GRAMMAR,
      label: t("onboarding.survey.style.grammar"),
      icon: "book",
      color: "#45B7D1",
    },
    {
      key: LearningStyle.CONVERSATION,
      label: t("onboarding.survey.style.conversation"),
      icon: "chatbubbles",
      color: "#1D9E75",
    },
    {
      key: LearningStyle.GAME,
      label: t("onboarding.survey.style.game"),
      icon: "game-controller",
      color: "#FF6B6B",
    },
    {
      key: LearningStyle.VOCABULARY,
      label: t("onboarding.survey.style.vocabulary"),
      icon: "list",
      color: "#DDA0DD",
    },
  ];

  const dailyOptions = [
    { minutes: 5, label: t("onboarding.survey.daily.five") },
    { minutes: 10, label: t("onboarding.survey.daily.ten") },
    { minutes: 15, label: t("onboarding.survey.daily.fifteen") },
    { minutes: 20, label: t("onboarding.survey.daily.twenty") },
  ];

  const toggleGoal = (goal: LearningGoal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal],
    );
  };

  const handleNext = () => {
    if (step === 1 && selectedGoals.length > 0) setStep(2);
    else if (step === 2 && selectedStyle) setStep(3);
    else if (step === 3 && selectedMinutes) {
      setSurvey({
        targetLanguage: "korean",
        learningGoals: selectedGoals,
        learningStyle: selectedStyle!,
        dailyGoalMinutes: selectedMinutes,
      });
      router.push({ pathname: "/lesson", params: { mode: "levelTest" } });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => (step > 1 ? setStep(step - 1) : router.back())}
        >
          <Ionicons name="chevron-back" size={24} color={theme.text} />
        </TouchableOpacity>

        <AnimatedProgressBar current={step} total={3} />

        <Ionicons name="settings-outline" size={24} color={theme.text} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {step === 1 && (
          <>
            <Text style={styles.title}>{t("onboarding.survey.title")}</Text>
            <View style={styles.grid}>
              {goals.map((goal) => (
                <TouchableOpacity
                  key={goal.key}
                  style={[
                    styles.goalCard,
                    selectedGoals.includes(goal.key) && styles.goalCardSelected,
                  ]}
                  onPress={() => toggleGoal(goal.key)}
                >
                  <Ionicons
                    name={goal.icon as any}
                    size={32}
                    color={goal.color}
                  />
                  <Text
                    style={[
                      styles.goalLabel,
                      selectedGoals.includes(goal.key) &&
                        styles.goalLabelSelected,
                    ]}
                  >
                    {goal.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.title}>
              {t("onboarding.survey.style.title")}
            </Text>
            <View style={styles.list}>
              {styles_list.map((style) => (
                <TouchableOpacity
                  key={style.key}
                  style={[
                    styles.listCard,
                    selectedStyle === style.key && styles.listCardSelected,
                  ]}
                  onPress={() => setSelectedStyle(style.key)}
                >
                  <Ionicons
                    name={style.icon as any}
                    size={24}
                    color={style.color}
                  />
                  <Text
                    style={[
                      styles.listLabel,
                      selectedStyle === style.key && styles.listLabelSelected,
                    ]}
                  >
                    {style.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.title}>
              {t("onboarding.survey.daily.title")}
            </Text>
            <View style={styles.list}>
              {dailyOptions.map((option) => (
                <TouchableOpacity
                  key={option.minutes}
                  style={[
                    styles.listCard,
                    selectedMinutes === option.minutes &&
                      styles.listCardSelected,
                  ]}
                  onPress={() => setSelectedMinutes(option.minutes)}
                >
                  <Text
                    style={[
                      styles.listLabel,
                      selectedMinutes === option.minutes &&
                        styles.listLabelSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            ((step === 1 && selectedGoals.length === 0) ||
              (step === 2 && !selectedStyle) ||
              (step === 3 && !selectedMinutes)) &&
              styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={
            (step === 1 && selectedGoals.length === 0) ||
            (step === 2 && !selectedStyle) ||
            (step === 3 && !selectedMinutes)
          }
        >
          <Text style={styles.nextButtonText}>{t("common.next")}</Text>
        </TouchableOpacity>
      </View>
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
    header: {
      paddingTop: 60,
      paddingHorizontal: 20,
      paddingBottom: 16,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    progressContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    progressTrack: {
      flex: 1,
      height: 28,
      backgroundColor: "rgba(119, 110, 226, 0.15)",
      borderRadius: 999,
      overflow: "visible",
      justifyContent: "center",
      position: "relative",
    },
    progressFill: {
      height: "100%",
      backgroundColor: theme.primary,
      borderRadius: 999,
    },
    progressStar: {
      position: "absolute",
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: -16,
      top: -2,
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 6,
    },
    progressText: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.text,
      minWidth: 28,
    },
    progressBar: {
      height: 6,
      backgroundColor: theme.border,
      borderRadius: 999,
      overflow: "hidden",
    },
    content: {
      padding: 24,
      paddingBottom: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 24,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    goalCard: {
      width: "47%",
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 16,
      alignItems: "center",
      gap: 8,
      borderWidth: 1.5,
      borderColor: theme.border,
      shadowColor: "#1A1A2E",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 3,
    },
    goalCardSelected: {
      borderColor: theme.primary,
      backgroundColor: "#EEEDFE",
    },
    goalEmoji: {
      fontSize: 32,
    },
    goalLabel: {
      fontSize: 13,
      fontWeight: "500",
      color: theme.text,
      textAlign: "center",
    },
    goalLabelSelected: {
      color: theme.primary,
    },
    list: {
      gap: 12,
    },
    listCard: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 18,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      borderWidth: 1.5,
      borderColor: theme.border,
      shadowColor: "#1A1A2E",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 3,
    },
    listCardSelected: {
      borderColor: theme.primary,
      backgroundColor: "#EEEDFE",
    },
    listLabel: {
      fontSize: 15,
      fontWeight: "500",
      color: theme.text,
    },
    listLabelSelected: {
      color: theme.primary,
    },
    footer: {
      padding: 24,
      paddingBottom: 40,
    },
    nextButton: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      padding: 16,
      alignItems: "center",
    },
    nextButtonDisabled: {
      backgroundColor: theme.border,
    },
    nextButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
  });
