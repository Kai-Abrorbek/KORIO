import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { TopikTextBlocks } from "@/components/topik/TopikTextBlocks";
import { TopikChoiceList } from "@/components/topik/TopikChoiceList";
import { TopikStimulusCard } from "@/components/topik/TopikStimulusCard";
import { TopikService } from "@/services/topik.service";
import { useSpeech } from "@/hooks/useSpeech";
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
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const { speak, stop, isSpeaking } = useSpeech();

  /** questionId -> choiceKey */
  const [answers, setAnswers] = useState<Record<string, string>>({});
  /** `${questionId}:${fieldKey}` -> written answer */
  const [writtenAnswers, setWrittenAnswers] = useState<Record<string, string>>(
    {},
  );

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

  const total = set?.questions.length ?? 0;
  const answeredCount = useMemo(
    () =>
      (set?.questions ?? []).filter((question) => {
        if (question.responseType !== "written") return !!answers[question.id];
        const fields = question.writingConfig?.fields ?? [];
        return (
          fields.length > 0 &&
          fields.every((field) => {
            const value = writtenAnswers[`${question.id}:${field.key}`] ?? "";
            return value.trim().length >= field.minCharacters;
          })
        );
      }).length,
    [answers, set, writtenAnswers],
  );
  const allAnswered = total > 0 && answeredCount === total;
  const writtenOnly =
    total > 0 &&
    (set?.questions ?? []).every(
      (question) => question.responseType === "written",
    );

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

  const playQuestionAudio = (questionId: string, transcript: string) => {
    if (activeAudioId === questionId && isSpeaking) {
      stop();
      setActiveAudioId(null);
      return;
    }
    if (!transcript.trim()) return;
    setActiveAudioId(questionId);
    speak(transcript, "ko-KR");
  };

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
            ? writtenOnly
              ? `${answeredCount}/${total}`
              : `${correctCount}/${total}`
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
              {writtenOnly ? answeredCount : correctCount} / {total}
            </Text>
            <Text style={s.resultLabel}>
              {t(
                writtenOnly
                  ? "topik.recipe.writingResultTitle"
                  : "topik.recipe.resultTitle",
              )}
            </Text>
          </View>
        )}

        {set.questions.map((question, index) => {
          const picked = answers[question.id];
          const answerKey = solutionById.get(question.id)?.correctChoiceKey;
          const solution = solutionById.get(question.id)?.solution;
          const graded = phase === "result" && !!answerKey;
          const transcript = (question.audio?.transcript ?? [])
            .map((line) => line.text)
            .join(" ");

          return (
            <View key={question.id} style={s.qCard}>
              {question.stimulus && (
                <View style={s.stimulusWrap}>
                  <TopikStimulusCard stimulus={question.stimulus} />
                </View>
              )}

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

              {!!transcript && (
                <View style={s.audioCard}>
                  <Pressable
                    style={s.audioButton}
                    onPress={() => playQuestionAudio(question.id, transcript)}
                  >
                    <Ionicons
                      name={
                        activeAudioId === question.id && isSpeaking
                          ? "stop"
                          : "play"
                      }
                      size={17}
                      color="#fff"
                    />
                    <Text style={s.audioButtonText}>
                      {t(
                        activeAudioId === question.id && isSpeaking
                          ? "topik.recipe.stopAudio"
                          : "topik.recipe.listenAudio",
                      )}
                    </Text>
                  </Pressable>
                  {phase === "result" && (
                    <View style={s.transcript}>
                      {question.audio?.transcript.map((line, lineIndex) => (
                        <View
                          key={`${question.id}-line-${lineIndex}`}
                          style={s.audioLine}
                        >
                          {!!line.speaker && (
                            <Text style={s.speaker}>{line.speaker}</Text>
                          )}
                          <Text style={s.audioText}>{line.text}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              )}

              {question.responseType === "written" ? (
                <View style={s.writingStack}>
                  {!!question.writingConfig && (
                    <Text style={s.writingGuide}>
                      {topikText(question.writingConfig.guide, lang)}
                    </Text>
                  )}
                  {(question.writingConfig?.fields ?? []).map((field) => {
                    const key = `${question.id}:${field.key}`;
                    const value = writtenAnswers[key] ?? "";
                    return (
                      <View key={key} style={s.writingField}>
                        <View style={s.writingFieldHead}>
                          <Text style={s.writingLabel}>{field.label}</Text>
                          <Text style={s.characterCount}>
                            {value.length}/{field.maxCharacters}
                          </Text>
                        </View>
                        <TextInput
                          editable={phase === "solving"}
                          maxLength={field.maxCharacters}
                          multiline={field.multiline}
                          onChangeText={(text) =>
                            setWrittenAnswers((prev) => ({
                              ...prev,
                              [key]: text,
                            }))
                          }
                          placeholder={t("topik.recipe.writingPlaceholder")}
                          placeholderTextColor={palette.textSubtle}
                          style={[
                            s.writingInput,
                            field.multiline && s.writingInputMultiline,
                          ]}
                          textAlignVertical={field.multiline ? "top" : "center"}
                          value={value}
                        />
                        {phase === "solving" &&
                          value.trim().length < field.minCharacters && (
                            <Text style={s.minimumText}>
                              {t("topik.recipe.minimumCharacters", {
                                count: field.minCharacters,
                              })}
                            </Text>
                          )}
                      </View>
                    );
                  })}
                  {phase === "result" && solution?.sampleAnswer && (
                    <View style={s.sampleCard}>
                      <Text style={s.sampleTitle}>
                        {t("topik.recipe.sampleAnswer")}
                      </Text>
                      <Text style={s.sampleText}>{solution.sampleAnswer}</Text>
                      {(solution.rubric ?? []).map((item, rubricIndex) => (
                        <Text
                          key={`${question.id}-rubric-${rubricIndex}`}
                          style={s.rubricText}
                        >
                          {rubricIndex + 1}. {topikText(item, lang)}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ) : (
                <View style={s.qChoices}>
                  <TopikChoiceList
                    choices={question.choices}
                    layout={question.presentation?.choiceLayout ?? "one_column"}
                    selectedChoiceKey={picked}
                    correctChoiceKey={graded ? answerKey : undefined}
                    disabled={phase === "result"}
                    onSelect={(choiceKey) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [question.id]: choiceKey,
                      }))
                    }
                  />
                </View>
              )}
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
    stimulusWrap: { marginBottom: 16, borderRadius: 12, overflow: "hidden" },
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
    audioCard: {
      marginTop: 14,
      gap: 12,
      padding: 13,
      borderRadius: 13,
      backgroundColor: p.surfaceMuted,
    },
    audioButton: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      paddingHorizontal: 13,
      paddingVertical: 9,
      borderRadius: 999,
      backgroundColor: p.primary,
    },
    audioButtonText: { color: "#fff", fontSize: 12, fontWeight: "800" },
    transcript: { gap: 7 },
    audioLine: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
    speaker: {
      minWidth: 22,
      color: p.primaryText,
      fontSize: 12,
      fontWeight: "900",
    },
    audioText: { flex: 1, color: p.text, fontSize: 13, lineHeight: 21 },
    writingStack: { marginTop: 16, gap: 15 },
    writingGuide: {
      padding: 13,
      borderRadius: 12,
      backgroundColor: p.primarySoft,
      color: p.primaryText,
      fontSize: 12,
      lineHeight: 19,
    },
    writingField: { gap: 7 },
    writingFieldHead: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
    },
    writingLabel: { color: p.text, fontSize: 13, fontWeight: "800" },
    characterCount: { color: p.textSubtle, fontSize: 11 },
    writingInput: {
      minHeight: 54,
      paddingHorizontal: 13,
      paddingVertical: 11,
      borderWidth: 1.5,
      borderColor: p.borderStrong,
      borderRadius: 13,
      backgroundColor: p.surface,
      color: p.text,
      fontSize: 14,
      lineHeight: 22,
    },
    writingInputMultiline: { minHeight: 150 },
    minimumText: { color: p.textSubtle, fontSize: 10 },
    sampleCard: {
      gap: 9,
      padding: 14,
      borderRadius: 13,
      backgroundColor: p.successSoft,
      borderWidth: 1,
      borderColor: p.successBorder,
    },
    sampleTitle: { color: p.successText, fontSize: 13, fontWeight: "900" },
    sampleText: { color: p.text, fontSize: 13, lineHeight: 22 },
    rubricText: { color: p.textSecondary, fontSize: 12, lineHeight: 19 },

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
