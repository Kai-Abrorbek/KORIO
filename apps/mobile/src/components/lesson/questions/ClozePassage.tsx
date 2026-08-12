import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Animated, {
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useState, useMemo, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  theme: ThemeColors;
  combo?: number;
}

/** 활성 빈칸 펄스 */
function PulseBlank({
  active,
  children,
  theme,
}: {
  active: boolean;
  children: React.ReactNode;
  theme: ThemeColors;
}) {
  // 활성 빈칸은 크기를 계속 흔들지 않는다. 반복 펄스는 시선을 계속 잡아끌어
  // 읽는 걸 방해한다. 선택 시 한 번만 살짝 눌렀다 돌아온다.
  const scale = useSharedValue(1);
  useEffect(() => {
    if (!active) return;
    scale.value = withSequence(
      withTiming(0.96, { duration: 90 }),
      withSpring(1, { damping: 12, stiffness: 220 }),
    );
  }, [active]);
  const anim = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return <Animated.View style={anim}>{children}</Animated.View>;
}

export default function ClozePassage({
  question,
  answerState,
  onAnswer,
  theme,
}: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const s = styles(theme, insets.bottom);
  const locked = answerState !== "idle";

  // passage 의 ___ 가 빈칸. answer = "단어1|단어2|..."
  const parts = useMemo(
    () => (question.passage ?? "").split("___"),
    [question.passage],
  );
  const blankCount = parts.length - 1;
  const [filled, setFilled] = useState<(string | null)[]>(
    Array(blankCount).fill(null),
  );

  const bank = useMemo(
    () => [...(question.options ?? [])].sort(() => Math.random() - 0.5),
    [question.options],
  );
  const usedWords = filled.filter(Boolean) as string[];
  const activeIdx = filled.findIndex((f) => f === null);
  const allFilled = activeIdx === -1;

  const placeWord = (word: string) => {
    if (locked || allFilled) return;
    Haptics.selectionAsync();
    setFilled((prev) => {
      const next = [...prev];
      next[next.findIndex((f) => f === null)] = word;
      return next;
    });
  };

  const removeWord = (idx: number) => {
    if (locked) return;
    Haptics.selectionAsync();
    setFilled((prev) => {
      const next = [...prev];
      next[idx] = null;
      return next;
    });
  };

  const check = () => {
    if (!allFilled || locked) return;
    onAnswer(usedWords.join("|"));
  };

  return (
    <View style={s.container}>
      <Animated.Text entering={FadeIn.duration(150)} style={s.title}>
        {t("lesson.clozePassage")}
      </Animated.Text>

      {/* 진행 점 */}
      <View style={s.dots}>
        {filled.map((f, i) => (
          <View
            key={i}
            style={[s.dot, f ? s.dotFilled : i === activeIdx && s.dotActive]}
          />
        ))}
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 8 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 지문 + 인라인 빈칸 */}
        <Animated.View entering={FadeIn.duration(150)} style={s.paper}>
          <Text style={s.passageWrap}>
            {parts.map((part, i) => (
              <Text key={i}>
                <Text style={s.passage}>{part}</Text>
                {i < blankCount ? (
                  <Text
                    onPress={() => filled[i] && removeWord(i)}
                    style={[
                      s.blankInline,
                      filled[i]
                        ? s.blankFilled
                        : i === activeIdx
                          ? s.blankActive
                          : s.blankIdle,
                    ]}
                  >
                    {" "}
                    {filled[i] ?? "＿＿＿"}{" "}
                  </Text>
                ) : null}
              </Text>
            ))}
          </Text>
        </Animated.View>

        {/* 단어 뱅크 */}
        <View style={s.bank}>
          {bank.map((word, i) => {
            const used = usedWords.includes(word);
            return (
              <Animated.View
                key={`${word}-${i}`}
                entering={FadeIn.duration(150)}
              >
                <PulseBlank active={false} theme={theme}>
                  <TouchableOpacity
                    disabled={locked || used}
                    onPress={() => placeWord(word)}
                    activeOpacity={0.8}
                    style={[s.chip, used && s.chipUsed]}
                  >
                    <Text style={[s.chipText, used && s.chipTextUsed]}>
                      {word}
                    </Text>
                  </TouchableOpacity>
                </PulseBlank>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[s.checkBtn, (!allFilled || locked) && s.checkBtnDisabled]}
        onPress={check}
        disabled={!allFilled || locked}
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
      marginBottom: 10,
    },
    dots: { flexDirection: "row", gap: 6, marginBottom: 14 },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.border,
    },
    dotActive: { backgroundColor: theme.primary + "66", width: 20 },
    dotFilled: { backgroundColor: theme.primary },
    paper: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderBottomWidth: 4,
      padding: 20,
      marginBottom: 18,
    },
    passageWrap: { lineHeight: 34 },
    passage: {
      fontSize: 17,
      lineHeight: 34,
      color: theme.text,
      fontWeight: "500",
    },
    blankInline: {
      fontSize: 17,
      fontWeight: "800",
      lineHeight: 34,
    },
    blankIdle: { color: theme.textSecondary },
    blankActive: {
      color: theme.primary,
      textDecorationLine: "underline",
    },
    blankFilled: {
      color: theme.primary,
      backgroundColor: theme.primary + "14",
    },
    bank: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      justifyContent: "center",
    },
    chip: {
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderBottomWidth: 3,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 11,
    },
    chipUsed: {
      backgroundColor: theme.border,
      borderColor: theme.border,
    },
    chipText: { fontSize: 16, fontWeight: "700", color: theme.text },
    chipTextUsed: { color: "transparent" },
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
