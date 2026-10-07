import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import type { Model } from 'mongoose';
import type { GrammarDocument } from '../../grammer/schemas/grammar.schema';
import type { ExpressionDocument } from '../../expressions/schemas/expression.schema';
import type { ExpressionPackDocument } from '../../expressions/schemas/expression-pack.schema';
import type { ExpressionNodeDocument } from '../../expressions/schemas/expression-node.schema';
import { AdminContentLibraryService } from './admin-content-library.service';

jest.mock('../../grammer/schemas/grammar.schema', () => ({
  Grammar: class Grammar {},
}));
jest.mock('../../expressions/schemas/expression.schema', () => ({
  Expression: class Expression {},
}));
jest.mock('../../expressions/schemas/expression-pack.schema', () => ({
  ExpressionPack: class ExpressionPack {},
}));
jest.mock('../../expressions/schemas/expression-node.schema', () => ({
  ExpressionNode: class ExpressionNode {},
}));

function queryRows(rows: unknown[]) {
  const query = {
    sort: jest.fn(),
    skip: jest.fn(),
    limit: jest.fn(),
    lean: jest.fn().mockResolvedValue(rows),
  };
  query.sort.mockReturnValue(query);
  query.skip.mockReturnValue(query);
  query.limit.mockReturnValue(query);
  return query;
}

function service() {
  const grammar = {
    find: jest.fn(),
    countDocuments: jest.fn(),
    findById: jest.fn(),
  };
  const expression = {
    find: jest.fn(),
    countDocuments: jest.fn(),
    findById: jest.fn(),
  };
  const pack = { find: jest.fn() };
  const node = { find: jest.fn() };
  return {
    library: new AdminContentLibraryService(
      grammar as unknown as Model<GrammarDocument>,
      expression as unknown as Model<ExpressionDocument>,
      pack as unknown as Model<ExpressionPackDocument>,
      node as unknown as Model<ExpressionNodeDocument>,
    ),
    grammar,
    expression,
    pack,
    node,
  };
}

describe('AdminContentLibraryService', () => {
  it('paginates and returns database grammar with summary-only coverage', async () => {
    const { library, grammar } = service();
    const query = queryRows([
      {
        _id: new Types.ObjectId(),
        code: 'g1',
        pattern: '-고 있다',
        summary: { ko: '진행', uz: ' ', en: 'Progressive', ru: '' },
        section: 2,
        unit: 3,
        order: 4,
        isActive: true,
      },
    ]);
    grammar.find.mockReturnValue(query);
    grammar.countDocuments.mockResolvedValue(12);

    const result = await library.list({
      kind: 'grammar',
      page: '2',
      pageSize: '1',
      section: '2',
    });
    expect(grammar.find).toHaveBeenCalledWith({ section: 2 });
    expect(query.skip).toHaveBeenCalledWith(1);
    expect(result.total).toBe(12);
    expect(result.items[0]).toMatchObject({
      kind: 'grammar',
      code: 'g1',
      section: 2,
      unit: 3,
      coverageField: 'summary',
      translationCoverage: { ko: true, uz: false, en: true, ru: false },
    });
  });

  it('escapes search regex rather than treating user text as regex', async () => {
    const { library, grammar } = service();
    grammar.find.mockReturnValue(queryRows([]));
    grammar.countDocuments.mockResolvedValue(0);
    await library.list({ search: 'a.*' });
    const calls = grammar.find.mock.calls as unknown as Array<
      [{ $or: Array<Record<string, RegExp>> }]
    >;
    const filter = calls[0][0];
    expect(filter.$or[0].code.source).toBe('a\\.\\*');
  });

  it('lists only fixed Hangul IDs and labels its source accurately', async () => {
    const { library, grammar, expression } = service();
    const result = await library.list({ kind: 'hangul', search: 'giyeok' });
    expect(result.source).toBe('static');
    expect(result.total).toBe(2);
    expect(result.items[0]).toMatchObject({
      code: 'c-giyeok',
      title: 'c-giyeok',
      translationCoverage: null,
      section: null,
      unit: null,
    });
    expect(grammar.find).not.toHaveBeenCalled();
    expect(expression.find).not.toHaveBeenCalled();
    expect((await library.list({ kind: 'hangul', section: '1' })).total).toBe(
      0,
    );
  });

  it('tolerates missing expression pack and node references', async () => {
    const { library, expression, pack, node } = service();
    expression.find.mockReturnValue(
      queryRows([
        {
          _id: new Types.ObjectId(),
          code: 'e1',
          korean: '안녕하세요',
          meaning: { uz: 'salom' },
          placements: [{ section: 1, unit: 2, order: 3, isCore: true }],
          isActive: true,
        },
      ]),
    );
    expression.countDocuments.mockResolvedValue(1);
    pack.find.mockReturnValue({ lean: jest.fn().mockResolvedValue([]) });
    node.find.mockReturnValue({ lean: jest.fn().mockResolvedValue([]) });
    const result = await library.list({
      kind: 'expression',
      section: '1',
      unit: '2',
    });
    expect(expression.find).toHaveBeenCalledWith({
      placements: { $elemMatch: { section: 1, unit: 2 } },
    });
    expect(result.items[0].links).toMatchObject({ pack: null, node: null });
  });

  it('rejects unsupported query values and missing static IDs', async () => {
    const { library } = service();
    await expect(library.list({ kind: 'word' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    await expect(library.list({ pageSize: '999' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    await expect(library.get('hangul', 'not-a-jamo')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
