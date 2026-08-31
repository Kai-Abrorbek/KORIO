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
  {
    section: 3,
    title: {
      ko: '섹션 3',
      uz: '3-bo‘lim',
      en: 'Section 3',
      ru: 'Раздел 3',
    },
    description: {
      ko: '자기소개와 취미, 물건 사기와 길 찾기까지 생활 표현을 넓혀요.',
      uz: 'O‘zingizni tanishtirish, sevimli mashg‘ulot, xarid va yo‘l so‘rashni o‘rganasiz.',
      en: 'Introduce yourself, talk about hobbies, shop, and ask for directions.',
      ru: 'Расскажите о себе и увлечениях, делайте покупки и спрашивайте дорогу.',
    },
  },
];

const FALLBACK_LANG = 'en';

/**
 * 섹션 메타.
 *
 * ⚠️ 없는 섹션에 null 을 돌려주면 **로드맵의 다음 섹션 안내 카드가 통째로
 * 사라진다.** 그러면 데이터상 다음 섹션이 있어도 넘어갈 길이 없어진다.
 * 실제로 섹션 3 데이터를 넣고도 여기 메타를 안 넣어서 섹션 2 에서 길이
 * 끊겨 있었다.
 *
 * 그래서 모르는 섹션은 최소한의 제목이라도 만들어 돌려준다. 설명이 밋밋한
 * 건 고치면 되지만, 길이 막히는 건 유저가 알아챌 방법이 없다.
 */
export function getSectionMeta(section: number): SectionMeta {
  const known = SECTIONS.find((s) => s.section === section);
  if (known) return known;

  return {
    section,
    title: {
      ko: `섹션 ${section}`,
      uz: `${section}-bo‘lim`,
      en: `Section ${section}`,
      ru: `Раздел ${section}`,
    },
    description: {
      ko: '다음 단계로 넘어갈 준비가 됐어요.',
      uz: 'Keyingi bosqichga o‘tishga tayyorsiz.',
      en: 'Ready to move on to the next stage.',
      ru: 'Пора переходить к следующему этапу.',
    },
  };
}

export function pickSectionText(
  field: Record<string, string> | undefined,
  lang: string,
): string {
  if (!field) return '';
  return field[lang] || field[FALLBACK_LANG] || '';
}
