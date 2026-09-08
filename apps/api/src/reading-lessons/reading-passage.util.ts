import type {
  ReadingPassageParagraph,
  ReadingPassageSegment,
} from './schemas/reading-lesson.parts';

/**
 * 본문 다루기. 저장은 문자열, 화면은 조각 — 그 사이를 여기서만 오간다.
 *
 * 예전에는 이 쪼개기를 시드가 미리 해서 DB 에 넣었다. 그래서 문단 하나가
 * 조각 40개로 저장돼 사람이 읽을 수 없었고, 어휘를 고치면 조각도 같이 다시
 * 만들어야 했다. 지금은 저장은 원문 그대로 두고 내려줄 때만 쪼갠다.
 */

type VocabularyLike = { id: string; word: string };
type ParagraphLike = { id: string; text: string };

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * 문단 하나를 핵심 어휘 기준으로 쪼갠다.
 *
 * 긴 단어부터 맞춰 본다 — "한국 사람" 이 "사람" 보다 먼저 걸려야
 * "한국 " 과 "사람" 두 조각으로 갈리지 않는다.
 */
export function toPassageSegments(
  text: string,
  vocabulary: readonly VocabularyLike[],
): ReadingPassageSegment[] {
  const idByWord = new Map<string, string>();
  for (const item of vocabulary) {
    if (item?.word) idByWord.set(item.word, item.id);
  }
  if (!idByWord.size) return [{ text, vocabularyId: '' }];

  const words = [...idByWord.keys()].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${words.map(escapeRegExp).join('|')})`, 'g');

  return text
    .split(pattern)
    .filter(Boolean)
    .map((segment) => ({
      text: segment,
      vocabularyId: idByWord.get(segment) ?? '',
    }));
}

/** 앱이 받는 모양으로 본문을 만든다. 앱 쪽 코드는 예전 그대로 돈다 */
export function toPassageResponse(
  passage: readonly ParagraphLike[],
  vocabulary: readonly VocabularyLike[],
): ReadingPassageParagraph[] {
  return (passage ?? []).map((paragraph) => ({
    ...paragraph,
    segments: toPassageSegments(paragraph.text ?? '', vocabulary),
  })) as unknown as ReadingPassageParagraph[];
}

/**
 * 본문 전체를 한 덩어리 텍스트로. 낭독 채점과 단어 뜻 생성이 쓴다.
 * 문단 사이는 빈 줄로 띄운다.
 */
export function toPassageText(passage: readonly ParagraphLike[]): string {
  return (passage ?? []).map((paragraph) => paragraph.text ?? '').join('\n\n');
}
