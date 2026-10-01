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
): TopikI18nText => ({
  ko,
  uz,
  en,
  ru,
});

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
    '문제의 조건과 문맥을 확인한 뒤 답을 쓰고 내용·문법·분량을 점검하세요.',
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

export const TOPIK_II_91_WRITING_EXAM: TopikSeedExam = {
  code: 'topik-ii-writing-91-2023',
  title: localized(
    '제91회 TOPIK II 쓰기',
    '91-TOPIK II yozish',
    '91st TOPIK II Writing',
    '91-й TOPIK II: письмо',
  ),
  description: localized(
    '제91회 TOPIK II 쓰기 51~54번을 제공된 시험지와 모범답안으로 구성했습니다.',
    '91-TOPIK II yozish bo‘limining 51–54-savollari taqdim etilgan test va javob namunalariga asoslangan.',
    'Questions 51–54 of the 91st TOPIK II Writing test, based on the supplied paper and sample answers.',
    'Задания 51–54 письма 91-го TOPIK II по предоставленному тесту и образцам ответов.',
  ),
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.WRITING,
  year: 2023,
  round: 91,
  durationMinutes: 50,
  totalQuestions: 4,
  totalPoints: 100,
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제91회 한국어능력시험 II B-홀수형 1교시 쓰기',
    edition: '제91회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 writing-test-paper-paper.pdf p.1–2 및 writing-answer-keys-answers.pdf p.1',
  },
  publishedAt: new Date('2023-11-12T00:00:00+09:00'),
  isActive: true,
};

export const TOPIK_II_91_WRITING_GROUPS: TopikSeedGroup[] = [
  {
    code: 'topik-ii-91-writing-51-52',
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
    code: 'topik-ii-91-writing-53',
    order: 2,
    startNumber: 53,
    endNumber: 53,
    instruction: textBlocks(
      '[53] 다음은 ‘편의점 매출액 변화’에 대한 자료이다. 이 내용을 200~300자의 글로 쓰시오. 단, 글의 제목은 쓰지 마시오. (30점)',
    ),
    pointsPerQuestion: 30,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-91-writing-54',
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

export const TOPIK_II_91_WRITING_QUESTIONS: TopikSeedQuestion[] = [
  {
    code: 'topik-ii-writing-91-q51',
    groupCode: 'topik-ii-91-writing-51-52',
    number: 51,
    order: 1,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks('다음 문자 대화의 ㉠과 ㉡에 알맞은 말을 각각 쓰시오.'),
    stimulus: {
      ...passage(
        '인주 피부과 병원입니다.',
        '11월 13일 오전 10시에 진료 예약이 되어 있습니다.',
        '안녕하세요. 제가 13일에 일이 생겨서 병원에 못 가게 되었습니다.',
        '그래서 예약을 14일 오전 10시로 [[blank:field-a|( ㉠ )]].',
        '만약에 이날 예약이 [[blank:field-b|( ㉡ )]] 저는 15일 오전도 괜찮습니다.',
        '예약 변경이 가능한지 확인해 주십시오.',
      ),
      title: '진료 예약 변경 문자',
      visualVariant: 'official-writing-message',
    },
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠에는 예약 날짜를 바꾸고 싶은 의사를, ㉡에는 14일 예약이 불가능할 경우를 씁니다.',
        '㉠ uchrashuv vaqtini o‘zgartirish istagini, ㉡ esa 14-kun imkonsiz bo‘lsa degan shartni bildiradi.',
        '㉠ requests a reservation change; ㉡ states the condition that the 14th may be unavailable.',
        '㉠ выражает желание изменить запись, ㉡ — условие, если 14-е недоступно.',
      ),
      '㉠ 변경하고 싶습니다 / 바꾸고 싶습니다\n㉡ 불가능하면 / 어려우면',
      localized(
        '제공된 모범답안은 ㉠ ‘변경하고 싶습니다/바꾸고 싶습니다’, ㉡ ‘불가능하면/어려우면’입니다.',
        'Taqdim etilgan namuna: ㉠ «변경하고 싶습니다/바꾸고 싶습니다», ㉡ «불가능하면/어려우면».',
        'Provided sample: ㉠ “변경하고 싶습니다/바꾸고 싶습니다”; ㉡ “불가능하면/어려우면”.',
        'Предоставленный образец: ㉠ «변경하고 싶습니다/바꾸고 싶습니다»; ㉡ «불가능하면/어려우면».',
      ),
    ),
    presentation: writingPresentation,
    tags: [
      'topik-ii',
      'round-91',
      'writing',
      'sentence-completion',
      'reservation',
    ],
    difficulty: 2,
    source: {
      pdfPage: 1,
      bookPage: 14,
      reference: '제91회 TOPIK II B-홀수형 쓰기 51번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-91-q52',
    groupCode: 'topik-ii-91-writing-51-52',
    number: 52,
    order: 2,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks('다음 글의 ㉠과 ㉡에 알맞은 말을 각각 쓰시오.'),
    stimulus: passage(
      '스트레스를 받았을 때 사탕이나 과자와 같이 단 음식을 먹으면 기분이 좋아진다. 단 음식으로 인해 뇌에서 기분을 좋게 만드는 호르몬이 나오기 때문이다. 그런데 전문가들은 사람들이 술이나 담배에 중독되는 것처럼 단맛에도 [[blank:field-a|( ㉠ )]]. 따라서 평소에 단 음식을 지나치게 많이 [[blank:field-b|( ㉡ )]] 주의할 필요가 있다.',
    ),
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '전문가의 견해를 인용해 단맛에도 중독될 수 있음을 말하고 과식하지 않도록 주의하라는 결론을 씁니다.',
        'Mutaxassislar shirin ta’mga ham qaramlik paydo bo‘lishini aytadi; ortiqcha yemaslik kerak.',
        'Report the experts’ view that sweetness can be addictive and conclude that one should avoid eating too much.',
        'Передайте мнение специалистов о зависимости от сладкого и совет не есть слишком много.',
      ),
      '㉠ 중독된다고 한다\n㉡ 먹지 않도록',
      localized(
        '제공된 모범답안은 ㉠ ‘중독된다고 한다’, ㉡ ‘먹지 않도록’입니다.',
        'Taqdim etilgan namuna: ㉠ «중독된다고 한다», ㉡ «먹지 않도록».',
        'Provided sample: ㉠ “중독된다고 한다”; ㉡ “먹지 않도록”.',
        'Предоставленный образец: ㉠ «중독된다고 한다»; ㉡ «먹지 않도록».',
      ),
    ),
    presentation: writingPresentation,
    tags: [
      'topik-ii',
      'round-91',
      'writing',
      'sentence-completion',
      'sweet-food',
    ],
    difficulty: 3,
    source: {
      pdfPage: 1,
      bookPage: 14,
      reference: '제91회 TOPIK II B-홀수형 쓰기 52번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-91-q53',
    groupCode: 'topik-ii-91-writing-53',
    number: 53,
    order: 3,
    type: TopikQuestionType.WRITING_DATA_DESCRIPTION,
    responseType: TopikResponseType.WRITTEN,
    points: 30,
    prompt: textBlocks(
      '다음은 ‘편의점 매출액 변화’에 대한 자료이다. 이 내용을 200~300자의 글로 쓰시오. 단, 글의 제목은 쓰지 마시오.',
    ),
    stimulus: {
      kind: TopikStimulusKind.CHART,
      title: '편의점 매출액 변화',
      subtitle: '조사 기관: 산업경제연구소',
      blocks: [],
      bulletItems: [],
      infoItems: [
        { label: '대형 마트 2015년', value: '24조 2천억 원' },
        { label: '대형 마트 2022년', value: '24조 3천억 원' },
        { label: '편의점 2015년', value: '17조 2천억 원' },
        { label: '편의점 2022년', value: '22조 3천억 원' },
        { label: '원인 1', value: '편의점 수 증가 → 고객 접근성 향상' },
        { label: '원인 2', value: '소포장 상품 수요 증가' },
        { label: '전망', value: '2023년 편의점 매출액 > 대형 마트' },
      ],
      labeledSentences: [],
      givenText: [],
      chart: {
        title: '편의점과 대형 마트 매출액',
        subtitle: '2015년·2022년 매출액 비교',
        headers: ['대형 마트', '편의점'],
        rows: [
          {
            label: '2015년',
            values: ['24조 2천억 원', '17조 2천억 원'],
            numericValues: [24.2, 17.2],
          },
          {
            label: '2022년',
            values: ['24조 3천억 원', '22조 3천억 원'],
            numericValues: [24.3, 22.3],
          },
        ],
        unit: '조 원',
        sourceNote:
          '원본 그래프의 대형 마트는 거의 변화가 없고 편의점은 크게 증가한다. 원인과 전망은 infoItems에 보존했다.',
        variant: 'writing-convenience-store-sales',
      },
      imageUrl: '',
      imageAlt:
        '2015년 대형 마트 24조 2천억 원, 편의점 17조 2천억 원. 2022년 대형 마트 24조 3천억 원, 편의점 22조 3천억 원. 편의점 수와 소포장 상품 수요 증가로 2023년에는 편의점 매출액이 대형 마트를 넘어설 전망.',
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
        '두 업종의 2015·2022년 매출액, 편의점 증가 원인 두 가지, 2023년 전망을 쓰고 제목은 쓰지 마세요.',
        '2015 va 2022-yil savdosi, o‘sishning ikki sababi va 2023-yil prognozini yozing; sarlavha qo‘ymang.',
        'Describe both years’ sales, two causes of convenience-store growth, and the 2023 forecast; do not add a title.',
        'Опишите выручку за оба года, две причины роста и прогноз на 2023 год; заголовок не нужен.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '대형 마트 매출은 거의 변하지 않았지만 편의점 매출은 크게 늘었습니다. 편의점 수와 소포장 상품 수요 증가가 원인이며 2023년에는 편의점이 대형 마트를 넘어설 것으로 전망됩니다.',
        'Yirik market savdosi deyarli o‘zgarmagan, qulay do‘konlar savdosi esa oshgan. Sabablar do‘konlar soni va kichik qadoqlarga talab o‘sishidir.',
        'Large-mart sales barely changed, while convenience-store sales rose. More stores and demand for small packages explain the rise; convenience stores are projected to overtake marts in 2023.',
        'Выручка гипермаркетов почти не изменилась, а магазинов шаговой доступности выросла из-за увеличения числа магазинов и спроса на небольшие упаковки.',
      ),
      '산업경제연구소의 조사에 따르면 대형 마트의 매출액은 2015년에 24조 2천억 원이었던 것이 2022년에 24조 3천억 원으로 큰 변화가 없었다. 그에 비해 편의점 매출액은 2015년에 17조 2천억 원이었던 것이 2022년에는 22조 3천억 원으로 크게 증가한 것을 알 수 있었다. 이렇게 편의점 매출액이 크게 증가한 원인은 첫째, 편의점 수가 증가하여 고객 접근성이 향상되고, 둘째, 소포장 상품의 수요가 증가했기 때문이다. 이런 추세로 볼 때 2023년에는 편의점의 매출액이 대형 마트를 넘어설 것으로 전망된다.',
      localized(
        '제공된 모범답안은 대형 마트 24조 2천억→24조 3천억 원, 편의점 17조 2천억→22조 3천억 원, 두 원인과 2023년 역전 전망을 포함합니다.',
        'Namuna yirik market 24,2→24,3 trillion von, qulay do‘kon 17,2→22,3 trillion von, ikki sabab va 2023-yil prognozini qamrab oladi.',
        'The sample covers 24.2→24.3 trillion won for marts, 17.2→22.3 for convenience stores, both causes, and the 2023 crossover forecast.',
        'Образец включает 24,2→24,3 трлн вон для гипермаркетов, 17,2→22,3 для небольших магазинов, две причины и прогноз на 2023 год.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-91', 'writing', 'chart', 'sales'],
    difficulty: 4,
    source: {
      pdfPage: 2,
      bookPage: 15,
      reference: '제91회 TOPIK II B-홀수형 쓰기 53번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-91-q54',
    groupCode: 'topik-ii-91-writing-54',
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
        '오늘날 우리는 정보 통신 기술의 발달로 누구나 쉽게 정보를 생산하고 대중에게 전달할 수 있다. 그런데 정보의 생산과 유통을 통해 개인과 집단이 이익을 얻을 수도 있게 되면서 사실과 다른 가짜 뉴스가 늘어나고 있다. 아래의 내용을 중심으로 ‘가짜 뉴스의 등장과 사회에 미치는 영향’에 대한 자신의 생각을 쓰라.',
      ),
      bulletItems: [
        '가짜 뉴스가 생겨나는 사회적 배경은 무엇인가?',
        '가짜 뉴스로 인해 어떤 문제가 생길 수 있는가?',
        '이런 문제들을 해결하기 위해서 어떤 방안이 필요한가?',
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
        '가짜 뉴스의 발생 배경, 개인·사회 피해, 제도·교육·기술적 대응을 모두 다루고 문제를 그대로 옮기지 마세요.',
        'Soxta xabarlarning sabablari, zarar va huquqiy, ta’limiy hamda texnik yechimlarni yoritib, savolni ko‘chirmang.',
        'Address the social background, personal and social harm, and legal, educational, and technical responses without copying the prompt.',
        'Раскройте причины, вред для людей и общества, а также правовые, образовательные и технические меры; не переписывайте условие.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '모범답안은 디지털 매체로 정보 생산·유통이 쉬워진 배경, 허위 정보가 개인과 사회에 주는 피해, 규제·교육·진위 판별 기술을 논술합니다.',
        'Namuna raqamli ommaviy axborot sababini, shaxsiy va ijtimoiy zararlarni, tartibga solish, ta’lim va tekshirish texnologiyalarini bayon qiladi.',
        'The sample discusses digital distribution, harm to individuals and society, and regulation, education, and verification technology.',
        'Образец рассматривает цифровое распространение, личный и общественный вред, регулирование, обучение и технологии проверки.',
      ),
      '정보 통신 기술의 발달과 소셜 미디어의 대중화로 인해 이 시대에는 누구나 쉽게 정보를 생산하고 불특정 다수와 공유할 수 있게 되었다. 이는 정보를 생산하고 유통하는 매체가 신문이나 방송과 같은 전통적 미디어에서 디지털 미디어 플랫폼으로 확장되면서 가능해진 것이다. 나아가 그 과정에서 경제적 가치를 창출하는 것 역시 가능해지면서 다양한 문제가 양산되고 있다. 사람들의 이목을 끌기 위한 가짜 뉴스의 등장도 그 문제 중 하나이다.\n\n가짜 뉴스는 정보 수용자로 하여금 잘못된 지식과 선입견, 편협한 사고를 형성하게 한다. 가짜 뉴스의 소재가 되는 개인이나 기업, 단체의 경우 이미지 타격과 경제적 피해는 물론이고 사회적으로 재기가 어려울 정도로 명예가 훼손되기도 한다. 또한 가짜 뉴스는 혐오를 확산하고 사회적 불안을 야기하며 사회 구성원들의 통합을 방해한다. 나아가 정치 및 외교적 문제로 심화될 가능성도 있기 때문에 심각한 사회 문제라 말할 수 있다.\n\n가짜 뉴스를 근절하기 위해서는 우선 제도적으로 가짜 뉴스의 생산과 유통이 불법적 행위임을 규정하고, 가짜 뉴스 단속을 위한 기구를 만들어 가짜 뉴스가 확산되지 않도록 규제를 강화해야 한다. 또한 각종 캠페인이나 교육을 통해 가짜 뉴스의 위험성과 위법성을 알리는 것 역시 필요하다. 나아가 정보의 진위를 판단하는 기술을 개발해 가짜 뉴스가 정보 수용자에게 전달되는 것을 방지하는 것도 좋은 방법일 것이다.',
      localized(
        '제공된 모범답안은 발생 배경(디지털 미디어·경제적 유인), 피해(오해·명예·통합·외교), 대응(규제·캠페인·교육·기술)을 포함합니다.',
        'Namuna raqamli tarqatish va iqtisodiy rag‘bat, noto‘g‘ri tushuncha va ijtimoiy zarar, tartib, targ‘ibot va texnologiyani qamrab oladi.',
        'The sample covers digital and economic causes, misinformation and social harm, and regulation, campaigns, education, and technology.',
        'Образец включает цифровые и экономические причины, дезинформацию и общественный вред, регулирование, кампании, обучение и технологии.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-91', 'writing', 'essay', 'fake-news'],
    difficulty: 5,
    source: {
      pdfPage: 2,
      bookPage: 15,
      reference: '제91회 TOPIK II B-홀수형 쓰기 54번',
    },
    version: 1,
    isActive: true,
  },
];

export const TOPIK_II_91_WRITING_SEED: TopikExamSeed = {
  exam: TOPIK_II_91_WRITING_EXAM,
  groups: TOPIK_II_91_WRITING_GROUPS,
  questions: TOPIK_II_91_WRITING_QUESTIONS,
};
