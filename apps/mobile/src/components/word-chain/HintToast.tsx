import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  runOnJS,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { ChainWord } from "@/types/word-chain";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  hints: ChainWord[];
  visible: boolean;
  onDismiss: () => void;
}

export default function HintToast({ hints, visible, onDismiss }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const y = useSharedValue(-200);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      y.value = withSpring(0, { damping: 14, stiffness: 130 });
      opacity.value = withTiming(1, { duration: 200 });
      // 4초 후 자동 dismiss
      const timer = setTimeout(() => {
        y.value = withTiming(-200, { duration: 250 });
        opacity.value = withTiming(0, { duration: 250 }, (done) => {
          if (done) runOnJS(onDismiss)();
        });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }],
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <Animated.View style={[styles.wrap, animStyle]}>
      <View style={styles.header}>
        <Ionicons name="bulb" size={18} color="#FFD000" />
        <Text style={styles.title}>{t("wordChain.hintTitle")}</Text>
      </View>
      <View style={styles.wordRow}>
        {hints.map((h, i) => (
          <View key={i} style={styles.chip}>
            <Text style={styles.chipWord}>{h.word}</Text>
            <Text style={styles.chipRoman}>{h.roman}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      position: "absolute",
      top: 110,
      left: 12,
      right: 12,
      backgroundColor: "#FFF6E0",
      borderWidth: 1.5,
      borderColor: "#FFD000",
      borderRadius: 14,
      padding: 12,
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 8,
      zIndex: 100,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 10,
    },
    title: {
      fontSize: 13,
      fontWeight: "900",
      color: "#9C7000",
    },
    wordRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    chip: {
      backgroundColor: "#fff",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: "#FFD000",
      alignItems: "center",
    },
    chipWord: {
      fontSize: 15,
      fontWeight: "800",
      color: "#3C3C43",
    },
    chipRoman: {
      fontSize: 10,
      fontWeight: "600",
      color: "#9C7000",
      marginTop: 1,
    },
  });
