import {
  jumpCrossesSection,
  trackNodeFilter,
  trackOfNode,
} from './section-up.util';

describe('section-up', () => {
  it('노드 카테고리 → 트랙 (어휘는 옛 노드 포함, 그 외 카테고리는 섹션 연출 없음)', () => {
    expect(trackOfNode(undefined)).toBe('vocabulary');
    expect(trackOfNode(null)).toBe('vocabulary');
    expect(trackOfNode('vocabulary')).toBe('vocabulary');
    expect(trackOfNode('grammar')).toBe('grammar');
    expect(trackOfNode('expression')).toBeNull();
  });

  it('트랙 필터는 로드맵과 같다', () => {
    expect(trackNodeFilter('grammar')).toEqual({ category: 'grammar' });
    expect(trackNodeFilter('vocabulary')).toEqual({
      $or: [
        { category: { $exists: false } },
        { category: null },
        { category: 'vocabulary' },
      ],
    });
  });

  describe('jumpCrossesSection', () => {
    const nodes = [
      { section: 1, lessonIds: ['a', 'b'] },
      { section: 2, lessonIds: ['c', 'd'] },
      { section: 2, lessonIds: ['e'] },
      { section: 3, lessonIds: ['f'] },
    ];

    it('앞 섹션을 덜 끝낸 채 합격 → 넘었다 (어디서 넘어왔는지)', () => {
      expect(jumpCrossesSection(nodes, new Set(['a', 'b']), 3, 1)).toBe(2);
      expect(jumpCrossesSection(nodes, new Set(), 3, 1)).toBe(1);
    });

    it('같은 섹션 안 유닛 점프는 아니다', () => {
      // 목표가 섹션 2 안쪽 — 섹션 1 은 다 끝냈고 섹션 2 앞부분만 덜 끝남
      expect(jumpCrossesSection(nodes, new Set(['a', 'b']), 2, 1)).toBeNull();
    });

    it('앞을 다 끝냈으면 아니다', () => {
      expect(
        jumpCrossesSection(nodes, new Set(['a', 'b', 'c', 'd', 'e']), 3, 1),
      ).toBeNull();
    });

    it('배치 시험으로 건너뛴 섹션은 끝낸 걸로 친다', () => {
      // 2급으로 배치(섹션 3부터) — 섹션 1·2 는 안 풀었어도 섹션 3 안 점프는 섹션을 넘은 게 아니다
      expect(jumpCrossesSection(nodes, new Set(), 3, 3)).toBeNull();
      expect(jumpCrossesSection(nodes, new Set(), 4, 3)).toBe(3);
    });
  });
});
