import { TopikSeedQuestion } from './topik-seed.types';
import {
  ReadingMock2QuestionInput,
  readingMock2Question,
} from './topik-reading-mock-2.helpers';

const sourcePageFor = (number: number) => {
  const pageEnds = [
    4, 8, 10, 12, 15, 17, 20, 22, 24, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45,
    47, 50,
  ];
  return pageEnds.findIndex((end) => number <= end) + 3;
};

export function topikII41ReadingQuestion(
  input: ReadingMock2QuestionInput,
): TopikSeedQuestion {
  const question = readingMock2Question(input);
  const pdfPage = sourcePageFor(input.number);

  return {
    ...question,
    code: `topik-ii-reading-41-q${String(input.number).padStart(2, '0')}`,
    tags: ['topik-ii', 'round-41', 'reading', ...(input.tags ?? [])],
    source: {
      pdfPage,
      bookPage: pdfPage - 2,
      reference: '제41회 한국어능력시험 II B형 2교시 (읽기)',
    },
  };
}
