export interface LessonCompleteStats {
  xp: number;
  accuracy: {
    value: number; // 0-100
    labelKey: string;
  };
  time: {
    value: string; // "4:12"
    labelKey: string;
  };
}

export type CelebrationStyle = "jump" | "spin" | "wiggle" | "bounce";
