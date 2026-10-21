/**
 * Course-scoped grammar lesson splitting validation. This never connects to
 * MongoDB or writes data.
 */
import { parseSeedCourseScope } from './course-seed.options';
import { getGrammarTrackSeed } from './grammar-course.data';
import {
  GRAMMAR_QUESTIONS_PER_NODE,
  splitGrammarLessonParts,
} from './grammar-track.util';

const scope = parseSeedCourseScope();
const { nodes } = getGrammarTrackSeed(scope) as {
  nodes: {
    section: number;
    unit: number;
    lessons: { questions: string[] }[];
  }[];
};
const errors: string[] = [];
let sourceLessons = 0;
let splitLessons = 0;
let questionCount = 0;

for (const node of nodes) {
  const parts = splitGrammarLessonParts(node.lessons);
  const before = node.lessons.flatMap((lesson) => lesson.questions);
  const after = parts.flatMap((part) => part.lesson.questions);
  const label = `s${node.section}u${node.unit}`;

  sourceLessons += node.lessons.length;
  splitLessons += parts.length;
  questionCount += before.length;

  if (before.join('\u0000') !== after.join('\u0000')) {
    errors.push(`${label}: 분할 과정에서 문제 순서나 개수가 바뀌었다`);
  }
  for (const [index, part] of parts.entries()) {
    if (part.lesson.questions.length > GRAMMAR_QUESTIONS_PER_NODE) {
      errors.push(
        `${label}#${index + 1}: ${part.lesson.questions.length}문항으로 상한을 넘었다`,
      );
    }
  }
}

if (errors.length > 0) {
  errors.forEach((error) => console.error(`❌ ${error}`));
  process.exit(1);
}

console.log(
  `✅ ${scope.courseId} 문법 ${questionCount}문항 보존 · 노드 ${sourceLessons}→${splitLessons}개 · 노드당 최대 ${GRAMMAR_QUESTIONS_PER_NODE}문항`,
);
