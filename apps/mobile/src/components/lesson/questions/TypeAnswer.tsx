import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSpeech } from "@/hooks/useSpeech";
import LessonCharacter from "../LessonCharacter";
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

export default function TypeAnswer({
  question,
  answerState,
  onAnswer,
  theme,
}: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const s = styles(theme, insets.bottom);
  const inputRefs = useRef<Record<number, TextInput | null>>({});
  const { speak, isSpeaking } = useSpeech();
  const locked = answerState !== "idle";
  const promptText = question.npcText ?? question.answer;

  // 빈칸 개수 제한 없음. 기존 단일 빈칸 문항은
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
    Array(total).fill(""),
  );

  useEffect(() => {
    setValues(Array(total).fill(""));
  }, [question.id, total]);

  const setValue = (index: number, text: string) =>
    setValues((prev) => {
      const next = [...prev];
      next[index] = text;
      return next;
    });

  const complete = isComplete(tokens, values);

  const handleCheck = () => {
    if (!complete || locked) return;
    onAnswer(toAnswerPayload(question, tokens, values));
  };

  const underlineColor =
    answerState === "correct"
      ? "#1CB454"
      : answerState === "wrong"
        ? "#FF4B4B"
        : theme.primary;

  return (
    <View style={{ flex: 1 }}>
      <Animated.View entering={FadeIn.duration(150)} style={s.container}>
        {/* 지시문 */}
        <Text style={s.title}>
          {question.question || t("lesson.translateSentence")}
        </Text>

        {/* 캐릭터 + 말풍선 */}
        <View style={s.npcRow}>
          <LessonCharacter
            state={answerState}
            seed={question.id}
            height={150}
          />
          <View style={s.bubble}>
            {/* 꼬리 */}
            <View style={s.tailBorder} />
            <View style={s.tailInner} />

            <TouchableOpacity onPress={() => speak(promptText)} hitSlop={8}>
              <Ionicons
                name="volume-medium"
                size={24}
                color={isSpeaking ? theme.primary : "#1A9BE6"}
              />
            </TouchableOpacity>
            <View style={s.bubbleTextWrap}>
              <Text style={s.bubbleText}>{promptText}</Text>
              <View style={s.dashedUnderline} />
            </View>
          </View>
        </View>

        {/* 빈칸 채우기 (빈칸 개수 제한 없음) */}
        <BlankSentence
          tokens={tokens}
          values={values}
          theme={theme}
          answerState={answerState}
          mode="input"
          onChange={setValue}
          onSubmit={handleCheck}
          autoFocusFirst
          fontSize={22}
        />

        <View style={{ flex: 1 }} />

        {/* 확인 버튼 (바닥 고정) */}
        <CheckButton
          onPress={handleCheck}
          disabled={!complete || locked}
          theme={theme}
        />
      </Animated.View>
    </View>
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
      marginBottom: 24,
    },

    // 캐릭터 + 말풍선
    npcRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 32,
    },
    bubble: {
      flex: 1,
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: theme.border,
      paddingVertical: 14,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      minHeight: 72,
      position: "relative",
    },
    tailBorder: {
      position: "absolute",
      left: -12,
      top: "15%",
      marginTop: -9,
      width: 0,
      height: 0,
      borderTopWidth: 9,
      borderBottomWidth: 9,
      borderRightWidth: 12,
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
      borderRightColor: theme.border,
    },
    tailInner: {
      position: "absolute",
      left: -8,
      top: "15%",
      marginTop: -7,
      width: 0,
      height: 0,
      borderTopWidth: 7,
      borderBottomWidth: 7,
      borderRightWidth: 10,
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
      borderRightColor: theme.surface,
    },
    bubbleTextWrap: { flex: 1 },
    bubbleText: {
      fontSize: 16,
      color: theme.text,
      fontWeight: "600",
      lineHeight: 24,
    },
    dashedUnderline: {
      borderBottomWidth: 1.5,
      borderBottomColor: theme.textSecondary,
      borderStyle: "dashed",
      marginTop: 4,
    },

    // 입력 밑줄 스타일

    // 확인 버튼
  });
