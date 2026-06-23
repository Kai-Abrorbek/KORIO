import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  FadeInDown,
  Easing,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { ThemeColors } from "@/constants/theme";
import BoriMascot from "@/components/home/BoriMascot";

interface Props {
  theme: ThemeColors;
  xp: number;
  stars: number | null; // null이면 별 안 보여줌 (중간 마일스톤)
  bubbleText?: string; // 말풍선 (중간 마일스톤)
  headline?: string; // 별 화면 헤드라인
  subline?: string;
  onContinue: () => void;
}

export default function XpRewardScreen({
  theme,
  xp,
  stars,
  bubbleText,
  headline,
  subline,
  onContinue,
}: Props) {
  const { t } = useTranslation();
  const s = getStyles(theme);
  const bob = useSharedValue(0);

  useEffect(() => {
    bob.value = withRepeat(
      withSequence(
        withTiming(-12, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, []);

  const bobStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bob.value }],
  }));

  return (
    <View style={s.container}>
      {stars !== null && (
        <Animated.View entering={FadeInDown.duration(500)} style={s.starsRow}>
          {[0, 1, 2].map((i) => (
            <Ionicons
              key={i}
              name="star"
              size={i === 1 ? 64 : 52}
              color={i < stars ? "#FFC400" : "#E3E1EE"}
              style={i === 1 ? { marginHorizontal: 8 } : undefined}
            />
          ))}
        </Animated.View>
      )}

      {bubbleText ? (
        <Animated.View entering={FadeInDown.duration(400)} style={s.bubble}>
          <Text style={s.bubbleText}>{bubbleText}</Text>
          <View style={s.bubbleTail} />
        </Animated.View>
      ) : null}

      <Animated.View style={[s.mascot, bobStyle]}>
        <BoriMascot size={170} />
      </Animated.View>

      {(headline || subline) && (
        <Animated.View
          entering={FadeInDown.delay(200).duration(500)}
          style={s.texts}
        >
          {headline ? <Text style={s.headline}>{headline}</Text> : null}
          {subline ? <Text style={s.subline}>{subline}</Text> : null}
        </Animated.View>
      )}

      <View style={s.footer}>
        <TouchableOpacity
          style={s.button}
          onPress={onContinue}
          activeOpacity={0.9}
        >
          <Text style={s.buttonText}>{t("matchGame.continue")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
    },
    starsRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 28,
    },
    bubble: {
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderRadius: 20,
      paddingVertical: 16,
      paddingHorizontal: 22,
      marginBottom: 28,
      maxWidth: "90%",
    },
    bubbleText: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.text,
      textAlign: "center",
    },
    bubbleTail: {
      position: "absolute",
      bottom: -9,
      alignSelf: "center",
      left: "47%",
      width: 18,
      height: 18,
      backgroundColor: theme.surface,
      borderRightWidth: 1.5,
      borderBottomWidth: 1.5,
      borderColor: theme.border,
      transform: [{ rotate: "45deg" }],
    },
    mascot: { alignItems: "center" },
    texts: { marginTop: 28, alignItems: "center", gap: 10 },
    headline: {
      fontSize: 24,
      fontWeight: "800",
      color: theme.text,
      textAlign: "center",
      lineHeight: 32,
    },
    subline: {
      fontSize: 17,
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
    },
    footer: {
      position: "absolute",
      bottom: 40,
      left: 24,
      right: 24,
    },
    button: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 18,
      alignItems: "center",
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 6,
    },
    buttonText: { color: "#fff", fontSize: 17, fontWeight: "700" },
  });
