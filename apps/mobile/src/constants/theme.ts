export const themes = {
  light: {
    bg: "#F0EFFA",
    surface: "#FFFFFF",
    primary: "#7F77DD",
    text: "#1A1A2E",
    textSecondary: "#55555F",
    border: "#ECEAF6",
    navy: "#1A1A2E",
  },
  dark: {
    bg: "#15151D",
    surface: "#25252E",
    primary: "#7F77DD",
    text: "#FFFFFF",
    textSecondary: "#A6A6B3",
    border: "#3A3A44",
    navy: "#1A1A2E",
  },
  system: null, // 시스템 따라가기
} as const;

export type ThemeColors = typeof themes.light;
