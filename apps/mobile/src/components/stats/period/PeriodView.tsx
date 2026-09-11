import { useCallback, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useFocusEffect } from "expo-router";
import { StatsService } from "@/services/stats.service";
import { HeatmapDay, TodaySummary } from "@/types/stats";
import { useTheme } from "@/hooks/useTheme";
import TodayInfoCard from "./TodayInfoCard";
import MomentumCard from "./MomentumCard";
import YearlyHeatmap from "./YearlyHeatmap";
import StudyTimeChart from "./StudyTimeChart";
import StudyVolumeChart from "./StudyVolumeChart";
import SkillRadarCard from "../radar/SkillRadarCard";
import StudyPathProgressCard from "../study-path/StudyPathProgressCard";

export default function PeriodView() {
  const theme = useTheme();
  const [heatmap, setHeatmap] = useState<HeatmapDay[]>([]);
  const [todayHasData, setTodayHasData] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [today, setToday] = useState<TodaySummary | null>(null);

  useFocusEffect(
    useCallback(() => {
      // 히트맵 + 오늘 정보만 1회 로드 (period 와 무관)
      StatsService.getPeriod("week")
        .then((d) => {
          setHeatmap(d.heatmap);
          setToday(d.today);
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
      <TodayInfoCard hasData={todayHasData} today={today} />
      {/*
        읽는 순서를 "지금 어디쯤 → 요즘 어떤가 → 뭘 못하나" 로 잡았다.
        위치를 모르면 나머지 숫자가 다 뜬구름이라 진도가 제일 위다.
      */}
      <StudyPathProgressCard />
      {/* 히트맵은 이미 받아온 걸 넘긴다. 같은 걸 또 부르지 않는다 */}
      <MomentumCard days={heatmap} />
      {/* 강점·약점 진단. "얼마나 했나" 보다 "뭘 못하나" 를 먼저 보여준다 */}
      <SkillRadarCard />
      <YearlyHeatmap days={heatmap} />
      <StudyTimeChart />
      <StudyVolumeChart />
    </View>
  );
}
