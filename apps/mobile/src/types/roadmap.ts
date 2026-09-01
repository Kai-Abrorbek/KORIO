import type { ComponentProps } from "react";
import type { Ionicons } from "@expo/vector-icons";

export type RoadmapIconName = ComponentProps<typeof Ionicons>["name"];

export type NodeType =
  | "star"
  | "headphone"
  | "speech"
  | "chest"
  | "review"
  | "boss"
  | "score"
  | "hangul"
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
  iconName?: RoadmapIconName;
  legendCompleted?: boolean;
  scoreValue?: number;
  /** 지금 눌러서 보상을 받을 수 있는 상자인지 */
  chestClaimable?: boolean;
}

export interface RoadmapUnit {
  id: string;
  sectionNumber: number;
  unitNumber: number;
  title: string;
  color: string;
  status: SectionStatus;
  nodes: RoadmapNode[];
  /**
   * 스코어 노드에 표시할 전역 순번. 서버가 계산한다.
   * unitNumber 를 쓰면 안 된다 — 섹션마다 1 로 되돌아간다.
   */
  scoreValue?: number;
}

export interface NextLockedSection {
  sectionNumber: number;
  description: string;
}

export interface UserRoadmapStats {
  language: string;
  courseCount: number;
  score: number | undefined;
  streak: number | undefined;
  gems: number | undefined;
  energy: number | undefined;
  isSuper: boolean | undefined;
}

export interface RoadmapData {
  stats: UserRoadmapStats;
  score: number;
  /** 아직 안 받은 상자 수 */
  pendingChests?: number;
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
