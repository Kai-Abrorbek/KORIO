import * as seedData from './data/vocabulary';
import { findVocabularyReferenceErrors } from './validate-vocabulary-references';

const questions: Record<string, unknown> = {};
const nodes: Array<
  Parameters<typeof findVocabularyReferenceErrors>[1][number]
> = [];

for (const [name, value] of Object.entries(seedData)) {
  if (name.endsWith('_QUESTIONS') && value && typeof value === 'object') {
    Object.assign(questions, value);
  } else if (name.endsWith('_NODES') && Array.isArray(value)) {
    nodes.push(...(value as typeof nodes));
  }
}

const errors = findVocabularyReferenceErrors(questions, nodes);
if (errors.length > 0) {
  console.error(`❌ 어휘 시드 참조 오류 ${errors.length}건`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(
    `✅ 어휘 시드 참조 검증 완료: 노드 ${nodes.length}개, 레슨 ${nodes.reduce((count, node) => count + node.lessons.length, 0)}개, 누락 0개`,
  );
}
