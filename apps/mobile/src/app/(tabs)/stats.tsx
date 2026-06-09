import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { MOCK_STATS } from "@/mocks/stats.mock";
import { StatsTab } from "@/types/stats";
import StatsHeader from "@/components/stats/StatsHeader";
import TopTabs from "@/components/stats/TopTabs";
import PeriodView from "@/components/stats/period/PeriodView";
import CategoryView from "@/components/stats/category/CategoryView";

export default function StatsScreen() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [tab, setTab] = useState<StatsTab>("period");

  const stats = MOCK_STATS;

  return (
    <View style={styles.container}>
      <StatsHeader hasUnread />
      <TopTabs value={tab} onChange={setTab} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {tab === "period" ? (
          <PeriodView data={stats.period} />
        ) : (
          <CategoryView data={stats.categoryByType} />
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
  });
