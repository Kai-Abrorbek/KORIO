import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import CelebrationMascot from "@/components/lesson-complete/CelebrationMascot";
import Confetti from "@/components/lesson-complete/Confetti";
import StatCard from "@/components/lesson-complete/StatCard";
import LessonCompleteActions from "@/components/lesson-complete/LessonCompleteActions";

export default function LessonCompleteScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const styles = getStyles(theme);

  const params = useLocalSearchParams<{
    xp?: string;
    accuracy?: string;
    time?: string;
  }>();
  const xp = Number(params.xp ?? 0);
  const accuracy = Number(params.accuracy ?? 0);
  const time = params.time ?? "0:00";

  // 순차 애니: 현재 몇 번째 카드까지 진행
  const [activeIdx, setActiveIdx] = useState(0);

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
            active={activeIdx >= 0}
            onDone={() => setActiveIdx(1)}
            label={t("lessonComplete.totalXp")}
            value={xp.toString()}
            iconName="flash"
            color="#FFCC00"
          />
          <StatCard
            index={1}
            active={activeIdx >= 1}
            onDone={() => setActiveIdx(2)}
            label={t("lessonComplete.accuracy")}
            value={`${accuracy}%`}
            iconName="locate"
            color="#58CC02"
          />
          <StatCard
            index={2}
            active={activeIdx >= 2}
            onDone={() => {}}
            label={t("lessonComplete.speed")}
            value={time}
            iconName="timer"
            color="#1FA9F7"
          />
        </View>
      </View>

      <LessonCompleteActions
        showShare
        onShare={() => {}}
        onClaim={() => router.replace("/roadmap")}
      />
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, marginBottom: 30 },
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
    // 카드를 아래로 — content가 flex라 statsRow에 marginTop auto로 밀기
    statsRow: {
      flexDirection: "row",
      gap: 10,
      width: "100%",
      marginTop: "auto",
      marginBottom: 20,
    },
  });
