import { Types } from 'mongoose';
import {
  buildJumpNodeFilter,
  buildJumpQuestionFilter,
  normalizeJumpTestCategory,
} from './jump-test.util';

describe('jump-test filters', () => {
  it('keeps legacy requests on vocabulary and accepts grammar explicitly', () => {
    expect(normalizeJumpTestCategory()).toBe('vocabulary');
    expect(normalizeJumpTestCategory('')).toBe('vocabulary');
    expect(normalizeJumpTestCategory('vocabulary')).toBe('vocabulary');
    expect(normalizeJumpTestCategory('grammar')).toBe('grammar');
    expect(normalizeJumpTestCategory('expression')).toBeNull();
  });

  it('limits grammar nodes to the same track before the jump target', () => {
    expect(buildJumpNodeFilter(2, 3, 'grammar')).toEqual({
      isActive: true,
      category: 'grammar',
      $and: [
        {
          $or: [{ section: { $lt: 2 } }, { section: 2, unit: { $lt: 3 } }],
        },
      ],
    });
  });

  it('keeps vocabulary compatible with legacy nodes without mixing grammar', () => {
    expect(buildJumpNodeFilter(2, 3, 'vocabulary')).toEqual({
      isActive: true,
      $or: [
        { category: { $exists: false } },
        { category: null },
        { category: 'vocabulary' },
      ],
      $and: [
        {
          $or: [{ section: { $lt: 2 } }, { section: 2, unit: { $lt: 3 } }],
        },
      ],
    });
  });

  it('uses only dedicated grammar question types for grammar jumps', () => {
    const id = new Types.ObjectId();
    expect(buildJumpQuestionFilter([id], 'grammar')).toEqual({
      _id: { $in: [id] },
      isActive: true,
      type: { $in: ['grammar_blank', 'grammar_build'] },
      lessonCategory: 'grammar',
    });
  });

  it('continues excluding grammar questions from vocabulary jumps', () => {
    const id = new Types.ObjectId();
    expect(buildJumpQuestionFilter([id], 'vocabulary')).toEqual({
      _id: { $in: [id] },
      isActive: true,
      type: { $nin: ['grammar_blank', 'grammar_build'] },
      lessonCategory: { $ne: 'grammar' },
    });
  });
});
