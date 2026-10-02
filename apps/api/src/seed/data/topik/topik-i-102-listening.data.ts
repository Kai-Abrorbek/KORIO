import {
  TopikChoiceLayout,
  TopikExamType,
  TopikPublishStatus,
  TopikQuestionType,
  TopikSection,
  TopikVisualTemplate,
} from '../../../topik/schemas/topik-content.schema';
import { presentation, textBlocks } from './topik-seed.helpers';
import {
  TopikExamSeed,
  TopikSeedExam,
  TopikSeedGroup,
  TopikSeedQuestion,
} from './topik-seed.types';
import {
  TopikAnswerKey,
  TopikChoiceTuple,
  topikI37Choices,
  topikI37Solution,
} from './topik-i-37.helpers';
import { TOPIK_I_102_LISTENING_AUDIO } from './topik-i-102-listening.scripts';

interface ListeningQuestionInput {
  number: number;
  points: number;
  type: TopikQuestionType;
  choices: TopikChoiceTuple;
  answer: TopikAnswerKey;
  prompt?: string;
  visualAssetKeys?: TopikChoiceTuple;
}

const groupCodeFor = (number: number) => {
  if (number <= 24)
    return `topik-i-102-listening-${String(number).padStart(2, '0')}`;
  const start = number % 2 === 1 ? number : number - 1;
  return `topik-i-102-listening-${start}-${start + 1}`;
};

const instructionFor = (number: number) => {
  if (number <= 4)
    return '[1~4] 다음을 듣고 <보기>와 같이 물음에 맞는 대답을 고르십시오.';
  if (number <= 6)
    return '[5~6] 다음을 듣고 <보기>와 같이 이어지는 말을 고르십시오.';
  if (number <= 10)
    return '[7~10] 여기는 어디입니까? <보기>와 같이 알맞은 것을 고르십시오.';
  if (number <= 14)
    return '[11~14] 다음은 무엇에 대해 말하고 있습니까? <보기>와 같이 알맞은 것을 고르십시오.';
  if (number <= 16)
    return '[15~16] 다음을 듣고 가장 알맞은 그림을 고르십시오. (각 4점)';
  if (number <= 21)
    return '[17~21] 다음을 듣고 <보기>와 같이 대화 내용과 같은 것을 고르십시오. (각 3점)';
  if (number <= 24)
    return '[22~24] 다음을 듣고 여자의 중심 생각을 고르십시오. (각 3점)';
  const start = number % 2 === 1 ? number : number - 1;
  return `[${start}~${start + 1}] 다음을 듣고 물음에 답하십시오.`;
};

const bookPageFor = (number: number) => {
  if (number <= 4) return 1;
  if (number <= 8) return 2;
  if (number <= 14) return 3;
  if (number <= 16) return 4;
  if (number <= 20) return 5;
  if (number <= 24) return 6;
  if (number <= 28) return 7;
  return 8;
};

// 제102회 TOPIK I B-홀수형 시험지 PDF pp. 3–10, 정답·배점표 p. 1, 통합 대본 pp. 1–12.
const rawQuestions: ListeningQuestionInput[] = [
  {
    number: 1,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 우산이 있어요.',
      '네, 우산이 아니에요.',
      '아니요, 우산이에요.',
      '아니요, 우산이 작아요.',
    ],
    answer: '1',
  },
  {
    number: 2,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 신문이 없어요.',
      '네, 신문을 싫어해요.',
      '아니요, 신문을 안 봐요.',
      '아니요, 신문이 재미있어요.',
    ],
    answer: '3',
  },
  {
    number: 3,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '혼자 먹었어요.',
      '불고기를 먹었어요.',
      '저녁에 먹었어요.',
      '학교에서 먹었어요.',
    ],
    answer: '2',
  },
  {
    number: 4,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: ['두 개예요.', '네 시예요.', '팔 일이에요.', '수요일이에요.'],
    answer: '3',
  },
  {
    number: 5,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: ['미안해요.', '반가워요.', '실례해요.', '아니에요.'],
    answer: '4',
  },
  {
    number: 6,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: ['그렇습니다.', '알겠습니다.', '환영합니다.', '오랜만입니다.'],
    answer: '2',
  },
  {
    number: 7,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['빵집', '서점', '옷 가게', '신발 가게'],
    answer: '3',
  },
  {
    number: 8,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['꽃집', '은행', '정류장', '지하철역'],
    answer: '3',
  },
  {
    number: 9,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['식당', '약국', '미용실', '도서관'],
    answer: '2',
  },
  {
    number: 10,
    points: 4,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['극장', '시장', '우체국', '사진관'],
    answer: '4',
  },
  {
    number: 11,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['가족', '나라', '시간', '약속'],
    answer: '2',
  },
  {
    number: 12,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['직업', '이름', '날씨', '휴일'],
    answer: '1',
  },
  {
    number: 13,
    points: 4,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['건강', '계획', '방학', '운동'],
    answer: '4',
  },
  {
    number: 14,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['값', '집', '가구', '고향'],
    answer: '2',
  },
  {
    number: 15,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '남자가 계산대에서 우유를 받고 있습니다.',
      '여자가 남자에게 우유가 있는 쪽을 가리켜 알려 줍니다.',
      '남자가 여자와 함께 앉아 우유를 마시고 있습니다.',
      '남자가 진열대의 우유를 집어 들고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-i-102-q15-c1',
      'topik-i-102-q15-c2',
      'topik-i-102-q15-c3',
      'topik-i-102-q15-c4',
    ],
    answer: '2',
  },
  {
    number: 16,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '여자와 남자가 크기가 다른 여행 가방 두 개를 앞에 두고 이야기합니다.',
      '여자가 열린 큰 가방에 짐을 넣고 남자가 가방을 건넵니다.',
      '여자가 배낭과 여행 가방을 들고 집을 나갑니다.',
      '남자가 여자에게 큰 배낭을 건네고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-i-102-q16-c1',
      'topik-i-102-q16-c2',
      'topik-i-102-q16-c3',
      'topik-i-102-q16-c4',
    ],
    answer: '1',
  },
  {
    number: 17,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 고향에 자주 갑니다.',
      '남자는 방학에 가족을 못 만났습니다.',
      '여자는 방학에 영어 공부를 했습니다.',
      '여자는 이번 방학에 여행을 가지 못했습니다.',
    ],
    answer: '3',
  },
  {
    number: 18,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '인주식당은 메뉴가 많습니다.',
      '인주식당은 예약을 받지 않습니다.',
      '남자는 인주식당의 위치를 모릅니다.',
      '여자는 지난주에 인주식당에 갔습니다.',
    ],
    answer: '4',
  },
  {
    number: 19,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 운전에 익숙해졌습니다.',
      '남자는 운전을 할 줄 모릅니다.',
      '여자는 내일부터 회사에 운전해서 갈 겁니다.',
      '남자는 여자가 운전하는 것을 본 적이 없습니다.',
    ],
    answer: '3',
  },
  {
    number: 20,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '이 가수는 아주 유명합니다.',
      '여자는 이 가수를 좋아하지 않습니다.',
      '여자는 이 가수를 직접 본 적이 있습니다.',
      '이 가수는 한강공원에서 공연을 했습니다.',
    ],
    answer: '4',
  },
  {
    number: 21,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 지금 505호에 있습니다.',
      '오후에는 수영장에 못 들어갑니다.',
      '호텔에서 수영복을 살 수 없습니다.',
      '수영복을 빌리려면 돈을 내야 합니다.',
    ],
    answer: '4',
  },
  {
    number: 22,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '연필을 사용하는 것을 좋아합니다.',
      '오래 기억하려면 메모를 해야 합니다.',
      '여러 종류의 연필이 있으면 좋겠습니다.',
      '일기를 자주 쓰는 습관을 가지고 싶습니다.',
    ],
    answer: '1',
  },
  {
    number: 23,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '꽃다발을 빨리 찾으러 가고 싶습니다.',
      '다양한 꽃으로 만든 꽃다발이 좋습니다.',
      '꽃다발을 똑같이 만드는 것이 어렵습니다.',
      '같은 꽃다발을 하나 더 주문하고 싶습니다.',
    ],
    answer: '4',
  },
  {
    number: 24,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '침대는 직접 보고 사야 합니다.',
      '침대는 자주 바꿀 필요가 있습니다.',
      '가구는 디자인이 예쁜 것이 좋습니다.',
      '가구는 인터넷으로 사는 게 편합니다.',
    ],
    answer: '1',
  },
  {
    number: 25,
    points: 3,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '여자가 왜 이 이야기를 하고 있는지 고르십시오.',
    choices: [
      '청소 일정을 안내하려고',
      '청소 신청 방법을 알리려고',
      '청소가 필요한 이유를 설명하려고',
      '청소 날짜가 바뀐 것을 이야기하려고',
    ],
    answer: '1',
  },
  {
    number: 26,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '주차장 청소는 오전에 끝납니다.',
      '주차장 청소는 이번 주에 합니다.',
      '회사 근처에 야외 주차장이 있습니다.',
      '청소할 때 지하 주차장에 들어갈 수 있습니다.',
    ],
    answer: '3',
  },
  {
    number: 27,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    prompt: '두 사람이 무엇에 대해 이야기를 하고 있는지 고르십시오.',
    choices: [
      '인주 해변에 가는 방법',
      '인주 해변에서 찍은 영화',
      '해변에서 하는 영화 축제',
      '축제에 같이 가고 싶은 사람',
    ],
    answer: '3',
  },
  {
    number: 28,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '축제는 다음 주까지 합니다.',
      '여자는 어제 이 축제에 갔다 왔습니다.',
      '영화를 볼 때 의자를 빌릴 수 없습니다.',
      '일정은 홈페이지에서 확인할 수 있습니다.',
    ],
    answer: '4',
  },
  {
    number: 29,
    points: 3,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '여자가 탁구 선수가 된 이유를 고르십시오.',
    choices: [
      '어렸을 때부터 운동을 잘해서',
      '직접 본 탁구 경기가 멋있어서',
      '친구들과 같이 운동하고 싶어서',
      '아버지를 기쁘게 해 드리고 싶어서',
    ],
    answer: '2',
  },
  {
    number: 30,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '여자는 아버지께 탁구를 배웠습니다.',
      '여자는 다음 달에 세계 대회에 나갈 겁니다.',
      '여자는 중학생 때 탁구를 치기 시작했습니다.',
      '여자는 올해 여러 대회에서 일등을 했습니다.',
    ],
    answer: '1',
  },
];

export const TOPIK_I_102_LISTENING_EXAM: TopikSeedExam = {
  code: 'topik-i-listening-102-2025',
  title: {
    ko: '제102회 TOPIK I 듣기',
    uz: '102-TOPIK I tinglash',
    en: '102nd TOPIK I Listening',
    ru: '102-й TOPIK I: аудирование',
  },
  description: {
    ko: '제102회 한국어능력시험 TOPIK I 듣기 1번부터 30번까지를 원문 구조 그대로 구성했습니다.',
    uz: '102-TOPIK I tinglash bo‘limining 1–30-savollari asl imtihon tuzilishida.',
    en: 'Questions 1–30 of the 102nd TOPIK I Listening test in the original exam structure.',
    ru: 'Задания 1–30 аудирования 102-го TOPIK I в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_I,
  section: TopikSection.LISTENING,
  year: 2025,
  round: 102,
  durationMinutes: 40,
  totalQuestions: 30,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제102회 한국어능력시험 I B-홀수형 듣기',
    edition: '제102회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 제102회 TOPIK I B-홀수형 듣기 시험지·정답 및 배점표·통합 대본',
  },
  publishedAt: new Date('2025-10-19T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 24 }, (_, index) => [index + 1, index + 1] as const),
  [25, 26] as const,
  [27, 28] as const,
  [29, 30] as const,
];

export const TOPIK_I_102_LISTENING_GROUPS: TopikSeedGroup[] = groupRanges.map(
  ([startNumber, endNumber], index) => {
    const code = groupCodeFor(startNumber);
    const visual = startNumber === 15 || startNumber === 16;
    const points = rawQuestions.find(
      (question) => question.number === startNumber,
    )!.points;
    return {
      code,
      order: index + 1,
      startNumber,
      endNumber,
      instruction: textBlocks(instructionFor(startNumber)),
      sharedAudio: TOPIK_I_102_LISTENING_AUDIO[code],
      pointsPerQuestion: points,
      presentation: presentation(
        visual
          ? TopikVisualTemplate.EXAM_VISUAL_CHOICES
          : TopikVisualTemplate.EXAM_LISTENING,
        visual ? TopikChoiceLayout.TWO_COLUMNS : TopikChoiceLayout.ONE_COLUMN,
      ),
      version: 1,
      isActive: true,
    };
  },
);

export const TOPIK_I_102_LISTENING_QUESTIONS: TopikSeedQuestion[] =
  rawQuestions.map((input) => {
    const choices = topikI37Choices(input.choices, input.visualAssetKeys);
    const bookPage = bookPageFor(input.number);
    return {
      code: `topik-i-listening-102-q${String(input.number).padStart(2, '0')}`,
      groupCode: groupCodeFor(input.number),
      number: input.number,
      order: input.number,
      type: input.type,
      points: input.points,
      prompt: input.prompt ? textBlocks(input.prompt) : [],
      audio: TOPIK_I_102_LISTENING_AUDIO[groupCodeFor(input.number)],
      choices,
      correctChoiceKey: input.answer,
      solution: topikI37Solution(
        input.answer,
        choices[Number(input.answer) - 1].text,
      ),
      presentation: presentation(
        input.visualAssetKeys
          ? TopikVisualTemplate.EXAM_VISUAL_CHOICES
          : TopikVisualTemplate.EXAM_LISTENING,
        input.visualAssetKeys || input.number <= 16
          ? TopikChoiceLayout.TWO_COLUMNS
          : TopikChoiceLayout.ONE_COLUMN,
      ),
      tags: ['topik-i', 'round-102', 'listening', `question-${input.number}`],
      difficulty: input.number <= 16 ? 1 : input.number <= 24 ? 2 : 3,
      source: {
        pdfPage: bookPage + 2,
        bookPage,
        reference: '제102회 한국어능력시험 I B-홀수형 (듣기, 읽기)',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_I_102_LISTENING_SEED: TopikExamSeed = {
  exam: TOPIK_I_102_LISTENING_EXAM,
  groups: TOPIK_I_102_LISTENING_GROUPS,
  questions: TOPIK_I_102_LISTENING_QUESTIONS,
};
