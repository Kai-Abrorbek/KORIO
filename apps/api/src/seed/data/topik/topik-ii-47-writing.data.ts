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
    '문제의 요구 사항과 문맥을 확인한 뒤 답안을 쓰고 내용·문법·분량을 검토하세요.',
    'Topshiriq va kontekstni tekshirib yozing, keyin mazmun, grammatika va hajmni ko‘rib chiqing.',
    'Check the task and context, then review your content, grammar, and length.',
    'Проверьте задание и контекст, затем содержание, грамматику и объём ответа.',
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
        label: localized(
          '문제 조건',
          'Topshiriq sharti',
          'Task requirement',
          'Условие задания',
        ),
        explanation: rubric,
        targetSegmentKeys: [],
      },
    ],
    steps: [
      {
        key: 'plan',
        order: 1,
        title: localized(
          '내용 계획',
          'Mazmun rejasi',
          'Plan the content',
          'План содержания',
        ),
        explanation: strategy,
        targetSegmentKeys: [],
      },
      {
        key: 'review',
        order: 2,
        title: localized(
          '답안 검토',
          'Javobni tekshirish',
          'Review the answer',
          'Проверьте ответ',
        ),
        explanation,
        targetSegmentKeys: [],
      },
    ],
    hints: [
      {
        key: 'hint-1',
        level: 1,
        title: localized(
          '문맥 확인',
          'Kontekst',
          'Read the context',
          'Прочитайте контекст',
        ),
        content: strategy,
        examples: [],
        targetSegmentKeys: [],
      },
      {
        key: 'hint-2',
        level: 2,
        title: localized(
          '핵심 내용',
          'Asosiy mazmun',
          'Key content',
          'Главное содержание',
        ),
        content: rubric,
        examples: [],
        targetSegmentKeys: [],
      },
      {
        key: 'hint-3',
        level: 3,
        title: localized(
          '표현 점검',
          'Ifodani tekshiring',
          'Check the wording',
          'Проверьте формулировку',
        ),
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
    '앞뒤 문장과 자연스럽게 연결되는 한 문장씩 쓰세요.',
    'Har bir bo‘shliqqa atrofdagi matnga mos bittadan gap yozing.',
    'Write one sentence for each blank that fits the surrounding text.',
    'Напишите по одному предложению в каждый пропуск с учётом контекста.',
  ),
};

export const TOPIK_II_47_WRITING_EXAM: TopikSeedExam = {
  code: 'topik-ii-writing-47-2016',
  title: localized(
    '제47회 TOPIK II 쓰기',
    '47-TOPIK II yozish',
    '47th TOPIK II Writing',
    '47-й TOPIK II: письмо',
  ),
  description: localized(
    '제47회 한국어능력시험 TOPIK II 쓰기 51~54번을 원문 자료와 공식 모범답안으로 구성했습니다.',
    '47-TOPIK II yozish bo‘limining 51–54-savollari asl materiallar va rasmiy namunaviy javoblarga asoslangan.',
    'Questions 51–54 of the 47th TOPIK II Writing test, with original materials and official sample answers.',
    'Задания 51–54 письма 47-го TOPIK II с исходными материалами и официальными образцами ответов.',
  ),
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.WRITING,
  year: 2016,
  round: 47,
  durationMinutes: 50,
  totalQuestions: 4,
  totalPoints: 100,
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제47회 한국어능력시험 II B형 1교시 쓰기',
    edition: '제47회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 test-paper-paper (1).pdf p.18–19 및 answer-keys-answers.pdf p.2–3',
  },
  publishedAt: new Date('2016-07-17T00:00:00+09:00'),
  isActive: true,
};

export const TOPIK_II_47_WRITING_GROUPS: TopikSeedGroup[] = [
  {
    code: 'topik-ii-47-writing-51-52',
    order: 1,
    startNumber: 51,
    endNumber: 52,
    instruction: textBlocks(
      '[51~52] 다음을 읽고 ㉠과 ㉡에 들어갈 말을 각각 한 문장으로 쓰십시오. (각 10점)',
    ),
    pointsPerQuestion: 10,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-47-writing-53',
    order: 2,
    startNumber: 53,
    endNumber: 53,
    instruction: textBlocks(
      '[53] 다음을 참고하여 ‘국내 외국인 유학생 현황’에 대한 글을 200~300자로 쓰십시오. 단, 글의 제목을 쓰지 마십시오. (30점)',
    ),
    pointsPerQuestion: 30,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-47-writing-54',
    order: 3,
    startNumber: 54,
    endNumber: 54,
    instruction: textBlocks(
      '[54] 다음을 주제로 하여 자신의 생각을 600~700자로 글을 쓰십시오. 단, 문제를 그대로 옮겨 쓰지 마십시오. (50점)',
    ),
    pointsPerQuestion: 50,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
];

export const TOPIK_II_47_WRITING_QUESTIONS: TopikSeedQuestion[] = [
  {
    code: 'topik-ii-writing-47-q51',
    groupCode: 'topik-ii-47-writing-51-52',
    number: 51,
    order: 1,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks(
      '다음 이메일의 ㉠과 ㉡에 들어갈 말을 각각 한 문장으로 쓰십시오.',
    ),
    stimulus: {
      ...passage(
        '제목: 선배님, 빅토르입니다.                                             2016. 7. 12.',
        '선배님, 안녕하십니까? 빅토르입니다.',
        '부탁드릴 일이 있어 메일을 씁니다.',
        '제가 인터넷으로 [[blank:field-a|( ㉠ )]].',
        '그런데 카메라가 이번 주 금요일에 배달된다고 합니다.',
        '제가 그날 고향에 가야 해서 카메라를 직접 받을 수 없을 것 같습니다.',
        '혹시 저 대신 [[blank:field-b|( ㉡ )]]?',
        '어려운 부탁을 드려서 죄송합니다.',
        '그럼 답장 기다리겠습니다.',
        '빅토르 드림',
      ),
      title: 'E-mail',
      visualVariant: 'official-writing-email',
    },
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠에는 인터넷으로 카메라를 주문·구입·구매했다는 말, ㉡에는 선배가 대신 카메라를 받아 줄 수 있는지 묻는 말을 쓰세요.',
        '㉠ internet orqali kamera buyurtma qilingani, ㉡ katta kursdosh kamerani o‘rniga qabul qila olishini so‘rash kerak.',
        '㉠ says the sender ordered or bought a camera online; ㉡ asks the senior to receive it in the sender’s place.',
        'В ㉠ сообщите о заказе камеры через интернет, в ㉡ попросите старшего товарища получить её вместо отправителя.',
      ),
      '㉠ 카메라를 주문했습니다\n㉡ 카메라를 받아 주실 수 있습니까',
      localized(
        '공식 정답표는 ㉠에 ‘카메라를 주문했습니다/카메라를 구입했습니다/카메라를 샀습니다’를 인정합니다. ㉡은 ‘카메라를 받아 주실 수 있습니까’입니다. 두 문장 모두 맥락·문장 단위의 표현·격식이 맞아야 합니다.',
        'Rasmiy kalit ㉠ uchun kamerani buyurtma qilish, sotib olish ifodalarini qabul qiladi; ㉡ da uni qabul qilib berishni muloyim so‘rash kerak.',
        'The official key accepts ordered, purchased, or bought a camera for ㉠; ㉡ asks politely whether the senior can receive it. Context, sentence form, and register matter.',
        'Официальный ключ принимает варианты «заказал/приобрёл/купил камеру» для ㉠; в ㉡ нужно вежливо попросить получить её. Учитываются контекст и форма предложения.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-47', 'writing', 'sentence-completion', 'email'],
    difficulty: 2,
    source: {
      pdfPage: 18,
      bookPage: 14,
      reference: '제47회 TOPIK II B형 쓰기 51번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-47-q52',
    groupCode: 'topik-ii-47-writing-51-52',
    number: 52,
    order: 2,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks(
      '다음 글의 ㉠과 ㉡에 들어갈 말을 각각 한 문장으로 쓰십시오.',
    ),
    stimulus: passage(
      '사람의 손에는 눈에 보이지 않는 세균이 많다. 그래서 병을 예방하기 위해서는 자주 [[blank:field-a|( ㉠ )]]. 그런데 전문가들은 손을 씻을 때 꼭 [[blank:field-b|( ㉡ )]]. 비누 없이 물로만 씻으면 손에 있는 세균을 제대로 없애기 어렵기 때문이다.',
    ),
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠에는 병을 예방하려면 손을 씻어야 한다는 결론, ㉡에는 전문가들이 비누 사용을 권한다는 말을 쓰세요.',
        '㉠ kasallikning oldini olish uchun qo‘l yuvish zarurligini, ㉡ mutaxassislar sovun ishlatishni maslahat berishini bildiradi.',
        '㉠ says hands should be washed to prevent illness; ㉡ reports experts’ advice to use soap.',
        'В ㉠ напишите, что для профилактики болезней надо мыть руки; в ㉡ — что специалисты советуют пользоваться мылом.',
      ),
      '㉠ 손을 씻어야 한다\n㉡ 비누를 사용하라고 한다',
      localized(
        '공식 정답표의 ㉠은 ‘손을 씻어야 한다’이고 ㉡은 ‘비누를 사용하라고 한다/비누로 씻으라고 한다’를 인정합니다. 내용이 맥락에 맞고 문장 단위의 표현이 정확해야 합니다.',
        'Rasmiy javob ㉠ da qo‘lni yuvish kerakligini, ㉡ da sovun ishlatish yoki sovun bilan yuvish tavsiyasini qabul qiladi.',
        'The official key requires washing hands in ㉠ and accepts advising soap use or washing with soap in ㉡. Sentence form and context must fit.',
        'Официальный ключ: в ㉠ необходимо мыть руки; в ㉡ допустим совет использовать мыло или мыть руки с мылом.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-47', 'writing', 'sentence-completion'],
    difficulty: 3,
    source: {
      pdfPage: 18,
      bookPage: 14,
      reference: '제47회 TOPIK II B형 쓰기 52번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-47-q53',
    groupCode: 'topik-ii-47-writing-53',
    number: 53,
    order: 3,
    type: TopikQuestionType.WRITING_DATA_DESCRIPTION,
    responseType: TopikResponseType.WRITTEN,
    points: 30,
    prompt: textBlocks(
      '다음을 참고하여 ‘국내 외국인 유학생 현황’에 대한 글을 200~300자로 쓰십시오. 단, 글의 제목을 쓰지 마십시오.',
    ),
    stimulus: {
      kind: TopikStimulusKind.CHART,
      title: '외국인 유학생 현황',
      subtitle: '유학생 수의 변화',
      blocks: [],
      bulletItems: [],
      infoItems: [
        {
          label: '증가 원인',
          value: '1. 한국·한국어에 대한 관심  2. 한국 대학의 유학생 유치 노력',
        },
        { label: '기대', value: '2023년 외국인 유학생 20만 명' },
      ],
      labeledSentences: [],
      givenText: [],
      chart: {
        title: '외국인 유학생 현황',
        subtitle: '유학생 수의 변화',
        headers: ['유학생 수'],
        rows: [
          { label: '2000년', values: ['4천 명'], numericValues: [4000] },
          { label: '2016년', values: ['10만 명'], numericValues: [100000] },
        ],
        unit: '명',
        sourceNote:
          '증가 원인: 한국·한국어에 대한 관심, 한국 대학의 유학생 유치 노력. 기대: 2023년 20만 명.',
        variant: 'writing-foreign-students-trend',
      },
      imageUrl: '',
      imageAlt:
        '국내 외국인 유학생은 2000년 4천 명에서 2016년 10만 명으로 증가했다. 증가 원인은 한국·한국어에 대한 관심과 한국 대학의 유학생 유치 노력이며, 2023년에는 20만 명이 될 것으로 기대한다.',
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
        '2000년 4천 명에서 2016년 10만 명으로 증가한 추세, 두 원인, 2023년 20만 명 전망을 모두 쓰고 제목은 쓰지 마세요.',
        '2000-yildagi 4 mingdan 2016-yildagi 100 minggacha o‘sish, ikki sabab va 2023-yil uchun 200 minglik kutilmani yozing; sarlavha qo‘ymang.',
        'Cover growth from 4,000 in 2000 to 100,000 in 2016, both causes, and the projection of 200,000 in 2023; do not add a title.',
        'Опишите рост с 4 тысяч в 2000 году до 100 тысяч в 2016 году, две причины и прогноз 200 тысяч к 2023 году; заголовок не пишите.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '외국인 유학생 수가 2000년 4천 명에서 2016년 10만 명으로 증가했고, 2023년 20만 명에 이를 것으로 기대된다는 정보를 원인 두 가지와 연결하세요.',
        'Chet ellik talabalar 2000-yilda 4 mingdan 2016-yilda 100 minggacha ko‘payganini, ikki sababni va 2023-yil 200 minglik kutilmani bog‘lang.',
        'Connect the rise from 4,000 (2000) to 100,000 (2016) with both stated causes and the projection of 200,000 (2023).',
        'Свяжите рост числа иностранных студентов с 4 тысяч (2000) до 100 тысяч (2016) с двумя причинами и прогнозом 200 тысяч (2023).',
      ),
      '최근 국내에서 유학하는 외국인 유학생이 급증했다. 2000년에 4천 명이던 유학생이 가파른 상승세를 보이다 잠시 주춤하더니 다시 증가세를 보이며 2016년에 이르러 10만 명이 되었다. 이러한 증가의 원인으로 우선 외국인들의 한국과 한국어에 대한 관심이 증가한 것을 들 수 있다. 한국 대학에서 유학생을 유치하려는 노력도 유학생의 증가에 큰 영향을 미친 것으로 보인다. 이러한 영향이 계속 이어진다면 2023년에는 외국인 유학생이 20만 명에 이를 것으로 기대된다.',
      localized(
        '공식 채점 기준은 주제 관련 정보의 풍부함과 다양성, 제시 정보 사용, 논리적 구성, 적절하고 다양한 어휘·문법을 봅니다. 원본 선 그래프는 잠시 주춤한 뒤 다시 상승하지만 중간 연도의 정확한 수치는 제시하지 않습니다.',
        'Rasmiy baholash ma’lumotning to‘liqligi, berilgan ma’lumotdan foydalanish, mantiqiy tuzilma hamda lug‘at va grammatikani ko‘radi. Chizmada oraliq yillarning aniq sonlari yo‘q.',
        'Official scoring considers relevant detail, use of the provided information, logical organization, and varied vocabulary and grammar. The source line briefly levels off, but gives no exact intermediate figures.',
        'Официальные критерии оценивают полноту, использование данных, логику и разнообразие языка. На исходном графике нет точных промежуточных значений.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-47', 'writing', 'chart', 'foreign-students'],
    difficulty: 4,
    source: {
      pdfPage: 19,
      bookPage: 15,
      reference: '제47회 TOPIK II B형 쓰기 53번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-47-q54',
    groupCode: 'topik-ii-47-writing-54',
    number: 54,
    order: 4,
    type: TopikQuestionType.WRITING_ARGUMENTATIVE_ESSAY,
    responseType: TopikResponseType.WRITTEN,
    points: 50,
    prompt: textBlocks(
      '다음을 주제로 하여 자신의 생각을 600~700자로 글을 쓰십시오. 단, 문제를 그대로 옮겨 쓰지 마십시오.',
    ),
    stimulus: {
      ...passage(
        '‘칭찬은 고래도 춤추게 한다’는 말처럼 칭찬에는 강한 힘이 있습니다. 그러나 칭찬이 항상 긍정적인 영향을 주는 것은 아닙니다. 아래의 내용을 중심으로 칭찬에 대한 자신의 생각을 쓰십시오.',
      ),
      bulletItems: [
        '칭찬이 미치는 긍정적인 영향은 무엇입니까?',
        '부정적인 영향은 무엇입니까?',
        '효과적인 칭찬의 방법은 무엇입니까?',
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
        '칭찬의 긍정적 영향, 부정적 영향, 결과보다 과정과 노력을 칭찬하는 방법을 모두 설명하세요.',
        'Maqtovning ijobiy va salbiy ta’sirini hamda natijadan ko‘ra jarayon va mehnatni qadrlash usulini tushuntiring.',
        'Explain positive and negative effects of praise and how to praise the process and effort rather than only the result.',
        'Объясните положительные и отрицательные последствия похвалы и то, как хвалить усилия и процесс, а не только результат.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '공식 모범답안은 칭찬이 동기와 자신감을 높이지만 부담감과 결과 집착을 낳을 수 있으므로 결과보다 과정과 노력을 칭찬해야 한다고 논증합니다.',
        'Rasmiy namuna maqtov ishonch va rag‘bat berishi, biroq bosim va natijaga berilib ketishga olib kelishi mumkinligini, shu sabab jarayon va mehnatni maqtash kerakligini asoslaydi.',
        'The official sample says praise motivates and builds confidence but can create pressure and fixation on results; effective praise recognizes process and effort.',
        'Официальный образец показывает, что похвала мотивирует и придаёт уверенность, но может вызвать давление и погоню за результатом; хвалить следует процесс и усилия.',
      ),
      '우리는 칭찬을 들으면 일을 더 잘하고 싶어질 뿐만 아니라 좀 더 나은 사람이 되고 싶은 마음이 든다. 그리고 자신감이 생겨 공부나 일의 성과에도 긍정적인 영향을 미친다. 그래서 자신이 가진 능력 이상을 발휘하고 싶어지는 도전 정신이 생기기도 하는 것이다. 한 마디로 말해 칭찬은 사람을 한 단계 더 발전시키는 힘을 가지고 있다.\n\n그런데 이러한 칭찬이 독이 되는 경우가 있다. 바로 칭찬이 상대에게 기쁨을 주는 것이 아니라 부담을 안겨 주는 경우이다. 칭찬을 들으면 그 기대에 부응해야 한다는 압박감 때문에 자신의 실력을 제대로 발휘하지 못하게 되는 일이 생기게 된다. 칭찬의 또 다른 부정적인 면은 칭찬 받고 싶다는 생각에 결과만을 중시하게 되는 점이다. 일반적으로 칭찬이 일의 과정보다 결과에 중점을 두고 행해지는 경우가 많기 때문이다.\n\n그래서 우리가 상대를 칭찬할 때에는 그 사람이 해낸 일의 결과가 아닌, 그 일을 해내기까지의 과정과 노력에 초점을 맞추는 것이 중요하다. 그래야 칭찬을 듣는 사람도 일 그 자체를 즐길 수 있다. 또한 칭찬을 듣고 잘 해내야 한다는 부담에서도 벗어날 수 있을 것이다. 우리는 보통 칭찬을 많이 해 주는 것이 중요하다고 생각하는데 칭찬은 그 방법 역시 중요하다는 것을 잊지 말아야 할 것이다.',
      localized(
        '공식 채점 기준은 주제 관련 내용의 풍부함과 다양성, 논리적 구성, 적절하고 다양한 어휘·문법입니다. 긍정·부정 영향과 효과적인 방법 세 항목을 모두 다루고 문제 문장을 그대로 복사하지 마세요.',
        'Rasmiy mezonlar mavzuga oid mazmun, mantiqiy tuzilma va til xilma-xilligini baholaydi. Uch jihatni ham qamrab oling va savol matnini ko‘chirmang.',
        'Official criteria consider relevant detail, logical organization, and varied vocabulary and grammar. Cover all three aspects and do not copy the prompt.',
        'Официальные критерии оценивают полноту, логику и разнообразие языка. Раскройте все три аспекта и не переписывайте условие.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-47', 'writing', 'essay', 'praise'],
    difficulty: 5,
    source: {
      pdfPage: 19,
      bookPage: 15,
      reference: '제47회 TOPIK II B형 쓰기 54번',
    },
    version: 1,
    isActive: true,
  },
];

export const TOPIK_II_47_WRITING_SEED: TopikExamSeed = {
  exam: TOPIK_II_47_WRITING_EXAM,
  groups: TOPIK_II_47_WRITING_GROUPS,
  questions: TOPIK_II_47_WRITING_QUESTIONS,
};
