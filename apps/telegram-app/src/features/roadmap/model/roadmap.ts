export type RoadmapNodeStatus = "completed" | "current" | "locked";

export type RoadmapNodeType =
  | "star"
  | "headphone"
  | "speech"
  | "chest"
  | "review"
  | "boss"
  | "score"
  | "hangul"
  | "play-forward";

export interface RoadmapNodeLesson {
  isCompleted: boolean;
  lessonId: string;
  title: string;
}

export interface RoadmapNode {
  chestClaimable?: boolean;
  completedLessons?: number;
  id: string;
  iconName?: string;
  legendCompleted?: boolean;
  lessonId?: string;
  lessons?: RoadmapNodeLesson[];
  scoreValue?: number;
  status: RoadmapNodeStatus;
  title?: string;
  totalLessons?: number;
  type: RoadmapNodeType;
  xpReward?: number;
}

export interface RoadmapUnit {
  color: string;
  id: string;
  nodes: RoadmapNode[];
  scoreValue?: number;
  sectionNumber: number;
  status: RoadmapNodeStatus;
  title: string;
  unitNumber: number;
}

export interface RoadmapResponse {
  currentSection: number;
  isPastSection?: boolean;
  nextSection: {
    description: string;
    firstUnitNumber: number;
    sectionNumber: number;
    title: string;
  } | null;
  pendingChests?: number;
  score: number;
  units: RoadmapUnit[];
  viewingSection?: number;
}

export interface ScoreMilestone {
  firstUnit?: number;
  progress?: number;
  score: number;
  section: number;
  startScore?: number;
  status?: RoadmapNodeStatus;
  title?: string;
  units: number;
}

export interface RoadmapScoreResponse {
  completedUnits: number;
  milestones: ScoreMilestone[];
  nextScore: number;
  progress: number;
  score: number;
}
