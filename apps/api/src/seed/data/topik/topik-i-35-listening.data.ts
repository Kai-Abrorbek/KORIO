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
import { TOPIK_I_35_LISTENING_AUDIO } from './topik-i-35-listening.scripts';

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
  if (number <= 24) {
    return `topik-i-35-listening-${String(number).padStart(2, '0')}`;
  }
  const start = number % 2 === 1 ? number : number - 1;
  return `topik-i-35-listening-${start}-${start + 1}`;
};

const instructionFor = (number: number) => {
  if (number <= 4)
    return '[01~04] 다음을 듣고 <보기>와 같이 물음에 맞는 대답을 고르십시오.';
  if (number <= 6)
    return '[05~06] 다음을 듣고 <보기>와 같이 다음 말에 이어지는 것을 고르십시오.';
  if (number <= 10)
    return '[07~10] 여기는 어디입니까? <보기>와 같이 알맞은 것을 고르십시오.';
  if (number <= 14)
    return '[11~14] 다음은 무엇에 대해 말하고 있습니까? <보기>와 같이 알맞은 것을 고르십시오.';
  if (number <= 16)
    return '[15~16] 다음 대화를 듣고 알맞은 그림을 고르십시오. (각 4점)';
  if (number <= 21)
    return '[17~21] 다음을 듣고 <보기>와 같이 대화 내용과 같은 것을 고르십시오. (각 3점)';
  if (number <= 24)
    return '[22~24] 다음을 듣고 대화 내용과 같은 것을 고르십시오. (각 3점)';
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

// Source: 제35회 TOPIK I B형 시험지 pp. 3–10, 듣기 통합 대본 pp. 1–12,
// 정답표 p. 1. Choice text and points follow the original paper.
const rawQuestions: ListeningQuestionInput[] = [
  {
    number: 1,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 우산이에요.',
      '아니요, 우산을 써요.',
      '네, 우산이 있어요.',
      '아니요, 우산이 아니에요.',
    ],
    answer: '3',
  },
  {
    number: 2,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 회사에 없어요.',
      '아니요, 회사에 안 가요.',
      '네, 회사가 아니에요.',
      '아니요, 회사에서 일해요.',
    ],
    answer: '2',
  },
  {
    number: 3,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '친구와 마셨어요.',
      '한 잔 마셨어요.',
      '커피숍에서 마셨어요.',
      '오늘 아침에 마셨어요.',
    ],
    answer: '1',
  },
  {
    number: 4,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: ['어제 샀어요.', '아주 예뻐요.', '제 바지예요.', '오늘 입었어요.'],
    answer: '2',
  },
  {
    number: 5,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: ['잘 가요.', '고마워요.', '반가워요.', '안녕하세요.'],
    answer: '1',
  },
  {
    number: 6,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 부탁합니다.',
      '네, 들어오세요.',
      '네, 그렇습니다.',
      '네, 안녕히 가세요.',
    ],
    answer: '2',
  },
  {
    number: 7,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['꽃집', '약국', '문구점', '커피숍'],
    answer: '2',
  },
  {
    number: 8,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['공항', '시장', '빵집', '교실'],
    answer: '4',
  },
  {
    number: 9,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['미용실', '사진관', '도서관', '우체국'],
    answer: '3',
  },
  {
    number: 10,
    points: 4,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['서점', '식당', '수영장', '운동장'],
    answer: '4',
  },
  {
    number: 11,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['값', '맛', '일', '집'],
    answer: '1',
  },
  {
    number: 12,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['생일', '날짜', '나이', '시간'],
    answer: '4',
  },
  {
    number: 13,
    points: 4,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['선물', '계절', '취미', '사진'],
    answer: '3',
  },
  {
    number: 14,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['여행', '요일', '날씨', '휴일'],
    answer: '4',
  },
  {
    number: 15,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    // Faithful descriptions of the four original drawings on paper PDF p. 6.
    choices: [
      '졸업식장 앞에서 남자가 학사모를 쓴 여자에게 꽃다발을 건네고 있습니다.',
      '집 앞에서 여자가 화분에 물을 주고 남자는 물통을 들고 있습니다.',
      '졸업식장에서 꽃다발을 든 여자와 남자가 나란히 서서 사진을 찍고 있습니다.',
      '꽃집에서 남자가 여자에게 꽃다발을 건네고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-i-35-q15-c1',
      'topik-i-35-q15-c2',
      'topik-i-35-q15-c3',
      'topik-i-35-q15-c4',
    ],
    answer: '1',
  },
  {
    number: 16,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '자전거가 세워진 길에서 남자와 여자가 걸어가고 있습니다.',
      '남자와 여자가 한 대의 2인용 자전거를 함께 타고 있습니다.',
      '남자가 앞에서 자전거를 타고, 여자가 뒤에서 다른 자전거를 타고 있습니다.',
      '자전거 가게에서 남자가 자전거를 고치고 여자가 옆에 서 있습니다.',
    ],
    visualAssetKeys: [
      'topik-i-35-q16-c1',
      'topik-i-35-q16-c2',
      'topik-i-35-q16-c3',
      'topik-i-35-q16-c4',
    ],
    answer: '3',
  },
  {
    number: 17,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 돈을 찾았습니다.',
      '남자는 지금 은행에 있습니다.',
      '여자는 은행에 가려고 합니다.',
      '남자는 은행에 가는 길을 모릅니다.',
    ],
    answer: '3',
  },
  {
    number: 18,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 미술관에서 일하고 있습니다.',
      '남자는 미술관 안을 구경하고 있습니다.',
      '남자는 여자에게 사진기를 빌리려고 합니다.',
      '여자는 사진기를 가지고 미술관에 들어갔습니다.',
    ],
    answer: '4',
  },
  {
    number: 19,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 토요일에 할 일이 없습니다.',
      '남자는 직접 빵을 만들어 먹습니다.',
      '여자는 빵 만드는 것을 좋아합니다.',
      '남자는 여자와 같이 빵을 만듭니다.',
    ],
    answer: '3',
  },
  {
    number: 20,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 지금 집에 있습니다.',
      '여자는 회의 자료가 필요합니다.',
      '여자는 다른 사람에게 연락을 했습니다.',
      '남자는 여자에게 회의 자료를 보냈습니다.',
    ],
    answer: '2',
  },
  {
    number: 21,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 회사 일이 일찍 끝납니다.',
      '여자는 여권을 신청하고 싶어 합니다.',
      '남자는 여권을 신청하는 곳을 모릅니다.',
      '남자는 인터넷으로 여권을 신청합니다.',
    ],
    answer: '2',
  },
  {
    number: 22,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '이 일은 주말에 합니다.',
      '이 일은 백화점에서 합니다.',
      '이 일은 오늘부터 시작합니다.',
      '이 일은 일주일에 세 시간 합니다.',
    ],
    answer: '2',
  },
  {
    number: 23,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '이 식당은 메뉴가 하나입니다.',
      '이 식당은 회사 안에 있습니다.',
      '이 식당은 늦게 문을 닫습니다.',
      '이 식당은 손님이 별로 없습니다.',
    ],
    answer: '1',
  },
  {
    number: 24,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '이 가방은 인기가 있습니다.',
      '이 가방은 주머니가 없습니다.',
      '이 가방은 색깔이 한 가지입니다.',
      '이 가방은 튼튼하지만 무겁습니다.',
    ],
    answer: '1',
  },
  {
    number: 25,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    prompt: '어떤 이야기를 하고 있는지 고르십시오.',
    choices: ['부탁', '질문', '초대', '안내'],
    answer: '4',
  },
  {
    number: 26,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '사람들은 지금 호텔 방에 있습니다.',
      '사람들은 짐을 직접 가지고 가야 합니다.',
      '수영장을 이용하려면 돈을 내야 합니다.',
      '도움이 필요하면 301호로 연락하면 됩니다.',
    ],
    answer: '4',
  },
  {
    number: 27,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    prompt: '두 사람이 무엇에 대해 이야기를 하고 있는지 고르십시오.',
    choices: [
      '소포를 빨리 보내는 방법',
      '소포를 싸게 보내는 방법',
      '소포를 잘 포장하는 방법',
      '소포를 쉽게 보내는 방법',
    ],
    answer: '1',
  },
  {
    number: 28,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '여자는 부산에서 소포를 보냅니다.',
      '여자는 빨리 소포를 받고 싶어 합니다.',
      '여자는 소포를 특급으로 보낼 겁니다.',
      '여자는 내일 오전에 소포를 받을 겁니다.',
    ],
    answer: '3',
  },
  {
    number: 29,
    points: 3,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '두 사람은 왜 김치를 만듭니까?',
    choices: [
      '할머니들께 드리고 싶어서',
      '할머니들과 같이 먹고 싶어서',
      '김치를 한번 담가 보고 싶어서',
      '김치를 혼자 담그기가 힘들어서',
    ],
    answer: '1',
  },
  {
    number: 30,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '남자는 이 모임에 간 적이 있습니다.',
      '남자는 이번 주말에 모임에 갈 겁니다.',
      '이 모임에서는 할머니들이 음식을 만듭니다.',
      '이 모임에서는 이번 주말에 청소를 할 겁니다.',
    ],
    answer: '2',
  },
];

export const TOPIK_I_35_LISTENING_EXAM: TopikSeedExam = {
  code: 'topik-i-listening-35-2014',
  title: {
    ko: '제35회 TOPIK I 듣기',
    uz: '35-TOPIK I tinglash',
    en: '35th TOPIK I Listening',
    ru: '35-й TOPIK I: аудирование',
  },
  description: {
    ko: '제35회 한국어능력시험 TOPIK I 듣기 1번부터 30번까지를 원문 구조 그대로 구성했습니다.',
    uz: '35-TOPIK I tinglash bo‘limining 1–30-savollari asl imtihon tuzilishida.',
    en: 'Questions 1–30 of the 35th TOPIK I Listening test in the original exam structure.',
    ru: 'Задания 1–30 аудирования 35-го TOPIK I в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_I,
  section: TopikSection.LISTENING,
  year: 2014,
  round: 35,
  durationMinutes: 40,
  totalQuestions: 30,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제35회 한국어능력시험 I B형 듣기',
    edition: '제35회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 test-paper-paper.pdf, listening-transcript-transcript.pdf, answer-keys-answers.pdf',
  },
  publishedAt: new Date('2014-07-20T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 24 }, (_, index) => [index + 1, index + 1] as const),
  [25, 26] as const,
  [27, 28] as const,
  [29, 30] as const,
];

export const TOPIK_I_35_LISTENING_GROUPS: TopikSeedGroup[] = groupRanges.map(
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
      sharedAudio: TOPIK_I_35_LISTENING_AUDIO[code],
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

export const TOPIK_I_35_LISTENING_QUESTIONS: TopikSeedQuestion[] =
  rawQuestions.map((input) => {
    // The 37th-round helpers implement the shared four-choice/solution shape.
    const choices = topikI37Choices(input.choices, input.visualAssetKeys);
    const sourcePage = sourcePageFor(input.number);
    const shortChoices = input.number <= 16 || input.number === 25;

    return {
      code: `topik-i-listening-35-q${String(input.number).padStart(2, '0')}`,
      groupCode: groupCodeFor(input.number),
      number: input.number,
      order: input.number,
      type: input.type,
      points: input.points,
      prompt: input.prompt ? textBlocks(input.prompt) : [],
      audio: TOPIK_I_35_LISTENING_AUDIO[groupCodeFor(input.number)],
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
      tags: ['topik-i', 'round-35', 'listening', `question-${input.number}`],
      difficulty: input.number <= 16 ? 1 : input.number <= 24 ? 2 : 3,
      source: {
        pdfPage: sourcePage,
        bookPage: sourcePage - 2,
        reference: '제35회 한국어능력시험 I B형 (듣기, 읽기)',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_I_35_LISTENING_SEED: TopikExamSeed = {
  exam: TOPIK_I_35_LISTENING_EXAM,
  groups: TOPIK_I_35_LISTENING_GROUPS,
  questions: TOPIK_I_35_LISTENING_QUESTIONS,
};
