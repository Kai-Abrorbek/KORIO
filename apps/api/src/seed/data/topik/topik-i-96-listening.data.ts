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
import { TOPIK_I_96_LISTENING_AUDIO } from './topik-i-96-listening.scripts';

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
    return `topik-i-96-listening-${String(number).padStart(2, '0')}`;
  const start = number % 2 === 1 ? number : number - 1;
  return `topik-i-96-listening-${start}-${start + 1}`;
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

// 제96회 TOPIK I B-홀수형 시험지 PDF pp. 1–8, 정답·배점표 p. 1, 듣기 통합 대본 pp. 1–12.
const rawQuestions: ListeningQuestionInput[] = [
  {
    number: 1,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 모자가 없어요.',
      '아니요, 모자예요.',
      '네, 모자가 많아요.',
      '아니요, 모자가 싸요.',
    ],
    answer: '3',
  },
  {
    number: 2,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 커피가 싫어요.',
      '아니요, 커피를 마셔요.',
      '네, 커피가 아니에요.',
      '아니요, 커피를 안 좋아해요.',
    ],
    answer: '4',
  },
  {
    number: 3,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: ['혼자 가요.', '동생이 가요.', '걸어서 가요.', '한 시에 가요.'],
    answer: '4',
  },
  {
    number: 4,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '어제 공부했어요.',
      '오후에 공부했어요.',
      '친구하고 공부했어요.',
      '한국어를 공부했어요.',
    ],
    answer: '3',
  },
  {
    number: 5,
    points: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '네, 들어오세요.',
      '네, 오랜만이에요.',
      '네, 안녕히 계세요.',
      '네, 여기 앉으세요.',
    ],
    answer: '3',
  },
  {
    number: 6,
    points: 3,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: ['알겠습니다.', '좋겠습니다.', '반갑습니다.', '환영합니다.'],
    answer: '1',
  },
  {
    number: 7,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['학교', '꽃집', '미용실', '사진관'],
    answer: '2',
  },
  {
    number: 8,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['식당', '은행', '공원', '서점'],
    answer: '3',
  },
  {
    number: 9,
    points: 3,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['빵집', '약국', '도서관', '우체국'],
    answer: '2',
  },
  {
    number: 10,
    points: 4,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    choices: ['병원', '극장', '운동장', '가구점'],
    answer: '4',
  },
  {
    number: 11,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['시간', '나이', '이름', '요일'],
    answer: '3',
  },
  {
    number: 12,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['장소', '취미', '운동', '날씨'],
    answer: '1',
  },
  {
    number: 13,
    points: 4,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['교통', '휴일', '위치', '고향'],
    answer: '2',
  },
  {
    number: 14,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    choices: ['계절', '색깔', '생일', '주말'],
    answer: '1',
  },
  {
    number: 15,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '남자가 1층 안내 데스크에서 직원에게 남자 옷의 위치를 묻고 있습니다.',
      '여자가 남자의 바지 길이를 확인하고 있습니다.',
      '남자가 옷 가게에서 직원에게 계산하고 있습니다.',
      '여자가 남자에게 옷을 보여 주고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-i-96-q15-c1',
      'topik-i-96-q15-c2',
      'topik-i-96-q15-c3',
      'topik-i-96-q15-c4',
    ],
    answer: '1',
  },
  {
    number: 16,
    points: 4,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '두 여자가 소파에 앉아 휴대 전화로 사진을 찍고 있습니다.',
      '남자가 벽의 사진을 가리키고 여자가 사진을 들고 있습니다.',
      '두 여자가 탁자에 앉아 사진첩을 보고 있습니다.',
      '한 여자가 다른 여자에게 탁자 위 사진을 보여 주고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-i-96-q16-c1',
      'topik-i-96-q16-c2',
      'topik-i-96-q16-c3',
      'topik-i-96-q16-c4',
    ],
    answer: '2',
  },
  {
    number: 17,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 지금 고향에 있습니다.',
      '여자는 내일 시험이 없습니다.',
      '남자는 오늘 부모님을 만날 겁니다.',
      '여자는 주말에 집에서 쉬려고 합니다.',
    ],
    answer: '4',
  },
  {
    number: 18,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 어제 결혼식에 다녀왔습니다.',
      '남자는 결혼식에서 여자를 만났습니다.',
      '여자는 결혼식에서 사진을 못 찍었습니다.',
      '남자는 일이 끝난 후에 결혼식에 갔습니다.',
    ],
    answer: '1',
  },
  {
    number: 19,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 오늘 늦게 출근했습니다.',
      '여자는 요즘 운동을 자주 합니다.',
      '남자는 아침에 자전거를 타고 왔습니다.',
      '여자는 남자와 함께 자전거로 출근합니다.',
    ],
    answer: '3',
  },
  {
    number: 20,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 그림에 별로 관심이 없습니다.',
      '남자는 여자의 그림을 본 적이 없습니다.',
      '여자는 남자에게 그림을 직접 가르쳤습니다.',
      '여자는 인터넷으로 그림 그리는 것을 배웁니다.',
    ],
    answer: '4',
  },
  {
    number: 21,
    points: 3,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 비빔밥을 하나 주문했습니다.',
      '남자는 여자에게 음식을 주었습니다.',
      '남자는 여자와 함께 식당에 왔습니다.',
      '여자는 식당에서 음식을 먹을 겁니다.',
    ],
    answer: '1',
  },
  {
    number: 22,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '이사를 하는 것이 힘들었습니다.',
      '새로 이사한 곳이 마음에 듭니다.',
      '교통이 편한 곳에서 살고 싶습니다.',
      '집과 학교는 가까운 것이 좋습니다.',
    ],
    answer: '2',
  },
  {
    number: 23,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '노트북은 디자인이 중요합니다.',
      '가벼운 노트북을 사고 싶습니다.',
      '인기가 많은 노트북을 사야 합니다.',
      '노트북 종류가 다양하면 좋겠습니다.',
    ],
    answer: '2',
  },
  {
    number: 24,
    points: 3,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '여행을 자주 가고 싶습니다.',
      '휴가 기간에 여행을 가야 합니다.',
      '여행을 길게 가는 것이 좋습니다.',
      '가까운 곳으로 여행을 가면 좋겠습니다.',
    ],
    answer: '4',
  },
  {
    number: 25,
    points: 3,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '여자가 왜 이 이야기를 하고 있는지 고르십시오.',
    choices: [
      '행사의 신청 방법을 알리기 위해',
      '행사에 온 사람들을 소개하기 위해',
      '행사가 열리는 장소를 안내하기 위해',
      '행사가 끝나는 시간을 알려 주기 위해',
    ],
    answer: '3',
  },
  {
    number: 26,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '공연을 보려면 돈을 내야 합니다.',
      '노래 대회는 조금 전에 끝났습니다.',
      '하늘정원은 주차장 왼쪽에 있습니다.',
      '노래 대회가 끝나고 축하 공연을 합니다.',
    ],
    answer: '4',
  },
  {
    number: 27,
    points: 3,
    type: TopikQuestionType.LISTENING_TOPIC,
    prompt: '두 사람이 무엇에 대해 이야기를 하고 있는지 고르십시오.',
    choices: [
      '대학생들을 위한 요리 교실',
      '대학생들이 자주 가는 식당',
      '대학생들이 요즘 좋아하는 음식',
      '대학생들에게 인기 있는 요리 방법',
    ],
    answer: '1',
  },
  {
    number: 28,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '여자는 요리를 아주 잘합니다.',
      '남자는 어제 학생 식당에 갔습니다.',
      '남자는 평소에 외식을 잘 안 합니다.',
      '여자는 혼자 요리를 배우러 갈 겁니다.',
    ],
    answer: '2',
  },
  {
    number: 29,
    points: 3,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '남자가 이 방송을 만든 이유를 고르십시오.',
    choices: [
      '많은 사람들을 만나 보고 싶어서',
      '방송 일의 즐거움을 알리고 싶어서',
      '다양한 시장의 모습을 소개하고 싶어서',
      '유명한 사람들의 생활을 보여 주고 싶어서',
    ],
    answer: '3',
  },
  {
    number: 30,
    points: 4,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '남자는 책을 쓴 적이 없습니다.',
      '이 방송은 올해 처음 시작했습니다.',
      '이 방송은 아직 유명하지 않습니다.',
      '남자는 앞으로 계속 방송을 만들 겁니다.',
    ],
    answer: '4',
  },
];

export const TOPIK_I_96_LISTENING_EXAM: TopikSeedExam = {
  code: 'topik-i-listening-96-2024',
  title: {
    ko: '제96회 TOPIK I 듣기',
    uz: '96-TOPIK I tinglash',
    en: '96th TOPIK I Listening',
    ru: '96-й TOPIK I: аудирование',
  },
  description: {
    ko: '제96회 한국어능력시험 TOPIK I 듣기 1번부터 30번까지를 원문 구조 그대로 구성했습니다.',
    uz: '96-TOPIK I tinglash bo‘limining 1–30-savollari asl imtihon tuzilishida.',
    en: 'Questions 1–30 of the 96th TOPIK I Listening test in the original exam structure.',
    ru: 'Задания 1–30 аудирования 96-го TOPIK I в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_I,
  section: TopikSection.LISTENING,
  year: 2024,
  round: 96,
  durationMinutes: 40,
  totalQuestions: 30,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제96회 한국어능력시험 I B-홀수형 듣기',
    edition: '제96회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 제96회 TOPIK I B-홀수형 듣기 시험지·정답 및 배점표·통합 대본',
  },
  publishedAt: new Date('2024-10-13T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 24 }, (_, index) => [index + 1, index + 1] as const),
  [25, 26] as const,
  [27, 28] as const,
  [29, 30] as const,
];

export const TOPIK_I_96_LISTENING_GROUPS: TopikSeedGroup[] = groupRanges.map(
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
      sharedAudio: TOPIK_I_96_LISTENING_AUDIO[code],
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

export const TOPIK_I_96_LISTENING_QUESTIONS: TopikSeedQuestion[] =
  rawQuestions.map((input) => {
    const choices = topikI37Choices(input.choices, input.visualAssetKeys);
    const bookPage = bookPageFor(input.number);
    return {
      code: `topik-i-listening-96-q${String(input.number).padStart(2, '0')}`,
      groupCode: groupCodeFor(input.number),
      number: input.number,
      order: input.number,
      type: input.type,
      points: input.points,
      prompt: input.prompt ? textBlocks(input.prompt) : [],
      audio: TOPIK_I_96_LISTENING_AUDIO[groupCodeFor(input.number)],
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
      tags: ['topik-i', 'round-96', 'listening', `question-${input.number}`],
      difficulty: input.number <= 16 ? 1 : input.number <= 24 ? 2 : 3,
      source: {
        pdfPage: bookPage,
        bookPage,
        reference: '제96회 한국어능력시험 I B-홀수형 (듣기, 읽기)',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_I_96_LISTENING_SEED: TopikExamSeed = {
  exam: TOPIK_I_96_LISTENING_EXAM,
  groups: TOPIK_I_96_LISTENING_GROUPS,
  questions: TOPIK_I_96_LISTENING_QUESTIONS,
};
