import { parseSeedCourseScope } from './course-seed.options';
import { buildVocabularyCourseSeed } from './vocabulary-course.data';
import { buildWordSeedData } from './word-seed.data';
import { LEARNING_COURSES } from '../common/learning-course';

const scopes = process.argv.slice(2).some((arg) => arg !== '--')
  ? [parseSeedCourseScope()]
  : LEARNING_COURSES;
const wordCodes = new Map<string, string>();
const questionCodes = new Set<string>();
for (const scope of scopes) {
  const course = buildVocabularyCourseSeed(scope);
  const words = buildWordSeedData(course.scope);
  for (const word of words) {
    const identity = `${word.targetLanguage}|${word.headword}|${word.senseKey}|${word.partOfSpeech}`;
    if (wordCodes.has(word.code) && wordCodes.get(word.code) !== identity)
      throw new Error(`Cross-course word code collision: ${word.code}`);
    wordCodes.set(word.code, identity);
  }
  for (const code of Object.keys(course.questions)) {
    if (questionCodes.has(code))
      throw new Error(`Cross-course question code collision: ${code}`);
    questionCodes.add(code);
  }
  console.log(
    `✅ ${course.scope.courseId}: 노드 ${course.nodes.length}개, ` +
      `레슨 ${course.nodes.reduce((count, node) => count + node.lessons.length, 0)}개, ` +
      `문제 ${Object.keys(course.questions).length}개, 단어 ${words.length}개 검증 완료`,
  );
}
