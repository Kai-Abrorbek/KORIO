import { Types } from 'mongoose';
import { resolveCourseScope } from '../common/learning-course';
import { WordsService } from './words.service';
import { ListWordsQueryDto } from './dto/list-words-query.dto';
import { ReviewQueueQueryDto } from './dto/review-queue-query.dto';
import { WordReviewResult } from './dto/review-word.dto';

const USER = new Types.ObjectId().toString();
const KO_ID = new Types.ObjectId();
const EN_ID = new Types.ObjectId();
const KO = resolveCourseScope();
const EN = resolveCourseScope({ targetLanguage: 'en' });

type Row = Record<string, unknown>;
const isRecord = (value: unknown): value is Row =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** The supported query operators are evaluated, not just accepted by a model stub. */
function matches(document: unknown, filter: Row): boolean {
  return Object.entries(filter).every(([key, value]) => {
    if (key === '$and')
      return (
        Array.isArray(value) &&
        value.every(
          (item: unknown) => isRecord(item) && matches(document, item),
        )
      );
    if (key === '$or')
      return (
        Array.isArray(value) &&
        value.some((item: unknown) => isRecord(item) && matches(document, item))
      );
    const actual = key
      .split('.')
      .reduce<unknown>(
        (obj, field) => (isRecord(obj) ? obj[field] : undefined),
        document,
      );
    if (isRecord(value) && !(value instanceof Types.ObjectId)) {
      if ('$exists' in value) return (actual !== undefined) === value.$exists;
      if ('$in' in value)
        return (
          Array.isArray(value.$in) &&
          value.$in.some((item: unknown) => String(item) === String(actual))
        );
      if ('$elemMatch' in value) {
        const elementFilter = value.$elemMatch;
        return (
          Array.isArray(actual) &&
          isRecord(elementFilter) &&
          actual.some((item: unknown) => matches(item, elementFilter))
        );
      }
      return matches(actual || {}, value);
    }
    return String(actual) === String(value);
  });
}

function fixture() {
  const rows = [
    {
      _id: KO_ID,
      code: 'legacy-hello',
      headword: '안녕하세요',
      senseKey: 'greeting',
      isActive: true,
      meaning: { ko: '인사', uz: 'salom', en: 'hello', ru: 'привет' },
      examples: [{ korean: '안녕하세요.', translations: { uz: 'Salom.' } }],
      placements: [{ section: 1, unit: 1, order: 1, isCore: true }],
    },
    {
      _id: EN_ID,
      code: 'en-greeting-hello',
      targetLanguage: 'en',
      headword: 'hello',
      senseKey: 'greeting',
      isActive: true,
      meaning: {
        ko: '안녕하세요',
        uz: 'salom',
        en: 'a greeting',
        ru: 'привет',
      },
      examples: [
        {
          text: 'Hello, Anna.',
          translations: { ko: '안녕, 안나.', uz: 'Salom, Anna.' },
        },
      ],
      pronunciation: { ipa: '/həˈləʊ/', ttsText: 'hello' },
      placements: [
        { courseId: 'en-general', section: 1, unit: 1, order: 1, isCore: true },
        {
          courseId: 'another-curriculum',
          section: 9,
          unit: 9,
          order: 1,
          isCore: true,
        },
      ],
    },
  ];
  interface Query<T> {
    lean(): Promise<T>;
    select(): Query<T>;
    limit(): Query<T>;
    sort(): Query<T>;
  }
  const chain = <T>(value: T): Query<T> => {
    const query: Query<T> = {
      lean: () => Promise.resolve(value),
      select: () => query,
      limit: () => query,
      sort: () => query,
    };
    return query;
  };
  const words = {
    find: jest.fn((filter: Row) =>
      chain(rows.filter((row) => matches(row, filter))),
    ),
    findOne: jest.fn((filter: Row) =>
      chain(rows.find((row) => matches(row, filter)) || null),
    ),
  };
  const progress = {
    find: jest.fn(() => chain([])),
    findOne: jest.fn(() => chain(null)),
    findOneAndUpdate: jest.fn((_filter: Row, update: { $set: Row }) =>
      Promise.resolve(update.$set),
    ),
    bulkWrite: jest.fn(
      (operations: { updateOne: { filter: Row } }[], options: Row) =>
        Promise.resolve({ operations, options }),
    ),
  };
  return {
    service: new WordsService(words as never, progress as never),
    words,
    progress,
  };
}

describe('word course isolation', () => {
  it('keeps old requests Korean-only without migrating legacy documents', async () => {
    const { service } = fixture();
    const response = await service.getWords(
      USER,
      Object.assign(new ListWordsQueryDto(), { section: 1, unit: 1 }),
    );
    expect(response.items.map((word) => word.code)).toEqual(['legacy-hello']);
    expect(response.items[0]).toMatchObject({
      courseId: 'ko-general',
      targetLanguage: 'ko',
      speechLocale: 'ko-KR',
      examples: [{ text: '안녕하세요.', korean: '안녕하세요.' }],
    });
  });

  it('returns English cards, neutral examples and IPA without sharing Korean IDs', async () => {
    const { service } = fixture();
    const response = await service.getWords(
      USER,
      Object.assign(new ListWordsQueryDto(), { ...EN, lang: 'ko', section: 1 }),
    );
    expect(response.items).toHaveLength(1);
    expect(response.items[0]).toMatchObject({
      id: EN_ID.toString(),
      targetLanguage: 'en',
      speechLocale: 'en-US',
      meaning: '안녕하세요',
      pronunciation: { ipa: '/həˈləʊ/', hangul: '' },
      examples: [{ text: 'Hello, Anna.', translation: '안녕, 안나.' }],
    });
    expect(response.items[0].examples[0]).not.toHaveProperty('korean');
    expect(response.items[0].placements).toHaveLength(1);
  });

  it('scopes summary, review queues and same-element section/unit matching', async () => {
    const { service } = fixture();
    const summary = await service.getSectionSummaries(USER, EN);
    expect(summary.map((section) => section.section)).toEqual([1]);
    expect(summary[0]).toMatchObject({
      words: 1,
      units: [{ unit: 1, words: 1 }],
    });
    const review = await service.getReviewQueue(
      USER,
      Object.assign(new ReviewQueueQueryDto(), EN),
    );
    expect(review.items.map((word) => word.id)).toEqual([EN_ID.toString()]);
    const absent = await service.getWords(
      USER,
      Object.assign(new ListWordsQueryDto(), { ...EN, section: 9, unit: 9 }),
    );
    expect(absent.items).toEqual([]);
  });

  it('prevents cross-course review and mastery writes; English writes use its own wordId', async () => {
    const { service, progress } = fixture();
    await expect(
      service.reviewWord(USER, EN_ID.toString(), WordReviewResult.GOOD, KO),
    ).rejects.toThrow('WORD_NOT_FOUND');
    await expect(
      service.masterWord(USER, KO_ID.toString(), EN),
    ).rejects.toThrow('WORD_NOT_FOUND');
    expect(progress.findOneAndUpdate).not.toHaveBeenCalled();
    await service.reviewWord(USER, EN_ID.toString(), WordReviewResult.GOOD, EN);
    expect(progress.findOneAndUpdate.mock.calls[0][0].wordId).toEqual(EN_ID);
  });

  it('only marks cards belonging to the selected course as seen', async () => {
    const { service, progress } = fixture();
    expect(
      await service.markSeen(USER, [KO_ID.toString(), EN_ID.toString()], EN),
    ).toEqual({ seen: 1 });
    const operations = progress.bulkWrite.mock.calls[0][0];
    expect(operations).toHaveLength(2);
    for (const operation of operations)
      expect(operation.updateOne.filter.wordId).toEqual(EN_ID);
  });

  it('rejects course/language mismatch and keeps game pools course-specific', async () => {
    const { service, words } = fixture();
    await expect(
      service.getWords(
        USER,
        Object.assign(new ListWordsQueryDto(), {
          courseId: 'en-general',
          targetLanguage: 'ko',
        }),
      ),
    ).rejects.toThrow('INVALID_LEARNING_COURSE');
    expect(words.find).not.toHaveBeenCalled();
    const english = await service.getGamePool(USER, { ...EN, maxLen: 8 });
    expect(english.words.map((word) => word.ko)).toEqual(['hello']);
    const korean = await service.getGamePool(USER, { maxLen: 8 });
    expect(korean.words.map((word) => word.ko)).toEqual(['안녕하세요']);
  });
});
