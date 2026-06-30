import { Pressable, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";
import { ThemeColors } from "@/constants/theme";

export type WCard = {
  id: string;
  pairId: number;
  type: "ko" | "uz";
  display: string;
  isFlipped: boolean;
  isMatched: boolean;
};

interface Props {
  card: WCard;
  size: number;
  fontSize: number;
  matchedTrigger: number;
  onPress: () => void;
  theme: ThemeColors;
}

export default function WordMemoryCard({
  card,
  size,
  fontSize,
  matchedTrigger,
  onPress,
  theme,
}: Props) {
  const s = styles(theme, size, fontSize);
  const flip = useSharedValue(card.isFlipped ? 180 : 0);
  const pop = useSharedValue(1);
  const shake = useSharedValue(0);

  useEffect(() => {
    flip.value = withSpring(card.isFlipped || card.isMatched ? 180 : 0, {
      damping: 14,
      stiffness: 120,
    });
  }, [card.isFlipped, card.isMatched]);

  // 매치 성공 팝
  useEffect(() => {
    if (card.isMatched && matchedTrigger > 0) {
      pop.value = withSequence(
        withTiming(1.12, { duration: 160, easing: Easing.out(Easing.quad) }),
        withSpring(1, { damping: 8 }),
      );
    }
  }, [card.isMatched, matchedTrigger]);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 800 }, { rotateY: `${flip.value}deg` }],
    opacity: flip.value < 90 ? 1 : 0,
  }));
  const backStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 800 },
      { rotateY: `${flip.value - 180}deg` },
      { translateX: shake.value },
    ],
    opacity: flip.value < 90 ? 0 : 1,
  }));
  const wrapStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pop.value }, { translateX: shake.value }],
  }));

  const isKo = card.type === "ko";

  return (
    <Animated.View style={[s.wrap, wrapStyle]}>
      <Pressable
        onPress={onPress}
        disabled={card.isFlipped || card.isMatched}
        style={s.area}
      >
        {/* 뒷면 커버 (다 똑같음) */}
        <Animated.View style={[s.face, frontStyle]}>
          <LinearGradient
            colors={["#9D8DFF", "#776ee2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.cover}
          >
            <Text style={s.coverMark}>?</Text>
          </LinearGradient>
        </Animated.View>

        {/* 앞면 (단어) */}
        <Animated.View
          style={[
            s.face,
            s.front,
            isKo ? s.frontKo : s.frontUz,
            card.isMatched && s.frontMatched,
            backStyle,
          ]}
        >
          <Text
            style={[
              isKo ? s.koText : s.uzText,
              card.isMatched && { color: "#1CB454" },
            ]}
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            {card.display}
          </Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = (theme: ThemeColors, size: number, fontSize: number) =>
  StyleSheet.create({
    wrap: { width: size, height: size, margin: "1.5%" },
    area: { flex: 1 },
    face: {
      ...StyleSheet.absoluteFill,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backfaceVisibility: "hidden",
      overflow: "hidden",
    },
    cover: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    coverMark: {
      fontSize: size * 0.42,
      fontWeight: "900",
      color: "rgba(255,255,255,0.85)",
    },
    front: {
      borderWidth: 2,
      borderBottomWidth: 4,
      backgroundColor: theme.surface,
    },
    frontKo: { borderColor: theme.primary },
    frontUz: { borderColor: "#1CB0F6" },
    frontMatched: { borderColor: "#58CC02", backgroundColor: "#E7F9D5" },
    koText: {
      fontSize,
      fontWeight: "900",
      color: theme.primary,
      textAlign: "center",
      paddingHorizontal: 4,
    },
    uzText: {
      fontSize: fontSize * 0.9,
      fontWeight: "900",
      color: "#1899D6",
      textAlign: "center",
      paddingHorizontal: 4,
    },
  });
