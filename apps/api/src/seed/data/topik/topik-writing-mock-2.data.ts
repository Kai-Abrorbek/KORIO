import {
  TopikChoiceLayout,
  TopikExamType,
  TopikI18nText,
  TopikPublishStatus,
  TopikQuestionType,
  TopikResponseType,
  TopikSection,
  TopikSolution,
  TopikStimulus,
  TopikStimulusKind,
  TopikVisualTemplate,
} from '../../../topik/schemas/topik-content.schema';
import { presentation, textBlocks } from './topik-seed.helpers';
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

const passage = (...paragraphs: string[]): TopikStimulus => ({
  kind: TopikStimulusKind.PASSAGE,
  title: '',
  subtitle: '',
  blocks: textBlocks(...paragraphs),
  bulletItems: [],
  infoItems: [],
  labeledSentences: [],
  givenText: [],
  imageUrl: '',
  imageAlt: '',
  visualVariant: 'official-writing-passage',
});

const infoCard = (...paragraphs: string[]): TopikStimulus => ({
  kind: TopikStimulusKind.INFO_CARD,
  title: 'Q&A',
  subtitle: '게시판 · 한국대학교 학생과',
  blocks: textBlocks(...paragraphs),
  bulletItems: [],
  infoItems: [],
  labeledSentences: [],
  givenText: [],
  imageUrl: '',
  imageAlt: '',
  visualVariant: 'official-writing-qa-board',
});

const solution = ({
  explanation,
  strategy,
  sampleAnswer,
  rubrics,
  hints,
}: {
  explanation: TopikI18nText;
  strategy: TopikI18nText;
  sampleAnswer: string;
  rubrics: TopikI18nText[];
  hints: Array<{ title: TopikI18nText; content: TopikI18nText }>;
}): TopikSolution => ({
  explanation,
  strategy,
  sampleAnswer,
  rubric: rubrics,
  keyClues: [
    {
      key: 'writing-task',
      order: 1,
      label: localized(
        '채점 핵심',
        'Baholash mezoni',
        'Scoring focus',
        'Критерий оценки',
      ),
      explanation: rubrics[0],
      targetSegmentKeys: [],
    },
  ],
  steps: [
    {
      key: 'step-plan',
      order: 1,
      title: localized(
        '요구 사항 정리',
        'Talablarni ajrating',
        'Identify the requirements',
        'Выделите требования',
      ),
      explanation: strategy,
      targetSegmentKeys: [],
    },
    {
      key: 'step-review',
      order: 2,
      title: localized(
        '문장 연결과 검토',
        'Bog‘lang va tekshiring',
        'Connect and review',
        'Свяжите и проверьте',
      ),
      explanation,
      targetSegmentKeys: [],
    },
  ],
  hints: hints.map((hint, index) => ({
    key: `hint-${index + 1}`,
    level: index + 1,
    title: hint.title,
    content: hint.content,
    examples: [],
    targetSegmentKeys: [],
  })),
  choiceNotes: [],
});

export const TOPIK_WRITING_MOCK_2_EXAM: TopikSeedExam = {
  code: 'topik-ii-writing-mock-2-2025',
  title: localized(
    'TOPIK II 쓰기 실전모의고사 제2회',
    'TOPIK II yozish sinov imtihoni 2',
    'TOPIK II Writing Mock Test 2',
    'TOPIK II: пробный тест по письму 2',
  ),
  description: localized(
    'TOPIK II 쓰기 51번부터 54번까지 실제 시험 형식으로 연습합니다.',
    'TOPIK II yozish bo‘limining 51–54-savollarini haqiqiy imtihon shaklida mashq qiling.',
    'Practice TOPIK II writing questions 51–54 in the official test format.',
    'Практика заданий 51–54 раздела письма TOPIK II в формате экзамена.',
  ),
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.WRITING,
  year: 2025,
  round: 2,
  durationMinutes: 50,
  totalQuestions: 4,
  totalPoints: 100,
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '실전모의고사 제1회 듣기, 쓰기',
    edition: '2025',
    publisher: '',
    reference: '사용자 제공 PDF의 쓰기 51~54번',
  },
  publishedAt: new Date('2025-01-01T00:00:00+09:00'),
  isActive: true,
};

export const TOPIK_WRITING_MOCK_2_GROUPS: TopikSeedGroup[] = [
  {
    code: 'writing-51-52',
    order: 1,
    startNumber: 51,
    endNumber: 52,
    instruction: textBlocks(
      '[51~52] 다음 글의 ㉠과 ㉡에 알맞은 말을 각각 쓰십시오. (각 10점)',
    ),
    pointsPerQuestion: 10,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
  {
    code: 'writing-53',
    order: 2,
    startNumber: 53,
    endNumber: 53,
    instruction: textBlocks(
      '[53] 자료를 설명하는 글을 200~300자로 쓰십시오. 단, 글의 제목은 쓰지 마십시오. (30점)',
    ),
    pointsPerQuestion: 30,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
  {
    code: 'writing-54',
    order: 3,
    startNumber: 54,
    endNumber: 54,
    instruction: textBlocks(
      '[54] 주어진 내용을 참고하여 600~700자로 글을 쓰십시오. 단, 문제를 그대로 옮겨 쓰지 마십시오. (50점)',
    ),
    pointsPerQuestion: 50,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
];

const questions: TopikSeedQuestion[] = [
  {
    code: 'topik-ii-writing-mock-2-2025-q51',
    groupCode: 'writing-51-52',
    number: 51,
    order: 1,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks('다음 글의 ㉠과 ㉡에 알맞은 말을 각각 쓰십시오.'),
    stimulus: infoCard(
      '봉사 활동 증명서를 신청하고 싶습니다.',
      '작년에 학교를 졸업한 졸업생인데 [[blank:field-a|( ㉠ )]]?',
      '친구에게 물어보니 신청하려면 제가 직접 학교에 [[blank:field-b|( ㉡ )]].',
      '방법을 알려 주시면 감사하겠습니다.',
    ),
    writingConfig: {
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
        '문의 목적과 앞뒤 문장의 연결을 확인하고 정중한 문장으로 완성하세요.',
        'Murojaat maqsadi va gaplar bog‘lanishini tekshirib, muloyim uslubda tugating.',
        'Check the purpose and sentence flow, then complete both blanks politely.',
        'Определите цель обращения и связь предложений, затем вежливо заполните пропуски.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution({
      explanation: localized(
        '㉠에는 졸업생도 증명서를 신청할 수 있는지 묻는 표현이, ㉡에는 직접 방문해야 한다고 들은 내용을 전하는 표현이 필요합니다.',
        '㉠ bitiruvchi ham hujjat olishi mumkinligini so‘raydi, ㉡ esa maktabga shaxsan borish kerakligini bildiradi.',
        '㉠ asks whether a graduate can apply, while ㉡ reports that an in-person visit may be required.',
        'В ㉠ спрашивают, может ли выпускник подать заявление, а в ㉡ сообщают о необходимости личного визита.',
      ),
      strategy: localized(
        '첫 문장의 신청 목적과 마지막 문장의 방법 문의를 기준으로 질문과 전달 표현을 나누어 쓰세요.',
        'Birinchi gapdagi ariza maqsadi va oxirgi gapdagi usul so‘roviga tayangan holda savol va xabar shaklini ajrating.',
        'Use the application purpose and the final request for instructions to form one question and one reported statement.',
        'Опирайтесь на цель заявления и просьбу объяснить порядок: сначала вопрос, затем передача услышанного.',
      ),
      sampleAnswer:
        '㉠ 봉사 활동 증명서를 신청할 수 있습니까\n㉡ 가야 한다고 들었습니다',
      rubrics: [
        localized(
          '㉠은 신청 가능 여부를 정중하게 묻고, ㉡은 학교에 직접 방문해야 한다는 내용을 자연스럽게 연결해야 합니다.',
          '㉠ imkoniyatni muloyim so‘rashi, ㉡ esa maktabga shaxsan borish zarurligini tabiiy bog‘lashi kerak.',
          '㉠ should politely ask about eligibility, and ㉡ should naturally state the need to visit the school.',
          'В ㉠ нужно вежливо спросить о возможности подачи, а в ㉡ естественно указать на личный визит.',
        ),
      ],
      hints: [
        {
          title: localized(
            '문의 대상 확인',
            'So‘rov mavzusini toping',
            'Identify the request',
            'Определите предмет запроса',
          ),
          content: localized(
            '졸업생도 봉사 활동 증명서를 신청할 수 있는지 묻고 있습니다.',
            'Bitiruvchi ham ko‘ngillilik guvohnomasini olishi mumkinligi so‘ralmoqda.',
            'The writer is asking whether a graduate may request the volunteer certificate.',
            'Автор спрашивает, может ли выпускник получить справку о волонтёрской деятельности.',
          ),
        },
        {
          title: localized(
            '간접 인용 연결',
            'Bilvosita nutqni bog‘lang',
            'Use reported speech',
            'Используйте косвенную речь',
          ),
          content: localized(
            '“친구에게 물어보니” 뒤에는 들은 내용을 전하는 “-다고 들었습니다”가 자연스럽습니다.',
            '“Do‘stimdan so‘radim” dan keyin eshitilgan ma’lumotni bildiruvchi shakl mos keladi.',
            'After “I asked a friend,” a reported-speech ending such as “I heard that…” fits naturally.',
            'После «я спросил друга» естественно использовать форму передачи услышанного.',
          ),
        },
      ],
    }),
    presentation: writingPresentation,
    tags: ['topik-ii', 'writing', 'sentence-completion', 'inquiry'],
    difficulty: 2,
    source: {
      pdfPage: 16,
      bookPage: 20,
      reference: '제1회 실전 모의고사 쓰기 51번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-mock-2-2025-q52',
    groupCode: 'writing-51-52',
    number: 52,
    order: 2,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks('다음 글의 ㉠과 ㉡에 알맞은 말을 각각 쓰십시오.'),
    stimulus: passage(
      '식물은 광합성 작용과 호흡 작용을 통해 오염 물질을 흡수하고, 사람의 몸에 좋은 물질을 내보낸다. 또한 식물은 곰팡이나 박테리아와 같은 세균도 제거한다.',
      '실내의 50%를 식물로 채울 경우 박테리아가 거의 발견되지 않는다는 연구 보고가 있다. 집 안에 식물을 두면 모든 실내 오염 문제를 한번에 [[blank:field-a|( ㉠ )]].',
      '그 밖에도 식물은 놓인 위치에 따라 주변 온도를 조절함으로써 더운 날씨에도 실내에서는 사람들이 시원하게 [[blank:field-b|( ㉡ )]].',
    ),
    writingConfig: {
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
        '식물이 주는 두 가지 효과가 결과 문장으로 자연스럽게 이어지도록 완성하세요.',
        'O‘simliklarning ikki foydasi natija gaplariga tabiiy bog‘lanadigan qilib tugating.',
        'Complete the sentences so the two benefits of plants lead naturally to their results.',
        'Завершите предложения так, чтобы два полезных эффекта растений естественно привели к результатам.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution({
      explanation: localized(
        '㉠은 식물이 오염 물질과 세균을 제거해 문제를 해결한다는 결과, ㉡은 온도 조절로 시원하게 지낼 수 있다는 결과가 필요합니다.',
        '㉠ o‘simliklar ifloslanish muammosini hal qilishini, ㉡ esa salqin yashash imkonini berishini ifodalaydi.',
        '㉠ states that plants solve indoor pollution, and ㉡ states that temperature control lets people stay cool.',
        'В ㉠ говорится, что растения решают проблему загрязнения, а в ㉡ — что благодаря регулированию температуры людям прохладно.',
      ),
      strategy: localized(
        '앞 문단의 세균 제거와 뒤 문장의 온도 조절이라는 원인에 맞는 결과 표현을 각각 쓰세요.',
        'Oldingi qismdagi bakteriyani yo‘qotish va keyingi gapdagi haroratni boshqarish sabablariga mos natijalarni yozing.',
        'Match one result to germ removal and the other to temperature control.',
        'Соотнесите первый результат с удалением бактерий, а второй — с регулированием температуры.',
      ),
      sampleAnswer: '㉠ 해결할 수 있다\n㉡ 지낼 수 있다',
      rubrics: [
        localized(
          '㉠은 실내 오염 문제 해결, ㉡은 시원하게 생활하거나 지낼 수 있다는 의미를 포함해야 합니다.',
          '㉠ ichki ifloslanish muammosini hal qilish, ㉡ esa salqin yashash ma’nosini o‘z ichiga olishi kerak.',
          '㉠ should mean solving indoor pollution, and ㉡ should mean being able to stay cool.',
          'В ㉠ должен быть смысл решения проблемы загрязнения, а в ㉡ — возможности находиться в прохладе.',
        ),
      ],
      hints: [
        {
          title: localized(
            '앞 문장 요약',
            'Oldingi gapni jamlang',
            'Summarize the prior sentence',
            'Обобщите предыдущее предложение',
          ),
          content: localized(
            '식물이 오염 물질과 세균을 없애므로 실내 오염 문제를 어떻게 할 수 있는지 쓰세요.',
            'O‘simliklar iflos moddalar va bakteriyalarni yo‘qotgani uchun muammo bilan nima qilish mumkinligini yozing.',
            'Because plants remove pollutants and germs, state what can be done about indoor pollution.',
            'Поскольку растения удаляют загрязнения и бактерии, укажите результат для проблемы воздуха в помещении.',
          ),
        },
        {
          title: localized(
            '온도 조절 결과',
            'Harorat natijasini toping',
            'Find the temperature result',
            'Найдите результат регулирования температуры',
          ),
          content: localized(
            '“시원하게” 뒤에는 사람이 어떤 상태로 생활할 수 있는지를 나타내는 동사가 필요합니다.',
            '“Salqin” dan keyin odam qanday yashashi mumkinligini bildiruvchi fe’l kerak.',
            'After “cool,” use a verb describing how people can stay or live indoors.',
            'После слова «прохладно» нужен глагол, описывающий пребывание людей в помещении.',
          ),
        },
      ],
    }),
    presentation: writingPresentation,
    tags: ['topik-ii', 'writing', 'sentence-completion', 'plants'],
    difficulty: 2,
    source: {
      pdfPage: 16,
      bookPage: 20,
      reference: '제1회 실전 모의고사 쓰기 52번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-mock-2-2025-q53',
    groupCode: 'writing-53',
    number: 53,
    order: 3,
    type: TopikQuestionType.WRITING_DATA_DESCRIPTION,
    responseType: TopikResponseType.WRITTEN,
    points: 30,
    prompt: textBlocks(
      '다음은 ‘1인 가구의 변화’에 대한 자료이다. 이 내용을 200~300자의 글로 쓰시오. 단, 글의 제목은 쓰지 마시오.',
    ),
    stimulus: {
      kind: TopikStimulusKind.CHART,
      title: '1인 가구의 변화',
      subtitle: '',
      blocks: [],
      bulletItems: [],
      infoItems: [],
      labeledSentences: [],
      givenText: [],
      chart: {
        title: '1인 가구 비율과 연령별 구성',
        subtitle: '2016년 대비 2019년 변화',
        headers: ['2016년', '2017년', '2018년', '2019년'],
        rows: [
          {
            label: '1인 가구 비율',
            values: ['27.3%', '28.6%', '29.3%', '30.2%'],
            numericValues: [27.3, 28.6, 29.3, 30.2],
          },
          {
            label: '20세 미만',
            values: ['1%', '-', '-', '2%'],
            numericValues: [1, 2],
          },
          {
            label: '20~30대',
            values: ['41%', '-', '-', '35%'],
            numericValues: [41, 35],
          },
          {
            label: '40~50대',
            values: ['27%', '-', '-', '33%'],
            numericValues: [27, 33],
          },
          {
            label: '60세 이상',
            values: ['31%', '-', '-', '30%'],
            numericValues: [31, 30],
          },
        ],
        unit: '%',
        sourceNote:
          '변화 원인: 결혼에 대한 사회의 인식 변화 · 경제적 이유 등으로 인한 가족 해체 현상의 증가',
        variant: 'writing-household-change',
      },
      imageUrl: '',
      imageAlt: 'TOPIK II 쓰기 53번 1인 가구 비율과 연령별 구성 변화 자료',
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
        '전체 비율의 증가, 연령대별 증감, 변화 원인을 순서대로 연결하세요.',
        'Umumiy ulush o‘sishi, yosh guruhlari o‘zgarishi va sabablarni ketma-ket bog‘lang.',
        'Connect the overall increase, age-group changes, and causes in that order.',
        'Последовательно опишите общий рост, изменения по возрастам и причины.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution({
      explanation: localized(
        '전체 1인 가구 비율이 꾸준히 증가한 흐름과 연령대별 구성 변화를 비교한 뒤 두 가지 원인을 설명해야 합니다.',
        'Yolg‘iz yashovchilar umumiy ulushining o‘sishi va yosh tarkibidagi o‘zgarishni taqqoslab, ikki sababni tushuntirish kerak.',
        'Describe the steady rise in one-person households, compare the age composition, and explain both causes.',
        'Нужно описать устойчивый рост домохозяйств из одного человека, сравнить возрастной состав и назвать обе причины.',
      ),
      strategy: localized(
        '전체 추세 → 20~30대와 40~50대의 반대 변화 → 나머지 연령대 → 원인 순서로 구성하세요.',
        'Umumiy yo‘nalish → 20–30 va 40–50 yosh guruhlarining qarama-qarshi o‘zgarishi → qolgan guruhlar → sabablar tartibida yozing.',
        'Organize the response as overall trend → opposite changes in the 20s–30s and 40s–50s → other ages → causes.',
        'Структура: общий тренд → противоположные изменения групп 20–30 и 40–50 лет → остальные группы → причины.',
      ),
      sampleAnswer:
        '1인 가구 비율은 2016년 27.3%에서 꾸준히 증가하여 2019년에는 30.2%에 이르렀다. 연령별 비율을 보면 20~30대는 2016년 41%에서 2019년 35%로 감소한 반면, 40~50대는 27%에서 33%로 증가했다. 60세 이상은 31%에서 30%로 비슷했고 20세 미만은 1%에서 2%로 늘었다. 이러한 변화는 결혼에 대한 사회적 인식이 달라지고 경제적 이유 등으로 가족 해체 현상이 증가했기 때문인 것으로 보인다.',
      rubrics: [
        localized(
          '2016~2019년 전체 비율 증가와 20~30대 감소, 40~50대 증가를 정확한 수치로 제시해야 합니다.',
          '2016–2019-yillardagi umumiy o‘sish, 20–30 yoshdagilar kamayishi va 40–50 yoshdagilar ko‘payishini aniq raqamlar bilan bering.',
          'Include the 2016–2019 overall rise, the decline among people in their 20s–30s, and the rise among those in their 40s–50s with accurate figures.',
          'Укажите точные данные общего роста в 2016–2019 годах, снижения группы 20–30 лет и роста группы 40–50 лет.',
        ),
        localized(
          '결혼 인식 변화와 경제적 이유에 따른 가족 해체 증가를 원인으로 연결해야 합니다.',
          'Nikohga qarash o‘zgarishi va iqtisodiy sabablar tufayli oilalar parchalanishini sabab sifatida bog‘lang.',
          'Connect the change to shifting views on marriage and family breakdown for economic reasons.',
          'Свяжите изменения с новым отношением к браку и ростом распада семей по экономическим причинам.',
        ),
      ],
      hints: [
        {
          title: localized(
            '전체 추세 먼저',
            'Avval umumiy yo‘nalish',
            'Start with the overall trend',
            'Начните с общего тренда',
          ),
          content: localized(
            '27.3%에서 30.2%로 매년 증가했다는 흐름을 첫 문장에 정리하세요.',
            'Birinchi gapda 27.3% dan 30.2% gacha har yili o‘sganini yozing.',
            'Open by noting the yearly rise from 27.3% to 30.2%.',
            'В первом предложении отметьте ежегодный рост с 27,3% до 30,2%.',
          ),
        },
        {
          title: localized(
            '반대 변화 비교',
            'Qarama-qarshi o‘zgarishni solishtiring',
            'Compare opposite changes',
            'Сравните противоположные изменения',
          ),
          content: localized(
            '20~30대는 감소했지만 40~50대는 같은 폭으로 증가한 점을 “반면”으로 연결하세요.',
            '20–30 yosh guruhi kamayib, 40–50 yosh guruhi oshganini “aksincha” bilan bog‘lang.',
            'Use “whereas” to contrast the decline in the 20s–30s with the rise in the 40s–50s.',
            'Свяжите снижение группы 20–30 лет и рост группы 40–50 лет словом «напротив».',
          ),
        },
      ],
    }),
    presentation: writingPresentation,
    tags: ['topik-ii', 'writing', 'data-description', 'household', 'chart'],
    difficulty: 4,
    source: {
      pdfPage: 17,
      bookPage: 21,
      reference: '제1회 실전 모의고사 쓰기 53번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-mock-2-2025-q54',
    groupCode: 'writing-54',
    number: 54,
    order: 4,
    type: TopikQuestionType.WRITING_ARGUMENTATIVE_ESSAY,
    responseType: TopikResponseType.WRITTEN,
    points: 50,
    prompt: textBlocks(
      '다음을 참고하여 600~700자로 글을 쓰시오. 단, 문제를 그대로 옮겨 쓰지 마시오.',
    ),
    stimulus: passage(
      '공감은 다른 사람의 상황이나 기분을 같이 느끼는 것이다. 바로 이 공감 능력이 대화에서 큰 힘을 발휘한다고 한다. 아래의 내용을 중심으로 자신의 생각을 쓰라.',
      '• 공감은 왜 중요한가?',
      '• 공감이 잘 이루어지지 않는 이유는 무엇인가?',
      '• 공감을 잘 하기 위한 방법은 무엇인가?',
    ),
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
        '공감의 중요성, 어려운 이유, 실천 방법을 서론·본론·결론 구조로 모두 다루세요.',
        'Hamdardlik ahamiyati, qiyinlashish sabablari va amaliy usullarni kirish–asosiy qism–xulosada yoriting.',
        'Cover the importance of empathy, barriers to it, and practical methods in an introduction–body–conclusion structure.',
        'Раскройте важность эмпатии, причины её отсутствия и практические способы в структуре введение–основная часть–вывод.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution({
      explanation: localized(
        '세 가지 질문에 모두 답하면서 공감이 신뢰와 갈등 해결에 미치는 효과, 공감을 방해하는 원인, 구체적인 대화 행동을 논리적으로 연결해야 합니다.',
        'Uch savolning barchasiga javob berib, hamdardlikning ishonch va nizolarni hal qilishdagi roli, to‘siqlar va aniq suhbat harakatlarini mantiqan bog‘lash kerak.',
        'Answer all three prompts and logically connect empathy’s role in trust and conflict resolution, its barriers, and concrete conversational behaviors.',
        'Ответьте на все три вопроса и логично свяжите роль эмпатии в доверии и разрешении конфликтов, препятствия и конкретные действия в разговоре.',
      ),
      strategy: localized(
        '중요성 제시 → 개인·환경적 방해 요인 분석 → 경청·감정 확인·관점 전환 방법 → 기대 효과 순서로 쓰세요.',
        'Ahamiyat → shaxsiy va muhit to‘siqlari → tinglash, hisni tasdiqlash va nuqtai nazarni almashtirish → kutilgan samara tartibida yozing.',
        'Write in this order: importance → personal and environmental barriers → listening, validating feelings, and perspective-taking → expected impact.',
        'Порядок: важность → личные и внешние препятствия → слушание, подтверждение чувств и смена перспективы → ожидаемый результат.',
      ),
      sampleAnswer:
        "대화를 할 때 상대의 마음을 이해하고 그 감정에 공감하는 것은 매우 중요하다. 공감은 상대에게 존중받고 있다는 안정감을 주며 서로 간의 신뢰를 높이기 때문이다. 또한 갈등이 생겼을 때 자신의 입장만 주장하지 않고 상대의 상황을 살피게 해 문제를 원만하게 해결하도록 돕는다. 그러나 실제 대화에서는 공감이 잘 이루어지지 않는 경우가 많다. 사람마다 성장 환경과 경험, 가치관이 달라 같은 일을 겪어도 느끼는 감정이 다르기 때문이다. 바쁜 생활 속에서 상대의 말을 끝까지 듣지 않거나 휴대 전화를 보며 대화하는 습관도 공감을 방해한다. 자신의 판단을 먼저 말하고 해결책을 서둘러 제시하는 태도 역시 상대가 이해받지 못한다고 느끼게 한다. 공감을 잘하려면 우선 상대의 말을 끊지 않고 표정과 말투까지 주의 깊게 살펴야 한다. 그리고 '그런 상황이라면 힘들었겠다'와 같이 상대의 감정을 자신의 말로 확인해 주는 것이 좋다. 바로 충고하기보다 상대가 원하는 것이 조언인지 단순히 이야기를 들어 주는 것인지 물어볼 필요도 있다. 마지막으로 자신과 다른 생각을 틀렸다고 판단하지 않고 그 사람의 처지에서 이유를 상상하는 연습을 해야 한다. 이러한 태도를 꾸준히 실천한다면 대화는 단순한 정보 교환을 넘어 서로를 연결하는 힘이 될 것이다.",
      rubrics: [
        localized(
          '공감의 중요성, 공감이 어려운 이유, 공감을 잘하는 방법이라는 세 가지 요구를 모두 구체적으로 다뤄야 합니다.',
          'Hamdardlikning ahamiyati, qiyinlashish sabablari va uni yaxshilash usullarining uchalasini ham aniq yoritish kerak.',
          'Address all three requirements concretely: why empathy matters, why it fails, and how to improve it.',
          'Конкретно раскройте все три аспекта: важность эмпатии, причины её отсутствия и способы развития.',
        ),
        localized(
          '600~700자를 지키고 문단 간 논리적 연결과 일관된 문체를 유지해야 합니다.',
          '600–700 belgi chegarasiga rioya qiling, paragraflarni mantiqan bog‘lang va bir xil uslubni saqlang.',
          'Stay within 600–700 characters and maintain logical paragraph flow and a consistent register.',
          'Соблюдайте объём 600–700 знаков, логические связи между абзацами и единый стиль.',
        ),
      ],
      hints: [
        {
          title: localized(
            '세 질문을 문단으로 배치',
            'Uch savolni paragraflarga ajrating',
            'Map the prompts to paragraphs',
            'Распределите вопросы по абзацам',
          ),
          content: localized(
            '중요성, 방해 요인, 실천 방법을 각각 한 문단의 중심 내용으로 정하세요.',
            'Ahamiyat, to‘siqlar va amaliy usullarni alohida paragraflarning markazi qiling.',
            'Make importance, barriers, and practical methods the focus of separate paragraphs.',
            'Сделайте важность, препятствия и практические способы центром отдельных абзацев.',
          ),
        },
        {
          title: localized(
            '행동 중심 해결책',
            'Harakatga asoslangan yechim',
            'Use action-based solutions',
            'Предлагайте действия',
          ),
          content: localized(
            '“노력해야 한다”로 끝내지 말고 경청, 감정 확인, 관점 전환처럼 실제로 할 수 있는 행동을 제시하세요.',
            'Faqat “harakat qilish kerak” demang; tinglash, hisni tasdiqlash va nuqtai nazarni almashtirish kabi amallarni bering.',
            'Go beyond “we should try” by naming actions such as listening, validating feelings, and perspective-taking.',
            'Не ограничивайтесь призывом стараться: предложите слушать, подтверждать чувства и менять точку зрения.',
          ),
        },
      ],
    }),
    presentation: writingPresentation,
    tags: ['topik-ii', 'writing', 'argumentative-essay', 'empathy'],
    difficulty: 5,
    source: {
      pdfPage: 17,
      bookPage: 21,
      reference: '제1회 실전 모의고사 쓰기 54번',
    },
    version: 1,
    isActive: true,
  },
];

export const TOPIK_WRITING_MOCK_2_SEED: TopikExamSeed = {
  exam: TOPIK_WRITING_MOCK_2_EXAM,
  groups: TOPIK_WRITING_MOCK_2_GROUPS,
  questions,
};
