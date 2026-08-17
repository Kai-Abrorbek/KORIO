import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  cancelAnimation,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSpeech } from "@/hooks/useSpeech";
import { useSpeechRecorder } from "@/hooks/useSpeechRecorder";
import {
  AssessResult,
  SttService,
  wordToneOf,
} from "@/services/stt.service";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LessonCharacter from "../LessonCharacter";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  onSkip: () => void;
  theme: ThemeColors;
}

const MIC_BLUE = "#1CB0F6";
const MIC_BLUE_DARK = "#1899D6";
const MAX_RECORD_SECONDS = 15;

type Phase = "idle" | "recording" | "analyzing" | "done";

// 단어 칩 색 — 초록(잘함) / 노랑(아쉬움) / 빨강(틀림)
const TONE = {
  good: { bg: "#D7FFB8", border: "#58CC02", text: "#3C8000" },
  warn: { bg: "#FFF3C4", border: "#FFC800", text: "#8A6A00" },
  bad: { bg: "#FFDFE0", border: "#FF4B4B", text: "#C02121" },
} as const;

// 발음 확인 중 도는 아이콘
function AnalyzingSpinner() {
  const spin = useSharedValue(0);
  spin.value = withRepeat(withTiming(360, { duration: 900 }), -1, false);
  const st = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value}deg` }],
  }));
  return (
    <Animated.View style={st}>
      <Ionicons name="sync" size={30} color="#fff" />
    </Animated.View>
  );
}

// 파형 막대 한 개
function WaveBar({ index, active }: { index: number; active: boolean }) {
  const base = [10, 18, 28, 16, 32, 20, 30, 14, 24, 18, 12][index % 11];
  const sv = useSharedValue(0.4);
  if (active) {
    sv.value = withDelay(
      index * 60,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 300 }),
          withTiming(0.4, { duration: 300 }),
        ),
        -1,
        true,
      ),
    );
  } else {
    cancelAnimation(sv);
    sv.value = withTiming(0.4);
  }
  const st = useAnimatedStyle(() => ({ transform: [{ scaleY: sv.value }] }));
  return (
    <Animated.View
      style={[
        {
          width: 5,
          height: base,
          borderRadius: 3,
          backgroundColor: "#fff",
          marginHorizontal: 3,
        },
        st,
      ]}
    />
  );
}

export default function Speaking({
  question,
  answerState,
  onAnswer,
  onSkip,
  theme,
}: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const s = styles(theme, insets.bottom);
  const { speak, isSpeaking } = useSpeech();

  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<AssessResult | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  // 채점이 끝나면(부모가 correct/wrong 표시) 마이크를 잠근다
  const locked = answerState !== "idle";

  const handleWav = async (wav: ArrayBuffer) => {
    setPhase("analyzing");
    try {
      const res = await SttService.assess(question.id, wav);
      if (res.status !== "success") {
        // 말을 못 알아들은 건 오답이 아니다 — 채점하지 않고 다시 시도하게 둔다
        setErrorKey("lesson.speaking.noSpeech");
        setPhase("idle");
        return;
      }
      setResult(res);
      setPhase("done");
      onAnswer(res.passed ? "all_correct" : "__speaking_low__");
    } catch {
      setErrorKey("lesson.speaking.checkFailed");
      setPhase("idle");
    }
  };

  const { start, stop } = useSpeechRecorder({
    maxSeconds: MAX_RECORD_SECONDS,
    onResult: handleWav,
    onError: (code) => {
      setPhase("idle");
      setErrorKey(
        code === "unsupported"
          ? "lesson.speaking.notSupportedHere"
          : code === "permission"
          ? "lesson.speaking.micDenied"
          : code === "too_short"
            ? "lesson.speaking.tooShort"
            : "lesson.speaking.micFailed",
      );
    },
  });

  const handleMicPress = async () => {
    if (locked || phase === "analyzing") return;
    if (phase === "recording") {
      stop();
      return;
    }
    setErrorKey(null);
    setResult(null);
    const started = await start();
    if (started) setPhase("recording");
  };

  const scoreTone = (() => {
    if (!result) return TONE.good;
    if (result.passed) return TONE.good;
    return result.scores.pron >= result.threshold.pron - 15
      ? TONE.warn
      : TONE.bad;
  })();

  const hintKey =
    errorKey ??
    (phase === "recording"
      ? "lesson.speaking.listening"
      : phase === "analyzing"
        ? "lesson.speaking.analyzing"
        : phase === "idle"
          ? "lesson.speaking.tapToSpeak"
          : null);

  return (
    <Animated.View entering={FadeIn.duration(150)} style={s.container}>
      <Text style={s.title}>{question.question}</Text>

      {/* 말풍선(위) + 캐릭터(아래) */}
      <View style={s.npcArea}>
        <View style={s.bubble}>
          <TouchableOpacity onPress={() => speak(question.answer)} hitSlop={8}>
            <Ionicons
              name="volume-high"
              size={24}
              color={isSpeaking ? theme.primary : MIC_BLUE}
            />
          </TouchableOpacity>
          <View style={s.bubbleTextWrap}>
            <Text style={s.bubbleText}>{question.answer}</Text>
            <View style={s.dashedUnderline} />
          </View>
          {/* 꼬리 (아래 방향) */}
          <View style={s.tailBorder} />
          <View style={s.tailInner} />
        </View>

        <LessonCharacter
          state={answerState}
          seed={question.id}
          height={result ? 100 : 230}
        />
      </View>

      {/* 발음 결과 카드 */}
      {result && (
        <Animated.View entering={FadeIn.duration(220)} style={s.resultCard}>
          <View style={s.resultHead}>
            <Text style={[s.scoreValue, { color: scoreTone.border }]}>
              {result.scores.pron}
            </Text>
            <Text style={s.scoreLabel}>{t("lesson.speaking.scoreLabel")}</Text>
          </View>

          {/* 단어별 점수 — 어디가 문제였는지 보여주는 게 핵심 */}
          <View style={s.wordRow}>
            {result.words.map((w, i) => {
              const tone = TONE[wordToneOf(w)];
              return (
                <View
                  key={`${w.word}-${i}`}
                  style={[
                    s.wordChip,
                    { backgroundColor: tone.bg, borderBottomColor: tone.border },
                  ]}
                >
                  <Text style={[s.wordChipText, { color: tone.text }]}>
                    {w.word}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={s.metricRow}>
            {(
              [
                ["lesson.speaking.accuracy", result.scores.accuracy],
                ["lesson.speaking.fluency", result.scores.fluency],
                ["lesson.speaking.completeness", result.scores.completeness],
              ] as const
            ).map(([key, value]) => (
              <View key={key} style={s.metric}>
                <Text style={s.metricValue}>{value}</Text>
                <Text style={s.metricLabel}>{t(key)}</Text>
              </View>
            ))}
          </View>

          {!!result.transcript && result.transcript !== result.referenceText && (
            <Text style={s.heard} numberOfLines={2}>
              {t("lesson.speaking.heard")} · {result.transcript}
            </Text>
          )}
        </Animated.View>
      )}


      <View style={{ flex: 1 }} />

      {/* 상태 안내 */}
      {!!hintKey && !locked && (
        <Text style={[s.hint, errorKey ? s.hintError : null]}>{t(hintKey)}</Text>
      )}

      {/* 가로 마이크 바 */}
      <TouchableOpacity
        style={[s.micBar, locked && s.micBarLocked]}
        onPress={handleMicPress}
        disabled={locked || phase === "analyzing"}
        activeOpacity={0.9}
      >
        {phase === "recording" ? (
          <View style={s.waveRow}>
            {Array.from({ length: 11 }).map((_, i) => (
              <WaveBar key={i} index={i} active />
            ))}
          </View>
        ) : phase === "analyzing" ? (
          <AnalyzingSpinner />
        ) : (
          <Ionicons name="mic" size={32} color="#fff" />
        )}
      </TouchableOpacity>

      {/* 건너뛰기 */}
      <TouchableOpacity onPress={onSkip} style={s.skipBtn}>
        <Text style={s.skipText}>{t("lesson.speakingSkip")}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = (theme: ThemeColors, bottomInset = 0) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: bottomInset + 12,
    },
    title: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 20,
    },

    npcArea: { alignItems: "center" },
    bubble: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: theme.border,
      paddingVertical: 16,
      paddingHorizontal: 18,
      alignSelf: "stretch",
      marginBottom: 22,
      position: "relative",
    },
    bubbleTextWrap: { flex: 1 },
    bubbleText: { fontSize: 14, color: theme.text, fontWeight: "600" },
    dashedUnderline: {
      borderBottomWidth: 1.5,
      borderBottomColor: theme.textSecondary,
      borderStyle: "dashed",
      marginTop: 6,
    },
    // 꼬리 (아래 방향) - 테두리
    tailBorder: {
      position: "absolute",
      left: 40,
      bottom: -12,
      width: 0,
      height: 0,
      borderLeftWidth: 9,
      borderRightWidth: 9,
      borderTopWidth: 12,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderTopColor: theme.border,
    },
    // 꼬리 (안쪽)
    tailInner: {
      position: "absolute",
      left: 42,
      bottom: -8,
      width: 0,
      height: 0,
      borderLeftWidth: 7,
      borderRightWidth: 7,
      borderTopWidth: 10,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderTopColor: theme.surface,
    },

    // 발음 결과 카드
    resultCard: {
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: theme.border,
      paddingVertical: 14,
      paddingHorizontal: 16,
      marginTop: 14,
      marginBottom: 14,
    },
    resultHead: { flexDirection: "row", alignItems: "baseline", gap: 8 },
    scoreValue: { fontSize: 34, fontWeight: "900", letterSpacing: -1 },
    scoreLabel: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    wordRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
      marginTop: 10,
    },
    wordChip: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 10,
      borderBottomWidth: 3,
    },
    wordChipText: { fontSize: 15, fontWeight: "800" },
    metricRow: {
      flexDirection: "row",
      marginTop: 12,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    metric: { flex: 1, alignItems: "center" },
    metricValue: { fontSize: 16, fontWeight: "800", color: theme.text },
    metricLabel: {
      fontSize: 11,
      fontWeight: "600",
      color: theme.textSecondary,
      marginTop: 2,
    },
    heard: {
      marginTop: 10,
      fontSize: 12,
      fontWeight: "600",
      color: theme.textSecondary,
    },

    hint: {
      textAlign: "center",
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
      marginBottom: 10,
    },
    hintError: { color: "#FF4B4B" },

    // 가로 마이크 바
    micBar: {
      height: 60,
      width: 150,
      borderRadius: 18,
      backgroundColor: MIC_BLUE,
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 4,
      borderBottomColor: MIC_BLUE_DARK,
      marginBottom: 12,
      alignSelf: "center",
    },
    micBarLocked: { opacity: 0.4 },
    waveRow: { flexDirection: "row", alignItems: "center", height: 36 },

    skipBtn: { alignItems: "center", paddingVertical: 14 },
    skipText: { fontSize: 15, color: theme.textSecondary, fontWeight: "700" },
  });
