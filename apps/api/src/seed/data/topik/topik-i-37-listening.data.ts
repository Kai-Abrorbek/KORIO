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
import { TOPIK_I_37_LISTENING_AUDIO } from './topik-i-37-listening.scripts';

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
    return `topik-i-37-listening-${String(number).padStart(2, '0')}`;
  }
  const start = number % 2 === 1 ? number : number - 1;
  return `topik-i-37-listening-${start}-${start + 1}`;
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
  return `[${number % 2 === 1 ? number : number - 1}~${number % 2 === 1 ? number + 1 : number}] 다음을 듣고 물음에 답하십시오.`;
};

const sourcePageFor = (number: number) => {
  if (number <= 4) return 3;
  if (number <= 8) return 4;
  if (number <= 14) return 5;
  if (number <= 16) return 6;
  if (number <= 19) return 7;
  if (number <= 22) return 8;
  if (number <= 24) return 9;
  if (number <= 26) return 10;
  if (number <= 28) return 11;
  return 12;
};

const rawQuestions: ListeningQuestionInput[] = [
  {
    number: 1,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 사전이 많아요.',
      '네, 사전이 없어요.',
      '아니요, 사전이에요.',
      '아니요, 사전이 좋아요.',
    ],
    answer: '1',
  },
  {
    number: 2,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 사과가 작아요.',
      '네, 사과가 있어요.',
      '아니요, 사과가 비싸요.',
      '아니요, 사과가 아니에요.',
    ],
    answer: '3',
  },
  {
    number: 3,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '어제 갔어요.',
      '공원에 갔어요.',
      '동생이 갔어요.',
      '저하고 갔어요.',
    ],
    answer: '2',
  },
  {
    number: 4,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '아침에 배워요.',
      '수영을 배워요.',
      '친구한테 배워요.',
      '운동장에서 배워요.',
    ],
    answer: '2',
  },
  {
    number: 5,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: ['미안해요.', '괜찮아요.', '여기 앉으세요.', '안녕히 계세요.'],
    answer: '4',
  },
  {
    number: 6,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 그런데요.',
      '네, 알겠습니다.',
      '네, 여기 있어요.',
      '네, 들어오세요.',
    ],
    answer: '1',
  },
  {
    number: 7,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['공원', '호텔', '도서관', '기차역'],
    answer: '2',
  },
  {
    number: 8,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['박물관', '사진관', '영화관', '문구점'],
    answer: '1',
  },
  {
    number: 9,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['식당', '회사', '은행', '병원'],
    answer: '4',
  },
  {
    number: 10,
    points: 4,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['가게', '공항', '우체국', '여행사'],
    answer: '2',
  },
  {
    number: 11,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['식사', '계획', '시간', '건강'],
    answer: '1',
  },
  {
    number: 12,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['친구', '소포', '약속', '선물'],
    answer: '4',
  },
  {
    number: 13,
    points: 4,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['날씨', '달력', '하루', '고향'],
    answer: '1',
  },
  {
    number: 14,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['주말', '교통', '여행', '방학'],
    answer: '2',
  },
  {
    number: 15,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '식당 직원이 메뉴를 보고 있는 여자 손님에게 주문을 받고 있습니다.',
      '식당 직원이 여자 손님에게 음식을 내주고 있습니다.',
      '식당에서 남녀가 음료를 마시고 있습니다.',
      '식당에서 여자가 남자에게 메뉴를 보여 주고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-i-37-q15-c1',
      'topik-i-37-q15-c2',
      'topik-i-37-q15-c3',
      'topik-i-37-q15-c4',
    ],
    answer: '4',
  },
  {
    number: 16,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '안경점에서 남자가 시력 검사를 하고 있습니다.',
      '안경점에서 여자가 기계로 눈 검사를 받고 있습니다.',
      '안경점 직원이 여자에게 거울을 보여 주고 있습니다.',
      '안경점에서 여자가 서류를 쓰고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-i-37-q16-c1',
      'topik-i-37-q16-c2',
      'topik-i-37-q16-c3',
      'topik-i-37-q16-c4',
    ],
    answer: '3',
  },
  {
    number: 17,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 내일 책을 가져올 겁니다.',
      '남자는 여자에게 책을 빌렸습니다.',
      '남자는 지금 책을 가지고 있습니다.',
      '여자는 남자에게 책을 받지 못했습니다.',
    ],
    answer: '1',
  },
  {
    number: 18,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 자전거 가게에서 일합니다.',
      '여자는 노란색 자전거를 살 겁니다.',
      '남자는 아이와 함께 가게에 왔습니다.',
      '남자는 아이에게 자전거를 선물했습니다.',
    ],
    answer: '2',
  },
  {
    number: 19,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 사야 할 물건이 많습니다.',
      '남자는 외국에서 이사를 왔습니다.',
      '여자는 외국으로 물건을 보냈습니다.',
      '여자는 남자의 물건을 가져가고 싶어합니다.',
    ],
    answer: '4',
  },
  {
    number: 20,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 부산에 빨리 가고 싶어합니다.',
      '남자는 친구와 부산에 가려고 합니다.',
      '남자는 20분 후에 표를 사려고 합니다.',
      '남자는 부산까지 앉아서 가고 싶어합니다.',
    ],
    answer: '1',
  },
  {
    number: 21,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '방에 아이들 침대가 있습니다.',
      '여자는 방을 예약하려고 합니다.',
      '무료로 침대를 빌릴 수 있습니다.',
      '여자는 침대 두 개가 더 필요합니다.',
    ],
    answer: '4',
  },
  {
    number: 22,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '우리 팀이 계속 이기면 좋겠습니다.',
      '친구들과 같이 봐서 더 신났습니다.',
      '다음 경기는 이길 수 없을 것 같습니다.',
      '상대팀 선수가 많이 다쳐서 걱정했습니다.',
    ],
    answer: '1',
  },
  {
    number: 23,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '미술관에 자주 오고 싶습니다.',
      '오랜만에 여행을 가고 싶습니다.',
      '미술관 구경은 내일 하고 싶습니다.',
      '여행을 가서 구경을 많이 하고 싶습니다.',
    ],
    answer: '3',
  },
  {
    number: 24,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '물건을 빨리 보내야 합니다.',
      '물건은 오늘 중에 도착해야 합니다.',
      '물건이 도착하는 시간을 미리 알려 주어야 합니다.',
      '물건을 많이 보낼 때에는 전화를 해 주어야 합니다.',
    ],
    answer: '3',
  },
  {
    number: 25,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    prompt: '어떤 이야기를 하고 있는지 고르십시오.',
    choices: ['인사', '설명', '주문', '부탁'],
    answer: '2',
  },
  {
    number: 26,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '남자 신발에는 그림이 있습니다.',
      '물에 들어갈 때 이 신발을 신습니다.',
      '이 신발은 나무로 만들어서 불편합니다.',
      '이 신발은 앞과 뒤를 높게 만들었습니다.',
    ],
    answer: '4',
  },
  {
    number: 27,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    prompt: '두 사람이 무엇에 대해 이야기를 하고 있는지 고르십시오.',
    choices: [
      '가구를 사는 곳',
      '회사의 퇴근 시간',
      '퇴근 후에 하는 일',
      '가구를 고르는 방법',
    ],
    answer: '3',
  },
  {
    number: 28,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '여자는 집에서 책상을 만들고 있습니다.',
      '남자는 책상 만드는 방법을 알고 있습니다.',
      '여자는 퇴근 후에 가구 만드는 곳에 갑니다.',
      '남자는 여자에게 식탁을 만들어 주려고 합니다.',
    ],
    answer: '3',
  },
  {
    number: 29,
    points: 3,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '남자는 여자에게 왜 전화를 했습니까?',
    choices: [
      '그릇을 가게에 보내려고',
      '공장에 그릇을 주문하려고',
      '그릇을 아직 보내지 못해서',
      '주문한 그릇의 색깔을 바꾸려고',
    ],
    answer: '3',
  },
  {
    number: 30,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '여자는 남자에게 그릇을 보냈습니다.',
      '여자는 지난주에 그릇을 주문했습니다.',
      '여자는 가게에 가서 그릇을 살 겁니다.',
      '여자는 내일 그릇을 받을 수 있을 겁니다.',
    ],
    answer: '2',
  },
];

export const TOPIK_I_37_LISTENING_EXAM: TopikSeedExam = {
  code: 'topik-i-listening-37-2014',
  title: {
    ko: '제37회 TOPIK I 듣기',
    uz: '37-TOPIK I tinglash',
    en: '37th TOPIK I Listening',
    ru: '37-й TOPIK I: аудирование',
  },
  description: {
    ko: '제37회 한국어능력시험 TOPIK I 듣기 1번부터 30번까지를 원문 구조 그대로 구성했습니다.',
    uz: '37-TOPIK I tinglash bo‘limining 1–30-savollari asl imtihon tuzilishida.',
    en: 'Questions 1–30 of the 37th TOPIK I Listening test in the original exam structure.',
    ru: 'Задания 1–30 аудирования 37-го TOPIK I в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_I,
  section: TopikSection.LISTENING,
  year: 2014,
  round: 37,
  durationMinutes: 40,
  totalQuestions: 30,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제37회 한국어능력시험 I B형 듣기',
    edition: '제37회',
    publisher: '국립국제교육원',
    reference: '사용자 제공 37th TOPIK I Papers.pdf 및 제37회 듣기 통합 대본',
  },
  publishedAt: new Date('2014-11-23T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 24 }, (_, index) => [index + 1, index + 1] as const),
  [25, 26] as const,
  [27, 28] as const,
  [29, 30] as const,
];

export const TOPIK_I_37_LISTENING_GROUPS: TopikSeedGroup[] = groupRanges.map(
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
      sharedAudio: TOPIK_I_37_LISTENING_AUDIO[code],
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

export const TOPIK_I_37_LISTENING_QUESTIONS: TopikSeedQuestion[] =
  rawQuestions.map((input) => {
    const choices = topikI37Choices(input.choices, input.visualAssetKeys);
    const sourcePage = sourcePageFor(input.number);
    const shortChoices = input.number <= 16 || input.number === 25;

    return {
      code: `topik-i-listening-37-q${String(input.number).padStart(2, '0')}`,
      groupCode: groupCodeFor(input.number),
      number: input.number,
      order: input.number,
      type: input.type,
      points: input.points,
      prompt: input.prompt ? textBlocks(input.prompt) : [],
      audio: TOPIK_I_37_LISTENING_AUDIO[groupCodeFor(input.number)],
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
      tags: ['topik-i', 'round-37', 'listening', `question-${input.number}`],
      difficulty: input.number <= 16 ? 1 : input.number <= 24 ? 2 : 3,
      source: {
        pdfPage: sourcePage,
        bookPage: sourcePage - 2,
        reference: '제37회 한국어능력시험 I B형 (듣기, 읽기)',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_I_37_LISTENING_SEED: TopikExamSeed = {
  exam: TOPIK_I_37_LISTENING_EXAM,
  groups: TOPIK_I_37_LISTENING_GROUPS,
  questions: TOPIK_I_37_LISTENING_QUESTIONS,
};
