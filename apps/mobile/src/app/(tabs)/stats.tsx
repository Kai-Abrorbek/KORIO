import { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { StatsTab } from "@/types/stats";
import TopTabs from "@/components/stats/TopTabs";
import PeriodView from "@/components/stats/period/PeriodView";
import CategoryView from "@/components/stats/category/CategoryView";
import SwipePager from "@/components/common/SwipePager";
import {
  StatsLanguageProvider,
  StatsLanguageSwitch,
} from "@/components/stats/StatsLanguage";

/** 상단 탭 순서 = 옆으로 넘기는 순서 */
const TABS: StatsTab[] = ["period", "category"];

export default function StatsScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getStyles(theme);
  const [tab, setTab] = useState<StatsTab>("period");
  // 페이저 위치 — 상단 탭 밑줄·글자색이 손가락을 따라온다
  const progress = useSharedValue(0);
  // 미는 동안 탭 상태가 바뀌어도 두 화면은 다시 그리지 않는다
  const pages = useMemo(
    () => [<PeriodView key="period" />, <CategoryView key="category" />],
    [],
  );

  // 헤더를 없앴으니 상태바 자리는 컨테이너가 직접 확보한다
  // 통계는 언어별로 본다 — 두 탭이 같은 언어를 본다 (StatsLanguage)
  return (
    <StatsLanguageProvider>
      <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
        <TopTabs
          value={tab}
          onChange={setTab}
          progress={progress}
          right={<StatsLanguageSwitch />}
        />
        <SwipePager
          index={TABS.indexOf(tab)}
          onIndexChange={(next) => setTab(TABS[next] ?? "period")}
          pages={pages}
          progress={progress}
          contentContainerStyle={styles.scrollContent}
        />
      </View>
    </StatsLanguageProvider>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    scrollContent: { paddingTop: 16, paddingBottom: 140 },
  });
