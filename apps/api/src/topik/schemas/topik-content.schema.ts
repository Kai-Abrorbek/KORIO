import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum TopikExamType {
  TOPIK_I = 'topik_i',
  TOPIK_II = 'topik_ii',
}

export enum TopikSection {
  LISTENING = 'listening',
  WRITING = 'writing',
  READING = 'reading',
}

export enum TopikPublishStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum TopikQuestionType {
  GRAMMAR_FILL_BLANK = 'grammar_fill_blank',
  UNDERLINED_MEANING = 'underlined_meaning',
  PRACTICAL_TEXT_TOPIC = 'practical_text_topic',
  PASSAGE_CONTENT_MATCH = 'passage_content_match',
  SENTENCE_ORDERING = 'sentence_ordering',
  PASSAGE_FILL_BLANK = 'passage_fill_blank',
  PASSAGE_TOPIC = 'passage_topic',
  AUTHOR_EMOTION = 'author_emotion',
  HEADLINE_INTERPRETATION = 'headline_interpretation',
  SENTENCE_INSERTION = 'sentence_insertion',
  AUTHOR_ATTITUDE = 'author_attitude',
  AUTHOR_PURPOSE = 'author_purpose',
}

export enum TopikStimulusKind {
  NONE = 'none',
  PASSAGE = 'passage',
  ADVERTISEMENT = 'advertisement',
  NOTICE = 'notice',
  INFO_CARD = 'info_card',
  CHART = 'chart',
  HEADLINE = 'headline',
  SENTENCE_SET = 'sentence_set',
}

export enum TopikTextSegmentType {
  TEXT = 'text',
  BLANK = 'blank',
  UNDERLINE = 'underline',
  EMPHASIS = 'emphasis',
  INSERTION_MARKER = 'insertion_marker',
}

export enum TopikTextBlockType {
  PARAGRAPH = 'paragraph',
  BULLET = 'bullet',
  QUOTE = 'quote',
  CAPTION = 'caption',
}

export enum TopikChoiceLayout {
  ONE_COLUMN = 'one_column',
  TWO_COLUMNS = 'two_columns',
  FOUR_COLUMNS = 'four_columns',
}

export enum TopikVisualTemplate {
  EXAM_SENTENCE = 'exam_sentence',
  EXAM_PASSAGE = 'exam_passage',
  EXAM_ADVERTISEMENT = 'exam_advertisement',
  EXAM_NOTICE = 'exam_notice',
  EXAM_INFO_CARD = 'exam_info_card',
  EXAM_CHART = 'exam_chart',
  EXAM_HEADLINE = 'exam_headline',
  EXAM_SENTENCE_SET = 'exam_sentence_set',
  EXAM_INSERTION = 'exam_insertion',
}

@Schema({ _id: false })
export class TopikI18nText {
  @Prop({ default: '' })
  ko: string;

  @Prop({ default: '' })
  uz: string;

  @Prop({ default: '' })
  en: string;

  @Prop({ default: '' })
  ru: string;
}

export const TopikI18nTextSchema =
  SchemaFactory.createForClass(TopikI18nText);

@Schema({ _id: false })
export class TopikTextSegment {
  @Prop({ type: String, required: true, enum: TopikTextSegmentType })
  type: TopikTextSegmentType;

  @Prop({ default: '' })
  text: string;

  @Prop({ default: '' })
  key: string;

  @Prop({ default: '' })
  label: string;
}

export const TopikTextSegmentSchema =
  SchemaFactory.createForClass(TopikTextSegment);

@Schema({ _id: false })
export class TopikTextBlock {
  @Prop({ type: String, required: true, enum: TopikTextBlockType })
  type: TopikTextBlockType;

  @Prop({ type: [TopikTextSegmentSchema], default: [] })
  segments: TopikTextSegment[];
}

export const TopikTextBlockSchema =
  SchemaFactory.createForClass(TopikTextBlock);

@Schema({ _id: false })
export class TopikLabeledSentence {
  @Prop({ required: true })
  label: string;

  @Prop({ type: [TopikTextBlockSchema], default: [] })
  blocks: TopikTextBlock[];
}

export const TopikLabeledSentenceSchema =
  SchemaFactory.createForClass(TopikLabeledSentence);

@Schema({ _id: false })
export class TopikInfoItem {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  value: string;
}

export const TopikInfoItemSchema = SchemaFactory.createForClass(TopikInfoItem);

@Schema({ _id: false })
export class TopikChartRow {
  @Prop({ default: '' })
  label: string;

  @Prop({ type: [String], default: [] })
  values: string[];

  @Prop({ type: [Number], default: [] })
  numericValues: number[];
}

export const TopikChartRowSchema = SchemaFactory.createForClass(TopikChartRow);

@Schema({ _id: false })
export class TopikChartData {
  @Prop({ default: '' })
  title: string;

  @Prop({ default: '' })
  subtitle: string;

  @Prop({ type: [String], default: [] })
  headers: string[];

  @Prop({ type: [TopikChartRowSchema], default: [] })
  rows: TopikChartRow[];

  @Prop({ default: '' })
  unit: string;

  @Prop({ default: '' })
  sourceNote: string;

  @Prop({ default: 'default' })
  variant: string;
}

export const TopikChartDataSchema =
  SchemaFactory.createForClass(TopikChartData);

@Schema({ _id: false })
export class TopikStimulus {
  @Prop({ type: String, required: true, enum: TopikStimulusKind })
  kind: TopikStimulusKind;

  @Prop({ default: '' })
  title: string;

  @Prop({ default: '' })
  subtitle: string;

  @Prop({ type: [TopikTextBlockSchema], default: [] })
  blocks: TopikTextBlock[];

  @Prop({ type: [String], default: [] })
  bulletItems: string[];

  @Prop({ type: [TopikInfoItemSchema], default: [] })
  infoItems: TopikInfoItem[];

  @Prop({ type: [TopikLabeledSentenceSchema], default: [] })
  labeledSentences: TopikLabeledSentence[];

  @Prop({ type: [TopikTextBlockSchema], default: [] })
  givenText: TopikTextBlock[];

  @Prop({ type: TopikChartDataSchema })
  chart?: TopikChartData;

  @Prop({ default: '' })
  imageUrl: string;

  @Prop({ default: '' })
  imageAlt: string;

  @Prop({ default: 'default' })
  visualVariant: string;
}

export const TopikStimulusSchema =
  SchemaFactory.createForClass(TopikStimulus);

@Schema({ _id: false })
export class TopikChoice {
  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true, min: 1, max: 4 })
  order: number;
}

export const TopikChoiceSchema = SchemaFactory.createForClass(TopikChoice);

@Schema({ _id: false })
export class TopikPresentation {
  @Prop({ type: String, required: true, enum: TopikVisualTemplate })
  template: TopikVisualTemplate;

  @Prop({ type: String, required: true, enum: TopikChoiceLayout })
  choiceLayout: TopikChoiceLayout;

  @Prop({ default: 'default' })
  visualVariant: string;

  @Prop({ default: true })
  showBorder: boolean;

  @Prop({ default: true })
  preserveChoiceOrder: boolean;
}

export const TopikPresentationSchema =
  SchemaFactory.createForClass(TopikPresentation);

@Schema({ _id: false })
export class TopikChoiceNote {
  @Prop({ required: true })
  choiceKey: string;

  @Prop({ type: TopikI18nTextSchema, default: {} })
  note: TopikI18nText;
}

export const TopikChoiceNoteSchema =
  SchemaFactory.createForClass(TopikChoiceNote);

@Schema({ _id: false })
export class TopikKeyClue {
  @Prop({ required: true })
  key: string;

  @Prop({ required: true, min: 1 })
  order: number;

  @Prop({ type: TopikI18nTextSchema, default: {} })
  label: TopikI18nText;

  @Prop({ type: TopikI18nTextSchema, default: {} })
  explanation: TopikI18nText;

  @Prop({ type: [String], default: [] })
  targetSegmentKeys: string[];
}

export const TopikKeyClueSchema = SchemaFactory.createForClass(TopikKeyClue);

@Schema({ _id: false })
export class TopikSolutionStep {
  @Prop({ required: true })
  key: string;

  @Prop({ required: true, min: 1 })
  order: number;

  @Prop({ type: TopikI18nTextSchema, default: {} })
  title: TopikI18nText;

  @Prop({ type: TopikI18nTextSchema, default: {} })
  explanation: TopikI18nText;

  @Prop({ type: [String], default: [] })
  targetSegmentKeys: string[];
}

export const TopikSolutionStepSchema =
  SchemaFactory.createForClass(TopikSolutionStep);

@Schema({ _id: false })
export class TopikHint {
  @Prop({ required: true })
  key: string;

  @Prop({ required: true, min: 1, max: 10 })
  level: number;

  @Prop({ type: TopikI18nTextSchema, default: {} })
  title: TopikI18nText;

  @Prop({ type: TopikI18nTextSchema, default: {} })
  content: TopikI18nText;

  @Prop({ type: [TopikI18nTextSchema], default: [] })
  examples: TopikI18nText[];

  @Prop({ type: [String], default: [] })
  targetSegmentKeys: string[];
}

export const TopikHintSchema = SchemaFactory.createForClass(TopikHint);

@Schema({ _id: false })
export class TopikSolution {
  @Prop({ type: TopikI18nTextSchema, default: {} })
  explanation: TopikI18nText;

  @Prop({ type: TopikI18nTextSchema, default: {} })
  strategy: TopikI18nText;

  @Prop({ type: [TopikKeyClueSchema], default: [] })
  keyClues: TopikKeyClue[];

  @Prop({ type: [TopikSolutionStepSchema], default: [] })
  steps: TopikSolutionStep[];

  @Prop({ type: [TopikHintSchema], default: [] })
  hints: TopikHint[];

  @Prop({ type: [TopikChoiceNoteSchema], default: [] })
  choiceNotes: TopikChoiceNote[];
}

export const TopikSolutionSchema =
  SchemaFactory.createForClass(TopikSolution);

@Schema({ _id: false })
export class TopikSourceReference {
  @Prop({ min: 1 })
  pdfPage?: number;

  @Prop({ min: 1 })
  bookPage?: number;

  @Prop({ default: '' })
  reference: string;
}

export const TopikSourceReferenceSchema =
  SchemaFactory.createForClass(TopikSourceReference);
