import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { League } from "@/types/profile";
import { LEAGUE_COLORS } from "@/mocks/profile.mock";
import StatCell from "./StatCell";

interface Props {
  streak: number;
  languageFlag: string;
  languageLevel: number;
  league: League;
  totalXp: number;
}

export default function LearningStatusGrid({
  streak,
  languageFlag,
  languageLevel,
  league,
  totalXp,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{t("profile.learningStatus")}</Text>

      <View style={styles.grid}>
        <View style={styles.row}>
          <StatCell
            iconName="flame"
            iconColor="#FF7A00"
            value={t("profile.streakDays", { count: streak })}
          />
          <StatCell emoji={languageFlag} value={languageLevel.toString()} />
        </View>

        <View style={styles.row}>
          <StatCell
            iconName="trophy"
            iconColor={LEAGUE_COLORS[league]}
            value={t(`profile.league.${league}`)}
          />
          <StatCell
            iconName="flash"
            iconColor="#FFCC00"
            value={t("profile.xp", { count: totalXp })}
          />
        </View>
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      paddingHorizontal: 20,
      marginBottom: 32,
    },
    title: {
      fontSize: 18,
      fontWeight: "800",
      color: theme.textSecondary,
      marginBottom: 18,
    },
    grid: {
      gap: 18,
    },
    row: {
      flexDirection: "row",
      gap: 12,
    },
  });
