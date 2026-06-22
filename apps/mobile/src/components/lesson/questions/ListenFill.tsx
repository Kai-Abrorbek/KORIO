import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useRef, useState } from "react";
import { useSpeech } from "@/hooks/useSpeech";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  onSkip?: () => void;
  theme: ThemeColors;
}

const CH_W = 15;

export default function ListenFill({
  question,
  answerState,
  onAnswer,
  onSkip,
  theme,
}: Props) {
  const { t } = useTranslation();
  const s = styles(theme);
  const [input, setInput] = useState("");
  const inputRef = useRef<TextInput>(null);
  const { speak, speakSlow, isSpeaking } = useSpeech();

  const locked = answerState !== "idle";
  const audioText = question.answer; // 듣기용 정답 문장(전체)
  const blankWidth = Math.max(90, (input.length || 6) * CH_W);

  const underlineColor =
    answerState === "correct"
      ? "#1CB454"
      : answerState === "wrong"
        ? "#FF4B4B"
        : theme.primary;

  const handleCheck = () => {
    if (!input.trim() || locked) return;
    onAnswer(input.trim());
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <Animated.View entering={FadeInDown.duration(400)} style={s.container}>
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
            <Image
              source={require("@/../assets/images/character.jpg")}
              style={s.character}
              resizeMode="contain"
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
            onPress={() => inputRef.current?.focus()}
            style={s.inputCard}
          >
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
                  onSubmitEditing={handleCheck}
                />
                {input.length === 0 && (
                  <Text style={s.dots} pointerEvents="none">
                    ·····
                  </Text>
                )}
                <View
                  style={[s.blankLine, { backgroundColor: underlineColor }]}
                />
              </View>

              {question.sentenceSuffix ? (
                <Text style={s.fix}> {question.sentenceSuffix}</Text>
              ) : null}
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* 하단 고정: 건너뛰기 + 확인 (키보드 위로 따라 올라옴) */}
        {onSkip && (
          <TouchableOpacity onPress={onSkip} style={s.skip} disabled={locked}>
            <Text style={s.skipText}>{t("lesson.skipListening")}</Text>
          </TouchableOpacity>
        )}
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
      paddingBottom: 12,
    },
    scrollContent: { paddingBottom: 16 },
    title: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 24,
    },

    npcRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 24,
    },
    character: { width: 130, height: 160 },
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
      top: "50%",
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
      top: "50%",
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
    sentence: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-end",
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

    skip: { alignItems: "center", paddingVertical: 14 },
    skipText: { fontSize: 15, color: theme.textSecondary, fontWeight: "700" },
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
