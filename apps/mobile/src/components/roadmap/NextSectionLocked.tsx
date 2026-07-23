import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  sectionNumber: number;
  title: string;
  description: string;
  onJump?: () => void;
}

export default function NextSectionLocked({
  sectionNumber,
  title,
  description,
  onJump,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      {/* 배지 */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{t("roadmap.nextSection")}</Text>
      </View>

      {/* 잠금 + 섹션명 */}
      <View style={styles.titleRow}>
        <Ionicons name="lock-closed" size={22} color={theme.textSecondary} />
        <Text style={styles.title}>{title || `Section ${sectionNumber}`}</Text>
      </View>

      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}

      {/* 건너뛰기 */}
      <TouchableOpacity
        style={styles.jumpBtn}
        onPress={onJump}
        activeOpacity={0.85}
      >
        <View style={styles.jumpBtnDepth} />
        <View style={styles.jumpBtnFace}>
          <Text style={styles.jumpBtnText}>{t("roadmap.jumpHere")}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.surface,
      borderTopWidth: 1.5,
      borderTopColor: theme.border,
      alignItems: "center",
      paddingHorizontal: 24,
      paddingTop: 28,
      paddingBottom: 40,
    },
    badge: {
      backgroundColor: theme.border,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 7,
      marginBottom: 20,
    },
    badgeText: {
      fontSize: 13,
      fontWeight: "800",
      color: theme.textSecondary,
      letterSpacing: 0.2,
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 14,
    },
    title: {
      fontSize: 26,
      fontWeight: "900",
      color: theme.textSecondary,
      letterSpacing: -0.4,
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "500",
      textAlign: "center",
      color: theme.textSecondary,
      marginBottom: 26,
    },
    // 바텀보더 입체 버튼
    jumpBtn: {
      alignSelf: "stretch",
      height: 56,
    },
    jumpBtnDepth: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 4,
      height: 52,
      borderRadius: 14,
      backgroundColor: theme.border,
    },
    jumpBtnFace: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: 52,
      borderRadius: 14,
      borderWidth: 2,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      alignItems: "center",
      justifyContent: "center",
    },
    jumpBtnText: {
      fontSize: 16,
      fontWeight: "800",
      color: "#4BA3F5",
      letterSpacing: -0.2,
    },
  });
