import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useRef, useState } from "react";
import { useSpeech } from "@/hooks/useSpeech";

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
  const s = styles(theme);
  const [input, setInput] = useState("");
  const inputRef = useRef<TextInput>(null);
  const { speak, isSpeaking } = useSpeech();

  const locked = answerState !== "idle";
  const promptText = question.npcText ?? question.answer;
  const CH_W = 15; // 글자당 대략 폭(px). 폰트 크기 바뀌면 같이 조절
  const blankWidth = Math.max(90, (input.length || 6) * CH_W);

  const handleCheck = () => {
    if (!input.trim() || locked) return;
    onAnswer(input.trim());
  };

  const underlineColor =
    answerState === "correct"
      ? "#1CB454"
      : answerState === "wrong"
        ? "#FF4B4B"
        : theme.primary;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Animated.View entering={FadeInDown.duration(400)} style={s.container}>
        {/* 지시문 */}
        <Text style={s.title}>
          {question.question || t("lesson.translateSentence")}
        </Text>

        {/* 캐릭터 + 말풍선 */}
        <View style={s.npcRow}>
          <Image
            source={require("@/../assets/images/character.jpg")}
            style={s.character}
            resizeMode="contain"
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

        {/* 입력 - 밑줄 라인 스타일 */}
        {/* 빈칸 채우기 - 인라인 한 줄 */}
        <View style={s.sentence}>
          {question.sentencePrefix ? (
            <Text style={s.fix}>{question.sentencePrefix} </Text>
          ) : null}

          <View style={[s.blank, { width: blankWidth }]}>
            <TextInput
              ref={inputRef}
              style={[s.blankInput, { color: theme.text }]}
              value={input}
              onChangeText={setInput}
              editable={!locked}
              autoFocus
              onSubmitEditing={handleCheck}
            />
            {input.length === 0 && (
              <Text style={s.dots} pointerEvents="none">
                ·····
              </Text>
            )}
            <View style={[s.blankLine, { backgroundColor: underlineColor }]} />
          </View>

          {question.sentenceSuffix ? (
            <Text style={s.fix}> {question.sentenceSuffix}</Text>
          ) : null}
        </View>

        <View style={{ flex: 1 }} />

        {/* 확인 버튼 (바닥 고정) */}
        <TouchableOpacity
          style={[s.checkBtn, (!input.trim() || locked) && s.checkBtnDisabled]}
          onPress={handleCheck}
          disabled={!input.trim() || locked}
          activeOpacity={0.85}
        >
          <Text
            style={[
              s.checkBtnText,
              (!input.trim() || locked) && s.checkBtnTextDisabled,
            ]}
          >
            {t("lesson.check")}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 8,
      marginBottom: 40,
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
    character: { width: 120, height: 150 },
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
    sentence: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-end",
      marginTop: 8,
    },
    fix: { fontSize: 22, color: theme.text, fontWeight: "600", lineHeight: 40 },
    blank: { height: 40, justifyContent: "flex-end", marginHorizontal: 2 },
    blankInput: {
      fontSize: 22,
      fontWeight: "800",
      textAlign: "center",
      paddingVertical: 0,
      height: 34,
    },
    dots: {
      position: "absolute",
      alignSelf: "center",
      top: 6,
      fontSize: 20,
      letterSpacing: 4,
      color: theme.textSecondary,
      opacity: 0.45,
    },
    blankLine: { height: 2.5, borderRadius: 2, width: "100%" },

    // 확인 버튼
    checkBtn: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: "center",
    },
    checkBtnDisabled: { backgroundColor: theme.border },
    checkBtnText: { color: "#fff", fontSize: 17, fontWeight: "800" },
    checkBtnTextDisabled: { color: theme.textSecondary },
  });
