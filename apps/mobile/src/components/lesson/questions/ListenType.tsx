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
import { useEffect, useRef, useState } from "react";
import {
  AUTO_SPEECH_DELAY_MS,
  type SpeechController,
} from "@/hooks/useSpeech";
import LessonCharacter from "../LessonCharacter";
import CheckButton from "../CheckButton";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  isChecking?: boolean;
  onSkip?: () => void;
  theme: ThemeColors;
  speech: SpeechController;
}

export default function ListenType({
  question,
  answerState,
  onAnswer,
  isChecking = false,
  onSkip,
  theme,
  speech,
}: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const s = styles(theme, insets.bottom);
  const [input, setInput] = useState("");
  const inputRef = useRef<TextInput>(null);
  const { speak, speakSlow, speakAuto, isSpeaking } = speech;

  const locked = answerState !== "idle" || isChecking;
  const audioText = question.answer;

  // 문제 진입 시 자동 재생 (문제 바뀌면 다시 1회)
  useEffect(() => {
    if (!audioText) return;
    // 화면이 먼저 그려진 직후 자연스럽게 자동 재생을 시작한다.
    const id = setTimeout(() => speakAuto(audioText), AUTO_SPEECH_DELAY_MS);
    return () => clearTimeout(id);
  }, [audioText, speakAuto]);

  const handleCheck = () => {
    if (!input.trim() || locked) return;
    onAnswer(input.trim());
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.View entering={FadeIn.duration(150)} style={s.container}>
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
            <LessonCharacter
              state={answerState}
              seed={question.id}
              height={170}
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
        <CheckButton
          onPress={handleCheck}
          disabled={!input.trim() || locked}
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
      fontSize: 24,
      fontWeight: "800",
      color: theme.text,
    },

    npcRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 28,
    },
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
  });
