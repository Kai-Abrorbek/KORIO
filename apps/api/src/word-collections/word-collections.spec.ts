import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Model, Types } from 'mongoose';
import { WordsService } from '../words/words.service';
import { WordDocument } from '../words/schemas/word.schema';
import { UserWordProgressDocument } from '../words/schemas/user-word-progress.schema';
import { WordCollectionDocument } from './schemas/word-collection.schema';
import { UserWordCollectionDocument } from './schemas/user-word-collection.schema';
import { WordCollectionsService } from './word-collections.service';
import { WriteWordCollectionDto } from './dto/word-collections.dto';
import { AdminWordCollectionsController } from '../admin/content/admin-word-collections.controller';
import { ADMIN_PERMISSION_KEY } from '../admin/decorators/require-permission.decorator';

jest.mock('../admin/guards/admin.guard', () => ({
  AdminGuard: class AdminGuard {},
}));
jest.mock('../admin/admin-audit.service', () => ({
  AdminAuditService: class AdminAuditService {},
}));

type Row = Record<string, unknown>;
const USER = new Types.ObjectId().toString();
const OTHER = new Types.ObjectId().toString();
const A = new Types.ObjectId();
const B = new Types.ObjectId();
const EN = new Types.ObjectId();
const INACTIVE = new Types.ObjectId();
const COLLECTION = new Types.ObjectId();
const KO_QUERY = {
  courseId: 'ko-general',
  targetLanguage: 'ko',
  lang: 'ko' as const,
};
const EN_QUERY = {
  courseId: 'en-general',
  targetLanguage: 'en',
  lang: 'en' as const,
};
const TEXT = { ko: '한국어', en: 'Korean', uz: 'Koreys tili', ru: 'Корейский' };

const isRecord = (value: unknown): value is Row =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
function rowData(value: unknown): Row {
  if (!isRecord(value)) throw new Error('Expected a model update object');
  return value;
}
function matches(document: unknown, filter: Row): boolean {
  return Object.entries(filter).every(([key, expected]) => {
    if (key === '$and')
      return (
        Array.isArray(expected) &&
        expected.every(
          (part: unknown) => isRecord(part) && matches(document, part),
        )
      );
    if (key === '$or')
      return (
        Array.isArray(expected) &&
        expected.some(
          (part: unknown) => isRecord(part) && matches(document, part),
        )
      );
    const actual = key
      .split('.')
      .reduce<unknown>(
        (value, field) => (isRecord(value) ? value[field] : undefined),
        document,
      );
    if (isRecord(expected) && !(expected instanceof Types.ObjectId)) {
      if ('$exists' in expected)
        return (actual !== undefined) === expected.$exists;
      if ('$in' in expected)
        return (
          Array.isArray(expected.$in) &&
          expected.$in.some(
            (value: unknown) => String(value) === String(actual),
          )
        );
      if ('$elemMatch' in expected) {
        const elementFilter = expected.$elemMatch;
        return (
          Array.isArray(actual) &&
          isRecord(elementFilter) &&
          actual.some((item: unknown) => matches(item, elementFilter))
        );
      }
      return matches(actual || {}, expected);
    }
    return String(actual) === String(expected);
  });
}

function query<T>(value: T) {
  const result = {
    lean: () => Promise.resolve(value),
    select: () => result,
    sort: () => result,
  };
  return result;
}

function fixture() {
  type FixtureWord = Row & {
    _id: Types.ObjectId;
    isActive: boolean;
    placements: {
      courseId?: string;
      section: number;
      unit: number;
      order: number;
    }[];
  };
  type FixtureDocument = Row & {
    _id: Types.ObjectId;
    groups: { id: string; title: typeof TEXT; wordIds: Types.ObjectId[] }[];
  };
  type FixturePreference = Row & {
    userId: Types.ObjectId;
    collectionId: string;
    lastStudiedAt?: Date;
  };
  const source: FixtureWord[] = [
    {
      _id: A,
      code: 'ko-school',
      headword: '학교',
      senseKey: 'default',
      isActive: true,
      meaning: { ko: '학교', en: 'school', uz: 'maktab' },
      examples: [],
      placements: [
        { section: 1, unit: 1, order: 2 },
        { section: 1, unit: 2, order: 1 },
      ],
    },
    {
      _id: B,
      code: 'ko-book',
      headword: '책',
      senseKey: 'default',
      targetLanguage: 'ko',
      isActive: true,
      meaning: { en: 'book', uz: 'kitob' },
      examples: [],
      placements: [{ courseId: 'ko-general', section: 1, unit: 1, order: 1 }],
    },
    {
      _id: EN,
      code: 'en-school',
      headword: 'school',
      senseKey: 'default',
      targetLanguage: 'en',
      isActive: true,
      meaning: { uz: 'maktab' },
      examples: [],
      placements: [{ courseId: 'en-general', section: 1, unit: 1, order: 1 }],
    },
    {
      _id: INACTIVE,
      code: 'ko-old',
      headword: '옛말',
      targetLanguage: 'ko',
      isActive: false,
      placements: [{ courseId: 'ko-general', section: 1, unit: 1, order: 3 }],
    },
  ];
  const srs: Row[] = [
    {
      _id: new Types.ObjectId(),
      userId: new Types.ObjectId(USER),
      wordId: A,
      state: 'review',
      nextReviewAt: new Date(Date.now() - 1000),
      correctCount: 2,
      incorrectCount: 1,
      consecutiveCorrect: 2,
      easeFactor: 2.5,
      intervalDays: 1,
    },
    {
      _id: new Types.ObjectId(),
      userId: new Types.ObjectId(USER),
      wordId: B,
      state: 'mastered',
      nextReviewAt: new Date(Date.now() - 1000),
    },
    {
      _id: new Types.ObjectId(),
      userId: new Types.ObjectId(OTHER),
      wordId: A,
      state: 'mastered',
    },
  ];
  const documents: FixtureDocument[] = [
    {
      _id: COLLECTION,
      ...KO_QUERY,
      code: 'ko-sample',
      kind: 'textbook',
      level: 'beginner',
      cover: 'paper',
      title: TEXT,
      description: TEXT,
      isActive: true,
      groups: [
        { id: 'chapter-1', title: TEXT, wordIds: [A, B, A] },
        { id: 'chapter-2', title: TEXT, wordIds: [A] },
      ],
    },
  ];
  const preferences: FixturePreference[] = [];
  const words = {
    find: jest.fn((filter: Row) =>
      query(source.filter((row) => matches(row, filter))),
    ),
    create: jest.fn(() => {
      throw new Error('Source words must never be written');
    }),
    updateOne: jest.fn(() => {
      throw new Error('Source words must never be written');
    }),
    deleteMany: jest.fn(() => {
      throw new Error('Source words must never be deleted');
    }),
  };
  const progress = {
    find: jest.fn((filter: Row) =>
      query(srs.filter((row) => matches(row, filter))),
    ),
    updateOne: jest.fn(() => {
      throw new Error('Collection operations must not write SRS');
    }),
    deleteMany: jest.fn(() => {
      throw new Error('Collection operations must not delete SRS');
    }),
  };
  const collections = {
    find: jest.fn((filter: Row) =>
      query(documents.filter((row) => matches(row, filter))),
    ),
    findById: jest.fn((id: string) =>
      query(documents.find((row) => String(row._id) === id) || null),
    ),
    create: jest.fn((content: Row) => {
      const row = { ...content, _id: new Types.ObjectId() } as FixtureDocument;
      documents.push(row);
      return Promise.resolve({ ...row, toObject: () => row });
    }),
    findByIdAndUpdate: jest.fn((id: string, update: Row) => {
      const row = documents.find((item) => String(item._id) === id);
      if (row) Object.assign(row, rowData(update.$set));
      return query(row || null);
    }),
    updateOne: jest.fn((filter: Row, update: Row) => {
      const row = documents.find((item) => matches(item, filter));
      if (row) Object.assign(row, rowData(update.$set));
      return Promise.resolve({ modifiedCount: row ? 1 : 0 });
    }),
  };
  const enrollments = {
    find: jest.fn((filter: Row) =>
      query(preferences.filter((row) => matches(row, filter))),
    ),
    updateOne: jest.fn((filter: Row, update: Row) => {
      let row = preferences.find((item) => matches(item, filter));
      if (!row) {
        row = { ...rowData(update.$setOnInsert) } as FixturePreference;
        preferences.push(row);
      }
      Object.assign(row, rowData(update.$set));
      return Promise.resolve({ modifiedCount: 1 });
    }),
  };
  const wordModel = words as unknown as Model<WordDocument>;
  const progressModel = progress as unknown as Model<UserWordProgressDocument>;
  const wordService = new WordsService(wordModel, progressModel);
  const service = new WordCollectionsService(
    collections as unknown as Model<WordCollectionDocument>,
    enrollments as unknown as Model<UserWordCollectionDocument>,
    wordModel,
    progressModel,
    wordService,
  );
  return {
    service,
    source,
    srs,
    documents,
    preferences,
    words,
    progress,
    collections,
    enrollments,
  };
}

function content(wordIds = [String(A), String(B)]): WriteWordCollectionDto {
  return {
    ...KO_QUERY,
    code: 'ko-new',
    title: TEXT,
    description: TEXT,
    kind: 'textbook',
    level: 'beginner',
    cover: 'paper',
    isActive: true,
    groups: [{ id: 'chapter-1', title: TEXT, wordIds }],
  };
}

describe('additive word collections', () => {
  it('exposes the original curriculum without migrating or modifying any source documents', async () => {
    const f = fixture();
    f.documents.length = 0;
    const before = JSON.stringify({ words: f.source, srs: f.srs });
    const rows = await f.service.list(USER, KO_QUERY);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      id: 'course-ko-general',
      kind: 'course',
      words: 2,
      mastered: 1,
      review: 1,
      due: 1,
      saved: true,
      groupCount: 2,
    });
    const detail = await f.service.detail(USER, 'course-ko-general', KO_QUERY);
    expect(detail.groups.map((group) => group.id)).toEqual(['s1-u1', 's1-u2']);
    expect(JSON.stringify({ words: f.source, srs: f.srs })).toBe(before);
    expect(f.collections.create).not.toHaveBeenCalled();
    expect(f.enrollments.updateOne).not.toHaveBeenCalled();
  });

  it('deduplicates words and due counts across groups and shares existing SRS state', async () => {
    const f = fixture();
    const detail = await f.service.detail(USER, String(COLLECTION), KO_QUERY);
    expect(detail).toMatchObject({
      words: 2,
      mastered: 1,
      review: 1,
      due: 1,
      saved: false,
    });
    expect(detail.groups.map((group) => group.words)).toEqual([2, 1]);
    const page = await f.service.collectionWords(USER, String(COLLECTION), {
      ...KO_QUERY,
      lang: 'en',
      groupId: 'chapter-1',
      limit: 1,
    });
    expect(page).toMatchObject({ total: 2, nextCursor: 'ko-school' });
    expect(page.items[0]).toMatchObject({
      id: String(A),
      meaning: 'school',
      progress: { state: 'review', correctCount: 2 },
    });
    const next = await f.service.collectionWords(USER, String(COLLECTION), {
      ...KO_QUERY,
      lang: 'en',
      groupId: 'chapter-1',
      limit: 1,
      cursor: page.nextCursor!,
    });
    expect(next.items[0]).toMatchObject({
      id: String(B),
      progress: { state: 'mastered' },
    });
    expect(next.nextCursor).toBeNull();
    await expect(
      f.service.collectionWords(USER, String(COLLECTION), {
        ...KO_QUERY,
        groupId: 'chapter-2',
        limit: 20,
        cursor: 'ko-book',
      }),
    ).rejects.toThrow('INVALID_WORD_CURSOR');
  });

  it('keeps enrollment and cursor changes isolated to the authenticated account', async () => {
    const f = fixture(),
      id = String(COLLECTION);
    await f.service.save(USER, id, KO_QUERY, true);
    await f.service.setPosition(
      USER,
      id,
      { groupId: 'chapter-1', cardIndex: 0, lastWordId: String(B) },
      KO_QUERY,
    );
    const own = await f.service.detail(USER, id, KO_QUERY);
    expect(own).toMatchObject({
      saved: true,
      lastPosition: {
        groupId: 'chapter-1',
        cardIndex: 1,
        lastWordId: String(B),
      },
    });
    const other = await f.service.detail(OTHER, id, KO_QUERY);
    expect(other).toMatchObject({
      saved: false,
      lastPosition: null,
      mastered: 1,
      new: 1,
    });
    await f.service.save(USER, id, KO_QUERY, false);
    expect(await f.service.detail(USER, id, KO_QUERY)).toMatchObject({
      saved: false,
      lastPosition: own.lastPosition,
    });
    expect(f.preferences).toHaveLength(1);
    expect(String(f.preferences[0].userId)).toBe(USER);
  });

  it('anchors resumes to word identity when editorial ordering changes', async () => {
    const f = fixture(),
      id = String(COLLECTION);
    await f.service.setPosition(
      USER,
      id,
      { groupId: 'chapter-1', cardIndex: 0, lastWordId: String(A) },
      KO_QUERY,
    );
    f.documents[0].groups[0].wordIds = [B, A];
    expect(
      (await f.service.detail(USER, id, KO_QUERY)).lastPosition,
    ).toMatchObject({ cardIndex: 1, lastWordId: String(A) });
  });

  it('does not load account-wide SRS or enrollments to update one collection position', async () => {
    const f = fixture();
    await f.service.setPosition(
      USER,
      String(COLLECTION),
      { groupId: 'chapter-2', cardIndex: 0 },
      KO_QUERY,
    );
    expect(f.progress.find).not.toHaveBeenCalled();
    expect(f.enrollments.find).not.toHaveBeenCalled();
    expect(f.words.find.mock.calls[0][0]._id).toEqual({ $in: [A] });
  });

  it('preserves the original word ordering when two placement orders tie', async () => {
    const f = fixture();
    f.source.push({
      ...f.source[0],
      _id: new Types.ObjectId(),
      code: 'ko-first',
      headword: '가방',
      placements: [{ section: 1, unit: 1, order: 2 }],
    });
    const page = await f.service.collectionWords(USER, 'course-ko-general', {
      ...KO_QUERY,
      groupId: 's1-u1',
      limit: 100,
    });
    expect(page.items.map((item) => item.headword)).toEqual([
      '책',
      '가방',
      '학교',
    ]);
    const later = await f.service.collectionWords(USER, 'course-ko-general', {
      ...KO_QUERY,
      groupId: 's1-u2',
      limit: 100,
    });
    expect(later.items[0].placement).toMatchObject({ section: 1, unit: 2 });
  });

  it('rejects foreign-language collections, unknown groups and out-of-group positions', async () => {
    const f = fixture(),
      id = String(COLLECTION);
    await expect(f.service.detail(USER, id, EN_QUERY)).rejects.toThrow(
      'WORD_COLLECTION_NOT_FOUND',
    );
    await expect(
      f.service.detail(USER, 'course-en-general', KO_QUERY),
    ).rejects.toThrow('WORD_COLLECTION_NOT_FOUND');
    await expect(
      f.service.setPosition(
        USER,
        id,
        { groupId: 'missing', cardIndex: 0 },
        KO_QUERY,
      ),
    ).rejects.toThrow('WORD_COLLECTION_GROUP_NOT_FOUND');
    await expect(
      f.service.setPosition(
        USER,
        id,
        { groupId: 'chapter-2', cardIndex: 0, lastWordId: String(B) },
        KO_QUERY,
      ),
    ).rejects.toThrow('INVALID_COLLECTION_WORD');
    await expect(
      f.service.setPosition(
        USER,
        id,
        { groupId: 'chapter-1', cardIndex: 20 },
        KO_QUERY,
      ),
    ).rejects.toThrow('INVALID_COLLECTION_POSITION');
    expect(f.enrollments.updateOne).not.toHaveBeenCalled();
  });

  it('rejects references to inactive, missing or different-course words without writing anything', async () => {
    const f = fixture();
    for (const id of [
      String(EN),
      String(INACTIVE),
      new Types.ObjectId().toString(),
    ]) {
      await expect(f.service.create(content([id]))).rejects.toThrow(
        'COLLECTION_WORD_SCOPE_MISMATCH',
      );
    }
    expect(f.collections.create).not.toHaveBeenCalled();
    expect(f.words.create).not.toHaveBeenCalled();
    expect(f.words.updateOne).not.toHaveBeenCalled();
  });

  it('creates, updates, archives and unsaves metadata without rewriting or deleting source words or SRS', async () => {
    const f = fixture(),
      before = JSON.stringify({ words: f.source, srs: f.srs });
    const created = await f.service.create(content());
    await f.service.save(USER, created.id, KO_QUERY, true);
    await f.service.replace(created.id, {
      ...content(),
      cover: 'ink',
      groups: [{ id: 'new-group', title: TEXT, wordIds: [String(B)] }],
    });
    await f.service.save(USER, created.id, KO_QUERY, false);
    await f.service.archive(created.id);
    await expect(f.service.detail(USER, created.id, KO_QUERY)).rejects.toThrow(
      'WORD_COLLECTION_NOT_FOUND',
    );
    expect(JSON.stringify({ words: f.source, srs: f.srs })).toBe(before);
    expect(f.words.updateOne).not.toHaveBeenCalled();
    expect(f.words.deleteMany).not.toHaveBeenCalled();
    expect(f.progress.updateOne).not.toHaveBeenCalled();
    expect(f.progress.deleteMany).not.toHaveBeenCalled();
  });

  it('does not let editing a collection change its language, curriculum or stable code', async () => {
    const f = fixture();
    await expect(
      f.service.replace(String(COLLECTION), content()),
    ).rejects.toThrow('WORD_COLLECTION_IDENTITY_IMMUTABLE');
    expect(f.collections.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it('orders by actual study time while merely saving a book does not change that order', async () => {
    const f = fixture(),
      id = String(COLLECTION);
    await f.service.save(USER, id, KO_QUERY, true);
    expect((await f.service.list(USER, KO_QUERY))[0].id).toBe(
      'course-ko-general',
    );
    await f.service.setPosition(
      USER,
      id,
      { groupId: 'chapter-1', cardIndex: 0 },
      KO_QUERY,
    );
    expect((await f.service.list(USER, KO_QUERY))[0].id).toBe(id);
    expect(f.preferences[0].lastStudiedAt).toBeInstanceOf(Date);
  });

  it('keeps courses with no words readable as an empty course instead of inventing books', async () => {
    const f = fixture();
    f.source.length = 0;
    f.documents.length = 0;
    expect(await f.service.list(USER, EN_QUERY)).toEqual([
      expect.objectContaining({
        id: 'course-en-general',
        words: 0,
        groupCount: 0,
      }),
    ]);
  });

  it('omits inactive references at read time and validates all four UI translations', async () => {
    const f = fixture();
    f.source.find((row) => String(row._id) === String(A))!.isActive = false;
    const result = await f.service.detail(USER, String(COLLECTION), KO_QUERY);
    expect(result).toMatchObject({
      words: 1,
      mastered: 1,
      due: 0,
      groupCount: 1,
    });
    const valid = plainToInstance(WriteWordCollectionDto, content());
    expect(await validate(valid)).toHaveLength(0);
    const invalid = plainToInstance(WriteWordCollectionDto, {
      ...content(),
      title: { ko: 'Only Korean' },
    });
    expect(await validate(invalid)).not.toHaveLength(0);
    const missing = plainToInstance(WriteWordCollectionDto, {
      ...content(),
      title: undefined,
    });
    expect(await validate(missing)).not.toHaveLength(0);
  });

  it('requires content write permission for every administrative mutation', () => {
    expect(
      Reflect.getMetadata(ADMIN_PERMISSION_KEY, AdminWordCollectionsController),
    ).toBe('content:read');
    for (const method of ['create', 'replace', 'archive'] as const) {
      expect(
        Reflect.getMetadata(
          ADMIN_PERMISSION_KEY,
          AdminWordCollectionsController.prototype[method],
        ),
      ).toBe('content:write');
    }
  });
});
