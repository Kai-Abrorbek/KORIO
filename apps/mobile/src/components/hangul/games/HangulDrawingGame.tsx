import { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withDelay,
  withRepeat,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { HangulStrokeChar, StrokePoint } from "@/types/hangul";
import { scoreStroke, StrokeScore } from "@/utils/stroke-matching";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useSpeech } from "@/hooks/useSpeech";
import StrokeCanvas from "./StrokeCanvas";

interface Props {
  characters: HangulStrokeChar[];
  onExit: () => void;
}

const SCORE_LABELS: Record<StrokeScore, string> = {
  perfect: "hangul.draw.perfect",
  good: "hangul.draw.good",
  okay: "hangul.draw.okay",
  fail: "hangul.draw.tryAgain",
};

const SCORE_COLORS: Record<StrokeScore, string> = {
  perfect: "#FFD000",
  good: "#58CC02",
  okay: "#1FA9F7",
  fail: "#FF4B4B",
};

export default function HangulDrawingGame({ characters, onExit }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const { speak } = useSpeech();

  const [charIdx, setCharIdx] = useState(0);
  const [strokeIdx, setStrokeIdx] = useState(0);
  const [scores, setScores] = useState<(StrokeScore | null)[]>([]);
  const [feedback, setFeedback] = useState<StrokeScore | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [done, setDone] = useState(false);

  const character = characters[charIdx];
  const totalChars = characters.length;

  // 새 캐릭터 진입 시 초기화
  useEffect(() => {
    if (!character) return;
    setStrokeIdx(0);
    setScores(new Array(character.strokes.length).fill(null));
    setFeedback(null);
  }, [charIdx]);

  // 피드백 애니메이션
  const feedbackScale = useSharedValue(0);
  const feedbackOpacity = useSharedValue(0);

  useEffect(() => {
    if (feedback) {
      feedbackOpacity.value = withTiming(1, { duration: 150 });
      feedbackScale.value = withSequence(
        withSpring(1.15, { damping: 8, stiffness: 220 }),
        withSpring(1, { damping: 9 }),
      );
      // 1.2초 후 다음 진행
      const timer = setTimeout(() => {
        feedbackOpacity.value = withTiming(0, { duration: 200 });
        feedbackScale.value = withTiming(0.8, { duration: 200 });
        advance();
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      feedbackOpacity.value = 0;
      feedbackScale.value = 0;
    }
  }, [feedback]);

  const feedbackStyle = useAnimatedStyle(() => ({
    opacity: feedbackOpacity.value,
    transform: [{ scale: feedbackScale.value }],
  }));

  // 진행률 바
  const progress = useSharedValue(0);
  useEffect(() => {
    const completed = scores.filter((s) => s !== null).length;
    progress.value = withSpring(completed / Math.max(1, scores.length), {
      damping: 14,
      stiffness: 100,
    });
  }, [scores]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%` as any,
  }));

  const handleStrokeFinished = (userPoints: StrokePoint[]) => {
    if (feedback) return; // 피드백 중 무시
    const target = character.strokes[strokeIdx].points;
    const result = scoreStroke(target, userPoints);

    Haptics.notificationAsync(
      result.score === "fail"
        ? Haptics.NotificationFeedbackType.Error
        : Haptics.NotificationFeedbackType.Success,
    ).catch(() => {});

    if (result.score === "fail") {
      setFeedback("fail");
      // 실패 시 같은 획 재시도 (advance 가 알아서 처리)
    } else {
      const newScores = [...scores];
      newScores[strokeIdx] = result.score;
      setScores(newScores);
      setTotalScore((s) => s + result.points);
      setFeedback(result.score);
    }
  };

  const advance = () => {
    setFeedback(null);
    if (feedback === "fail") {
      // 실패면 같은 획 다시
      return;
    }
    // 다음 획 또는 다음 글자
    if (strokeIdx + 1 < character.strokes.length) {
      setStrokeIdx(strokeIdx + 1);
    } else {
      // 글자 완료
      if (charIdx + 1 < totalChars) {
        setCharIdx(charIdx + 1);
      } else {
        setDone(true);
      }
    }
  };

  const handleClear = () => {
    // 현재 획만 다시
    const newScores = [...scores];
    newScores[strokeIdx] = null;
    setScores(newScores);
    setFeedback(null);
  };

  const handleSpeak = () => {
    if (character) speak(character.name);
  };

  if (!character) return null;

  // 최종 결과 화면
  if (done) {
    const maxScore = characters.reduce(
      (sum, c) => sum + c.strokes.length * 100,
      0,
    );
    const percent = Math.round((totalScore / Math.max(1, maxScore)) * 100);
    const stars = percent >= 85 ? 3 : percent >= 60 ? 2 : 1;
    return (
      <FinishView
        percent={percent}
        stars={stars}
        onRestart={() => {
          setCharIdx(0);
          setStrokeIdx(0);
          setTotalScore(0);
          setDone(false);
        }}
        onExit={onExit}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* 상단 바 */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onExit} hitSlop={10}>
          <Ionicons name="close" size={28} color={theme.textSecondary} />
        </TouchableOpacity>
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, progressStyle]} />
        </View>
        <View style={styles.charIndicator}>
          <Text style={styles.charIndicatorText}>
            {charIdx + 1}/{totalChars}
          </Text>
        </View>
      </View>

      {/* 글자 이름 + 발음 */}
      <View style={styles.charInfo}>
        <Text style={styles.charName}>{character.name}</Text>
        <View style={styles.romanRow}>
          <Text style={styles.charRoman}>{character.romanization}</Text>
          <TouchableOpacity onPress={handleSpeak} hitSlop={10}>
            <Ionicons name="volume-medium" size={20} color="#776ee2" />
          </TouchableOpacity>
        </View>
        <Text style={styles.strokeIndicator}>
          {t("hangul.draw.stroke", {
            current: strokeIdx + 1,
            total: character.strokes.length,
          })}
        </Text>
      </View>

      {/* 캔버스 */}
      <View style={styles.canvasArea}>
        <StrokeCanvas
          strokes={character.strokes}
          currentStrokeIdx={strokeIdx}
          completedScores={scores}
          onStrokeFinished={handleStrokeFinished}
          disabled={!!feedback}
        />

        {/* 피드백 오버레이 */}
        {feedback && (
          <Animated.View style={[styles.feedbackOverlay, feedbackStyle]}>
            <View
              style={[
                styles.feedbackPill,
                { backgroundColor: SCORE_COLORS[feedback] },
              ]}
            >
              <Ionicons
                name={
                  feedback === "fail"
                    ? "close-circle"
                    : feedback === "perfect"
                      ? "star"
                      : "checkmark-circle"
                }
                size={22}
                color="#fff"
              />
              <Text style={styles.feedbackText}>
                {t(SCORE_LABELS[feedback])}
              </Text>
            </View>
          </Animated.View>
        )}
      </View>

      {/* 힌트 */}
      <Text style={styles.hint}>{t("hangul.draw.instruction")}</Text>

      {/* 액션 */}
      <TouchableOpacity
        style={styles.clearBtn}
        onPress={handleClear}
        activeOpacity={0.7}
      >
        <Ionicons name="refresh" size={18} color={theme.textSecondary} />
        <Text style={styles.clearText}>{t("hangul.draw.clear")}</Text>
      </TouchableOpacity>
    </View>
  );
}

// ── 완료 화면 ──
function FinishView({
  percent,
  stars,
  onRestart,
  onExit,
}: {
  percent: number;
  stars: number;
  onRestart: () => void;
  onExit: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const titleScale = useSharedValue(0);

  useEffect(() => {
    titleScale.value = withSequence(
      withSpring(1.2, { damping: 7, stiffness: 220 }),
      withSpring(1, { damping: 9 }),
    );
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: titleScale.value }],
  }));

  return (
    <View style={styles.finishContainer}>
      <Animated.Text style={[styles.finishTitle, titleStyle]}>
        {t("hangul.draw.complete")}
      </Animated.Text>
      <View style={styles.starsRow}>
        {[0, 1, 2].map((i) => (
          <Ionicons
            key={i}
            name={i < stars ? "star" : "star-outline"}
            size={56}
            color={i < stars ? "#FFD000" : "#D8D8E0"}
            style={{ marginHorizontal: 6 }}
          />
        ))}
      </View>
      <Text style={styles.finishScore}>{percent}%</Text>
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={onRestart}
        activeOpacity={0.85}
      >
        <Text style={styles.primaryBtnText}>{t("hangul.draw.retry")}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onExit} style={{ paddingVertical: 10 }}>
        <Text style={styles.secondaryText}>{t("hangul.draw.exit")}</Text>
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
      marginBottom: 16,
    },
    progressTrack: {
      flex: 1,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.surface,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: theme.border,
    },
    progressFill: {
      height: "100%",
      backgroundColor: "#58CC02",
      borderRadius: 5,
    },
    charIndicator: {
      backgroundColor: theme.surface,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderWidth: 1,
      borderColor: theme.border,
    },
    charIndicatorText: {
      fontSize: 13,
      fontWeight: "800",
      color: theme.text,
    },
    charInfo: {
      alignItems: "center",
      marginBottom: 14,
    },
    charName: {
      fontSize: 28,
      fontWeight: "900",
      color: theme.text,
      letterSpacing: -0.5,
    },
    romanRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginTop: 2,
    },
    charRoman: {
      fontSize: 16,
      fontWeight: "700",
      color: "#776ee2",
      letterSpacing: 1.5,
      textTransform: "uppercase",
    },
    strokeIndicator: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
      marginTop: 6,
    },
    canvasArea: {
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
      position: "relative",
    },
    feedbackOverlay: {
      position: "absolute",
      top: "50%",
      marginTop: -28,
      alignSelf: "center",
    },
    feedbackPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 28,
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      elevation: 8,
    },
    feedbackText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "900",
    },
    hint: {
      textAlign: "center",
      fontSize: 14,
      fontWeight: "600",
      color: theme.textSecondary,
      marginBottom: 16,
    },
    clearBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      alignSelf: "center",
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 12,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    clearText: {
      fontSize: 14,
      fontWeight: "800",
      color: theme.textSecondary,
    },
    // 완료 화면
    finishContainer: {
      flex: 1,
      backgroundColor: theme.bg,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
    },
    finishTitle: {
      fontSize: 36,
      fontWeight: "900",
      color: "#776ee2",
      marginBottom: 22,
      letterSpacing: -0.5,
    },
    starsRow: {
      flexDirection: "row",
      marginBottom: 18,
    },
    finishScore: {
      fontSize: 48,
      fontWeight: "900",
      color: theme.text,
      marginBottom: 36,
    },
    primaryBtn: {
      backgroundColor: "#776ee2",
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 48,
      borderBottomWidth: 4,
      borderColor: "#5448E0",
      marginBottom: 8,
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
