import { TopikQuestionType } from '../../../topik/schemas/topik-content.schema';
import {
  RecipeSeedGrammarEntry,
  RecipeSeedQuestion,
  t4,
} from './recipe-seed.types';

interface RecipeQuestionDetail {
  evidence?: string;
  wrongReasons?: Array<string | undefined>;
}

function strategyFor(type: TopikQuestionType) {
  if (
    type === TopikQuestionType.GRAMMAR_FILL_BLANK ||
    type === TopikQuestionType.UNDERLINED_MEANING
  ) {
    return t4(
      '① 앞뒤 품사와 문장 관계를 확인한다. ② Ranking에서 같은 기능의 문법만 남긴다. ③ 선택지를 넣어 시제·결합 형태·전체 의미를 다시 확인한다.',
      "① Oldi-keyinidagi so'z turkumi va gap munosabatini tekshiring. ② Rankingdan bir xil vazifadagi grammatikalarnigina qoldiring. ③ Variantni qo'yib zamon, birikish va umumiy ma'noni tekshiring.",
      '① Check the surrounding parts of speech and sentence relation. ② Keep only grammar forms with the same Ranking function. ③ Insert the choice and recheck tense, attachment, and meaning.',
      '① Проверьте части речи и связь вокруг цели. ② Оставьте формы с той же функцией из Ranking. ③ Вставьте вариант и перепроверьте время, присоединение и смысл.',
    );
  }

  if (
    type === TopikQuestionType.PRACTICAL_TEXT_TOPIC ||
    type === TopikQuestionType.PASSAGE_CONTENT_MATCH
  ) {
    return t4(
      '① 선택지의 사람·시간·장소·수치·행동을 표시한다. ② 제목·반복어·지문에서 같은 사실을 다른 말로 표현한 근거를 찾는다. ③ 일부만 맞거나 범위와 관계가 뒤집힌 선택지는 제외한다.',
      "① Variantlardagi shaxs, vaqt, joy, raqam va harakatni belgilang. ② Sarlavha, takror va matndan shu faktning boshqa ifodasini toping. ③ Qisman mos yoki doira va munosabati teskari variantni chiqaring.",
      '① Mark people, time, place, figures, and actions in the choices. ② Find paraphrased evidence in the heading, repetitions, and passage. ③ Reject partially true or reversed choices.',
      '① Отметьте людей, время, место, числа и действия. ② Найдите перефразированное доказательство в заголовке, повторах и тексте. ③ Исключите частично верные и перевёрнутые варианты.',
    );
  }

  if (
    type === TopikQuestionType.SENTENCE_ORDERING ||
    type === TopikQuestionType.PASSAGE_FILL_BLANK ||
    type === TopikQuestionType.SENTENCE_INSERTION
  ) {
    return t4(
      '① 지시어·접속사·반복어를 표시한다. ② 앞 문장의 원인·대상과 뒤 문장의 결과·보충 설명을 연결한다. ③ 선택지를 넣어 도입→전개→결론과 시제가 자연스러운지 다시 읽는다.',
      "① Ko'rsatish so'zi, bog'lovchi va takrorni belgilang. ② Oldingi sabab yoki obyektni keyingi natija yoki izoh bilan ulang. ③ Variantni qo'yib kirish→rivoj→xulosa va zamonni tekshiring.",
      '① Mark demonstratives, connectives, and repetitions. ② Link the preceding cause or referent to the following result or elaboration. ③ Insert the choice and recheck flow and tense.',
      '① Отметьте указатели, связки и повторы. ② Свяжите предыдущую причину или объект с последующим результатом или пояснением. ③ Вставьте вариант и проверьте ход и время.',
    );
  }

  if (
    type === TopikQuestionType.PASSAGE_TOPIC ||
    type === TopikQuestionType.AUTHOR_EMOTION ||
    type === TopikQuestionType.HEADLINE_INTERPRETATION ||
    type === TopikQuestionType.AUTHOR_ATTITUDE ||
    type === TopikQuestionType.AUTHOR_PURPOSE
  ) {
    return t4(
      '① 첫 문장과 마지막 문장의 공통 대상, 평가·감정 표현을 찾는다. ② 반복되는 주장과 변화 방향을 한 문장으로 요약한다. ③ 너무 좁거나 넓은 내용, 과장, 반대 방향의 선택지를 제외한다.',
      "① Birinchi va oxirgi gapdagi umumiy mavzu, baho va hissiyotni toping. ② Takroriy fikr va o'zgarish yo'nalishini bir gapda jamlang. ③ Juda tor, keng, bo'rttirilgan yoki teskari variantni chiqaring.",
      '① Find the shared subject and evaluative or emotional language in the opening and ending. ② Summarize the repeated claim and direction of change. ③ Reject choices that are too narrow, broad, exaggerated, or reversed.',
      '① Найдите общий предмет и оценочную или эмоциональную лексику в начале и конце. ② Сведите повторяемую мысль и направление изменения к одному предложению. ③ Исключите узкие, широкие, преувеличенные и обратные варианты.',
    );
  }

  return t4(
    '① 질문이 요구하는 정보를 표시한다. ② 지문의 직접 근거와 선택지를 하나씩 대조한다. ③ 부분 일치·과장·반대 의미를 제외하고 다시 읽는다.',
    "① Savol talab qilgan ma'lumotni belgilang. ② Matndagi dalilni variantlar bilan solishtiring. ③ Qisman mos, bo'rttirilgan va teskari ma'noni chiqarib qayta o'qing.",
    '① Mark what the question asks for. ② Compare each option with direct evidence. ③ Exclude partial matches, exaggerations, and reversals, then reread.',
    '① Отметьте требуемую информацию. ② Сопоставьте варианты с прямыми доказательствами. ③ Исключите частичное совпадение, преувеличение и обратный смысл.',
  );
}

export function recipeQuestion(
  code: string,
  number: number,
  type: TopikQuestionType,
  prompt: string,
  choices: string[],
  correctIndex: number,
  source: string,
  detail: RecipeQuestionDetail = {},
): RecipeSeedQuestion {
  if (correctIndex < 0 || correctIndex >= choices.length) {
    throw new Error(`${code}: correctIndex ${correctIndex} is outside the choice range.`);
  }

  const answer = choices[correctIndex];
  const evidence = detail.evidence?.trim();

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
      strategy: strategyFor(type),
      explanation: t4(
        evidence
          ? `정답은 ‘${answer}’이다. 핵심 근거는 “${evidence}”이며 질문 조건과 지문의 흐름을 모두 만족한다.`
          : `정답은 ‘${answer}’이다. 위 3단계 순서로 직접 근거와 질문 조건을 대조하면 이 선택지만 모두 만족한다.`,
        evidence
          ? `To'g'ri javob “${answer}”. Asosiy dalil “${evidence}” savol sharti va matn oqimiga mos.`
          : `To'g'ri javob “${answer}”. Uch bosqichda dalil va savol shartini solishtirsangiz, faqat shu variant to'liq mos.`,
        evidence
          ? `The answer is “${answer}.” The key evidence “${evidence}” satisfies both the question and passage flow.`
          : `The answer is “${answer}.” Applying the three steps to the evidence and question condition leaves only this choice.`,
        evidence
          ? `Правильный ответ — «${answer}». Ключевое доказательство «${evidence}» соответствует условию и ходу текста.`
          : `Правильный ответ — «${answer}». Сопоставление доказательства и условия по трём шагам оставляет только этот вариант.`,
      ),
      choiceNotes: choices.map((choice, index) => {
        const reason = detail.wrongReasons?.[index]?.trim();
        if (index === correctIndex) {
          return t4(
            `‘${choice}’은 지문의 핵심 근거와 질문 조건을 모두 만족한다.`,
            `“${choice}” matn dalili va savol shartiga to'liq mos.`,
            `“${choice}” satisfies both the passage evidence and question condition.`,
            `«${choice}» соответствует доказательству текста и условию вопроса.`,
          );
        }
        return t4(
          reason
            ? `‘${choice}’은 오답이다. ${reason}`
            : `‘${choice}’은 일부 단어만 맞거나 범위·관계·방향을 바꾼 오답이다.`,
          `“${choice}” noto'g'ri: u dalilning faqat bir qismiga mos yoki doira, munosabat yoxud yo'nalishni o'zgartiradi.`,
          `“${choice}” is incorrect: it is only partly supported or changes the scope, relation, or direction.`,
          `«${choice}» неверно: вариант подтверждён лишь частично либо меняет охват, связь или направление.`,
        );
      }),
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
