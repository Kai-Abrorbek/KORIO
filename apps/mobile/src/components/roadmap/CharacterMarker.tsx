import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AvatarPreview from "@/components/avatar/AvatarPreview";
import type { AvatarConfig } from "@/types/avatar";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";

interface Props {
  hearts?: number;
  avatar?: Partial<AvatarConfig> | null;
}

export default function CharacterMarker({ hearts = 3, avatar }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <AvatarPreview avatar={avatar} size={88} showBackground={false} />
      </View>

      <View style={styles.starsRow}>
        {Array.from({
          length: hearts,
        }).map((_, index) => (
          <Ionicons key={index} name="star" size={14} color={theme.border} />
        ))}
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      gap: 2,
    },
    avatar: {
      width: 88,
      height: 88,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    starsRow: {
      flexDirection: "row",
      gap: 3,
    },
  });
