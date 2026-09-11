import { useCallback, useRef, useState } from "react";
import { View, Text, StyleSheet, Share } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Haptics from "@/utils/haptics";
import { useTheme } from "@/hooks/useTheme";
import { backToRoadmap } from "@/store/settings.store";
import { ThemeColors } from "@/constants/theme";
import { ReferralApi } from "@/services/referral.service";
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
    /** 서버가 계산한 7일 창 (JSON) */
    streakWeek?: string;
  }>();

  const xp = Number(params.xp ?? 0);
  const accuracy = Number(params.accuracy ?? 0);
  const time = params.time ?? "0:00";

  // 순차 애니: 현재 몇 번째 카드까지 진행
  const [activeIdx, setActiveIdx] = useState(0);

  /**
   * 결과 공유.
   *
   * 이미지로 찍어 보내는 게 더 그럴듯하지만 그러려면 네이티브 모듈
   * (react-native-view-shot)을 새로 넣고 다시 빌드해야 한다. RN 기본 Share
   * 는 추가 의존성이 없고 카톡·텔레그램·인스타 어디에나 그대로 붙는다.
   *
   * 초대 코드를 같이 실어 보낸다 — 자랑만 남기면 본 사람이 갈 곳이 없다.
   * 코드를 못 받아와도 공유 시트는 그대로 뜬다. 자랑이 네트워크 상태에
   * 걸려서 아무 일도 안 일어나는 게 제일 나쁘다.
   */
  const sharing = useRef(false);

  const onShare = useCallback(async () => {
    if (sharing.current) return;
    sharing.current = true;
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    let code = "";
    let link = "";
    try {
      const invite = await ReferralApi.me();
      code = invite?.code ?? "";
      link = invite?.link ?? "";
    } catch {
      /* 초대 코드는 있으면 좋은 것이지 없으면 안 되는 것이 아니다 */
    }

    const lines = [
      t("lessonComplete.share.headline"),
      t("lessonComplete.share.stats", { xp, accuracy, time }),
    ];
    if (params.dailyStreak) {
      lines.push(t("lessonComplete.share.streak", { days: params.dailyStreak }));
    }
    lines.push("");
    lines.push(
      code
        ? t("lessonComplete.share.invite", { code, link })
        : t("lessonComplete.share.plain"),
    );

    try {
      await Share.share({
        message: lines.join("\n"),
        title: t("lessonComplete.share.title"),
      });
    } catch {
      // 유저가 시트를 그냥 닫아도 여기로 온다. 실패로 취급할 일이 아니다
    } finally {
      sharing.current = false;
    }
  }, [t, xp, accuracy, time, params.dailyStreak]);

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
          week: params.streakWeek ?? "",
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

      <LessonCompleteActions showShare onShare={onShare} onClaim={onContinue} />
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
