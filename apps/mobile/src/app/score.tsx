import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import ScoreDetailScreen from "@/components/score/ScoreDetailScreen";
import { LessonService, ScoreData } from "@/services/lesson.service";
import { LEARN_COURSES } from "@/constants/learnCourses";
import { useSettingsStore } from "@/store/settings.store";

const EMPTY: ScoreData = {
  score: 0,
  completedUnits: 0,
  nextScore: 0,
  progress: 0,
  milestones: [],
};

// 섹션 순서대로 돌려쓰는 아이콘 — 섹션이 늘어나도 자동으로 이어짐
const SECTION_ICONS: (keyof typeof Ionicons.glyphMap)[] = [
  "star",
  "hand-left",
  "restaurant",
  "location",
  "book",
  "tv",
  "briefcase",
  "trophy",
];

export default function Score() {
  const router = useRouter();
  const { t } = useTranslation();
  const [data, setData] = useState<ScoreData>(EMPTY);
  const course = useSettingsStore((state) => state.learnCourse);

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
  }, [course]);

  const milestones = data.milestones.map((m, i) => ({
    score: m.score,
    label: m.title || t("score.sectionFallback", { section: m.section }),
    icon: SECTION_ICONS[i % SECTION_ICONS.length],
    status: m.status,
    startScore: m.startScore,
    units: m.units,
  }));

  return (
    <ScoreDetailScreen
      score={data.score}
      flag={LEARN_COURSES[course].flag}
      milestones={milestones}
      onClose={() => router.back()}
      onContinue={() => router.back()}
      onShare={() => {}}
    />
  );
}
