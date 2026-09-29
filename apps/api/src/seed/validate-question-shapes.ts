/**
 * 공통 grading 계약과 중급 5종 문항 형태 검증.
 *
 * 이 타입들은 잘못 적어도 화면은 멀쩡히 뜬다. 대신 정답을 맞출 방법이
 * 사라진다 — error_hunt 의 wrongWord 가 어절과 한 글자라도 다르면 어디를
 * 눌러도 오답이고, verb_transform 의 options 에 음절이 하나 빠지면 정답을
 * 조립할 수 없다. 시딩 전에 여기서 걸러낸다.
 *
 * 실행: pnpm --filter api seed:validate-questions
 */

import * as seedData from './data/vocabulary';
import { composeAnswer } from '../lessons/chip-builder.util';

type SeedQuestion = Record<string, any>;

const TARGET_TYPES = new Set([
  'reading_quiz',
  'error_hunt',
  'cloze_passage',
  'dialog_order',
  'verb_transform',
]);

const TYPING_TYPES = new Set([
  'type_answer',
  'translate_type',
  'listen_type',
  'listen_fill',
]);

/** 칩을 눌러 문장을 조립하는 유형 */
const CHIP_BUILDER_TYPES = new Set([
  'sentence_builder',
  'translate_builder',
  'reply_builder',
  'word_arrange',
]);

/**
 * 번역·대답 조립 문제의 길이 한도.
 *
 * 말풍선에 우즈벡어 두세 줄 넘는 문장이 뜨고 칩이 13개씩 깔리면 폰 한 화면에
 * 안 들어가고, 학습자는 "번역 시험" 을 보는 기분이 된다 (2026-09-30 Kai 피드백).
 * 새 문제는 이 안에서 만든다. 긴 기존 문제는 경고로 남겨 두고 차례로 줄인다.
 */
export const BUILDER_MAX_WORDS = 9;
export const BUILDER_MAX_SOURCE_CHARS = 70;

/** 한 번의 검사에서 모은 결과 */
interface Report {
  errors: string[];
  warnings: string[];
}

let report: Report = { errors: [], warnings: [] };

function fail(key: string, message: string) {
  report.errors.push(`${key}: ${message}`);
}

function warn(key: string, message: string) {
  report.warnings.push(`${key}: ${message}`);
}

/** 시드 모듈에서 문항 맵(`{ key: question }`)만 골라 평평하게 편다 */
function collectQuestions(): Array<[string, SeedQuestion]> {
  const out: Array<[string, SeedQuestion]> = [];
  const seen = new Set<string>();

  for (const exported of Object.values(seedData as Record<string, unknown>)) {
    if (!exported || typeof exported !== 'object') continue;
    for (const [key, value] of Object.entries(
      exported as Record<string, unknown>,
    )) {
      if (!value || typeof value !== 'object') continue;
      const q = value as SeedQuestion;
      if (typeof q.type !== 'string') continue; // 문항이 아닌 export
      if (seen.has(key)) continue;
      seen.add(key);
      out.push([key, q]);
    }
  }

  return out;
}

function has4Languages(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false;
  const text = value as Record<string, unknown>;
  return ['ko', 'uz', 'en', 'ru'].every((l) => typeof text[l] === 'string');
}

/** answer 를 만들려면 options 에서 음절을 몇 개씩 빼가야 하는지 */
function missingSyllables(answer: string, options: string[]): string[] {
  const pool = new Map<string, number>();
  for (const o of options) pool.set(o, (pool.get(o) ?? 0) + 1);

  const missing: string[] = [];
  for (const ch of [...answer]) {
    const left = pool.get(ch) ?? 0;
    if (left <= 0) missing.push(ch);
    else pool.set(ch, left - 1);
  }
  return missing;
}

function validateReadingQuiz(key: string, q: SeedQuestion) {
  if (!q.passage) fail(key, 'reading_quiz 는 passage 가 필요하다');
  const options: string[] = q.options ?? [];
  if (options.length < 3)
    fail(key, `보기가 ${options.length}개뿐이다 (3개 이상)`);
  if (!q.answer) fail(key, 'answer 가 없다');
  else if (!options.includes(q.answer)) {
    fail(key, `answer '${q.answer}' 가 options 안에 없다`);
  }
  if (options.length !== new Set(options).size) {
    fail(key, 'options 에 중복이 있다');
  }
}

function validateErrorHunt(key: string, q: SeedQuestion) {
  const sentence: string = q.npcText ?? '';
  if (!sentence) {
    fail(key, 'error_hunt 는 npcText 에 오류 문장이 있어야 한다');
    return;
  }

  const words = sentence.split(' ');
  if (!q.wrongWord) {
    fail(key, 'wrongWord 가 없다');
  } else if (!words.includes(q.wrongWord)) {
    // 가장 흔한 실수라 힌트까지 같이 준다
    const near = words.find((w) => w.startsWith(q.wrongWord));
    fail(
      key,
      `wrongWord '${q.wrongWord}' 가 npcText 의 어절과 일치하지 않는다` +
        (near
          ? ` — '${near}' 를 쓰려던 것 같다`
          : ` (어절: ${words.join(' / ')})`),
    );
  }

  const options: string[] = q.options ?? [];
  if (options.length < 2) fail(key, `고칠 후보가 ${options.length}개뿐이다`);
  if (!q.answer) fail(key, 'answer 가 없다');
  else if (!options.includes(q.answer)) {
    fail(key, `answer '${q.answer}' 가 options 안에 없다`);
  }
  if (q.answer && q.answer === q.wrongWord) {
    fail(key, 'answer 와 wrongWord 가 같다 — 고쳐도 그대로다');
  }
}

function validateClozePassage(key: string, q: SeedQuestion) {
  const passage: string = q.passage ?? '';
  if (!passage) {
    fail(key, 'cloze_passage 는 passage 가 필요하다');
    return;
  }

  // 화면은 '___' 로 split 한다. 4개 이상이면 빈 조각이 생겨 어긋난다.
  const over = passage.match(/_{4,}/g);
  if (over) {
    fail(
      key,
      `언더바가 ${over[0].length}개인 빈칸이 있다 — 정확히 3개(___)만 쓴다`,
    );
  }

  const blanks = passage.split('___').length - 1;
  if (blanks === 0) fail(key, 'passage 에 빈칸(___)이 없다');

  const answers: string[] = q.blankAnswers ?? [];
  if (answers.length !== blanks) {
    fail(key, `빈칸 ${blanks}개인데 blankAnswers 는 ${answers.length}개다`);
  }

  const options: string[] = q.options ?? [];
  const notInBank = answers.filter((a) => !options.includes(a));
  if (notInBank.length) {
    fail(key, `정답 [${notInBank.join(', ')}] 이 options 에 없다`);
  }
  if (options.length && options.length <= answers.length) {
    warn(key, '오답 distractor 가 하나도 없다');
  }
}

function validateDialogOrder(key: string, q: SeedQuestion) {
  const lines: Array<{ speaker?: string; text?: string }> = q.dialogLines ?? [];
  if (lines.length < 3) {
    fail(key, `dialogLines 가 ${lines.length}줄이다 (3줄 이상)`);
  }
  if (lines.length > 6) {
    warn(key, `${lines.length}줄은 한 화면에 안 들어간다 (3~5줄 권장)`);
  }
  for (const [i, line] of lines.entries()) {
    if (!line.text) fail(key, `dialogLines[${i}] 에 text 가 없다`);
    if (line.speaker !== 'npc' && line.speaker !== 'user') {
      fail(key, `dialogLines[${i}].speaker 는 'npc' 또는 'user' 여야 한다`);
    }
  }
  const texts = lines.map((l) => l.text);
  if (texts.length !== new Set(texts).size) {
    fail(key, '같은 대사가 두 번 있다 — 정답 순서가 하나로 정해지지 않는다');
  }
  if (q.answer !== 'all_correct') {
    fail(
      key,
      `dialog_order 의 answer 는 'all_correct' 고정이다 (지금: '${q.answer}')`,
    );
  }
}

function validateVerbTransform(key: string, q: SeedQuestion) {
  if (!q.baseWord) fail(key, 'baseWord (기본형) 가 없다');
  if (!q.targetForm) fail(key, 'targetForm (목표 형태 라벨) 이 없다');

  const answer: string = q.answer ?? '';
  if (!answer) {
    fail(key, 'answer 가 없다');
    return;
  }
  if (/\s/.test(answer)) {
    fail(key, 'answer 에 공백이 있으면 완료 판정이 어긋난다');
  }

  const options: string[] = q.options ?? [];
  const multi = options.filter((o) => [...o].length > 1);
  if (multi.length) {
    fail(
      key,
      `options 는 음절 단위여야 한다 — [${multi.join(', ')}] 는 2글자 이상`,
    );
  }

  const missing = missingSyllables(answer, options);
  if (missing.length) {
    fail(
      key,
      `options 에 [${missing.join(', ')}] 가 없어 '${answer}' 를 조립할 수 없다`,
    );
  }
  if (options.length <= [...answer].length) {
    warn(key, '오답 음절이 하나도 없어 순서만 맞추면 된다');
  }
}

/**
 * 조립형: 칩 하나 = 어절 하나, 칩으로 정답을 만들 수 있어야 한다.
 *
 * 예전 섹션 3~5 는 "여기 규칙을" 처럼 칩에 어절을 여러 개 넣었다. 그러면
 * 칩 폭이 제각각이라 화면이 깨지고, 덩어리째 맞추면 돼서 너무 쉬워진다.
 * API 가 내려줄 때 쪼개 주지만(chip-builder.util) 새 시드는 처음부터 쪼개서 쓴다.
 * "휴대폰" + "이에요" 처럼 어절보다 잘게 쪼갠 칩은 괜찮다 (채점이 공백을 무시한다).
 */
function validateChipBuilder(
  key: string,
  q: SeedQuestion,
  found: { long: string[]; multi: string[] },
) {
  const options: string[] = Array.isArray(q.options) ? q.options : [];
  const answer = typeof q.answer === 'string' ? q.answer.trim() : '';
  if (!options.length || !answer) return;

  if (options.some((o) => /\s/.test(o.trim()))) found.multi.push(key);

  if (!composeAnswer(options, answer)) {
    fail(key, `칩을 다 써도 정답을 만들 수 없다 — 칩: ${options.join(' / ')}`);
  }

  if (q.type === 'translate_builder' || q.type === 'reply_builder') {
    const words = answer.split(/\s+/).length;
    // 말풍선에 뜨는 글: 번역은 학습자 언어 뜻 문장, 대답은 상대의 한국어 말
    const source: string =
      q.type === 'reply_builder'
        ? q.npcText || ''
        : q.answerTranslation?.uz || q.instruction?.uz || '';
    if (words > BUILDER_MAX_WORDS || source.length > BUILDER_MAX_SOURCE_CHARS) {
      found.long.push(`${key} (${words}어절, 말풍선 ${source.length}자)`);
    }
  }
}

function validateCommon(key: string, q: SeedQuestion) {
  if (!has4Languages(q.instruction)) {
    fail(key, 'instruction 에 ko/uz/en/ru 가 다 있어야 한다');
  }
  for (const field of ['hint', 'explanation'] as const) {
    if (q[field] && !has4Languages(q[field])) {
      fail(key, `${field} 에 빠진 언어가 있다`);
    }
  }
}

function validateGrading(key: string, q: SeedQuestion) {
  const grading = q.grading;
  if (!grading) return;

  if (!TYPING_TYPES.has(q.type)) {
    fail(key, `grading 은 타이핑 4종에만 쓸 수 있다 (지금: ${q.type})`);
  }
  if (!['exact', 'semantic', 'targetExpression'].includes(grading.mode)) {
    fail(key, `grading.mode '${grading.mode}' 가 잘못됐다`);
  }
  if (
    typeof grading.expectedMeaning !== 'string' ||
    !grading.expectedMeaning.trim()
  ) {
    fail(key, 'grading.expectedMeaning 이 없다');
  }
  if (
    grading.mode === 'targetExpression' &&
    (!Array.isArray(grading.targetExpressions) ||
      grading.targetExpressions.length === 0)
  ) {
    fail(key, 'targetExpression 모드인데 targetExpressions 가 없다');
  }
  if (
    grading.acceptedAnswers !== undefined &&
    !Array.isArray(grading.acceptedAnswers)
  ) {
    fail(key, 'grading.acceptedAnswers 는 배열이어야 한다');
  }
  if (grading.tolerance !== undefined) {
    if (!grading.tolerance || typeof grading.tolerance !== 'object') {
      fail(key, 'grading.tolerance 는 객체여야 한다');
    } else {
      for (const field of ['punctuation', 'spacing', 'minorTypos']) {
        const value = grading.tolerance[field];
        if (value !== undefined && typeof value !== 'boolean') {
          fail(key, `grading.tolerance.${field} 는 boolean 이어야 한다`);
        }
      }
    }
  }
}

/** 중급 5종만 골라 검사한다. 다른 타입은 그냥 지나간다. */
export function checkQuestions(entries: Array<[string, SeedQuestion]>): Report {
  report = { errors: [], warnings: [] };
  const found = { long: [] as string[], multi: [] as string[] };

  for (const [key, q] of entries) {
    validateGrading(key, q);
    if (CHIP_BUILDER_TYPES.has(q.type)) validateChipBuilder(key, q, found);
    if (!TARGET_TYPES.has(q.type)) continue;
    validateCommon(key, q);
    switch (q.type) {
      case 'reading_quiz':
        validateReadingQuiz(key, q);
        break;
      case 'error_hunt':
        validateErrorHunt(key, q);
        break;
      case 'cloze_passage':
        validateClozePassage(key, q);
        break;
      case 'dialog_order':
        validateDialogOrder(key, q);
        break;
      case 'verb_transform':
        validateVerbTransform(key, q);
        break;
    }
  }

  if (found.multi.length) {
    report.warnings.push(
      `칩에 어절이 여러 개인 조립 문제 ${found.multi.length}개 (API 가 쪼개서 내려주지만 시드도 쪼갤 것). 예: ${found.multi.slice(0, 8).join(', ')}`,
    );
  }
  if (found.long.length) {
    report.warnings.push(
      `번역·대답 조립 문제 ${found.long.length}개가 너무 길다 (정답 ${BUILDER_MAX_WORDS}어절·말풍선 ${BUILDER_MAX_SOURCE_CHARS}자 초과). 예: ${found.long.slice(0, 8).join(', ')}`,
    );
  }

  return report;
}

// ── CLI. import 로 불러 쓸 때는 실행되지 않는다.

if (require.main === module) {
  const questions = collectQuestions();
  const targets = questions.filter(([, q]) => TARGET_TYPES.has(q.type));
  const { errors, warnings } = checkQuestions(questions);

  const byType = new Map<string, number>();
  for (const [, q] of targets) {
    byType.set(q.type, (byType.get(q.type) ?? 0) + 1);
  }

  console.log(
    `🔍 전체 문항 ${questions.length}개 grading 계약 + 중급 5종 ${targets.length}개 검사`,
  );
  for (const type of TARGET_TYPES) {
    console.log(`   ${type.padEnd(16)} ${byType.get(type) ?? 0}`);
  }

  for (const warning of warnings) console.warn(`⚠️  ${warning}`);

  if (errors.length > 0) {
    console.error(`\n❌ 문항 형태 검증 실패 (${errors.length}건)`);
    errors.forEach((e) => console.error(`- ${e}`));
    process.exit(1);
  }

  console.log(`\n🎉 문항 형태 검증 통과`);
}
