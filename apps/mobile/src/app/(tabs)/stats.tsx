import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { StatsTab } from "@/types/stats";
import TopTabs from "@/components/stats/TopTabs";
import PeriodView from "@/components/stats/period/PeriodView";
import CategoryView from "@/components/stats/category/CategoryView";

export default function StatsScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getStyles(theme);
  const [tab, setTab] = useState<StatsTab>("period");

  // 헤더를 없앴으니 상태바 자리는 컨테이너가 직접 확보한다
  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <TopTabs value={tab} onChange={setTab} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {tab === "period" ? <PeriodView /> : <CategoryView />}
      </ScrollView>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    scroll: { flex: 1 },
    scrollContent: { paddingTop: 16, paddingBottom: 140 },
  });
