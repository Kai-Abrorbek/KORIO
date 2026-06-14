import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";

interface Props {
  syllable: string;
  active: boolean; // 유저 차례면 true (강조)
}

export default function SyllableTarget({ syllable, active }: Props) {
  const { t } = useTranslation();
  const scale = useSharedValue(1);
  const glow = useSharedValue(0.3);

  useEffect(() => {
    if (active) {
      scale.value = withRepeat(
        withSequence(
          withSpring(1.08, { damping: 6 }),
          withSpring(1, { damping: 8 }),
        ),
        -1,
        true,
      );
      glow.value = withRepeat(
        withSequence(
          withTiming(0.9, { duration: 700 }),
          withTiming(0.3, { duration: 700 }),
        ),
        -1,
        true,
      );
    } else {
      scale.value = withSpring(1, { damping: 12 });
      glow.value = withTiming(0.3, { duration: 200 });
    }
  }, [active, scale, glow]);

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
  }));

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{t("wordChain.nextSyllable")}</Text>
      <Animated.View style={[styles.outerGlow, glowStyle]} />
      <Animated.View style={[styles.bubble, scaleStyle]}>
        <Text style={styles.syl}>{syllable}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 14,
  },
  label: {
    fontSize: 11,
    fontWeight: "800",
    color: "#999",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  outerGlow: {
    position: "absolute",
    top: 28,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FFD000",
  },
  bubble: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#776ee2",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 4,
    borderColor: "#5448E0",
    shadowColor: "#776ee2",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  syl: {
    fontSize: 38,
    fontWeight: "900",
    color: "#fff",
    lineHeight: 44,
  },
});
