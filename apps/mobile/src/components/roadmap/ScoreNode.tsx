import { useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { darken } from "@/utils/color";
import { KOR_FLAG } from "@/constants/course";

interface Props {
  score: number;
  locked: boolean;
  unitColor: string;
  onPress?: () => void;
}

const SIZE = 82;
const FLIP_MS = 800;
const REST_MS = 800;

// 8엽 로제트 path (100x100 viewBox, 부드러운 꽃잎)
const ROSETTE_PATH =
  "M50 3 C58 3 62 10 68 12 C74 14 82 11 87 16 C92 21 89 29 91 35 C93 41 100 45 100 53 C100 61 93 65 91 71 C89 77 92 85 87 90 C82 95 74 92 68 94 C62 96 58 103 50 103 C42 103 38 96 32 94 C26 92 18 95 13 90 C8 85 11 77 9 71 C7 65 0 61 0 53 C0 45 7 41 9 35 C11 29 8 21 13 16 C18 11 26 14 32 12 C38 10 42 3 50 3 Z";

function Rosette({
  size,
  color,
  opacity = 1,
}: {
  size: number;
  color: string;
  opacity?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 106" style={{ opacity }}>
      <Path d={ROSETTE_PATH} fill={color} />
    </Svg>
  );
}

export default function ScoreNode({
  score,
  locked,
  unitColor,
  onPress,
}: Props) {
  const theme = useTheme();
  const s = getStyles(theme);
  const flip = useSharedValue(0);

  useEffect(() => {
    if (!locked) return;
    flip.value = withRepeat(
      withSequence(
        withDelay(
          REST_MS,
          withTiming(1, {
            duration: FLIP_MS,
            easing: Easing.inOut(Easing.cubic),
          }),
        ),
        withDelay(
          REST_MS,
          withTiming(2, {
            duration: FLIP_MS,
            easing: Easing.inOut(Easing.cubic),
          }),
        ),
      ),
      -1,
      false,
    );
  }, [locked]);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 900 }, { rotateY: `${flip.value * 180}deg` }],
    backfaceVisibility: "hidden",
  }));
  const backStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 900 },
      { rotateY: `${flip.value * 180 + 180}deg` },
    ],
    backfaceVisibility: "hidden",
  }));

  const main = locked ? "#D3D3D6" : unitColor;
  const baseCol = locked ? "#BFBFC4" : darken(unitColor, 32);
  const baseDark = locked ? "#A9A9AE" : darken(unitColor, 48);
  const numColor = locked ? "#8A8A90" : "#fff";

  return (
    <Pressable onPress={onPress} style={s.wrap} hitSlop={8}>
      {/* 입체 받침 (코인) */}
      <View style={s.baseWrap}>
        <View
          style={[s.baseBack, { backgroundColor: baseDark, opacity: 0.15 }]}
        />
        <View
          style={[s.baseFront, { backgroundColor: baseCol, opacity: 0.15 }]}
        />
      </View>

      <View style={s.badgeArea}>
        {/* 뒤 헤일로 */}
        <View style={s.halo}>
          <Rosette size={SIZE + 12} color={main} opacity={0.4} />
        </View>

        {/* 앞면 = 숫자 */}
        <Animated.View style={[s.face, frontStyle]}>
          <Rosette size={SIZE} color={main} />
          <View style={s.center}>
            <Text style={[s.num, { color: numColor }]}>{score}</Text>
          </View>
        </Animated.View>

        {/* 뒷면 = 국기 */}
        <Animated.View style={[s.face, backStyle]}>
          <Rosette size={SIZE} color={main} />
          <View style={s.center}>
            <Text style={s.flag}>{KOR_FLAG}</Text>
          </View>
        </Animated.View>
      </View>
    </Pressable>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: { width: SIZE + 16, height: SIZE + 26, alignItems: "center" },
    badgeArea: {
      width: SIZE,
      height: SIZE,
      alignItems: "center",
      justifyContent: "center",
    },
    halo: { position: "absolute", top: -6 },
    face: {
      position: "absolute",
      width: SIZE,
      height: SIZE,
      alignItems: "center",
      justifyContent: "center",
    },
    center: {
      ...StyleSheet.absoluteFill,
      alignItems: "center",
      justifyContent: "center",
    },
    num: { fontSize: 34, fontWeight: "900" },
    flag: { fontSize: 32 },
    // 코인 받침: 뒤(진한) + 앞(밝은) 겹쳐서 입체
    baseWrap: {
      position: "absolute",
      bottom: -5,
      width: SIZE * 0.5,
      height: SIZE * 0.5,
      alignItems: "center",
    },
    baseBack: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: "100%",
      borderRadius: 999,
    },
    baseFront: {
      position: "absolute",
      bottom: 5,
      width: "100%",
      height: "82%",
      borderRadius: 999,
    },
  });
