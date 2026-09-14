import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import {
  SuperInfinityBadge,
  ENERGY_COLORS,
} from "@/components/energy/BatteryBadge";

/**
 * KORIO SUPER 유도 카드.
 *
 * 원래 있던 그라디언트 띠 + 무한대 배지 구성을 그대로 둔다 — 이 화면에서 제일
 * 잘 먹히는 카드다. 붙인 것: 띠를 흐르는 광택, 눌렀을 때 바텀보더가 눌리는 입체감,
 * 이미 SUPER 면 문구를 "이용 중" 으로 바꾸는 분기.
 */
export default function SuperCard({
  isSuper,
  onPress,
}: {
  isSuper: boolean;
  onPress: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);

  const shine = useSharedValue(-1);
  useEffect(() => {
    shine.value = withDelay(
      300,
      withRepeat(
        withSequence(
          withTiming(1.5, { duration: 1100, easing: Easing.inOut(Easing.quad) }),
          withTiming(-1, { duration: 0 }),
          withTiming(-1, { duration: 1400 }),
        ),
        -1,
        false,
      ),
    );
  }, [shine]);
  const shineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shine.value * 300 }, { rotate: "18deg" }],
  }));

  return (
    <Pressable
      onPress={() => {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onPress();
      }}
      style={({ pressed }) => [s.card, pressed && s.pressed]}
    >
      <LinearGradient
        colors={[ENERGY_COLORS.superA, ENERGY_COLORS.superB, ENERGY_COLORS.superC]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={s.strip}
      >
        <Animated.View style={[s.shine, shineStyle]} pointerEvents="none" />
        <Text style={s.stripText}>SUPER</Text>
        <Ionicons
          name="chevron-forward"
          size={18}
          color="rgba(255,255,255,0.85)"
        />
      </LinearGradient>

      <View style={s.body}>
        <SuperInfinityBadge size={46} />
        <View style={s.mid}>
          <Text style={s.title}>{t("energy.unlimited")}</Text>
          <Text style={s.sub}>
            {isSuper ? t("shop.superActive") : t("shop.superPitch")}
          </Text>
        </View>
        <Text style={s.cta}>
          {isSuper ? t("shop.superManage") : t("energy.freeTrial")}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    card: {
      marginHorizontal: 20,
      marginBottom: 12,
      borderRadius: 20,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 5,
      overflow: "hidden",
    },
    pressed: { transform: [{ translateY: 3 }], borderBottomWidth: 2 },
    strip: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 9,
      paddingHorizontal: 16,
      overflow: "hidden",
    },
    shine: {
      position: "absolute",
      top: -30,
      left: -120,
      width: 40,
      height: 120,
      backgroundColor: "rgba(255,255,255,0.4)",
    },
    stripText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "900",
      fontStyle: "italic",
      letterSpacing: 1.4,
    },
    body: {
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      paddingVertical: 14,
      paddingHorizontal: 15,
    },
    mid: { flex: 1, gap: 2 },
    title: { fontSize: 16, fontWeight: "900", color: theme.text },
    sub: { fontSize: 12, fontWeight: "600", color: theme.textSecondary },
    cta: { fontSize: 14, fontWeight: "900", color: ENERGY_COLORS.magenta },
  });
