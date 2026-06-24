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

// 학습 언어 → 깃발 (KORIO는 한국어 학습이라 기본 한국)
export function langToFlag(lang?: string): string {
  const map: Record<string, string> = {
    ko: '🇰🇷',
    en: '🇺🇸',
    uz: '🇺🇿',
    ru: '🇷🇺',
  };
  return map[lang ?? ''] ?? '🇰🇷';
}
