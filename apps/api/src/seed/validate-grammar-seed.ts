/**
 * Course-scoped grammar page and practice-track validation. This never connects
 * to MongoDB or writes data.
 *
 * pnpm --filter api seed:validate-grammar -- --courseId=en-general
 */
import { DEFAULT_TARGET_LANGUAGE } from '../common/learning-course';
import { parseSeedCourseScope } from './course-seed.options';
import { getGrammarSeed, getGrammarTrackSeed } from './grammar-course.data';

const scope = parseSeedCourseScope();
const grammarSeed = getGrammarSeed(scope) as any[];
const { nodes, questions } = getGrammarTrackSeed(scope) as {
  nodes: any[];
  questions: Record<string, any>;
};
const errors: string[] = [];
const warnings: string[] = [];

const fail = (code: string, message: string) =>
  errors.push(`${code}: ${message}`);
const warn = (code: string, message: string) =>
  warnings.push(`${code}: ${message}`);
const hasFourLanguages = (value: any) =>
  value &&
  typeof value === 'object' &&
  ['ko', 'uz', 'en', 'ru'].every(
    (language) =>
      typeof value[language] === 'string' && value[language].trim().length > 0,
  );
const targetText = (value: any) => value?.text || value?.ko || '';

function hasBatchim(word: string): boolean | null {
  const last = word.trim().slice(-1);
  const codePoint = last.charCodeAt(0);
  if (!(codePoint >= 0xac00 && codePoint <= 0xd7a3)) return null;
  return (codePoint - 0xac00) % 28 !== 0;
}

const BATCHIM_RULES: Record<string, { withBatchim: string; without: string }> =
  {
    'topic-eun-neun': { withBatchim: '은', without: '는' },
    'copula-ieyo': { withBatchim: '이에요', without: '예요' },
    'neg-i-ga-animnida': {
      withBatchim: '이 아닙니다',
      without: '가 아닙니다',
    },
    'exist-i-ga-isseoyo': { withBatchim: '이 있어요', without: '가 있어요' },
    'and-hago-gwa-wa': { withBatchim: '과', without: '와' },
    'here-is-n': { withBatchim: '이에요', without: '예요' },
    'obj-eul-reul': { withBatchim: '을', without: '를' },
    'honor-iseyo': { withBatchim: '이세요', without: '세요' },
  };

const seenCodes = new Set<string>();
const seenSlots = new Set<string>();

for (const grammar of grammarSeed) {
  const code = grammar.code as string;
  if (!code) {
    errors.push('code 없는 항목이 있다');
    continue;
  }
  if (seenCodes.has(code)) fail(code, 'code 가 중복이다');
  seenCodes.add(code);

  const section = grammar.section ?? 1;
  const unit = grammar.unit ?? 1;
  const slot = `${section}/${unit}/${grammar.order}`;
  if (seenSlots.has(slot)) fail(code, `위치 ${slot} 가 중복이다`);
  seenSlots.add(slot);

  if (!grammar.pattern) fail(code, 'pattern 이 없다');
  if (!Number.isInteger(grammar.unit) || grammar.unit < 1) {
    fail(code, 'unit 이 없다 — 학습 로드가 하루치를 못 고른다');
  }
  if (scope.targetLanguage !== DEFAULT_TARGET_LANGUAGE) {
    if (grammar.courseId !== scope.courseId) fail(code, 'courseId 가 다르다');
    if (grammar.targetLanguage !== scope.targetLanguage) {
      fail(code, 'targetLanguage 가 다르다');
    }
    if (!Number.isInteger(grammar.sourceUnit) || grammar.sourceUnit < 1) {
      fail(code, '원본 검수용 sourceUnit 이 없다');
    }
  }

  for (const field of ['summary', 'explanation', 'conjugationRule'] as const) {
    if (!hasFourLanguages(grammar[field])) {
      fail(code, `${field} 에 빠진 언어가 있다`);
    }
  }
  for (const [index, tag] of (grammar.tags ?? []).entries()) {
    if (!hasFourLanguages(tag)) {
      fail(code, `tags[${index}] 에 빠진 언어가 있다`);
    }
  }

  const examples = grammar.examples ?? [];
  if (scope.targetLanguage === 'en' && examples.length < 10) {
    fail(code, `예문이 ${examples.length}개다 (10개 이상 필요)`);
  }
  for (const [index, example] of examples.entries()) {
    const text = targetText(example);
    if (!text) fail(code, `examples[${index}] 에 학습 문장이 없다`);
    if (!hasFourLanguages(example.gloss)) {
      fail(code, `examples[${index}].gloss 에 빠진 언어가 있다`);
    }
    if (example.highlight && !text.includes(example.highlight)) {
      fail(
        code,
        `examples[${index}] 의 highlight '${example.highlight}' 가 문장에 없다`,
      );
    }
  }

  for (const [index, turn] of (grammar.dialogue ?? []).entries()) {
    const text = targetText(turn);
    if (!text) fail(code, `dialogue[${index}] 에 학습 대화가 없다`);
    if (!hasFourLanguages(turn.gloss)) {
      fail(code, `dialogue[${index}].gloss 에 빠진 언어가 있다`);
    }
    if (turn.highlight && !text.includes(turn.highlight)) {
      fail(
        code,
        `dialogue[${index}] 의 highlight '${turn.highlight}' 가 문장에 없다`,
      );
    }
    if (!['left', 'right'].includes(turn.side)) {
      fail(code, `dialogue[${index}].side 는 left 또는 right 여야 한다`);
    }
  }

  for (const [index, caution] of (grammar.cautions ?? []).entries()) {
    if (!hasFourLanguages(caution)) {
      fail(code, `cautions[${index}] 에 빠진 언어가 있다`);
    }
  }
  if (grammar.similar && !hasFourLanguages(grammar.similar.note)) {
    fail(code, 'similar.note 에 빠진 언어가 있다');
  }

  const quizzes = grammar.quiz ?? [];
  if (!quizzes.length) warn(code, '퀴즈가 없다');
  else if (quizzes.length < 5) {
    warn(code, `퀴즈 ${quizzes.length}문항 — 5문항이 기준이다`);
  }
  for (const [index, quiz] of quizzes.entries()) {
    if (scope.targetLanguage === DEFAULT_TARGET_LANGUAGE) {
      if (!hasFourLanguages(quiz.question)) {
        fail(code, `quiz[${index}].question 에 빠진 언어가 있다`);
      }
    } else if (!quiz.prompt?.trim()) {
      fail(code, `quiz[${index}].prompt 가 없다`);
    }
    const correct = (quiz.options ?? []).filter(
      (option: any) => option.correct,
    );
    if (correct.length !== 1) {
      fail(code, `quiz[${index}] 의 정답이 ${correct.length}개다 (정확히 1개)`);
    }
    if ((quiz.options ?? []).length < 3) {
      warn(code, `quiz[${index}] 보기가 ${quiz.options?.length ?? 0}개뿐이다`);
    }
    const texts = (quiz.options ?? []).map((option: any) => option.text);
    if (texts.length !== new Set(texts).size) {
      fail(code, `quiz[${index}] 보기에 중복이 있다`);
    }
  }

  if (scope.targetLanguage === DEFAULT_TARGET_LANGUAGE) {
    const rule = BATCHIM_RULES[code];
    if (rule) {
      if (!grammar.conjugations?.length) fail(code, '활용 예시가 없다');
      for (const { base, result } of grammar.conjugations ?? []) {
        const batchim = hasBatchim(base);
        if (batchim === null) {
          warn(code, `'${base}' 는 한글이 아니라 받침을 못 본다`);
          continue;
        }
        const expected = base + (batchim ? rule.withBatchim : rule.without);
        if (result !== expected) {
          fail(
            code,
            `'${base}' 의 활용은 '${expected}' 여야 하지만 '${result}' 다`,
          );
        }
      }
    }
  }
}

const knownGrammar = new Set(grammarSeed.map((grammar) => grammar.code));
const usedQuestions = new Set<string>();
const countsByGrammar = new Map<string, { blank: number; build: number }>();

for (const node of nodes) {
  if (scope.targetLanguage !== DEFAULT_TARGET_LANGUAGE) {
    if (
      node.courseId !== scope.courseId ||
      node.targetLanguage !== scope.targetLanguage
    ) {
      fail(node.code ?? 'node', '노드의 과정 범위가 다르다');
    }
  }
  for (const lesson of node.lessons ?? []) {
    const grammarCode = lesson.grammarCode;
    if (!knownGrammar.has(grammarCode)) {
      fail(
        grammarCode ?? 'lesson',
        '문법 트랙이 참조하지만 설명 페이지가 없다',
      );
    }
    for (const questionCode of lesson.questions ?? []) {
      if (usedQuestions.has(questionCode)) {
        fail(questionCode, '두 레슨 이상에서 중복 사용된다');
      }
      usedQuestions.add(questionCode);
      const question = questions[questionCode];
      if (!question) {
        fail(questionCode, '레슨이 참조하지만 문제 데이터가 없다');
        continue;
      }
      const counts = countsByGrammar.get(grammarCode) ?? { blank: 0, build: 0 };
      if (question.type === 'grammar_blank') counts.blank += 1;
      if (question.type === 'grammar_build') counts.build += 1;
      countsByGrammar.set(grammarCode, counts);

      if (scope.targetLanguage !== DEFAULT_TARGET_LANGUAGE) {
        if (
          question.courseId !== scope.courseId ||
          question.targetLanguage !== scope.targetLanguage
        ) {
          fail(questionCode, '문제의 과정 범위가 다르다');
        }
        for (const field of [
          'instruction',
          'answerTranslation',
          'hint',
          'explanation',
        ]) {
          if (!hasFourLanguages(question[field])) {
            fail(questionCode, `${field} 에 빠진 언어가 있다`);
          }
        }
      }
      if (question.type === 'grammar_blank') {
        const rebuilt = `${question.sentencePrefix}${question.answer}${question.sentenceSuffix}`;
        if (
          question.answerTranslation?.en &&
          rebuilt !== question.answerTranslation.en
        ) {
          fail(
            questionCode,
            `빈칸 정답을 넣으면 '${rebuilt}' 로 번역과 다르다`,
          );
        }
      }
      if (question.type === 'grammar_build') {
        const rebuilt = (question.buildRows ?? [])
          .map((row: any) => row.correct)
          .join(' ');
        if (rebuilt !== question.answer) {
          fail(
            questionCode,
            `문장 조립 정답이 '${rebuilt}' 로 answer 와 다르다`,
          );
        }
        for (const [index, row] of (question.buildRows ?? []).entries()) {
          if (row.options?.length !== 3 || new Set(row.options).size !== 3) {
            fail(
              questionCode,
              `buildRows[${index}] 는 중복 없는 보기 3개여야 한다`,
            );
          }
          if (!row.options?.includes(row.correct)) {
            fail(questionCode, `buildRows[${index}] 보기에 정답이 없다`);
          }
        }
      }
    }
  }
}

if (scope.targetLanguage === 'en') {
  for (const grammar of grammarSeed) {
    const counts = countsByGrammar.get(grammar.code) ?? { blank: 0, build: 0 };
    if (counts.blank !== 10 || counts.build !== 10) {
      fail(
        grammar.code,
        `트랙 문제가 빈칸 ${counts.blank}개·조립 ${counts.build}개다 (10개씩 필요)`,
      );
    }
  }
}

const bySection = new Map<number, string[]>();
for (const grammar of grammarSeed) {
  const section = grammar.section ?? 1;
  bySection.set(section, [...(bySection.get(section) ?? []), grammar.pattern]);
}
console.log(`🔍 ${scope.courseId} 문법 ${grammarSeed.length}개`);
for (const [section, patterns] of [...bySection.entries()].sort(
  (a, b) => a[0] - b[0],
)) {
  console.log(`   섹션 ${section}  ${patterns.join(' · ')}`);
}
console.log(`   트랙 문제 ${usedQuestions.size}개`);

for (const warning of warnings) console.warn(`⚠️  ${warning}`);
if (errors.length) {
  console.error(`\n❌ ${errors.length}건`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log('\n🎉 문법 시드 검증 통과');
