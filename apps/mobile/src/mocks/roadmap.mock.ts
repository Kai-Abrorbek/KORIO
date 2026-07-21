import { RoadmapData } from "@/types/roadmap";

export const MOCK_ROADMAP: RoadmapData = {
  score: 0,
  stats: {
    language: "🇺🇸",
    score: 0,
    streak: 1,
    gems: 597,
    energy: 98,
    isSuper: false,
  },
  units: [
    {
      id: "unit-1-2",
      sectionNumber: 1,
      unitNumber: 2,
      title: "자신의 출신지 말하기",
      color: "#776ee2",
      status: "current",
      nodes: [
        { id: "n1", type: "star", status: "completed" },
        {
          id: "n2",
          type: "star",
          status: "current",
          progress: 0.3,
          // currentLesson: 4,
          totalLessons: 4,
          xpReward: 75,
        },
        { id: "n3", type: "star", status: "locked" },
        {
          id: "n4",
          type: "chest",
          status: "locked",
          chestLessonsRemaining: 5,
        },
        { id: "n5", type: "star", status: "locked" },
        { id: "n6", type: "boss", status: "locked" },
      ],
    },
    {
      id: "unit-1-10",
      sectionNumber: 1,
      unitNumber: 10,
      title: "반려동물에 대해 이야기하기",
      color: "#1D9E75",
      status: "locked",
      nodes: [
        { id: "n7", type: "headphone", status: "locked" },
        { id: "n8", type: "speech", status: "locked" },
      ],
    },
  ],
  nextLockedSection: {
    sectionNumber: 2,
    description: "기본적인 인사를 위한 단어, 구문, 문법 개념을 익혀요.",
  },
};
