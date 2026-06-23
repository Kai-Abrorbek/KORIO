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

export default function ListenType({
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
  const audioText = question.answer;

  const handleCheck = () => {
    if (!input.trim() || locked) return;
    onAnswer(input.trim());
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Animated.View entering={FadeInDown.duration(400)} style={s.container}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={s.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={s.title}>
            {question.question || t("lesson.typeWhatYouHear")}
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

          {/* 회색 입력 박스 (전체 받아쓰기) */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
            style={s.inputCard}
          >
            <TextInput
              ref={inputRef}
              style={[s.input, { color: theme.text }]}
              value={input}
              onChangeText={setInput}
              placeholder={t("lesson.typeHeardEnglish")}
              placeholderTextColor={theme.textSecondary}
              editable={!locked}
              multiline
              onSubmitEditing={handleCheck}
            />
          </TouchableOpacity>
        </ScrollView>

        {/* 하단 고정 (키보드 위로 따라 올라옴) */}
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
      fontSize: 24,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 28,
    },

    npcRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 28,
    },
    character: { width: 130, height: 170 },
    bubble: {
      flex: 1,
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: theme.border,
      flexDirection: "row",
      alignItems: "center",
      minHeight: 90,
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
      paddingVertical: 22,
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
      paddingVertical: 22,
    },

    inputCard: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: theme.border,
      paddingVertical: 20,
      paddingHorizontal: 18,
      minHeight: 180,
    },
    input: {
      fontSize: 20,
      fontWeight: "600",
      textAlignVertical: "top",
      padding: 0,
      minHeight: 140,
    },

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
