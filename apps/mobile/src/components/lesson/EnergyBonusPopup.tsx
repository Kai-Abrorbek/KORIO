import { useEffect, useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useReducedMotion,
  type SharedValue,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "@/utils/haptics";
import { cinemaAt, progress } from "@/components/cinema/cinema";
import { useCinemaAudio, useCinemaClock } from "@/components/cinema/useCinema";
import {
  ARC_SETS,
  LIGHTNING,
  LIGHTNING_CUES,
  LIGHTNING_TRACK,
  arcPhase,
  type LightningSound,
} from "./energyCinematic";

interface Props {
  visible: boolean;
  amount: number;
  onDone: () => void;
}

const SOURCES: Record<LightningSound, number> = {
  thunder: require("../../../assets/sounds/energy/thunder.mp3"),
  charge: require("../../../assets/sounds/energy/charge.mp3"),
  collect: require("../../../assets/sounds/energy/collect.mp3"),
};
const GAIN = { thunder: 0.8, charge: 0.7, collect: 0.8 };

const BATT_W = 150;
const BATT_H = 96;
const CELL_GAP = 5;

/**
 * 번개 배터리 — 번개(LightningStrike)가 머리에 꽂히면 튀어나와 칸칸이 충전되고,
 * 둘레에 전기가 지지직 튄다. 다 차면 번쩍, 그리고 헤더 에너지 배지로 빨려 들어간다.
 * 시간표는 energyCinematic LIGHTNING. pointerEvents="none" — 연출 중에도 다음 버튼을 누를 수 있다.
 */
export default function EnergyBonusPopup({ visible, amount, onDone }: Props) {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  const { clock, run } = useCinemaClock(LIGHTNING.end);
  const audio = useCinemaAudio(SOURCES, GAIN);
  const [display, setDisplay] = useState(0);

  // 헤더 오른쪽 에너지 배지 (화면 가운데 기준) — EnergySurge 와 같은 자리
  const targetX = W / 2 - 52;
  const targetY = -H / 2 + insets.top + 34;

  useEffect(() => {
    if (!visible || amount <= 0) return;
    setDisplay(0);
    const from = reducedMotion ? LIGHTNING.fill + LIGHTNING.cells * LIGHTNING.cellGap : 0;
    run(from);
    audio.playFrom(from, LIGHTNING_CUES);
    const timers = [
      // 다 찼을 때 · 헤더에 닿을 때 진동
      setTimeout(
        () => void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {}),
        Math.max(0, 1400 - from),
      ),
      setTimeout(
        () => void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {}),
        Math.max(0, LIGHTNING.collect + LIGHTNING.collectDur - 60 - from),
      ),
      // 애니메이션이 끊겨도(화면 전환 등) 반드시 닫힌다
      setTimeout(onDone, LIGHTNING.end - from),
    ];
    // 소리는 끊지 않는다 — 닫히는 순간 빨려 드는 소리가 아직 울리고 있다
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, amount]);

  // +N — 칸이 차는 동안 따라 오른다
  const fillEnd = LIGHTNING.fill + LIGHTNING.cells * LIGHTNING.cellGap;
  useAnimatedReaction(
    () => Math.round(progress(clock.value, LIGHTNING.fill, fillEnd) * amount),
    (now, previous) => {
      if (now !== previous) runOnJS(setDisplay)(now);
    },
  );

  const wrapStyle = useAnimatedStyle(() => {
    const t = clock.value;
    const pop = cinemaAt(LIGHTNING_TRACK.battery, t);
    const c = cinemaAt(LIGHTNING_TRACK.collect, t);
    return {
      opacity: (pop <= 0 ? 0 : 1) * (1 - Math.max(0, (c - 0.8) / 0.2)),
      transform: [
        { translateX: c * targetX },
        { translateY: c * targetY },
        { scale: Math.max(0.001, pop) * (1 - 0.82 * c) },
      ],
    };
  });
  const dimStyle = useAnimatedStyle(() => ({ opacity: cinemaAt(LIGHTNING_TRACK.dim, clock.value) }));
  const fullStyle = useAnimatedStyle(() => {
    const f = cinemaAt(LIGHTNING_TRACK.full, clock.value);
    return { opacity: f, transform: [{ scale: 1 + 0.5 * (1 - f) }] };
  });

  if (!visible || amount <= 0) return null;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Animated.View style={[StyleSheet.absoluteFill, s.dim, dimStyle]} />
      <View style={s.center}>
        <Animated.View style={[s.wrap, wrapStyle]}>
          {/* 다 찼을 때 번쩍 테 */}
          <Animated.View style={[s.fullRing, fullStyle]} />

          {/* 둘레 전기 — 세 벌이 번갈아 */}
          {ARC_SETS.map((d, i) => (
            <Arc key={i} d={d} index={i} clock={clock} />
          ))}

          <View style={s.batteryRow}>
            <View style={s.battery}>
              <View style={s.cells}>
                {Array.from({ length: LIGHTNING.cells }, (_, i) => (
                  <Cell key={i} index={i} clock={clock} />
                ))}
              </View>
              <View style={s.gloss} />
              <Text style={s.battText}>+{display}</Text>
            </View>
            {/* 양극 꼭지 */}
            <View style={s.cap} />
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

/** 배터리 칸 하나 — 차례가 오면 아래서 위로 차오르며 번쩍 */
function Cell({ index, clock }: { index: number; clock: SharedValue<number> }) {
  const start = LIGHTNING.fill + index * LIGHTNING.cellGap;
  const style = useAnimatedStyle(() => {
    const p = progress(clock.value, start, start + 160);
    return {
      opacity: p <= 0 ? 0 : 1,
      transform: [{ scaleY: Math.max(0.001, p) }],
      backgroundColor: p < 1 ? "#FFFFFF" : "#FFE066",
    };
  });
  return (
    <View style={s.cellSlot}>
      <Animated.View style={[s.cellFill, style]} />
    </View>
  );
}

function Arc({ d, index, clock }: { d: string; index: number; clock: SharedValue<number> }) {
  const style = useAnimatedStyle(() => ({
    opacity: arcPhase(clock.value) === index ? cinemaAt(LIGHTNING_TRACK.arcs, clock.value) : 0,
  }));
  return (
    <Animated.View style={[s.arcs, style]}>
      <Svg width={240} height={160}>
        <Path d={d} stroke="#FFE066" strokeWidth={6} strokeOpacity={0.35} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <Path d={d} stroke="#FFFFFF" strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  dim: { backgroundColor: "#140F33" },
  center: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99999,
    elevation: 99999,
  },
  wrap: { width: 240, height: 160, alignItems: "center", justifyContent: "center" },
  arcs: { position: "absolute", left: 0, top: 0 },
  fullRing: {
    position: "absolute",
    width: BATT_W + 40,
    height: BATT_H + 40,
    borderRadius: 34,
    borderWidth: 4,
    borderColor: "#FFE066",
  },
  batteryRow: { flexDirection: "row", alignItems: "center", marginLeft: 13 },
  battery: {
    width: BATT_W,
    height: BATT_H,
    borderRadius: 24,
    backgroundColor: "#FFC107",
    borderBottomWidth: 5,
    borderBottomColor: "#E0A200",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  cells: {
    position: "absolute",
    left: 12,
    right: 12,
    top: 12,
    bottom: 10,
    flexDirection: "row",
    gap: CELL_GAP,
  },
  cellSlot: { flex: 1, borderRadius: 6, backgroundColor: "rgba(160, 90, 0, 0.28)", overflow: "hidden", justifyContent: "flex-end" },
  cellFill: { height: "100%", borderRadius: 6, transformOrigin: "50% 100%" },
  gloss: {
    position: "absolute",
    left: 16,
    top: 14,
    width: 18,
    height: BATT_H - 40,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    opacity: 0.35,
  },
  battText: {
    fontSize: 48,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -1,
    textShadowColor: "rgba(150, 70, 0, 0.6)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  cap: {
    width: 13,
    height: 36,
    marginLeft: 4,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    backgroundColor: "#FFC107",
  },
});
