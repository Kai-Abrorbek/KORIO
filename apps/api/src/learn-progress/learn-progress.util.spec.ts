import {
  measure,
  pickExpressionTopic,
  pickGrammarSection,
  speakingDone,
  sumRoadmapLessons,
  toPercent,
} from './learn-progress.util';
import { courseOf, resolveLearnCourse } from '../users/learn-mode.constants';

describe('toPercent', () => {
  it('끝내야만 100', () => {
    expect(toPercent(39, 40)).toBe(97);
    expect(toPercent(40, 40)).toBe(100);
    expect(toPercent(0, 40)).toBe(0);
    expect(toPercent(5, 0)).toBe(0);
    expect(toPercent(50, 40)).toBe(100);
  });
});

describe('measure', () => {
  it('콘텐츠가 없으면 null', () => {
    expect(measure('section', 1, 'lesson', 0, 0)).toBeNull();
  });

  it('done 을 total 안으로 자른다', () => {
    expect(measure('section', 2, 'lesson', 12, 40)).toEqual({
      scope: 'section',
      scopeNumber: 2,
      title: null,
      unit: 'lesson',
      done: 12,
      total: 40,
      percent: 30,
    });
    expect(measure('level', 1, 'day', 9, 4)?.done).toBe(4);
  });
});

describe('sumRoadmapLessons', () => {
  it('지금 섹션 노드의 레슨을 더한다', () => {
    expect(
      sumRoadmapLessons([
        {
          nodes: [
            { completedLessons: 1, totalLessons: 1 },
            { completedLessons: 4, totalLessons: 4 },
          ],
        },
        {
          nodes: [
            { completedLessons: 2, totalLessons: 5 },
            { completedLessons: 0, totalLessons: 0 },
          ],
        },
      ]),
    ).toEqual({ done: 7, total: 10 });
  });
});

describe('pickGrammarSection', () => {
  const rows = [
    { code: 'a1', section: 1 },
    { code: 'a2', section: 1 },
    { code: 'b1', section: 2 },
    { code: 'b2', section: 2 },
    { code: 'c1', section: 3 },
  ];

  it('아무것도 안 했으면 첫 섹션', () => {
    expect(pickGrammarSection(rows, [])).toEqual({
      section: 1,
      done: 0,
      total: 2,
    });
  });

  it('마지막으로 끝낸 문법의 섹션 — 앞 섹션이 비어 있어도', () => {
    expect(pickGrammarSection(rows, ['b1'])).toEqual({
      section: 2,
      done: 1,
      total: 2,
    });
  });

  it('그 섹션을 다 끝냈으면 다음 미완료 섹션', () => {
    expect(pickGrammarSection(rows, ['b1', 'b2'])).toEqual({
      section: 3,
      done: 0,
      total: 1,
    });
  });

  it('뒤가 다 끝났으면 앞쪽 미완료 섹션', () => {
    expect(pickGrammarSection(rows, ['b1', 'b2', 'c1'])).toEqual({
      section: 1,
      done: 0,
      total: 2,
    });
  });

  it('전부 끝냈으면 마지막 섹션 100%', () => {
    expect(pickGrammarSection(rows, ['a1', 'a2', 'b1', 'b2', 'c1'])).toEqual({
      section: 3,
      done: 1,
      total: 1,
    });
  });

  it('지워진 문법 코드는 무시', () => {
    expect(pickGrammarSection(rows, ['b1', 'gone'])).toEqual({
      section: 2,
      done: 1,
      total: 2,
    });
  });
});

describe('speakingDone', () => {
  it('커서 위치만큼', () => {
    expect(speakingDone({ index: 3, completedCount: 0 }, 12)).toBe(3);
  });
  it('끝내서 커서가 0 으로 돌아갔으면 다 한 것', () => {
    expect(speakingDone({ index: 0, completedCount: 1 }, 12)).toBe(12);
  });
  it('시작 안 했으면 0', () => {
    expect(speakingDone(null, 12)).toBe(0);
    expect(speakingDone({ index: 0, completedCount: 0 }, 12)).toBe(0);
  });
  it('시드가 줄었으면 자른다', () => {
    expect(speakingDone({ index: 20, completedCount: 0 }, 12)).toBe(12);
  });
});

describe('pickExpressionTopic', () => {
  const node = (
    code: string,
    learned: number,
    count: number,
    seen: number,
  ) => ({
    code,
    expressionCount: count,
    learnedExpressionCount: learned,
    completedExposures: seen,
    totalExposures: count * 3,
  });
  const topics = [
    { title: 'Salom', nodes: [node('s1', 4, 4, 12)] },
    { title: 'Kafe', nodes: [node('k1', 0, 6, 6), node('k2', 0, 6, 0)] },
  ];

  it('이어서 할 노드가 있는 주제, 링은 노출로', () => {
    expect(pickExpressionTopic(topics, 'k1')).toEqual({
      index: 1,
      title: 'Kafe',
      learned: 0,
      total: 12,
      percent: 16,
    });
  });

  it('노드를 못 찾으면 첫 주제', () => {
    expect(pickExpressionTopic(topics, null)?.index).toBe(0);
  });

  it('다 익혀야 100 — 노출만 다 찼으면 99', () => {
    const full = [{ title: 'X', nodes: [{ ...node('x', 5, 6, 18) }] }];
    expect(pickExpressionTopic(full, 'x')?.percent).toBe(99);
    const done = [{ title: 'X', nodes: [node('x', 6, 6, 18)] }];
    expect(pickExpressionTopic(done, 'x')?.percent).toBe(100);
  });
});

describe('학습 코스', () => {
  it('targetLanguage → 코스 (모르면 한국어)', () => {
    expect(courseOf('korean')).toBe('ko');
    expect(courseOf('English')).toBe('en');
    expect(courseOf('en')).toBe('en');
    expect(courseOf(undefined)).toBe('ko');
    expect(courseOf('japanese')).toBe('ko');
  });

  it('앱이 코스를 보내면 그 코스 — 그 코스에 없는 모드면 null', () => {
    expect(resolveLearnCourse('alphabet', 'ko', 'en')).toBe('en');
    expect(resolveLearnCourse('topik', 'ko', 'en')).toBeNull();
  });

  it('예전 앱(코스 없음): 지금 코스에 있으면 유지, 없으면 그 모드를 가진 코스', () => {
    expect(resolveLearnCourse('expression', 'ko')).toBe('ko');
    expect(resolveLearnCourse('vocabulary', 'en')).toBe('en');
    expect(resolveLearnCourse('vocabulary', 'en', 'ko')).toBe('ko');
    expect(resolveLearnCourse('alphabet', 'ko')).toBe('en');
  });
});
