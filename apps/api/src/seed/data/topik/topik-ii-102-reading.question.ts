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
  return pageEnds.findIndex((end) => number <= end) + 3;
};

export function topikII102ReadingQuestion(
  input: ReadingMock2QuestionInput,
): TopikSeedQuestion {
  const question = readingMock2Question(input);
  const pdfPage = sourcePageFor(input.number);
  return {
    ...question,
    code: `topik-ii-reading-102-q${String(input.number).padStart(2, '0')}`,
    tags: ['topik-ii', 'round-102', 'reading', ...(input.tags ?? [])],
    source: {
      pdfPage,
      bookPage: pdfPage - 2,
      reference: '제102회 한국어능력시험 II B-홀수형 2교시 (읽기)',
    },
  };
}
