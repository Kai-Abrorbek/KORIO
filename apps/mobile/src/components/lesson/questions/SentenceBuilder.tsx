import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useState, useEffect, useRef, useCallback } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSpeech } from "@/hooks/useSpeech";
import LessonCharacter from "../LessonCharacter";
import AnswerChip, { ChipLayout } from "@/components/lesson/AnswerChip";
import CheckButton from "../CheckButton";
import { useAnswerLines, ANSWER_LINE_H } from "../useAnswerLines";
import WordBankSheet, { WordBankHint, isLongBank } from "../WordBankSheet";

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

/** lineSlot 높이 — 답 영역 줄 높이와 반드시 같아야 한다 */
const LINE_H = ANSWER_LINE_H;

export default function SentenceBuilder({
  question,
  answerState,
  onAnswer,
  theme,
  combo = 0,
}: Props) {
  const { t } = useTranslation();
  const s = styles(theme, LINE_H);
  const { width: winW, height: winH } = useWindowDimensions();

  // 세로가 짧은 기기에서는 캐릭터와 답 줄 수를 줄여 확인 버튼을 지킨다
  const compact = winH < 700;

  // 전체 단어 기준으로 줄 수를 미리 잡아둔다 (칩 올려도 안 흔들리게)
  const { lines: answerLines } = useAnswerLines(
    question.options ?? [],
    winW - 40,
    { max: compact ? 2 : 3 },
  );
  const { speak, speakSlow, speakAuto, isSpeaking } = useSpeech();
  const hasAutoPlayed = useRef(false);
  const [bankOpen, setBankOpen] = useState(false);

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
      speakAuto(question.answer);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const placedWords = words
    .filter((w) => w.zone === "placed")
    .sort((a, b) => a.placedIndex - b.placedIndex);

  const isLong = isLongBank(question, compact);

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

  const renderBankChips = () =>
    words.map((item) => {
      const isPlaced = item.zone === "placed";
      return (
        <View key={item.id} style={s.bankSlot}>
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
          {isPlaced && (
            <View style={s.ghostOverlay} pointerEvents="none">
              <View
                style={[
                  s.emptyBankChip,
                  {
                    backgroundColor: theme.border + "50",
                    borderColor: theme.border,
                  },
                ]}
              />
            </View>
          )}
        </View>
      );
    });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View entering={FadeIn.duration(150)} style={s.container}>
        <Text style={s.title}>{question.question}</Text>

        {/* 캐릭터 + 스피커 버튼 2개 */}
        <View style={[s.npcRow, compact && { height: 148 }]}>
          <LessonCharacter
            state={answerState}
            seed={question.id}
            height={compact ? 138 : 170}
            combo={combo}
          />
          <View style={s.speakerBubble}>
            {/* 말풍선 꼬리 (테두리) */}
            <View style={s.tailBorder} />
            {/* 말풍선 꼬리 (안쪽 흰색) */}
            <View style={s.tailInner} />
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
        <View
          style={[s.answerArea, { minHeight: answerLines * ANSWER_LINE_H }]}
        >
          {/* 줄 (룰드 라인) */}
          {Array.from({ length: answerLines }).map((_, i) => (
            <View
              key={`line-${i}`}
              style={[s.answerLine, { top: (i + 1) * ANSWER_LINE_H - 2 }]}
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
        {!isLong ? (
          <View style={s.chipRow}>{renderBankChips()}</View>
        ) : (
          !bankOpen && (
            <WordBankHint onPress={() => setBankOpen(true)} theme={theme} />
          )
        )}

        <CheckButton
          onPress={handleCheck}
          disabled={placedWords.length === 0 || answerState !== "idle"}
          theme={theme}
        />

        {/* 칩이 많을 때 쓰는 슬라이드업 단어장 */}
        <WordBankSheet
          visible={isLong && bankOpen}
          onClose={() => setBankOpen(false)}
          theme={theme}
        >
          {renderBankChips()}
        </WordBankSheet>
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = (theme: ThemeColors, lineH: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 12,
    },
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
      height: 180,
    },
    speakerBubble: {
      flex: 1,
      backgroundColor: theme.bg,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: theme.border,
      paddingVertical: 16,
      paddingHorizontal: 14,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      gap: 10,
      minHeight: 76,
      position: "relative",
    },
    tailBorder: {
      position: "absolute",
      left: -12,
      top: "30%",
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
    // 꼬리 (안쪽 흰색)
    tailInner: {
      position: "absolute",
      left: -10,
      top: "30%",
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
    answerArea: {
      // 실제 높이는 렌더에서 minHeight 로 덮어쓴다 (줄 수가 칩 개수에 따라 변한다).
      // marginBottom 은 단어 뱅크와 붙지 않게 하는 간격. 예전엔 이 자리에
      // 밑줄 두 개가 있었고 그 marginBottom 이 이 역할을 했다.
      marginTop: 8,
      marginBottom: 28,
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
    chipRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
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
    },
    emptyBankChip: {
      width: "100%",
      height: "100%",
      borderWidth: 1.5,
      borderBottomWidth: 3,
      borderRadius: 12,
    },
  });
