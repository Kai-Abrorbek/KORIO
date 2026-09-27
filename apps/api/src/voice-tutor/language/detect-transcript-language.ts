/** Conservative script label for transcript metadata; the lesson agent sees the original text. */
export function detectTranscriptLanguage(
  text: string,
): 'ko' | 'ja' | 'ru' | 'und' {
  if (/[\u3040-\u30ff]/u.test(text)) return 'ja';
  if (/[\u0400-\u04ff]/u.test(text)) return 'ru';
  if (/[\uac00-\ud7af\u1100-\u11ff]/u.test(text)) return 'ko';
  return 'und';
}
