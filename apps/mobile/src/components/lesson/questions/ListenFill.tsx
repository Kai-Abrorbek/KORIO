import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSpeech } from "@/hooks/useSpeech";
import LessonCharacter from "../LessonCharacter";
import CheckButton from "../CheckButton";
import BlankSentence from "../BlankSentence";
import {
  answersOf,
  blankCount,
  fillTemplate,
  isComplete,
  parseBlanks,
  templateOf,
  toAnswerPayload,
} from "@/utils/blank-sentence";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  isChecking?: boolean;
  onSkip?: () => void;
  theme: ThemeColors;
}

export default function ListenFill({
  question,
  answerState,
  onAnswer,
  isChecking = false,
  onSkip,
  theme,
}: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const s = styles(theme, insets.bottom);
  const inputRefs = useRef<Record<number, TextInput | null>>({});
  const { speak, speakSlow, speakAuto, isSpeaking } = useSpeech();

  const locked = answerState !== "idle" || isChecking;

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

  // 듣기용 정답 문장 (빈칸에 정답을 채운 전체 문장)
  const audioText = useMemo(
    () => fillTemplate(tokens, answersOf(question)),
    [tokens, question.blankAnswers, question.answer],
  );

  // 문제 진입 시 자동 재생 (문제 바뀌면 다시 1회)
  useEffect(() => {
    if (!audioText) return;
    // 화면이 먼저 그려진 직후 자연스럽게 자동 재생을 시작한다.
    const id = setTimeout(() => speakAuto(audioText), 200);
    return () => clearTimeout(id);
  }, [audioText]);

  const underlineColor =
    answerState === "correct"
      ? "#1CB454"
      : answerState === "wrong"
        ? "#FF4B4B"
        : theme.primary;

  const complete = isComplete(tokens, values);

  const handleCheck = () => {
    if (!complete || locked) return;
    onAnswer(toAnswerPayload(question, tokens, values));
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.View entering={FadeIn.duration(150)} style={s.container}>
        {/* 위 영역: 키보드 뜨면 스크롤 */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={s.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={s.title}>
            {question.question || t("lesson.fillMissing")}
          </Text>

          {/* 캐릭터 + 말풍선(스피커 2개) */}
          <View style={s.npcRow}>
            <LessonCharacter
              state={answerState}
              seed={question.id}
              height={160}
            />
            <View style={s.bubble}>
              <View style={s.tailBorder} />
              <View style={s.tailInner} />
              <TouchableOpacity
                style={s.audioMain}
                onPress={() => speak(audioText)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="volume-high"
                  size={28}
                  color={isSpeaking ? theme.primary : "#1CB0F6"}
                />
              </TouchableOpacity>
              <View style={s.audioDivider} />
              <TouchableOpacity
                style={s.audioSlow}
                onPress={() => speakSlow(audioText)}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons
                  name="turtle"
                  size={26}
                  color="#1CB0F6"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* 회색 입력 카드: 인라인 빈칸 */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => inputRefs.current[0]?.focus()}
            style={s.inputCard}
          >
            <BlankSentence
              tokens={tokens}
              values={values}
              theme={theme}
              answerState={answerState}
              mode="input"
              onChange={setValue}
              onSubmit={handleCheck}
              autoFocusFirst
              fontSize={21}
            />
          </TouchableOpacity>
        </ScrollView>

        {/* 하단 고정: 건너뛰기 + 확인 (키보드 위로 따라 올라옴) */}
        <CheckButton
          onPress={handleCheck}
          disabled={!complete || locked}
          loading={isChecking}
          theme={theme}
          skipLabel={onSkip && !locked ? t("lesson.skipListening") : undefined}
          onSkip={onSkip}
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
    scrollContent: { paddingBottom: 16 },
    title: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
    },

    npcRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 24,
    },
    bubble: {
      flex: 1,
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: theme.border,
      flexDirection: "row",
      alignItems: "center",
      minHeight: 76,
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
    audioMain: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 18,
    },
    audioDivider: {
      width: 2,
      alignSelf: "stretch",
      backgroundColor: theme.border,
    },
    audioSlow: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 18,
    },

    inputCard: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: theme.border,
      paddingVertical: 24,
      paddingHorizontal: 18,
      minHeight: 180,
    },
  });
