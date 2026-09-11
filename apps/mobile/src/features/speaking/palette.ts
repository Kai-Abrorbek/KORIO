import { useTheme } from "@/hooks/useTheme";

export function useSpeakingPalette() {
  const theme = useTheme();
  const dark = theme.bg === "#15151D";
  return {
    bg: dark ? "#191820" : "#F8F7F3",
    surface: dark ? "#24222D" : "#FFFFFF",
    ink: dark ? "#F5F2FF" : "#29243D",
    muted: dark ? "#B3AFC4" : "#777183",
    border: dark ? "#3C374C" : "#E9E5EF",
    primary: dark ? "#B8A6FF" : "#7155D9",
    primarySoft: dark ? "#383047" : "#EEE8FC",
    success: dark ? "#7DDABD" : "#23846A",
    successSoft: dark ? "#213D35" : "#E8F5EF",
    warm: dark ? "#F4BF88" : "#A9632C",
    warmSoft: dark ? "#443427" : "#FCF0E2",
    hero: "#352650",
    onHero: "#FFFFFF",
  };
}

export type SpeakingPalette = ReturnType<typeof useSpeakingPalette>;
