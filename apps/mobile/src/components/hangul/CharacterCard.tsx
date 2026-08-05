import { useEffect } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import { HangulCharacter } from "@/types/hangul";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

/** 카드가 눌릴 때 내려앉는 깊이(px) */
const DEPTH = 4;

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

  // 등장: 0에서 튀어나오지 않고 살짝 아래에서 떠오르며 페이드인
  const enter = useSharedValue(0);
  // 눌림: 카드가 바텀보더(깊이) 쪽으로 내려앉음
  const press = useSharedValue(0);
  const glow = useSharedValue(0.3);
  const float = useSharedValue(0);

  useEffect(() => {
    // stagger 는 상한을 둬서 뒤쪽 카드가 하염없이 기다리지 않게
    const delay = Math.min(index * 18, 320);
    enter.value = withDelay(
      delay,
      withTiming(1, { duration: 280, easing: Easing.out(Easing.cubic) }),
    );

    // 마스터 카드만 아주 느리게 숨 쉬듯 — 점멸이 아니라 은은하게
    if (mastery === 3) {
      float.value = withRepeat(
        withSequence(
          withTiming(-2, { duration: 2400, easing: Easing.inOut(Easing.sin) }),
          withTiming(0, { duration: 2400, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        true,
      );
      glow.value = withRepeat(
        withSequence(
          withTiming(0.5, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
          withTiming(0.22, {
            duration: 2200,
            easing: Easing.inOut(Easing.sin),
          }),
        ),
        -1,
        true,
      );
    }
  }, [index, mastery]);

  const handlePressIn = () => {
    press.value = withTiming(1, {
      duration: 60,
      easing: Easing.out(Easing.quad),
    });
  };
  const handlePressOut = () => {
    press.value = withTiming(0, {
      duration: 110,
      easing: Easing.out(Easing.quad),
    });
  };

  // 래퍼: 등장 + 마스터 카드 부유
  const wrapStyle = useAnimatedStyle(() => ({
    opacity: enter.value,
    transform: [
      { translateY: (1 - enter.value) * 10 + float.value },
      { scale: 0.96 + enter.value * 0.04 },
    ],
  }));

  // 카드: 누르면 깊이만큼 내려앉음 (로드맵 버튼과 같은 결)
  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: press.value * DEPTH }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
  }));

  return (
    <Animated.View style={[styles.wrap, wrapStyle]}>
      {config.glow && (
        <Animated.View
          style={[styles.glow, { borderColor: config.border }, glowStyle]}
        />
      )}

      {/* 깊이 — 카드가 눌리면 이 면에 내려앉는다 */}
      <View style={[styles.depth, { backgroundColor: config.border }]} />

      <Animated.View style={[styles.cardWrap, cardStyle]}>
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
    // 노란 사각형이 번쩍이던 걸 은은한 링으로 교체
    glow: {
      position: "absolute",
      top: -3,
      left: -3,
      right: -3,
      bottom: -3,
      borderRadius: 18,
      borderWidth: 2,
    },
    // 카드 아래 깔리는 면. 눌리면 카드가 여기까지 내려온다.
    depth: {
      position: "absolute",
      top: DEPTH,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 14,
    },
    cardWrap: {
      flex: 1,
      marginBottom: DEPTH,
    },
    card: {
      flex: 1,
      borderWidth: 2,
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
