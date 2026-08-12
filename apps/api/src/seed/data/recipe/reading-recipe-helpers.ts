import { TopikQuestionType } from '../../../topik/schemas/topik-content.schema';
import {
  RecipeSeedGrammarEntry,
  RecipeSeedQuestion,
  t4,
} from './recipe-seed.types';

export function recipeQuestion(
  code: string,
  number: number,
  type: TopikQuestionType,
  prompt: string,
  choices: string[],
  correctIndex: number,
  source: string,
): RecipeSeedQuestion {
  const answer = choices[correctIndex];
  return {
    code,
    number,
    type,
    prompt,
    choices: choices.map((text, index) => ({
      text,
      correct: index === correctIndex,
    })),
    source,
    solution: {
      strategy: t4(
        '지문의 근거와 선택지를 하나씩 대조합니다.',
        'Matndagi dalillarni variantlar bilan birma-bir solishtiring.',
        'Compare each choice with the evidence in the passage.',
        'Сопоставьте каждый вариант с доказательствами в тексте.',
      ),
      explanation: t4(
        `정답은 ‘${answer}’입니다. 지문에 직접 제시된 흐름 또는 정보와 일치합니다.`,
        `To'g'ri javob: “${answer}”. U matndagi mazmun yoki ma'lumotga mos.`,
        `The answer is “${answer}.” It matches the flow or information stated in the passage.`,
        `Правильный ответ: «${answer}». Он соответствует логике или информации текста.`,
      ),
    },
  };
}

export function recipeRanking(
  rows: Array<[string, string]>,
): RecipeSeedGrammarEntry[] {
  return rows.map(([form, detail], index) => ({
    rank: index + 1,
    form,
    meanings: [
      t4(
        detail,
        `Asosiy mazmun: ${detail}`,
        `Key content: ${detail}`,
        `Ключевое содержание: ${detail}`,
      ),
    ],
    examples: [],
    highlights: [],
  }));
}
