import type { NormalizedWordSeed } from './word-seed.data';

interface ExistingWordSeed {
  code: string;
  targetLanguage?: string;
  headword: string;
  senseKey: string;
  partOfSpeech?: NormalizedWordSeed['partOfSpeech'];
  placements?: Array<{
    courseId?: string;
    section: number;
    unit: number;
    order: number;
    isCore: boolean;
  }>;
}

/** A course reseed must not erase another course's placement of the same word. */
export function wordSeedUpdate(
  word: NormalizedWordSeed,
  existing?: ExistingWordSeed | null,
) {
  if (
    existing &&
    ((existing.targetLanguage || 'ko') !== word.targetLanguage ||
      existing.headword !== word.headword ||
      existing.senseKey !== word.senseKey ||
      (existing.partOfSpeech !== undefined &&
        existing.partOfSpeech !== word.partOfSpeech))
  ) {
    throw new Error(
      `Refusing to reuse published word code ${word.code} for a different identity`,
    );
  }
  const courses = new Set(
    word.placements.map((placement) => placement.courseId),
  );
  const otherPlacements = (existing?.placements ?? []).filter(
    (placement) => !courses.has(placement.courseId || 'ko-general'),
  );
  return { ...word, placements: [...otherPlacements, ...word.placements] };
}

/** Filter placements in MongoDB at write time, so parallel course seeds cannot
 * overwrite each other's placement arrays between a read and an update. Literal
 * wrappers also prevent seed strings beginning with '$' becoming expressions.
 */
export function wordSeedUpdatePipeline(word: NormalizedWordSeed) {
  const courses = [
    ...new Set(word.placements.map((placement) => placement.courseId)),
  ];
  return [
    {
      $set: {
        ...Object.fromEntries(
          Object.entries(word as unknown as Record<string, unknown>).map(
            ([key, value]) => [key, { $literal: value }],
          ),
        ),
        placements: {
          $concatArrays: [
            {
              $filter: {
                input: { $ifNull: ['$placements', []] },
                as: 'placement',
                cond: {
                  $not: [
                    {
                      $in: [
                        { $ifNull: ['$$placement.courseId', 'ko-general'] },
                        courses,
                      ],
                    },
                  ],
                },
              },
            },
            { $literal: word.placements },
          ],
        },
      },
    },
  ];
}
