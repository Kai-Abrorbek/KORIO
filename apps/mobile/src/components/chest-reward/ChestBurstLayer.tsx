import { memo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, type SharedValue } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, Polygon } from "react-native-svg";
import { cinemaAt } from "@/components/cinema/cinema";
import {
  CHEST_TRACK,
  GRADE_LIGHT,
  gemAt,
  type ChestGrade,
  type FlyingGem,
} from "./chestCinematic";

/**
 * 상자가 열린 뒤 화면 전체 위에 겹치는 층 — 등급 색 번쩍, 빛기둥, 카운터로 날아가는 보석.
 * 좌표(from·to)는 이 층(화면 컨테이너) 기준 px. 시계는 화면이 돌린다 (chestCinematic).
 */

interface Props {
  clock: SharedValue<number>;
  grade: ChestGrade;
  gems: FlyingGem[];
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

const PILLAR_W = 130;

function ChestBurstLayer({ clock, grade, gems, fromX, fromY, toX, toY }: Props) {
  const light = GRADE_LIGHT[grade];

  const flashStyle = useAnimatedStyle(() => ({
    opacity: cinemaAt(CHEST_TRACK.flash, clock.value) * light.flashOpacity,
  }));
  const pillarStyle = useAnimatedStyle(() => {
    const p = cinemaAt(CHEST_TRACK.pillar, clock.value);
    // 솟을 때 가늘게 시작해 넓어진다
    return { opacity: p, transform: [{ scaleX: 0.35 + 0.65 * Math.min(1, p * 1.4) }] };
  });

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: light.flash }, flashStyle]} />
      <Animated.View
        style={[
          styles.pillar,
          { left: fromX - PILLAR_W / 2, top: 0, height: Math.max(0, fromY - 10), width: PILLAR_W },
          pillarStyle,
        ]}
      >
        <LinearGradient
          colors={["rgba(255,255,255,0)", `${light.pillar}88`, `${light.pillar}DD`, `${light.pillar}F2`]}
          locations={[0, 0.45, 0.85, 1]}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.9)"]}
          style={styles.core}
        />
      </Animated.View>
      {gems.map((gem, i) => (
        <Gem key={i} gem={gem} clock={clock} fromX={fromX} fromY={fromY} toX={toX} toY={toY} />
      ))}
    </View>
  );
}

function Gem({
  gem,
  clock,
  fromX,
  fromY,
  toX,
  toY,
}: {
  gem: FlyingGem;
  clock: SharedValue<number>;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}) {
  const style = useAnimatedStyle(() => {
    const p = gemAt(gem, clock.value, fromX, fromY, toX, toY);
    return {
      opacity: p.opacity,
      transform: [
        { translateX: p.x - gem.size / 2 },
        { translateY: p.y - gem.size / 2 },
        { rotate: `${p.rotate}deg` },
        { scale: p.scale },
      ],
    };
  });
  return (
    <Animated.View style={[styles.gem, { width: gem.size, height: gem.size }, style]}>
      <Svg width={gem.size} height={gem.size} viewBox="0 0 100 100">
        <Polygon points="50,4 92,30 50,96 8,30" fill="#3BB6E5" />
        <Polygon points="50,4 92,30 50,40 8,30" fill="#A8E5F7" />
        <Polygon points="50,40 92,30 50,96" fill="#5CD0F0" />
        <Path d="M30 22 L42 14 L46 22 L34 28 Z" fill="#FFFFFF" opacity={0.85} />
      </Svg>
    </Animated.View>
  );
}

export default memo(ChestBurstLayer);

const styles = StyleSheet.create({
  pillar: { position: "absolute", overflow: "hidden", borderRadius: PILLAR_W / 2 },
  core: { position: "absolute", top: 0, bottom: 0, left: PILLAR_W * 0.36, right: PILLAR_W * 0.36 },
  gem: { position: "absolute", left: 0, top: 0 },
});
