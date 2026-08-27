import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import {
  type TopikPalette,
  useTopikTheme,
} from "@/components/topik/topikTheme";
import type {
  TopikRecipeCurriculumChapter,
  TopikRecipeTargetLevel,
} from "@/features/topik/topik-recipe-curriculum";
import { toTopikLanguage, topikText } from "@/types/topik";
import type { TopikRecipeSummary } from "@/types/topik-recipe";

type RecipeSection = "reading" | "listening" | "writing";

const SECTION_ICONS: Record<RecipeSection, keyof typeof Ionicons.glyphMap> = {
  reading: "book-outline",
  listening: "headset-outline",
  writing: "create-outline",
};

interface Props {
  chapters: TopikRecipeCurriculumChapter[];
  error: boolean;
  itemByCode: Map<string, TopikRecipeSummary>;
  level: TopikRecipeTargetLevel;
  onRetry: () => void;
  readyCount: number;
  totalCount: number;
}

export function TopikRecipeCurriculumList({
  chapters,
  error,
  itemByCode,
  level,
  onRetry,
  readyCount,
  totalCount,
}: Props) {
  const { t, i18n } = useTranslation();
  const palette = useTopikTheme();
  const s = useMemo(() => styles(palette), [palette]);
  const lang = toTopikLanguage(i18n.language);

  return (
    <ScrollView
      style={s.container}
      contentContainerStyle={s.content}
      showsVerticalScrollIndicator={false}
    >
      {error ? (
        <View style={s.stateCard}>
          <Ionicons
            name="cloud-offline-outline"
            size={30}
            color={palette.danger}
          />
          <Text style={s.stateTitle}>{t("topik.home.loadError")}</Text>
          <Pressable onPress={onRetry} style={s.retryButton}>
            <Text style={s.retryText}>{t("topik.common.retry")}</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={s.levelSummary}>
            <View style={s.levelNumber}>
              <Text style={s.levelNumberText}>{level}</Text>
            </View>
            <View style={s.levelCopy}>
              <Text style={s.levelEyebrow}>TOPIK II</Text>
              <Text style={s.levelTitle}>
                {t("topik.recipe.level", { level })}
              </Text>
              <Text style={s.levelMeta}>
                {t("topik.recipe.readyCount", {
                  ready: readyCount,
                  total: totalCount,
                })}
              </Text>
            </View>
          </View>

          {chapters.map((chapter, chapterIndex) => {
            const chapterItems = chapter.groupCodes
              .map((groupCode) => itemByCode.get(groupCode))
              .filter((item): item is TopikRecipeSummary => !!item);
            if (chapterItems.length === 0) return null;

            return (
              <View key={chapter.key} style={s.chapter}>
                <View style={s.chapterHeader}>
                  <Text style={s.chapterNumber}>
                    CHAPTER {String(chapterIndex + 1).padStart(2, "0")}
                  </Text>
                  <Text style={s.chapterTitle}>
                    {topikText(chapter.title, lang)}
                  </Text>
                </View>

                <View style={s.chapterCards}>
                  {chapterItems.map((item) => {
                    const disabled = !item.ready;
                    const section = item.section as RecipeSection;
                    const icon =
                      SECTION_ICONS[section] ?? "document-text-outline";

                    return (
                      <Pressable
                        key={item.groupCode}
                        disabled={disabled}
                        onPress={() =>
                          router.push({
                            pathname: "/topik-recipe",
                            params: { groupCode: item.groupCode },
                          })
                        }
                        style={[s.card, disabled && s.cardDisabled]}
                      >
                        <View
                          style={[s.numberBox, disabled && s.numberBoxDisabled]}
                        >
                          <Ionicons name={icon} size={16} color="#fff" />
                          <Text
                            style={[
                              s.numberText,
                              disabled && s.numberTextDisabled,
                            ]}
                          >
                            {item.fromNumber}
                            {item.toNumber !== item.fromNumber
                              ? `~${item.toNumber}`
                              : ""}
                          </Text>
                        </View>

                        <View style={s.cardCopy}>
                          <Text style={[s.cardLabel, disabled && s.muted]}>
                            {topikText(item.label, lang)}
                          </Text>
                          {item.ready ? (
                            <>
                              <Text style={s.cardTitle}>
                                {topikText(item.title, lang)}
                              </Text>
                              <Text style={s.cardMeta}>
                                {t("topik.recipe.cardMeta", {
                                  grammar: item.grammarCount,
                                  practice: item.practiceCount,
                                })}
                              </Text>
                            </>
                          ) : (
                            <Text style={[s.cardMeta, s.muted]}>
                              {t("topik.recipe.comingSoon")}
                            </Text>
                          )}
                        </View>

                        <Ionicons
                          name={disabled ? "lock-closed" : "chevron-forward"}
                          size={disabled ? 16 : 18}
                          color={palette.textSubtle}
                        />
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </>
      )}
    </ScrollView>
  );
}

const styles = (p: TopikPalette) =>
  StyleSheet.create({
    container: { flex: 1 },
    content: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 48 },
    stateCard: {
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      minHeight: 240,
      padding: 24,
      borderRadius: 18,
      backgroundColor: p.surface,
      borderWidth: 1,
      borderColor: p.border,
    },
    stateTitle: { fontSize: 15, fontWeight: "800", color: p.text },
    retryButton: {
      marginTop: 4,
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 999,
      backgroundColor: p.primary,
    },
    retryText: { color: "#fff", fontSize: 13, fontWeight: "800" },
    levelSummary: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      padding: 18,
      marginBottom: 24,
      borderRadius: 20,
      backgroundColor: p.primarySoft,
      borderWidth: 1,
      borderColor: p.borderStrong,
    },
    levelNumber: {
      width: 54,
      height: 54,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: p.primary,
    },
    levelNumberText: { color: "#fff", fontSize: 25, fontWeight: "900" },
    levelCopy: { flex: 1 },
    levelEyebrow: {
      color: p.primaryText,
      fontSize: 11,
      fontWeight: "900",
      letterSpacing: 1.1,
    },
    levelTitle: {
      marginTop: 2,
      color: p.text,
      fontSize: 20,
      fontWeight: "900",
    },
    levelMeta: { marginTop: 3, color: p.textSecondary, fontSize: 12 },
    chapter: { marginBottom: 28 },
    chapterHeader: { marginBottom: 11, paddingHorizontal: 2 },
    chapterNumber: {
      color: p.primaryText,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.2,
    },
    chapterTitle: {
      marginTop: 3,
      color: p.text,
      fontSize: 18,
      fontWeight: "900",
    },
    chapterCards: { gap: 10 },
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 14,
      borderRadius: 16,
      backgroundColor: p.surface,
      borderWidth: 1,
      borderColor: p.border,
    },
    cardDisabled: { backgroundColor: p.surfaceMuted, borderColor: p.divider },
    numberBox: {
      minWidth: 56,
      height: 54,
      paddingHorizontal: 8,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
      backgroundColor: p.primary,
    },
    numberBoxDisabled: { backgroundColor: p.divider },
    numberText: { color: "#fff", fontSize: 14, fontWeight: "900" },
    numberTextDisabled: { color: p.textSecondary },
    cardCopy: { flex: 1 },
    cardLabel: { fontSize: 12, fontWeight: "700", color: p.textSecondary },
    cardTitle: { marginTop: 1, fontSize: 16, fontWeight: "800", color: p.text },
    cardMeta: { marginTop: 3, fontSize: 12, color: p.textSubtle },
    muted: { color: p.textSubtle },
  });
