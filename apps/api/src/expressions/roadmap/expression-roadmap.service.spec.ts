jest.mock('@nestjs/mongoose', () => ({ InjectModel: () => () => undefined }));
jest.mock('../schemas/expression-node.schema', () => ({
  ExpressionNode: { name: 'ExpressionNode' },
}));
jest.mock('../schemas/expression-pack.schema', () => ({
  ExpressionPack: { name: 'ExpressionPack' },
}));
jest.mock('../schemas/expression.schema', () => ({
  Expression: { name: 'Expression' },
}));
jest.mock('../schemas/user-expression-progress.schema', () => ({
  UserExpressionProgress: { name: 'UserExpressionProgress' },
}));
jest.mock('../schemas/user-expression-path.schema', () => ({
  UserExpressionPath: { name: 'UserExpressionPath' },
}));

import { Types } from 'mongoose';
import {
  ExpressionRoadmapService,
  assignNodeStatuses,
} from './expression-roadmap.service';

const USER = new Types.ObjectId().toString();

/** mongoose 쿼리 흉내: .sort().select().lean() 아무 순서로 */
const chain = (value: unknown) => {
  const q = {
    sort: () => q,
    select: () => q,
    lean: () => Promise.resolve(value),
  };
  return q;
};

/**
 * 주제 4개 × 노드 2개, 노드마다 표현 1개(3회 노출이면 익힘).
 * done 에 든 노드 code 는 다 익힌 것으로.
 */
function setup(done: string[], focus: number | null) {
  const packs = [0, 1, 2, 3].map((i) => ({
    _id: new Types.ObjectId(),
    code: `p${i}`,
    title: { uz: `P${i}` },
    description: {},
    media: {},
    order: i,
  }));
  const nodes = packs.flatMap((pack, i) =>
    [0, 1].map((j) => ({
      _id: new Types.ObjectId(),
      packId: pack._id,
      code: `n${i}${j}`,
      title: {},
      description: {},
      icon: 'x',
      order: j,
      requiredExposures: 3,
    })),
  );
  const expressions = nodes.map((node) => ({
    _id: new Types.ObjectId(),
    nodeId: node._id,
  }));
  const progress = expressions
    .filter((_, k) => done.includes(nodes[k].code))
    .map((expression) => ({ expressionId: expression._id, viewedCount: 3 }));
  const updates: unknown[] = [];
  let focusPackId = focus === null ? null : packs[focus]._id;
  const service = new ExpressionRoadmapService(
    {
      find: () => chain(packs),
      findOne: ({ code }: { code: string }) =>
        chain(packs.find((pack) => pack.code === code) ?? null),
    } as never,
    { find: () => chain(nodes) } as never,
    { find: () => chain(expressions) } as never,
    { find: () => chain(progress) } as never,
    {
      findOne: () => chain(focusPackId ? { focusPackId } : null),
      updateOne: (
        _q: unknown,
        update: { $set: { focusPackId: Types.ObjectId } },
      ) => {
        updates.push(update);
        focusPackId = update.$set.focusPackId;
        return Promise.resolve();
      },
    } as never,
  );
  return { service, updates, packs };
}

const statusMap = async (service: ExpressionRoadmapService) => {
  const roadmap = await service.getRoadmap(USER, 'uz');
  return {
    roadmap,
    map: Object.fromEntries(
      roadmap.topics.flatMap((topic) =>
        topic.nodes.map((node) => [node.code, node.status]),
      ),
    ),
  };
};

describe('assignNodeStatuses', () => {
  const topic = (...completed: boolean[]) => ({
    nodes: completed.map((c) => ({ completed: c, expressionCount: 1 })),
  });

  it('고른 주제가 없으면 처음 안 끝낸 노드 하나만 current (예전과 같다)', () => {
    expect(assignNodeStatuses([topic(true, false), topic(false)], -1)).toEqual([
      ['completed', 'current'],
      ['locked'],
    ]);
  });

  it('고른 주제의 처음부터 길이 열리고 그 앞의 안 끝낸 노드는 잠긴다', () => {
    expect(
      assignNodeStatuses(
        [topic(true, false), topic(false, false), topic(false)],
        1,
      ),
    ).toEqual([['completed', 'locked'], ['current', 'locked'], ['locked']]);
  });

  it('다 익힌 노드는 길 밖이어도 completed — 다시 볼 수 있다', () => {
    expect(assignNodeStatuses([topic(false), topic(true, false)], -1)).toEqual([
      ['current'],
      ['completed', 'locked'],
    ]);
  });

  it('표현이 없는 노드는 열 수 없어서 길을 막는다', () => {
    expect(
      assignNodeStatuses(
        [
          {
            nodes: [
              { completed: false, expressionCount: 0 },
              { completed: false, expressionCount: 1 },
            ],
          },
        ],
        -1,
      ),
    ).toEqual([['locked', 'locked']]);
  });
});

describe('ExpressionRoadmapService — 주제 골라 넘어가기', () => {
  it('고른 적 없으면 첫 노드부터', async () => {
    const { service } = setup([], null);
    const { roadmap, map } = await statusMap(service);
    expect(map).toMatchObject({ n00: 'current', n01: 'locked', n20: 'locked' });
    expect(roadmap.continueNodeCode).toBe('n00');
  });

  it('주제 3을 고르면 거기 첫 노드가 current, 이어하기도 거기', async () => {
    const { service, updates, packs } = setup(['n00'], null);
    await service.focusTopic(USER, 'p2');
    expect(updates).toEqual([{ $set: { focusPackId: packs[2]._id } }]);
    const { roadmap, map } = await statusMap(service);
    expect(map).toMatchObject({
      n00: 'completed',
      n01: 'locked',
      n10: 'locked',
      n20: 'current',
      n21: 'locked',
    });
    expect(roadmap.continueNodeCode).toBe('n20');
  });

  it('고른 주제를 다 익히면 다음 주제로 이어진다', async () => {
    const { service } = setup(['n20', 'n21'], 2);
    const { map } = await statusMap(service);
    expect(map).toMatchObject({
      n00: 'locked',
      n20: 'completed',
      n30: 'current',
    });
  });

  it('고른 주제부터 끝까지 다 익혔으면 처음부터 남은 곳을 다시 연다', async () => {
    const { service } = setup(['n20', 'n21', 'n30', 'n31'], 2);
    const { roadmap, map } = await statusMap(service);
    expect(map).toMatchObject({
      n00: 'current',
      n20: 'completed',
      n31: 'completed',
    });
    expect(roadmap.continueNodeCode).toBe('n00');
  });

  it('없는 주제는 404', async () => {
    const { service } = setup([], null);
    await expect(service.focusTopic(USER, 'nope')).rejects.toThrow(
      'EXPRESSION_TOPIC_NOT_FOUND',
    );
  });
});

describe('ExpressionRoadmapService — 코스 분리', () => {
  it('영어 로드맵은 영어 주제만 읽고, 영어 focus는 한국어 focus를 보존한다', async () => {
    const koPack = {
      _id: new Types.ObjectId(),
      code: 'ko-pack',
      courseId: 'ko-general',
      targetLanguage: 'ko',
      order: 1,
      title: {},
      description: {},
      media: {},
    };
    const enPack = {
      _id: new Types.ObjectId(),
      code: 'en-pack',
      courseId: 'en-general',
      targetLanguage: 'en',
      order: 1,
      title: {},
      description: {},
      media: {},
    };
    const koNode = {
      _id: new Types.ObjectId(),
      packId: koPack._id,
      code: 'ko-node',
      order: 1,
      requiredExposures: 3,
      title: {},
      description: {},
      icon: 'x',
    };
    const enNode = {
      _id: new Types.ObjectId(),
      packId: enPack._id,
      code: 'en-node',
      order: 1,
      requiredExposures: 3,
      title: {},
      description: {},
      icon: 'x',
      proficiency: 'beginner',
    };
    const enExpression = { _id: new Types.ObjectId(), nodeId: enNode._id };
    const path = {
      focusPackId: koPack._id,
      courseFocusPackIds: {} as Record<string, Types.ObjectId>,
    };
    const isEnglish = (filter: unknown) =>
      JSON.stringify(filter).includes('"courseId":"en-general"');
    const service = new ExpressionRoadmapService(
      {
        find: (filter: unknown) =>
          chain(isEnglish(filter) ? [enPack] : [koPack]),
        findOne: (filter: unknown) =>
          chain(isEnglish(filter) ? enPack : koPack),
      } as never,
      {
        find: (filter: { packId: { $in: Types.ObjectId[] } }) =>
          chain(filter.packId.$in[0]?.equals(enPack._id) ? [enNode] : [koNode]),
      } as never,
      {
        find: (filter: unknown) =>
          chain(isEnglish(filter) ? [enExpression] : []),
      } as never,
      { find: () => chain([]) } as never,
      {
        findOne: () => chain(path),
        updateOne: (
          _filter: unknown,
          update: { $set: Record<string, Types.ObjectId> },
        ) => {
          path.courseFocusPackIds['en-general'] =
            update.$set['courseFocusPackIds.en-general'];
          return Promise.resolve();
        },
      } as never,
    );
    const en = { courseId: 'en-general', targetLanguage: 'en' };
    await service.focusTopic(USER, enPack.code, en);
    const roadmap = await service.getRoadmap(USER, 'ko', en);
    expect(roadmap.topics.map((topic) => topic.code)).toEqual(['en-pack']);
    expect(roadmap.continueNodeCode).toBe('en-node');
    expect(roadmap.topics[0]?.nodes[0]?.proficiency).toBe('beginner');
    expect(path.focusPackId).toEqual(koPack._id);
    expect(path.courseFocusPackIds['en-general']).toEqual(enPack._id);
  });
});
