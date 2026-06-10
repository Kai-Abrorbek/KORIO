export type NodeType =
  | "star"
  | "headphone"
  | "speech"
  | "chest"
  | "review"
  | "boss";

export type NodeStatus = "completed" | "current" | "locked";

export type SectionStatus = "completed" | "current" | "locked";

export interface RoadmapNode {
  id: string;
  type: NodeType;
  status: NodeStatus;
  title?: string;
  lessonId?: string; // 추가
  currentLesson?: number;
  totalLessons?: number;
  chestLessonsRemaining?: number;
  xpReward?: number;
  progress?: number;
}

export interface RoadmapUnit {
  id: string;
  sectionNumber: number;
  unitNumber: number;
  title: string;
  color: string; // 유닛별 테마 컬러
  status: SectionStatus;
  nodes: RoadmapNode[];
}

export interface NextLockedSection {
  sectionNumber: number;
  description: string;
}

export interface UserRoadmapStats {
  language: string; // "🇺🇸" 같은 깃발 이모지
  languageLevel: number;
  streak: number;
  gems: number;
  energy: number;
  isSuper: boolean;
}

export interface RoadmapData {
  stats: UserRoadmapStats;
  units: RoadmapUnit[];
  nextLockedSection?: NextLockedSection;
}
