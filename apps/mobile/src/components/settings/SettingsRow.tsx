import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { SettingsItem } from "@/types/settings";

interface Props {
  item: SettingsItem;
  index: number;
  isLast?: boolean;
  onPress?: (item: SettingsItem) => void;
}

export default function SettingsRow({ item, index, isLast, onPress }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  // stagger entry
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(10);

  useEffect(() => {
    opacity.value = withDelay(index * 40, withTiming(1, { duration: 280 }));
    translateY.value = withDelay(index * 40, withSpring(0, { damping: 14 }));
  }, [opacity, translateY, index]);

  const entryStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={entryStyle}>
      <TouchableOpacity
        style={[styles.row, !isLast && styles.divider]}
        onPress={() => onPress?.(item)}
        activeOpacity={0.6}
      >
        <View style={[styles.iconBox, { backgroundColor: item.iconBgColor }]}>
          <Ionicons name={item.iconName} size={22} color={item.iconColor} />
        </View>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {t(item.titleKey)}
          </Text>
          <Text style={styles.desc} numberOfLines={1}>
            {t(item.descriptionKey)}
          </Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.textSecondary}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      paddingHorizontal: 20,
      paddingVertical: 14,
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    iconBox: {
      width: 44,
      height: 44,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    info: {
      flex: 1,
      gap: 2,
    },
    title: {
      fontSize: 16,
      fontWeight: "800",
      color: theme.text,
    },
    desc: {
      fontSize: 12,
      color: theme.textSecondary,
      fontWeight: "500",
    },
  });
