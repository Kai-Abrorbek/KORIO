import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { MOCK_LESSON_COMPLETE } from "@/mocks/lesson-complete.mock";
import CelebrationMascot from "@/components/lesson-complete/CelebrationMascot";
import Confetti from "@/components/lesson-complete/Confetti";
import StatCard from "@/components/lesson-complete/StatCard";
import LessonCompleteActions from "@/components/lesson-complete/LessonCompleteActions";

export default function LessonCompleteScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const styles = getStyles(theme);

  const stats = MOCK_LESSON_COMPLETE;

  return (
    <View style={styles.container}>
      <Confetti />

      <View style={styles.content}>
        <View style={styles.mascotWrap}>
          <CelebrationMascot size={200} style={"spin"} />
        </View>

        <Text style={styles.title}>{t("lessonComplete.title")}</Text>

        <View style={styles.statsRow}>
          <StatCard
            index={0}
            label={t("lessonComplete.totalXp")}
            value={stats.xp.toString()}
            iconName="flash"
            color="#FFCC00"
          />
          <StatCard
            index={1}
            label={t(stats.accuracy.labelKey)}
            value={`${stats.accuracy.value}%`}
            iconName="locate"
            color="#58CC02"
          />
          <StatCard
            index={2}
            label={t(stats.time.labelKey)}
            value={stats.time.value}
            iconName="timer"
            color="#1FA9F7"
          />
        </View>
      </View>

      <LessonCompleteActions
        showShare
        onShare={() => console.log("share")}
        onClaim={() => {
          console.log("claim XP");
          router.back();
        }}
      />
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    content: {
      flex: 1,
      paddingTop: 80,
      paddingHorizontal: 16,
      alignItems: "center",
    },
    mascotWrap: {
      height: 240,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 24,
    },
    title: {
      fontSize: 32,
      fontWeight: "900",
      color: "#FFCC00",
      letterSpacing: -0.5,
      marginBottom: 36,
      textShadowColor: "rgba(255,204,0,0.25)",
      textShadowOffset: { width: 0, height: 3 },
      textShadowRadius: 8,
    },
    statsRow: {
      flexDirection: "row",
      gap: 10,
      width: "100%",
    },
  });
