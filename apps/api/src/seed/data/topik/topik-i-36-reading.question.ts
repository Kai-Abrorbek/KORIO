import { TopikSeedQuestion } from './topik-seed.types';
import {
  topikI35ReadingQuestion,
  TopikI35ReadingQuestionInput,
} from './topik-i-35-reading.question';

export function topikI36ReadingQuestion(
  input: TopikI35ReadingQuestionInput,
): TopikSeedQuestion {
  const question = topikI35ReadingQuestion(input);

  return {
    ...question,
    code: `topik-i-reading-36-q${String(input.number).padStart(2, '0')}`,
    tags: ['topik-i', 'round-36', 'reading', `question-${input.number}`],
    source: {
      ...question.source,
      reference: '제36회 한국어능력시험 I B형 (듣기, 읽기)',
    },
  };
}
