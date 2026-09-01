import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { shuffle } from "@/utils/shuffle";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  theme: ThemeColors;
  combo?: number;
}

/** 취소선이 좌→우로 그어지는 단어 칩 */
function StrikeWord({
  word,
  struck,
  theme,
}: {
  word: string;
  struck: boolean;
  theme: ThemeColors;
}) {
  const w = useSharedValue(0);
  if (struck && w.value === 0) {
    w.value = withTiming(100, { duration: 350 });
  }
  const line = useAnimatedStyle(() => ({ width: `${w.value}%` }));
  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "700", color: "#FF4B4B" }}>
        {word}
      </Text>
      <Animated.View
        style={[
          {
            position: "absolute",
            top: "50%",
            left: 0,
            height: 2.5,
            backgroundColor: "#FF4B4B",
            borderRadius: 2,
          },
          line,
        ]}
      />
    </View>
  );
}

export default function ErrorHunt({
  question,
  answerState,
  onAnswer,
  theme,
}: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const s = styles(theme, insets.bottom);
  const locked = answerState !== "idle";

  // npcText = 오류가 든 문장, wrongWord = 틀린 단어, options = 교정 후보, answer = 올바른 단어
  const words = (question.npcText ?? "").split(" ");
  const [foundIdx, setFoundIdx] = useState<number | null>(null);
  const [missedIdx, setMissedIdx] = useState<number | null>(null);
  const [fix, setFix] = useState<string | null>(null);

  // 시드는 정답을 첫 칸에 적어 둔다(사람이 읽고 검수하기 좋게). 그대로 내보내면
  // 두 번째 풀 때부터 내용이 아니라 자리로 답을 외운다. question.id 로 고정해서
  // 한 문제 안에서는 다시 섞이지 않게 한다.
  const options = useMemo(
    () => shuffle(question.options ?? []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [question.id],
  );

  const shakeX = useSharedValue(0);
  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  const stage = foundIdx !== null ? 2 : 1;

  const tapWord = (idx: number) => {
    if (locked || stage === 2) return;
    if (words[idx] === question.wrongWord) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setFoundIdx(idx);
    } else {
      // 잘못 찍음 → 셰이크 후 바로 오답 제출 (원샷)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setMissedIdx(idx);
      shakeX.value = withSequence(
        withTiming(-8, { duration: 50 }),
        withTiming(8, { duration: 50 }),
        withTiming(-6, { duration: 50 }),
        withTiming(6, { duration: 50 }),
        withTiming(0, { duration: 50 }),
      );
      setTimeout(() => onAnswer("__wrong_tap__"), 350);
    }
  };

  const check = () => {
    if (!fix || locked) return;
    onAnswer(fix);
  };

  return (
    <View style={s.container}>
      <Animated.Text entering={FadeIn.duration(150)} style={s.title}>
        {stage === 1 ? t("lesson.errorHunt") : t("lesson.errorHuntFix")}
      </Animated.Text>

      {/* 탐정 배지 */}
      <Animated.View entering={FadeIn.duration(150)} style={s.badge}>
        <Text style={s.badgeEmoji}>🕵️</Text>
        <Text style={s.badgeText}>
          {stage === 1 ? t("lesson.errorHuntHint") : t("lesson.errorHuntFound")}
        </Text>
      </Animated.View>

      {/* 문장 — 단어별 탭 */}
      <Animated.View
        entering={FadeIn.duration(150)}
        style={[s.sentenceCard, shakeStyle]}
      >
        <View style={s.wordsWrap}>
          {words.map((w, i) => {
            const isFound = foundIdx === i;
            const isMissed = missedIdx === i;
            return (
              <TouchableOpacity
                key={`${w}-${i}`}
                disabled={locked || stage === 2}
                onPress={() => tapWord(i)}
                activeOpacity={0.7}
                style={[
                  s.word,
                  isFound && s.wordFound,
                  isMissed && s.wordMissed,
                ]}
              >
                {isFound ? (
                  <StrikeWord word={w} struck theme={theme} />
                ) : (
                  <Text style={[s.wordText, isMissed && { color: "#FF4B4B" }]}>
                    {w}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>

      <View style={{ flex: 1 }}>
        {/* 2단계: 교정 선택지 슬라이드 인 */}
        {stage === 2 ? (
          <Animated.View entering={FadeIn.duration(150)} style={s.fixArea}>
            {options.map((opt) => {
              const isSel = fix === opt;
              return (
                <Animated.View key={opt} entering={FadeIn.duration(150)}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    disabled={locked}
                    onPress={() => {
                      Haptics.selectionAsync();
                      setFix((p) => (p === opt ? null : opt));
                    }}
                    style={[s.fixOption, isSel && s.fixOptionSelected]}
                  >
                    <Text
                      style={[
                        s.fixOptionText,
                        isSel && { color: theme.primary },
                      ]}
                    >
                      {opt}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </Animated.View>
        ) : null}
      </View>

      <TouchableOpacity
        style={[
          s.checkBtn,
          (stage === 1 || !fix || locked) && s.checkBtnDisabled,
        ]}
        onPress={check}
        disabled={stage === 1 || !fix || locked}
        activeOpacity={0.9}
      >
        <Text style={s.checkBtnText}>{t("lesson.check")}</Text>
      </TouchableOpacity>
    </View>
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
      fontSize: 20,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 12,
    },
    badge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      alignSelf: "flex-start",
      backgroundColor: theme.primary + "14",
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginBottom: 16,
    },
    badgeEmoji: { fontSize: 16 },
    badgeText: { fontSize: 13, fontWeight: "700", color: theme.primary },
    sentenceCard: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderBottomWidth: 4,
      padding: 20,
    },
    wordsWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      justifyContent: "center",
    },
    word: {
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: "transparent",
    },
    wordFound: {
      backgroundColor: "#FF4B4B14",
      borderColor: "#FF4B4B",
    },
    wordMissed: {
      backgroundColor: "#FF4B4B14",
      borderColor: "#FF4B4B",
    },
    wordText: { fontSize: 20, fontWeight: "700", color: theme.text },
    fixArea: { marginTop: 20, gap: 10 },
    fixOption: {
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 16,
      paddingVertical: 15,
      alignItems: "center",
      marginBottom: 10,
    },
    fixOptionSelected: {
      borderColor: theme.primary,
      backgroundColor: theme.primary + "10",
    },
    fixOptionText: { fontSize: 17, fontWeight: "700", color: theme.text },
    checkBtn: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: "center",
      marginTop: 12,
      borderBottomWidth: 4,
      borderBottomColor: "#5B52C7",
    },
    checkBtnDisabled: {
      backgroundColor: theme.border,
      borderBottomColor: theme.border,
    },
    checkBtnText: { color: "#fff", fontSize: 17, fontWeight: "800" },
  });
