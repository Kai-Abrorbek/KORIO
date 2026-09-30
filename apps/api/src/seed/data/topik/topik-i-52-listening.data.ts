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
import { TOPIK_I_52_LISTENING_AUDIO } from './topik-i-52-listening.scripts';

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
    return `topik-i-52-listening-${String(number).padStart(2, '0')}`;
  const start = number % 2 === 1 ? number : number - 1;
  return `topik-i-52-listening-${start}-${start + 1}`;
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

// 제52회 TOPIK I B-홀수형 시험지 PDF pp. 5–12, 정답표 p. 1, 듣기 통합 대본 pp. 1–12.
const rawQuestions: ListeningQuestionInput[] = [
  {
    number: 1,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 영화를 해요.',
      '네, 영화가 아니에요.',
      '아니요, 영화를 안 봐요.',
      '아니요, 영화가 재미있어요.',
    ],
    answer: '3',
  },
  {
    number: 2,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 사람이 없어요.',
      '네, 사람이 많아요.',
      '아니요, 사람이에요.',
      '아니요, 사람이 좋아요.',
    ],
    answer: '2',
  },
  {
    number: 3,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '모자를 샀어요.',
      '동생이 샀어요.',
      '주말에 샀어요.',
      '백화점에서 샀어요.',
    ],
    answer: '3',
  },
  {
    number: 4,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '매일 일해요.',
      '정말 멋있어요.',
      '일이 어려워요.',
      '학생을 가르쳐요.',
    ],
    answer: '4',
  },
  {
    number: 5,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: ['반갑습니다.', '실례합니다.', '안녕히 계세요.', '여기 앉으세요.'],
    answer: '3',
  },
  {
    number: 6,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: ['네, 전데요.', '네, 저도요.', '네, 미안해요.', '네, 괜찮아요.'],
    answer: '1',
  },
  {
    number: 7,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['택시', '기차', '비행기', '지하철'],
    answer: '1',
  },
  {
    number: 8,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['은행', '빵집', '정류장', '세탁소'],
    answer: '2',
  },
  {
    number: 9,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['극장', '식당', '미술관', '우체국'],
    answer: '4',
  },
  {
    number: 10,
    points: 4,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['약국', '서점', '사진관', '운동장'],
    answer: '2',
  },
  {
    number: 11,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['시간', '날짜', '나이', '주소'],
    answer: '1',
  },
  {
    number: 12,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['장소', '운동', '음식', '직업'],
    answer: '2',
  },
  {
    number: 13,
    points: 4,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['요일', '나라', '여행', '계절'],
    answer: '4',
  },
  {
    number: 14,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['취미', '약속', '위치', '교통'],
    answer: '3',
  },
  {
    number: 15,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '두 사람이 김밥을 만들고 있습니다.',
      '여자 직원이 손님인 남자에게 음식을 주문받고 있습니다.',
      '여자 손님이 남자 직원에게 메뉴를 가리키고 있습니다.',
      '두 사람이 식탁에 앉아 김밥을 먹고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-i-52-q15-c1',
      'topik-i-52-q15-c2',
      'topik-i-52-q15-c3',
      'topik-i-52-q15-c4',
    ],
    answer: '2',
  },
  {
    number: 16,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '비 오는 길에서 남녀가 각각 우산을 쓰고 걸어가고 있습니다.',
      '비 오는 길에서 남녀가 우산 없이 걸어가고 있습니다.',
      '비 오는 길에서 남자가 우산을 들어 여자도 비를 피할 수 있게 하고 있습니다.',
      '비 오는 길에서 남자는 우산을 들고 여자는 접힌 우산을 들고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-i-52-q16-c1',
      'topik-i-52-q16-c2',
      'topik-i-52-q16-c3',
      'topik-i-52-q16-c4',
    ],
    answer: '3',
  },
  {
    number: 17,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 장미꽃을 삽니다.',
      '여자는 선물을 받습니다.',
      '남자는 여자 친구가 없습니다.',
      '여자는 꽃 이름을 잘 모릅니다.',
    ],
    answer: '1',
  },
  {
    number: 18,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 도서관에 일하러 갑니다.',
      '남자는 다음 주에 시험을 볼 겁니다.',
      '여자는 방학에 시험 준비를 했습니다.',
      '남자는 일 때문에 여행을 못 갔습니다.',
    ],
    answer: '3',
  },
  {
    number: 19,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 쉬고 싶어 합니다.',
      '여자는 일을 다 끝냈습니다.',
      '남자는 집에 가려고 합니다.',
      '여자는 몸이 좋지 않습니다.',
    ],
    answer: '4',
  },
  {
    number: 20,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 농구 선수를 좋아합니다.',
      '남자는 행사에 관심이 없습니다.',
      '여자는 다음 주에 신청할 겁니다.',
      '남자는 농구를 가르치려고 합니다.',
    ],
    answer: '1',
  },
  {
    number: 21,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 남자하고 만화책을 샀습니다.',
      '남자는 만화책을 많이 모았습니다.',
      '여자는 남자한테 만화책을 주었습니다.',
      '남자는 만화책을 사려고 외국에 갔습니다.',
    ],
    answer: '2',
  },
  {
    number: 22,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '아침밥을 먹는 게 좋습니다.',
      '아침에 일찍 일어나야 합니다.',
      '아침에 우유를 마시면 좋습니다.',
      '아침밥은 집에서 먹어야 합니다.',
    ],
    answer: '1',
  },
  {
    number: 23,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '지금 살고 있는 집이 좋습니다.',
      '집과 회사는 가까운 게 좋습니다.',
      '등산을 자주 하려면 이사해야 합니다.',
      '집에서 회사까지 걸어 다녀야 합니다.',
    ],
    answer: '1',
  },
  {
    number: 24,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '신발은 좀 크게 신는 게 좋습니다.',
      '신발이 안 맞을 때는 빨리 바꿔야 합니다.',
      '인터넷으로 신발을 사면 바꾸기 쉽습니다.',
      '인터넷으로 신발을 사지 않는 게 좋습니다.',
    ],
    answer: '4',
  },
  {
    number: 25,
    points: 3,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '여자가 왜 이 이야기를 하고 있는지 고르십시오.',
    choices: [
      '버스 종류를 알려 주려고',
      '관광지 이름을 소개하려고',
      '관광지 위치를 설명하려고',
      '버스 이용 방법을 안내하려고',
    ],
    answer: '4',
  },
  {
    number: 26,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '이 버스는 중앙공원에서 출발합니다.',
      '버스를 다시 탈 때는 표를 사야 합니다.',
      '사람들은 내려서 관광지를 구경할 수 있습니다.',
      '사람들은 한 시간 동안 버스를 기다려야 합니다.',
    ],
    answer: '3',
  },
  {
    number: 27,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    prompt: '두 사람이 무엇에 대해 이야기를 하고 있는지 고르십시오.',
    choices: [
      '고장 난 텔레비전',
      '사고 싶은 텔레비전',
      '서비스 센터 연락 방법',
      '서비스 센터 이용 시간',
    ],
    answer: '1',
  },
  {
    number: 28,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '남자는 텔레비전을 사러 왔습니다.',
      '남자는 내일 직원과 통화할 겁니다.',
      '여자는 남자의 집에 찾아갈 겁니다.',
      '여자는 남자의 텔레비전을 고쳤습니다.',
    ],
    answer: '2',
  },
  {
    number: 29,
    points: 3,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '여자가 대회에 참가한 이유를 고르십시오.',
    choices: [
      '한국어 발음 연습을 할 수 있어서',
      '많은 외국인 학생을 만날 수 있어서',
      '한국에서 특별한 경험을 하고 싶어서',
      '사람들 앞에서 이야기하는 것을 좋아해서',
    ],
    answer: '3',
  },
  {
    number: 30,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '여자는 한국에서 계속 공부하려고 합니다.',
      '여자는 긴장을 해서 실수를 많이 했습니다.',
      '여자는 사람들이 없는 곳에서 연습했습니다.',
      '여자는 한국어 선생님의 도움을 받았습니다.',
    ],
    answer: '4',
  },
];

export const TOPIK_I_52_LISTENING_EXAM: TopikSeedExam = {
  code: 'topik-i-listening-52-2017',
  title: {
    ko: '제52회 TOPIK I 듣기',
    uz: '52-TOPIK I tinglash',
    en: '52nd TOPIK I Listening',
    ru: '52-й TOPIK I: аудирование',
  },
  description: {
    ko: '제52회 한국어능력시험 TOPIK I 듣기 1번부터 30번까지를 원문 구조 그대로 구성했습니다.',
    uz: '52-TOPIK I tinglash bo‘limining 1–30-savollari asl imtihon tuzilishida.',
    en: 'Questions 1–30 of the 52nd TOPIK I Listening test in the original exam structure.',
    ru: 'Задания 1–30 аудирования 52-го TOPIK I в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_I,
  section: TopikSection.LISTENING,
  year: 2017,
  round: 52,
  durationMinutes: 40,
  totalQuestions: 30,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제52회 한국어능력시험 I B-홀수형 듣기',
    edition: '제52회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 제52회 TOPIK I B-홀수형 시험지·정답표·듣기 통합 대본',
  },
  publishedAt: new Date('2017-04-16T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 24 }, (_, index) => [index + 1, index + 1] as const),
  [25, 26] as const,
  [27, 28] as const,
  [29, 30] as const,
];

export const TOPIK_I_52_LISTENING_GROUPS: TopikSeedGroup[] = groupRanges.map(
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
      sharedAudio: TOPIK_I_52_LISTENING_AUDIO[code],
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

export const TOPIK_I_52_LISTENING_QUESTIONS: TopikSeedQuestion[] =
  rawQuestions.map((input) => {
    const choices = topikI37Choices(input.choices, input.visualAssetKeys);
    const sourcePage = sourcePageFor(input.number);
    const shortChoices = input.number <= 16;
    return {
      code: `topik-i-listening-52-q${String(input.number).padStart(2, '0')}`,
      groupCode: groupCodeFor(input.number),
      number: input.number,
      order: input.number,
      type: input.type,
      points: input.points,
      prompt: input.prompt ? textBlocks(input.prompt) : [],
      audio: TOPIK_I_52_LISTENING_AUDIO[groupCodeFor(input.number)],
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
      tags: ['topik-i', 'round-52', 'listening', `question-${input.number}`],
      difficulty: input.number <= 16 ? 1 : input.number <= 24 ? 2 : 3,
      source: {
        pdfPage: sourcePage,
        bookPage: sourcePage - 4,
        reference: '제52회 한국어능력시험 I B-홀수형 (듣기, 읽기)',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_I_52_LISTENING_SEED: TopikExamSeed = {
  exam: TOPIK_I_52_LISTENING_EXAM,
  groups: TOPIK_I_52_LISTENING_GROUPS,
  questions: TOPIK_I_52_LISTENING_QUESTIONS,
};
