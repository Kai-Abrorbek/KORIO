import { useEffect } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Defs, Ellipse, RadialGradient, Rect, Stop } from "react-native-svg";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";

/**
 * 요금제 화면 맨 위. 보고 있는 등급(SUPER / MAX)에 맞춰 배경·태그·문구·한글몬이 바뀐다.
 * progress 는 등급 버튼·옆으로 밀기와 같은 값(0 SUPER ~ 1 MAX)이라, 미는 만큼 섞이며 넘어간다.
 *
 * - 한글몬이 보라색이라 배경은 어둡게 깔고 뒤에 빛(SUPER 분홍 · MAX 금색)을 둬서 몸이 묻히지 않게 했다.
 * - 글자·태그·한글몬은 겹쳐 보이면 지저분해서 앞 절반에 사라지고 뒤 절반에 나타난다. 배경·빛만 그대로 섞인다.
 * - 한글몬 이미지는 발밑 흰 바닥을 지운 *_float 판이다 (원본은 흰 바닥이 남아 어두운 배경에서 얼룩이 된다).
 * - 텔레그램 미니앱 premium-screen 의 PremiumHero 와 같은 화면이다.
 */
const MASCOT = {
  super: require("../../../../assets/images/characters/hangulmon_streak_float.png"),
  max: require("../../../../assets/images/characters/hangulmon_confident_float.png"),
};

/** 반짝이 — 자리·크기·박자를 다르게 해서 같이 깜빡이지 않게 */
const SPARKS = [
  { left: "5%", top: "12%", size: 13, delay: 0, color: "#FFFFFF" },
  { left: "40%", top: "10%", size: 10, delay: 900, color: "#FFD93D" },
  { left: "57%", top: "62%", size: 12, delay: 1700, color: "#FFFFFF" },
  { left: "92%", top: "12%", size: 15, delay: 400, color: "#FFD93D" },
  { left: "90%", top: "80%", size: 11, delay: 1300, color: "#FFFFFF" },
  { left: "47%", top: "88%", size: 9, delay: 2100, color: "#FFD93D" },
] as const;

const LOOP_MS = 1300;
const ease = Easing.inOut(Easing.ease);

/** 0~1 로 자르고, 사라지는 쪽(out)·나타나는 쪽(in) 비율 */
function mix(value: number) {
  "worklet";
  const p = Math.min(1, Math.max(0, value));
  return {
    p,
    out: Math.min(1, Math.max(0, 1 - p * 2)),
    in: Math.min(1, Math.max(0, p * 2 - 1)),
  };
}

export default function PremiumHero({ progress }: { progress: SharedValue<number> }) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const reduceMotion = useReducedMotion();
  const stage = width < 360 ? 124 : 150;

  // 둥실 · 빛 숨쉬기 · 태그 광택 — 하나의 박자로 같이 움직인다
  const bob = useSharedValue(0);
  const gloss = useSharedValue(0);
  useEffect(() => {
    if (reduceMotion) return;
    bob.value = withRepeat(
      withSequence(
        withTiming(1, { duration: LOOP_MS, easing: ease }),
        withTiming(0, { duration: LOOP_MS, easing: ease }),
      ),
      -1,
    );
    gloss.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 1700 }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
    );
    return () => {
      cancelAnimation(bob);
      cancelAnimation(gloss);
    };
  }, [reduceMotion, bob, gloss]);

  const maxBg = useAnimatedStyle(() => ({ opacity: mix(progress.value).p }));
  const superGlow = useAnimatedStyle(() => ({
    opacity: 1 - mix(progress.value).p,
    transform: [{ scale: 0.94 + bob.value * 0.12 }],
  }));
  const maxGlow = useAnimatedStyle(() => ({
    opacity: mix(progress.value).p,
    transform: [{ scale: 0.94 + bob.value * 0.12 }],
  }));
  const bobStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -7 * bob.value }],
  }));
  const floorStyle = useAnimatedStyle(() => ({
    opacity: 1 - bob.value * 0.4,
    transform: [{ scaleX: 1 - bob.value * 0.18 }],
  }));
  // 넘길 때 옆으로 비켜나며 바뀐다
  const superMascot = useAnimatedStyle(() => {
    const m = mix(progress.value);
    return {
      opacity: m.out,
      transform: [{ translateX: -26 * m.p }, { scale: 1 - m.p * 0.16 }],
    };
  });
  const maxMascot = useAnimatedStyle(() => {
    const m = mix(progress.value);
    return {
      opacity: m.in,
      transform: [{ translateX: 26 * (1 - m.p) }, { scale: 0.84 + m.p * 0.16 }],
    };
  });
  const superTag = useAnimatedStyle(() => {
    const m = mix(progress.value);
    return { opacity: m.out, transform: [{ rotate: "-3deg" }, { scale: 1 - m.p * 0.25 }] };
  });
  const maxTag = useAnimatedStyle(() => {
    const m = mix(progress.value);
    return { opacity: m.in, transform: [{ rotate: "-3deg" }, { scale: 0.75 + m.p * 0.25 }] };
  });
  const superSub = useAnimatedStyle(() => ({ opacity: mix(progress.value).out }));
  const maxSub = useAnimatedStyle(() => ({ opacity: mix(progress.value).in }));
  const glossStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -40 + gloss.value * 170 }, { skewX: "-20deg" }],
  }));

  return (
    <View style={[s.hero, { paddingTop: insets.top + 22 }]}>
      {/* 배경 — SUPER 위에 MAX 를 얹고 비율만큼 보인다 */}
      <LinearGradient
        colors={["#7B5CFF", "#4A33C7", "#1F1460"]}
        locations={[0, 0.48, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Glow id="heroTopLight" color="#FFFFFF" opacity={0.16} cx="0%" cy="0%" />
      <Animated.View style={[StyleSheet.absoluteFill, maxBg]} pointerEvents="none">
        <LinearGradient
          colors={["#4A2C86", "#2A1858", "#120A30"]}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Glow id="heroGoldLight" color="#FFBE3C" opacity={0.22} cx="100%" cy="100%" />
      </Animated.View>

      {SPARKS.map((spark, i) => (
        <Spark key={i} {...spark} still={reduceMotion} />
      ))}

      <View style={s.copy}>
        <Text style={s.brand}>KORIO</Text>

        <View style={s.tags}>
          <Animated.View style={[s.tagShadow, { backgroundColor: "#7A3FD0" }, superTag]}>
            <LinearGradient
              colors={["#FF8AD8", "#B86CFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={s.tag}
            >
              <Text style={[s.tagText, { color: "#fff" }]}>SUPER</Text>
              <Animated.View style={[s.gloss, glossStyle]} />
            </LinearGradient>
          </Animated.View>
          <Animated.View style={[s.tagShadow, s.tagOver, { backgroundColor: "#C27A00" }, maxTag]}>
            <LinearGradient
              colors={["#FFE680", "#FFB020"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={s.tag}
            >
              <Text style={[s.tagText, { color: "#4A2C00" }]}>MAX</Text>
              <Animated.View style={[s.gloss, glossStyle]} />
            </LinearGradient>
          </Animated.View>
        </View>

        {/* 두 문구를 한 자리에 겹친다 — 높이는 긴 쪽에 맞춰진다 */}
        <View style={s.subs}>
          <Animated.Text style={[s.sub, superSub]} lineBreakStrategyIOS="hangul-word">
            {t("premium.heroSub")}
          </Animated.Text>
          <Animated.Text style={[s.sub, s.subOver, maxSub]} lineBreakStrategyIOS="hangul-word">
            {t("premium.tierBlurb.max")}
          </Animated.Text>
        </View>
      </View>

      {/* 한글몬 무대 — 빛 · 둥실 · 그림자 */}
      <View style={{ width: stage, height: stage }} pointerEvents="none">
        <Animated.View style={[s.glow, superGlow]}>
          <GlowDisc id="heroGlowSuper" inner="#FFAAEC" mid="#C882FF" />
        </Animated.View>
        <Animated.View style={[s.glow, maxGlow]}>
          <GlowDisc id="heroGlowMax" inner="#FFF2B4" mid="#FFD060" />
        </Animated.View>
        <View style={[s.floor, { width: stage * 0.55, left: stage * 0.225 }]}>
          <Animated.View style={[StyleSheet.absoluteFill, floorStyle]}>
            <Svg width="100%" height="100%">
              <Defs>
                <RadialGradient id="heroFloor" cx="50%" cy="50%" r="50%">
                  <Stop offset="0%" stopColor="#05021A" stopOpacity="0.45" />
                  <Stop offset="100%" stopColor="#05021A" stopOpacity="0" />
                </RadialGradient>
              </Defs>
              <Ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="url(#heroFloor)" />
            </Svg>
          </Animated.View>
        </View>
        <Animated.View style={[StyleSheet.absoluteFill, bobStyle]}>
          <Animated.Image source={MASCOT.super} style={[s.mascot, superMascot]} resizeMode="contain" />
          <Animated.Image source={MASCOT.max} style={[s.mascot, maxMascot]} resizeMode="contain" />
        </Animated.View>
      </View>
    </View>
  );
}

/** 모서리에서 번지는 빛 (배경용) */
function Glow({
  id,
  color,
  opacity,
  cx,
  cy,
}: {
  id: string;
  color: string;
  opacity: number;
  cx: string;
  cy: string;
}) {
  return (
    <Svg width="100%" height="100%" style={StyleSheet.absoluteFill} pointerEvents="none">
      <Defs>
        <RadialGradient id={id} cx={cx} cy={cy} rx="100%" ry="90%" fx={cx} fy={cy}>
          <Stop offset="0%" stopColor={color} stopOpacity={opacity} />
          <Stop offset="60%" stopColor={color} stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Rect width="100%" height="100%" fill={`url(#${id})`} />
    </Svg>
  );
}

/** 한글몬 뒤의 둥근 빛. 단색 원이면 접시처럼 보여서 가운데서 번지게 그린다 */
function GlowDisc({ id, inner, mid }: { id: string; inner: string; mid: string }) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 100 100">
      <Defs>
        <RadialGradient id={id} cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={inner} stopOpacity="0.8" />
          <Stop offset="57%" stopColor={mid} stopOpacity="0.32" />
          <Stop offset="100%" stopColor={mid} stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Rect width="100" height="100" fill={`url(#${id})`} />
    </Svg>
  );
}

function Spark({
  left,
  top,
  size,
  delay,
  color,
  still,
}: {
  left: string;
  top: string;
  size: number;
  delay: number;
  color: string;
  still: boolean;
}) {
  const v = useSharedValue(still ? 0.6 : 0);
  useEffect(() => {
    if (still) return;
    v.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: LOOP_MS, easing: ease }),
          withTiming(0, { duration: LOOP_MS, easing: ease }),
        ),
        -1,
      ),
    );
    return () => cancelAnimation(v);
  }, [still, delay, v]);
  const style = useAnimatedStyle(() => ({
    opacity: 0.15 + v.value * 0.85,
    transform: [{ scale: 0.6 + v.value * 0.5 }, { rotate: `${v.value * 20}deg` }],
  }));
  return (
    <Animated.View
      pointerEvents="none"
      style={[s.spark, { left: left as `${number}%`, top: top as `${number}%` }, style]}
    >
      <Ionicons name="sparkles" size={size} color={color} />
    </Animated.View>
  );
}

const s = StyleSheet.create({
  hero: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minHeight: 196,
    paddingLeft: 24,
    paddingRight: 14,
    paddingBottom: 22,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: "hidden",
    backgroundColor: "#1F1460",
  },
  spark: {
    position: "absolute",
    shadowColor: "#fff",
    shadowOpacity: 0.7,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
  },
  copy: { flex: 1, minWidth: 0 },
  brand: {
    fontSize: 30,
    lineHeight: 32,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 1,
  },
  tags: { flexDirection: "row", alignSelf: "flex-start", marginTop: 10 },
  // 바텀보더처럼 아래로 4px 두꺼운 그림자 — 앱 버튼들과 같은 입체감
  tagShadow: { borderRadius: 10, paddingBottom: 4 },
  tagOver: { position: "absolute", left: 0, top: 0 },
  tag: {
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingTop: 7,
    paddingBottom: 6,
    overflow: "hidden",
  },
  tagText: { fontSize: 22, lineHeight: 24, fontWeight: "900", letterSpacing: 1.5 },
  gloss: {
    position: "absolute",
    top: -6,
    bottom: -6,
    width: 22,
    backgroundColor: "rgba(255,255,255,0.55)",
  },
  subs: { flexDirection: "row", marginTop: 12 },
  sub: {
    width: "100%",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "700",
    color: "rgba(255,255,255,0.88)",
  },
  subOver: { marginLeft: "-100%" },
  glow: { position: "absolute", top: -14, left: -14, right: -14, bottom: -14 },
  floor: { position: "absolute", bottom: -2, height: 14 },
  mascot: { position: "absolute", width: "100%", height: "100%" },
});
