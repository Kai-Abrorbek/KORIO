import * as unit1 from './data/english-vocabulary/section1/unit1';
import * as unit2 from './data/english-vocabulary/section1/unit2';
import * as unit3 from './data/english-vocabulary/section1/unit3';
import * as unit4 from './data/english-vocabulary/section1/unit4';
import * as unit5 from './data/english-vocabulary/section1/unit5';
import * as unit6 from './data/english-vocabulary/section1/unit6';
import * as unit7 from './data/english-vocabulary/section1/unit7';
import * as unit8 from './data/english-vocabulary/section1/unit8';
import * as unit9 from './data/english-vocabulary/section1/unit9';
import * as unit10 from './data/english-vocabulary/section1/unit10';
import { WordPartOfSpeech } from '../words/schemas/word.schema';
import type {
  MultilingualWordSeedEntry,
  WordSeedSource,
} from './word-seed.types';

// Keep source content separate from registration. Adding another completed unit
// means importing its exports here; unpublished authoring files are never globbed.
export const ENGLISH_VOCABULARY_MODULES: ReadonlyArray<
  Record<string, unknown>
> = [unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8, unit9, unit10];

/**
 * These source entries describe the same dictionary senses as their first
 * occurrences (including translations/examples), but use a paraphrased senseKey.
 * Match the exact old identity, not just code, so a future incompatible reuse
 * still fails the normalizer. Do not rewrite the author's original files.
 */
const ENGLISH_SENSE_ALIASES = [
  {
    code: 'en-verb-study',
    headword: 'study',
    partOfSpeech: WordPartOfSpeech.VERB,
    from: 'learn-subject',
    to: 'learn',
  },
  {
    code: 'en-event-conference',
    headword: 'conference',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'large-work-meeting',
    to: 'formal-meeting',
  },
  {
    code: 'en-noun-address',
    headword: 'address',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'place-location-information',
    to: 'home-address',
  },
  {
    code: 'en-job-doctor',
    headword: 'doctor',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'person-who-treats-ill-people',
    to: 'medical-doctor',
  },
  {
    code: 'en-job-engineer',
    headword: 'engineer',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'person-designing-or-building-technical-things',
    to: 'technical-worker',
  },
  {
    code: 'en-job-engineer',
    headword: 'engineer',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'person-designing-or-building-machines-structures',
    to: 'technical-worker',
  },
  {
    code: 'en-job-waiter',
    headword: 'waiter',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'man-serving-food-in-restaurant',
    to: 'restaurant-server',
  },
  {
    code: 'en-adjective-expensive',
    headword: 'expensive',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    from: 'costing-lot-of-money',
    to: 'costs-a-lot',
  },
  {
    code: 'en-home-garden',
    headword: 'garden',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'area-outside-house-with-plants',
    to: 'home-garden',
  },
  {
    code: 'en-job-musician',
    headword: 'musician',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'person-who-plays-or-writes-music',
    to: 'music-profession',
  },
  {
    code: 'en-person-musician',
    headword: 'musician',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'person-who-plays-or-writes-music',
    to: 'music-profession',
  },
  {
    code: 'en-job-artist',
    headword: 'artist',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'person-who-creates-art',
    to: 'visual-artist',
  },
  {
    code: 'en-adjective-hard',
    headword: 'hard',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    from: 'difficult-to-do',
    to: 'difficult',
  },
  {
    code: 'en-adjective-lovely',
    headword: 'lovely',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    from: 'very-pleasant',
    to: 'very-nice',
  },
  {
    code: 'en-family-husband',
    headword: 'husband',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'married-man-in-couple',
    to: 'married-man',
  },
  {
    code: 'en-verb-collect',
    headword: 'collect',
    partOfSpeech: WordPartOfSpeech.VERB,
    from: 'bring-things-together',
    to: 'bring-together-as-hobby',
  },
  {
    code: 'en-verb-play',
    headword: 'play',
    partOfSpeech: WordPartOfSpeech.VERB,
    from: 'perform-music-or-sport',
    to: 'sport-or-instrument',
  },
  {
    code: 'en-verb-teach',
    headword: 'teach',
    partOfSpeech: WordPartOfSpeech.VERB,
    from: 'help-someone-learn',
    to: 'help-people-learn',
  },
  {
    code: 'en-adverb-abroad',
    headword: 'abroad',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    from: 'in-or-to-another-country',
    to: 'in-another-country',
  },
  {
    code: 'en-adjective-unusual',
    headword: 'unusual',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    from: 'different-from-what-is-normal',
    to: 'not-common',
  },
  {
    code: 'en-noun-machine',
    headword: 'machine',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'device-that-does-work',
    to: 'mechanical-device',
  },
  {
    code: 'en-adjective-busy',
    headword: 'busy',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    from: 'having-much-to-do',
    to: 'having-things-to-do',
  },
  {
    code: 'en-place-cinema',
    headword: 'cinema',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'place-for-watching-films',
    to: 'movie-theatre',
  },
  {
    code: 'en-place-theatre',
    headword: 'theatre',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'place-for-live-performances',
    to: 'live-performance-building',
  },
  {
    code: 'en-person-tourist',
    headword: 'tourist',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'person-visiting-place-for-holiday',
    to: 'person-travelling-for-pleasure',
  },
  {
    code: 'en-noun-problem',
    headword: 'problem',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'difficulty-that-needs-solution',
    to: 'difficulty-needing-solution',
  },
  {
    code: 'en-job-scientist',
    headword: 'scientist',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'person-who-studies-science',
    to: 'person-working-in-science',
  },
  {
    code: 'en-noun-flight',
    headword: 'flight',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'journey-by-aircraft',
    to: 'journey-through-air',
  },
  {
    code: 'en-person-friend',
    headword: 'friend',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'person-you-know-and-like',
    to: 'person-you-like',
  },
  {
    code: 'en-adjective-beautiful',
    headword: 'beautiful',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    from: 'very-attractive-or-pleasant',
    to: 'very-attractive',
  },
  {
    code: 'en-adjective-expensive',
    headword: 'expensive',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    from: 'costing-a-lot-of-money',
    to: 'costs-a-lot',
  },
  {
    code: 'en-adjective-favourite',
    headword: 'favourite',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    from: 'liked-more-than-others',
    to: 'liked-most',
  },
  {
    code: 'en-adverb-together',
    headword: 'together',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    from: 'with-another-person-or-people',
    to: 'with-each-other',
  },
  {
    code: 'en-noun-sea',
    headword: 'sea',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'large-salt-water',
    to: 'large-area-of-salt-water',
  },
  {
    code: 'en-noun-song',
    headword: 'song',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'piece-of-music-with-words',
    to: 'short-piece-of-music-with-words',
  },
  {
    code: 'en-noun-coffee',
    headword: 'coffee',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'hot-drink-made-from-coffee-beans',
    to: 'drink-made-from-coffee-beans',
  },
  {
    code: 'en-job-waiter',
    headword: 'waiter',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'person-serving-food-in-restaurant',
    to: 'restaurant-server',
  },
  {
    code: 'en-noun-bill',
    headword: 'bill',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'written-amount-to-pay-for-meal',
    to: 'written-amount-to-pay',
  },
  {
    code: 'en-noun-machine',
    headword: 'machine',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'piece-of-equipment-using-power',
    to: 'mechanical-device',
  },
  {
    code: 'en-noun-bag',
    headword: 'bag',
    partOfSpeech: WordPartOfSpeech.NOUN,
    from: 'container-made-of-paper-cloth-or-plastic',
    to: 'container-for-carrying-things',
  },
] as const;

export function adaptEnglishWordSeed(
  entry: MultilingualWordSeedEntry,
): MultilingualWordSeedEntry {
  const alias = ENGLISH_SENSE_ALIASES.find(
    (item) =>
      item.code === entry.code &&
      item.headword === (entry.headword || entry.english) &&
      item.partOfSpeech === entry.partOfSpeech &&
      item.from === entry.senseKey,
  );
  return alias ? { ...entry, senseKey: alias.to } : entry;
}

export function buildEnglishWordSources(): WordSeedSource[] {
  const sources: WordSeedSource[] = [];
  const offsets = new Map<string, number>();
  for (const data of ENGLISH_VOCABULARY_MODULES) {
    const arrays = Object.entries(data)
      .filter(([name]) => /^EN_S\d+_UNIT\d+_NODE\d+_WORDS$/.test(name))
      .sort(([a], [b]) => a.localeCompare(b, 'en', { numeric: true }));
    for (const [name, entries] of arrays) {
      const match = /^EN_S(\d+)_UNIT(\d+)_NODE\d+_WORDS$/.exec(name)!;
      if (!Array.isArray(entries)) throw new Error(`${name} must be an array`);
      const unitKey = `${match[1]}:${match[2]}`;
      const orderOffset = offsets.get(unitKey) ?? 0;
      sources.push({
        courseId: 'en-general',
        targetLanguage: 'en',
        section: Number(match[1]),
        unit: Number(match[2]),
        orderOffset,
        words: (entries as MultilingualWordSeedEntry[]).map(
          adaptEnglishWordSeed,
        ),
      });
      offsets.set(unitKey, orderOffset + entries.length);
    }
  }
  return sources;
}
