import { RecipeSeedGrammarSection, t4 } from './recipe-seed.types';

/**
 * 종결어미 Ranking 20 — TOPIK에 자주 출제되는 문법
 *
 * 표제어와 예문은 한국어 원문 그대로, 의미·기능만 4개 언어로 옮긴다.
 */
export const FINAL_20: RecipeSeedGrammarSection = {
  key: 'final',
  title: t4(
    '종결어미',
    "Tugallovchi qo'shimchalar",
    'Final endings',
    'Финальные окончания',
  ),
  entries: [
    {
      rank: 1,
      form: '-아/어 놓다.',
      meanings: [
        t4(
          '유지: 대비',
          'Saqlash: tayyorgarlik',
          'Maintenance: preparation',
          'Сохранение: подготовка',
        ),
      ],
      examples: ['내일은 바쁠 것 같아서 오늘 미리 신청서를 써 놓았다.'],
      highlights: ['써 놓았다.'],
    },
    {
      rank: 2,
      form: '-기로 했다.',
      meanings: [
        t4('계획: 약속', "Reja: va'da", 'Plan: promise', 'План: обещание'),
        t4('계획: 결심', 'Reja: qaror', 'Plan: resolve', 'План: решение'),
      ],
      examples: [
        '나는 이번 방학에 부모님과 같이 설악산에 여행을 가기로 했다.',
        '나는 내일부터 담배를 끊기로 했다.',
      ],
      highlights: ['가기로 했다.', '끊기로 했다.'],
    },
    {
      rank: 3,
      form: '-(으)면 되다.',
      meanings: [
        t4(
          '조건: 충족',
          'Shart: qanoatlanish',
          'Condition: sufficiency',
          'Условие: достаточность',
        ),
      ],
      examples: ['지하철역으로 가려면 이쪽으로 3분쯤 걸어가면 된다.'],
      highlights: ['걸어가면 된다.'],
    },
    {
      rank: 4,
      form: '-게 하다.',
      meanings: [
        t4(
          '명령: 사동',
          'Buyruq: orttirma',
          'Command: causative',
          'Побуждение: каузатив',
        ),
      ],
      examples: ['선생님은 학생들에게 휴대 전화를 끄게 했다.'],
      highlights: ['끄게 했다.'],
    },
    {
      rank: 5,
      form: '-게 되다.',
      meanings: [
        t4(
          '설명: 변화',
          "Tushuntirish: o'zgarish",
          'Explanation: change',
          'Пояснение: изменение',
        ),
      ],
      examples: ['해외 근무를 지원해서 해외 지사에 가게 되었다.'],
      highlights: ['가게 되었다.'],
    },
    {
      rank: 6,
      form: '-(으)ㄴ 적이 있다.',
      meanings: [
        t4('경험: 시간', 'Tajriba: vaqt', 'Experience: past', 'Опыт: время'),
      ],
      examples: ['어렸을 때 부산에서 산 적이 있다.'],
      highlights: ['산 적이 있다.'],
    },
    {
      rank: 7,
      form: '-아/어 있다.',
      meanings: [
        t4(
          '지속: 유지',
          'Davomiylik: saqlanish',
          'Continuation: state',
          'Продолжение: сохранение',
        ),
      ],
      examples: ['공항에 도착하니까 사촌 동생이 마중을 나와 있었다.'],
      highlights: ['나와 있었다.'],
    },
    {
      rank: 8,
      form: '-아/어 가다.',
      meanings: [
        t4(
          '진행: 지속',
          'Davom etish',
          'Progress: ongoing',
          'Продолжение: процесс',
        ),
        t4(
          '진행: 완료',
          'Davom etish: yakunlanish',
          'Progress: nearing completion',
          'Продолжение: завершение',
        ),
      ],
      examples: [
        '꽃에 물을 자주 주는데도 자꾸 시들어 간다.',
        '한국에 온 지 거의 2년이 다 되어 간다.',
      ],
      highlights: ['시들어 간다.', '되어 간다.'],
    },
    {
      rank: 9,
      form: '-(으)ㄴ/는 셈이다.',
      meanings: [
        t4(
          '판단: 유사 결과',
          'Baho: taxminan',
          'Judgement: virtually',
          'Оценка: почти',
        ),
      ],
      examples: ['벌써 12월이니까 올해도 다 지난 셈이다.'],
      highlights: ['지난 셈이다.'],
    },
    {
      rank: 10,
      form: '-아/어 오다.',
      meanings: [
        t4(
          '진행: 완료',
          'Davom etish: hozirgacha',
          'Progress: up to now',
          'Продолжение: до настоящего',
        ),
      ],
      examples: ['나는 3년 전부터 태권도를 배워 왔다.'],
      highlights: ['배워 왔다.'],
    },
    {
      rank: 11,
      form: '-(으)ㄹ 뻔했다.',
      meanings: [
        t4(
          '행동: 직전',
          "Harakat: sal bo'lmasa",
          'Action: nearly',
          'Действие: чуть не',
        ),
      ],
      examples: ['공항에서 하마터면 다른 사람과 가방이 바뀔 뻔했다.'],
      highlights: ['바뀔 뻔했다.'],
    },
    {
      rank: 12,
      form: '-나 보다.',
      meanings: [
        t4(
          '추측: 관찰',
          'Taxmin: kuzatuv',
          'Guess: observation',
          'Предположение: наблюдение',
        ),
      ],
      examples: ['동생 방이 조용한 걸 보니까 방에서 자나 보다.'],
      highlights: ['자나 보다.'],
    },
    {
      rank: 13,
      form: '-기 마련이다.',
      meanings: [
        t4(
          '당위: 예정 사실',
          'Tabiiy natija',
          'Natural consequence',
          'Закономерность',
        ),
      ],
      examples: ['뭐든지 열심히 하다가 보면 실력이 좋아지기 마련이다.'],
      highlights: ['좋아지기 마련이다.'],
    },
    {
      rank: 14,
      form: '-(으)ㄴ/는 모양이다.',
      meanings: [
        t4(
          '추측: 관찰',
          'Taxmin: kuzatuv',
          'Guess: observation',
          'Предположение: наблюдение',
        ),
      ],
      examples: ['사무실 바닥이 깨끗한 걸 보니까 청소를 한 모양이다.'],
      highlights: ['한 모양이다.'],
    },
    {
      rank: 15,
      form: '-아/어 버렸다.',
      meanings: [
        t4(
          '행동: 완료',
          'Harakat: tugallanish',
          'Action: completion',
          'Действие: завершение',
        ),
      ],
      examples: ['살까 말까 고민하던 구두를 그냥 사 버렸다.'],
      highlights: ['사 버렸다.'],
    },
    {
      rank: 16,
      form: '-아/어 보이다.',
      meanings: [
        t4(
          '판단: 주관적',
          "Baho: sub'ektiv",
          'Judgement: subjective',
          'Оценка: субъективная',
        ),
      ],
      examples: ['그 사람은 운동을 해서 그런지 건강해 보인다.'],
      highlights: ['건강해 보인다.'],
    },
    {
      rank: 17,
      form: '-(으)ㄴ/는 척하다.',
      meanings: [
        t4(
          '행동: 가식',
          "Harakat: o'zini tutish",
          'Action: pretence',
          'Действие: притворство',
        ),
      ],
      examples: ['동생이 자꾸 말을 거는데 귀찮아서 못 들은 척했다.'],
      highlights: ['못 들은 척했다.'],
    },
    {
      rank: 18,
      form: '-(으)ㄹ지도 모르다.',
      meanings: [
        t4(
          '추측: 불확실',
          'Taxmin: noaniq',
          'Guess: uncertain',
          'Предположение: неуверенность',
        ),
      ],
      examples: ['아직 시간이 있지만 서두르지 않으면 자리가 없을지도 모른다.'],
      highlights: ['없을지도 모른다.'],
    },
    {
      rank: 19,
      form: '-아/어 두다.',
      meanings: [
        t4(
          '유지: 대비',
          'Saqlash: tayyorgarlik',
          'Maintenance: preparation',
          'Сохранение: подготовка',
        ),
      ],
      examples: ['주말에 영화를 보려고 표를 미리 사 두었다.'],
      highlights: ['사 두었다.'],
    },
    {
      rank: 20,
      form: '-(으)ㄹ 리가 없다.',
      meanings: [
        t4(
          '추측: 불신',
          'Taxmin: ishonchsizlik',
          'Guess: disbelief',
          'Предположение: недоверие',
        ),
      ],
      examples: ['이번 일은 위험해서 사람들이 쉽게 도와줄 리가 없다.'],
      highlights: ['도와줄 리가 없다.'],
    },
  ],
  tips: [],
};
