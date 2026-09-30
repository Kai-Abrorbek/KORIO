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
import { TOPIK_I_64_LISTENING_AUDIO } from './topik-i-64-listening.scripts';

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
    return `topik-i-64-listening-${String(number).padStart(2, '0')}`;
  const start = number % 2 === 1 ? number : number - 1;
  return `topik-i-64-listening-${start}-${start + 1}`;
};

const instructionFor = (number: number) => {
  if (number <= 4)
    return '[01~04] 다음을 듣고 <보기>와 같이 물음에 맞는 대답을 고르십시오.';
  if (number <= 6)
    return '[05~06] 다음을 듣고 <보기>와 같이 이어지는 말을 고르십시오.';
  if (number <= 10)
    return '[07~10] 여기는 어디입니까? <보기>와 같이 알맞은 것을 고르십시오.';
  if (number <= 14)
    return '[11~14] 다음은 무엇에 대해 말하고 있습니까? <보기>와 같이 알맞은 것을 고르십시오.';
  if (number <= 16)
    return '[15~16] 다음 대화를 듣고 알맞은 그림을 고르십시오. (각 4점)';
  if (number <= 21)
    return '[17~21] 다음을 듣고 <보기>와 같이 대화 내용과 같은 것을 고르십시오. (각 3점)';
  if (number <= 24)
    return '[22~24] 다음을 듣고 여자의 중심 생각을 고르십시오. (각 3점)';
  const start = number % 2 === 1 ? number : number - 1;
  return `[${start}~${start + 1}] 다음을 듣고 물음에 답하십시오.`;
};

const sourcePageFor = (number: number) => {
  if (number <= 4) return 1;
  if (number <= 8) return 2;
  if (number <= 14) return 3;
  if (number <= 16) return 4;
  if (number <= 20) return 5;
  if (number <= 24) return 6;
  if (number <= 28) return 7;
  return 8;
};

// 제64회 TOPIK I B-홀수형 듣기 시험지 PDF pp. 1–8, 정답표 p. 1, 듣기 통합 대본 pp. 1–12.
const rawQuestions: ListeningQuestionInput[] = [
  {
    number: 1,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 책이 없어요.',
      '네, 책을 읽어요.',
      '아니요, 책이 많아요.',
      '아니요, 책을 좋아해요.',
    ],
    answer: '2',
  },
  {
    number: 2,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 구두예요.',
      '네, 구두가 예뻐요.',
      '아니요, 구두가 작아요.',
      '아니요, 구두가 있어요.',
    ],
    answer: '3',
  },
  {
    number: 3,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '자주 먹어요.',
      '집에서 먹어요.',
      '김밥을 먹어요.',
      '언니하고 먹어요.',
    ],
    answer: '3',
  },
  {
    number: 4,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '세 명이에요.',
      '같이 숙제해요.',
      '친구 집에 가요.',
      '두 시에 만나요.',
    ],
    answer: '4',
  },
  {
    number: 5,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: ['괜찮아요.', '반가워요.', '여기 있어요.', '잘 지냈어요.'],
    answer: '3',
  },
  {
    number: 6,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: ['미안해요.', '아니에요.', '부탁해요.', '좋겠어요.'],
    answer: '2',
  },
  {
    number: 7,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['꽃집', '식당', '교실', '약국'],
    answer: '1',
  },
  {
    number: 8,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['공항', '택시', '우체국', '백화점'],
    answer: '2',
  },
  {
    number: 9,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['호텔', '회사', '극장', '빵집'],
    answer: '1',
  },
  {
    number: 10,
    points: 4,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['서점', '공원', '사진관', '미용실'],
    answer: '2',
  },
  {
    number: 11,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['일', '맛', '시간', '이름'],
    answer: '2',
  },
  {
    number: 12,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['나라', '장소', '날짜', '운동'],
    answer: '4',
  },
  {
    number: 13,
    points: 4,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['계획', '날씨', '주말', '취미'],
    answer: '1',
  },
  {
    number: 14,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['약속', '교통', '위치', '소개'],
    answer: '3',
  },
  {
    number: 15,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '병실에서 환자가 침대에 앉아 음식을 먹고 있습니다.',
      '병실에서 환자가 수액을 맞고 있습니다.',
      '의사가 책상에서 환자의 이야기를 듣고 있습니다.',
      '의사가 환자에게 엑스레이 사진을 보여 주고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-i-64-q15-c1',
      'topik-i-64-q15-c2',
      'topik-i-64-q15-c3',
      'topik-i-64-q15-c4',
    ],
    answer: '3',
  },
  {
    number: 16,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '남녀가 함께 식탁을 옮기고 있습니다.',
      '남자가 식탁을 기울이고 여자가 의자를 옮기고 있습니다.',
      '남자가 의자를 식탁 위에 올리고 있습니다.',
      '여자가 식탁 위에 접시를 올리고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-i-64-q16-c1',
      'topik-i-64-q16-c2',
      'topik-i-64-q16-c3',
      'topik-i-64-q16-c4',
    ],
    answer: '1',
  },
  {
    number: 17,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 출장을 갑니다.',
      '여자는 아침에 출발합니다.',
      '여자는 내일 회사에 안 갑니다.',
      '남자는 내일 여자를 만날 겁니다.',
    ],
    answer: '4',
  },
  {
    number: 18,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 식빵을 못 샀습니다.',
      '남자는 여자에게 빵을 줬습니다.',
      '여자는 이 곳에 세 시에 왔습니다.',
      '남자는 지금 빵집에 다녀올 겁니다.',
    ],
    answer: '1',
  },
  {
    number: 19,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 혼자 결혼식에 갈 겁니다.',
      '여자는 일곱 시에 남자를 만날 겁니다.',
      '여자는 지하철로 결혼식장에 갈 겁니다.',
      '남자는 결혼식에 차를 가지고 갈 겁니다.',
    ],
    answer: '3',
  },
  {
    number: 20,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 지금 카드가 없습니다.',
      '남자는 인터넷으로 예약했습니다.',
      '여자는 이 식당에 처음 왔습니다.',
      '여자는 남자와 같이 식사를 했습니다.',
    ],
    answer: '2',
  },
  {
    number: 21,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 남자와 같은 일을 합니다.',
      '여자는 박물관에서 일하고 있습니다.',
      '남자는 박물관에서 일을 해 봤습니다.',
      '남자는 아르바이트를 안 하려고 합니다.',
    ],
    answer: '2',
  },
  {
    number: 22,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '재미있는 영화를 보고 싶습니다.',
      '영화는 여러 번 봐도 재미있습니다.',
      '이 영화는 많은 사람이 봐야 합니다.',
      '이 영화는 영화관에서 보는 게 좋습니다.',
    ],
    answer: '4',
  },
  {
    number: 23,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '반이 더 많아져야 합니다.',
      '쉬운 수업을 듣고 싶습니다.',
      '수업을 더 듣는 것이 좋습니다.',
      '영어 수업이 많이 도움이 됩니다.',
    ],
    answer: '2',
  },
  {
    number: 24,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '쓰레기를 모아서 버려야 합니다.',
      '물건을 많이 살 필요가 없습니다.',
      '쓰레기를 버리는 곳이 많이 필요합니다.',
      '물건을 안 버리고 다시 쓰는 게 좋습니다.',
    ],
    answer: '4',
  },
  {
    number: 25,
    points: 3,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '여자가 왜 이 이야기를 하고 있는지 고르십시오.',
    choices: [
      '신청을 더 받으려고',
      '신청 방법이 바뀌어서',
      '대회 내용을 설명하려고',
      '대회 날짜를 알려 주려고',
    ],
    answer: '1',
  },
  {
    number: 26,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '이 대회는 이번 달에 합니다.',
      '홈페이지에 대회 내용이 없습니다.',
      '금요일까지 참가 신청을 할 수 있습니다.',
      '이 대회에 참가 신청을 한 사람이 많습니다.',
    ],
    answer: '3',
  },
  {
    number: 27,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    prompt: '두 사람이 무엇에 대해 이야기를 하고 있는지 고르십시오.',
    choices: [
      '인기 있는 드라마',
      '기억에 남는 여행',
      '원하는 휴가 기간',
      '드라마에 나온 장소',
    ],
    answer: '4',
  },
  {
    number: 28,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '남자는 작년 여름에 섬에 갔습니다.',
      '여자는 어제 드라마를 못 봤습니다.',
      '남자는 여수에 가 본 적이 없습니다.',
      '여자는 여수에서 휴가를 보냈습니다.',
    ],
    answer: '1',
  },
  {
    number: 29,
    points: 3,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '남자가 그림을 배우게 된 이유를 고르십시오.',
    choices: [
      '새로운 취미를 갖고 싶어서',
      '그림을 보면 기분이 좋아져서',
      '좋아하는 사람을 그리고 싶어서',
      '영화에서 화가 역할을 하게 되어서',
    ],
    answer: '4',
  },
  {
    number: 30,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '남자는 요즘 주로 산을 그립니다.',
      '남자는 어릴 때부터 그림을 배웠습니다.',
      '남자는 그림 전시회를 한 적이 있습니다.',
      '남자는 다른 사람과 함께 전시회를 합니다.',
    ],
    answer: '4',
  },
];

export const TOPIK_I_64_LISTENING_EXAM: TopikSeedExam = {
  code: 'topik-i-listening-64-2019',
  title: {
    ko: '제64회 TOPIK I 듣기',
    uz: '64-TOPIK I tinglash',
    en: '64th TOPIK I Listening',
    ru: '64-й TOPIK I: аудирование',
  },
  description: {
    ko: '제64회 한국어능력시험 TOPIK I 듣기 1번부터 30번까지를 원문 구조 그대로 구성했습니다.',
    uz: '64-TOPIK I tinglash bo‘limining 1–30-savollari asl imtihon tuzilishida.',
    en: 'Questions 1–30 of the 64th TOPIK I Listening test in the original exam structure.',
    ru: 'Задания 1–30 аудирования 64-го TOPIK I в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_I,
  section: TopikSection.LISTENING,
  year: 2019,
  round: 64,
  durationMinutes: 40,
  totalQuestions: 30,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제64회 한국어능력시험 I B-홀수형 듣기',
    edition: '제64회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 제64회 TOPIK I B-홀수형 듣기 시험지·정답표·통합 대본',
  },
  publishedAt: new Date('2019-05-19T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 24 }, (_, index) => [index + 1, index + 1] as const),
  [25, 26] as const,
  [27, 28] as const,
  [29, 30] as const,
];

export const TOPIK_I_64_LISTENING_GROUPS: TopikSeedGroup[] = groupRanges.map(
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
      sharedAudio: TOPIK_I_64_LISTENING_AUDIO[code],
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

export const TOPIK_I_64_LISTENING_QUESTIONS: TopikSeedQuestion[] =
  rawQuestions.map((input) => {
    const choices = topikI37Choices(input.choices, input.visualAssetKeys);
    const sourcePage = sourcePageFor(input.number);
    const shortChoices = input.number <= 16;
    return {
      code: `topik-i-listening-64-q${String(input.number).padStart(2, '0')}`,
      groupCode: groupCodeFor(input.number),
      number: input.number,
      order: input.number,
      type: input.type,
      points: input.points,
      prompt: input.prompt ? textBlocks(input.prompt) : [],
      audio: TOPIK_I_64_LISTENING_AUDIO[groupCodeFor(input.number)],
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
        input.visualAssetKeys || shortChoices
          ? TopikChoiceLayout.TWO_COLUMNS
          : TopikChoiceLayout.ONE_COLUMN,
      ),
      tags: ['topik-i', 'round-64', 'listening', `question-${input.number}`],
      difficulty: input.number <= 16 ? 1 : input.number <= 24 ? 2 : 3,
      source: {
        pdfPage: sourcePage,
        bookPage: sourcePage,
        reference: '제64회 한국어능력시험 I B-홀수형 (듣기, 읽기)',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_I_64_LISTENING_SEED: TopikExamSeed = {
  exam: TOPIK_I_64_LISTENING_EXAM,
  groups: TOPIK_I_64_LISTENING_GROUPS,
  questions: TOPIK_I_64_LISTENING_QUESTIONS,
};
