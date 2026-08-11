import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useState, useRef, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSpeech } from "@/hooks/useSpeech";
import LessonCharacter from "../LessonCharacter";
import AnswerChip, {
  GhostChip,
  ChipLayout,
} from "@/components/lesson/AnswerChip";
import CheckButton from "../CheckButton";
import { useAnswerLines, ANSWER_LINE_H } from "../useAnswerLines";
import WordBankSheet, { WordBankHint, isLongBank } from "../WordBankSheet";

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
/** styles 안 fallback minHeight 용 (실제 줄 수는 useAnswerLines 가 정한다) */
const ANSWER_LINES = 2;
/** lineSlot 높이 — 답 영역 줄 높이와 반드시 같아야 한다 */
const LINE_H = ANSWER_LINE_H;

export default function TranslateBuilder({
  question,
  answerState,
  onAnswer,
  theme,
}: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const s = styles(theme, ANSWER_LINES, LINE_H, insets.bottom);
  const { width: winW, height: winH } = useWindowDimensions();
  // 전체 단어 기준으로 줄 수를 미리 잡아둔다 (칩 올려도 안 흔들리게)
  // 세로가 짧은 기기에서는 캐릭터와 답 줄 수를 줄여 확인 버튼을 지킨다
  const compact = winH < 700;

  // 칩이 많으면 뱅크를 바텀시트로 내린다
  const longBank = isLongBank(question, compact);
  const [bankOpen, setBankOpen] = useState(false);

  const { lines: answerLines } = useAnswerLines(
    question.options ?? [],
    winW - 32,
    { max: compact ? 2 : 3 },
  );
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

  const renderBankChips = () =>
    words.map((item) => {
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
    });
  const disabled = placedWords.length === 0 || answerState !== "idle";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View entering={FadeInDown.duration(400)} style={s.container}>
        {/* 제목 */}
        <Text style={s.title}>{question.question}</Text>

        {/* 캐릭터 + 말풍선 */}
        <View style={[s.npcRow, compact && { height: 148 }]}>
          <LessonCharacter
            state={answerState}
            seed={question.id}
            height={compact ? 138 : 170}
          />

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

        {/* 단어 뱅크 — 칩이 많으면 바텀시트로 내린다 */}
        {!longBank ? (
          <View style={s.bank}>{renderBankChips()}</View>
        ) : (
          !bankOpen && (
            <WordBankHint onPress={() => setBankOpen(true)} theme={theme} />
          )
        )}

        {/* 여백 (확인 버튼을 아래로 밀어줌) */}
        <View style={{ flex: 1 }} />

        {/* 확인 버튼 */}
        <CheckButton onPress={handleCheck} disabled={disabled} theme={theme} />

        {/* 칩이 많을 때 쓰는 슬라이드업 단어장 */}
        <WordBankSheet
          visible={longBank && bankOpen}
          onClose={() => setBankOpen(false)}
          theme={theme}
        >
          {renderBankChips()}
        </WordBankSheet>
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = (
  theme: ThemeColors,
  lines: number,
  lineH: number,
  bottomInset = 0,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 12,
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

    // 단어 뱅크
    bank: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      justifyContent: "center",
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
  });
