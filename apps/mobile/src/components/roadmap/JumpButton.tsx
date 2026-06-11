import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { darken } from "@/utils/color";

interface Props {
  onPress: () => void;
  color: string; // 유닛 색상
}

const BTN_SIZE = 72;

export default function JumpButton({ onPress, color }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const darkColor = darken(color, 35);

  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-7, { duration: 520, easing: Easing.out(Easing.quad) }),
        withTiming(0, { duration: 520, easing: Easing.in(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.9, { duration: 80 }),
      withTiming(1.06, { duration: 100 }),
      withTiming(1, { duration: 80 }),
    );
    onPress();
  };

  return (
    <View style={styles.wrapper}>
      {/* 말풍선 — 두올링고 크기, 유닛 색 텍스트 */}
      <View style={styles.bubble}>
        <Text style={[styles.bubbleText, { color }]}>
          {t("roadmap.jumpHere")}
        </Text>
      </View>
      {/* 꼬리 */}
      <View style={[styles.bubbleTail, { borderTopColor: theme.surface }]} />

      {/* 3D 버튼 — 유닛 색 */}
      <Animated.View style={[animatedStyle, { marginTop: 10 }]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handlePress}
          style={styles.btnOuter}
        >
          <View style={[styles.btnDepth, { backgroundColor: darkColor }]} />
          <View style={[styles.btnFace, { backgroundColor: color }]}>
            <Ionicons name="play-forward" size={30} color="#fff" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrapper: {
      alignItems: "center",
      paddingVertical: 8,
    },
    bubble: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      paddingVertical: 14,
      paddingHorizontal: 28,
      borderWidth: 2,
      borderColor: theme.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    bubbleText: {
      fontSize: 18,
      fontWeight: "900",
      letterSpacing: 0.2,
    },
    bubbleTail: {
      width: 0,
      height: 0,
      borderLeftWidth: 10,
      borderRightWidth: 10,
      borderTopWidth: 11,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      marginTop: -1,
    },
    btnOuter: {
      width: BTN_SIZE,
      height: BTN_SIZE + 6,
      alignItems: "center",
      justifyContent: "center",
    },
    btnDepth: {
      position: "absolute",
      width: BTN_SIZE,
      height: BTN_SIZE,
      borderRadius: BTN_SIZE / 2,
      top: 6,
    },
    btnFace: {
      position: "absolute",
      top: 0,
      width: BTN_SIZE,
      height: BTN_SIZE,
      borderRadius: BTN_SIZE / 2,
      alignItems: "center",
      justifyContent: "center",
    },
  });
