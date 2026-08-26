import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, ZoomIn } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import CelebrationMascot from "@/components/lesson-complete/CelebrationMascot";
import Confetti from "@/components/lesson-complete/Confetti";
import HaneulmonMascot from "@/components/home/HaneulmonMascot";
import type { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { darken } from "@/utils/color";

const PASS_COLOR = "#1D9E75";
const MISS_COLOR = "#776ee2";

/**
 * 급수 졸업 시험 결과.
 *
 * 떨어져도 다음 급은 열린다. 그래서 이 화면은 합격/불합격을 선고하는 자리가
 * 아니라 "여기까지 왔고, 이건 더 봐야 한다"를 알려주는 자리다.
 */
export default function LevelExamResultScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getStyles(theme);

  const params = useLocalSearchParams<{
    passed?: string;
    correct?: string;
    total?: string;
    level?: string;
    nextLevel?: string;
    weak?: string;
    gems?: string;
    xp?: string;
  }>();

  const passed = params.passed === "1";
  const correct = Number(params.correct ?? 0);
  const total = Number(params.total ?? 0);
  const level = Number(params.level ?? 1);
  const nextLevel = Number(params.nextLevel) || null;
  const gems = Number(params.gems ?? 0);
  const xp = Number(params.xp ?? 0);
  const weak = (params.weak ?? "").split(",").filter(Boolean);
  const color = passed ? PASS_COLOR : MISS_COLOR;
  const ratio = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      {passed ? <Confetti /> : null}

      <View style={styles.content}>
        <Animated.View entering={ZoomIn.duration(420)} style={styles.mascot}>
          {passed ? (
            <CelebrationMascot size={170} style={"spin"} />
          ) : (
            <HaneulmonMascot size={150} mood="default" />
          )}
        </Animated.View>

        <Animated.Text
          entering={FadeInDown.delay(120).duration(360)}
          style={[styles.title, { color }]}
        >
          {t(passed ? "levelExam.passedTitle" : "levelExam.missedTitle", {
            n: level,
          })}
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(180).duration(360)}
          style={styles.subtitle}
        >
          {t(passed ? "levelExam.passedBody" : "levelExam.missedBody")}
        </Animated.Text>

        <Animated.View
          entering={FadeInDown.delay(240).duration(360)}
          style={styles.scoreCard}
        >
          <Text style={[styles.scoreBig, { color }]}>{ratio}%</Text>
          <Text style={styles.scoreSub}>
            {t("levelExam.score", { correct, total })}
          </Text>
        </Animated.View>

        {passed && (gems > 0 || xp > 0) ? (
          <Animated.View
            entering={FadeInDown.delay(300).duration(360)}
            style={styles.rewards}
          >
            {gems > 0 ? (
              <View style={styles.reward}>
                <Ionicons name="diamond" size={19} color="#45B7D1" />
                <Text style={styles.rewardText}>+{gems}</Text>
              </View>
            ) : null}
            {xp > 0 ? (
              <View style={styles.reward}>
                <Ionicons name="flash" size={19} color="#FFB020" />
                <Text style={styles.rewardText}>+{xp} XP</Text>
              </View>
            ) : null}
          </Animated.View>
        ) : null}

        {weak.length > 0 ? (
          <Animated.View
            entering={FadeInDown.delay(340).duration(360)}
            style={styles.weakCard}
          >
            <Text style={styles.weakLabel}>{t("levelExam.weakTitle")}</Text>
            <View style={styles.weakChips}>
              {weak.map((area) => (
                <View key={area} style={styles.weakChip}>
                  <Text style={styles.weakChipText}>
                    {t(`levelExam.area.${area}`, {
                      defaultValue: t("levelExam.area.etc"),
                    })}
                  </Text>
                </View>
              ))}
            </View>
          </Animated.View>
        ) : null}

        {nextLevel ? (
          <Animated.Text
            entering={FadeInDown.delay(380).duration(360)}
            style={styles.nextNote}
          >
            {t("levelExam.nextOpen", { n: nextLevel })}
          </Animated.Text>
        ) : null}
      </View>

      <View style={[styles.actions, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable
          onPress={() => router.replace("/study-path")}
          style={({ pressed }) => [
            styles.primaryWrap,
            pressed && styles.pressed,
          ]}
        >
          <View
            style={[
              styles.primaryDepth,
              { backgroundColor: darken(color, 38) },
            ]}
          />
          <LinearGradient
            colors={[color, darken(color, 16)]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.primary}
          >
            <Text style={styles.primaryText}>{t("levelExam.continue")}</Text>
          </LinearGradient>
        </Pressable>

        {!passed ? (
          <Pressable
            onPress={() =>
              router.replace({
                pathname: "/lesson",
                params: { mode: "levelExam", from: "studyPath" },
              })
            }
            style={styles.retry}
          >
            <Text style={[styles.retryText, { color }]}>
              {t("levelExam.retry")}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    content: {
      flex: 1,
      alignItems: "center",
      paddingHorizontal: 24,
      gap: 10,
    },
    mascot: { marginBottom: 4 },
    title: {
      fontSize: 25,
      fontWeight: "900",
      textAlign: "center",
      letterSpacing: -0.4,
    },
    subtitle: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
      lineHeight: 20,
    },
    scoreCard: {
      marginTop: 12,
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 32,
      borderRadius: 20,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    scoreBig: { fontSize: 40, fontWeight: "900", letterSpacing: -1 },
    scoreSub: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    rewards: { flexDirection: "row", gap: 10, marginTop: 4 },
    reward: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 12,
      minHeight: 34,
      borderRadius: 12,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    rewardText: { fontSize: 14, fontWeight: "900", color: theme.text },
    weakCard: {
      marginTop: 8,
      width: "100%",
      padding: 14,
      borderRadius: 18,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      gap: 9,
    },
    weakLabel: {
      fontSize: 12.5,
      fontWeight: "800",
      color: theme.textSecondary,
    },
    weakChips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    weakChip: {
      paddingHorizontal: 12,
      minHeight: 32,
      justifyContent: "center",
      borderRadius: 11,
      backgroundColor: `${MISS_COLOR}1A`,
    },
    weakChipText: { fontSize: 13, fontWeight: "800", color: MISS_COLOR },
    nextNote: {
      marginTop: 6,
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
      textAlign: "center",
    },
    actions: { paddingHorizontal: 20, gap: 10 },
    primaryWrap: { position: "relative" },
    pressed: { transform: [{ translateY: 2 }] },
    primaryDepth: {
      position: "absolute",
      top: 5,
      left: 0,
      right: 0,
      bottom: -3,
      borderRadius: 18,
    },
    primary: {
      minHeight: 56,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: "rgba(255,255,255,0.26)",
    },
    primaryText: { color: "#fff", fontSize: 17, fontWeight: "900" },
    retry: { minHeight: 46, alignItems: "center", justifyContent: "center" },
    retryText: { fontSize: 15, fontWeight: "800" },
  });
