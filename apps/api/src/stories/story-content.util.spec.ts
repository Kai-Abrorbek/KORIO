import { ENGLISH_STORY_SEEDS } from '../seed/data/english-stories';
import {
  buildStoryDocument,
  isGeneratedAudioFresh,
  normalizeStoryToken,
  pickStoryTranslation,
  storyAudioKey,
  storyTextHash,
  tokenizeStoryText,
  validateStorySeeds,
  type GeneratedStoryAudio,
  type StorySeed,
} from './story-content.util';

const seed = (): StorySeed =>
  JSON.parse(JSON.stringify(ENGLISH_STORY_SEEDS[0])) as StorySeed;

/** 시드 본문과 1:1 로 맞는 가짜 타이밍 (단어 하나당 300ms) */
function fakeAudio(story: StorySeed): GeneratedStoryAudio {
  let cursor = 0;
  const textHash = storyTextHash(story);
  return {
    key: storyAudioKey(story.code, textHash),
    textHash,
    durationMs: 0,
    sentences: story.sentences.map((sentence) => {
      const words = tokenizeStoryText(sentence.text).map((text) => {
        const word = { text, startMs: cursor, endMs: cursor + 280 };
        cursor += 300;
        return word;
      });
      return {
        id: sentence.id,
        startMs: words[0].startMs,
        endMs: words[words.length - 1].endMs,
        words,
      };
    }),
  };
}

describe('story-content.util', () => {
  it('splits words exactly like the app does (punctuation stays attached)', () => {
    expect(tokenizeStoryText('He said, “Eat more,  Jasur!”')).toEqual([
      'He',
      'said,',
      '“Eat',
      'more,',
      'Jasur!”',
    ]);
    expect(normalizeStoryToken('“Brave”,')).toBe('brave');
    expect(normalizeStoryToken('o’clock.')).toBe("o'clock");
  });

  it('changes the audio key when the text or the narrator changes', () => {
    const base = seed();
    const edited = seed();
    edited.sentences[0].text = 'Hello there, everyone.';
    const revoiced = seed();
    revoiced.narrator.id = 'aziz';

    expect(storyTextHash(edited)).not.toBe(storyTextHash(base));
    expect(storyTextHash(revoiced)).not.toBe(storyTextHash(base));
    // 번역만 바꾸면 오디오는 그대로 쓸 수 있다
    const retranslated = seed();
    retranslated.sentences[0].translation.uz = 'Salom!';
    expect(storyTextHash(retranslated)).toBe(storyTextHash(base));
  });

  it('applies timings only while the audio still matches the text', () => {
    const story = seed();
    const audio = fakeAudio(story);
    const doc = buildStoryDocument(story, audio);
    expect(doc.audio.key).toBe(audio.key);
    expect(doc.sentences[1].words).toHaveLength(
      tokenizeStoryText(story.sentences[1].text).length,
    );

    const edited = seed();
    edited.sentences[2].text += ' Really.';
    expect(isGeneratedAudioFresh(edited, audio)).toBe(false);
    const stale = buildStoryDocument(edited, audio);
    expect(stale.audio.key).toBe('');
    expect(stale.sentences.every((s) => s.words.length === 0)).toBe(true);
  });

  it('falls back to Uzbek for the target language itself', () => {
    const t = { uz: 'kuz', ru: 'осень', ko: '가을' };
    expect(pickStoryTranslation(t, 'ru')).toBe('осень');
    expect(pickStoryTranslation(t, 'en')).toBe('kuz');
    expect(pickStoryTranslation({ uz: 'kuz', ru: '', ko: '' }, 'ko')).toBe(
      'kuz',
    );
  });

  it('keeps every shipped story valid', () => {
    const report = validateStorySeeds(ENGLISH_STORY_SEEDS, {}, () => true);
    expect(report.errors).toEqual([]);
    expect(ENGLISH_STORY_SEEDS).toHaveLength(12);
  });

  it('flags vocabulary that is missing from the text and stale audio', () => {
    const story = seed();
    story.vocabulary.push({
      word: 'winter',
      meaning: { uz: 'qish', ru: 'зима', ko: '겨울' },
    });
    const audio = fakeAudio(seed());
    story.sentences[0].text = 'Hi, everyone.';
    const report = validateStorySeeds(
      [story],
      { [story.code]: audio },
      () => true,
    );
    expect(report.errors.join('\n')).toContain('"winter"');
    expect(report.errors.join('\n')).toContain('오디오가 옛날 것');
  });
});
