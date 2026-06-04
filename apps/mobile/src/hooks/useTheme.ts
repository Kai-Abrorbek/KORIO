import { useColorScheme } from "react-native";
import { useSettingsStore } from "../store/settings.store";
import { themes } from "../constants/theme";

export function useTheme() {
  const { theme } = useSettingsStore();
  const systemScheme = useColorScheme();

  const activeTheme =
    theme === "system"
      ? systemScheme === "dark"
        ? themes.dark
        : themes.light
      : (themes[theme] ?? themes.light);

  return activeTheme;
}
