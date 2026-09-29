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
    '문제의 요구 사항과 앞뒤 문맥을 확인한 뒤 답안을 쓰고, 내용·문법·분량을 다시 검토하세요.',
    'Topshiriq va kontekstni tekshirib yozing, keyin mazmun, grammatika va hajmni qayta ko‘rib chiqing.',
    'Read the task and context, then review content, grammar, and length.',
    'Прочитайте задание и контекст, затем проверьте содержание, грамматику и объём.',
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
          'Проверка ответа',
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
    'Write one sentence in each blank that fits the surrounding text.',
    'Напишите по одному предложению в каждый пропуск с учётом контекста.',
  ),
};

export const TOPIK_II_36_WRITING_EXAM: TopikSeedExam = {
  code: 'topik-ii-writing-36-2014',
  title: localized(
    '제36회 TOPIK II 쓰기',
    '36-TOPIK II yozish',
    '36th TOPIK II Writing',
    '36-й TOPIK II: письмо',
  ),
  description: localized(
    '제36회 한국어능력시험 TOPIK II 쓰기 51~54번을 원문 자료와 공식 모범답안으로 구성했습니다.',
    '36-TOPIK II yozish bo‘limining 51–54-savollari asl materiallar va rasmiy namunaviy javoblarga asoslangan.',
    'Questions 51–54 of the 36th TOPIK II Writing test, with original materials and official sample answers.',
    'Задания 51–54 письма 36-го TOPIK II с исходными материалами и официальными образцами ответов.',
  ),
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.WRITING,
  year: 2014,
  round: 36,
  durationMinutes: 50,
  totalQuestions: 4,
  totalPoints: 100,
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제36회 한국어능력시험 II B형 1교시 쓰기',
    edition: '제36회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 test-paper-paper.pdf p.16–17 및 answer-keys-answers.pdf p.2',
  },
  publishedAt: new Date('2014-10-12T00:00:00+09:00'),
  isActive: true,
};

export const TOPIK_II_36_WRITING_GROUPS: TopikSeedGroup[] = [
  {
    code: 'topik-ii-36-writing-51-52',
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
    code: 'topik-ii-36-writing-53',
    order: 2,
    startNumber: 53,
    endNumber: 53,
    instruction: textBlocks(
      '[53] 다음 자료를 참고하여 1인 가구 증가의 원인과 현황을 설명하는 글을 200~300자로 쓰십시오. (30점)',
    ),
    pointsPerQuestion: 30,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-36-writing-54',
    order: 3,
    startNumber: 54,
    endNumber: 54,
    instruction: textBlocks(
      '[54] 다음을 주제로 하여 자신의 생각을 600~700자로 쓰십시오. (50점)',
    ),
    pointsPerQuestion: 50,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
];

export const TOPIK_II_36_WRITING_QUESTIONS: TopikSeedQuestion[] = [
  {
    code: 'topik-ii-writing-36-q51',
    groupCode: 'topik-ii-36-writing-51-52',
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
        '김영미 교수님께,',
        '안녕하세요? 한국어과 3학년 제니입니다.',
        '이번 주 금요일에 뵙기로 한 것 때문에 연락 드렸습니다.',
        '그런데 [[blank:field-a|( ㉠ )]].',
        '정말 죄송합니다.',
        '혹시 [[blank:field-b|( ㉡ )]]?',
        '답장 주시면 감사하겠습니다.',
        '제니 올림',
      ),
      title: 'E-mail',
      visualVariant: 'official-writing-email',
    },
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠에는 금요일 약속에 갈 수 없는 사정을, ㉡에는 교수님께 다른 가능한 시간을 묻는 말을 쓰세요.',
        '㉠ juma kungi uchrashuvga bora olmaslik sababini, ㉡ professorning boshqa qulay vaqtini so‘rashni bildiradi.',
        '㉠ explains why Jenny cannot attend Friday’s appointment; ㉡ politely asks for another time.',
        'В ㉠ объясните невозможность встречи в пятницу, в ㉡ вежливо спросите о другом времени.',
      ),
      '㉠ 금요일에 다른 일이 생겼습니다\n㉡ 다음 주 금요일에 뵈러 가도 되겠습니까',
      localized(
        '공식 정답표는 ㉠ 약속 변경 사유와 ㉡ 상대방의 가능한 시간 문의를 인정합니다. 두 빈칸에 각각 한 문장을 쓰세요.',
        'Rasmiy javobda ㉠ uchrashuvni o‘zgartirish sababi va ㉡ boshqa qulay vaqtni so‘rash bor. Har biriga bir gap yozing.',
        'The official key accepts a reason to change the appointment in ㉠ and a polite question about availability in ㉡; use one sentence per blank.',
        'Официальный ключ принимает причину переноса встречи в ㉠ и вежливый вопрос о времени в ㉡; по одному предложению на пропуск.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-36', 'writing', 'sentence-completion', 'email'],
    difficulty: 2,
    source: {
      pdfPage: 16,
      bookPage: 14,
      reference: '제36회 TOPIK II B형 쓰기 51번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-36-q52',
    groupCode: 'topik-ii-36-writing-51-52',
    number: 52,
    order: 2,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks(
      '다음 글의 ㉠과 ㉡에 들어갈 말을 각각 한 문장으로 쓰십시오.',
    ),
    stimulus: passage(
      '기회는 어떤 사람에게 명예와 부를 안겨 준다. 기회를 통해서 평범한 사람이 유명해지기도 하고 [[blank:field-a|( ㉠ )]]. 이런 변화를 보고 사람들은 자신에게도 그런 기회가 찾아오기를 기다린다. 그러나 실제로 [[blank:field-b|( ㉡ )]]. 이렇게 기회를 잘 이용하지 못하는 것은 기회를 잡으려는 준비를 하지 않았기 때문이다.',
    ),
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠은 명예와 부를 얻는 변화, ㉡은 기회를 기다리지만 제대로 이용하지 못하는 현실을 표현합니다.',
        '㉠ shuhrat va boylikka erishishni, ㉡ esa imkoniyat kelganda undan foydalana olmaslikni ifodalaydi.',
        '㉠ describes gaining wealth, while ㉡ says many people fail to use an opportunity when it comes.',
        '㉠ описывает обретение богатства, а ㉡ — неспособность многих воспользоваться возможностью.',
      ),
      '㉠ 가난한 사람이 부자가 되기도 한다\n㉡ 기회가 와도 그 기회를 잘 이용하지 못한다',
      localized(
        '공식 정답표의 핵심은 평범한 사람이 유명해지는 것과 병렬적인 부의 변화, 그리고 기회를 놓치는 사람들입니다.',
        'Rasmiy javob mazmuni: shuhrat bilan birga boylikka erishish va kelgan imkoniyatni qo‘ldan boy berish.',
        'The official key pairs fame with becoming wealthy, then describes people missing opportunities.',
        'Официальный ответ сопоставляет известность и богатство, затем говорит об упущенных возможностях.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-36', 'writing', 'sentence-completion'],
    difficulty: 3,
    source: {
      pdfPage: 16,
      bookPage: 14,
      reference: '제36회 TOPIK II B형 쓰기 52번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-36-q53',
    groupCode: 'topik-ii-36-writing-53',
    number: 53,
    order: 3,
    type: TopikQuestionType.WRITING_DATA_DESCRIPTION,
    responseType: TopikResponseType.WRITTEN,
    points: 30,
    prompt: textBlocks(
      '최근 한국 사회에서는 1인 가구가 계속 증가하고 있습니다. 다음 자료를 참고하여 1인 가구 증가의 원인과 현황을 설명하는 글을 200~300자로 쓰십시오.',
    ),
    stimulus: {
      kind: TopikStimulusKind.CHART,
      title: '1인 가구 증가의 원인과 현황',
      subtitle:
        '증가 원인: 결혼관의 변화와 독신의 증가 · 노인 인구 증가 · 여성의 사회 진출 증가',
      blocks: [],
      bulletItems: [
        '결혼관의 변화와 독신의 증가',
        '노인 인구 증가',
        '여성의 사회 진출 증가',
      ],
      infoItems: [],
      labeledSentences: [],
      givenText: [],
      chart: {
        title: '1인 가구의 현황',
        subtitle: '전체 가구 중 1인 가구의 비율',
        headers: ['2000년', '2012년'],
        rows: [
          {
            label: '1인 가구 비율',
            values: ['16%', '26%'],
            numericValues: [16, 26],
          },
        ],
        unit: '%',
        sourceNote: '제36회 TOPIK II B형 쓰기 53번 원본 자료',
        variant: 'writing-single-person-households',
      },
      imageUrl: '',
      imageAlt:
        '1인 가구 증가 원인: 결혼관 변화와 독신 증가, 노인 인구 증가, 여성의 사회 진출 증가. 1인 가구 비율: 2000년 전체 가구의 16%, 2012년 26%.',
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
        '세 가지 증가 원인과 2000년 16%, 2012년 26%라는 변화를 모두 설명하세요.',
        'Uch sababni va 2000-yildagi 16% dan 2012-yildagi 26% ga o‘sishni tushuntiring.',
        'Explain all three causes and the rise from 16% in 2000 to 26% in 2012.',
        'Объясните три причины и рост с 16% в 2000 году до 26% в 2012 году.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '공식 답안은 2000년 16%에서 2012년 26%로 늘어난 현황과 결혼관 변화·고령화·여성의 사회 진출을 설명합니다.',
        'Rasmiy javobda 16% dan 26% ga o‘sish, turmush qurishga munosabat o‘zgarishi, qarish va ayollarning bandligi yoritiladi.',
        'The official answer explains the increase from 16% to 26% and three causes: changing marriage views, aging, and women entering the workforce.',
        'Официальный ответ описывает рост с 16% до 26% и три причины: изменение взглядов на брак, старение и занятость женщин.',
      ),
      '최근 한국 사회에서는 1인 가구가 계속 증가하고 있다. 2000년 전체 가구 수의 16%에 불과했던 1인 가구는 꾸준히 증가하여 2012년에는 26%에 도달했다. 12년 사이에 10%가 증가한 것이다. 이러한 증가의 원인은 다음과 같다. 첫째, 결혼관의 변화로 인한 독신자 수의 증가이다. 둘째, 노인 인구가 증가하면서 1인 가구도 증가하게 되었다. 셋째, 여성의 사회 진출도 1인 가구가 증가하는 데 영향을 주었다. 이러한 원인으로 1인 가구 수는 앞으로도 지속적으로 증가할 전망이다.',
      localized(
        '공식 모범답안의 통계와 원인 세 가지를 유지하고 200~300자 분량으로 설명하세요.',
        'Rasmiy namunadagi foizlar va uch sababni 200–300 belgida bayon qiling.',
        'Use the two official figures and all three causes in 200–300 characters.',
        'Укажите оба официальных показателя и все три причины в объёме 200–300 знаков.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-36', 'writing', 'chart', 'one-person-households'],
    difficulty: 4,
    source: {
      pdfPage: 17,
      bookPage: 15,
      reference: '제36회 TOPIK II B형 쓰기 53번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-36-q54',
    groupCode: 'topik-ii-36-writing-54',
    number: 54,
    order: 4,
    type: TopikQuestionType.WRITING_ARGUMENTATIVE_ESSAY,
    responseType: TopikResponseType.WRITTEN,
    points: 50,
    prompt: textBlocks(
      '다음을 주제로 하여 자신의 생각을 600~700자로 글을 쓰십시오.',
    ),
    stimulus: passage(
      '우리가 공부나 일을 할 때 동기가 분명히 있어야 더 잘 실행할 수 있습니다. 이러한 동기에는 흥미, 만족감, 자부심과 같은 내적 동기도 있고 칭찬이나 보상과 같은 외적 동기도 있습니다. ‘동기가 일에 미치는 영향’에 대해 아래의 내용을 중심으로 자신의 생각을 쓰십시오.',
      '• 동기는 일의 시작 단계에서 어떠한 역할을 합니까?',
      '• 동기가 일의 결과에 미치는 영향은 무엇입니까?',
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
        '내적·외적 동기를 설명하고 시작 단계와 결과에 미치는 영향을 모두 논리적으로 서술하세요.',
        'Ichki va tashqi motivatsiyani hamda ularning ish boshlanishi va natijasiga ta’sirini izohlang.',
        'Explain internal and external motivation and its effects on both starting and completing work.',
        'Объясните внутреннюю и внешнюю мотивацию и её влияние на начало и результат работы.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '공식 모범답안은 동기가 시작의 추진력이 되며 내적 동기는 어려움을 극복하고 일을 완수하는 데 도움을 준다고 논증합니다.',
        'Rasmiy namunada motivatsiya ish boshlashga turtki bo‘lishi, ichki motivatsiya esa qiyinchilikni yengib tugatishga yordam berishi aytiladi.',
        'The official answer argues that motivation initiates work and that intrinsic motivation helps overcome difficulties and finish it.',
        'В официальном образце мотивация побуждает начать работу, а внутренняя мотивация помогает преодолеть трудности и завершить её.',
      ),
      '우리가 어떤 일을 진행하는 데에는 동기가 중요한 역할을 한다. 동기란 어떤 일을 하게 하는 보이지 않는 힘인데 동기에는 내적 동기와 외적 동기가 있다. 내적 동기란 흥미, 만족감, 자부심과 같이 우리 마음속에서 저절로 일어나는 것이고, 외적 동기란 칭찬이나 보상과 같이 우리의 외부에서 오는 것이다. 이 두 동기는 우리가 일을 시작할 때부터 마칠 때까지 많은 영향을 미친다.\n\n만약 우리에게 동기가 없다면 일을 시작할 수 없을 것이다. 어떤 일을 시작하려면 반드시 동기가 있어야 한다는 말이다. 예를 들어, 자신의 능력을 인정받고 싶어하는 사람이라면 주변 사람들의 칭찬만큼 효과적인 동기도 없다. 또 승진이나 월급 인상과 같은 보상도 우리가 일을 시작하도록 하는 동기가 된다. 이처럼 내적 동기와 외적 동기는 일을 시작하는 단계에서부터 중요한 역할을 한다.\n\n동기는 일의 결과에도 영향을 주는데 일반적으로 내적 동기는 외적 동기보다 더 강하다. 그래서 자신이 흥미가 있고 만족감을 느낄 수 있는 일을 하면 일의 진행 과정에서 어려움에 부딪힌다고 해도 더 쉽게 극복해 낼 수 있다. 그 결과 우리가 일을 완수해 내는 데에 도움을 준다. 그뿐만 아니라 스트레스를 받더라도 이겨낼 수 있는 힘을 준다. 따라서 일을 시작할 때 분명한 동기를 가지고 있어야만 원하는 결과를 얻을 수 있다. 이처럼 어떤 동기를 갖느냐가 일의 시작과 결과에 중요한 영향을 미친다.',
      localized(
        '공식 모범답안의 시작 단계와 결과에 대한 논지를 모두 다루고 600~700자 분량을 확인하세요.',
        'Rasmiy namunadagi boshlanish va natija haqidagi fikrlarni qamrab oling hamda 600–700 belgini tekshiring.',
        'Address both the starting stage and the outcome, and check the 600–700-character requirement.',
        'Раскройте влияние на начало и результат работы и проверьте объём 600–700 знаков.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-36', 'writing', 'essay', 'motivation'],
    difficulty: 5,
    source: {
      pdfPage: 17,
      bookPage: 15,
      reference: '제36회 TOPIK II B형 쓰기 54번',
    },
    version: 1,
    isActive: true,
  },
];

export const TOPIK_II_36_WRITING_SEED: TopikExamSeed = {
  exam: TOPIK_II_36_WRITING_EXAM,
  groups: TOPIK_II_36_WRITING_GROUPS,
  questions: TOPIK_II_36_WRITING_QUESTIONS,
};
