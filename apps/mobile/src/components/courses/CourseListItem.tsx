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
import { Course } from "@/types/courses";

interface Props {
  course: Course;
  selected: boolean;
  index: number;
  onPress: () => void;
}

export default function CourseListItem({
  course,
  selected,
  index,
  onPress,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  // entry stagger
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(12);

  useEffect(() => {
    opacity.value = withDelay(index * 60, withTiming(1, { duration: 300 }));
    translateY.value = withDelay(index * 60, withSpring(0, { damping: 14 }));
  }, [opacity, translateY, index]);

  const entryStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={entryStyle}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={[styles.card, selected && styles.cardSelected]}
      >
        <View style={[styles.iconBox, { backgroundColor: course.color }]}>
          <Ionicons name={course.icon} size={24} color="#fff" />
        </View>
        <Text style={[styles.name, selected && styles.nameSelected]}>
          {t(course.nameKey)}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.surface,
      borderRadius: 14,
      borderWidth: 2,
      borderColor: theme.border,
      paddingVertical: 12,
      paddingHorizontal: 14,
      marginBottom: 12,
      gap: 14,
    },
    cardSelected: {
      borderColor: "#1FA9F7",
      backgroundColor: "#E8F5FF",
    },
    iconBox: {
      width: 48,
      height: 48,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    name: {
      flex: 1,
      fontSize: 17,
      fontWeight: "800",
      color: theme.text,
    },
    nameSelected: {
      color: "#1FA9F7",
    },
  });
