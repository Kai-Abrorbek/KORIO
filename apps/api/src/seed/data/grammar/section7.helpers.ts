import type {
  Section7GrammarDefinition,
  Section7GrammarExample,
  Section7LocalizedText,
} from './section7.types';

export const l = (
  ko: string,
  uz: string,
  en: string,
  ru: string,
): Section7LocalizedText => ({ ko, uz, en, ru });

export const e = (
  ko: string,
  highlight: string,
  uz: string,
  en: string,
  ru: string,
): Section7GrammarExample => ({
  ko,
  highlight,
  translations: { uz, en, ru },
});

export function g({
  code,
  pattern,
  label,
  summary,
  rule,
  conjugations,
  examples,
  quizDistractors,
  similar,
}: {
  code: string;
  pattern: string;
  label: Section7LocalizedText;
  summary: Section7LocalizedText;
  rule: Section7LocalizedText;
  conjugations: { base: string; result: string }[];
  examples: Section7GrammarExample[];
  quizDistractors: string[];
  similar?: Section7GrammarDefinition['similar'];
}): Section7GrammarDefinition {
  return {
    code,
    pattern,
    title: label,
    summary,
    explanation: l(
      `${summary.ko} 앞절과 뒤절의 관계, 서술어의 품사와 시제를 함께 확인해서 형태를 선택해요.`,
      `${summary.uz} Shaklni tanlashda ikki qism orasidagi munosabat, kesim turi va zamonni birga tekshiring.`,
      `${summary.en} Choose the form by checking the relation between clauses together with predicate type and tense.`,
      `${summary.ru} Выбирайте форму с учётом связи частей предложения, типа сказуемого и времени.`,
    ),
    conjugationRule: rule,
    conjugations,
    usageTag: label,
    examples,
    cautions: [
      l(
        `${pattern}의 결합 형태와 띄어쓰기를 한 덩어리로 외우지 말고 앞말의 품사를 확인하세요.`,
        `${pattern} shaklini yodlashdan oldin oldingi so'z turkumini va yozilishini tekshiring.`,
        `For ${pattern}, check the preceding word class and spacing instead of memorizing one fixed chunk.`,
        `В конструкции ${pattern} проверяйте часть речи перед формой и написание, а не заучивайте один шаблон.`,
      ),
      l(
        '비슷한 연결 표현과 바꾸면 말하는 사람의 태도나 문장의 초점이 달라질 수 있어요.',
        "O'xshash bog'lovchi bilan almashtirilsa, gapiruvchining munosabati yoki gap urg'usi o'zgarishi mumkin.",
        'Replacing it with a similar connector can change the speaker’s stance or the focus of the sentence.',
        'Замена похожей связкой может изменить отношение говорящего или смысловой акцент.',
      ),
    ],
    quizDistractors,
    ...(similar ? { similar } : {}),
  };
}
