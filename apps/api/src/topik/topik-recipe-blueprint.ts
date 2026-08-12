import { TopikSection } from './schemas/topik-content.schema';
import { TOPIK_READING_BLUEPRINT } from './topik-reading-blueprint';

export interface TopikRecipeBlueprintGroup {
  code: string;
  section: TopikSection;
  from: number;
  to: number;
}

const reading: TopikRecipeBlueprintGroup[] = TOPIK_READING_BLUEPRINT.map(
  ({ code, from, to }) => ({ code, section: TopikSection.READING, from, to }),
);

const listeningRanges: Array<[number, number]> = [
  [1, 2],
  [3, 3],
  [4, 8],
  [9, 12],
  [13, 13],
  [14, 14],
  [15, 15],
  [16, 16],
  [17, 19],
  [20, 20],
  [21, 22],
  [23, 24],
  [25, 26],
  [27, 28],
  [29, 30],
  [31, 32],
  [33, 34],
  [35, 36],
  [37, 38],
  [39, 40],
  [41, 42],
  [43, 44],
  [45, 46],
  [47, 48],
  [49, 50],
];

const listening: TopikRecipeBlueprintGroup[] = listeningRanges.map(
  ([from, to]) => ({
    code: `listening-${String(from).padStart(2, '0')}${
      to === from ? '' : `-${String(to).padStart(2, '0')}`
    }`,
    section: TopikSection.LISTENING,
    from,
    to,
  }),
);

const writing: TopikRecipeBlueprintGroup[] = [51, 52, 53, 54].map((number) => ({
  code: `writing-${number}`,
  section: TopikSection.WRITING,
  from: number,
  to: number,
}));

export const TOPIK_RECIPE_BLUEPRINTS: Record<
  TopikSection,
  TopikRecipeBlueprintGroup[]
> = {
  [TopikSection.READING]: reading,
  [TopikSection.LISTENING]: listening,
  [TopikSection.WRITING]: writing,
};

export const TOPIK_RECIPE_BLUEPRINT = [...reading, ...listening, ...writing];

export function recipeBlueprintFor(section?: string) {
  if (!section) return TOPIK_RECIPE_BLUEPRINTS[TopikSection.READING];
  if (!Object.values(TopikSection).includes(section as TopikSection)) return [];
  return TOPIK_RECIPE_BLUEPRINTS[section as TopikSection];
}
