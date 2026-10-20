import {
  resolveCourseScope,
  type CourseScope,
} from '../common/learning-course';
import * as koreanVocabulary from './data/vocabulary';
import { ENGLISH_VOCABULARY_MODULES } from './english-vocabulary-seed.data';
import { findVocabularyReferenceErrors } from './validate-vocabulary-references';

interface VocabularySeedLesson extends Record<string, unknown> {
  title: { ko: string };
  questions: readonly string[];
  code: string;
  courseId: string;
  targetLanguage: string;
}

export interface VocabularySeedNode extends Record<string, unknown> {
  title: { ko: string };
  section: number;
  unit: number;
  order: number;
  lessons: VocabularySeedLesson[];
  code: string;
  courseId: string;
  targetLanguage: string;
}

export interface VocabularyCourseSeed {
  scope: CourseScope;
  questions: Record<string, Record<string, unknown>>;
  nodes: VocabularySeedNode[];
}

export function vocabularyNodeCode(
  scope: CourseScope,
  node: { section: number; unit: number; order: number },
) {
  const legacy = `s${node.section}_u${node.unit}_o${node.order}`;
  // Do not rename published Korean identifiers: existing lesson progress uses IDs.
  return scope.courseId === 'ko-general'
    ? legacy
    : `${scope.courseId}:${legacy}`;
}

function recordOf(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${label} must be an object`);
  }
  return value as Record<string, unknown>;
}

function normalizeQuestion(value: unknown, scope: CourseScope, code: string) {
  const question = recordOf(value, code);
  if (typeof question.type !== 'string') throw new Error(`${code} has no type`);
  const result: Record<string, unknown> = { ...question, ...scope, code };
  if (Array.isArray(question.pairs)) {
    result.pairs = question.pairs.map((value, index) => {
      const pair = recordOf(value, `${code} pairs[${index}]`);
      const text = pair.text || pair.english || pair.korean;
      if (typeof text !== 'string' || !text.trim()) {
        throw new Error(`${code} pairs[${index}] has no target-language text`);
      }
      // Neutral storage; API formatter supplies the legacy alias for old clients.
      const rest = { ...pair };
      delete rest.korean;
      delete rest.english;
      return {
        ...rest,
        text,
        ...(scope.targetLanguage === 'ko' ? { korean: text } : {}),
      };
    });
  }
  return result;
}

/** Pure build/validation, deliberately safe to run without a database connection. */
export function buildVocabularyCourseSeed(
  input: { courseId?: string; targetLanguage?: string } = {},
): VocabularyCourseSeed {
  const scope = resolveCourseScope(input);
  const modules =
    scope.courseId === 'ko-general'
      ? [koreanVocabulary]
      : scope.courseId === 'en-general'
        ? ENGLISH_VOCABULARY_MODULES
        : [];
  if (!modules.length)
    throw new Error(`No vocabulary sources for ${scope.courseId}`);

  const questions: VocabularyCourseSeed['questions'] = {};
  const rawNodes: unknown[] = [];
  for (const data of modules) {
    for (const [name, value] of Object.entries(data)) {
      if (
        (scope.targetLanguage === 'ko'
          ? /^(?:S\d+_)?UNIT\d+_QUESTIONS$/
          : /^EN_S\d+_UNIT\d+_NODE\d+_QUESTIONS$/
        ).test(name)
      ) {
        for (const [code, question] of Object.entries(recordOf(value, name))) {
          if (Object.hasOwn(questions, code))
            throw new Error(`Duplicate question code: ${code}`);
          questions[code] = normalizeQuestion(question, scope, code);
        }
      } else if (/^(?:S\d+_)?UNIT\d+_NODES$/.test(name)) {
        if (!Array.isArray(value)) throw new Error(`${name} must be an array`);
        rawNodes.push(...(value as unknown[]));
      } else if (/^EN_S\d+_UNIT\d+_NODE\d+$/.test(name)) {
        rawNodes.push(value);
      }
    }
  }

  const codes = new Set<string>();
  const nodes = rawNodes
    .map((value) => {
      const node = recordOf(value, 'Vocabulary node');
      for (const key of ['section', 'unit', 'order'] as const) {
        if (!Number.isInteger(node[key]) || Number(node[key]) < 1) {
          throw new Error(`Vocabulary node has invalid ${key}`);
        }
      }
      const position = {
        section: Number(node.section),
        unit: Number(node.unit),
        order: Number(node.order),
      };
      const code = vocabularyNodeCode(scope, position);
      if (codes.has(code))
        throw new Error(`Duplicate vocabulary node: ${code}`);
      codes.add(code);
      if (!Array.isArray(node.lessons) || !node.lessons.length) {
        throw new Error(`${code} has no lessons`);
      }
      const lessons = node.lessons.map((value, index) => {
        const lesson = recordOf(value, `${code} lesson ${index + 1}`);
        if (
          !Array.isArray(lesson.questions) ||
          lesson.questions.some((key) => typeof key !== 'string')
        ) {
          throw new Error(
            `${code} lesson ${index + 1} has invalid question references`,
          );
        }
        return {
          ...lesson,
          ...scope,
          code: `${code}_l${index + 1}`,
        } as VocabularySeedLesson;
      });
      return {
        ...node,
        ...position,
        ...scope,
        code,
        lessons,
      } as VocabularySeedNode;
    })
    .sort(
      (a, b) => a.section - b.section || a.unit - b.unit || a.order - b.order,
    );

  if (!nodes.length || !Object.keys(questions).length) {
    throw new Error(`Empty vocabulary seed for ${scope.courseId}`);
  }
  const referenceErrors = findVocabularyReferenceErrors(questions, nodes);
  if (referenceErrors.length) throw new Error(referenceErrors.join('\n'));
  return { scope, questions, nodes };
}
