import { View, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function StatsCard({ children, style }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  return <View style={[styles.card, style]}>{children}</View>;
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.surface,
      borderRadius: 18,
      padding: 18,
      marginHorizontal: 16,
      marginBottom: 14,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 12,
      elevation: 2,
    },
  });
