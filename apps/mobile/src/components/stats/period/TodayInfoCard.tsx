import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import StatsCard from "../shared/StatsCard";

interface Props {
  hasData: boolean;
}

export default function TodayInfoCard({ hasData }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View>
      <Text style={styles.sectionTitle}>{t("stats.todayInfo")}</Text>
      <StatsCard style={styles.card}>
        {!hasData ? (
          <View style={styles.empty}>
            <View style={styles.iconWrap}>
              <Ionicons name="warning" size={32} color={theme.textSecondary} />
            </View>
            <Text style={styles.emptyTitle}>{t("stats.emptyTodayTitle")}</Text>
            <Text style={styles.emptyDesc}>{t("stats.emptyTodayDesc")}</Text>
          </View>
        ) : null}
      </StatsCard>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    sectionTitle: {
      fontSize: 20,
      fontWeight: "800",
      color: theme.text,
      marginHorizontal: 20,
      marginBottom: 12,
      marginTop: 8,
    },
    card: {
      paddingVertical: 28,
    },
    empty: {
      alignItems: "center",
      gap: 8,
    },
    iconWrap: {
      opacity: 0.5,
      marginBottom: 4,
    },
    emptyTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: theme.text,
    },
    emptyDesc: {
      fontSize: 13,
      color: theme.textSecondary,
    },
  });
