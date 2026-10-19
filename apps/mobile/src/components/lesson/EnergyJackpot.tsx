import { useEffect, useMemo } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  type SharedValue,
} from "react-native-reanimated";
import Svg, { Circle, Path, Polygon } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import * as Haptics from "@/utils/haptics";
import { BOLT_PATH, cinemaAt, fountainAt, starPath, type FountainItem } from "@/components/cinema/cinema";
import { useCinemaAudio, useCinemaClock } from "@/components/cinema/useCinema";
import {
  JACKPOT,
  JACKPOT_TRACK,
  SLOT_SYMBOLS,
  bulbOn,
  coinArrival,
  jackpotCoinCount,
  jackpotCoins,
  jackpotCues,
  jackpotEnd,
  reelAt,
  reelDistance,
  type EnergySound,
  type SlotSymbol,
} from "./energyCinematic";

/**
 * 콤보 에너지 보상 연출 — "잭팟 슬롯" (번개·코어와 랜덤으로 번갈아 나온다).
 *   1) 보라 슬롯머신이 위에서 쿵 떨어지고, 손잡이가 저절로 당겨진다
 *   2) 세 칸이 돌다 하나씩 ⚡ 로 멈춘다 — 마지막 칸은 뜸을 들인다
 *   3) 잭팟! 전구가 다 같이 번쩍이고 에너지 동전이 쏟아져 헤더 에너지 배지로 날아간다
 * 시간표는 energyCinematic JACKPOT. pointerEvents="none" — 연출 중에도 다음 버튼을 누를 수 있다.
 */

interface Props {
  visible: boolean;
  amount: number;
  onDone: () => void;
  /** 아래 작은 글씨 (기본: 연속 정답 보너스) */
  subtitle?: string;
}

type JackpotSound = Extract<
  EnergySound,
  "slotLever" | "slotSpin" | "slotStop" | "jackpot" | "voJackpot" | "collect"
>;
const SOURCES: Record<JackpotSound, number> = {
  slotLever: require("../../../assets/sounds/energy/slot-lever.mp3"),
  slotSpin: require("../../../assets/sounds/energy/slot-spin.mp3"),
  slotStop: require("../../../assets/sounds/energy/slot-stop.mp3"),
  jackpot: require("../../../assets/sounds/energy/jackpot.mp3"),
  voJackpot: require("../../../assets/sounds/energy/vo-jackpot.mp3"),
  collect: require("../../../assets/sounds/energy/collect.mp3"),
};
const GAIN: Partial<Record<JackpotSound, number>> = { slotSpin: 0.55, slotStop: 0.9, jackpot: 0.75, collect: 0.7 };
const CUES = jackpotCues() as { t: number; sound: JackpotSound }[];

const CAB_W = 288;
const CAB_H = 252;
const SYM = 74; // 기호 한 칸 높이
const REEL_W = 72;
const WIN_H = 96;
const N = SLOT_SYMBOLS.length;
const BULBS = 14;

export default function EnergyJackpot({ visible, amount, onDone, subtitle }: Props) {
  const { t } = useTranslation();
  const { width: W, height: H } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  const coinCount = jackpotCoinCount(amount);
  const end = jackpotEnd(coinCount);
  const { clock, run } = useCinemaClock(end);
  const audio = useCinemaAudio(SOURCES, GAIN);
  const coins = useMemo(() => jackpotCoins(coinCount, 110), [coinCount]);
  const distances = useMemo(() => JACKPOT.stops.map(reelDistance), []);

  // 동전이 나오는 곳 (기계 아래 받침) → 헤더 오른쪽 에너지 배지
  const trayX = W / 2;
  const trayY = H / 2 + CAB_H / 2 - 22;
  const targetX = W - 52;
  const targetY = insets.top + 34;

  useEffect(() => {
    if (!visible || amount <= 0) return;
    const from = reducedMotion ? JACKPOT.win : 0;
    run(from);
    audio.playFrom(from, CUES);
    const at = (ms: number, fn: () => void) => setTimeout(fn, Math.max(0, ms - from));
    const timers = [
      ...JACKPOT.stops.map((stop, i) =>
        at(stop, () => {
          Haptics.impactAsync(i === 2 ? Haptics.ImpactFeedbackStyle.Heavy : Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
        }),
      ),
      at(JACKPOT.win, () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      }),
      // 첫 동전 · 마지막 동전이 헤더에 닿을 때
      at(coinArrival(0), () => audio.play("collect")),
      at(coinArrival(coinCount - 1), () => {
        audio.play("collect", { rate: 1.2 });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      }),
      // 애니메이션이 끊겨도(화면 전환 등) 반드시 닫힌다
      at(end, onDone),
    ];
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, amount]);

  const dimStyle = useAnimatedStyle(() => ({ opacity: cinemaAt(JACKPOT_TRACK.dim, clock.value) }));
  const cabinetStyle = useAnimatedStyle(() => {
    const tt = clock.value;
    const leave = cinemaAt(JACKPOT_TRACK.leave, tt);
    return {
      opacity: 1 - leave,
      transform: [
        { translateY: cinemaAt(JACKPOT_TRACK.drop, tt) * (H / 2 + CAB_H) },
        { scale: 1 - 0.35 * leave },
      ],
    };
  });
  const flashStyle = useAnimatedStyle(() => ({ opacity: cinemaAt(JACKPOT_TRACK.win, clock.value) * 0.35 }));
  const glowStyle = useAnimatedStyle(() => ({ opacity: cinemaAt(JACKPOT_TRACK.win, clock.value) * 0.6 }));
  const leverStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${cinemaAt(JACKPOT_TRACK.lever, clock.value) * 118}deg` }],
  }));
  const amountStyle = useAnimatedStyle(() => {
    const a = cinemaAt(JACKPOT_TRACK.amount, clock.value);
    return { opacity: Math.min(1, a), transform: [{ scale: Math.max(0.001, a) }] };
  });

  if (!visible || amount <= 0) return null;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Animated.View style={[StyleSheet.absoluteFill, styles.dim, dimStyle]} />
      <Animated.View style={[StyleSheet.absoluteFill, styles.flash, flashStyle]} />

      <View style={styles.center}>
        <Animated.View style={[styles.cabinetWrap, cabinetStyle]}>
          {/* 잭팟 후광 */}
          <Animated.View style={[styles.glow, glowStyle]} />

          {/* +N */}
          <Animated.View style={[styles.amountWrap, amountStyle]}>
            <Text style={styles.amount}>+{amount}</Text>
          </Animated.View>

          {/* 손잡이 — 오른쪽, 아래로 당겨진다 */}
          <View style={styles.leverBase} />
          <Animated.View style={[styles.lever, leverStyle]}>
            <View style={styles.leverStick} />
            <View style={styles.leverKnob} />
          </Animated.View>

          <View style={styles.cabinet}>
            <View style={[StyleSheet.absoluteFill, styles.cabinetFill]}>
              <LinearGradient colors={["#9D8DFF", "#776EE2", "#5B4DD4"]} style={StyleSheet.absoluteFill} />
            </View>

            {/* 위 간판 */}
            <View style={styles.marquee}>
              <Text style={styles.marqueeText}>잭팟</Text>
            </View>

            {/* 세 칸 */}
            <View style={styles.reelPanel}>
              {JACKPOT.stops.map((stop, i) => (
                <Reel key={i} clock={clock} stopAt={stop} distance={distances[i] as number} />
              ))}
              {/* 가운데 줄 */}
              <View style={styles.payline} />
            </View>

            {/* 받침 */}
            <View style={styles.tray} />

            {/* 테두리 전구 */}
            {Array.from({ length: BULBS }, (_, i) => (
              <Bulb key={i} index={i} clock={clock} />
            ))}
          </View>

          <Text style={styles.sub} numberOfLines={2}>
            {subtitle ?? t("lesson.energySurgeSub")}
          </Text>
        </Animated.View>
      </View>

      {/* 에너지 동전 — 받침에서 쏟아져 헤더로 */}
      {coins.map((coin, i) => (
        <Coin
          key={i}
          coin={coin}
          clock={clock}
          fromX={trayX}
          fromY={trayY}
          toX={targetX}
          toY={targetY}
        />
      ))}
    </View>
  );
}

/* ───────── 부위 ───────── */

const STAR = starPath(50, 50, 44, 19);

function SymbolFace({ symbol }: { symbol: SlotSymbol }) {
  if (symbol === "bolt") {
    return (
      <Svg width={50} height={50} viewBox="0 0 100 100">
        <Path d={BOLT_PATH} fill="#FFD23F" stroke="#E0A200" strokeWidth={5} strokeLinejoin="round" />
      </Svg>
    );
  }
  if (symbol === "star") {
    return (
      <Svg width={46} height={46} viewBox="0 0 100 100">
        <Path d={STAR} fill="#FFD45C" stroke="#E2A83A" strokeWidth={4} strokeLinejoin="round" />
      </Svg>
    );
  }
  if (symbol === "gem") {
    return (
      <Svg width={44} height={44} viewBox="0 0 100 100">
        <Polygon points="50,6 92,32 50,94 8,32" fill="#3BB6E5" />
        <Polygon points="50,6 92,32 50,40 8,32" fill="#A8E5F7" />
        <Polygon points="50,40 92,32 50,94" fill="#5CD0F0" />
      </Svg>
    );
  }
  return <Text style={styles.symbolText}>{symbol}</Text>;
}

/** 한 칸 — 기호 띠가 아래로 흐르다 ⚡ 에 멈춘다 */
function Reel({ clock, stopAt, distance }: { clock: SharedValue<number>; stopAt: number; distance: number }) {
  const stripStyle = useAnimatedStyle(() => {
    const p = reelAt(clock.value, stopAt, distance);
    const m = ((p % N) + N) % N;
    return { transform: [{ translateY: m * SYM }] };
  });
  // 빨리 돌 땐 흐릿하게
  const blurStyle = useAnimatedStyle(() => {
    const tt = clock.value;
    const spinning = tt > JACKPOT.spin + 60 && tt < stopAt - 260;
    return { opacity: spinning ? 0.55 : 0 };
  });
  return (
    <View style={styles.reel}>
      <Animated.View style={[styles.strip, { top: WIN_H / 2 - (N + 0.5) * SYM }, stripStyle]}>
        {Array.from({ length: N * 3 }, (_, j) => (
          <View key={j} style={styles.symbol}>
            <SymbolFace symbol={SLOT_SYMBOLS[j % N] as SlotSymbol} />
          </View>
        ))}
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, styles.reelBlur, blurStyle]} />
      {/* 위아래 그늘 — 둥근 통처럼 */}
      <LinearGradient
        colors={["rgba(20,15,51,0.55)", "rgba(20,15,51,0)", "rgba(20,15,51,0)", "rgba(20,15,51,0.55)"]}
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

/** 테두리 전구 — 둘레를 따라 고르게 */
function Bulb({ index, clock }: { index: number; clock: SharedValue<number> }) {
  // 둘레를 한 바퀴 (위 → 오른쪽 → 아래 → 왼쪽)
  const per = 2 * (CAB_W + CAB_H);
  const d = (index / BULBS) * per;
  let x: number;
  let y: number;
  if (d < CAB_W) [x, y] = [d, 0];
  else if (d < CAB_W + CAB_H) [x, y] = [CAB_W, d - CAB_W];
  else if (d < 2 * CAB_W + CAB_H) [x, y] = [CAB_W - (d - CAB_W - CAB_H), CAB_H];
  else [x, y] = [0, CAB_H - (d - 2 * CAB_W - CAB_H)];
  const style = useAnimatedStyle(() => ({ opacity: bulbOn(index, clock.value) }));
  return <Animated.View style={[styles.bulb, { left: x - 6, top: y - 6 }, style]} />;
}

function Coin({
  coin,
  clock,
  fromX,
  fromY,
  toX,
  toY,
}: {
  coin: FountainItem;
  clock: SharedValue<number>;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}) {
  const style = useAnimatedStyle(() => {
    const p = fountainAt(coin, clock.value, fromX, fromY, toX, toY, JACKPOT.fly);
    return {
      opacity: p.opacity,
      transform: [
        { translateX: p.x - coin.size / 2 },
        { translateY: p.y - coin.size / 2 },
        { rotate: `${p.rotate}deg` },
        { scale: p.scale },
      ],
    };
  });
  return (
    <Animated.View style={[styles.coin, { width: coin.size, height: coin.size }, style]}>
      <Svg width={coin.size} height={coin.size} viewBox="0 0 100 100">
        <Circle cx={50} cy={50} r={46} fill="#E0A200" />
        <Circle cx={50} cy={46} r={42} fill="#FFD23F" />
        <Path d={BOLT_PATH} fill="#FFFFFF" transform="translate(22 18) scale(0.56)" />
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  dim: { backgroundColor: "#140F33" },
  flash: { backgroundColor: "#FFE066" },
  center: { ...StyleSheet.absoluteFill, alignItems: "center", justifyContent: "center" },
  cabinetWrap: { width: CAB_W, alignItems: "center" },
  glow: {
    position: "absolute",
    top: -30,
    width: CAB_W + 60,
    height: CAB_H + 60,
    borderRadius: 48,
    backgroundColor: "#FFE066",
  },
  cabinetFill: { borderRadius: 24, overflow: "hidden" },
  amountWrap: { position: "absolute", top: -78, left: 0, right: 0, alignItems: "center", zIndex: 3 },
  amount: {
    fontSize: 56,
    fontWeight: "900",
    color: "#FFE066",
    letterSpacing: -1,
    textShadowColor: "rgba(91, 77, 212, 0.95)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 0,
  },
  cabinet: {
    width: CAB_W,
    height: CAB_H,
    borderRadius: 28,
    borderWidth: 4,
    borderColor: "#FFD45C",
    borderBottomWidth: 8,
    borderBottomColor: "#E2A83A",
    overflow: "visible",
    alignItems: "center",
  },
  marquee: {
    marginTop: 14,
    paddingHorizontal: 22,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#FFD45C",
    borderBottomWidth: 3,
    borderBottomColor: "#E2A83A",
  },
  marqueeText: { fontSize: 22, fontWeight: "900", color: "#5B4DD4", letterSpacing: 2 },
  reelPanel: {
    marginTop: 14,
    flexDirection: "row",
    gap: 8,
    padding: 8,
    borderRadius: 18,
    backgroundColor: "#140F33",
  },
  reel: {
    width: REEL_W,
    height: WIN_H,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  reelBlur: { backgroundColor: "#E9E4FF" },
  strip: { position: "absolute", left: 0, right: 0 },
  symbol: { height: SYM, alignItems: "center", justifyContent: "center" },
  symbolText: { fontSize: 38, fontWeight: "900", color: "#776EE2" },
  payline: {
    position: "absolute",
    left: 4,
    right: 4,
    top: 8 + WIN_H / 2 - 1.5,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#FFD45C",
    opacity: 0.7,
  },
  tray: {
    position: "absolute",
    bottom: 12,
    width: CAB_W * 0.62,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#140F33",
  },
  bulb: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FFF6C2",
    borderWidth: 2,
    borderColor: "#FFD45C",
  },
  leverBase: {
    position: "absolute",
    right: -18,
    top: CAB_H * 0.42,
    width: 20,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#5B4DD4",
  },
  lever: {
    position: "absolute",
    right: -14,
    top: CAB_H * 0.42 + 14,
    width: 12,
    height: 96,
    marginTop: -96,
    transformOrigin: "50% 100%",
    alignItems: "center",
  },
  leverStick: { position: "absolute", top: 18, bottom: 0, width: 8, borderRadius: 4, backgroundColor: "#D9D3FF" },
  leverKnob: {
    position: "absolute",
    top: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E5379B",
    borderBottomWidth: 4,
    borderBottomColor: "#B8247A",
  },
  sub: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: "800",
    color: "#E6E3FF",
    textAlign: "center",
  },
  coin: { position: "absolute", left: 0, top: 0 },
});
