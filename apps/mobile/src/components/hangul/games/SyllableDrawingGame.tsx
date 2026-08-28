import { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";
import * as Haptics from "@/utils/haptics";
import { StrokePoint } from "@/types/hangul";
import { scoreStroke, StrokeScore } from "@/utils/stroke-matching";
import {
  buildSyllable,
  SyllablePlan,
  SYLLABLE_VIEWBOX,
} from "@/utils/syllable-strokes";
import {
  SYLLABLE_LEVELS,
  SyllableLevel,
  STROKE_TOLERANCE_RATIO,
} from "@/constants/syllable-levels";
import {
  useSyllableDrawStore,
  isLevelUnlocked,
} from "@/store/syllable-draw.store";
import { useHangulReporter } from "@/hooks/useHangulReporter";
import { jamoToCharacterId } from "@/utils/hangul-jamo";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import SyllableCanvas from "./SyllableCanvas";

const SCORE_COLORS: Record<StrokeScore, string> = {
  perfect: "#FFD000",
  good: "#58CC02",
  okay: "#1FA9F7",
  fail: "#FF4B4B",
};

/** scoreStroke 가 주는 점수와 같은 표. 획을 다시 그릴 때 되돌리는 데 쓴다. */
const STROKE_POINTS: Record<StrokeScore, number> = {
  perfect: 100,
  good: 75,
  okay: 45,
  fail: 0,
};

const SCORE_KEYS: Record<StrokeScore, string> = {
  perfect: "syllableDraw.perfect",
  good: "syllableDraw.good",
  okay: "syllableDraw.okay",
  fail: "syllableDraw.tryAgain",
};

/** 레벨 카드 색 — 단계가 오를수록 뜨거워진다 */
const LEVEL_COLORS = [
  ["#7B72E8", "#5F55D6"],
  ["#4EA8F5", "#2E86DA"],
  ["#3FC28A", "#22A06B"],
  ["#F2A93B", "#DC8B1C"],
  ["#F0703F", "#D2521F"],
  ["#E14B7A", "#C22B5C"],
];

interface Props {
  onExit: () => void;
}

export default function SyllableDrawingGame({ onExit }: Props) {
  const [level, setLevel] = useState<SyllableLevel | null>(null);
  // 같은 레벨을 다시 하려면 상태를 통째로 비워야 한다 — key 를 바꿔 리마운트시킨다
  const [run, setRun] = useState(0);

  const pick = (l: SyllableLevel) => {
    setLevel(l);
    setRun((r) => r + 1);
  };

  if (!level) {
    return <LevelSelect onPick={pick} onExit={onExit} />;
  }
  return (
    <PlayLevel
      key={`${level.id}-${run}`}
      level={level}
      onBackToList={() => setLevel(null)}
      onRetry={() => setRun((r) => r + 1)}
      onNextLevel={pick}
      onExit={onExit}
    />
  );
}

/* ══════════════════ 레벨 고르기 ══════════════════ */

function LevelSelect({
  onPick,
  onExit,
}: {
  onPick: (l: SyllableLevel) => void;
  onExit: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const insets = useSafeAreaInsets();
  const stars = useSyllableDrawStore((st) => st.stars);

  return (
    <View style={[s.container, { paddingTop: insets.top + 6 }]}>
      <View style={s.selectHeader}>
        <TouchableOpacity onPress={onExit} hitSlop={12}>
          <Ionicons name="close" size={28} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[
          s.selectScroll,
          { paddingBottom: insets.bottom + 48 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={s.selectTitle}>{t("syllableDraw.title")}</Text>
        <Text style={s.selectSub}>{t("syllableDraw.subtitle")}</Text>

        {SYLLABLE_LEVELS.map((lv, i) => {
          const unlocked = isLevelUnlocked(lv.id, stars);
          const got = stars[lv.id] ?? 0;
          const [c1, c2] = LEVEL_COLORS[i % LEVEL_COLORS.length];

          return (
            <Animated.View
              key={lv.id}
              entering={FadeInDown.delay(i * 55).duration(300)}
            >
              <Pressable
                disabled={!unlocked}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(
                    () => {},
                  );
                  onPick(lv);
                }}
                style={({ pressed }) => [
                  s.levelWrap,
                  pressed && s.levelPressed,
                ]}
              >
                <View
                  style={[
                    s.levelDepth,
                    { backgroundColor: unlocked ? c2 : theme.border },
                  ]}
                />
                <View
                  style={[
                    s.levelCard,
                    { backgroundColor: unlocked ? c1 : theme.surface },
                    !unlocked && { borderWidth: 2, borderColor: theme.border },
                  ]}
                >
                  <View style={s.levelShine} pointerEvents="none" />

                  <View
                    style={[
                      s.levelBadge,
                      !unlocked && { backgroundColor: theme.border },
                    ]}
                  >
                    {unlocked ? (
                      <Text style={s.levelBadgeText}>{lv.id}</Text>
                    ) : (
                      <Ionicons
                        name="lock-closed"
                        size={17}
                        color={theme.textSecondary}
                      />
                    )}
                  </View>

                  <View style={s.levelTexts}>
                    <Text
                      style={[
                        s.levelTitle,
                        !unlocked && { color: theme.textSecondary },
                      ]}
                      numberOfLines={1}
                    >
                      {t(`syllableDraw.levels.${lv.key}.title`)}
                    </Text>
                    <Text
                      style={[
                        s.levelDesc,
                        !unlocked && { color: theme.textSecondary },
                      ]}
                      numberOfLines={2}
                    >
                      {unlocked
                        ? t(`syllableDraw.levels.${lv.key}.desc`)
                        : t("syllableDraw.locked")}
                    </Text>
                  </View>

                  {unlocked && (
                    <View style={s.starRow}>
                      {[1, 2, 3].map((n) => (
                        <Ionicons
                          key={n}
                          name={n <= got ? "star" : "star-outline"}
                          size={13}
                          color={n <= got ? "#FFD000" : "rgba(255,255,255,0.5)"}
                        />
                      ))}
                    </View>
                  )}
                </View>
              </Pressable>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
}

/* ══════════════════ 한 레벨 풀기 ══════════════════ */

function PlayLevel({
  level,
  onBackToList,
  onRetry,
  onNextLevel,
  onExit,
}: {
  level: SyllableLevel;
  onBackToList: () => void;
  onRetry: () => void;
  onNextLevel: (l: SyllableLevel) => void;
  onExit: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const insets = useSafeAreaInsets();

  // 획 데이터가 없는 음절이 섞여 있으면 그릴 게 없는 화면이 된다 — 미리 걸러낸다
  const plans = useMemo(
    () =>
      level.syllables
        .map(buildSyllable)
        .filter((p): p is SyllablePlan => p !== null),
    [level],
  );

  const [idx, setIdx] = useState(0);
  const [strokeIdx, setStrokeIdx] = useState(0);
  const [scores, setScores] = useState<(StrokeScore | null)[]>([]);
  const [userStrokes, setUserStrokes] = useState<(StrokePoint[] | null)[]>([]);
  const [feedback, setFeedback] = useState<StrokeScore | null>(null);
  const [earned, setEarned] = useState(0);
  const [done, setDone] = useState(false);

  const failedThisSyllable = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { record, flush } = useHangulReporter("syllable-drawing");
  const recordResult = useSyllableDrawStore((st) => st.recordResult);

  const plan = plans[idx];
  const totalStrokesInLevel = useMemo(
    () => plans.reduce((sum, p) => sum + p.strokes.length, 0),
    [plans],
  );

  useEffect(() => {
    if (!plan) return;
    setStrokeIdx(0);
    setScores(new Array(plan.strokes.length).fill(null));
    setUserStrokes(new Array(plan.strokes.length).fill(null));
    setFeedback(null);
    failedThisSyllable.current = false;
  }, [idx, plan]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  /* 진행 바 — 이 레벨에서 통과한 획 수 기준 */
  const progress = useSharedValue(0);
  const clearedBefore = useMemo(
    () => plans.slice(0, idx).reduce((sum, p) => sum + p.strokes.length, 0),
    [plans, idx],
  );
  useEffect(() => {
    const cleared = clearedBefore + scores.filter(Boolean).length;
    progress.value = withSpring(cleared / Math.max(1, totalStrokesInLevel), {
      damping: 15,
      stiffness: 110,
    });
  }, [scores, clearedBefore, totalStrokesInLevel]);
  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%` as any,
  }));

  /* 피드백 배지 */
  const fbOpacity = useSharedValue(0);
  const fbY = useSharedValue(10);
  useEffect(() => {
    if (feedback) {
      fbOpacity.value = withTiming(1, {
        duration: 160,
        easing: Easing.out(Easing.cubic),
      });
      fbY.value = withTiming(0, {
        duration: 200,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      fbOpacity.value = withTiming(0, { duration: 150 });
      fbY.value = 10;
    }
  }, [feedback]);
  const fbStyle = useAnimatedStyle(() => ({
    opacity: fbOpacity.value,
    transform: [{ translateY: fbY.value }],
  }));

  const goNextStroke = () => {
    if (!plan) return;
    if (strokeIdx + 1 < plan.strokes.length) {
      setStrokeIdx(strokeIdx + 1);
      return;
    }

    // 음절 하나 완성 — 획을 한 번도 안 틀렸을 때만 자모를 정답으로 올린다
    const ok = !failedThisSyllable.current;
    for (const jamo of plan.jamo) {
      const id = jamoToCharacterId(jamo);
      if (id) record(id, ok);
    }

    if (idx + 1 < plans.length) {
      setIdx(idx + 1);
    } else {
      setDone(true);
      void flush();
    }
  };

  const handleStroke = (points: StrokePoint[]) => {
    if (feedback || !plan) return;

    const stroke = plan.strokes[strokeIdx];
    // 허용 오차를 자모 상자에 비례시킨다. 캔버스 전체로 재면 작은 받침은
    // 아무렇게나 그어도 통과한다 (stroke-matching 의 refScale 주석 참고)
    const result = scoreStroke(
      stroke.points,
      points,
      SYLLABLE_VIEWBOX,
      stroke.jamoScale * STROKE_TOLERANCE_RATIO,
    );

    Haptics.notificationAsync(
      result.score === "fail"
        ? Haptics.NotificationFeedbackType.Error
        : Haptics.NotificationFeedbackType.Success,
    ).catch(() => {});

    setFeedback(result.score);

    if (result.score === "fail") {
      failedThisSyllable.current = true;
      timer.current = setTimeout(() => setFeedback(null), 850);
      return;
    }

    setScores((prev) => {
      const next = [...prev];
      next[strokeIdx] = result.score;
      return next;
    });
    setUserStrokes((prev) => {
      const next = [...prev];
      next[strokeIdx] = points;
      return next;
    });
    setEarned((v) => v + result.points);

    timer.current = setTimeout(() => {
      setFeedback(null);
      goNextStroke();
    }, 780);
  };

  const retryStroke = () => {
    if (timer.current) clearTimeout(timer.current);
    setFeedback(null);

    // 이미 점수를 받은 획을 다시 그리는 거면 그 점수는 되돌린다.
    // 값을 setScores 안에서 읽으면 업데이터가 두 번 불릴 때 두 번 깎인다 —
    // 지금 렌더의 scores 에서 읽는다.
    const undo = scores[strokeIdx];
    if (!undo) return; // 아직 아무것도 안 그렸으면 되돌릴 것도 없다

    setEarned((v) => v - STROKE_POINTS[undo]);
    setScores((prev) => {
      const next = [...prev];
      next[strokeIdx] = null;
      return next;
    });
    setUserStrokes((prev) => {
      const next = [...prev];
      next[strokeIdx] = null;
      return next;
    });
    failedThisSyllable.current = true;
  };

  if (!plan) return null;

  if (done) {
    const max = totalStrokesInLevel * 100;
    const percent = Math.round((earned / Math.max(1, max)) * 100);
    const stars = percent >= 85 ? 3 : percent >= 62 ? 2 : 1;
    const nextLevel = SYLLABLE_LEVELS.find((l) => l.id === level.id + 1);
    return (
      <ResultView
        percent={percent}
        stars={stars}
        levelId={level.id}
        nextLevel={nextLevel}
        onRecord={recordResult}
        onRetry={onRetry}
        onBackToList={onBackToList}
        onNext={onNextLevel}
        onExit={onExit}
      />
    );
  }

  return (
    <View style={[s.container, { paddingTop: insets.top + 6 }]}>
      {/* 상단 바 */}
      <View style={s.topBar}>
        <TouchableOpacity onPress={onBackToList} hitSlop={12}>
          <Ionicons name="close" size={26} color={theme.textSecondary} />
        </TouchableOpacity>
        <View style={s.progressTrack}>
          <Animated.View style={[s.progressFill, progressStyle]} />
        </View>
        <Text style={s.counter}>
          {idx + 1}/{plans.length}
        </Text>
      </View>

      {/* 문제 — 교재의 자모 칸을 그대로 옮겼다 */}
      <View style={s.promptCard}>
        <View style={s.jamoRow}>
          {plan.jamo.map((j, i) => (
            <View key={i} style={s.jamoRowItem}>
              {i > 0 && <Text style={s.plus}>+</Text>}
              <View style={s.jamoChip}>
                <Text style={s.jamoText}>{j}</Text>
              </View>
            </View>
          ))}

          {level.showAnswer && (
            <View style={s.jamoRowItem}>
              <Ionicons name="arrow-forward" size={17} color="#B79B7A" />
              <View style={s.answerChip}>
                <Text style={s.answerText}>{plan.syllable}</Text>
              </View>
            </View>
          )}
        </View>

        <Text style={s.promptHint}>
          {level.showAnswer
            ? t("syllableDraw.writeIt")
            : t("syllableDraw.figureItOut")}
        </Text>
      </View>

      <Text style={s.strokeCounter}>
        {t("syllableDraw.stroke", {
          current: strokeIdx + 1,
          total: plan.strokes.length,
        })}
      </Text>

      <View style={s.canvasArea}>
        <SyllableCanvas
          strokes={plan.strokes}
          currentStrokeIdx={strokeIdx}
          completedScores={scores}
          userStrokes={userStrokes}
          guide={level.guide}
          onStrokeFinished={handleStroke}
          disabled={!!feedback}
        />

        {feedback && (
          <Animated.View
            style={[
              s.feedback,
              { backgroundColor: SCORE_COLORS[feedback] },
              fbStyle,
            ]}
            pointerEvents="none"
          >
            <Text style={s.feedbackText}>{t(SCORE_KEYS[feedback])}</Text>
          </Animated.View>
        )}
      </View>

      {/* 하단 고정 */}
      <View style={[s.bottomBar, { paddingBottom: insets.bottom + 14 }]}>
        <Pressable
          onPress={retryStroke}
          style={({ pressed }) => [s.redraw, pressed && s.redrawPressed]}
        >
          <Ionicons name="refresh" size={18} color={theme.primary} />
          <Text style={s.redrawText}>{t("syllableDraw.redraw")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

/* ══════════════════ 결과 ══════════════════ */

function ResultView({
  percent,
  stars,
  levelId,
  nextLevel,
  onRecord,
  onRetry,
  onBackToList,
  onNext,
  onExit,
}: {
  percent: number;
  stars: number;
  levelId: number;
  nextLevel?: SyllableLevel;
  onRecord: (levelId: number, stars: number) => void;
  onRetry: () => void;
  onBackToList: () => void;
  onNext: (l: SyllableLevel) => void;
  onExit: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const insets = useSafeAreaInsets();

  // 결과 화면에 들어온 순간 한 번만 기록한다
  useEffect(() => {
    onRecord(levelId, stars);
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success,
    ).catch(() => {});
  }, []);

  return (
    <View style={[s.container, { paddingTop: insets.top + 6 }]}>
      <View style={s.selectHeader}>
        <TouchableOpacity onPress={onBackToList} hitSlop={12}>
          <Ionicons name="close" size={26} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={s.resultBody}>
        <View style={s.resultStars}>
          {[1, 2, 3].map((n) => (
            <Animated.View key={n} entering={FadeInDown.delay(n * 130)}>
              <Ionicons
                name={n <= stars ? "star" : "star-outline"}
                size={n === 2 ? 56 : 44}
                color={n <= stars ? "#FFD000" : theme.border}
              />
            </Animated.View>
          ))}
        </View>

        <Text style={s.resultPercent}>{percent}%</Text>
        <Text style={s.resultLabel}>{t("syllableDraw.result.accuracy")}</Text>
      </View>

      <View style={[s.bottomBar, { paddingBottom: insets.bottom + 14 }]}>
        {nextLevel && stars > 0 ? (
          <Pressable
            onPress={() => onNext(nextLevel)}
            style={({ pressed }) => [s.primaryBtn, pressed && s.btnPressed]}
          >
            <Text style={s.primaryBtnText}>{t("syllableDraw.result.next")}</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={onExit}
            style={({ pressed }) => [s.primaryBtn, pressed && s.btnPressed]}
          >
            <Text style={s.primaryBtnText}>{t("syllableDraw.result.exit")}</Text>
          </Pressable>
        )}
        <Pressable onPress={onRetry} hitSlop={8} style={s.ghostBtn}>
          <Text style={s.ghostBtnText}>{t("syllableDraw.result.retry")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

/* ══════════════════ 스타일 ══════════════════ */

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },

    /* 레벨 고르기 */
    selectHeader: { paddingHorizontal: 16, paddingBottom: 4 },
    selectScroll: { paddingHorizontal: 20, paddingTop: 6 },
    selectTitle: {
      fontSize: 26,
      fontWeight: "900",
      color: theme.text,
      letterSpacing: -0.4,
    },
    selectSub: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.textSecondary,
      lineHeight: 20,
      marginTop: 6,
      marginBottom: 22,
    },
    levelWrap: { position: "relative", marginBottom: 14 },
    levelPressed: { transform: [{ translateY: 2 }] },
    levelDepth: {
      position: "absolute",
      top: 5,
      left: 0,
      right: 0,
      bottom: -4,
      borderRadius: 20,
    },
    levelCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      borderRadius: 20,
      paddingVertical: 15,
      paddingHorizontal: 15,
      overflow: "hidden",
    },
    levelShine: {
      position: "absolute",
      top: 0,
      left: 18,
      right: 18,
      height: 2,
      borderRadius: 999,
      backgroundColor: "rgba(255,255,255,0.45)",
    },
    levelBadge: {
      width: 40,
      height: 40,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.22)",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.28)",
    },
    levelBadgeText: { fontSize: 18, fontWeight: "900", color: "#fff" },
    levelTexts: { flex: 1, gap: 3 },
    levelTitle: { fontSize: 16, fontWeight: "900", color: "#fff" },
    levelDesc: {
      fontSize: 12,
      fontWeight: "600",
      color: "rgba(255,255,255,0.86)",
      lineHeight: 16,
    },
    starRow: { flexDirection: "row", gap: 2 },

    /* 게임 */
    topBar: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingHorizontal: 16,
      paddingBottom: 10,
    },
    progressTrack: {
      flex: 1,
      height: 12,
      borderRadius: 99,
      backgroundColor: theme.border,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      borderRadius: 99,
      backgroundColor: "#58CC02",
    },
    counter: { fontSize: 13, fontWeight: "800", color: theme.textSecondary },

    promptCard: {
      marginHorizontal: 20,
      backgroundColor: "#FBEEE0",
      borderRadius: 18,
      borderWidth: 2,
      borderColor: "#EBD6BE",
      borderBottomWidth: 5,
      borderBottomColor: "#E0C4A4",
      paddingVertical: 14,
      paddingHorizontal: 14,
      alignItems: "center",
      gap: 8,
    },
    jamoRow: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 6,
    },
    jamoRowItem: { flexDirection: "row", alignItems: "center", gap: 6 },
    plus: { fontSize: 17, fontWeight: "900", color: "#B79B7A" },
    jamoChip: {
      minWidth: 42,
      height: 42,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 8,
      backgroundColor: "#fff",
      borderWidth: 2,
      borderColor: "#E0C4A4",
    },
    jamoText: { fontSize: 21, fontWeight: "800", color: "#4A3A2A" },
    answerChip: {
      minWidth: 46,
      height: 46,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 8,
      backgroundColor: "#776ee2",
    },
    answerText: { fontSize: 24, fontWeight: "900", color: "#fff" },
    promptHint: {
      fontSize: 12.5,
      fontWeight: "700",
      color: "#9C7F5E",
      textAlign: "center",
    },

    strokeCounter: {
      textAlign: "center",
      marginTop: 12,
      fontSize: 12.5,
      fontWeight: "800",
      color: theme.textSecondary,
    },

    canvasArea: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    feedback: {
      position: "absolute",
      bottom: 14,
      paddingHorizontal: 20,
      paddingVertical: 9,
      borderRadius: 999,
    },
    feedbackText: { fontSize: 15, fontWeight: "900", color: "#fff" },

    bottomBar: {
      paddingHorizontal: 20,
      paddingTop: 10,
      gap: 10,
      alignItems: "center",
    },
    redraw: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      paddingVertical: 11,
      paddingHorizontal: 20,
      borderRadius: 14,
      borderWidth: 2,
      borderColor: theme.border,
      backgroundColor: theme.surface,
    },
    redrawPressed: { transform: [{ translateY: 2 }], opacity: 0.85 },
    redrawText: { fontSize: 14, fontWeight: "800", color: theme.primary },

    /* 결과 */
    resultBody: { flex: 1, alignItems: "center", justifyContent: "center" },
    resultStars: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 26,
    },
    resultPercent: {
      fontSize: 54,
      fontWeight: "900",
      color: theme.text,
      letterSpacing: -1,
    },
    resultLabel: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.textSecondary,
      marginTop: 4,
    },
    primaryBtn: {
      width: "100%",
      backgroundColor: "#58CC02",
      borderRadius: 16,
      paddingVertical: 15,
      alignItems: "center",
      borderBottomWidth: 4,
      borderBottomColor: "#46A302",
    },
    btnPressed: { transform: [{ translateY: 2 }], borderBottomWidth: 2 },
    primaryBtnText: { fontSize: 16, fontWeight: "900", color: "#fff" },
    ghostBtn: { paddingVertical: 8 },
    ghostBtnText: {
      fontSize: 14,
      fontWeight: "800",
      color: theme.textSecondary,
    },
  });
