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
import { TopikAnswerKey, topikI37Solution } from './topik-i-37.helpers';
import { TOPIK_II_83_LISTENING_AUDIO } from './topik-ii-83-listening.scripts';
import { TOPIK_II_83_LISTENING_RAW_QUESTIONS } from './topik-ii-83-listening.questions';

const groupCodeFor = (number: number) => {
  if (number <= 20)
    return `topik-ii-83-listening-${String(number).padStart(2, '0')}`;
  const start = number % 2 === 1 ? number : number - 1;
  return `topik-ii-83-listening-${start}-${start + 1}`;
};

const instructionFor = (number: number) => {
  if (number <= 3)
    return '[1~3] 다음을 듣고 가장 알맞은 그림 또는 그래프를 고르십시오. (각 2점)';
  if (number <= 8)
    return '[4~8] 다음을 듣고 이어질 수 있는 말로 가장 알맞은 것을 고르십시오. (각 2점)';
  if (number <= 12)
    return '[9~12] 다음을 듣고 여자가 이어서 할 행동으로 가장 알맞은 것을 고르십시오. (각 2점)';
  if (number <= 16)
    return '[13~16] 다음을 듣고 들은 내용과 같은 것을 고르십시오. (각 2점)';
  if (number <= 20)
    return '[17~20] 다음을 듣고 남자의 중심 생각으로 가장 알맞은 것을 고르십시오. (각 2점)';
  const start = number % 2 === 1 ? number : number - 1;
  return `[${start}~${start + 1}] 다음을 듣고 물음에 답하십시오. (각 2점)`;
};

const prompts: Partial<Record<number, string>> = {
  21: '남자의 중심 생각으로 가장 알맞은 것을 고르십시오.',
  22: '들은 내용과 같은 것을 고르십시오.',
  23: '남자가 무엇을 하고 있는지 고르십시오.',
  24: '들은 내용과 같은 것을 고르십시오.',
  25: '남자의 중심 생각으로 가장 알맞은 것을 고르십시오.',
  26: '들은 내용과 같은 것을 고르십시오.',
  27: '남자가 말하는 의도로 알맞은 것을 고르십시오.',
  28: '들은 내용과 같은 것을 고르십시오.',
  29: '남자가 누구인지 고르십시오.',
  30: '들은 내용과 같은 것을 고르십시오.',
  31: '남자의 중심 생각으로 가장 알맞은 것을 고르십시오.',
  32: '남자의 태도로 가장 알맞은 것을 고르십시오.',
  33: '무엇에 대한 내용인지 알맞은 것을 고르십시오.',
  34: '들은 내용과 같은 것을 고르십시오.',
  35: '남자가 무엇을 하고 있는지 고르십시오.',
  36: '들은 내용과 같은 것을 고르십시오.',
  37: '여자의 중심 생각으로 가장 알맞은 것을 고르십시오.',
  38: '들은 내용과 같은 것을 고르십시오.',
  39: '이 대화 전의 내용으로 가장 알맞은 것을 고르십시오.',
  40: '들은 내용과 같은 것을 고르십시오.',
  41: '이 강연의 중심 내용으로 가장 알맞은 것을 고르십시오.',
  42: '들은 내용과 같은 것을 고르십시오.',
  43: '무엇에 대한 내용인지 알맞은 것을 고르십시오.',
  44: '참가자들이 얼굴 사진을 기억한 이유로 맞는 것을 고르십시오.',
  45: '들은 내용과 같은 것을 고르십시오.',
  46: '여자가 말하는 방식으로 알맞은 것을 고르십시오.',
  47: '들은 내용과 같은 것을 고르십시오.',
  48: '남자의 태도로 알맞은 것을 고르십시오.',
  49: '들은 내용과 같은 것을 고르십시오.',
  50: '남자의 태도로 알맞은 것을 고르십시오.',
};

const typeFor = (number: number): TopikQuestionType => {
  if (number <= 3) return TopikQuestionType.LISTENING_VISUAL_MATCH;
  if (number <= 8) return TopikQuestionType.LISTENING_RESPONSE;
  if (number <= 12) return TopikQuestionType.LISTENING_NEXT_ACTION;
  if (number <= 16) return TopikQuestionType.LISTENING_CONTENT_MATCH;
  if (number <= 20) return TopikQuestionType.LISTENING_MAIN_IDEA;
  const special: Partial<Record<number, TopikQuestionType>> = {
    21: TopikQuestionType.LISTENING_MAIN_IDEA,
    23: TopikQuestionType.LISTENING_SPEAKER_ACTION,
    25: TopikQuestionType.LISTENING_MAIN_IDEA,
    27: TopikQuestionType.LISTENING_INTENT,
    29: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    31: TopikQuestionType.LISTENING_MAIN_IDEA,
    32: TopikQuestionType.LISTENING_ATTITUDE,
    33: TopikQuestionType.LISTENING_TOPIC,
    35: TopikQuestionType.LISTENING_SPEAKER_ACTION,
    37: TopikQuestionType.LISTENING_MAIN_IDEA,
    39: TopikQuestionType.LISTENING_PRECEDING_CONTEXT,
    41: TopikQuestionType.LISTENING_MAIN_IDEA,
    43: TopikQuestionType.LISTENING_TOPIC,
    46: TopikQuestionType.LISTENING_ATTITUDE,
    48: TopikQuestionType.LISTENING_ATTITUDE,
    50: TopikQuestionType.LISTENING_ATTITUDE,
  };
  return special[number] ?? TopikQuestionType.LISTENING_CONTENT_MATCH;
};

// PDF 표지 다음이 책자 1쪽이다.
const sourcePageFor = (number: number) => {
  const pageEnds = [2, 5, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 50];
  const bookPage = pageEnds.findIndex((end) => number <= end) + 1;
  return { pdfPage: bookPage + 1, bookPage };
};

// 사용자 제공 듣기 정답표와 대조한 문항 1~50의 정답.
const answerKeys: TopikAnswerKey[] = [
  '1',
  '1',
  '3',
  '2',
  '1',
  '4',
  '4',
  '3',
  '3',
  '1',
  '3',
  '1',
  '2',
  '1',
  '2',
  '4',
  '3',
  '3',
  '1',
  '3',
  '3',
  '4',
  '4',
  '2',
  '1',
  '2',
  '4',
  '2',
  '1',
  '2',
  '1',
  '3',
  '4',
  '2',
  '4',
  '2',
  '4',
  '3',
  '2',
  '4',
  '2',
  '2',
  '3',
  '3',
  '1',
  '4',
  '3',
  '1',
  '4',
  '2',
];

export const TOPIK_II_83_LISTENING_EXAM: TopikSeedExam = {
  code: 'topik-ii-listening-83-2022',
  title: {
    ko: '제83회 TOPIK II 듣기',
    uz: '83-TOPIK II tinglash',
    en: '83rd TOPIK II Listening',
    ru: '83-й TOPIK II: аудирование',
  },
  description: {
    ko: '제83회 한국어능력시험 TOPIK II 듣기 1번부터 50번까지를 원문 구조대로 구성했습니다.',
    uz: '83-TOPIK II tinglash bo‘limining 1–50-savollari asl imtihon tuzilishida.',
    en: 'Questions 1–50 of the 83rd TOPIK II Listening test in the original exam structure.',
    ru: 'Задания 1–50 аудирования 83-го TOPIK II в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.LISTENING,
  year: 2022,
  round: 83,
  durationMinutes: 60,
  totalQuestions: 50,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제83회 한국어능력시험 II B-홀수형 듣기 통합',
    edition: '제83회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 제83회 TOPIK II 듣기 시험지·통합 대본 및 듣기 정답표',
  },
  publishedAt: new Date('2022-07-10T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 20 }, (_, index) => [index + 1, index + 1] as const),
  ...Array.from(
    { length: 15 },
    (_, index) => [21 + index * 2, 22 + index * 2] as const,
  ),
];

export const TOPIK_II_83_LISTENING_GROUPS: TopikSeedGroup[] = groupRanges.map(
  ([startNumber, endNumber], index) => {
    const code = groupCodeFor(startNumber);
    const visual = startNumber <= 3;
    return {
      code,
      order: index + 1,
      startNumber,
      endNumber,
      instruction: textBlocks(instructionFor(startNumber)),
      sharedAudio: TOPIK_II_83_LISTENING_AUDIO[code],
      pointsPerQuestion: 2,
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

export const TOPIK_II_83_LISTENING_QUESTIONS: TopikSeedQuestion[] =
  TOPIK_II_83_LISTENING_RAW_QUESTIONS.map(([number, choiceTexts]) => {
    const answer = answerKeys[number - 1];
    const visual = number <= 3;
    const choices = choiceTexts.map((text, index) => ({
      key: String(index + 1),
      text,
      order: index + 1,
      imageAssetKey: visual
        ? `topik-ii-83-q${String(number).padStart(2, '0')}-c${index + 1}`
        : '',
      imageAlt: visual ? text : '',
    }));
    const { pdfPage, bookPage } = sourcePageFor(number);
    const prompt = prompts[number];
    return {
      code: `topik-ii-listening-83-q${String(number).padStart(2, '0')}`,
      groupCode: groupCodeFor(number),
      number,
      order: number,
      type: typeFor(number),
      points: 2,
      prompt: prompt ? textBlocks(prompt) : [],
      audio: TOPIK_II_83_LISTENING_AUDIO[groupCodeFor(number)],
      choices,
      correctChoiceKey: answer,
      solution: topikI37Solution(answer, choices[Number(answer) - 1].text),
      presentation: presentation(
        visual
          ? TopikVisualTemplate.EXAM_VISUAL_CHOICES
          : TopikVisualTemplate.EXAM_LISTENING,
        visual ? TopikChoiceLayout.TWO_COLUMNS : TopikChoiceLayout.ONE_COLUMN,
      ),
      tags: ['topik-ii', 'round-83', 'listening', `question-${number}`],
      difficulty: number <= 12 ? 2 : number <= 32 ? 3 : 4,
      source: {
        pdfPage,
        bookPage,
        reference: '제83회 한국어능력시험 II B-홀수형 듣기 시험지',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_II_83_LISTENING_SEED: TopikExamSeed = {
  exam: TOPIK_II_83_LISTENING_EXAM,
  groups: TOPIK_II_83_LISTENING_GROUPS,
  questions: TOPIK_II_83_LISTENING_QUESTIONS,
};
