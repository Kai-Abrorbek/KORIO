import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  theme: ThemeColors;
}

const MIC_BLUE = "#1CB0F6";

export default function TranslateType({
  question,
  answerState,
  onAnswer,
  theme,
}: Props) {
  const { t } = useTranslation();
  const s = styles(theme);
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const recTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const locked = answerState !== "idle";
  const borderColor =
    answerState === "correct"
      ? "#1CB454"
      : answerState === "wrong"
        ? "#FF4B4B"
        : theme.border;

  // 마이크 펄스
  const pulse = useSharedValue(1);
  useEffect(() => {
    pulse.value = recording
      ? withRepeat(
          withSequence(
            withTiming(1.15, { duration: 450 }),
            withTiming(1, { duration: 450 }),
          ),
          -1,
        )
      : withTiming(1);
  }, [recording]);
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  useEffect(() => {
    recTimer.current && clearTimeout(recTimer.current);
  }, []);

  const toggleVoice = () => {
    if (locked) return;
    if (recording) {
      setRecording(false);
      if (recTimer.current) clearTimeout(recTimer.current);
      return;
    }
    setRecording(true);
    // TODO: 실제 STT 연결 시 여기서 인식 결과를 setInput 으로 채우기
    recTimer.current = setTimeout(() => {
      setRecording(false);
      setInput(question.answer); // mock: 일단 정답으로 채움 (Speaking mock과 동일)
    }, 2200);
  };

  const check = () => {
    if (!input.trim() || locked) return;
    onAnswer(input.trim());
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Animated.View entering={FadeInDown.duration(400)} style={s.container}>
        {question.hard && (
          <View style={s.hardRow}>
            <View style={s.hardBadge}>
              <MaterialCommunityIcons name="dumbbell" size={16} color="#fff" />
            </View>
            <Text style={s.hardText}>{t("lesson.hardPractice")}</Text>
          </View>
        )}

        <Text style={s.title}>
          {question.question || t("lesson.translateSentence")}
        </Text>

        {/* 번역할 원문 (점선 밑줄) */}
        <View style={s.source}>
          <Text style={s.sourceText}>{question.npcText}</Text>
        </View>

        {/* 입력 */}
        <TextInput
          style={[s.input, { borderColor, color: theme.text }]}
          value={input}
          onChangeText={setInput}
          placeholder={t("lesson.enterTranslation")}
          placeholderTextColor={theme.textSecondary}
          editable={!locked}
          multiline
          onSubmitEditing={check}
        />

        <View style={{ flex: 1 }} />

        {/* 탭하여 말하기 */}
        <TouchableOpacity
          style={[s.micBtn, recording && s.micBtnActive]}
          onPress={toggleVoice}
          disabled={locked}
          activeOpacity={0.85}
        >
          <Animated.View style={pulseStyle}>
            <Ionicons
              name="mic"
              size={24}
              color={recording ? "#fff" : MIC_BLUE}
            />
          </Animated.View>
          <Text style={[s.micText, recording && { color: "#fff" }]}>
            {recording ? t("lesson.recording") : t("lesson.tapToSpeak")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.checkBtn, (!input.trim() || locked) && s.checkBtnDisabled]}
          onPress={check}
          disabled={!input.trim() || locked}
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
    hardRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 14,
    },
    hardBadge: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: "#FF4B4B",
      alignItems: "center",
      justifyContent: "center",
    },
    hardText: { color: "#FF4B4B", fontSize: 16, fontWeight: "800" },
    title: {
      fontSize: 26,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 20,
      lineHeight: 34,
    },
    source: {
      alignSelf: "flex-start",
      borderBottomWidth: 2,
      borderColor: theme.border,
      borderStyle: "dashed",
      paddingBottom: 8,
      marginBottom: 24,
    },
    sourceText: {
      fontSize: 22,
      fontWeight: "600",
      color: theme.text,
      lineHeight: 30,
    },
    input: {
      minHeight: 130,
      borderWidth: 2,
      borderRadius: 16,
      padding: 16,
      fontSize: 18,
      fontWeight: "600",
      textAlignVertical: "top",
      backgroundColor: theme.surface,
    },
    micBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 16,
      paddingVertical: 16,
      marginBottom: 12,
    },
    micBtnActive: { backgroundColor: MIC_BLUE, borderColor: MIC_BLUE },
    micText: { fontSize: 17, fontWeight: "800", color: MIC_BLUE },
    checkBtn: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: "center",
    },
    checkBtnDisabled: { backgroundColor: theme.border },
    checkBtnText: { color: "#fff", fontSize: 17, fontWeight: "800" },
  });
