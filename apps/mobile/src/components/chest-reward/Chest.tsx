import { forwardRef, useImperativeHandle } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
  withDelay,
  Easing,
  runOnJS,
} from "react-native-reanimated";

const FRAME_COLOR = "#F4B26A";
const FRAME_DARK = "#E89E54";
const WOOD_COLOR = "#C97A2E";
const STRIPE_COLOR = "#A8631F";
const LOCK_OUTER = "#F4D9B0";
const LOCK_INNER = "#E8C58E";
const SHADOW_COLOR = "#E8E8EE";

const CHEST_W = 200;
const CHEST_H = 160;
const LID_H = 70;
const BASE_H = 90;

export interface ChestHandle {
  dropIn: () => void;
  shake: (intensity: number) => void;
  open: (onDone: () => void) => void;
}

const Chest = forwardRef<ChestHandle>((_, ref) => {
  // 전체 chest 위치/회전
  const containerY = useSharedValue(-600);
  const containerRotate = useSharedValue(0);
  const containerScaleX = useSharedValue(1);
  const containerScaleY = useSharedValue(1);

  // 뚜껑 (lid) 따로 애니메이션
  const lidY = useSharedValue(0);
  const lidRotate = useSharedValue(0);
  const lidOpacity = useSharedValue(1);

  // 락 (lock)
  const lockScale = useSharedValue(1);
  const lockOpacity = useSharedValue(1);

  useImperativeHandle(ref, () => ({
    dropIn: () => {
      // 위에서 툭 떨어지고 착지하면서 squash
      containerY.value = withSequence(
        withTiming(0, {
          duration: 500,
          easing: Easing.in(Easing.cubic),
        }),
        // 착지 squash
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
      const angle = 5 + intensity * 4;
      const dur = 70;

      // 좌우 흔들기
      containerRotate.value = withSequence(
        withTiming(-angle, { duration: dur }),
        withTiming(angle, { duration: dur }),
        withTiming(-angle * 0.7, { duration: dur }),
        withTiming(angle * 0.5, { duration: dur }),
        withTiming(0, { duration: dur }),
      );

      // 뚜껑이 살짝 들썩
      lidY.value = withSequence(
        withTiming(-6 - intensity * 3, { duration: 100 }),
        withSpring(0, { damping: 5, stiffness: 300 }),
      );

      // 락 pulse
      lockScale.value = withSequence(
        withTiming(1.2, { duration: 80 }),
        withSpring(1, { damping: 5 }),
      );
    },

    open: (onDone: () => void) => {
      // 마지막 빵! 터지듯
      containerScaleY.value = withSequence(
        withTiming(0.85, { duration: 100 }),
        withTiming(1.15, { duration: 200 }),
      );

      // 락 깨지면서 사라짐
      lockScale.value = withSequence(
        withTiming(1.6, { duration: 200 }),
        withTiming(0, { duration: 200 }),
      );
      lockOpacity.value = withDelay(200, withTiming(0, { duration: 200 }));

      // 뚜껑 날아감
      lidY.value = withDelay(
        250,
        withTiming(-200, {
          duration: 600,
          easing: Easing.out(Easing.cubic),
        }),
      );
      lidRotate.value = withDelay(
        250,
        withTiming(-35, {
          duration: 600,
          easing: Easing.out(Easing.cubic),
        }),
      );
      lidOpacity.value = withDelay(550, withTiming(0, { duration: 300 }));

      // 1.1초 뒤 콜백
      containerY.value = withDelay(
        1100,
        withTiming(0, { duration: 1 }, (finished) => {
          if (finished) runOnJS(onDone)();
        }),
      );

      // 살짝 통째로 페이드아웃
      containerScaleX.value = withDelay(
        700,
        withTiming(0.7, { duration: 400 }),
      );
      containerScaleY.value = withDelay(
        700,
        withTiming(0.7, { duration: 400 }),
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

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <View style={styles.shadow} />

      {/* 베이스 (아래쪽) */}
      <View style={styles.base}>
        <View style={styles.baseFrame}>
          <View style={styles.baseWood}>
            <View style={[styles.stripe, { top: "30%" }]} />
            <View style={[styles.stripe, { top: "65%" }]} />
          </View>
        </View>
      </View>

      {/* 뚜껑 (위쪽) - 따로 애니메이션 */}
      <Animated.View style={[styles.lid, lidStyle]}>
        <View style={styles.lidFrame}>
          <View style={styles.lidWood}>
            <View style={[styles.stripe, { top: "55%" }]} />
          </View>
        </View>
      </Animated.View>

      {/* 락 (seam 위에 떠 있음) */}
      <Animated.View style={[styles.lockWrap, lockStyle]}>
        <View style={styles.lockOuter}>
          <View style={styles.lockInner} />
        </View>
      </Animated.View>
    </Animated.View>
  );
});

Chest.displayName = "Chest";
export default Chest;

const styles = StyleSheet.create({
  container: {
    width: CHEST_W,
    height: CHEST_H + 14,
    alignItems: "center",
  },
  shadow: {
    position: "absolute",
    bottom: 0,
    width: CHEST_W * 0.85,
    height: 10,
    borderRadius: 5,
    backgroundColor: SHADOW_COLOR,
  },
  // 베이스
  base: {
    position: "absolute",
    top: LID_H - 8,
    left: 0,
    right: 0,
    height: BASE_H,
  },
  baseFrame: {
    flex: 1,
    backgroundColor: FRAME_COLOR,
    borderRadius: 14,
    padding: 10,
    borderBottomWidth: 3,
    borderBottomColor: FRAME_DARK,
  },
  baseWood: {
    flex: 1,
    backgroundColor: WOOD_COLOR,
    borderRadius: 4,
    overflow: "hidden",
  },
  // 뚜껑
  lid: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: LID_H,
  },
  lidFrame: {
    flex: 1,
    backgroundColor: FRAME_COLOR,
    borderRadius: 14,
    padding: 10,
  },
  lidWood: {
    flex: 1,
    backgroundColor: WOOD_COLOR,
    borderRadius: 4,
    overflow: "hidden",
  },
  stripe: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: STRIPE_COLOR,
    opacity: 0.5,
  },
  // 락
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
    backgroundColor: LOCK_OUTER,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  lockInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: LOCK_INNER,
  },
});
