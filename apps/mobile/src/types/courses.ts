import { Ionicons } from "@expo/vector-icons";

export interface Course {
  id: string;
  nameKey: string; // i18n key
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}
