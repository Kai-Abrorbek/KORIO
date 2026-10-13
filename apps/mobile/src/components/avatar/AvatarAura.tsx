import { useEffect, type ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, Defs, Path, RadialGradient, Stop } from "react-native-svg";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";

/**
 * 오라 — 캐릭터 주위의 움직이는 효과 (보석으로 산다, api cosmetics). 텔레그램 avatar-aura 와 같다.
 *
 * 그림이 아니라 코드로 그린다: 입자(View) + reanimated. 아바타를 감싸서
 * 뒤 층(빛·불꽃 혀·뒤로 도는 글자) → 아바타 → 앞 층(눈·꽃잎·반짝이) 순으로 쌓는다.
 * 자리·크기는 전부 상자(size) 비율이라 어느 크기에 그려도 모양이 같다.
 *
 * - AvatarAura: 전신 아바타 (에디터·프로필·친구 프로필·홈)
 * - AuraRing: 동그란 얼굴 아바타 (리그·친구 목록) — 도는 빛 테두리 + 반짝이 셋
 */
export type AuraId =
  | "aura_none"
  | "aura_stardust"
  | "aura_snow"
  | "aura_blossom"
  | "aura_flame"
  | "aura_hangul";
export type AuraRarity = "common" | "rare" | "epic" | "legendary";
type PaidAura = Exclude<AuraId, "aura_none">;

export const AURA_ORDER: PaidAura[] = [
  "aura_stardust",
  "aura_snow",
  "aura_blossom",
  "aura_flame",
  "aura_hangul",
];

export const AURA_LOOK: Record<PaidAura, { color: string; ring: [string, string, string, string]; rarity: AuraRarity }> = {
  aura_stardust: { color: "#FFC83D", ring: ["#FFC83D", "#FFF3B0", "#FFB020", "#FFE08A"], rarity: "common" },
  aura_snow: { color: "#8FD3FF", ring: ["#8FD3FF", "#FFFFFF", "#5DB8F5", "#CDEBFF"], rarity: "common" },
  aura_blossom: { color: "#FF8FB3", ring: ["#FF8FB3", "#FFE0EA", "#FF6F9F", "#FFC2D6"], rarity: "rare" },
  aura_flame: { color: "#FF7A00", ring: ["#FF4B1F", "#FFC83D", "#FF7A00", "#FFE08A"], rarity: "epic" },
  aura_hangul: { color: "#8B7FF0", ring: ["#776EE2", "#FFD45C", "#B48CF5", "#FFE27A"], rarity: "legendary" },
};

export const RARITY_COLOR: Record<AuraRarity, string> = {
  common: "#8C8CA1",
  rare: "#1899D6",
  epic: "#A946DA",
  legendary: "#E2A83A",
};

export const isAura = (value: unknown): value is PaidAura =>
  typeof value === "string" && value in AURA_LOOK;

/* ── 입자 배치 (텔레그램과 같은 값) ── */
const SPARKS: [x: number, y: number, size: number, delay: number][] = [
  [14, 18, 6.5, 0], [84, 13, 5, 0.6], [91, 44, 4.2, 1.2], [7, 52, 4.6, 0.3], [79, 71, 6, 0.9],
  [19, 82, 4.2, 1.5], [61, 5, 3.8, 1.1], [35, 9, 3.4, 1.8], [92, 83, 3.8, 0.45], [5, 30, 3.4, 1.35],
];
const FLAKES: [x: number, size: number, dur: number, delay: number][] = [
  [6, 2.6, 6.2, 0.2], [14, 3.6, 5.1, 2.4], [22, 2.2, 7.0, 4.1], [31, 3.0, 5.6, 1.0], [40, 2.4, 6.6, 3.3],
  [48, 3.4, 5.3, 5.2], [57, 2.2, 7.2, 0.6], [65, 3.2, 5.8, 2.9], [73, 2.6, 6.4, 4.6], [81, 3.8, 5.0, 1.7],
  [89, 2.4, 6.9, 3.8], [95, 3.0, 5.5, 0.9],
];
const PETALS: [x: number, size: number, dur: number, delay: number, spin: number][] = [
  [8, 5.2, 7.2, 0.4, 3.2], [18, 4.2, 8.4, 3.1, 4.4], [30, 5.6, 6.8, 5.6, 3.6], [44, 4.4, 8.0, 1.6, 5.0],
  [57, 5.0, 7.6, 4.4, 3.0], [68, 4.0, 8.8, 0.9, 4.8], [79, 5.4, 7.0, 2.7, 3.4], [91, 4.6, 8.2, 6.2, 4.2],
  [36, 3.6, 9.0, 7.0, 5.4],
];
const EMBERS: [x: number, size: number, dur: number, delay: number, color: string][] = [
  [20, 3.6, 2.2, 0.0, "#FFC83D"], [28, 2.8, 1.8, 0.7, "#FF7A00"], [36, 4.2, 2.6, 1.3, "#FF4B1F"],
  [44, 3.0, 2.0, 0.4, "#FFC83D"], [52, 3.8, 2.4, 1.0, "#FF7A00"], [60, 2.6, 1.9, 1.6, "#FFC83D"],
  [68, 4.0, 2.5, 0.2, "#FF4B1F"], [76, 3.0, 2.1, 0.9, "#FF7A00"], [82, 2.6, 2.3, 1.8, "#FFC83D"],
];
const TONGUES: [x: number, w: number, h: number, dur: number, delay: number][] = [
  [22, 15, 40, 0.9, 0.1], [31, 18, 58, 1.1, 0.5], [41, 16, 46, 0.8, 0.3], [50, 20, 34, 1.0, 0.7],
  [59, 16, 48, 0.85, 0.2], [69, 18, 60, 1.05, 0.6], [78, 15, 42, 0.95, 0.4],
];
const LETTERS = ["한", "글", "ㄱ", "ㅏ", "ㅎ", "ㄴ"];
const ORBIT_MS = 7000;

type Ease = "linear" | "inOut" | "out";
const EASE = {
  linear: Easing.linear,
  inOut: Easing.inOut(Easing.quad),
  out: Easing.out(Easing.quad),
} as const;

/** 반복 진행값 0→1. phase(0~1) 만큼 이미 진행된 상태로 시작한다 (모두 동시에 출발하지 않게) */
function useLoop(durationMs: number, phase: number, still: boolean, ease: Ease = "linear") {
  const v = useSharedValue(still ? 0.5 : phase % 1);
  useEffect(() => {
    if (still) return;
    const easing = EASE[ease];
    const start = phase % 1;
    v.value = start;
    v.value = withSequence(
      withTiming(1, { duration: Math.max(1, (1 - start) * durationMs), easing }),
      withRepeat(
        withSequence(withTiming(0, { duration: 0 }), withTiming(1, { duration: durationMs, easing })),
        -1,
      ),
    );
  }, [v, durationMs, phase, still, ease]);
  return v;
}

/** 왔다 갔다 (-1 ↔ 1) */
function useSwing(durationMs: number, delayMs: number, still: boolean) {
  const v = useSharedValue(0);
  useEffect(() => {
    if (still) return;
    v.value = withDelay(
      delayMs,
      withRepeat(withTiming(1, { duration: durationMs, easing: Easing.inOut(Easing.sin) }), -1, true),
    );
  }, [v, durationMs, delayMs, still]);
  return v;
}

export default function AvatarAura({
  aura,
  size,
  children,
  lite = false,
}: {
  aura?: string | null;
  size: number;
  children: ReactNode;
  /** 카드처럼 여러 개가 한 화면에 있을 때 — 입자를 반만 */
  lite?: boolean;
}) {
  const still = useReducedMotion();
  if (!isAura(aura)) return <>{children}</>;
  const look = AURA_LOOK[aura];
  const take = <T,>(list: T[]) => (lite ? list.filter((_, i) => i % 2 === 0) : list);

  return (
    <View style={{ width: size, height: size }}>
      {/* 뒤 */}
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <Glow aura={aura} color={look.color} size={size} still={still} />
        {aura === "aura_flame" &&
          TONGUES.map((t, i) => <Tongue key={i} spec={t} size={size} still={still} />)}
        {aura === "aura_hangul" &&
          LETTERS.map((l, i) => (
            <OrbitLetter key={i} letter={l} index={i} size={size} still={still} layer="back" />
          ))}
      </View>

      {children}

      {/* 앞 */}
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        {aura === "aura_hangul" &&
          LETTERS.map((l, i) => (
            <OrbitLetter key={i} letter={l} index={i} size={size} still={still} layer="front" />
          ))}
        {(aura === "aura_stardust" || aura === "aura_hangul") &&
          take(aura === "aura_hangul" ? SPARKS.filter((_, i) => i % 2 === 0) : SPARKS).map((s, i) => (
            <Spark key={i} spec={s} size={size} color={look.color} still={still} />
          ))}
        {aura === "aura_snow" && take(FLAKES).map((f, i) => <Flake key={i} spec={f} size={size} still={still} />)}
        {aura === "aura_blossom" && take(PETALS).map((p, i) => <Petal key={i} spec={p} size={size} still={still} />)}
        {aura === "aura_flame" && take(EMBERS).map((e, i) => <Ember key={i} spec={e} size={size} still={still} />)}
      </View>
    </View>
  );
}

/* ── 뒤의 빛 ── */
function Glow({ aura, color, size, still }: { aura: PaidAura; color: string; size: number; still: boolean }) {
  const v = useSwing(aura === "aura_flame" ? 700 : 1600, 0, still);
  const style = useAnimatedStyle(() => ({
    opacity: 0.75 + 0.25 * v.value,
    transform: [{ scale: 0.96 + 0.08 * v.value }],
  }));
  const cy = aura === "aura_flame" ? "64%" : "52%";
  return (
    <Animated.View style={[StyleSheet.absoluteFill, style]}>
      <Svg width={size} height={size}>
        <Defs>
          <RadialGradient id={`g_${aura}`} cx="50%" cy={cy} r="50%">
            <Stop offset="0" stopColor={color} stopOpacity={aura === "aura_flame" ? 0.6 : 0.5} />
            <Stop offset="0.7" stopColor={color} stopOpacity={0.12} />
            <Stop offset="1" stopColor={color} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Circle cx={size / 2} cy={size * (aura === "aura_flame" ? 0.64 : 0.52)} r={size * 0.48} fill={`url(#g_${aura})`} />
      </Svg>
    </Animated.View>
  );
}

/* ── 반짝이 ── */
function Spark({ spec, size, color, still }: { spec: (typeof SPARKS)[number]; size: number; color: string; still: boolean }) {
  const [x, y, s, delay] = spec;
  const w = (s * 1.7 * size) / 100;
  const v = useLoop(2200, delay / 2.2, still, "inOut");
  const style = useAnimatedStyle(() => {
    const t = v.value;
    const k = t < 0.45 ? t / 0.45 : t < 0.7 ? 1 - ((t - 0.45) / 0.25) * 0.25 : 0.75 * (1 - (t - 0.7) / 0.3);
    return {
      opacity: still ? 1 : k,
      transform: [{ scale: still ? 1 : 0.2 + 0.8 * k }, { rotate: `${t * 70}deg` }],
    };
  });
  return (
    <Animated.View
      style={[{ position: "absolute", left: (x * size) / 100 - w / 2, top: (y * size) / 100 - w / 2, width: w, height: w }, style]}
    >
      <Svg width={w} height={w} viewBox="0 0 100 100">
        <Path d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z" fill={color} />
        <Circle cx="50" cy="50" r="13" fill="#FFFFFF" />
      </Svg>
    </Animated.View>
  );
}

/* ── 눈송이 ── */
function Flake({ spec, size, still }: { spec: (typeof FLAKES)[number]; size: number; still: boolean }) {
  const [x, s, dur, delay] = spec;
  const w = Math.max(3, (s * 1.3 * size) / 100);
  const fall = useLoop(dur * 1000, delay / dur, still);
  const sway = useSwing(1600 + (x % 3) * 500, 0, still);
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(fall.value, [0, 1], [-0.08 * size, 1.04 * size]) },
      { translateX: 5 * (sway.value * 2 - 1) },
    ],
  }));
  return (
    <Animated.View style={[{ position: "absolute", left: (x * size) / 100 - w, top: 0 }, style]}>
      <View style={{ width: w * 2, height: w * 2, borderRadius: w, backgroundColor: "rgba(143,211,255,0.35)", alignItems: "center", justifyContent: "center" }}>
        <View style={{ width: w, height: w, borderRadius: w / 2, backgroundColor: "#FFFFFF" }} />
      </View>
    </Animated.View>
  );
}

/* ── 꽃잎 ── */
function Petal({ spec, size, still }: { spec: (typeof PETALS)[number]; size: number; still: boolean }) {
  const [x, s, dur, delay, spin] = spec;
  const w = Math.max(5, (s * size) / 100);
  const fall = useLoop(dur * 1000, delay / dur, still);
  const turn = useLoop(spin * 1000, delay / spin, still);
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(fall.value, [0, 1], [-0.08 * size, 1.04 * size]) },
      { translateX: interpolate(fall.value, [0, 1], [-0.03 * size, 0.06 * size]) + 6 * Math.sin(turn.value * Math.PI * 2) },
      { rotate: `${turn.value * 360}deg` },
    ],
  }));
  return (
    <Animated.View style={[{ position: "absolute", left: (x * size) / 100 - w / 2, top: 0 }, style]}>
      <LinearGradient
        colors={["#FFE0EA", "#FF8FB3", "#FF6F9F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ width: w, height: w, borderTopRightRadius: w * 0.72, borderBottomLeftRadius: w * 0.72 }}
      />
    </Animated.View>
  );
}

/* ── 불씨 ── */
function Ember({ spec, size, still }: { spec: (typeof EMBERS)[number]; size: number; still: boolean }) {
  const [x, s, dur, delay, color] = spec;
  const w = Math.max(4, (s * 1.5 * size) / 100);
  const v = useLoop(dur * 1000, delay / dur, still, "out");
  const style = useAnimatedStyle(() => {
    const t = v.value;
    return {
      opacity: still ? 0.9 : t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85,
      transform: [{ translateY: -0.58 * size * t }, { scale: 1 - 0.75 * t }],
    };
  });
  return (
    <Animated.View
      style={[{ position: "absolute", left: (x * size) / 100 - w / 2, top: 0.88 * size - w / 2, width: w, height: w, borderRadius: w / 2, backgroundColor: color, alignItems: "center", justifyContent: "center" }, style]}
    >
      <View style={{ width: w * 0.4, height: w * 0.4, borderRadius: w, backgroundColor: "#FFF6D0" }} />
    </Animated.View>
  );
}

/* ── 불꽃 혀 (캐릭터 뒤) ── */
function Tongue({ spec, size, still }: { spec: (typeof TONGUES)[number]; size: number; still: boolean }) {
  const [x, wP, hP, dur, delay] = spec;
  const w = (wP * size) / 100;
  const h = (hP * size) / 100;
  const v = useSwing(dur * 1000, delay * 1000, still);
  const style = useAnimatedStyle(() => ({
    transform: [
      { scaleX: 0.9 + 0.15 * v.value },
      { scaleY: 0.82 + 0.26 * v.value },
      { skewX: `${-4 + 9 * v.value}deg` },
    ],
  }));
  return (
    <Animated.View
      style={[{ position: "absolute", left: (x * size) / 100 - w / 2, bottom: 0.06 * size, width: w, height: h, opacity: 0.9, transformOrigin: "50% 100%" }, style]}
    >
      <LinearGradient
        colors={["rgba(255,236,160,0)", "#FFC83D", "#FF7A00", "#FF4B1F"]}
        locations={[0, 0.25, 0.6, 1]}
        style={{ flex: 1, borderTopLeftRadius: w / 2, borderTopRightRadius: w / 2, borderBottomLeftRadius: w * 0.46, borderBottomRightRadius: w * 0.46 }}
      />
    </Animated.View>
  );
}

/* ── 한글 궤도 — 앞으로 올 땐 크게·아바타 위로, 뒤로 갈 땐 작게·아바타 아래로 ── */
function OrbitLetter({
  letter,
  index,
  size,
  still,
  layer,
}: {
  letter: string;
  index: number;
  size: number;
  still: boolean;
  layer: "back" | "front";
}) {
  const v = useLoop(ORBIT_MS, index / LETTERS.length, still);
  return <OrbitGlyph letter={letter} v={v} size={size} layer={layer} />;
}

function OrbitGlyph({ letter, v, size, layer }: { letter: string; v: SharedValue<number>; size: number; layer: "back" | "front" }) {
  const fontSize = size * 0.11;
  const style = useAnimatedStyle(() => {
    const a = v.value * Math.PI * 2;
    const depth = Math.sin(a); // -1 뒤 … 1 앞
    const front = depth >= 0;
    return {
      opacity: (layer === "front") === front ? 0.5 + 0.5 * ((depth + 1) / 2) : 0,
      transform: [
        { translateX: Math.cos(a) * size * 0.44 },
        { translateY: depth * size * 0.06 },
        { scale: 0.72 + 0.4 * ((depth + 1) / 2) },
      ],
    };
  });
  return (
    <Animated.View
      style={[{ position: "absolute", left: size / 2 - fontSize, top: size * 0.58 - fontSize, width: fontSize * 2, height: fontSize * 2, alignItems: "center", justifyContent: "center" }, style]}
    >
      <Text
        style={{
          fontSize,
          fontWeight: "900",
          color: "#FFE27A",
          textShadowColor: "#4C3FC0",
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 4,
        }}
      >
        {letter}
      </Text>
    </Animated.View>
  );
}

/**
 * 동그란 얼굴 아바타(리그·친구 목록)용 — 도는 빛 테두리 + 반짝이 셋.
 * 부모(아바타 크기 상자) 위에 겹쳐 놓는다.
 */
export function AuraRing({ aura, size }: { aura?: string | null; size: number }) {
  const still = useReducedMotion();
  const spin = useLoop(3600, 0, still);
  const ringStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${spin.value * 360}deg` }] }));
  if (!isAura(aura)) return null;
  const look = AURA_LOOK[aura];
  const pad = 3;
  return (
    <View pointerEvents="none" style={{ position: "absolute", left: -pad, top: -pad, width: size + pad * 2, height: size + pad * 2 }}>
      <Animated.View
        style={[
          {
            width: size + pad * 2,
            height: size + pad * 2,
            borderRadius: size,
            borderWidth: 2.5,
            borderTopColor: look.ring[0],
            borderRightColor: look.ring[1],
            borderBottomColor: look.ring[2],
            borderLeftColor: look.ring[3],
            shadowColor: look.color,
            shadowOpacity: 0.7,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 0 },
          },
          ringStyle,
        ]}
      />
      {[
        [88, 10, 0],
        [6, 72, 0.7],
        [94, 80, 1.4],
      ].map(([x, y, d], i) => (
        <Spark
          key={i}
          spec={[x, y, Math.max(14, 300 / (size + pad * 2)), d]}
          size={size + pad * 2}
          color={look.color}
          still={still}
        />
      ))}
    </View>
  );
}
