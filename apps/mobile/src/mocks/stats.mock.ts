import {
  CategoryStats,
  HeatmapDay,
  StatsData,
  StudyCategory,
} from "@/types/stats";

function generateHeatmap(): HeatmapDay[] {
  const days: HeatmapDay[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    let intensity: 0 | 1 | 2 | 3 | 4 = 0;
    if (i < 7 && Math.random() > 0.5) {
      intensity = (Math.floor(Math.random() * 4) + 1) as 1 | 2 | 3 | 4;
    } else if (i < 90 && Math.random() > 0.95) {
      intensity = (Math.floor(Math.random() * 4) + 1) as 1 | 2 | 3 | 4;
    }
    days.push({
      date: date.toISOString().split("T")[0],
      intensity,
    });
  }
  return days;
}

const emptyCategory = (totalProblems = 0): CategoryStats => ({
  trophyLevel: null,
  totalProblems,
  todayTime: "0:00",
  totalTime: "0:00",
  newWordsToday: null,
  knownWordsToday: null,
  reviewWordsToday: null,
  reviewAccuracy: null,
  weekChart: [
    { label: "금", newWords: 0, knownWords: 0, reviewWords: 0 },
    { label: "토", newWords: 0, knownWords: 0, reviewWords: 0 },
    { label: "일", newWords: 0, knownWords: 0, reviewWords: 0 },
    { label: "월", newWords: 0, knownWords: 0, reviewWords: 0 },
    { label: "화", newWords: 0, knownWords: 0, reviewWords: 0 },
    { label: "수", newWords: 0, knownWords: 0, reviewWords: 0 },
    { label: "오늘", newWords: 0, knownWords: 0, reviewWords: 0 },
  ],
});

const vocab: CategoryStats = {
  trophyLevel: null,
  totalProblems: 10,
  todayTime: "0:04",
  totalTime: "5:36",
  newWordsToday: null,
  knownWordsToday: null,
  reviewWordsToday: null,
  reviewAccuracy: null,
  weekChart: [
    { label: "금", newWords: 0, knownWords: 0, reviewWords: 0 },
    { label: "토", newWords: 0, knownWords: 0, reviewWords: 0 },
    { label: "일", newWords: 0, knownWords: 0, reviewWords: 0 },
    { label: "월", newWords: 0, knownWords: 0, reviewWords: 0 },
    { label: "화", newWords: 4, knownWords: 9, reviewWords: 0 },
    { label: "수", newWords: 0, knownWords: 0, reviewWords: 0 },
    { label: "오늘", newWords: 0, knownWords: 0, reviewWords: 0 },
  ],
};

export const MOCK_STATS: StatsData = {
  period: {
    todayHasData: false,
    heatmap: generateHeatmap(),
    studyTime: {
      avgPerDayLabel: "2분 50초",
      rangeLabel: "2026.05.22 - 2026.05.28",
      points: [
        { label: "금", minutes: 0 },
        { label: "토", minutes: 0 },
        { label: "일", minutes: 0 },
        { label: "월", minutes: 1 },
        { label: "화", minutes: 13 },
        { label: "수", minutes: 0.5 },
        { label: "오늘", minutes: 0 },
      ],
    },
    studyVolume: {
      avgPerDay: 13,
      points: [
        {
          label: "금",
          vocab: 0,
          grammar: 0,
          expression: 0,
          conversation: 0,
          listening: 0,
        },
        {
          label: "토",
          vocab: 0,
          grammar: 0,
          expression: 0,
          conversation: 0,
          listening: 0,
        },
        {
          label: "일",
          vocab: 0,
          grammar: 0,
          expression: 0,
          conversation: 0,
          listening: 0,
        },
        {
          label: "월",
          vocab: 0,
          grammar: 0,
          expression: 0,
          conversation: 0,
          listening: 0,
        },
        {
          label: "화",
          vocab: 13,
          grammar: 0,
          expression: 0,
          conversation: 0,
          listening: 0,
        },
        {
          label: "수",
          vocab: 0,
          grammar: 0,
          expression: 0,
          conversation: 0,
          listening: 0,
        },
        {
          label: "오늘",
          vocab: 0,
          grammar: 0,
          expression: 0,
          conversation: 0,
          listening: 0,
        },
      ],
    },
  },
  categoryByType: {
    vocab,
    grammar: emptyCategory(),
    expression: emptyCategory(),
    conversation: emptyCategory(),
    listening: emptyCategory(),
  },
};

export const CATEGORY_LIST: StudyCategory[] = [
  "vocab",
  "grammar",
  "expression",
  "conversation",
  "listening",
];

export const CATEGORY_COLORS: Record<StudyCategory, string> = {
  vocab: "#A78BFA",
  grammar: "#7DC3F8",
  expression: "#F7A8C0",
  conversation: "#7BD9A8",
  listening: "#F4B860",
};
