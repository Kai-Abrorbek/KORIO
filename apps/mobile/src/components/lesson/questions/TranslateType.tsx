import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Animated, {
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useSpeechRecorder } from "@/hooks/useSpeechRecorder";
import { SttService } from "@/services/stt.service";
import CheckButton from "../CheckButton";

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
  const insets = useSafeAreaInsets();
  const s = styles(theme, insets.bottom);
  const [input, setInput] = useState("");
  const [transcribing, setTranscribing] = useState(false);
  const [voiceErrorKey, setVoiceErrorKey] = useState<string | null>(null);

  const locked = answerState !== "idle";
  const borderColor =
    answerState === "correct"
      ? "#1CB454"
      : answerState === "wrong"
        ? "#FF4B4B"
        : theme.border;

  // 여기선 발음 평가가 아니라 받아쓰기만 한다 — 인식 결과를 입력칸에 채워주고
  // 채점은 기존 텍스트 비교 로직이 그대로 한다.
  const { isRecording, start, stop } = useSpeechRecorder({
    maxSeconds: 15,
    onResult: async (wav) => {
      setTranscribing(true);
      try {
        const res = await SttService.transcribe(wav);
        if (res.status === "success" && res.text.trim()) {
          setInput(res.text.trim());
        } else {
          setVoiceErrorKey("lesson.speaking.noSpeech");
        }
      } catch {
        setVoiceErrorKey("lesson.speaking.checkFailed");
      } finally {
        setTranscribing(false);
      }
    },
    onError: (code) =>
      setVoiceErrorKey(
        code === "unsupported"
          ? "lesson.speaking.notSupportedHere"
          : code === "permission"
          ? "lesson.speaking.micDenied"
          : code === "too_short"
            ? "lesson.speaking.tooShort"
            : "lesson.speaking.micFailed",
      ),
  });

  const recording = isRecording;

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

  const toggleVoice = () => {
    if (locked || transcribing) return;
    if (recording) {
      stop();
      return;
    }
    setVoiceErrorKey(null);
    void start();
  };

  const check = () => {
    if (!input.trim() || locked) return;
    onAnswer(input.trim());
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.View entering={FadeIn.duration(150)} style={s.container}>
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
          <Text style={s.sourceText}>
            {(question.sourceText ?? "") || question.npcText}
          </Text>
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
            {recording
              ? t("lesson.recording")
              : transcribing
                ? t("lesson.speaking.analyzing")
                : t("lesson.tapToSpeak")}
          </Text>
        </TouchableOpacity>

        {!!voiceErrorKey && !locked && (
          <Text style={s.voiceError}>{t(voiceErrorKey)}</Text>
        )}

        <CheckButton
          onPress={check}
          disabled={!input.trim() || locked}
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
    voiceError: {
      textAlign: "center",
      fontSize: 12,
      fontWeight: "700",
      color: "#FF4B4B",
      marginTop: 8,
    },
    micText: { fontSize: 17, fontWeight: "800", color: MIC_BLUE },
  });
