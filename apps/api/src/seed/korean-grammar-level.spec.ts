import {
  koreanGrammarLevelForSection,
  normalizeKoreanGrammarTrackLevels,
} from './data/grammar-track/levels';

describe('Korean grammar level mapping', () => {
  it.each([
    [1, '1'],
    [2, '1'],
    [3, '2'],
    [4, '2'],
    [5, '3'],
    [6, '3'],
    [7, '4'],
    [8, '4'],
    [9, '5'],
    [10, '5'],
    [11, '6'],
    [12, '6'],
  ] as const)('maps Section %i to Level %s', (section, level) => {
    expect(koreanGrammarLevelForSection(section)).toBe(level);
  });

  it.each([0, 1.5, 13])('rejects unsupported Section %s', (section) => {
    expect(() => koreanGrammarLevelForSection(section)).toThrow(
      'integer from 1 to 12',
    );
  });

  it('normalizes lesson and question levels without changing codes', () => {
    const sourceNodes = [
      {
        section: 1,
        code: 'node-1',
        lessons: [{ level: '6', questions: ['q1', 'q2'] }],
      },
      {
        section: 6,
        code: 'node-6',
        lessons: [{ level: '6', questions: ['q3'] }],
      },
    ];
    const sourceQuestions = {
      q1: { level: '6', answer: 'one' },
      q2: { level: '6', answer: 'two' },
      q3: { level: '6', answer: 'three' },
    };

    const normalized = normalizeKoreanGrammarTrackLevels(
      sourceNodes,
      sourceQuestions,
    );

    expect(normalized.nodes.map((node) => String(node.code))).toEqual([
      'node-1',
      'node-6',
    ]);
    expect(normalized.nodes[0].lessons[0].level).toBe('1');
    expect(normalized.nodes[1].lessons[0].level).toBe('3');
    expect(normalized.questions.q1.level).toBe('1');
    expect(normalized.questions.q2.level).toBe('1');
    expect(normalized.questions.q3.level).toBe('3');
    expect(Object.keys(normalized.questions)).toEqual(['q1', 'q2', 'q3']);
    expect(sourceNodes[0].lessons[0].level).toBe('6');
    expect(sourceQuestions.q1.level).toBe('6');
  });

  it('rejects missing, duplicated, and unassigned question codes', () => {
    expect(() =>
      normalizeKoreanGrammarTrackLevels(
        [{ section: 1, lessons: [{ level: '1', questions: ['missing'] }] }],
        {},
      ),
    ).toThrow('missing question');

    expect(() =>
      normalizeKoreanGrammarTrackLevels(
        [
          {
            section: 1,
            lessons: [
              { level: '1', questions: ['q1'] },
              { level: '1', questions: ['q1'] },
            ],
          },
        ],
        { q1: { level: '1' } },
      ),
    ).toThrow('assigned more than once');

    expect(() =>
      normalizeKoreanGrammarTrackLevels(
        [{ section: 1, lessons: [{ level: '1', questions: ['q1'] }] }],
        { q1: { level: '1' }, q2: { level: '1' } },
      ),
    ).toThrow('not assigned to lessons');
  });
});
