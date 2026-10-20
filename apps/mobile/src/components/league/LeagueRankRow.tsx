import { useEffect, type ReactNode } from "react";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { Pressable } from "@/components/ui/Pressables";
import { cinemaAt, progress } from "@/components/cinema/cinema";
import {
  RANK_ANIM_TOTAL_MS,
  RANK_GAIN_CHIP,
  RANK_HOLD_MS,
  RANK_MOVE_MS,
} from "./leagueCinematic";

export { RANK_ANIM_TOTAL_MS };

const VIOLET = "#776EE2";

/**
 * 리더보드 한 줄 — 누르면 그 사람 프로필로 (onPress).
 *
 * 리스트는 **이미 새 순위로** 그려진다(서버가 정렬해서 준다). 그래서 순위 상승 연출은
 * "새 자리에서 어딘가로 간다" 가 아니라 **"옛 자리에서 시작해 새 자리로 돌아온다"**
 * 여야 한다. startOffset 은 그 옛 자리까지의 거리다 (양수 = 아래에 있었다).
 *
 *   나 (lifted)        : 옛 자리에서 잠깐 멈췄다가, 보라빛으로 빛나며 속도선을 끌고 치고 올라간다.
 *                        도착하면 통 튀고 "+N 계단" 칩이 뜬다.
 *   추월당한 사람 (음수) : 내가 지나갈 때 움찔(살짝 기울고 흐려짐)하며 한 칸 밀려 내려간다.
 *
 * 시계 하나(t, ms)로 모든 부위를 계산한다 — delay 만큼 기다렸다가 흐르기 시작한다
 * (들어오는 연출이 끝난 뒤에 시작하게).
 */
export default function LeagueRankRow({
  startOffset,
  animate,
  lifted = false,
  delay = 0,
  rankGain = 0,
  gainLabel,
  onPress,
  accessibilityLabel,
  style,
  children,
}: {
  /** 이 행이 있던 옛 자리까지의 거리(px). 양수=아래, 음수=위, 0=제자리 */
  startOffset: number;
  /** 측정이 끝나 연출을 시작해도 되는지 */
  animate: boolean;
  /** 내 행 — 빛나며 올라가고 도착 칩을 띄운다 */
  lifted?: boolean;
  /** 연출 시작까지 기다리는 시간 (ms) */
  delay?: number;
  /** 올라간 계단 수 (내 행에만) */
  rankGain?: number;
  /** 도착 칩 글자 ("+3 계단") */
  gainLabel?: string;
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}) {
  const t = useSharedValue(RANK_ANIM_TOTAL_MS);
  const moving = animate && startOffset !== 0;

  useEffect(() => {
    if (!moving) {
      t.value = RANK_ANIM_TOTAL_MS;
      return;
    }
    // 옛 자리로 **즉시** 보낸다(시계 0). 그 다음 시계가 흐르며 새 자리로 돌아온다.
    t.value = 0;
    t.value = withDelay(
      delay,
      withTiming(RANK_ANIM_TOTAL_MS, { duration: RANK_ANIM_TOTAL_MS, easing: Easing.linear }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moving, startOffset, lifted, delay]);

  const rowStyle = useAnimatedStyle(() => {
    const now = t.value;
    const p = progress(now, RANK_HOLD_MS, RANK_HOLD_MS + RANK_MOVE_MS);
    const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    const y = startOffset * (1 - e);
    if (lifted) {
      // 들려 있는 정도: 시작하자마자 들리고, 도착하며 내려앉는다
      const lift =
        now < RANK_HOLD_MS + RANK_MOVE_MS
          ? Math.min(1, now / 180)
          : Math.max(0, 1 - (now - RANK_HOLD_MS - RANK_MOVE_MS) / 200);
      // 도착 순간 통 — 커졌다 돌아온다
      const land = cinemaAt(
        [
          { t: RANK_HOLD_MS + RANK_MOVE_MS, v: 0 },
          { t: RANK_HOLD_MS + RANK_MOVE_MS + 110, v: 1, e: "out" },
          { t: RANK_HOLD_MS + RANK_MOVE_MS + 420, v: 0, e: "inOut" },
        ],
        now,
      );
      return {
        zIndex: lift > 0 ? 30 : 1,
        transform: [{ translateY: y }, { scale: 1 + lift * 0.05 + land * 0.06 }],
        shadowColor: VIOLET,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: lift * 0.45,
        shadowRadius: lift * 16,
        elevation: lift * 14,
      };
    }
    // 추월당하는 줄: 움직이는 동안 살짝 기울고 흐려진다
    const wobble = startOffset < 0 ? Math.sin(p * Math.PI) : 0;
    return {
      zIndex: 1,
      opacity: 1 - wobble * 0.35,
      transform: [{ translateY: y }, { rotate: `${-1.6 * wobble}deg` }],
    };
  });

  // 내 줄 테두리 빛 (올라가는 동안)
  const glowStyle = useAnimatedStyle(() => {
    const now = t.value;
    const on =
      now < RANK_HOLD_MS + RANK_MOVE_MS ? Math.min(1, now / 180) : Math.max(0, 1 - (now - RANK_HOLD_MS - RANK_MOVE_MS) / 360);
    return { opacity: lifted ? on : 0 };
  });

  // 속도선 — 올라가는 동안만, 줄 아래로 끌린다
  const streakStyle = useAnimatedStyle(() => {
    const p = progress(t.value, RANK_HOLD_MS, RANK_HOLD_MS + RANK_MOVE_MS);
    const bell = Math.sin(p * Math.PI);
    return { opacity: lifted && startOffset > 0 ? bell * 0.8 : 0, transform: [{ scaleY: 0.4 + bell * 0.6 }] };
  });

  // "+N 계단" 칩 — 도착하면 튀어나왔다가 한참 뒤 사라진다
  const chipStyle = useAnimatedStyle(() => {
    const c = cinemaAt(
      [
        { t: RANK_HOLD_MS + RANK_MOVE_MS, v: 0 },
        { t: RANK_HOLD_MS + RANK_MOVE_MS + RANK_GAIN_CHIP.show, v: 1, e: "back" },
        { t: RANK_HOLD_MS + RANK_MOVE_MS + RANK_GAIN_CHIP.hold, v: 1 },
        { t: RANK_HOLD_MS + RANK_MOVE_MS + RANK_GAIN_CHIP.hide, v: 0 },
      ],
      t.value,
    );
    return { opacity: Math.min(1, c), transform: [{ translateY: (1 - c) * 10 }, { scale: Math.max(0.001, c) }] };
  });

  return (
    <Animated.View style={rowStyle}>
      <Pressable
        onPress={onPress}
        disabled={!onPress}
        accessibilityRole={onPress ? "button" : undefined}
        accessibilityLabel={accessibilityLabel}
        style={({ pressed }) => [style, pressed && styles.pressed]}
      >
        {children}
      </Pressable>
      {lifted && moving ? (
        <>
          <Animated.View pointerEvents="none" style={[styles.glow, glowStyle]} />
          <Animated.View pointerEvents="none" style={[styles.streaks, streakStyle]}>
            {[0.18, 0.5, 0.82].map((x) => (
              <View key={x} style={[styles.streak, { left: `${x * 100}%` }]} />
            ))}
          </Animated.View>
          {rankGain > 0 && gainLabel ? (
            <Animated.View pointerEvents="none" style={[styles.chip, chipStyle]}>
              <Text style={styles.chipText}>{gainLabel}</Text>
            </Animated.View>
          ) : null}
        </>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.75, transform: [{ scale: 0.985 }] },
  glow: {
    ...StyleSheet.absoluteFill,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#9D8DFF",
  },
  streaks: {
    position: "absolute",
    left: "12%",
    right: "12%",
    top: "100%",
    height: 90,
    transformOrigin: "50% 0%",
  },
  streak: {
    position: "absolute",
    top: 0,
    width: 3,
    height: "100%",
    borderRadius: 2,
    backgroundColor: "#C4BEF0",
  },
  chip: {
    position: "absolute",
    right: 14,
    top: -12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: VIOLET,
    borderBottomWidth: 3,
    borderBottomColor: "#5B4DD4",
  },
  chipText: { color: "#FFFFFF", fontSize: 12, fontWeight: "900" },
});
