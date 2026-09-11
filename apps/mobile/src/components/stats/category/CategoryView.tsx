import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { CategoryStats, StudyCategory } from "@/types/stats";
import { StatsService } from "@/services/stats.service";
import { useTheme } from "@/hooks/useTheme";
import CategoryTabs from "./CategoryTabs";
import CategorySummary from "./CategorySummary";
import StudyInfoChart from "./StudyInfoChart";

export default function CategoryView() {
  const theme = useTheme();
  const [category, setCategory] = useState<StudyCategory>("vocab");
  const [data, setData] = useState<CategoryStats | null>(null);
  const [loading, setLoading] = useState(false);

  // 요약 타일용 데이터는 week 로 고정 fetch
  // (period 영향 안 받는 totalProblems/todayTime/totalTime 만 씀)
  useEffect(() => {
    setLoading(true);
    StatsService.getCategory(category, "week")
      .then(setData)
      .catch((err) => console.error("category 로드 실패:", err))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <View>
      <CategoryTabs value={category} onChange={setCategory} />

      {!data && loading ? (
        <View style={{ padding: 40, alignItems: "center" }}>
          <ActivityIndicator color={theme.primary} />
        </View>
      ) : data ? (
        <>
          <CategorySummary
            category={category}
            trophyLevel={data.trophyLevel}
            totalProblems={data.totalProblems}
            todayTime={data.todayTime}
            totalTime={data.totalTime}
          />
          {/* StudyInfoChart 는 자체 period 관리 */}
          <StudyInfoChart category={category} />
        </>
      ) : null}
    </View>
  );
}
