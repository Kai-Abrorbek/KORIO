import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import type { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface Props {
  section: number;
  color: string;
}

/**
 * 급수 안에서 섹션이 바뀌는 자리.
 *
 * 급수 전체를 한 흐름으로 보여주되(섹션마다 화면을 끊지 않는다) 주제가
 * 바뀌는 지점은 알려준다. 잠금 장치가 아니라 이정표다.
 */
export default function SectionDivider({ section, color }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.wrap}>
      <View style={[styles.line, { backgroundColor: `${color}55` }]} />
      <View style={[styles.chip, { borderColor: `${color}66` }]}>
        <Ionicons name="flag" size={13} color={color} />
        <Text style={[styles.text, { color }]}>
          {t("studyPath.sectionStart", { n: section })}
        </Text>
      </View>
      <View style={[styles.line, { backgroundColor: `${color}55` }]} />
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 22,
      marginTop: 10,
      marginBottom: 4,
    },
    line: { flex: 1, height: 2, borderRadius: 999 },
    chip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 11,
      minHeight: 28,
      borderRadius: 999,
      borderWidth: 1.5,
      backgroundColor: theme.surface,
    },
    text: { fontSize: 12, fontWeight: "900" },
  });
