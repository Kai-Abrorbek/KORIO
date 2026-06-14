import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { FriendTab } from "@/types/friend";

interface Props {
  value: FriendTab;
  onChange: (t: FriendTab) => void;
}

export default function FriendsTabs({ value, onChange }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const [width, setWidth] = useState(0);
  const offset = useSharedValue(0);

  useEffect(() => {
    if (!width) return;
    offset.value = withTiming(value === "following" ? 0 : width / 2, {
      duration: 220,
    });
  }, [value, width, offset]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <View
      style={styles.container}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => onChange("following")}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.text, value === "following" && styles.textActive]}
          >
            {t("friends.tabs.following")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => onChange("followers")}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.text, value === "followers" && styles.textActive]}
          >
            {t("friends.tabs.followers")}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomLine} />
      <Animated.View
        style={[styles.indicator, { width: width / 2 }, indicatorStyle]}
      />
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
      position: "relative",
    },
    row: {
      flexDirection: "row",
    },
    tab: {
      flex: 1,
      paddingVertical: 14,
      alignItems: "center",
    },
    text: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    textActive: {
      color: "#45B7D1",
      fontWeight: "800",
    },
    bottomLine: {
      height: 1,
      backgroundColor: theme.border,
    },
    indicator: {
      position: "absolute",
      bottom: 0,
      left: 0,
      height: 3,
      backgroundColor: "#45B7D1",
      borderRadius: 2,
    },
  });
