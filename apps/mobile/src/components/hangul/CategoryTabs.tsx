import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { HangulCategory } from "@/types/hangul";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  value: HangulCategory;
  onChange: (cat: HangulCategory) => void;
}

const TABS: { id: HangulCategory; labelKey: string }[] = [
  { id: "consonant", labelKey: "hangul.tabs.consonants" },
  { id: "vowel", labelKey: "hangul.tabs.vowels" },
];

export default function CategoryTabs({ value, onChange }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const [layouts, setLayouts] = useState<
    Record<string, { x: number; w: number }>
  >({});

  const indicatorX = useSharedValue(0);
  const indicatorW = useSharedValue(0);

  useEffect(() => {
    const l = layouts[value];
    if (l) {
      indicatorX.value = withSpring(l.x, { damping: 16, stiffness: 180 });
      indicatorW.value = withSpring(l.w, { damping: 16, stiffness: 180 });
    }
  }, [value, layouts]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
    width: indicatorW.value,
  }));

  return (
    <View style={styles.wrap}>
      <Animated.View style={[styles.indicator, indicatorStyle]} />
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tab}
          activeOpacity={0.7}
          onPress={() => onChange(tab.id)}
          onLayout={(e) => {
            const { x, width } = e.nativeEvent.layout;
            setLayouts((prev) => ({ ...prev, [tab.id]: { x, w: width } }));
          }}
        >
          <Text style={[styles.label, value === tab.id && styles.labelActive]}>
            {t(tab.labelKey)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      flexDirection: "row",
      backgroundColor: theme.surface,
      borderRadius: 14,
      padding: 4,
      marginHorizontal: 16,
      marginBottom: 16,
      position: "relative",
      borderWidth: 1,
      borderColor: theme.border,
    },
    indicator: {
      position: "absolute",
      top: 4,
      bottom: 4,
      backgroundColor: "#776ee2",
      borderRadius: 10,
      shadowColor: "#776ee2",
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 3,
    },
    tab: {
      flex: 1,
      paddingVertical: 10,
      alignItems: "center",
    },
    label: {
      fontSize: 15,
      fontWeight: "800",
      color: theme.textSecondary,
    },
    labelActive: {
      color: "#fff",
    },
  });
