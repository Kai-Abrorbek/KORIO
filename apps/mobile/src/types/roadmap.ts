export type NodeType =
  | "star"
  | "headphone"
  | "speech"
  | "chest"
  | "review"
  | "boss"
  | "score"
  | "play-forward";

export type NodeStatus = "completed" | "current" | "locked";

export type SectionStatus = "completed" | "current" | "locked";

export interface NodeLesson {
  lessonId: string;
  title: string;
  isCompleted: boolean;
}

export interface RoadmapNode {
  id: string;
  type: NodeType;
  status: NodeStatus;
  title?: string;
  lessonId?: string; // 첫 번째 미완료 레슨 ID
  lessons?: NodeLesson[]; // 노드 안의 레슨 4개
  completedLessons?: number; // 완료된 레슨 수 (링 진행도)
  totalLessons?: number; // 전체 레슨 수 (보통 4)
  chestLessonsRemaining?: number;
  xpReward?: number;
  progress?: number;
  legendCompleted?: boolean;
  scoreValue?: number;
}

export interface RoadmapUnit {
  id: string;
  sectionNumber: number;
  unitNumber: number;
  title: string;
  color: string;
  status: SectionStatus;
  nodes: RoadmapNode[];
}

export interface NextLockedSection {
  sectionNumber: number;
  description: string;
}

export interface UserRoadmapStats {
  language: string;
  score: number | undefined;
  streak: number | undefined;
  gems: number | undefined;
  energy: number | undefined;
  isSuper: boolean | undefined;
}

export interface RoadmapData {
  stats: UserRoadmapStats;
  score: number;
  units: RoadmapUnit[];
  nextLockedSection?: NextLockedSection;
  currentSection?: number;
  nextSection?: {
    sectionNumber: number;
    title: string;
    description: string;
    firstUnitNumber: number;
  } | null;
}
