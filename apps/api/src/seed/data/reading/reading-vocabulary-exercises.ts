import type {
  LocalizedReadingText,
  ReadingVocabularyExercise,
  ReadingVocabularyExerciseBlank,
} from '../../../reading-lessons/schemas/reading-lesson.schema';

type VocabularyTuple = readonly [word: string, ...rest: string[]];

const localized = (
  ko: string,
  uz: string,
  en: string,
  ru: string,
): LocalizedReadingText => ({ ko, uz, en, ru });

const sentenceTitle = localized(
  '문장에 알맞은 단어를 골라 보세요',
  'Gaplarga mos so‘zni tanlang',
  'Choose the right word for each sentence',
  'Выберите подходящее слово для каждого предложения',
);

const sentenceInstruction = localized(
  '단어 상자에서 알맞은 말을 골라 문장을 완성하세요.',
  'So‘zlar qutisidan mos so‘zni tanlab, gaplarni tugating.',
  'Complete the sentences with words from the word bank.',
  'Дополните предложения словами из списка.',
);

const conjugationTitle = localized(
  '알맞은 말을 골라 글을 완성해 보세요',
  'Mos so‘zni tanlab, matnni tugating',
  'Choose and conjugate the words to complete the text',
  'Выберите и измените слова, чтобы дополнить текст',
);

const conjugationInstruction = localized(
  '기본형을 고른 뒤 문장에 맞는 형태로 바꾸어 쓰세요.',
  'Asosiy shaklni tanlang va gapga moslab o‘zgartirib yozing.',
  'Choose the dictionary form, then change it to fit the sentence.',
  'Выберите начальную форму и измените её по смыслу предложения.',
);

const splitSentences = (passage: readonly string[]) =>
  passage.flatMap((paragraph) =>
    (paragraph.match(/[^.!?]+[.!?]?/g) || [paragraph])
      .map((sentence) => sentence.trim())
      .filter(Boolean),
  );

const stableMix = <T>(items: readonly T[]): T[] => {
  if (items.length < 3) return [...items].reverse();
  const pivot = Math.ceil(items.length / 2);
  return [...items.slice(pivot), ...items.slice(0, pivot)];
};

const replaceOnce = (text: string, value: string, marker: string) => {
  const index = text.indexOf(value);
  if (index < 0) return text;
  return `${text.slice(0, index)}${marker}${text.slice(index + value.length)}`;
};

const verbStem = (word: string) => {
  if (word.endsWith('하다')) return word.slice(0, -2);
  if (word.endsWith('다')) return word.slice(0, -1);
  return '';
};

const SHORT_STEM_ENDINGS = [
  '고',
  '기',
  '는',
  '은',
  '을',
  '면',
  '서',
  '지',
  '게',
  '자',
  '던',
  '다가',
  '지만',
  '도록',
  '세요',
  '십시오',
  '습니다',
  '아요',
  '어요',
  '았다',
  '었다',
  '하',
  '해',
  '했',
  '할',
] as const;

const surfaceForm = (sentence: string, baseWord: string) => {
  const stem = verbStem(baseWord);
  if (!stem) return '';
  // String.match(/g) 는 RegExpMatchArray | null 을 준다. `?? []` 를 붙이면
  // RegExpMatchArray | never[] 유니온이 되고, 유니온 배열에 .find() 를 부르면
  // 콜백 파라미터가 교집합(string & never = never)이 돼서 token 이 never 가 된다.
  // 타입을 박아 never[] 쪽을 string[] 으로 넓힌다.
  const matches: string[] = sentence.match(/[가-힣]+/g) ?? [];
  const startsWithStem = matches.find((token) => {
    if (!token.startsWith(stem) || token === baseWord) return false;
    if (stem.length > 1) return true;
    const ending = token.slice(stem.length);
    return SHORT_STEM_ENDINGS.some((candidate) => ending.startsWith(candidate));
  });
  if (startsWithStem) return startsWithStem;

  // 두 글자 이상인 어간은 합성어 안쪽에 나타나는 경우도 있다.
  return stem.length > 1
    ? matches.find((token) => token.includes(stem)) ?? ''
    : '';
};

const INFERRED_CONJUGATION_RULES: readonly {
  suffix: string;
  toBase: (stem: string) => string;
}[] = [
  { suffix: '하였습니다', toBase: (stem) => `${stem}하다` },
  { suffix: '했습니다', toBase: (stem) => `${stem}하다` },
  { suffix: '하겠습니다', toBase: (stem) => `${stem}하다` },
  { suffix: '하도록', toBase: (stem) => `${stem}하다` },
  { suffix: '합니다', toBase: (stem) => `${stem}하다` },
  { suffix: '하는', toBase: (stem) => `${stem}하다` },
  { suffix: '하며', toBase: (stem) => `${stem}하다` },
  { suffix: '하고', toBase: (stem) => `${stem}하다` },
  { suffix: '해서', toBase: (stem) => `${stem}하다` },
  { suffix: '하게', toBase: (stem) => `${stem}하다` },
  { suffix: '하면', toBase: (stem) => `${stem}하다` },
  { suffix: '할', toBase: (stem) => `${stem}하다` },
  { suffix: '으면서', toBase: (stem) => `${stem}다` },
  { suffix: '면서', toBase: (stem) => `${stem}다` },
  { suffix: '으려고', toBase: (stem) => `${stem}다` },
  { suffix: '려고', toBase: (stem) => `${stem}다` },
  { suffix: '지만', toBase: (stem) => `${stem}다` },
  { suffix: '거나', toBase: (stem) => `${stem}다` },
];

const inferBaseWord = (surface: string) => {
  for (const rule of INFERRED_CONJUGATION_RULES) {
    if (!surface.endsWith(rule.suffix)) continue;
    const stem = surface.slice(0, -rule.suffix.length);
    if (!stem) continue;
    const baseWord = rule.toBase(stem);
    // '하는 → 하다'처럼 의미가 너무 넓은 보조용 기본형은 문제 후보에서 뺀다.
    if (baseWord === '하다') return '';
    return baseWord;
  }
  return '';
};

const answerExplanation = (
  baseWord: string,
  answer: string,
): LocalizedReadingText =>
  localized(
    `기본형 ‘${baseWord}’은 이 문장에서는 ‘${answer}’으로 씁니다.`,
    `‘${baseWord}’ bu gapda ‘${answer}’ shaklida ishlatiladi.`,
    `‘${baseWord}’ changes to ‘${answer}’ in this sentence.`,
    `В этом предложении ‘${baseWord}’ принимает форму ‘${answer}’.`,
  );

/**
 * 3급 이상 읽기에 붙는 교재형 어휘 연습을 만든다.
 *
 * 정답 문장은 별도로 창작하지 않고 레슨 본문에서 가져온다. 덕분에 문제와
 * 본문이 어긋나지 않고, 활용형 정답도 실제 본문에 쓰인 형태로 채점할 수 있다.
 */
export function buildReadingVocabularyExercises(
  passage: readonly string[],
  vocabulary: readonly VocabularyTuple[],
): ReadingVocabularyExercise[] {
  const sentences = splitSentences(passage);
  const words = [
    ...new Set(vocabulary.map(([word]) => word.trim()).filter(Boolean)),
  ];

  const usedSentences = new Set<number>();
  const sentenceBlanks: ReadingVocabularyExerciseBlank[] = [];
  const sentenceTemplates: string[] = [];

  for (const allowRepeatedSentence of [false, true]) {
    for (const word of words) {
      if (sentenceBlanks.length >= 5) break;
      if (
        word.length < 2 ||
        verbStem(word) ||
        sentenceBlanks.some((blank) => blank.baseWord === word)
      ) {
        continue;
      }
      const sentenceIndex = sentences.findIndex(
        (sentence, index) =>
          (allowRepeatedSentence || !usedSentences.has(index)) &&
          sentence.includes(word),
      );
      if (sentenceIndex < 0) continue;

      const id = `sentence-${sentenceBlanks.length + 1}`;
      usedSentences.add(sentenceIndex);
      sentenceBlanks.push({
        id,
        baseWord: word,
        answer: word,
        acceptedAnswers: [word],
        explanation: localized(
          `문장의 내용에는 ‘${word}’이 가장 자연스럽습니다.`,
          `Gap mazmuniga ‘${word}’ eng mos keladi.`,
          `‘${word}’ best fits the meaning of this sentence.`,
          `По смыслу предложения лучше всего подходит ‘${word}’.`,
        ),
      });
      sentenceTemplates.push(
        `${sentenceBlanks.length}. ${replaceOnce(sentences[sentenceIndex], word, `{{${id}}}`)}`,
      );
    }
    if (sentenceBlanks.length >= 5) break;
  }

  // 명사형 핵심 어휘가 적은 단원은 본문에 실제로 나온 활용형을 단어 상자에
  // 보충한다. 이 유형은 기본형을 만드는 문제가 아니라 문맥에 맞는 표면형을
  // 고르는 문제이므로 '자연스럽게', '친근하게' 같은 답도 올바른 후보이다.
  for (const allowRepeatedSentence of [false, true]) {
    for (const baseWord of words) {
      if (sentenceBlanks.length >= 5) break;
      if (!verbStem(baseWord)) continue;

      let sentenceIndex = -1;
      let answer = '';
      for (let index = 0; index < sentences.length; index += 1) {
        if (!allowRepeatedSentence && usedSentences.has(index)) continue;
        const candidate = surfaceForm(sentences[index], baseWord);
        if (
          !candidate ||
          sentenceBlanks.some((blank) => blank.answer === candidate)
        ) {
          continue;
        }
        sentenceIndex = index;
        answer = candidate;
        break;
      }
      if (sentenceIndex < 0) continue;

      const id = `sentence-${sentenceBlanks.length + 1}`;
      usedSentences.add(sentenceIndex);
      sentenceBlanks.push({
        id,
        baseWord: answer,
        answer,
        acceptedAnswers: [answer],
        explanation: localized(
          `기본형 ‘${baseWord}’은 이 문장에서는 ‘${answer}’으로 쓰였습니다.`,
          `‘${baseWord}’ bu gapda ‘${answer}’ shaklida ishlatilgan.`,
          `‘${baseWord}’ appears as ‘${answer}’ in this sentence.`,
          `В этом предложении ‘${baseWord}’ употреблено в форме ‘${answer}’.`,
        ),
      });
      sentenceTemplates.push(
        `${sentenceBlanks.length}. ${replaceOnce(sentences[sentenceIndex], answer, `{{${id}}}`)}`,
      );
    }
    if (sentenceBlanks.length >= 5) break;
  }

  // 핵심 어휘 배열에 없더라도 본문 자체에서 기본형 역산이 확실한 활용형은
  // 마지막 후보로 쓴다. 단순 명사나 조사로 추측하지 않고 제한된 규칙만 사용한다.
  for (const allowRepeatedSentence of [false, true]) {
    for (let sentenceIndex = 0; sentenceIndex < sentences.length; sentenceIndex += 1) {
      if (sentenceBlanks.length >= 5) break;
      if (!allowRepeatedSentence && usedSentences.has(sentenceIndex)) continue;
      const surfaces = sentences[sentenceIndex].match(/[가-힣]+/g) ?? [];
      const answer = surfaces.find(
        (surface) =>
          !!inferBaseWord(surface) &&
          !sentenceBlanks.some((blank) => blank.answer === surface),
      );
      if (!answer) continue;

      const baseWord = inferBaseWord(answer);
      const id = `sentence-${sentenceBlanks.length + 1}`;
      usedSentences.add(sentenceIndex);
      sentenceBlanks.push({
        id,
        baseWord: answer,
        answer,
        acceptedAnswers: [answer],
        explanation: localized(
          `기본형 ‘${baseWord}’은 이 문장에서는 ‘${answer}’으로 쓰였습니다.`,
          `‘${baseWord}’ bu gapda ‘${answer}’ shaklida ishlatilgan.`,
          `‘${baseWord}’ appears as ‘${answer}’ in this sentence.`,
          `В этом предложении ‘${baseWord}’ употреблено в форме ‘${answer}’.`,
        ),
      });
      sentenceTemplates.push(
        `${sentenceBlanks.length}. ${replaceOnce(sentences[sentenceIndex], answer, `{{${id}}}`)}`,
      );
    }
    if (sentenceBlanks.length >= 5) break;
  }

  const conjugationBlanks: ReadingVocabularyExerciseBlank[] = [];
  const conjugationTemplates: string[] = [];
  const conjugationSentenceIds = new Set<number>();
  const conjugationPairs = new Set<string>();

  for (const allowRepeatedSentence of [false, true]) {
    for (const baseWord of words) {
      if (conjugationBlanks.length >= 4) break;
      if (
        !verbStem(baseWord) ||
        conjugationBlanks.some((blank) => blank.baseWord === baseWord)
      ) {
        continue;
      }

      let sentenceIndex = -1;
      let answer = '';
      for (let index = 0; index < sentences.length; index += 1) {
        if (!allowRepeatedSentence && conjugationSentenceIds.has(index)) {
          continue;
        }
        const candidate = surfaceForm(sentences[index], baseWord);
        if (!candidate || candidate === baseWord) continue;
        sentenceIndex = index;
        answer = candidate;
        break;
      }
      if (sentenceIndex < 0) continue;

      const id = `conjugation-${conjugationBlanks.length + 1}`;
      conjugationSentenceIds.add(sentenceIndex);
      conjugationPairs.add(`${baseWord}\u0000${sentenceIndex}`);
      conjugationBlanks.push({
        id,
        baseWord,
        answer,
        acceptedAnswers: [answer],
        explanation: answerExplanation(baseWord, answer),
      });
      conjugationTemplates.push(
        replaceOnce(sentences[sentenceIndex], answer, `{{${id}}}`),
      );
    }
    if (conjugationBlanks.length >= 4) break;
  }

  // 같은 기본형이 본문에서 여러 형태로 쓰였다면 각각 좋은 활용 연습이 된다.
  // 서로 다른 기본형만 고집해 문제 유형 전체가 사라지는 것을 막는 마지막 보충이다.
  if (conjugationBlanks.length < 4) {
    for (const baseWord of words) {
      if (!verbStem(baseWord)) continue;
      for (
        let sentenceIndex = 0;
        sentenceIndex < sentences.length;
        sentenceIndex += 1
      ) {
        if (conjugationBlanks.length >= 4) break;
        const pair = `${baseWord}\u0000${sentenceIndex}`;
        if (conjugationPairs.has(pair)) continue;
        const answer = surfaceForm(sentences[sentenceIndex], baseWord);
        if (!answer || answer === baseWord) continue;

        const id = `conjugation-${conjugationBlanks.length + 1}`;
        conjugationPairs.add(pair);
        conjugationBlanks.push({
          id,
          baseWord,
          answer,
          acceptedAnswers: [answer],
          explanation: answerExplanation(baseWord, answer),
        });
        conjugationTemplates.push(
          replaceOnce(sentences[sentenceIndex], answer, `{{${id}}}`),
        );
      }
      if (conjugationBlanks.length >= 4) break;
    }
  }

  // 핵심 어휘 배열과 본문이 완전히 일치하지 않는 단원도 있다. 이 경우에는
  // '관람하는 → 관람하다', '늘면서 → 늘다'처럼 역산이 확실한 활용만 보충한다.
  if (conjugationBlanks.length < 4) {
    for (let sentenceIndex = 0; sentenceIndex < sentences.length; sentenceIndex += 1) {
      const surfaces = sentences[sentenceIndex].match(/[가-힣]+/g) ?? [];
      for (const answer of surfaces) {
        if (conjugationBlanks.length >= 4) break;
        const baseWord = inferBaseWord(answer);
        if (
          !baseWord ||
          conjugationBlanks.some((blank) => blank.baseWord === baseWord)
        ) {
          continue;
        }

        const id = `conjugation-${conjugationBlanks.length + 1}`;
        conjugationBlanks.push({
          id,
          baseWord,
          answer,
          acceptedAnswers: [answer],
          explanation: answerExplanation(baseWord, answer),
        });
        conjugationTemplates.push(
          replaceOnce(sentences[sentenceIndex], answer, `{{${id}}}`),
        );
      }
      if (conjugationBlanks.length >= 4) break;
    }
  }

  return [
    {
      id: 'sentence-word-bank',
      type: 'sentence_word_bank',
      title: sentenceTitle,
      instruction: sentenceInstruction,
      wordBank: stableMix(sentenceBlanks.map((blank) => blank.baseWord)),
      template: sentenceTemplates.join('\n'),
      blanks: sentenceBlanks,
    },
    {
      id: 'paragraph-conjugation',
      type: 'paragraph_conjugation',
      title: conjugationTitle,
      instruction: conjugationInstruction,
      wordBank: stableMix([
        ...new Set(conjugationBlanks.map((blank) => blank.baseWord)),
      ]),
      template: conjugationTemplates.join(' '),
      blanks: conjugationBlanks,
    },
  ];
}
