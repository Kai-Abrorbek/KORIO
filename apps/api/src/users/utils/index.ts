export function levelToNumber(level?: string): number {
  switch (level) {
    case 'beginner':
      return 1;
    case 'intermediate':
      return 2;
    case 'advanced':
      return 3;
    default:
      return 1;
  }
}

// 국가코드("US") → 깃발 이모지
export function countryToFlag(country?: string): string {
  if (!country || country.length !== 2) return '';
  const A = 0x1f1e6;
  const cc = country.toUpperCase();
  return String.fromCodePoint(
    A + cc.charCodeAt(0) - 65,
    A + cc.charCodeAt(1) - 65,
  );
}

/**
 * 학습 언어 → 깃발. KORIO 는 한국어 학습이라 모르면 한국.
 *
 * targetLanguage 는 코드('ko')가 아니라 단어('korean')로 저장된다
 * (온보딩 설문이 그렇게 보낸다). 둘 다 받는다.
 */
export function langToFlag(lang?: string): string {
  const map: Record<string, string> = {
    ko: '🇰🇷',
    korean: '🇰🇷',
    en: '🇺🇸',
    english: '🇺🇸',
    uz: '🇺🇿',
    uzbek: '🇺🇿',
    ru: '🇷🇺',
    russian: '🇷🇺',
  };
  return map[(lang ?? '').toLowerCase()] ?? '🇰🇷';
}
