import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  type TopikPalette,
  useTopikTheme,
} from "@/components/topik/topikTheme";
import {
  TOPIK_RECIPE_CURRICULUM,
  TOPIK_RECIPE_LEVELS,
  type TopikRecipeTargetLevel,
} from "@/features/topik/topik-recipe-curriculum";
import { TopikRecipeCurriculumList } from "@/features/topik/TopikRecipeCurriculumList";
import { TopikService } from "@/services/topik.service";
import type { TopikRecipeSummary } from "@/types/topik-recipe";

type RecipeSection = "reading" | "listening" | "writing";

const RECIPE_SECTIONS: RecipeSection[] = ["reading", "listening", "writing"];

/**
 * 합격 레시피 유형 목록.
 * 읽기 1~2번, 3~4번 … 처럼 책의 챕터 단위로 나열하고,
 * 콘텐츠가 준비된 유형만 들어갈 수 있다.
 */
export default function TopikRecipesScreen() {
  const { t } = useTranslation();
  const palette = useTopikTheme();
  const s = useMemo(() => styles(palette), [palette]);

  const [items, setItems] = useState<TopikRecipeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [level, setLevel] = useState<TopikRecipeTargetLevel>(3);

  const loadRecipes = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const results = await Promise.all(
        RECIPE_SECTIONS.map((recipeSection) =>
          TopikService.getRecipes(recipeSection),
        ),
      );
      setItems(results.flat());
    } catch {
      setItems([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRecipes();
  }, [loadRecipes]);

  const itemByCode = useMemo(
    () => new Map(items.map((item) => [item.groupCode, item])),
    [items],
  );
  const chapters = useMemo(
    () => TOPIK_RECIPE_CURRICULUM.filter((chapter) => chapter.level === level),
    [level],
  );
  const levelItems = useMemo(
    () =>
      chapters.flatMap((chapter) =>
        chapter.groupCodes
          .map((groupCode) => itemByCode.get(groupCode))
          .filter((item): item is TopikRecipeSummary => !!item),
      ),
    [chapters, itemByCode],
  );
  const readyCount = levelItems.filter((item) => item.ready).length;

  if (loading) {
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
          <Text style={s.headerTitle}>{t("topik.recipe.golden")}</Text>
          <Text style={s.headerMeta}>
            {t("topik.recipe.readyCount", {
              ready: readyCount,
              total: levelItems.length,
            })}
          </Text>
        </View>
      </View>

      <View style={s.tabs}>
        {TOPIK_RECIPE_LEVELS.map((item) => {
          const active = item === level;
          return (
            <Pressable
              key={item}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              onPress={() => setLevel(item)}
              style={[s.tab, active && s.tabActive]}
            >
              <Text style={[s.tabText, active && s.tabTextActive]}>
                {t("topik.recipe.level", { level: item })}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <TopikRecipeCurriculumList
        chapters={chapters}
        error={error}
        itemByCode={itemByCode}
        level={level}
        onRetry={() => {
          void loadRecipes();
        }}
        readyCount={readyCount}
        totalCount={levelItems.length}
      />
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
      borderBottomWidth: 1,
      borderBottomColor: p.divider,
    },
    backBtn: { padding: 4 },
    headerTitle: { fontSize: 19, fontWeight: "800", color: p.text },
    headerMeta: {
      fontSize: 12,
      fontWeight: "600",
      color: p.textSubtle,
      marginTop: 2,
    },
    tabs: {
      flexDirection: "row",
      gap: 8,
      paddingHorizontal: 20,
      paddingTop: 14,
    },
    tab: {
      flex: 1,
      minHeight: 42,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      borderRadius: 13,
      backgroundColor: p.surfaceMuted,
      borderWidth: 1,
      borderColor: p.divider,
    },
    tabActive: {
      backgroundColor: p.primarySoft,
      borderColor: p.primary,
    },
    tabText: { fontSize: 13, fontWeight: "800", color: p.textSubtle },
    tabTextActive: { color: p.primaryText },
  });
