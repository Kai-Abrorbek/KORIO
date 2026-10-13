import { useAppTheme } from "../../../shared/theme/theme-context";
import { CATEGORY_COLORS, CATEGORY_COLORS_DARK } from "../model/stats";

/** 분야 색 — 다크 모드면 어두운 바탕에서 보이는 색으로 */
export function useCategoryColors() {
  const { resolvedTheme } = useAppTheme();
  return resolvedTheme === "dark" ? CATEGORY_COLORS_DARK : CATEGORY_COLORS;
}
