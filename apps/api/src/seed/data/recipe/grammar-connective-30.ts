import { RecipeSeedGrammarSection, t4 } from './recipe-seed.types';

/**
 * 연결어미 Ranking 30 — TOPIK에 자주 출제되는 문법
 *
 * 표제어(form)와 예문(examples)은 한국어 원문 그대로 둔다.
 * 의미·기능(meanings)만 4개 언어로 옮긴다.
 * highlights 는 예문에서 해당 문법이 쓰인 부분 (강조 표시용).
 */
export const CONNECTIVE_30: RecipeSeedGrammarSection = {
  key: 'connective',
  title: t4(
    '연결어미',
    "Bog'lovchi qo'shimchalar",
    'Connective endings',
    'Соединительные окончания',
  ),
  entries: [
    {
      rank: 1,
      form: '-다가',
      meanings: [
        t4(
          '행동 전환: 의지',
          "Harakat o'zgarishi: ixtiyoriy",
          'Shift of action: intentional',
          'Смена действия: намеренная',
        ),
        t4(
          '행동 전환: 의외',
          "Harakat o'zgarishi: kutilmagan",
          'Shift of action: unexpected',
          'Смена действия: неожиданная',
        ),
      ],
      examples: [
        '집에 가다가 시장에 들러서 과자를 샀다.',
        '계단을 뛰어 내려가다가 넘어질 뻔했다.',
      ],
      highlights: ['가다가', '내려가다가'],
    },
    {
      rank: 2,
      form: '-고 나서',
      meanings: [
        t4(
          '순서: 완료',
          'Tartib: tugallanish',
          'Sequence: completion',
          'Порядок: завершение',
        ),
      ],
      examples: ['어제 퇴근하고 나서 친구들과 만났다.'],
      highlights: ['퇴근하고 나서'],
    },
    {
      rank: 3,
      form: '-(으)ㄴ/는데',
      meanings: [
        t4(
          '상반: 대조',
          'Ziddiyat: qarama-qarshilik',
          'Contrast',
          'Противопоставление',
        ),
        t4(
          '설명: 도입',
          'Tushuntirish: kirish',
          'Explanation: lead-in',
          'Пояснение: введение',
        ),
      ],
      examples: [
        '저 식당은 음식값은 저렴한데 맛이 별로 없다.',
        '행사장에 도착했는데 사람들이 많이 와 있었다.',
      ],
      highlights: ['저렴한데', '도착했는데'],
    },
    {
      rank: 4,
      form: '-(으)려고',
      meanings: [t4('목적', 'Maqsad', 'Purpose', 'Цель')],
      examples: ['고향에 가려고 기차표를 미리 예매했다.'],
      highlights: ['가려고'],
    },
    {
      rank: 5,
      form: '-(으)려면',
      meanings: [
        t4(
          '가정: 의도',
          'Faraz: niyat',
          'Condition: intention',
          'Условие: намерение',
        ),
      ],
      examples: ['다음 버스를 타려면 삼십 분을 기다려야 한다.'],
      highlights: ['타려면'],
    },
    {
      rank: 6,
      form: '-느라고',
      meanings: [
        t4(
          '이유: 동시',
          'Sabab: bir vaqtda',
          'Reason: concurrent',
          'Причина: одновременность',
        ),
      ],
      examples: ['시장에서 물건을 사느라고 조금 늦었다.'],
      highlights: ['사느라고'],
    },
    {
      rank: 7,
      form: '-아/어야',
      meanings: [
        t4(
          '조건: 필수',
          'Shart: majburiy',
          'Condition: requirement',
          'Условие: обязательность',
        ),
      ],
      examples: ['이 영화는 예매를 해야 볼 수 있을 정도로 인기가 많다.'],
      highlights: ['해야'],
    },
    {
      rank: 8,
      form: '-(으)ㄹ까 봐(서)',
      meanings: [t4('우려', 'Xavotir', 'Concern', 'Опасение')],
      examples: ['길이 미끄러워서 넘어질까 봐 조심스럽게 걸어왔다.'],
      highlights: ['넘어질까 봐'],
    },
    {
      rank: 9,
      form: '-거나',
      meanings: [
        t4(
          '선택: 택일',
          'Tanlov: bittasi',
          'Choice: alternative',
          'Выбор: один из',
        ),
      ],
      examples: ['나는 시간이 있으면 영화를 보거나 책을 읽는다.'],
      highlights: ['보거나'],
    },
    {
      rank: 10,
      form: '-자마자',
      meanings: [
        t4(
          '순서: 즉시',
          'Tartib: darhol',
          'Sequence: immediate',
          'Порядок: сразу',
        ),
      ],
      examples: ['어제 너무 피곤해서 눕자마자 잠이 들었다.'],
      highlights: ['눕자마자'],
    },
    {
      rank: 11,
      form: '-(으)ㄹ수록',
      meanings: [
        t4(
          '설명: 비례',
          'Tushuntirish: mutanosiblik',
          'Explanation: proportion',
          'Пояснение: пропорция',
        ),
      ],
      examples: ['시간이 지날수록 후회만 많아지는 것 같다.'],
      highlights: ['지날수록'],
    },
    {
      rank: 12,
      form: '-아/어서',
      meanings: [
        t4('이유', 'Sabab', 'Reason', 'Причина'),
        t4(
          '순서: 계기',
          "Tartib: sabab bo'lish",
          'Sequence: trigger',
          'Порядок: повод',
        ),
      ],
      examples: [
        '어제 기침이 나고 열이 나서 모임에 나가지 못했다.',
        '친구와 학교 앞에서 만나서 같이 출발하기로 했다.',
      ],
      highlights: ['나서', '만나서'],
    },
    {
      rank: 13,
      form: '-아/어서 그런지',
      meanings: [
        t4(
          '추측: 이유',
          'Taxmin: sabab',
          'Guess: reason',
          'Предположение: причина',
        ),
      ],
      examples: ['단풍 구경을 갔는데 주말이라서 그런지 사람들이 많았다.'],
      highlights: ['주말이라서 그런지'],
    },
    {
      rank: 14,
      form: '-더니',
      meanings: [
        t4(
          '경험: 관찰',
          'Tajriba: kuzatuv',
          'Experience: observation',
          'Опыт: наблюдение',
        ),
      ],
      examples: ['지난주에는 날씨가 따뜻하더니 갑자기 추워졌다.'],
      highlights: ['따뜻하더니'],
    },
    {
      rank: 15,
      form: '-(으)ㄹ지',
      meanings: [
        t4(
          '선택: 고민',
          'Tanlov: ikkilanish',
          'Choice: deliberation',
          'Выбор: раздумье',
        ),
      ],
      examples: ['친구 결혼식 때 무슨 옷을 입을지 아직 결정하지 못했다.'],
      highlights: ['입을지'],
    },
    {
      rank: 16,
      form: '-(으)면서',
      meanings: [
        t4(
          '행동: 동시',
          'Harakat: bir vaqtda',
          'Action: simultaneous',
          'Действие: одновременность',
        ),
      ],
      examples: ['나는 항상 노래를 들으면서 운전을 한다.'],
      highlights: ['들으면서'],
    },
    {
      rank: 17,
      form: '-(으)니까',
      meanings: [
        t4(
          '경험: 결과',
          'Tajriba: natija',
          'Experience: result',
          'Опыт: результат',
        ),
      ],
      examples: ['여행을 갔다가 집에 돌아오니까 신문이 쌓여 있었다.'],
      highlights: ['돌아오니까'],
    },
    {
      rank: 18,
      form: '-(으)면',
      meanings: [t4('가정', 'Faraz', 'Supposition', 'Предположение')],
      examples: ['바람이 세고 파도가 높으면 수영을 할 수 없다고 한다.'],
      highlights: ['높으면'],
    },
    {
      rank: 19,
      form: '-든지',
      meanings: [
        t4(
          '선택: 무관',
          'Tanlov: farqsiz',
          'Choice: regardless',
          'Выбор: безразлично',
        ),
      ],
      examples: ['무엇을 하든지 최선을 다하는 자세가 필요하다.'],
      highlights: ['하든지'],
    },
    {
      rank: 20,
      form: '-(으)ㄴ/는 데다가',
      meanings: [
        t4(
          '포함: 추가',
          "Qo'shish: qo'shimcha",
          'Inclusion: addition',
          'Включение: добавление',
        ),
      ],
      examples: ['나는 술을 좋아하는 데다가 친구도 많아서 자주 술을 마신다.'],
      highlights: ['좋아하는 데다가'],
    },
    {
      rank: 21,
      form: '-(으)ㄴ/는 대신에',
      meanings: [
        t4(
          '선택: 대체, 보상',
          'Tanlov: almashtirish',
          'Choice: substitution',
          'Выбор: замена',
        ),
      ],
      examples: ['날씨가 안 좋아서 등산을 가는 대신에 영화를 보기로 했다.'],
      highlights: ['가는 대신에'],
    },
    {
      rank: 22,
      form: '-아/어도',
      meanings: [
        t4(
          '가정: 상반',
          'Faraz: ziddiyat',
          'Supposition: concession',
          'Предположение: уступка',
        ),
      ],
      examples: ['아무리 바빠도 운동을 꼭 해야 한다.'],
      highlights: ['바빠도'],
    },
    {
      rank: 23,
      form: '-는 김에',
      meanings: [
        t4(
          '행동: 계기',
          "Harakat: qulay payt",
          'Action: opportunity',
          'Действие: заодно',
        ),
      ],
      examples: ['출장을 가는 김에 거기에 사는 친구를 만나기로 했다.'],
      highlights: ['가는 김에'],
    },
    {
      rank: 24,
      form: '-는 바람에',
      meanings: [
        t4(
          '이유: 돌발',
          'Sabab: kutilmagan',
          'Reason: sudden',
          'Причина: внезапность',
        ),
      ],
      examples: ['배탈이 나는 바람에 하루 종일 아무것도 못 먹었다.'],
      highlights: ['배탈이 나는 바람에'],
    },
    {
      rank: 25,
      form: '-(으)ㄴ 채로',
      meanings: [
        t4(
          '지속: 상태',
          'Davomiylik: holat',
          'Continuation: state',
          'Продолжение: состояние',
        ),
      ],
      examples: ['너무 피곤해서 옷을 입은 채로 그냥 잠이 들었다.'],
      highlights: ['입은 채로'],
    },
    {
      rank: 26,
      form: '-(으)ㄴ/는 덕분에',
      meanings: [
        t4(
          '이유: 긍정',
          'Sabab: ijobiy',
          'Reason: positive',
          'Причина: положительная',
        ),
      ],
      examples: ['직장 동료가 도와준 덕분에 제시간에 보고서를 끝냈다.'],
      highlights: ['도와준 덕분에'],
    },
    {
      rank: 27,
      form: '-도록',
      meanings: [
        t4('목적', 'Maqsad', 'Purpose', 'Цель'),
        t4('정도', 'Daraja', 'Extent', 'Степень'),
      ],
      examples: [
        '꽃이 잘 자라도록 창문 옆에 화분을 두었다.',
        '어제 밤새도록 놀았더니 많이 피곤하다.',
      ],
      highlights: ['자라도록', '밤새도록'],
    },
    {
      rank: 28,
      form: '-기에/길래',
      meanings: [
        t4(
          '이유: 발견',
          'Sabab: kashfiyot',
          'Reason: discovery',
          'Причина: обнаружение',
        ),
      ],
      examples: ['마트에서 과일을 싸게 팔기에 좀 많이 샀다.'],
      highlights: ['팔기에'],
    },
    {
      rank: 29,
      form: '-더라도',
      meanings: [
        t4(
          '가정: 상반',
          'Faraz: ziddiyat',
          'Supposition: concession',
          'Предположение: уступка',
        ),
      ],
      examples: ['무슨 일이 있더라도 내일까지는 일을 끝내야 한다.'],
      highlights: ['있더라도'],
    },
    {
      rank: 30,
      form: '-다가 보면',
      meanings: [
        t4(
          '경험: 반복',
          'Tajriba: takror',
          'Experience: repetition',
          'Опыт: повторение',
        ),
      ],
      examples: ['어려운 일도 자꾸 하다 보면 익숙해지기 마련이다.'],
      highlights: ['하다 보면'],
    },
  ],
  tips: [
    t4(
      "빈칸 앞에 '누가(누구와), 언제, 무엇을(무슨), 어디에, 어떻게(어떤), 어느' 등 의문사가 나오면 뒤의 문법은 〈선택: 무관〉의 '-든지' 아니면 〈선택: 고민〉의 '-(으)ㄹ지', 〈확인〉의 '-(으)ㄴ/는지'라는 점을 기억해 두어야 한다.",
      "Bo'sh joy oldida '누가, 언제, 무엇을, 어디에, 어떻게, 어느' kabi so'roq so'zlari kelsa, keyingi grammatika 〈tanlov: farqsiz〉 '-든지', 〈tanlov: ikkilanish〉 '-(으)ㄹ지' yoki 〈aniqlash〉 '-(으)ㄴ/는지' bo'lishini eslab qoling.",
      "If a question word such as '누가, 언제, 무엇을, 어디에, 어떻게, 어느' appears before the blank, the grammar that follows is '-든지' 〈choice: regardless〉, '-(으)ㄹ지' 〈choice: deliberation〉 or '-(으)ㄴ/는지' 〈confirmation〉.",
      "Если перед пропуском стоит вопросительное слово «누가, 언제, 무엇을, 어디에, 어떻게, 어느», то далее следует '-든지' 〈выбор: безразлично〉, '-(으)ㄹ지' 〈выбор: раздумье〉 или '-(으)ㄴ/는지' 〈уточнение〉.",
    ),
  ],
};
