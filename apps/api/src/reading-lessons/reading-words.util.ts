/**
 * 본문을 "읽을 단어" 로 자르는 단일 규칙.
 *
 * 낭독 채점(speech)과 단어 뜻보기(gloss)가 같은 결과를 봐야 한다. 규칙이
 * 두 벌이면 앱이 강조하는 단어와 서버가 채점하는 단어가 어긋난다.
 * 앱의 buildReadingWordRanges 도 같은 정규식을 쓴다.
 */
const READING_WORD_PATTERN = /[\p{L}\p{N}]+(?:[·'’-][\p{L}\p{N}]+)*/gu;

export function readingWords(text: string): string[] {
  return text.match(READING_WORD_PATTERN) ?? [];
}

/** 문장부호·대소문자·유니코드 표기 차이를 무시한 비교용 형태 */
export function normalizeWord(value: string): string {
  return (value ?? '')
    .normalize('NFC')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, '');
}
