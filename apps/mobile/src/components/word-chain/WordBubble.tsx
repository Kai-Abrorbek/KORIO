import { View, Text, StyleSheet } from "react-native";
import Animated, {
  FadeIn,
  SlideInLeft,
  SlideInRight,
} from "react-native-reanimated";
import OwlMascot from "@/components/lesson/OwlMascot";
import { ChainTurn } from "@/types/word-chain";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  turn: ChainTurn;
  isLatest: boolean;
}

export default function WordBubble({ turn, isLatest }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const isAi = turn.player === "ai";

  // 마지막 음절 highlight 분리
  const wordChars = turn.word.split("");
  const lastIdx = wordChars.length - 1;

  return (
    <Animated.View
      entering={
        isAi
          ? SlideInLeft.springify().damping(14).stiffness(150)
          : SlideInRight.springify().damping(14).stiffness(150)
      }
      style={[styles.row, isAi ? styles.rowAi : styles.rowUser]}
    >
      {isAi && (
        <View style={styles.avatar}>
          <OwlMascot state="idle" size={36} />
        </View>
      )}

      <View
        style={[
          styles.bubble,
          isAi ? styles.bubbleAi : styles.bubbleUser,
          isLatest && styles.bubbleLatest,
        ]}
      >
        <Text style={styles.wordText}>
          {wordChars.map((ch, i) => (
            <Text
              key={i}
              style={[
                isAi ? styles.charAi : styles.charUser,
                i === lastIdx && isLatest && styles.charLast,
              ]}
            >
              {ch}
            </Text>
          ))}
        </Text>
        <Text
          style={[styles.romanText, isAi ? styles.romanAi : styles.romanUser]}
        >
          {turn.roman}
        </Text>
      </View>
    </Animated.View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      marginVertical: 6,
      paddingHorizontal: 12,
      alignItems: "flex-end",
    },
    rowAi: {
      justifyContent: "flex-start",
    },
    rowUser: {
      justifyContent: "flex-end",
    },
    avatar: {
      marginRight: 6,
      marginBottom: 2,
    },
    bubble: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 18,
      maxWidth: "75%",
      borderWidth: 1.5,
    },
    bubbleAi: {
      backgroundColor: theme.surface,
      borderColor: theme.border,
      borderBottomLeftRadius: 4,
    },
    bubbleUser: {
      backgroundColor: "#776ee2",
      borderColor: "#5448E0",
      borderBottomRightRadius: 4,
    },
    bubbleLatest: {
      shadowColor: "#776ee2",
      shadowOpacity: 0.3,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 2 },
      elevation: 4,
    },
    wordText: {
      fontSize: 20,
      fontWeight: "900",
      letterSpacing: -0.3,
    },
    charAi: { color: theme.text },
    charUser: { color: "#fff" },
    charLast: {
      color: "#FFD000",
      textShadowColor: "rgba(255, 208, 0, 0.4)",
      textShadowRadius: 8,
    },
    romanText: {
      fontSize: 11,
      fontWeight: "600",
      marginTop: 2,
      letterSpacing: 0.5,
    },
    romanAi: { color: theme.textSecondary },
    romanUser: { color: "rgba(255,255,255,0.8)" },
  });
