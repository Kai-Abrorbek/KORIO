import { useMemo } from "react";
import { themes, type ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

export function createTopikPalette(theme: ThemeColors) {
  const isDark = theme.bg === themes.dark.bg;

  return {
    isDark,
    bg: theme.bg,
    surface: theme.surface,
    surfaceElevated: isDark ? "#2D2D38" : "#FFFFFF",
    surfaceMuted: isDark ? "#30303A" : "#F3F5F7",
    paper: isDark ? "#202029" : "#FFFEFB",
    text: theme.text,
    textSecondary: theme.textSecondary,
    textMuted: isDark ? "#8F909E" : "#7A8089",
    textSubtle: isDark ? "#747582" : "#9298A3",
    border: theme.border,
    borderStrong: isDark ? "#50515D" : "#D5D8DD",
    divider: isDark ? "#3A3A44" : "#E4E4E0",
    primary: isDark ? "#8BB9E6" : "#1D5D98",
    primaryStrong: isDark ? "#315F8D" : "#173B67",
    primarySoft: isDark ? "#22384D" : "#EAF3FB",
    primaryText: isDark ? "#C7E2FA" : "#153E68",
    hero: isDark ? "#172A42" : "#173B67",
    heroMuted: isDark ? "#B8CBE0" : "#D8E3EE",
    heroSubtle: isDark ? "#8FA8C2" : "#AFC4D8",
    overlay: isDark ? "rgba(0,0,0,0.74)" : "rgba(11,18,31,0.62)",
    shadow: "#000000",
    success: isDark ? "#6BD39B" : "#2B8A57",
    successText: isDark ? "#A9EDC8" : "#17683E",
    successSoft: isDark ? "#1E3B30" : "#EAF8F0",
    successBorder: isDark ? "#347657" : "#2B8A57",
    danger: isDark ? "#F08A8A" : "#C94A4A",
    dangerText: isDark ? "#FFC1C1" : "#A92E2E",
    dangerSoft: isDark ? "#472828" : "#FFF0F0",
    warning: isDark ? "#E8C66E" : "#A97918",
    warningText: isDark ? "#F2D98F" : "#80631E",
    warningSoft: isDark ? "#40371E" : "#FFF8E4",
    purple: isDark ? "#B8A6F4" : "#5A47A4",
    purpleSoft: isDark ? "#332D4A" : "#F0ECFA",
    white: "#FFFFFF",
    translucentWhite: "rgba(255,255,255,0.16)",
    heroBadge: "rgba(255,255,255,0.10)",
    heroGlow: "rgba(255,255,255,0.09)",
    heroGlowSoft: "rgba(255,255,255,0.07)",
    heroGlass: "rgba(255,255,255,0.17)",
    heroGlassDark: "rgba(18,20,44,0.28)",
    heroDescription: "rgba(255,255,255,0.78)",
    heroDivider: "rgba(255,255,255,0.16)",
    heroDividerStrong: "rgba(255,255,255,0.18)",
    readingGradient: (isDark
      ? ["#0A586E", "#0D7B77"]
      : ["#0D7493", "#19A5A1"]) as readonly [string, string],
    listeningGradient: (isDark
      ? ["#9B4B22", "#BD7027"]
      : ["#D66A2C", "#F29C38"]) as readonly [string, string],
    writingGradient: (isDark
      ? ["#47347A", "#674A97"]
      : ["#6246A3", "#9068CE"]) as readonly [string, string],
    levelOneGradient: (isDark
      ? ["#0A4B48", "#0D6D68"]
      : ["#0F766E", "#14A394"]) as readonly [string, string],
    levelTwoGradient: (isDark
      ? ["#1C2E58", "#493B83"]
      : ["#263E75", "#6553B6"]) as readonly [string, string],
    levelOneHero: (isDark
      ? ["#0A403E", "#075A56", "#0D716B"]
      : ["#0E645F", "#0B8580", "#15A097"]) as readonly [
      string,
      string,
      string,
    ],
    levelTwoHero: (isDark
      ? ["#172548", "#2C2D65", "#493675"]
      : ["#1D315F", "#3F438A", "#6A4EAD"]) as readonly [
      string,
      string,
      string,
    ],
  };
}

export type TopikPalette = ReturnType<typeof createTopikPalette>;

export function useTopikTheme() {
  const theme = useTheme();
  return useMemo(() => createTopikPalette(theme), [theme]);
}
