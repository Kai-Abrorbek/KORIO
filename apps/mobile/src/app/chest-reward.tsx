import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { MOCK_CHEST_REWARD, CHEST_TITLES } from "@/mocks/chest-reward.mock";
import { ChestPhase } from "@/types/chest-reward";
import Chest, { ChestHandle } from "@/components/chest-reward/Chest";
import TapDots from "@/components/chest-reward/TapDots";
import Sparkles from "@/components/chest-reward/Sparkles";
import GemsPile from "@/components/chest-reward/GemsPile";
import GemCounter from "@/components/chest-reward/GemCounter";
import PrimaryButton from "@/components/ui/PrimaryButton";

const GRADE_TITLE: Record<string, string> = {
  wood: "chestReward.woodChest",
  silver: "chestReward.silverChest",
  gold: "chestReward.goldChest",
};

export default function ChestRewardScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const styles = getStyles(theme);
  const params = useLocalSearchParams<{
    grade?: string;
    gems?: string;
    gemTotal?: string;
  }>();
  const grade = (params.grade ?? "wood") as "wood" | "silver" | "gold";
  const gemsAmount = Number(params.gems ?? 0);
  const currentGemTotal = Number(params.gemTotal ?? 0);

  // 백엔드 grade(wood/silver/gold) → mock 등급(common/rare/epic)
  const GRADE_TO_TYPE: Record<string, string> = {
    wood: "common",
    silver: "rare",
    gold: "epic",
  };

  const reward = {
    rewardType: GRADE_TO_TYPE[grade] ?? "common",
    gemAmount: gemsAmount,
    currentGemTotal,
    tapsRequired: 3,
  };

  const chestRef = useRef<ChestHandle>(null);

  const [phase, setPhase] = useState<ChestPhase>("idle");
  const [tapCount, setTapCount] = useState(0);

  // 페이즈 전환 애니메이션
  const chestSectionOpacity = useSharedValue(1);
  const gemsSectionOpacity = useSharedValue(0);
  const gemsSectionTranslateY = useSharedValue(20);

  useEffect(() => {
    // 마운트 시 chest drop-in
    const id = setTimeout(() => {
      chestRef.current?.dropIn();
    }, 200);
    return () => clearTimeout(id);
  }, []);

  const handleTap = () => {
    if (phase !== "idle") return;

    const next = tapCount + 1;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});

    if (next < reward.tapsRequired) {
      // 그냥 흔들기
      chestRef.current?.shake(next);
      setTapCount(next);
    } else {
      // 마지막! 오픈
      setTapCount(next);
      setPhase("opening");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {},
      );
      chestRef.current?.open(() => {
        setPhase("revealed");
        // 페이즈 페이드 전환
        chestSectionOpacity.value = withTiming(0, { duration: 250 });
        gemsSectionOpacity.value = withDelay(
          200,
          withTiming(1, { duration: 400 }),
        );
        gemsSectionTranslateY.value = withDelay(
          200,
          withSpring(0, { damping: 12 }),
        );
      });
    }
  };

  const chestSectionStyle = useAnimatedStyle(() => ({
    opacity: chestSectionOpacity.value,
  }));

  const gemsSectionStyle = useAnimatedStyle(() => ({
    opacity: gemsSectionOpacity.value,
    transform: [{ translateY: gemsSectionTranslateY.value }],
  }));

  const remaining = reward.tapsRequired - tapCount;
  const instructionKey =
    remaining === reward.tapsRequired
      ? "chestReward.tapToUpgrade"
      : remaining === 1
        ? "chestReward.oneChanceLeft"
        : "chestReward.tap";

  return (
    <View style={styles.container}>
      {/* 상단 - 보석 카운터 */}
      <View style={styles.topBar}>
        <View />
        <GemCounter
          target={
            phase === "revealed"
              ? reward.currentGemTotal + reward.gemAmount
              : reward.currentGemTotal
          }
          animate={phase === "revealed"}
        />
      </View>

      {/* 챠스트 섹션 */}
      <Animated.View
        style={[styles.section, chestSectionStyle]}
        pointerEvents={phase === "revealed" ? "none" : "auto"}
      >
        <Text style={styles.title}>{t(CHEST_TITLES[reward.rewardType])}</Text>

        <View style={styles.chestArea}>
          <Sparkles />
          <TouchableWithoutFeedback onPress={handleTap}>
            <View>
              <Chest ref={chestRef} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.bottom}>
          <TapDots total={reward.tapsRequired} tapCount={tapCount} />
          <Text style={styles.instruction}>{t(instructionKey)}</Text>
        </View>
      </Animated.View>

      {/* 보석 섹션 */}
      {phase === "revealed" && (
        <Animated.View
          style={[styles.section, styles.gemsSection, gemsSectionStyle]}
        >
          <Text style={styles.gemTitle}>
            {t("chestReward.gemReward", { count: reward.gemAmount })}
          </Text>

          <View style={styles.chestArea}>
            <Sparkles />
            <GemsPile />
          </View>

          <View style={styles.footer}>
            <PrimaryButton
              label={t("chestReward.continue")}
              color="#1FA9F7"
              darkColor="#1899D6"
              onPress={() => router.back()}
            />
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    topBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 54,
      paddingHorizontal: 20,
      paddingBottom: 8,
    },
    section: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 30,
    },
    gemsSection: {
      ...StyleSheet.absoluteFill,
      paddingTop: 100,
    },
    title: {
      fontSize: 26,
      fontWeight: "900",
      color: "#D87520",
      letterSpacing: -0.3,
    },
    gemTitle: {
      fontSize: 30,
      fontWeight: "900",
      color: "#1FA9F7",
      letterSpacing: -0.3,
    },
    chestArea: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    bottom: {
      alignItems: "center",
      gap: 16,
    },
    instruction: {
      fontSize: 18,
      fontWeight: "800",
      color: theme.text,
    },
    footer: {
      width: "100%",
    },
  });
