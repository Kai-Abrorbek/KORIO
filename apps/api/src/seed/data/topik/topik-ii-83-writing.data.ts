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
    '문제 조건과 문맥을 살펴 답을 쓰고 내용·문법·분량을 확인하세요.',
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
    '각 빈칸의 앞뒤 문장과 자연스럽게 이어지도록 쓰세요.',
    'Har bir bo‘shliqni atrofidagi gaplarga mos to‘ldiring.',
    'Make each answer flow naturally with the surrounding sentences.',
    'Впишите фразы, согласующиеся с соседними предложениями.',
  ),
};

export const TOPIK_II_83_WRITING_EXAM: TopikSeedExam = {
  code: 'topik-ii-writing-83-2022',
  title: localized(
    '제83회 TOPIK II 쓰기',
    '83-TOPIK II yozish',
    '83rd TOPIK II Writing',
    '83-й TOPIK II: письмо',
  ),
  description: localized(
    '제83회 TOPIK II 쓰기 51~54번을 원문 시험지와 제공된 모범답안으로 구성했습니다.',
    '83-TOPIK II yozish bo‘limining 51–54-savollari asl test va taqdim etilgan javob namunalariga asoslangan.',
    'Questions 51–54 of the 83rd TOPIK II Writing test, based on the original paper and provided sample answers.',
    'Задания 51–54 письма 83-го TOPIK II по оригинальному тесту и предоставленным образцам ответов.',
  ),
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.WRITING,
  year: 2022,
  round: 83,
  durationMinutes: 50,
  totalQuestions: 4,
  totalPoints: 100,
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제83회 한국어능력시험 II B-홀수형 1교시 쓰기',
    edition: '제83회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 writing-test-paper-paper.pdf p.1–2 및 writing-answer-keys-answers.pdf p.1',
  },
  publishedAt: new Date('2022-07-10T00:00:00+09:00'),
  isActive: true,
};

export const TOPIK_II_83_WRITING_GROUPS: TopikSeedGroup[] = [
  {
    code: 'topik-ii-83-writing-51-52',
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
    code: 'topik-ii-83-writing-53',
    order: 2,
    startNumber: 53,
    endNumber: 53,
    instruction: textBlocks(
      '[53] 다음은 ‘인주시의 가구 수 변화’에 대한 자료이다. 이 내용을 200~300자의 글로 쓰시오. 단, 글의 제목은 쓰지 마시오. (30점)',
    ),
    pointsPerQuestion: 30,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-83-writing-54',
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

export const TOPIK_II_83_WRITING_QUESTIONS: TopikSeedQuestion[] = [
  {
    code: 'topik-ii-writing-83-q51',
    groupCode: 'topik-ii-83-writing-51-52',
    number: 51,
    order: 1,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks('다음 게시판 글의 ㉠과 ㉡에 알맞은 말을 각각 쓰시오.'),
    stimulus: {
      ...passage(
        '제목: 축제 관련 문의',
        '지난 주말 ‘인주시 별빛 축제’에 갔던 외국인입니다.',
        '지금까지 살면서 이렇게 많은 별을 [[blank:field-a|( ㉠ )]] 한 번도 없었습니다.',
        '이번 축제에서 별도 보고 공연도 볼 수 있어서 정말 좋았습니다.',
        '혹시 축제가 언제 또 있습니까?',
        '있다면 이런 멋진 경험을 다시 [[blank:field-b|( ㉡ )]].',
      ),
      title: '인주시청 자유게시판',
      visualVariant: 'official-writing-web-board',
    },
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠에는 지금까지 별을 본 경험이 없다는 뜻을, ㉡에는 축제를 다시 경험하고 싶다는 희망을 씁니다.',
        '㉠ ilgari bunday ko‘p yulduzni ko‘rmaganini, ㉡ bu tajribani yana takrorlash istagini bildiradi.',
        '㉠ expresses that the writer has never seen so many stars; ㉡ expresses a wish to experience the festival again.',
        'В ㉠ говорится об отсутствии подобного опыта, в ㉡ — о желании снова пережить его.',
      ),
      '㉠ 본 적이\n㉡ 하고 싶습니다',
      localized(
        '제공된 모범답안은 ㉠ ‘본 적이’, ㉡ ‘하고 싶습니다’입니다.',
        'Taqdim etilgan namuna: ㉠ «본 적이», ㉡ «하고 싶습니다».',
        'Provided sample: ㉠ “본 적이”; ㉡ “하고 싶습니다”.',
        'Предоставленный образец: ㉠ «본 적이»; ㉡ «하고 싶습니다».',
      ),
    ),
    presentation: writingPresentation,
    tags: [
      'topik-ii',
      'round-83',
      'writing',
      'sentence-completion',
      'web-board',
    ],
    difficulty: 2,
    source: {
      pdfPage: 1,
      bookPage: 14,
      reference: '제83회 TOPIK II B-홀수형 쓰기 51번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-83-q52',
    groupCode: 'topik-ii-83-writing-51-52',
    number: 52,
    order: 2,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks('다음 글의 ㉠과 ㉡에 알맞은 말을 각각 쓰시오.'),
    stimulus: passage(
      '식물은 다양한 방법으로 자신을 보호한다. 덩굴성 야자나무는 빈 줄기를 개미에게 집으로 제공한다. 이 나무에 다른 동물이 다가오면 줄기 속에 있던 개미들은 밖으로 나온다. 이때 개미들의 움직임으로 소리가 생긴다. 이 소리는 동물을 깜짝 [[blank:field-a|( ㉠ )]]. 결국 놀란 동물은 나뭇잎을 먹지 못하고 달아나 버린다. 식물학자들은 이것이 바로 이 나무가 자신을 보호하는 [[blank:field-b|( ㉡ )]].',
    ),
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠에는 개미 소리가 동물을 놀라게 한다는 사동 표현을, ㉡에는 이를 식물의 방어 방법이라고 설명하는 말을 씁니다.',
        '㉠ chumolilar tovushi hayvonni cho‘chitishini, ㉡ esa bu o‘simlikning himoya usuli ekanini bildiradi.',
        '㉠ uses a causative to say the sound startles animals; ㉡ identifies this as the plant’s defense method.',
        'В ㉠ звук пугает животных, в ㉡ это названо способом защиты растения.',
      ),
      '㉠ 놀라게 한다\n㉡ 방법이라고 한다',
      localized(
        '제공된 모범답안은 ㉠ ‘놀라게 한다’, ㉡ ‘방법이라고 한다’입니다.',
        'Taqdim etilgan namuna: ㉠ «놀라게 한다», ㉡ «방법이라고 한다».',
        'Provided sample: ㉠ “놀라게 한다”; ㉡ “방법이라고 한다”.',
        'Предоставленный образец: ㉠ «놀라게 한다»; ㉡ «방법이라고 한다».',
      ),
    ),
    presentation: writingPresentation,
    tags: [
      'topik-ii',
      'round-83',
      'writing',
      'sentence-completion',
      'plant-defense',
    ],
    difficulty: 3,
    source: {
      pdfPage: 1,
      bookPage: 14,
      reference: '제83회 TOPIK II B-홀수형 쓰기 52번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-83-q53',
    groupCode: 'topik-ii-83-writing-53',
    number: 53,
    order: 3,
    type: TopikQuestionType.WRITING_DATA_DESCRIPTION,
    responseType: TopikResponseType.WRITTEN,
    points: 30,
    prompt: textBlocks(
      '다음은 ‘인주시의 가구 수 변화’에 대한 자료이다. 이 내용을 200~300자의 글로 쓰시오. 단, 글의 제목은 쓰지 마시오.',
    ),
    stimulus: {
      kind: TopikStimulusKind.CHART,
      title: '인주시의 가구 수 변화',
      subtitle: '조사 기관: 인주시 사회연구소',
      blocks: [],
      bulletItems: [],
      infoItems: [
        { label: '1인 가구 2001년', value: '15%' },
        { label: '1인 가구 2021년', value: '30%' },
        { label: '2~3인 가구 2001년', value: '45%' },
        { label: '2~3인 가구 2021년', value: '50%' },
        { label: '4인 이상 가구 2001년', value: '40%' },
        { label: '4인 이상 가구 2021년', value: '20%' },
        { label: '원인', value: '20대 독립 증가, 노인 가구 증가' },
        { label: '전망', value: '2040년 1인 가구 43% 이상' },
      ],
      labeledSentences: [],
      givenText: [],
      chart: {
        title: '인주시의 가구 수',
        subtitle: '2001년·2021년 가구 수 비교',
        headers: ['가구 수'],
        rows: [
          { label: '2001년', values: ['15만 가구'], numericValues: [150000] },
          { label: '2021년', values: ['21만 가구'], numericValues: [210000] },
        ],
        unit: '가구',
        sourceNote:
          '원본은 전체 가구 수가 1.4배 증가한 것으로 표시한다. 가구원 수별 비율, 원인 및 전망은 infoItems에 보존했다.',
        variant: 'writing-household-count-change',
      },
      imageUrl: '',
      imageAlt:
        '인주시 가구 수 2001년 15만, 2021년 21만 가구로 1.4배 증가. 1인 가구 15→30%, 2~3인 45→50%, 4인 이상 40→20%. 원인은 20대 독립과 노인 가구 증가. 2040년 1인 가구 43% 이상 전망.',
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
        '전체 가구 수, 가구원 수별 비율의 변화, 두 증가 원인과 2040년 전망을 빠짐없이 쓰고 제목은 쓰지 마세요.',
        'Jami xonadonlar, tarkib bo‘yicha ulushlar, ikki sabab va 2040-yil prognozini yozing; sarlavha qo‘ymang.',
        'Describe total households, changes in household-size shares, both causes, and the 2040 forecast; do not add a title.',
        'Опишите число домохозяйств, доли по числу членов, обе причины и прогноз на 2040 год; заголовок не нужен.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '인주시의 가구 수는 2001년 15만 가구에서 2021년 21만 가구로 1.4배 증가했습니다. 1인 가구는 15%에서 30%로 늘고 2~3인 가구도 45%에서 50%로 늘었지만, 4인 이상 가구는 40%에서 20%로 줄었습니다. 20대의 독립과 노인 가구 증가가 원인이며 2040년에는 1인 가구가 43% 이상이 될 전망입니다.',
        'Inju shahrida xonadonlar 150 mingdan 210 mingga, ya’ni 1,4 baravar ko‘paygan. Bir kishilik xonadonlar 15% dan 30% ga, ikki-uch kishiliklar 45% dan 50% ga oshgan, to‘rt va undan ko‘plar 40% dan 20% ga kamaygan. Sabablar yoshlarning mustaqilligi va keksa xonadonlar ko‘payishi; 2040-yilda bir kishiliklar 43% dan oshishi kutilmoqda.',
        'Inju households increased 1.4× from 150,000 in 2001 to 210,000 in 2021. One-person households rose from 15% to 30%, two- or three-person households from 45% to 50%, while households of four or more fell from 40% to 20%. Young adults living independently and growth in elderly households explain the change; one-person households are projected to exceed 43% in 2040.',
        'Число домохозяйств Инчжу выросло в 1,4 раза — со 150 до 210 тысяч. Доля одиночных увеличилась с 15 до 30%, с 2–3 людьми — с 45 до 50%, а с 4 и более сократилась с 40 до 20%. Причины — самостоятельное проживание молодых людей и рост числа пожилых; к 2040 году одиночные составят более 43%.',
      ),
      '인주시 사회연구소에서는 인주시의 가구 수 변화를 조사하였다. 조사 결과 인주시의 가구 수는 2001년에 15만 가구에서 2021년에는 21만 가구로 1.4배 증가하였다. 이는 인원수별 가구의 비율이 1인 가구는 2001년에 15%에서 2021년에는 30%로 크게 증가하였고 2~3인 가구는 45%에서 50%로 증가한 반면, 4인 이상 가구는 40%에서 20%로 큰 폭으로 감소하였기 때문이다. 이러한 변화는 독립한 20대와 노인 가구 증가의 결과로 보인다. 2040년에는 1인 가구가 43% 이상이 될 전망이다.',
      localized(
        '제공된 모범답안은 15만·21만 가구와 1.4배 증가, 1인 15%·30%, 2~3인 45%·50%, 4인 이상 40%·20%, 두 원인 및 2040년 43% 이상 전망을 포함합니다.',
        'Taqdim etilgan javobda 150/210 ming va 1,4 baravar o‘sish, 15/30%, 45/50%, 40/20%, ikki sabab va 2040-yil 43%+ prognozi bor.',
        'The provided sample covers 150k/210k and 1.4× growth, 15/30%, 45/50%, 40/20%, both causes, and the 2040 forecast of at least 43%.',
        'Предоставленный образец включает 150/210 тыс. и рост в 1,4 раза, доли 15/30%, 45/50%, 40/20%, обе причины и прогноз 43% и более к 2040 году.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-83', 'writing', 'chart', 'households'],
    difficulty: 4,
    source: {
      pdfPage: 2,
      bookPage: 15,
      reference: '제83회 TOPIK II B-홀수형 쓰기 53번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-83-q54',
    groupCode: 'topik-ii-83-writing-54',
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
        '창의력은 새로운 것을 생각해 내는 능력이다. 현대 사회는 개인에게 창의력을 더 많이 요구하고 있다. 아래의 내용을 중심으로 ‘창의력의 필요성과 이를 기르기 위한 노력’에 대한 자신의 생각을 쓰라.',
      ),
      bulletItems: [
        '창의력이 필요한 이유는 무엇인가?',
        '창의력을 발휘했을 때 얻을 수 있는 성과는 무엇인가?',
        '창의력을 기르기 위해서 어떠한 노력을 할 수 있는가?',
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
        '창의력이 필요한 이유, 창의력으로 얻는 성과, 독서·경험·비판적 사고 등의 실천을 모두 다루고 문제를 그대로 옮기지 마세요.',
        'Ijodkorlik zarurati, uning natijalari va kitob o‘qish, tajriba hamda tanqidiy fikrlash kabi mashqlarni yoritib, savolni ko‘chirmang.',
        'Discuss why creativity is needed, what it can achieve, and practical ways to develop it; do not copy the prompt.',
        'Раскройте необходимость творчества, его результаты и способы развития; не переписывайте условие.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '제공된 모범답안은 창의력이 새로운 관점과 사회적 변화를 만들고 문제 해결에 도움이 된다고 설명합니다. 이를 통해 업무 성과·문화 콘텐츠·발명에 기여할 수 있고, 독서와 경험, 현상의 원인 탐색, 비판적 사고로 창의력을 기를 수 있습니다.',
        'Taqdim etilgan namunada ijodkorlik yangi nuqtayi nazar va muammo yechimini beradi; ish, san’at va ixtirolarga xizmat qiladi. O‘qish, tajriba va tanqidiy fikrlash uni rivojlantiradi.',
        'The provided sample links creativity to fresh perspectives, change, and problem solving; it can improve work, arts, and inventions. Reading, experience, curiosity, and critical thought nurture it.',
        'Предоставленный образец связывает творчество с новыми взглядами, переменами и решением проблем; оно помогает работе, искусству и изобретениям. Его развивают чтение, опыт и критическое мышление.',
      ),
      '변화와 발전을 끊임없이 요구하는 현대 사회에서 창의력은 꼭 필요하다. 먼저 창의력은 새로운 관점을 가져온다. 정보가 넘쳐나는 오늘날 새로운 관점이 있으면 차별화된 시각으로 정보를 통합하고 활용할 수 있다. 또한 우리 사회는 새로운 시도 없이는 발전하기 어려운데 창의력은 기존 사고에 머무르지 않고 변화를 시도할 수 있게 돕는다. 나아가 창의력은 기존의 사고만으로는 해결하기 어려운 문제를 해결하는 데에 중요한 역할을 한다.\n\n이와 같이 창의력은 새로운 사고를 할 수 있게 하므로 창의력을 발휘했을 때 우리는 다양한 성과를 얻을 수 있다. 창의력을 발휘하면 자신의 업무 분야에서 뛰어난 업무 성과를 보일 수 있다. 또한 예술과 문화의 영역에서 음악이나 영화 등 새로운 콘텐츠를 만들어 냄으로써 사람들에게 신선한 감동을 줄 수도 있다. 뿐만 아니라 획기적인 사고를 바탕으로 삶의 질을 높여 주는 새로운 상품이나 기술을 발명하여 사회에 기여할 수 있다.\n\n창의력을 기르기 위해서는 먼저 독서 및 다양한 경험을 통해 사고의 폭을 넓혀야 한다. 또한 눈에 보이는 현상에만 집중하는 것이 아니라 현상 뒤에 숨겨진 원인을 탐색하고 새로운 관점으로 문제에 접근하는 태도를 가져야 한다. 마지막으로 기존의 정답에만 머무르는 것이 아니라 비판적 사고를 바탕으로 새로운 해결 방안이 없는지를 모색하는 노력을 기울여야 한다.',
      localized(
        '제공된 모범답안은 필요성(새 관점·변화·문제 해결), 성과(업무·문화 콘텐츠·상품/기술), 노력(독서·다양한 경험·원인 탐색·비판적 사고)을 세 부분으로 논술합니다.',
        'Taqdim etilgan namunada zarurat, ish va madaniyatdagi natijalar, o‘qish, tajriba va tanqidiy fikrlash orqali rivojlantirish yoritiladi.',
        'The provided sample addresses necessity, practical and cultural achievements, and ways to cultivate creativity in three parts.',
        'Предоставленный образец раскрывает необходимость, результаты в работе и культуре, а также чтение, опыт и критическое мышление.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-83', 'writing', 'essay', 'creativity'],
    difficulty: 5,
    source: {
      pdfPage: 2,
      bookPage: 15,
      reference: '제83회 TOPIK II B-홀수형 쓰기 54번',
    },
    version: 1,
    isActive: true,
  },
];

export const TOPIK_II_83_WRITING_SEED: TopikExamSeed = {
  exam: TOPIK_II_83_WRITING_EXAM,
  groups: TOPIK_II_83_WRITING_GROUPS,
  questions: TOPIK_II_83_WRITING_QUESTIONS,
};
