import {
  TopikChoiceLayout,
  TopikExamType,
  TopikI18nText,
  TopikPublishStatus,
  TopikQuestionType,
  TopikResponseType,
  TopikSection,
  TopikSolution,
  TopikStimulus,
  TopikStimulusKind,
  TopikVisualTemplate,
} from '../../../topik/schemas/topik-content.schema';
import { presentation, textBlocks } from './topik-seed.helpers';
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

export const TOPIK_WRITING_MOCK_1_Q53_IMAGE_URL = '';

const passage = (...paragraphs: string[]): TopikStimulus => ({
  kind: TopikStimulusKind.PASSAGE,
  title: '',
  subtitle: '',
  blocks: textBlocks(...paragraphs),
  bulletItems: [],
  infoItems: [],
  labeledSentences: [],
  givenText: [],
  imageUrl: '',
  imageAlt: '',
  visualVariant: 'official-writing-passage',
});

const solution = ({
  explanation,
  strategy,
  sampleAnswer,
  rubrics,
  hints,
}: {
  explanation: TopikI18nText;
  strategy: TopikI18nText;
  sampleAnswer: string;
  rubrics: TopikI18nText[];
  hints: Array<{ title: TopikI18nText; content: TopikI18nText }>;
}): TopikSolution => ({
  explanation,
  strategy,
  sampleAnswer,
  rubric: rubrics,
  keyClues: [
    {
      key: 'writing-task',
      order: 1,
      label: localized(
        '채점 핵심',
        'Baholash mezoni',
        'Scoring focus',
        'Критерий оценки',
      ),
      explanation: rubrics[0],
      targetSegmentKeys: [],
    },
  ],
  steps: [
    {
      key: 'step-plan',
      order: 1,
      title: localized(
        '요구 사항 정리',
        'Talablarni ajrating',
        'Identify the requirements',
        'Выделите требования',
      ),
      explanation: strategy,
      targetSegmentKeys: [],
    },
    {
      key: 'step-write',
      order: 2,
      title: localized(
        '문장 연결과 검토',
        'Bog‘lang va tekshiring',
        'Connect and review',
        'Свяжите и проверьте',
      ),
      explanation,
      targetSegmentKeys: [],
    },
  ],
  hints: hints.map((hint, index) => ({
    key: `hint-${index + 1}`,
    level: index + 1,
    title: hint.title,
    content: hint.content,
    examples: [],
    targetSegmentKeys: [],
  })),
  choiceNotes: [],
});

export const TOPIK_WRITING_MOCK_1_EXAM: TopikSeedExam = {
  code: 'topik-ii-writing-mock-1-2025',
  title: localized(
    'TOPIK II 쓰기 실전모의고사 제1회',
    'TOPIK II yozish sinov imtihoni 1',
    'TOPIK II Writing Mock Test 1',
    'TOPIK II: пробный тест по письму 1',
  ),
  description: localized(
    'TOPIK II 쓰기 51번부터 54번까지 실제 시험 형식으로 연습합니다.',
    'TOPIK II yozish bo‘limining 51–54-savollarini haqiqiy imtihon shaklida mashq qiling.',
    'Practice TOPIK II writing questions 51–54 in the official test format.',
    'Практика заданий 51–54 раздела письма TOPIK II в формате экзамена.',
  ),
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.WRITING,
  year: 2025,
  round: 1,
  durationMinutes: 50,
  totalQuestions: 4,
  totalPoints: 100,
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '2026 TOPIK II 한 번에 통과하기',
    edition: '2026',
    publisher: '시대고시기획',
    reference: '제1회 실전 모의고사 쓰기 51~54번',
  },
  publishedAt: new Date('2025-01-01T00:00:00.000Z'),
  isActive: true,
};

export const TOPIK_WRITING_MOCK_1_GROUPS: TopikSeedGroup[] = [
  {
    code: 'writing-51-52',
    order: 1,
    startNumber: 51,
    endNumber: 52,
    instruction: textBlocks(
      '[51~52] 다음 글의 ㉠과 ㉡에 알맞은 말을 각각 쓰십시오. (각 10점)',
    ),
    pointsPerQuestion: 10,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
  {
    code: 'writing-53',
    order: 2,
    startNumber: 53,
    endNumber: 53,
    instruction: textBlocks(
      '[53] 자료를 설명하는 글을 200~300자로 쓰십시오. 단, 글의 제목은 쓰지 마십시오. (30점)',
    ),
    pointsPerQuestion: 30,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
  {
    code: 'writing-54',
    order: 3,
    startNumber: 54,
    endNumber: 54,
    instruction: textBlocks(
      '[54] 주어진 내용을 참고하여 600~700자로 글을 쓰십시오. 단, 문제를 그대로 옮겨 쓰지 마십시오. (50점)',
    ),
    pointsPerQuestion: 50,
    presentation: writingPresentation,
    version: 1,
    isActive: true,
  },
];

const questions: TopikSeedQuestion[] = [
  {
    code: 'topik-ii-writing-mock-1-2025-q51',
    groupCode: 'writing-51-52',
    number: 51,
    order: 1,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks('다음 글의 ㉠과 ㉡에 알맞은 말을 각각 쓰십시오.'),
    stimulus: passage(
      '수빈 씨, 오늘 만나서 정말 반가웠습니다.',
      '오늘 함께 보낸 시간이 너무 좋아서 저는 꼭 수빈 씨를 다시 만나고 싶어요.',
      '저는 다음 주 수요일과 목요일 저녁에 시간이 있는데 수빈 씨는 [[blank:field-a|( ㉠ )]]? 다음 약속을 정하면 좋겠습니다.',
      '수빈 씨가 중국 음식을 좋아한다고 했으니까 제가 [[blank:field-b|( ㉡ )]]. 그 식당에서 음식을 먹으면서 즐거운 시간을 보냈으면 좋겠습니다.',
    ),
    writingConfig: {
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
        '앞뒤 문맥과 높임말을 유지하며 한 문장씩 완성하세요.',
        'Oldingi va keyingi mazmun hamda hurmat uslubini saqlab, har bir gapni tugating.',
        'Complete each sentence while preserving context and honorific style.',
        'Завершите каждое предложение, сохраняя контекст и вежливый стиль.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution({
      explanation: localized(
        '㉠은 가능한 시간을 묻는 높임말, ㉡은 중국 식당을 미리 준비하겠다는 약속이 필요합니다.',
        '㉠ uchun bo‘sh vaqtni hurmat bilan so‘rash, ㉡ uchun esa xitoy restoranini oldindan tayyorlash va’dasi kerak.',
        '㉠ needs a polite question about availability, and ㉡ needs a promise to arrange a Chinese restaurant.',
        'В ㉠ нужен вежливый вопрос о свободном времени, а в ㉡ — обещание заранее организовать посещение китайского ресторана.',
      ),
      strategy: localized(
        '빈칸 뒤의 물음표와 앞 문장의 이유 관계를 먼저 확인하세요.',
        'Avval bo‘shliqdan keyingi so‘roq belgisi va oldingi gapdagi sabab munosabatini tekshiring.',
        'Check the question mark after the first blank and the reason in the preceding sentence.',
        'Сначала проверьте вопросительный знак после первого пропуска и причинную связь в предыдущем предложении.',
      ),
      sampleAnswer: '㉠ 언제 시간이 되세요?\n㉡ 중국 식당을 예약해 놓겠습니다',
      rubrics: [
        localized(
          '㉠은 시간을 묻는 표현과 높임말, ㉡은 중국 식당 및 예약 표현이 포함되어야 합니다.',
          '㉠ vaqtni so‘rash va hurmat shaklini, ㉡ esa xitoy restorani va band qilish ma’nosini o‘z ichiga olishi kerak.',
          '㉠ should ask about time politely; ㉡ should include the Chinese restaurant and reservation idea.',
          'В ㉠ должен быть вежливый вопрос о времени; в ㉡ — идея китайского ресторана и бронирования.',
        ),
      ],
      hints: [
        {
          title: localized(
            '문장 기능 확인',
            'Gap vazifasini toping',
            'Identify sentence function',
            'Определите функцию предложения',
          ),
          content: localized(
            '㉠ 뒤에는 물음표가 있으므로 가능한 시간을 묻습니다.',
            '㉠ dan keyin so‘roq belgisi bor, shuning uchun bo‘sh vaqt so‘raladi.',
            'A question mark follows ㉠, so ask about available time.',
            'После ㉠ стоит вопросительный знак, поэтому нужно спросить о свободном времени.',
          ),
        },
        {
          title: localized(
            '핵심 명사 연결',
            'Asosiy otlarni bog‘lang',
            'Connect key nouns',
            'Свяжите ключевые слова',
          ),
          content: localized(
            '중국 음식과 그 식당이 이어지므로 식당 예약 표현이 자연스럽습니다.',
            'Xitoy taomi va o‘sha restoran bog‘langan, shuning uchun restoran band qilish tabiiy.',
            'Chinese food and that restaurant connect naturally to making a reservation.',
            'Китайская еда и этот ресторан естественно связаны с бронированием.',
          ),
        },
      ],
    }),
    presentation: writingPresentation,
    tags: ['topik-ii', 'writing', 'sentence-completion'],
    difficulty: 2,
    source: {
      pdfPage: 253,
      bookPage: 240,
      reference: '제1회 실전 모의고사 쓰기 51번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-mock-1-2025-q52',
    groupCode: 'writing-51-52',
    number: 52,
    order: 2,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    responseType: TopikResponseType.WRITTEN,
    points: 10,
    prompt: textBlocks('다음 글의 ㉠과 ㉡에 알맞은 말을 각각 쓰십시오.'),
    stimulus: passage(
      '더울 때 창문을 열어 놓아도 금방 시원해지지 않을 때가 있다. 이런 경우에는 [[blank:field-a|( ㉠ )]].',
      '창문으로 들어온 바람이 빠져나갈 수 있는 곳이 있으면 훨씬 많은 바람이 들어오기 때문이다.',
      '그러므로 만약에 선풍기가 있다면 바람이 빠져나갈 방향으로 [[blank:field-b|( ㉡ )]].',
    ),
    writingConfig: {
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
        '원인과 결론을 연결하는 표현을 사용해 두 문장을 완성하세요.',
        'Sabab va xulosani bog‘laydigan ifodalar bilan ikki gapni tugating.',
        'Complete both sentences with expressions that connect cause and conclusion.',
        'Завершите оба предложения выражениями, связывающими причину и вывод.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution({
      explanation: localized(
        '㉠은 바람이 빠져나갈 통로를 만드는 행동, ㉡은 선풍기를 그 방향으로 작동시키는 행동이 필요합니다.',
        '㉠ havoning chiqish yo‘lini yaratish, ㉡ esa ventilyatorni shu tomonga ishlatish harakatini talab qiladi.',
        '㉠ should create an exit for air, and ㉡ should operate the fan toward that exit.',
        'В ㉠ нужно создать выход для воздуха, а в ㉡ — направить вентилятор к этому выходу.',
      ),
      strategy: localized(
        '가운데 문장의 이유를 기준으로 앞에는 방법, 뒤에는 구체적인 행동을 쓰세요.',
        'O‘rtadagi sababga tayangan holda oldin usulni, keyin aniq harakatni yozing.',
        'Use the middle sentence as the reason: write the method first and the specific action second.',
        'Опирайтесь на среднее предложение: сначала укажите способ, затем конкретное действие.',
      ),
      sampleAnswer:
        '㉠ 방문을 열어 놓으면 금방 시원해진다\n㉡ 선풍기를 틀어 놓는 것이 좋다',
      rubrics: [
        localized(
          '㉠은 방문을 열어 공기가 빠져나가게 하는 내용, ㉡은 선풍기를 켜거나 트는 내용이어야 합니다.',
          '㉠ eshikni ochib havoni chiqarish, ㉡ esa ventilyatorni yoqish mazmunida bo‘lishi kerak.',
          '㉠ should open the door to let air escape; ㉡ should turn on the fan.',
          'В ㉠ нужно открыть дверь для выхода воздуха; в ㉡ — включить вентилятор.',
        ),
      ],
      hints: [
        {
          title: localized(
            '원인 문장 활용',
            'Sabab gapidan foydalaning',
            'Use the reason sentence',
            'Используйте предложение-причину',
          ),
          content: localized(
            '바람이 빠져나갈 곳이 필요하므로 다른 문을 여는 행동을 떠올리세요.',
            'Havo chiqadigan joy kerak, shuning uchun boshqa eshikni ochishni o‘ylang.',
            'Air needs an exit, so think of opening another door.',
            'Воздуху нужен выход, поэтому подумайте об открытии другой двери.',
          ),
        },
        {
          title: localized(
            '선풍기 방향 확인',
            'Ventilyator yo‘nalishini tekshiring',
            'Check the fan direction',
            'Проверьте направление вентилятора',
          ),
          content: localized(
            '선풍기는 바람이 빠져나가는 방향으로 켜 두는 것이 핵심입니다.',
            'Ventilyatorni havo chiqadigan tomonga yoqib qo‘yish muhim.',
            'The key is to run the fan toward the direction where air exits.',
            'Главное — направить работающий вентилятор туда, куда выходит воздух.',
          ),
        },
      ],
    }),
    presentation: writingPresentation,
    tags: ['topik-ii', 'writing', 'sentence-completion'],
    difficulty: 2,
    source: {
      pdfPage: 253,
      bookPage: 240,
      reference: '제1회 실전 모의고사 쓰기 52번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-mock-1-2025-q53',
    groupCode: 'writing-53',
    number: 53,
    order: 3,
    type: TopikQuestionType.WRITING_DATA_DESCRIPTION,
    responseType: TopikResponseType.WRITTEN,
    points: 30,
    prompt: textBlocks(
      '다음은 ‘해외여행 국가 및 해외여행 총 지출액 변화’에 대한 자료입니다. 이 내용을 200~300자의 글로 쓰십시오. 단, 글의 제목은 쓰지 마십시오.',
    ),
    stimulus: {
      kind: TopikStimulusKind.CHART,
      title: '해외여행 국가 및 해외여행 총 지출액 변화',
      subtitle: '조사 기관: 한국관광공사',
      blocks: [],
      bulletItems: [],
      infoItems: [],
      labeledSentences: [],
      givenText: [],
      chart: {
        title: '해외 여행객들이 많이 가는 국가',
        subtitle: '중국·일본 여행객은 지난해 48%에서 22%로 감소',
        headers: ['비율·금액', '비고'],
        rows: [
          { label: '동남아시아', values: ['47%', ''], numericValues: [47] },
          {
            label: '중국·일본',
            values: ['22%', '지난해 48%'],
            numericValues: [22, 48],
          },
          { label: '유럽', values: ['16%', ''], numericValues: [16] },
          { label: '미국', values: ['9%', ''], numericValues: [9] },
          { label: '기타', values: ['6%', ''], numericValues: [6] },
          {
            label: '2020년 총 지출액',
            values: ['4,300억 달러', ''],
            numericValues: [4300],
          },
          {
            label: '2021년 총 지출액',
            values: ['3,100억 달러', ''],
            numericValues: [3100],
          },
          {
            label: '감소 원인',
            values: ['무역 분쟁', '전염병 확산으로 인한 경기 침체'],
            numericValues: [],
          },
        ],
        unit: '%, 억 달러',
        sourceNote: '중국·일본과의 무역 분쟁 · 전염병 확산으로 인한 경기 침체',
        variant: 'writing-survey',
      },
      imageUrl: TOPIK_WRITING_MOCK_1_Q53_IMAGE_URL,
      imageAlt: 'TOPIK II 쓰기 53번 해외여행 국가 및 총 지출액 변화 자료',
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
        '국가별 비율, 지출액 변화, 감소 원인을 빠짐없이 연결하세요.',
        'Davlatlar ulushi, xarajat o‘zgarishi va kamayish sabablarini to‘liq bog‘lang.',
        'Connect the country shares, spending change, and causes of the decrease.',
        'Свяжите доли стран, изменение расходов и причины снижения.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution({
      explanation: localized(
        '자료의 핵심 수치와 변화 방향을 비교하고 마지막에 원인을 설명해야 합니다.',
        'Asosiy raqamlar va o‘zgarish yo‘nalishini taqqoslab, oxirida sabablarni tushuntirish kerak.',
        'Compare the key figures and trends, then explain the causes at the end.',
        'Сравните ключевые показатели и направления изменений, затем объясните причины.',
      ),
      strategy: localized(
        '조사 소개 → 국가별 비율 → 총 지출액 변화 → 원인 순서로 네 문단을 구성하세요.',
        'Kirish → davlatlar ulushi → jami xarajat o‘zgarishi → sabablar tartibida yozing.',
        'Organize the response as survey introduction → country shares → spending change → causes.',
        'Постройте ответ так: описание исследования → доли стран → изменение расходов → причины.',
      ),
      sampleAnswer:
        '한국관광공사에서 해외 여행객들이 많이 가는 국가와 해외여행 총 지출액을 조사했다. 그 결과 동남아시아가 47%로 가장 많은 비중을 차지했고 중국이나 일본은 22%로 지난해 48%에 비해 크게 줄었다. 유럽과 미국은 각 16%, 9%로 그 뒤를 이었다. 해외여행 총 지출액은 2020년 4,300억 달러에서 2021년 3,100억 달러로 대폭 감소했다. 이렇게 중국이나 일본으로 가는 여행객이 크게 감소한 이유는 두 나라와 한국이 무역 분쟁을 벌이고 있기 때문인 것으로 보이고, 해외여행 총 지출액이 감소한 것은 전염병 확산으로 인한 경기 침체 때문인 것으로 분석된다.',
      rubrics: [
        localized(
          '국가별 해외 여행객 비율과 중국·일본의 전년 대비 감소를 제시해야 합니다.',
          'Davlatlar bo‘yicha sayohatchilar ulushi va Xitoy·Yaponiyaning o‘tgan yilga nisbatan kamayishini ko‘rsating.',
          'Present the country shares and the year-over-year decrease for China and Japan.',
          'Укажите доли стран и снижение показателя Китая и Японии по сравнению с прошлым годом.',
        ),
        localized(
          '2020년과 2021년 총 지출액을 비교하고 무역 분쟁과 경기 침체를 원인으로 연결해야 합니다.',
          '2020 va 2021-yil xarajatlarini taqqoslab, savdo mojarosi va iqtisodiy pasayishni sabab sifatida bog‘lang.',
          'Compare 2020 and 2021 spending and connect the decline to trade disputes and recession.',
          'Сравните расходы 2020 и 2021 годов и свяжите снижение с торговыми спорами и спадом экономики.',
        ),
      ],
      hints: [
        {
          title: localized(
            '가장 큰 변화 찾기',
            'Eng katta o‘zgarishni toping',
            'Find the largest change',
            'Найдите самое большое изменение',
          ),
          content: localized(
            '중국·일본 비율이 48%에서 22%로 감소한 점을 먼저 표시하세요.',
            'Xitoy·Yaponiya ulushi 48% dan 22% ga tushganini avval belgilang.',
            'First note that China and Japan fell from 48% to 22%.',
            'Сначала отметьте снижение Китая и Японии с 48% до 22%.',
          ),
        },
        {
          title: localized(
            '수치와 원인 연결',
            'Raqam va sababni bog‘lang',
            'Connect figures and causes',
            'Свяжите цифры и причины',
          ),
          content: localized(
            '지출액 감소 뒤에 무역 분쟁과 전염병으로 인한 경기 침체를 설명하세요.',
            'Xarajat kamayishidan keyin savdo mojarosi va epidemiya sababli iqtisodiy pasayishni tushuntiring.',
            'After the spending decline, explain the trade dispute and epidemic-driven recession.',
            'После снижения расходов объясните торговый спор и спад из-за эпидемии.',
          ),
        },
      ],
    }),
    presentation: writingPresentation,
    tags: ['topik-ii', 'writing', 'data-description', 'chart'],
    difficulty: 4,
    source: {
      pdfPage: 254,
      bookPage: 241,
      reference: '제1회 실전 모의고사 쓰기 53번',
    },
    version: 1,
    isActive: true,
  },
  {
    code: 'topik-ii-writing-mock-1-2025-q54',
    groupCode: 'writing-54',
    number: 54,
    order: 4,
    type: TopikQuestionType.WRITING_ARGUMENTATIVE_ESSAY,
    responseType: TopikResponseType.WRITTEN,
    points: 50,
    prompt: textBlocks(
      '다음을 참고하여 600~700자로 글을 쓰십시오. 단, 문제를 그대로 옮겨 쓰지 마십시오.',
    ),
    stimulus: passage(
      '우리 사회는 학교 폭력 문제를 해결하기 위해 오래 전부터 노력해 왔다. 그러나 여전히 학교 폭력은 계속되고 있고 확실한 해결책도 나오지 않고 있다. 이렇게 학교 폭력의 문제가 없어지지 않는 이유를 분석하고 이에 대한 해결책을 제시하라.',
      '• 학교 폭력을 해결하기 위해 그동안 어떤 노력을 해 왔는가?',
      '• 이런 노력에도 불구하고 문제가 해결되지 않은 이유는 무엇인가?',
      '• 학교 폭력을 예방할 수 있는 좀 더 확실하고 효과적인 해결책은 무엇인가?',
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
        '현재의 노력, 해결되지 않은 이유, 더 효과적인 해결책을 균형 있게 논증하세요.',
        'Hozirgi sa’y-harakatlar, muammo hal bo‘lmagan sabablar va samaraliroq yechimlarni muvozanatli asoslang.',
        'Build a balanced argument covering current efforts, why they failed, and stronger solutions.',
        'Сбалансированно раскройте предпринятые меры, причины их неэффективности и более действенные решения.',
      ),
    },
    choices: [],
    correctChoiceKey: '',
    solution: solution({
      explanation: localized(
        '세 가지 과제를 모두 다루고 원인과 해결책이 논리적으로 연결되어야 고득점을 받을 수 있습니다.',
        'Yuqori ball uchun uch vazifaning barchasini yoritib, sabab va yechimlarni mantiqan bog‘lash kerak.',
        'A high-scoring response addresses all three tasks and links causes to solutions logically.',
        'Для высокого балла необходимо раскрыть все три пункта и логично связать причины с решениями.',
      ),
      strategy: localized(
        '서론 1문단, 기존 노력과 한계 1문단, 근본 원인 1문단, 해결책과 결론 1문단으로 계획하세요.',
        'Kirish, hozirgi choralar va cheklovlar, asosiy sabablar, yechim va xulosa tarzida to‘rt paragraf tuzing.',
        'Plan four paragraphs: introduction, current efforts and limits, root causes, solutions and conclusion.',
        'Спланируйте четыре абзаца: введение, принятые меры и их ограничения, коренные причины, решения и вывод.',
      ),
      sampleAnswer:
        '우리 사회는 학교 폭력 문제를 해결하기 위해 여러 방면에서 노력해 왔다. 정부는 학교 폭력 가해자들의 처벌을 강화하고, 경찰은 학교 폭력과 관련된 상담 전화 117을 만들어 피해자들이 더 쉽게 신고를 할 수 있도록 했다. 또 학교에서는 학교 폭력 예방 교육을 실시하고 학교폭력대책자치위원회를 통해 가해자는 처벌하고 피해자는 보호하려고 노력하고 있다. 그러나 이러한 노력에도 불구하고 학교 폭력은 계속되고 있다. 가해자에 대한 처벌을 강화했다고는 하지만 그들이 미성년자라는 이유로 실제로는 생각보다 처벌이 가볍기 때문이다. 이는 다시 신고자에 대한 보복으로 이어지기 쉽기 때문에 신고를 꺼리는 피해자도 많다. 무엇보다도 처벌은 이미 문제 상황이 발생한 이후 행동에 제한을 두는 것이므로 문제를 예방할 수 있는 본질적인 해결책이 되지 못한다. 따라서 학교 폭력 문제를 해결하기 위해서는 단순히 가해자 처벌에만 집중해서는 안 된다. 가해자가 문제를 일으키는 근본적인 원인을 제거할 수 있도록 전문 상담 프로그램에 대한 연구를 더 깊이 하고, 이를 바탕으로 한 교육 정책을 마련해야 한다. 또한 사건이 발생했을 경우 가해자로부터 피해자를 완전히 격리한다는 보장이 되어야 한다. 그러면 피해자가 안심하고 학교 폭력이 발생하는 즉시 신고를 할 수 있을 것이고, 이런 신고는 또 다른 학교 폭력을 예방하는 하나의 해결책이 될 수 있을 것이다.',
      rubrics: [
        localized(
          '정부·경찰·학교의 기존 노력과 처벌 중심 정책의 한계를 구체적으로 제시해야 합니다.',
          'Hukumat, politsiya va maktab choralarini hamda jazoga tayangan siyosat cheklovlarini aniq ko‘rsating.',
          'Describe government, police, and school efforts and the limits of punishment-focused policies.',
          'Конкретно опишите меры правительства, полиции и школы, а также ограничения политики, основанной на наказании.',
        ),
        localized(
          '가해자 상담·교육 정책과 피해자 격리 보호 등 예방 중심 해결책을 제안해야 합니다.',
          'Tajovuzkor uchun maslahat va ta’lim, jabrlanuvchini himoyalash kabi profilaktik yechimlarni taklif qiling.',
          'Propose prevention-focused solutions such as counseling, education, and victim protection.',
          'Предложите профилактические решения: консультации, образовательные меры и защиту пострадавших.',
        ),
      ],
      hints: [
        {
          title: localized(
            '세 가지 과제 분리',
            'Uch vazifani ajrating',
            'Separate the three tasks',
            'Разделите три задачи',
          ),
          content: localized(
            '기존 노력, 실패 원인, 해결책을 메모한 뒤 각 문단에 하나씩 배치하세요.',
            'Hozirgi choralar, muvaffaqiyatsizlik sababi va yechimni yozib, har birini alohida paragrafga joylang.',
            'Note current efforts, reasons for failure, and solutions, then assign each to a paragraph.',
            'Запишите меры, причины неудачи и решения, затем посвятите каждому отдельный абзац.',
          ),
        },
        {
          title: localized(
            '해결책을 원인에 연결',
            'Yechimni sababga bog‘lang',
            'Link solutions to causes',
            'Свяжите решения с причинами',
          ),
          content: localized(
            '가벼운 처벌과 신고 불안을 원인으로 썼다면 상담·교육과 피해자 보호를 해결책으로 연결하세요.',
            'Yengil jazo va xabar berish qo‘rquvini sabab deb yozsangiz, maslahat, ta’lim va jabrlanuvchi himoyasini yechim qiling.',
            'If weak punishment and fear of reporting are causes, connect them to counseling, education, and victim protection.',
            'Если причины — мягкое наказание и страх сообщать, свяжите их с консультациями, обучением и защитой жертв.',
          ),
        },
      ],
    }),
    presentation: writingPresentation,
    tags: ['topik-ii', 'writing', 'argumentative-essay'],
    difficulty: 5,
    source: {
      pdfPage: 254,
      bookPage: 241,
      reference: '제1회 실전 모의고사 쓰기 54번',
    },
    version: 1,
    isActive: true,
  },
];

export const TOPIK_WRITING_MOCK_1_SEED: TopikExamSeed = {
  exam: TOPIK_WRITING_MOCK_1_EXAM,
  groups: TOPIK_WRITING_MOCK_1_GROUPS,
  questions,
};
