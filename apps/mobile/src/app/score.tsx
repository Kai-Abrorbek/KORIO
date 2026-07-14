import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import ScoreUpScreen from "@/components/score/ScoreUpScreen";
import { LessonService, ScoreData } from "@/services/lesson.service";

const EMPTY: ScoreData = {
  score: 0,
  completedUnits: 0,
  nextScore: 0,
  progress: 0,
  milestones: [],
};

export default function Score() {
  const router = useRouter();
  const [data, setData] = useState<ScoreData>(EMPTY);

  useEffect(() => {
    let alive = true;
    LessonService.getScore()
      .then((r) => {
        if (alive) setData(r);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return (
    <ScoreUpScreen
      score={data.score}
      milestones={data.milestones}
      flag="🇰🇷"
      onContinue={() => router.back()}
      onShare={() => {}}
      onExplain={() => {}}
    />
  );
}
