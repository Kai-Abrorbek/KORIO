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
import { TOPIK_I_91_LISTENING_AUDIO } from './topik-i-91-listening.scripts';

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
    return `topik-i-91-listening-${String(number).padStart(2, '0')}`;
  const start = number % 2 === 1 ? number : number - 1;
  return `topik-i-91-listening-${start}-${start + 1}`;
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

// 제91회 TOPIK I B-홀수형 시험지 PDF pp. 2–9, 정답·배점표 p. 1, 듣기 통합 대본 pp. 1–12.
const rawQuestions: ListeningQuestionInput[] = [
  {
    number: 1,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 학생이에요.',
      '네, 학생이 없어요.',
      '아니요, 학생이 와요.',
      '아니요, 학생이 좋아요.',
    ],
    answer: '1',
  },
  {
    number: 2,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 과자가 비싸요.',
      '네, 과자가 아니에요.',
      '아니요, 과자를 먹어요.',
      '아니요, 과자를 안 좋아해요.',
    ],
    answer: '4',
  },
  {
    number: 3,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '매일 마셔요.',
      '제가 마셔요.',
      '우유를 마셔요.',
      '집에서 마셔요.',
    ],
    answer: '3',
  },
  {
    number: 4,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: ['내일 가요.', '공원에 가요.', '동생이 가요.', '지하철로 가요.'],
    answer: '4',
  },
  {
    number: 5,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: ['고맙습니다.', '반갑습니다.', '실례합니다.', '환영합니다.'],
    answer: '1',
  },
  {
    number: 6,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 어서 오세요.',
      '네, 잘 다녀오세요.',
      '네, 안녕히 주무세요.',
      '네, 잠깐만 기다리세요.',
    ],
    answer: '4',
  },
  {
    number: 7,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['극장', '병원', '은행', '식당'],
    answer: '1',
  },
  {
    number: 8,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['미용실', '정류장', '우체국', '사진관'],
    answer: '2',
  },
  {
    number: 9,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['꽃집', '서점', '약국', '빵집'],
    answer: '2',
  },
  {
    number: 10,
    points: 4,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['가구점', '여행사', '신발 가게', '안경 가게'],
    answer: '3',
  },
  {
    number: 11,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['값', '맛', '주말', '시간'],
    answer: '2',
  },
  {
    number: 12,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['운동', '요일', '나라', '장소'],
    answer: '4',
  },
  {
    number: 13,
    points: 4,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['계획', '날씨', '약속', '위치'],
    answer: '2',
  },
  {
    number: 14,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['고향', '여행', '취미', '휴일'],
    answer: '1',
  },
  {
    number: 15,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '남자가 가방 가게 앞에서 직원에게 작은 가방이 있는지 묻고 있습니다.',
      '남자가 가방 가게를 나가고 있습니다.',
      '남녀가 가방을 들고 가게 안을 걷고 있습니다.',
      '남자가 여자가 멘 가방을 보고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-i-91-q15-c1',
      'topik-i-91-q15-c2',
      'topik-i-91-q15-c3',
      'topik-i-91-q15-c4',
    ],
    answer: '1',
  },
  {
    number: 16,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '남자가 책상을 닦고 여자가 바닥을 닦고 있습니다.',
      '남자가 여자에게 책상을 닦을 천을 건네고 있습니다.',
      '남녀가 청소기로 방을 청소하고 있습니다.',
      '남녀가 의자에 앉아 음료를 마시고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-i-91-q16-c1',
      'topik-i-91-q16-c2',
      'topik-i-91-q16-c3',
      'topik-i-91-q16-c4',
    ],
    answer: '2',
  },
  {
    number: 17,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 방학에 공부를 했습니다.',
      '여자는 여행을 가지 못했습니다.',
      '여자는 방학에 남자를 자주 만났습니다.',
      '남자는 아르바이트를 한 적이 없습니다.',
    ],
    answer: '1',
  },
  {
    number: 18,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 김준 씨를 모릅니다.',
      '여자는 김준 씨를 좋아합니다.',
      '여자는 어제 김준 씨를 만났습니다.',
      '남자는 김준 씨와 사진을 찍지 못했습니다.',
    ],
    answer: '2',
  },
  {
    number: 19,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 오늘 수업이 없습니다.',
      '남자는 여자와 축구를 볼 겁니다.',
      '여자는 오후에 남자의 집에 가려고 합니다.',
      '여자는 축구를 보기 전에 저녁을 먹을 겁니다.',
    ],
    answer: '2',
  },
  {
    number: 20,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 주말에 바쁩니다.',
      '여자는 오 년 동안 기타를 쳤습니다.',
      '여자는 혼자 기타 연습을 했습니다.',
      '남자는 여자에게 기타를 배우려고 합니다.',
    ],
    answer: '3',
  },
  {
    number: 21,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 새 휴대 전화를 받았습니다.',
      '남자는 휴대 전화를 찾으러 왔습니다.',
      '남자의 휴대 전화는 고칠 수 없습니다.',
      '남자의 휴대 전화는 소리가 들리지 않습니다.',
    ],
    answer: '4',
  },
  {
    number: 22,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '이번 시험을 잘 보고 싶습니다.',
      '친구와 같이 공부하고 싶습니다.',
      '아침 일찍 일어나는 것이 좋습니다.',
      '피곤할 때 더 많이 자는 것이 좋습니다.',
    ],
    answer: '3',
  },
  {
    number: 23,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '냉면을 만들어 먹고 싶습니다.',
      '음식을 바로 주문해야 합니다.',
      '냉면이 빨리 나오면 좋겠습니다.',
      '음식을 배달해서 먹는 것이 좋습니다.',
    ],
    answer: '3',
  },
  {
    number: 24,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '수첩을 찾으러 가고 싶습니다.',
      '수업 시간에 늦으면 안 됩니다.',
      '수첩을 새로 사는 것이 좋습니다.',
      '중요한 일은 천천히 해야 합니다.',
    ],
    answer: '1',
  },
  {
    number: 25,
    points: 3,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '여자가 왜 이 이야기를 하고 있는지 고르십시오.',
    choices: [
      '마트의 위치를 가르쳐 주려고',
      '마트의 할인 상품을 소개하려고',
      '마트를 이용할 수 있는 시간을 안내하려고',
      '마트가 새로 문을 여는 것을 알려 주려고',
    ],
    answer: '3',
  },
  {
    number: 26,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '이 마트는 오늘 이용할 수 없습니다.',
      '이 마트에서는 채소를 팔지 않습니다.',
      '이 마트는 매일 오전 열 시에 시작합니다.',
      '이 마트는 주말에 평일보다 늦게 문을 닫습니다.',
    ],
    answer: '4',
  },
  {
    number: 27,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    prompt: '두 사람이 무엇에 대해 이야기를 하고 있는지 고르십시오.',
    choices: [
      '미술관이 있는 장소',
      '미술관에서 일하는 사람',
      '미술관에 갈 수 있는 날',
      '미술관에서 할 수 있는 일',
    ],
    answer: '4',
  },
  {
    number: 28,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '남자는 이 미술관에 가 본 적이 있습니다.',
      '여자는 이 미술관에서 인형을 만들었습니다.',
      '남자는 이 미술관에서 산 옷을 입고 있습니다.',
      '남자는 이 미술관에서 산 필통을 가지고 있습니다.',
    ],
    answer: '1',
  },
  {
    number: 29,
    points: 3,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '여자가 수영을 배우게 된 이유를 고르십시오.',
    choices: [
      '수영을 가르치고 싶어서',
      '수영이 건강에 도움이 돼서',
      '아버지가 유명한 수영 선수라서',
      '어렸을 때 본 선수처럼 되고 싶어서',
    ],
    answer: '4',
  },
  {
    number: 30,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '여자는 작년에 수영 대회에 나갔습니다.',
      '여자는 중학생 때 수영을 시작했습니다.',
      '여자는 다음 달 수영 대회에 참가할 겁니다.',
      '여자는 수영 대회에서 상을 못 받았습니다.',
    ],
    answer: '3',
  },
];

export const TOPIK_I_91_LISTENING_EXAM: TopikSeedExam = {
  code: 'topik-i-listening-91-2023',
  title: {
    ko: '제91회 TOPIK I 듣기',
    uz: '91-TOPIK I tinglash',
    en: '91st TOPIK I Listening',
    ru: '91-й TOPIK I: аудирование',
  },
  description: {
    ko: '제91회 한국어능력시험 TOPIK I 듣기 1번부터 30번까지를 원문 구조 그대로 구성했습니다.',
    uz: '91-TOPIK I tinglash bo‘limining 1–30-savollari asl imtihon tuzilishida.',
    en: 'Questions 1–30 of the 91st TOPIK I Listening test in the original exam structure.',
    ru: 'Задания 1–30 аудирования 91-го TOPIK I в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_I,
  section: TopikSection.LISTENING,
  year: 2023,
  round: 91,
  durationMinutes: 40,
  totalQuestions: 30,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제91회 한국어능력시험 I B-홀수형 듣기',
    edition: '제91회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 제91회 TOPIK I B-홀수형 듣기 시험지·정답 및 배점표·통합 대본',
  },
  publishedAt: new Date('2023-11-12T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 24 }, (_, index) => [index + 1, index + 1] as const),
  [25, 26] as const,
  [27, 28] as const,
  [29, 30] as const,
];

export const TOPIK_I_91_LISTENING_GROUPS: TopikSeedGroup[] = groupRanges.map(
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
      sharedAudio: TOPIK_I_91_LISTENING_AUDIO[code],
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

export const TOPIK_I_91_LISTENING_QUESTIONS: TopikSeedQuestion[] =
  rawQuestions.map((input) => {
    const choices = topikI37Choices(input.choices, input.visualAssetKeys);
    const bookPage = bookPageFor(input.number);
    const shortChoices = input.number <= 16;
    return {
      code: `topik-i-listening-91-q${String(input.number).padStart(2, '0')}`,
      groupCode: groupCodeFor(input.number),
      number: input.number,
      order: input.number,
      type: input.type,
      points: input.points,
      prompt: input.prompt ? textBlocks(input.prompt) : [],
      audio: TOPIK_I_91_LISTENING_AUDIO[groupCodeFor(input.number)],
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
      tags: ['topik-i', 'round-91', 'listening', `question-${input.number}`],
      difficulty: input.number <= 16 ? 1 : input.number <= 24 ? 2 : 3,
      source: {
        pdfPage: bookPage + 1,
        bookPage,
        reference: '제91회 한국어능력시험 I B-홀수형 (듣기, 읽기)',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_I_91_LISTENING_SEED: TopikExamSeed = {
  exam: TOPIK_I_91_LISTENING_EXAM,
  groups: TOPIK_I_91_LISTENING_GROUPS,
  questions: TOPIK_I_91_LISTENING_QUESTIONS,
};
