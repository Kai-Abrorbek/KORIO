import { useEffect } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import * as Haptics from "@/utils/haptics";
import Animated, { useAnimatedStyle, useReducedMotion } from "react-native-reanimated";
import { cinemaAt } from "@/components/cinema/cinema";
import { useCinemaClock } from "@/components/cinema/useCinema";
import { LIGHTNING, LIGHTNING_TRACK } from "./energyCinematic";

interface Props {
  visible: boolean;
  onDone?: () => void;
}

/**
 * 번개 — 하늘에서 내리꽂혀 화면 가운데 배터리(EnergyBonusPopup) 머리에 닿는다.
 * 위에서 아래로 순식간에 그어지고, 두어 번 깜빡인 뒤 은은하게 남았다가 배터리와 같이 사라진다.
 * 소리는 배터리 쪽이 시간표대로 낸다 (energyCinematic LIGHTNING_CUES).
 */
export default function LightningStrike({ visible }: Props) {
  const { width: W, height: H } = useWindowDimensions();
  const { clock, run } = useCinemaClock(LIGHTNING.end);
  const reducedMotion = useReducedMotion();

  // 배터리 머리 (EnergyBonusPopup 이 화면 가운데에 있다)
  const hitY = H / 2 - 62;
  const cx = W / 2;
  const main = `M${cx + 14} -10 L${cx - 22} ${hitY * 0.2} L${cx + 18} ${hitY * 0.36} L${cx - 26} ${hitY * 0.56} L${cx + 14} ${hitY * 0.74} L${cx - 8} ${hitY * 0.88} L${cx} ${hitY}`;
  const branch1 = `M${cx - 22} ${hitY * 0.2} L${cx - 70} ${hitY * 0.3} L${cx - 58} ${hitY * 0.42} L${cx - 96} ${hitY * 0.5}`;
  const branch2 = `M${cx - 26} ${hitY * 0.56} L${cx + 40} ${hitY * 0.62} L${cx + 30} ${hitY * 0.7} L${cx + 78} ${hitY * 0.76}`;
  const branch3 = `M${cx + 18} ${hitY * 0.36} L${cx + 60} ${hitY * 0.4} L${cx + 84} ${hitY * 0.32}`;

  useEffect(() => {
    if (!visible) return;
    run(reducedMotion ? 700 : 0);
    if (reducedMotion) return;
    const timers = [
      setTimeout(() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
      }, LIGHTNING.strike),
      setTimeout(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
      }, LIGHTNING.strike + 100),
    ];
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const flashStyle = useAnimatedStyle(() => ({ opacity: cinemaAt(LIGHTNING_TRACK.flash, clock.value) }));
  const boltStyle = useAnimatedStyle(() => ({ opacity: cinemaAt(LIGHTNING_TRACK.bolt, clock.value) }));
  // 위에서 아래로 그어진다 — 잘라 보이는 높이를 늘린다
  const drawStyle = useAnimatedStyle(() => ({
    height: Math.max(0.001, cinemaAt(LIGHTNING_TRACK.boltDraw, clock.value)) * (hitY + 14),
  }));

  if (!visible) return null;

  const layers: { d: string; w: number; color: string; o?: number }[] = [];
  for (const [d, scale] of [
    [main, 1],
    [branch1, 0.6],
    [branch2, 0.6],
    [branch3, 0.5],
  ] as const) {
    layers.push({ d, w: 18 * scale, color: "#FFC107", o: 0.3 });
    layers.push({ d, w: 7 * scale, color: "url(#boltGlow)" });
    layers.push({ d, w: 2.6 * scale, color: "#FFFFFF" });
  }

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* 화면 번쩍 (노란빛, 두 번) */}
      <Animated.View style={[StyleSheet.absoluteFill, styles.flash, flashStyle]} />

      {/* 번개 줄기 */}
      <Animated.View style={[styles.clip, { width: W }, boltStyle, drawStyle]}>
        <Svg width={W} height={hitY + 14}>
          <Defs>
            <LinearGradient id="boltGlow" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#FFF3B0" stopOpacity="1" />
              <Stop offset="1" stopColor="#FFD93B" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          {layers.map((layer, i) => (
            <Path
              key={i}
              d={layer.d}
              stroke={layer.color}
              strokeWidth={layer.w}
              strokeOpacity={layer.o ?? 1}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  flash: { backgroundColor: "#FFEB3B" },
  clip: { position: "absolute", left: 0, top: 0, overflow: "hidden" },
});
