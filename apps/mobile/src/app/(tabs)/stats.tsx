import { useState, useCallback, useEffect } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useFocusEffect } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import {
  PeriodStats,
  CategoryStats,
  StatsTab,
  StudyCategory,
} from "@/types/stats";
import { StatsService } from "@/services/stats.service";
import StatsHeader from "@/components/stats/StatsHeader";
import TopTabs from "@/components/stats/TopTabs";
import PeriodView from "@/components/stats/period/PeriodView";
import CategoryView from "@/components/stats/category/CategoryView";

export default function StatsScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [tab, setTab] = useState<StatsTab>("period");

  const [periodData, setPeriodData] = useState<PeriodStats | null>(null);
  const [categoryData, setCategoryData] = useState<Record<
    StudyCategory,
    CategoryStats
  > | null>(null);
  const [loadingPeriod, setLoadingPeriod] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);

  const loadPeriod = async () => {
    try {
      setLoadingPeriod(true);
      const data = await StatsService.getPeriod();
      setPeriodData(data);
    } catch (err) {
      console.error("period stats 실패:", err);
    } finally {
      setLoadingPeriod(false);
    }
  };

  const loadAllCategories = async () => {
    try {
      setLoadingCategory(true);
      const categories: StudyCategory[] = [
        "vocab",
        "grammar",
        "expression",
        "conversation",
        "listening",
      ];
      const results = await Promise.all(
        categories.map((c) => StatsService.getCategory(c)),
      );
      const byType = categories.reduce(
        (acc, c, i) => {
          acc[c] = results[i];
          return acc;
        },
        {} as Record<StudyCategory, CategoryStats>,
      );
      setCategoryData(byType);
    } catch (err) {
      console.error("category stats 실패:", err);
    } finally {
      setLoadingCategory(false);
    }
  };

  // 화면 진입할 때마다 새로고침
  useFocusEffect(
    useCallback(() => {
      loadPeriod();
      loadAllCategories();
    }, []),
  );

  const isLoading =
    (tab === "period" && loadingPeriod && !periodData) ||
    (tab === "category" && loadingCategory && !categoryData);

  return (
    <View style={styles.container}>
      <StatsHeader hasUnread />
      <TopTabs value={tab} onChange={setTab} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
        ) : tab === "period" ? (
          periodData && <PeriodView data={periodData} />
        ) : (
          categoryData && <CategoryView data={categoryData} />
        )}
      </ScrollView>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingTop: 16,
      paddingBottom: 140,
    },
    loadingWrap: {
      paddingTop: 80,
      alignItems: "center",
      justifyContent: "center",
    },
  });
