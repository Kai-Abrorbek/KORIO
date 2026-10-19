import { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "@/components/ui/Pressables";
import * as Haptics from "@/utils/haptics";
import { useTranslation } from "react-i18next";
import { useLocalSearchParams, useRouter } from "expo-router";
import { goNext } from "@/utils/streak-chest-route";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  withSequence,
  useReducedMotion,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { backToRoadmap } from "@/store/settings.store";
import { ThemeColors } from "@/constants/theme";
import { CHEST_TITLES } from "@/constants/chest";
import { ChestPhase } from "@/types/chest-reward";
import Chest, { ChestHandle } from "@/components/chest-reward/Chest";
import TapDots from "@/components/chest-reward/TapDots";
import Sparkles from "@/components/chest-reward/Sparkles";
import GemsPile from "@/components/chest-reward/GemsPile";
import GemCounter from "@/components/chest-reward/GemCounter";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useSound } from "@/hooks/useSound";
import Confetti from "@/components/lesson-complete/Confetti";
import ChestBurstLayer from "@/components/chest-reward/ChestBurstLayer";
import { shakeAt } from "@/components/cinema/cinema";
import { useCinemaAudio, useCinemaClock } from "@/components/cinema/useCinema";
import {
  CHEST_CINEMA,
  RATTLE_RATE,
  chestEnd,
  chestSoundCues,
  flyingGemCount,
  flyingGems,
  gemArrival,
  type ChestSound,
} from "@/components/chest-reward/chestCinematic";

const CHEST_SOURCES: Record<ChestSound, number> = {
  rattle: require("../../assets/sounds/chest/rattle.mp3"),
  burst: require("../../assets/sounds/chest/burst.mp3"),
  gemDing: require("../../assets/sounds/chest/gem-ding.mp3"),
  voWow: require("../../assets/sounds/chest/vo-wow.mp3"),
  voDaebak: require("../../assets/sounds/chest/vo-daebak.mp3"),
};

/** 원래 열림 소리(chestOpen*) 위에 겹치므로 터지는 소리는 조금 작게 */
const CHEST_GAIN: Partial<Record<ChestSound, number>> = {
  rattle: 0.8,
  burst: 0.65,
  gemDing: 0.5,
};

interface BurstGeometry {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

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
  const { play } = useSound();
  const params = useLocalSearchParams<{
    grade?: string;
    gems?: string;
    gemTotal?: string;
    category?: string;
    /** 학습 로드 모드에서 왔으면 "studyPath" */
    from?: string;
    /** "streak" = 연속 학습 보상 상자 (제목이 다르다) */
    kind?: string;
    /** 연속 일수 (kind=streak) */
    days?: string;
    /** 받고 나서 이어 갈 곳 (JSON Href). 축하 흐름 중간에 끼워졌을 때 */
    next?: string;
  }>();
  const category = params.category;
  const from = params.from;
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
  const containerRef = useRef<View>(null);
  const chestBoxRef = useRef<View>(null);
  const counterRef = useRef<View>(null);
  const reducedMotion = useReducedMotion();
  const audio = useCinemaAudio(CHEST_SOURCES, CHEST_GAIN);
  const gemCount = flyingGemCount(gemsAmount);
  const { clock, run } = useCinemaClock(chestEnd(gemCount));
  const gems = useMemo(() => flyingGems(gemCount, 120), [gemCount]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  /** 상자가 열린 뒤 겹치는 층 (자리를 재고 나서 그린다) */
  const [burst, setBurst] = useState<BurstGeometry | null>(null);
  /** 보석이 닿을 때마다 오르는 카운터 숫자 */
  const [counted, setCounted] = useState(currentGemTotal);
  const [confetti, setConfetti] = useState(false);
  const counterBump = useSharedValue(1);

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
      // 덜컹 — 탭할수록 높아진다
      audio.play("rattle", { rate: RATTLE_RATE[next - 1] ?? 1 });
      // 그냥 흔들기
      chestRef.current?.shake(next);
      setTapCount(next);
    } else {
      // 마지막! 오픈
      setTapCount(next);
      setPhase("opening");
      play(grade === "wood" ? "chestOpen" : "chestOpenRare");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {},
      );
      startBurst();
      chestRef.current?.open(() => {
        // 보석 분수가 끝날 때까지 기다렸다가 결과로 (동작 줄이기면 바로)
        if (reducedMotion) showResult();
      });
    }
  };

  /** 결과 화면 ("보석 +N개") 으로 페이드 */
  const showResult = () => {
    setCounted(reward.currentGemTotal + reward.gemAmount);
    setPhase("revealed");
    chestSectionOpacity.value = withTiming(0, { duration: 250 });
    gemsSectionOpacity.value = withDelay(200, withTiming(1, { duration: 400 }));
    gemsSectionTranslateY.value = withDelay(200, withSpring(0, { damping: 12 }));
  };

  /**
   * 여는 순간 — 상자 가운데와 카운터 자리를 재서 빛기둥·보석 분수를 띄우고,
   * 보석이 카운터에 닿을 때마다 딩 + 숫자를 올린다 (chestCinematic).
   */
  const startBurst = () => {
    audio.playFrom(0, chestSoundCues(grade));
    if (grade === "gold") timers.current.push(setTimeout(() => setConfetti(true), 380));
    if (reducedMotion) return;

    const container = containerRef.current;
    const chestBox = chestBoxRef.current;
    const counter = counterRef.current;
    if (!container || !chestBox || !counter) {
      timers.current.push(setTimeout(showResult, 1300));
      return;
    }
    container.measureInWindow((cx, cy) => {
      chestBox.measureInWindow((bx, by, bw, bh) => {
        counter.measureInWindow((kx, ky, _kw, kh) => {
          setBurst({
            fromX: bx - cx + bw / 2,
            fromY: by - cy + bh / 2,
            // 카운터의 보석 아이콘 (왼쪽 끝)
            toX: kx - cx + 11,
            toY: ky - cy + kh / 2,
          });
          run(0);
          const total = reward.gemAmount;
          for (let i = 0; i < gemCount; i++) {
            timers.current.push(
              setTimeout(() => {
                audio.play("gemDing", { rate: Math.min(1.6, 1 + i * 0.05) });
                setCounted(reward.currentGemTotal + Math.round((total * (i + 1)) / gemCount));
                counterBump.value = withSequence(
                  withTiming(1.25, { duration: 70 }),
                  withSpring(1, { damping: 9, stiffness: 260 }),
                );
                if (i === gemCount - 1) {
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
                } else if (i % 3 === 0) {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                }
              }, gemArrival(i)),
            );
          }
          timers.current.push(setTimeout(showResult, chestEnd(gemCount) + 180));
        });
      });
    });
  };

  // 뚜껑이 날아갈 때 화면이 쿵
  const shakeStyle = useAnimatedStyle(() => {
    const s = shakeAt(clock.value, CHEST_CINEMA.lid, 420, grade === "gold" ? 12 : grade === "silver" ? 9 : 6);
    return { transform: [{ translateX: s.x }, { translateY: s.y }] };
  });
  const counterStyle = useAnimatedStyle(() => ({
    transform: [{ scale: counterBump.value }],
  }));

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
    <View style={styles.container} ref={containerRef} collapsable={false}>
      {/* 상단 - 보석 카운터 (보석이 닿을 때마다 오른다) */}
      <View style={styles.topBar}>
        <View />
        <Animated.View ref={counterRef} collapsable={false} style={counterStyle}>
          <GemCounter target={counted} animate={counted !== reward.currentGemTotal} />
        </Animated.View>
      </View>

      {/* 챠스트 섹션 */}
      <Animated.View
        style={[styles.section, chestSectionStyle, shakeStyle]}
        pointerEvents={phase === "revealed" ? "none" : "auto"}
      >
        <Text style={styles.title}>
          {params.kind === "streak"
            ? t("chestReward.streakTitle", { days: Number(params.days) || 3 })
            : t(CHEST_TITLES[reward.rewardType])}
        </Text>

        <View style={styles.chestArea}>
          <Sparkles />
          <TouchableWithoutFeedback onPress={handleTap} sound={false}>
            <View ref={chestBoxRef} collapsable={false}>
              <Chest ref={chestRef} grade={grade} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.bottom}>
          <TapDots total={reward.tapsRequired} tapCount={tapCount} />
          <Text style={styles.instruction}>{t(instructionKey)}</Text>
        </View>
      </Animated.View>

      {/* 빛기둥 · 등급 색 번쩍 · 카운터로 날아가는 보석 */}
      {burst ? (
        <ChestBurstLayer clock={clock} grade={grade} gems={gems} {...burst} />
      ) : null}
      {confetti ? <Confetti /> : null}

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
              onPress={() => {
                // 축하 흐름 중간(연속 보상 상자)이면 원래 가려던 곳으로 이어 간다
                if (params.next) {
                  goNext(params.next, () =>
                    router.replace(backToRoadmap(category, from)),
                  );
                  return;
                }
                // 보통은 뒤로 가면 원래 로드맵이다. 딥링크로 바로 열린
                // 경우엔 돌아갈 곳이 없으니 카테고리로 직접 간다.
                if (router.canGoBack()) router.back();
                else router.replace(backToRoadmap(category, from));
              }}
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
      marginBottom: 25,
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
