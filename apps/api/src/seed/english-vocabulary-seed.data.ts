import * as unit1 from './data/english-vocabulary/section1/unit1';
import * as unit2 from './data/english-vocabulary/section1/unit2';
import * as unit3 from './data/english-vocabulary/section1/unit3';
import * as unit4 from './data/english-vocabulary/section1/unit4';
import { WordPartOfSpeech } from '../words/schemas/word.schema';
import type {
  MultilingualWordSeedEntry,
  WordSeedSource,
} from './word-seed.types';

// Keep source content separate from registration. Adding another completed unit
// means importing its exports here; unpublished authoring files are never globbed.
export const ENGLISH_VOCABULARY_MODULES: ReadonlyArray<
  Record<string, unknown>
> = [unit1, unit2, unit3, unit4];

/**
 * These two source entries describe the same dictionary senses as their first
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
