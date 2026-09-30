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
import { TOPIK_I_60_LISTENING_AUDIO } from './topik-i-60-listening.scripts';

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
    return `topik-i-60-listening-${String(number).padStart(2, '0')}`;
  const start = number % 2 === 1 ? number : number - 1;
  return `topik-i-60-listening-${start}-${start + 1}`;
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

// 제60회 TOPIK I B-홀수형 시험지 PDF pp. 5–12, 정답표 p. 2, 듣기 통합 대본 pp. 1–12.
const rawQuestions: ListeningQuestionInput[] = [
  {
    number: 1,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 사과가 없어요.',
      '네, 사과가 맛있어요.',
      '아니요, 사과가 비싸요.',
      '아니요, 사과가 좋아요.',
    ],
    answer: '2',
  },
  {
    number: 2,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 학교가 작아요.',
      '네, 학교가 아니에요.',
      '아니요, 학교에 안 가요.',
      '아니요, 학교에 있어요.',
    ],
    answer: '3',
  },
  {
    number: 3,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '조금 샀어요.',
      '친구가 샀어요.',
      '한 시에 샀어요.',
      '시장에서 샀어요.',
    ],
    answer: '4',
  },
  {
    number: 4,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: ['자주 해요.', '편지를 써요.', '내일 만나요.', '정말 좋아해요.'],
    answer: '2',
  },
  {
    number: 5,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: ['미안해요.', '고마워요.', '반가워요.', '괜찮아요.'],
    answer: '2',
  },
  {
    number: 6,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '잘 지냈어요.',
      '어서 오세요.',
      '네, 안녕히 계세요.',
      '네, 오랜만이에요.',
    ],
    answer: '3',
  },
  {
    number: 7,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['꽃집', '식당', '우체국', '백화점'],
    answer: '4',
  },
  {
    number: 8,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['시장', '약국', '도서관', '여행사'],
    answer: '3',
  },
  {
    number: 9,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['은행', '교실', '극장', '공원'],
    answer: '1',
  },
  {
    number: 10,
    points: 4,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['정류장', '미술관', '운동장', '박물관'],
    answer: '1',
  },
  {
    number: 11,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['일', '집', '시간', '가족'],
    answer: '2',
  },
  {
    number: 12,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['취미', '이름', '음식', '장소'],
    answer: '1',
  },
  {
    number: 13,
    points: 4,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['위치', '휴일', '날씨', '수업'],
    answer: '2',
  },
  {
    number: 14,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['건강', '직업', '고향', '교통'],
    answer: '3',
  },
  {
    number: 15,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '남녀가 수박 가게 앞을 지나갑니다.',
      '여자가 가게에서 수박 가격을 물어봅니다.',
      '여자가 가게에서 과일을 받아 들고 떠납니다.',
      '남녀가 수박을 들고 가게 앞을 지나갑니다.',
    ],
    visualAssetKeys: [
      'topik-i-60-q15-c1',
      'topik-i-60-q15-c2',
      'topik-i-60-q15-c3',
      'topik-i-60-q15-c4',
    ],
    answer: '2',
  },
  {
    number: 16,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '영화관 입구에서 남녀가 만나 안으로 들어갑니다.',
      '영화관에서 여자는 서 있고 남자는 앉아 있습니다.',
      '영화관 매표소에서 여자가 표를 받습니다.',
      '영화관 매표소에서 여자가 표를 사려고 합니다.',
    ],
    visualAssetKeys: [
      'topik-i-60-q16-c1',
      'topik-i-60-q16-c2',
      'topik-i-60-q16-c3',
      'topik-i-60-q16-c4',
    ],
    answer: '1',
  },
  {
    number: 17,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 요리를 잘합니다.',
      '여자는 요리를 자주 합니다.',
      '남자는 요즘 밥을 잘 못 먹습니다.',
      '남자는 보통 집에서 저녁을 먹습니다.',
    ],
    answer: '4',
  },
  {
    number: 18,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 옷을 입어 봤습니다.',
      '남자는 삼만 원을 받았습니다.',
      '남자는 티셔츠를 사려고 합니다.',
      '여자는 남자에게 선물을 합니다.',
    ],
    answer: '3',
  },
  {
    number: 19,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 오늘 집에서 쉽니다.',
      '남자는 어제 많이 아팠습니다.',
      '여자는 오늘 몸이 안 좋습니다.',
      '여자는 어제 학교에 안 갔습니다.',
    ],
    answer: '4',
  },
  {
    number: 20,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 회의에 못 갑니다.',
      '여자는 회의를 늦게 할 겁니다.',
      '남자는 지금부터 회의 준비를 합니다.',
      '여자는 남자와 같이 회의를 할 겁니다.',
    ],
    answer: '4',
  },
  {
    number: 21,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 그림을 배우고 있습니다.',
      '여자는 요즘 미술관에 자주 갑니다.',
      '남자는 그림 보는 것을 좋아합니다.',
      '여자는 지금 미술관에 가고 있습니다.',
    ],
    answer: '3',
  },
  {
    number: 22,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '운전 연습을 많이 해야 합니다.',
      '피곤할 때는 운전을 하면 안 됩니다.',
      '지하철로 회사에 가는 것이 더 좋습니다.',
      '회사에서 지하철역이 가까워서 좋습니다.',
    ],
    answer: '3',
  },
  {
    number: 23,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '창문 쪽에 앉고 싶습니다.',
      '밖에서 먹는 것이 좋습니다.',
      '기다리지 않고 바로 먹고 싶습니다.',
      '사람이 적은 식당에 가는 것이 좋습니다.',
    ],
    answer: '1',
  },
  {
    number: 24,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '혼자 여행을 가고 싶습니다.',
      '여행 계획을 세우기 어렵습니다.',
      '오랫동안 여행을 하는 것이 좋습니다.',
      '계획을 세우고 여행을 가면 좋겠습니다.',
    ],
    answer: '4',
  },
  {
    number: 25,
    points: 3,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '여자가 왜 이 이야기를 하고 있는지 고르십시오.',
    choices: [
      '신청 방법을 말해 주려고',
      '행사 장소를 알려 주려고',
      '행사 날짜를 정하고 싶어서',
      '더 많은 신청을 받고 싶어서',
    ],
    answer: '2',
  },
  {
    number: 26,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '금요일에 행사 신청을 받습니다.',
      '공연은 이번 주에 볼 수 있습니다.',
      '학생회관에서 동아리 발표회를 합니다.',
      '작년보다 발표를 신청한 동아리가 많습니다.',
    ],
    answer: '4',
  },
  {
    number: 27,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    prompt: '두 사람이 무엇에 대해 이야기를 하고 있는지 고르십시오.',
    choices: [
      '인기 있는 운동',
      '운동을 하는 이유',
      '인터넷 수업의 좋은 점',
      '인터넷으로 많이 하는 일',
    ],
    answer: '3',
  },
  {
    number: 28,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '여자는 요가를 배우고 있습니다.',
      '남자는 운동을 열심히 하고 있습니다.',
      '여자는 남자와 같이 운동을 할 겁니다.',
      '남자는 여자에게 운동을 소개했습니다.',
    ],
    answer: '1',
  },
  {
    number: 29,
    points: 3,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '남자가 이 책을 쓴 이유를 고르십시오.',
    choices: [
      '글을 쓰는 것을 좋아해서',
      '특별한 이야기를 쓰고 싶어서',
      '한국 문화에 대한 책이 인기가 있어서',
      '한국 사람의 생활 모습을 소개하고 싶어서',
    ],
    answer: '4',
  },
  {
    number: 30,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '남자는 호텔에서 일을 한 적이 있습니다.',
      '남자는 외국 사람에게 질문을 많이 했습니다.',
      '남자는 외국인을 위한 책을 여러 권 썼습니다.',
      '남자는 앞으로 외국 문화에 대한 책을 쓸 겁니다.',
    ],
    answer: '1',
  },
];

export const TOPIK_I_60_LISTENING_EXAM: TopikSeedExam = {
  code: 'topik-i-listening-60-2018',
  title: {
    ko: '제60회 TOPIK I 듣기',
    uz: '60-TOPIK I tinglash',
    en: '60th TOPIK I Listening',
    ru: '60-й TOPIK I: аудирование',
  },
  description: {
    ko: '제60회 한국어능력시험 TOPIK I 듣기 1번부터 30번까지를 원문 구조 그대로 구성했습니다.',
    uz: '60-TOPIK I tinglash bo‘limining 1–30-savollari asl imtihon tuzilishida.',
    en: 'Questions 1–30 of the 60th TOPIK I Listening test in the original exam structure.',
    ru: 'Задания 1–30 аудирования 60-го TOPIK I в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_I,
  section: TopikSection.LISTENING,
  year: 2018,
  round: 60,
  durationMinutes: 40,
  totalQuestions: 30,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제60회 한국어능력시험 I B-홀수형 듣기',
    edition: '제60회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 제60회 TOPIK I B-홀수형 시험지·정답표·듣기 통합 대본',
  },
  publishedAt: new Date('2018-10-21T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 24 }, (_, index) => [index + 1, index + 1] as const),
  [25, 26] as const,
  [27, 28] as const,
  [29, 30] as const,
];

export const TOPIK_I_60_LISTENING_GROUPS: TopikSeedGroup[] = groupRanges.map(
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
      sharedAudio: TOPIK_I_60_LISTENING_AUDIO[code],
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

export const TOPIK_I_60_LISTENING_QUESTIONS: TopikSeedQuestion[] =
  rawQuestions.map((input) => {
    const choices = topikI37Choices(input.choices, input.visualAssetKeys);
    const sourcePage = sourcePageFor(input.number);
    const shortChoices = input.number <= 16;
    return {
      code: `topik-i-listening-60-q${String(input.number).padStart(2, '0')}`,
      groupCode: groupCodeFor(input.number),
      number: input.number,
      order: input.number,
      type: input.type,
      points: input.points,
      prompt: input.prompt ? textBlocks(input.prompt) : [],
      audio: TOPIK_I_60_LISTENING_AUDIO[groupCodeFor(input.number)],
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
      tags: ['topik-i', 'round-60', 'listening', `question-${input.number}`],
      difficulty: input.number <= 16 ? 1 : input.number <= 24 ? 2 : 3,
      source: {
        pdfPage: sourcePage,
        bookPage: sourcePage - 4,
        reference: '제60회 한국어능력시험 I B-홀수형 (듣기, 읽기)',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_I_60_LISTENING_SEED: TopikExamSeed = {
  exam: TOPIK_I_60_LISTENING_EXAM,
  groups: TOPIK_I_60_LISTENING_GROUPS,
  questions: TOPIK_I_60_LISTENING_QUESTIONS,
};
