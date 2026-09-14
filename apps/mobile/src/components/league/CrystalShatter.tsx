import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import Animated, {
  Easing,
  type SharedValue,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import TierCrystal from "./TierCrystal";
import type { TierMeta } from "@/constants/league-tiers";

/**
 * 강등 연출 — 티어 크리스탈이 금이 갔다가 조각으로 깨져 떨어진다.
 *
 * 왜 이렇게까지 하나: 강등은 유저가 **다음 주에 뭘 할지 바꾸게 만드는** 유일한
 * 순간이다. 조용히 티어 이름만 바뀌어 있으면 아무도 눈치채지 못하고, 눈치채면
 * "버그인가" 로 읽는다. 부서지는 걸 직접 보면 다르다.
 *
 * 3단계: ① 흔들림(금 가기 직전의 긴장) → ② 금 → ③ 파편이 사방으로 + 낙하
 */
const SHARDS = [
  // [끝점 x, 끝점 y, 회전(도)] — 가운데에서 바깥으로 흩어지는 방향
  [-1.0, -0.55, -38],
  [-0.45, -0.95, -14],
  [0.42, -0.9, 16],
  [1.05, -0.42, 40],
  [-0.95, 0.35, -64],
  [-0.35, 0.85, -22],
  [0.4, 0.9, 24],
  [1.0, 0.45, 58],
] as const;

/** 금 — 크리스탈 위에 겹치는 얇은 선. viewBox 100×100 기준 */
const CRACKS = [
  "50,6 55,34 46,40 52,52",
  "50,52 70,44 78,22",
  "50,52 34,70 22,76",
  "50,52 66,72 72,92",
] as const;

export default function CrystalShatter({
  tier,
  size = 170,
  onDone,
}: {
  tier: TierMeta;
  size?: number;
  /** 파편이 다 흩어진 뒤 (다음 연출을 이어 붙일 때 쓴다) */
  onDone?: () => void;
}) {
  // 0 → 흔들림, 1 → 금, 2 → 파열
  const shake = useSharedValue(0);
  const crack = useSharedValue(0);
  const burst = useSharedValue(0);

  useEffect(() => {
    // ① 긴장: 좌우로 빠르게 떤다
    shake.value = withSequence(
      withTiming(1, { duration: 60 }),
      withTiming(-1, { duration: 60 }),
      withTiming(1, { duration: 60 }),
      withTiming(-1, { duration: 60 }),
      withTiming(1, { duration: 60 }),
      withTiming(0, { duration: 60 }),
    );
    // ② 금이 번진다
    crack.value = withDelay(360, withTiming(1, { duration: 220 }));
    // ③ 파열
    burst.value = withDelay(
      620,
      withTiming(1, { duration: 900, easing: Easing.out(Easing.quad) }, (done) => {
        if (done && onDone) runOnJS(onDone)();
      }),
    );
  }, [burst, crack, onDone, shake]);

  const bodyStyle = useAnimatedStyle(() => ({
    opacity: 1 - burst.value,
    transform: [
      { translateX: shake.value * 7 },
      { rotate: `${shake.value * 3}deg` },
      { scale: 1 - burst.value * 0.15 },
    ],
  }));

  const crackStyle = useAnimatedStyle(() => ({
    opacity: crack.value * (1 - burst.value),
  }));

  return (
    <View style={{ width: size, height: size }}>
      <Animated.View style={[StyleSheet.absoluteFill, bodyStyle]}>
        <TierCrystal tier={tier} size={size} />
      </Animated.View>

      {/* 금 */}
      <Animated.View
        style={[StyleSheet.absoluteFill, crackStyle]}
        pointerEvents="none"
      >
        <Svg width={size} height={size} viewBox="0 0 100 100">
          {CRACKS.map((points, i) => (
            <Polygon
              key={i}
              points={points}
              fill="none"
              stroke="rgba(255,255,255,0.92)"
              strokeWidth={1.6}
              strokeLinejoin="round"
            />
          ))}
        </Svg>
      </Animated.View>

      {/* 파편 */}
      {SHARDS.map(([dx, dy, rot], i) => (
        <Shard
          key={i}
          progress={burst}
          color={i % 2 === 0 ? tier.color : tier.colorDark}
          size={size}
          dx={dx}
          dy={dy}
          rot={rot}
        />
      ))}
    </View>
  );
}

function Shard({
  progress,
  color,
  size,
  dx,
  dy,
  rot,
}: {
  progress: SharedValue<number>;
  color: string;
  size: number;
  dx: number;
  dy: number;
  rot: number;
}) {
  const shardSize = size * 0.26;
  const style = useAnimatedStyle(() => {
    const p = progress.value;
    return {
      opacity: p === 0 ? 0 : 1 - p,
      transform: [
        { translateX: dx * size * 0.62 * p },
        // 위로 튀었다가 중력으로 떨어진다 — 직선으로 날면 종잇장처럼 보인다
        { translateY: dy * size * 0.5 * p + size * 0.75 * p * p },
        { rotate: `${rot * p * 2.2}deg` },
        { scale: 1 - p * 0.35 },
      ],
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: "absolute",
          left: size / 2 - shardSize / 2,
          top: size / 2 - shardSize / 2,
          width: shardSize,
          height: shardSize,
        },
        style,
      ]}
    >
      <Svg width={shardSize} height={shardSize} viewBox="0 0 100 100">
        <Polygon points="50,0 100,62 18,100" fill={color} opacity={0.95} />
      </Svg>
    </Animated.View>
  );
}
