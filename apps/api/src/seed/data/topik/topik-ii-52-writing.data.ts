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
    '문제의 조건과 앞뒤 문맥을 확인해 쓴 뒤 내용·문법·분량을 점검하세요.',
    'Savol shartlari va kontekstni tekshirib yozing, so‘ng mazmun, grammatika va hajmni ko‘rib chiqing.',
    'Check the task and context, then review the content, grammar, and length.',
    'Проверьте условия и контекст, затем содержание, грамматику и объём ответа.',
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
    '각 빈칸의 앞뒤 문장과 자연스럽게 이어지도록 쓰세요.',
    'Har bir bo‘shliqni atrofidagi gaplarga mos qilib to‘ldiring.',
    'Write each answer so it fits the sentences around the blank.',
    'Впишите фразы так, чтобы они согласовывались с соседними предложениями.',
  ),
};

export const TOPIK_II_52_WRITING_EXAM: TopikSeedExam = {
  code: 'topik-ii-writing-52-2017',
  title: localized(
    '제52회 TOPIK II 쓰기',
    '52-TOPIK II yozish',
    '52nd TOPIK II Writing',
    '52-й TOPIK II: письмо',
  ),
  description: localized(
    '제52회 한국어능력시험 TOPIK II 쓰기 51~54번을 원문 자료와 공식 모범답안으로 구성했습니다.',
    '52-TOPIK II yozish bo‘limining 51–54-savollari asl materiallar va rasmiy namunaviy javoblarga asoslangan.',
    'Questions 51–54 of the 52nd TOPIK II Writing test, with original materials and official sample answers.',
    'Задания 51–54 письма 52-го TOPIK II с исходными материалами и официальными образцами ответов.',
  ),
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.WRITING,
  year: 2017,
  round: 52,
  durationMinutes: 50,
  totalQuestions: 4,
  totalPoints: 100,
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제52회 한국어능력시험 II B-홀수형 1교시 쓰기',
    edition: '제52회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 test-paper-paper (1).pdf p.18–19 및 answer-keys-answers.pdf p.3',
  },
  publishedAt: new Date('2017-04-16T00:00:00+09:00'),
  isActive: true,
};

export const TOPIK_II_52_WRITING_GROUPS: TopikSeedGroup[] = [
  {
    code: 'topik-ii-52-writing-51-52',
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
    code: 'topik-ii-52-writing-53',
    order: 2,
    startNumber: 53,
    endNumber: 53,
    instruction: textBlocks(
      '[53] 다음을 참고하여 ‘아이를 꼭 낳아야 하는가’에 대한 글을 200~300자로 쓰시오. 단, 글의 제목을 쓰지 마시오. (30점)',
    ),
    pointsPerQuestion: 30,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-52-writing-54',
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

export const TOPIK_II_52_WRITING_QUESTIONS: TopikSeedQuestion[] = [
  {
    code: 'topik-ii-writing-52-q51',
    groupCode: 'topik-ii-52-writing-51-52',
    number: 51,
    order: 1,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks(
      '다음 문자 메시지의 ㉠과 ㉡에 들어갈 말을 각각 한 문장으로 쓰시오.',
    ),
    stimulus: {
      ...passage(
        '마이톡',
        '수미 씨,',
        '지난번에 책을 [[blank:field-a|( ㉠ )]] 고맙습니다.',
        '수미 씨의 책 덕분에 과제를 잘할 수 있었습니다.',
        '그런데 책을 언제 [[blank:field-b|( ㉡ )]]?',
        '시간을 말씀해 주시면 찾아가겠습니다.',
        '그럼 답장 기다리겠습니다.',
      ),
      title: '마이톡',
      visualVariant: 'official-writing-message',
    },
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠은 책을 빌려준 데 대한 감사이고, ㉡은 언제 책을 돌려줘도 되는지 예의 있게 묻는 표현입니다.',
        '㉠ kitobni bergani uchun minnatdorchilik, ㉡ esa uni qachon qaytarish mumkinligini muloyim so‘rashdir.',
        '㉠ thanks Sumi for lending the book; ㉡ politely asks when to return it.',
        'В ㉠ поблагодарите за одолженную книгу, в ㉡ вежливо спросите, когда её вернуть.',
      ),
      '㉠ 빌려줘서\n㉡ 돌려주면 됩니까',
      localized(
        '공식 정답표는 ㉠ ‘빌려줘서/주셔서’, ㉡ ‘돌려주면/돌려드리면 됩니까/되겠습니까’를 인정합니다. 내용이 맥락에 맞고 격식과 문장 표현이 적절해야 합니다.',
        'Rasmiy javobda ㉠ uchun kitobni bergani, ㉡ uchun uni qaytarish vaqtini muloyim so‘rashning variantlari qabul qilinadi.',
        'The official key accepts polite variants of “for lending/giving [the book]” and “may/could I return it?”. Context and register are assessed.',
        'Официальный ключ допускает вежливые варианты благодарности за книгу и вопроса о её возврате; важны контекст и стиль.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-52', 'writing', 'sentence-completion', 'message'],
    difficulty: 2,
    source: {
      pdfPage: 18,
      bookPage: 14,
      reference: '제52회 TOPIK II B-홀수형 쓰기 51번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-52-q52',
    groupCode: 'topik-ii-52-writing-51-52',
    number: 52,
    order: 2,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks(
      '다음 글의 ㉠과 ㉡에 들어갈 말을 각각 한 문장으로 쓰시오.',
    ),
    stimulus: passage(
      '우리는 기분이 좋으면 밝은 표정을 짓는다. 그리고 기분이 좋지 않으면 표정이 어두워진다. 왜냐하면 [[blank:field-a|( ㉠ )]]. 그런데 이와 반대로 표정이 우리의 감정에 영향을 주기도 한다. 그래서 기분이 안 좋을 때 밝은 표정을 지으면 기분도 따라서 좋아진다. 그러므로 우울할 때일수록 [[blank:field-b|( ㉡ )]] 것이 좋다.',
    ),
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠은 감정이 표정에 영향을 주는 이유를 설명하고, ㉡은 우울할 때 밝은 표정을 짓는 행동을 권합니다.',
        '㉠ his-tuyg‘u yuz ifodasiga ta’sir qilishini, ㉡ esa tushkunlikda ham yorqin yuz ifodasini qilishni bildiradi.',
        '㉠ explains that emotion affects facial expression; ㉡ recommends making a bright expression when feeling down.',
        'В ㉠ объясните влияние эмоций на выражение лица, в ㉡ посоветуйте сохранять светлое выражение лица.',
      ),
      '㉠ 감정이 표정에 영향을 주기 때문이다\n㉡ 밝은 표정을 짓는',
      localized(
        '공식 정답표는 ㉠ ‘감정이 표정에 영향을 주기 때문이다’, ㉡ ‘밝은 표정을 짓는/하는’ 또는 ‘표정을 밝게 짓는/하는’을 인정합니다. 앞뒤 문장과 문법적으로 이어져야 합니다.',
        'Rasmiy javob ㉠ da his-tuyg‘u yuz ifodasiga ta’sir qilishini, ㉡ da yuzni yorqin tutishni turli mos shakllarda qabul qiladi.',
        'The official key requires emotion affecting expression in ㉠ and accepts several grammatical forms of making a bright expression in ㉡.',
        'Официальный ответ: эмоции влияют на выражение лица; для ㉡ допускаются грамматически подходящие варианты «делать светлое выражение».',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-52', 'writing', 'sentence-completion'],
    difficulty: 3,
    source: {
      pdfPage: 18,
      bookPage: 14,
      reference: '제52회 TOPIK II B-홀수형 쓰기 52번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-52-q53',
    groupCode: 'topik-ii-52-writing-53',
    number: 53,
    order: 3,
    type: TopikQuestionType.WRITING_DATA_DESCRIPTION,
    responseType: TopikResponseType.WRITTEN,
    points: 30,
    prompt: textBlocks(
      '다음을 참고하여 ‘아이를 꼭 낳아야 하는가’에 대한 글을 200~300자로 쓰시오. 단, 글의 제목을 쓰지 마시오.',
    ),
    stimulus: {
      kind: TopikStimulusKind.CHART,
      title: '아이를 꼭 낳아야 하는가',
      subtitle: '20대 이상 성인 남녀 3,000명 조사',
      blocks: [],
      bulletItems: [],
      infoItems: [
        { label: '조사 기관', value: '결혼문화연구소' },
        { label: '조사 대상', value: '20대 이상 성인 남녀 3,000명' },
        {
          label: '‘아니다’ 응답 이유 1위',
          value: '남: 양육비 부담 / 여: 자유로운 생활',
        },
        {
          label: '‘아니다’ 응답 이유 2위',
          value: '남: 자유로운 생활 / 여: 직장 생활 유지',
        },
      ],
      labeledSentences: [],
      givenText: [],
      chart: {
        title: '아이를 꼭 낳아야 하는가',
        subtitle: '남녀별 응답 비율',
        headers: ['남', '여'],
        rows: [
          {
            label: '그렇다',
            values: ['80%', '67%'],
            numericValues: [80, 67],
          },
          {
            label: '아니다',
            values: ['20%', '33%'],
            numericValues: [20, 33],
          },
        ],
        unit: '%',
        sourceNote:
          '결혼문화연구소, 20대 이상 성인 남녀 3,000명. ‘아니다’ 응답 이유는 남녀별 1·2위만 제시됨.',
        variant: 'writing-childbirth-survey',
      },
      imageUrl: '',
      imageAlt:
        '아이를 꼭 낳아야 한다: 남 80%, 여 67%. 아니다: 남 20%, 여 33%. 아니다 응답 이유 1·2위는 남성 양육비 부담·자유로운 생활, 여성 자유로운 생활·직장 생활 유지.',
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
        '조사 대상, 남녀별 ‘그렇다/아니다’ 비율, ‘아니다’의 남녀별 이유 1·2위를 비교해 쓰고 제목은 쓰지 마세요.',
        'So‘rov ishtirokchilari, erkak va ayollarning javob foizlari hamda “yo‘q” javobining har jins bo‘yicha ikki sababini solishtiring; sarlavha qo‘ymang.',
        'Compare the survey population, yes/no rates by gender, and the top two reasons for “no” for each gender; do not add a title.',
        'Сравните участников опроса, доли ответов мужчин и женщин и две главные причины ответа «нет» для каждого пола; не пишите заголовок.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '결혼문화연구소가 20대 이상 성인 남녀 3,000명을 조사했습니다. 남성은 80%가 ‘그렇다’, 20%가 ‘아니다’였고 여성은 각각 67%, 33%였습니다. ‘아니다’ 이유의 남녀별 1·2위를 구분해 쓰세요.',
        'Nikoh madaniyati tadqiqot instituti 20 yoshdan katta 3 ming kishini so‘ragan. Erkaklarda “ha/yo‘q” 80/20%, ayollarda 67/33%; “yo‘q” sabablarining jins bo‘yicha ikki o‘rnini farqlang.',
        'A survey of 3,000 adults aged 20+ found yes/no rates of 80/20% for men and 67/33% for women. Distinguish the ranked reasons for “no” by gender.',
        'По опросу 3000 взрослых от 20 лет ответы «да/нет» составили 80/20% у мужчин и 67/33% у женщин; различайте причины отказа по полу и рангу.',
      ),
      '결혼문화연구소에서 20대 이상 성인 남녀 3,000명을 대상으로 ‘아이를 꼭 낳아야 하는가’에 대해 조사하였다. 그 결과 ‘그렇다’라고 응답한 남자는 80%, 여자는 67%였고, ‘아니다’라고 응답한 남자는 20%, 여자는 33%였다. 이들이 ‘아니다’라고 응답한 이유에 대해 남자는 양육비가 부담스러워서, 여자는 자유로운 생활을 원해서라고 응답한 경우가 가장 많았다. 이어 남자는 자유로운 생활을 원해서, 여자는 직장 생활을 유지하고 싶어서라고 응답하였다.',
      localized(
        '공식 채점 기준은 주제 관련 정보의 풍부함과 다양성, 제시 정보 활용, 논리적 구성, 적절하고 다양한 어휘·문법을 봅니다. 원본에는 이유의 순위만 있고 비율은 없습니다.',
        'Rasmiy mezonlar mazmun, berilgan ma’lumotlardan foydalanish, mantiqiy tuzilma hamda lug‘at va grammatikani baholaydi. Sabablar uchun foiz emas, faqat o‘rin berilgan.',
        'Official criteria cover relevant detail, use of the data, organization, and varied language. The reasons have ranks only, not percentages.',
        'Официальные критерии оценивают содержание, использование данных, логику и разнообразие языка. Для причин указаны только места, не проценты.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-52', 'writing', 'chart', 'childbirth-survey'],
    difficulty: 4,
    source: {
      pdfPage: 19,
      bookPage: 15,
      reference: '제52회 TOPIK II B-홀수형 쓰기 53번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-52-q54',
    groupCode: 'topik-ii-52-writing-54',
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
        '우리는 살면서 서로의 생각이 달라 갈등을 겪는 경우가 많다. 이러한 갈등은 의사소통이 부족해서 생기는 경우가 대부분이다. 의사소통은 서로의 관계를 유지하고 발전시키는 데 중요한 요인이 된다. ‘의사소통의 중요성과 방법’에 대해 아래의 내용을 중심으로 자신의 생각을 쓰라.',
      ),
      bulletItems: [
        '의사소통은 왜 중요한가?',
        '의사소통이 잘 이루어지지 않는 이유는 무엇인가?',
        '의사소통을 원활하게 하는 방법은 무엇인가?',
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
        '의사소통의 중요성, 소통이 어려운 이유, 원활하게 하는 구체적 방법을 모두 다루되 문제 문장을 그대로 옮기지 마세요.',
        'Muloqotning ahamiyati, qiyinchilik sabablari va uni yaxshilash yo‘llarini yoritib, savol matnini aynan ko‘chirmang.',
        'Address the importance of communication, why it fails, and practical ways to improve it, without copying the prompt.',
        'Раскройте важность общения, причины трудностей и способы его улучшения, не переписывая условие.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '공식 모범답안은 소통이 관계의 출발점이며, 경험과 사고방식의 차이가 오해를 낳을 수 있고, 배려하며 말하기·경청하기·상대 입장에서 보기로 소통을 개선할 수 있다고 설명합니다.',
        'Rasmiy namuna muloqot munosabatning asosi ekanini, tajriba va fikrlash farqlari tushunmovchilik tug‘dirishini va e’tiborli gapirish, tinglash, boshqa nuqtai nazarni qabul qilish yordam berishini ko‘rsatadi.',
        'The official sample explains that communication underpins relationships, differing experiences cause misunderstandings, and considerate speech, listening, and perspective-taking help.',
        'Официальный образец объясняет, что общение лежит в основе отношений, различия опыта вызывают недопонимание, а тактичность, слушание и взгляд со стороны другого помогают.',
      ),
      '어떤 일을 다른 사람들과 함께 계획하고 추진하기 위해서는 그 사람들과의 원활한 인간관계가 필요하다. 다만 인간관계를 원활하게 하는 데에는 많은 대화가 요구되며, 이 과정에서 의사소통 능력이 중요한 역할을 한다. 일반적으로 의사소통은 타인과의 소통의 시작이어서 의사소통이 제대로 이루어지지 않는 경우 오해가 생기고 불신이 생기며 경우에 따라서는 분쟁으로까지 이어질 수 있게 된다.\n\n그런데 이러한 의사소통이 항상 원활히 이루어지는 것은 아니다. 사람들은 서로 다른 생활환경과 경험을 가지고 있고, 이는 사고방식의 차이로 이어지게 된다. 이러한 차이들이 의사소통을 어렵게 함과 동시에 새로운 갈등을 야기하기도 한다.\n\n따라서 원활한 의사소통을 위한 적극적인 노력이 필요하다. 우선 상대를 배려하는 입장에서 말을 하는 자세가 필요하다. 나의 말이 상대를 불편하게 만드는 것은 아닌지 항상 생각하며 이야기하여야 한다. 다음으로 다른 사람의 말을 잘 듣는 자세가 필요하다. 마음을 열고 다른 사람의 이야기를 듣는 것은 상대를 이해하는 데 꼭 필요하기 때문이다. 마지막으로 서로의 입장에서 현상을 바라보는 자세가 필요하다. 이는 서로가 가질 수 있는 편견과 오해를 해결할 수 있는 역할을 하기 때문이다.',
      localized(
        '공식 채점 기준은 주제 관련 내용의 풍부함과 다양성, 논리적 구성, 적절하고 다양한 어휘·문법입니다. 중요성·장애 요인·개선 방법을 모두 다루고 문제를 그대로 옮기지 마세요.',
        'Rasmiy mezonlar mazmunning boyligi, mantiqiy tuzilishi hamda tilning to‘g‘ri va turli qo‘llanishini baholaydi. Uch jihatni ham yoritib, savolni ko‘chirmang.',
        'Official scoring considers relevant detail, logical organization, and appropriate, varied vocabulary and grammar. Cover all three aspects and do not copy the prompt.',
        'Официальные критерии оценивают полноту, логичность и разнообразие языка. Раскройте все три аспекта и не копируйте условие.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-52', 'writing', 'essay', 'communication'],
    difficulty: 5,
    source: {
      pdfPage: 19,
      bookPage: 15,
      reference: '제52회 TOPIK II B-홀수형 쓰기 54번',
    },
    version: 1,
    isActive: true,
  },
];

export const TOPIK_II_52_WRITING_SEED: TopikExamSeed = {
  exam: TOPIK_II_52_WRITING_EXAM,
  groups: TOPIK_II_52_WRITING_GROUPS,
  questions: TOPIK_II_52_WRITING_QUESTIONS,
};
