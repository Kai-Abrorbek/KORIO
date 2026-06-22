import { useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  Easing,
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
  totalSteps = 2,
  onPress,
}: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  const isCurrent = status === "current";
  const isLocked = status === "locked";

  const rotate = useSharedValue(0);

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

  const iconName = ICON_MAP[type];
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

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={styles.touchable}
      >
        <View style={[styles.depth, { backgroundColor: darkColor }]} />
        <View style={[styles.face, { backgroundColor: mainColor }]}>
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
        </View>
      </TouchableOpacity>
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
    },
  });
