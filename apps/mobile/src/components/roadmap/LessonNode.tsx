import { useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
  withSpring,
  Easing,
  interpolate,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { NodeType, NodeStatus } from "@/types/roadmap";
import { darken } from "@/utils/color";
import AnimatedNodeRing, { RING_SIZE } from "./AnimatedNodeRing";

interface Props {
  index: number;
  type: NodeType;
  status: NodeStatus;
  unitColor: string;
  isLegendDone?: boolean;
  completedSteps?: number;
  totalSteps?: number;
  onPress?: () => void;
}

const ICON_MAP: Record<NodeType, keyof typeof Ionicons.glyphMap> = {
  star: "star",
  headphone: "headset",
  speech: "flag",
  chest: "gift",
  review: "refresh",
  boss: "trophy",
  "play-forward": "play-forward",
  score: "trophy",
};

const NODE_SIZE = 72;
const STEP_DEG = 10.5; // 360 / 7 — 한 번에 한 스텝씩 툭
const STEP_DURATION = 30; // 툭 도는 시간 (ms)
const REST_DURATION = 1000; // 쉬는 시간 (ms)
const STEPS_PER_CYCLE = 7; // 한 사이클에 몇 스텝

export default function LessonNode({
  index,
  type,
  status,
  unitColor,
  completedSteps = 0,
  isLegendDone = false,
  totalSteps = 2,
  onPress,
}: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  const isCurrent = status === "current";
  const isLocked = status === "locked";

  const rotate = useSharedValue(0);

  const press = useSharedValue(0); // 눌림
  const float = useSharedValue(0); // 현재 노드 둥실
  const sparkle = useSharedValue(0); // 반짝
  const shine = useSharedValue(-1); // 완료 노드 광택 sweep
  const wiggle = useSharedValue(0); // 가끔 흔들

  const isCompleted = status === "completed";

  // 현재 노드: 둥실 + 반짝
  useEffect(() => {
    if (!isCurrent) return;
    float.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 1100, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1100, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
    sparkle.value = withRepeat(
      withSequence(
        withDelay(400, withTiming(1, { duration: 600 })),
        withTiming(0, { duration: 600 }),
      ),
      -1,
      false,
    );
  }, [isCurrent]);

  // 완료 노드: 가끔 광택이 쓱 지나감
  useEffect(() => {
    if (!isCompleted) return;
    const run = () => {
      shine.value = -1;
      shine.value = withTiming(1, {
        duration: 700,
        easing: Easing.inOut(Easing.ease),
      });
    };
    const id = setInterval(run, 3500 + Math.random() * 2500);
    return () => clearInterval(id);
  }, [isCompleted]);

  // 가끔 랜덤 wiggle (현재/완료 노드)
  useEffect(() => {
    if (isLocked) return;
    const id = setInterval(
      () => {
        wiggle.value = withSequence(
          withTiming(-0.06, { duration: 70 }),
          withTiming(0.06, { duration: 70 }),
          withTiming(-0.04, { duration: 70 }),
          withSpring(0, { damping: 6 }),
        );
      },
      4000 + Math.random() * 4000,
    );
    return () => clearInterval(id);
  }, [isLocked]);

  const faceAnimStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: float.value + press.value * 6 },
      { rotate: `${wiggle.value}rad` },
      { scale: 1 - press.value * 0.04 },
    ],
  }));
  const depthAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: 1 - press.value * 0.5 }],
    opacity: 1 - press.value * 0.3,
  }));
  const sparkleStyle = useAnimatedStyle(() => ({
    opacity: sparkle.value,
    transform: [{ scale: 0.5 + sparkle.value * 0.8 }],
  }));
  const shineStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shine.value, [-1, 0, 1], [0, 0.7, 0]),
    transform: [{ translateX: shine.value * NODE_SIZE }, { rotate: "20deg" }],
  }));

  useEffect(() => {
    if (!isCurrent || type !== "star") return;

    // 실제로는 누적 각도로 관리
    let currentDeg = 0;

    const runStep = () => {
      // 7스텝씩 툭툭 돌기
      const targetDeg = currentDeg + STEP_DEG * STEPS_PER_CYCLE;
      rotate.value = withSequence(
        // 7번 스텝 (각 스텝 사이 짧은 딜레이)
        ...Array.from({ length: STEPS_PER_CYCLE }, (_, i) =>
          withTiming(currentDeg + STEP_DEG * (i + 1), {
            duration: STEP_DURATION,
            easing: Easing.out(Easing.back(1.2)),
          }),
        ),
        // 쉬기
        withDelay(REST_DURATION, withTiming(targetDeg, { duration: 0 })),
      );
      currentDeg = targetDeg;
    };

    // 첫 실행
    runStep();

    // 반복
    const totalCycleDuration = STEPS_PER_CYCLE * STEP_DURATION + REST_DURATION;
    const interval = setInterval(runStep, totalCycleDuration);

    return () => clearInterval(interval);
  }, [isCurrent, type]);

  const iconRotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  let mainColor: string;
  let darkColor: string;
  let iconColor: string;

  if (isLocked && index !== 0) {
    mainColor = theme.border;
    darkColor = darken(theme.border, 20);
    iconColor = theme.textSecondary;
  } else if (isLocked && index === 0) {
    mainColor = unitColor;
    darkColor = darken(unitColor, 40);
    iconColor = "#fff";
  } else {
    mainColor = unitColor;
    darkColor = darken(unitColor, 40);
    iconColor = "#fff";
  }

  if (isLegendDone && !isLocked) {
    mainColor = "#FFD900";
    darkColor = "#E5AE00";
    iconColor = "#8A6D00";
  }

  const iconName = isLegendDone ? "star" : ICON_MAP[type];
  const iconSize = type === "chest" || type === "boss" ? 34 : 30;

  return (
    <View style={styles.wrap}>
      {isCurrent && (
        <View style={styles.ringWrap} pointerEvents="none">
          <AnimatedNodeRing
            color={unitColor}
            completedSteps={completedSteps}
            totalSteps={totalSteps}
          />
        </View>
      )}

      <Pressable
        onPress={onPress}
        onPressIn={() => {
          press.value = withTiming(1, { duration: 80 });
        }}
        onPressOut={() => {
          press.value = withSpring(0, { damping: 12, stiffness: 300 });
        }}
        style={styles.touchable}
      >
        <Animated.View
          style={[styles.depth, { backgroundColor: darkColor }, depthAnimStyle]}
        />
        <Animated.View
          style={[styles.face, { backgroundColor: mainColor }, faceAnimStyle]}
        >
          {/* 표면 상단 하이라이트 (입체감) */}
          {!isLocked && <View style={styles.gloss} pointerEvents="none" />}

          {/* 완료 노드 광택 sweep */}
          {isCompleted && (
            <Animated.View
              style={[styles.shine, shineStyle]}
              pointerEvents="none"
            />
          )}

          {isLocked ? (
            <Ionicons
              name={index !== 0 ? "lock-closed" : "play-forward"}
              size={index !== 0 ? iconSize - 5 : iconSize + 1}
              color={index !== 0 ? iconColor : "white"}
              style={index !== 0 ? { opacity: 0.5 } : { opacity: 1 }}
            />
          ) : type === "chest" ? (
            <MaterialCommunityIcons
              name="treasure-chest"
              size={iconSize + 4}
              color={iconColor}
            />
          ) : isCurrent && type === "star" ? (
            <Animated.View style={iconRotateStyle}>
              <Ionicons name={iconName} size={iconSize} color={iconColor} />
            </Animated.View>
          ) : (
            <Ionicons name={iconName} size={iconSize} color={iconColor} />
          )}

          {/* 현재 노드 반짝이 */}
          {isCurrent && (
            <>
              <Animated.Text
                style={[styles.sparkTR, sparkleStyle]}
                pointerEvents="none"
              >
                ✦
              </Animated.Text>
              <Animated.Text
                style={[styles.sparkBL, sparkleStyle]}
                pointerEvents="none"
              >
                ✦
              </Animated.Text>
            </>
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      width: NODE_SIZE,
      height: NODE_SIZE + 8,
      alignItems: "center",
      justifyContent: "center",
    },
    ringWrap: {
      position: "absolute",
      width: RING_SIZE,
      height: RING_SIZE,
      top: (NODE_SIZE + 8 - RING_SIZE) / 2,
      left: (NODE_SIZE - RING_SIZE) / 2,
      alignItems: "center",
      justifyContent: "center",
    },
    touchable: {
      width: NODE_SIZE,
      height: NODE_SIZE + 8,
      alignItems: "center",
      justifyContent: "center",
    },
    depth: {
      position: "absolute",
      width: NODE_SIZE,
      height: NODE_SIZE,
      borderRadius: NODE_SIZE / 2,
      top: 6,
    },
    face: {
      width: NODE_SIZE,
      height: NODE_SIZE,
      borderRadius: NODE_SIZE / 2,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 0,
      overflow: "hidden",
    },
    gloss: {
      position: "absolute",
      top: 6,
      width: NODE_SIZE * 0.62,
      height: NODE_SIZE * 0.34,
      borderRadius: NODE_SIZE / 2,
      backgroundColor: "rgba(255,255,255,0.35)",
    },
    shine: {
      position: "absolute",
      top: -8,
      bottom: -8,
      width: 16,
      backgroundColor: "rgba(255,255,255,0.85)",
    },
    sparkTR: {
      position: "absolute",
      top: 2,
      right: 4,
      fontSize: 14,
      color: "#fff",
    },
    sparkBL: {
      position: "absolute",
      bottom: 4,
      left: 6,
      fontSize: 11,
      color: "#fff",
    },
  });
