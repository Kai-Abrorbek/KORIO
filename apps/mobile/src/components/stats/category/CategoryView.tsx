import { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { StatsData, StudyCategory } from "@/types/stats";
import CategoryTabs from "./CategoryTabs";
import TrophyCard from "./TrophyCard";
import StudyTimeCard from "./StudyTimeCard";
import StudyInfoChart from "./StudyInfoChart";

interface Props {
  data: StatsData["categoryByType"];
}

export default function CategoryView({ data }: Props) {
  const { t } = useTranslation();
  const [category, setCategory] = useState<StudyCategory>("vocab");
  const current = data[category];

  return (
    <View>
      <CategoryTabs value={category} onChange={setCategory} />
      <TrophyCard
        trophyLevel={current.trophyLevel}
        totalProblems={current.totalProblems}
        category={t(`stats.category.${category}`)}
      />
      <StudyTimeCard
        todayTime={current.todayTime}
        totalTime={current.totalTime}
      />
      <StudyInfoChart stats={current} />
    </View>
  );
}
