import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import StatsCard from "../shared/StatsCard";

interface Props {
  trophyLevel: number | null;
  totalProblems: number;
  category: string;
}

export default function TrophyCard({
  trophyLevel,
  totalProblems,
  category,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <StatsCard style={styles.card}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Ionicons name="trophy" size={20} color="#F4B860" />
          <Text style={styles.label}>
            {t("stats.categoryTrophy", { category })}
          </Text>
          <Ionicons
            name="help-circle-outline"
            size={14}
            color={theme.textSecondary}
          />
        </View>
        <Text style={styles.valueMuted}>
          {trophyLevel == null ? "--" : trophyLevel}
        </Text>
      </View>
      <View style={styles.row}>
        <View style={styles.left}>
          <Ionicons name="star" size={20} color="#7DC3F8" />
          <Text style={styles.label}>{t("stats.totalProblems")}</Text>
        </View>
        <Text style={styles.value}>{totalProblems}</Text>
      </View>
    </StatsCard>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    card: {
      gap: 14,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    left: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    label: {
      fontSize: 15,
      fontWeight: "600",
      color: theme.text,
    },
    value: {
      fontSize: 18,
      fontWeight: "800",
      color: theme.text,
    },
    valueMuted: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.textSecondary,
    },
  });
