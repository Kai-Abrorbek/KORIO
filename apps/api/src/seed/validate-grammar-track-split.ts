/**
 * 문법 문제 트랙의 레슨 분할만 검증한다. DB에는 연결하거나 쓰지 않는다.
 * 실행: pnpm --filter api seed:validate-grammar-track
 */
import { GT_S1_NODES } from './data/grammar-track/section1';
import { GT_S2_NODES } from './data/grammar-track/section2';
import { GT_S3_NODES } from './data/grammar-track/section3';
import { GT_S4_NODES } from './data/grammar-track/section4';
import {
  GRAMMAR_QUESTIONS_PER_NODE,
  splitGrammarLessonParts,
} from './grammar-track.util';

const nodes = [...GT_S1_NODES, ...GT_S2_NODES, ...GT_S3_NODES, ...GT_S4_NODES];
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
  `✅ 문법 ${questionCount}문항 보존 · 노드 ${sourceLessons}→${splitLessons}개 · 노드당 최대 ${GRAMMAR_QUESTIONS_PER_NODE}문항`,
);
