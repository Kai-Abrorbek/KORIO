import { useEffect, useMemo } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const COLORS = [
  "#FFCC00", // yellow
  "#58CC02", // green
  "#1FA9F7", // blue
  "#FF7AAD", // pink
  "#FF9F66", // orange
  "#776ee2", // purple
  "#A78BFA", // light purple
];

const PIECE_COUNT = 35;

interface Piece {
  id: number;
  startX: number;
  color: string;
  size: number;
  shape: "square" | "rect" | "circle";
  delay: number;
  duration: number;
  rotationDir: 1 | -1;
  swayAmount: number;
}

function generatePieces(): Piece[] {
  return Array.from({ length: PIECE_COUNT }).map((_, i) => ({
    id: i,
    startX: Math.random() * SCREEN_WIDTH,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 7 + Math.random() * 9,
    shape:
      Math.random() < 0.4 ? "rect" : Math.random() < 0.7 ? "square" : "circle",
    delay: Math.random() * 800,
    duration: 2800 + Math.random() * 1800,
    rotationDir: Math.random() > 0.5 ? 1 : -1,
    swayAmount: 20 + Math.random() * 30,
  }));
}

function ConfettiPiece({ piece }: { piece: Piece }) {
  const y = useSharedValue(-60);
  const sway = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    y.value = withDelay(
      piece.delay,
      withTiming(SCREEN_HEIGHT + 60, {
        duration: piece.duration,
        easing: Easing.in(Easing.cubic),
      }),
    );
    sway.value = withDelay(
      piece.delay,
      withRepeat(withTiming(piece.swayAmount, { duration: 900 }), -1, true),
    );
    rotate.value = withDelay(
      piece.delay,
      withRepeat(
        withTiming(360 * piece.rotationDir, {
          duration: 1500,
          easing: Easing.linear,
        }),
        -1,
        false,
      ),
    );
  }, [piece, y, sway, rotate]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: y.value },
      { translateX: sway.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  const shapeStyle = {
    width: piece.shape === "rect" ? piece.size * 0.6 : piece.size,
    height: piece.shape === "rect" ? piece.size * 1.6 : piece.size,
    borderRadius: piece.shape === "circle" ? piece.size / 2 : 2,
    backgroundColor: piece.color,
  };

  return (
    <Animated.View
      style={[styles.piece, { left: piece.startX }, shapeStyle, animStyle]}
    />
  );
}

export default function Confetti() {
  const pieces = useMemo(() => generatePieces(), []);

  return (
    <View style={styles.container} pointerEvents="none">
      {pieces.map((piece) => (
        <ConfettiPiece key={piece.id} piece={piece} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    overflow: "hidden",
  },
  piece: {
    position: "absolute",
    top: 0,
  },
});
