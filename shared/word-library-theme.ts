/** Reference-led colors for wordbooks only; the rest of KORIO keeps its theme. */
const light = {
  bg: "#FAF9F6",
  surface: "#FFFFFF",
  text: "#22221F",
  textSecondary: "#6F706B",
  border: "#E8E7E1",
  primary: "#005BDA",
  action: "#0066FF",
  onAction: "#FFFFFF",
  depth: "#0052CC",
  wash: "#EAF2FF",
  soft: "#F1F0EB",
  success: "#2D6B4F",
  error: "#AE2F50",
  yellow: "#FFE05B",
  yellowWash: "#FFF5C4",
  onYellow: "#6B5300",
  pink: "#EF4E86",
  pinkWash: "#FDE7EF",
  onPink: "#A02D55",
  covers: {
    paper: { bg: "#FFF0A9", text: "#65500A" },
    ink: { bg: "#242C46", text: "#F6F1E5" },
    violet: { bg: "#DDEBFF", text: "#1A437D" },
    mist: { bg: "#FBE0EA", text: "#813852" },
  },
};

const dark: typeof light = {
  bg: "#16191F",
  surface: "#22262F",
  text: "#F8F6F0",
  textSecondary: "#AEB3BD",
  border: "#353C48",
  primary: "#8AB8FF",
  action: "#0066FF",
  onAction: "#FFFFFF",
  depth: "#0052CC",
  wash: "#233852",
  soft: "#2A2E36",
  success: "#A5D4BA",
  error: "#FFA0B9",
  yellow: "#FFE05B",
  yellowWash: "#443C26",
  onYellow: "#FFE7A1",
  pink: "#FF87B0",
  pinkWash: "#48303E",
  onPink: "#FFD1E2",
  covers: {
    paper: { bg: "#443C26", text: "#FFE7A1" },
    ink: { bg: "#283349", text: "#E6F0FF" },
    violet: { bg: "#293C57", text: "#B9D5FF" },
    mist: { bg: "#48303E", text: "#FFD1E2" },
  },
};

export function getWordLibraryPalette(isDark: boolean) {
  return isDark ? dark : light;
}

export function getWordLibraryCssVariables(
  isDark: boolean,
): Record<`--${string}`, string> {
  const p = getWordLibraryPalette(isDark);
  return {
    "--wl-bg": p.bg,
    "--surface": p.surface,
    "--text": p.text,
    "--muted": p.textSecondary,
    "--border": p.border,
    "--wl-action": p.action,
    "--wl-action-text": p.onAction,
    "--wl-depth": p.depth,
    "--wl-accent": p.primary,
    "--wl-wash": p.wash,
    "--wl-inset": p.soft,
    "--wl-track": p.border,
    "--wl-error": p.error,
    "--wl-yellow": p.yellow,
    "--wl-yellow-wash": p.yellowWash,
    "--wl-yellow-ink": p.onYellow,
    "--wl-pink": p.pink,
    "--wl-pink-wash": p.pinkWash,
    "--wl-pink-ink": p.onPink,
    "--wl-cover": p.covers.paper.bg,
    "--wl-cover-ink": p.covers.paper.text,
    "--wl-cover-alt": p.covers.violet.bg,
    "--wl-cover-alt-ink": p.covers.violet.text,
    "--wl-cover-mist": p.covers.mist.bg,
    "--wl-cover-mist-ink": p.covers.mist.text,
    "--wl-cover-dark": p.covers.ink.bg,
    "--wl-cover-dark-ink": p.covers.ink.text,
  };
}
