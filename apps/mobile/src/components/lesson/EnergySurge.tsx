import { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  Path,
  RadialGradient,
  Stop,
} from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import * as Haptics from "@/utils/haptics";

/**
 * 콤보 에너지 보상 연출 — "에너지 코어".
 *
 * 번개(LightningStrike + EnergyBonusPopup)와 랜덤으로 번갈아 나온다.
 *   1) 화면 가장자리에서 불꽃 조각들이 소용돌이치며 가운데로 빨려 든다
 *   2) 가운데서 빛나는 코어가 튀어나오고, 충격파 링 두 겹이 퍼진다
 *   3) 뒤에선 빛줄기가 천천히 돌고, 코어 안 배터리가 차오르며 +N 이 올라간다
 *   4) 코어가 줄어들며 헤더의 에너지 배지 쪽으로 날아가 흡수된다
 *
 * pointerEvents="none" — 연출 중에도 다음 버튼을 누를 수 있다.
 */

interface Props {
  visible: boolean;
  amount: number;
  onDone: () => void;
}

const { width: W, height: H } = Dimensions.get("window");

const ORB = 150; // 코어 지름
const GLOW = ORB * 1.9; // 바깥 보랏빛 후광
const RAY_L = 200; // 빛줄기 길이
const BATT_W = 52;
const BATT_H = 28;

// 타이밍 (ms)
const T_POP = 620; // 코어 등장
const T_FILL = 820; // 배터리 차오름 시작
const T_COLLECT = 1950; // 헤더로 흡수 시작
const D_COLLECT = 480;

interface SparkDef {
  angle: number;
  dist: number;
  size: number;
  delay: number;
  swirl: number;
  color: string;
}

const SPARK_COLORS = ["#FFFFFF", "#FFE066", "#C9C3FF", "#FFD23F"];

const SPARKS: SparkDef[] = Array.from({ length: 18 }).map((_, i) => ({
  angle: (i / 18) * Math.PI * 2 + (i % 2 ? 0.18 : -0.12),
  dist: Math.max(W, H) * (0.42 + (i % 4) * 0.06),
  size: 5 + (i % 3) * 4,
  delay: (i % 6) * 0.07,
  swirl: (i % 2 ? 1 : -1) * (0.7 + (i % 3) * 0.2),
  color: SPARK_COLORS[i % SPARK_COLORS.length],
}));

// 빛줄기 12 갈래 (가운데서 뻗는 얇은 쐐기)
const RAY_PATH = Array.from({ length: 12 })
  .map((_, i) => {
    const a = (i / 12) * Math.PI * 2;
    const d = 0.075; // 쐐기 반폭(rad)
    const x1 = RAY_L + Math.cos(a - d) * RAY_L;
    const y1 = RAY_L + Math.sin(a - d) * RAY_L;
    const x2 = RAY_L + Math.cos(a + d) * RAY_L;
    const y2 = RAY_L + Math.sin(a + d) * RAY_L;
    return `M${RAY_L} ${RAY_L} L${x1} ${y1} L${x2} ${y2} Z`;
  })
  .join(" ");

function Spark({ p, gather }: { p: SparkDef; gather: SharedValue<number> }) {
  const style = useAnimatedStyle(() => {
    const t = Math.min(
      1,
      Math.max(0, (gather.value - p.delay) / (1 - p.delay)),
    );
    // 빨려 들수록 빨라진다
    const e = t * t;
    const r = p.dist * (1 - e);
    const a = p.angle + p.swirl * e;
    const opacity =
      t <= 0 ? 0 : t < 0.15 ? t / 0.15 : t > 0.9 ? (1 - t) / 0.1 : 1;
    return {
      opacity,
      transform: [
        { translateX: Math.cos(a) * r },
        { translateY: Math.sin(a) * r },
        { scale: 1.4 - 0.9 * e },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        styles.spark,
        {
          width: p.size,
          height: p.size,
          borderRadius: p.size / 2,
          backgroundColor: p.color,
          shadowColor: p.color,
        },
        style,
      ]}
    />
  );
}

/** 충격파 링 — 0 → 1 동안 커지며 사라진다 */
function useRingStyle(v: SharedValue<number>, to: number) {
  return useAnimatedStyle(() => ({
    opacity: interpolate(
      v.value,
      [0, 0.08, 1],
      [0, 0.9, 0],
      Extrapolation.CLAMP,
    ),
    transform: [
      { scale: interpolate(v.value, [0, 1], [0.45, to], Extrapolation.CLAMP) },
    ],
  }));
}

export default function EnergySurge({ visible, amount, onDone }: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [display, setDisplay] = useState(0);
  const doneRef = useRef(false);

  const dim = useSharedValue(0);
  const gather = useSharedValue(0);
  const pop = useSharedValue(0);
  const ring1 = useSharedValue(0);
  const ring2 = useSharedValue(0);
  const spin = useSharedValue(0);
  const fill = useSharedValue(0);
  const title = useSharedValue(0);
  const collect = useSharedValue(0);

  // 헤더 오른쪽 에너지 배지 쪽 (화면 가운데 기준 좌표)
  const targetX = W / 2 - 52;
  const targetY = -H / 2 + insets.top + 34;

  useEffect(() => {
    if (!visible || amount <= 0) return;

    doneRef.current = false;
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      onDone();
    };

    // 다시 열릴 때를 위해 처음 상태로
    dim.value = 0;
    gather.value = 0;
    pop.value = 0;
    ring1.value = 0;
    ring2.value = 0;
    spin.value = 0;
    fill.value = 0;
    title.value = 0;
    collect.value = 0;
    setDisplay(0);

    dim.value = withSequence(
      withTiming(0.55, { duration: 220 }),
      withDelay(T_COLLECT - 220, withTiming(0, { duration: D_COLLECT + 120 })),
    );
    gather.value = withTiming(1, {
      duration: T_POP + 80,
      easing: Easing.linear,
    });
    pop.value = withDelay(
      T_POP,
      withSpring(1, { damping: 7, stiffness: 150, mass: 0.8 }),
    );
    ring1.value = withDelay(
      T_POP + 20,
      withTiming(1, { duration: 760, easing: Easing.out(Easing.quad) }),
    );
    ring2.value = withDelay(
      T_POP + 200,
      withTiming(1, { duration: 820, easing: Easing.out(Easing.quad) }),
    );
    spin.value = withTiming(1, {
      duration: T_COLLECT + D_COLLECT,
      easing: Easing.linear,
    });
    fill.value = withDelay(
      T_FILL,
      withTiming(1, { duration: 640, easing: Easing.out(Easing.cubic) }),
    );
    title.value = withDelay(
      T_POP + 220,
      withSpring(1, { damping: 11, stiffness: 160 }),
    );
    collect.value = withDelay(
      T_COLLECT,
      withTiming(
        1,
        { duration: D_COLLECT, easing: Easing.in(Easing.cubic) },
        (fin) => {
          if (fin) runOnJS(finish)();
        },
      ),
    );

    // 빨려 드는 동안 톡톡, 코어가 터질 때 묵직하게
    const timers: ReturnType<typeof setTimeout>[] = [];
    [0, 180, 360].forEach((ms) =>
      timers.push(
        setTimeout(
          () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
          ms,
        ),
      ),
    );
    timers.push(
      setTimeout(
        () =>
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
        T_POP,
      ),
    );
    timers.push(
      setTimeout(
        () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
        T_COLLECT + D_COLLECT - 40,
      ),
    );

    // +N 카운트업 (배터리가 차는 동안)
    let cur = 0;
    let counter: ReturnType<typeof setInterval> | null = null;
    timers.push(
      setTimeout(() => {
        const stepMs = Math.max(45, Math.floor(560 / amount));
        counter = setInterval(() => {
          cur += 1;
          setDisplay(cur);
          if (cur >= amount && counter) clearInterval(counter);
        }, stepMs);
      }, T_FILL),
    );

    // 애니메이션 콜백이 끊겨도(화면 전환 등) 반드시 닫힌다
    timers.push(setTimeout(finish, T_COLLECT + D_COLLECT + 600));

    return () => {
      timers.forEach(clearTimeout);
      if (counter) clearInterval(counter);
    };
  }, [visible, amount]);

  const dimStyle = useAnimatedStyle(() => ({ opacity: dim.value }));

  const ring1Style = useRingStyle(ring1, 2.7);
  const ring2Style = useRingStyle(ring2, 3.4);

  const orbStyle = useAnimatedStyle(() => {
    const c = collect.value;
    return {
      opacity:
        interpolate(pop.value, [0, 0.15], [0, 1], Extrapolation.CLAMP) *
        interpolate(c, [0.75, 1], [1, 0], Extrapolation.CLAMP),
      transform: [
        { translateX: c * targetX },
        { translateY: c * targetY },
        { scale: Math.max(0, pop.value) * (1 - c * 0.85) },
      ],
    };
  });

  const raysStyle = useAnimatedStyle(() => ({
    opacity:
      interpolate(pop.value, [0, 1], [0, 1], Extrapolation.CLAMP) *
      interpolate(collect.value, [0, 0.4], [1, 0], Extrapolation.CLAMP),
    transform: [{ rotate: `${spin.value * 150}deg` }],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    width: fill.value * (BATT_W - 8),
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity:
      interpolate(title.value, [0, 1], [0, 1], Extrapolation.CLAMP) *
      interpolate(collect.value, [0, 0.35], [1, 0], Extrapolation.CLAMP),
    transform: [
      { translateY: -(GLOW / 2) - 18 + (1 - title.value) * 16 },
      { scale: 0.86 + 0.14 * title.value },
    ],
  }));

  if (!visible || amount <= 0) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Animated.View style={[StyleSheet.absoluteFill, styles.dim, dimStyle]} />

      <View style={styles.center}>
        {SPARKS.map((p, i) => (
          <Spark key={i} p={p} gather={gather} />
        ))}

        <Animated.View style={[styles.ring, ring1Style]} />
        <Animated.View style={[styles.ring, styles.ring2, ring2Style]} />

        <Animated.View style={[styles.orbWrap, orbStyle]}>
          <Animated.View style={[styles.rays, raysStyle]}>
            <Svg width={RAY_L * 2} height={RAY_L * 2}>
              <Path d={RAY_PATH} fill="#FFF3B0" fillOpacity={0.26} />
            </Svg>
          </Animated.View>

          <Svg width={GLOW} height={GLOW} style={styles.abs}>
            <Defs>
              <RadialGradient id="surgeGlow" cx="50%" cy="50%" r="50%">
                <Stop offset="0.45" stopColor="#8F87FF" stopOpacity={0.7} />
                <Stop offset="1" stopColor="#776ee2" stopOpacity={0} />
              </RadialGradient>
              <RadialGradient id="surgeCore" cx="42%" cy="38%" r="62%">
                <Stop offset="0" stopColor="#FFFDF0" />
                <Stop offset="0.38" stopColor="#FFE066" />
                <Stop offset="0.8" stopColor="#FFB020" />
                <Stop offset="1" stopColor="#F08A00" />
              </RadialGradient>
            </Defs>
            <Circle
              cx={GLOW / 2}
              cy={GLOW / 2}
              r={GLOW / 2}
              fill="url(#surgeGlow)"
            />
            <Circle
              cx={GLOW / 2}
              cy={GLOW / 2}
              r={ORB / 2}
              fill="url(#surgeCore)"
            />
            {/* 테두리 광택 */}
            <Circle
              cx={GLOW / 2}
              cy={GLOW / 2}
              r={ORB / 2 - 2}
              stroke="#FFFFFF"
              strokeOpacity={0.55}
              strokeWidth={3}
              fill="none"
            />
            {/* 왼쪽 위 하이라이트 */}
            <Ellipse
              cx={GLOW / 2 - ORB * 0.18}
              cy={GLOW / 2 - ORB * 0.24}
              rx={ORB * 0.2}
              ry={ORB * 0.1}
              fill="#FFFFFF"
              fillOpacity={0.6}
              transform={`rotate(-28 ${GLOW / 2 - ORB * 0.18} ${GLOW / 2 - ORB * 0.24})`}
            />
          </Svg>

          <View style={styles.batteryRow}>
            <View style={styles.battery}>
              <Animated.View style={[styles.batteryFill, fillStyle]} />
            </View>
            <View style={styles.batteryCap} />
          </View>
          <Text style={styles.amount}>+{display}</Text>
        </Animated.View>

        <Animated.View style={[styles.titleWrap, titleStyle]}>
          <Text style={styles.title}>{t("lesson.energySurge")}</Text>
          <Text style={styles.sub}>{t("lesson.energySurgeSub")}</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dim: { backgroundColor: "#140F33" },
  center: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  abs: { position: "absolute" },
  spark: {
    position: "absolute",
    shadowOpacity: 0.9,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  ring: {
    position: "absolute",
    width: ORB,
    height: ORB,
    borderRadius: ORB / 2,
    borderWidth: 4,
    borderColor: "#FFE066",
  },
  ring2: { borderWidth: 2, borderColor: "#B8B2FF" },
  orbWrap: {
    width: GLOW,
    height: GLOW,
    alignItems: "center",
    justifyContent: "center",
  },
  rays: { position: "absolute" },
  batteryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  battery: {
    width: BATT_W,
    height: BATT_H,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    padding: 1,
    justifyContent: "center",
    backgroundColor: "rgba(160, 90, 0, 0.25)",
  },
  batteryFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  batteryCap: {
    width: 5,
    height: 11,
    marginLeft: 2,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: "#FFFFFF",
  },
  amount: {
    marginTop: 2,
    fontSize: 44,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -1,
    textShadowColor: "rgba(150, 70, 0, 0.55)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  titleWrap: {
    position: "absolute",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#FFE066",
    letterSpacing: 0.5,
    textShadowColor: "rgba(119, 110, 226, 0.9)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 10,
  },
  sub: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "800",
    color: "#E6E3FF",
    letterSpacing: 0.3,
  },
});
