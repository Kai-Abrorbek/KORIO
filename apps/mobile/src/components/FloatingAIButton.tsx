import { useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface FloatingAIButtonProps {
  onPress: () => void;
  bottom?: number;
}

export default function FloatingAIButton({
  onPress,
  bottom = 130,
}: FloatingAIButtonProps) {
  const theme = useTheme();
  const styles = getStyles(theme);

  const shadowOpacity = useSharedValue(0.5);
  const shadowRadius = useSharedValue(26);

  useEffect(() => {
    shadowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.14, { duration: 1300 }),
        withTiming(0.5, { duration: 1300 }),
      ),
      -1,
      false,
    );
    shadowRadius.value = withRepeat(
      withSequence(
        withTiming(38, { duration: 1300 }),
        withTiming(26, { duration: 1300 }),
      ),
      -1,
      false,
    );
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    shadowOpacity: shadowOpacity.value,
    shadowRadius: shadowRadius.value,
  }));

  return (
    <Animated.View style={[styles.button, { bottom }, glowStyle]}>
      <TouchableOpacity style={styles.inner} onPress={onPress}>
        <Ionicons name="sparkles" size={24} color="#fff" />
      </TouchableOpacity>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>AI</Text>
      </View>
    </Animated.View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    button: {
      position: "absolute",
      right: 16,
      width: 56,
      height: 56,
      borderRadius: 999,
      backgroundColor: theme.primary,
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.9,
      shadowRadius: 26,
      elevation: 10,
      zIndex: 40,
    },
    inner: {
      width: 56,
      height: 56,
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
    },
    badge: {
      position: "absolute",
      top: -3,
      right: -3,
      backgroundColor: "#E24B4A",
      borderRadius: 999,
      minWidth: 18,
      height: 18,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 4,
      borderWidth: 2,
      borderColor: theme.bg,
    },
    badgeText: {
      fontSize: 9,
      fontWeight: "800",
      color: "#fff",
    },
  });
