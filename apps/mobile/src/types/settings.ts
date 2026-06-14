import { Ionicons } from "@expo/vector-icons";

export interface SettingsItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBgColor: string;
  route?: string;
}

export interface SettingsSection {
  id: string;
  items: SettingsItem[];
}
