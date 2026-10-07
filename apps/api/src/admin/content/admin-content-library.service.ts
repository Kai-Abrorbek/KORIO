import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Grammar, GrammarDocument } from '../../grammer/schemas/grammar.schema';
import {
  Expression,
  ExpressionDocument,
} from '../../expressions/schemas/expression.schema';
import {
  ExpressionPack,
  ExpressionPackDocument,
} from '../../expressions/schemas/expression-pack.schema';
import {
  ExpressionNode,
  ExpressionNodeDocument,
} from '../../expressions/schemas/expression-node.schema';
import {
  HANGUL_CONSONANT_IDS,
  HANGUL_VOWEL_IDS,
} from '../../hangul/hangul.constants';

const MAX_PAGE_SIZE = 50;
const LOCALES = ['ko', 'uz', 'en', 'ru'] as const;
type LibraryKind = 'grammar' | 'expression' | 'hangul';
type Locale = (typeof LOCALES)[number];
type Localized = Partial<Record<Locale, string>> | null | undefined;
type ListQuery = {
  kind?: string;
  page?: string;
  pageSize?: string;
  search?: string;
  section?: string;
  unit?: string;
  active?: string;
};
type IdRecord<T> = T & { _id: Types.ObjectId };
type GrammarRecord = IdRecord<Grammar>;
type ExpressionRecord = IdRecord<Expression>;
type PackRecord = IdRecord<ExpressionPack>;
type NodeRecord = IdRecord<ExpressionNode>;
type Link = { id: string; code: string; title: string };

function kindOf(raw?: string): LibraryKind {
  if (raw === undefined || raw === '') return 'grammar';
  if (raw === 'grammar' || raw === 'expression' || raw === 'hangul') return raw;
  throw new BadRequestException('INVALID_KIND');
}

function positive(
  raw: string | undefined,
  name: string,
  fallback: number,
  max: number,
) {
  if (raw === undefined || raw === '') return fallback;
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 1 || value > max) {
    throw new BadRequestException(`INVALID_${name.toUpperCase()}`);
  }
  return value;
}

function activeOf(raw?: string) {
  if (raw === undefined || raw === '' || raw === 'all') return undefined;
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  throw new BadRequestException('INVALID_ACTIVE');
}

function searchOf(raw?: string) {
  const search = (raw ?? '').trim();
  if (search.length > 100) throw new BadRequestException('SEARCH_TOO_LONG');
  return search;
}

function regexOf(search: string) {
  return new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
}

function coverage(value: Localized) {
  return Object.fromEntries(
    LOCALES.map((locale) => [locale, Boolean(value?.[locale]?.trim())]),
  ) as Record<Locale, boolean>;
}

function localText(value: Localized) {
  return value?.ko || value?.uz || value?.en || value?.ru || '';
}

function linked(row: PackRecord | NodeRecord | undefined): Link | null {
  if (!row) return null;
  return {
    id: row._id.toString(),
    code: row.code,
    title: 'title' in row ? localText(row.title) : '',
  };
}

@Injectable()
export class AdminContentLibraryService {
  constructor(
    @InjectModel(Grammar.name)
    private readonly grammarModel: Model<GrammarDocument>,
    @InjectModel(Expression.name)
    private readonly expressionModel: Model<ExpressionDocument>,
    @InjectModel(ExpressionPack.name)
    private readonly packModel: Model<ExpressionPackDocument>,
    @InjectModel(ExpressionNode.name)
    private readonly nodeModel: Model<ExpressionNodeDocument>,
  ) {}

  async list(query: ListQuery) {
    const kind = kindOf(query.kind);
    const page = positive(query.page, 'page', 1, 100000);
    const pageSize = positive(query.pageSize, 'pageSize', 20, MAX_PAGE_SIZE);
    const section = query.section
      ? positive(query.section, 'section', 1, 999)
      : undefined;
    const unit = query.unit ? positive(query.unit, 'unit', 1, 999) : undefined;
    const active = activeOf(query.active);
    const search = searchOf(query.search);
    const skip = (page - 1) * pageSize;

    if (kind === 'hangul') {
      // Hangul display content is fixed in the mobile app; the API owns only IDs.
      const all = [...HANGUL_CONSONANT_IDS, ...HANGUL_VOWEL_IDS];
      const filtered =
        section || unit || active === false
          ? []
          : all.filter((id) => id.includes(search.toLowerCase()));
      return {
        kind,
        source: 'static' as const,
        items: filtered
          .slice(skip, skip + pageSize)
          .map((id) => this.hangulRow(id)),
        total: filtered.length,
        page,
        pageSize,
      };
    }

    if (kind === 'grammar') {
      const filter: Record<string, unknown> = {};
      if (section !== undefined) filter.section = section;
      if (unit !== undefined) filter.unit = unit;
      if (active !== undefined) filter.isActive = active;
      if (search) {
        const regex = regexOf(search);
        filter.$or = [
          { code: regex },
          { pattern: regex },
          { 'summary.ko': regex },
          { 'summary.uz': regex },
          { 'summary.en': regex },
          { 'summary.ru': regex },
        ];
      }
      const [rows, total] = await Promise.all([
        this.grammarModel
          .find(filter)
          .sort({ section: 1, unit: 1, order: 1, _id: 1 })
          .skip(skip)
          .limit(pageSize)
          .lean() as Promise<GrammarRecord[]>,
        this.grammarModel.countDocuments(filter),
      ]);
      return {
        kind,
        source: 'database' as const,
        items: rows.map((row) => this.grammarRow(row)),
        total,
        page,
        pageSize,
      };
    }

    const filter: Record<string, unknown> = {};
    if (section !== undefined || unit !== undefined) {
      filter.placements = {
        $elemMatch: {
          ...(section !== undefined ? { section } : {}),
          ...(unit !== undefined ? { unit } : {}),
        },
      };
    }
    if (active !== undefined) filter.isActive = active;
    if (search) {
      const regex = regexOf(search);
      filter.$or = [
        { code: regex },
        { korean: regex },
        { 'meaning.ko': regex },
        { 'meaning.uz': regex },
        { 'meaning.en': regex },
        { 'meaning.ru': regex },
      ];
    }
    const [rows, total] = await Promise.all([
      this.expressionModel
        .find(filter)
        .sort({ code: 1, _id: 1 })
        .skip(skip)
        .limit(pageSize)
        .lean() as Promise<ExpressionRecord[]>,
      this.expressionModel.countDocuments(filter),
    ]);
    const links = await this.expressionLinks(rows);
    return {
      kind,
      source: 'database' as const,
      items: rows.map((row) => this.expressionRow(row, links)),
      total,
      page,
      pageSize,
    };
  }

  async get(rawKind: string, id: string) {
    const kind = kindOf(rawKind);
    if (kind === 'hangul') {
      const all = [...HANGUL_CONSONANT_IDS, ...HANGUL_VOWEL_IDS];
      if (!all.includes(id as (typeof all)[number]))
        throw new NotFoundException('CONTENT_NOT_FOUND');
      return {
        ...this.hangulRow(id),
        content: {
          category: id.startsWith('c-') ? 'consonant' : 'vowel',
          note: '표시용 글자·이름·예시는 모바일 정적 콘텐츠에서 관리됩니다.',
        },
      };
    }
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('INVALID_CONTENT_ID');
    const objectId = new Types.ObjectId(id);
    if (kind === 'grammar') {
      const row = (await this.grammarModel
        .findById(objectId)
        .lean()) as GrammarRecord | null;
      if (!row) throw new NotFoundException('CONTENT_NOT_FOUND');
      return {
        ...this.grammarRow(row),
        content: {
          pattern: row.pattern,
          summary: row.summary,
          explanation: row.explanation,
          conjugationRule: row.conjugationRule,
          conjugations: row.conjugations,
          examples: row.examples,
          dialogue: row.dialogue,
          similar: row.similar,
          cautions: row.cautions,
          tags: row.tags,
          quiz: row.quiz,
        },
      };
    }
    const row = (await this.expressionModel
      .findById(objectId)
      .lean()) as ExpressionRecord | null;
    if (!row) throw new NotFoundException('CONTENT_NOT_FOUND');
    const links = await this.expressionLinks([row]);
    return {
      ...this.expressionRow(row, links),
      content: {
        korean: row.korean,
        meaning: row.meaning,
        context: row.context,
        speaker: row.speaker,
        usageNote: row.usageNote,
        speechLevel: row.speechLevel,
        pronunciation: row.pronunciation,
        media: row.media,
        difficulty: row.difficulty,
        order: row.order,
        tags: row.tags,
        practiceQuestionIds:
          row.practiceQuestionIds?.map((questionId) => questionId.toString()) ??
          [],
      },
    };
  }

  private grammarRow(row: GrammarRecord) {
    return {
      kind: 'grammar' as const,
      source: 'database' as const,
      id: row._id.toString(),
      code: row.code,
      title: row.pattern,
      subtitle: localText(row.summary),
      section: row.section ?? null,
      unit: row.unit ?? null,
      order: row.order ?? null,
      placements: [
        {
          section: row.section,
          unit: row.unit,
          order: row.order,
          isCore: true,
        },
      ],
      isActive: row.isActive !== false,
      translationCoverage: coverage(row.summary),
      coverageField: 'summary' as const,
      links: null,
    };
  }

  private expressionRow(
    row: ExpressionRecord,
    links: { packs: Map<string, PackRecord>; nodes: Map<string, NodeRecord> },
  ) {
    const placements = row.placements ?? [];
    return {
      kind: 'expression' as const,
      source: 'database' as const,
      id: row._id.toString(),
      code: row.code,
      title: row.korean,
      subtitle: localText(row.meaning),
      section: placements[0]?.section ?? null,
      unit: placements[0]?.unit ?? null,
      order: row.order ?? null,
      placements: placements.map((placement) => ({
        section: placement.section,
        unit: placement.unit,
        order: placement.order,
        isCore: placement.isCore,
      })),
      isActive: row.isActive !== false,
      translationCoverage: coverage(row.meaning),
      coverageField: 'meaning' as const,
      links: {
        pack: linked(links.packs.get(row.packId?.toString() ?? '')),
        node: linked(links.nodes.get(row.nodeId?.toString() ?? '')),
        practiceQuestionCount: row.practiceQuestionIds?.length ?? 0,
      },
    };
  }

  private hangulRow(id: string) {
    return {
      kind: 'hangul' as const,
      source: 'static' as const,
      id,
      code: id,
      title: id,
      subtitle: id.startsWith('c-') ? '자음' : '모음',
      section: null,
      unit: null,
      order: null,
      placements: [],
      isActive: true,
      translationCoverage: null,
      coverageField: null,
      links: null,
    };
  }

  private async expressionLinks(rows: ExpressionRecord[]) {
    if (!rows.length)
      return {
        packs: new Map<string, PackRecord>(),
        nodes: new Map<string, NodeRecord>(),
      };
    const packIds = [
      ...new Set(
        rows
          .map((row) => row.packId?.toString())
          .filter((id): id is string => Boolean(id)),
      ),
    ].map((id) => new Types.ObjectId(id));
    const nodeIds = [
      ...new Set(
        rows
          .map((row) => row.nodeId?.toString())
          .filter((id): id is string => Boolean(id)),
      ),
    ].map((id) => new Types.ObjectId(id));
    const [packs, nodes] = await Promise.all([
      this.packModel.find({ _id: { $in: packIds } }).lean() as Promise<
        PackRecord[]
      >,
      this.nodeModel.find({ _id: { $in: nodeIds } }).lean() as Promise<
        NodeRecord[]
      >,
    ]);
    return {
      packs: new Map(packs.map((row) => [row._id.toString(), row])),
      nodes: new Map(nodes.map((row) => [row._id.toString(), row])),
    };
  }
}
