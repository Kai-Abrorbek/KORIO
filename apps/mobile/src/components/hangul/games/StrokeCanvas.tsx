import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Polyline, Path, Circle, G } from "react-native-svg";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { StrokeDef, StrokePoint } from "@/types/hangul";

const { width: SCREEN_W } = Dimensions.get("window");
const CANVAS_SIZE = Math.min(SCREEN_W - 40, 340);
const VIEWBOX = 300;

interface Props {
  strokes: StrokeDef[];
  currentStrokeIdx: number;
  completedScores: ("perfect" | "good" | "okay" | "fail" | null)[];
  onStrokeFinished: (points: StrokePoint[]) => void;
  disabled?: boolean;
}

const SCORE_COLORS: Record<string, string> = {
  perfect: "#FFD000",
  good: "#58CC02",
  okay: "#1FA9F7",
  fail: "#FF4B4B",
};

function pointsToPath(pts: StrokePoint[]): string {
  if (pts.length === 0) return "";
  return pts
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");
}

export default function StrokeCanvas({
  strokes,
  currentStrokeIdx,
  completedScores,
  onStrokeFinished,
  disabled,
}: Props) {
  const [userPath, setUserPath] = useState("");
  const userPoints = useRef<StrokePoint[]>([]);
  const pulse = useSharedValue(1);

  // 현재 획에서 시작 표시 깜빡임
  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, []);

  // canvas 좌표 → svg viewBox 좌표 변환
  const toSvg = (x: number, y: number) => {
    const s = VIEWBOX / CANVAS_SIZE;
    return { x: x * s, y: y * s };
  };

  const handleBegin = (x: number, y: number) => {
    const p = toSvg(x, y);
    userPoints.current = [p];
    setUserPath(`M ${p.x} ${p.y}`);
  };

  const handleUpdate = (x: number, y: number) => {
    const p = toSvg(x, y);
    userPoints.current.push(p);
    setUserPath((prev) => `${prev} L ${p.x} ${p.y}`);
  };

  const handleEnd = () => {
    const final = userPoints.current;
    setUserPath("");
    userPoints.current = [];
    onStrokeFinished(final);
  };

  const pan = Gesture.Pan()
    .enabled(!disabled)
    .minDistance(0)
    .onBegin((e) => runOnJS(handleBegin)(e.x, e.y))
    .onUpdate((e) => runOnJS(handleUpdate)(e.x, e.y))
    .onEnd(() => runOnJS(handleEnd)());

  const currentStroke = strokes[currentStrokeIdx];
  const startDot = currentStroke?.points[0] ?? { x: 0, y: 0 };

  const dotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: 0.6,
  }));

  return (
    <GestureDetector gesture={pan}>
      <View style={styles.wrap}>
        <View
          style={[styles.canvas, { width: CANVAS_SIZE, height: CANVAS_SIZE }]}
        >
          {/* 그리드 (희미하게) */}
          <Svg
            viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            style={StyleSheet.absoluteFill}
          >
            <G opacity={0.06}>
              <Path
                d={`M 150 0 L 150 ${VIEWBOX}`}
                stroke="#000"
                strokeWidth={1}
              />
              <Path
                d={`M 0 150 L ${VIEWBOX} 150`}
                stroke="#000"
                strokeWidth={1}
              />
            </G>

            {/* 모든 target 획 (옅게) */}
            {strokes.map((stroke, i) => {
              const isCurrent = i === currentStrokeIdx;
              const done = completedScores[i];
              const color = done
                ? SCORE_COLORS[done]
                : isCurrent
                  ? "#776ee2"
                  : "#D8D8E0";
              const opacity = done ? 1 : isCurrent ? 0.35 : 0.5;
              const width = isCurrent ? 22 : 16;
              return (
                <Polyline
                  key={i}
                  points={stroke.points.map((p) => `${p.x},${p.y}`).join(" ")}
                  stroke={color}
                  strokeWidth={width}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity={opacity}
                />
              );
            })}

            {/* 사용자 현재 trace */}
            {userPath !== "" && (
              <Path
                d={userPath}
                stroke="#776ee2"
                strokeWidth={18}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity={0.9}
              />
            )}
          </Svg>

          {/* 시작 점 펄스 (현재 획) */}
          {currentStroke && (
            <Animated.View
              style={[
                styles.startDot,
                {
                  left: (startDot.x / VIEWBOX) * CANVAS_SIZE - 14,
                  top: (startDot.y / VIEWBOX) * CANVAS_SIZE - 14,
                },
                dotStyle,
              ]}
            />
          )}
        </View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    backgroundColor: "#F8F7FF",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#E8E5FF",
    overflow: "hidden",
  },
  startDot: {
    position: "absolute",
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#776ee2",
    borderWidth: 3,
    borderColor: "#fff",
  },
});
