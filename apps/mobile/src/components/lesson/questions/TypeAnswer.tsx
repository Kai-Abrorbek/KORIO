import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useRef, useState } from "react";

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

  const handleCheck = () => {
    if (!input.trim() || answerState !== "idle") return;
    onAnswer(input.trim());
  };

  const borderColor =
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
        {/* NPC + 말풍선 */}
        <View style={s.npcRow}>
          <View style={s.avatar}>
            <Text style={{ fontSize: 32 }}>👩</Text>
          </View>
          <View style={s.bubble}>
            <Text style={s.bubbleText}>
              {question.sentencePrefix
                ? `${question.sentencePrefix} _____${question.sentenceSuffix ?? ""}`
                : question.question}
            </Text>
          </View>
        </View>

        {/* 인풋 박스 */}
        <View style={[s.inputBox, { borderColor }]}>
          <Text style={s.prefix}>{question.sentencePrefix} </Text>
          <TextInput
            ref={inputRef}
            style={[s.input, { color: theme.text }]}
            value={input}
            onChangeText={setInput}
            placeholder={t("lesson.typeHere")}
            placeholderTextColor={theme.textSecondary}
            editable={answerState === "idle"}
            autoFocus
            onSubmitEditing={handleCheck}
          />
          <Text style={s.suffix}>{question.sentenceSuffix}</Text>
        </View>

        {/* 확인 버튼 */}
        <TouchableOpacity
          style={[
            s.checkBtn,
            (!input.trim() || answerState !== "idle") && s.checkBtnDisabled,
          ]}
          onPress={handleCheck}
          disabled={!input.trim() || answerState !== "idle"}
        >
          <Text style={s.checkBtnText}>{t("lesson.check")}</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20, paddingTop: 8 },
    npcRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 12,
      marginBottom: 32,
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    bubble: {
      flex: 1,
      backgroundColor: theme.surface,
      borderRadius: 16,
      borderTopLeftRadius: 4,
      padding: 14,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    bubbleText: {
      fontSize: 15,
      color: theme.text,
      lineHeight: 22,
      fontWeight: "500",
    },
    inputBox: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 14,
      backgroundColor: theme.surface,
      marginBottom: 24,
      gap: 4,
    },
    prefix: { fontSize: 18, color: theme.text, fontWeight: "500" },
    input: {
      flex: 1,
      fontSize: 18,
      fontWeight: "700",
      minWidth: 80,
      borderBottomWidth: 2,
      borderBottomColor: theme.primary,
      paddingBottom: 2,
    },
    suffix: { fontSize: 18, color: theme.text },
    checkBtn: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: "center",
    },
    checkBtnDisabled: { backgroundColor: theme.border },
    checkBtnText: { color: "#fff", fontSize: 17, fontWeight: "800" },
  });
