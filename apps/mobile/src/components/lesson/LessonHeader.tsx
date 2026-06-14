import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  useSharedValue,
  FadeInDown,
  Easing,
} from "react-native-reanimated";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { ThemeColors } from "@/constants/theme";
import { AnswerState } from "@/types/lesson";

interface Props {
  progress: number; // 0-1
  total: number;
  hearts: number;
  combo: number;
  answerState: AnswerState;
  onClose: () => void;
  theme: ThemeColors;
}

export default function LessonHeader({
  progress,
  total,
  hearts,
  combo,
  answerState,
  onClose,
  theme,
}: Props) {
  const progressWidth = useSharedValue(progress);
  const fillScaleY = useSharedValue(1);
  const shimmerX = useSharedValue(-200);
  const endGlowOpacity = useSharedValue(0);
  const endGlowScale = useSharedValue(0.5);
  const comboScale = useSharedValue(1);
  const prevCombo = useRef(0);
  const s = styles(theme);

  const marker1 = Math.round(total * 0.5);
  const marker2 = total - 1;

  // progress 부드럽게 차오름 (spring, 살짝 overshoot)
  useEffect(() => {
    progressWidth.value = withSpring(progress, {
      damping: 14,
      stiffness: 150,
      mass: 0.8,
    });
  }, [progress]);

  // 정답일 때만 화려한 보상 효과
  useEffect(() => {
    if (answerState === "correct") {
      // 1) bar 세로로 살짝 부풀음 (jiggle)
      fillScaleY.value = withSequence(
        withTiming(1.35, { duration: 180, easing: Easing.out(Easing.cubic) }),
        withSpring(1, { damping: 5, stiffness: 220 }),
      );

      // 2) Shimmer stripe 흐름 (사선 빛이 bar 가로질러 지나감)
      shimmerX.value = -200;
      shimmerX.value = withDelay(
        80,
        withTiming(400, {
          duration: 850,
          easing: Easing.out(Easing.cubic),
        }),
      );

      // 3) Fill 끝부분에서 glow 반짝
      endGlowScale.value = 0.4;
      endGlowOpacity.value = withSequence(
        withTiming(1, { duration: 220 }),
        withDelay(120, withTiming(0, { duration: 480 })),
      );
      endGlowScale.value = withSequence(
        withTiming(1.5, { duration: 300, easing: Easing.out(Easing.cubic) }),
        withTiming(0.9, { duration: 400 }),
      );
    }
  }, [answerState]);

  // 콤보 (기존 그대로)
  useEffect(() => {
    if (combo > prevCombo.current && combo >= 2) {
      comboScale.value = withSequence(
        withSpring(1.5, { damping: 4, stiffness: 400 }),
        withSpring(0.9, { damping: 6 }),
        withSpring(1.2, { damping: 6 }),
        withSpring(1, { damping: 8 }),
      );
    }
    prevCombo.current = combo;
  }, [combo]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%` as any,
    transform: [{ scaleY: fillScaleY.value }],
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerX.value }, { skewX: "-20deg" }],
  }));

  const endGlowStyle = useAnimatedStyle(() => ({
    left: `${progressWidth.value * 100}%` as any,
    opacity: endGlowOpacity.value,
    transform: [{ translateX: -14 }, { scale: endGlowScale.value }],
  }));

  const comboStyle = useAnimatedStyle(() => ({
    transform: [{ scale: comboScale.value }],
  }));

  const getComboColor = () => {
    if (combo >= 10) return "#FFD700";
    if (combo >= 7) return "#776ee2";
    if (combo >= 5) return "#FF4B4B";
    return "#FF9500";
  };

  return (
    <View style={s.wrapper}>
      {combo >= 2 && (
        <Animated.View
          entering={FadeInDown.springify().damping(12)}
          style={s.comboWrap}
        >
          <Animated.Text
            style={[s.comboText, { color: getComboColor() }, comboStyle]}
          >
            🔥 콤보 x{combo}
          </Animated.Text>
        </Animated.View>
      )}

      <View style={s.container}>
        <TouchableOpacity
          onPress={onClose}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="close" size={28} color="#AFAFAF" />
        </TouchableOpacity>

        {/* 프로그레스바 */}
        <View style={s.progressWrap}>
          <View style={s.track}>
            {/* Fill */}
            <Animated.View style={[s.fill, fillStyle]}>
              {/* 위쪽 흰색 highlight stripe (Duolingo 시그니처) */}
              <View style={s.fillTopHighlight} />

              {/* Shimmer - 정답 시 사선으로 가로지름 */}
              <Animated.View style={[s.shimmer, shimmerStyle]} />
            </Animated.View>

            {/* 끝부분 glow (fill 밖에 위치, 위치는 progress 따라 이동) */}
            <Animated.View style={[s.endGlow, endGlowStyle]} />

            {/* 마커 */}
            <View
              style={[
                s.markerWrap,
                { left: `${(marker1 / total) * 100}%` as any },
              ]}
            >
              <Text style={s.markerText}>{marker1}</Text>
            </View>
            <View
              style={[
                s.markerWrap,
                { left: `${(marker2 / total) * 100}%` as any },
              ]}
            >
              <Text style={s.markerText}>{marker2}</Text>
            </View>
          </View>
        </View>

        {/* 오른쪽 배지 */}
        <View style={s.right}>
          <View style={s.lightningBadge}>
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={18}
              color="#fff"
            />
            <View style={s.lightningDot} />
          </View>
          <View style={s.infinityBadge}>
            <MaterialCommunityIcons name="infinity" size={20} color="#fff" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: theme.bg,
      paddingTop: 52,
    },
    comboWrap: {
      alignItems: "center",
      paddingBottom: 4,
    },
    comboText: {
      fontSize: 14,
      fontWeight: "800",
    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingBottom: 12,
      gap: 12,
    },
    progressWrap: { flex: 1 },
    track: {
      height: 20,
      backgroundColor: "#E5E5EA",
      borderRadius: 99,
      overflow: "visible",
      position: "relative",
      justifyContent: "center",
    },
    fill: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      backgroundColor: "#FFD000",
      borderRadius: 99,
      overflow: "hidden",
    },
    fillTopHighlight: {
      position: "absolute",
      top: 3,
      left: 8,
      right: 8,
      height: 5,
      borderRadius: 99,
      backgroundColor: "rgba(255, 255, 255, 0.55)",
    },
    shimmer: {
      position: "absolute",
      top: -4,
      bottom: -4,
      width: 70,
      backgroundColor: "rgba(255, 255, 255, 0.55)",
    },
    endGlow: {
      position: "absolute",
      top: -4,
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: "rgba(255, 240, 130, 0.95)",
      shadowColor: "#FFD000",
      shadowOpacity: 1,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 0 },
      elevation: 10,
    },
    markerWrap: {
      position: "absolute",
      alignItems: "center",
      transform: [{ translateX: -8 }],
    },
    markerText: {
      fontSize: 12,
      fontWeight: "700",
      color: "#AFAFAF",
    },
    right: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    lightningBadge: {
      width: 36,
      height: 28,
      borderRadius: 8,
      backgroundColor: "#7B5CF0",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      shadowColor: "#5B8DEF",
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 3,
    },
    lightningDot: {
      position: "absolute",
      top: 3,
      right: 3,
      width: 7,
      height: 7,
      borderRadius: 99,
      backgroundColor: "#B388FF",
    },
    infinityBadge: {
      width: 44,
      height: 28,
      borderRadius: 8,
      backgroundColor: "#1A9BE6",
      alignItems: "center",
      justifyContent: "center",
    },
  });
