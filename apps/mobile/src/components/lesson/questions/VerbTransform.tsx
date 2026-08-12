import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useState, useMemo, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useSpeech } from "@/hooks/useSpeech";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  theme: ThemeColors;
  combo?: number;
}

interface Syl {
  id: string;
  char: string;
}

export default function VerbTransform({
  question,
  answerState,
  onAnswer,
  theme,
}: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const s = styles(theme, insets.bottom);
  const { speak } = useSpeech();
  const locked = answerState !== "idle";

  // baseWord = 기본형, targetForm = 목표 형태, options = 음절 칩, answer = 활용형
  const bank = useMemo<Syl[]>(
    () =>
      [...(question.options ?? [])]
        .sort(() => Math.random() - 0.5)
        .map((c, i) => ({ id: `s-${i}`, char: c })),
    [question.options],
  );
  const [placedIds, setPlacedIds] = useState<string[]>([]);
  const placed = placedIds
    .map((id) => bank.find((b) => b.id === id)!)
    .filter(Boolean);
  const built = placed.map((p) => p.char).join("");
  const complete = built.length >= (question.answer?.length ?? 1);

  // 완성되면 한 번 밝아지고 그 상태로 둔다.
  // 계속 깜빡이면 답을 확인하려는 순간에 시선이 흔들린다.
  const glow = useSharedValue(0);
  useEffect(() => {
    glow.value = withTiming(complete ? 1 : 0, { duration: 200 });
  }, [complete]);
  const glowStyle = useAnimatedStyle(() => ({
    shadowOpacity: glow.value * 0.6,
    borderColor: complete ? theme.primary : theme.border,
  }));

  const tapSyl = (id: string) => {
    if (locked || placedIds.includes(id)) return;
    Haptics.selectionAsync();
    setPlacedIds((prev) => [...prev, id]);
  };

  const popSyl = () => {
    if (locked || placedIds.length === 0) return;
    Haptics.selectionAsync();
    setPlacedIds((prev) => prev.slice(0, -1));
  };

  const check = () => {
    if (!built || locked) return;
    onAnswer(built);
  };

  return (
    <View style={s.container}>
      <Animated.Text entering={FadeIn.duration(150)} style={s.title}>
        {t("lesson.verbTransform")}
      </Animated.Text>

      {/* 변형 카드: 기본형 → 목표형 */}
      <Animated.View entering={FadeIn.duration(150)} style={s.morphRow}>
        <TouchableOpacity
          style={s.baseCard}
          onPress={() => speak(question.baseWord ?? "")}
          activeOpacity={0.8}
        >
          <Text style={s.baseWord}>{question.baseWord}</Text>
          <Ionicons
            name="volume-medium"
            size={16}
            color={theme.textSecondary}
          />
        </TouchableOpacity>

        <View style={s.arrowWrap}>
          <Ionicons name="arrow-forward" size={22} color={theme.primary} />
        </View>

        <View style={s.targetBadge}>
          <Text style={s.targetText}>{question.targetForm}</Text>
        </View>
      </Animated.View>

      {/* 조립 미리보기 */}
      <Animated.View style={[s.preview, glowStyle]}>
        {built ? (
          <TouchableOpacity onPress={popSyl} activeOpacity={0.7}>
            <Text style={[s.previewText, complete && { color: theme.primary }]}>
              {built}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={s.previewPlaceholder}>
            {"＿".repeat(question.answer?.length ?? 3)}
          </Text>
        )}
        {placedIds.length > 0 ? (
          <TouchableOpacity onPress={popSyl} hitSlop={10} style={s.backspace}>
            <Ionicons
              name="backspace-outline"
              size={22}
              color={theme.textSecondary}
            />
          </TouchableOpacity>
        ) : null}
      </Animated.View>

      {/* 음절 칩 */}
      <View style={s.bank}>
        {bank.map((syl, i) => {
          const used = placedIds.includes(syl.id);
          return (
            <Animated.View key={syl.id} entering={FadeIn.duration(150)}>
              <TouchableOpacity
                disabled={locked || used}
                onPress={() => tapSyl(syl.id)}
                activeOpacity={0.8}
                style={[s.sylChip, used && s.sylChipUsed]}
              >
                <Text style={[s.sylText, used && { color: "transparent" }]}>
                  {syl.char}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      <View style={{ flex: 1 }} />

      <TouchableOpacity
        style={[s.checkBtn, (!built || locked) && s.checkBtnDisabled]}
        onPress={check}
        disabled={!built || locked}
        activeOpacity={0.9}
      >
        <Text style={s.checkBtnText}>{t("lesson.check")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = (theme: ThemeColors, bottomInset = 0) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: bottomInset + 12,
    },
    title: {
      fontSize: 20,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 18,
    },
    morphRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      marginBottom: 24,
    },
    baseCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 16,
      paddingHorizontal: 18,
      paddingVertical: 14,
    },
    baseWord: { fontSize: 22, fontWeight: "800", color: theme.text },
    arrowWrap: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: theme.primary + "14",
      alignItems: "center",
      justifyContent: "center",
    },
    targetBadge: {
      backgroundColor: theme.primary,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderBottomWidth: 3,
      borderBottomColor: "#5B52C7",
    },
    targetText: { fontSize: 14, fontWeight: "800", color: "#fff" },
    preview: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderRadius: 20,
      paddingVertical: 22,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 24,
      shadowColor: "#776ee2",
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 12,
      elevation: 4,
    },
    previewText: {
      fontSize: 32,
      fontWeight: "800",
      color: theme.text,
      letterSpacing: 2,
    },
    previewPlaceholder: {
      fontSize: 32,
      fontWeight: "800",
      color: theme.border,
      letterSpacing: 4,
    },
    backspace: { position: "absolute", right: 16, top: "50%" },
    bank: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      justifyContent: "center",
    },
    sylChip: {
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 14,
      width: 56,
      height: 56,
      alignItems: "center",
      justifyContent: "center",
    },
    sylChipUsed: { backgroundColor: theme.border, borderColor: theme.border },
    sylText: { fontSize: 22, fontWeight: "800", color: theme.text },
    checkBtn: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: "center",
      marginTop: 12,
      borderBottomWidth: 4,
      borderBottomColor: "#5B52C7",
    },
    checkBtnDisabled: {
      backgroundColor: theme.border,
      borderBottomColor: theme.border,
    },
    checkBtnText: { color: "#fff", fontSize: 17, fontWeight: "800" },
  });
