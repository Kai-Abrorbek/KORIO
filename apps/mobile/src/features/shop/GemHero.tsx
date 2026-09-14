import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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

/**
 * 상점 맨 위 — 지금 내가 가진 보석.
 *
 * 예전에는 여기에 에너지 트랙바가 있었다. 보석을 쓰러 들어온 화면인데 첫 화면이
 * 에너지였고, SUPER 유저에겐 아무 의미 없는 "25/25" 가 떠 있었다. 화면의 주제를
 * 보석으로 바꾼다.
 *
 * 숫자만 크게 찍으면 정적이라, 보석이 천천히 떠오르고 별 세 개가 엇갈려 반짝인다.
 */
const SPARKS = [
  { top: 16, right: 96, size: 11, delay: 0 },
  { top: 54, right: 58, size: 8, delay: 700 },
  { top: 30, right: 34, size: 14, delay: 1300 },
];

function Spark({ top, right, size, delay }: (typeof SPARKS)[number]) {
  const v = useSharedValue(0);
  useEffect(() => {
    v.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 620, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 620, easing: Easing.in(Easing.quad) }),
          withTiming(0, { duration: 900 }),
        ),
        -1,
        false,
      ),
    );
  }, [delay, v]);
  const st = useAnimatedStyle(() => ({
    opacity: v.value,
    transform: [{ scale: 0.6 + v.value * 0.6 }],
  }));
  return (
    <Animated.View style={[{ position: "absolute", top, right }, st]}>
      <Ionicons name="sparkles" size={size} color="#fff" />
    </Animated.View>
  );
}

interface Props {
  gems: number;
  premiumUntilLabel: string | null;
}

export default function GemHero({ gems, premiumUntilLabel }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);

  // 보석이 아주 천천히 오르내린다 — 카드가 살아 있는 느낌
  const float = useSharedValue(0);
  useEffect(() => {
    float.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 1500, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, [float]);
  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: float.value }],
  }));

  return (
    <LinearGradient
      colors={["#5B4BD8", "#8B6BF2", "#3BB6E5"]}
      locations={[0, 0.55, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={s.card}
    >
      {SPARKS.map((sp) => (
        <Spark key={`${sp.top}-${sp.right}`} {...sp} />
      ))}

      <View style={s.left}>
        <Text style={s.label}>{t("shop.balance")}</Text>
        <View style={s.amountRow}>
          <Ionicons name="diamond" size={26} color="#9CE8FF" />
          <Text style={s.amount}>{gems.toLocaleString("en-US")}</Text>
        </View>
        <Text style={s.hint}>{t("shop.gemWorth")}</Text>
      </View>

      <Animated.View style={[s.bigGem, floatStyle]}>
        <Ionicons name="diamond" size={66} color="rgba(255,255,255,0.22)" />
      </Animated.View>

      {premiumUntilLabel && (
        <View style={s.untilChip}>
          <Ionicons name="shield-checkmark" size={13} color="#fff" />
          <Text style={s.untilText}>
            {t("shop.premiumUntil", { date: premiumUntilLabel })}
          </Text>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = (_theme: ThemeColors) =>
  StyleSheet.create({
    card: {
      marginHorizontal: 20,
      marginTop: 8,
      marginBottom: 22,
      borderRadius: 22,
      paddingVertical: 18,
      paddingHorizontal: 18,
      overflow: "hidden",
    },
    left: { gap: 2 },
    label: {
      fontSize: 11,
      fontWeight: "900",
      letterSpacing: 1,
      color: "rgba(255,255,255,0.75)",
      textTransform: "uppercase",
    },
    amountRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    amount: {
      fontSize: 38,
      fontWeight: "900",
      color: "#fff",
      letterSpacing: -0.5,
    },
    hint: { fontSize: 11, fontWeight: "700", color: "rgba(255,255,255,0.72)" },
    bigGem: { position: "absolute", right: -6, bottom: -10 },
    untilChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      alignSelf: "flex-start",
      marginTop: 14,
      paddingHorizontal: 11,
      paddingVertical: 6,
      borderRadius: 11,
      backgroundColor: "rgba(0,0,0,0.22)",
    },
    untilText: { fontSize: 12, fontWeight: "800", color: "#fff" },
  });
