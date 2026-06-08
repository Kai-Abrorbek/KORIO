import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useState, useEffect, useRef } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSpeech } from "@/hooks/useSpeech";
import OwlMascot from "@/components/lesson/OwlMascot";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  theme: ThemeColors;
}

interface WordItem {
  id: string;
  word: string;
  zone: "bank" | "placed";
  placedIndex: number;
}

function Chip({
  item,
  onTap,
  onDragToZone,
  theme,
  answerState,
}: {
  item: WordItem;
  onTap: (id: string) => void;
  onDragToZone: (id: string, toZone: "bank" | "placed") => void;
  theme: ThemeColors;
  answerState: AnswerState;
}) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const zIndex = useSharedValue(1);
  const isPlaced = item.zone === "placed";

  const pan = Gesture.Pan()
    .enabled(answerState === "idle")
    .onStart(() => {
      scale.value = withSpring(1.12, { damping: 8 });
      zIndex.value = 999;
    })
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((e) => {
      scale.value = withSpring(1, { damping: 10 });
      zIndex.value = 1;
      translateX.value = withSpring(0, { damping: 14 });
      translateY.value = withSpring(0, { damping: 14 });
      const movedFar =
        Math.abs(e.translationX) > 5 || Math.abs(e.translationY) > 5;
      if (!movedFar) return;
      if (isPlaced && e.translationY > 50)
        runOnJS(onDragToZone)(item.id, "bank");
      else if (!isPlaced && e.translationY < -50)
        runOnJS(onDragToZone)(item.id, "placed");
    });

  const tap = Gesture.Tap()
    .enabled(answerState === "idle")
    .onEnd(() => runOnJS(onTap)(item.id));

  const composed = Gesture.Simultaneous(tap, pan);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    zIndex: zIndex.value,
  }));

  const getBg = () => {
    if (answerState !== "idle" && isPlaced) {
      if (answerState === "correct") return "#D7F5E3";
      if (answerState === "wrong") return "#FFEBEB";
    }
    return isPlaced ? "#D7F5E3" : theme.surface;
  };

  const getBorder = () => {
    if (answerState !== "idle" && isPlaced) {
      if (answerState === "correct") return "#1CB454";
      if (answerState === "wrong") return "#FF4B4B";
    }
    return isPlaced ? "#1CB454" : theme.border;
  };

  const getTextColor = () => {
    if (answerState !== "idle" && isPlaced) {
      if (answerState === "wrong") return "#FF4B4B";
    }
    return isPlaced ? "#1CB454" : theme.text;
  };

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        style={[
          cs.chip,
          { backgroundColor: getBg(), borderColor: getBorder() },
          animStyle,
        ]}
      >
        <Text style={[cs.text, { color: getTextColor() }]}>{item.word}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const cs = StyleSheet.create({
  chip: {
    borderWidth: 1.5,
    borderBottomWidth: 3,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  text: { fontSize: 15, fontWeight: "700" },
});

export default function SentenceBuilder({
  question,
  answerState,
  onAnswer,
  theme,
}: Props) {
  const { t } = useTranslation();
  const s = styles(theme);
  const { speak, speakSlow, isSpeaking } = useSpeech();
  const hasAutoPlayed = useRef(false);

  // 섞인 단어로 초기화
  const [words, setWords] = useState<WordItem[]>(() => {
    const shuffled = [...(question.options ?? [])].sort(
      () => Math.random() - 0.5,
    );
    return shuffled.map((w, i) => ({
      id: `w-${i}`,
      word: w,
      zone: "bank",
      placedIndex: i,
    }));
  });

  // 진입시 자동 재생
  useEffect(() => {
    if (hasAutoPlayed.current) return;
    hasAutoPlayed.current = true;
    const timer = setTimeout(() => {
      speak(question.answer);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const placedWords = words
    .filter((w) => w.zone === "placed")
    .sort((a, b) => a.placedIndex - b.placedIndex);
  const bankWords = words.filter((w) => w.zone === "bank");

  const handleTap = (id: string) => {
    setWords((prev) => {
      const word = prev.find((w) => w.id === id)!;
      const maxPlaced = Math.max(
        0,
        ...prev.filter((w) => w.zone === "placed").map((w) => w.placedIndex),
      );
      return prev.map((w) =>
        w.id === id
          ? {
              ...w,
              zone: word.zone === "bank" ? "placed" : "bank",
              placedIndex: word.zone === "bank" ? maxPlaced + 1 : w.placedIndex,
            }
          : w,
      );
    });
  };

  const handleDragToZone = (id: string, toZone: "bank" | "placed") => {
    setWords((prev) => {
      const maxPlaced = Math.max(
        0,
        ...prev.filter((w) => w.zone === "placed").map((w) => w.placedIndex),
      );
      return prev.map((w) =>
        w.id === id
          ? {
              ...w,
              zone: toZone,
              placedIndex: toZone === "placed" ? maxPlaced + 1 : w.placedIndex,
            }
          : w,
      );
    });
  };

  const handleCheck = () => {
    if (placedWords.length === 0 || answerState !== "idle") return;
    onAnswer(placedWords.map((w) => w.word).join(" "));
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View entering={FadeInDown.duration(400)} style={s.container}>
        <Text style={s.title}>{question.question}</Text>

        {/* 캐릭터 + 스피커 버튼 2개 */}
        <View style={s.npcRow}>
          <OwlMascot state="idle" size={100} />
          <View style={s.speakerBubble}>
            <TouchableOpacity
              style={[s.speakerBtn, isSpeaking && s.speakerBtnActive]}
              onPress={() => speak(question.answer)}
            >
              <Ionicons
                name="volume-high"
                size={28}
                color={isSpeaking ? "#fff" : "#4A90D9"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={s.speakerBtn}
              onPress={() => speakSlow(question.answer)}
            >
              <MaterialCommunityIcons name="turtle" size={26} color="#4A90D9" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 배치 영역 */}
        <View style={s.placedArea}>
          {placedWords.length === 0 ? (
            <Text style={s.placeholder}>{t("lesson.tapOrDrag")}</Text>
          ) : (
            <View style={s.chipRow}>
              {placedWords.map((item) => (
                <Chip
                  key={item.id}
                  item={item}
                  onTap={handleTap}
                  onDragToZone={handleDragToZone}
                  theme={theme}
                  answerState={answerState}
                />
              ))}
            </View>
          )}
        </View>

        <View style={s.divider} />
        <View style={[s.divider, { marginTop: 10, marginBottom: 16 }]} />

        {/* 단어 뱅크 */}
        <View style={s.chipRow}>
          {words.map((item) =>
            item.zone === "placed" ? (
              // ghost 자리 - 빈 회색 박스
              <View
                key={item.id}
                style={[
                  cs.chip,
                  {
                    backgroundColor: theme.border + "60",
                    borderColor: "transparent",
                    opacity: 0.5,
                  },
                ]}
              >
                <Text style={[cs.text, { color: "transparent" }]}>
                  {item.word}
                </Text>
              </View>
            ) : (
              <Chip
                key={item.id}
                item={item}
                onTap={handleTap}
                onDragToZone={handleDragToZone}
                theme={theme}
                answerState={answerState}
              />
            ),
          )}
        </View>

        <TouchableOpacity
          style={[
            s.checkBtn,
            (placedWords.length === 0 || answerState !== "idle") &&
              s.checkBtnDisabled,
          ]}
          onPress={handleCheck}
          disabled={placedWords.length === 0 || answerState !== "idle"}
        >
          <Text style={s.checkBtnText}>{t("lesson.check")}</Text>
        </TouchableOpacity>
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20, paddingTop: 8 },
    title: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 20,
    },
    npcRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      marginBottom: 28,
    },
    speakerBubble: {
      flex: 1,
      flexDirection: "row",
      gap: 12,
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1.5,
      borderColor: theme.border,
      alignItems: "center",
    },
    speakerBtn: {
      width: 56,
      height: 56,
      borderRadius: 12,
      backgroundColor: theme.bg,
      borderWidth: 1.5,
      borderColor: "#4A90D9",
      alignItems: "center",
      justifyContent: "center",
    },
    speakerBtnActive: { backgroundColor: "#4A90D9" },
    placedArea: {
      minHeight: 56,
      borderWidth: 2,
      borderColor: theme.border,
      borderStyle: "dashed",
      borderRadius: 14,
      padding: 10,
      marginBottom: 4,
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
    divider: { height: 1.5, backgroundColor: theme.border },
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
