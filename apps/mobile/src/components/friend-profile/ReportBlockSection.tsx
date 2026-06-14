import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  onReport?: () => void;
  onBlock?: () => void;
}

export default function ReportBlockSection({ onReport, onBlock }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.wrap}>
      <TouchableOpacity
        style={styles.btn}
        onPress={onReport}
        activeOpacity={0.6}
      >
        <Ionicons name="flag-outline" size={20} color={theme.textSecondary} />
        <Text style={styles.text}>{t("friendProfile.report")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={onBlock}
        activeOpacity={0.6}
      >
        <Ionicons name="ban-outline" size={20} color={theme.textSecondary} />
        <Text style={styles.text}>{t("friendProfile.block")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      paddingVertical: 16,
      paddingHorizontal: 20,
      gap: 16,
      alignItems: "center",
    },
    btn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 8,
    },
    text: {
      fontSize: 15,
      fontWeight: "700",
      color: theme.textSecondary,
    },
  });
