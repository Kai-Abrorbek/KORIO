import { UserLevel } from '../common/enums/level.enum';
import { SelfReportedLevel } from '../common/enums/self-level.enum';
import { DEFAULT_COURSE_ID } from '../common/learning-course';

export const SECTIONS_PER_LEVEL = 2;
export const MAX_PLACEMENT_LEVEL = 6; // 12섹션 / 2

export function clampLevel(level: number): number {
  return Math.min(MAX_PLACEMENT_LEVEL, Math.max(1, Math.round(level)));
}

/** placement level(1~6) → [시작섹션, 끝섹션] */
export function sectionRangeForLevel(level: number): [number, number] {
  const l = clampLevel(level);
  return [l * 2 - 1, l * 2];
}

/** placement level(1~6)에서 학습을 시작할 첫 섹션 */
export function recommendedSectionForLevel(level: number): number {
  return sectionRangeForLevel(level)[0];
}

export interface PlacementBand {
  skipTest: boolean; // 완전초보 → 테스트 스킵
  forceHangul: boolean; // 한글부터 강제
  questionLevels: string[]; // 레벨테스트 출제 범위 (정렬로 쉬운→어려운)
  minLevel: number;
  maxLevel: number;
}

export const SELF_LEVEL_BAND: Record<SelfReportedLevel, PlacementBand> = {
  [SelfReportedLevel.COMPLETE_BEGINNER]: {
    skipTest: true,
    forceHangul: true,
    questionLevels: [],
    minLevel: 1,
    maxLevel: 1,
  },
  [SelfReportedLevel.BASIC_GREETINGS]: {
    skipTest: false,
    forceHangul: false,
    questionLevels: ['1', '2'],
    minLevel: 1,
    maxLevel: 2,
  },
  [SelfReportedLevel.BASIC_CONVERSATION]: {
    skipTest: false,
    forceHangul: false,
    questionLevels: ['2', '3', '4'],
    minLevel: 2,
    maxLevel: 4,
  },
  [SelfReportedLevel.ABOVE]: {
    skipTest: false,
    forceHangul: false,
    questionLevels: ['4', '5', '6'],
    minLevel: 4,
    maxLevel: 6,
  },
};

/** 레벨테스트 점수(0~100)를 밴드 안 placement level로 변환 */
export function scoreToPlacementLevel(
  self: SelfReportedLevel,
  score: number,
): number {
  const band = SELF_LEVEL_BAND[self];
  const span = band.maxLevel - band.minLevel;
  return clampLevel(band.minLevel + Math.round((score / 100) * span));
}

/**
 * 레벨 테스트 없이 시작할 때의 자리 (2026-10-26 온보딩에서 테스트를 뺐다 — 앱을 써 보기도
 * 전에 시험부터 보게 하면 그 자리에서 나간다).
 *
 * 자기 수준 밴드의 **가장 낮은 급**부터 — 실제보다 높게 앉히면 어려워서 나가고,
 * 낮게 앉히면 로드맵의 건너뛰기 테스트로 스스로 올라갈 수 있다.
 */
export function selfReportedPlacement(self?: SelfReportedLevel | null): {
  placementLevel: number;
  level: UserLevel;
} {
  const band =
    SELF_LEVEL_BAND[self ?? SelfReportedLevel.COMPLETE_BEGINNER] ??
    SELF_LEVEL_BAND[SelfReportedLevel.COMPLETE_BEGINNER];
  const placementLevel = clampLevel(band.minLevel);
  return {
    placementLevel,
    level: placementLevel >= 2 ? UserLevel.INTERMEDIATE : UserLevel.BEGINNER,
  };
}

/**
 * 급수 메타. 급 하나 = 섹션 두 개다(sectionRangeForLevel).
 *
 * 유저가 "몇 급부터 배울지" 고르는 화면에 쓴다. 콘텐츠가 있는지는 여기서
 * 판단하지 않는다 — 시드가 늘면 자동으로 열려야 하므로 DB 의 노드 유무로
 * 정한다.
 */
export interface PlacementLevelMeta {
  level: number;
  title: Record<string, string>;
  description: Record<string, string>;
}

export const PLACEMENT_LEVELS: PlacementLevelMeta[] = [
  {
    level: 1,
    title: {
      ko: '1급 · 처음 시작',
      uz: '1-daraja · Boshlang‘ich',
      en: 'Level 1 · Starting out',
      ru: 'Уровень 1 · Начало',
    },
    description: {
      ko: '한글과 기본 인사부터. 한국어가 처음이면 여기서 시작해요.',
      uz: 'Hangul va oddiy salomlashuvdan. Koreys tili birinchi marta bo‘lsa shu yerdan.',
      en: 'Hangul and basic greetings. Start here if Korean is new to you.',
      ru: 'Хангыль и базовые приветствия. Начните здесь, если корейский новый для вас.',
    },
  },
  {
    level: 2,
    title: {
      ko: '2급 · 일상 대화',
      uz: '2-daraja · Kundalik suhbat',
      en: 'Level 2 · Everyday talk',
      ru: 'Уровень 2 · Повседневная речь',
    },
    description: {
      ko: '자기소개, 물건 사기, 약속 잡기. 인사말은 이미 아는 분께.',
      uz: 'O‘zini tanishtirish, xarid, uchrashuv. Salomlashuvni bilsangiz.',
      en: 'Introductions, shopping, making plans. If greetings are already easy.',
      ru: 'Знакомство, покупки, планы. Если приветствия уже даются легко.',
    },
  },
  {
    level: 3,
    title: {
      ko: '3급 · 생활 한국어',
      uz: '3-daraja · Hayotiy koreys tili',
      en: 'Level 3 · Living in Korean',
      ru: 'Уровень 3 · Корейский в жизни',
    },
    description: {
      ko: '교통, 병원, 은행 같은 실제 상황을 한국어로 처리해요.',
      uz: 'Transport, shifoxona, bank — haqiqiy vaziyatlarni koreyscha hal qilasiz.',
      en: 'Handle real situations — transport, clinics, banks — in Korean.',
      ru: 'Решайте реальные ситуации — транспорт, клиника, банк — по-корейски.',
    },
  },
  {
    level: 4,
    title: {
      ko: '4급 · 사회 주제',
      uz: '4-daraja · Ijtimoiy mavzular',
      en: 'Level 4 · Social topics',
      ru: 'Уровень 4 · Социальные темы',
    },
    description: {
      ko: '직장, 뉴스, 사회 이슈를 이야기하고 의견을 말해요.',
      uz: 'Ish, yangiliklar, ijtimoiy masalalar haqida fikr bildirasiz.',
      en: 'Discuss work, news, and social issues, and give your opinion.',
      ru: 'Обсуждайте работу, новости и общественные темы, выражайте мнение.',
    },
  },
  {
    level: 5,
    title: {
      ko: '5급 · 전문 주제',
      uz: '5-daraja · Maxsus mavzular',
      en: 'Level 5 · Specialised topics',
      ru: 'Уровень 5 · Специальные темы',
    },
    description: {
      ko: '추상적인 화제와 전문 분야를 다뤄요.',
      uz: 'Mavhum mavzular va kasbiy sohalar bilan ishlaysiz.',
      en: 'Work with abstract themes and professional fields.',
      ru: 'Работайте с абстрактными темами и профессиональными областями.',
    },
  },
  {
    level: 6,
    title: {
      ko: '6급 · 고급',
      uz: '6-daraja · Yuqori daraja',
      en: 'Level 6 · Advanced',
      ru: 'Уровень 6 · Продвинутый',
    },
    description: {
      ko: '관용 표현과 미묘한 뉘앙스까지. 원어민에 가깝게.',
      uz: 'Idiomalar va nozik ma‘nolar — ona tilida so‘zlashuvchiga yaqin.',
      en: 'Idioms and fine nuance — close to a native speaker.',
      ru: 'Идиомы и тонкие оттенки — близко к носителю языка.',
    },
  },
];

/**
 * 영어 코스의 급수 메타. 구조(급 하나 = 섹션 두 개, 6급)는 한국어와 같고
 * 이름만 CEFR(A1~C2)에 맞췄다. 콘텐츠 유무는 똑같이 DB 노드로 판단한다.
 */
export const ENGLISH_PLACEMENT_LEVELS: PlacementLevelMeta[] = [
  {
    level: 1,
    title: {
      ko: '1단계 · A1 입문',
      uz: '1-daraja · A1 Boshlang‘ich',
      en: 'Level 1 · A1 Starter',
      ru: 'Уровень 1 · A1 Начальный',
    },
    description: {
      ko: '알파벳과 인사, 첫 단어부터. 영어가 처음이면 여기서 시작해요.',
      uz: 'Alifbo, salomlashuv va ilk so‘zlardan. Ingliz tili yangi bo‘lsa shu yerdan.',
      en: 'The alphabet, greetings and first words. Start here if English is new to you.',
      ru: 'Алфавит, приветствия и первые слова. Начните здесь, если английский для вас новый.',
    },
  },
  {
    level: 2,
    title: {
      ko: '2단계 · A2 일상 영어',
      uz: '2-daraja · A2 Kundalik ingliz tili',
      en: 'Level 2 · A2 Everyday English',
      ru: 'Уровень 2 · A2 Повседневный английский',
    },
    description: {
      ko: '자기소개, 물건 사기, 약속 잡기. 기본 인사는 아는 분께.',
      uz: 'O‘zini tanishtirish, xarid, uchrashuv. Oddiy salomlashuvni bilsangiz.',
      en: 'Introductions, shopping, making plans. If basic greetings are already easy.',
      ru: 'Знакомство, покупки, планы. Если базовые приветствия уже даются легко.',
    },
  },
  {
    level: 3,
    title: {
      ko: '3단계 · B1 생활 영어',
      uz: '3-daraja · B1 Hayotiy ingliz tili',
      en: 'Level 3 · B1 English for life',
      ru: 'Уровень 3 · B1 Английский для жизни',
    },
    description: {
      ko: '여행, 일, 생활 속 상황을 영어로 처리해요.',
      uz: 'Sayohat, ish va kundalik vaziyatlarni inglizcha hal qilasiz.',
      en: 'Handle travel, work and everyday situations in English.',
      ru: 'Решайте ситуации в поездках, на работе и в быту по-английски.',
    },
  },
  {
    level: 4,
    title: {
      ko: '4단계 · B2 자신 있는 대화',
      uz: '4-daraja · B2 Erkin suhbat',
      en: 'Level 4 · B2 Confident talk',
      ru: 'Уровень 4 · B2 Уверенное общение',
    },
    description: {
      ko: '뉴스와 사회 이슈를 이야기하고 의견을 말해요.',
      uz: 'Yangiliklar va ijtimoiy mavzularda fikr bildirasiz.',
      en: 'Discuss news and social issues, and give your opinion.',
      ru: 'Обсуждайте новости и общественные темы, выражайте мнение.',
    },
  },
  {
    level: 5,
    title: {
      ko: '5단계 · C1 고급',
      uz: '5-daraja · C1 Yuqori daraja',
      en: 'Level 5 · C1 Advanced',
      ru: 'Уровень 5 · C1 Продвинутый',
    },
    description: {
      ko: '복잡한 주제와 업무 영어를 다뤄요.',
      uz: 'Murakkab mavzular va ish uchun ingliz tili bilan ishlaysiz.',
      en: 'Work with complex topics and professional English.',
      ru: 'Работайте со сложными темами и деловым английским.',
    },
  },
  {
    level: 6,
    title: {
      ko: '6단계 · C2 원어민 수준',
      uz: '6-daraja · C2 Mukammal',
      en: 'Level 6 · C2 Mastery',
      ru: 'Уровень 6 · C2 Свободное владение',
    },
    description: {
      ko: '관용 표현과 미묘한 뉘앙스까지. 원어민에 가깝게.',
      uz: 'Idiomalar va nozik ma‘nolar — ona tilida so‘zlashuvchiga yaqin.',
      en: 'Idioms and fine nuance — close to a native speaker.',
      ru: 'Идиомы и тонкие оттенки — близко к носителю языка.',
    },
  },
];

/** 코스별 급수 메타. 모르는 코스는 한국어 표를 쓰지 않고 번호만 붙인 기본값 */
export function placementLevelsFor(courseId: string): PlacementLevelMeta[] {
  if (courseId === DEFAULT_COURSE_ID) return PLACEMENT_LEVELS;
  if (courseId === 'en-general') return ENGLISH_PLACEMENT_LEVELS;
  return PLACEMENT_LEVELS.map((meta) => ({
    level: meta.level,
    title: {
      ko: `${meta.level}단계`,
      uz: `${meta.level}-daraja`,
      en: `Level ${meta.level}`,
      ru: `Уровень ${meta.level}`,
    },
    description: { ko: '', uz: '', en: '', ru: '' },
  }));
}
