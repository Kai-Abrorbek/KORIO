import { useEffect, type ComponentProps } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HaneulmonMascot, {
  type HaneulmonMood,
} from "@/components/home/HaneulmonMascot";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import Button3D from "./Button3D";

export interface RewardChip {
  icon: ComponentProps<typeof Ionicons>["name"];
  color: string;
  label: string;
}

interface Props {
  visible: boolean;
  mood?: HaneulmonMood;
  title: string;
  body?: string;
  rewards?: RewardChip[];
  primaryLabel: string;
  onPrimary: () => void;
  primaryColor?: string;
  primaryDepth?: string;
  secondaryLabel?: string;
  onSecondary?: () => void;
  loading?: boolean;
  /** 바깥을 눌러 닫기 (기본: 보조 버튼과 같은 동작, 없으면 막힘) */
  onBackdrop?: () => void;
}

/**
 * 가운데 뜨는 보상 대화상자 — 복귀 보상·복구펜 알림·목표 결과가 같이 쓴다.
 *
 * ⚠️ 이 앱의 Modal 규칙(CharacterDetailSheet 참고): Modal 안에서 reanimated
 *    entering/exiting 을 쓰지 않는다, statusBarTranslucent, animationType="none",
 *    GestureHandlerRootView 로 다시 감싼다. 하나라도 어기면 "보이는데 안 눌린다".
 */
export default function RewardDialog({
  visible,
  mood = "great",
  title,
  body,
  rewards = [],
  primaryLabel,
  onPrimary,
  primaryColor,
  primaryDepth,
  secondaryLabel,
  onSecondary,
  loading,
  onBackdrop,
}: Props) {
  const theme = useTheme();
  const s = getStyles(theme);
  const show = useSharedValue(0);
  const glow = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      show.value = 0;
      show.value = withSpring(1, { damping: 13, stiffness: 170 });
      glow.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.quad) }),
          withTiming(0, { duration: 1400, easing: Easing.inOut(Easing.quad) }),
        ),
        -1,
      );
    } else {
      show.value = 0;
      glow.value = 0;
    }
  }, [visible]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: Math.min(1, show.value),
  }));
  const cardStyle = useAnimatedStyle(() => ({
    opacity: Math.min(1, show.value),
    transform: [{ scale: 0.86 + 0.14 * show.value }],
  }));
  const haloStyle = useAnimatedStyle(() => ({
    opacity: 0.35 + 0.35 * glow.value,
    transform: [{ scale: 1 + 0.08 * glow.value }],
  }));

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={() => (onBackdrop ?? onSecondary)?.()}
    >
      <GestureHandlerRootView style={s.root}>
        <Animated.View
          style={[StyleSheet.absoluteFill, s.backdrop, backdropStyle]}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => (onBackdrop ?? onSecondary)?.()}
          />
        </Animated.View>

        <Animated.View style={[s.card, cardStyle]}>
          <View style={s.mascotWrap}>
            <Animated.View style={[s.halo, haloStyle]} />
            <HaneulmonMascot size={104} mood={mood} />
          </View>

          <Text style={s.title}>{title}</Text>
          {body ? <Text style={s.body}>{body}</Text> : null}

          {rewards.length ? (
            <View style={s.rewards}>
              {rewards.map((r, i) => (
                <RewardChipView key={i} chip={r} index={i} theme={theme} />
              ))}
            </View>
          ) : null}

          <Button3D
            label={primaryLabel}
            onPress={onPrimary}
            loading={loading}
            color={primaryColor}
            depthColor={primaryDepth}
            style={s.primary}
          />
          {secondaryLabel ? (
            <Pressable onPress={onSecondary} hitSlop={10} style={s.secondary}>
              <Text style={s.secondaryText}>{secondaryLabel}</Text>
            </Pressable>
          ) : null}
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}

function RewardChipView({
  chip,
  index,
  theme,
}: {
  chip: RewardChip;
  index: number;
  theme: ThemeColors;
}) {
  const s = getStyles(theme);
  const pop = useSharedValue(0);
  useEffect(() => {
    pop.value = withDelay(
      220 + index * 120,
      withSpring(1, { damping: 9, stiffness: 180 }),
    );
  }, []);
  const style = useAnimatedStyle(() => ({
    opacity: Math.min(1, pop.value),
    transform: [{ scale: 0.6 + 0.4 * pop.value }],
  }));
  return (
    <Animated.View style={[s.chip, style]}>
      <View style={[s.chipIcon, { backgroundColor: chip.color + "22" }]}>
        <Ionicons name={chip.icon} size={18} color={chip.color} />
      </View>
      <Text style={s.chipText}>{chip.label}</Text>
    </Animated.View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    root: { flex: 1, alignItems: "center", justifyContent: "center" },
    backdrop: { backgroundColor: "rgba(10, 8, 30, 0.62)" },
    card: {
      width: "86%",
      maxWidth: 380,
      backgroundColor: theme.surface,
      borderRadius: 28,
      paddingTop: 76,
      paddingHorizontal: 22,
      paddingBottom: 20,
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.border,
    },
    mascotWrap: {
      position: "absolute",
      top: -58,
      alignItems: "center",
      justifyContent: "center",
    },
    halo: {
      position: "absolute",
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: "#FFE066",
    },
    title: {
      fontSize: 21,
      fontWeight: "900",
      color: theme.text,
      textAlign: "center",
      lineHeight: 28,
    },
    body: {
      marginTop: 8,
      fontSize: 14.5,
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
      lineHeight: 21,
    },
    rewards: { marginTop: 16, width: "100%", gap: 8 },
    chip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 14,
      backgroundColor: theme.bg,
      borderWidth: 1,
      borderColor: theme.border,
    },
    chipIcon: {
      width: 32,
      height: 32,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    chipText: { flex: 1, fontSize: 14.5, fontWeight: "800", color: theme.text },
    primary: { alignSelf: "stretch", marginTop: 20 },
    secondary: { marginTop: 14, paddingVertical: 4 },
    secondaryText: {
      fontSize: 14,
      fontWeight: "800",
      color: theme.textSecondary,
    },
  });
