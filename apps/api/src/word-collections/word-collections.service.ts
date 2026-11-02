import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, type QueryFilter } from 'mongoose';
import {
  DEFAULT_COURSE_ID,
  LEARNING_COURSES,
  resolveCourseScope,
  targetLanguageFilter,
  type CourseScope,
} from '../common/learning-course';
import {
  Word,
  WordDocument,
  type WordLanguage,
  type WordPlacement,
} from '../words/schemas/word.schema';
import {
  UserWordProgress,
  UserWordProgressDocument,
  UserWordState,
} from '../words/schemas/user-word-progress.schema';
import { WordsService } from '../words/words.service';
import {
  CollectionPositionDto,
  CollectionWordsQueryDto,
  WordCollectionsQueryDto,
  WriteWordCollectionDto,
} from './dto/word-collections.dto';
import {
  WordCollection,
  WordCollectionDocument,
} from './schemas/word-collection.schema';
import {
  UserWordCollection,
  UserWordCollectionDocument,
  WordCollectionPosition,
} from './schemas/user-word-collection.schema';

type CollectionRecord = WordCollection & { _id: Types.ObjectId };
type WordRecord = Pick<Word, 'placements' | 'headword'> & {
  _id: Types.ObjectId;
};
type ProgressRecord = UserWordProgress & { _id: Types.ObjectId };
type StoredGroup = {
  id: string;
  title: string;
  order: number;
  wordIds: string[];
  section?: number;
  unit?: number;
};
type CollectionView = {
  id: string;
  code: string;
  courseId: string;
  targetLanguage: string;
  kind: WordCollection['kind'];
  level: WordCollection['level'];
  cover: WordCollection['cover'];
  title: string;
  description: string;
  groups: StoredGroup[];
};

export interface WordCollectionCounts {
  words: number;
  new: number;
  learning: number;
  review: number;
  mastered: number;
  due: number;
}

/** A separate membership layer. Source words and their SRS records are read-only here. */
@Injectable()
export class WordCollectionsService {
  constructor(
    @InjectModel(WordCollection.name)
    private readonly collections: Model<WordCollectionDocument>,
    @InjectModel(UserWordCollection.name)
    private readonly enrollments: Model<UserWordCollectionDocument>,
    @InjectModel(Word.name) private readonly words: Model<WordDocument>,
    @InjectModel(UserWordProgress.name)
    private readonly progress: Model<UserWordProgressDocument>,
    private readonly wordsService: WordsService,
  ) {}

  async list(userId: string, query: WordCollectionsQueryDto) {
    const context = await this.load(userId, query);
    return [...context.views]
      .sort(
        (a, b) =>
          (context.saved.get(b.id)?.lastStudiedAt?.getTime() || 0) -
          (context.saved.get(a.id)?.lastStudiedAt?.getTime() || 0),
      )
      .map((view) => this.summarize(view, context));
  }

  async detail(userId: string, id: string, query: WordCollectionsQueryDto) {
    const context = await this.load(userId, query, id);
    const view = this.requireView(context.views, id);
    return {
      ...this.summarize(view, context),
      groups: view.groups.map(({ wordIds, ...group }) => ({
        ...group,
        ...this.count(wordIds, context.progress),
      })),
    };
  }

  async collectionWords(
    userId: string,
    id: string,
    query: CollectionWordsQueryDto,
  ) {
    const context = await this.load(userId, query, id, {
      userState: false,
      groupId: query.groupId,
    });
    const view = this.requireView(context.views, id);
    const group = view.groups.find((item) => item.id === query.groupId);
    if (!group) throw new NotFoundException('WORD_COLLECTION_GROUP_NOT_FOUND');
    return this.wordsService.getWordsByIds(userId, group.wordIds, {
      ...query,
      section: group.section,
      unit: group.unit,
    });
  }

  async save(
    userId: string,
    id: string,
    query: WordCollectionsQueryDto,
    saved: boolean,
  ) {
    const context = await this.load(userId, query, id, { userState: false });
    this.requireView(context.views, id);
    await this.enrollments.updateOne(
      { userId: new Types.ObjectId(userId), collectionId: id },
      {
        $set: { saved },
        $setOnInsert: { userId: new Types.ObjectId(userId), collectionId: id },
      },
      { upsert: true, runValidators: true },
    );
    return { id, saved };
  }

  async setPosition(
    userId: string,
    id: string,
    body: CollectionPositionDto,
    query: WordCollectionsQueryDto,
  ) {
    const context = await this.load(userId, query, id, {
      userState: false,
      groupId: body.groupId,
    });
    const view = this.requireView(context.views, id);
    const group = view.groups.find((item) => item.id === body.groupId);
    if (!group) throw new NotFoundException('WORD_COLLECTION_GROUP_NOT_FOUND');
    if (body.cardIndex >= group.wordIds.length)
      throw new BadRequestException('INVALID_COLLECTION_POSITION');
    const anchoredIndex = body.lastWordId
      ? group.wordIds.indexOf(body.lastWordId)
      : body.cardIndex;
    if (anchoredIndex < 0)
      throw new BadRequestException('INVALID_COLLECTION_WORD');
    const position: WordCollectionPosition = {
      groupId: group.id,
      cardIndex: anchoredIndex,
      lastWordId: group.wordIds[anchoredIndex],
    };
    await this.enrollments.updateOne(
      { userId: new Types.ObjectId(userId), collectionId: id },
      {
        $set: {
          saved: true,
          lastPosition: position,
          lastStudiedAt: new Date(),
        },
        $setOnInsert: { userId: new Types.ObjectId(userId), collectionId: id },
      },
      { upsert: true, runValidators: true },
    );
    return position;
  }

  async adminList(query: WordCollectionsQueryDto) {
    const scope = resolveCourseScope(query);
    const documents = await this.collections
      .find(scope)
      .sort({ code: 1 })
      .lean();
    return documents.map((document) => ({
      ...document,
      id: String(document._id),
    }));
  }

  async adminGet(id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new NotFoundException('WORD_COLLECTION_NOT_FOUND');
    const document = await this.collections.findById(id).lean();
    if (!document) throw new NotFoundException('WORD_COLLECTION_NOT_FOUND');
    return { ...document, id: String(document._id) };
  }

  async create(body: WriteWordCollectionDto) {
    const content = await this.validateContent(body);
    try {
      const document = await this.collections.create(content);
      return { ...document.toObject(), id: String(document._id) };
    } catch (error) {
      if ((error as { code?: number }).code === 11000)
        throw new ConflictException('WORD_COLLECTION_CODE_EXISTS');
      throw error;
    }
  }

  async replace(id: string, body: WriteWordCollectionDto) {
    const existing = await this.adminGet(id);
    const content = await this.validateContent(body);
    if (
      existing.courseId !== content.courseId ||
      existing.targetLanguage !== content.targetLanguage ||
      existing.code !== content.code
    ) {
      throw new BadRequestException('WORD_COLLECTION_IDENTITY_IMMUTABLE');
    }
    const document = await this.collections
      .findByIdAndUpdate(
        id,
        { $set: content },
        { returnDocument: 'after', runValidators: true },
      )
      .lean();
    if (!document) throw new NotFoundException('WORD_COLLECTION_NOT_FOUND');
    return { ...document, id: String(document._id) };
  }

  async archive(id: string) {
    await this.adminGet(id);
    await this.collections.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: { isActive: false } },
    );
    return { id, isActive: false };
  }

  private async validateContent(body: WriteWordCollectionDto) {
    const scope = resolveCourseScope(body);
    if (!body.title || !body.groups?.length)
      throw new BadRequestException('INVALID_WORD_COLLECTION');
    if (
      new Set(body.groups.map((group) => group.id)).size !== body.groups.length
    )
      throw new BadRequestException('DUPLICATE_COLLECTION_GROUP');
    const ids = [...new Set(body.groups.flatMap((group) => group.wordIds))];
    if (ids.length > 10000 || ids.some((id) => !Types.ObjectId.isValid(id)))
      throw new BadRequestException('INVALID_COLLECTION_WORD');
    const valid = await this.words
      .find({
        ...this.wordFilter(scope),
        _id: { $in: ids.map((id) => new Types.ObjectId(id)) },
      })
      .select('_id')
      .lean();
    if (valid.length !== ids.length)
      throw new BadRequestException('COLLECTION_WORD_SCOPE_MISMATCH');
    return {
      ...scope,
      code: body.code,
      kind: body.kind,
      level: body.level,
      cover: body.cover,
      title: body.title,
      description: body.description || { ko: '', en: '', uz: '', ru: '' },
      isActive: body.isActive ?? false,
      groups: body.groups.map((group) => ({
        id: group.id,
        title: group.title,
        wordIds: [...new Set(group.wordIds)].map(
          (id) => new Types.ObjectId(id),
        ),
      })),
    };
  }

  private async load(
    userId: string,
    query: WordCollectionsQueryDto,
    requestedId?: string,
    options: { userState?: boolean; groupId?: string } = {},
  ) {
    const scope = resolveCourseScope(query);
    const virtualId = `course-${scope.courseId}`;
    if (requestedId?.startsWith('course-') && requestedId !== virtualId)
      throw new NotFoundException('WORD_COLLECTION_NOT_FOUND');
    if (
      requestedId &&
      requestedId !== virtualId &&
      !Types.ObjectId.isValid(requestedId)
    )
      throw new NotFoundException('WORD_COLLECTION_NOT_FOUND');
    const documents = await this.collections
      .find({
        ...scope,
        isActive: true,
        ...(requestedId && requestedId !== virtualId
          ? { _id: new Types.ObjectId(requestedId) }
          : requestedId
            ? { _id: { $in: [] } }
            : {}),
      })
      .sort({ code: 1 })
      .lean();
    const sourceFilter = this.wordFilter(scope);
    if (requestedId && requestedId !== virtualId) {
      if (!documents.length)
        throw new NotFoundException('WORD_COLLECTION_NOT_FOUND');
      sourceFilter._id = {
        $in: documents.flatMap((document) =>
          document.groups
            .filter((group) => !options.groupId || group.id === options.groupId)
            .flatMap((group) => group.wordIds),
        ),
      };
    } else if (requestedId === virtualId && options.groupId) {
      const match = /^s([1-9]\d*)-u([1-9]\d*)$/.exec(options.groupId);
      if (!match)
        throw new NotFoundException('WORD_COLLECTION_GROUP_NOT_FOUND');
      sourceFilter.placements = {
        $elemMatch: {
          ...(scope.courseId === DEFAULT_COURSE_ID
            ? {
                $or: [
                  { courseId: scope.courseId },
                  { courseId: { $exists: false } },
                ],
              }
            : { courseId: scope.courseId }),
          section: Number(match[1]),
          unit: Number(match[2]),
        },
      };
    }
    const [sourceWords, saved] = await Promise.all([
      this.words.find(sourceFilter).select('_id placements headword').lean(),
      options.userState === false
        ? Promise.resolve([])
        : this.enrollments
            .find({
              userId: new Types.ObjectId(userId),
              ...(requestedId ? { collectionId: requestedId } : {}),
            })
            .lean(),
    ]);
    const available = new Set(sourceWords.map((word) => String(word._id)));
    const views: CollectionView[] =
      requestedId && requestedId !== virtualId
        ? []
        : [this.virtualCourse(sourceWords as WordRecord[], scope, query.lang)];
    for (const document of documents as CollectionRecord[]) {
      const groups = document.groups
        .map((group, order) => ({
          id: group.id,
          title: this.localize(group.title, query.lang),
          order,
          wordIds: [...new Set(group.wordIds.map(String))].filter((id) =>
            available.has(id),
          ),
        }))
        .filter((group) => group.wordIds.length);
      views.push({
        id: String(document._id),
        code: document.code,
        ...scope,
        kind: document.kind,
        level: document.level,
        cover: document.cover,
        title: this.localize(document.title, query.lang),
        description: this.localize(document.description, query.lang),
        groups,
      });
    }
    const ids = [
      ...new Set(
        views.flatMap((view) => view.groups.flatMap((group) => group.wordIds)),
      ),
    ];
    const records =
      ids.length && options.userState !== false
        ? await this.progress
            .find({
              userId: new Types.ObjectId(userId),
              wordId: { $in: ids.map((id) => new Types.ObjectId(id)) },
            })
            .lean()
        : [];
    return {
      views,
      progress: new Map(
        (records as ProgressRecord[]).map((record) => [
          String(record.wordId),
          record,
        ]),
      ),
      saved: new Map<string, UserWordCollection>(
        (saved as UserWordCollection[]).map(
          (record) => [record.collectionId, record] as const,
        ),
      ),
    };
  }

  private virtualCourse(
    words: WordRecord[],
    scope: CourseScope,
    lang: WordLanguage,
  ): CollectionView {
    const groups = new Map<
      string,
      StoredGroup & {
        ordered: { id: string; order: number; headword: string }[];
      }
    >();
    for (const word of words)
      for (const placement of word.placements || []) {
        if (!this.inCourse(placement, scope)) continue;
        const id = `s${placement.section}-u${placement.unit}`;
        if (!groups.has(id))
          groups.set(id, {
            id,
            title: this.groupTitle(placement.section, placement.unit, lang),
            order: 0,
            wordIds: [],
            section: placement.section,
            unit: placement.unit,
            ordered: [],
          });
        const group = groups.get(id)!;
        if (!group.ordered.some((item) => item.id === String(word._id))) {
          group.ordered.push({
            id: String(word._id),
            order: placement.order,
            headword: word.headword,
          });
        }
      }
    const language = LEARNING_COURSES.find(
      (item) => item.courseId === scope.courseId,
    )!.title[lang];
    const titles = {
      ko: `KORIO ${language} 코스 단어`,
      en: `KORIO ${language} course words`,
      uz: `KORIO ${language} kursi so‘zlari`,
      ru: `Слова курса KORIO: ${language}`,
    };
    return {
      id: `course-${scope.courseId}`,
      code: `course-${scope.courseId}`,
      ...scope,
      kind: 'course',
      level: 'mixed',
      cover: 'violet',
      title: titles[lang],
      description: '',
      groups: [...groups.values()]
        .sort((a, b) => a.section! - b.section! || a.unit! - b.unit!)
        .map(({ ordered, ...group }, order) => ({
          ...group,
          order,
          wordIds: [
            ...new Set(
              ordered
                .sort(
                  (a, b) =>
                    a.order - b.order ||
                    a.headword.localeCompare(b.headword, scope.targetLanguage),
                )
                .map((item) => item.id),
            ),
          ],
        })),
    };
  }

  private summarize(
    view: CollectionView,
    context: Awaited<ReturnType<WordCollectionsService['load']>>,
  ) {
    const { groups, ...metadata } = view;
    const counts = this.count(
      groups.flatMap((group) => group.wordIds),
      context.progress,
    );
    const enrollment = context.saved.get(view.id);
    const position = enrollment?.lastPosition;
    const group =
      position && groups.find((item) => item.id === position.groupId);
    let lastPosition: WordCollectionPosition | null = null;
    if (position && group?.wordIds.length) {
      const anchor = position.lastWordId
        ? group.wordIds.indexOf(position.lastWordId)
        : -1;
      const index =
        anchor >= 0
          ? anchor
          : Math.min(Math.max(position.cardIndex, 0), group.wordIds.length - 1);
      lastPosition = {
        groupId: group.id,
        cardIndex: index,
        lastWordId: group.wordIds[index],
      };
    }
    return {
      ...metadata,
      ...counts,
      groupCount: groups.length,
      saved:
        enrollment?.saved ??
        (view.id.startsWith('course-') &&
          counts.learning + counts.review + counts.mastered > 0),
      lastPosition,
    };
  }

  private count(
    ids: string[],
    progress: Map<string, ProgressRecord>,
  ): WordCollectionCounts {
    const unique = [...new Set(ids)];
    const counts = {
      words: unique.length,
      new: 0,
      learning: 0,
      review: 0,
      mastered: 0,
      due: 0,
    };
    const now = Date.now();
    for (const id of unique) {
      const record = progress.get(id),
        state = record?.state || UserWordState.NEW;
      counts[state]++;
      if (
        record &&
        state !== UserWordState.NEW &&
        state !== UserWordState.MASTERED &&
        (!record.nextReviewAt || record.nextReviewAt.getTime() <= now)
      )
        counts.due++;
    }
    return counts;
  }

  private requireView(views: CollectionView[], id: string) {
    const view = views.find((item) => item.id === id);
    if (!view) throw new NotFoundException('WORD_COLLECTION_NOT_FOUND');
    return view;
  }

  private wordFilter(scope: CourseScope): QueryFilter<Word> {
    return {
      isActive: true,
      $and: [targetLanguageFilter(scope.targetLanguage)],
      placements: {
        $elemMatch:
          scope.courseId === DEFAULT_COURSE_ID
            ? {
                $or: [
                  { courseId: scope.courseId },
                  { courseId: { $exists: false } },
                ],
              }
            : { courseId: scope.courseId },
      },
    };
  }

  private inCourse(placement: WordPlacement, scope: CourseScope) {
    return (placement.courseId || DEFAULT_COURSE_ID) === scope.courseId;
  }

  private localize(
    value: Partial<Record<WordLanguage, string>> | undefined,
    lang: WordLanguage,
  ) {
    return (
      value?.[lang] || value?.uz || value?.en || value?.ru || value?.ko || ''
    );
  }

  private groupTitle(section: number, unit: number, lang: WordLanguage) {
    return {
      ko: `섹션 ${section} · 유닛 ${unit}`,
      en: `Section ${section} · Unit ${unit}`,
      uz: `${section}-bo‘lim · ${unit}-dars`,
      ru: `Раздел ${section} · Урок ${unit}`,
    }[lang];
  }
}
