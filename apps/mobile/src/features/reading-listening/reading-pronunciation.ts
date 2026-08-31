export interface ReadingWordRange {
  index: number;
  word: string;
  startIndex: number;
  endIndex: number;
}

const READING_WORD_PATTERN =
  /[\p{L}\p{N}]+(?:[·'’-][\p{L}\p{N}]+)*/gu;

/** 서버와 같은 규칙으로 본문에서 실제로 읽을 단어와 글자 위치를 만든다. */
export function buildReadingWordRanges(text: string): ReadingWordRange[] {
  return Array.from(text.matchAll(READING_WORD_PATTERN)).map(
    (match, index) => {
      const utf16Start = match.index ?? 0;
      const startIndex = Array.from(text.slice(0, utf16Start)).length;
      const word = match[0];
      return {
        index,
        word,
        startIndex,
        endIndex: startIndex + Array.from(word).length,
      };
    },
  );
}
