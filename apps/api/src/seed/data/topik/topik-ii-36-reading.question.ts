import { TopikSeedQuestion } from './topik-seed.types';
import {
  ReadingMock2QuestionInput,
  readingMock2Question,
} from './topik-reading-mock-2.helpers';

const sourcePageFor = (number: number) => {
  const pageEnds = [
    4, 8, 10, 12, 15, 18, 20, 22, 24, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45,
    47, 50,
  ];
  return pageEnds.findIndex((end) => number <= end) + 20;
};

export function topikII36ReadingQuestion(
  input: ReadingMock2QuestionInput,
): TopikSeedQuestion {
  const question = readingMock2Question(input);
  const pdfPage = sourcePageFor(input.number);

  return {
    ...question,
    code: `topik-ii-reading-36-q${String(input.number).padStart(2, '0')}`,
    tags: ['topik-ii', 'round-36', 'reading', ...(input.tags ?? [])],
    source: {
      pdfPage,
      bookPage: pdfPage - 19,
      reference: '제36회 한국어능력시험 II B형 2교시 (읽기)',
    },
  };
}
