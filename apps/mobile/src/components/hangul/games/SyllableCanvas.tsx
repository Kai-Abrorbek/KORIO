import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Polyline, Path, G } from "react-native-svg";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { StrokePoint } from "@/types/hangul";
import { StrokeScore } from "@/utils/stroke-matching";
import { PlacedStroke, SYLLABLE_VIEWBOX } from "@/utils/syllable-strokes";
import { GuideMode } from "@/constants/syllable-levels";

const { width: SCREEN_W } = Dimensions.get("window");
const CANVAS_SIZE = Math.min(SCREEN_W - 44, 320);
const VIEWBOX = SYLLABLE_VIEWBOX;

const SCORE_COLORS: Record<StrokeScore, string> = {
  perfect: "#FFD000",
  good: "#58CC02",
  okay: "#1FA9F7",
  fail: "#FF4B4B",
};

interface Props {
  strokes: PlacedStroke[];
  currentStrokeIdx: number;
  completedScores: (StrokeScore | null)[];
  /** 유저가 실제로 그은 선. 채점 뒤 target 위에 얇게 겹쳐서 어디가 어긋났는지 보여준다. */
  userStrokes: (StrokePoint[] | null)[];
  guide: GuideMode;
  onStrokeFinished: (points: StrokePoint[]) => void;
  disabled?: boolean;
}

function toPath(pts: StrokePoint[]): string {
  return pts
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");
}

export default function SyllableCanvas({
  strokes,
  currentStrokeIdx,
  completedScores,
  userStrokes,
  guide,
  onStrokeFinished,
  disabled,
}: Props) {
  const [userPath, setUserPath] = useState("");
  const points = useRef<StrokePoint[]>([]);
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.28, { duration: 780, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 780, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, []);

  const toSvg = (x: number, y: number) => {
    const s = VIEWBOX / CANVAS_SIZE;
    return { x: x * s, y: y * s };
  };

  const begin = (x: number, y: number) => {
    const p = toSvg(x, y);
    points.current = [p];
    setUserPath(`M ${p.x} ${p.y}`);
  };

  const move = (x: number, y: number) => {
    const p = toSvg(x, y);
    points.current.push(p);
    setUserPath((prev) => `${prev} L ${p.x} ${p.y}`);
  };

  const end = () => {
    const final = points.current;
    setUserPath("");
    points.current = [];
    onStrokeFinished(final);
  };

  const pan = Gesture.Pan()
    .enabled(!disabled)
    .minDistance(0)
    .onBegin((e) => runOnJS(begin)(e.x, e.y))
    .onUpdate((e) => runOnJS(move)(e.x, e.y))
    .onEnd(() => runOnJS(end)());

  // 시작점 표시는 획을 하나씩 깔아주는 단계에서만 띄운다.
  // 실루엣·빈 칸 단계에서 시작점을 찍어주면 획순을 알 필요가 없어져서
  // 난이도를 올린 의미가 사라진다.
  const showStartDot = guide === "stroke";
  const startDot = strokes[currentStrokeIdx]?.points[0];

  const dotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: 0.55,
  }));

  return (
    <GestureDetector gesture={pan}>
      <View style={styles.wrap}>
        <View
          style={[styles.canvas, { width: CANVAS_SIZE, height: CANVAS_SIZE }]}
        >
          <Svg
            viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            style={StyleSheet.absoluteFill}
          >
            {/* 원고지 격자 — 글자 중심을 잡는 기준선 */}
            <G opacity={0.07}>
              <Path d={`M 150 8 L 150 292`} stroke="#000" strokeWidth={1} />
              <Path d={`M 8 150 L 292 150`} stroke="#000" strokeWidth={1} />
            </G>

            {strokes.map((stroke, i) => {
              const done = completedScores[i];
              const isCurrent = i === currentStrokeIdx;

              // 아직 안 그린 획을 얼마나 보여줄지가 곧 난이도다
              let color = "#D8D8E0";
              let opacity = 0;
              let width = 16;

              if (done) {
                color = SCORE_COLORS[done];
                opacity = 1;
                width = 17;
              } else if (guide === "stroke") {
                color = isCurrent ? "#776ee2" : "#D8D8E0";
                opacity = isCurrent ? 0.34 : 0.5;
                width = isCurrent ? 22 : 16;
              } else if (guide === "silhouette") {
                color = "#8E8AA8";
                opacity = 0.14;
                width = 15;
              }

              if (opacity === 0) return null;

              return (
                <Polyline
                  key={`t${i}`}
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

            {/* 채점이 끝난 내 선 — 정답 획 위에 얇게 겹쳐서 어긋난 만큼이 보이게 */}
            {userStrokes.map((pts, i) =>
              pts && pts.length > 1 ? (
                <Path
                  key={`u${i}`}
                  d={toPath(pts)}
                  stroke="#2B2A45"
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity={0.5}
                />
              ) : null,
            )}

            {/* 지금 긋고 있는 선 */}
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

          {showStartDot && startDot && (
            <Animated.View
              style={[
                styles.startDot,
                {
                  left: (startDot.x / VIEWBOX) * CANVAS_SIZE - 13,
                  top: (startDot.y / VIEWBOX) * CANVAS_SIZE - 13,
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

export const SYLLABLE_CANVAS_SIZE = CANVAS_SIZE;

const styles = StyleSheet.create({
  wrap: { alignItems: "center", justifyContent: "center" },
  canvas: {
    backgroundColor: "#F8F7FF",
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#E8E5FF",
    borderBottomWidth: 5,
    borderBottomColor: "#DED9FA",
    overflow: "hidden",
  },
  startDot: {
    position: "absolute",
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#776ee2",
    borderWidth: 3,
    borderColor: "#fff",
  },
});
