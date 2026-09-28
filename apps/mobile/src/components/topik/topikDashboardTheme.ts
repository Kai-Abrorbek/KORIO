import { useMemo } from "react";
import { useTopikTheme } from "./topikTheme";

/** Quiet palette for TOPIK navigation screens; question screens keep their own theme. */
export function useTopikDashboardTheme() {
  const base = useTopikTheme();

  return useMemo(
    () => ({
      ...base,
      bg: base.isDark ? "#111B20" : "#F7F8F5",
      surface: base.isDark ? "#1C292E" : "#FFFFFF",
      surfaceElevated: base.isDark ? "#223138" : "#FFFFFF",
      surfaceMuted: base.isDark ? "#26373D" : "#F1F5F3",
      text: base.isDark ? "#F1F6F4" : "#182A3A",
      textSecondary: base.isDark ? "#B6C7C8" : "#536574",
      textMuted: base.isDark ? "#A6B8BA" : "#627381",
      textSubtle: base.isDark ? "#91A6A9" : "#6D7F89",
      border: base.isDark ? "#34464B" : "#E1E8E6",
      borderStrong: base.isDark ? "#5B7779" : "#B8CCCA",
      divider: base.isDark ? "#34464B" : "#E9EEEC",
      primary: base.isDark ? "#80CDD0" : "#176B71",
      primaryStrong: base.isDark ? "#176B71" : "#176B71",
      primarySoft: base.isDark ? "#223D40" : "#E8F3F1",
      primaryText: base.isDark ? "#B8E8E7" : "#125B60",
      hero: base.isDark ? "#1C292E" : "#FFFFFF",
    }),
    [base],
  );
}
