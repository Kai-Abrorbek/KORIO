import { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import HaneulmonMascot from "@/components/home/HaneulmonMascot";

/** 손을 앞에 모은 수줍은 포즈 — 공손한 인사에 맞다 */
const BOW_POSE = require("../../../assets/images/characters/hangulmon_shy.png");
/** 허리선 (원본 768px 중 592px) — 위는 숙이는 몸통, 아래는 바닥에 붙은 다리 */
const HIP = 592 / 768;

/** 타임라인 (ms) — 콩콩 뛰어온다 → 살짝 젖혔다 숙인다 → 멈춤 → 반동으로 일어난다 → 기뻐한다 */
const HOP_MS = 380;
const HOPS = 3;
const APPROACH_MS = HOP_MS * HOPS;
const BOW_AT = APPROACH_MS + 120;
const WIND_MS = 150;
const DOWN_MS = 480;
const HOLD_MS = 650;
export const BOW_BOTTOM_AT = BOW_AT + WIND_MS + DOWN_MS;
const RISE_AT = BOW_BOTTOM_AT + HOLD_MS;
export const BOW_CHEER_AT = RISE_AT + 420;
/**
 * 숙이는 각도와 내려앉는 깊이(크기 대비). 정면 그림이라 각도만 키우면 45° 부터
 * 납작하게 눌린 공처럼 보인다 — 38° 로 숙이면서 몸통을 다리 쪽으로 내려야 "인사" 로 읽힌다
 * (같은 원근 계산으로 프레임을 그려 비교해 고른 값).
 */
const BOW_DEG = 38;
const BOW_DROP = 0.09;

/**
 * 하늘몬이 걸어 나와 고개 숙여 인사한다.
 *
 * 그림이 한 장(정면)이라 통째로 기울이면 발까지 들려서 넘어지는 것처럼 보였다.
 * 그래서 허리선에서 두 장으로 잘라, 다리는 바닥에 두고 몸통만 허리를 축으로
 * 보는 사람 쪽으로 숙인다 (rotateX 음수 = 위쪽이 화면 앞으로 나온다).
 */
export default function HaneulmonBow({
  size,
  reducedMotion,
}: {
  size: number;
  reducedMotion: boolean;
}) {
  const approach = useSharedValue(reducedMotion ? 1 : 0); // 0 = 카드 위, 1 = 앞으로 다 옴
  const hop = useSharedValue(0); // 한 번 뛸 때마다 0 → 1
  const hopping = useSharedValue(reducedMotion ? 0 : 1);
  const bow = useSharedValue(0); // 0 = 서 있음, 1 = 다 숙임, 음수 = 살짝 젖힘
  const [cheer, setCheer] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reducedMotion) return;
    approach.value = withTiming(1, {
      duration: APPROACH_MS,
      easing: Easing.out(Easing.quad),
    });
    hop.value = withRepeat(
      withTiming(1, { duration: HOP_MS, easing: Easing.linear }),
      HOPS,
      false,
    );
    hopping.value = withDelay(APPROACH_MS, withTiming(0, { duration: 120 }));
    bow.value = withDelay(
      BOW_AT,
      withSequence(
        withTiming(-0.07, {
          duration: WIND_MS,
          easing: Easing.out(Easing.quad),
        }),
        withTiming(1, {
          duration: DOWN_MS,
          easing: Easing.inOut(Easing.cubic),
        }),
        withDelay(
          HOLD_MS,
          withSequence(
            withTiming(-0.1, {
              duration: 340,
              easing: Easing.out(Easing.cubic),
            }),
            withSpring(0, { damping: 10, stiffness: 180 }),
          ),
        ),
      ),
    );
    timer.current = setTimeout(() => setCheer(true), BOW_CHEER_AT);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [reducedMotion, approach, hop, hopping, bow]);

  // 뛰는 동안: 포물선으로 뜨고, 땅에 닿을 때 납작했다가 뜰 때 길쭉해진다
  const moveStyle = useAnimatedStyle(() => {
    const lift = Math.sin(hop.value * Math.PI) * hopping.value;
    const land = Math.pow(1 - Math.sin(hop.value * Math.PI), 6) * hopping.value;
    return {
      transform: [
        { translateY: -150 + approach.value * 150 - lift * 24 },
        { scale: 0.62 + approach.value * 0.5 },
        { scaleY: 1 + lift * 0.05 - land * 0.1 },
        { scaleX: 1 - lift * 0.03 + land * 0.08 },
      ],
    };
  });
  const bodyStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: bow.value * BOW_DROP * size },
      { perspective: size * 4.5 },
      { rotateX: `${-bow.value * BOW_DEG}deg` },
    ],
  }));

  const bodyH = size * HIP;
  // 바닥 그림자는 그림에 들어 있다 (다리 조각과 함께 제자리에 남는다)
  return (
    <Animated.View style={[{ width: size, height: size }, moveStyle]}>
      {cheer ? (
        <HaneulmonMascot size={size} mood="celebrating" />
      ) : (
        <>
          <View
            style={[
              styles.slice,
              { width: size, height: size - bodyH, top: bodyH },
            ]}
          >
            <Image
              source={BOW_POSE}
              style={{ width: size, height: size, top: -bodyH }}
              resizeMode="contain"
              fadeDuration={0}
            />
          </View>
          <Animated.View
            style={[
              styles.slice,
              { width: size, height: bodyH, top: 0, transformOrigin: "bottom" },
              bodyStyle,
            ]}
          >
            <Image
              source={BOW_POSE}
              style={{ width: size, height: size }}
              resizeMode="contain"
              fadeDuration={0}
            />
          </Animated.View>
        </>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  slice: { position: "absolute", left: 0, overflow: "hidden" },
});
