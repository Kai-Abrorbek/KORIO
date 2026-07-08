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
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import { AnswerState } from "@/types/lesson";

interface Props {
  progress: number; // 0-1
  combo: number;
  energy: number;
  answerState: AnswerState;
  onClose: () => void;
  theme: ThemeColors;
  hideBadges?: boolean;
  showCombo?: boolean;
}

export default function LessonHeader({
  progress,
  combo,
  energy,
  answerState,
  onClose,
  theme,
  hideBadges = false,
  showCombo,
}: Props) {
  const { t } = useTranslation();
  const progressWidth = useSharedValue(progress);
  const fillScaleY = useSharedValue(1);
  const shimmerX = useSharedValue(-200);
  const comboScale = useSharedValue(1);
  const energyScale = useSharedValue(1);
  const prevCombo = useRef(0);
  const prevEnergy = useRef(energy);
  const s = styles(theme);

  // progress 부드럽게 차오름
  useEffect(() => {
    progressWidth.value = withSpring(progress, {
      damping: 14,
      stiffness: 150,
      mass: 0.8,
    });
  }, [progress]);

  // 정답일 때 bar 효과
  useEffect(() => {
    if (answerState === "correct") {
      fillScaleY.value = withSequence(
        withTiming(1.35, { duration: 180, easing: Easing.out(Easing.cubic) }),
        withSpring(1, { damping: 5, stiffness: 220 }),
      );
      shimmerX.value = -200;
      shimmerX.value = withDelay(
        80,
        withTiming(400, { duration: 850, easing: Easing.out(Easing.cubic) }),
      );
    }
  }, [answerState]);

  // 콤보 팝
  useEffect(() => {
    if (combo > prevCombo.current && combo >= 1) {
      comboScale.value = withSequence(
        withSpring(1.5, { damping: 4, stiffness: 400 }),
        withSpring(0.9, { damping: 6 }),
        withSpring(1.2, { damping: 6 }),
        withSpring(1, { damping: 8 }),
      );
    }
    prevCombo.current = combo;
  }, [combo]);

  // 에너지 감소 시 흔들/팝
  useEffect(() => {
    if (energy < prevEnergy.current) {
      energyScale.value = withSequence(
        withTiming(1, { duration: 40 }),
        withSpring(1, { damping: 10 }),
      );
    }
    prevEnergy.current = energy;
  }, [energy]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%` as any,
    transform: [{ scaleY: fillScaleY.value }],
  }));
  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerX.value }, { skewX: "-20deg" }],
  }));
  const comboStyle = useAnimatedStyle(() => ({
    transform: [{ scale: comboScale.value }],
  }));
  const energyStyle = useAnimatedStyle(() => ({
    transform: [{ scale: energyScale.value }],
  }));

  return (
    <View style={s.wrapper}>
      {/* 콤보 텍스트 (정답 시 콤보 1 이상이면) */}
      {combo >= 1 && showCombo ? (
        <Animated.View
          entering={FadeInDown.springify().damping(0)}
          style={s.comboWrap}
        >
          <Animated.Text style={[s.comboText, comboStyle]}>
            {t("lesson.combo")} x{combo}
          </Animated.Text>
        </Animated.View>
      ) : (
        <></>
      )}

      <View style={s.container}>
        <TouchableOpacity
          onPress={onClose}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="close" size={28} color="#AFAFAF" />
        </TouchableOpacity>

        {/* 진행바 */}
        <View style={s.progressWrap}>
          <View style={s.track}>
            <Animated.View style={[s.fillContainer, fillStyle]}>
              <LinearGradient
                colors={["#00E0FF", "#1CB0F6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={s.fillGradient}
              >
                <View style={s.fillTopHighlight} />
                <Animated.View style={[s.shimmer, shimmerStyle]} />
              </LinearGradient>
            </Animated.View>
          </View>
        </View>

        {/* 에너지 배지 */}
        {!hideBadges && (
          <Animated.View style={[s.energyBadge, energyStyle]}>
            <View style={s.batteryIcon}>
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={14}
                color="#fff"
              />
            </View>
            <Text style={s.energyText}>{energy}</Text>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrapper: { backgroundColor: theme.bg, paddingTop: 26 },
    comboWrap: { alignItems: "center", paddingBottom: 4 },
    comboText: { fontSize: 16, fontWeight: "900", color: "#1CB0F6" },
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingBottom: 12,
      gap: 12,
    },
    progressWrap: { flex: 1 },
    track: {
      height: 18,
      backgroundColor: "#E5E5EA",
      borderRadius: 99,
      overflow: "hidden",
      justifyContent: "center",
    },
    fillContainer: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      borderRadius: 99,
      overflow: "hidden",
    },
    fillGradient: {
      flex: 1,
      borderRadius: 99,
      overflow: "hidden",
      minWidth: 18,
    },
    fillTopHighlight: {
      position: "absolute",
      top: 3,
      left: 8,
      right: 8,
      height: 5,
      borderRadius: 99,
      backgroundColor: "rgba(255,255,255,0.5)",
    },
    shimmer: {
      position: "absolute",
      top: -4,
      bottom: -4,
      width: 60,
      backgroundColor: "rgba(255,255,255,0.5)",
    },
    energyBadge: { flexDirection: "row", alignItems: "center", gap: 6 },
    batteryIcon: {
      width: 32,
      height: 22,
      borderRadius: 6,
      backgroundColor: "#FF4B82",
      alignItems: "center",
      justifyContent: "center",
    },
    energyText: { fontSize: 18, fontWeight: "900", color: "#FF4B82" },
  });
