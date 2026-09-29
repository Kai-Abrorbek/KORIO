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
import { TOPIK_I_36_LISTENING_AUDIO } from './topik-i-36-listening.scripts';

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
    return `topik-i-36-listening-${String(number).padStart(2, '0')}`;
  }
  const start = number % 2 === 1 ? number : number - 1;
  return `topik-i-36-listening-${start}-${start + 1}`;
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
    return '[22~24] 다음을 듣고 남자의 중심 생각을 고르십시오. (각 3점)';
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

// Source: 제36회 TOPIK I B형 시험지 pp. 3–10, 듣기 통합 대본 pp. 1–12,
// 정답표 p. 1. Choice text and points follow the original paper.
const rawQuestions: ListeningQuestionInput[] = [
  {
    number: 1,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 공책이에요.',
      '네, 공책이 없어요.',
      '아니요, 공책이 싸요.',
      '아니요, 공책이 커요.',
    ],
    answer: '1',
  },
  {
    number: 2,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 숙제예요.',
      '네, 숙제를 알아요.',
      '아니요, 숙제가 없어요.',
      '아니요, 숙제를 좋아해요.',
    ],
    answer: '3',
  },
  {
    number: 3,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '두 개 살 거예요.',
      '지갑을 살 거예요.',
      '주말에 살 거예요.',
      '시장에서 살 거예요.',
    ],
    answer: '2',
  },
  {
    number: 4,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '혼자 일했어요.',
      '3년 일했어요.',
      '오후에 일했어요.',
      '집에서 일했어요.',
    ],
    answer: '2',
  },
  {
    number: 5,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '미안합니다.',
      '감사합니다.',
      '안녕히 가십시오.',
      '만나서 반갑습니다.',
    ],
    answer: '4',
  },
  {
    number: 6,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: ['괜찮아요.', '죄송해요.', '잘 다녀오세요.', '잘 부탁드려요.'],
    answer: '3',
  },
  {
    number: 7,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['교실', '식당', '가게', '공원'],
    answer: '3',
  },
  {
    number: 8,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['극장', '은행', '공항', '약국'],
    answer: '1',
  },
  {
    number: 9,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['여행사', '도서관', '우체국', '미술관'],
    answer: '3',
  },
  {
    number: 10,
    points: 4,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['빵집', '회사', '미용실', '박물관'],
    answer: '1',
  },
  {
    number: 11,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['옷', '값', '생일', '날짜'],
    answer: '1',
  },
  {
    number: 12,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['시간', '나이', '음식', '기분'],
    answer: '2',
  },
  {
    number: 13,
    points: 4,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['휴일', '달력', '사진', '그림'],
    answer: '3',
  },
  {
    number: 14,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['가구', '주소', '계절', '선물'],
    answer: '1',
  },
  {
    number: 15,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    // Faithful descriptions of the four original drawings on paper PDF p. 6.
    choices: [
      '남자가 상자를 들고 여자에게 건네고 있습니다.',
      '여자가 상자를 들고 문 앞에 있는 남자에게 다가가고 있습니다.',
      '여자가 상자를 들고 열린 문을 지나가고 있습니다.',
      '남자와 여자가 함께 상자를 들고 문을 지나가고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-i-36-q15-c1',
      'topik-i-36-q15-c2',
      'topik-i-36-q15-c3',
      'topik-i-36-q15-c4',
    ],
    answer: '2',
  },
  {
    number: 16,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '직원이 음식을 가져다주고 있고 여자 손님은 전화기를 들고 있습니다.',
      '직원이 바닥에 떨어진 전화기를 줍고 있습니다.',
      '여자 손님이 계산대에서 전화기를 들고 있습니다.',
      '직원이 떠나는 여자 손님에게 놓고 간 전화기를 돌려주고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-i-36-q16-c1',
      'topik-i-36-q16-c2',
      'topik-i-36-q16-c3',
      'topik-i-36-q16-c4',
    ],
    answer: '4',
  },
  {
    number: 17,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 감기에 걸렸습니다.',
      '여자는 지금 많이 춥습니다.',
      '여자는 밤에 옷을 얇게 입습니다.',
      '남자는 날씨가 시원해서 좋습니다.',
    ],
    answer: '1',
  },
  {
    number: 18,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 요즘 시간이 많습니다.',
      '여자는 어제 이메일을 읽었습니다.',
      '여자는 금요일 약속을 취소했습니다.',
      '여자는 이번 모임에 나갈 수 없습니다.',
    ],
    answer: '4',
  },
  {
    number: 19,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 신청서를 썼습니다.',
      '여자는 수영장에서 일합니다.',
      '여자는 아침에 수영을 배울 겁니다.',
      '여자는 회사에서 운동을 하려고 합니다.',
    ],
    answer: '3',
  },
  {
    number: 20,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 다음 주에 음악회에 갑니다.',
      '남자는 아버지의 선물을 준비했습니다.',
      '남자는 부모님과 음악회에 가고 싶어합니다.',
      '여자는 인터넷으로 공연을 찾아보려고 합니다.',
    ],
    answer: '3',
  },
  {
    number: 21,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 지금 행사장에 있습니다.',
      '남자는 물건을 사서 사무실로 오면 됩니다.',
      '남자는 여자에게 필요한 물건을 써 주었습니다.',
      '남자는 행사 때 쓸 물건을 책상 위에 놓았습니다.',
    ],
    answer: '2',
  },
  {
    number: 22,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '걷는 것은 좋은 운동이 됩니다.',
      '산책은 저녁에 하는 것이 좋습니다.',
      '공원 안에 호수를 만들어야 합니다.',
      '집 근처에 공원이 생기면 좋겠습니다.',
    ],
    answer: '4',
  },
  {
    number: 23,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '불편한 자리는 가격을 싸게 해야 합니다.',
      '연극도 영화처럼 값이 싸면 좋겠습니다.',
      '영화는 앞자리에서 보면 더 재미있습니다.',
      '영화관은 모든 자리를 편하게 해야 합니다.',
    ],
    answer: '1',
  },
  {
    number: 24,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '마라톤 대회를 일찍 끝내야 합니다.',
      '마라톤을 하면 길이 막혀서 싫습니다.',
      '마라톤은 아침 시간에 하는 것이 좋습니다.',
      '마라톤 때문에 길이 좀 막혀도 참아야 합니다.',
    ],
    answer: '4',
  },
  {
    number: 25,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    prompt: '어떤 이야기를 하고 있는지 고르십시오.',
    choices: ['감사', '부탁', '신청', '소개'],
    answer: '4',
  },
  {
    number: 26,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '실내 정원은 가꾸기가 어렵지 않습니다.',
      '이 책은 실내 정원을 만들 때 도움이 됩니다.',
      '이 책을 보면 정원의 종류를 알 수 있습니다.',
      '꽃을 키우는 방법은 책으로 배우기가 힘듭니다.',
    ],
    answer: '2',
  },
  {
    number: 27,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    prompt: '두 사람이 무엇에 대해 이야기를 하고 있는지 고르십시오.',
    choices: [
      '방학 때 하고 싶은 일',
      '방학 때 한 새로운 경험',
      '방학 때 간 특별한 여행',
      '방학 때 만나고 싶은 사람',
    ],
    answer: '1',
  },
  {
    number: 28,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '여자는 요즘 기타를 배우고 있습니다.',
      '여자는 방학에 여행을 할 계획입니다.',
      '여자는 자전거 여행이 힘들어서 싫습니다.',
      '여자는 다음 주에 선생님을 찾아갈 겁니다.',
    ],
    answer: '2',
  },
  {
    number: 29,
    points: 3,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '여자는 왜 아이에게 통장을 만들어 줍니까?',
    choices: [
      '아이가 돈을 모으고 싶어해서',
      '아이가 돈을 많이 가지고 있어서',
      '아이가 통장을 바꿀 때가 되어서',
      '아이가 자기 통장을 갖고 싶어해서',
    ],
    answer: '4',
  },
  {
    number: 30,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '여자는 지금 도장을 가지고 있습니다.',
      '여자는 내일 은행에 다시 오려고 합니다.',
      '여자는 아이에게 입학 선물을 주었습니다.',
      '여자는 오늘 어린이 통장을 만들었습니다.',
    ],
    answer: '2',
  },
];

export const TOPIK_I_36_LISTENING_EXAM: TopikSeedExam = {
  code: 'topik-i-listening-36-2014',
  title: {
    ko: '제36회 TOPIK I 듣기',
    uz: '36-TOPIK I tinglash',
    en: '36th TOPIK I Listening',
    ru: '36-й TOPIK I: аудирование',
  },
  description: {
    ko: '제36회 한국어능력시험 TOPIK I 듣기 1번부터 30번까지를 원문 구조 그대로 구성했습니다.',
    uz: '36-TOPIK I tinglash bo‘limining 1–30-savollari asl imtihon tuzilishida.',
    en: 'Questions 1–30 of the 36th TOPIK I Listening test in the original exam structure.',
    ru: 'Задания 1–30 аудирования 36-го TOPIK I в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_I,
  section: TopikSection.LISTENING,
  year: 2014,
  round: 36,
  durationMinutes: 40,
  totalQuestions: 30,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제36회 한국어능력시험 I B형 듣기',
    edition: '제36회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 test-paper-paper (1).pdf, listening-transcript-transcript.pdf, answer-keys-answers.pdf',
  },
  publishedAt: new Date('2014-10-12T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 24 }, (_, index) => [index + 1, index + 1] as const),
  [25, 26] as const,
  [27, 28] as const,
  [29, 30] as const,
];

export const TOPIK_I_36_LISTENING_GROUPS: TopikSeedGroup[] = groupRanges.map(
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
      sharedAudio: TOPIK_I_36_LISTENING_AUDIO[code],
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

export const TOPIK_I_36_LISTENING_QUESTIONS: TopikSeedQuestion[] =
  rawQuestions.map((input) => {
    const choices = topikI37Choices(input.choices, input.visualAssetKeys);
    const sourcePage = sourcePageFor(input.number);
    const shortChoices = input.number <= 16 || input.number === 25;

    return {
      code: `topik-i-listening-36-q${String(input.number).padStart(2, '0')}`,
      groupCode: groupCodeFor(input.number),
      number: input.number,
      order: input.number,
      type: input.type,
      points: input.points,
      prompt: input.prompt ? textBlocks(input.prompt) : [],
      audio: TOPIK_I_36_LISTENING_AUDIO[groupCodeFor(input.number)],
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
      tags: ['topik-i', 'round-36', 'listening', `question-${input.number}`],
      difficulty: input.number <= 16 ? 1 : input.number <= 24 ? 2 : 3,
      source: {
        pdfPage: sourcePage,
        bookPage: sourcePage - 2,
        reference: '제36회 한국어능력시험 I B형 (듣기, 읽기)',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_I_36_LISTENING_SEED: TopikExamSeed = {
  exam: TOPIK_I_36_LISTENING_EXAM,
  groups: TOPIK_I_36_LISTENING_GROUPS,
  questions: TOPIK_I_36_LISTENING_QUESTIONS,
};
