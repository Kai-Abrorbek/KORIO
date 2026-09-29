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
          'Javobni tekshiring',
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

export const TOPIK_II_37_WRITING_EXAM: TopikSeedExam = {
  code: 'topik-ii-writing-37-2014',
  title: localized(
    '제37회 TOPIK II 쓰기',
    '37-TOPIK II yozish',
    '37th TOPIK II Writing',
    '37-й TOPIK II: письмо',
  ),
  description: localized(
    '제37회 한국어능력시험 TOPIK II 쓰기 51~54번을 원문 자료와 공식 모범답안으로 구성했습니다.',
    '37-TOPIK II yozish bo‘limining 51–54-savollari asl materiallar va rasmiy namunaviy javoblarga asoslangan.',
    'Questions 51–54 of the 37th TOPIK II Writing test, with original materials and official sample answers.',
    'Задания 51–54 письма 37-го TOPIK II с исходными материалами и официальными образцами ответов.',
  ),
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.WRITING,
  year: 2014,
  round: 37,
  durationMinutes: 50,
  totalQuestions: 4,
  totalPoints: 100,
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제37회 한국어능력시험 II B형 1교시 쓰기',
    edition: '제37회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 test-paper-paper.pdf p.16–17 및 answer-keys-answers.pdf p.2',
  },
  publishedAt: new Date('2014-11-23T00:00:00+09:00'),
  isActive: true,
};

export const TOPIK_II_37_WRITING_GROUPS: TopikSeedGroup[] = [
  {
    code: 'topik-ii-37-writing-51-52',
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
    code: 'topik-ii-37-writing-53',
    order: 2,
    startNumber: 53,
    endNumber: 53,
    instruction: textBlocks(
      '[53] 다음 그림을 보고 대중매체를 어떻게 나눌 수 있는지 200~300자로 쓰십시오. (30점)',
    ),
    pointsPerQuestion: 30,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-37-writing-54',
    order: 3,
    startNumber: 54,
    endNumber: 54,
    instruction: textBlocks(
      '[54] 다음을 주제로 하여 자신의 생각을 600~700자로 글을 쓰십시오. (50점)',
    ),
    pointsPerQuestion: 50,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
];

export const TOPIK_II_37_WRITING_QUESTIONS: TopikSeedQuestion[] = [
  {
    code: 'topik-ii-writing-37-q51',
    groupCode: 'topik-ii-37-writing-51-52',
    number: 51,
    order: 1,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks(
      '다음 모집 안내문의 ㉠과 ㉡에 들어갈 말을 각각 한 문장으로 쓰십시오.',
    ),
    stimulus: {
      ...passage(
        '태권도 동아리 ‘태극’입니다.',
        '이번에 [[blank:field-a|( ㉠ )]].',
        '신입 회원은 태권도에 관심 있는 학생이면 누구나 환영합니다.',
        '[[blank:field-b|( ㉡ )]]?',
        '그래도 걱정하지 마십시오. 처음부터 천천히 가르쳐 드립니다.',
        '다음 주 금요일까지 학생 회관 201호에서 신청하십시오.',
      ),
      title: '모집',
      visualVariant: 'official-writing-recruitment-notice',
    },
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠에는 신입 회원 모집을 알리고, ㉡에는 태권도를 처음 배우는지 물어야 뒤의 안심시키는 말과 연결됩니다.',
        '㉠ yangi a’zolar qabulini e’lon qiladi; ㉡ esa taekvondoni birinchi marta o‘rganayotganini so‘rab keyingi taskinga ulanadi.',
        '㉠ announces recruitment; ㉡ asks whether the reader is new to taekwondo so the reassurance follows naturally.',
        'В ㉠ объявите набор новых участников, а в ㉡ спросите, учится ли читатель тхэквондо впервые.',
      ),
      '㉠ 새로 신입 회원을 모집하려고 합니다\n㉡ 태권도를 처음 배우십니까',
      localized(
        '공식 정답표는 ㉠ 신입 회원 모집, ㉡ 태권도 초보 여부를 묻는 표현을 인정합니다.',
        'Rasmiy kalit ㉠ yangi a’zolar qabulini va ㉡ boshlovchi ekanini so‘rashni qabul qiladi.',
        'The official key accepts announcing new-member recruitment and asking whether the reader is a beginner.',
        'Официальный ключ принимает объявление набора и вопрос о том, новичок ли читатель.',
      ),
    ),
    presentation: writingPresentation,
    tags: [
      'topik-ii',
      'round-37',
      'writing',
      'sentence-completion',
      'recruitment',
    ],
    difficulty: 2,
    source: {
      pdfPage: 16,
      bookPage: 14,
      reference: '제37회 TOPIK II B형 쓰기 51번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-37-q52',
    groupCode: 'topik-ii-37-writing-51-52',
    number: 52,
    order: 2,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks(
      '다음 글의 ㉠과 ㉡에 들어갈 말을 각각 한 문장으로 쓰십시오.',
    ),
    stimulus: passage(
      '어려운 일이 생겼을 때 그 일을 대하는 우리의 태도는 크게 두 가지이다. [[blank:field-a|( ㉠ )]]. 다른 하나는 어려워서 불가능하다고 포기하는 것이다. 그런데 긍정적인 결과를 기대할수록 좋은 결과를 얻을 확률이 높다. 반대로 [[blank:field-b|( ㉡ )]]. 그러므로 우리는 시련이나 고난이 닥쳤을 때일수록 더욱 긍정적으로 생각할 필요가 있다.',
    ),
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠은 포기하는 태도와 반대되는 긍정적 태도이고, ㉡은 긍정적으로 기대할 때와 반대되는 결과입니다.',
        '㉠ taslim bo‘lishga qarama-qarshi ijobiy munosabat, ㉡ esa salbiy fikrlashning yomon natijasidir.',
        '㉠ contrasts perseverance with giving up; ㉡ contrasts positive expectations with the outcome of negative thinking.',
        '㉠ противопоставляет упорство отказу от цели, ㉡ — результат отрицательного мышления положительным ожиданиям.',
      ),
      '㉠ 하나는 아무리 어려워도 절대 포기하지 않는 것이다\n㉡ 부정적으로 생각하면 좋은 결과를 얻기 어렵다',
      localized(
        '공식 정답표는 ㉠ 포기하지 않거나 가능성을 믿는 태도, ㉡ 부정적으로 생각할수록 좋은 결과를 얻기 어렵다는 내용을 인정합니다.',
        'Rasmiy kalit ㉠ taslim bo‘lmaslik yoki imkoniyatga ishonishni, ㉡ salbiy fikr yaxshi natijani qiyinlashtirishini qabul qiladi.',
        'The official key accepts persistence or belief in a positive outcome for ㉠ and poorer results from negative thinking for ㉡.',
        'Официальный ключ принимает упорство или веру в успех для ㉠ и худший результат отрицательного мышления для ㉡.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-37', 'writing', 'sentence-completion'],
    difficulty: 3,
    source: {
      pdfPage: 16,
      bookPage: 14,
      reference: '제37회 TOPIK II B형 쓰기 52번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-37-q53',
    groupCode: 'topik-ii-37-writing-53',
    number: 53,
    order: 3,
    type: TopikQuestionType.WRITING_DATA_DESCRIPTION,
    responseType: TopikResponseType.WRITTEN,
    points: 30,
    prompt: textBlocks(
      '다음 그림을 보고 대중매체를 어떻게 나눌 수 있는지 200~300자로 쓰십시오.',
    ),
    stimulus: {
      kind: TopikStimulusKind.CHART,
      title: '대중매체',
      subtitle: '표현 양식에 따른 세 가지 분류',
      blocks: [],
      bulletItems: [],
      infoItems: [],
      labeledSentences: [],
      givenText: [],
      chart: {
        title: '대중매체',
        subtitle: '표현 양식에 따른 분류',
        headers: ['예', '특징'],
        rows: [
          {
            label: '인쇄매체',
            values: [
              '책, 잡지, 신문',
              '기록이 오래 보관됨 · 정보의 신뢰도가 높음',
            ],
            numericValues: [],
          },
          {
            label: '전파매체',
            values: [
              '텔레비전, 라디오',
              '정보를 생생하게 전달함 · 오락적 기능이 뛰어남',
            ],
            numericValues: [],
          },
          {
            label: '통신매체',
            values: ['인터넷', '쌍방향 소통이 가능함 · 다량의 정보를 생산함'],
            numericValues: [],
          },
        ],
        unit: '',
        sourceNote: '',
        variant: 'writing-mass-media-classification',
      },
      imageUrl: '',
      imageAlt:
        '대중매체를 인쇄매체, 전파매체, 통신매체로 분류한 그림. 인쇄매체: 책·잡지·신문, 오래 보관되는 기록과 높은 신뢰도. 전파매체: 텔레비전·라디오, 생생한 전달과 높은 오락성. 통신매체: 인터넷, 쌍방향 소통과 다량의 정보 생산.',
      visualVariant: 'official-writing-classification',
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
        '인쇄·전파·통신매체의 예와 각 매체의 두 가지 특징을 모두 설명하세요.',
        'Bosma, efir va aloqa vositalarining misollari hamda har birining ikki xususiyatini yozing.',
        'Describe the examples and both listed features of print, broadcast, and communication media.',
        'Опишите примеры и обе особенности печатных, вещательных и коммуникационных СМИ.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '대중매체를 표현 양식에 따라 인쇄매체·전파매체·통신매체로 나누고, 각 범주의 예와 두 특징을 연결하세요.',
        'Ommaviy axborot vositalarini ifoda usuliga ko‘ra bosma, efir va aloqa turlariga ajrating; misol va xususiyatlarini bog‘lang.',
        'Classify mass media by form into print, broadcast, and communication media, giving examples and both features for each.',
        'Разделите СМИ по форме на печатные, вещательные и коммуникационные, указав примеры и обе особенности каждого вида.',
      ),
      '대중매체란 많은 사람에게 대량으로 정보와 생각을 전달하는 수단을 말한다. 이러한 대중매체에는 다양한 양식이 있는데, 표현 양식을 기준으로 나누면 크게 인쇄매체, 전파매체, 통신매체이다. 인쇄매체는 책이나 잡지, 신문 등으로 기록이 오래 보관되고 정보의 신뢰도가 높다는 특징이 있다. 다음으로 전파매체가 있는데 텔레비전 라디오 등이 이에 속한다. 정보를 생생하게 전달하고 오락성이 뛰어나다는 특징을 가진다. 마지막으로 인터넷과 같은 통신매체를 들 수 있다. 쌍방향 소통이 가능하고 다량의 정보를 생산한다는 특징이 있다.',
      localized(
        '공식 모범답안은 세 갈래의 분류, 인쇄매체의 오래 보관되는 기록과 높은 신뢰도, 전파매체의 생생한 전달과 오락성, 통신매체의 쌍방향 소통과 다량 정보 생산을 모두 포함합니다.',
        'Rasmiy namuna uch tur va ularning barcha misollari hamda ikki xususiyatini qamrab oladi.',
        'The official sample covers all three categories, their examples, and each pair of characteristics.',
        'Официальный образец охватывает все три вида, их примеры и по две характеристики каждого.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-37', 'writing', 'classification', 'mass-media'],
    difficulty: 4,
    source: {
      pdfPage: 17,
      bookPage: 15,
      reference: '제37회 TOPIK II B형 쓰기 53번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-37-q54',
    groupCode: 'topik-ii-37-writing-54',
    number: 54,
    order: 4,
    type: TopikQuestionType.WRITING_ARGUMENTATIVE_ESSAY,
    responseType: TopikResponseType.WRITTEN,
    points: 50,
    prompt: textBlocks(
      '다음을 주제로 하여 자신의 생각을 600~700자로 글을 쓰십시오.',
    ),
    stimulus: passage(
      '현대 사회는 빠르게 세계화·전문화되고 있습니다. 이러한 현대 사회의 특성을 참고하여, ‘현대 사회에서 필요한 인재’에 대해 아래의 내용을 중심으로 자신의 생각을 쓰십시오.',
      '• 현대 사회에서 필요한 인재는 어떤 사람입니까?',
      '• 그러한 인재가 되기 위해서 어떤 노력이 필요합니까?',
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
        '세계화와 전문화의 특징을 반영해 필요한 인재상과 그 인재가 되기 위한 노력을 모두 논리적으로 쓰세요.',
        'Globallashuv va ixtisoslashuvni hisobga olib, zarur inson fazilatlari va ularga erishish harakatlarini yozing.',
        'Address both the qualities needed in a globalized, specialized society and the efforts to develop them.',
        'Раскройте и качества, нужные в глобальном и специализированном обществе, и усилия для их развития.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '공식 모범답안은 세계 시민으로서의 역량과 글로벌 마인드, 정보의 선택·활용, 지식 융복합과 자신만의 전문성을 강조합니다.',
        'Rasmiy namuna global dunyoqarash, dunyo fuqarosi malakasi, axborotni saralash va o‘ziga xos kasbiy salohiyatni ta’kidlaydi.',
        'The official answer emphasizes a global mindset, citizenship, selecting and using information, and distinctive expertise.',
        'Официальный образец подчёркивает глобальное мышление, компетенции гражданина мира, отбор информации и личную специализацию.',
      ),
      '현대 사회는 과학 기술과 교통의 발달로 많은 변화를 겪고 있다. 그 결과 세계는 점점 가까워져 소위 지구촌 시대라고 불리게 되었다. 이와 함께 지식 생산이 활발해지고 각 영역에서의 경쟁이 치열해지면서 전문화의 중요성이 강조되었다. 이러한 사회에서는 어떠한 인재가 요구될까?\n\n세계화가 되면서 우선 글로벌 마인드의 구축과 글로벌 인재로서의 역량을 키우는 것이 필요하다. 예전에는 국경이라는 테두리에서 국가 구성원으로서의 기본 자질을 갖추고 사회에서 요구하는 역량을 길러 사회 발전에 기여하는 인재가 요구되었다. 그러나 세계화 시대에는 기본적으로 세계 시민으로서의 역량과 자질을 갖추고 세계를 무대로 활동할 수 있는 인재가 필요하다.\n\n또한 과학 기술의 발달과 전문화가 심화되고 있는 상황에서 각자가 가진 능력을 최대한 발휘하여 경쟁력을 갖추려고 노력해야 한다. 과거에는 단순히 지식이나 기술을 습득하여 이를 활용하는 것만으로도 인재로서의 역할이 가능하였다. 그러나 대량의 정보 속에서 이를 선택하고 활용할 수 있는 지금은 지식의 융복합이나 자신만의 특성화 등을 통화여 전문성을 인정받음으로써 상대적인 경쟁력을 갖추어야 한다. 이렇게 내적으로는 글로벌 마인드를 기르고 외적으로는 전문적인 자기 능력을 갖춰 시대의 변화에 발맞추어 나가야한다.',
      localized(
        '공식 모범답안의 세계화·전문화와 필요한 역량 및 실천 방안을 모두 다루고 600~700자 분량을 확인하세요. 모범답안의 ‘통화여’는 정답표 원문 표기이며 자연스러운 표기는 ‘통하여’입니다.',
        'Rasmiy namunadagi ikki o‘zgarish, zarur ko‘nikmalar va amaliy harakatlarni qamrab olib 600–700 belgini tekshiring.',
        'Cover globalization, specialization, the needed capabilities, and ways to develop them; check 600–700 characters.',
        'Раскройте глобализацию, специализацию, нужные навыки и способы их развития; проверьте объём 600–700 знаков.',
      ),
    ),
    presentation: writingPresentation,
    tags: [
      'topik-ii',
      'round-37',
      'writing',
      'essay',
      'globalization',
      'specialization',
    ],
    difficulty: 5,
    source: {
      pdfPage: 17,
      bookPage: 15,
      reference: '제37회 TOPIK II B형 쓰기 54번',
    },
    version: 1,
    isActive: true,
  },
];

export const TOPIK_II_37_WRITING_SEED: TopikExamSeed = {
  exam: TOPIK_II_37_WRITING_EXAM,
  groups: TOPIK_II_37_WRITING_GROUPS,
  questions: TOPIK_II_37_WRITING_QUESTIONS,
};
