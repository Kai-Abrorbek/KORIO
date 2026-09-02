import { SelfReportedLevel } from '../common/enums/self-level.enum';

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
