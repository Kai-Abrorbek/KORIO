import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { backToRoadmap } from "@/store/settings.store";
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
    chestGrade?: string;
    chestGems?: string;
    gemTotal?: string;
    /** 어느 로드맵에서 왔는지. 없으면 어휘 로드맵 */
    category?: string;
    pack?: string;
    section?: string;
    unit?: string;
    /** 학습 로드 모드에서 왔으면 "studyPath" */
    from?: string;
    /** 유닛을 통째로 끝내 스코어가 올랐으면 새 스코어 */
    scoreUp?: string;
    scoreUpUnit?: string;
    /** 오늘의 첫 레슨이면 연속 학습일 */
    dailyStreak?: string;
  }>();

  const hasChest = !!params.chestGrade;
  const xp = Number(params.xp ?? 0);
  const accuracy = Number(params.accuracy ?? 0);
  const time = params.time ?? "0:00";

  // 순차 애니: 현재 몇 번째 카드까지 진행
  const [activeIdx, setActiveIdx] = useState(0);

  // "계속" 버튼 onPress:
  const onContinue = () => {
    // 축하 화면 순서는 여기서 한 번만 정한다:
    //   연속 학습(하루에 한 번) → 스코어 상승(유닛) → 상자 → 원래 가던 곳
    // 오늘 처음 학습한 순간이 가장 큰 사건이라 맨 앞에 둔다. streak-day 가
    // 스코어 파라미터를 그대로 들고 가서 이어 붙인다.
    if (params.dailyStreak) {
      router.replace({
        pathname: "/streak-day",
        params: {
          streak: params.dailyStreak,
          scoreUp: params.scoreUp ?? "",
          scoreUpUnit: params.scoreUpUnit ?? "",
          category: params.category ?? "",
          from: params.from ?? "",
        },
      });
      return;
    }

    // 스코어가 올랐으면 먼저 그걸 보여준다. 유닛 하나를 통째로 끝내야 오르는
    // 드문 순간이라 로드맵에 그냥 돌려보내면 아무도 눈치채지 못한다.
    if (params.scoreUp) {
      router.replace({
        pathname: "/score-up",
        params: {
          score: params.scoreUp,
          unit: params.scoreUpUnit ?? "",
          category: params.category ?? "",
        },
      });
      return;
    }
    if (params.chestGrade) {
      router.replace({
        pathname: "/chest-reward",
        params: {
          grade: params.chestGrade,
          gems: params.chestGems ?? "0",
          gemTotal: params.gemTotal ?? "0",
          category: params.category ?? "",
          from: params.from ?? "",
        },
      });
    } else if (params.category === "expression" && params.pack) {
      router.replace({
        pathname: "/expression-pack",
        params: {
          pack: params.pack,
          section: params.section ?? "1",
          unit: params.unit ?? "1",
        },
      });
    } else {
      // 문법 트랙에서 왔는데 그냥 /roadmap 으로 보내면 어휘 로드맵이 뜬다
      router.replace(backToRoadmap(params.category, params.from));
    }
  };

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
        onClaim={onContinue}
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
