import type {
  EnglishGrammarDrill,
  EnglishGrammarNodeSeed,
  EnglishGrammarPageSeed,
  EnglishGrammarTrackQuestion,
  EnglishGrammarUnit,
  LocalizedText,
} from './english-grammar.types';

export const ENGLISH_GRAMMAR_COURSE = {
  courseId: 'en-general',
  targetLanguage: 'en',
} as const;

export const L = (
  ko: string,
  uz: string,
  en: string,
  ru: string,
): LocalizedText => ({ ko, uz, en, ru });

export function sentenceOf(template: string, answer: string): string {
  return template.replace('___', answer);
}

const NEGATIVE_CONTRACTIONS: readonly [RegExp, string][] = [
  [/\bdon't\b/gi, 'do not'],
  [/\bdoesn't\b/gi, 'does not'],
  [/\bdidn't\b/gi, 'did not'],
  [/\bisn't\b/gi, 'is not'],
  [/\baren't\b/gi, 'are not'],
  [/\bwasn't\b/gi, 'was not'],
  [/\bweren't\b/gi, 'were not'],
  [/\bhaven't\b/gi, 'have not'],
  [/\bhasn't\b/gi, 'has not'],
  [/\bcan't\b/gi, 'cannot'],
  [/\bcouldn't\b/gi, 'could not'],
  [/\bwon't\b/gi, 'will not'],
  [/\bwouldn't\b/gi, 'would not'],
  [/\bshouldn't\b/gi, 'should not'],
  [/\bmustn't\b/gi, 'must not'],
  [/\bneedn't\b/gi, 'need not'],
  [/\bshan't\b/gi, 'shall not'],
];

/**
 * 타이핑 문제에서는 축약형과 풀어 쓴 형태를 모두 정답으로 인정한다.
 * 문법을 맞게 썼는데 표기 방식 때문에 오답이 되는 일을 막기 위한 것이다.
 */
function acceptedAnswersFor(answer: string, authored: readonly string[] = []) {
  const expanded = NEGATIVE_CONTRACTIONS.reduce(
    (value, [contraction, full]) => value.replace(contraction, full),
    answer,
  );
  return [...new Set([...authored, expanded])].filter(
    (candidate) => candidate !== answer,
  );
}

type BuildRow = { options: string[]; correct: string };

interface TokenParts {
  prefix: string;
  core: string;
  suffix: string;
}

interface TokenSpan extends TokenParts {
  raw: string;
  index: number;
  start: number;
  end: number;
  coreStart: number;
  coreEnd: number;
}

interface TokenCorpus {
  all: string[];
  byNeighbors: Map<string, string[]>;
  byNext: Map<string, string[]>;
  byNextTwo: Map<string, string[]>;
  byPosition: Map<number, string[]>;
  byPrevious: Map<string, string[]>;
  byPreviousTwo: Map<string, string[]>;
}

interface BlankFocus {
  answer: string;
  kind: 'grammar' | 'context';
  prefix: string;
  suffix: string;
  tokenIndex?: number;
}

const OPENING_PUNCTUATION = new Set(['"', '“', '‘', '(', '[', '{']);
const CLOSING_PUNCTUATION = new Set([
  '"',
  '”',
  '.',
  ',',
  '!',
  '?',
  ';',
  ':',
  '…',
  ')',
  ']',
  '}',
]);

/**
 * 영어 조립 문제는 문장 덩어리를 통째로 고르게 하지 않는다. 아래 묶음은 한
 * 자리에서 실제로 혼동하기 쉬운 기능어·활용형을 우선 오답으로 제공한다.
 * 목록에 없는 내용어는 같은 앞뒤 문맥에 등장한 단어를 코퍼스에서 가져온다.
 */
const DISTRACTOR_GROUPS: readonly (readonly string[])[] = [
  ['i', 'you', 'he', 'she', 'it', 'we', 'they'],
  ['me', 'you', 'him', 'her', 'it', 'us', 'them'],
  ['my', 'your', 'his', 'her', 'its', 'our', 'their'],
  ['mine', 'yours', 'his', 'hers', 'ours', 'theirs'],
  [
    'myself',
    'yourself',
    'himself',
    'herself',
    'itself',
    'ourselves',
    'yourselves',
    'themselves',
  ],
  ['am', 'is', 'are', 'was', 'were'],
  ['be', 'been', 'being'],
  ['have', 'has', 'had'],
  ['do', 'does', 'did'],
  ["don't", "doesn't", "didn't"],
  ["isn't", "aren't", "wasn't", "weren't"],
  ["haven't", "hasn't", "hadn't"],
  ['can', 'could', 'may', 'might', 'must', 'should', 'will', 'would'],
  ["can't", "couldn't", "mustn't", "shouldn't", "won't", "wouldn't"],
  ['a', 'an', 'the'],
  ['this', 'that', 'these', 'those'],
  ['some', 'any', 'no'],
  ['much', 'many', 'few', 'little'],
  ['all', 'most', 'some', 'any', 'none'],
  ['every', 'each', 'all'],
  ['both', 'either', 'neither'],
  ['who', 'what', 'which', 'where', 'when', 'why', 'how'],
  [
    'in',
    'on',
    'at',
    'to',
    'from',
    'for',
    'with',
    'by',
    'of',
    'under',
    'over',
    'after',
    'before',
    'near',
    'between',
    'into',
    'about',
  ],
  ['and', 'but', 'or', 'because', 'so', 'if', 'when', 'than', 'as'],
  ['more', 'less', 'most', 'least'],
  ['too', 'enough', 'very', 'quite'],
  ['here', 'there', 'home', 'outside', 'inside'],
  ['today', 'tomorrow', 'yesterday', 'tonight', 'now', 'later'],
  [
    'always',
    'usually',
    'often',
    'sometimes',
    'never',
    'already',
    'yet',
    'just',
  ],
  ['good', 'better', 'best'],
  ['bad', 'worse', 'worst'],
  ['old', 'older', 'oldest'],
  ['doctor', 'journalist', 'teacher', 'student', 'nurse', 'engineer'],
  ['mother', 'father', 'sister', 'brother'],
  ['parents', 'children', 'friends', 'students'],
  ['table', 'desk', 'chair', 'door', 'window', 'shelf', 'bed', 'sofa'],
  ['key', 'bag', 'book', 'ticket', 'phone'],
  ['keys', 'bags', 'books', 'tickets', 'phones'],
  ['car', 'bus', 'train', 'plane', 'taxi', 'bike'],
  ['school', 'office', 'station', 'airport', 'hotel', 'restaurant', 'bank'],
  ['coffee', 'tea', 'water', 'milk', 'juice'],
  ['breakfast', 'lunch', 'dinner'],
  ['morning', 'afternoon', 'evening', 'night'],
  [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ],
];

const DISTRACTOR_GROUP_BY_TOKEN = new Map<string, readonly string[]>();
for (const group of DISTRACTOR_GROUPS) {
  for (const token of group) {
    if (!DISTRACTOR_GROUP_BY_TOKEN.has(token)) {
      DISTRACTOR_GROUP_BY_TOKEN.set(token, group);
    }
  }
}

function sentenceTokens(sentence: string): string[] {
  return sentence.match(/\S+/g) ?? [];
}

function tokenParts(token: string): TokenParts {
  let start = 0;
  let end = token.length;
  while (start < end && OPENING_PUNCTUATION.has(token[start])) start += 1;
  while (end > start && CLOSING_PUNCTUATION.has(token[end - 1])) end -= 1;
  return {
    prefix: token.slice(0, start),
    core: token.slice(start, end),
    suffix: token.slice(end),
  };
}

function tokenSpans(sentence: string): TokenSpan[] {
  return [...sentence.matchAll(/\S+/g)].map((match, index) => {
    const raw = match[0];
    const start = match.index;
    const parts = tokenParts(raw);
    return {
      ...parts,
      raw,
      index,
      start,
      end: start + raw.length,
      coreStart: start + parts.prefix.length,
      coreEnd: start + parts.prefix.length + parts.core.length,
    };
  });
}

function normalizedToken(token: string): string {
  return tokenParts(token).core.replaceAll('’', "'").toLocaleLowerCase('en-US');
}

function visualTokenKey(token: string): string {
  return token
    .normalize('NFKC')
    .replaceAll('’', "'")
    .toLocaleLowerCase('en-US');
}

function pushToMap<TKey>(map: Map<TKey, string[]>, key: TKey, value: string) {
  const values = map.get(key);
  if (values) values.push(value);
  else map.set(key, [value]);
}

function buildTokenCorpus(units: readonly EnglishGrammarUnit[]): TokenCorpus {
  const corpus: TokenCorpus = {
    all: [],
    byNeighbors: new Map(),
    byNext: new Map(),
    byNextTwo: new Map(),
    byPosition: new Map(),
    byPrevious: new Map(),
    byPreviousTwo: new Map(),
  };

  for (const unit of units) {
    for (const spec of unit.specs) {
      for (const drill of spec.drills) {
        const tokens = sentenceTokens(sentenceOf(drill.template, drill.answer));
        tokens.forEach((token, index) => {
          const previous =
            index === 0 ? '^' : normalizedToken(tokens[index - 1]);
          const next =
            index === tokens.length - 1
              ? '$'
              : normalizedToken(tokens[index + 1]);
          const previousTwo = `${
            index < 2 ? '^' : normalizedToken(tokens[index - 2])
          }|${previous}`;
          const nextTwo = `${next}|${
            index + 2 >= tokens.length
              ? '$'
              : normalizedToken(tokens[index + 2])
          }`;
          corpus.all.push(token);
          pushToMap(corpus.byNeighbors, `${previous}|${next}`, token);
          pushToMap(corpus.byPrevious, previous, token);
          pushToMap(corpus.byPreviousTwo, previousTwo, token);
          pushToMap(corpus.byNext, next, token);
          pushToMap(corpus.byNextTwo, nextTwo, token);
          pushToMap(corpus.byPosition, index, token);
        });
      }
    }
  }
  return corpus;
}

function wordShape(token: string) {
  const core = tokenParts(token).core;
  const lower = core.toLocaleLowerCase('en-US');
  if (/^\d/.test(core)) return 'number';
  if (/ing$/i.test(core)) return 'ing';
  if (/ed$/i.test(core)) return 'ed';
  if (/ly$/i.test(core)) return 'ly';
  if (
    /s$/i.test(core) &&
    !['as', 'does', 'has', 'his', 'is', 'this', 'us', 'was'].includes(lower)
  ) {
    return 'plural';
  }
  return 'word';
}

function comparableToken(correct: string, candidate: string): boolean {
  const correctCore = normalizedToken(correct);
  const candidateCore = normalizedToken(candidate);
  if (!candidateCore || candidateCore === correctCore) return false;
  const correctGroup = DISTRACTOR_GROUP_BY_TOKEN.get(correctCore);
  const candidateGroup = DISTRACTOR_GROUP_BY_TOKEN.get(candidateCore);
  if (correctGroup) return correctGroup.includes(candidateCore);
  if (candidateGroup) return false;
  const shape = wordShape(correct);
  return shape === 'word' || shape === wordShape(candidate);
}

function formatLike(candidate: string, correct: string): string | undefined {
  const correctParts = tokenParts(correct);
  const candidateCore = tokenParts(candidate).core;
  if (!candidateCore || /\s/.test(candidateCore)) return undefined;

  let core = candidateCore;
  if (/^[A-Z]/.test(correctParts.core) && /^[a-z]/.test(core)) {
    core = core[0].toLocaleUpperCase('en-US') + core.slice(1);
  } else if (
    /^[A-Z]+$/.test(correctParts.core) &&
    /[A-Za-z]/.test(correctParts.core)
  ) {
    core = core.toLocaleUpperCase('en-US');
  }
  return `${correctParts.prefix}${core}${correctParts.suffix}`;
}

function fallbackTokens(correct: string): string[] {
  const core = tokenParts(correct).core;
  const shape = wordShape(correct);
  const time = core.match(/^(\d{1,2}):(\d{2})$/);
  if (time) {
    const hour = Number(time[1]);
    const minute = time[2];
    return [
      `${hour === 1 ? 12 : hour - 1}:${minute}`,
      `${hour === 12 ? 1 : hour + 1}:${minute}`,
      `${hour}:${minute === '30' ? '00' : '30'}`,
    ];
  }
  if (/^\d+$/.test(core)) {
    const value = Number(core);
    return [
      String(Math.max(0, value - 1)),
      String(value + 1),
      String(value + 2),
    ];
  }
  if (shape === 'ing') return ['working', 'reading', 'waiting', 'playing'];
  if (shape === 'ed') return ['worked', 'called', 'played', 'visited'];
  if (shape === 'ly') return ['slowly', 'quickly', 'carefully', 'quietly'];
  if (shape === 'plural') return ['books', 'cars', 'friends', 'students'];
  return ['home', 'today', 'work', 'time', 'place', 'thing', 'people'];
}

function alignedAlternativeToken(
  alternative: string,
  tokenIndex: number,
  correctLength: number,
): string | undefined {
  const tokens = sentenceTokens(alternative);
  if (tokens.length === 0) return undefined;
  if (tokens.length === correctLength) return tokens[tokenIndex];
  if (correctLength <= 1) return tokens[0];
  const proportionalIndex = Math.round(
    (tokenIndex * (tokens.length - 1)) / (correctLength - 1),
  );
  return tokens[proportionalIndex];
}

function granularBuildRows(
  drill: EnglishGrammarDrill,
  corpus: TokenCorpus,
): BuildRow[] {
  const sentence = sentenceOf(drill.template, drill.answer);
  const completeTokens = sentenceTokens(sentence);
  const everyAuthoredAlternative = drill.rows.flatMap((row) => [
    ...sentenceTokens(row[1]),
    ...sentenceTokens(row[2]),
  ]);
  const rows: BuildRow[] = [];
  let absoluteIndex = 0;

  for (const authoredRow of drill.rows) {
    const correctTokens = sentenceTokens(authoredRow[0]);
    const alternatives = [authoredRow[1], authoredRow[2]];

    correctTokens.forEach((correct, tokenIndex) => {
      if (completeTokens[absoluteIndex] !== correct) {
        throw new Error(
          `granular build lost sentence order at '${correct}' in '${sentence}'`,
        );
      }

      const correctCore = tokenParts(correct).core;
      if (!/[\p{L}\p{N}]/u.test(correctCore)) {
        const punctuationOptions =
          correctCore === '—' ? ['—', '–', '-'] : [correct, '—', '-'];
        rows.push({ options: punctuationOptions, correct });
        absoluteIndex += 1;
        return;
      }

      const previous =
        absoluteIndex === 0
          ? '^'
          : normalizedToken(completeTokens[absoluteIndex - 1]);
      const next =
        absoluteIndex === completeTokens.length - 1
          ? '$'
          : normalizedToken(completeTokens[absoluteIndex + 1]);
      const previousTwo = `${
        absoluteIndex < 2
          ? '^'
          : normalizedToken(completeTokens[absoluteIndex - 2])
      }|${previous}`;
      const nextTwo = `${next}|${
        absoluteIndex + 2 >= completeTokens.length
          ? '$'
          : normalizedToken(completeTokens[absoluteIndex + 2])
      }`;
      const aligned = alternatives
        .map((alternative) =>
          alignedAlternativeToken(
            alternative,
            tokenIndex,
            correctTokens.length,
          ),
        )
        .filter((token): token is string => Boolean(token));
      const group = DISTRACTOR_GROUP_BY_TOKEN.get(normalizedToken(correct));
      const candidates = group
        ? [
            ...group,
            ...aligned,
            ...(corpus.byNeighbors.get(`${previous}|${next}`) ?? []),
            ...(corpus.byPrevious.get(previous) ?? []),
            ...(corpus.byNext.get(next) ?? []),
          ]
        : [
            ...(corpus.byPreviousTwo.get(previousTwo) ?? []),
            ...(corpus.byNeighbors.get(`${previous}|${next}`) ?? []),
            ...(corpus.byNextTwo.get(nextTwo) ?? []),
            ...aligned,
            ...(corpus.byPrevious.get(previous) ?? []),
            ...(corpus.byNext.get(next) ?? []),
            ...(corpus.byPosition.get(absoluteIndex) ?? []),
          ];
      candidates.push(
        ...sentenceTokens(authoredRow[1]),
        ...sentenceTokens(authoredRow[2]),
        ...everyAuthoredAlternative,
        ...fallbackTokens(correct),
        ...corpus.all,
      );

      const options = [correct];
      const normalizedOptions = new Set([visualTokenKey(correct)]);
      for (const candidate of candidates) {
        if (!comparableToken(correct, candidate)) continue;
        const formatted = formatLike(candidate, correct);
        if (!formatted) continue;
        const normalized = visualTokenKey(formatted);
        if (normalizedOptions.has(normalized)) continue;
        options.push(formatted);
        normalizedOptions.add(normalized);
        if (options.length === 3) break;
      }

      if (options.length !== 3) {
        throw new Error(
          `could not make three granular choices for '${correct}' in '${sentence}'`,
        );
      }
      rows.push({ options, correct });
      absoluteIndex += 1;
    });
  }

  if (absoluteIndex !== completeTokens.length) {
    throw new Error(`granular build did not consume '${sentence}'`);
  }
  return rows;
}

function grammarFocus(drill: EnglishGrammarDrill): BlankFocus {
  const [prefix, suffix] = drill.template.split('___');
  return { answer: drill.answer, kind: 'grammar', prefix, suffix };
}

function contextFocus(drill: EnglishGrammarDrill): BlankFocus | undefined {
  const sentence = sentenceOf(drill.template, drill.answer);
  const [grammarPrefix] = drill.template.split('___');
  const grammarStart = grammarPrefix.length;
  const grammarEnd = grammarStart + drill.answer.length;
  const spans = tokenSpans(sentence).filter((span) =>
    /[\p{L}\p{N}]/u.test(span.core),
  );
  const afterGrammar = spans.filter(
    (candidate) => candidate.coreStart >= grammarEnd,
  );
  const beforeGrammar = spans.filter(
    (candidate) => candidate.coreEnd <= grammarStart,
  );
  const isUsefulContext = (candidate: TokenSpan) =>
    !['a', 'an', 'the'].includes(normalizedToken(candidate.core));
  const span =
    afterGrammar.find(isUsefulContext) ??
    afterGrammar[0] ??
    [...beforeGrammar].reverse().find(isUsefulContext) ??
    [...beforeGrammar].reverse()[0] ??
    [...spans]
      .reverse()
      .find(
        (candidate) =>
          candidate.coreStart >= grammarStart &&
          candidate.coreEnd <= grammarEnd &&
          candidate.core !== drill.answer,
      );
  if (!span) return undefined;
  return {
    answer: span.core,
    kind: 'context',
    prefix: sentence.slice(0, span.coreStart),
    suffix: sentence.slice(span.coreEnd),
    tokenIndex: span.index,
  };
}

function chooseBlankFocuses(
  drills: readonly EnglishGrammarDrill[],
): BlankFocus[] {
  const contextFocuses = drills.map(contextFocus);
  const indexes = drills.map((_, index) => index);
  const withoutGrammarAlternatives = (index: number) =>
    acceptedAnswersFor(drills[index].answer, drills[index].acceptedAnswers)
      .length === 0;
  const viable = (index: number) => Boolean(contextFocuses[index]);
  const odd = (index: number) => index % 2 === 1;
  const priority = [
    ...indexes.filter(
      (index) =>
        odd(index) && viable(index) && withoutGrammarAlternatives(index),
    ),
    ...indexes.filter(
      (index) =>
        !odd(index) && viable(index) && withoutGrammarAlternatives(index),
    ),
    ...indexes.filter((index) => odd(index) && viable(index)),
    ...indexes.filter((index) => !odd(index) && viable(index)),
  ];
  const contextIndexes = new Set<number>();
  for (const index of priority) {
    contextIndexes.add(index);
    if (contextIndexes.size === 5) break;
  }
  if (contextIndexes.size !== 5) {
    throw new Error('each English grammar needs five viable context blanks');
  }
  return drills.map((drill, index) =>
    contextIndexes.has(index) ? contextFocuses[index]! : grammarFocus(drill),
  );
}

function blankInstruction(kind: BlankFocus['kind']): LocalizedText {
  if (kind === 'grammar') {
    return L(
      '빈칸에 알맞은 영어 문법 표현을 쓰세요',
      "Bo'sh joyga mos inglizcha grammatik ifodani yozing",
      'Write the missing English grammar expression',
      'Впишите недостающее английское грамматическое выражение',
    );
  }
  return L(
    '배운 문법과 문맥에 맞는 영어 단어를 쓰세요',
    "O'rgangan grammatika va kontekstga mos inglizcha so'zni yozing",
    'Write the English word that completes the grammar sentence',
    'Впишите английское слово, завершающее предложение с этой грамматикой',
  );
}

function hintForFocus(
  rule: LocalizedText,
  kind: BlankFocus['kind'],
): LocalizedText {
  if (kind === 'grammar') return rule;
  return L(
    `${rule.ko} · 문법 표현을 포함한 문장 전체의 문맥을 읽어 보세요.`,
    `${rule.uz} · Grammatik ifoda qatnashgan gapning butun kontekstini o'qing.`,
    `${rule.en} · Read the whole sentence around the grammar expression.`,
    `${rule.ru} · Прочитайте весь контекст предложения с этой грамматикой.`,
  );
}

function contextQuizChoices(focus: BlankFocus, rows: readonly BuildRow[]) {
  const row = rows[focus.tokenIndex!];
  const choices = row.options.map((option) => tokenParts(option).core);
  if (choices.length !== 3 || new Set(choices.map(visualTokenKey)).size !== 3) {
    throw new Error(`context quiz needs three choices for '${focus.answer}'`);
  }
  return choices;
}

function assertUnit(unit: EnglishGrammarUnit) {
  for (const spec of unit.specs) {
    if (spec.drills.length !== 10) {
      throw new Error(`${spec.code}: drills must contain exactly 10 items`);
    }
    if (spec.dialogue.length < 2) {
      throw new Error(`${spec.code}: dialogue needs at least two turns`);
    }
    if (spec.cautions.length < 2) {
      throw new Error(`${spec.code}: cautions need at least two items`);
    }
    const sentences = new Set<string>();
    const answers = new Set<string>();
    for (const [index, drill] of spec.drills.entries()) {
      if ((drill.template.match(/___/g) ?? []).length !== 1) {
        throw new Error(`${spec.code} drill ${index + 1}: expected one blank`);
      }
      if (
        ['ko', 'uz', 'en', 'ru'].some(
          (language) =>
            !drill.translation[language as keyof LocalizedText].trim(),
        )
      ) {
        throw new Error(`${spec.code} drill ${index + 1}: missing translation`);
      }
      const sentence = sentenceOf(drill.template, drill.answer);
      if (sentences.has(sentence)) {
        throw new Error(
          `${spec.code} drill ${index + 1}: duplicate practice sentence '${sentence}'`,
        );
      }
      sentences.add(sentence);
      answers.add(drill.answer);
      const built = drill.rows.map((row) => row[0]).join(' ');
      if (sentence !== built) {
        throw new Error(
          `${spec.code} drill ${index + 1}: build rows make '${built}', expected '${sentence}'`,
        );
      }
      for (const row of drill.rows) {
        if (new Set(row).size !== 3) {
          throw new Error(
            `${spec.code} drill ${index + 1}: build choices must be unique`,
          );
        }
      }
      const blankOptions =
        drill.blankOptions ?? drill.rows.find((row) => row[0] === drill.answer);
      if (!blankOptions || !blankOptions.includes(drill.answer)) {
        throw new Error(
          `${spec.code} drill ${index + 1}: blank choices do not contain the answer`,
        );
      }
      const focusRows = drill.rows.filter((row) => row[0] === drill.answer);
      if (focusRows.length !== 1) {
        throw new Error(
          `${spec.code} drill ${index + 1}: build must test the blank answer in exactly one row`,
        );
      }
    }
    if (answers.size < 3) {
      throw new Error(
        `${spec.code}: ten drills must practise at least three distinct answers`,
      );
    }
  }
}

function mix20(prefix: string): string[] {
  return Array.from({ length: 10 }, (_, index) => {
    const n = index + 1;
    return [
      `${prefix}_${String(n).padStart(2, '0')}`,
      `${prefix}_${String(n + 10).padStart(2, '0')}`,
    ];
  }).flat();
}

export function buildEnglishGrammarSeeds(units: readonly EnglishGrammarUnit[]) {
  units.forEach(assertUnit);

  const corpus = buildTokenCorpus(units);
  const grammar: EnglishGrammarPageSeed[] = [];
  const questions: Record<string, EnglishGrammarTrackQuestion> = {};
  const nodes: EnglishGrammarNodeSeed[] = [];

  for (const unit of units) {
    const lessons: EnglishGrammarNodeSeed['lessons'] = [];

    unit.specs.forEach((spec, grammarIndex) => {
      const blankFocuses = chooseBlankFocuses(spec.drills);
      const preparedDrills = spec.drills.map((drill, drillIndex) => ({
        buildRows: granularBuildRows(drill, corpus),
        drill,
        focus: blankFocuses[drillIndex],
      }));
      const page: EnglishGrammarPageSeed = {
        ...ENGLISH_GRAMMAR_COURSE,
        sourceUnit: spec.sourceUnit,
        code: spec.code,
        pattern: spec.pattern,
        section: unit.section,
        unit: unit.unit,
        order: grammarIndex + 1,
        isActive: true,
        summary: spec.summary,
        tags: [
          L('초급', "Boshlang'ich", 'Beginner', 'Начальный'),
          spec.categoryTag,
        ],
        explanation: spec.explanation,
        conjugationRule: spec.rule,
        conjugations: spec.forms,
        examples: spec.drills.map((drill) => {
          const text = sentenceOf(drill.template, drill.answer);
          return {
            text,
            gloss: { ...drill.translation, en: text },
            highlight: drill.answer,
          };
        }),
        dialogue: spec.dialogue,
        similar: spec.similar,
        cautions: spec.cautions,
        quiz: preparedDrills.slice(0, 5).map(({ buildRows, drill, focus }) => {
          const choices: readonly string[] =
            focus.kind === 'context'
              ? contextQuizChoices(focus, buildRows)
              : (drill.blankOptions ??
                drill.rows.find((row) => row[0] === drill.answer)!);
          return {
            prompt: `${focus.prefix}___${focus.suffix}`,
            options: choices.map((text) => ({
              text,
              correct: text === focus.answer,
            })),
          };
        }),
      };
      grammar.push(page);

      const prefix = `en-general:gp_s${unit.section}_u${unit.unit}_g${grammarIndex + 1}`;
      preparedDrills.forEach(({ buildRows, drill, focus }, drillIndex) => {
        const sentence = sentenceOf(drill.template, drill.answer);
        const blankCode = `${prefix}_${String(drillIndex + 1).padStart(2, '0')}`;
        const buildCode = `${prefix}_${String(drillIndex + 11).padStart(2, '0')}`;

        questions[blankCode] = {
          ...ENGLISH_GRAMMAR_COURSE,
          type: 'grammar_blank',
          level: unit.level,
          lessonCategory: 'grammar',
          instruction: blankInstruction(focus.kind),
          sentencePrefix: focus.prefix,
          sentenceSuffix: focus.suffix,
          answer: focus.answer,
          answerTranslation: { ...drill.translation, en: sentence },
          hint: hintForFocus(spec.rule, focus.kind),
          explanation: spec.summary,
          tags: [spec.code, `blank-focus-${focus.kind}`],
          acceptedAnswers:
            focus.kind === 'grammar'
              ? acceptedAnswersFor(drill.answer, drill.acceptedAnswers)
              : acceptedAnswersFor(focus.answer),
        };

        questions[buildCode] = {
          ...ENGLISH_GRAMMAR_COURSE,
          type: 'grammar_build',
          level: unit.level,
          lessonCategory: 'grammar',
          instruction: L(
            '순서에 맞게 영어 문장을 만드세요',
            "Inglizcha gapni to'g'ri tartibda tuzing",
            'Build the English sentence in order',
            'Составьте английское предложение по порядку',
          ),
          answer: sentence,
          buildRows,
          answerTranslation: { ...drill.translation, en: sentence },
          hint: spec.rule,
          explanation: spec.summary,
          tags: [spec.code, 'build-focus-sentence'],
          acceptedAnswers: acceptedAnswersFor(
            sentence,
            (drill.acceptedAnswers ?? []).map((answer) =>
              sentenceOf(drill.template, answer),
            ),
          ),
        };
      });

      lessons.push({
        ...ENGLISH_GRAMMAR_COURSE,
        title: L(spec.pattern, spec.pattern, spec.pattern, spec.pattern),
        description: spec.summary,
        category: 'grammar',
        level: unit.level,
        order: grammarIndex + 1,
        grammarCode: spec.code,
        questions: mix20(prefix),
      });
    });

    nodes.push({
      ...ENGLISH_GRAMMAR_COURSE,
      code: `en-general:gt_s${unit.section}_u${unit.unit}_o1`,
      title: unit.title,
      description: unit.description,
      section: unit.section,
      unit: unit.unit,
      order: 1,
      category: 'grammar',
      isActive: true,
      lessons,
    });
  }

  return { grammar, nodes, questions };
}
