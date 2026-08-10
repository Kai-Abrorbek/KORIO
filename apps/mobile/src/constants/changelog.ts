/**
 * 업데이트 히스토리.
 *
 * 항목 본문은 i18n(`update.notes.<key>.items`)에 있고 여기엔 버전과 날짜만 둔다.
 * items 는 `"태그|내용"` 형식의 문자열 배열이다. 태그로 색과 라벨이 정해진다.
 *
 * 새 버전을 낼 때:
 *   1) 여기 맨 위에 항목 추가
 *   2) 4개 언어에 `update.notes.<key>` 채우기
 *   3) app.json 의 version 과 아래 version 을 맞추기
 *
 * ⚠ 아래 버전 번호와 날짜는 실제 릴리스에 맞춰 조정할 것.
 *   내용은 실제로 들어간 작업 기준으로 적혀 있다.
 */

export type ChangeTag = "new" | "improve" | "fix";

export interface ChangeEntry {
  /** 표시용 버전 */
  version: string;
  /** i18n 키 (버전의 점을 밑줄로) */
  key: string;
  /** YYYY-MM-DD */
  date: string;
}

export const CHANGELOG: ChangeEntry[] = [
  { version: "1.2.400", key: "v1_2_400", date: "2026-08-10" },
  { version: "1.2.300", key: "v1_2_300", date: "2026-07-28" },
  { version: "1.2.200", key: "v1_2_200", date: "2026-07-14" },
  { version: "1.2.100", key: "v1_2_100", date: "2026-06-30" },
];

export const TAG_LOOK: Record<ChangeTag, { color: string; bg: string }> = {
  new: { color: "#1DBB7F", bg: "#D7F5E5" },
  improve: { color: "#45B7D1", bg: "#D5F0F5" },
  fix: { color: "#FF7043", bg: "#FFE3D6" },
};

/** `"new|본문"` → `{ tag, text }`. 태그가 없으면 improve 로 본다. */
export function parseItem(raw: string): { tag: ChangeTag; text: string } {
  const i = raw.indexOf("|");
  if (i < 0) return { tag: "improve", text: raw };
  const tag = raw.slice(0, i) as ChangeTag;
  return {
    tag: TAG_LOOK[tag] ? tag : "improve",
    text: raw.slice(i + 1),
  };
}
