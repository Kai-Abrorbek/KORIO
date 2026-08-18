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
import { Ionicons } from "@expo/vector-icons";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useSpeech } from "@/hooks/useSpeech";
import type { SpeechLanguage } from "@/services/tts.service";
import LessonCharacter from "../LessonCharacter";
import AnswerChip, { ChipLayout } from "@/components/lesson/AnswerChip";
import CheckButton from "../CheckButton";
import { useAnswerLines, ANSWER_LINE_H } from "../useAnswerLines";
import WordBankSheet, { WordBankHint, isLongBank } from "../WordBankSheet";

/**
 * 말풍선에 무엇을 담느냐만 다르고 나머지 화면은 같아서 한 컴포넌트로 쓴다.
 *
 * translate — 유저 언어로 된 뜻을 듣고 보면서 한국어로 옮긴다.
 * reply     — 상대가 한국어로 한 말을 듣고 거기에 맞는 대답을 만든다.
 */
type BuilderMode = "translate" | "reply";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  theme: ThemeColors;
  mode?: BuilderMode;
}

interface WordItem {
  id: string;
  word: string;
  zone: "bank" | "placed";
  placedIndex: number;
}
/** lineSlot 높이 — 답 영역 줄 높이와 반드시 같아야 한다 */
const LINE_H = ANSWER_LINE_H;

function speechLanguageOf(language?: string): SpeechLanguage {
  const base = language?.toLowerCase().split("-")[0];
  if (base === "uz") return "uz-UZ";
  if (base === "en") return "en-US";
  if (base === "ru") return "ru-RU";
  return "ko-KR";
}

export default function TranslateBuilder({
  question,
  answerState,
  onAnswer,
  theme,
  mode = "translate",
}: Props) {
  const { t, i18n } = useTranslation();
  const { speak, stop, isSpeaking, isSpeechPlaying, speechProgress } =
    useSpeech();
  const s = styles(theme, LINE_H);
  const isReply = mode === "reply";
  const { width: winW, height: winH } = useWindowDimensions();
  // 전체 단어 기준으로 줄 수를 미리 잡아둔다 (칩 올려도 안 흔들리게)
  // 세로가 짧은 기기에서는 캐릭터와 답 줄 수를 줄여 확인 버튼을 지킨다
  const compact = winH < 700;

  const sourceText =
    (isReply
      ? question.npcText
      : (question.sourceText ?? "") || question.question
    )?.trim() ?? "";
  const speechLanguage = isReply
    ? "ko-KR"
    : speechLanguageOf(i18n.resolvedLanguage ?? i18n.language);
  const spokenWords = useMemo(
    () => sourceText.split(/\s+/u).filter(Boolean),
    [sourceText],
  );
  const activeSpokenWord =
    isSpeechPlaying && spokenWords.length > 0
      ? Math.min(
          spokenWords.length - 1,
          Math.floor(speechProgress * spokenWords.length),
        )
      : -1;

  const playSourceText = useCallback(() => {
    if (!sourceText) return;
    // 이미 재생 중이어도 speak()가 기존 재생을 끊고 처음부터 다시 시작한다.
    speak(sourceText, speechLanguage);
  }, [sourceText, speak, speechLanguage]);

  useEffect(() => {
    const timer = setTimeout(playSourceText, 500);
    return () => {
      clearTimeout(timer);
      stop();
    };
  }, [playSourceText, question.id, stop]);

  // 칩이 많으면 뱅크를 바텀시트로 내린다
  const longBank = isLongBank(question, compact);
  const [bankOpen, setBankOpen] = useState(false);

  const { lines: answerLines } = useAnswerLines(
    question.options ?? [],
    winW - 32,
    { max: compact ? 2 : 3 },
  );
  const visibleAnswerLines = compact
    ? Math.max(2, answerLines)
    : Math.max(3, answerLines);
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
              large
            />
          </View>
          {/* placed 일 때만 GhostChip 을 위에 오버레이 */}
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
  const disabled = placedWords.length === 0 || answerState !== "idle";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View entering={FadeIn.duration(150)} style={s.container}>
        {/* 제목은 고정 문구. 무엇을 보고 만드는지는 말풍선에 들어간다. */}
        <Text style={s.title}>
          {t(isReply ? "lesson.replyInKorean" : "lesson.translateSentence")}
        </Text>

        {/* 캐릭터 + 말풍선 */}
        <View style={[s.npcRow, compact && s.npcRowCompact]}>
          <LessonCharacter
            state={answerState}
            seed={question.id}
            height={compact ? 122 : 160}
          />

          <View style={s.bubble}>
            {/* 말풍선 꼬리 (테두리) */}
            <View style={s.tailBorder} />
            {/* 말풍선 꼬리 (안쪽 흰색) */}
            <View style={s.tailInner} />

            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={sourceText}
              disabled={!sourceText}
              onPress={playSourceText}
              hitSlop={8}
              activeOpacity={0.72}
              style={[s.audioBtn, isSpeaking && s.audioBtnActive]}
            >
              <Ionicons
                name={isSpeaking ? "volume-high" : "volume-medium"}
                size={20}
                color={isSpeaking ? "#FFFFFF" : "#1CB0F6"}
              />
            </TouchableOpacity>

            <View style={s.bubbleTextWrap}>
              <Text style={s.bubbleText}>
                {spokenWords.map((word, index) => (
                  <Text
                    key={word + "-" + index}
                    style={
                      index === activeSpokenWord
                        ? s.spokenWordActive
                        : undefined
                    }
                  >
                    {word.toLocaleLowerCase()}
                    {index < spokenWords.length - 1 ? " " : ""}
                  </Text>
                ))}
              </Text>
              <View style={s.dashedUnderline} />
            </View>
          </View>
        </View>

        {/* 답 영역 - 위/아래 두 줄 */}
        <View
          style={[
            s.answerArea,
            compact && s.answerAreaCompact,
            { minHeight: visibleAnswerLines * ANSWER_LINE_H },
          ]}
        >
          {/* 줄 (룰드 라인) */}
          {Array.from({ length: visibleAnswerLines }).map((_, i) => (
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
                  large
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

const styles = (theme: ThemeColors, lineH: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 12,
    },
    // 제목
    title: {
      fontSize: 24,
      lineHeight: 31,
      fontWeight: "900",
      color: theme.text,
      marginBottom: 14,
    },

    // 캐릭터 + 말풍선
    npcRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      height: 184,
    },
    npcRowCompact: { height: 148 },
    bubble: {
      flex: 1,
      backgroundColor: theme.surface,
      borderRadius: 22,
      borderWidth: 2,
      borderColor: theme.border,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      minHeight: 112,
      paddingVertical: 6,
      paddingHorizontal: 4,
      position: "relative",
      shadowColor: "#19132B",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
    },
    tailBorder: {
      position: "absolute",
      left: -12,
      top: "50%",
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
      top: "50%",
      marginTop: -7,
      width: 0,
      height: 0,
      borderTopWidth: 7,
      borderBottomWidth: 7,
      borderRightWidth: 10,
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
      borderRightColor: theme.surface,
    },
    audioBtn: {
      width: 34,
      height: 34,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
    audioBtnActive: { backgroundColor: "#1CB0F6" },
    bubbleTextWrap: { flex: 1 },
    bubbleText: {
      fontSize: 14,
      color: theme.textSecondary,
      fontWeight: "600",
      lineHeight: 22,
    },
    spokenWordActive: {
      color: theme.text,
      // backgroundColor: theme.text,
      fontWeight: "900",
    },
    dashedUnderline: {
      borderBottomWidth: 1.5,
      borderBottomColor: theme.textSecondary + "70",
      borderStyle: "dashed",
      marginTop: 7,
    },

    answerArea: {
      // 실제 높이는 렌더에서 minHeight 로 덮어쓴다 (줄 수가 칩 개수에 따라 변한다)
      marginTop: 34,
      marginBottom: 24,
      position: "relative",
    },
    answerAreaCompact: { marginTop: 16, marginBottom: 14 },
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
      paddingHorizontal: 4,
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
    emptyBankChip: {
      width: "100%",
      height: "100%",
      borderWidth: 1.5,
      borderBottomWidth: 3,
      borderRadius: 15,
    },
    // 확인 버튼
  });
