import { LessonStreamParser } from './lesson-stream';

function run(deltas: string[]) {
  const parser = new LessonStreamParser();
  const spoken = deltas.map((delta) => parser.push(delta)).join('') + parser.finish();
  return { parser, spoken };
}

describe('LessonStreamParser', () => {
  it('reads a header split across deltas and streams the rest as speech', () => {
    const { parser, spoken } = run([
      '@me',
      'ta {"emotion":"disbelief","intensity":0.95,',
      '"correction":{"original":"배구리","corrected":"배고파"}}\nAHHHH!!! ',
      '배구리?! 배고파!',
    ]);
    expect(parser.metadata.emotion).toBe('disbelief');
    expect(parser.metadata.correction).toEqual({
      original: '배구리',
      corrected: '배고파',
    });
    expect(spoken).toBe('AHHHH!!! 배구리?! 배고파!');
    expect(parser.text).toBe('AHHHH!!! 배구리?! 배고파!');
  });

  it('speaks everything when the model skips the header', () => {
    const { parser, spoken } = run(['야아아! ', '다시 말해 봐.']);
    expect(parser.metadata).toEqual({});
    expect(spoken).toBe('야아아! 다시 말해 봐.');
  });

  it('survives a broken header line without losing the reply', () => {
    const { parser, spoken } = run(['@meta {not json\n', '좋아, 다시!']);
    expect(parser.metadata).toEqual({});
    expect(spoken).toBe('좋아, 다시!');
  });

  it('strips markdown emphasis from speech', () => {
    const { spoken } = run(['**배고파**, 배고파!']);
    expect(spoken).toBe('배고파, 배고파!');
  });
});
