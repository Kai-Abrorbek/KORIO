import { ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { StudyCategory } from "@/types/stats";
import { CATEGORY_COLORS, CATEGORY_LIST } from "@/constants/stats";

interface Props {
  value: StudyCategory;
  onChange: (v: StudyCategory) => void;
}

/**
 * 학습별 탭.
 *
 * 예전엔 ALL_CATEGORIES 를 돌아서 "기타" 탭까지 떴다. 기타는 분류가 안 된
 * 나머지를 담는 통이라 유저가 골라서 볼 대상이 아니다 — 눌러도 할 말이
 * 없는 탭이었다. 고를 수 있는 목록은 CATEGORY_LIST 하나뿐이다.
 *
 * 고른 탭에 그 분야의 색을 입힌다. 아래 카드·막대가 전부 같은 색을 쓰기
 * 때문에, 탭이 회색이면 색이 어디서 온 건지 알 수가 없다.
 */
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
        const color = CATEGORY_COLORS[cat];
        return (
          <TouchableOpacity
            key={cat}
            style={[
              styles.pill,
              active && {
                backgroundColor: color,
                borderColor: color,
                borderBottomColor: shade(color),
                borderBottomWidth: 3,
              },
            ]}
            onPress={() => onChange(cat)}
            activeOpacity={0.85}
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

/** 눌린 느낌을 주는 바텀보더용 어두운 색. #RRGGBB 만 들어온다 */
function shade(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  const dim = (v: number) => Math.max(0, Math.round(v * 0.72));
  const r = dim((n >> 16) & 255);
  const g = dim((n >> 8) & 255);
  const b = dim(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    row: {
      paddingHorizontal: 16,
      paddingVertical: 14,
      gap: 8,
    },
    pill: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: theme.border,
      backgroundColor: theme.surface,
    },
    text: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    textActive: {
      color: "#fff",
      fontWeight: "900",
    },
  });
