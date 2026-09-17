import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  type ImageSourcePropType,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
  cancelAnimation,
  interpolate,
} from "react-native-reanimated";
import type { TutorState } from "../hooks/useRealtimeTutor";

/**
 * 통화 화면 한가운데 서는 선생님.
 *
 * 아직 선생님 일러스트 에셋이 없다 — 지금은 이모지다. 그래서 이모지를
 * "빠뜨린 자리"처럼 보이지 않게 후광·유리 디스크·광택을 얹어서 하나의
 * 캐릭터 슬롯으로 만든다. 나중에 그림이 나오면 `image` 만 넘기면 된다.
 *
 * 살아 있게 만드는 네 겹:
 *  1) 퍼져나가는 후광 링 — 말이 오가는 중이라는 신호
 *  2) 디스크의 호흡 — 상태마다 속도가 다르다
 *  3) 대각선으로 지나가는 광택 — 멈춰 있어도 죽어 보이지 않게
 *  4) 상태 배지 — 지금 누가 말할 차례인지
 */

/** 상태별 강조색. 들을 땐 초록(네 차례), 말할 땐 보라(브랜드) */
const ACCENT: Record<TutorState, string> = {
  idle: "#9C93FF",
  connecting: "#9C93FF",
  listening: "#5CE08A",
  thinking: "#FFC24B",
  speaking: "#B3A6FF",
  error: "#FF8A73",
};

export function TutorCharacter({
  state,
  avatar,
  color,
  image,
  size = 140,
}: {
  state: TutorState;
  /** 선생님 이모지. 그림이 없을 때 캐릭터를 대신한다 */
  avatar: string;
  /** 선생님 고유색. 디스크 그라데이션에 쓴다 */
  color: string;
  /** 선생님 일러스트가 생기면 이걸로 이모지를 대체한다 */
  image?: ImageSourcePropType;
  size?: number;
}) {
  const speaking = state === "speaking";
  const listening = state === "listening";
  const alive = speaking || listening;
  const accent = ACCENT[state] ?? ACCENT.idle;

  const breath = useSharedValue(0);
  const sheen = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(breath);
    const dur = speaking ? 460 : listening ? 1500 : 1100;
    breath.value = withRepeat(
      withSequence(
        withTiming(1, { duration: dur, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: dur, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
    return () => cancelAnimation(breath);
  }, [state, speaking, listening, breath]);

  // 광택은 쉬었다 한 번씩 지나간다. 계속 돌면 싸구려로 보인다.
  useEffect(() => {
    cancelAnimation(sheen);
    sheen.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 0 }),
        withDelay(
          2200,
          withTiming(1, { duration: 1050, easing: Easing.inOut(Easing.ease) }),
        ),
      ),
      -1,
      false,
    );
    return () => cancelAnimation(sheen);
  }, [sheen]);

  const discStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(breath.value, [0, 1], [1, speaking ? 1.045 : 1.02]) },
      { translateY: interpolate(breath.value, [0, 1], [0, speaking ? -3 : -1.5]) },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(breath.value, [0, 1], [alive ? 0.45 : 0.22, alive ? 0.8 : 0.34]),
    transform: [{ scale: interpolate(breath.value, [0, 1], [1, 1.07]) }],
  }));

  const sheenStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(sheen.value, [0, 1], [-size * 0.95, size * 0.95]) },
      { rotate: "22deg" },
    ],
    opacity: interpolate(sheen.value, [0, 0.25, 0.75, 1], [0, 0.5, 0.5, 0]),
  }));

  const disc = size;
  const halo = size * 1.42;

  return (
    <View style={[st.wrap, { width: halo, height: halo }]}>
      {/* 1) 퍼져나가는 후광 */}
      <Ring size={halo} delay={0} active={alive} color={accent} />
      <Ring size={halo} delay={740} active={alive} color={accent} />
      <Ring size={halo} delay={1480} active={alive} color={accent} />

      {/* 은은하게 깔리는 빛. 후광 링과 디스크 사이를 메운다 */}
      <Animated.View
        pointerEvents="none"
        style={[
          st.glow,
          {
            width: disc * 1.24,
            height: disc * 1.24,
            borderRadius: (disc * 1.24) / 2,
            backgroundColor: accent,
          },
          glowStyle,
        ]}
      />

      {/* 2) 캐릭터 디스크 */}
      <Animated.View
        style={[
          st.disc,
          {
            width: disc,
            height: disc,
            borderRadius: disc / 2,
            shadowColor: accent,
          },
          discStyle,
        ]}
      >
        <LinearGradient
          colors={[withAlpha(color, 0.92), withAlpha(color, 0.55), "#1B1730"]}
          start={{ x: 0.15, y: 0 }}
          end={{ x: 0.85, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        {/* 위쪽 유리 반사 */}
        <LinearGradient
          colors={["rgba(255,255,255,0.42)", "rgba(255,255,255,0.04)", "transparent"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.62 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />

        {image ? (
          <Image source={image} style={st.portrait} resizeMode="contain" />
        ) : (
          <Text style={[st.emoji, { fontSize: disc * 0.46 }]}>{avatar}</Text>
        )}

        {/* 3) 지나가는 광택 */}
        <Animated.View
          pointerEvents="none"
          style={[st.sheen, { height: halo, width: size * 0.22 }, sheenStyle]}
        >
          <LinearGradient
            colors={["transparent", "rgba(255,255,255,0.55)", "transparent"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        {/* 테두리는 그라데이션 위에 따로 올린다 — 유리 느낌의 핵심 */}
        <View
          pointerEvents="none"
          style={[st.rim, { borderRadius: disc / 2, borderColor: withAlpha(accent, 0.55) }]}
        />
      </Animated.View>

      {/* 4) 지금 누구 차례인지 */}
      {alive && (
        <View style={[st.badge, { backgroundColor: withAlpha(accent, 0.18), borderColor: withAlpha(accent, 0.5) }]}>
          <Bars color={accent} speaking={speaking} />
        </View>
      )}
    </View>
  );
}

/** 바깥으로 퍼지며 사라지는 링 하나 */
function Ring({
  size,
  delay,
  active,
  color,
}: {
  size: number;
  delay: number;
  active: boolean;
  color: string;
}) {
  const p = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(p);
    if (!active) {
      p.value = withTiming(0, { duration: 240 });
      return;
    }
    p.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration: 2250, easing: Easing.out(Easing.quad) }),
        -1,
        false,
      ),
    );
    return () => cancelAnimation(p);
  }, [active, delay, p]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(p.value, [0, 1], [0.7, 1.0]) }],
    opacity: interpolate(p.value, [0, 0.14, 1], [0, 0.42, 0]),
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        st.ring,
        { width: size, height: size, borderRadius: size / 2, borderColor: color },
        style,
      ]}
    />
  );
}

/** 말하는 중 파형. 듣는 중엔 천천히 숨만 쉰다 */
function Bars({ color, speaking }: { color: string; speaking: boolean }) {
  return (
    <View style={st.bars}>
      {[0, 1, 2, 3].map((i) => (
        <Bar key={i} index={i} color={color} speaking={speaking} />
      ))}
    </View>
  );
}

function Bar({
  index,
  color,
  speaking,
}: {
  index: number;
  color: string;
  speaking: boolean;
}) {
  const v = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(v);
    // 막대마다 주기를 어긋나게 둔다. 같은 박자로 뛰면 기계처럼 보인다.
    const dur = speaking ? 240 + index * 57 : 760 + index * 91;
    v.value = withDelay(
      index * 60,
      withRepeat(
        withSequence(
          withTiming(1, { duration: dur, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: dur, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      ),
    );
    return () => cancelAnimation(v);
  }, [speaking, index, v]);

  const style = useAnimatedStyle(() => ({
    height: interpolate(v.value, [0, 1], speaking ? [5, 15] : [4, 8]),
  }));

  return <Animated.View style={[st.bar, { backgroundColor: color }, style]} />;
}

/** #RRGGBB + 투명도. 선생님 색이 어떤 값이든 같은 규칙으로 섞이게 한다 */
function withAlpha(hex: string, a: number): string {
  const h = hex.replace("#", "");
  if (h.length !== 6) return hex;
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

const st = StyleSheet.create({
  wrap: { alignItems: "center", justifyContent: "center" },
  ring: { position: "absolute", borderWidth: 1.5 },
  glow: { position: "absolute" },
  disc: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.55,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 12 },
    elevation: 14,
  },
  rim: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderWidth: 1.5 },
  portrait: { width: "88%", height: "88%" },
  emoji: { textAlign: "center", includeFontPadding: false },
  sheen: { position: "absolute", top: -20 },
  badge: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 26,
  },
  bars: { flexDirection: "row", alignItems: "center", gap: 3, height: 16 },
  bar: { width: 3, borderRadius: 2 },
});
