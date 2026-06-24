import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useState, useRef, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
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
}

interface WordItem {
  id: string;
  word: string;
  zone: "bank" | "placed";
  placedIndex: number;
}
const ANSWER_LINES = 2;
const LINE_H = 65;

export default function TranslateBuilder({
  question,
  answerState,
  onAnswer,
  theme,
}: Props) {
  const { t } = useTranslation();
  const s = styles(theme, ANSWER_LINES, LINE_H);
  const { speak, isSpeaking } = useSpeech();
  const [words, setWords] = useState<WordItem[]>(
    (question.options ?? []).map((w, i) => ({
      id: `w-${i}`,
      word: w,
      zone: "bank",
      placedIndex: i,
    })),
  );

  const placedWords = words
    .filter((w) => w.zone === "placed")
    .sort((a, b) => a.placedIndex - b.placedIndex);

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

  const disabled = placedWords.length === 0 || answerState !== "idle";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View entering={FadeInDown.duration(400)} style={s.container}>
        {/* 제목 */}
        <Text style={s.title}>{question.question}</Text>

        {/* 캐릭터 + 말풍선 */}
        <View style={s.npcRow}>
          <View style={s.character}>
            <Image
              source={require("@/../assets/images/character.jpg")}
              style={s.characterImage}
              resizeMode="contain"
            />
          </View>

          <View style={s.bubble}>
            {/* 말풍선 꼬리 (테두리) */}
            <View style={s.tailBorder} />
            {/* 말풍선 꼬리 (안쪽 흰색) */}
            <View style={s.tailInner} />

            <TouchableOpacity
              onPress={() => speak(question.npcText ?? "")}
              hitSlop={8}
              style={s.audioBtn}
            >
              <Ionicons
                name="volume-medium"
                size={24}
                color={isSpeaking ? "#1A9BE6" : "#1A9BE6"}
              />
            </TouchableOpacity>

            <View style={s.bubbleTextWrap}>
              <Text style={s.bubbleText}>{question.npcText}</Text>
              <View style={s.dashedUnderline} />
            </View>
          </View>
        </View>

        {/* 답 영역 - 위/아래 두 줄 */}
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

        {/* 단어 뱅크 */}
        <View style={s.bank}>
          {words.map((item) => {
            const isPlaced = item.zone === "placed";
            return (
              <View key={item.id} style={s.bankSlot}>
                {/* AnswerChip 항상 자리 차지 (placed 일 땐 투명 + 터치 X) */}
                <View
                  style={{ opacity: isPlaced ? 0 : 1 }}
                  pointerEvents={isPlaced ? "none" : "auto"}
                >
                  <AnswerChip
                    item={item}
                    onTap={handleTap}
                    onDragToZone={handleDragToZone}
                    onLayoutMeasured={handleChipLayout}
                    theme={theme}
                    answerState={answerState}
                  />
                </View>
                {/* placed 일 때만 GhostChip 을 위에 오버레이 */}
                {isPlaced && (
                  <View style={s.ghostOverlay} pointerEvents="none">
                    <GhostChip word={item.word} theme={theme} />
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* 여백 (확인 버튼을 아래로 밀어줌) */}
        <View style={{ flex: 1 }} />

        {/* 확인 버튼 */}
        <TouchableOpacity
          style={[s.checkBtn, disabled && s.checkBtnDisabled]}
          onPress={handleCheck}
          disabled={disabled}
          activeOpacity={0.85}
        >
          <Text style={[s.checkBtnText, disabled && s.checkBtnTextDisabled]}>
            {t("lesson.check")}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = (theme: ThemeColors, lines: number, lineH: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 16,
      marginBottom: 40,
    },
    // 제목
    title: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 20,
    },

    // 캐릭터 + 말풍선
    npcRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      height: 180,
    },
    character: {
      width: 166,
      height: 200,
      alignItems: "center",
      justifyContent: "center",
    },
    characterEmoji: {
      fontSize: 100,
    },
    bubble: {
      flex: 1,
      backgroundColor: theme.bg,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: theme.border,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
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
      borderRightColor: theme.border,
    },
    audioBtn: { padding: 2 },
    bubbleTextWrap: { flex: 1 },
    bubbleText: {
      fontSize: 14,
      color: theme.text,
      fontWeight: "500",
      lineHeight: 24,
    },
    dashedUnderline: {
      borderBottomWidth: 1.5,
      borderBottomColor: theme.textSecondary,
      borderStyle: "dashed",
      marginTop: 4,
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

    characterImage: {
      width: 160,
      height: 180,
    },
    // 단어 뱅크
    bank: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      justifyContent: "center",
      height: 150,
    },
    bankSlot: {
      position: "relative",
    },
    ghostOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    // 확인 버튼
    checkBtn: {
      backgroundColor: "#58CC02",
      borderRadius: 16,
      paddingVertical: 18,
      alignItems: "center",
      marginTop: 16,
    },
    checkBtnDisabled: {
      backgroundColor: theme.bg,
    },
    checkBtnText: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "800",
      letterSpacing: 1,
    },
    checkBtnTextDisabled: {
      color: "#AFAFAF",
    },
  });
