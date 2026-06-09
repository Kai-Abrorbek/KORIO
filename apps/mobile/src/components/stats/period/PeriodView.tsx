import { View } from "react-native";
import { PeriodStats } from "@/types/stats";
import TodayInfoCard from "./TodayInfoCard";
import YearlyHeatmap from "./YearlyHeatmap";
import StudyTimeChart from "./StudyTimeChart";
import StudyVolumeChart from "./StudyVolumeChart";

interface Props {
  data: PeriodStats;
}

export default function PeriodView({ data }: Props) {
  const [rangeStart, rangeEnd] = data.studyTime.rangeLabel.split(" - ");

  return (
    <View>
      <TodayInfoCard hasData={data.todayHasData} />
      <YearlyHeatmap days={data.heatmap} />
      <StudyTimeChart
        points={data.studyTime.points}
        avgPerDayLabel={data.studyTime.avgPerDayLabel}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
      />
      <StudyVolumeChart
        points={data.studyVolume.points}
        avgPerDay={data.studyVolume.avgPerDay}
      />
    </View>
  );
}
