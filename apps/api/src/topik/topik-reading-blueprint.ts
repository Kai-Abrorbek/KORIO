import {
  TopikQuestionType,
  TopikStimulusKind,
} from './schemas/topik-content.schema';

export enum TopikStimulusScope {
  NONE = 'none',
  QUESTION = 'question',
  GROUP = 'group',
}

export interface TopikReadingBlueprintGroup {
  code: string;
  from: number;
  to: number;
  questionTypes: TopikQuestionType[];
  stimulusScope: TopikStimulusScope;
  stimulusKinds?: TopikStimulusKind[];
  groupStimulusKind?: TopikStimulusKind;
}

export const TOPIK_READING_BLUEPRINT: TopikReadingBlueprintGroup[] = [
  {
    code: 'reading-01-02',
    from: 1,
    to: 2,
    questionTypes: [
      TopikQuestionType.GRAMMAR_FILL_BLANK,
      TopikQuestionType.GRAMMAR_FILL_BLANK,
    ],
    stimulusScope: TopikStimulusScope.NONE,
  },
  {
    code: 'reading-03-04',
    from: 3,
    to: 4,
    questionTypes: [
      TopikQuestionType.UNDERLINED_MEANING,
      TopikQuestionType.UNDERLINED_MEANING,
    ],
    stimulusScope: TopikStimulusScope.NONE,
  },
  {
    code: 'reading-05-08',
    from: 5,
    to: 8,
    questionTypes: Array(4).fill(TopikQuestionType.PRACTICAL_TEXT_TOPIC),
    stimulusScope: TopikStimulusScope.QUESTION,
    stimulusKinds: [
      TopikStimulusKind.ADVERTISEMENT,
      TopikStimulusKind.ADVERTISEMENT,
      TopikStimulusKind.ADVERTISEMENT,
      TopikStimulusKind.NOTICE,
    ],
  },
  {
    code: 'reading-09-12',
    from: 9,
    to: 12,
    questionTypes: Array(4).fill(TopikQuestionType.PASSAGE_CONTENT_MATCH),
    stimulusScope: TopikStimulusScope.QUESTION,
    stimulusKinds: [
      TopikStimulusKind.INFO_CARD,
      TopikStimulusKind.CHART,
      TopikStimulusKind.PASSAGE,
      TopikStimulusKind.PASSAGE,
    ],
  },
  {
    code: 'reading-13-15',
    from: 13,
    to: 15,
    questionTypes: Array(3).fill(TopikQuestionType.SENTENCE_ORDERING),
    stimulusScope: TopikStimulusScope.QUESTION,
    stimulusKinds: Array(3).fill(TopikStimulusKind.SENTENCE_SET),
  },
  {
    code: 'reading-16-18',
    from: 16,
    to: 18,
    questionTypes: Array(3).fill(TopikQuestionType.PASSAGE_FILL_BLANK),
    stimulusScope: TopikStimulusScope.QUESTION,
    stimulusKinds: Array(3).fill(TopikStimulusKind.PASSAGE),
  },
  {
    code: 'reading-19-20',
    from: 19,
    to: 20,
    questionTypes: [
      TopikQuestionType.PASSAGE_FILL_BLANK,
      TopikQuestionType.PASSAGE_TOPIC,
    ],
    stimulusScope: TopikStimulusScope.GROUP,
    groupStimulusKind: TopikStimulusKind.PASSAGE,
  },
  {
    code: 'reading-21-22',
    from: 21,
    to: 22,
    questionTypes: [
      TopikQuestionType.PASSAGE_FILL_BLANK,
      TopikQuestionType.PASSAGE_CONTENT_MATCH,
    ],
    stimulusScope: TopikStimulusScope.GROUP,
    groupStimulusKind: TopikStimulusKind.PASSAGE,
  },
  {
    code: 'reading-23-24',
    from: 23,
    to: 24,
    questionTypes: [
      TopikQuestionType.AUTHOR_EMOTION,
      TopikQuestionType.PASSAGE_CONTENT_MATCH,
    ],
    stimulusScope: TopikStimulusScope.GROUP,
    groupStimulusKind: TopikStimulusKind.PASSAGE,
  },
  {
    code: 'reading-25-27',
    from: 25,
    to: 27,
    questionTypes: Array(3).fill(TopikQuestionType.HEADLINE_INTERPRETATION),
    stimulusScope: TopikStimulusScope.QUESTION,
    stimulusKinds: Array(3).fill(TopikStimulusKind.HEADLINE),
  },
  {
    code: 'reading-28-31',
    from: 28,
    to: 31,
    questionTypes: Array(4).fill(TopikQuestionType.PASSAGE_FILL_BLANK),
    stimulusScope: TopikStimulusScope.QUESTION,
    stimulusKinds: Array(4).fill(TopikStimulusKind.PASSAGE),
  },
  {
    code: 'reading-32-34',
    from: 32,
    to: 34,
    questionTypes: Array(3).fill(TopikQuestionType.PASSAGE_CONTENT_MATCH),
    stimulusScope: TopikStimulusScope.QUESTION,
    stimulusKinds: Array(3).fill(TopikStimulusKind.PASSAGE),
  },
  {
    code: 'reading-35-38',
    from: 35,
    to: 38,
    questionTypes: Array(4).fill(TopikQuestionType.PASSAGE_TOPIC),
    stimulusScope: TopikStimulusScope.QUESTION,
    stimulusKinds: Array(4).fill(TopikStimulusKind.PASSAGE),
  },
  {
    code: 'reading-39-41',
    from: 39,
    to: 41,
    questionTypes: Array(3).fill(TopikQuestionType.SENTENCE_INSERTION),
    stimulusScope: TopikStimulusScope.QUESTION,
    stimulusKinds: Array(3).fill(TopikStimulusKind.PASSAGE),
  },
  {
    code: 'reading-42-43',
    from: 42,
    to: 43,
    questionTypes: [
      TopikQuestionType.AUTHOR_EMOTION,
      TopikQuestionType.PASSAGE_CONTENT_MATCH,
    ],
    stimulusScope: TopikStimulusScope.GROUP,
    groupStimulusKind: TopikStimulusKind.PASSAGE,
  },
  {
    code: 'reading-44-45',
    from: 44,
    to: 45,
    questionTypes: [
      TopikQuestionType.PASSAGE_FILL_BLANK,
      TopikQuestionType.PASSAGE_TOPIC,
    ],
    stimulusScope: TopikStimulusScope.GROUP,
    groupStimulusKind: TopikStimulusKind.PASSAGE,
  },
  {
    code: 'reading-46-47',
    from: 46,
    to: 47,
    questionTypes: [
      TopikQuestionType.AUTHOR_ATTITUDE,
      TopikQuestionType.PASSAGE_CONTENT_MATCH,
    ],
    stimulusScope: TopikStimulusScope.GROUP,
    groupStimulusKind: TopikStimulusKind.PASSAGE,
  },
  {
    code: 'reading-48-50',
    from: 48,
    to: 50,
    questionTypes: [
      TopikQuestionType.AUTHOR_PURPOSE,
      TopikQuestionType.PASSAGE_FILL_BLANK,
      TopikQuestionType.PASSAGE_CONTENT_MATCH,
    ],
    stimulusScope: TopikStimulusScope.GROUP,
    groupStimulusKind: TopikStimulusKind.PASSAGE,
  },
];
