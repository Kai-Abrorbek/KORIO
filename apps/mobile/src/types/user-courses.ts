import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface EnrolledCourse {
  id: string;
  nameKey: string;
  flag?: string; // 언어 코스용 이모지
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap; // 스킬 코스용
  iconBgColor?: string;
  xp: number;
}
