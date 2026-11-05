import { STORY_SEED_SETS } from '../seed/data/stories';
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
  type StorySeedSet,
} from './story-content.util';
import { STORY_COURSES, storyCourseOf } from './story-courses';

const EN = storyCourseOf('en-general')!;
const enSet = () =>
  STORY_SEED_SETS.find((set) => set.courseId === 'en-general')!;
const seed = (): StorySeed =>
  JSON.parse(JSON.stringify(enSet().stories[0])) as StorySeed;
const asSet = (...stories: StorySeed[]): StorySeedSet[] => [
  { courseId: 'en-general', stories },
];

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

  it('keeps non-Latin letters so other languages can mark key words', () => {
    expect(normalizeStoryToken('«Привет!»')).toBe('привет');
    expect(normalizeStoryToken('“학교에서,”')).toBe('학교에서');
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
    const doc = buildStoryDocument(EN, story, audio);
    expect(doc.courseId).toBe('en-general');
    expect(doc.targetLanguage).toBe('en');
    expect(doc.audio.key).toBe(audio.key);
    expect(doc.sentences[1].words).toHaveLength(
      tokenizeStoryText(story.sentences[1].text).length,
    );

    const edited = seed();
    edited.sentences[2].text += ' Really.';
    expect(isGeneratedAudioFresh(edited, audio)).toBe(false);
    const stale = buildStoryDocument(EN, edited, audio);
    expect(stale.audio.key).toBe('');
    expect(stale.sentences.every((s) => s.words.length === 0)).toBe(true);
  });

  it('falls back to the course default when asked in the target language', () => {
    const t = { uz: 'kuz', ru: 'осень', ko: '가을' };
    expect(pickStoryTranslation(t, 'ru', 'en-general')).toBe('осень');
    expect(pickStoryTranslation(t, 'en', 'en-general')).toBe('kuz');
    expect(pickStoryTranslation({ uz: 'kuz', ru: '', ko: '' }, 'ko')).toBe(
      'kuz',
    );
  });

  it('keeps every shipped story valid', () => {
    const report = validateStorySeeds(STORY_SEED_SETS, {}, () => true);
    expect(report.errors).toEqual([]);
    // 레벨 탭마다 10편
    for (const level of EN.levels) {
      expect(
        enSet().stories.filter((story) => story.level === level.key),
      ).toHaveLength(10);
    }
  });

  it('lists CEFR tabs up to C1 even before their stories exist', () => {
    expect(EN.levels.map((level) => level.key)).toEqual([
      'A1',
      'A2',
      'B1',
      'B1+',
      'B2',
      'C1',
    ]);
    for (const course of STORY_COURSES) {
      for (const level of course.levels) {
        expect(Object.values(level.label).every((label) => !!label)).toBe(true);
      }
    }
  });

  it('checks the level against the course and the code against the level', () => {
    const plus = seed();
    plus.level = 'B1+';
    plus.code = 'en-story-b1p-01';
    expect(validateStorySeeds(asSet(plus), {}, () => true).errors).toEqual([]);

    const wrongCode = seed();
    wrongCode.level = 'B1+';
    wrongCode.code = 'en-story-b1+-01';
    expect(
      validateStorySeeds(asSet(wrongCode), {}, () => true).errors.join('\n'),
    ).toContain('en-story-b1p-');

    const unknown = seed();
    unknown.level = 'C2';
    expect(
      validateStorySeeds(asSet(unknown), {}, () => true).errors.join('\n'),
    ).toContain('없는 레벨 C2');

    expect(
      validateStorySeeds(
        [{ courseId: 'ja-general', stories: [seed()] }],
        {},
        () => true,
      ).errors.join('\n'),
    ).toContain('없는 코스');
  });

  it('requires only the translations the course asks for', () => {
    const story = seed();
    delete story.sentences[0].translation.ko;
    expect(
      validateStorySeeds(asSet(story), {}, () => true).errors.join('\n'),
    ).toContain('s1 번역 ko');
    // 원문 언어(en) 칸은 비어 있어도 된다
    expect(story.sentences[1].translation.en).toBeUndefined();
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
      asSet(story),
      { [story.code]: audio },
      () => true,
    );
    expect(report.errors.join('\n')).toContain('"winter"');
    expect(report.errors.join('\n')).toContain('오디오가 옛날 것');
  });
});
