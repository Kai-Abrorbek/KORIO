import { useEffect, useMemo } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
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
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";

/**
 * 불꽃 원본.
 *
 * metro.config.js 가 react-native-svg-transformer 를 물려 놔서 .svg 는
 * **컴포넌트로** 들어온다 (assetExts 에서 svg 를 빼고 sourceExts 에 넣었다).
 * require() + <Image source> 로 쓰면 조용히 아무것도 안 그려진다.
 * 앱의 다른 svg(로그인의 telegram.svg)도 같은 방식으로 쓴다.
 */
import FlameIcon from "../../assets/images/streak-flame.svg";

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
    /** 서버가 계산한 7일 창 (JSON) */
    week?: string;
    /** 이어서 스코어 상승 축하로 넘길 때 쓰는 값들 */
    scoreUp?: string;
    scoreUpUnit?: string;
    category?: string;
    from?: string;
  }>();

  const streak = Math.max(1, Number(params.streak ?? 1) || 1);

  /**
   * 7일 창은 **서버가** 계산해서 준다 (연속이 시작된 날 기준).
   *
   * 예전엔 여기서 "오늘부터 앞으로 7일" 을 만들었는데, 그러면 내일 열었을 때
   * 어제 칸이 사라져서 며칠째인지 볼 수가 없었다. 창은 시작일에 고정되고
   * 7일이 다 차면 다음 7일로 넘어간다.
   *
   * 요일 약칭은 기기 로케일로 뽑는다 (ko: 목, uz: Pay, ru: чт ...).
   */
  const days = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(undefined, { weekday: "short" });
    try {
      const raw = JSON.parse(params.week || "[]") as {
        date: string;
        studied: boolean;
        isToday: boolean;
        future: boolean;
      }[];
      if (raw.length) {
        return raw.map((d) => ({
          label: fmt.format(new Date(d.date)),
          done: d.studied,
          isToday: d.isToday,
          future: d.future,
        }));
      }
    } catch {
      // 파라미터가 깨졌으면 아래 폴백으로
    }
    // 서버 값이 없을 때만: 오늘 하나만 체크된 창
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return {
        label: fmt.format(d),
        done: i === 0,
        isToday: i === 0,
        future: i > 0,
      };
    });
  }, [params.week]);

  // ── 애니메이션 ──
  //
  // 불은 **한 가지 주기로 움직이면 기계처럼 보인다.** 그래서 서로 배수가 아닌
  // 주기를 겹쳐 둔다 — 셋이 같은 자리로 돌아오는 데 한참 걸려서 반복이 안 보인다.
  const flame = useSharedValue(0); // 등장
  const lick = useSharedValue(0); // 위로 날름 (세로로 늘고 가로로 좁아진다)
  const sway = useSharedValue(0); // 밑동을 축으로 좌우로 휜다
  const flicker = useSharedValue(0); // 밝기 떨림
  const glow = useSharedValue(0);
  const num = useSharedValue(0);

  /** 끝없이 왕복 */
  const pulse = (up: number, down: number, delay = 0) =>
    withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: up, easing: Easing.inOut(Easing.sin) }),
          withTiming(0, { duration: down, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        false,
      ),
    );

  useEffect(() => {
    // 불꽃이 아래에서 툭 튀어오른다
    flame.value = withDelay(
      120,
      withSpring(1, { damping: 11, stiffness: 130 }),
    );
    // 숫자는 불꽃이 자리잡은 뒤 한 박자 늦게
    num.value = withDelay(420, withSpring(1, { damping: 9, stiffness: 170 }));
    // 뒤 광채는 끊임없이 부푼다 — 불이 살아 있는 느낌
    glow.value = pulse(1400, 1700);
    // 불꽃 자체의 움직임. 셋 다 주기가 다르다
    lick.value = pulse(760, 820, 620);
    sway.value = pulse(1230, 1180, 900);
    flicker.value = pulse(190, 230, 620);
  }, []);

  /**
   * 불꽃.
   *
   * 축이 **밑동**이다 (styles.flame 의 transformOrigin). 가운데를 축으로 두면
   * 늘어날 때 불이 공중으로 떠오르고 휘어질 때 통째로 미끄러진다 — 불이 아니라
   * 흔들리는 스티커로 보인다.
   *
   * 세로로 늘어날 때 가로는 좁아진다. 부피가 대충 유지돼야 "커졌다 작아졌다"가
   * 아니라 "날름거린다" 로 읽힌다.
   */
  const flameStyle = useAnimatedStyle(() => {
    const enter = flame.value;
    return {
      opacity: enter * (0.92 + flicker.value * 0.08),
      transform: [
        { translateY: interpolate(enter, [0, 1], [70, 0]) },
        { translateX: interpolate(sway.value, [0, 1], [-3, 3]) },
        { rotate: `${interpolate(sway.value, [0, 1], [-2.4, 2.4])}deg` },
        { scaleX: enter * interpolate(lick.value, [0, 1], [1.03, 0.96]) },
        { scaleY: enter * interpolate(lick.value, [0, 1], [0.97, 1.09]) },
      ],
    };
  });

  // 광채는 불꽃의 떨림을 같이 받는다 — 따로 놀면 두 개의 물체로 보인다
  const glowStyle = useAnimatedStyle(() => ({
    opacity: 0.14 + glow.value * 0.24 + flicker.value * 0.06,
    transform: [{ scale: 0.88 + glow.value * 0.2 }],
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
          {/* 광채. 단색 원을 깔면 주황색 접시가 되지 별빛처럼 안 보인다 */}
          <Animated.View style={[s.glow, glowStyle]} pointerEvents="none">
            <Svg width="100%" height="100%" viewBox="0 0 100 100">
              <Defs>
                <RadialGradient id="streakGlow" cx="50%" cy="50%" r="50%">
                  <Stop offset="0%" stopColor="#FFC93C" stopOpacity="1" />
                  <Stop offset="45%" stopColor="#FF9600" stopOpacity="0.5" />
                  <Stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
                </RadialGradient>
              </Defs>
              <Circle cx="50" cy="50" r="50" fill="url(#streakGlow)" />
            </Svg>
          </Animated.View>

          <Animated.View style={[s.flame, flameStyle]}>
            <FlameIcon width={220} height={240} />
          </Animated.View>

          {/* 숫자는 불꽃 **밖**에 둔다. 안에 두면 날름거릴 때 같이 떨려서
              읽히지가 않는다 — 불은 움직이고 숫자는 가만히 있어야 한다 */}
          <Animated.Text style={[s.streakNum, numStyle]}>
            {streak}
          </Animated.Text>
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
              isToday={d.isToday}
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
  isToday,
  delay,
  s,
  theme,
}: {
  label: string;
  done: boolean;
  /** 오늘 칸은 테두리로 짚어 준다 — 창 어디쯤 와 있는지 한눈에 보이게 */
  isToday: boolean;
  delay: number;
  s: ReturnType<typeof styles>;
  theme: ThemeColors;
}) {
  const pop = useSharedValue(0);
  useEffect(() => {
    pop.value = withDelay(
      delay,
      withSpring(1, { damping: 10, stiffness: 200 }),
    );
  }, [delay]);

  const style = useAnimatedStyle(() => ({
    opacity: pop.value,
    transform: [{ scale: 0.4 + pop.value * 0.6 }],
  }));

  return (
    <View style={s.dayCol}>
      <Animated.View
        style={[
          s.dayDot,
          done && s.dayDotDone,
          isToday && !done && s.dayDotToday,
          style,
        ]}
      >
        {done && <Ionicons name="checkmark" size={20} color="#fff" />}
      </Animated.View>
      <Text
        style={[
          s.dayLabel,
          done && s.dayLabelDone,
          isToday && s.dayLabelToday,
        ]}
      >
        {label}
      </Text>
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
      {
        translateX: interpolate(
          p.value,
          [0, 0.5, 1],
          [0, index % 2 ? 14 : -14, 0],
        ),
      },
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
      width: 340,
      height: 340,
    },
    // 불은 밑동을 축으로 움직인다. 가운데를 축으로 두면 공중으로 떠오른다
    flame: { transformOrigin: "bottom center" },
    streakNum: {
      position: "absolute",
      left: 0,
      right: 0,
      // 불꽃 가운데. 숫자가 커도 중심이 안 흔들리게 폭을 고정한다
      top: "42%",
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
    dayDotToday: { borderWidth: 2.5, borderColor: "#FF9600" },
    dayLabel: { fontSize: 13, fontWeight: "800", color: theme.textSecondary },
    dayLabelDone: { color: "#FF9600" },
    dayLabelToday: { color: "#FF9600" },
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
