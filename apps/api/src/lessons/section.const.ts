/**
 * 섹션 메타데이터.
 * 노드에는 section 번호만 있어서 섹션 단위 제목·설명을 담을 곳이 없다.
 * 시드 데이터(seed/data/sectionN)와 1:1 로 맞춰 관리한다.
 */
export interface SectionMeta {
  section: number;
  title: Record<string, string>;
  description: Record<string, string>;
}

export const SECTIONS: SectionMeta[] = [
  {
    section: 1,
    title: {
      ko: '섹션 1',
      uz: '1-bo‘lim',
      en: 'Section 1',
      ru: 'Раздел 1',
    },
    description: {
      ko: '기본적인 인사를 위한 단어, 구문, 문법 개념을 익혀요.',
      uz: 'Oddiy salomlashish uchun so‘z, ibora va grammatikani o‘rganasiz.',
      en: 'Learn the words, phrases, and grammar for basic greetings.',
      ru: 'Изучите слова, фразы и грамматику для базовых приветствий.',
    },
  },
  {
    section: 2,
    title: {
      ko: '섹션 2',
      uz: '2-bo‘lim',
      en: 'Section 2',
      ru: 'Раздел 2',
    },
    description: {
      ko: '직업, 취미, 색깔을 말하며 일상 대화를 넓혀요.',
      uz: 'Kasb, sevimli mashg‘ulot va ranglar bilan suhbatni kengaytirasiz.',
      en: 'Talk about jobs, hobbies, and colours to widen everyday conversation.',
      ru: 'Расскажите о профессии, хобби и цветах, расширяя повседневную речь.',
    },
  },
];

const FALLBACK_LANG = 'en';

export function getSectionMeta(section: number): SectionMeta | null {
  return SECTIONS.find((s) => s.section === section) ?? null;
}

export function pickSectionText(
  field: Record<string, string> | undefined,
  lang: string,
): string {
  if (!field) return '';
  return field[lang] || field[FALLBACK_LANG] || '';
}
