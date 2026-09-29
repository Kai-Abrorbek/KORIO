import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import type { VoiceTutorEmotion } from "../services/voice-tutor.api";

export type MascotState =
  | "idle"
  | "connecting"
  | "listening"
  | "thinking"
  | "speaking"
  | "error";

type Face = "calm" | "happy" | "shocked" | "sly";

/**
 * KORIO 음성 튜터 마스코트 — 둥근 진주빛 몸체 + 어두운 얼굴 화면 + 빛나는 눈.
 *
 * 레퍼런스 영상의 "기계 같은데 표정이 살아 있는" 느낌만 가져왔고, 모양은
 * KORIO 것으로 따로 그렸다 (보라 진주 몸체, 얼굴 화면, 안테나, 볼터치).
 * 이미지 에셋 없이 View + reanimated 로만 그린다 — 크기가 자유롭고 가볍다.
 *
 * 표정은 두 축이다:
 *  - state  : 통화 상태 (듣기 = 눈 크게, 생각 = 위를 봄, 말하기 = 입이 움직임)
 *  - emotion: 선생님 답의 감정 (웃음 = ^ ^, 놀람 = 눈 커지고 입 O, 놀림 = 비스듬한 눈)
 *
 * 입 움직임은 아직 시간 기반이다. 오디오 음량이 들어오면 mouth 값만 그걸로
 * 바꾸면 립싱크가 된다 (훅이 audioAmplitude 를 이미 자리만 잡아 뒀다).
 */
export function TutorMascot({
  state,
  emotion,
  size,
  tint = "#776ee2",
}: {
  state: MascotState;
  emotion?: VoiceTutorEmotion;
  size: number;
  tint?: string;
}) {
  const face = faceFor(state, emotion);

  // ── 몸 전체: 둥실 떠 있고, 말할 땐 조금 더 통통 튄다 ──
  const float = useSharedValue(0);
  useEffect(() => {
    cancelAnimation(float);
    float.value = 0;
    float.value = withRepeat(
      withTiming(1, {
        duration: state === "speaking" ? 900 : 2800,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true,
    );
    return () => cancelAnimation(float);
  }, [float, state]);

  // ── 눈 깜빡임: 3~4초마다 한 번 ──
  const blink = useSharedValue(1);
  useEffect(() => {
    blink.value = withRepeat(
      withSequence(
        withDelay(3200, withTiming(0.12, { duration: 80 })),
        withTiming(1, { duration: 120 }),
        withDelay(260, withTiming(1, { duration: 1 })),
      ),
      -1,
    );
    return () => cancelAnimation(blink);
  }, [blink]);

  // ── 시선: 연결 중엔 두리번, 생각할 땐 위쪽 ──
  const look = useSharedValue(0);
  useEffect(() => {
    cancelAnimation(look);
    if (state === "connecting") {
      look.value = withRepeat(
        withSequence(
          withTiming(-1, { duration: 700, easing: Easing.inOut(Easing.quad) }),
          withTiming(1, { duration: 1100, easing: Easing.inOut(Easing.quad) }),
        ),
        -1,
        true,
      );
    } else {
      look.value = withSpring(0, { damping: 14 });
    }
    return () => cancelAnimation(look);
  }, [look, state]);

  // ── 입: 말하는 동안 벌렸다 오므렸다 (시간 기반 립싱크) ──
  const mouth = useSharedValue(0);
  useEffect(() => {
    cancelAnimation(mouth);
    if (state === "speaking") {
      mouth.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 150 }),
          withTiming(0.35, { duration: 120 }),
          withTiming(0.8, { duration: 170 }),
          withTiming(0.15, { duration: 140 }),
        ),
        -1,
      );
    } else {
      mouth.value = withTiming(0, { duration: 160 });
    }
    return () => cancelAnimation(mouth);
  }, [mouth, state]);

  // ── 표정 전환: 값 하나를 스프링으로 옮긴다 ──
  const eyeOpen = useSharedValue(1); // 눈 세로 크기 배율
  const eyeBig = useSharedValue(1); // 눈 전체 크기 배율
  const eyeUp = useSharedValue(0); // 위를 보는 정도 (생각)
  const happy = useSharedValue(0); // 0 = 동그란 눈, 1 = ^ ^
  const slant = useSharedValue(0); // 놀릴 때 비스듬한 눈
  const halo = useSharedValue(0);
  useEffect(() => {
    const spring = { damping: 13, stiffness: 170 };
    eyeBig.value = withSpring(
      face === "shocked" ? 1.3 : state === "listening" ? 1.12 : state === "connecting" ? 0.82 : 1,
      spring,
    );
    eyeOpen.value = withSpring(
      state === "error" ? 0.22 : state === "thinking" ? 0.72 : face === "sly" ? 0.55 : 1,
      spring,
    );
    eyeUp.value = withSpring(state === "thinking" ? 1 : 0, spring);
    happy.value = withTiming(face === "happy" ? 1 : 0, { duration: 180 });
    slant.value = withSpring(face === "sly" ? 1 : 0, spring);
  }, [eyeBig, eyeOpen, eyeUp, happy, slant, face, state]);

  useEffect(() => {
    cancelAnimation(halo);
    halo.value = 0;
    halo.value = withRepeat(
      withTiming(1, {
        duration: state === "speaking" ? 700 : state === "listening" ? 1600 : 2600,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
    return () => cancelAnimation(halo);
  }, [halo, state]);

  // ── 안테나 불빛: 생각 중엔 깜빡, 평소엔 은은하게 ──
  const bulb = useSharedValue(0.6);
  useEffect(() => {
    cancelAnimation(bulb);
    bulb.value =
      state === "thinking" || state === "connecting"
        ? withRepeat(withTiming(1, { duration: 380 }), -1, true)
        : withTiming(0.7, { duration: 300 });
    return () => cancelAnimation(bulb);
  }, [bulb, state]);

  const W = size;
  const H = size * 0.86;
  const eye = size * 0.13;
  const accent = STATE_ACCENT[state];

  const bodyStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(float.value, [0, 1], [3, -5]) },
      { scale: interpolate(float.value, [0, 1], [1, state === "speaking" ? 1.025 : 1.012]) },
      { rotate: `${state === "listening" ? -3 : 0}deg` },
    ],
  }));

  const haloStyle = useAnimatedStyle(() => ({
    opacity: interpolate(halo.value, [0, 1], [0.12, 0.3]),
    transform: [{ scale: interpolate(halo.value, [0, 1], [0.92, 1.1]) }],
  }));

  const leftEye = useAnimatedStyle(() => ({
    opacity: 1 - happy.value,
    transform: [
      { translateX: look.value * eye * 0.45 + eyeUp.value * eye * 0.3 },
      { translateY: -eyeUp.value * eye * 0.35 },
      { rotate: `${slant.value * -14}deg` },
      { scale: eyeBig.value },
      { scaleY: eyeOpen.value * blink.value },
    ],
  }));
  const rightEye = useAnimatedStyle(() => ({
    opacity: 1 - happy.value,
    transform: [
      { translateX: look.value * eye * 0.45 + eyeUp.value * eye * 0.3 },
      { translateY: -eyeUp.value * eye * 0.35 },
      { rotate: `${slant.value * 14}deg` },
      { scale: eyeBig.value },
      { scaleY: eyeOpen.value * blink.value },
    ],
  }));

  const arcStyle = useAnimatedStyle(() => ({
    opacity: happy.value,
    transform: [{ translateY: interpolate(happy.value, [0, 1], [4, 0]) }],
  }));

  const mouthStyle = useAnimatedStyle(() => {
    const open = face === "shocked" ? 1 : mouth.value;
    return {
      height: interpolate(open, [0, 1], [size * 0.03, size * (face === "shocked" ? 0.1 : 0.075)]),
      width: face === "shocked" ? size * 0.09 : interpolate(open, [0, 1], [size * 0.13, size * 0.11]),
    };
  });

  const bulbStyle = useAnimatedStyle(() => ({ opacity: bulb.value }));

  return (
    <View style={{ width: W * 1.5, height: H * 1.5 + size * 0.14, alignItems: "center", justifyContent: "center" }}>
      {/* 몸 뒤의 빛. 상태 색으로 호흡한다 */}
      <Animated.View
        style={[
          st.halo,
          {
            width: W * 1.32,
            height: W * 1.32,
            borderRadius: W * 0.66,
            backgroundColor: accent,
            shadowColor: accent,
          },
          haloStyle,
        ]}
      />

      <Animated.View style={[{ alignItems: "center" }, bodyStyle]}>
        {/* 안테나 */}
        <View style={{ alignItems: "center", marginBottom: -size * 0.02 }}>
          <Animated.View
            style={[
              st.bulb,
              {
                width: size * 0.09,
                height: size * 0.09,
                borderRadius: size * 0.045,
                backgroundColor: state === "thinking" ? "#FFC24B" : tint,
                shadowColor: state === "thinking" ? "#FFC24B" : tint,
              },
              bulbStyle,
            ]}
          />
          <View style={{ width: size * 0.028, height: size * 0.07, backgroundColor: "#CFC9F4", borderRadius: size * 0.014 }} />
        </View>

        {/* 몸체: 진주빛 라벤더 */}
        <LinearGradient
          colors={["#FFFFFF", "#E4E0FF", "#ABA2F2", "#8278DA"]}
          locations={[0, 0.34, 0.78, 1]}
          start={{ x: 0.15, y: 0.05 }}
          end={{ x: 0.85, y: 1 }}
          style={[
            st.body,
            { width: W, height: H, borderRadius: size * 0.36 },
          ]}
        >
          {/* 윗광택 */}
          <View
            style={{
              position: "absolute",
              top: H * 0.07,
              left: W * 0.13,
              width: W * 0.34,
              height: H * 0.12,
              borderRadius: H * 0.06,
              backgroundColor: "rgba(255,255,255,0.75)",
              transform: [{ rotate: "-12deg" }],
            }}
          />

          {/* 얼굴 화면 */}
          <LinearGradient
            colors={["#2A2550", "#15122B"]}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={{
              width: W * 0.76,
              height: H * 0.5,
              borderRadius: size * 0.2,
              marginTop: H * 0.08,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1.5,
              borderColor: "rgba(255,255,255,0.18)",
            }}
          >
            <View style={{ flexDirection: "row", gap: eye * 1.05, alignItems: "center" }}>
              {([-1, 1] as const).map((side) => (
                <View key={side} style={{ width: eye * 1.4, height: eye * 1.4, alignItems: "center", justifyContent: "center" }}>
                  <Animated.View
                    style={[
                      st.eye,
                      { width: eye, height: eye * 1.18, borderRadius: eye * 0.5 },
                      side === -1 ? leftEye : rightEye,
                    ]}
                  />
                  {/* 웃는 눈 ^ ^ */}
                  <Animated.View
                    style={[
                      st.arc,
                      {
                        width: eye * 1.15,
                        height: eye * 0.62,
                        borderTopLeftRadius: eye * 0.6,
                        borderTopRightRadius: eye * 0.6,
                        borderWidth: eye * 0.24,
                      },
                      arcStyle,
                    ]}
                  />
                </View>
              ))}
            </View>
            <Animated.View style={[st.mouth, { marginTop: size * 0.035, borderRadius: size * 0.05 }, mouthStyle]} />
          </LinearGradient>

          {/* 볼터치 */}
          <View style={[st.cheek, { left: W * 0.1, bottom: H * 0.14, width: W * 0.13, height: H * 0.07, borderRadius: H * 0.035 }]} />
          <View style={[st.cheek, { right: W * 0.1, bottom: H * 0.14, width: W * 0.13, height: H * 0.07, borderRadius: H * 0.035 }]} />
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

/** 상태별 빛 색. 통화 화면 ACCENT 와 같은 규칙 */
const STATE_ACCENT: Record<MascotState, string> = {
  idle: "#9C93FF",
  connecting: "#9C93FF",
  listening: "#5CE08A",
  thinking: "#FFC24B",
  speaking: "#B3A6FF",
  error: "#FF8A73",
};

function faceFor(state: MascotState, emotion?: VoiceTutorEmotion): Face {
  if (state !== "speaking" || !emotion) return "calm";
  if (emotion === "laughing" || emotion === "happy" || emotion === "excited") return "happy";
  if (emotion === "shocked" || emotion === "disbelief" || emotion === "angry") return "shocked";
  if (emotion === "mocking") return "sly";
  return "calm";
}

const st = StyleSheet.create({
  halo: {
    position: "absolute",
    shadowOpacity: 0.9,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 0 },
  },
  bulb: {
    shadowOpacity: 0.9,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  body: {
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.8)",
    shadowColor: "#0B0818",
    shadowOpacity: 0.45,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 14,
  },
  eye: {
    backgroundColor: "#FFE36E",
    shadowColor: "#FFE36E",
    shadowOpacity: 0.95,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  arc: {
    position: "absolute",
    borderColor: "#FFE36E",
    borderBottomWidth: 0,
    backgroundColor: "transparent",
  },
  mouth: {
    backgroundColor: "#FFE36E",
    opacity: 0.9,
  },
  cheek: {
    position: "absolute",
    backgroundColor: "rgba(255,138,170,0.45)",
  },
});
