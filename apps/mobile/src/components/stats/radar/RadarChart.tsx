import { memo, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient,
  Polygon,
  Stop,
} from "react-native-svg";
import Animated, {
  type SharedValue,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { ThemeColors } from "@/constants/theme";
import type { SkillScore } from "@/types/stats";

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/** 격자 링 (0.25 / 0.5 / 0.75 / 1.0) */
const RINGS = [0.25, 0.5, 0.75, 1];

interface Props {
  skills: SkillScore[];
  labels: string[];
  /** 가장 약한 축 — 빨간 점으로 짚어준다 */
  weakest?: string | null;
  size: number;
  theme: ThemeColors;
}

/**
 * 스킬 레이더.
 *
 * 막대 6개로도 같은 정보를 보여줄 수 있지만, 막대는 "순위"만 읽히고
 * 레이더는 **모양**이 읽힌다. 한쪽이 움푹 파인 육각형은 설명 없이도
 * "여기가 비었네" 로 보인다. 그게 이 화면이 하려는 말이다.
 *
 * 애니메이션은 중심에서 한 번 펴지는 것 하나만. 계속 움직이면
 * 숫자를 읽는 걸 방해한다.
 */
function RadarChart({ skills, labels, weakest, size, theme }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  // 라벨이 밖에 붙으므로 반지름은 여유를 두고 잡는다
  const r = size / 2 - 34;

  const grow = useSharedValue(0);
  useEffect(() => {
    grow.value = 0;
    grow.value = withDelay(
      120,
      withTiming(1, { duration: 900, easing: Easing.out(Easing.cubic) }),
    );
  }, [skills.map((s) => s.score).join(",")]);

  const n = skills.length;
  // 12시 방향부터 시계방향
  const angleAt = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pointAt = (i: number, ratio: number) => {
    const a = angleAt(i);
    return { x: cx + Math.cos(a) * r * ratio, y: cy + Math.sin(a) * r * ratio };
  };

  const polygonFor = (ratio: number) =>
    skills
      .map((_, i) => {
        const p = pointAt(i, ratio);
        return `${p.x},${p.y}`;
      })
      .join(" ");

  // 값 다각형은 grow 에 따라 중심에서 펴진다
  const valueProps = useAnimatedProps(() => ({
    points: skills
      .map((s, i) => {
        const a = (Math.PI * 2 * i) / n - Math.PI / 2;
        const ratio = (s.score / 100) * grow.value;
        return `${cx + Math.cos(a) * r * ratio},${cy + Math.sin(a) * r * ratio}`;
      })
      .join(" "),
  }));

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#8E85F0" stopOpacity="0.55" />
            <Stop offset="1" stopColor="#5F4FD8" stopOpacity="0.30" />
          </LinearGradient>
        </Defs>

        {/* 격자 */}
        <G>
          {RINGS.map((ring) => (
            <Polygon
              key={ring}
              points={polygonFor(ring)}
              fill="none"
              stroke={theme.border}
              strokeWidth={1}
            />
          ))}
          {skills.map((_, i) => {
            const p = pointAt(i, 1);
            return (
              <Line
                key={i}
                x1={cx}
                y1={cy}
                x2={p.x}
                y2={p.y}
                stroke={theme.border}
                strokeWidth={1}
              />
            );
          })}
        </G>

        {/* 값 */}
        <AnimatedPolygon
          animatedProps={valueProps}
          fill="url(#radarFill)"
          stroke="#776ee2"
          strokeWidth={2.5}
          strokeLinejoin="round"
        />

        {/* 꼭짓점 */}
        {skills.map((s, i) => (
          <VertexDot
            key={s.category}
            angle={angleAt(i)}
            score={s.score}
            cx={cx}
            cy={cy}
            r={r}
            grow={grow}
            weak={weakest === s.category}
            ringColor={theme.surface}
          />
        ))}
      </Svg>

      {/* 축 라벨 — SVG Text 는 폰트가 기기마다 달라서 RN Text 로 얹는다 */}
      {skills.map((s, i) => {
        const p = pointAt(i, 1.19);
        const isWeak = weakest === s.category;
        return (
          <View
            key={s.category}
            style={[styles.label, { left: p.x - 40, top: p.y - 11 }]}
            pointerEvents="none"
          >
            <Text
              numberOfLines={1}
              style={[
                styles.labelText,
                { color: isWeak ? "#FF6B6B" : theme.textSecondary },
                isWeak && { fontWeight: "800" },
              ]}
            >
              {labels[i]}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

/**
 * 꼭짓점 하나.
 *
 * 컴포넌트로 뺀 이유는 스타일이 아니라 규칙이다 — useAnimatedProps 를
 * map 안에서 부르면 축 개수가 바뀌는 순간(로딩 0개 → 6개) 훅 순서가
 * 깨진다.
 */
function VertexDot({
  angle,
  score,
  cx,
  cy,
  r,
  grow,
  weak,
  ringColor,
}: {
  angle: number;
  score: number;
  cx: number;
  cy: number;
  r: number;
  grow: SharedValue<number>;
  weak: boolean;
  ringColor: string;
}) {
  const props = useAnimatedProps(() => {
    const ratio = (score / 100) * grow.value;
    return {
      cx: cx + Math.cos(angle) * r * ratio,
      cy: cy + Math.sin(angle) * r * ratio,
    };
  });
  return (
    <AnimatedCircle
      animatedProps={props}
      r={weak ? 5.5 : 4}
      fill={weak ? "#FF6B6B" : "#776ee2"}
      stroke={ringColor}
      strokeWidth={2}
    />
  );
}

export default memo(RadarChart);

const styles = StyleSheet.create({
  label: { position: "absolute", width: 80, alignItems: "center" },
  labelText: { fontSize: 11, fontWeight: "700" },
});
