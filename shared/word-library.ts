/** Additive wordbook contracts. Word IDs and user-word mastery remain canonical. */
export const WORD_COLLECTION_KINDS = [
  "course",
  "textbook",
  "exam",
  "level",
  "topic",
] as const;
export const WORD_COLLECTION_LEVELS = [
  "beginner",
  "intermediate",
  "advanced",
  "mixed",
] as const;
export const WORD_COLLECTION_COVERS = [
  "paper",
  "ink",
  "violet",
  "mist",
] as const;

export type WordCollectionKind = (typeof WORD_COLLECTION_KINDS)[number];
export type WordCollectionLevel = (typeof WORD_COLLECTION_LEVELS)[number];
export type WordCollectionCover = (typeof WORD_COLLECTION_COVERS)[number];

export interface WordCollectionCounts {
  words: number;
  new: number;
  learning: number;
  review: number;
  mastered: number;
  due: number;
}

/** A reading position is separate from mastery and from guided-path completion. */
export interface WordCollectionPosition {
  groupId: string;
  cardIndex: number;
  lastWordId: string | null;
}

export interface WordCollectionSummary extends WordCollectionCounts {
  id: string;
  code: string;
  courseId: string;
  targetLanguage: string;
  kind: WordCollectionKind;
  level: WordCollectionLevel;
  cover: WordCollectionCover;
  title: string;
  description: string;
  saved: boolean;
  groupCount: number;
  lastPosition: WordCollectionPosition | null;
}

export interface WordCollectionGroup extends WordCollectionCounts {
  id: string;
  title: string;
  order: number;
  /** Only the virtual original course has existing curriculum placements. */
  section?: number;
  unit?: number;
}

export interface WordCollectionDetail extends WordCollectionSummary {
  groups: WordCollectionGroup[];
}

/** Client-side navigation only. Do not add up group word counts: words overlap. */
export interface WordLibrarySection {
  section: number;
  groups: WordCollectionGroup[];
}

export function getWordCollectionSections(
  collection: WordCollectionDetail,
): WordLibrarySection[] {
  if (collection.kind !== "course" || !collection.id.startsWith("course-"))
    return [];
  const sections = new Map<number, WordCollectionGroup[]>();
  for (const group of collection.groups) {
    if (
      !group.words ||
      !Number.isInteger(group.section) ||
      !Number.isInteger(group.unit) ||
      (group.section ?? 0) < 1 ||
      (group.unit ?? 0) < 1
    )
      continue;
    const section = group.section!;
    const items = sections.get(section) ?? [];
    items.push(group);
    sections.set(section, items);
  }
  return [...sections.entries()]
    .sort(([a], [b]) => a - b)
    .map(([section, groups]) => ({
      section,
      groups: groups.sort(
        (a, b) => (a.unit ?? 0) - (b.unit ?? 0) || a.order - b.order,
      ),
    }));
}

export const WORD_COLLECTION_KIND_KEYS: Record<WordCollectionKind, string> = {
  course: "wordLibrary.kindCourse",
  textbook: "wordLibrary.kindTextbook",
  exam: "wordLibrary.kindExam",
  level: "wordLibrary.kindLevel",
  topic: "wordLibrary.kindTopic",
};

export const WORD_COLLECTION_LEVEL_KEYS: Record<WordCollectionLevel, string> = {
  beginner: "wordLibrary.levelBeginner",
  intermediate: "wordLibrary.levelIntermediate",
  advanced: "wordLibrary.levelAdvanced",
  mixed: "wordLibrary.levelMixed",
};

/** Use the real title/edition, rather than inventing a publisher's cover art. */
export function getWordCollectionCoverMark(
  book: Pick<
    WordCollectionSummary,
    "title" | "kind" | "level" | "targetLanguage"
  >,
): string {
  const title = book.title.normalize("NFKC").trim();
  const edition = title.match(/\b([1-9]\d?[a-c])\b/i)?.[1];
  if (edition) return edition.toUpperCase();
  if (book.kind === "exam") {
    const roman = title.match(/\b(I|II|III)\b/)?.[1];
    if (roman) return roman;
  }
  if (book.kind === "course") return book.targetLanguage === "en" ? "A" : "가";
  return Array.from(title.replace(/^KORIO[\s:·-]*/i, "").trim())[0] || "K";
}

export function filterWordCollections(
  items: readonly WordCollectionSummary[],
  options: {
    query?: string;
    kind?: WordCollectionKind | "all";
    level?: WordCollectionLevel | "all";
  } = {},
): WordCollectionSummary[] {
  const query = (options.query ?? "")
    .normalize("NFKC")
    .trim()
    .toLocaleLowerCase();
  return items.filter(
    (item) =>
      (!options.kind || options.kind === "all" || item.kind === options.kind) &&
      (!options.level ||
        options.level === "all" ||
        item.level === options.level) &&
      (!query ||
        `${item.title} ${item.description}`
          .normalize("NFKC")
          .toLocaleLowerCase()
          .includes(query)),
  );
}

export function getMyWordCollections(
  items: readonly WordCollectionSummary[],
): WordCollectionSummary[] {
  // The API handles implicit legacy-course membership. An explicit removal wins
  // over retained reading positions and mastery inherited from another book.
  return items.filter((item) => item.saved);
}

export function getDefaultWordCollectionGroup(
  collection: WordCollectionDetail,
  preferredGroupId?: string,
): WordCollectionGroup | undefined {
  const groups = collection.groups
    .filter((group) => group.words > 0)
    .sort((a, b) => a.order - b.order);
  return (
    groups.find((group) => group.id === preferredGroupId) ??
    groups.find((group) => group.id === collection.lastPosition?.groupId) ??
    groups.find((group) => group.learning + group.review > 0) ??
    groups.find((group) => group.mastered < group.words) ??
    groups[0]
  );
}

/** Prefer identity so reordering a wordbook does not silently resume another word. */
export function getResumeWordIndex(
  words: readonly { id: string }[],
  position:
    | Pick<WordCollectionPosition, "cardIndex" | "lastWordId">
    | null
    | undefined,
): number {
  if (!position || words.length === 0) return 0;
  const byId = position.lastWordId
    ? words.findIndex((word) => word.id === position.lastWordId)
    : -1;
  if (byId >= 0) return byId;
  const index = Number.isFinite(position.cardIndex)
    ? Math.floor(position.cardIndex)
    : 0;
  return Math.min(words.length - 1, Math.max(0, index));
}
