import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import type { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { darken } from "@/utils/color";

interface Props {
  level: number;
  /** 이미 통과한 급이면 "다시 보기" 로 */
  passed: boolean;
  onPress: () => void;
}

/**
 * 로드맵 맨 아래 — 그 급을 전부 끝냈을 때 나타나는 졸업 시험 카드.
 * 떨어져도 다음 급은 열리므로 관문이 아니라 매듭에 가깝다.
 */
export default function LevelExamCard({ level, passed, onPress }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const color = passed ? "#1D9E75" : "#E2A83A";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.wrap, pressed && styles.pressed]}
    >
      <View style={[styles.depth, { backgroundColor: darken(color, 38) }]} />
      <LinearGradient
        colors={[color, darken(color, 16)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.shine} pointerEvents="none" />
        <View style={styles.orb} pointerEvents="none" />

        <View style={styles.icon}>
          <Ionicons
            name={passed ? "ribbon" : "school"}
            size={26}
            color="#fff"
          />
        </View>

        <View style={styles.texts}>
          <Text style={styles.title}>
            {t("levelExam.cardTitle", { n: level })}
          </Text>
          <Text style={styles.desc}>
            {t(passed ? "levelExam.cardDone" : "levelExam.cardBody")}
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color="rgba(255,255,255,0.9)"
        />
      </LinearGradient>
    </Pressable>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: { position: "relative", marginHorizontal: 14, marginTop: 18 },
    pressed: { transform: [{ translateY: 2 }] },
    depth: {
      position: "absolute",
      top: 6,
      left: 0,
      right: 0,
      bottom: -4,
      borderRadius: 22,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      borderRadius: 22,
      paddingVertical: 17,
      paddingHorizontal: 16,
      overflow: "hidden",
      borderWidth: 1.5,
      borderColor: "rgba(255,255,255,0.28)",
    },
    shine: {
      position: "absolute",
      top: 0,
      left: 18,
      right: 18,
      height: 2,
      borderRadius: 999,
      backgroundColor: "rgba(255,255,255,0.52)",
    },
    orb: {
      position: "absolute",
      width: 104,
      height: 104,
      borderRadius: 999,
      right: -32,
      top: -46,
      backgroundColor: "rgba(255,255,255,0.12)",
    },
    icon: {
      width: 50,
      height: 50,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.2)",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.26)",
    },
    texts: { flex: 1, gap: 3 },
    title: { fontSize: 17, fontWeight: "900", color: "#fff" },
    desc: {
      fontSize: 12.5,
      fontWeight: "600",
      color: "rgba(255,255,255,0.88)",
      lineHeight: 17,
    },
  });
