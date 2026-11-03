import { getWordLibraryPalette } from "./word-library-theme";

/** Centered dialogs share the word-practice palette approved by learners. */
export function getDialogPalette(isDark: boolean) {
  const palette = getWordLibraryPalette(isDark);
  return {
    ...palette,
    textSecondary: isDark ? palette.textSecondary : "#63655F",
    isDark,
    backdrop: isDark ? "rgba(5, 9, 16, 0.72)" : "rgba(24, 30, 44, 0.42)",
    dangerAction: "#B32D55",
    dangerDepth: "#902141",
    onDanger: "#FFFFFF",
  };
}

export type DialogPalette = ReturnType<typeof getDialogPalette>;
export type DialogTone = "primary" | "success" | "warning" | "danger";

export function getDialogTone(p: DialogPalette, tone: DialogTone) {
  const action = {
    action: p.action,
    pressed: p.depth,
    onAction: p.onAction,
  };
  switch (tone) {
    case "danger":
      return {
        fill: p.pinkWash,
        ink: p.onPink,
        action: p.dangerAction,
        pressed: p.dangerDepth,
        onAction: p.onDanger,
      };
    case "warning":
      return { fill: p.yellowWash, ink: p.onYellow, ...action };
    case "success":
      return { fill: p.wash, ink: p.primary, ...action };
    default:
      return { fill: p.wash, ink: p.primary, ...action };
  }
}

/** Dedicated names avoid the application's legacy global theme overrides. */
export function getDialogCssVariables(
  isDark: boolean,
): Record<`--${string}`, string> {
  const p = getDialogPalette(isDark);
  return {
    "--dialog-bg": p.surface,
    "--dialog-page": p.bg,
    "--dialog-text": p.text,
    "--dialog-muted": p.textSecondary,
    "--dialog-border": p.border,
    "--dialog-action": p.action,
    "--dialog-action-text": p.onAction,
    "--dialog-action-pressed": p.depth,
    "--dialog-accent": p.primary,
    "--dialog-wash": p.wash,
    "--dialog-soft": p.soft,
    "--dialog-yellow": p.yellow,
    "--dialog-yellow-wash": p.yellowWash,
    "--dialog-yellow-ink": p.onYellow,
    "--dialog-pink": p.pink,
    "--dialog-pink-wash": p.pinkWash,
    "--dialog-pink-ink": p.onPink,
    "--dialog-danger": p.dangerAction,
    "--dialog-danger-pressed": p.dangerDepth,
    "--dialog-backdrop": p.backdrop,
  };
}
