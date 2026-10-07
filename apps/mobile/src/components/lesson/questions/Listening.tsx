import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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
import { useEffect, useMemo, useRef, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import {
  AUTO_SPEECH_DELAY_MS,
  type SpeechController,
} from "@/hooks/useSpeech";
import { listeningScript } from "@/utils/listening";
import { shuffle } from "@/utils/shuffle";
import CheckButton from "../CheckButton";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  /** 소리를 못 듣는 상황(무음·시끄러운 곳)을 위한 탈출구 */
  onSkip?: () => void;
  theme: ThemeColors;
  speech: SpeechController;
}

/**
 * 듣고 고르기 (listening) — TOPIK 듣기처럼.
 *
 * 대화(audioText)를 듣고, 질문(instruction)에 맞는 답을 보기 4개 중에서 고른다.
 * 들려준 문장은 화면에 **안 보여준다** — 글자 맞추기가 아니라 귀로 풀어야 한다.
 * 보기는 들은 말을 바꿔 말한 것이라, 소리를 이해해야만 고를 수 있다.
 */
export default function Listening({
  question,
  answerState,
  onAnswer,
  onSkip,
  theme,
  speech,
}: Props) {
  const { t } = useTranslation();
  const s = styles(theme);
  const { speak, speakSlow, speakAuto, isSpeaking } = speech;
  const auto = useRef(false);
  const [selected, setSelected] = useState<string | null>(null);
  const locked = answerState !== "idle";
  const script = listeningScript(question);

  // 시드는 정답을 첫 칸에 적어 둔다 — 자리로 외우지 않게 섞는다 (한 문제 안에선 고정)
  const options = useMemo(
    () => shuffle(question.options ?? []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [question.id],
  );

  useEffect(() => {
    if (auto.current || !script) return;
    auto.current = true;
    const tm = setTimeout(() => speakAuto(script), AUTO_SPEECH_DELAY_MS);
    return () => clearTimeout(tm);
  }, [script, speakAuto]);

  // 읽는 동안 스피커가 살짝 두근 — 지금 소리가 나오고 있다는 표시
  const pulse = useSharedValue(1);
  useEffect(() => {
    pulse.value = isSpeaking
      ? withRepeat(
          withSequence(
            withTiming(1.06, { duration: 350 }),
            withTiming(1, { duration: 350 }),
          ),
          -1,
        )
      : withTiming(1);
  }, [isSpeaking, pulse]);
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const select = (opt: string) => {
    if (locked) return;
    void Haptics.selectionAsync();
    setSelected((prev) => (prev === opt ? null : opt));
  };

  const check = () => {
    if (!selected || locked) return;
    onAnswer(selected);
  };

  return (
    <Animated.View entering={FadeIn.duration(150)} style={s.container}>
      <Text style={s.title}>
        {question.question || t("lesson.listenAndSelect")}
      </Text>

      <View style={s.audioRow}>
        <Animated.View style={[{ flex: 1 }, pulseStyle]}>
          <TouchableOpacity
            style={s.bigSpeaker}
            onPress={() => speak(script)}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={t("lesson.listenAndSelect")}
          >
            <Ionicons name="volume-high" size={36} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity
          style={s.slowSpeaker}
          onPress={() => speakSlow(script)}
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons name="turtle" size={30} color="#4A90D9" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {options.map((opt, i) => {
          const isSel = selected === opt;
          return (
            <TouchableOpacity
              key={opt}
              activeOpacity={0.85}
              disabled={locked}
              onPress={() => select(opt)}
              style={[s.option, isSel && s.optionSelected]}
            >
              <View style={[s.optionBadge, isSel && s.optionBadgeSelected]}>
                <Text style={[s.optionBadgeText, isSel && { color: "#fff" }]}>
                  {String.fromCharCode(65 + i)}
                </Text>
              </View>
              <Text style={[s.optionText, isSel && { color: theme.primary }]}>
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <CheckButton
        onPress={check}
        disabled={!selected || locked}
        theme={theme}
        skipLabel={onSkip && !locked ? t("lesson.skipListening") : undefined}
        onSkip={onSkip}
      />
    </Animated.View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 8,
      // SafeArea 는 lesson.tsx 의 questionArea 가 준다
      paddingBottom: 12,
    },
    title: {
      fontSize: 20,
      fontWeight: "800",
      color: theme.text,
      lineHeight: 27,
      marginBottom: 18,
    },
    audioRow: { flexDirection: "row", gap: 12, marginBottom: 22 },
    bigSpeaker: {
      height: 76,
      borderRadius: 18,
      backgroundColor: "#4A90D9",
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 4,
      borderBottomColor: "#3A77B5",
    },
    slowSpeaker: {
      width: 76,
      height: 76,
      borderRadius: 18,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: "#4A90D9",
      borderBottomWidth: 4,
      alignItems: "center",
      justifyContent: "center",
    },
    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 12 },
    option: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 16,
      paddingVertical: 14,
      paddingHorizontal: 14,
      marginBottom: 10,
    },
    optionSelected: {
      borderColor: theme.primary,
      backgroundColor: theme.primary + "10",
    },
    optionBadge: {
      width: 28,
      height: 28,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.border,
    },
    optionBadgeSelected: { backgroundColor: theme.primary },
    optionBadgeText: {
      fontSize: 13,
      fontWeight: "800",
      color: theme.textSecondary,
    },
    optionText: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.text,
      flex: 1,
      lineHeight: 23,
    },
  });
