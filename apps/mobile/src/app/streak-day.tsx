import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Pressable } from "@/components/ui/Pressables";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { goNext, viaStreakChest } from "@/utils/streak-chest-route";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import * as Haptics from "@/utils/haptics";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import { cinemaAt, cinemaVoices, shakeAt } from "@/components/cinema/cinema";
import {
  useCinemaAudio,
  useCinemaClock,
  useCinemaLanguage,
} from "@/components/cinema/useCinema";
import Confetti from "@/components/lesson-complete/Confetti";
import {
  IGNITE_SPARKS,
  IGNITE_TRACK,
  RELAY,
  dotLit,
  hopAt,
  relayTimeline,
  riseAt,
  type StreakSound,
} from "@/components/streak-day/streakRelayCinematic";

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
const DOT = 42;

const STREAK_SOURCES: Record<StreakSound, number> = {
  catch: require("../../assets/sounds/streak/catch.mp3"),
  today: require("../../assets/sounds/streak/today.mp3"),
  rise: require("../../assets/sounds/streak/rise.mp3"),
  ignite: require("../../assets/sounds/streak/ignite.mp3"),
  count: require("../../assets/sounds/streak/count.mp3"),
  fireworks: require("../../assets/sounds/streak/fireworks.mp3"),
  voDay: require("../../assets/sounds/streak/vo-day.mp3"),
  vo7: require("../../assets/sounds/streak/vo-7.mp3"),
  vo30: require("../../assets/sounds/streak/vo-30.mp3"),
  vo100: require("../../assets/sounds/streak/vo-100.mp3"),
  vo365: require("../../assets/sounds/streak/vo-365.mp3"),
  voRecord: require("../../assets/sounds/streak/vo-record.mp3"),
};

/** 영어 코스 — "One week in a row!" … */
const STREAK_VOICES_EN: Partial<Record<StreakSound, number>> = {
  voDay: require("../../assets/sounds/streak/vo-day-en.mp3"),
  vo7: require("../../assets/sounds/streak/vo-7-en.mp3"),
  vo30: require("../../assets/sounds/streak/vo-30-en.mp3"),
  vo100: require("../../assets/sounds/streak/vo-100-en.mp3"),
  vo365: require("../../assets/sounds/streak/vo-365-en.mp3"),
  voRecord: require("../../assets/sounds/streak/vo-record-en.mp3"),
};

/** 목소리가 효과음에 묻히지 않게 */
const STREAK_GAIN: Partial<Record<StreakSound, number>> = {
  catch: 0.55,
  today: 0.75,
  rise: 0.6,
  ignite: 0.9,
  count: 0.55,
  fireworks: 0.6,
};

interface Geometry {
  /** 요일 줄 (컨테이너 기준 px) */
  rowX: number;
  rowY: number;
  rowW: number;
  /** 불씨 자리 (불꽃 밑동) */
  baseX: number;
  baseY: number;
}

/**
 * 오늘의 첫 레슨을 끝냈을 때 뜨는 연속 학습 축하 — "불씨 릴레이" (streakRelayCinematic).
 *
 * "오늘 처음인가" 는 서버가 판정한다(completeLesson 의 dailyStreak). 클라가
 * 세면 앱을 껐다 켜거나 두 기기에서 풀 때 또 축하한다.
 *
 * 요일 줄은 서버가 준 7일 창이다. 공부한 날들이 차례로 불 붙고, 불이 오늘 칸으로 건너가
 * 오늘이 켜지면 그 불덩이가 위로 솟아 큰 불꽃을 붙인다. 화면을 누르면 끝 장면으로.
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
    /** 노드를 끝내서 받은 상자. 축하가 끝나면 상자 화면으로 이어 간다 */
    chestGrade?: string;
    chestGems?: string;
    gemTotal?: string;
    /** 연속 3·6·9…일째 보상 상자 — 도장 바로 다음에 연다 */
    streakChestGems?: string;
    streakChestDays?: string;
    /** 어휘 외 모드에서 왔을 때 축하 뒤 갈 곳 — JSON Href 또는 "back" */
    next?: string;
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

  // ── 불씨 릴레이 시계 ──
  const tl = useMemo(() => relayTimeline(days, streak), [days, streak]);
  const ignite = tl.ignite;
  const { clock, run } = useCinemaClock(tl.end);
  const language = useCinemaLanguage();
  const audio = useCinemaAudio(
    cinemaVoices(STREAK_SOURCES, STREAK_VOICES_EN, language),
    STREAK_GAIN,
  );
  const reducedMotion = useReducedMotion();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [confetti, setConfetti] = useState(false);

  // 불덩이가 요일 줄에서 불씨까지 날아가려면 두 자리를 재야 한다
  const containerRef = useRef<View>(null);
  const rowRef = useRef<View>(null);
  const flameRef = useRef<View>(null);
  const [geo, setGeo] = useState<Geometry | null>(null);
  const measure = useCallback(() => {
    const container = containerRef.current;
    const row = rowRef.current;
    const flameBox = flameRef.current;
    if (!container || !row || !flameBox) return;
    container.measureInWindow((cx, cy) => {
      row.measureInWindow((rx, ry, rw) => {
        flameBox.measureInWindow((fx, fy, fw, fh) => {
          setGeo({ rowX: rx - cx, rowY: ry - cy, rowW: rw, baseX: fx - cx + fw / 2, baseY: fy - cy + fh - 30 });
        });
      });
    });
  }, []);

  // ── 살아 있는 불 ──
  //
  // 불은 **한 가지 주기로 움직이면 기계처럼 보인다.** 그래서 서로 배수가 아닌
  // 주기를 겹쳐 둔다 — 셋이 같은 자리로 돌아오는 데 한참 걸려서 반복이 안 보인다.
  const lick = useSharedValue(0); // 위로 날름 (세로로 늘고 가로로 좁아진다)
  const sway = useSharedValue(0); // 밑동을 축으로 좌우로 휜다
  const flicker = useSharedValue(0); // 밝기 떨림
  const glow = useSharedValue(0);

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
    glow.value = pulse(1400, 1700);
    lick.value = pulse(760, 820);
    sway.value = pulse(1230, 1180, 280);
    flicker.value = pulse(190, 230);

    // 동작 줄이기면 불이 붙은 끝 장면부터 (목소리는 들려준다)
    const from = reducedMotion ? tl.end : 0;
    run(from);
    audio.playFrom(reducedMotion ? ignite + 520 : 0, tl.cues);
    const at = (ms: number, fn: () => void) => {
      if (ms >= from) timers.current.push(setTimeout(fn, ms - from));
    };
    // 지난 날 불 붙는 소리 — 점점 높게
    for (const c of tl.catches) {
      at(c.t, () => {
        audio.play("catch", { rate: c.rate });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      });
    }
    at(tl.today, () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    });
    at(ignite, () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
    });
    at(ignite + 420, () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    });
    if (tl.milestone) {
      if (reducedMotion) setConfetti(true);
      else at(ignite + 650, () => setConfetti(true));
    }
    const list = timers.current;
    return () => list.forEach(clearTimeout);
    // 한 번만 — 들어온 순간의 창으로 돈다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 화면을 누르면 끝 장면으로 (남은 효과음은 끊는다) */
  const skip = useCallback(() => {
    if (clock.value >= tl.end) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    audio.stop();
    run(tl.end);
    if (tl.milestone) setConfetti(true);
  }, [audio, clock, run, tl]);

  // 기념일 폭죽은 건너뛰어도 한 번은 터진다
  useAnimatedReaction(
    () => clock.value >= ignite + 650,
    (now, previous) => {
      if (now && !previous && tl.milestone) runOnJS(setConfetti)(true);
    },
  );

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
    const enter = cinemaAt(IGNITE_TRACK.flame, clock.value - ignite);
    return {
      opacity: Math.min(1, enter * 3) * (0.92 + flicker.value * 0.08),
      transform: [
        { translateX: interpolate(sway.value, [0, 1], [-3, 3]) },
        { rotate: `${interpolate(sway.value, [0, 1], [-2.4, 2.4])}deg` },
        { scaleX: Math.max(0.001, enter) * interpolate(lick.value, [0, 1], [1.03, 0.96]) },
        { scaleY: Math.max(0.001, enter) * interpolate(lick.value, [0, 1], [0.97, 1.09]) },
      ],
    };
  });

  // 광채는 불꽃의 떨림을 같이 받는다 — 따로 놀면 두 개의 물체로 보인다. 점화 순간 확 부푼다
  const glowStyle = useAnimatedStyle(() => {
    const rel = clock.value - ignite;
    const lit = Math.min(1, cinemaAt(IGNITE_TRACK.flame, rel));
    const boost = cinemaAt(IGNITE_TRACK.glowBoost, rel);
    return {
      opacity: (0.14 + glow.value * 0.24 + flicker.value * 0.06) * lit + boost * 0.5,
      transform: [{ scale: 0.88 + glow.value * 0.2 + boost * 0.35 }],
    };
  });

  // 불 붙기 전 불씨 — 숨 쉬듯
  const emberStyle = useAnimatedStyle(() => {
    const e = cinemaAt(IGNITE_TRACK.ember, clock.value - ignite);
    return {
      opacity: e * (0.7 + 0.3 * Math.sin(clock.value / 260)),
      transform: [{ scale: (0.85 + 0.15 * Math.sin(clock.value / 260)) * (0.4 + 0.6 * e) }],
    };
  });

  // 숫자: 어제 값이 위로 빠지고 오늘 값이 아래서 튀어 오른다
  const prevStyle = useAnimatedStyle(() => {
    const p = cinemaAt(IGNITE_TRACK.prevOut, clock.value - ignite);
    const lit = Math.min(1, cinemaAt(IGNITE_TRACK.flame, clock.value - ignite) * 3);
    return { opacity: lit * (1 - p), transform: [{ translateY: -40 * p }, { scale: 1 - 0.2 * p }] };
  });
  const nextStyle = useAnimatedStyle(() => {
    const n = cinemaAt(IGNITE_TRACK.nextIn, clock.value - ignite);
    return { opacity: Math.min(1, n * 1.5), transform: [{ translateY: 46 * (1 - n) }, { scale: 0.6 + 0.4 * n }] };
  });

  const textStyle = useAnimatedStyle(() => {
    const x = cinemaAt(IGNITE_TRACK.text, clock.value - ignite);
    return { opacity: x, transform: [{ translateY: 12 * (1 - x) }] };
  });
  const badgeStyle = useAnimatedStyle(() => {
    const b = cinemaAt(IGNITE_TRACK.badge, clock.value - ignite);
    return { opacity: Math.min(1, b), transform: [{ scale: Math.max(0.001, b) }] };
  });
  const warmStyle = useAnimatedStyle(() => ({
    opacity: cinemaAt(IGNITE_TRACK.warm, clock.value - ignite),
  }));
  const embersStyle = useAnimatedStyle(() => ({
    opacity: cinemaAt(IGNITE_TRACK.embers, clock.value - ignite),
  }));
  const shakeStyle = useAnimatedStyle(() => {
    const k = shakeAt(clock.value, ignite, 380, tl.milestone ? 12 : 7);
    return { transform: [{ translateX: k.x }, { translateY: k.y }] };
  });

  const onContinue = () => {
    // 연속 보상 상자가 있으면 원래 가려던 곳 앞에 끼운다 (utils/streak-chest-route)
    const go = (next: Href) => router.replace(viaStreakChest(next, params));

    // 표현·말하기·TOPIK·문법·리스닝에서 왔으면 갈 곳이 정해져 있다
    if (params.next) {
      if (params.streakChestGems) {
        let target: Href | "back" = "back";
        if (params.next !== "back") {
          try {
            target = JSON.parse(params.next) as Href;
          } catch {
            target = "back";
          }
        }
        router.replace(viaStreakChest(target, params));
        return;
      }
      goNext(params.next, () => router.replace("/(tabs)"));
      return;
    }
    // 스코어까지 올랐으면 그 축하를 이어서 보여준다.
    // 두 축하가 겹치면 안 되니 순서를 여기서 한 번만 정한다:
    //   연속 학습(하루) → 스코어 상승(유닛) → 상자(노드) → 원래 가던 곳
    // 예전엔 여기서 상자 값을 안 넘겨서, 오늘 첫 레슨으로 노드를 끝내면
    // 보석은 들어갔는데 상자 화면은 영영 안 떴다.
    const chest = {
      chestGrade: params.chestGrade ?? "",
      chestGems: params.chestGems ?? "",
      gemTotal: params.gemTotal ?? "",
    };
    if (params.scoreUp) {
      go({
        pathname: "/score-up",
        params: {
          score: params.scoreUp,
          unit: params.scoreUpUnit ?? "",
          category: params.category ?? "",
          from: params.from ?? "",
          ...chest,
        },
      });
      return;
    }
    if (params.chestGrade) {
      go({
        pathname: "/chest-reward",
        params: {
          grade: params.chestGrade,
          gems: params.chestGems ?? "0",
          gemTotal: params.gemTotal ?? "0",
          category: params.category ?? "",
          from: params.from ?? "",
        },
      });
      return;
    }
    // 학습 로드에서 왔으면 그 하루로 돌아간다 (자율 로드맵으로 새면 안 된다)
    if (params.from === "studyPath") {
      go("/study-path");
      return;
    }
    go(
      params.category
        ? { pathname: "/roadmap", params: { category: params.category } }
        : "/(tabs)",
    );
  };

  return (
    <View
      style={s.container}
      ref={containerRef}
      collapsable={false}
      onLayout={() => setTimeout(measure, 0)}
    >
      {/* 불티 — 불이 붙은 뒤 위로 흩어져 올라간다 */}
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, embersStyle]}>
        {Array.from({ length: EMBERS }).map((_, i) => (
          <Ember key={i} index={i} />
        ))}
      </Animated.View>

      {/* 점화 순간 화면이 따뜻하게 번쩍 */}
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, s.warm, warmStyle]} />

      {/* 화면을 누르면 끝 장면으로 */}
      <Pressable onPress={skip} sound={false} style={s.content}>
        <Animated.View style={[s.contentInner, shakeStyle]}>
          <View style={s.flameArea} ref={flameRef} collapsable={false}>
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

            {/* 불 붙기 전 불씨 */}
            <Animated.View style={[s.ember, emberStyle]} pointerEvents="none">
              <Svg width="100%" height="100%" viewBox="0 0 100 100">
                <Defs>
                  <RadialGradient id="streakEmber" cx="50%" cy="50%" r="50%">
                    <Stop offset="0%" stopColor="#FFF3B0" stopOpacity="1" />
                    <Stop offset="40%" stopColor="#FF9600" stopOpacity="0.9" />
                    <Stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
                  </RadialGradient>
                </Defs>
                <Circle cx="50" cy="50" r="50" fill="url(#streakEmber)" />
              </Svg>
            </Animated.View>

            <Animated.View style={[s.flame, flameStyle]}>
              <FlameIcon width={220} height={240} />
            </Animated.View>

            {/* 점화 순간 사방으로 튀는 불티 */}
            {IGNITE_SPARKS.map((spark, i) => (
              <IgniteSpark key={i} spark={spark} clock={clock} ignite={ignite} />
            ))}

            {/* 숫자는 불꽃 **밖**에 둔다. 안에 두면 날름거릴 때 같이 떨려서
                읽히지가 않는다 — 불은 움직이고 숫자는 가만히 있어야 한다 */}
            <Animated.Text style={[s.streakNum, prevStyle]}>{streak - 1}</Animated.Text>
            <Animated.Text style={[s.streakNum, nextStyle]}>{streak}</Animated.Text>
          </View>

          {tl.milestone ? (
            <Animated.View style={[s.badge, badgeStyle]}>
              <Text style={s.badgeText} numberOfLines={1}>
                {t("streakDay.milestone", { n: streak })}
              </Text>
            </Animated.View>
          ) : null}

          <Animated.Text style={[s.scopeLabel, textStyle]}>{t("learningStreak.title")}</Animated.Text>
          <Animated.Text style={[s.title, textStyle]}>{t("streakDay.title")}</Animated.Text>
          <Animated.Text style={[s.subtitle, textStyle]}>{t("streakDay.subtitle")}</Animated.Text>

          <View style={s.week} ref={rowRef} collapsable={false}>
            {days.map((d, i) => (
              <DayDot
                key={d.label + i}
                label={d.label}
                isToday={d.isToday}
                popAt={RELAY.dotsIn + i * RELAY.dotGap}
                litAt={tl.litAt[i] ?? -1}
                clock={clock}
                s={s}
              />
            ))}
          </View>
        </Animated.View>
      </Pressable>

      {/* 오늘 칸으로 건너오는 불 · 불씨까지 솟는 불덩이 */}
      {geo ? <RelayFire geo={geo} tl={tl} clock={clock} count={days.length} /> : null}

      {confetti ? <Confetti /> : null}

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

/** 요일 동그라미 — 톡톡 나타났다가, 차례가 오면 불이 붙는다 */
function DayDot({
  label,
  isToday,
  popAt,
  litAt,
  clock,
  s,
}: {
  label: string;
  /** 오늘 칸은 테두리로 짚어 준다 — 창 어디쯤 와 있는지 한눈에 보이게 */
  isToday: boolean;
  popAt: number;
  litAt: number;
  clock: SharedValue<number>;
  s: ReturnType<typeof styles>;
}) {
  const popStyle = useAnimatedStyle(() => {
    const p = cinemaAt(
      [
        { t: popAt, v: 0 },
        { t: popAt + 260, v: 1, e: "back" },
      ],
      clock.value,
    );
    return { opacity: Math.min(1, p), transform: [{ scale: 0.4 + p * 0.6 }] };
  });
  const litStyle = useAnimatedStyle(() => {
    const l = dotLit(clock.value, litAt);
    return { opacity: l.on, transform: [{ scale: l.scale }] };
  });
  // 오늘 칸이 켜질 때 퍼지는 고리
  const ringStyle = useAnimatedStyle(() => {
    if (!isToday || litAt < 0) return { opacity: 0 };
    const p = Math.min(1, Math.max(0, (clock.value - litAt) / 520));
    return { opacity: p <= 0 || p >= 1 ? 0 : 0.8 * (1 - p), transform: [{ scale: 1 + 1.1 * p }] };
  });
  const labelStyle = useAnimatedStyle(() => ({ opacity: dotLit(clock.value, litAt).on }));

  return (
    <View style={s.dayCol}>
      <Animated.View style={[s.dayDot, isToday && s.dayDotToday, popStyle]}>
        <Animated.View style={[s.dayRing, ringStyle]} pointerEvents="none" />
        <Animated.View style={[s.dayLit, litStyle]}>
          <Ionicons name="checkmark" size={20} color="#fff" />
        </Animated.View>
      </Animated.View>
      <View>
        <Text style={[s.dayLabel, isToday && s.dayLabelToday]}>{label}</Text>
        <Animated.Text style={[s.dayLabel, s.dayLabelDone, s.dayLabelOver, labelStyle]}>
          {label}
        </Animated.Text>
      </View>
    </View>
  );
}

/** 점화 순간 불티 한 알 */
function IgniteSpark({
  spark,
  clock,
  ignite,
}: {
  spark: (typeof IGNITE_SPARKS)[number];
  clock: SharedValue<number>;
  ignite: number;
}) {
  const style = useAnimatedStyle(() => {
    const p = cinemaAt(IGNITE_TRACK.sparks, clock.value - ignite);
    return {
      opacity: p <= 0 || p >= 1 ? 0 : 1 - p * p,
      transform: [
        { translateX: Math.cos(spark.angle) * spark.dist * p },
        // 위로 조금 더 — 불은 솟는다
        { translateY: Math.sin(spark.angle) * spark.dist * p - 40 * p },
        { scale: 1 - 0.5 * p },
      ],
    };
  });
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        stylesStatic.spark,
        {
          width: spark.size,
          height: spark.size,
          borderRadius: spark.size / 2,
          backgroundColor: spark.gold ? "#FFC93C" : "#FF7A00",
        },
        style,
      ]}
    />
  );
}

/** 요일 줄 안에서 오늘로 건너오는 불, 그리고 불씨까지 솟는 불덩이 */
function RelayFire({
  geo,
  tl,
  clock,
  count,
}: {
  geo: Geometry;
  tl: ReturnType<typeof relayTimeline>;
  clock: SharedValue<number>;
  count: number;
}) {
  const col = geo.rowW / count;
  const cx = (i: number) => geo.rowX + (i + 0.5) * col;
  const dotY = geo.rowY + DOT / 2;
  const fromX = tl.hopFrom >= 0 ? cx(tl.hopFrom) : cx(tl.todayIndex);
  const todayX = cx(tl.todayIndex);

  const hopStyle = useAnimatedStyle(() => {
    const h = hopAt(clock.value, tl.hopStart, RELAY.hop, fromX, todayX);
    return { opacity: h.opacity, transform: [{ translateX: h.x - 9 }, { translateY: dotY + h.y - 9 }] };
  });
  const riseStyle = useAnimatedStyle(() => {
    const r = riseAt(clock.value, tl.rise, RELAY.rise, todayX, dotY, geo.baseX, geo.baseY);
    return {
      opacity: r.opacity,
      transform: [{ translateX: r.x - 14 }, { translateY: r.y - 14 }, { scale: r.scale }],
    };
  });

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Animated.View style={[stylesStatic.hop, hopStyle]} />
      <Animated.View style={[stylesStatic.fireball, riseStyle]}>
        <Svg width={28} height={28} viewBox="0 0 100 100">
          <Defs>
            <RadialGradient id="fireball" cx="50%" cy="45%" r="50%">
              <Stop offset="0%" stopColor="#FFFBEA" stopOpacity="1" />
              <Stop offset="45%" stopColor="#FFC93C" stopOpacity="1" />
              <Stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Circle cx="50" cy="50" r="50" fill="url(#fireball)" />
        </Svg>
      </Animated.View>
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
  }, [index, dur, p]);

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

const stylesStatic = StyleSheet.create({
  spark: { position: "absolute", top: "50%", left: "50%" },
  hop: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FFC93C",
    shadowColor: "#FF9600",
    shadowOpacity: 0.9,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  fireball: { position: "absolute", left: 0, top: 0, width: 28, height: 28 },
});

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    content: { flex: 1 },
    contentInner: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
    },
    warm: { backgroundColor: "#FF9600" },
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
    ember: {
      position: "absolute",
      bottom: 6,
      width: 70,
      height: 70,
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
    badge: {
      marginBottom: 12,
      paddingHorizontal: 16,
      paddingVertical: 7,
      borderRadius: 999,
      backgroundColor: "#FFD45C",
      borderBottomWidth: 3,
      borderBottomColor: "#E2A83A",
    },
    badgeText: { fontSize: 15, fontWeight: "900", color: "#7A4C00" },
    scopeLabel: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
      marginBottom: 8,
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
      width: DOT,
      height: DOT,
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.border,
    },
    dayDotToday: { borderWidth: 2.5, borderColor: "#FF9600" },
    dayLit: {
      ...StyleSheet.absoluteFill,
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FF9600",
    },
    dayRing: {
      position: "absolute",
      width: DOT,
      height: DOT,
      borderRadius: 999,
      borderWidth: 3,
      borderColor: "#FFC93C",
    },
    dayLabel: { fontSize: 13, fontWeight: "800", color: theme.textSecondary },
    dayLabelDone: { color: "#FF9600" },
    dayLabelToday: { color: "#FF9600" },
    // 불이 붙으면 주황 글씨가 위에 겹쳐 나타난다
    dayLabelOver: { position: "absolute", left: 0, top: 0 },
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
