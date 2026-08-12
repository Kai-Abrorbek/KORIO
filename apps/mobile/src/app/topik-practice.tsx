import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { TopikTextBlocks } from "@/components/topik/TopikTextBlocks";
import { TopikService } from "@/services/topik.service";
import {
  type TopikPalette,
  useTopikTheme,
} from "@/components/topik/topikTheme";
import {
  MOCK_RECIPE_PRACTICE,
  MOCK_RECIPE_SOLUTIONS,
} from "@/mocks/topik-recipe.mock";
import { toTopikLanguage, topikText } from "@/types/topik";
import type {
  TopikRecipePractice,
  TopikRecipeSolutionEntry,
} from "@/types/topik-recipe";

const CHOICE_MARK = ["①", "②", "③", "④"];

type Phase = "solving" | "result";

export default function TopikPracticeScreen() {
  const { t, i18n } = useTranslation();
  const palette = useTopikTheme();
  const s = useMemo(() => styles(palette), [palette]);
  const lang = toTopikLanguage(i18n.language);
  const insets = useSafeAreaInsets();
  const { groupCode } = useLocalSearchParams<{ groupCode?: string }>();

  const [set, setSet] = useState<TopikRecipePractice | null>(null);
  const [solutions, setSolutions] = useState<TopikRecipeSolutionEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<Phase>("solving");

  /** questionId -> choiceKey */
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const code = groupCode || "reading-01-02";

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      try {
        const data = await TopikService.getRecipePractice(code);
        if (alive) setSet(data);
      } catch {
        if (alive) setSet(MOCK_RECIPE_PRACTICE);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [code]);

  const answeredCount = Object.keys(answers).length;
  const total = set?.questions.length ?? 0;
  const allAnswered = total > 0 && answeredCount === total;

  const solutionById = useMemo(
    () => new Map(solutions.map((x) => [x.id, x])),
    [solutions],
  );

  const correctCount = useMemo(() => {
    if (phase !== "result") return 0;
    return (set?.questions ?? []).reduce((n, q) => {
      const key = solutionById.get(q.id)?.correctChoiceKey;
      return key && answers[q.id] === key ? n + 1 : n;
    }, 0);
  }, [phase, set, answers, solutionById]);

  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!allAnswered || submitting) return;
    setSubmitting(true);
    try {
      // 정답은 제출 시점에만 받아온다 (클라이언트에 미리 내려주지 않는다)
      const data = await TopikService.getRecipePracticeSolutions(code);
      setSolutions(data);
    } catch {
      setSolutions(MOCK_RECIPE_SOLUTIONS as TopikRecipeSolutionEntry[]);
    } finally {
      setSubmitting(false);
      setPhase("result");
    }
  };

  if (loading || !set) {
    return (
      <SafeAreaView style={s.center} edges={["top", "bottom"]}>
        <ActivityIndicator size="large" color={palette.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.container} edges={["top"]}>
      <View style={s.header}>
        <Pressable onPress={() => router.back()} hitSlop={10} style={s.backBtn}>
          <Ionicons name="chevron-back" size={24} color={palette.text} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={s.headerLabel}>{topikText(set.label, lang)}</Text>
          <Text style={s.headerTitle}>{t("topik.recipe.practice")}</Text>
        </View>
        <Text style={s.progress}>
          {phase === "result"
            ? `${correctCount}/${total}`
            : `${answeredCount}/${total}`}
        </Text>
      </View>

      {/* 진행 바 */}
      <View style={s.progressTrack}>
        <View
          style={[
            s.progressFill,
            { width: `${total ? (answeredCount / total) * 100 : 0}%` },
          ]}
        />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
      >
        {phase === "result" && (
          <View style={s.resultCard}>
            <Text style={s.resultScore}>
              {correctCount} / {total}
            </Text>
            <Text style={s.resultLabel}>{t("topik.recipe.resultTitle")}</Text>
          </View>
        )}

        {set.questions.map((question, index) => {
          const picked = answers[question.id];
          const answerKey = solutionById.get(question.id)?.correctChoiceKey;
          const graded = phase === "result" && !!answerKey;

          return (
            <View key={question.id} style={s.qCard}>
              <View style={s.qHead}>
                {/*
                  question.number 는 문항 은행 안의 저장 번호(11~30)라
                  화면에는 세트 안 순서를 쓴다.
                */}
                <Text style={s.qNumber}>{index + 1}.</Text>
                <View style={{ flex: 1 }}>
                  <TopikTextBlocks blocks={question.prompt} />
                </View>
              </View>

              <View style={s.qChoices}>
                {question.choices.map((choice, i) => {
                  const isPicked = picked === choice.key;
                  const isAnswer = graded && answerKey === choice.key;
                  const isWrongPick = graded && isPicked && !isAnswer;

                  return (
                    <Pressable
                      key={choice.key}
                      disabled={phase === "result"}
                      onPress={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          [question.id]: choice.key,
                        }))
                      }
                      style={[
                        s.choice,
                        isPicked && s.choicePicked,
                        isAnswer && s.choiceCorrect,
                        isWrongPick && s.choiceWrong,
                      ]}
                    >
                      <Text
                        style={[
                          s.choiceMark,
                          isAnswer && { color: palette.successText },
                          isWrongPick && { color: palette.dangerText },
                        ]}
                      >
                        {CHOICE_MARK[i] ?? `${i + 1}`}
                      </Text>
                      <Text
                        style={[
                          s.choiceText,
                          isPicked && { fontWeight: "800" },
                          isAnswer && { color: palette.successText },
                          isWrongPick && { color: palette.dangerText },
                        ]}
                      >
                        {choice.text}
                      </Text>
                      {isAnswer && (
                        <Ionicons
                          name="checkmark-circle"
                          size={20}
                          color={palette.successText}
                        />
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* 하단 고정 — 네비게이션 바 위로 띄운다 */}
      <View style={[s.footer, { paddingBottom: insets.bottom + 12 }]}>
        {phase === "solving" ? (
          <Pressable
            onPress={submit}
            disabled={!allAnswered}
            style={[s.submitBtn, !allAnswered && s.submitBtnDisabled]}
          >
            <Text
              style={[
                s.submitText,
                !allAnswered && { color: palette.textSubtle },
              ]}
            >
              {t("topik.recipe.submit")}
            </Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => router.back()} style={s.submitBtn}>
            <Text style={s.submitText}>{t("topik.recipe.backToRecipe")}</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = (p: TopikPalette) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: p.bg },
    center: {
      flex: 1,
      backgroundColor: p.bg,
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    backBtn: { padding: 4 },
    headerLabel: { fontSize: 12, fontWeight: "700", color: p.textSubtle },
    headerTitle: { fontSize: 18, fontWeight: "800", color: p.text },
    progress: { fontSize: 15, fontWeight: "800", color: p.primaryText },

    progressTrack: {
      height: 6,
      backgroundColor: p.surfaceMuted,
      marginHorizontal: 20,
      borderRadius: 3,
      overflow: "hidden",
    },
    progressFill: { height: "100%", backgroundColor: p.primary },

    scroll: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 32 },

    resultCard: {
      alignItems: "center",
      padding: 22,
      borderRadius: 16,
      backgroundColor: p.primarySoft,
      marginBottom: 20,
    },
    resultScore: { fontSize: 34, fontWeight: "900", color: p.primaryText },
    resultLabel: {
      marginTop: 4,
      fontSize: 13,
      fontWeight: "700",
      color: p.primaryText,
    },

    qCard: {
      padding: 18,
      borderRadius: 16,
      backgroundColor: p.paper,
      borderWidth: 1,
      borderColor: p.border,
      marginBottom: 14,
    },
    qHead: { flexDirection: "row", gap: 8 },
    qNumber: { fontSize: 17, fontWeight: "800", color: p.text },
    qChoices: { marginTop: 14, gap: 8 },
    choice: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 12,
      paddingHorizontal: 14,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: p.border,
      backgroundColor: p.surface,
    },
    choicePicked: { borderColor: p.primary, backgroundColor: p.primarySoft },
    choiceCorrect: {
      borderColor: p.successBorder,
      backgroundColor: p.successSoft,
    },
    choiceWrong: { borderColor: p.danger, backgroundColor: p.dangerSoft },
    choiceMark: { fontSize: 15, color: p.textSecondary },
    choiceText: { flex: 1, fontSize: 15, color: p.text, lineHeight: 22 },

    footer: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 12,
      borderTopWidth: 1,
      borderTopColor: p.divider,
    },
    submitBtn: {
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: "center",
      backgroundColor: p.primary,
    },
    submitBtnDisabled: { backgroundColor: p.surfaceMuted },
    submitText: { fontSize: 16, fontWeight: "800", color: "#fff" },
  });
