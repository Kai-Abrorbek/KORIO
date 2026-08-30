import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  cancelAnimation,
  interpolate,
  interpolateColor,
} from "react-native-reanimated";
import type { TutorState } from "../hooks/useRealtimeTutor";

const ORB = 168;
const RING = ORB + 8;

/** 상태별 색. 말할 땐 보라(우리 브랜드), 들을 땐 초록(네 차례) */
const PALETTE: Record<string, [string, string, string]> = {
  idle: ["#C9C4E8", "#A8A2CF", "#8B85B8"],
  connecting: ["#B9B2E8", "#9089D8", "#6F68C0"],
  listening: ["#8FE3AC", "#58CC02", "#3B9E00"],
  thinking: ["#FFD98A", "#FFB020", "#E08900"],
  speaking: ["#B3A6FF", "#776ee2", "#4F41C4"],
  error: ["#F5A79A", "#E5533D", "#B8341F"],
};

/**
 * 대화 상태를 보여주는 구.
 *
 * 자막이 있어도 소리가 나는 동안 화면이 죽어 있으면 통화하는 느낌이 안 난다.
 * 세 겹으로 살아 있게 만든다:
 *  1) 퍼져나가는 링 — 말이 오가는 중이라는 신호
 *  2) 구 자체의 호흡 — 상태마다 속도가 다르다
 *  3) 파형 막대 — 지금 누가 말하는지
 */
export function TutorOrb({ state }: { state: TutorState }) {
  const active = state === "listening" || state === "speaking";
  const speaking = state === "speaking";

  const breath = useSharedValue(0);
  const hue = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(breath);
    const dur = speaking ? 520 : state === "listening" ? 1500 : 900;
    breath.value = withRepeat(
      withSequence(
        withTiming(1, { duration: dur, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: dur, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, [state, speaking, breath]);

  // 색이 은은하게 흐르게 — 정지 화면처럼 안 보이게
  useEffect(() => {
    cancelAnimation(hue);
    hue.value = withRepeat(
      withTiming(1, { duration: 3800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [hue]);

  const colors = PALETTE[state] ?? PALETTE.idle;

  const orbStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(breath.value, [0, 1], [1, speaking ? 1.1 : 1.05]) }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(breath.value, [0, 1], [0.25, 0.55]),
    backgroundColor: interpolateColor(hue.value, [0, 1], [colors[1], colors[0]]),
    transform: [{ scale: interpolate(breath.value, [0, 1], [1.15, 1.35]) }],
  }));

  return (
    <View style={s.wrap}>
      {[0, 1, 2].map((i) => (
        <PulseRing
          key={i}
          index={i}
          active={active}
          speaking={speaking}
          color={colors[1]}
        />
      ))}
      <Animated.View style={[s.glow, glowStyle]} />
      <Animated.View style={orbStyle}>
        <LinearGradient
          colors={colors}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={s.orb}
        >
          {active ? (
            <Wave speaking={speaking} />
          ) : (
            <Ionicons
              name={
                state === "connecting"
                  ? "ellipsis-horizontal"
                  : state === "error"
                    ? "alert"
                    : "chatbubble-ellipses"
              }
              size={44}
              color="#fff"
            />
          )}
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

/**
 * 밖으로 퍼져나가는 링 하나.
 *
 * 훅을 부르는 함수를 map 안에서 호출하면 훅 규칙을 어기게 되므로
 * 링 하나를 컴포넌트로 둔다. 셋을 시차를 두고 돌려 끊김 없이 이어진다.
 */
function PulseRing({
  index,
  active,
  speaking,
  color,
}: {
  index: number;
  active: boolean;
  speaking: boolean;
  color: string;
}) {
  const v = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(v);
    if (!active) {
      v.value = 0;
      return;
    }
    const period = speaking ? 1400 : 2200;
    v.value = 0;
    v.value = withDelay(
      (period / 3) * index,
      withRepeat(
        withTiming(1, { duration: period, easing: Easing.out(Easing.ease) }),
        -1,
        false,
      ),
    );
  }, [active, speaking, index, v]);

  const style = useAnimatedStyle(() => ({
    opacity: interpolate(v.value, [0, 0.15, 1], [0, 0.45, 0]),
    transform: [{ scale: interpolate(v.value, [0, 1], [0.95, 2.1]) }],
  }));

  return <Animated.View style={[s.ring, { borderColor: color }, style]} />;
}

/** 구 안쪽 파형. 말할 땐 빠르고 크게, 들을 땐 잔잔하게 */
function Wave({ speaking }: { speaking: boolean }) {
  const bars = [0, 1, 2, 3, 4];
  return (
    <View style={s.wave}>
      {bars.map((i) => (
        <WaveBar key={i} index={i} speaking={speaking} />
      ))}
    </View>
  );
}

function WaveBar({ index, speaking }: { index: number; speaking: boolean }) {
  const v = useSharedValue(0.3);
  useEffect(() => {
    cancelAnimation(v);
    // 막대마다 주기를 살짝 다르게 줘야 기계적으로 안 보인다
    const dur = (speaking ? 260 : 620) + index * (speaking ? 45 : 90);
    v.value = withDelay(
      index * 60,
      withRepeat(
        withSequence(
          withTiming(1, { duration: dur, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.28, { duration: dur, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      ),
    );
  }, [speaking, index, v]);

  const style = useAnimatedStyle(() => ({
    height: interpolate(v.value, [0, 1], [10, speaking ? 54 : 30]),
  }));

  return <Animated.View style={[s.bar, style]} />;
}

const s = StyleSheet.create({
  wrap: { width: RING * 2.2, height: RING * 2.2, alignItems: "center", justifyContent: "center" },
  ring: {
    position: "absolute",
    width: RING,
    height: RING,
    borderRadius: RING / 2,
    borderWidth: 2,
  },
  glow: {
    position: "absolute",
    width: ORB,
    height: ORB,
    borderRadius: ORB / 2,
  },
  orb: {
    width: ORB,
    height: ORB,
    borderRadius: ORB / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  wave: { flexDirection: "row", alignItems: "center", gap: 7, height: 58 },
  bar: { width: 7, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.95)" },
});
