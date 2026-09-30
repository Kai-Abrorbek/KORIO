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
import { TOPIK_I_47_LISTENING_AUDIO } from './topik-i-47-listening.scripts';

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
    return `topik-i-47-listening-${String(number).padStart(2, '0')}`;
  const start = number % 2 === 1 ? number : number - 1;
  return `topik-i-47-listening-${start}-${start + 1}`;
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
  if (number <= 4) return 5;
  if (number <= 8) return 6;
  if (number <= 14) return 7;
  if (number <= 16) return 8;
  if (number <= 20) return 9;
  if (number <= 24) return 10;
  if (number <= 28) return 11;
  return 12;
};

// 제47회 TOPIK I B형 시험지 PDF pp. 5–12, 정답표 p. 1, 듣기 통합 대본 pp. 1–12.
const rawQuestions: ListeningQuestionInput[] = [
  {
    number: 1,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 책이에요.',
      '아니요, 책이 있어요.',
      '네, 책이 많아요.',
      '아니요, 책이 좋아요.',
    ],
    answer: '3',
  },
  {
    number: 2,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 주스가 없어요.',
      '아니요, 주스를 좋아해요.',
      '네, 주스가 아니에요.',
      '아니요, 주스를 안 마셔요.',
    ],
    answer: '4',
  },
  {
    number: 3,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '내일 만나요.',
      '교실에서 만나요.',
      '학생을 만나요.',
      '동생하고 만나요.',
    ],
    answer: '1',
  },
  {
    number: 4,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: ['지금 가요.', '학교에 가요.', '버스로 가요.', '선생님이 가요.'],
    answer: '3',
  },
  {
    number: 5,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '잘 먹겠습니다.',
      '잘 지냈습니다.',
      '정말 오랜만입니다.',
      '만나서 반갑습니다.',
    ],
    answer: '4',
  },
  {
    number: 6,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: ['고맙습니다.', '그렇습니다.', '환영합니다.', '축하합니다.'],
    answer: '1',
  },
  {
    number: 7,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['식당', '꽃집', '극장', '약국'],
    answer: '1',
  },
  {
    number: 8,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['시장', '은행', '기차역', '운동장'],
    answer: '2',
  },
  {
    number: 9,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['병원', '회사', '도서관', '우체국'],
    answer: '2',
  },
  {
    number: 10,
    points: 4,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['공원', '교회', '빵집', '서점'],
    answer: '4',
  },
  {
    number: 11,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['가족', '나라', '나이', '이름'],
    answer: '1',
  },
  {
    number: 12,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['메뉴', '시계', '신발', '요일'],
    answer: '3',
  },
  {
    number: 13,
    points: 4,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['계절', '약속', '음식', '장소'],
    answer: '2',
  },
  {
    number: 14,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['기분', '계획', '날씨', '시간'],
    answer: '3',
  },
  {
    number: 15,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '공항에서 여자가 수하물 컨베이어 위 가방을 가리키고 남자가 옆에서 보고 있습니다.',
      '공항 수하물 찾는 곳에서 여자가 가방을 메고 남자가 여행 가방을 끌고 걷습니다.',
      '기차 안에서 여자가 남자에게 좌석을 가리키고 남자가 여행 가방을 잡고 있습니다.',
      '기차 안에서 남녀가 함께 가방을 선반에 올립니다.',
    ],
    visualAssetKeys: [
      'topik-i-47-q15-c1',
      'topik-i-47-q15-c2',
      'topik-i-47-q15-c3',
      'topik-i-47-q15-c4',
    ],
    answer: '1',
  },
  {
    number: 16,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '옷 가게에서 남자가 걸린 옷을 가리키며 여자 점원과 이야기합니다.',
      '옷 가게에서 남자가 거울 앞에서 바지를 입어 보고 여자 점원이 다른 바지를 들고 있습니다.',
      '옷 가게에서 남자가 두 벌의 바지를 들고 여자 점원에게 보여 줍니다.',
      '옷 가게 계산대에서 여자 점원이 남자에게 옷을 건네줍니다.',
    ],
    visualAssetKeys: [
      'topik-i-47-q16-c1',
      'topik-i-47-q16-c2',
      'topik-i-47-q16-c3',
      'topik-i-47-q16-c4',
    ],
    answer: '2',
  },
  {
    number: 17,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 버스표를 샀습니다.',
      '남자는 버스를 타고 있습니다.',
      '여자는 지금 부산에 있습니다.',
      '남자는 부산에 가려고 합니다.',
    ],
    answer: '4',
  },
  {
    number: 18,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 주말에 시간이 없습니다.',
      '여자는 요즘 운동을 하고 있습니다.',
      '남자는 테니스를 배운 적이 있습니다.',
      '여자는 테니스를 가르칠 수 없습니다.',
    ],
    answer: '2',
  },
  {
    number: 19,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 전화로 갈비탕을 주문했습니다.',
      '남자는 저녁 식사를 예약하고 있습니다.',
      '두 사람은 같이 저녁을 먹으려고 합니다.',
      '두 사람은 식당에서 이야기하고 있습니다.',
    ],
    answer: '2',
  },
  {
    number: 20,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '두 사람은 외국에서 공부할 겁니다.',
      '두 사람은 회사에 다니고 있습니다.',
      '여자는 취직 준비를 하고 있습니다.',
      '남자는 작년에 학교를 졸업했습니다.',
    ],
    answer: '3',
  },
  {
    number: 21,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 한옥마을에서 살고 있습니다.',
      '여자는 한옥마을을 자주 구경합니다.',
      '남자는 여자와 함께 한옥마을에 갔습니다.',
      '여자는 한옥마을에서 자 본 적이 없습니다.',
    ],
    answer: '4',
  },
  {
    number: 22,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '휴가는 가족과 함께 보내야 합니다.',
      '여행을 가서 책을 읽는 게 좋습니다.',
      '휴가 때는 집에서 쉬는 게 좋습니다.',
      '여행을 갈 때 계획을 세워야 합니다.',
    ],
    answer: '3',
  },
  {
    number: 23,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '일이 힘들면 천천히 해야 합니다.',
      '급한 일을 먼저 하는 게 좋습니다.',
      '서로 도와주면서 일을 해야 합니다.',
      '일이 많으면 쉬면서 하는 게 좋습니다.',
    ],
    answer: '2',
  },
  {
    number: 24,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '단 음식은 건강에 좋지 않습니다.',
      '피곤하면 잠을 자는 게 좋습니다.',
      '건강을 위해서 사탕을 줄여야 합니다.',
      '피곤할 때 단 음식을 먹으면 좋습니다.',
    ],
    answer: '4',
  },
  {
    number: 25,
    points: 3,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '여자가 왜 이 이야기를 하고 있는지 고르십시오.',
    choices: [
      '기숙사 청소 방법을 설명하려고',
      '기숙사 건물 위치를 안내하려고',
      '기숙사 생활 규칙을 말해 주려고',
      '기숙사 계단 청소를 알려 주려고',
    ],
    answer: '4',
  },
  {
    number: 26,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '청소하는 동안 계단을 이용할 수 없습니다.',
      '이번 주에 학생들은 기숙사를 나가야 합니다.',
      '기숙사 계단에 있는 물건을 만지면 안 됩니다.',
      '금요일 하루 종일 기숙사를 청소할 계획입니다.',
    ],
    answer: '1',
  },
  {
    number: 27,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    prompt: '두 사람이 무엇에 대해 이야기를 하고 있는지 고르십시오.',
    choices: [
      '아침 식사를 하는 시간',
      '회사에서 먹는 아침 식사',
      '회사 식당에서 파는 음식',
      '아침 식사를 하면 좋은 이유',
    ],
    answer: '2',
  },
  {
    number: 28,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '여자는 집에서 아침을 먹습니다.',
      '남자는 가족과 함께 살고 있습니다.',
      '여자는 아직 이메일을 못 봤습니다.',
      '남자는 매일 아침을 먹고 출근합니다.',
    ],
    answer: '1',
  },
  {
    number: 29,
    points: 3,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '여자가 기타 연습을 자주 못하는 이유를 고르십시오.',
    choices: [
      '기타 치는 것을 안 좋아해서',
      '기타를 연습할 시간이 없어서',
      '기타 연습하는 것을 잊어버려서',
      '기타를 가르쳐 주는 사람이 없어서',
    ],
    answer: '3',
  },
  {
    number: 30,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '여자는 기타를 잘 칠 수 있습니다.',
      '여자는 남자에게 기타를 가르칩니다.',
      '여자는 텔레비전을 자주 보지 않습니다.',
      '여자는 기타를 잘 보이는 곳에 둘 겁니다.',
    ],
    answer: '4',
  },
];

export const TOPIK_I_47_LISTENING_EXAM: TopikSeedExam = {
  code: 'topik-i-listening-47-2016',
  title: {
    ko: '제47회 TOPIK I 듣기',
    uz: '47-TOPIK I tinglash',
    en: '47th TOPIK I Listening',
    ru: '47-й TOPIK I: аудирование',
  },
  description: {
    ko: '제47회 한국어능력시험 TOPIK I 듣기 1번부터 30번까지를 원문 구조 그대로 구성했습니다.',
    uz: '47-TOPIK I tinglash bo‘limining 1–30-savollari asl imtihon tuzilishida.',
    en: 'Questions 1–30 of the 47th TOPIK I Listening test in the original exam structure.',
    ru: 'Задания 1–30 аудирования 47-го TOPIK I в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_I,
  section: TopikSection.LISTENING,
  year: 2016,
  round: 47,
  durationMinutes: 40,
  totalQuestions: 30,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제47회 한국어능력시험 I B형 듣기',
    edition: '제47회',
    publisher: '국립국제교육원',
    reference: '사용자 제공 제47회 TOPIK I B형 시험지·정답표·듣기 통합 대본',
  },
  publishedAt: new Date('2016-07-17T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 24 }, (_, index) => [index + 1, index + 1] as const),
  [25, 26] as const,
  [27, 28] as const,
  [29, 30] as const,
];

export const TOPIK_I_47_LISTENING_GROUPS: TopikSeedGroup[] = groupRanges.map(
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
      sharedAudio: TOPIK_I_47_LISTENING_AUDIO[code],
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

export const TOPIK_I_47_LISTENING_QUESTIONS: TopikSeedQuestion[] =
  rawQuestions.map((input) => {
    const choices = topikI37Choices(input.choices, input.visualAssetKeys);
    const sourcePage = sourcePageFor(input.number);
    const shortChoices = input.number <= 16;
    return {
      code: `topik-i-listening-47-q${String(input.number).padStart(2, '0')}`,
      groupCode: groupCodeFor(input.number),
      number: input.number,
      order: input.number,
      type: input.type,
      points: input.points,
      prompt: input.prompt ? textBlocks(input.prompt) : [],
      audio: TOPIK_I_47_LISTENING_AUDIO[groupCodeFor(input.number)],
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
      tags: ['topik-i', 'round-47', 'listening', `question-${input.number}`],
      difficulty: input.number <= 16 ? 1 : input.number <= 24 ? 2 : 3,
      source: {
        pdfPage: sourcePage,
        bookPage: sourcePage - 4,
        reference: '제47회 한국어능력시험 I B형 (듣기, 읽기)',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_I_47_LISTENING_SEED: TopikExamSeed = {
  exam: TOPIK_I_47_LISTENING_EXAM,
  groups: TOPIK_I_47_LISTENING_GROUPS,
  questions: TOPIK_I_47_LISTENING_QUESTIONS,
};
