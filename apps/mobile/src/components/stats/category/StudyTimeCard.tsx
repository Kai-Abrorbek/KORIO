import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import StatsCard from "../shared/StatsCard";

interface Props {
  todayTime: string;
  totalTime: string;
}

export default function StudyTimeCard({ todayTime, totalTime }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <StatsCard style={styles.card}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Ionicons name="time" size={20} color="#F7A8C0" />
          <Text style={styles.label}>{t("stats.todayStudyTime")}</Text>
        </View>
        <Text style={styles.value}>{todayTime}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.left}>
          <Ionicons name="time" size={20} color="#7DC3F8" />
          <Text style={styles.label}>{t("stats.totalStudyTime")}</Text>
        </View>
        <Text style={styles.value}>{totalTime}</Text>
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
  });
