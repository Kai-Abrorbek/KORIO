import { Types } from 'mongoose';
import { resolveCourseScope } from '../common/learning-course';
import { WordsService } from './words.service';

const USER = new Types.ObjectId();
const OTHER_USER = new Types.ObjectId();
const EN = resolveCourseScope({ targetLanguage: 'en' });

type Row = Record<string, unknown>;
const isRecord = (value: unknown): value is Row =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

function matches(document: Row, filter: Row): boolean {
  return Object.entries(filter).every(([key, expected]) => {
    if (key === '$and' || key === '$or') {
      const results = (expected as Row[]).map((item) =>
        matches(document, item),
      );
      return key === '$and' ? results.every(Boolean) : results.some(Boolean);
    }
    const actual = document[key];
    if (isRecord(expected) && !(expected instanceof Types.ObjectId)) {
      if ('$exists' in expected)
        return (actual !== undefined) === expected.$exists;
      if ('$in' in expected || '$nin' in expected) {
        const included = ((expected.$in ?? expected.$nin) as unknown[]).some(
          (item) => String(item) === String(actual),
        );
        return '$in' in expected ? included : !included;
      }
      if ('$elemMatch' in expected)
        return (
          Array.isArray(actual) &&
          actual.some((item: Row) => matches(item, expected.$elemMatch as Row))
        );
    }
    return String(actual) === String(expected);
  });
}

function query(source: Row[]) {
  let rows = [...source];
  const chain = {
    select: () => chain,
    sort: (order: Record<string, number>) => {
      const [field, direction] = Object.entries(order)[0];
      rows.sort((a, b) => (Number(a[field]) - Number(b[field])) * direction);
      return chain;
    },
    limit: (limit: number) => {
      rows = rows.slice(0, limit);
      return chain;
    },
    lean: () => Promise.resolve(rows),
  };
  return chain;
}

function word(headword: string, overrides: Row = {}): Row {
  return {
    _id: new Types.ObjectId(),
    targetLanguage: 'en',
    isActive: true,
    headword,
    meaning: { ko: '뜻', uz: 'ma’no', en: 'meaning', ru: 'значение' },
    media: { emoji: '🍎' },
    difficulty: 1,
    placements: [{ courseId: 'en-general', section: 1, unit: 1, order: 1 }],
    ...overrides,
  };
}

function fixture(rows: Row[], progressRows: Row[] = []) {
  const words = {
    find: jest.fn((filter: Row) =>
      query(rows.filter((row) => matches(row, filter))),
    ),
  };
  const progress = {
    find: jest.fn((filter: Row) =>
      query(progressRows.filter((row) => matches(row, filter))),
    ),
  };
  return {
    service: new WordsService(words as never, progress as never),
    words,
    progress,
  };
}

describe('course-scoped game pools', () => {
  it('returns English words through the existing response fields only', async () => {
    const apple = word('apple', {
      meaning: { ko: '사과', uz: 'olma', en: 'a fruit', ru: 'яблоко' },
    });
    const rows = [
      apple,
      word('사과', { targetLanguage: 'ko' }),
      word('pear', { isActive: false }),
      word('plum', { placements: [{ courseId: 'another-course' }] }),
    ];
    const { service } = fixture(rows);
    const response = await service.getGamePool(USER.toString(), EN);
    expect(response).toEqual({
      words: [
        {
          id: String(apple._id),
          ko: 'apple',
          meaningKo: '사과',
          uz: 'olma',
          en: 'a fruit',
          ru: 'яблоко',
          emoji: '🍎',
          difficulty: 1,
        },
      ],
      fromProgress: false,
    });
  });

  it('keeps unscoped requests on Korean legacy documents', async () => {
    const korean = word('사과', {
      placements: [{ section: 1, unit: 1, order: 1 }],
    });
    delete korean.targetLanguage;
    const { service } = fixture([korean, word('apple')]);
    const response = await service.getGamePool(USER.toString());
    expect(response.words.map((item) => item.ko)).toEqual(['사과']);
  });

  it('filters progress by course before limiting to 600 records', async () => {
    const korean = Array.from({ length: 650 }, () =>
      word('사과', {
        targetLanguage: 'ko',
        placements: [{ courseId: 'ko-general', section: 1, unit: 1, order: 1 }],
      }),
    );
    const learned = ['apple', 'pear', 'plum', 'grape'].map((text) =>
      word(text),
    );
    const unseen = ['cat', 'dog', 'bird', 'fish'].map((text) => word(text));
    const { service, progress } = fixture(
      [...korean, ...learned, ...unseen],
      [...korean, ...learned].map((item) => ({
        userId: USER,
        wordId: item._id,
      })),
    );
    const response = await service.getGamePool(USER.toString(), {
      ...EN,
      count: 4,
    });
    expect(response.fromProgress).toBe(true);
    expect(response.words.map((item) => item.ko).sort()).toEqual(
      ['apple', 'pear', 'plum', 'grape'].sort(),
    );
    expect(progress.find).toHaveBeenCalledWith({
      userId: USER,
      wordId: { $in: [...learned, ...unseen].map((item) => item._id) },
    });
  });

  it('does not claim progress from a different language or user', async () => {
    const english = word('apple');
    const korean = word('사과', {
      targetLanguage: 'ko',
      placements: [{ courseId: 'ko-general' }],
    });
    const { service } = fixture(
      [english, korean],
      [
        { userId: USER, wordId: korean._id },
        { userId: OTHER_USER, wordId: english._id },
      ],
    );
    const response = await service.getGamePool(USER.toString(), EN);
    expect(response.fromProgress).toBe(false);
    expect(response.words.map((item) => item.ko)).toEqual(['apple']);
  });

  it('filters English words using the requested card length and meanings', async () => {
    const rows = [
      word('apple'),
      word('elephant'),
      word('ice cream'),
      word('good-bye'),
      word('hello!'),
      word('word2'),
      word('사과'),
      word('café'),
      word('pear', { meaning: { ko: '배' } }),
    ];
    const { service } = fixture(rows);
    const response = await service.getGamePool(USER.toString(), {
      ...EN,
      maxLen: 5,
    });
    expect(response.words.map((item) => item.ko)).toEqual(['apple']);
    const longer = await service.getGamePool(USER.toString(), {
      ...EN,
      maxLen: 8,
    });
    expect(longer.words.map((item) => item.ko).sort()).toEqual([
      'apple',
      'elephant',
    ]);
  });

  it('returns an empty pool without reading unrelated progress when the course is empty', async () => {
    const { service, progress } = fixture([]);
    await expect(service.getGamePool(USER.toString(), EN)).resolves.toEqual({
      words: [],
      fromProgress: false,
    });
    expect(progress.find).not.toHaveBeenCalled();
  });

  it('fills from unseen words without returning more than requested', async () => {
    const rows = ['apple', 'pear', 'plum', 'grape', 'cat'].map((text, index) =>
      word(text, { difficulty: index === 0 ? 5 : 1 }),
    );
    const { service } = fixture(rows);
    const response = await service.getGamePool(USER.toString(), {
      ...EN,
      count: 4,
    });
    expect(response.words).toHaveLength(4);
    expect(response.words.every((item) => item.difficulty >= 1)).toBe(true);
  });
});
