import { useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
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

const SIZE = 76; // 로제트 한 변
const FLIP_MS = 700; // 도는 시간
const REST_MS = 2600; // 한 면 보여주고 쉬는 시간 ← 이 값으로 delay 조절

// 라운드 사각형 2개(45° 교차) = 8각 로제트
function Rosette({
  size,
  color,
  style,
}: {
  size: number;
  color: string;
  style?: any;
}) {
  const r = size * 0.28;
  return (
    <View style={[{ width: size, height: size }, style]}>
      <View
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: r,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: r,
          backgroundColor: color,
          transform: [{ rotate: "45deg" }],
        }}
      />
    </View>
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

  // 잠긴 노드만: 숫자 ↔ 국기 뒤집기 (쉬었다 → 돌고 → 쉬었다 → 돌고)
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
    transform: [{ perspective: 800 }, { rotateY: `${flip.value * 180}deg` }],
    backfaceVisibility: "hidden",
  }));
  const backStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 800 },
      { rotateY: `${flip.value * 180 + 180}deg` },
    ],
    backfaceVisibility: "hidden",
  }));

  const main = locked ? theme.border : unitColor;
  const base = locked ? theme.border : darken(unitColor, 35);
  const numColor = locked ? theme.textSecondary : "#fff";

  return (
    <Pressable onPress={onPress} style={s.wrap}>
      {/* 받침 */}
      <View
        style={[s.base, { backgroundColor: base, opacity: locked ? 0.5 : 1 }]}
      />

      <View style={s.badgeArea}>
        {/* 뒤 헤일로 */}
        <Rosette
          size={SIZE + 10}
          color={main}
          style={[s.halo, { opacity: 0.35 }]}
        />

        {/* 앞면 = 숫자 */}
        <Animated.View style={[s.face, frontStyle]}>
          <Rosette size={SIZE} color={main} />
          <View style={s.center}>
            <Text style={[s.num, { color: numColor }]}>{score}</Text>
          </View>
        </Animated.View>

        {/* 뒷면 = 학습 언어 국기 */}
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
    wrap: { width: SIZE + 20, height: SIZE + 30, alignItems: "center" },
    badgeArea: {
      width: SIZE,
      height: SIZE,
      alignItems: "center",
      justifyContent: "center",
    },
    halo: { position: "absolute" },
    face: {
      position: "absolute",
      width: SIZE,
      height: SIZE,
      alignItems: "center",
      justifyContent: "center",
    },
    center: {
      position: "absolute",
      width: SIZE,
      height: SIZE,
      alignItems: "center",
      justifyContent: "center",
    },
    num: { fontSize: 30, fontWeight: "900" },
    flag: { fontSize: 30 },
    base: {
      position: "absolute",
      bottom: 0,
      width: SIZE * 0.62,
      height: SIZE * 0.34,
      borderRadius: SIZE * 0.31,
    },
  });
