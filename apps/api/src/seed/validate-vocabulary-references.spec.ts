import { findVocabularyReferenceErrors } from './validate-vocabulary-references';

const node = {
  title: { ko: '모임' },
  section: 6,
  unit: 4,
  order: 1,
  lessons: [{ title: { ko: '첫 레슨' }, questions: ['known'] }],
};

describe('findVocabularyReferenceErrors', () => {
  it('accepts defined question keys', () => {
    expect(findVocabularyReferenceErrors({ known: {} }, [node])).toEqual([]);
  });

  it('reports missing keys with their lesson code', () => {
    expect(findVocabularyReferenceErrors({}, [node])).toEqual([
      's6_u4_o1_l1: 없는 키 known',
    ]);
  });

  it('rejects empty lessons', () => {
    expect(
      findVocabularyReferenceErrors({}, [
        { ...node, lessons: [{ title: { ko: '빈 레슨' }, questions: [] }] },
      ]),
    ).toEqual(['s6_u4_o1_l1: 문제 참조가 없습니다']);
  });
});
