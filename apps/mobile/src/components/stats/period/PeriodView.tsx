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
import { useStatsLanguage } from "../StatsLanguage";

export default function PeriodView() {
  const theme = useTheme();
  const [heatmap, setHeatmap] = useState<HeatmapDay[]>([]);
  const [todayHasData, setTodayHasData] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [today, setToday] = useState<TodaySummary | null>(null);
  const { language, reportStudied } = useStatsLanguage();

  useFocusEffect(
    useCallback(() => {
      let alive = true;
      // 히트맵 + 오늘 정보만 1회 로드 (period 와 무관). 고른 언어 몫만
      StatsService.getPeriod("week", undefined, language)
        .then((d) => {
          if (!alive) return;
          setHeatmap(d.heatmap);
          setToday(d.today);
          setTodayHasData(d.todayHasData);
          reportStudied(d.studiedLanguages);
        })
        .catch((err) => console.error("heatmap 로드 실패:", err))
        .finally(() => alive && setLoaded(true));
      return () => {
        alive = false;
      };
    }, [language, reportStudied]),
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
