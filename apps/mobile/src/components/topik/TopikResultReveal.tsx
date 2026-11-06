import { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View, type LayoutChangeEvent } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { useTranslation } from "react-i18next";
import { Pressable } from "@/components/ui/Pressables";
import HaneulmonMascot, {
  type HaneulmonMood,
} from "@/components/home/HaneulmonMascot";
import { useSound } from "@/hooks/useSound";
import * as Haptics from "@/utils/haptics";
import { type TopikPalette, useTopikTheme } from "./topikTheme";

/**
 * TOPIK 결과 공개 — "답안지 채점".
 *
 * 시험지 답안 칸(OMR)처럼 문항 수만큼 동그라미가 깔리고, 채점 막대가 줄마다 지나가며
 * 맞은 칸은 초록·틀린 칸은 빨강으로 칠해진다. 맞은 칸이 칠해질 때마다 점수가 같이 오르고,
 * 다 칠하면 점수가 "쾅" 자리 잡고 선생님이 시험지에 치듯 금색 동그라미가 점수를 감싼다.
 * 하늘몬이 점수에 맞춰 튀어나온다. 답안지를 누르면 다시 채점한다.
 *
 * 동작 줄이기 설정이면 칠하기 없이 끝 상태를 바로 보여 준다.
 * 저사양 폰 기준: 뷰 50개 + 시계 하나(shared value)로만 돈다.
 */

const CROWN_GOLD = "#FFD900"; // 보상의 금색 (DESIGN.md crown-gold)
const COLUMNS = 10;
const START_DELAY_MS = 380;
const SHARDS = 10;

export interface TopikRevealQuestion {
  number: number;
  isCorrect: boolean | null;
}

interface Props {
  questions: TopikRevealQuestion[];
  score: number;
  /** 다 칠하고 점수가 자리 잡는 순간 (아래 카드들이 이어서 올라온다) */
  onLanded?: () => void;
}

/** 채점 막대가 지나가는 시간 — 문항 수에 비례, 너무 길지 않게 */
export function topikRevealSweepMs(count: number) {
  return count > 0 ? Math.min(1300, Math.max(650, count * 26)) : 0;
}

/** 다 공개될 때까지 (화면이 아래 카드 등장 시각을 맞출 때) */
export function topikRevealTotalMs(count: number) {
  return START_DELAY_MS + topikRevealSweepMs(count) + 120;
}

function moodFor(score: number): HaneulmonMood {
  if (score >= 85) return "celebrating";
  if (score >= 65) return "great";
  if (score >= 40) return "proud";
  return "determined";
}

/** 손으로 친 듯한 타원 — 시작과 끝이 조금 겹치고, 둘레가 살짝 울퉁불퉁 */
function scribblePath(w: number, h: number) {
  const cx = w / 2;
  const cy = h / 2;
  const rx = w / 2 - 5;
  const ry = h / 2 - 5;
  const start = (-200 * Math.PI) / 180;
  const sweep = (372 * Math.PI) / 180;
  const steps = 48;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const a = start + (sweep * i) / steps;
    const wobble = 1 + 0.035 * Math.sin(a * 3 + 0.7) + (i / steps) * 0.05;
    const x = cx + Math.cos(a) * rx * wobble;
    const y = cy + Math.sin(a) * ry * (wobble - 0.02);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

function Bubble({
  index,
  correct,
  size,
  clock,
  palette,
}: {
  index: number;
  correct: boolean | null;
  size: number;
  clock: SharedValue<number>;
  palette: TopikPalette;
}) {
  const fill = useAnimatedStyle(() => {
    const t = Math.min(1, Math.max(0, clock.value - index));
    return {
      opacity: t > 0 ? 1 : 0,
      transform: [{ scale: interpolate(t, [0, 0.55, 1], [0.35, 1.18, 1]) }],
    };
  });
  const color =
    correct === null
      ? palette.translucentWhite
      : correct
        ? palette.success
        : palette.danger;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1.5,
        borderColor: palette.heroDivider,
        backgroundColor: palette.heroGlassDark,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.View
        style={[
          {
            width: size - 5,
            height: size - 5,
            borderRadius: (size - 5) / 2,
            backgroundColor: color,
          },
          fill,
        ]}
      />
    </View>
  );
}

function Shard({
  index,
  burst,
}: {
  index: number;
  burst: SharedValue<number>;
}) {
  const angle = (index / SHARDS) * Math.PI * 2 + 0.3;
  const reach = 62 + (index % 3) * 18;
  const style = useAnimatedStyle(() => {
    const t = burst.value;
    return {
      opacity: t <= 0 || t >= 1 ? 0 : interpolate(t, [0, 0.15, 1], [0, 1, 0]),
      transform: [
        { translateX: Math.cos(angle) * reach * t },
        { translateY: Math.sin(angle) * reach * 0.7 * t },
        { rotate: `${index * 47 + t * 160}deg` },
        { scale: interpolate(t, [0, 1], [1, 0.5]) },
      ],
    };
  });
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.shard,
        {
          backgroundColor: index % 2 ? CROWN_GOLD : "rgba(255,255,255,0.92)",
          width: index % 3 === 0 ? 9 : 6,
          height: index % 3 === 0 ? 4 : 6,
          borderRadius: index % 3 === 0 ? 2 : 3,
        },
        style,
      ]}
    />
  );
}

export function TopikResultReveal({ questions, score, onLanded }: Props) {
  const { t } = useTranslation();
  const palette = useTopikTheme();
  const reduced = useReducedMotion();
  const { play } = useSound();

  const ordered = useMemo(
    () => [...questions].sort((a, b) => a.number - b.number),
    [questions],
  );
  const count = ordered.length;
  const sweepMs = topikRevealSweepMs(count);
  // i 번째 칸까지 맞은 개수 — 점수를 칠하는 속도에 맞춰 올린다
  const correctPrefix = useMemo(() => {
    const out = [0];
    ordered.forEach((q, i) => out.push(out[i] + (q.isCorrect ? 1 : 0)));
    return out;
  }, [ordered]);
  const totalCorrect = correctPrefix[count] ?? 0;

  const [gridWidth, setGridWidth] = useState(0);
  const [shownScore, setShownScore] = useState(reduced ? score : 0);
  const [scoreBox, setScoreBox] = useState({ w: 0, h: 0 });

  const clock = useSharedValue(reduced ? count : 0);
  const land = useSharedValue(reduced ? 1 : 0);
  const pop = useSharedValue(1);
  const circle = useSharedValue(reduced ? 1 : 0);
  const burst = useSharedValue(reduced ? 1 : 0);

  const landed = useCallback(() => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    play("lessonComplete");
    onLanded?.();
  }, [onLanded, play]);

  const run = useCallback(() => {
    if (reduced) {
      clock.value = count;
      land.value = 1;
      circle.value = 1;
      setShownScore(score);
      onLanded?.();
      return;
    }
    [clock, land, pop, circle, burst].forEach((v) => cancelAnimation(v));
    clock.value = 0;
    land.value = 0;
    circle.value = 0;
    burst.value = 0;
    pop.value = 1;
    setShownScore(0);
    const sweep = sweepMs;
    clock.value = withDelay(
      START_DELAY_MS,
      withTiming(count, { duration: sweep, easing: Easing.linear }),
    );
    const landAt = START_DELAY_MS + sweep + 60;
    pop.value = withDelay(
      landAt,
      withSequence(
        withTiming(1.22, { duration: 130, easing: Easing.out(Easing.quad) }),
        withSpring(1, { damping: 8, stiffness: 220 }),
      ),
    );
    land.value = withDelay(
      landAt,
      withTiming(1, { duration: 1 }, (done) => {
        if (done) runOnJS(landed)();
      }),
    );
    burst.value = withDelay(
      landAt,
      withTiming(1, { duration: 700, easing: Easing.out(Easing.cubic) }),
    );
    circle.value = withDelay(
      landAt + 90,
      withTiming(1, { duration: 520, easing: Easing.out(Easing.exp) }),
    );
  }, [
    burst,
    circle,
    clock,
    count,
    land,
    landed,
    onLanded,
    pop,
    reduced,
    score,
    sweepMs,
  ]);

  useEffect(() => {
    run();
    // 처음 한 번만 — 다시 채점은 답안지를 누를 때
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 칠해지는 칸에 맞춰 점수를 올린다 (정수가 바뀔 때만 다시 그린다)
  useAnimatedReaction(
    () => {
      if (land.value >= 1) return score;
      if (count === 0) return 0;
      const revealed = Math.min(count, Math.floor(clock.value));
      const ratio = totalCorrect ? correctPrefix[revealed] / totalCorrect : 0;
      return Math.round(score * ratio);
    },
    (next, prev) => {
      if (next !== prev) runOnJS(setShownScore)(next);
    },
    [score, count, totalCorrect, correctPrefix],
  );

  const rows = Math.ceil(count / COLUMNS);
  const gap = 5;
  const labelWidth = 18;
  const bubble = gridWidth
    ? Math.min(
        22,
        Math.floor((gridWidth - labelWidth - gap * (COLUMNS - 1)) / COLUMNS),
      )
    : 0;

  const scanStyle = useAnimatedStyle(() => {
    const row = Math.min(rows - 1, Math.floor(clock.value / COLUMNS));
    const active = clock.value > 0 && clock.value < count;
    return {
      opacity: withTiming(active ? 1 : 0, { duration: 160 }),
      transform: [{ translateY: Math.max(0, row) * (bubble + gap) }],
    };
  });
  const scoreStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pop.value }],
  }));
  const mascotStyle = useAnimatedStyle(() => ({
    opacity: land.value,
    transform: [
      { translateY: interpolate(land.value, [0, 1], [26, 0]) },
      { scale: withSpring(land.value ? 1 : 0.6, { damping: 9 }) },
    ],
  }));

  const pathD = useMemo(
    () => (scoreBox.w ? scribblePath(scoreBox.w, scoreBox.h) : ""),
    [scoreBox],
  );
  const pathLength = useMemo(() => {
    if (!scoreBox.w) return 1;
    const a = scoreBox.w / 2;
    const b = scoreBox.h / 2;
    // 타원 둘레 근사 × 그린 각도(372°/360°) + 울퉁불퉁 여유
    return Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b))) * 1.1;
  }, [scoreBox]);
  const circleProps = useAnimatedProps(() => ({
    strokeDashoffset: pathLength * (1 - circle.value),
  }));

  return (
    <View style={styles.wrap}>
      {count > 0 && (
        <Pressable
          onPress={run}
          accessibilityRole="button"
          accessibilityLabel={t("topik.result.replayGrading")}
          style={styles.sheet}
        >
          <View
            style={styles.grid}
            onLayout={(e: LayoutChangeEvent) =>
              setGridWidth(Math.round(e.nativeEvent.layout.width))
            }
          >
            {bubble > 0 && (
              <>
                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.scan,
                    {
                      height: bubble + 4,
                      backgroundColor: palette.heroGlowSoft,
                      left: labelWidth - 4,
                    },
                    scanStyle,
                  ]}
                />
                {Array.from({ length: rows }, (_, r) => (
                  <View
                    key={r}
                    style={[
                      styles.row,
                      { gap, marginBottom: r < rows - 1 ? gap : 0 },
                    ]}
                  >
                    <Text
                      style={[
                        styles.rowLabel,
                        { width: labelWidth, color: palette.heroMuted },
                      ]}
                    >
                      {ordered[r * COLUMNS]?.number}
                    </Text>
                    {ordered
                      .slice(r * COLUMNS, r * COLUMNS + COLUMNS)
                      .map((q, c) => (
                        <Bubble
                          key={q.number}
                          index={r * COLUMNS + c}
                          correct={q.isCorrect}
                          size={bubble}
                          clock={clock}
                          palette={palette}
                        />
                      ))}
                  </View>
                ))}
              </>
            )}
          </View>
        </Pressable>
      )}

      <View style={styles.scoreRow}>
        <View
          accessible
          accessibilityLabel={`${score} ${t("topik.result.scoreTotal", { score: 100 })}`}
          onLayout={(e: LayoutChangeEvent) =>
            setScoreBox({
              w: Math.round(e.nativeEvent.layout.width) + 34,
              h: Math.round(e.nativeEvent.layout.height) + 14,
            })
          }
          style={styles.scoreBlock}
        >
          <Animated.View style={[styles.scoreInner, scoreStyle]}>
            <Text style={[styles.score, { color: palette.white }]}>
              {shownScore}
            </Text>
            <Text style={[styles.scoreUnit, { color: palette.heroMuted }]}>
              {t("topik.result.scoreTotal", { score: 100 })}
            </Text>
          </Animated.View>
          {scoreBox.w > 0 && (
            <Svg
              pointerEvents="none"
              width={scoreBox.w}
              height={scoreBox.h}
              style={[styles.circle, { left: -17, top: -7 }]}
            >
              <AnimatedPath
                d={pathD}
                stroke={CROWN_GOLD}
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                strokeDasharray={`${pathLength} ${pathLength}`}
                animatedProps={circleProps}
              />
            </Svg>
          )}
          <View pointerEvents="none" style={styles.shardOrigin}>
            {Array.from({ length: SHARDS }, (_, i) => (
              <Shard key={i} index={i} burst={burst} />
            ))}
          </View>
        </View>
        <Animated.View
          pointerEvents="none"
          style={[styles.mascot, mascotStyle]}
        >
          <HaneulmonMascot size={92} mood={moodFor(score)} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 14, marginTop: 18 },
  sheet: { borderRadius: 14 },
  grid: { width: "100%" },
  row: { flexDirection: "row", alignItems: "center" },
  rowLabel: {
    fontSize: 9,
    fontWeight: "900",
    textAlign: "left",
    fontVariant: ["tabular-nums"],
  },
  scan: { position: "absolute", top: -2, right: -4, borderRadius: 999 },
  scoreRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    minHeight: 92,
  },
  scoreBlock: { alignSelf: "flex-start", marginTop: 6, marginLeft: 6 },
  scoreInner: { flexDirection: "row", alignItems: "baseline", gap: 7 },
  score: {
    fontSize: 64,
    lineHeight: 70,
    fontWeight: "900",
    letterSpacing: -3,
    fontVariant: ["tabular-nums"],
  },
  scoreUnit: { fontSize: 13, fontWeight: "800" },
  circle: { position: "absolute" },
  shardOrigin: {
    position: "absolute",
    left: "40%",
    top: "50%",
    width: 0,
    height: 0,
  },
  shard: { position: "absolute" },
  mascot: { marginRight: -6, marginBottom: -8 },
});
