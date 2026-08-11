import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useSpeech } from "@/hooks/useSpeech";
import CheckButton from "../CheckButton";
import BlankSentence from "../BlankSentence";
import {
  blankCount,
  isComplete,
  parseBlanks,
  templateOf,
  toAnswerPayload,
} from "@/utils/blank-sentence";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  theme: ThemeColors;
}

export default function FillInBlank({
  question,
  answerState,
  onAnswer,
  theme,
}: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const s = styles(theme, insets.bottom);
  const { speak } = useSpeech();
  const locked = answerState !== "idle";

  const options = question.options ?? [];

  // 빈칸 개수만큼 슬롯을 잡는다. 기존 단일 빈칸 문항은
  // sentencePrefix + ___ + sentenceSuffix 로 조립되어 그대로 동작한다.
  const tokens = useMemo(
    () => parseBlanks(templateOf(question)),
    [
      question.sentenceTemplate,
      question.sentencePrefix,
      question.sentenceSuffix,
    ],
  );
  const total = blankCount(tokens);

  const [values, setValues] = useState<(string | null)[]>(() =>
    Array(total).fill(null),
  );
  const [activeIndex, setActiveIndex] = useState(0);

  // 문제가 바뀌면 초기화
  useEffect(() => {
    setValues(Array(total).fill(null));
    setActiveIndex(0);
  }, [question.id, total]);

  /** 선택지 탭: 이미 쓰인 값이면 회수, 아니면 활성 빈칸에 채운다 */
  const pickOption = (opt: string) => {
    if (locked) return;
    setValues((prev) => {
      const used = prev.indexOf(opt);
      if (used !== -1) {
        const next = [...prev];
        next[used] = null;
        setActiveIndex(used);
        return next;
      }
      const target =
        prev[activeIndex] === null ? activeIndex : prev.indexOf(null);
      if (target === -1) return prev;
      const next = [...prev];
      next[target] = opt;
      const following = next.findIndex((v) => v === null);
      setActiveIndex(following === -1 ? target : following);
      return next;
    });
  };

  const clearBlank = (index: number) => {
    if (locked) return;
    setActiveIndex(index);
    setValues((prev) => {
      if (prev[index] === null) return prev;
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const complete = isComplete(tokens, values);

  const check = () => {
    if (!complete || locked) return;
    onAnswer(toAnswerPayload(question, tokens, values));
  };

  return (
    <Animated.View entering={FadeInDown.duration(400)} style={s.container}>
      <Text style={s.title}>{t("lesson.fillBlank")}</Text>

      {/* 문장 + 빈칸 (빈칸 개수 제한 없음) */}
      <View style={s.sentenceBox}>
        <View style={s.sentenceRow}>
          <BlankSentence
            tokens={tokens}
            values={values}
            theme={theme}
            answerState={answerState}
            mode="select"
            activeIndex={activeIndex}
            onBlankPress={clearBlank}
            fontSize={21}
          />
        </View>
        {question.answer ? (
          <TouchableOpacity
            onPress={() => speak(question.answer)}
            hitSlop={10}
            style={s.speak}
          >
            <Ionicons name="volume-medium" size={22} color="#4A90D9" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* 선택지 */}
      <View style={s.optionsRow}>
        {options.map((opt) => {
          const isSel = values.includes(opt);
          return (
            <TouchableOpacity
              key={opt}
              disabled={locked}
              onPress={() => pickOption(opt)}
              style={[
                s.option,
                isSel && {
                  borderColor: theme.primary,
                  backgroundColor: theme.primary + "14",
                },
              ]}
            >
              <Text style={[s.optionText, isSel && { color: theme.primary }]}>
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <CheckButton
        onPress={check}
        disabled={!complete || locked}
        theme={theme}
      />
    </Animated.View>
  );
}

const styles = (theme: ThemeColors, bottomInset = 0) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 12,
    },
    title: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 28,
    },
    sentenceBox: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderRadius: 16,
      padding: 20,
      marginBottom: 36,
    },
    sentenceRow: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
    },
    speak: { padding: 4 },
    optionsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      marginBottom: 24,
    },
    option: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 20,
    },
    optionText: { fontSize: 18, fontWeight: "800", color: theme.text },
  });
