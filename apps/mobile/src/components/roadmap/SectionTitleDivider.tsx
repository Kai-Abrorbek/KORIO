import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  title: string;
}

export default function SectionTitleDivider({ title }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{title}</Text>
      <View style={styles.line} />
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 24,
      marginTop: 8,
      marginBottom: 24,
      gap: 12,
    },
    line: {
      flex: 1,
      height: 2,
      backgroundColor: theme.border,
    },
    text: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.textSecondary,
    },
  });
