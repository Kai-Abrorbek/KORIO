import { ExpressionSpeechLevel } from '../../../expressions/schemas/expression.schema';
import { ExpressionProficiency } from '../../../expressions/schemas/expression-node.schema';
import type {
  ExpressionNodeSeed,
  ExpressionPackSeed,
  ExpressionSeedEntry,
  LocalizedExpressionSeedText,
} from '../../expression-seed.types';

export function localized(
  ko: string,
  uz: string,
  en: string,
  ru: string,
): LocalizedExpressionSeedText {
  return { ko, uz, en, ru };
}

export interface ExpressionDraft {
  /** 주제 code가 자동으로 앞에 붙는 영구 식별자 조각 */
  code: string;
  /** Target-language text. Korean source files may keep the legacy `korean`. */
  text?: string;
  korean?: string;
  romanization?: string;
  ipa?: string;
  meaning: LocalizedExpressionSeedText;
  context: LocalizedExpressionSeedText;
  speaker: LocalizedExpressionSeedText;
  usageNote: LocalizedExpressionSeedText;
  speechLevel?: ExpressionSpeechLevel;
  difficulty?: number;
  tags?: string[];
  ttsText?: string;
}

export type ExpressionDraftRow = readonly [
  code: string,
  korean: string,
  romanization: string,
  meaningKo: string,
  meaningUz: string,
  meaningEn: string,
  meaningRu: string,
  speechLevel?: ExpressionSpeechLevel,
  speaker?: LocalizedExpressionSeedText,
];

/** Compact authoring format for complete, localized Korean expression additions. */
export function expressionDrafts(
  rows: readonly ExpressionDraftRow[],
  defaults: Pick<ExpressionDraft, 'context' | 'speaker' | 'usageNote'>,
): ExpressionDraft[] {
  return rows.map(
    ([
      code,
      korean,
      romanization,
      meaningKo,
      meaningUz,
      meaningEn,
      meaningRu,
      speechLevel,
      speaker,
    ]) => ({
      code,
      korean,
      romanization,
      meaning: localized(meaningKo, meaningUz, meaningEn, meaningRu),
      ...defaults,
      ...(speechLevel ? { speechLevel } : {}),
      ...(speaker ? { speaker } : {}),
    }),
  );
}

export interface ExpressionNodeDraft {
  /** 주제 code가 자동으로 앞에 붙는 영구 식별자 조각 */
  code: string;
  title: LocalizedExpressionSeedText;
  description: LocalizedExpressionSeedText;
  icon: string;
  proficiency?: ExpressionProficiency;
  expressions: readonly ExpressionDraft[];
}

export interface ExpressionTopicDraft {
  code: string;
  courseId?: string;
  targetLanguage?: string;
  title: LocalizedExpressionSeedText;
  description: LocalizedExpressionSeedText;
  order: number;
  placement: {
    section: number;
    unit: number;
  };
  difficulty?: number;
  nodes: readonly ExpressionNodeDraft[];
}

export interface BuiltExpressionTopic {
  packs: readonly ExpressionPackSeed[];
  nodes: readonly ExpressionNodeSeed[];
  expressions: readonly ExpressionSeedEntry[];
}

/** Add level groupings while retaining the five existing Korean node codes. */
export function defineLeveledKoreanTopic(
  draft: ExpressionTopicDraft & {
    additions: readonly ExpressionDraft[][];
    finalNode: Omit<ExpressionNodeDraft, 'expressions' | 'proficiency'>;
  },
): BuiltExpressionTopic {
  const { additions, finalNode, ...topicDraft } = draft;
  if (draft.nodes.length !== 5 || additions.length !== 6) {
    throw new Error(
      `${draft.code} needs five existing nodes and six addition groups`,
    );
  }
  const levels = [
    ExpressionProficiency.BEGINNER,
    ExpressionProficiency.BEGINNER,
    ExpressionProficiency.INTERMEDIATE,
    ExpressionProficiency.INTERMEDIATE,
    ExpressionProficiency.ADVANCED,
  ] as const;
  return defineExpressionTopic({
    ...topicDraft,
    nodes: [
      ...draft.nodes.map((node, index) => ({
        ...node,
        proficiency: levels[index],
        expressions: [...node.expressions, ...additions[index]],
      })),
      {
        ...finalNode,
        proficiency: ExpressionProficiency.ADVANCED,
        expressions: additions[5],
      },
    ],
  });
}

/**
 * 주제 파일에는 학습 콘텐츠만 적고, 반복되는 pack/node 연결·순서·placement·TTS
 * 기본값은 여기에서 만든다. 노드별 표현은 출시 기준인 12~16개만 허용한다.
 */
export function defineExpressionTopic(
  draft: ExpressionTopicDraft,
): BuiltExpressionTopic {
  const courseId = draft.courseId ?? 'ko-general';
  const targetLanguage = draft.targetLanguage ?? 'ko';
  if (
    (courseId === 'en-general' && targetLanguage !== 'en') ||
    (targetLanguage === 'en' &&
      (courseId !== 'en-general' || !draft.code.startsWith('en-')))
  ) {
    throw new Error(
      `${draft.code} has invalid English expression scope or code`,
    );
  }
  if (draft.nodes.length < 4 || draft.nodes.length > 6) {
    throw new Error(`${draft.code} must contain between 4 and 6 nodes`);
  }

  const pack: ExpressionPackSeed = {
    code: draft.code,
    courseId,
    targetLanguage,
    title: draft.title,
    description: draft.description,
    order: draft.order,
    isActive: true,
  };

  const nodes: ExpressionNodeSeed[] = [];
  const expressions: ExpressionSeedEntry[] = [];
  let expressionOrder = 0;

  draft.nodes.forEach((node, nodeIndex) => {
    if (node.expressions.length < 12 || node.expressions.length > 16) {
      throw new Error(
        `${draft.code}-${node.code} must contain between 12 and 16 expressions`,
      );
    }

    const nodeCode = `${draft.code}-${node.code}`;
    nodes.push({
      code: nodeCode,
      packCode: draft.code,
      title: node.title,
      description: node.description,
      icon: node.icon,
      ...(node.proficiency ? { proficiency: node.proficiency } : {}),
      order: nodeIndex + 1,
      requiredExposures: 3,
      isActive: true,
    });

    node.expressions.forEach((expression) => {
      if (targetLanguage === 'en' && !expression.text?.trim()) {
        throw new Error(`${nodeCode}-${expression.code} needs English text`);
      }
      const text = expression.text ?? expression.korean;
      if (!text?.trim()) {
        throw new Error(`${nodeCode}-${expression.code} has empty text`);
      }
      expressionOrder += 1;
      expressions.push({
        code: `${draft.code}-${expression.code}`,
        packCode: draft.code,
        nodeCode,
        courseId: pack.courseId,
        targetLanguage: pack.targetLanguage,
        text,
        ...(expression.korean ? { korean: expression.korean } : {}),
        meaning: expression.meaning,
        context: expression.context,
        speaker: expression.speaker,
        usageNote: expression.usageNote,
        speechLevel: expression.speechLevel ?? ExpressionSpeechLevel.POLITE,
        pronunciation: {
          ...(expression.romanization
            ? { romanization: expression.romanization }
            : {}),
          ...(expression.ipa ? { ipa: expression.ipa } : {}),
          ttsText: expression.ttsText ?? text,
          audioUrl: '',
        },
        order: expressionOrder,
        placements: [
          {
            section: draft.placement.section,
            unit: draft.placement.unit,
            order: expressionOrder,
            isCore: true,
          },
        ],
        tags: ['expression', draft.code, node.code, ...(expression.tags ?? [])],
        difficulty: expression.difficulty ?? draft.difficulty ?? 1,
        isActive: true,
      });
    });
  });

  return { packs: [pack], nodes, expressions };
}
