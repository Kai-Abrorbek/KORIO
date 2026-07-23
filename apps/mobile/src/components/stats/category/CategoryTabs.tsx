import { ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { StudyCategory } from "@/types/stats";
import { CATEGORY_LIST } from "@/constants/stats";

interface Props {
  value: StudyCategory;
  onChange: (v: StudyCategory) => void;
}

export default function CategoryTabs({ value, onChange }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {CATEGORY_LIST.map((cat) => {
        const active = value === cat;
        return (
          <TouchableOpacity
            key={cat}
            style={[styles.pill, active && styles.pillActive]}
            onPress={() => onChange(cat)}
            activeOpacity={0.7}
          >
            <Text style={[styles.text, active && styles.textActive]}>
              {t(`stats.category.${cat}`)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    row: {
      paddingHorizontal: 16,
      paddingVertical: 14,
      gap: 8,
    },
    pill: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 10,
    },
    pillActive: {
      backgroundColor: theme.bg === "#ffffff" ? "#F5F4FB" : "#2A2A33",
    },
    text: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    textActive: {
      color: theme.text,
      fontWeight: "800",
    },
  });
