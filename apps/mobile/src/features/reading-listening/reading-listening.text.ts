import type {
  LocalizedReadingText,
  ReadingLanguage,
} from "../../types/reading-listening";

/**
 * 4개 언어 한 벌에서 지금 화면 언어를 꺼낸다.
 *
 * 없으면 한국어로 떨어진다 — 번역이 덜 된 자리에 빈칸을 보여 주느니
 * 원문이 낫다. `ko-KR` 처럼 지역이 붙어 와도 앞부분만 본다.
 *
 * (예전엔 이 함수가 `reading-listening.mock.ts` 안에 있었다. 화면 전체가
 *  쓰는 유틸이 목업 파일에 숨어 있으면 아무도 못 찾는다)
 */
export function localizedReadingText(
  value: LocalizedReadingText | undefined,
  language: string,
) {
  if (!value) return "";
  const normalized = language.split("-")[0] as ReadingLanguage;
  return value[normalized]?.trim() || value.ko?.trim() || "";
}
