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
    'Topshiriq va kontekstni tekshiring, so‘ng mazmun, grammatika va hajmni qayta ko‘rib chiqing.',
    'Check the task and context, then review content, grammar, and length.',
    'Проверьте задание и контекст, затем содержание, грамматику и объём.',
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
          'Reja',
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
    'Har bir bo‘shliqni oldingi va keyingi gaplarga mos bitta gap bilan to‘ldiring.',
    'Write one sentence for each blank that fits the surrounding text.',
    'Напишите по одному предложению, согласованному с контекстом.',
  ),
};

export const TOPIK_II_35_WRITING_EXAM: TopikSeedExam = {
  code: 'topik-ii-writing-35-2014',
  title: localized(
    '제35회 TOPIK II 쓰기',
    '35-TOPIK II yozish',
    '35th TOPIK II Writing',
    '35-й TOPIK II: письмо',
  ),
  description: localized(
    '제35회 한국어능력시험 TOPIK II 쓰기 51번부터 54번까지를 원문 자료와 공식 모범답안으로 구성했습니다.',
    '35-TOPIK II yozish bo‘limining 51–54-savollari asl materiallar asosida.',
    'Questions 51–54 of the 35th TOPIK II Writing test with original materials and official sample answers.',
    'Задания 51–54 письма 35-го TOPIK II с оригинальными материалами и образцами ответов.',
  ),
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.WRITING,
  year: 2014,
  round: 35,
  durationMinutes: 50,
  totalQuestions: 4,
  totalPoints: 100,
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제35회 한국어능력시험 II B형 1교시 쓰기',
    edition: '제35회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 test-paper-paper.pdf p.39–40 및 answer-keys-answers.pdf p.3',
  },
  publishedAt: new Date('2014-07-20T00:00:00+09:00'),
  isActive: true,
};

export const TOPIK_II_35_WRITING_GROUPS: TopikSeedGroup[] = [
  {
    code: 'topik-ii-35-writing-51-52',
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
    code: 'topik-ii-35-writing-53',
    order: 2,
    startNumber: 53,
    endNumber: 53,
    instruction: textBlocks(
      '[53] 다음 그래프를 보고 비교하여 자신의 생각을 200~300자로 쓰십시오. (30점)',
    ),
    pointsPerQuestion: 30,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-35-writing-54',
    order: 3,
    startNumber: 54,
    endNumber: 54,
    instruction: textBlocks(
      '[54] 다음을 주제로 자신의 생각을 600~700자로 쓰십시오. (50점)',
    ),
    pointsPerQuestion: 50,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
];

export const TOPIK_II_35_WRITING_QUESTIONS: TopikSeedQuestion[] = [
  {
    code: 'topik-ii-writing-35-q51',
    groupCode: 'topik-ii-35-writing-51-52',
    number: 51,
    order: 1,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks(
      '다음 글의 ㉠과 ㉡에 들어갈 말을 각각 한 문장으로 쓰십시오.',
    ),
    stimulus: {
      ...passage(
        '저는 유학생인데 공부를 마치고 다음 주에 고향으로 돌아갑니다. 그래서 지금 [[blank:field-a|( ㉠ )]]. 책상, 의자, 컴퓨터, 경영학 전공 책 등이 있습니다.',
        '이번 주 금요일까지 방을 비워 줘야 합니다. [[blank:field-b|( ㉡ )]]. 제 전화번호는 010-1234-5678입니다.',
      ),
      title: '무료로 드립니다',
      visualVariant: 'official-writing-free-giveaway',
    },
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠은 물건을 정리하려는 목적, ㉡은 금요일 전까지 연락해 달라는 요청을 앞뒤 문장에 맞게 표현합니다.',
        '㉠ buyumlarni tartibga keltirishni, ㉡ juma kunigacha bog‘lanish iltimosini bildiradi.',
        '㉠ explains disposing of used items; ㉡ asks interested people to contact the writer before Friday.',
        '㉠ сообщает о раздаче вещей, ㉡ просит связаться до пятницы.',
      ),
      '㉠ 그동안 사용했던 제 물건들을 정리하려고 합니다\n㉡ 그러니까 물건이 필요하신 분들은 금요일 전까지 연락해 주시기 바랍니다',
      localized(
        '두 빈칸에 각각 한 문장을 쓰고, 귀국·물건 제공·금요일 마감이라는 문맥과 일치해야 합니다.',
        'Har bir bo‘shliqqa bittadan gap yozing; qaytish, buyumlar va juma muddatiga mos kelsin.',
        'Write one sentence per blank consistent with returning home, giving away items, and the Friday deadline.',
        'Напишите по одному предложению, учитывая отъезд, раздачу вещей и срок до пятницы.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-35', 'writing', 'sentence-completion'],
    difficulty: 2,
    source: {
      pdfPage: 39,
      bookPage: 14,
      reference: '제35회 TOPIK II B형 쓰기 51번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-35-q52',
    groupCode: 'topik-ii-35-writing-51-52',
    number: 52,
    order: 2,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks(
      '다음 글의 ㉠과 ㉡에 들어갈 말을 각각 한 문장으로 쓰십시오.',
    ),
    stimulus: passage(
      '퍼즐은 여러 개의 조각을 모두 제 위치에 놓아야 하나의 그림이 완성된다. 그런데 만일 [[blank:field-a|( ㉠ )]]. 사회와 개인의 관계도 마찬가지이다. 사회를 구성하는 모든 개인도 있어야 할 자리에 있어야 한다. 그래야 [[blank:field-b|( ㉡ )]].',
    ),
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠에는 제자리를 벗어난 퍼즐 조각의 결과를, ㉡에는 개인들이 제 역할을 할 때 사회가 작동하는 결과를 씁니다.',
        '㉠ joyiga tushmagan bo‘lak natijasini, ㉡ odamlar o‘z o‘rnida bo‘lsa jamiyat ishlashini bildiradi.',
        '㉠ gives the consequence of a misplaced puzzle piece; ㉡ explains society functioning when each person has a place.',
        'В ㉠ укажите результат неправильного положения детали, в ㉡ — результат выполнения людьми своих ролей.',
      ),
      '㉠ 퍼즐 조각이 제 자리에 놓이지 않으면 그림은 완성되지 않는다\n㉡ 비로소 사회가 하나로 돌아가기 때문이다',
      localized(
        '퍼즐 조각과 사회 구성원의 비유를 유지하고, 두 문장이 앞뒤 내용과 문법적으로 연결되어야 합니다.',
        'Pazl va jamiyat qiyosini saqlang; ikkala gap kontekstga grammatik mos kelsin.',
        'Preserve the puzzle–society analogy and make both sentences grammatically fit their context.',
        'Сохраните аналогию пазла и общества, грамматически согласовав оба предложения.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-35', 'writing', 'sentence-completion'],
    difficulty: 3,
    source: {
      pdfPage: 39,
      bookPage: 14,
      reference: '제35회 TOPIK II B형 쓰기 52번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-35-q53',
    groupCode: 'topik-ii-35-writing-53',
    number: 53,
    order: 3,
    type: TopikQuestionType.WRITING_DATA_DESCRIPTION,
    responseType: TopikResponseType.WRITTEN,
    points: 30,
    prompt: textBlocks(
      '다음 그래프를 보고, 연령대에 따라 필요하다고 생각하는 공공시설이 무엇인지 비교하여 그에 대한 자신의 생각을 200~300자로 쓰십시오.',
      '30대와 60대 성인 남녀 500명을 대상으로 ‘필요하다고 생각하는 공공시설’에 대해 설문 조사를 하였다.',
    ),
    stimulus: {
      kind: TopikStimulusKind.CHART,
      title: '필요하다고 생각하는 공공시설',
      subtitle: '30대와 60대 성인 남녀 500명 설문 조사',
      blocks: [],
      bulletItems: [],
      infoItems: [],
      labeledSentences: [],
      givenText: [],
      chart: {
        title: '연령대별 필요 공공시설',
        subtitle: '단위: %',
        headers: ['30대', '60대'],
        rows: [
          {
            label: '병원·약국',
            values: ['28%', '50%'],
            numericValues: [28, 50],
          },
          {
            label: '공연장·문화센터',
            values: ['40%', '23%'],
            numericValues: [40, 23],
          },
          { label: '공원', values: ['22%', '22%'], numericValues: [22, 22] },
          { label: '기타', values: ['10%', '5%'], numericValues: [10, 5] },
        ],
        unit: '%',
        sourceNote: '제35회 TOPIK II B형 쓰기 53번 원본 그래프',
        variant: 'writing-public-facilities-age',
      },
      imageUrl: '',
      imageAlt:
        '30대는 공연장·문화센터 40%, 병원·약국 28%, 공원 22%, 기타 10%; 60대는 병원·약국 50%, 공연장·문화센터 23%, 공원 22%, 기타 5%',
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
        '30대와 60대의 높은 항목과 공통점·차이점을 수치로 비교하고 자신의 생각을 쓰세요.',
        '30 va 60 yoshlilar ko‘rsatkichlarini raqamlar bilan solishtirib, fikringizni yozing.',
        'Compare the age groups with figures, then add your own interpretation.',
        'Сравните возрастные группы по цифрам и изложите своё мнение.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '30대는 공연장·문화센터(40%), 60대는 병원·약국(50%)을 가장 많이 골랐으며 공원은 두 연령대가 22%로 같습니다.',
        '30 yoshlilar madaniyat markazlarini (40%), 60 yoshlilar shifoxona va dorixonalarni (50%) eng ko‘p tanlagan; park har ikki guruhda 22%.',
        'The 30s chose culture venues most (40%), the 60s chose hospitals and pharmacies most (50%), and parks were 22% in both.',
        'Группа 30-летних чаще выбирала культурные учреждения (40%), 60-летние — больницы и аптеки (50%); парки получили по 22%.',
      ),
      '30대와 60대 성인 남녀를 대상으로 필요하다고 생각하는 공공시설에 대한 설문조사를 실시하였다. 조사 결과 30대의 경우 공연장·문화센터가 40%로 가장 높게 나타났으며 병원·약국이 28%로 그 뒤를 이었다. 반면에 60대는 병원·약국이 전체의 절반 수준인 50%로 가장 높게 나타났으며 공연장·문화센터가 23%로 조사되었다. 공원 시설의 필요성에 대한 견해는 30대와 60대가 22%로 동일하게 나타났다. 이상의 설문 조사 결과를 통해 자신의 나이와 직접적으로 관계가 있는 공공시설에 대한 요구가 상대적으로 크다는 사실을 알 수 있다.',
      localized(
        '그래프의 30대·60대 항목별 수치와 비교를 정확히 포함하고, 결과에 대한 생각을 200~300자로 제시해야 합니다.',
        'Grafikdagi barcha asosiy raqamlarni va taqqoslashni 200–300 belgida tushuntiring.',
        'Include accurate age-group figures, a comparison, and an interpretation in 200–300 characters.',
        'Укажите точные цифры, сравнение и вывод в пределах 200–300 знаков.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-35', 'writing', 'chart'],
    difficulty: 4,
    source: {
      pdfPage: 40,
      bookPage: 15,
      reference: '제35회 TOPIK II B형 쓰기 53번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-35-q54',
    groupCode: 'topik-ii-35-writing-54',
    number: 54,
    order: 4,
    type: TopikQuestionType.WRITING_ARGUMENTATIVE_ESSAY,
    responseType: TopikResponseType.WRITTEN,
    points: 50,
    prompt: textBlocks(
      '다음을 주제로 하여 자신의 생각을 600~700자로 글을 쓰십시오.',
    ),
    stimulus: passage(
      '사람들은 다양한 경제 수준의 삶을 살고 있으며 그러한 삶에 대해 느끼는 각자의 만족도도 다양하다. 그러나 경제적 여유와 행복 만족도가 꼭 비례한다고는 할 수 없다. 경제적 여유가 행복에 미치는 영향에 대해 아래의 내용을 중심으로 자신의 생각을 쓰십시오.',
      '• 사람들이 생각하는 행복한 삶이란 무엇인가?',
      '• 경제적 조건과 행복 만족도의 관계는 어떠한가?',
      '• 행복 만족도를 높이기 위해 어떠한 노력이 필요한가?',
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
        '행복한 삶의 정의, 경제적 조건과 만족도의 관계, 만족도를 높일 방법을 모두 논리적으로 다루세요.',
        'Baxtli hayot, iqtisodiy sharoit va qoniqish munosabati, qoniqishni oshirish yo‘llarini yoritib bering.',
        'Address what a happy life is, how finances relate to satisfaction, and ways to improve satisfaction.',
        'Раскройте понятие счастливой жизни, связь финансов и удовлетворённости и пути её повышения.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '경제적 안정이 기본 생활에 필요하지만 행복을 완전히 결정하지는 않는다는 점을 세 가지 질문에 맞춰 논증해야 합니다.',
        'Iqtisodiy barqarorlik zarur, lekin baxtni to‘liq belgilamasligini uch savol asosida asoslang.',
        'Argue that financial security matters for basic needs but does not completely determine happiness.',
        'Обоснуйте, что финансовая стабильность важна для основных нужд, но не полностью определяет счастье.',
      ),
      '일반적으로 사람들은 경제적으로 여유가 있으면 다른 사람들보다 더 행복할 것이라고 생각한다. 그러나 반드시 그러한 것은 아니다. 굴지의 기업 총수라고 해서 특별히 더 행복해 보이지 않는 것만 보더라도 그 사실을 잘 알 수 있다. 경제적 여유가 정신적 안정과 만족을 가져오는 것은 아니다.\n\n물론 행복해지려면 어느 정도의 경제적인 조건은 요구된다. 사람에게 필수적인 의식주가 해결되지 않은 상황에서는 행복의 크기가 경제력과 비례 관계에 있다고 볼 수도 있다. 그러나 의식주가 큰 문제가 되지 않는 요즈음, ‘먹고 살 걱정’에서 놓여난 다음 잉여의 경제력을 어떻게 처리하느냐의 문제를 두고 고민할 필요가 있다. 배고픈 예술가가 행복할 것이라고 여기는 사람은 별로 없을 것이다. 그렇다고 해서 배만 부른 부자가 되기를 원하는 사람도 별로 없다. 결국 행복이란 안락한 생활과 스스로 만족하는 삶에서 느낄 수 있는 것이다.\n\n행복해지기 위해서는 우리 자신이 스스로 행복하다고 느낄 수 있는 환경에서 생활하는 것이 중요하므로 그런 상황을 자주 만들려고 노력하는 자세가 필요하다. 언제 행복한지, 누구와 있을 때 행복한지 그리고 무슨 일에서 행복함을 느끼는지를 잘 알게 된다면 그것이 그리 어려운 일은 아닐 것이다. 다시 말해서 약간의 ‘여유’가 생긴다면 그 여유를 언제, 누구와, 무엇을 하면서 쓸 것인가에 대해 가끔씩은 생각하면서 사는 것이 중요하다. 물론 그 여유를 누리는 것이 다른 사람의 행복을 방해하지는 않아야 할 것이다.',
      localized(
        '행복한 삶의 의미, 경제력과 만족도의 관계, 만족도를 높이는 실천을 모두 포함하고 600~700자 조건을 확인하세요.',
        'Baxtli hayot, iqtisod va qoniqish munosabati, amaliy usullarni qamrab oling hamda 600–700 belgini tekshiring.',
        'Cover all three prompts and check the 600–700-character requirement.',
        'Раскройте все три пункта и проверьте ограничение в 600–700 знаков.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-35', 'writing', 'essay', 'happiness'],
    difficulty: 5,
    source: {
      pdfPage: 40,
      bookPage: 15,
      reference: '제35회 TOPIK II B형 쓰기 54번',
    },
    version: 1,
    isActive: true,
  },
];

export const TOPIK_II_35_WRITING_SEED: TopikExamSeed = {
  exam: TOPIK_II_35_WRITING_EXAM,
  groups: TOPIK_II_35_WRITING_GROUPS,
  questions: TOPIK_II_35_WRITING_QUESTIONS,
};
