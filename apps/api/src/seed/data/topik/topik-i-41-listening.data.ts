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
import { TOPIK_I_41_LISTENING_AUDIO } from './topik-i-41-listening.scripts';

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
    return `topik-i-41-listening-${String(number).padStart(2, '0')}`;
  const start = number % 2 === 1 ? number : number - 1;
  return `topik-i-41-listening-${start}-${start + 1}`;
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
  if (number <= 4) return 3;
  if (number <= 8) return 4;
  if (number <= 14) return 5;
  if (number <= 16) return 6;
  if (number <= 19) return 7;
  if (number <= 24) return 8;
  if (number <= 28) return 9;
  return 10;
};

// 제41회 TOPIK I B형 시험지 pp. 3–10, 정답표 p. 1, 듣기 통합 대본 pp. 1–12.
const rawQuestions: ListeningQuestionInput[] = [
  {
    number: 1,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 사람이에요.',
      '네, 사람이 많아요.',
      '아니요, 사람이 좋아요.',
      '아니요, 사람이 있어요.',
    ],
    answer: '2',
  },
  {
    number: 2,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 노래가 있어요.',
      '네, 노래를 알아요.',
      '아니요, 노래를 못해요.',
      '아니요, 노래가 아니에요.',
    ],
    answer: '3',
  },
  {
    number: 3,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '목요일에 봐요.',
      '친구를 만나요.',
      '학교에서 봐요.',
      '두 시에 만나요.',
    ],
    answer: '4',
  },
  {
    number: 4,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '학교에 가요.',
      '지금 읽어요.',
      '수업이 있어요.',
      '아주 재미있어요.',
    ],
    answer: '4',
  },
  {
    number: 5,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: ['고맙습니다.', '괜찮습니다.', '축하합니다.', '그렇습니다.'],
    answer: '1',
  },
  {
    number: 6,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 부탁합니다.',
      '네, 알겠습니다.',
      '네, 전화 받으십시오.',
      '네, 다시 걸겠습니다.',
    ],
    answer: '2',
  },
  {
    number: 7,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['극장', '서점', '약국', '시장'],
    answer: '1',
  },
  {
    number: 8,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['옷 가게', '신발 가게', '모자 가게', '안경 가게'],
    answer: '1',
  },
  {
    number: 9,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['세탁소', '우체국', '미용실', '편의점'],
    answer: '3',
  },
  {
    number: 10,
    points: 4,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['사진관', '도서관', '박물관', '미술관'],
    answer: '1',
  },
  {
    number: 11,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['이름', '가족', '직업', '생일'],
    answer: '1',
  },
  {
    number: 12,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['채소', '과일', '과자', '고기'],
    answer: '2',
  },
  {
    number: 13,
    points: 4,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['나이', '번호', '날짜', '시간'],
    answer: '1',
  },
  {
    number: 14,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['나라', '휴일', '여행', '고향'],
    answer: '4',
  },
  {
    number: 15,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '여자가 침대에 누운 남자에게 일어나서 식사하라고 말하고 있습니다.',
      '남자가 침대에 앉아 신발을 신고 있습니다.',
      '여자가 식탁에서 남자에게 음식을 내주고 있습니다.',
      '여자와 남자가 식탁에서 식사를 하고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-i-41-q15-c1',
      'topik-i-41-q15-c2',
      'topik-i-41-q15-c3',
      'topik-i-41-q15-c4',
    ],
    answer: '1',
  },
  {
    number: 16,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '남자가 앉아 있는 여자에게 기타를 건네주고 있습니다.',
      '여자가 서서 남자에게 악보를 설명하고 있습니다.',
      '남자가 기타를 든 여자에게 앉으라고 권하고 있습니다.',
      '남자가 기타를 치고 여자가 듣고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-i-41-q16-c1',
      'topik-i-41-q16-c2',
      'topik-i-41-q16-c3',
      'topik-i-41-q16-c4',
    ],
    answer: '3',
  },
  {
    number: 17,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자의 집은 지하철역에서 멉니다.',
      '여자는 더 넓은 집으로 이사했습니다.',
      '남자는 여자의 짐이 많아서 힘들었습니다.',
      '남자는 비가 와서 이사를 도와주지 못했습니다.',
    ],
    answer: '2',
  },
  {
    number: 18,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '장미 축제는 올해가 처음입니다.',
      '장미 축제는 이번 주 토요일에 시작합니다.',
      '두 사람은 장미 축제에 가서 만날 것입니다.',
      '빨간색 옷을 입으면 돈을 내지 않고 들어갑니다.',
    ],
    answer: '4',
  },
  {
    number: 19,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 은행을 찾고 있습니다.',
      '여자는 지금 김치박물관에 있습니다.',
      '남자는 여자에게 지도를 주었습니다.',
      '남자는 관광 안내소의 위치를 알려 줬습니다.',
    ],
    answer: '4',
  },
  {
    number: 20,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '두 사람은 공항에 늦게 도착했습니다.',
      '두 사람은 커피숍에서 다시 만날 겁니다.',
      '남자는 비행기 시간을 확인하려고 합니다.',
      '남자는 1시에 출발하는 비행기를 탔습니다.',
    ],
    answer: '2',
  },
  {
    number: 21,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 음식을 주문하려고 합니다.',
      '남자는 음식을 포장하고 있습니다.',
      '남자는 남은 음식을 다 먹고 갈 겁니다.',
      '여자는 남은 음식을 가지고 간 적이 있습니다.',
    ],
    answer: '4',
  },
  {
    number: 22,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '동네에서 자전거를 타면 안 됩니다.',
      '많은 사람들이 자전거를 타야 합니다.',
      '안전한 자전거 도로가 생겨서 좋습니다.',
      '자전거 도로에서도 사고가 날 수 있습니다.',
    ],
    answer: '3',
  },
  {
    number: 23,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '정리를 자주 하면 힘이 듭니다.',
      '일을 빨리 하려면 정리를 해야 합니다.',
      '시간이 있을 때마다 정리하는 게 좋습니다.',
      '정리할 때는 책상 정리를 먼저 해야 합니다.',
    ],
    answer: '3',
  },
  {
    number: 24,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '힘들 때 산에 가서 쉬면 좋습니다.',
      '산에 가면 산 위까지 올라가야 합니다.',
      '예쁜 경치를 보려면 산에 가야 합니다.',
      '내려가면서 경치를 구경하는 것이 좋습니다.',
    ],
    answer: '2',
  },
  {
    number: 25,
    points: 3,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '여자가 왜 이 이야기를 하고 있는지 맞는 것을 고르십시오.',
    choices: [
      '회사의 특별한 날을 정하려고',
      '회사의 쉬는 날을 말해 주려고',
      '회사의 행사 준비 장소를 바꾸려고',
      '회사에서 주는 선물을 알려 주려고',
    ],
    answer: '4',
  },
  {
    number: 26,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '이 회사의 식당은 4층에 있습니다.',
      '이 회사는 수요일마다 케이크를 줍니다.',
      '‘가족 사랑의 날’에는 4시에 퇴근합니다.',
      '‘가족 사랑의 날’에는 가족들이 회사에 옵니다.',
    ],
    answer: '3',
  },
  {
    number: 27,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    prompt: '두 사람이 무엇에 대해 이야기를 하고 있는지 맞는 것을 고르십시오.',
    choices: [
      '선물을 사는 장소',
      '선물을 교환하는 방법',
      '선물을 주고 싶은 사람',
      '선물을 교환할 수 있는 기간',
    ],
    answer: '2',
  },
  {
    number: 28,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '여자는 백화점에 교환권을 사러 갈 겁니다.',
      '여자는 선물 교환을 친구에게 부탁했습니다.',
      '여자는 사이즈가 큰 티셔츠를 선물 받았습니다.',
      '여자는 친구에게 주려고 티셔츠를 가지고 왔습니다.',
    ],
    answer: '3',
  },
  {
    number: 29,
    points: 3,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '여자는 왜 남자를 찾아왔는지 맞는 것을 고르십시오.',
    choices: [
      '만화책을 읽고 싶어서',
      '아이가 공부를 잘 못해서',
      '아이가 책 읽기를 싫어해서',
      '만화책의 좋은 점을 알고 싶어서',
    ],
    answer: '3',
  },
  {
    number: 30,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '요즘 아이들은 만화책을 읽지 않습니다.',
      '만화책으로는 어려운 내용을 이해하기 힘듭니다.',
      '책 내용이 재미있으면 만화책을 찾아서 읽습니다.',
      '만화책을 읽으면 책 읽는 습관을 기를 수 있습니다.',
    ],
    answer: '4',
  },
];

export const TOPIK_I_41_LISTENING_EXAM: TopikSeedExam = {
  code: 'topik-i-listening-41-2015',
  title: {
    ko: '제41회 TOPIK I 듣기',
    uz: '41-TOPIK I tinglash',
    en: '41st TOPIK I Listening',
    ru: '41-й TOPIK I: аудирование',
  },
  description: {
    ko: '제41회 한국어능력시험 TOPIK I 듣기 1번부터 30번까지를 원문 구조 그대로 구성했습니다.',
    uz: '41-TOPIK I tinglash bo‘limining 1–30-savollari asl imtihon tuzilishida.',
    en: 'Questions 1–30 of the 41st TOPIK I Listening test in the original exam structure.',
    ru: 'Задания 1–30 аудирования 41-го TOPIK I в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_I,
  section: TopikSection.LISTENING,
  year: 2015,
  round: 41,
  durationMinutes: 40,
  totalQuestions: 30,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제41회 한국어능력시험 I B형 듣기',
    edition: '제41회',
    publisher: '국립국제교육원',
    reference: '사용자 제공 제41회 TOPIK I B형 시험지·정답표·듣기 통합 대본',
  },
  publishedAt: new Date('2015-07-19T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 24 }, (_, index) => [index + 1, index + 1] as const),
  [25, 26] as const,
  [27, 28] as const,
  [29, 30] as const,
];

export const TOPIK_I_41_LISTENING_GROUPS: TopikSeedGroup[] = groupRanges.map(
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
      sharedAudio: TOPIK_I_41_LISTENING_AUDIO[code],
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

export const TOPIK_I_41_LISTENING_QUESTIONS: TopikSeedQuestion[] =
  rawQuestions.map((input) => {
    const choices = topikI37Choices(input.choices, input.visualAssetKeys);
    const sourcePage = sourcePageFor(input.number);
    const shortChoices = input.number <= 16;
    return {
      code: `topik-i-listening-41-q${String(input.number).padStart(2, '0')}`,
      groupCode: groupCodeFor(input.number),
      number: input.number,
      order: input.number,
      type: input.type,
      points: input.points,
      prompt: input.prompt ? textBlocks(input.prompt) : [],
      audio: TOPIK_I_41_LISTENING_AUDIO[groupCodeFor(input.number)],
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
      tags: ['topik-i', 'round-41', 'listening', `question-${input.number}`],
      difficulty: input.number <= 16 ? 1 : input.number <= 24 ? 2 : 3,
      source: {
        pdfPage: sourcePage,
        bookPage: sourcePage - 2,
        reference: '제41회 한국어능력시험 I B형 (듣기, 읽기)',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_I_41_LISTENING_SEED: TopikExamSeed = {
  exam: TOPIK_I_41_LISTENING_EXAM,
  groups: TOPIK_I_41_LISTENING_GROUPS,
  questions: TOPIK_I_41_LISTENING_QUESTIONS,
};
