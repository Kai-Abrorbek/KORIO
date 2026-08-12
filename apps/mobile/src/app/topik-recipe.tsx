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
import { SafeAreaView } from "react-native-safe-area-context";
import { TopikTextBlocks } from "@/components/topik/TopikTextBlocks";
import { TopikService } from "@/services/topik.service";
import { TopikSideSheet } from "@/components/topik/TopikSideSheet";
import {
  type TopikPalette,
  useTopikTheme,
} from "@/components/topik/topikTheme";
import { MOCK_RECIPE_DETAIL } from "@/mocks/topik-recipe.mock";
import { toTopikLanguage, topikText } from "@/types/topik";
import type {
  TopikGrammarSection,
  TopikRecipeDetail,
  TopikRecipeQuestion,
} from "@/types/topik-recipe";

const CHOICE_MARK = ["①", "②", "③", "④"];

export default function TopikRecipeScreen() {
  const { t, i18n } = useTranslation();
  const palette = useTopikTheme();
  const s = useMemo(() => styles(palette), [palette]);
  const lang = toTopikLanguage(i18n.language);
  const { groupCode } = useLocalSearchParams<{ groupCode?: string }>();

  const [recipe, setRecipe] = useState<TopikRecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  /** 열려 있는 해설의 문항 id */
  const [openSolutionId, setOpenSolutionId] = useState<string | null>(null);
  /** 열려 있는 문법 묶음 key */
  const [openGrammarKey, setOpenGrammarKey] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    const code = groupCode || "reading-01-02";

    (async () => {
      setLoading(true);
      try {
        const data = await TopikService.getRecipe(code);
        if (alive) setRecipe(data);
      } catch {
        // 시드 전이거나 오프라인이면 mock 으로 화면은 뜨게 둔다
        if (alive) setRecipe(MOCK_RECIPE_DETAIL);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [groupCode]);

  const openSolution = useMemo(
    () => recipe?.examples.find((q) => q.id === openSolutionId) ?? null,
    [recipe, openSolutionId],
  );
  const openGrammar = useMemo(
    () => recipe?.grammarSections.find((g) => g.key === openGrammarKey) ?? null,
    [recipe, openGrammarKey],
  );

  if (loading || !recipe) {
    return (
      <SafeAreaView style={s.center} edges={["top", "bottom"]}>
        <ActivityIndicator size="large" color={palette.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.container} edges={["top"]}>
      {/* 헤더 */}
      <View style={s.header}>
        <Pressable onPress={() => router.back()} hitSlop={10} style={s.backBtn}>
          <Ionicons name="chevron-back" size={24} color={palette.text} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={s.headerLabel}>{topikText(recipe.label, lang)}</Text>
          <Text style={s.headerTitle}>{topikText(recipe.title, lang)}</Text>
        </View>
        <View style={s.levelChip}>
          <Text style={s.levelChipText}>
            {t("topik.recipe.level", { level: recipe.targetLevel })}
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* 유형 소개 */}
        <View style={s.introBox}>
          <Text style={s.introText}>{topikText(recipe.intro, lang)}</Text>
        </View>

        {/* 황금 레시피 */}
        <SectionLabel palette={palette} text={t("topik.recipe.golden")} />
        <View style={s.recipeCard}>
          {recipe.goldenRecipe.map((tip) => (
            <View key={tip.order} style={s.tipRow}>
              <View style={s.tipBadge}>
                <Text style={s.tipBadgeText}>{tip.order}</Text>
              </View>
              <Text style={s.tipText}>{topikText(tip.text, lang)}</Text>
            </View>
          ))}
        </View>

        {/* 자주 출제되는 문법 */}
        {recipe.grammarSections.length > 0 && (
          <>
            <SectionLabel palette={palette} text={t("topik.recipe.grammar")} />
            <View style={s.grammarRow}>
              {recipe.grammarSections.map((section) => (
                <Pressable
                  key={section.key}
                  style={s.grammarBtn}
                  onPress={() => setOpenGrammarKey(section.key)}
                >
                  <Ionicons
                    name="library-outline"
                    size={20}
                    color={palette.primary}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={s.grammarBtnTitle}>
                      {topikText(section.title, lang)}
                    </Text>
                    <Text style={s.grammarBtnMeta}>
                      {t("topik.recipe.grammarCount", {
                        count: section.entries.length,
                      })}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={palette.textSubtle}
                  />
                </Pressable>
              ))}
            </View>
          </>
        )}

        {/* 기출문제 */}
        <SectionLabel
          palette={palette}
          text={t("topik.recipe.pastQuestions")}
        />
        {recipe.examples.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            palette={palette}
            s={s}
            onOpenSolution={() => setOpenSolutionId(question.id)}
            solutionLabel={t("topik.recipe.showSolution")}
          />
        ))}

        {/* 예상문제 진입 */}
        <Pressable
          style={s.practiceBtn}
          onPress={() =>
            router.push({
              pathname: "/topik-practice",
              params: { groupCode: recipe.groupCode },
            })
          }
        >
          <View style={{ flex: 1 }}>
            <Text style={s.practiceTitle}>{t("topik.recipe.practice")}</Text>
            <Text style={s.practiceMeta}>
              {t("topik.recipe.practiceCount", {
                count: recipe.practiceCount,
              })}
            </Text>
          </View>
          <Ionicons name="arrow-forward" size={22} color="#fff" />
        </Pressable>
      </ScrollView>

      {/* 해설 — 옆에서 슥 */}
      <TopikSideSheet
        visible={!!openSolution}
        onClose={() => setOpenSolutionId(null)}
        title={t("topik.recipe.solution")}
        subtitle={
          openSolution
            ? t("topik.recipe.questionNo", { number: openSolution.number })
            : undefined
        }
      >
        {openSolution && (
          <SolutionBody question={openSolution} s={s} lang={lang} t={t} />
        )}
      </TopikSideSheet>

      {/* 문법 — 옆에서 슥, 내부 스크롤 */}
      <TopikSideSheet
        visible={!!openGrammar}
        onClose={() => setOpenGrammarKey(null)}
        title={openGrammar ? topikText(openGrammar.title, lang) : ""}
        subtitle={t("topik.recipe.grammarSubtitle")}
      >
        {openGrammar && (
          <GrammarBody
            section={openGrammar}
            palette={palette}
            s={s}
            lang={lang}
          />
        )}
      </TopikSideSheet>
    </SafeAreaView>
  );
}

function SectionLabel({
  palette,
  text,
}: {
  palette: TopikPalette;
  text: string;
}) {
  return (
    <View style={{ marginTop: 26, marginBottom: 12 }}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "800",
          color: palette.textSecondary,
          letterSpacing: 0.2,
        }}
      >
        {text}
      </Text>
    </View>
  );
}

function QuestionCard({
  question,
  palette,
  s,
  onOpenSolution,
  solutionLabel,
}: {
  question: TopikRecipeQuestion;
  palette: TopikPalette;
  s: ReturnType<typeof styles>;
  onOpenSolution: () => void;
  solutionLabel: string;
}) {
  return (
    <View style={s.qCard}>
      <View style={s.qHead}>
        <Text style={s.qNumber}>{question.number}.</Text>
        <View style={{ flex: 1 }}>
          <TopikTextBlocks blocks={question.prompt} />
        </View>
      </View>

      <View style={s.qChoices}>
        {question.choices.map((choice, i) => (
          <View key={choice.key} style={s.qChoice}>
            <Text style={s.qChoiceMark}>{CHOICE_MARK[i] ?? `${i + 1}`}</Text>
            <Text style={s.qChoiceText}>{choice.text}</Text>
          </View>
        ))}
      </View>

      <View style={s.qFooter}>
        {!!question.tags[0] && (
          <Text style={s.qSource}>{question.tags[0]}</Text>
        )}
        <Pressable style={s.solutionBtn} onPress={onOpenSolution}>
          <Ionicons name="reader-outline" size={16} color={palette.primary} />
          <Text style={s.solutionBtnText}>{solutionLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function SolutionBody({
  question,
  s,
  lang,
  t,
}: {
  question: TopikRecipeQuestion;
  s: ReturnType<typeof styles>;
  lang: ReturnType<typeof toTopikLanguage>;
  t: (key: string, opts?: Record<string, unknown>) => string;
}) {
  const answerIndex = question.choices.findIndex(
    (c) => c.key === question.correctChoiceKey,
  );
  const answer = question.choices[answerIndex];

  // 문장 흐름과 해설은 한국어 원문이 학습 대상이라 항상 같이 보여준다.
  // 학습자 언어 번역은 그 아래에 덧붙인다.
  const flowKo = topikText(question.solution?.strategy, "ko");
  const flowLocal =
    lang === "ko" ? "" : topikText(question.solution?.strategy, lang);
  const explainKo = topikText(question.solution?.explanation, "ko");
  const explainLocal =
    lang === "ko" ? "" : topikText(question.solution?.explanation, lang);

  return (
    <View>
      {/* 정답 */}
      <View style={s.answerBox}>
        <Text style={s.answerLead}>
          {t("topik.recipe.answerIs", { mark: CHOICE_MARK[answerIndex] ?? "" })}
        </Text>
        <Text style={s.answerLabel}>{answer?.text ?? ""}</Text>
      </View>

      {/* 문장 흐름 (앞 → 뒤) — 한국어 원문 */}
      {!!flowKo && (
        <View style={s.flowBox}>
          <Text style={s.flowKo}>{flowKo}</Text>
          {!!flowLocal && <Text style={s.flowLocal}>{flowLocal}</Text>}
        </View>
      )}

      {/* 해설 본문 */}
      {!!explainKo && <Text style={s.solutionKo}>{explainKo}</Text>}
      {!!explainLocal && <Text style={s.solutionText}>{explainLocal}</Text>}

      {/* 선택지별 메모 */}
      {(question.solution?.choiceNotes ?? []).map((note) => {
        const idx = question.choices.findIndex((c) => c.key === note.choiceKey);
        return (
          <View key={note.choiceKey} style={s.noteRow}>
            <Text style={s.noteMark}>{CHOICE_MARK[idx] ?? ""}</Text>
            <Text style={s.noteText}>{topikText(note.note, lang)}</Text>
          </View>
        );
      })}
    </View>
  );
}

function GrammarBody({
  section,
  palette,
  s,
  lang,
}: {
  section: TopikGrammarSection;
  palette: TopikPalette;
  s: ReturnType<typeof styles>;
  lang: ReturnType<typeof toTopikLanguage>;
}) {
  return (
    <View>
      {section.entries.map((entry) => (
        <View key={entry.rank} style={s.gEntry}>
          <View style={s.gHead}>
            <View style={s.gRank}>
              <Text style={s.gRankText}>
                {String(entry.rank).padStart(2, "0")}
              </Text>
            </View>
            <Text style={s.gForm}>{entry.form}</Text>
          </View>

          {entry.meanings.map((meaning, i) => (
            <View key={i} style={s.gMeaningRow}>
              {entry.meanings.length > 1 && (
                <Text style={s.gMeaningMark}>{CHOICE_MARK[i]}</Text>
              )}
              <View style={{ flex: 1 }}>
                <Text style={s.gMeaning}>{topikText(meaning, lang)}</Text>
                {!!entry.examples[i] && (
                  <Text style={s.gExample}>{entry.examples[i]}</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      ))}

      {section.tips.map((tip, i) => (
        <View key={i} style={s.gTip}>
          <Ionicons name="bulb" size={16} color={palette.warningText} />
          <Text style={s.gTipText}>{topikText(tip, lang)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = (p: TopikPalette) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: p.bg, marginBottom: 20 },
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
      borderBottomWidth: 1,
      borderBottomColor: p.divider,
    },
    backBtn: { padding: 4 },
    headerLabel: { fontSize: 12, fontWeight: "700", color: p.textSubtle },
    headerTitle: { fontSize: 18, fontWeight: "800", color: p.text },
    levelChip: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 999,
      backgroundColor: p.primarySoft,
    },
    levelChipText: { fontSize: 12, fontWeight: "800", color: p.primaryText },

    scroll: { paddingHorizontal: 20, paddingBottom: 40 },

    introBox: {
      marginTop: 18,
      padding: 16,
      borderRadius: 14,
      backgroundColor: p.surfaceMuted,
      borderLeftWidth: 4,
      borderLeftColor: p.primary,
    },
    introText: {
      fontSize: 14,
      lineHeight: 23,
      color: p.text,
      fontWeight: "500",
    },

    // 황금 레시피
    recipeCard: {
      padding: 18,
      borderRadius: 16,
      backgroundColor: p.surface,
      borderWidth: 1,
      borderColor: p.border,
      gap: 14,
    },
    tipRow: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
    tipBadge: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: p.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    tipBadgeText: { color: "#fff", fontSize: 13, fontWeight: "800" },
    tipText: { flex: 1, fontSize: 14, lineHeight: 22, color: p.text },

    // 문법 버튼
    grammarRow: { gap: 10 },
    grammarBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 16,
      borderRadius: 14,
      backgroundColor: p.surface,
      borderWidth: 1,
      borderColor: p.border,
    },
    grammarBtnTitle: { fontSize: 15, fontWeight: "800", color: p.text },
    grammarBtnMeta: { fontSize: 12, color: p.textSubtle, marginTop: 2 },

    // 기출문제
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
    qChoices: { marginTop: 14, gap: 10 },
    qChoice: { flexDirection: "row", gap: 8, alignItems: "flex-start" },
    qChoiceMark: { fontSize: 15, color: p.textSecondary },
    qChoiceText: { flex: 1, fontSize: 15, color: p.text, lineHeight: 22 },
    qFooter: {
      marginTop: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
    },
    qSource: { flex: 1, fontSize: 11, color: p.textSubtle, fontWeight: "600" },
    solutionBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 14,
      paddingVertical: 9,
      borderRadius: 999,
      backgroundColor: p.primarySoft,
    },
    solutionBtnText: { fontSize: 13, fontWeight: "800", color: p.primaryText },

    // 예상문제 진입
    practiceBtn: {
      marginTop: 28,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 18,
      borderRadius: 16,
      backgroundColor: p.primary,
    },
    practiceTitle: { fontSize: 16, fontWeight: "800", color: "#fff" },
    practiceMeta: {
      fontSize: 12,
      color: "rgba(255,255,255,0.82)",
      marginTop: 3,
    },

    // 해설 패널
    answerBox: {
      padding: 14,
      borderRadius: 12,
      backgroundColor: p.successSoft,
      borderWidth: 1,
      borderColor: p.successBorder,
    },
    answerLead: {
      fontSize: 12,
      fontWeight: "800",
      color: p.successText,
      opacity: 0.85,
      marginBottom: 4,
    },
    answerLabel: { fontSize: 17, fontWeight: "800", color: p.successText },
    flowBox: {
      marginTop: 14,
      padding: 14,
      borderRadius: 12,
      backgroundColor: p.surfaceMuted,
    },
    flowKo: {
      fontSize: 15,
      fontWeight: "800",
      color: p.text,
      lineHeight: 24,
    },
    flowLocal: {
      marginTop: 6,
      fontSize: 13,
      fontWeight: "600",
      color: p.textSecondary,
      lineHeight: 20,
    },
    solutionKo: {
      marginTop: 16,
      fontSize: 14,
      lineHeight: 24,
      color: p.text,
      fontWeight: "500",
    },
    solutionText: {
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: p.divider,
      fontSize: 14,
      lineHeight: 23,
      color: p.textSecondary,
    },
    noteRow: { flexDirection: "row", gap: 8, marginTop: 12 },
    noteMark: { fontSize: 14, color: p.textSecondary },
    noteText: { flex: 1, fontSize: 13, lineHeight: 21, color: p.textSecondary },

    // 문법 패널
    gEntry: {
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: p.divider,
    },
    gHead: { flexDirection: "row", alignItems: "center", gap: 10 },
    gRank: {
      width: 28,
      height: 28,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: p.borderStrong,
      alignItems: "center",
      justifyContent: "center",
    },
    gRankText: { fontSize: 11, fontWeight: "800", color: p.textSecondary },
    gForm: { fontSize: 17, fontWeight: "800", color: p.text },
    gMeaningRow: { flexDirection: "row", gap: 8, marginTop: 10 },
    gMeaningMark: { fontSize: 13, color: p.textSubtle },
    gMeaning: { fontSize: 13, fontWeight: "700", color: p.primaryText },
    gExample: {
      marginTop: 4,
      fontSize: 14,
      lineHeight: 22,
      color: p.textSecondary,
    },
    gTip: {
      flexDirection: "row",
      gap: 8,
      marginTop: 18,
      padding: 14,
      borderRadius: 12,
      backgroundColor: p.warningSoft,
    },
    gTipText: { flex: 1, fontSize: 13, lineHeight: 21, color: p.warningText },
  });
