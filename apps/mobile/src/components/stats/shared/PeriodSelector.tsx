import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { StudyPeriod } from "@/types/stats";

interface Props {
  value: StudyPeriod;
  onChange: (p: StudyPeriod) => void;
}

const OPTIONS: StudyPeriod[] = ["week", "month", "year", "all"];

export default function PeriodSelector({ value, onChange }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.row}>
      {OPTIONS.map((opt) => {
        const active = value === opt;
        return (
          <TouchableOpacity
            key={opt}
            style={[styles.pill, active && styles.pillActive]}
            onPress={() => onChange(opt)}
            activeOpacity={0.7}
          >
            <Text style={[styles.text, active && styles.textActive]}>
              {t(`stats.period.${opt}`)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignSelf: "flex-start",
      backgroundColor: theme.bg,
      borderRadius: 12,
      padding: 4,
      marginBottom: 14,
    },
    pill: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 9,
    },
    pillActive: {
      backgroundColor: theme.surface,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 3,
      elevation: 2,
    },
    text: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    textActive: {
      color: theme.text,
    },
  });
