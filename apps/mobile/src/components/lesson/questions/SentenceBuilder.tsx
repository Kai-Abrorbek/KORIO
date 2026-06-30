import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Pressable,
} from "react-native";
import Animated, { FadeInDown, SlideInDown } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
import OwlMascot, { OwlState } from "@/components/lesson/OwlMascot";

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

export default function SentenceBuilder({
  question,
  answerState,
  onAnswer,
  theme,
  combo = 0,
}: Props) {
  const { t } = useTranslation();
  const s = styles(theme, LINE_H, ANSWER_LINES);
  const { speak, speakSlow, isSpeaking } = useSpeech();
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
      speak(question.answer);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const placedWords = words
    .filter((w) => w.zone === "placed")
    .sort((a, b) => a.placedIndex - b.placedIndex);
  const bankWords = words.filter((w) => w.zone === "bank");

  const LONG_SENTENCE_LEN = 18; // 이 글자 수 넘으면 단어장 접고 탭으로 펼침 (레벨업 긴 문장 대비)
  const isLong = (question.npcText?.length ?? 0) > LONG_SENTENCE_LEN;

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
    words.map((item) =>
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
    );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View entering={FadeInDown.duration(400)} style={s.container}>
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

        <View style={s.divider} />
        <View style={[s.divider, { marginTop: 10, marginBottom: 16 }]} />

        {/* 단어 뱅크 */}
        {!isLong ? (
          <View style={s.chipRow}>{renderBankChips()}</View>
        ) : (
          !bankOpen && (
            <TouchableOpacity
              style={s.bankHint}
              onPress={() => setBankOpen(true)}
              activeOpacity={0.7}
            >
              <Ionicons
                name="chevron-up"
                size={18}
                color={theme.textSecondary}
              />
              <Text style={s.bankHintText}>
                {t("lesson.tapToOpenWordBank")}
              </Text>
            </TouchableOpacity>
          )
        )}

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

        {/* 긴 문장용 슬라이드업 단어장 (답 영역은 위에 그대로 보임) */}
        <Modal
          visible={isLong && bankOpen}
          transparent
          animationType="none"
          onRequestClose={() => setBankOpen(false)}
        >
          <View style={s.sheetWrap}>
            <Pressable style={{ flex: 1 }} onPress={() => setBankOpen(false)} />
            <Animated.View
              entering={SlideInDown.springify().damping(18).mass(0.8)}
              style={s.sheet}
            >
              <View style={s.grabber} />
              <View style={s.chipRow}>{renderBankChips()}</View>
            </Animated.View>
          </View>
        </Modal>
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = (theme: ThemeColors, lineH: number, lines: number) =>
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
      marginBottom: 20,
    },
    npcRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      height: 180,
    },
    character: {
      width: 166,
      height: 180,
      alignItems: "center",
      justifyContent: "center",
    },
    characterImage: {
      width: 160,
      height: 180,
    },
    characterEmoji: {
      fontSize: 100,
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
      height: 180,
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
    bankHint: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingVertical: 18,
    },
    bankHintText: {
      color: theme.textSecondary,
      fontSize: 15,
      fontWeight: "600",
    },
    sheetWrap: { flex: 1, justifyContent: "flex-end" },
    sheet: {
      backgroundColor: theme.surface,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 32,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 16,
    },
    grabber: {
      alignSelf: "center",
      width: 40,
      height: 5,
      borderRadius: 99,
      backgroundColor: theme.border,
      marginBottom: 16,
    },
  });
