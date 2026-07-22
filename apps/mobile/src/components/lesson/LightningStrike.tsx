import { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withDelay,
  runOnJS,
  Easing,
} from "react-native-reanimated";

const { width: W, height: H } = Dimensions.get("window");
const AProps = Animated.createAnimatedComponent(Path);

interface Props {
  visible: boolean;
  onDone?: () => void;
}

// 아래(중앙)에서 위로 솟는 지그재그 메인 볼트 + 가지
const MAIN_BOLT = `M${W / 2 - 6} ${H} L${W / 2 + 26} ${H * 0.72} L${W / 2 - 14} ${H * 0.6} L${W / 2 + 30} ${H * 0.4} L${W / 2 - 10} ${H * 0.26} L${W / 2 + 18} ${H * 0.08}`;
const BRANCH_1 = `M${W / 2 - 14} ${H * 0.6} L${W / 2 - 60} ${H * 0.52} L${W / 2 - 40} ${H * 0.42}`;
const BRANCH_2 = `M${W / 2 + 30} ${H * 0.4} L${W / 2 + 74} ${H * 0.34} L${W / 2 + 54} ${H * 0.24}`;

export default function LightningStrike({ visible, onDone }: Props) {
  const flash = useSharedValue(0);
  const bolt = useSharedValue(0);

  useEffect(() => {
    if (!visible) return;

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(
      () => {},
    );
    setTimeout(
      () =>
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {}),
      70,
    );

    flash.value = withSequence(
      withTiming(0.9, { duration: 60 }),
      withTiming(0.15, { duration: 50 }),
      withTiming(0.8, { duration: 45 }),
      withTiming(0, { duration: 260, easing: Easing.out(Easing.quad) }),
    );

    bolt.value = withSequence(
      withTiming(1, { duration: 60 }),
      withTiming(0.4, { duration: 60 }),
      withTiming(1, { duration: 50 }),
      withTiming(0.7, { duration: 60 }),
      withTiming(1, { duration: 50 }),
      withDelay(400, withTiming(0, { duration: 220 })),
    );

    // ✅ onDone을 타이머로 확실하게 (애니 콜백 대신)
    const total = 60 + 60 + 50 + 60 + 50 + 400 + 220; // ≈ 900ms
    const timer = setTimeout(() => {
      onDone?.();
    }, total);

    return () => clearTimeout(timer);
  }, [visible]);

  const flashStyle = useAnimatedStyle(() => ({ opacity: flash.value }));
  const boltStyle = useAnimatedStyle(() => ({ opacity: bolt.value }));

  if (!visible) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* 화면 번쩍 (노란빛) */}
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.flash, flashStyle]}
      />

      {/* 번개 줄기 */}
      <Animated.View style={[StyleSheet.absoluteFill, boltStyle]}>
        <Svg width={W} height={H}>
          <Defs>
            <LinearGradient id="glow" x1="0" y1="1" x2="0" y2="0">
              <Stop offset="0" stopColor="#FFD93B" stopOpacity="1" />
              <Stop offset="1" stopColor="#FFF3B0" stopOpacity="1" />
            </LinearGradient>
          </Defs>

          {/* 글로우(굵고 흐린 노랑) - 메인 */}
          <Path
            d={MAIN_BOLT}
            stroke="#FFC107"
            strokeWidth={16}
            strokeOpacity={0.35}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 가지 글로우 */}
          <Path
            d={BRANCH_1}
            stroke="#FFC107"
            strokeWidth={10}
            strokeOpacity={0.3}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d={BRANCH_2}
            stroke="#FFC107"
            strokeWidth={10}
            strokeOpacity={0.3}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 노란 중간층 - 메인 */}
          <Path
            d={MAIN_BOLT}
            stroke="url(#glow)"
            strokeWidth={7}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d={BRANCH_1}
            stroke="url(#glow)"
            strokeWidth={4.5}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d={BRANCH_2}
            stroke="url(#glow)"
            strokeWidth={4.5}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 흰 코어 - 메인 */}
          <Path
            d={MAIN_BOLT}
            stroke="#FFFFFF"
            strokeWidth={2.5}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d={BRANCH_1}
            stroke="#FFFFFF"
            strokeWidth={1.5}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d={BRANCH_2}
            stroke="#FFFFFF"
            strokeWidth={1.5}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  flash: { backgroundColor: "#FFEB3B" },
});
