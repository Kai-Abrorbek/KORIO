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
    'Write one sentence for each blank that fits the surrounding text.',
    'Напишите по одному предложению в каждый пропуск с учётом контекста.',
  ),
};

export const TOPIK_II_41_WRITING_EXAM: TopikSeedExam = {
  code: 'topik-ii-writing-41-2015',
  title: localized(
    '제41회 TOPIK II 쓰기',
    '41-TOPIK II yozish',
    '41st TOPIK II Writing',
    '41-й TOPIK II: письмо',
  ),
  description: localized(
    '제41회 한국어능력시험 TOPIK II 쓰기 51~54번을 원문 자료와 공식 모범답안으로 구성했습니다.',
    '41-TOPIK II yozish bo‘limining 51–54-savollari asl materiallar va rasmiy namunaviy javoblarga asoslangan.',
    'Questions 51–54 of the 41st TOPIK II Writing test, with original materials and official sample answers.',
    'Задания 51–54 письма 41-го TOPIK II с исходными материалами и официальными образцами ответов.',
  ),
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.WRITING,
  year: 2015,
  round: 41,
  durationMinutes: 50,
  totalQuestions: 4,
  totalPoints: 100,
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제41회 한국어능력시험 II B형 1교시 쓰기',
    edition: '제41회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 listening-writing-test-paper-paper.pdf p.16–17 및 answer-keys-answers.pdf p.2–3',
  },
  publishedAt: new Date('2015-07-19T00:00:00+09:00'),
  isActive: true,
};

export const TOPIK_II_41_WRITING_GROUPS: TopikSeedGroup[] = [
  {
    code: 'topik-ii-41-writing-51-52',
    order: 1,
    startNumber: 51,
    endNumber: 52,
    instruction: textBlocks(
      '[51~52] 다음을 읽고 ㉠과 ㉡에 들어갈 말을 한 문장씩 쓰십시오. (각 10점)',
    ),
    pointsPerQuestion: 10,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-41-writing-53',
    order: 2,
    startNumber: 53,
    endNumber: 53,
    instruction: textBlocks(
      '[53] 다음은 ‘글쓰기 능력을 향상시키는 방법’에 대해 교사와 학생을 대상으로 실시한 설문 조사입니다. 그래프를 보고, 조사 결과를 비교하여 200~300자로 쓰십시오. (30점)',
    ),
    pointsPerQuestion: 30,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-41-writing-54',
    order: 3,
    startNumber: 54,
    endNumber: 54,
    instruction: textBlocks(
      '[54] 다음을 주제로 하여 600~700자로 글을 쓰십시오. (50점)',
    ),
    pointsPerQuestion: 50,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
];

export const TOPIK_II_41_WRITING_QUESTIONS: TopikSeedQuestion[] = [
  {
    code: 'topik-ii-writing-41-q51',
    groupCode: 'topik-ii-41-writing-51-52',
    number: 51,
    order: 1,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks(
      '다음 이메일의 ㉠과 ㉡에 들어갈 말을 한 문장씩 쓰십시오.',
    ),
    stimulus: {
      ...passage(
        '받는 사람 이재정(korteach@hk.edu)',
        '제목 선생님, 사오밍입니다.',
        '이재정 선생님께',
        '안녕하세요? 사오밍입니다.',
        '지난주에 댁으로 초대해 주셔서 감사합니다.',
        '선생님 덕분에 재미있는 시간을 보냈습니다.',
        '이번에는 [[blank:field-a|( ㉠ )]].',
        '다음 주 월요일과 수요일 중에 언제가 좋으십니까?',
        '저는 [[blank:field-b|( ㉡ )]].',
        '편하신 오후 시간을 말씀해 주시면 감사하겠습니다.',
        '사오밍 올림',
      ),
      title: 'E-mail',
      visualVariant: 'official-writing-email',
    },
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠에는 지난번 초대에 대한 답례로 선생님을 집에 초대한다는 뜻을 쓰고, ㉡에는 가능한 오후 시간을 알려야 합니다.',
        '㉠ da ustozni uyga taklif etish, ㉡ da tushdan keyingi qulay vaqtni bildirish kerak.',
        '㉠ invites the teacher in return, and ㉡ states that the sender is available in the afternoon.',
        'В ㉠ пригласите преподавателя в ответ, а в ㉡ укажите удобное время во второй половине дня.',
      ),
      '㉠ 제가 선생님을 집으로 초대하고 싶습니다\n㉡ 오후에는 다 괜찮습니다',
      localized(
        '공식 정답표의 ㉠은 집으로 초대하고 싶다는 말이며, ㉡은 ‘오후에는’ 또는 ‘언제든지’ 다 괜찮다는 표현을 인정합니다.',
        'Rasmiy javob ㉠ ustozni uyga taklif etishni, ㉡ tushdan keyin yoki istalgan vaqtda mos kelishini qabul qiladi.',
        'The official key invites the teacher home for ㉠ and accepts either “any afternoon” or “any time” for ㉡.',
        'Официальный ключ: приглашение домой для ㉠; для ㉡ подходит «после обеда» или «в любое время».',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-41', 'writing', 'sentence-completion', 'email'],
    difficulty: 2,
    source: {
      pdfPage: 16,
      bookPage: 14,
      reference: '제41회 TOPIK II B형 쓰기 51번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-41-q52',
    groupCode: 'topik-ii-41-writing-51-52',
    number: 52,
    order: 2,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks('다음 글의 ㉠과 ㉡에 들어갈 말을 한 문장씩 쓰십시오.'),
    stimulus: passage(
      '머리는 언제 감는 것이 좋을까? 사람들은 보통 아침에 머리를 감는다. 그러나 더러워진 머리는 감고 자야 머릿결에 좋기 때문에 [[blank:field-a|( ㉠ )]]. 그런데 젖은 머리로 자면 머릿결이 상하기 쉽다. 따라서 [[blank:field-b|( ㉡ )]]. 만약 머리를 말리기 어려우면 아침에 감는 것이 더 낫다.',
    ),
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠에는 저녁에 감는 것이 좋다는 결론을, ㉡에는 자기에 앞서 머리를 말려야 한다는 조건을 쓰세요.',
        '㉠ da kechqurun yuvish yaxshiligi, ㉡ da uxlashdan oldin sochni quritish kerakligi yoziladi.',
        '㉠ concludes that washing hair in the evening is best; ㉡ says it must be dried before bed.',
        'В ㉠ сделайте вывод, что лучше мыть голову вечером; в ㉡ — что перед сном волосы нужно высушить.',
      ),
      '㉠ 머리는 저녁에 감는 것이 좋다\n㉡ 자기 전에 머리를 말리고 자야 한다',
      localized(
        '공식 정답표는 저녁에 머리를 감고, 젖은 채로 자지 않도록 자기 전에 말려야 한다는 두 문장을 제시합니다.',
        'Rasmiy javob sochni kechqurun yuvish va uxlashdan avval quritishni aytadi.',
        'The official key says to wash hair in the evening and dry it before sleeping.',
        'Официальный ответ: мыть голову вечером и высушивать волосы перед сном.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-41', 'writing', 'sentence-completion'],
    difficulty: 3,
    source: {
      pdfPage: 16,
      bookPage: 14,
      reference: '제41회 TOPIK II B형 쓰기 52번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-41-q53',
    groupCode: 'topik-ii-41-writing-53',
    number: 53,
    order: 3,
    type: TopikQuestionType.WRITING_DATA_DESCRIPTION,
    responseType: TopikResponseType.WRITTEN,
    points: 30,
    prompt: textBlocks(
      '다음은 ‘글쓰기 능력을 향상시키는 방법’에 대해 교사와 학생을 대상으로 실시한 설문 조사입니다. 그래프를 보고, 조사 결과를 비교하여 200~300자로 쓰십시오.',
    ),
    stimulus: {
      kind: TopikStimulusKind.CHART,
      title: '글쓰기 능력을 향상시키는 방법',
      subtitle: '교사와 학생 각 300명 설문 조사',
      blocks: [],
      bulletItems: [],
      infoItems: [],
      labeledSentences: [],
      givenText: [],
      chart: {
        title: '글쓰기 능력을 향상시키는 방법',
        subtitle: '교사와 학생 각 300명',
        headers: [
          '책 많이 읽기',
          '좋은 글 따라 쓰기',
          '다양한 주제로 연습하기',
        ],
        rows: [
          {
            label: '교사 (300명)',
            values: ['45%', '30%', '25%'],
            numericValues: [45, 30, 25],
          },
          {
            label: '학생 (300명)',
            values: ['25%', '10%', '65%'],
            numericValues: [25, 10, 65],
          },
        ],
        unit: '%',
        sourceNote: '제41회 TOPIK II B형 쓰기 53번 원본 그래프',
        variant: 'writing-improve-writing-skills',
      },
      imageUrl: '',
      imageAlt:
        '글쓰기 능력 향상 방법 설문, 교사 300명: 책 많이 읽기 45%, 좋은 글 따라 쓰기 30%, 다양한 주제로 연습하기 25%. 학생 300명: 책 많이 읽기 25%, 좋은 글 따라 쓰기 10%, 다양한 주제로 연습하기 65%.',
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
        '교사와 학생 각 300명의 설문에서 세 방법의 비율을 정확하게 비교하세요.',
        'Har biri 300 kishidan iborat ustozlar va o‘quvchilar guruhidagi uch usul ulushini solishtiring.',
        'Compare all three methods and their percentages for the 300 teachers and 300 students.',
        'Сравните проценты по всем трём методам у 300 учителей и 300 учащихся.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '교사는 책 많이 읽기(45%)를, 학생은 다양한 주제로 연습하기(65%)를 가장 많이 선택했습니다. 다른 두 항목까지 비교해야 합니다.',
        'Ustozlarda kitob o‘qish (45%), o‘quvchilarda turli mavzularda mashq qilish (65%) eng yuqori; qolgan ikki usulni ham solishtiring.',
        'Reading many books leads among teachers (45%), while practicing varied topics leads among students (65%); compare the other categories too.',
        'Учителя чаще выбирают чтение книг (45%), учащиеся — практику на разные темы (65%); сравните и остальные показатели.',
      ),
      '교사와 학생 300명을 대상으로 글쓰기 능력을 향상시키는 방법에 대해 설문 조사를 실시하였다. 그 결과 교사와 학생의 생각이 다르다는 것을 알 수 있었다. 교사의 경우 글을 잘 쓰려면 책을 많이 읽어야 한다가 45%로 가장 높게 나타났지만 학생의 경우에는 다양한 주제로 연습하기가 65%로 가장 높았다. 다음으로 교사는 좋은 글을 따라 써야 한다가 30%, 다양한 주제로 연습해야 한다가 25%를 차지했다. 반면에 학생들은 책을 많이 읽어야 한다가 25%로 나타났고, 좋은 글을 따라 써야 한다는 10%에 그쳤다.',
      localized(
        '공식 모범답안의 교사 45%·30%·25%, 학생 25%·10%·65%를 빠짐없이 비교하고 200~300자로 쓰세요.',
        'Rasmiy namunadagi ustozlar 45/30/25% va o‘quvchilar 25/10/65% natijalarini 200–300 belgida solishtiring.',
        'Compare the official teacher figures (45/30/25%) and student figures (25/10/65%) in 200–300 characters.',
        'Сравните официальные данные учителей (45/30/25%) и учащихся (25/10/65%) в объёме 200–300 знаков.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-41', 'writing', 'chart', 'writing-skills'],
    difficulty: 4,
    source: {
      pdfPage: 17,
      bookPage: 15,
      reference: '제41회 TOPIK II B형 쓰기 53번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-41-q54',
    groupCode: 'topik-ii-41-writing-54',
    number: 54,
    order: 4,
    type: TopikQuestionType.WRITING_ARGUMENTATIVE_ESSAY,
    responseType: TopikResponseType.WRITTEN,
    points: 50,
    prompt: textBlocks('다음을 주제로 하여 600~700자로 글을 쓰십시오.'),
    stimulus: passage(
      '세계 어느 나라에서나 역사를 가르칩니다. 이는 지나간 일을 기록한 역사가 오늘날의 우리에게 주는 가치가 분명히 있기 때문일 것입니다. 여러분은 우리가 왜 역사를 알아야 하고, 그 역사를 통해서 무엇을 배울 수 있다고 생각하십니까? 이에 대해 쓰십시오.',
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
        '역사를 알아야 하는 이유와 역사를 통해 배울 수 있는 점을 모두 논리적으로 쓰세요.',
        'Tarixni bilish nega muhimligi va undan nimalarni o‘rganish mumkinligini mantiqan yozing.',
        'Explain both why we should know history and what it can teach us.',
        'Объясните, зачем знать историю и чему она нас учит.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '공식 모범답안은 역사가 현재를 이해하게 하고 과거의 잘못을 반복하지 않도록 교훈을 주며 미래를 예측·준비하는 데 도움을 준다고 논증합니다.',
        'Rasmiy namuna tarix bugunni tushunish, xatolarni takrorlamaslik va kelajakka tayyorlanishga yordam berishini asoslaydi.',
        'The official answer argues that history helps us understand the present, avoid repeating mistakes, and prepare for the future.',
        'Официальный ответ объясняет, как история помогает понять настоящее, не повторять ошибок и готовиться к будущему.',
      ),
      '지난날에 대한 반성 또는 위대한 업적 등이 후대에게 전해지기를 바라는 마음이 기록으로 이어지고 그것이 바로 우리가 지금 ‘역사’라고 부르는 것이다. 우리가 역사를 기록하는 이유는 지금 일어나는 사실을 다음 세대에게 전달하는 데 그 목적이 있다.\n\n이러한 역사는 우리에게 지금의 ‘나’를 이해할 수 있는 기회를 제공해 준다. 현재는 과거에서 비롯된 것이므로 과거를 살펴봄으로써 현재 일어나고 있는 일에 대해 이해하도록 돕는다. 그리고 역사는 과거에 있었던 가슴 아픈 사건이 다시 반복되지 않도록 우리에게 교훈을 주기도 한다.\n\n더불어 역사의 기록을 통해 우리는 앞으로 일어날 일을 예측하고 이를 준비할 수도 있다. 얼마 전 신문 기사에 따르면 한 연구자가 옛 문서에 기록된 역사적인 사실을 분석하여 오늘날의 우리가 겪고 있는 심한 가뭄을 미리 알리면서 대비를 경고한 바 있다. 이는 역사의 가치를 보여주는 한 예라 할 수 있을 것이다.\n\n이렇듯 역사는 과거의 사실을 아는 데에서 출발하여 현재의 ‘나’를 이해하고 더 나은 미래를 향한 방향을 제시해 줄 수 있다는 점에서 중요하다. 결국 과거의 역사는 현재로, 현재는 다시 미래의 역사로 이어지는 연속적인 관계 속에 존재하기 때문이다.',
      localized(
        '공식 모범답안처럼 과거의 기록, 현재에 대한 이해와 교훈, 미래의 예측·준비를 연결하고 600~700자 분량을 확인하세요.',
        'Rasmiy namunadagidek o‘tmish qaydi, bugunni anglash va kelajakka tayyorgarlikni bog‘lab, 600–700 belgini tekshiring.',
        'Connect records of the past, understanding and lessons for the present, and preparation for the future; check 600–700 characters.',
        'Свяжите прошлое, понимание настоящего и подготовку к будущему; проверьте объём 600–700 знаков.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-41', 'writing', 'essay', 'history'],
    difficulty: 5,
    source: {
      pdfPage: 17,
      bookPage: 15,
      reference: '제41회 TOPIK II B형 쓰기 54번',
    },
    version: 1,
    isActive: true,
  },
];

export const TOPIK_II_41_WRITING_SEED: TopikExamSeed = {
  exam: TOPIK_II_41_WRITING_EXAM,
  groups: TOPIK_II_41_WRITING_GROUPS,
  questions: TOPIK_II_41_WRITING_QUESTIONS,
};
