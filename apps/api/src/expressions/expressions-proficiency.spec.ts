jest.mock('@nestjs/mongoose', () => ({
  ...jest.requireActual<typeof import('@nestjs/mongoose')>('@nestjs/mongoose'),
  Prop: () => () => undefined,
  Schema: () => () => undefined,
  SchemaFactory: { createForClass: () => ({ index: () => undefined }) },
}));

import { Types } from 'mongoose';
import { ExpressionsService } from './expressions.service';

describe('Expression proficiency queries', () => {
  const userId = new Types.ObjectId().toString();
  const packId = new Types.ObjectId();
  const pack = {
    _id: packId,
    code: 'en-greetings',
    courseId: 'en-general',
    targetLanguage: 'en',
    title: { ko: '인사' },
    description: {},
    media: {},
    order: 1,
  };
  const nodeIds = {
    beginner: new Types.ObjectId(),
    intermediate: new Types.ObjectId(),
    advanced: new Types.ObjectId(),
  };
  const expressions = Object.entries(nodeIds).map(
    ([proficiency, nodeId], order) => ({
      _id: new Types.ObjectId(),
      code: `en-greetings-${proficiency}`,
      courseId: 'en-general',
      targetLanguage: 'en',
      packId,
      nodeId,
      order: order + 1,
      text: `Hello ${proficiency}`,
      korean: '',
      meaning: { ko: '안녕하세요' },
      context: {},
      speaker: {},
      usageNote: {},
      pronunciation: {},
      media: {},
      placements: [],
      practiceQuestionIds: [],
      tags: [],
      difficulty: 1,
      speechLevel: 'polite',
    }),
  );

  function chain(value: unknown) {
    const query = {
      sort: () => query,
      select: () => query,
      lean: () => Promise.resolve(value),
    };
    return query;
  }

  function fixture() {
    const nodeFind = jest.fn(
      ({ proficiency }: { proficiency: keyof typeof nodeIds }) =>
        chain([{ _id: nodeIds[proficiency] }]),
    );
    const expressionFind = jest.fn(
      (filter: { nodeId?: { $in: Types.ObjectId[] } }) =>
        chain(
          filter.nodeId
            ? expressions.filter((expression) =>
                filter.nodeId?.$in.some((id) => id.equals(expression.nodeId)),
              )
            : expressions,
        ),
    );
    const service = new ExpressionsService(
      { find: () => chain([pack]), findOne: () => chain(pack) } as never,
      { find: expressionFind } as never,
      { find: nodeFind } as never,
      { find: () => chain([]) } as never,
      {} as never,
    );
    return { service, nodeFind, expressionFind };
  }

  it('returns only the selected level in overview counts and paginated list', async () => {
    const { service, nodeFind } = fixture();
    const query = {
      courseId: 'en-general',
      targetLanguage: 'en',
      lang: 'ko' as const,
      proficiency: 'intermediate' as const,
    };

    const overview = await service.getOverview(userId, query);
    expect(overview.summary.total).toBe(1);
    expect(overview.packs[0]).toMatchObject({
      count: 1,
      resumeExpressionId: expressions[1]._id.toString(),
    });
    expect(overview.scope.proficiency).toBe('intermediate');

    const list = await service.getExpressions(userId, {
      ...query,
      pack: 'en-greetings',
      limit: 100,
    });
    expect(list.total).toBe(1);
    expect(list.items.map((item) => item.code)).toEqual([
      'en-greetings-intermediate',
    ]);
    expect(nodeFind).toHaveBeenLastCalledWith({
      proficiency: 'intermediate',
      isActive: true,
      packId,
    });
  });

  it('leaves unfiltered requests intact and supports Korean levels', async () => {
    const { service, nodeFind } = fixture();
    const all = await service.getExpressions(userId, {
      courseId: 'en-general',
      targetLanguage: 'en',
      lang: 'ko',
      limit: 100,
    });
    expect(all.total).toBe(3);
    expect(nodeFind).not.toHaveBeenCalled();

    const korean = await service.getOverview(userId, {
      courseId: 'ko-general',
      targetLanguage: 'ko',
      lang: 'uz',
      proficiency: 'beginner',
    });
    expect(korean.summary.total).toBe(1);
    const koreanList = await service.getExpressions(userId, {
      courseId: 'ko-general',
      targetLanguage: 'ko',
      lang: 'uz',
      proficiency: 'beginner',
      limit: 100,
    });
    expect(koreanList.items).toHaveLength(1);
    expect(nodeFind).toHaveBeenLastCalledWith({
      proficiency: 'beginner',
      isActive: true,
    });
  });
});
