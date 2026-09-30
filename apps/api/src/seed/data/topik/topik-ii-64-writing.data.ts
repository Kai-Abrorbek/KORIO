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

export const TOPIK_II_64_WRITING_EXAM: TopikSeedExam = {
  code: 'topik-ii-writing-64-2019',
  title: localized(
    '제64회 TOPIK II 쓰기',
    '64-TOPIK II yozish',
    '64th TOPIK II Writing',
    '64-й TOPIK II: письмо',
  ),
  description: localized(
    '제64회 TOPIK II 쓰기 51~54번을 원문 시험지와 공식 모범답안으로 구성했습니다.',
    '64-TOPIK II yozish bo‘limining 51–54-savollari asl test va rasmiy javoblarga asoslangan.',
    'Questions 51–54 of the 64th TOPIK II Writing test, based on the original paper and official model answers.',
    'Задания 51–54 письма 64-го TOPIK II по оригинальному тесту и официальным образцам ответов.',
  ),
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.WRITING,
  year: 2019,
  round: 64,
  durationMinutes: 50,
  totalQuestions: 4,
  totalPoints: 100,
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제64회 한국어능력시험 II B-홀수형 1교시 쓰기',
    edition: '제64회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 writing-test-paper-paper.pdf p.1–2 및 writing-answer-keys-answers.pdf p.1',
  },
  publishedAt: new Date('2019-05-19T00:00:00+09:00'),
  isActive: true,
};

export const TOPIK_II_64_WRITING_GROUPS: TopikSeedGroup[] = [
  {
    code: 'topik-ii-64-writing-51-52',
    order: 1,
    startNumber: 51,
    endNumber: 52,
    instruction: textBlocks(
      '[51~52] 다음을 읽고 ㉠과 ㉡에 들어갈 말을 각각 한 문장으로 쓰시오. (각 10점)',
    ),
    pointsPerQuestion: 10,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-64-writing-53',
    order: 2,
    startNumber: 53,
    endNumber: 53,
    instruction: textBlocks(
      '[53] 다음을 참고하여 ‘온라인 쇼핑 시장의 변화’에 대한 글을 200~300자로 쓰시오. 단, 글의 제목을 쓰지 마시오. (30점)',
    ),
    pointsPerQuestion: 30,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-64-writing-54',
    order: 3,
    startNumber: 54,
    endNumber: 54,
    instruction: textBlocks(
      '[54] 다음을 주제로 하여 자신의 생각을 600~700자로 글을 쓰시오. 단, 문제를 그대로 옮겨 쓰지 마시오. (50점)',
    ),
    pointsPerQuestion: 50,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
];

export const TOPIK_II_64_WRITING_QUESTIONS: TopikSeedQuestion[] = [
  {
    code: 'topik-ii-writing-64-q51',
    groupCode: 'topik-ii-64-writing-51-52',
    number: 51,
    order: 1,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks(
      '다음 카드의 ㉠과 ㉡에 들어갈 말을 각각 한 문장으로 쓰시오.',
    ),
    stimulus: {
      ...passage(
        '수미 씨, 그동안 고마웠습니다.',
        '저는 다음 달이면 홍콩으로 일을 [[blank:field-a|( ㉠ )]].',
        '제가 원하는 회사에 취직을 해서 기쁘지만 수미 씨를 자주 못 볼 것 같아 아쉽습니다.',
        '선물을 준비했는데 선물이 수미 씨 마음에 [[blank:field-b|( ㉡ )]].',
      ),
      visualVariant: 'official-writing-card',
    },
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠은 홍콩에 가는 목적을 ‘일을 하러’로 나타내고, ㉡은 선물이 마음에 들기를 바라는 인사말로 마무리합니다.',
        '㉠ Gonkongga borish maqsadini, ㉡ sovg‘a yoqishiga umidni bildiradi.',
        '㉠ gives the purpose of going to Hong Kong; ㉡ expresses a wish that the gift is liked.',
        'В ㉠ укажите цель поездки в Гонконг, а в ㉡ выразите надежду, что подарок понравится.',
      ),
      '㉠ 하러 갑니다\n㉡ 들면 좋겠습니다',
      localized(
        '공식 모범답안은 ㉠ ‘하러 갑니다’, ㉡ ‘들면/들었으면 좋겠습니다’입니다.',
        'Rasmiy namunada ㉠ «하러 갑니다», ㉡ «들면/들었으면 좋겠습니다» qabul qilinadi.',
        'Official model: ㉠ “하러 갑니다”; ㉡ “들면/들었으면 좋겠습니다”.',
        'Официальный образец: ㉠ «하러 갑니다», ㉡ «들면/들었으면 좋겠습니다».',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-64', 'writing', 'sentence-completion', 'card'],
    difficulty: 2,
    source: {
      pdfPage: 1,
      bookPage: 14,
      reference: '제64회 TOPIK II B-홀수형 쓰기 51번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-64-q52',
    groupCode: 'topik-ii-64-writing-51-52',
    number: 52,
    order: 2,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks(
      '다음 글의 ㉠과 ㉡에 들어갈 말을 각각 한 문장으로 쓰시오.',
    ),
    stimulus: passage(
      '별은 지구에서 멀리 떨어져 있다. 그래서 별빛이 지구까지 오는 데 많은 시간이 걸린다. 지구와 가장 가까운 별의 빛도 지구까지 오는 데 4억 년이 걸린다. 만약 우리가 이 별을 본다면 우리는 이 별의 현재 모습이 아니라 4억 년 전의 [[blank:field-a|( ㉠ )]]. 이처럼 별빛은 오랜 시간이 지나야 지구에 도달한다. 그래서 어떤 별이 사라져도 우리는 그 사실을 바로 알지 못하고 아주 오랜 시간이 [[blank:field-b|( ㉡ )]].',
    ),
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠에는 과거의 모습을 본다는 결론을, ㉡에는 별이 사라진 사실을 오랜 시간이 지난 후에야 알 수 있다는 결론을 씁니다.',
        '㉠ da yulduzning o‘tmishdagi ko‘rinishi, ㉡ da yo‘qolganini faqat vaqt o‘tgach bilishimiz ifodalanadi.',
        '㉠ says we see a past appearance; ㉡ says we can learn of a star’s disappearance only much later.',
        'В ㉠ речь о прошлом облике звезды, в ㉡ — о том, что узнать об её исчезновении можно лишь спустя долгое время.',
      ),
      '㉠ 모습을 보는 것이다\n㉡ 지나야 알 수 있다',
      localized(
        '공식 모범답안은 ㉠ ‘모습을 보는 것이다’, ㉡ ‘지나야 알 수 있다/지난 후에야 알 수 있다’입니다.',
        'Rasmiy namunada ㉠ «모습을 보는 것이다», ㉡ «지나야 알 수 있다/지난 후에야 알 수 있다» berilgan.',
        'Official model: ㉠ “모습을 보는 것이다”; ㉡ “지나야 알 수 있다/지난 후에야 알 수 있다”.',
        'Официальный образец: ㉠ «모습을 보는 것이다»; ㉡ «지나야 알 수 있다/지난 후에야 알 수 있다».',
      ),
    ),
    presentation: writingPresentation,
    tags: [
      'topik-ii',
      'round-64',
      'writing',
      'sentence-completion',
      'starlight',
    ],
    difficulty: 3,
    source: {
      pdfPage: 1,
      bookPage: 14,
      reference: '제64회 TOPIK II B-홀수형 쓰기 52번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-64-q53',
    groupCode: 'topik-ii-64-writing-53',
    number: 53,
    order: 3,
    type: TopikQuestionType.WRITING_DATA_DESCRIPTION,
    responseType: TopikResponseType.WRITTEN,
    points: 30,
    prompt: textBlocks(
      '다음을 참고하여 ‘온라인 쇼핑 시장의 변화’에 대한 글을 200~300자로 쓰시오. 단, 글의 제목을 쓰지 마시오.',
    ),
    stimulus: {
      kind: TopikStimulusKind.CHART,
      title: '온라인 쇼핑 시장의 변화',
      subtitle: '전체 매출액 · 사용 기기에 따른 매출액 · 변화 원인',
      blocks: [],
      bulletItems: [],
      infoItems: [
        { label: '컴퓨터 2014년', value: '32조 원' },
        { label: '컴퓨터 2018년', value: '39조 원' },
        { label: '스마트폰 2014년', value: '14조 원' },
        { label: '스마트폰 2018년', value: '53조 원' },
        { label: '변화 원인 1', value: '온라인으로 다양한 상품 구매 가능' },
        { label: '변화 원인 2', value: '쇼핑 접근성: 스마트폰 > 컴퓨터' },
      ],
      labeledSentences: [],
      givenText: [],
      chart: {
        title: '전체 매출액',
        subtitle: '2014년·2018년 온라인 쇼핑 시장',
        headers: ['전체 매출액'],
        rows: [
          { label: '2014년', values: ['46조 원'], numericValues: [46] },
          { label: '2018년', values: ['92조 원'], numericValues: [92] },
        ],
        unit: '조 원',
        sourceNote:
          '사용 기기에 따른 매출액은 2014년 컴퓨터 32조·스마트폰 14조 원, 2018년 컴퓨터 39조·스마트폰 53조 원. 원본 두 번째 선 그래프의 수치를 infoItems에도 표기.',
        variant: 'writing-online-shopping-sales',
      },
      imageUrl: '',
      imageAlt:
        '전체 매출액 2014년 46조 원, 2018년 92조 원. 컴퓨터 32조에서 39조 원, 스마트폰 14조에서 53조 원. 다양한 온라인 상품 구매와 스마트폰의 높은 접근성이 변화 원인.',
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
        '전체 매출액과 기기별 매출액의 2014·2018년 수치, 두 가지 변화 원인을 쓰고 제목은 쓰지 마세요.',
        '2014 va 2018-yillardagi jami hamda qurilmalar bo‘yicha savdoni va ikki sababni yozing; sarlavha qo‘ymang.',
        'Include both years’ total and device-specific sales and the two reasons for change; do not add a title.',
        'Укажите общие продажи, продажи по устройствам за оба года и две причины изменений; заголовок не нужен.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '전체 매출액은 2014년 46조 원에서 2018년 92조 원으로 두 배가 되었습니다. 컴퓨터는 32조에서 39조 원으로 소폭 증가했고 스마트폰은 14조에서 53조 원으로 크게 증가했습니다. 다양한 상품의 온라인 구매와 스마트폰의 높은 접근성이 원인입니다.',
        'Jami savdo 46 dan 92 trillion vonga oshgan. Kompyuter savdosi 32 dan 39 ga, smartfon savdosi 14 dan 53 ga ko‘tarilgan; sabablar mahsulot xilma-xilligi va qulay foydalanishdir.',
        'Total sales doubled from 46 to 92 trillion won. Computer sales rose from 32 to 39, while smartphone sales jumped from 14 to 53; product variety and smartphone accessibility explain the change.',
        'Общие продажи выросли с 46 до 92 трлн вон; через компьютер — с 32 до 39, через смартфон — с 14 до 53. Причины — разнообразие товаров и доступность смартфона.',
      ),
      '온라인 쇼핑 시장의 변화에 대해 조사한 결과, 온라인 쇼핑 시장의 전체 매출액은 2014년에 46조 원, 2018년에 92조 원으로 4년 만에 크게 증가한 것으로 나타났다. 사용 기기에 따른 매출액을 보면 컴퓨터의 경우 2014년에 32조 원, 2018년에 39조 원으로 소폭 증가한 반면 스마트폰은 2014년에 14조 원, 2018년에 53조 원으로 매출액이 큰 폭으로 증가하였다. 이와 같이 온라인 쇼핑 시장이 변화한 원인은 온라인으로 다양한 상품 구매가 가능해졌고 스마트폰이 컴퓨터에 비해 쇼핑 접근성이 높아졌기 때문이다.',
      localized(
        '공식 모범답안은 전체 매출액 46조·92조 원, 컴퓨터 32조·39조 원, 스마트폰 14조·53조 원의 비교와 두 변화 원인을 모두 포함합니다.',
        'Rasmiy namunada jami 46/92, kompyuter 32/39, smartfon 14/53 trillion von va ikkala sabab bor.',
        'The official model includes totals 46/92, computer 32/39, smartphone 14/53 trillion won, and both causes.',
        'Образец включает общие продажи 46/92, компьютер 32/39, смартфон 14/53 трлн вон и обе причины.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-64', 'writing', 'chart', 'online-shopping'],
    difficulty: 4,
    source: {
      pdfPage: 2,
      bookPage: 15,
      reference: '제64회 TOPIK II B-홀수형 쓰기 53번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-64-q54',
    groupCode: 'topik-ii-64-writing-54',
    number: 54,
    order: 4,
    type: TopikQuestionType.WRITING_ARGUMENTATIVE_ESSAY,
    responseType: TopikResponseType.WRITTEN,
    points: 50,
    prompt: textBlocks(
      '다음을 주제로 하여 자신의 생각을 600~700자로 글을 쓰시오. 단, 문제를 그대로 옮겨 쓰지 마시오.',
    ),
    stimulus: {
      ...passage(
        '사람은 누구나 청소년기를 거쳐 어른이 된다. 아동에서 어른으로 넘어가는 이 시기에 많은 청소년들은 혼란과 방황을 겪으며 성장한다. 아래의 내용을 중심으로 ‘청소년기의 중요성’에 대한 자신의 생각을 쓰라.',
      ),
      bulletItems: [
        '청소년기가 중요한 이유는 무엇인가?',
        '청소년들은 이 시기에 주로 어떤 특징을 보이는가?',
        '청소년의 올바른 성장을 돕기 위해 어떤 노력이 필요한가?',
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
        '청소년기의 중요성, 이 시기의 특징, 올바른 성장을 돕는 가정·사회의 노력을 모두 다루고 문제를 그대로 옮기지 마세요.',
        'O‘smirlikning ahamiyati, xususiyatlari hamda oila va jamiyat yordamini yoritib, savolni ko‘chirmang.',
        'Discuss the importance and characteristics of adolescence and family/societal support; do not copy the prompt.',
        'Раскройте значение и особенности подросткового возраста и помощь семьи и общества; не переписывайте условие.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '공식 모범답안은 청소년기를 자아 정체성을 찾는 중요한 시기로 보고, 불안정한 감정과 반항·돌발 행동 등의 특징을 설명한 뒤 가정의 정서적 지원과 사회의 상담·보호 제도를 제안합니다.',
        'Rasmiy namunada o‘smirlik o‘zlikni anglash davri, ruhiy beqarorlik esa xususiyat sifatida ko‘riladi; oila va jamiyat yordami taklif etiladi.',
        'The official model treats adolescence as a time of identity formation, describes emotional instability and impulsive behavior, then proposes family and social support.',
        'В официальном образце подростковый возраст важен для становления личности; рассматриваются нестабильность и импульсивность, поддержка семьи и общества.',
      ),
      '청소년기는 자아 정체성을 찾아가는 과도기라는 점에서 사람의 생애 중 중요한 시기이다. 청소년기에 형성된 자아 정체성은 진로나 인간관계뿐 아니라 삶의 전 영역에 지속적인 영향을 미친다. 또한 이 시기는 청소년이 올바른 사회 구성원이 되기 위해 준비하는 시기이기도 하다.\n\n그러나 청소년은 아직 자아가 형성되지 않았기 때문에 심리적으로 불안정해지기 쉽다. 특히 가치관의 혼란, 타인의 평가, 또래 집단 내의 압박감 등은 청소년들이 불안정함을 느끼게 되는 주된 요인이다. 또한 청소년은 기존의 제도에 저항하거나 자신을 억압하는 어른에 대해 강한 반항심을 보이기도 한다. 뿐만 아니라 청소년은 아직 옳고 그름의 기준이 정립되지 않았기 때문에 주변 환경의 영향을 받기 쉽다. 이러한 특성으로 인하여 어떤 청소년은 일탈이나 돌발적인 행동을 하며 극단적인 경우 자신과 사회에 해를 끼치는 행동을 하기도 한다.\n\n청소년이 건강하게 청소년기를 보내고 미래의 인재로 성장하도록 돕기 위해서는 가정과 사회의 다각적인 노력이 필요하다. 가정에서는 청소년의 특성을 성장의 한 과정으로 이해하고 청소년이 건강한 자아 정체성을 형성할 수 있도록 정서적으로 지원할 필요가 있다. 사회에서는 청소년 심리 상담 센터나 방황하는 청소년을 위한 위탁 시설을 운영하는 등의 제도적 지원을 통해 청소년의 올바른 성장을 도울 수 있을 것이다.',
      localized(
        '공식 모범답안의 핵심은 자아 정체성 형성의 중요성, 심리적 불안정·반항 등 특징, 가정의 이해와 정서적 지원 및 사회의 상담·보호 제도입니다. 제시한 생각을 근거와 함께 논리적으로 전개하면 다른 관점도 가능합니다.',
        'Asosiy mezonlar: o‘zlikni shakllantirish, o‘smirlik xususiyatlari va oilaviy hamda ijtimoiy yordam; asosli boshqa fikrlar ham mumkin.',
        'Key ideas are identity formation, adolescent characteristics, and emotional support at home plus social services. Other well-supported views are possible.',
        'Ключевые идеи: становление личности, особенности подростков, поддержка семьи и социальные службы; допустимы и иные аргументированные позиции.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-64', 'writing', 'essay', 'adolescence'],
    difficulty: 5,
    source: {
      pdfPage: 2,
      bookPage: 15,
      reference: '제64회 TOPIK II B-홀수형 쓰기 54번',
    },
    version: 1,
    isActive: true,
  },
];

export const TOPIK_II_64_WRITING_SEED: TopikExamSeed = {
  exam: TOPIK_II_64_WRITING_EXAM,
  groups: TOPIK_II_64_WRITING_GROUPS,
  questions: TOPIK_II_64_WRITING_QUESTIONS,
};
