import { BadRequestException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { AdminContentLocalizationService } from './admin-content-localization.service';
import type { LessonNodeDocument } from '../../lessons/schemas/node.schema';
import type { LessonDocument } from '../../lessons/schemas/lesson.schema';
import type { QuestionDocument } from '../../lessons/schemas/question.schema';
import type { GrammarDocument } from '../../grammer/schemas/grammar.schema';
import type { ExpressionPackDocument } from '../../expressions/schemas/expression-pack.schema';
import type { ExpressionNodeDocument } from '../../expressions/schemas/expression-node.schema';
import type { ExpressionDocument } from '../../expressions/schemas/expression.schema';

type Stage = {
  $count?: string;
  $lookup?: unknown;
  $skip?: number;
  $limit?: number;
  $match?: unknown;
  $addFields?: unknown;
};

jest.mock('../../lessons/schemas/node.schema', () => ({
  LessonNode: class LessonNode {},
}));
jest.mock('../../lessons/schemas/lesson.schema', () => ({
  Lesson: class Lesson {},
}));
jest.mock('../../lessons/schemas/question.schema', () => ({
  Question: class Question {},
}));
jest.mock('../../grammer/schemas/grammar.schema', () => ({
  Grammar: class Grammar {},
}));
jest.mock('../../expressions/schemas/expression-pack.schema', () => ({
  ExpressionPack: class ExpressionPack {},
}));
jest.mock('../../expressions/schemas/expression-node.schema', () => ({
  ExpressionNode: class ExpressionNode {},
}));
jest.mock('../../expressions/schemas/expression.schema', () => ({
  Expression: class Expression {},
}));

describe('AdminContentLocalizationService', () => {
  const aggregate = jest.fn();
  const model = (collection: string) => ({
    aggregate,
    collection: { name: collection },
  });
  const nodes = model('lessonnodes') as unknown as Model<LessonNodeDocument>;
  const lessons = model('lessons') as unknown as Model<LessonDocument>;
  const questions = model('questions') as unknown as Model<QuestionDocument>;
  const grammar = model('grammars') as unknown as Model<GrammarDocument>;
  const packs = model(
    'expressionpacks',
  ) as unknown as Model<ExpressionPackDocument>;
  const expressionNodes = model(
    'expressionnodes',
  ) as unknown as Model<ExpressionNodeDocument>;
  const expressions = model(
    'expressions',
  ) as unknown as Model<ExpressionDocument>;
  const service = new AdminContentLocalizationService(
    nodes,
    lessons,
    questions,
    grammar,
    packs,
    expressionNodes,
    expressions,
  );
  const returned = (value: unknown) => ({
    exec: jest.fn().mockResolvedValue(value),
  });

  beforeEach(() => aggregate.mockReset());

  it('counts all entities server-side and fetches only the selected page', async () => {
    const counts = [1, 1, 1, 0, 0, 0, 0];
    let countIndex = 0;
    aggregate.mockImplementation((pipeline: Stage[]) => {
      if (pipeline.some((stage) => stage.$count))
        return returned([{ total: counts[countIndex++] }]);
      return returned([
        {
          _id: new Types.ObjectId(),
          title: { uz: 'Node' },
          missing: [
            {
              field: 'title',
              language: 'en',
              reason: '필수 번역이 비어 있습니다.',
            },
          ],
          checkedFieldCount: 3,
          section: 1,
          unit: 2,
          order: 3,
        },
      ]);
    });
    const result = await service.list({ page: '2', pageSize: '1' });
    expect(result.total).toBe(3);
    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toMatchObject({
      entity: 'lesson',
      status: 'missing',
      missingCount: 1,
    });
    const itemPipelines = aggregate.mock.calls
      .map(([pipeline]) => pipeline as Stage[])
      .filter((pipeline) => !pipeline.some((stage) => stage.$count));
    expect(itemPipelines).toHaveLength(1);
    expect(itemPipelines[0].find((stage) => stage.$limit)?.$limit).toBe(1);
    expect(
      itemPipelines[0].findIndex((stage) => stage.$lookup),
    ).toBeGreaterThan(itemPipelines[0].findIndex((stage) => stage.$limit));
    const countPipelines = aggregate.mock.calls
      .map(([pipeline]) => pipeline as Stage[])
      .filter((pipeline) => pipeline.some((stage) => stage.$count));
    expect(countPipelines).toHaveLength(7);
    expect(
      countPipelines.every((pipeline) =>
        JSON.stringify(pipeline).includes('"missingCount":{"$gt":0}'),
      ),
    ).toBe(true);
  });

  it('keeps every lesson location for a shared question', async () => {
    const questionId = new Types.ObjectId();
    const nodeA = new Types.ObjectId();
    const nodeB = new Types.ObjectId();
    aggregate.mockReturnValueOnce(returned([{ total: 1 }])).mockReturnValueOnce(
      returned([
        {
          _id: questionId,
          code: 'Q-1',
          instruction: { uz: 'Savol' },
          missing: [
            {
              field: 'instruction',
              language: 'en',
              reason: '필수 번역이 비어 있습니다.',
            },
          ],
          checkedFieldCount: 1,
          lessons: [
            {
              _id: new Types.ObjectId(),
              nodeId: nodeA,
              section: 0,
              unit: 0,
              title: { uz: 'One' },
            },
            {
              _id: new Types.ObjectId(),
              nodeId: nodeB,
              section: 3,
              unit: 4,
              title: { uz: 'Two' },
            },
          ],
          nodes: [
            { _id: nodeA, section: 1, unit: 2, title: { uz: 'A' } },
            { _id: nodeB, section: 3, unit: 4, title: { uz: 'B' } },
          ],
        },
      ]),
    );
    const result = await service.list({ entity: 'question', language: 'en' });
    expect(result.items[0].locations).toHaveLength(2);
    expect(
      result.items[0].locations.map((location) => location.section),
    ).toEqual([1, 3]);
    expect(result.items[0].locations[0].question?.id).toBe(
      questionId.toString(),
    );
  });

  it('treats missing and complete as database-level filters', async () => {
    aggregate.mockReturnValueOnce(returned([{ total: 0 }]));
    const result = await service.list({
      entity: 'grammar',
      status: 'complete',
      language: 'ru',
    });
    expect(result).toMatchObject({ total: 0, items: [] });
    const pipeline = (aggregate.mock.calls as [Stage[]][])[0][0];
    expect(pipeline.some((stage) => !!stage.$match)).toBe(true);
    expect(pipeline.some((stage) => !!stage.$addFields)).toBe(true);
  });

  it('shows the referenced grammar lesson with the node as canonical section/unit', async () => {
    const nodeId = new Types.ObjectId();
    aggregate.mockReturnValueOnce(returned([{ total: 1 }])).mockReturnValueOnce(
      returned([
        {
          _id: new Types.ObjectId(),
          code: 'grammar-one',
          pattern: '-고 있다',
          section: 9,
          unit: 9,
          missing: [
            {
              field: 'summary',
              language: 'ru',
              reason: '필수 번역이 비어 있습니다.',
            },
          ],
          checkedFieldCount: 3,
          lessons: [
            {
              _id: new Types.ObjectId(),
              nodeId,
              section: 0,
              unit: 0,
              title: { uz: 'Lesson' },
            },
          ],
          nodes: [{ _id: nodeId, section: 2, unit: 3, title: { uz: 'Node' } }],
        },
      ]),
    );
    const result = await service.list({ entity: 'grammar' });
    expect(result.items[0].location).toMatchObject({
      section: 2,
      unit: 3,
      node: { id: nodeId.toString() },
    });
    expect(result.items[0].location?.lesson).not.toBeNull();
  });

  it('does not require translations for an optional Korean-only question field', async () => {
    aggregate.mockReturnValueOnce(returned([{ total: 0 }]));
    await service.list({ entity: 'question', language: 'uz' });
    const pipeline = (aggregate.mock.calls as [Stage[]][])[0][0];
    const rules = JSON.stringify(
      pipeline.find((stage) => stage.$addFields)?.$addFields,
    );
    expect(rules).toContain('answerTranslation.uz');
    expect(rules).toContain('answerTranslation.en');
    expect(rules).toContain('answerTranslation.ru');
    expect(rules).not.toContain('answerTranslation.ko');
    expect(rules).not.toContain('npcTextI18n.ko');
  });

  it('derives expression-node locations from expression placements without duplicates', async () => {
    aggregate.mockReturnValueOnce(returned([{ total: 1 }])).mockReturnValueOnce(
      returned([
        {
          _id: new Types.ObjectId(),
          code: 'expr-node-1',
          title: { uz: 'Node' },
          missing: [
            {
              field: 'title',
              language: 'ru',
              reason: '필수 번역이 비어 있습니다.',
            },
          ],
          checkedFieldCount: 3,
          expressions: [
            {
              placements: [
                { section: 1, unit: 2 },
                { section: 1, unit: 2 },
              ],
            },
            { placements: [{ section: 2, unit: 3 }] },
          ],
        },
      ]),
    );
    const result = await service.list({ entity: 'expressionNode' });
    expect(
      result.items[0].locations.map((location) => [
        location.section,
        location.unit,
      ]),
    ).toEqual([
      [1, 2],
      [2, 3],
    ]);
  });

  it('rejects invalid filters before accessing the database', async () => {
    await expect(service.list({ language: 'ko' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    await expect(service.list({ entity: 'user' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    await expect(service.list({ status: 'unknown' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    await expect(service.list({ pageSize: '51' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(aggregate).not.toHaveBeenCalled();
  });
});
