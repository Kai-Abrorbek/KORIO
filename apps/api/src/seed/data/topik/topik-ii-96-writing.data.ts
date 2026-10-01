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

export const TOPIK_II_96_WRITING_EXAM: TopikSeedExam = {
  code: 'topik-ii-writing-96-2024',
  title: localized(
    '제96회 TOPIK II 쓰기',
    '96-TOPIK II yozish',
    '96th TOPIK II Writing',
    '96-й TOPIK II: письмо',
  ),
  description: localized(
    '제96회 TOPIK II 쓰기 51~54번을 제공된 시험지와 모범답안으로 구성했습니다.',
    '96-TOPIK II yozish bo‘limining 51–54-savollari taqdim etilgan test va javob namunalariga asoslangan.',
    'Questions 51–54 of the 96th TOPIK II Writing test, based on the supplied paper and sample answers.',
    'Задания 51–54 письма 96-го TOPIK II по предоставленному тесту и образцам ответов.',
  ),
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.WRITING,
  year: 2024,
  round: 96,
  durationMinutes: 50,
  totalQuestions: 4,
  totalPoints: 100,
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제96회 한국어능력시험 II B-홀수형 1교시 쓰기',
    edition: '제96회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 writing-test-paper-paper.pdf p.1–2 및 answer-keys-answers.pdf p.2',
  },
  publishedAt: new Date('2024-10-13T00:00:00+09:00'),
  isActive: true,
};

export const TOPIK_II_96_WRITING_GROUPS: TopikSeedGroup[] = [
  {
    code: 'topik-ii-96-writing-51-52',
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
    code: 'topik-ii-96-writing-53',
    order: 2,
    startNumber: 53,
    endNumber: 53,
    instruction: textBlocks(
      '[53] 다음은 ‘인주시 마라톤 대회 참가자 수의 변화’에 대한 자료이다. 이 내용을 200~300자의 글로 쓰시오. 단, 글의 제목은 쓰지 마시오. (30점)',
    ),
    pointsPerQuestion: 30,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-96-writing-54',
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

export const TOPIK_II_96_WRITING_QUESTIONS: TopikSeedQuestion[] = [
  {
    code: 'topik-ii-writing-96-q51',
    groupCode: 'topik-ii-96-writing-51-52',
    number: 51,
    order: 1,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks('다음 게시글의 ㉠과 ㉡에 알맞은 말을 각각 쓰시오.'),
    stimulus: {
      ...passage(
        '제목: 어디로 이사하는 것이 좋을까요?    작성자: 에르뎅',
        '안녕하세요. 외국인 유학생입니다.',
        '기숙사 생활이 불편해서 이번 방학에 이사를 [[blank:field-a|( ㉠ )]].',
        '집값이 싸고 좀 깨끗한 동네면 좋겠습니다.',
        '그런데 어느 [[blank:field-b|( ㉡ )]] 잘 모르겠습니다.',
        '좋은 곳을 아시면 추천 부탁드립니다.',
      ),
      title: '인주대학교 자유 게시판',
      visualVariant: 'official-writing-message',
    },
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠에는 이사하려는 계획을, ㉡에는 어떤 동네가 좋은지 모르겠다는 뜻을 씁니다.',
        '㉠ ko‘chish rejasini, ㉡ esa qaysi mahalla yaxshi ekanini bilmaslikni bildiradi.',
        '㉠ states the plan to move; ㉡ asks which neighborhood is suitable.',
        '㉠ выражает намерение переехать, ㉡ — неизвестность о подходящем районе.',
      ),
      '㉠ 하려고 합니다 / 하고 싶습니다\n㉡ 동네가 좋은지 / 동네가 좋을지 / 곳으로 갈지',
      localized(
        '제공된 모범답안은 ㉠ ‘하려고 합니다/하고 싶습니다’, ㉡ ‘동네가 좋은지/동네가 좋을지/곳으로 갈지’입니다.',
        'Namuna ㉠ «하려고 합니다/하고 싶습니다», ㉡ «동네가 좋은지/동네가 좋을지/곳으로 갈지».',
        'The supplied sample accepts both move-intent expressions and three neighborhood-question expressions.',
        'В образце приведены два варианта намерения переехать и три варианта вопроса о районе.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-96', 'writing', 'sentence-completion', 'moving'],
    difficulty: 2,
    source: {
      pdfPage: 1,
      bookPage: 14,
      reference: '제96회 TOPIK II B-홀수형 쓰기 51번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-96-q52',
    groupCode: 'topik-ii-96-writing-51-52',
    number: 52,
    order: 2,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks('다음 글의 ㉠과 ㉡에 알맞은 말을 각각 쓰시오.'),
    stimulus: passage(
      '개구리가 겨울에 추위를 피해 겨울잠을 잔다는 것은 잘 알려져 있다. 그런데 개구리가 꼭 추운 겨울에만 긴 잠을 [[blank:field-a|( ㉠ )]]. 더운 지역에 사는 개구리는 기온이 매우 높은 기간에 긴 잠을 자기도 한다. 왜냐하면 개구리는 사람과 달리 체내에서 체온 조절을 [[blank:field-b|( ㉡ )]]. 개구리처럼 체온 조절을 못하는 동물에게는 추위뿐만 아니라 더위도 생존에 위험이 되는 것이다.',
    ),
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '개구리는 겨울에만 자는 것이 아니며 체온을 스스로 조절하지 못하기 때문에 더운 때에도 긴 잠을 잡니다.',
        'Qurbaqa faqat qishda uxlamaydi; tana haroratini boshqara olmagani uchun issiqda ham uzoq uxlaydi.',
        'Frogs do not sleep only in winter; they also sleep through heat because they cannot regulate body temperature.',
        'Лягушки спят не только зимой: из-за неспособности регулировать температуру тела они спят и в жару.',
      ),
      '㉠ 자는 것은 아니다\n㉡ 못하기 때문이다 / 하지 못하기 때문이다',
      localized(
        '제공된 모범답안은 ㉠ ‘자는 것은 아니다’, ㉡ ‘못하기 때문이다/하지 못하기 때문이다’입니다.',
        'Namuna: ㉠ «자는 것은 아니다», ㉡ «못하기 때문이다/하지 못하기 때문이다».',
        'The supplied sample states that frogs do not sleep only in winter and cannot regulate body temperature.',
        'Образец поясняет, что лягушки спят не только зимой и не могут регулировать температуру тела.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-96', 'writing', 'sentence-completion', 'frogs'],
    difficulty: 3,
    source: {
      pdfPage: 1,
      bookPage: 14,
      reference: '제96회 TOPIK II B-홀수형 쓰기 52번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-96-q53',
    groupCode: 'topik-ii-96-writing-53',
    number: 53,
    order: 3,
    type: TopikQuestionType.WRITING_DATA_DESCRIPTION,
    responseType: TopikResponseType.WRITTEN,
    points: 30,
    prompt: textBlocks(
      '다음은 ‘인주시 마라톤 대회 참가자 수의 변화’에 대한 자료이다. 이 내용을 200~300자의 글로 쓰시오. 단, 글의 제목은 쓰지 마시오.',
    ),
    stimulus: {
      kind: TopikStimulusKind.CHART,
      title: '인주시 마라톤 대회 참가자 수의 변화',
      subtitle: '조사 기관: 한국스포츠연구소',
      blocks: [],
      bulletItems: [],
      infoItems: [
        { label: '2013년 참가자 수', value: '40만 명' },
        { label: '2023년 참가자 수', value: '100만 명' },
        { label: '전체 변화', value: '2.5배 증가' },
        { label: '20~30대 변화', value: '4배 증가' },
        { label: '40~50대 변화', value: '1.3배 증가' },
        {
          label: '원인 1',
          value: '건강 관리에 대한 관심 증가 → 달리기 문화 확산',
        },
        {
          label: '원인 2',
          value: 'SNS 마라톤 모임 활성화 → 20~30대 참가자 증가',
        },
      ],
      labeledSentences: [],
      givenText: [],
      chart: {
        title: '인주시 마라톤 대회 참가자 수',
        subtitle: '2013년·2023년 비교',
        headers: ['참가자 수'],
        rows: [
          { label: '2013년', values: ['40만 명'], numericValues: [400000] },
          { label: '2023년', values: ['100만 명'], numericValues: [1000000] },
        ],
        unit: '명',
        sourceNote:
          '원본 그래프의 총 참가자 수만 절대 수치로 표시되며 연령별 증가 배율과 원인은 infoItems에 보존했다.',
        variant: 'writing-marathon-participants',
      },
      imageUrl: '',
      imageAlt:
        '인주시 마라톤 대회 참가자 수가 2013년 40만 명에서 2023년 100만 명으로 2.5배 늘었다. 20~30대는 4배, 40~50대는 1.3배 증가했다. 건강 관심과 SNS 모임 활성화가 원인이다.',
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
        '2013·2023년 참가자 수와 연령별 증가 배율, 두 원인을 모두 쓰고 제목은 쓰지 마세요.',
        '2013 va 2023-yil qatnashchilari, yosh guruhlari o‘sishi va ikki sababni yozing; sarlavha qo‘ymang.',
        'Describe participant totals, age-group increases, and both causes without a title.',
        'Опишите число участников, рост по возрастным группам и две причины без заголовка.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '전체 참가자는 2.5배 증가했고, 특히 20~30대가 4배 늘었습니다. 건강 관심과 SNS 모임 활성화가 원인입니다.',
        'Jami ishtirokchilar 2,5 baravar, 20–30 yoshlilar 4 baravar oshdi; bunga sog‘lom turmush va SNS uchrashuvlari sabab.',
        'Participants rose 2.5-fold overall and fourfold among people in their 20s–30s; health interest and social-media gatherings contributed.',
        'Общее число участников выросло в 2,5 раза, среди 20–30-летних — в 4 раза; причины — забота о здоровье и встречи через соцсети.',
      ),
      '한국스포츠연구소에서 인주시 마라톤 대회 참가자 수의 변화를 조사하였다. 그 결과 인주시 마라톤 대회 참가자 수는 2013년 40만 명에서 2023년 100만 명으로 2.5배 증가한 것으로 나타났다. 이를 연령별로 살펴보면 20~30대는 지난 10년간 4배 증가한 반면 40~50대는 같은 기간에 1.3배 증가하는 데에 그쳤다. 이러한 변화의 원인은 건강 관리에 대한 관심이 높아져 달리기 문화가 확산되었고 SNS를 통한 마라톤 모임이 활성화되어 20~30대 참가자가 증가하였기 때문인 것으로 보인다.',
      localized(
        '제공된 모범답안은 총 40만→100만 명, 연령별 4배·1.3배, 건강 관심과 SNS 모임의 두 원인을 포함합니다.',
        'Namuna jami 400 mingdan 1 millionga o‘sish, yosh guruhlari nisbati va ikki sababni o‘z ichiga oladi.',
        'The sample covers 400,000→1 million participants, the 4× and 1.3× age-group changes, and both causes.',
        'Образец включает рост с 400 тысяч до миллиона, изменения по возрасту и обе причины.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-96', 'writing', 'chart', 'marathon'],
    difficulty: 4,
    source: {
      pdfPage: 2,
      bookPage: 15,
      reference: '제96회 TOPIK II B-홀수형 쓰기 53번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-96-q54',
    groupCode: 'topik-ii-96-writing-54',
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
        '오늘날 직장 내에서 복장, 출퇴근 시간, 업무 방식 등에 대해 개인의 자율성을 원하는 사람들이 많다. 회사에서 이런 자율성이 보장될 때 생기는 장점이 있다. 그러나 개인의 자율성만을 중시하는 사람이 많아지면 여러 문제가 발생할 우려도 있다. 아래의 내용을 중심으로 ‘직장과 개인의 자율성’에 대한 자신의 생각을 쓰라.',
      ),
      bulletItems: [
        '직장에서 개인의 자율성이 보장될 때의 장점은 무엇인가?',
        '직장 내 사람들이 개인의 자율성만 중시할 때 생기는 문제는 무엇인가?',
        '이런 문제를 해결하기 위해서는 어떻게 해야 하는가?',
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
        '직장 내 자율성의 장점, 자율성만 중시할 때의 부작용, 협력과 조직 차원의 해결책을 다루세요.',
        'Ishdagi erkinlikning foydasi, faqat erkinlikka urg‘u berish oqibatlari va hamkorlik yechimlarini yozing.',
        'Discuss the benefits of autonomy, its problems when prioritized alone, and collaborative solutions.',
        'Раскройте пользу автономии, проблемы одностороннего подхода и пути сотрудничества.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '모범답안은 유연한 근무와 창의성·일과 삶의 균형, 이기주의와 소통 부족의 위험, 동료 배려와 조직적 소통 방안을 논술합니다.',
        'Namuna moslashuvchan ish, ijodkorlik va muvozanat, xudbinlik hamda muloqot tanqisligi, hamkorlik yechimlarini yoritadi.',
        'The sample covers flexibility and creativity, the risks of selfishness and poor communication, and cooperation at work.',
        'Образец рассматривает гибкость и творчество, риск эгоизма и недостатка общения, а также сотрудничество.',
      ),
      '사회의 변화로 개인의 자율성을 중시하는 사람들이 많아졌다. 이에 따라 기업에서도 유연근무제를 실시하는 등 직장 내 자율성을 높이고자 노력하고 있다. 직장에서 개인의 자율성이 보장되면 직장 내 문화가 유연해져 개인이 창의성을 발휘할 수 있는 근무 환경이 만들어진다. 또한 개인이 자신에게 적합한 근무 여건을 조성하여 일할 수 있어 일과 삶의 균형이 생긴다. 이것이 구성원의 업무 효율을 높이는 데 기여하여 조직의 목표를 달성하는 데에 도움이 된다.\n\n그러나 직장 내 사람들이 개인의 자율성만 중시하면 부작용이 발생할 수 있다. 먼저, 개인이 공동의 목표보다는 자신의 입장만을 생각하다 보면 자율성이 이기주의로 변질될 수 있다. 이러한 상황이 계속되면 책임자와 팀원 간 갈등, 세대 간 갈등이 발생할 수도 있다. 또한 업무의 자율성이 높아져 개별적으로 일할 수 있는 환경이 익숙해지면 소통이 부재하여 합의점을 찾기 어렵고 협력을 통한 성과를 내기 어려울 수 있다.\n\n이러한 문제를 해결하기 위해서는 직장 내 개개인이 자율성을 가지면서도 업무를 수행할 때는 최대한 동료와 협업하고 서로를 배려하는 마음을 가질 필요가 있다. 또한 조직은 구성원의 자율성을 높이면서 조직의 목표를 성취하는 데 도움이 되는 방안을 고민해야 한다. 나아가 효율적인 의사소통 방안을 마련하여 구성원 간 원활한 협력이 가능하도록 해야 할 것이다.',
      localized(
        '제공된 모범답안은 장점(유연성·창의성·효율), 문제(이기주의·갈등·소통 부재), 대안(동료 배려·조직 목표·의사소통)을 포함합니다.',
        'Namuna foyda, xudbinlik va muloqot muammolari, hamkorlik hamda tashkiliy yechimlarni qamrab oladi.',
        'The sample covers flexibility, creativity, efficiency, selfishness, conflict, and communication solutions.',
        'Образец включает гибкость, творчество, эффективность, эгоизм, конфликты и улучшение коммуникации.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-96', 'writing', 'essay', 'workplace-autonomy'],
    difficulty: 5,
    source: {
      pdfPage: 2,
      bookPage: 15,
      reference: '제96회 TOPIK II B-홀수형 쓰기 54번',
    },
    version: 1,
    isActive: true,
  },
];

export const TOPIK_II_96_WRITING_SEED: TopikExamSeed = {
  exam: TOPIK_II_96_WRITING_EXAM,
  groups: TOPIK_II_96_WRITING_GROUPS,
  questions: TOPIK_II_96_WRITING_QUESTIONS,
};
