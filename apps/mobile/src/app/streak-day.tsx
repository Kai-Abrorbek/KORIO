import { useEffect, useMemo } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  FadeIn,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";

/** 불꽃 원본. 없으면 아래 FLAME_FALLBACK 아이콘으로 떨어진다 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const FLAME = require("../../assets/images/streak-flame.png");

const EMBERS = 14;

/**
 * 오늘의 첫 레슨을 끝냈을 때 뜨는 연속 학습 축하.
 *
 * "오늘 처음인가" 는 서버가 판정한다(completeLesson 의 dailyStreak). 클라가
 * 세면 앱을 껐다 켜거나 두 기기에서 풀 때 또 축하한다.
 *
 * 요일 줄은 **오늘부터 앞으로 6일**을 보여준다. 지나간 날을 되짚는 게 아니라
 * "내일도 와라" 를 말하는 자리라서다. 그래서 오늘만 체크가 켜진다.
 */
export default function StreakDayScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = styles(theme);
  const router = useRouter();
  const params = useLocalSearchParams<{
    streak?: string;
    /** 이어서 스코어 상승 축하로 넘길 때 쓰는 값들 */
    scoreUp?: string;
    scoreUpUnit?: string;
    category?: string;
    from?: string;
  }>();

  const streak = Math.max(1, Number(params.streak ?? 1) || 1);

  // 오늘부터 7일. 로케일 요일 약칭을 그대로 쓴다 (ko: 목, uz: Pay, ...)
  const days = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(undefined, { weekday: "short" });
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return { label: fmt.format(d), done: i === 0 };
    });
  }, []);

  // ── 애니메이션 ──
  const flame = useSharedValue(0); // 등장
  const breathe = useSharedValue(0); // 계속 숨쉬기
  const glow = useSharedValue(0);
  const num = useSharedValue(0);

  useEffect(() => {
    // 불꽃이 아래에서 툭 튀어오른다
    flame.value = withDelay(
      120,
      withSpring(1, { damping: 11, stiffness: 130 }),
    );
    // 숫자는 불꽃이 자리잡은 뒤 한 박자 늦게
    num.value = withDelay(420, withSpring(1, { damping: 9, stiffness: 170 }));
    // 뒤 광채는 끊임없이 부푼다 — 불이 살아 있는 느낌
    glow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 1400, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
    // 불꽃 자체도 미세하게 흔들린다 (너무 크면 촌스럽다 — 3%)
    breathe.value = withDelay(
      700,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 900, easing: Easing.inOut(Easing.sin) }),
          withTiming(0, { duration: 900, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        false,
      ),
    );
  }, []);

  const flameStyle = useAnimatedStyle(() => ({
    opacity: flame.value,
    transform: [
      { translateY: interpolate(flame.value, [0, 1], [70, 0]) },
      { scale: flame.value * (1 + breathe.value * 0.03) },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: 0.18 + glow.value * 0.22,
    transform: [{ scale: 0.92 + glow.value * 0.16 }],
  }));

  const numStyle = useAnimatedStyle(() => ({
    opacity: num.value,
    transform: [{ scale: 0.5 + num.value * 0.5 }],
  }));

  const onContinue = () => {
    // 스코어까지 올랐으면 그 축하를 이어서 보여준다.
    // 두 축하가 겹치면 안 되니 순서를 여기서 한 번만 정한다:
    //   연속 학습(하루) → 스코어 상승(유닛) → 원래 가던 곳
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
    router.replace(
      params.category
        ? { pathname: "/roadmap", params: { category: params.category } }
        : "/(tabs)",
    );
  };

  return (
    <View style={s.container}>
      {/* 불티 — 위로 흩어져 올라간다 */}
      {Array.from({ length: EMBERS }).map((_, i) => (
        <Ember key={i} index={i} />
      ))}

      <View style={s.content}>
        <View style={s.flameArea}>
          <Animated.View style={[s.glow, glowStyle]} pointerEvents="none" />
          <Animated.View style={flameStyle}>
            <Image source={FLAME} style={s.flame} resizeMode="contain" />
            <Animated.Text style={[s.streakNum, numStyle]}>
              {streak}
            </Animated.Text>
          </Animated.View>
        </View>

        <Animated.Text
          entering={FadeIn.delay(620).duration(320)}
          style={s.title}
        >
          {t("streakDay.title")}
        </Animated.Text>
        <Animated.Text
          entering={FadeIn.delay(760).duration(320)}
          style={s.subtitle}
        >
          {t("streakDay.subtitle")}
        </Animated.Text>

        <View style={s.week}>
          {days.map((d, i) => (
            <DayDot
              key={d.label + i}
              label={d.label}
              done={d.done}
              delay={900 + i * 70}
              s={s}
              theme={theme}
            />
          ))}
        </View>
      </View>

      <View style={[s.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable
          onPress={onContinue}
          style={({ pressed }) => [s.cta, pressed && s.ctaPressed]}
          accessibilityRole="button"
        >
          <View style={s.ctaDepth} />
          <View style={s.ctaFace}>
            <Text style={s.ctaText}>{t("streakDay.continue")}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

/** 요일 동그라미 — 하나씩 순서대로 톡톡 나타난다 */
function DayDot({
  label,
  done,
  delay,
  s,
  theme,
}: {
  label: string;
  done: boolean;
  delay: number;
  s: ReturnType<typeof styles>;
  theme: ThemeColors;
}) {
  const pop = useSharedValue(0);
  useEffect(() => {
    pop.value = withDelay(delay, withSpring(1, { damping: 10, stiffness: 200 }));
  }, [delay]);

  const style = useAnimatedStyle(() => ({
    opacity: pop.value,
    transform: [{ scale: 0.4 + pop.value * 0.6 }],
  }));

  return (
    <View style={s.dayCol}>
      <Animated.View style={[s.dayDot, done && s.dayDotDone, style]}>
        {done && <Ionicons name="checkmark" size={20} color="#fff" />}
      </Animated.View>
      <Text style={[s.dayLabel, done && s.dayLabelDone]}>{label}</Text>
    </View>
  );
}

/** 불티 하나. 위로 떠오르며 사라진다 */
function Ember({ index }: { index: number }) {
  const p = useSharedValue(0);
  const left = 12 + ((index * 37) % 76); // 화면 폭 12~88%
  const size = 3 + (index % 3) * 2;
  const dur = 2600 + (index % 5) * 500;

  useEffect(() => {
    p.value = withDelay(
      index * 180,
      withRepeat(withTiming(1, { duration: dur, easing: Easing.linear }), -1),
    );
  }, [index, dur]);

  const style = useAnimatedStyle(() => ({
    opacity: interpolate(p.value, [0, 0.15, 0.75, 1], [0, 0.9, 0.5, 0]),
    transform: [
      { translateY: interpolate(p.value, [0, 1], [0, -260]) },
      { translateX: interpolate(p.value, [0, 0.5, 1], [0, index % 2 ? 14 : -14, 0]) },
    ],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: "absolute",
          top: "58%",
          left: `${left}%`,
          width: size,
          height: size,
          borderRadius: size,
          backgroundColor: index % 3 === 0 ? "#FFC93C" : "#FF9600",
        },
        style,
      ]}
    />
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
    },
    flameArea: {
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 28,
    },
    glow: {
      position: "absolute",
      width: 300,
      height: 300,
      borderRadius: 999,
      backgroundColor: "#FF9600",
    },
    flame: { width: 220, height: 240 },
    streakNum: {
      position: "absolute",
      alignSelf: "center",
      // 불꽃 가운데. 숫자가 커도 중심이 안 흔들리게 폭을 고정한다
      top: "42%",
      width: 220,
      textAlign: "center",
      fontSize: 76,
      fontWeight: "900",
      color: "#fff",
      textShadowColor: "rgba(180,70,0,0.35)",
      textShadowOffset: { width: 0, height: 3 },
      textShadowRadius: 8,
    },
    title: {
      fontSize: 30,
      fontWeight: "900",
      color: theme.text,
      textAlign: "center",
      letterSpacing: -0.5,
    },
    subtitle: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: "600",
      lineHeight: 24,
      color: theme.textSecondary,
      textAlign: "center",
    },
    week: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignSelf: "stretch",
      marginTop: 34,
    },
    dayCol: { alignItems: "center", gap: 7, flex: 1 },
    dayDot: {
      width: 42,
      height: 42,
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.border,
    },
    dayDotDone: { backgroundColor: "#FF9600" },
    dayLabel: { fontSize: 13, fontWeight: "800", color: theme.textSecondary },
    dayLabelDone: { color: "#FF9600" },
    footer: { paddingHorizontal: 20, paddingTop: 8 },
    cta: { height: 62 },
    ctaPressed: { transform: [{ translateY: 3 }] },
    ctaDepth: {
      position: "absolute",
      top: 5,
      left: 0,
      right: 0,
      height: 57,
      borderRadius: 18,
      backgroundColor: "#5B4FCF",
    },
    ctaFace: {
      height: 57,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.primary,
    },
    ctaText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "900",
      letterSpacing: 0.2,
    },
  });
