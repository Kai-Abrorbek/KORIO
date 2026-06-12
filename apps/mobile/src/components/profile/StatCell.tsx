import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  emoji?: string;
  value: string;
}

export default function StatCell({ iconName, iconColor, emoji, value }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.cell}>
      {emoji ? (
        <Text style={styles.emoji}>{emoji}</Text>
      ) : iconName ? (
        <Ionicons name={iconName} size={26} color={iconColor ?? theme.text} />
      ) : null}
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    cell: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    emoji: {
      fontSize: 24,
    },
    value: {
      fontSize: 18,
      fontWeight: "800",
      color: theme.text,
    },
  });
