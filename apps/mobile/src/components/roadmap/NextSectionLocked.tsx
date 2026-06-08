import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  sectionNumber: number;
  description: string;
  onJump?: () => void;
}

export default function NextSectionLocked({
  sectionNumber,
  description,
  onJump,
}: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.dividerLine} />

      <View style={styles.labelPill}>
        <Text style={styles.labelText}>다음 섹션</Text>
      </View>

      <View style={styles.titleRow}>
        <Ionicons name="lock-closed" size={20} color={theme.textSecondary} />
        <Text style={styles.titleText}>섹션 {sectionNumber}</Text>
      </View>

      <Text style={styles.description}>{description}</Text>

      <TouchableOpacity
        style={styles.jumpBtn}
        onPress={onJump}
        activeOpacity={0.8}
      >
        <Text style={styles.jumpBtnText}>여기로 건너뛸까요?</Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 32,
      gap: 12,
    },
    dividerLine: {
      width: "100%",
      height: 1.5,
      backgroundColor: theme.border,
      marginBottom: 16,
    },
    labelPill: {
      backgroundColor: theme.border,
      borderRadius: 999,
      paddingHorizontal: 14,
      paddingVertical: 5,
    },
    labelText: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    titleText: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
    },
    description: {
      fontSize: 14,
      color: theme.textSecondary,
      textAlign: "center",
      lineHeight: 22,
      paddingHorizontal: 8,
    },
    jumpBtn: {
      marginTop: 12,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderBottomWidth: 4,
      borderColor: theme.border,
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 32,
      width: "100%",
      alignItems: "center",
    },
    jumpBtnText: {
      fontSize: 15,
      fontWeight: "800",
      color: "#45B7D1",
    },
  });
