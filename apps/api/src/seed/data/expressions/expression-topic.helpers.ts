import { ExpressionSpeechLevel } from '../../../expressions/schemas/expression.schema';
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
  korean: string;
  romanization: string;
  meaning: LocalizedExpressionSeedText;
  context: LocalizedExpressionSeedText;
  speaker: LocalizedExpressionSeedText;
  usageNote: LocalizedExpressionSeedText;
  speechLevel?: ExpressionSpeechLevel;
  difficulty?: number;
  tags?: string[];
  ttsText?: string;
}

export interface ExpressionNodeDraft {
  /** 주제 code가 자동으로 앞에 붙는 영구 식별자 조각 */
  code: string;
  title: LocalizedExpressionSeedText;
  description: LocalizedExpressionSeedText;
  icon: string;
  expressions: readonly ExpressionDraft[];
}

export interface ExpressionTopicDraft {
  code: string;
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

/**
 * 주제 파일에는 학습 콘텐츠만 적고, 반복되는 pack/node 연결·순서·placement·TTS
 * 기본값은 여기에서 만든다. 노드별 표현은 출시 기준인 12~16개만 허용한다.
 */
export function defineExpressionTopic(
  draft: ExpressionTopicDraft,
): BuiltExpressionTopic {
  if (draft.nodes.length < 4 || draft.nodes.length > 6) {
    throw new Error(`${draft.code} must contain between 4 and 6 nodes`);
  }

  const pack: ExpressionPackSeed = {
    code: draft.code,
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
      order: nodeIndex + 1,
      requiredExposures: 3,
      isActive: true,
    });

    node.expressions.forEach((expression) => {
      expressionOrder += 1;
      expressions.push({
        code: `${draft.code}-${expression.code}`,
        packCode: draft.code,
        nodeCode,
        korean: expression.korean,
        meaning: expression.meaning,
        context: expression.context,
        speaker: expression.speaker,
        usageNote: expression.usageNote,
        speechLevel:
          expression.speechLevel ?? ExpressionSpeechLevel.POLITE,
        pronunciation: {
          romanization: expression.romanization,
          ttsText: expression.ttsText ?? expression.korean,
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
        tags: [
          'expression',
          draft.code,
          node.code,
          ...(expression.tags ?? []),
        ],
        difficulty: expression.difficulty ?? draft.difficulty ?? 1,
        isActive: true,
      });
    });
  });

  return { packs: [pack], nodes, expressions };
}
