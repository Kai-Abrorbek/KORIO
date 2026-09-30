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
    '문제의 조건과 문맥을 확인해 답을 쓴 뒤 내용·문법·분량을 점검하세요.',
    'Savol sharti va kontekstni tekshiring, so‘ng mazmun, grammatika va hajmni qayta ko‘ring.',
    'Read the task and context, then review the content, grammar, and length.',
    'Проверьте условие и контекст, затем содержание, грамматику и объём ответа.',
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
    'Make each response fit naturally into the surrounding sentences.',
    'Впишите фразы так, чтобы они согласовывались с соседними предложениями.',
  ),
};

export const TOPIK_II_60_WRITING_EXAM: TopikSeedExam = {
  code: 'topik-ii-writing-60-2018',
  title: localized(
    '제60회 TOPIK II 쓰기',
    '60-TOPIK II yozish',
    '60th TOPIK II Writing',
    '60-й TOPIK II: письмо',
  ),
  description: localized(
    '제60회 한국어능력시험 TOPIK II 쓰기 51~54번을 원문 시험지와 공식 정답·채점 기준으로 구성했습니다.',
    '60-TOPIK II yozish bo‘limining 51–54-savollari asl test va rasmiy javob hamda baholash mezonlariga asoslangan.',
    'Questions 51–54 from the 60th TOPIK II Writing test, based on the original paper and official scoring key.',
    'Задания 51–54 письма 60-го TOPIK II по оригинальному тесту и официальным критериям оценивания.',
  ),
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.WRITING,
  year: 2018,
  round: 60,
  durationMinutes: 50,
  totalQuestions: 4,
  totalPoints: 100,
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제60회 한국어능력시험 II B-홀수형 1교시 쓰기',
    edition: '제60회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 test-paper-paper (1).pdf p.43–44 및 answer-keys-answers.pdf p.3–4',
  },
  publishedAt: new Date('2018-10-21T00:00:00+09:00'),
  isActive: true,
};

export const TOPIK_II_60_WRITING_GROUPS: TopikSeedGroup[] = [
  {
    code: 'topik-ii-60-writing-51-52',
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
    code: 'topik-ii-60-writing-53',
    order: 2,
    startNumber: 53,
    endNumber: 53,
    instruction: textBlocks(
      '[53] 다음을 참고하여 ‘인주시의 자전거 이용자 변화’에 대한 글을 200~300자로 쓰시오. 단, 글의 제목을 쓰지 마시오. (30점)',
    ),
    pointsPerQuestion: 30,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-60-writing-54',
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

export const TOPIK_II_60_WRITING_QUESTIONS: TopikSeedQuestion[] = [
  {
    code: 'topik-ii-writing-60-q51',
    groupCode: 'topik-ii-60-writing-51-52',
    number: 51,
    order: 1,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks(
      '다음 게시판 글의 ㉠과 ㉡에 들어갈 말을 각각 한 문장으로 쓰시오.',
    ),
    stimulus: {
      ...passage(
        '제목: 도서관을 이용하고 싶습니다. / 작성자: 타넷(2018-10-20)',
        '한국대학교를 졸업한 학생인데 도서관을 이용하고 싶습니다.',
        '선배에게 물어보니 졸업생이 도서관을 이용하려면 출입증이 [[blank:field-a|( ㉠ )]].',
        '출입증을 만들려면 [[blank:field-b|( ㉡ )]]?',
        '방법을 알려 주시면 감사하겠습니다.',
      ),
      title: '한국대학교 도서관 Q & A 게시판',
      visualVariant: 'official-writing-web-board',
    },
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠은 졸업생에게 출입증이 필요하다는 선배의 말을 간접화법으로 전합니다. ㉡은 출입증을 만드는 방법을 격식 있게 묻습니다.',
        '㉠ bitiruvchiga kirish ruxsatnomasi kerakligini katta kursdosh aytganini bilvosita bayon qiladi; ㉡ uni qanday olishni muloyim so‘raydi.',
        '㉠ reports the senior’s statement that an entry pass is required; ㉡ politely asks how to obtain one.',
        'В ㉠ передайте косвенной речью слова старшего товарища о необходимости пропуска; в ㉡ вежливо спросите, как его оформить.',
      ),
      '㉠ 필요하다고 합니다\n㉡ 어떻게 해야 합니까',
      localized(
        '공식 정답은 ㉠ ‘필요하다고 합니다/있어야 한다고 합니다’, ㉡ ‘어떻게 해야 합니까/어떻게 해야 됩니까’입니다. ㉠은 필요성·간접화법·격식체, ㉡은 방법 질문·‘-아/어야 하다’·격식체를 평가합니다.',
        'Rasmiy kalitda ㉠ ruxsatnoma zarurligi bilvosita nutqda, ㉡ esa qanday qilish kerakligi rasmiy uslubda ifodalanadi.',
        'The official key accepts “is needed/is required, [the senior] says” and “what should I do?” Register and grammar are scored.',
        'Официальный ответ допускает варианты «нужен, сказал старший» и «что нужно сделать?»; учитываются стиль и грамматика.',
      ),
    ),
    presentation: writingPresentation,
    tags: [
      'topik-ii',
      'round-60',
      'writing',
      'sentence-completion',
      'web-board',
    ],
    difficulty: 2,
    source: {
      pdfPage: 43,
      bookPage: 14,
      reference: '제60회 TOPIK II B-홀수형 쓰기 51번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-60-q52',
    groupCode: 'topik-ii-60-writing-51-52',
    number: 52,
    order: 2,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks(
      '다음 글의 ㉠과 ㉡에 들어갈 말을 각각 한 문장으로 쓰시오.',
    ),
    stimulus: passage(
      '사람들은 음악 치료를 할 때 환자에게 주로 밝은 분위기의 음악을 들려줄 것이라고 생각한다. 그러나 환자에게 항상 밝은 분위기의 음악을 [[blank:field-a|( ㉠ )]]. 치료 초기에는 환자가 편안한 감정을 느끼는 것이 중요하다. 그래서 환자의 심리 상태와 비슷한 분위기의 음악을 들려준다. 그 이후에는 환자에게 다양한 분위기의 음악을 들려줌으로써 환자가 다양한 감정을 [[blank:field-b|( ㉡ )]].',
    ),
    writingConfig: twoFields,
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '㉠은 항상 밝은 음악을 들려주는 것은 아니라는 부분 부정이고, ㉡은 음악을 통해 환자가 다양한 감정을 느끼게 한다는 뜻입니다.',
        '㉠ doim yorqin musiqa qo‘yilmasligini bildiradi; ㉡ musiqa orqali bemor turli hislarni tuyishini anglatadi.',
        '㉠ partially negates “always playing cheerful music”; ㉡ says music helps the patient experience varied emotions.',
        'В ㉠ отрицайте «всегда включают весёлую музыку»; в ㉡ укажите, что музыка помогает пациенту испытать разные чувства.',
      ),
      '㉠ 들려주는 것은 아니다\n㉡ 느끼도록 한다',
      localized(
        '공식 정답은 ㉠ ‘들려주는 것은 아니다/사용하는 것은 아니다’, ㉡ ‘느끼도록 한다/느끼게 한다’입니다. ㉠의 ‘-지 않다’는 ‘항상’과 결합하면 완전 부정이 되어 공식 채점에서 제외됩니다.',
        'Rasmiy javob ㉠ uchun qisman inkorni, ㉡ uchun “his qildirish”ni qabul qiladi; oddiy to‘liq inkor hisobga olinmaydi.',
        'The official key accepts partial negation for ㉠ and causative “make/let feel” for ㉡; simple full negation is not accepted.',
        'Официальный ключ требует частичного отрицания в ㉠ и побудительной конструкции в ㉡; полное отрицание не засчитывается.',
      ),
    ),
    presentation: writingPresentation,
    tags: [
      'topik-ii',
      'round-60',
      'writing',
      'sentence-completion',
      'music-therapy',
    ],
    difficulty: 3,
    source: {
      pdfPage: 43,
      bookPage: 14,
      reference: '제60회 TOPIK II B-홀수형 쓰기 52번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-60-q53',
    groupCode: 'topik-ii-60-writing-53',
    number: 53,
    order: 3,
    type: TopikQuestionType.WRITING_DATA_DESCRIPTION,
    responseType: TopikResponseType.WRITTEN,
    points: 30,
    prompt: textBlocks(
      '다음을 참고하여 ‘인주시의 자전거 이용자 변화’에 대한 글을 200~300자로 쓰시오. 단, 글의 제목을 쓰지 마시오.',
    ),
    stimulus: {
      kind: TopikStimulusKind.CHART,
      title: '인주시의 자전거 이용자 변화',
      subtitle: '자전거 이용자 수 · 변화 이유 · 이용 목적',
      blocks: [],
      bulletItems: [],
      infoItems: [
        { label: '변화 이유 1', value: '자전거 도로 개발' },
        { label: '변화 이유 2', value: '자전거 빌리는 곳 확대' },
        { label: '운동 및 산책', value: '2007년 대비 2017년 4배' },
        { label: '출퇴근', value: '2007년 대비 2017년 14배' },
        { label: '기타', value: '2007년 대비 2017년 3배' },
      ],
      labeledSentences: [],
      givenText: [],
      chart: {
        title: '자전거 이용자 수',
        subtitle: '2007~2017년 인주시 이용자',
        headers: ['자전거 이용자 수'],
        rows: [
          { label: '2007년', values: ['4만 명'], numericValues: [40000] },
          { label: '2012년', values: ['9만 명'], numericValues: [90000] },
          { label: '2017년', values: ['21만 명'], numericValues: [210000] },
        ],
        unit: '명',
        sourceNote:
          '원본은 약 5배 증가로 표시. 이용 목적은 절대 수치 없이 2007년 대비 2017년 증가 배수(운동·산책 4배, 출퇴근 14배, 기타 3배)만 제시.',
        variant: 'writing-bicycle-users-trend',
      },
      imageUrl: '',
      imageAlt:
        '자전거 이용자 수는 2007년 4만, 2012년 9만, 2017년 21만 명으로 약 5배 증가. 변화 이유는 자전거 도로 개발과 빌리는 곳 확대. 목적별 10년간 증가 배수는 운동·산책 4배, 출퇴근 14배, 기타 3배.',
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
        '연도별 이용자 수, 두 가지 증가 이유, 이용 목적별 10년간 증가 배수를 모두 비교하고 제목은 쓰지 마세요.',
        'Yillar bo‘yicha foydalanuvchilar soni, o‘sishning ikki sababi va har bir maqsad bo‘yicha 10 yillik o‘sishni taqqoslang; sarlavha qo‘ymang.',
        'Compare user counts by year, both reasons for growth, and the ten-year multipliers by purpose; do not write a title.',
        'Сравните число пользователей по годам, две причины роста и рост по целям использования за десять лет; заголовок не пишите.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '이용자는 2007년 4만 명에서 2012년 9만 명, 2017년 21만 명으로 약 5배 늘었고, 특히 후반 5년에 급증했습니다. 자전거 도로와 대여 시설 확대가 이유이며 출퇴근 목적은 14배로 가장 크게 증가했습니다.',
        'Foydalanuvchilar 2007-yilda 40 ming, 2012-yilda 90 ming, 2017-yilda 210 ming bo‘lgan. Veloyo‘llar va ijaralar kengaygan; qatnov 14 baravar o‘sgan.',
        'Users rose from 40,000 in 2007 to 90,000 in 2012 and 210,000 in 2017, about fivefold. Bike lanes and rentals expanded; commuting grew most at 14×.',
        'Число пользователей выросло с 40 тыс. в 2007 году до 90 тыс. в 2012 и 210 тыс. в 2017; причины — велодорожки и прокат, а поездки на работу выросли в 14 раз.',
      ),
      '인주시의 자전거 이용자 변화를 살펴보면, 자전거 이용자 수는 2007년 4만 명에서 2012년에는 9만 명, 2017년에는 21만 명으로, 지난 10년간 약 5배 증가하였다. 특히 2012년부터 2017년까지 자전거 이용자 수가 급증한 것으로 나타났다. 이와 같이 자전거 이용자 수가 증가한 이유는 자전거 도로가 개발되고 자전거 빌리는 곳이 확대되었기 때문인 것으로 보인다. 자전거 이용 목적을 보면, 10년간 운동 및 산책은 4배, 출퇴근은 14배, 기타는 3배 늘어난 것으로 나타났으며, 출퇴근 시 이용이 가장 높은 증가율을 보였다.',
      localized(
        '공식 채점 기준은 연도별 4만·9만·21만 명과 증가 추세, 도로 개발·대여 시설 확대, 이용 목적별 4배·14배·3배와 출퇴근 증가율 비교를 요구합니다. 목적별 절대 이용자 수는 원본에 없으므로 만들어 쓰지 마세요.',
        'Rasmiy mezonlarda yillik sonlar, o‘sish sabablari va maqsadlar bo‘yicha 4/14/3 baravarlik o‘sish baholanadi; asl grafikda maqsadlar bo‘yicha mutlaq sonlar yo‘q.',
        'The official rubric requires all yearly counts, both causes, and 4×/14×/3× growth by purpose. The source gives no absolute counts by purpose.',
        'Критерии требуют все числа по годам, обе причины и рост в 4/14/3 раза по целям; абсолютные показатели по целям не указаны.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-60', 'writing', 'chart', 'bicycle-users'],
    difficulty: 4,
    source: {
      pdfPage: 44,
      bookPage: 15,
      reference: '제60회 TOPIK II B-홀수형 쓰기 53번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-60-q54',
    groupCode: 'topik-ii-60-writing-54',
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
        '요즘은 아이가 학교에 들어가기 전 어릴 때부터 악기나 외국어 등 여러 가지를 교육하는 경우가 많다. 이러한 조기 교육은 좋은 점도 있지만 문제점도 있다. 아래의 내용을 중심으로 ‘조기 교육의 장점과 문제점’에 대해 자신의 의견을 쓰라.',
      ),
      bulletItems: [
        '조기 교육의 장점은 무엇인가?',
        '조기 교육의 문제점은 무엇인가?',
        '조기 교육에 찬성하는가, 반대하는가? 근거를 들어 자신의 의견을 쓰라.',
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
        '조기 교육의 장점·문제점과 찬반 입장 및 근거를 모두 다루고 문제 문장은 그대로 옮기지 마세요.',
        'Erta ta’limning afzalliklari, kamchiliklari va o‘z munosabatingizni dalillar bilan yoritib, savolni aynan ko‘chirmang.',
        'Cover benefits and problems of early education, then give and justify your position without copying the prompt.',
        'Раскройте плюсы и минусы раннего обучения, затем обоснуйте свою позицию, не переписывая условие.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution(
      localized(
        '공식 모범답안은 재능 발견·학업 경쟁력·세계관 확대를 장점으로, 부모의 강요·스트레스·정서 발달 악영향을 문제점으로 들고 자발성과 내적 동기를 이유로 반대합니다. 찬성 입장도 근거를 갖추면 가능합니다.',
        'Rasmiy namunada iste’dodni aniqlash va o‘qishdagi ustunlik afzallik, majburlash va stress muammo sifatida ko‘riladi; ichki motivatsiya sababli qarshi fikr bildiriladi.',
        'The official sample cites early talent discovery and academic benefits, but parental pressure and stress; it opposes early education on autonomy grounds.',
        'Официальный образец отмечает раннее выявление таланта и учебные преимущества, но также давление и стресс; автор выступает против, подчёркивая собственную мотивацию ребёнка.',
      ),
      '요즘은 학교에 들어가지 않은 아이들에게 다양한 교육을 실시하는 경우가 많다. 어릴 때부터 이루어지는 조기 교육은 좋은 점도 있지만 문제점도 있다.\n\n먼저 조기 교육의 가장 큰 장점은 아이의 재능을 일찍 발견하고 아이가 가진 잠재력을 극대화할 수 있다는 점이다. 예를 들어 예체능계의 유명인 중에는 어릴 때부터 체계적인 교육을 받은 경우가 많다. 또 다른 조기 교육의 장점은 아이의 학업 경쟁력을 높일 수 있다는 점이다. 이외에도 조기 교육에서의 다양한 경험은 아이의 세계관을 넓히는 데 도움이 된다.\n\n그러나 조기 교육은 부모의 강요에 의해 이루어질 수 있다는 문제점이 있다. 이로 인해 아이는 스트레스를 받거나, 억압적인 학습 경험의 반발로 학업에 흥미를 느끼지 못할 수 있다. 또한 조기 교육이 과도하게 이루어질 경우, 아이들의 정서 발달에 부정적인 영향을 미칠 수 있다.\n\n조기 교육의 장점에도 불구하고 위의 문제점을 고려하였을 때 조기 교육을 실시하는 것이 적절하지 않다고 생각한다. 진정한 교육이란 학습자의 자발성과 내적 동기를 전제로 이루어진다고 생각하기 때문이다. 아이는 발달 중에 있고 경험이 적기 때문에 자신이 무엇을 배우고 싶은지 명확히 인지하지 못할 가능성이 크다. 이는 아이의 동기보다 보호자의 바람이 조기 교육에 더 큰 영향을 미치게 되는 이유이기도 하다. 이러한 이유로 조기 교육을 실시하는 것에 반대한다.',
      localized(
        '공식 채점 기준은 장점(재능·경쟁력·경험), 문제점(강요·스트레스·정서 발달), 자신의 찬반 입장과 별도의 근거를 모두 평가합니다. 모범답안의 반대 입장은 유일한 정답이 아닙니다.',
        'Rasmiy mezonlar afzallik, muammo va o‘z pozitsiyasining alohida asoslarini baholaydi; namunadagi qarshi fikr yagona to‘g‘ri javob emas.',
        'Official scoring assesses benefits, problems, and a separately supported position. The sample’s opposing position is not the only acceptable stance.',
        'Критерии оценивают достоинства, проблемы и аргументированную личную позицию; позиция образца не единственно возможная.',
      ),
    ),
    presentation: writingPresentation,
    tags: ['topik-ii', 'round-60', 'writing', 'essay', 'early-education'],
    difficulty: 5,
    source: {
      pdfPage: 44,
      bookPage: 15,
      reference: '제60회 TOPIK II B-홀수형 쓰기 54번',
    },
    version: 1,
    isActive: true,
  },
];

export const TOPIK_II_60_WRITING_SEED: TopikExamSeed = {
  exam: TOPIK_II_60_WRITING_EXAM,
  groups: TOPIK_II_60_WRITING_GROUPS,
  questions: TOPIK_II_60_WRITING_QUESTIONS,
};
