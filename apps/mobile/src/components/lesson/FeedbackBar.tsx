import { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeOutDown,
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  type SharedValue,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import { AnswerState } from "@/types/lesson";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const { width: SCREEN_W } = Dimensions.get("window");

const HILL_H = 72; // 언덕 영역 높이
const SEGMENTS = 44; // 곡선 해상도

/** 언덕 하나: c=중심(0~1), w=폭, h=높이 비율 */
type Bump = { c: number; w: number; h: number };

/**
 * 둥근 언덕 실루엣을 그린다.
 * p(0→1) 가 커질수록 언덕이 오른쪽으로 흘러가며 낮아져, 끝에는 평평해진다.
 */
function buildHillPath(
  p: number,
  width: number,
  bumps: Bump[],
  travel: number,
  amp: number,
) {
  "worklet";
  const step = width / SEGMENTS;
  const shift = p * travel;
  const fade = Math.max(0, 1 - p); // 지나가면서 잦아든다
  let d = "";

  for (let i = 0; i <= SEGMENTS; i++) {
    const x = i * step;
    const u = i / SEGMENTS;

    let rise = 0;
    for (let b = 0; b < bumps.length; b++) {
      const bump = bumps[b];
      const dx = (u - (bump.c + shift)) / bump.w;
      rise += bump.h * Math.exp(-dx * dx);
    }

    const y = HILL_H - rise * amp * fade;
    d += i === 0 ? `M 0 ${y}` : ` L ${x} ${y}`;
  }

  d += ` L ${width} ${HILL_H} L 0 ${HILL_H} Z`;
  return d;
}

/** 겹겹이 흐르는 언덕 한 겹 */
function HillLayer({
  progress,
  color,
  bumps,
  travel,
  amp,
}: {
  progress: SharedValue<number>;
  color: string;
  bumps: Bump[];
  travel: number;
  amp: number;
}) {
  const props = useAnimatedProps(() => ({
    d: buildHillPath(progress.value, SCREEN_W, bumps, travel, amp),
  }));
  return <AnimatedPath animatedProps={props} fill={color} />;
}

// 뒤 → 앞. 맨 앞이 본문과 같은 색이라 경계 없이 이어진다.
const LAYERS = [
  {
    bumps: [
      { c: -0.1, w: 0.3, h: 1 },
      { c: 0.42, w: 0.24, h: 0.78 },
      { c: 0.85, w: 0.32, h: 0.92 },
    ],
    travel: 1.5,
    amp: 58,
  },
  {
    bumps: [
      { c: 0.08, w: 0.26, h: 0.9 },
      { c: 0.6, w: 0.3, h: 1 },
    ],
    travel: 1.3,
    amp: 50,
  },
  {
    bumps: [
      { c: -0.05, w: 0.34, h: 0.95 },
      { c: 0.55, w: 0.26, h: 0.82 },
      { c: 1.0, w: 0.28, h: 0.9 },
    ],
    travel: 1.15,
    amp: 42,
  },
];

const HILL_COLORS = {
  correct: ["#A5E86B", "#C2F58F", "#D7FFB8"],
  wrong: ["#FFB3B5", "#FFC9CB", "#FFDFE0"],
};

/** 흩날리는 파편 하나 */
function Shard({
  progress,
  x,
  size,
  dx,
  dy,
  rot,
  delay,
  color,
}: {
  progress: SharedValue<number>;
  x: number;
  size: number;
  dx: number;
  dy: number;
  rot: number;
  delay: number;
  color: string;
}) {
  const style = useAnimatedStyle(() => {
    const p = Math.max(0, Math.min(1, (progress.value - delay) / (1 - delay)));
    return {
      opacity: p === 0 ? 0 : 1 - p,
      transform: [
        { translateX: dx * p },
        { translateY: dy * p },
        { rotate: `${rot * p}deg` },
        { scale: 0.6 + p * 0.5 },
      ],
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: "absolute",
          left: x,
          top: HILL_H * 0.5,
          width: size,
          height: size,
          borderRadius: 3,
          backgroundColor: color,
        },
        style,
      ]}
    />
  );
}

const SHARDS = [
  { x: 0.08, size: 14, dx: -26, dy: -46, rot: -140, delay: 0.02 },
  { x: 0.22, size: 9, dx: 14, dy: -62, rot: 120, delay: 0.1 },
  { x: 0.38, size: 17, dx: -10, dy: -38, rot: 90, delay: 0.0 },
  { x: 0.52, size: 8, dx: 22, dy: -58, rot: -100, delay: 0.14 },
  { x: 0.66, size: 13, dx: 8, dy: -44, rot: 150, delay: 0.06 },
  { x: 0.8, size: 10, dx: 28, dy: -54, rot: -80, delay: 0.12 },
  { x: 0.92, size: 15, dx: 18, dy: -40, rot: 110, delay: 0.04 },
];

interface Props {
  state: AnswerState;
  /** 정답(한국어) — 틀렸을 때 표시 */
  answer?: string;
  /** 정답의 뜻 (유저 언어) */
  answerTranslation?: string;
  /** 문법·의미 설명 (유저 언어) */
  explanation?: string;
  onNext: () => void;
  theme: ThemeColors;
  combo?: number;
}

export default function FeedbackBar({
  state,
  answer,
  answerTranslation,
  explanation,
  onNext,
}: Props) {
  const { t } = useTranslation();
  const progress = useSharedValue(0);

  // 피드백이 뜰 때마다 언덕이 한 번 훑고 지나간다
  useEffect(() => {
    if (state === "idle") {
      progress.value = 0;
      return;
    }
    progress.value = 0;
    progress.value = withDelay(
      60,
      withTiming(1, { duration: 2250, easing: Easing.out(Easing.cubic) }),
    );
  }, [state, progress]);

  if (state === "idle") return null;

  const isCorrect = state === "correct";
  const bg = isCorrect ? "#D7FFB8" : "#FFDFE0";
  const accent = isCorrect ? "#58A700" : "#EA2B2B";
  const btnFace = isCorrect ? "#58CC02" : "#FF4B4B";
  const btnDepth = isCorrect ? "#46A302" : "#D33B3B";
  const shardColor = isCorrect ? "#9BF0F5" : "#FFB0B0";
  const colors = isCorrect ? HILL_COLORS.correct : HILL_COLORS.wrong;
  const label = isCorrect ? t("lesson.correct") : t("lesson.wrong");

  // 뜻은 answerTranslation 우선, 없으면 explanation 으로 대체
  const meaning = answerTranslation || explanation || "";

  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      exiting={FadeOutDown.duration(180)}
      style={s.container}
    >
      {/* 언덕 + 파편 */}
      <View style={s.hillWrap}>
        <Svg width={SCREEN_W} height={HILL_H}>
          {colors.map((color, i) => (
            <HillLayer
              key={color}
              progress={progress}
              color={color}
              bumps={LAYERS[i].bumps}
              travel={LAYERS[i].travel}
              amp={LAYERS[i].amp}
            />
          ))}
        </Svg>

        {SHARDS.map((sh, i) => (
          <Shard
            key={i}
            progress={progress}
            x={sh.x * SCREEN_W}
            size={sh.size}
            dx={sh.dx}
            dy={sh.dy}
            rot={sh.rot}
            delay={sh.delay}
            color={shardColor}
          />
        ))}
      </View>

      <View style={[s.body, { backgroundColor: bg }]}>
        {/* 체크 + 제목 + 우측 아이콘 */}
        <View style={s.headRow}>
          <View style={[s.badge, { backgroundColor: accent }]}>
            <Ionicons
              name={isCorrect ? "checkmark" : "close"}
              size={26}
              color="#fff"
            />
          </View>

          <Text style={[s.title, { color: accent }]} numberOfLines={2}>
            {label}
            {!!meaning && ` ${t("lesson.meaningShort")}`}
          </Text>

          <View style={s.headIcons}>
            <TouchableOpacity hitSlop={8}>
              <Ionicons name="share-outline" size={26} color={accent} />
            </TouchableOpacity>
            <TouchableOpacity hitSlop={8}>
              <Ionicons name="flag-outline" size={26} color={accent} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 틀렸을 때만 정답 노출 */}
        {!isCorrect && !!answer && (
          <Text style={[s.answer, { color: accent }]} numberOfLines={2}>
            {answer}
          </Text>
        )}

        {/* 뜻 — 학습자가 의미를 모르면 학습이 안 되므로 함께 보여준다 */}
        {!!meaning && (
          <Text style={[s.meaning, { color: accent }]}>{meaning}</Text>
        )}

        <TouchableOpacity style={s.btn} onPress={onNext} activeOpacity={0.9}>
          <View style={[s.btnDepth, { backgroundColor: btnDepth }]} />
          <View style={[s.btnFace, { backgroundColor: btnFace }]}>
            <Text style={s.btnText}>{t("lesson.next")}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  hillWrap: {
    height: HILL_H,
    marginBottom: -1, // 언덕과 본문 사이 1px 틈 방지
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 30,
  },
  headRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  badge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  headIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  answer: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.3,
    marginTop: 10,
  },
  meaning: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 28,
    letterSpacing: -0.3,
    marginTop: 10,
  },
  btn: { height: 60, marginTop: 26 },
  btnDepth: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 5,
    height: 55,
    borderRadius: 16,
  },
  btnFace: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 55,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { color: "#fff", fontSize: 18, fontWeight: "900" },
});
