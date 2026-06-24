import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  cancelAnimation,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSpeech } from "@/hooks/useSpeech";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  onSkip: () => void;
  theme: ThemeColors;
}

const MIC_BLUE = "#1CB0F6";
const MIC_BLUE_DARK = "#1899D6";

// 파형 막대 한 개
function WaveBar({ index, active }: { index: number; active: boolean }) {
  const base = [10, 18, 28, 16, 32, 20, 30, 14, 24, 18, 12][index % 11];
  const sv = useSharedValue(0.4);
  if (active) {
    sv.value = withDelay(
      index * 60,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 300 }),
          withTiming(0.4, { duration: 300 }),
        ),
        -1,
        true,
      ),
    );
  } else {
    cancelAnimation(sv);
    sv.value = withTiming(0.4);
  }
  const st = useAnimatedStyle(() => ({ transform: [{ scaleY: sv.value }] }));
  return (
    <Animated.View
      style={[
        {
          width: 5,
          height: base,
          borderRadius: 3,
          backgroundColor: "#fff",
          marginHorizontal: 3,
        },
        st,
      ]}
    />
  );
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
  const { speak, isSpeaking } = useSpeech();

  const startRecording = () => {
    setIsRecording(true);
    // 실제 STT 연결 전 mock: 3초 후 정답 처리
    setTimeout(() => {
      setIsRecording(false);
      onAnswer(question.answer);
    }, 3000);
  };

  const stopRecording = () => setIsRecording(false);

  return (
    <Animated.View entering={FadeInDown.duration(400)} style={s.container}>
      <Text style={s.title}>{question.question}</Text>

      {/* 말풍선(위) + 캐릭터(아래) */}
      <View style={s.npcArea}>
        <View style={s.bubble}>
          <TouchableOpacity onPress={() => speak(question.answer)} hitSlop={8}>
            <Ionicons
              name="volume-high"
              size={24}
              color={isSpeaking ? theme.primary : MIC_BLUE}
            />
          </TouchableOpacity>
          <View style={s.bubbleTextWrap}>
            <Text style={s.bubbleText}>{question.answer}</Text>
            <View style={s.dashedUnderline} />
          </View>
          {/* 꼬리 (아래 방향) */}
          <View style={s.tailBorder} />
          <View style={s.tailInner} />
        </View>

        <Image
          source={require("@/../assets/images/character.jpg")}
          style={s.characterImage}
          resizeMode="contain"
        />
      </View>

      <View style={{ flex: 1 }} />

      {/* 가로 마이크 바 */}
      <TouchableOpacity
        style={[s.micBar, isRecording && s.micBarActive]}
        onPress={isRecording ? stopRecording : startRecording}
        activeOpacity={0.9}
      >
        {isRecording ? (
          <View style={s.waveRow}>
            {Array.from({ length: 11 }).map((_, i) => (
              <WaveBar key={i} index={i} active />
            ))}
          </View>
        ) : (
          <Ionicons name="mic" size={32} color="#fff" />
        )}
      </TouchableOpacity>

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
    },
    title: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 20,
    },

    npcArea: { alignItems: "center" },
    bubble: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: theme.border,
      paddingVertical: 16,
      paddingHorizontal: 18,
      alignSelf: "stretch",
      marginBottom: 22,
      position: "relative",
    },
    bubbleTextWrap: { flex: 1 },
    bubbleText: { fontSize: 14, color: theme.text, fontWeight: "600" },
    dashedUnderline: {
      borderBottomWidth: 1.5,
      borderBottomColor: theme.textSecondary,
      borderStyle: "dashed",
      marginTop: 6,
    },
    // 꼬리 (아래 방향) - 테두리
    tailBorder: {
      position: "absolute",
      left: 40,
      bottom: -12,
      width: 0,
      height: 0,
      borderLeftWidth: 9,
      borderRightWidth: 9,
      borderTopWidth: 12,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderTopColor: theme.border,
    },
    // 꼬리 (안쪽)
    tailInner: {
      position: "absolute",
      left: 42,
      bottom: -8,
      width: 0,
      height: 0,
      borderLeftWidth: 7,
      borderRightWidth: 7,
      borderTopWidth: 10,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderTopColor: theme.surface,
    },
    characterImage: { width: 180, height: 230 },

    // 가로 마이크 바
    micBar: {
      height: 60,
      width: 150,
      borderRadius: 18,
      backgroundColor: MIC_BLUE,
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 4,
      borderBottomColor: MIC_BLUE_DARK,
      marginBottom: 12,
      marginLeft: 105,
    },
    micBarActive: { backgroundColor: MIC_BLUE },
    waveRow: { flexDirection: "row", alignItems: "center", height: 36 },

    skipBtn: { alignItems: "center", paddingVertical: 14 },
    skipText: { fontSize: 15, color: theme.textSecondary, fontWeight: "700" },
  });
