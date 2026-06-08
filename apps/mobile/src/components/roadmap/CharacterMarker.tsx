import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BoriMascot from "@/components/BoriMascot";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  hearts?: number; // 캐릭터 밑에 표시할 별/하트 개수
}

export default function CharacterMarker({ hearts = 3 }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <BoriMascot size={80} />
      <View style={styles.starsRow}>
        {Array.from({ length: hearts }).map((_, i) => (
          <Ionicons key={i} name="star" size={14} color={theme.border} />
        ))}
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      gap: 4,
    },
    starsRow: {
      flexDirection: "row",
      gap: 3,
    },
  });
