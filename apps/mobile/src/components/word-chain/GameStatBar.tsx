import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  hearts: number;
  maxHearts: number;
  score: number;
  combo: number;
  onClose: () => void;
}

function Heart({ filled, index }: { filled: boolean; index: number }) {
  const scale = useSharedValue(1);
  const prev = useRef(filled);

  useEffect(() => {
    if (prev.current && !filled) {
      // 잃을 때 펄스
      scale.value = withSequence(
        withSpring(1.4, { damping: 4, stiffness: 320 }),
        withSpring(1, { damping: 8 }),
      );
    }
    prev.current = filled;
  }, [filled]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animStyle}>
      <Ionicons
        name={filled ? "heart" : "heart-outline"}
        size={20}
        color={filled ? "#FF4B4B" : "#D8D8E0"}
      />
    </Animated.View>
  );
}

export default function GameStatBar({
  hearts,
  maxHearts,
  score,
  combo,
  onClose,
}: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  const comboScale = useSharedValue(1);
  const prevCombo = useRef(combo);

  useEffect(() => {
    if (combo > prevCombo.current && combo >= 2) {
      comboScale.value = withSequence(
        withSpring(1.4, { damping: 4 }),
        withSpring(1, { damping: 8 }),
      );
    }
    prevCombo.current = combo;
  }, [combo]);

  const comboAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: comboScale.value }],
  }));

  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={onClose} hitSlop={10}>
        <Ionicons name="close" size={26} color={theme.textSecondary} />
      </TouchableOpacity>

      <View style={styles.heartsRow}>
        {Array.from({ length: maxHearts }).map((_, i) => (
          <Heart key={i} index={i} filled={i < hearts} />
        ))}
      </View>

      <View style={styles.statRow}>
        {combo >= 2 && (
          <Animated.View style={[styles.comboBadge, comboAnimStyle]}>
            <Text style={styles.comboText}>🔥 {combo}</Text>
          </Animated.View>
        )}
        <View style={styles.scoreBadge}>
          <Ionicons name="flash" size={14} color="#FFD000" />
          <Text style={styles.scoreText}>{score}</Text>
        </View>
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      paddingTop: 54,
      paddingBottom: 10,
      paddingHorizontal: 16,
      backgroundColor: theme.bg,
    },
    heartsRow: {
      flexDirection: "row",
      gap: 4,
    },
    statRow: {
      marginLeft: "auto",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    comboBadge: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 99,
      backgroundColor: "#FFE4D6",
      borderWidth: 1,
      borderColor: "#FF9500",
    },
    comboText: {
      fontSize: 13,
      fontWeight: "900",
      color: "#FF6A00",
    },
    scoreBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderRadius: 99,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
    },
    scoreText: {
      fontSize: 14,
      fontWeight: "900",
      color: theme.text,
    },
  });
