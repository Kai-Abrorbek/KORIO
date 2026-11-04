import { SECTION5_UNITS } from '../grammar/section5';
import type {
  Section5GrammarDefinition,
  Section5GrammarExample,
  Section5LocalizedText,
  Section5UnitDefinition,
} from '../grammar/section5.types';
import type {
  Section5BuildPractice,
  Section5BuildRow,
  Section5TrackLesson,
  Section5TrackNode,
  Section5TrackQuestion,
  Section5GrammarTrackDefinition,
} from './section5.types';

const BLANK_INSTRUCTION = {
  grammar: {
    ko: '빈칸에 알맞은 한국어 문법 표현을 쓰세요',
    uz: "Bo'sh joyga mos koreyscha grammatik ifodani yozing",
    en: 'Write the missing Korean grammar expression',
    ru: 'Впишите недостающее корейское грамматическое выражение',
  },
  context: {
    ko: '배운 문법과 문맥에 맞는 한국어 표현을 쓰세요',
    uz: "O'rganilgan grammatika va kontekstga mos koreyscha ifodani yozing",
    en: 'Write the Korean expression that fits the grammar and context',
    ru: 'Впишите корейское выражение, подходящее по грамматике и контексту',
  },
} as const;

const BUILD_INSTRUCTION: Section5LocalizedText = {
  ko: '순서에 맞게 한국어 문장을 만드세요',
  uz: "Koreyscha gapni to'g'ri tartibda tuzing",
  en: 'Build the Korean sentence in order',
  ru: 'Составьте корейское предложение по порядку',
};

const MULTI_BLANK_INDEXES = new Set([1, 4, 7, 9]);
const THREE_BLANK_INDEX = 9;
const LOW_INFORMATION_TOKENS = new Set([
  '네',
  '아니요',
  '그래요',
  '정말요',
  '그럼',
  '그래서',
  '그리고',
  '하지만',
]);
const OPENING_PUNCTUATION = new Set(['"', '“', '‘', '(', '[', '{']);
const CLOSING_PUNCTUATION = new Set([
  '"',
  '”',
  '’',
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

interface TextSpan {
  answer: string;
  start: number;
  end: number;
}

interface BlankFocus extends TextSpan {
  kind: 'grammar' | 'context';
}

interface TokenSpan extends TextSpan {
  raw: string;
  index: number;
}

interface PreparedBlank {
  answer: string;
  blankAnswers?: string[];
  focus: BlankFocus;
  sentencePrefix: string;
  sentenceSuffix: string;
  sentenceTemplate?: string;
}

interface TokenCorpus {
  all: string[];
  byPosition: Map<number, string[]>;
}

const sentenceTokens = (sentence: string): string[] =>
  sentence.match(/\S+/gu) ?? [];

function tokenParts(token: string) {
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
  return [...sentence.matchAll(/\S+/gu)].map((match, index) => {
    const raw = match[0];
    const start = match.index;
    const parts = tokenParts(raw);
    const coreStart = start + parts.prefix.length;
    return {
      answer: parts.core,
      raw,
      index,
      start: coreStart,
      end: coreStart + parts.core.length,
    };
  });
}

function normalizedToken(token: string) {
  return tokenParts(token).core.normalize('NFKC');
}

function visualTokenKey(token: string) {
  return token.normalize('NFKC');
}

function pushToMap<TKey>(map: Map<TKey, string[]>, key: TKey, value: string) {
  const current = map.get(key);
  if (current) current.push(value);
  else map.set(key, [value]);
}

function buildTokenCorpus(
  builds: readonly Section5BuildPractice[],
): TokenCorpus {
  const corpus: TokenCorpus = { all: [], byPosition: new Map() };
  for (const build of builds) {
    sentenceTokens(build.ko).forEach((token, index) => {
      corpus.all.push(token);
      pushToMap(corpus.byPosition, index, token);
    });
  }
  return corpus;
}

function formatLike(candidate: string, correct: string) {
  const correctParts = tokenParts(correct);
  const candidateCore = tokenParts(candidate).core;
  if (!candidateCore || /\s/u.test(candidateCore)) return undefined;
  return `${correctParts.prefix}${candidateCore}${correctParts.suffix}`;
}

function comparableToken(correct: string, candidate: string) {
  const correctCore = normalizedToken(correct);
  const candidateCore = normalizedToken(candidate);
  if (!candidateCore || candidateCore === correctCore) return false;
  const correctLast = [...correctCore].at(-1);
  const candidateLast = [...candidateCore].at(-1);
  if (correctLast === candidateLast) return true;
  const correctEndsSentence = /[.!?]$/u.test(correct);
  const candidateEndsSentence = /[.!?]$/u.test(candidate);
  return correctEndsSentence === candidateEndsSentence;
}

function rotateOptions(options: string[], offset: number): string[] {
  const shift = offset % options.length;
  return [...options.slice(shift), ...options.slice(0, shift)];
}

function buildRowsFor(
  build: Section5BuildPractice,
  corpus: TokenCorpus,
): Section5BuildRow[] {
  const tokens = sentenceTokens(build.ko);
  const targetIndexes = tokens
    .map((token, index) => (token.includes(build.target) ? index : -1))
    .filter((index) => index >= 0);
  if (targetIndexes.length !== 1) {
    throw new Error(
      `${build.ko}: target '${build.target}' must appear in exactly one token`,
    );
  }
  const targetIndex = targetIndexes[0];

  return tokens.map((correct, index) => {
    if (index === targetIndex) {
      const options = [
        correct,
        ...build.distractors.map((wrong) =>
          correct.replace(build.target, wrong),
        ),
      ];
      if (new Set(options.map(visualTokenKey)).size !== 3) {
        throw new Error(`${build.ko}: target choices must be unique`);
      }
      return {
        options: rotateOptions(options, index),
        correct,
      };
    }

    const candidates = [
      ...(corpus.byPosition.get(index) ?? []),
      ...corpus.all,
      '오늘',
      '어제',
      '내일',
      '학교에서',
      '집에서',
      '회사에서',
      '친구와',
      '가족과',
      '선생님과',
      '좋았어요.',
      '괜찮아요.',
      '확인했어요.',
      '물어봤어요.',
      '말했어요.',
    ];
    const options = [correct];
    const seen = new Set([visualTokenKey(correct)]);
    for (const candidate of candidates) {
      if (!comparableToken(correct, candidate)) continue;
      const formatted = formatLike(candidate, correct);
      if (!formatted || seen.has(visualTokenKey(formatted))) continue;
      options.push(formatted);
      seen.add(visualTokenKey(formatted));
      if (options.length === 3) break;
    }
    if (options.length !== 3) {
      throw new Error(
        `${build.ko}: cannot make three choices for '${correct}'`,
      );
    }
    return {
      options: rotateOptions(options, index),
      correct,
    };
  });
}

function grammarSpan(example: Section5GrammarExample): TextSpan {
  const start = example.ko.indexOf(example.highlight);
  if (start < 0) {
    throw new Error(`${example.ko}: missing highlight '${example.highlight}'`);
  }
  return {
    answer: example.highlight,
    start,
    end: start + example.highlight.length,
  };
}

function contextSpans(
  example: Section5GrammarExample,
  grammar: TextSpan,
): TokenSpan[] {
  return tokenSpans(example.ko).filter(
    (span) =>
      span.answer &&
      !LOW_INFORMATION_TOKENS.has(span.answer) &&
      (span.end <= grammar.start || span.start >= grammar.end),
  );
}

function contextFocus(
  example: Section5GrammarExample,
  grammar: TextSpan,
): BlankFocus {
  const spans = contextSpans(example, grammar);
  const after = spans.find((span) => span.start >= grammar.end);
  const before = [...spans].reverse().find((span) => span.end <= grammar.start);
  const selected = after ?? before;
  if (!selected) {
    throw new Error(
      `${example.ko}: no context focus around '${grammar.answer}'`,
    );
  }
  return { ...selected, kind: 'context' };
}

function replaceSpans(sentence: string, spans: TextSpan[]) {
  const ordered = [...spans].sort((left, right) => left.start - right.start);
  let cursor = 0;
  let sentenceTemplate = '';
  for (const span of ordered) {
    if (span.start < cursor) throw new Error(`${sentence}: overlapping blanks`);
    sentenceTemplate += `${sentence.slice(cursor, span.start)}___`;
    cursor = span.end;
  }
  sentenceTemplate += sentence.slice(cursor);
  return {
    sentenceTemplate,
    blankAnswers: ordered.map((span) => span.answer),
  };
}

function prepareBlank(
  example: Section5GrammarExample,
  index: number,
): PreparedBlank {
  const grammar = grammarSpan(example);
  const focus: BlankFocus =
    index % 2 === 0
      ? { ...grammar, kind: 'grammar' }
      : contextFocus(example, grammar);

  if (!MULTI_BLANK_INDEXES.has(index)) {
    return {
      answer: focus.answer,
      focus,
      sentencePrefix: example.ko.slice(0, focus.start),
      sentenceSuffix: example.ko.slice(focus.end),
    };
  }

  const desiredCount = index === THREE_BLANK_INDEX ? 3 : 2;
  const spans: TextSpan[] = [focus];
  if (
    focus.start !== grammar.start ||
    focus.end !== grammar.end ||
    focus.answer !== grammar.answer
  ) {
    spans.push(grammar);
  }
  const candidates = contextSpans(example, grammar)
    .filter(
      (candidate) =>
        !spans.some(
          (span) => candidate.start < span.end && candidate.end > span.start,
        ),
    )
    .sort((left, right) => {
      const leftDistance = Math.min(
        Math.abs(left.start - grammar.end),
        Math.abs(grammar.start - left.end),
      );
      const rightDistance = Math.min(
        Math.abs(right.start - grammar.end),
        Math.abs(grammar.start - right.end),
      );
      return leftDistance - rightDistance || left.start - right.start;
    });
  for (const candidate of candidates) {
    if (spans.length === desiredCount) break;
    spans.push(candidate);
  }
  if (spans.length !== desiredCount) {
    throw new Error(`${example.ko}: cannot create ${desiredCount} blanks`);
  }
  const multi = replaceSpans(example.ko, spans);
  return {
    answer: example.ko,
    ...multi,
    focus,
    sentencePrefix: '',
    sentenceSuffix: '',
  };
}

function mixedQuestionCodes(prefix: string, seed: number) {
  const blanks = [4, 1, 8, 6, 9, 2, 10, 5, 3, 7];
  const builds = [17, 13, 20, 12, 15, 18, 14, 19, 11, 16];
  const rotate = (values: number[], offset: number) => [
    ...values.slice(offset % values.length),
    ...values.slice(0, offset % values.length),
  ];
  const blankOrder = rotate(blanks, seed);
  const buildOrder = rotate(builds, seed * 3);
  const firstPattern = [
    'blank',
    'build',
    'build',
    'blank',
    'blank',
    'build',
    'blank',
    'build',
    'build',
    'blank',
    'blank',
    'build',
    'blank',
    'build',
    'build',
    'blank',
    'blank',
    'build',
    'blank',
    'build',
  ] as const;
  const pattern =
    seed % 2 === 0
      ? firstPattern
      : firstPattern.map((type) => (type === 'blank' ? 'build' : 'blank'));
  let blankIndex = 0;
  let buildIndex = 0;
  return pattern.map((type) => {
    const number =
      type === 'blank' ? blankOrder[blankIndex++] : buildOrder[buildIndex++];
    return `${prefix}_${String(number).padStart(2, '0')}`;
  });
}

function nodeDescription(title: Section5LocalizedText): Section5LocalizedText {
  return {
    ko: `${title.ko} 단원의 핵심 문법을 연습해요.`,
    uz: `${title.uz} bo'limining asosiy grammatikasini mashq qilamiz.`,
    en: `Practice the key grammar from the ${title.en} unit.`,
    ru: `Практикуем ключевую грамматику раздела «${title.ru}».`,
  };
}

function assertTrackDefinition(
  grammar: Section5GrammarDefinition,
  track: Section5GrammarTrackDefinition,
) {
  if (track.builds.length !== 10) {
    throw new Error(`${grammar.code}: builds must contain exactly 10 items`);
  }
  const blankSentences = new Set(grammar.examples.map((example) => example.ko));
  const buildSentences = new Set<string>();
  for (const build of track.builds) {
    if (blankSentences.has(build.ko)) {
      throw new Error(
        `${grammar.code}: blank/build sentence overlap '${build.ko}'`,
      );
    }
    if (buildSentences.has(build.ko)) {
      throw new Error(
        `${grammar.code}: duplicate build sentence '${build.ko}'`,
      );
    }
    buildSentences.add(build.ko);
    if (
      [build.target, ...build.distractors].some((token) => /\s/u.test(token))
    ) {
      throw new Error(
        `${grammar.code}: build target choices must each stay inside one token`,
      );
    }
    if (new Set([build.target, ...build.distractors]).size !== 3) {
      throw new Error(`${grammar.code}: build target choices must be unique`);
    }
  }
}

export function buildKoreanGrammarTrack({
  section,
  level,
  units,
  definitions,
}: {
  section: 5 | 6 | 7;
  level: '4' | '5' | '6';
  units: readonly Section5UnitDefinition[];
  definitions: readonly Section5GrammarTrackDefinition[];
}) {
  const grammarDefinitions = units.flatMap((unit) =>
    unit.grammars.map((grammar, grammarIndex) => ({
      grammar,
      grammarIndex,
      unit,
    })),
  );
  const trackByCode = new Map(
    definitions.map((definition) => [definition.grammarCode, definition]),
  );
  if (trackByCode.size !== definitions.length) {
    throw new Error(
      `section ${section} grammar track contains duplicate grammar codes`,
    );
  }
  if (definitions.length !== grammarDefinitions.length) {
    throw new Error(
      `section ${section} grammar track has ${definitions.length} definitions; expected ${grammarDefinitions.length}`,
    );
  }

  const questions: Record<string, Section5TrackQuestion> = {};
  const nodes: Section5TrackNode[] = [];

  for (const unit of units) {
    const lessons: Section5TrackLesson[] = [];
    unit.grammars.forEach((grammar, grammarIndex) => {
      const track = trackByCode.get(grammar.code);
      if (!track) throw new Error(`${grammar.code}: missing track definition`);
      assertTrackDefinition(grammar, track);
      const corpus = buildTokenCorpus(track.builds);
      const prefix = `gp_s${section}_u${unit.unit}_g${grammarIndex + 1}`;

      grammar.examples.forEach((example, blankIndex) => {
        const prepared = prepareBlank(example, blankIndex);
        const code = `${prefix}_${String(blankIndex + 1).padStart(2, '0')}`;
        questions[code] = {
          type: 'grammar_blank',
          level,
          lessonCategory: 'grammar',
          instruction: BLANK_INSTRUCTION[prepared.focus.kind],
          sentencePrefix: prepared.sentencePrefix,
          sentenceSuffix: prepared.sentenceSuffix,
          ...(prepared.sentenceTemplate
            ? {
                sentenceTemplate: prepared.sentenceTemplate,
                blankAnswers: prepared.blankAnswers,
              }
            : {}),
          answer: prepared.answer,
          answerTranslation: { ko: example.ko, ...example.translations },
          hint: grammar.conjugationRule,
          explanation: grammar.summary,
          tags: [
            grammar.code,
            `blank-focus-${prepared.focus.kind}`,
            `blank-count-${prepared.blankAnswers?.length ?? 1}`,
          ],
          acceptedAnswers: [],
        };
      });

      track.builds.forEach((build, buildIndex) => {
        const code = `${prefix}_${String(buildIndex + 11).padStart(2, '0')}`;
        questions[code] = {
          type: 'grammar_build',
          level,
          lessonCategory: 'grammar',
          instruction: BUILD_INSTRUCTION,
          answer: build.ko,
          buildRows: buildRowsFor(build, corpus),
          answerTranslation: { ko: build.ko, ...build.translations },
          hint: grammar.conjugationRule,
          explanation: grammar.summary,
          tags: [grammar.code, 'build-focus-sentence'],
          acceptedAnswers: [],
        };
      });

      lessons.push({
        title: grammar.title,
        description: grammar.summary,
        category: 'grammar',
        level,
        order: grammarIndex + 1,
        grammarCode: grammar.code,
        questions: mixedQuestionCodes(prefix, unit.unit * 5 + grammarIndex),
      });
    });

    nodes.push({
      code: `gt_s${section}_u${unit.unit}_o1`,
      title: unit.title,
      description: nodeDescription(unit.title),
      section,
      unit: unit.unit,
      order: unit.unit,
      category: 'grammar',
      isActive: true,
      lessons,
    });
  }

  const unknownCodes = [...trackByCode.keys()].filter(
    (code) => !grammarDefinitions.some(({ grammar }) => grammar.code === code),
  );
  if (unknownCodes.length) {
    throw new Error(
      `unknown section ${section} grammar codes: ${unknownCodes.join(', ')}`,
    );
  }

  return { nodes, questions };
}

export function buildSection5GrammarTrack(
  definitions: readonly Section5GrammarTrackDefinition[],
) {
  return buildKoreanGrammarTrack({
    section: 5,
    level: '5',
    units: SECTION5_UNITS,
    definitions,
  });
}
