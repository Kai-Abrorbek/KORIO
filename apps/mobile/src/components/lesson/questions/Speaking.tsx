import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  cancelAnimation,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSpeech } from "@/hooks/useSpeech";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  onSkip: () => void;
  theme: ThemeColors;
}

export default function Speaking({
  question,
  answerState,
  onAnswer,
  onSkip,
  theme,
}: Props) {
  const { t } = useTranslation();
  const s = styles(theme);
  const [isRecording, setIsRecording] = useState(false);
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.6);
  const { speak, speakSlow, isSpeaking } = useSpeech();
  const hasAutoPlayed = useRef(false);

  useEffect(() => {
    if (hasAutoPlayed.current) return;
    hasAutoPlayed.current = true;
    const timer = setTimeout(() => {
      speak(question.answer);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.4, { duration: 600 }),
        withTiming(1, { duration: 600 }),
      ),
      -1,
    );
    pulseOpacity.value = withRepeat(
      withSequence(
        withTiming(0.2, { duration: 600 }),
        withTiming(0.6, { duration: 600 }),
      ),
      -1,
    );
    // 실제 STT 연결 전 mock: 3초 후 정답 처리
    setTimeout(() => {
      stopRecording();
      onAnswer(question.answer);
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    cancelAnimation(pulseScale);
    cancelAnimation(pulseOpacity);
    pulseScale.value = withTiming(1);
    pulseOpacity.value = withTiming(0.6);
  };

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  return (
    <Animated.View entering={FadeInDown.duration(400)} style={s.container}>
      <Text style={s.title}>{question.question}</Text>

      {/* NPC + 말풍선 */}
      <View style={s.npcArea}>
        <View style={s.bubble}>
          <TouchableOpacity onPress={() => speak(question.answer)}>
            <Ionicons
              name="volume-high"
              size={22}
              color={isSpeaking ? theme.primary : "#58CC02"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => speakSlow(question.answer)}
            style={{ marginLeft: 8 }}
          >
            <Ionicons name="hourglass" size={20} color="#58CC02" />
          </TouchableOpacity>
          <Text style={s.bubbleText}>{question.answer}</Text>
        </View>
        <View style={s.npcWrapper}>
          <Text style={{ fontSize: 100 }}>🧑</Text>
        </View>
      </View>

      {/* 마이크 버튼 */}
      <View style={s.micArea}>
        {/* 펄스 링 */}
        <Animated.View style={[s.pulseRing, pulseStyle]} />
        <TouchableOpacity
          style={[s.micBtn, isRecording && s.micBtnActive]}
          onPress={isRecording ? stopRecording : startRecording}
          activeOpacity={0.85}
        >
          <Ionicons
            name={isRecording ? "stop" : "mic"}
            size={36}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* 건너뛰기 */}
      <TouchableOpacity onPress={onSkip} style={s.skipBtn}>
        <Text style={s.skipText}>{t("lesson.speakingSkip")}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 8,
      alignItems: "stretch",
    },
    title: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 32,
    },
    npcArea: { alignItems: "center", marginBottom: 40 },
    bubble: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1.5,
      borderColor: theme.border,
      marginBottom: 16,
      alignSelf: "stretch",
    },
    bubbleText: { flex: 1, fontSize: 18, color: theme.text, fontWeight: "600" },
    npcWrapper: { marginTop: 8 },
    micArea: {
      alignItems: "center",
      justifyContent: "center",
      height: 140,
      marginBottom: 24,
    },
    pulseRing: {
      position: "absolute",
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: "#1CB454",
    },
    micBtn: {
      width: 88,
      height: 88,
      borderRadius: 44,
      backgroundColor: "#58CC02",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#58CC02",
      shadowOpacity: 0.5,
      shadowRadius: 16,
      elevation: 8,
    },
    micBtnActive: { backgroundColor: "#FF4B4B" },
    skipBtn: { alignItems: "center", marginTop: 8 },
    skipText: { fontSize: 14, color: theme.textSecondary, fontWeight: "600" },
  });
