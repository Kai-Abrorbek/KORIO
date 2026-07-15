import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
  withDelay,
  withRepeat,
  Easing,
  interpolate,
  runOnJS,
} from "react-native-reanimated";

type Grade = "wood" | "silver" | "gold";

const GRADE: Record<Grade, any> = {
  wood: {
    frame: "#F4B26A",
    frameDark: "#E89E54",
    wood: "#C97A2E",
    stripe: "#A8631F",
    lock: "#F4D9B0",
    lockIn: "#E8C58E",
    glow: "#FFD98A",
    glowStrong: "#FFB74D",
  },
  silver: {
    frame: "#E4EAF1",
    frameDark: "#C2CCD8",
    wood: "#9AA6B2",
    stripe: "#7E8A98",
    lock: "#F2F6FB",
    lockIn: "#D4DEEA",
    glow: "#EAF2FF",
    glowStrong: "#B9D3F0",
  },
  gold: {
    frame: "#FFD95A",
    frameDark: "#F0B400",
    wood: "#E0A400",
    stripe: "#B98600",
    lock: "#FFF0B0",
    lockIn: "#FFE07A",
    glow: "#FFEC8A",
    glowStrong: "#FFC93C",
  },
};

const CHEST_W = 200,
  CHEST_H = 160,
  LID_H = 70,
  BASE_H = 90;
const RAY_COUNT = 12;
const PARTICLE_COUNT = 16;

export interface ChestHandle {
  dropIn: () => void;
  shake: (intensity: number) => void;
  open: (onDone: () => void) => void;
}

const Chest = forwardRef<ChestHandle, { grade?: Grade }>(
  ({ grade = "wood" }, ref) => {
    const G = GRADE[grade];
    const [bursting, setBursting] = useState(false);

    const containerY = useSharedValue(-600);
    const containerRotate = useSharedValue(0);
    const containerScaleX = useSharedValue(1);
    const containerScaleY = useSharedValue(1);

    const lidY = useSharedValue(0);
    const lidRotate = useSharedValue(0);
    const lidOpacity = useSharedValue(1);

    const lockScale = useSharedValue(1);
    const lockOpacity = useSharedValue(1);

    // 연출 레이어
    const idleGlow = useSharedValue(0.35); // 대기 시 은은한 글로우 (기대감)
    const rayOpacity = useSharedValue(0);
    const rayScale = useSharedValue(0.3);
    const rayRotate = useSharedValue(0);
    const flashScale = useSharedValue(0);
    const flashOpacity = useSharedValue(0);
    const shimmer = useSharedValue(-1);

    // 대기 글로우 펄스 + shimmer 루프
    useEffect(() => {
      idleGlow.value = withRepeat(
        withSequence(
          withTiming(0.55, { duration: 900 }),
          withTiming(0.3, { duration: 900 }),
        ),
        -1,
      );
      shimmer.value = withRepeat(
        withDelay(1200, withTiming(1.5, { duration: 900 })),
        -1,
      );
    }, []);

    useImperativeHandle(ref, () => ({
      dropIn: () => {
        containerY.value = withSequence(
          withTiming(0, { duration: 500, easing: Easing.in(Easing.cubic) }),
          withSpring(0, { damping: 7, stiffness: 200 }),
        );
        containerScaleY.value = withSequence(
          withTiming(1, { duration: 500 }),
          withTiming(0.75, { duration: 80 }),
          withSpring(1, { damping: 6, stiffness: 220 }),
        );
        containerScaleX.value = withSequence(
          withTiming(1, { duration: 500 }),
          withTiming(1.25, { duration: 80 }),
          withSpring(1, { damping: 6, stiffness: 220 }),
        );
      },

      shake: (intensity = 1) => {
        const angle = 5 + intensity * 4,
          dur = 70;
        containerRotate.value = withSequence(
          withTiming(-angle, { duration: dur }),
          withTiming(angle, { duration: dur }),
          withTiming(-angle * 0.7, { duration: dur }),
          withTiming(angle * 0.5, { duration: dur }),
          withTiming(0, { duration: dur }),
        );
        lidY.value = withSequence(
          withTiming(-6 - intensity * 3, { duration: 100 }),
          withSpring(0, { damping: 5, stiffness: 300 }),
        );
        lockScale.value = withSequence(
          withTiming(1.2, { duration: 80 }),
          withSpring(1, { damping: 5 }),
        );
        idleGlow.value = withSequence(
          withTiming(0.8, { duration: 100 }),
          withTiming(0.4, { duration: 300 }),
        );
      },

      open: (onDone: () => void) => {
        // 살짝 눌렀다가 빵!
        containerScaleY.value = withSequence(
          withTiming(0.85, { duration: 120 }),
          withTiming(1.12, { duration: 180 }),
          withSpring(1, { damping: 8 }),
        );

        // 락 깨짐
        lockScale.value = withSequence(
          withTiming(1.7, { duration: 180 }),
          withTiming(0, { duration: 180 }),
        );
        lockOpacity.value = withDelay(200, withTiming(0, { duration: 150 }));

        // 뚜껑 날아감
        lidY.value = withDelay(
          230,
          withTiming(-220, { duration: 650, easing: Easing.out(Easing.cubic) }),
        );
        lidRotate.value = withDelay(
          230,
          withTiming(-38, { duration: 650, easing: Easing.out(Easing.cubic) }),
        );
        lidOpacity.value = withDelay(650, withTiming(0, { duration: 350 }));

        // ✦ 빛 폭발 (뚜껑 열리는 순간)
        flashScale.value = withDelay(
          250,
          withTiming(3.2, { duration: 380, easing: Easing.out(Easing.quad) }),
        );
        flashOpacity.value = withDelay(
          250,
          withSequence(
            withTiming(0.95, { duration: 120 }),
            withTiming(0, { duration: 400 }),
          ),
        );

        // ✦ 광선 퍼짐 + 회전
        rayOpacity.value = withDelay(
          280,
          withSequence(
            withTiming(0.9, { duration: 250 }),
            withDelay(600, withTiming(0, { duration: 500 })),
          ),
        );
        rayScale.value = withDelay(
          280,
          withTiming(1, { duration: 500, easing: Easing.out(Easing.cubic) }),
        );
        rayRotate.value = withRepeat(
          withTiming(360, { duration: 6000, easing: Easing.linear }),
          -1,
        );

        // ✦ 보석 파티클
        runOnJS(setBursting)(true);

        // 통째로 살짝 축소하며 마무리 → onDone
        containerScaleX.value = withDelay(
          750,
          withTiming(0.72, { duration: 400 }),
        );
        containerScaleY.value = withDelay(
          750,
          withTiming(0.72, { duration: 400 }),
        );
        containerY.value = withDelay(
          1250,
          withTiming(0, { duration: 1 }, (f) => {
            if (f) runOnJS(onDone)();
          }),
        );
      },
    }));

    const containerStyle = useAnimatedStyle(() => ({
      transform: [
        { translateY: containerY.value },
        { rotate: `${containerRotate.value}deg` },
        { scaleX: containerScaleX.value },
        { scaleY: containerScaleY.value },
      ],
    }));
    const lidStyle = useAnimatedStyle(() => ({
      opacity: lidOpacity.value,
      transform: [
        { translateY: lidY.value },
        { rotate: `${lidRotate.value}deg` },
      ],
    }));
    const lockStyle = useAnimatedStyle(() => ({
      opacity: lockOpacity.value,
      transform: [{ scale: lockScale.value }],
    }));
    const idleGlowStyle = useAnimatedStyle(() => ({
      opacity: idleGlow.value,
      transform: [
        { scale: interpolate(idleGlow.value, [0.3, 0.8], [1, 1.15]) },
      ],
    }));
    const rayStyle = useAnimatedStyle(() => ({
      opacity: rayOpacity.value,
      transform: [
        { scale: rayScale.value },
        { rotate: `${rayRotate.value}deg` },
      ],
    }));
    const flashStyle = useAnimatedStyle(() => ({
      opacity: flashOpacity.value,
      transform: [{ scale: flashScale.value }],
    }));
    const shimmerStyle = useAnimatedStyle(() => ({
      opacity: interpolate(shimmer.value, [-1, 0, 1, 1.5], [0, 0.7, 0.7, 0]),
      transform: [
        { translateX: interpolate(shimmer.value, [-1, 1.5], [-60, 120]) },
        { rotate: "20deg" },
      ],
    }));

    return (
      <View style={styles.wrap}>
        {/* 대기 글로우 */}
        <Animated.View
          style={[styles.idleGlow, { backgroundColor: G.glow }, idleGlowStyle]}
        />

        {/* 광선 (뒤) */}
        {bursting && (
          <Animated.View style={[styles.rays, rayStyle]}>
            {Array.from({ length: RAY_COUNT }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.rayWrap,
                  {
                    transform: [
                      { rotate: `${(360 / RAY_COUNT) * i}deg` },
                      { translateY: -95 },
                    ],
                  },
                ]}
              >
                <LinearGradient
                  colors={[G.glowStrong, "transparent"]}
                  style={styles.ray}
                />
              </View>
            ))}
          </Animated.View>
        )}

        {/* 플래시 */}
        <Animated.View style={[styles.flash, flashStyle]} />

        {/* 상자 */}
        <Animated.View style={[styles.container, containerStyle]}>
          <View style={styles.shadow} />

          {/* 베이스 */}
          <View style={styles.base}>
            <View
              style={[
                styles.baseFrame,
                { backgroundColor: G.frame, borderBottomColor: G.frameDark },
              ]}
            >
              <View style={[styles.wood, { backgroundColor: G.wood }]}>
                <View
                  style={[
                    styles.stripe,
                    { top: "30%", backgroundColor: G.stripe },
                  ]}
                />
                <View
                  style={[
                    styles.stripe,
                    { top: "65%", backgroundColor: G.stripe },
                  ]}
                />
              </View>
            </View>
          </View>

          {/* 뚜껑 */}
          <Animated.View style={[styles.lid, lidStyle]}>
            <View style={[styles.lidFrame, { backgroundColor: G.frame }]}>
              <View style={[styles.wood, { backgroundColor: G.wood }]}>
                <View
                  style={[
                    styles.stripe,
                    { top: "55%", backgroundColor: G.stripe },
                  ]}
                />
              </View>
              {/* shimmer 광택 */}
              <Animated.View style={[styles.shimmer, shimmerStyle]} />
            </View>
          </Animated.View>

          {/* 락 */}
          <Animated.View style={[styles.lockWrap, lockStyle]}>
            <View style={[styles.lockOuter, { backgroundColor: G.lock }]}>
              <View style={[styles.lockInner, { backgroundColor: G.lockIn }]} />
            </View>
          </Animated.View>
        </Animated.View>

        {/* 보석 파티클 (앞) */}
        {bursting &&
          Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
            <Sparkle key={i} index={i} />
          ))}
      </View>
    );
  },
);

// 개별 보석/반짝이 파티클
function Sparkle({ index }: { index: number }) {
  const p = useSharedValue(0);
  const angle =
    ((Math.PI * 2) / PARTICLE_COUNT) * index + (Math.random() - 0.5) * 0.5;
  const dist = 110 + Math.random() * 90;
  const emoji = ["💎", "✨", "⭐", "💫"][index % 4];

  useEffect(() => {
    p.value = withDelay(
      300,
      withTiming(1, {
        duration: 850 + Math.random() * 300,
        easing: Easing.out(Easing.quad),
      }),
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: interpolate(p.value, [0, 0.15, 0.7, 1], [0, 1, 1, 0]),
    transform: [
      { translateX: Math.cos(angle) * dist * p.value },
      { translateY: (Math.sin(angle) * dist - 60) * p.value }, // 위로 편향
      { scale: interpolate(p.value, [0, 0.3, 1], [0.2, 1.1, 0.5]) },
      { rotate: `${p.value * (index % 2 ? 360 : -360)}deg` },
    ],
  }));

  return <Animated.Text style={[styles.sparkle, style]}>{emoji}</Animated.Text>;
}

Chest.displayName = "Chest";
export default Chest;

const styles = StyleSheet.create({
  wrap: {
    width: CHEST_W,
    height: CHEST_H + 40,
    alignItems: "center",
    justifyContent: "center",
  },
  idleGlow: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    opacity: 0.4,
  },
  rays: {
    position: "absolute",
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  rayWrap: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  ray: { width: 10, height: 130, borderRadius: 5 },
  flash: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#fff",
  },
  sparkle: { position: "absolute", fontSize: 26 },

  container: { width: CHEST_W, height: CHEST_H + 14, alignItems: "center" },
  shadow: {
    position: "absolute",
    bottom: 0,
    width: CHEST_W * 0.85,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E8E8EE",
  },
  base: {
    position: "absolute",
    top: LID_H - 8,
    left: 0,
    right: 0,
    height: BASE_H,
  },
  baseFrame: { flex: 1, borderRadius: 14, padding: 10, borderBottomWidth: 3 },
  wood: { flex: 1, borderRadius: 4, overflow: "hidden" },
  lid: { position: "absolute", top: 0, left: 0, right: 0, height: LID_H },
  lidFrame: { flex: 1, borderRadius: 14, padding: 10, overflow: "hidden" },
  stripe: { position: "absolute", left: 0, right: 0, height: 3, opacity: 0.5 },
  shimmer: {
    position: "absolute",
    top: -20,
    bottom: -20,
    width: 22,
    backgroundColor: "rgba(255,255,255,0.75)",
  },
  lockWrap: {
    position: "absolute",
    top: LID_H - 18,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  lockOuter: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  lockInner: { width: 14, height: 14, borderRadius: 7 },
});
