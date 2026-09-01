import { useEffect } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Animated, {
  cancelAnimation,
  Easing,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import type { ChestClaimResult } from "@/services/lesson.service";

const GRADE_COLOR: Record<string, [string, string]> = {
  wood: ["#C08552", "#8A5A32"],
  silver: ["#C9D1D9", "#8B949E"],
  gold: ["#FFD900", "#E5AE00"],
};

/**
 * 상자를 열었을 때 뜨는 보상 화면.
 *
 * 예전에는 노드를 끝내는 순간 보석이 조용히 들어가고 알림만 떴다. 받은 줄도
 * 모르는 보상은 보상이 아니다. 여기서 상자가 흔들리고 열리는 걸 보여준다.
 *
 * 숫자는 서버가 준 값을 그대로 쓴다. 화면에서 다시 계산하면 서버와 어긋나는
 * 순간 유저는 화면 숫자를 믿는다.
 */
export default function ChestRewardModal({
  result,
  onClose,
}: {
  result: ChestClaimResult | null;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);

  const shake = useSharedValue(0);
  const pop = useSharedValue(0);
  const glow = useSharedValue(0);

  const open = !!result;

  useEffect(() => {
    if (!open) return;
    // 흔들 → 열림 → 은은한 빛. 렌더 중이 아니라 뜰 때 한 번만 건다
    shake.value = withSequence(
      withRepeat(
        withSequence(
          withTiming(-1, { duration: 70 }),
          withTiming(1, { duration: 70 }),
        ),
        4,
        true,
      ),
      withTiming(0, { duration: 90 }),
    );
    pop.value = withDelay(
      620,
      withTiming(1, { duration: 420, easing: Easing.out(Easing.back(2)) }),
    );
    glow.value = withDelay(
      700,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 900 }),
          withTiming(0.35, { duration: 900 }),
        ),
        -1,
        false,
      ),
    );
    return () => {
      cancelAnimation(shake);
      cancelAnimation(pop);
      cancelAnimation(glow);
      shake.value = 0;
      pop.value = 0;
      glow.value = 0;
    };
  }, [open, shake, pop, glow]);

  const chestStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${shake.value * 7}deg` },
      { scale: 1 + pop.value * 0.12 },
    ],
  }));
  const rewardStyle = useAnimatedStyle(() => ({
    opacity: pop.value,
    transform: [{ translateY: (1 - pop.value) * 14 }],
  }));
  const glowStyle = useAnimatedStyle(() => ({ opacity: glow.value * 0.45 }));

  const grade = result?.grade ?? "wood";
  const [light, dark] = GRADE_COLOR[grade] ?? GRADE_COLOR.wood;

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={s.backdrop} onPress={onClose}>
        <Animated.View entering={FadeIn.duration(180)} style={s.card}>
          <View style={s.chestWrap}>
            <Animated.View style={[s.glow, { backgroundColor: light }, glowStyle]} />
            <Animated.View style={chestStyle}>
              <MaterialCommunityIcons
                name="treasure-chest"
                size={96}
                color={light}
              />
            </Animated.View>
          </View>

          <Animated.View style={[s.reward, rewardStyle]}>
            <Text style={[s.grade, { color: dark }]}>
              {t(`roadmap.chestGrade.${grade}`)}
            </Text>
            <View style={s.gemRow}>
              <Ionicons name="diamond" size={26} color="#45B7D1" />
              <Text style={s.gems}>+{result?.gems ?? 0}</Text>
            </View>
            {(result?.claimed ?? 0) > 1 && (
              <Text style={s.multi}>
                {t("roadmap.chestMulti", { count: result?.claimed ?? 0 })}
              </Text>
            )}
          </Animated.View>

          <Pressable style={s.cta} onPress={onClose}>
            <Text style={s.ctaText}>{t("roadmap.chestTake")}</Text>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.55)",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 32,
    },
    card: {
      alignSelf: "stretch",
      backgroundColor: theme.bg,
      borderRadius: 26,
      paddingVertical: 28,
      paddingHorizontal: 22,
      alignItems: "center",
      gap: 16,
    },
    chestWrap: { alignItems: "center", justifyContent: "center", height: 120 },
    glow: {
      position: "absolute",
      width: 150,
      height: 150,
      borderRadius: 75,
    },
    reward: { alignItems: "center", gap: 6 },
    grade: { fontSize: 15, fontWeight: "900", letterSpacing: 0.5 },
    gemRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    gems: {
      fontSize: 38,
      fontWeight: "900",
      color: theme.text,
      fontVariant: ["tabular-nums"],
    },
    multi: { fontSize: 13, fontWeight: "700", color: theme.textSecondary },
    cta: {
      alignSelf: "stretch",
      backgroundColor: "#58CC02",
      borderBottomWidth: 5,
      borderColor: "#46A302",
      borderRadius: 999,
      paddingVertical: 15,
      alignItems: "center",
      marginTop: 4,
    },
    ctaText: { color: "#fff", fontSize: 17, fontWeight: "900" },
  });
