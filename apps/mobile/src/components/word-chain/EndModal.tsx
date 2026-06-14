import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import OwlMascot from "@/components/lesson/OwlMascot";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { EndReason } from "@/types/word-chain";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  reason: EndReason;
  score: number;
  turnCount: number;
  bestCombo: number;
  onPlayAgain: () => void;
  onExit: () => void;
}

export default function EndModal({
  reason,
  score,
  turnCount,
  bestCombo,
  onPlayAgain,
  onExit,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  const isWin = reason === "ai-surrender";
  const sheetY = useSharedValue(800);
  const backdrop = useSharedValue(0);

  useEffect(() => {
    backdrop.value = withTiming(1, { duration: 300 });
    sheetY.value = withDelay(
      120,
      withSpring(0, { damping: 13, stiffness: 130 }),
    );
  }, []);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdrop.value,
  }));
  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetY.value }],
  }));

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View style={[styles.backdrop, backdropStyle]} />
      <Animated.View style={[styles.sheet, sheetStyle]}>
        <View style={styles.mascotWrap}>
          <OwlMascot state={isWin ? "complete" : "wrong"} size={100} />
        </View>

        <Text style={[styles.title, { color: isWin ? "#58CC02" : "#FF4B4B" }]}>
          {isWin ? t("wordChain.win") : t("wordChain.lose")}
        </Text>
        <Text style={styles.subtitle}>
          {isWin ? t("wordChain.aiSurrender") : t("wordChain.noHearts")}
        </Text>

        <View style={styles.statsRow}>
          <Stat
            icon="flash"
            color="#FFD000"
            label={t("wordChain.finalScore")}
            value={score.toString()}
            theme={theme}
          />
          <View style={styles.divider} />
          <Stat
            icon="repeat"
            color="#1FA9F7"
            label={t("wordChain.turns")}
            value={turnCount.toString()}
            theme={theme}
          />
          <View style={styles.divider} />
          <Stat
            icon="flame"
            color="#FF6A00"
            label={t("wordChain.maxCombo")}
            value={bestCombo.toString()}
            theme={theme}
          />
        </View>

        <PrimaryButton
          label={t("wordChain.playAgain")}
          color="#776ee2"
          darkColor="#5448E0"
          onPress={onPlayAgain}
          style={{ marginTop: 8 }}
        />
        <TouchableOpacity onPress={onExit} style={styles.exit}>
          <Text style={styles.exitText}>{t("wordChain.exit")}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

function Stat({
  icon,
  color,
  label,
  value,
  theme,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  label: string;
  value: string;
  theme: ThemeColors;
}) {
  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <Ionicons name={icon} size={20} color={color} />
      <Text
        style={{
          fontSize: 22,
          fontWeight: "900",
          color: theme.text,
          marginTop: 2,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontSize: 10,
          fontWeight: "700",
          color: theme.textSecondary,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          marginTop: 2,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFill,
      backgroundColor: "rgba(0,0,0,0.6)",
    },
    sheet: {
      position: "absolute",
      left: 16,
      right: 16,
      top: "12%",
      backgroundColor: theme.bg,
      borderRadius: 28,
      padding: 24,
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowRadius: 24,
      elevation: 16,
    },
    mascotWrap: {
      marginTop: -60,
      marginBottom: 8,
    },
    title: {
      fontSize: 32,
      fontWeight: "900",
      letterSpacing: -0.5,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
      marginBottom: 22,
    },
    statsRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.surface,
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 8,
      marginBottom: 22,
      borderWidth: 1.5,
      borderColor: theme.border,
      width: "100%",
    },
    divider: {
      width: 1,
      height: 36,
      backgroundColor: theme.border,
    },
    exit: {
      marginTop: 10,
      paddingVertical: 10,
    },
    exitText: {
      color: theme.textSecondary,
      fontSize: 14,
      fontWeight: "700",
    },
  });
