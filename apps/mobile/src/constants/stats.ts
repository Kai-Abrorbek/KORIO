import { StudyCategory } from "@/types/stats";

/** 카테고리 탭에 노출되는 목록 (other 는 유저가 고를 대상이 아니라 제외) */
export const CATEGORY_LIST: StudyCategory[] = [
  "vocab",
  "grammar",
  "expression",
  "conversation",
  "listening",
  "topik",
];

export const CATEGORY_COLORS: Record<StudyCategory, string> = {
  vocab: "#A78BFA",
  grammar: "#7DC3F8",
  expression: "#F7A8C0",
  conversation: "#7BD9A8",
  listening: "#F4B860",
  topik: "#825707",
  other: "#9AA0A6",
};

/** 차트 집계용 — 탭에 안 뜨는 other 까지 전부 포함 */
export const ALL_CATEGORIES = Object.keys(CATEGORY_COLORS) as StudyCategory[];
