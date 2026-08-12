import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
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
import {
  type TopikPalette,
  useTopikTheme,
} from "@/components/topik/topikTheme";
import { TopikService } from "@/services/topik.service";
import { MOCK_RECIPE_LIST } from "@/mocks/topik-recipe.mock";
import { toTopikLanguage, topikText } from "@/types/topik";
import type { TopikRecipeSummary } from "@/types/topik-recipe";

type RecipeSection = "reading" | "listening" | "writing";

const RECIPE_SECTIONS: Array<{
  key: RecipeSection;
  icon: keyof typeof Ionicons.glyphMap;
}> = [
  { key: "reading", icon: "book-outline" },
  { key: "listening", icon: "headset-outline" },
  { key: "writing", icon: "create-outline" },
];

/**
 * 합격 레시피 유형 목록.
 * 읽기 1~2번, 3~4번 … 처럼 책의 챕터 단위로 나열하고,
 * 콘텐츠가 준비된 유형만 들어갈 수 있다.
 */
export default function TopikRecipesScreen() {
  const { t, i18n } = useTranslation();
  const palette = useTopikTheme();
  const s = useMemo(() => styles(palette), [palette]);
  const lang = toTopikLanguage(i18n.language);

  const [items, setItems] = useState<TopikRecipeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState<RecipeSection>("reading");

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const data = await TopikService.getRecipes(section);
        if (alive) setItems(data);
      } catch {
        if (alive) setItems(section === "reading" ? MOCK_RECIPE_LIST : []);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [section]);

  const readyCount = items.filter((x) => x.ready).length;

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
              total: items.length,
            })}
          </Text>
        </View>
      </View>

      <View style={s.tabs}>
        {RECIPE_SECTIONS.map((item) => {
          const active = item.key === section;
          return (
            <Pressable
              key={item.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              onPress={() => setSection(item.key)}
              style={[s.tab, active && s.tabActive]}
            >
              <Ionicons
                name={item.icon}
                size={17}
                color={active ? palette.primaryText : palette.textSubtle}
              />
              <Text style={[s.tabText, active && s.tabTextActive]}>
                {t(`topik.home.${item.key}`)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item) => {
          const disabled = !item.ready;
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
              {/* 문항 번호 배지 */}
              <View style={[s.numberBox, disabled && s.numberBoxDisabled]}>
                <Text style={[s.numberText, disabled && s.mutedStrong]}>
                  {item.fromNumber}
                  {item.toNumber !== item.fromNumber ? `~${item.toNumber}` : ""}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
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

              {item.ready ? (
                <>
                  {item.targetLevel > 0 && (
                    <View style={s.levelChip}>
                      <Text style={s.levelChipText}>
                        {t("topik.recipe.level", { level: item.targetLevel })}
                      </Text>
                    </View>
                  )}
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={palette.textSubtle}
                  />
                </>
              ) : (
                <Ionicons
                  name="lock-closed"
                  size={16}
                  color={palette.textSubtle}
                />
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = (p: TopikPalette) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: p.bg, marginBottom: 40 },
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

    scroll: { paddingHorizontal: 20, paddingVertical: 18, gap: 10 },

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
      minWidth: 52,
      height: 44,
      paddingHorizontal: 8,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: p.primary,
    },
    numberBoxDisabled: { backgroundColor: p.divider },
    numberText: { color: "#fff", fontSize: 15, fontWeight: "900" },

    cardLabel: { fontSize: 13, fontWeight: "700", color: p.textSecondary },
    cardTitle: {
      fontSize: 16,
      fontWeight: "800",
      color: p.text,
      marginTop: 1,
    },
    cardMeta: { fontSize: 12, color: p.textSubtle, marginTop: 3 },
    muted: { color: p.textSubtle },
    mutedStrong: { color: p.textSecondary },

    levelChip: {
      paddingHorizontal: 9,
      paddingVertical: 4,
      borderRadius: 999,
      backgroundColor: p.primarySoft,
    },
    levelChipText: { fontSize: 11, fontWeight: "800", color: p.primaryText },
  });
