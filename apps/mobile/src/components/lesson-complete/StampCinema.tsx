import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";
import Svg, { Circle, Line } from "react-native-svg";
import { WearShapes } from "@/components/avatar/AvatarPreview";
import HaneulmonMascot, { type HaneulmonMood } from "@/components/home/HaneulmonMascot";
import { cinemaAt, starPath } from "@/components/cinema/cinema";
import {
  BURST_STARS,
  IMPRINT_BOX,
  IMPRINT_STARS,
  INK_DROPS,
  INK_GAPS,
  RAY_SHAPES,
  STAMP_BOX,
  STAMP_SHAPES,
  STAMP_TRACK,
  STAMP_WORDS,
  burstStarAt,
  dropAt,
  imprintShapes,
  type StampTier,
} from "./lessonStampCinematic";

/**
 * "참 잘했어요 도장" 무대 — 정사각형 공책(size) 위에 도장이 찍힌다.
 * 시계(clock, ms)는 화면이 돌린다. 그림·시간표는 lessonStampCinematic.
 */

interface Props {
  clock: SharedValue<number>;
  tier: StampTier;
  size: number;
  /** 잉크 색 (어두운 테마는 밝은 보라) */
  ink: string;
  /** 공책 바탕 · 원고지 선 */
  paper: string;
  grid: string;
  border: string;
}

const MOOD: Record<StampTier, HaneulmonMood> = {
  perfect: "celebrating",
  great: "great",
  good: "cheering",
};

/** 자국 = 공책의 이만큼 */
const IMPRINT = 0.86;
/** 눌렸을 때 도장 고무 바닥 = 공책 가운데에서 이만큼 아래 (도장 몸통이 자국 자리를 덮는다) */
const PRESS_Y = 0.3;

function StampCinema({ clock, tier, size: S, ink, paper, grid, border }: Props) {
  const D = S * IMPRINT;
  const stampScale = (D * (192 / IMPRINT_BOX.size)) / STAMP_BOX.faceWidth;
  const stampW = STAMP_BOX.width * stampScale;
  const stampH = STAMP_BOX.height * stampScale;
  const stampRestTop = S / 2 + PRESS_Y * S - STAMP_BOX.faceY * stampScale;
  const word = STAMP_WORDS[tier];
  const chars = word.length;
  const wordSize = D * Math.min(0.16, 0.68 / chars);
  const perfect = tier === "perfect";

  const paperStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cinemaAt(STAMP_TRACK.paperScale, clock.value) }],
  }));
  const raysStyle = useAnimatedStyle(() => ({
    opacity: cinemaAt(STAMP_TRACK.rays, clock.value),
    transform: [
      { scale: 0.6 + 0.6 * cinemaAt(STAMP_TRACK.rays, clock.value) },
      { rotate: `${clock.value / 40}deg` },
    ],
  }));
  const ringStyle = useAnimatedStyle(() => {
    const r = cinemaAt(STAMP_TRACK.ring, clock.value);
    return { opacity: r <= 0 || r >= 1 ? 0 : 0.7 * (1 - r), transform: [{ scale: 0.7 + 0.9 * r }] };
  });
  const imprintStyle = useAnimatedStyle(() => ({
    opacity: cinemaAt(STAMP_TRACK.imprint, clock.value) * 0.94,
    transform: [{ scale: cinemaAt(STAMP_TRACK.imprintScale, clock.value) }],
  }));
  const wetStyle = useAnimatedStyle(() => ({ opacity: cinemaAt(STAMP_TRACK.wet, clock.value) }));
  const stampStyle = useAnimatedStyle(() => {
    const t = clock.value;
    const y = cinemaAt(STAMP_TRACK.stampY, t);
    return {
      opacity: y < -2.3 ? 0 : 1,
      transform: [
        { translateY: y * S },
        { rotate: `${cinemaAt(STAMP_TRACK.stampRotate, t)}deg` },
        { scaleY: cinemaAt(STAMP_TRACK.stampSquash, t) },
        { scaleX: 2 - cinemaAt(STAMP_TRACK.stampSquash, t) },
      ],
    };
  });
  const mascotStyle = useAnimatedStyle(() => {
    const m = cinemaAt(STAMP_TRACK.mascot, clock.value);
    return { opacity: m <= 0 ? 0 : 1, transform: [{ translateY: (1 - m) * S * 0.18 }, { scale: Math.max(0.001, m) }] };
  });

  return (
    <View style={{ width: S, height: S }}>
      {/* 공책 — 원고지 칸 */}
      <Animated.View
        style={[styles.paper, { width: S, height: S, backgroundColor: paper, borderColor: border }, paperStyle]}
      >
        <Svg width={S} height={S}>
          {Array.from({ length: 7 }, (_, i) => {
            const p = ((i + 1) / 8) * S;
            return (
              <Line key={`v${i}`} x1={p} y1={S * 0.06} x2={p} y2={S * 0.94} stroke={grid} strokeWidth={1} />
            );
          })}
          {Array.from({ length: 7 }, (_, i) => {
            const p = ((i + 1) / 8) * S;
            return (
              <Line key={`h${i}`} x1={S * 0.06} y1={p} x2={S * 0.94} y2={p} stroke={grid} strokeWidth={1} />
            );
          })}
        </Svg>
      </Animated.View>

      {/* 100% — 자국 뒤 금빛 햇살 */}
      {perfect ? (
        <Animated.View pointerEvents="none" style={[styles.center, { width: S, height: S }, raysStyle]}>
          <Svg width={S * 1.3} height={S * 1.3} viewBox="0 0 200 200">
            <WearShapes shapes={RAY_SHAPES} />
          </Svg>
        </Animated.View>
      ) : null}

      {/* 충격파 고리 */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.ring,
          { left: S / 2 - D / 2, top: S / 2 - D / 2, width: D, height: D, borderRadius: D / 2, borderColor: ink },
          ringStyle,
        ]}
      />

      {/* 튄 잉크 방울 — 공책에 남는다 */}
      {INK_DROPS.map((drop, i) => (
        <InkDrop key={i} drop={drop} clock={clock} S={S} ink={ink} />
      ))}

      {/* 도장 자국 */}
      <Animated.View
        pointerEvents="none"
        style={[styles.abs, { left: S / 2 - D / 2, top: S / 2 - D / 2, width: D, height: D }, imprintStyle]}
      >
        <Svg width={D} height={D} viewBox={`0 0 ${IMPRINT_BOX.size} ${IMPRINT_BOX.size}`}>
          <WearShapes shapes={imprintShapes(ink)} />
          {perfect ? <WearShapes shapes={IMPRINT_STARS} /> : null}
        </Svg>
        <Text
          numberOfLines={1}
          style={[
            styles.word,
            { color: ink, fontSize: wordSize, lineHeight: wordSize * 1.2, top: D * 0.64 - wordSize * 0.6 },
          ]}
        >
          {word}
        </Text>
        {/* 잉크가 덜 묻은 자리 */}
        <Svg style={StyleSheet.absoluteFill} viewBox={`0 0 ${IMPRINT_BOX.size} ${IMPRINT_BOX.size}`}>
          {INK_GAPS.map((gap, i) => (
            <Circle key={i} cx={gap.cx} cy={gap.cy} r={gap.r} fill={paper} opacity={gap.o} />
          ))}
        </Svg>
        {/* 막 찍힌 잉크의 젖은 광택 */}
        <Animated.View style={[styles.wet, { width: D * 0.5, height: D * 0.08, left: D * 0.16, top: D * 0.22 }, wetStyle]} />
      </Animated.View>

      {/* 100% — 금빛 별이 튀어나간다 */}
      {perfect
        ? BURST_STARS.map((star, i) => <BurstStar key={i} star={star} clock={clock} S={S} />)
        : null}

      {/* 하늘몬 — 공책 오른쪽 아래에서 튀어나온다 */}
      <Animated.View
        pointerEvents="none"
        style={[styles.abs, { left: S * 0.66, top: S * 0.6, width: S * 0.46, height: S * 0.46, transformOrigin: "50% 100%" }, mascotStyle]}
      >
        <HaneulmonMascot size={S * 0.46} mood={MOOD[tier]} />
      </Animated.View>

      {/* 도장 — 위에서 내려와 쾅 */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.abs,
          { left: S / 2 - stampW / 2, top: stampRestTop, width: stampW, height: stampH, transformOrigin: "50% 98%" },
          stampStyle,
        ]}
      >
        <Svg width={stampW} height={stampH} viewBox={`0 0 ${STAMP_BOX.width} ${STAMP_BOX.height}`}>
          <WearShapes shapes={STAMP_SHAPES} />
        </Svg>
      </Animated.View>
    </View>
  );
}

function InkDrop({
  drop,
  clock,
  S,
  ink,
}: {
  drop: (typeof INK_DROPS)[number];
  clock: SharedValue<number>;
  S: number;
  ink: string;
}) {
  const box = drop.size * S;
  const style = useAnimatedStyle(() => {
    const d = dropAt(drop, clock.value);
    return {
      opacity: d.opacity * 0.85,
      transform: [
        { translateX: S / 2 + Math.cos(drop.angle) * d.r * S - box / 2 },
        { translateY: S / 2 + Math.sin(drop.angle) * d.r * S - box / 2 },
        { scale: d.scale },
      ],
    };
  });
  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.drop, { width: box, height: box, borderRadius: box / 2, backgroundColor: ink }, style]}
    />
  );
}

const STAR = starPath(50, 50, 48, 20);

function BurstStar({
  star,
  clock,
  S,
}: {
  star: (typeof BURST_STARS)[number];
  clock: SharedValue<number>;
  S: number;
}) {
  const box = star.size * S;
  const style = useAnimatedStyle(() => {
    const p = burstStarAt(star, clock.value);
    return {
      opacity: p.opacity,
      transform: [
        { translateX: S / 2 + Math.cos(star.angle) * p.r * S - box / 2 },
        { translateY: S / 2 + Math.sin(star.angle) * p.r * S - box / 2 },
        { rotate: `${p.rotate}deg` },
        { scale: p.scale },
      ],
    };
  });
  return (
    <Animated.View pointerEvents="none" style={[styles.drop, { width: box, height: box }, style]}>
      <Svg width={box} height={box} viewBox="0 0 100 100">
        <WearShapes shapes={[{ k: "path", d: STAR, f: "#FFD45C", s: "#E2A83A", w: 4 }]} />
      </Svg>
    </Animated.View>
  );
}

export default memo(StampCinema);

const styles = StyleSheet.create({
  abs: { position: "absolute" },
  center: { position: "absolute", left: 0, top: 0, alignItems: "center", justifyContent: "center" },
  paper: {
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  ring: { position: "absolute", borderWidth: 3 },
  drop: { position: "absolute", left: 0, top: 0 },
  word: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  wet: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "-24deg" }],
  },
});
