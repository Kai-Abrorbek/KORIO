import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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
import { useSpeech } from "@/hooks/useSpeech";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  theme: ThemeColors;
}
interface W {
  id: string;
  word: string;
  placed: boolean;
  order: number;
}

export default function Listening({
  question,
  answerState,
  onAnswer,
  theme,
}: Props) {
  const { t } = useTranslation();
  const s = styles(theme);
  const { speak, speakSlow, isSpeaking } = useSpeech();
  const auto = useRef(false);

  const [words, setWords] = useState<W[]>(() =>
    [...(question.options ?? question.answer.split(" "))]
      .sort(() => Math.random() - 0.5)
      .map((w, i) => ({ id: `w-${i}`, word: w, placed: false, order: 0 })),
  );

  useEffect(() => {
    if (auto.current) return;
    auto.current = true;
    const tm = setTimeout(() => speak(question.answer), 500);
    return () => clearTimeout(tm);
  }, []);

  const pulse = useSharedValue(1);
  useEffect(() => {
    pulse.value = isSpeaking
      ? withRepeat(
          withSequence(
            withTiming(1.08, { duration: 350 }),
            withTiming(1, { duration: 350 }),
          ),
          -1,
        )
      : withTiming(1);
  }, [isSpeaking]);
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const placed = words
    .filter((w) => w.placed)
    .sort((a, b) => a.order - b.order);
  const locked = answerState !== "idle";

  const place = (id: string) => {
    if (locked) return;
    setWords((prev) => {
      const maxO = Math.max(
        0,
        ...prev.filter((w) => w.placed).map((w) => w.order),
      );
      return prev.map((w) =>
        w.id === id ? { ...w, placed: true, order: maxO + 1 } : w,
      );
    });
  };
  const unplace = (id: string) => {
    if (locked) return;
    setWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, placed: false } : w)),
    );
  };
  const check = () => {
    if (placed.length === 0 || locked) return;
    onAnswer(placed.map((w) => w.word).join(" "));
  };

  return (
    <Animated.View entering={FadeInDown.duration(400)} style={s.container}>
      <Text style={s.title}>{t("lesson.tapWhatYouHear")}</Text>

      <View style={s.audioRow}>
        <Animated.View style={[{ flex: 1 }, pulseStyle]}>
          <TouchableOpacity
            style={s.bigSpeaker}
            onPress={() => speak(question.answer)}
            activeOpacity={0.85}
          >
            <Ionicons name="volume-high" size={36} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity
          style={s.slowSpeaker}
          onPress={() => speakSlow(question.answer)}
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons name="turtle" size={30} color="#4A90D9" />
        </TouchableOpacity>
      </View>

      <View style={s.placedArea}>
        {placed.length === 0 ? (
          <Text style={s.placeholder}>{t("lesson.tapOrDrag")}</Text>
        ) : (
          <View style={s.chipRow}>
            {placed.map((w) => (
              <TouchableOpacity
                key={w.id}
                onPress={() => unplace(w.id)}
                style={s.chip}
                disabled={locked}
              >
                <Text style={s.chipText}>{w.word}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <View style={s.divider} />

      <View style={s.chipRow}>
        {words.map((w) =>
          w.placed ? (
            <View key={w.id} style={[s.chip, s.chipGhost]}>
              <Text style={[s.chipText, { opacity: 0 }]}>{w.word}</Text>
            </View>
          ) : (
            <TouchableOpacity
              key={w.id}
              onPress={() => place(w.id)}
              style={s.chip}
              disabled={locked}
            >
              <Text style={s.chipText}>{w.word}</Text>
            </TouchableOpacity>
          ),
        )}
      </View>

      <TouchableOpacity
        style={[
          s.checkBtn,
          (placed.length === 0 || locked) && s.checkBtnDisabled,
        ]}
        onPress={check}
        disabled={placed.length === 0 || locked}
      >
        <Text style={s.checkBtnText}>{t("lesson.check")}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20, paddingTop: 8 },
    title: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 24,
    },
    audioRow: { flexDirection: "row", gap: 12, marginBottom: 32 },
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
    placedArea: {
      minHeight: 56,
      borderWidth: 2,
      borderColor: theme.border,
      borderStyle: "dashed",
      borderRadius: 14,
      padding: 10,
      marginBottom: 14,
      justifyContent: "center",
    },
    placeholder: {
      color: theme.textSecondary,
      fontSize: 14,
      textAlign: "center",
      fontWeight: "500",
    },
    chipRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginBottom: 8,
    },
    chip: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    chipGhost: {
      backgroundColor: theme.bg,
      borderColor: theme.border,
      borderBottomWidth: 2,
    },
    chipText: { fontSize: 18, fontWeight: "700", color: theme.text },
    divider: { height: 1.5, backgroundColor: theme.border, marginBottom: 16 },
    checkBtn: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: "center",
      marginTop: 16,
    },
    checkBtnDisabled: { backgroundColor: theme.border },
    checkBtnText: { color: "#fff", fontSize: 17, fontWeight: "800" },
  });
