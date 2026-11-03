import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import HaneulmonMascot from "@/components/home/HaneulmonMascot";
import { EndReason } from "@/types/word-chain";
import { CenteredModal, DialogButton, useDialogTheme } from "@/components/common/CenteredModal";
import { ThemeColors } from "@/constants/theme";

interface Props {
  reason: EndReason;
  score: number;
  turnCount: number;
  bestCombo: number;
  /** 없으면 "다시 하기" 를 숨긴다 — 리그 챌린지는 에너지를 내고 한 판만 한다 */
  onPlayAgain?: () => void;
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
  const theme = useDialogTheme();
  const styles = getStyles(theme);

  const isWin = reason === "ai-surrender";

  return (
    <CenteredModal visible onClose={onExit} backdropDismissible={false}>
        <View style={styles.mascotWrap}>
          <HaneulmonMascot size={100} mood={isWin ? "celebrating" : "wrong"} />
        </View>

        <Text style={[styles.title, { color: isWin ? theme.primary : theme.error }]}>
          {isWin ? t("wordChain.win") : t("wordChain.lose")}
        </Text>
        <Text style={styles.subtitle}>
          {isWin ? t("wordChain.aiSurrender") : t("wordChain.noHearts")}
        </Text>

        <View style={styles.statsRow}>
          <Stat
            icon="flash"
            color={theme.onYellow}
            label={t("wordChain.finalScore")}
            value={score.toString()}
            theme={theme}
          />
          <View style={styles.divider} />
          <Stat
            icon="repeat"
            color={theme.primary}
            label={t("wordChain.turns")}
            value={turnCount.toString()}
            theme={theme}
          />
          <View style={styles.divider} />
          <Stat
            icon="flame"
            color={theme.onPink}
            label={t("wordChain.maxCombo")}
            value={bestCombo.toString()}
            theme={theme}
          />
        </View>

        {onPlayAgain ? (
          <DialogButton
            label={t("wordChain.playAgain")}
            onPress={onPlayAgain}
            style={{ marginTop: 8 }}
          />
        ) : null}
        <DialogButton variant="secondary" label={t("wordChain.exit")} onPress={onExit} style={{ marginTop: 8 }} />
    </CenteredModal>
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
      marginTop: 0,
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
