import { useEffect } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import { HangulCharacter } from "@/types/hangul";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  character: HangulCharacter;
  mastery: 0 | 1 | 2 | 3;
  index: number;
  onPress: () => void;
}

function getStyleByMastery(mastery: number, theme: ThemeColors) {
  switch (mastery) {
    case 3:
      return {
        bg: "#FFF6E0",
        border: "#FFD000",
        accent: "#E89C00",
        glow: true,
      };
    case 2:
      return {
        bg: "#EFE9FF",
        border: "#9F8FFF",
        accent: "#776ee2",
        glow: false,
      };
    case 1:
      return {
        bg: "#E8F0FF",
        border: "#7FB0F7",
        accent: "#4A90D9",
        glow: false,
      };
    default:
      return {
        bg: theme.surface,
        border: theme.border,
        accent: theme.textSecondary,
        glow: false,
      };
  }
}

export default function CharacterCard({
  character,
  mastery,
  index,
  onPress,
}: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const config = getStyleByMastery(mastery, theme);

  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const tap = useSharedValue(1);
  const glow = useSharedValue(0.6);
  const float = useSharedValue(0);

  useEffect(() => {
    // 등장 stagger
    scale.value = withDelay(
      index * 30,
      withSpring(1, { damping: 12, stiffness: 180 }),
    );
    opacity.value = withDelay(index * 30, withTiming(1, { duration: 300 }));

    // 마스터 카드는 살랑 떠 있음
    if (mastery === 3) {
      float.value = withRepeat(
        withSequence(
          withTiming(-3, { duration: 1600, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 1600, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      );
      glow.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1500 }),
          withTiming(0.5, { duration: 1500 }),
        ),
        -1,
        true,
      );
    }
  }, [index, mastery]);

  const handlePressIn = () => {
    tap.value = withSpring(0.92, { damping: 10, stiffness: 400 });
  };
  const handlePressOut = () => {
    tap.value = withSpring(1, { damping: 8, stiffness: 300 });
  };

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value * tap.value },
      { translateY: float.value },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
  }));

  return (
    <Animated.View style={[styles.wrap, animStyle]}>
      {config.glow && <Animated.View style={[styles.glow, glowStyle]} />}
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.card,
          { backgroundColor: config.bg, borderColor: config.border },
        ]}
      >
        <Text style={[styles.char, { color: config.accent }]}>
          {character.char}
        </Text>
        <Text style={[styles.roman, { color: config.accent, opacity: 0.7 }]}>
          {character.romanization}
        </Text>
        <View style={styles.stars}>
          {[0, 1, 2].map((i) => (
            <Ionicons
              key={i}
              name={i < mastery ? "star" : "star-outline"}
              size={11}
              color={i < mastery ? config.accent : theme.border}
              style={{ marginHorizontal: 1 }}
            />
          ))}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      width: "23%",
      aspectRatio: 0.85,
      margin: "1%",
    },
    glow: {
      position: "absolute",
      top: -4,
      left: -4,
      right: -4,
      bottom: -4,
      borderRadius: 18,
      backgroundColor: "#FFD000",
      opacity: 0.4,
    },
    card: {
      flex: 1,
      borderWidth: 2,
      borderBottomWidth: 4,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 6,
    },
    char: {
      fontSize: 34,
      fontWeight: "800",
      lineHeight: 40,
    },
    roman: {
      fontSize: 11,
      fontWeight: "700",
      marginTop: 2,
    },
    stars: {
      flexDirection: "row",
      marginTop: 4,
    },
  });
