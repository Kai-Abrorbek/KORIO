import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  label: string;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function PaginationArrows({ label, onPrev, onNext }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={onPrev} hitSlop={10} activeOpacity={0.6}>
        <Ionicons name="chevron-back" size={16} color={theme.text} />
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={onNext} hitSlop={10} activeOpacity={0.6}>
        <Ionicons name="chevron-forward" size={16} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    label: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text,
    },
  });
