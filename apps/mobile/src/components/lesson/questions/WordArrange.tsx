import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
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
import { useState, useEffect, useRef, useCallback } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSpeech } from "@/hooks/useSpeech";
import AnswerChip, {
  GhostChip,
  ChipLayout,
} from "@/components/lesson/AnswerChip";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  theme: ThemeColors;
  combo?: number;
}

interface WordItem {
  id: string;
  word: string;
  zone: "bank" | "placed";
  placedIndex: number;
}
const ANSWER_LINES = 2;
const LINE_H = 65;

export default function WordArrange({
  question,
  answerState,
  onAnswer,
  theme,
  combo = 0,
}: Props) {
  const { t } = useTranslation();
  const s = styles(theme, ANSWER_LINES, LINE_H);
  const { speak, speakSlow, isSpeaking } = useSpeech();

  const [words, setWords] = useState<WordItem[]>(
    (question.options ?? []).map((w, i) => ({
      id: `w-${i}`,
      word: w,
      zone: "bank",
      placedIndex: i,
    })),
  );

  // 진입시 자동 재생
  useEffect(() => {
    const timer = setTimeout(() => {
      speak(question.npcText ?? question.answer);
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

  const chipLayouts = useRef<Map<string, ChipLayout>>(new Map());

  const handleChipLayout = useCallback(
    (id: string, layout: ChipLayout, zone: "bank" | "placed") => {
      if (zone === "placed") {
        chipLayouts.current.set(id, layout);
      } else {
        chipLayouts.current.delete(id);
      }
    },
    [],
  );

  const getPlacedChipLayouts = useCallback(() => chipLayouts.current, []);

  const handleSwap = useCallback((draggedId: string, targetId: string) => {
    setWords((prev) => {
      const dragged = prev.find((w) => w.id === draggedId);
      const target = prev.find((w) => w.id === targetId);
      if (!dragged || !target) return prev;
      if (dragged.zone !== "placed" || target.zone !== "placed") return prev;

      return prev.map((w) => {
        if (w.id === draggedId)
          return { ...w, placedIndex: target.placedIndex };
        if (w.id === targetId)
          return { ...w, placedIndex: dragged.placedIndex };
        return w;
      });
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View entering={FadeInDown.duration(400)} style={s.container}>
        {/* 지시문 */}
        <Text style={s.title}>{question.question}</Text>

        {/* 캐릭터 + 스피커 버튼 2개 */}
        <View style={s.npcRow}>
          <View style={s.character}>
            <Image
              source={require("@/../assets/images/character.jpg")}
              style={s.characterImage}
              resizeMode="contain"
            />
          </View>
          <View style={s.speakerBubble}>
            {/* 말풍선 꼬리 (테두리) */}
            <View style={s.tailBorder} />
            {/* 말풍선 꼬리 (안쪽 흰색) */}
            <View style={s.tailInner} />
            {/* 일반 재생 */}
            <TouchableOpacity
              style={[s.speakerBtn, isSpeaking && s.speakerBtnActive]}
              onPress={() => speak(question.npcText ?? question.answer)}
            >
              <Ionicons
                name="volume-high"
                size={28}
                color={isSpeaking ? "#fff" : "#4A90D9"}
              />
            </TouchableOpacity>
            {/* 느리게 재생 */}
            <TouchableOpacity
              style={s.speakerBtn}
              onPress={() => speakSlow(question.npcText ?? question.answer)}
            >
              <MaterialCommunityIcons name="turtle" size={26} color="#4A90D9" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 배치된 단어들 (상단 - 연두색) */}
        <View style={s.answerArea}>
          {/* 줄 (룰드 라인) */}
          {Array.from({ length: ANSWER_LINES }).map((_, i) => (
            <View
              key={`line-${i}`}
              style={[s.answerLine, { top: (i + 1) * LINE_H - 2 }]}
            />
          ))}

          {/* 칩들: 라인 위에 앉도록 각 슬롯 bottom 정렬 + 자동 줄바꿈 */}
          <View style={s.placedWrap}>
            {placedWords.map((item, idx) => (
              <View key={item.id} style={s.lineSlot}>
                <AnswerChip
                  item={item}
                  orderIndex={idx}
                  onTap={handleTap}
                  onDragToZone={handleDragToZone}
                  onSwap={handleSwap}
                  onLayoutMeasured={handleChipLayout}
                  getPlacedChipLayouts={getPlacedChipLayouts}
                  theme={theme}
                  answerState={answerState}
                />
              </View>
            ))}
          </View>
        </View>

        {/* 단어 뱅크 (하단 - 회색) */}
        <View style={s.chipRow}>
          {words.map((item) =>
            item.zone === "placed" ? (
              <GhostChip key={item.id} word={item.word} theme={theme} />
            ) : (
              <AnswerChip
                key={item.id}
                item={item}
                onTap={handleTap}
                onDragToZone={handleDragToZone}
                onLayoutMeasured={handleChipLayout}
                theme={theme}
                answerState={answerState}
              />
            ),
          )}
        </View>

        {/* 확인 버튼 */}
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

const styles = (theme: ThemeColors, lines: number, lineH: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 8,
      marginBottom: 40,
    },
    title: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
    },
    npcRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      height: 190,
    },
    character: {
      width: 166,
      height: 200,
      alignItems: "center",
      justifyContent: "center",
    },
    characterImage: {
      width: 120,
      height: 140,
    },
    speakerBubble: {
      flex: 1,
      backgroundColor: "#fff",
      borderRadius: 18,
      borderWidth: 2,
      borderColor: "#E5E5EA",
      paddingVertical: 16,
      paddingHorizontal: 14,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      // gap: 10,
      minHeight: 76,
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
      borderRightColor: "#E5E5EA",
    },
    // 꼬리 (안쪽 흰색)
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
      borderRightColor: "#fff",
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
    speakerBtnActive: {
      backgroundColor: "#4A90D9",
    },
    answerArea: {
      height: 180,
      minHeight: lineH * lines,
      marginTop: 8,
      marginBottom: 8,
      position: "relative",
    },
    answerLine: {
      position: "absolute",
      left: 0,
      right: 0,
      height: 1,
      backgroundColor: theme.border,
    },
    placedWrap: {
      ...StyleSheet.absoluteFill,
      flexDirection: "row",
      flexWrap: "wrap",
      alignContent: "flex-start",
    },
    lineSlot: {
      height: lineH,
      justifyContent: "flex-end",
      paddingBottom: 8,
      marginRight: 8,
    },

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
      height: 160,
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
