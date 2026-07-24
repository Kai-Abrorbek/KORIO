import { QuestionType } from '../schemas/question.schema';
import { LessonCategory } from '../schemas/lesson.schema';
import { StudyCategory } from '../../users/utils/study-category.util';

/**
 * 문제 타입 → 통계 버킷.
 *
 * Partial 이라 새 QuestionType 을 추가해도 빌드가 깨지지 않는다.
 * 대신 매핑 안 된 타입은 OTHER(기타) 로 모인다.
 * → 다른 카테고리를 조용히 오염시키지 않고, 차트에 "기타"가 뜨면
 *   매핑이 빠졌다는 걸 바로 알 수 있다. 타입은 무한히 추가 가능.
 */
export const QUESTION_CATEGORY: Partial<Record<QuestionType, StudyCategory>> = {
  // 어휘: 단어 자체를 익히는 문제
  [QuestionType.IMAGE_CHOICE]: StudyCategory.VOCAB,
  [QuestionType.WORD_MATCHING]: StudyCategory.VOCAB,
  [QuestionType.TYPE_ANSWER]: StudyCategory.VOCAB,

  // 문법: 어순 · 조사 · 활용
  [QuestionType.SENTENCE_BUILDER]: StudyCategory.GRAMMAR,
  [QuestionType.WORD_ARRANGE]: StudyCategory.GRAMMAR,
  [QuestionType.FILL_IN_BLANK]: StudyCategory.GRAMMAR,

  // 표현: 의미 단위 번역
  [QuestionType.TRANSLATE_BUILDER]: StudyCategory.EXPRESSION,
  [QuestionType.TRANSLATE_TYPE]: StudyCategory.EXPRESSION,

  // 실전 회화: 대화 · 발화
  [QuestionType.DIALOG_COMPLETE]: StudyCategory.CONVERSATION,
  [QuestionType.SPEAKING]: StudyCategory.CONVERSATION,

  // 리스닝: 듣기 기반
  [QuestionType.LISTENING]: StudyCategory.LISTENING,
  [QuestionType.LISTEN_TYPE]: StudyCategory.LISTENING,
  [QuestionType.LISTEN_FILL]: StudyCategory.LISTENING,
  [QuestionType.AUDIO_MATCH]: StudyCategory.LISTENING,
};

/** 레슨 주제 → 통계 버킷 (TOPIK 처럼 레슨 단위로 성격이 결정되는 경우) */
export const LESSON_TO_STUDY: Record<LessonCategory, StudyCategory> = {
  [LessonCategory.VOCABULARY]: StudyCategory.VOCAB,
  [LessonCategory.GRAMMAR]: StudyCategory.GRAMMAR,
  [LessonCategory.EXPRESSION]: StudyCategory.EXPRESSION,
  [LessonCategory.CONVERSATION]: StudyCategory.CONVERSATION,
  [LessonCategory.LISTENING]: StudyCategory.LISTENING,
  [LessonCategory.TOPIK]: StudyCategory.TOPIK,
};

/** 문제 타입 하나의 통계 버킷 */
/**
 * 문제 하나의 통계 버킷.
 * 시드가 lessonCategory 를 명시했으면 그게 가장 정확하므로 우선한다.
 * 없으면 타입에서 유도하고, 그것도 없으면 OTHER 로 모은다.
 */
export function categoryOf(q: {
  type?: string;
  lessonCategory?: string;
}): StudyCategory {
  const explicit = LESSON_TO_STUDY[q.lessonCategory as LessonCategory];
  if (explicit) return explicit;
  return QUESTION_CATEGORY[q.type as QuestionType] ?? StudyCategory.OTHER;
}

/**
 * 문제 타입 배열 → UserStats $inc 오브젝트 (dot path)
 * 예: ['image_choice','fill_in_blank']
 *     → { 'categoryCounts.vocab': 1, 'categoryCounts.grammar': 1 }
 *
 * override 가 주어지면 타입과 무관하게 전부 그 버킷으로 넣는다.
 * (TOPIK 레슨, 특정 게임 등 "무엇을 훈련하는지"가 레슨/모드 단위로 정해지는 경우)
 */
export function buildCategoryInc(
  questions: { type?: string; lessonCategory?: string }[],
  override?: StudyCategory,
): Record<string, number> {
  const inc: Record<string, number> = {};
  for (const q of questions) {
    const key = `categoryCounts.${override ?? categoryOf(q)}`;
    inc[key] = (inc[key] ?? 0) + 1;
  }
  return inc;
}
