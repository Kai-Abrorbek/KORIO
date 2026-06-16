import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { StatsService } from "@/services/stats.service";
import { HeatmapDay } from "@/types/stats";
import { useTheme } from "@/hooks/useTheme";
import TodayInfoCard from "./TodayInfoCard";
import YearlyHeatmap from "./YearlyHeatmap";
import StudyTimeChart from "./StudyTimeChart";
import StudyVolumeChart from "./StudyVolumeChart";

export default function PeriodView() {
  const theme = useTheme();
  const [heatmap, setHeatmap] = useState<HeatmapDay[]>([]);
  const [todayHasData, setTodayHasData] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // 히트맵 + 오늘 정보만 1회 로드 (period 와 무관)
      StatsService.getPeriod("week")
        .then((d) => {
          setHeatmap(d.heatmap);
          setTodayHasData(d.todayHasData);
        })
        .catch((err) => console.error("heatmap 로드 실패:", err))
        .finally(() => setLoaded(true));
    }, []),
  );

  if (!loaded) {
    return (
      <View style={{ padding: 60, alignItems: "center" }}>
        <ActivityIndicator color={theme.primary} />
      </View>
    );
  }

  return (
    <View>
      <TodayInfoCard hasData={todayHasData} />
      <YearlyHeatmap days={heatmap} />
      <StudyTimeChart />
      <StudyVolumeChart />
    </View>
  );
}
