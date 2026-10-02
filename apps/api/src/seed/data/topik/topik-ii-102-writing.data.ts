import {
  TopikChoiceLayout,
  TopikExamType,
  TopikI18nText,
  TopikPublishStatus,
  TopikQuestionType,
  TopikResponseType,
  TopikSection,
  TopikSolution,
  TopikStimulusKind,
  TopikVisualTemplate,
} from '../../../topik/schemas/topik-content.schema';
import { passage, presentation, textBlocks } from './topik-seed.helpers';
import {
  TopikExamSeed,
  TopikSeedExam,
  TopikSeedGroup,
  TopikSeedQuestion,
} from './topik-seed.types';

const localized = (
  ko: string,
  uz: string,
  en: string,
  ru: string,
): TopikI18nText => ({ ko, uz, en, ru });

const writingPresentation = presentation(
  TopikVisualTemplate.EXAM_WRITING,
  TopikChoiceLayout.ONE_COLUMN,
);

const solution = (
  explanation: TopikI18nText,
  sampleAnswer: string,
  rubric: TopikI18nText,
): TopikSolution => {
  const strategy = localized(
    '문제 조건과 문맥을 확인한 뒤 답을 쓰고 내용·문법·분량을 점검하세요.',
    'Shart va kontekstni tekshirib yozing, keyin mazmun, grammatika va hajmni ko‘ring.',
    'Check the task and context, then review content, grammar, and length.',
    'Проверьте условие и контекст, затем содержание, грамматику и объём.',
  );
  return {
    explanation,
    strategy,
    sampleAnswer,
    rubric: [rubric],
    keyClues: [
      {
        key: 'task',
        order: 1,
        label: localized('문제 조건', 'Shart', 'Task', 'Условие'),
        explanation: rubric,
        targetSegmentKeys: [],
      },
    ],
    steps: [
      {
        key: 'plan',
        order: 1,
        title: localized('내용 계획', 'Reja', 'Plan', 'План'),
        explanation: strategy,
        targetSegmentKeys: [],
      },
      {
        key: 'review',
        order: 2,
        title: localized('답안 검토', 'Tekshirish', 'Review', 'Проверка'),
        explanation,
        targetSegmentKeys: [],
      },
    ],
    hints: [
      {
        key: 'hint-1',
        level: 1,
        title: localized('문맥 확인', 'Kontekst', 'Context', 'Контекст'),
        content: strategy,
        examples: [],
        targetSegmentKeys: [],
      },
      {
        key: 'hint-2',
        level: 2,
        title: localized('핵심 내용', 'Mazmun', 'Key content', 'Содержание'),
        content: rubric,
        examples: [],
        targetSegmentKeys: [],
      },
      {
        key: 'hint-3',
        level: 3,
        title: localized('표현 점검', 'Ifoda', 'Wording', 'Формулировка'),
        content: explanation,
        examples: [],
        targetSegmentKeys: [],
      },
    ],
    choiceNotes: [],
  };
};

const twoFields = {
  fields: [
    {
      key: 'field-a',
      label: '㉠',
      minCharacters: 1,
      maxCharacters: 100,
      multiline: false,
    },
    {
      key: 'field-b',
      label: '㉡',
      minCharacters: 1,
      maxCharacters: 100,
      multiline: false,
    },
  ],
  recommendedMinutes: 5,
  guide: localized(
    '각 빈칸 앞뒤의 문장과 자연스럽게 이어지도록 쓰세요.',
    'Har bir bo‘shliqni atrofidagi gaplarga mos to‘ldiring.',
    'Make each answer flow naturally with the surrounding sentences.',
    'Впишите фразы, согласующиеся с соседними предложениями.',
  ),
};

export const TOPIK_II_102_WRITING_EXAM: TopikSeedExam = {
  code: 'topik-ii-writing-102-2025',
  title: localized(
    '제102회 TOPIK II 쓰기',
    '102-TOPIK II yozish',
    '102nd TOPIK II Writing',
    '102-й TOPIK II: письмо',
  ),
  description: localized(
    '제102회 TOPIK II 쓰기 51~54번을 제공된 시험지와 모범답안으로 구성했습니다.',
    '102-TOPIK II yozish bo‘limining 51–54-savollari taqdim etilgan test va javob namunalariga asoslangan.',
    'Questions 51–54 of the 102nd TOPIK II Writing test, based on the supplied paper and sample answers.',
    'Задания 51–54 письма 102-го TOPIK II по предоставленному тесту и образцам ответов.',
  ),
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.WRITING,
  year: 2025,
  round: 102,
  durationMinutes: 50,
  totalQuestions: 4,
  totalPoints: 100,
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제102회 한국어능력시험 II B-홀수형 1교시 쓰기',
    edition: '제102회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 writing-test-paper-paper.pdf p.2–3 및 writing-answer-keys-answers.pdf p.1',
  },
  publishedAt: new Date('2025-10-19T00:00:00+09:00'),
  isActive: true,
};

export const TOPIK_II_102_WRITING_GROUPS: TopikSeedGroup[] = [
  {
    code: 'topik-ii-102-writing-51-52',
    order: 1,
    startNumber: 51,
    endNumber: 52,
    instruction: textBlocks(
      '[51~52] 다음 글의 ㉠과 ㉡에 알맞은 말을 각각 쓰시오. (각 10점)',
    ),
    pointsPerQuestion: 10,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-102-writing-53',
    order: 2,
    startNumber: 53,
    endNumber: 53,
    instruction: textBlocks(
      '[53] 다음은 ‘한국 캠핑 인구의 변화’에 대한 자료이다. 이 내용을 200~300자의 글로 쓰시오. 단, 글의 제목은 쓰지 마시오. (30점)',
    ),
    pointsPerQuestion: 30,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-102-writing-54',
    order: 3,
    startNumber: 54,
    endNumber: 54,
    instruction: textBlocks(
      '[54] 다음을 참고하여 600~700자로 글을 쓰시오. 단, 문제를 그대로 옮겨 쓰지 마시오. (50점)',
    ),
    pointsPerQuestion: 50,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
];

export const TOPIK_II_102_WRITING_QUESTIONS: TopikSeedQuestion[] = [
  {
    code: 'topik-ii-writing-102-q51',
    groupCode: 'topik-ii-102-writing-51-52',
    number: 51,
    order: 1,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks('다음 이메일의 ㉠과 ㉡에 알맞은 말을 각각 쓰시오.'),
    stimulus: {
      ...passage(
        '제목: 개인 물건 정리 요청    2025.10.10.(금)',
        '안녕하세요. 동아리 회장 호영입니다.',
        '학생회관 공사 때문에 동아리 방을 옮기게 되었습니다.',
        '그런데 현재 개인 물건들이 너무 많습니다.',
        '동아리 방을 옮기려면 이 물건들부터 먼저 [[blank:field-a|( ㉠ )]].',
        '방학을 하자마자 공사가 시작됩니다.',
        '방학이 [[blank:field-b|( ㉡ )]] 개인 물건을 모두 가져가 주십시오.',
      ),
      title: '개인 물건 정리 요청 이메일',
      visualVariant: 'official-writing-message',
    },
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠에는 물건을 먼저 정리해야 한다는 뜻을, ㉡에는 방학 시작 전이라는 기한을 씁니다.',
        '㉠ narsalarni avval tartibga solish zarurligini, ㉡ esa ta’til boshlanishidan oldingi muddatni bildiradi.',
        '㉠ says the belongings must be cleared first; ㉡ gives the deadline before vacation starts.',
        '㉠ требует сначала убрать вещи, ㉡ указывает срок до начала каникул.',
      ),
      '㉠ 정리해야 합니다\n㉡ 시작되기 전에',
      localized(
        '제공된 모범답안은 ㉠ ‘정리해야 합니다’, ㉡ ‘시작되기 전에’입니다.',
        'Namuna: ㉠ «정리해야 합니다», ㉡ «시작되기 전에».',
        'The supplied sample is “정리해야 합니다” and “시작되기 전에”.',
        'Образец ответа: «정리해야 합니다» и «시작되기 전에».',
      ),
    ),
    presentation: writingPresentation,
    tags: [
      'topik-ii',
      'round-102',
      'writing',
      'sentence-completion',
      'club-room',
    ],
    difficulty: 2,
    source: {
      pdfPage: 2,
      bookPage: 14,
      reference: '제102회 TOPIK II B-홀수형 쓰기 51번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-102-q52',
    groupCode: 'topik-ii-102-writing-51-52',
    number: 52,
    order: 2,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks('다음 글의 ㉠과 ㉡에 알맞은 말을 각각 쓰시오.'),
    stimulus: passage(
      '큰 항공기는 주로 고도가 높은 하늘에서 비행을 한다. 높이 올라가면 날씨의 영향을 별로 [[blank:field-a|( ㉠ )]] 흔들림이 적다. 반면 작은 항공기는 날씨의 영향을 받더라도 낮은 고도에서 비행을 해야 한다. 왜냐하면 높은 고도에서 [[blank:field-b|( ㉡ )]] 항공기의 엔진이 크고 좋아야 하며 연료도 많이 필요하기 때문이다.',
    ),
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '고도가 높으면 날씨의 영향을 적게 받아 흔들림이 적고, 높은 곳에서 비행하려면 강한 엔진과 많은 연료가 필요합니다.',
        'Balandda ob-havo ta’siri kam, ammo u yerda uchish uchun kuchli dvigatel va ko‘p yoqilg‘i zarur.',
        'At high altitude weather has less effect, but flying there requires a strong engine and more fuel.',
        'На большой высоте влияние погоды меньше, но нужны мощный двигатель и больше топлива.',
      ),
      '㉠ 받지 않아서\n㉡ 비행을 하기 위해서는 / 날기 위해서는',
      localized(
        '제공된 모범답안은 ㉠ ‘받지 않아서’, ㉡ ‘비행을 하기 위해서는/날기 위해서는’입니다.',
        'Namuna: ㉠ «받지 않아서», ㉡ «비행을 하기 위해서는/날기 위해서는».',
        'The supplied sample says “받지 않아서” and “비행을 하기 위해서는/날기 위해서는”.',
        'Образец: «받지 않아서» и «비행을 하기 위해서는/날기 위해서는».',
      ),
    ),
    presentation: writingPresentation,
    tags: [
      'topik-ii',
      'round-102',
      'writing',
      'sentence-completion',
      'aircraft',
    ],
    difficulty: 3,
    source: {
      pdfPage: 2,
      bookPage: 14,
      reference: '제102회 TOPIK II B-홀수형 쓰기 52번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-102-q53',
    groupCode: 'topik-ii-102-writing-53',
    number: 53,
    order: 3,
    type: TopikQuestionType.WRITING_DATA_DESCRIPTION,
    responseType: TopikResponseType.WRITTEN,
    points: 30,
    prompt: textBlocks(
      '다음은 ‘한국 캠핑 인구의 변화’에 대한 자료이다. 이 내용을 200~300자의 글로 쓰시오. 단, 글의 제목은 쓰지 마시오.',
    ),
    stimulus: {
      kind: TopikStimulusKind.CHART,
      title: '한국 캠핑 인구의 변화',
      subtitle: '조사 기관: 한국관광공사',
      blocks: [],
      bulletItems: [],
      infoItems: [
        { label: '2019년 캠핑 인구', value: '340만 명' },
        { label: '2024년 캠핑 인구', value: '650만 명' },
        { label: '전체 변화', value: '약 2배 증가' },
        { label: '2019년 연령별 1위', value: '20대~30대' },
        { label: '2019년 연령별 2위', value: '40대~50대' },
        { label: '2024년 연령별 1위', value: '40대~50대' },
        { label: '2024년 연령별 2위', value: '20대~30대' },
        {
          label: '원인 1',
          value: '장비 고급화·캠핑장 대여료 증가 → 경제력 요구',
        },
        { label: '원인 2', value: '자녀와의 여가 활동 → 가족 단위 캠핑 증가' },
      ],
      labeledSentences: [],
      givenText: [],
      chart: {
        title: '한국 캠핑 인구',
        subtitle: '2019년·2024년 비교',
        headers: ['캠핑 인구'],
        rows: [
          { label: '2019년', values: ['340만 명'], numericValues: [3400000] },
          { label: '2024년', values: ['650만 명'], numericValues: [6500000] },
        ],
        unit: '명',
        sourceNote:
          '원본 그래프의 인구 절대 수치만 chart에 표시되며 연령별 순위 변화와 원인은 infoItems에 보존했다.',
        variant: 'writing-camping-population',
      },
      imageUrl: '',
      imageAlt:
        '2019년 캠핑 인구 340만 명에서 2024년 650만 명으로 약 2배 증가. 연령별 1위는 20대~30대에서 40대~50대로 바뀌었다. 고급 장비와 대여료, 가족 단위 여가가 원인이다.',
      visualVariant: 'official-writing-chart',
    },
    writingConfig: {
      fields: [
        {
          key: 'essay',
          label: '답안',
          minCharacters: 200,
          maxCharacters: 300,
          multiline: true,
        },
      ],
      recommendedMinutes: 15,
      guide: localized(
        '2019·2024년 캠핑 인구, 연령별 순위 변화와 두 원인을 모두 쓰고 제목은 쓰지 마세요.',
        '2019 va 2024-yil qatnashchilari, yosh guruhlari reytingi hamda ikki sababni yozing; sarlavha qo‘ymang.',
        'Describe participant totals, age-rank changes, and both causes without a title.',
        'Опишите численность, изменение возрастного рейтинга и две причины без заголовка.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '캠핑 인구가 약 2배 늘고 1위 연령대가 20~30대에서 40~50대로 바뀌었습니다. 장비·대여료 부담과 가족 여가 증가가 원인입니다.',
        'Lager aholisi taxminan ikki baravar oshdi, yetakchi yosh guruhi 20–30 dan 40–50 ga o‘tdi; xarajat va oilaviy dam olish sabab bo‘ldi.',
        'Camping participation nearly doubled and the leading age group shifted from 20s–30s to 40s–50s, owing to costs and family leisure.',
        'Число любителей кемпинга почти удвоилось, ведущая возрастная группа сменилась; повлияли расходы и семейный отдых.',
      ),
      '한국관광공사에서 한국 캠핑 인구의 변화에 대해 조사한 자료에 따르면 캠핑 인구는 2019년에 340만 명이었던 것이 2024년에 650만 명으로 약 2배나 증가하였다. 이를 연령별 순위 변화로 보면 2019년에는 20대~30대가 1위를 차지하였고 2위는 40대~50대로 나타났다. 이와 달리 2024년에는 40대~50대가 1위로 가장 많았고 2위는 20대~30대로 나타났다. 이렇게 변화한 것은 캠핑 장비의 고급화와 캠핑장 대여료 증가로 인해 경제력이 요구되었고 자녀와의 여가 활동을 위한 가족 단위 캠핑이 증가하였기 때문으로 나타났다.',
      localized(
        '제공된 모범답안은 캠핑 인구 340만→650만 명, 연령별 순위 역전, 장비·대여료와 가족 캠핑의 두 원인을 포함합니다.',
        'Namuna 3,4 milliondan 6,5 millionga o‘sish, yosh reytingi almashuvi va ikki sababni qamrab oladi.',
        'The sample covers 3.4→6.5 million participants, the reversed age ranking, and both causes.',
        'Образец включает рост с 3,4 до 6,5 млн, смену возрастного лидерства и обе причины.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-102', 'writing', 'chart', 'camping'],
    difficulty: 4,
    source: {
      pdfPage: 3,
      bookPage: 15,
      reference: '제102회 TOPIK II B-홀수형 쓰기 53번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-102-q54',
    groupCode: 'topik-ii-102-writing-54',
    number: 54,
    order: 4,
    type: TopikQuestionType.WRITING_ARGUMENTATIVE_ESSAY,
    responseType: TopikResponseType.WRITTEN,
    points: 50,
    prompt: textBlocks(
      '다음을 참고하여 600~700자로 글을 쓰시오. 단, 문제를 그대로 옮겨 쓰지 마시오.',
    ),
    stimulus: {
      ...passage(
        '최근에는 식당에서부터 은행, 병원에 이르기까지 많은 곳에서 다양한 디지털 기기를 사용하고 있다. 하지만 디지털 기기를 활용하지 못해서 소외되는 사람들도 있다. 아래의 내용을 중심으로 ‘디지털 소외 문제와 해결 방안’에 대한 자신의 생각을 쓰라.',
      ),
      bulletItems: [
        '디지털 기술은 우리 생활에서 어떻게 활용되고 있는가?',
        '디지털 사회에서 소외되는 사람들은 누구이며, 어떤 문제를 겪을 수 있는가?',
        '디지털 소외 문제를 해결하기 위해 개인과 사회는 어떻게 해야 하는가?',
      ],
      visualVariant: 'official-writing-prompt',
    },
    writingConfig: {
      fields: [
        {
          key: 'essay',
          label: '답안',
          minCharacters: 600,
          maxCharacters: 700,
          multiline: true,
        },
      ],
      recommendedMinutes: 25,
      guide: localized(
        '디지털 기술의 활용, 소외 계층의 어려움, 개인·정부·사회가 할 일을 모두 다루세요.',
        'Raqamli texnologiya qo‘llanishi, chetda qolganlar muammosi va shaxs hamda jamiyat yechimlarini yozing.',
        'Discuss digital uses, who is excluded and why, and responses by individuals and society.',
        'Опишите применение технологий, трудности исключённых групп и решения со стороны людей и общества.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '모범답안은 키오스크·온라인 서비스의 활용, 고령층·저소득층·인프라 취약 지역의 어려움, 교육·지원 정책·인프라 확충을 논술합니다.',
        'Namuna kioska va onlayn xizmatlar, keksalar va kam ta’minlanganlar muammosi, ta’lim hamda infratuzilmani yoritadi.',
        'The sample covers kiosks and online services, barriers for older or low-income people, and training, support, and infrastructure.',
        'Образец рассматривает киоски и онлайн-услуги, трудности пожилых и малообеспеченных, обучение и инфраструктуру.',
      ),
      '과학 기술이 빠르게 발달하면서 과거와는 달리 일상생활에서 디지털 기술의 활용이 일반화되고 있다. 식당에서는 대면을 하지 않아도 키오스크로 음식을 주문할 수 있게 되었고 관공서나 금융 기관을 직접 방문하지 않아도 컴퓨터나 스마트폰으로 서비스를 이용할 수 있게 되었다. 또한 병원의 진료 예약이나 공연, 기차표 등의 예매도 인터넷으로 손쉽게 할 수 있다.\n\n그러나 이러한 편의를 모든 사람들이 동일하게 누리는 것은 아니다. 고령층의 경우 디지털 기기가 익숙하지 않아서 금융·의료 서비스를 이용하는 데에 어려움이 따른다. 그리고 경제적인 여건이 되지 않아 디지털 기기를 구입하거나 사용하는 것이 부담이 되는 사람들도 있을 것이다. 또한 디지털 인프라가 부족한 지역에서 거주하는 사람들은 온라인으로 제공 받을 수 있는 서비스가 제한적이다.\n\n이러한 문제를 해결하기 위해서는 개인과 사회 모두가 노력해야 한다. 개인의 경우 처음에는 익숙하지 않더라도 변화하는 시대에 뒤처지지 않게 디지털 기기의 사용법을 익히도록 해야 한다. 이를 위해서 정부에서는 디지털 소외 계층을 위한 지원 정책을 마련해서 모든 국민들이 일상에서 디지털 기술을 활용할 수 있게 하여 소외되는 사람들이 없도록 해야 한다. 그리고 디지털 인프라를 확충하여 지역과 계층에 무관하게 많은 사람들이 디지털 기술 발달의 혜택을 고르게 누릴 수 있도록 해야 한다.',
      localized(
        '제공된 모범답안은 활용(키오스크·예약), 격차(고령·경제·지역), 대안(사용법 학습·지원 정책·인프라)을 포함합니다.',
        'Namuna qo‘llanish, keksalar va kam ta’minlanganlar uchun to‘siqlar, o‘qitish va infratuzilmani qamrab oladi.',
        'The sample covers everyday uses, age/economic/area barriers, and training, policies, and infrastructure.',
        'Образец включает применение, возрастные и экономические барьеры, обучение, поддержку и инфраструктуру.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-102', 'writing', 'essay', 'digital-divide'],
    difficulty: 5,
    source: {
      pdfPage: 3,
      bookPage: 15,
      reference: '제102회 TOPIK II B-홀수형 쓰기 54번',
    },
    version: 1,
    isActive: true,
  },
];

export const TOPIK_II_102_WRITING_SEED: TopikExamSeed = {
  exam: TOPIK_II_102_WRITING_EXAM,
  groups: TOPIK_II_102_WRITING_GROUPS,
  questions: TOPIK_II_102_WRITING_QUESTIONS,
};
