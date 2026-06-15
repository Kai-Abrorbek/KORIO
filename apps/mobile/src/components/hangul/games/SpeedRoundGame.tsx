import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  withDelay,
  Easing,
  interpolateColor,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import {
  generateQuestion,
  comboMultiplier,
  SpeedQuestion,
} from "@/mocks/speed-round.mock";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

type GameState = "countdown" | "playing" | "ended";

const GAME_DURATION_MS = 60000;
const WRONG_PENALTY_MS = 2000;

interface Props {
  onExit: () => void;
}

export default function SpeedRoundGame({ onExit }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  const [state, setState] = useState<GameState>("countdown");
  const [countdown, setCountdown] = useState(3);
  const [timeMs, setTimeMs] = useState(GAME_DURATION_MS);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [currentQ, setCurrentQ] = useState<SpeedQuestion>(() =>
    generateQuestion(),
  );
  const [tappedIdx, setTappedIdx] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [floatPoints, setFloatPoints] = useState(0);

  // ── 애니메이션 SV ──
  const scoreScale = useSharedValue(1);
  const comboScale = useSharedValue(1);
  const cardScale = useSharedValue(1);
  const cardRotate = useSharedValue(0);
  const screenShake = useSharedValue(0);
  const floatY = useSharedValue(0);
  const floatOpacity = useSharedValue(0);
  const timePulse = useSharedValue(1);

  // ── 카운트다운 ──
  useEffect(() => {
    if (state !== "countdown") return;
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown((c) => c - 1), 700);
      return () => clearTimeout(t);
    }
    setState("playing");
  }, [countdown, state]);

  // ── 타이머 (100ms 간격) ──
  useEffect(() => {
    if (state !== "playing") return;
    const id = setInterval(() => {
      setTimeMs((prev) => {
        const next = Math.max(0, prev - 100);
        if (next === 0) {
          clearInterval(id);
          endGame();
        }
        return next;
      });
    }, 100);
    return () => clearInterval(id);
  }, [state]);

  // ── 남은 시간 10초 이하면 시간 바 펄스 + 햅틱 ──
  useEffect(() => {
    if (state !== "playing") return;
    if (timeMs <= 10000 && timeMs > 0) {
      timePulse.value = withRepeat(
        withSequence(
          withTiming(1.08, {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      );
      if (timeMs % 1000 < 100) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      }
    } else {
      timePulse.value = withTiming(1);
    }
  }, [timeMs, state]);

  const endGame = () => {
    setState("ended");
    setBestScore((b) => Math.max(b, score));
  };

  // ── 답안 처리 ──
  const handleAnswer = (idx: number) => {
    if (state !== "playing" || feedback) return;
    setTappedIdx(idx);
    const correct = idx === currentQ.correctIndex;

    if (correct) {
      const mult = comboMultiplier(combo);
      const points = 10 * mult;
      const newCombo = combo + 1;

      setFeedback("correct");
      setScore((s) => s + points);
      setCombo(newCombo);
      setMaxCombo((m) => Math.max(m, newCombo));
      setCorrectCount((c) => c + 1);
      setFloatPoints(points);

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});

      scoreScale.value = withSequence(
        withSpring(1.25, { damping: 7, stiffness: 220 }),
        withSpring(1, { damping: 9 }),
      );
      comboScale.value = withSequence(
        withSpring(1.4, { damping: 6 }),
        withSpring(1, { damping: 9 }),
      );
      cardScale.value = withSequence(
        withTiming(1.04, { duration: 100 }),
        withTiming(1, { duration: 120 }),
      );
      floatOpacity.value = 1;
      floatY.value = 0;
      floatY.value = withTiming(-60, { duration: 600 });
      floatOpacity.value = withDelay(200, withTiming(0, { duration: 400 }));
    } else {
      setFeedback("wrong");
      setCombo(0);
      setWrongCount((w) => w + 1);
      // 시간 페널티
      setTimeMs((t) => Math.max(0, t - WRONG_PENALTY_MS));

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(
        () => {},
      );

      screenShake.value = withSequence(
        withTiming(-12, { duration: 50 }),
        withTiming(12, { duration: 50 }),
        withTiming(-8, { duration: 50 }),
        withTiming(0, { duration: 50 }),
      );
      cardRotate.value = withSequence(
        withTiming(-3, { duration: 60 }),
        withTiming(3, { duration: 60 }),
        withTiming(0, { duration: 60 }),
      );
    }

    // 다음 문제 (400ms 후)
    setTimeout(() => {
      setFeedback(null);
      setTappedIdx(null);
      setCurrentQ(generateQuestion(currentQ.syllable));
    }, 400);
  };

  const restart = () => {
    setState("countdown");
    setCountdown(3);
    setTimeMs(GAME_DURATION_MS);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setCorrectCount(0);
    setWrongCount(0);
    setCurrentQ(generateQuestion());
  };

  // ── 애니메이션 스타일 ──
  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: screenShake.value }],
  }));

  const scoreStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scoreScale.value }],
  }));

  const comboStyle = useAnimatedStyle(() => ({
    transform: [{ scale: comboScale.value }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: cardScale.value },
      { rotate: `${cardRotate.value}deg` },
    ],
  }));

  const floatStyle = useAnimatedStyle(() => ({
    opacity: floatOpacity.value,
    transform: [{ translateY: floatY.value }],
  }));

  const timeProgress = timeMs / GAME_DURATION_MS;
  const timeBarStyle = useAnimatedStyle(() => ({
    transform: [{ scale: timePulse.value }],
  }));

  const timeColor =
    timeProgress > 0.5 ? "#58CC02" : timeProgress > 0.2 ? "#FFD000" : "#FF4B4B";

  // ── 카운트다운 화면 ──
  if (state === "countdown") {
    return <CountdownView countdown={countdown} onExit={onExit} />;
  }

  // ── 종료 화면 ──
  if (state === "ended") {
    const accuracy =
      correctCount + wrongCount === 0
        ? 0
        : Math.round((correctCount / (correctCount + wrongCount)) * 100);
    return (
      <EndView
        score={score}
        bestScore={bestScore}
        maxCombo={maxCombo}
        accuracy={accuracy}
        correctCount={correctCount}
        onRestart={restart}
        onExit={onExit}
      />
    );
  }

  // ── 메인 게임 화면 ──
  const mult = comboMultiplier(combo);

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      {/* 상단 바 */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onExit} hitSlop={10}>
          <Ionicons name="close" size={26} color={theme.textSecondary} />
        </TouchableOpacity>

        <Animated.View style={[styles.timeBarWrap, timeBarStyle]}>
          <View style={styles.timeBarTrack}>
            <View
              style={[
                styles.timeBarFill,
                {
                  width: `${timeProgress * 100}%`,
                  backgroundColor: timeColor,
                },
              ]}
            />
          </View>
          <Text style={styles.timeText}>{Math.ceil(timeMs / 1000)}s</Text>
        </Animated.View>
      </View>

      {/* 스코어 + 콤보 */}
      <View style={styles.statsRow}>
        <Animated.View style={[styles.scoreCard, scoreStyle]}>
          <Text style={styles.scoreLabel}>{t("hangul.speed.score")}</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </Animated.View>

        {combo >= 2 && (
          <Animated.View style={[styles.comboCard, comboStyle]}>
            <Ionicons
              name="flame"
              size={combo >= 10 ? 28 : combo >= 6 ? 24 : 20}
              color={
                combo >= 10 ? "#FF4B4B" : combo >= 6 ? "#FFA500" : "#FFD000"
              }
            />
            <Text style={styles.comboValue}>
              {combo} <Text style={styles.multX}>×{mult}</Text>
            </Text>
          </Animated.View>
        )}
      </View>

      {/* 문제 카드 */}
      <View style={styles.questionArea}>
        <Animated.View
          style={[
            styles.questionCard,
            cardStyle,
            feedback === "correct" && styles.questionCardCorrect,
            feedback === "wrong" && styles.questionCardWrong,
          ]}
        >
          <Text style={styles.questionChar}>{currentQ.syllable}</Text>
        </Animated.View>

        <Animated.Text style={[styles.floatPoints, floatStyle]}>
          +{floatPoints}
        </Animated.Text>
      </View>

      {/* 4개 답안 (2x2 그리드) */}
      <View style={styles.optionsGrid}>
        {currentQ.options.map((opt, idx) => {
          const isTapped = tappedIdx === idx;
          const isCorrect = idx === currentQ.correctIndex;
          const showState = isTapped ? feedback : null;
          return (
            <Pressable
              key={idx}
              onPress={() => handleAnswer(idx)}
              style={[
                styles.optionCard,
                showState === "correct" && isCorrect && styles.optionCorrect,
                showState === "wrong" && !isCorrect && styles.optionWrong,
                feedback === "wrong" && isCorrect && styles.optionRevealCorrect,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  (showState === "correct" ||
                    (feedback === "wrong" && isCorrect)) &&
                    styles.optionTextLight,
                  showState === "wrong" && !isCorrect && styles.optionTextLight,
                ]}
              >
                {opt}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </Animated.View>
  );
}

// ───────────────────────────────────────────────
// 카운트다운 화면
// ───────────────────────────────────────────────
function CountdownView({
  countdown,
  onExit,
}: {
  countdown: number;
  onExit: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = 0;
    opacity.value = 0;
    scale.value = withSpring(1.4, { damping: 8, stiffness: 180 });
    opacity.value = withTiming(1, { duration: 200 });
  }, [countdown]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.countdownContainer}>
      <TouchableOpacity
        onPress={onExit}
        style={styles.countdownClose}
        hitSlop={10}
      >
        <Ionicons name="close" size={28} color={theme.textSecondary} />
      </TouchableOpacity>
      <Text style={styles.countdownLabel}>{t("hangul.speed.getReady")}</Text>
      <Animated.Text style={[styles.countdownNumber, animStyle]}>
        {countdown > 0 ? countdown : t("hangul.speed.go")}
      </Animated.Text>
    </View>
  );
}

// ───────────────────────────────────────────────
// 종료 화면
// ───────────────────────────────────────────────
function EndView({
  score,
  bestScore,
  maxCombo,
  accuracy,
  correctCount,
  onRestart,
  onExit,
}: {
  score: number;
  bestScore: number;
  maxCombo: number;
  accuracy: number;
  correctCount: number;
  onRestart: () => void;
  onExit: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const titleScale = useSharedValue(0);
  const cardY = useSharedValue(300);

  const isNewBest = score >= bestScore && score > 0;

  useEffect(() => {
    titleScale.value = withSequence(
      withSpring(1.2, { damping: 7, stiffness: 220 }),
      withSpring(1, { damping: 9 }),
    );
    cardY.value = withDelay(
      150,
      withSpring(0, { damping: 14, stiffness: 130 }),
    );
    if (isNewBest) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {},
      );
    }
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: titleScale.value }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cardY.value }],
  }));

  return (
    <View style={styles.endContainer}>
      <Animated.Text style={[styles.endTitle, titleStyle]}>
        {t("hangul.speed.timeUp")}
      </Animated.Text>

      {isNewBest && (
        <View style={styles.bestBadge}>
          <Ionicons name="trophy" size={16} color="#fff" />
          <Text style={styles.bestBadgeText}>{t("hangul.speed.newBest")}</Text>
        </View>
      )}

      <Animated.View style={[styles.scoreBigCard, cardStyle]}>
        <Text style={styles.scoreBigLabel}>{t("hangul.speed.finalScore")}</Text>
        <Text style={styles.scoreBigValue}>{score}</Text>

        <View style={styles.endStatsRow}>
          <View style={styles.endStat}>
            <Ionicons name="checkmark-circle" size={20} color="#58CC02" />
            <Text style={styles.endStatLabel}>{t("hangul.speed.correct")}</Text>
            <Text style={styles.endStatValue}>{correctCount}</Text>
          </View>
          <View style={styles.endStatDivider} />
          <View style={styles.endStat}>
            <Ionicons name="flame" size={20} color="#FFA500" />
            <Text style={styles.endStatLabel}>
              {t("hangul.speed.maxCombo")}
            </Text>
            <Text style={styles.endStatValue}>{maxCombo}</Text>
          </View>
          <View style={styles.endStatDivider} />
          <View style={styles.endStat}>
            <Ionicons name="radio-button-on" size={20} color="#1FA9F7" />
            <Text style={styles.endStatLabel}>
              {t("hangul.speed.accuracy")}
            </Text>
            <Text style={styles.endStatValue}>{accuracy}%</Text>
          </View>
        </View>

        <View style={styles.bestRow}>
          <Ionicons name="medal" size={16} color="#FFD000" />
          <Text style={styles.bestText}>
            {t("hangul.speed.bestScore", { score: bestScore })}
          </Text>
        </View>
      </Animated.View>

      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={onRestart}
        activeOpacity={0.85}
      >
        <Ionicons name="refresh" size={18} color="#fff" />
        <Text style={styles.primaryBtnText}>{t("hangul.speed.playAgain")}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onExit} style={{ paddingVertical: 12 }}>
        <Text style={styles.secondaryText}>{t("hangul.speed.exit")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      paddingTop: 54,
      paddingHorizontal: 16,
    },
    topBar: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 18,
    },
    timeBarWrap: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    timeBarTrack: {
      flex: 1,
      height: 12,
      borderRadius: 6,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      overflow: "hidden",
    },
    timeBarFill: {
      height: "100%",
      borderRadius: 6,
    },
    timeText: {
      fontSize: 14,
      fontWeight: "900",
      color: theme.text,
      minWidth: 36,
      textAlign: "right",
    },
    statsRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 22,
    },
    scoreCard: {
      flex: 1,
      backgroundColor: theme.surface,
      borderRadius: 14,
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    scoreLabel: {
      fontSize: 10,
      fontWeight: "800",
      color: theme.textSecondary,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    scoreValue: {
      fontSize: 28,
      fontWeight: "900",
      color: theme.text,
      lineHeight: 32,
      marginTop: 2,
    },
    comboCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: "#FFF6E0",
      borderRadius: 14,
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderWidth: 2,
      borderColor: "#FFD000",
    },
    comboValue: {
      fontSize: 22,
      fontWeight: "900",
      color: "#E89C00",
    },
    multX: {
      fontSize: 15,
      color: "#FF6B00",
    },
    questionArea: {
      alignItems: "center",
      marginBottom: 28,
      position: "relative",
    },
    questionCard: {
      width: 200,
      height: 200,
      borderRadius: 32,
      backgroundColor: "#776ee2",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#776ee2",
      shadowOpacity: 0.45,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 6 },
      elevation: 10,
      borderBottomWidth: 6,
      borderColor: "#5448E0",
    },
    questionCardCorrect: {
      backgroundColor: "#58CC02",
      borderColor: "#4AA802",
      shadowColor: "#58CC02",
    },
    questionCardWrong: {
      backgroundColor: "#FF4B4B",
      borderColor: "#CC3838",
      shadowColor: "#FF4B4B",
    },
    questionChar: {
      fontSize: 120,
      fontWeight: "900",
      color: "#fff",
      lineHeight: 140,
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    floatPoints: {
      position: "absolute",
      top: 20,
      fontSize: 38,
      fontWeight: "900",
      color: "#FFD000",
      textShadowColor: "rgba(0,0,0,0.3)",
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
    },
    optionsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    optionCard: {
      width: "48%",
      paddingVertical: 22,
      backgroundColor: theme.surface,
      borderRadius: 16,
      borderWidth: 2,
      borderBottomWidth: 5,
      borderColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    optionCorrect: {
      backgroundColor: "#58CC02",
      borderColor: "#4AA802",
    },
    optionWrong: {
      backgroundColor: "#FF4B4B",
      borderColor: "#CC3838",
    },
    optionRevealCorrect: {
      backgroundColor: "#58CC02",
      borderColor: "#4AA802",
      opacity: 0.6,
    },
    optionText: {
      fontSize: 22,
      fontWeight: "900",
      color: theme.text,
      letterSpacing: 1,
    },
    optionTextLight: {
      color: "#fff",
    },
    // ── 카운트다운 ──
    countdownContainer: {
      flex: 1,
      backgroundColor: theme.bg,
      alignItems: "center",
      justifyContent: "center",
    },
    countdownClose: {
      position: "absolute",
      top: 60,
      left: 16,
    },
    countdownLabel: {
      fontSize: 18,
      fontWeight: "800",
      color: theme.textSecondary,
      textTransform: "uppercase",
      letterSpacing: 2,
      marginBottom: 20,
    },
    countdownNumber: {
      fontSize: 140,
      fontWeight: "900",
      color: "#776ee2",
      lineHeight: 160,
    },
    // ── 종료 ──
    endContainer: {
      flex: 1,
      backgroundColor: theme.bg,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
    },
    endTitle: {
      fontSize: 38,
      fontWeight: "900",
      color: "#776ee2",
      marginBottom: 12,
      letterSpacing: -0.5,
    },
    bestBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: "#FFD000",
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 20,
      marginBottom: 20,
    },
    bestBadgeText: {
      color: "#fff",
      fontSize: 13,
      fontWeight: "900",
      textTransform: "uppercase",
      letterSpacing: 0.8,
    },
    scoreBigCard: {
      width: "100%",
      backgroundColor: theme.surface,
      borderRadius: 24,
      padding: 22,
      borderWidth: 1.5,
      borderColor: theme.border,
      marginBottom: 28,
      alignItems: "center",
    },
    scoreBigLabel: {
      fontSize: 12,
      fontWeight: "800",
      color: theme.textSecondary,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 4,
    },
    scoreBigValue: {
      fontSize: 64,
      fontWeight: "900",
      color: "#776ee2",
      lineHeight: 70,
      marginBottom: 18,
    },
    endStatsRow: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      marginBottom: 16,
    },
    endStat: {
      flex: 1,
      alignItems: "center",
      gap: 4,
    },
    endStatLabel: {
      fontSize: 10,
      fontWeight: "800",
      color: theme.textSecondary,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    endStatValue: {
      fontSize: 20,
      fontWeight: "900",
      color: theme.text,
    },
    endStatDivider: {
      width: 1,
      height: 30,
      backgroundColor: theme.border,
    },
    bestRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: theme.bg,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
    },
    bestText: {
      fontSize: 13,
      fontWeight: "800",
      color: theme.text,
    },
    primaryBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: "#776ee2",
      borderRadius: 16,
      paddingVertical: 14,
      paddingHorizontal: 36,
      borderBottomWidth: 4,
      borderColor: "#5448E0",
      marginBottom: 4,
    },
    primaryBtnText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "900",
    },
    secondaryText: {
      color: theme.textSecondary,
      fontSize: 14,
      fontWeight: "700",
    },
  });
