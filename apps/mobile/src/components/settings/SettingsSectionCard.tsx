import { View, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { SettingsItem } from "@/types/settings";
import SettingsRow from "./SettingsRow";

interface Props {
  items: SettingsItem[];
  indexOffset?: number;
  onItemPress?: (item: SettingsItem) => void;
}

export default function SettingsSectionCard({
  items,
  indexOffset = 0,
  onItemPress,
}: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.card}>
      {items.map((item, i) => (
        <SettingsRow
          key={item.id}
          item={item}
          index={i + indexOffset}
          isLast={i === items.length - 1}
          onPress={onItemPress}
        />
      ))}
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.surface,
      marginHorizontal: 16,
      marginBottom: 16,
      borderRadius: 16,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
  });
