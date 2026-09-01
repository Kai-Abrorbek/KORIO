import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useSpeech } from "@/hooks/useSpeech";
import { shuffle } from "@/utils/shuffle";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  theme: ThemeColors;
  combo?: number;
}

export default function ReadingQuiz({
  question,
  answerState,
  onAnswer,
  theme,
}: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const s = styles(theme, insets.bottom);
  const { speak, isSpeaking } = useSpeech();
  const [selected, setSelected] = useState<string | null>(null);
  const locked = answerState !== "idle";

  const passage = question.passage ?? "";
  // 시드는 정답을 첫 칸에 적어 둔다(사람이 읽고 검수하기 좋게). 그대로 내보내면
  // 두 번째 풀 때부터 내용이 아니라 자리로 답을 외운다. question.id 로 고정해서
  // 한 문제 안에서는 다시 섞이지 않게 한다.
  const options = useMemo(
    () => shuffle(question.options ?? []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [question.id],
  );
  const wordCount = passage.split(/\s+/).filter(Boolean).length;

  const select = (opt: string) => {
    if (locked) return;
    Haptics.selectionAsync();
    setSelected((prev) => (prev === opt ? null : opt));
  };

  const check = () => {
    if (!selected || locked) return;
    onAnswer(selected);
  };

  return (
    <View style={s.container}>
      <Animated.Text entering={FadeIn.duration(150)} style={s.title}>
        {t("lesson.readingQuiz")}
      </Animated.Text>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 지문 카드 — 종이 느낌 */}
        <Animated.View entering={FadeIn.duration(150)} style={s.paper}>
          <View style={s.paperHeader}>
            <View style={s.paperTitleWrap}>
              <Text style={s.paperIcon}>📖</Text>
              {question.passageTitle ? (
                <Text style={s.paperTitle} numberOfLines={1}>
                  {question.passageTitle}
                </Text>
              ) : null}
            </View>
            <TouchableOpacity
              onPress={() => speak(passage)}
              hitSlop={10}
              style={[s.speakBtn, isSpeaking && s.speakBtnActive]}
            >
              <Ionicons
                name={isSpeaking ? "volume-high" : "volume-medium"}
                size={20}
                color={isSpeaking ? "#fff" : theme.primary}
              />
            </TouchableOpacity>
          </View>

          <Text style={s.passage}>{passage}</Text>

          <View style={s.paperFooter}>
            <Text style={s.wordCount}>
              {t("lesson.wordCount", { count: wordCount })}
            </Text>
          </View>
        </Animated.View>

        {/* 질문 */}
        <Animated.View entering={FadeIn.duration(150)}>
          <Text style={s.questionText}>{question.question}</Text>
        </Animated.View>

        {/* 선택지 — 3D 버튼, 스태거 등장 */}
        {options.map((opt, i) => {
          const isSel = selected === opt;
          return (
            <Animated.View key={opt} entering={FadeIn.duration(150)}>
              <TouchableOpacity
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
            </Animated.View>
          );
        })}
      </ScrollView>

      {/* 하단 고정 확인 버튼 */}
      <TouchableOpacity
        style={[s.checkBtn, (!selected || locked) && s.checkBtnDisabled]}
        onPress={check}
        disabled={!selected || locked}
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
      marginBottom: 14,
    },
    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 12 },
    paper: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderBottomWidth: 4,
      padding: 18,
      marginBottom: 18,
    },
    paperHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    paperTitleWrap: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      flex: 1,
    },
    paperIcon: { fontSize: 18 },
    paperTitle: {
      fontSize: 16,
      fontWeight: "800",
      color: theme.text,
      flex: 1,
    },
    speakBtn: {
      width: 36,
      height: 36,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.primary + "14",
    },
    speakBtnActive: { backgroundColor: theme.primary },
    passage: {
      fontSize: 17,
      lineHeight: 28,
      color: theme.text,
      fontWeight: "500",
    },
    paperFooter: {
      marginTop: 14,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      alignItems: "flex-end",
    },
    wordCount: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    questionText: {
      fontSize: 17,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 14,
      lineHeight: 25,
    },
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
