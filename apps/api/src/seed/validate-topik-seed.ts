import {
  TopikStimulusKind,
} from '../topik/schemas/topik-content.schema';
import {
  TOPIK_READING_BLUEPRINT,
  TopikStimulusScope,
} from '../topik/topik-reading-blueprint';
import { TopikReadingSeed } from './data/topik';

const TOPIK_LANGUAGES = ['ko', 'uz', 'en', 'ru'] as const;

function validateLocalizedText(
  value: Record<(typeof TOPIK_LANGUAGES)[number], string>,
  label: string,
  errors: string[],
) {
  for (const language of TOPIK_LANGUAGES) {
    if (!value[language]?.trim()) {
      errors.push(`${label} is missing ${language} text`);
    }
  }
}

export function validateTopikReadingSeed(seed: TopikReadingSeed) {
  const errors: string[] = [];
  const groupsByCode = new Map(seed.groups.map((group) => [group.code, group]));
  const questionCodes = new Set<string>();
  const groupCodes = new Set<string>();
  const sortedQuestions = [...seed.questions].sort(
    (left, right) => left.number - right.number,
  );

  if (seed.groups.length !== TOPIK_READING_BLUEPRINT.length) {
    errors.push(
      `Expected ${TOPIK_READING_BLUEPRINT.length} groups, received ${seed.groups.length}`,
    );
  }
  if (seed.questions.length !== seed.exam.totalQuestions) {
    errors.push(
      `Expected ${seed.exam.totalQuestions} questions, received ${seed.questions.length}`,
    );
  }

  for (const group of seed.groups) {
    if (groupCodes.has(group.code)) {
      errors.push(`Duplicate group code: ${group.code}`);
    }
    groupCodes.add(group.code);
  }

  for (const [index, question] of sortedQuestions.entries()) {
    const expectedNumber = index + 1;

    if (question.number !== expectedNumber) {
      errors.push(
        `Question sequence mismatch at position ${expectedNumber}: ${question.number}`,
      );
    }
    if (questionCodes.has(question.code)) {
      errors.push(`Duplicate question code: ${question.code}`);
    }
    questionCodes.add(question.code);

    if (!groupsByCode.has(question.groupCode)) {
      errors.push(
        `Question ${question.number} references missing group ${question.groupCode}`,
      );
    }
    if (question.choices.length !== 4) {
      errors.push(`Question ${question.number} must have four choices`);
    }
    if (
      !question.choices.some(
        (choice) => choice.key === question.correctChoiceKey,
      )
    ) {
      errors.push(`Question ${question.number} has an invalid answer key`);
    }
    if (question.solution.hints.length < 3) {
      errors.push(`Question ${question.number} must have progressive hints`);
    }
    if (question.solution.steps.length < 2) {
      errors.push(`Question ${question.number} must have solution steps`);
    }
    validateLocalizedText(
      question.solution.explanation,
      `Question ${question.number} explanation`,
      errors,
    );
    validateLocalizedText(
      question.solution.strategy,
      `Question ${question.number} strategy`,
      errors,
    );
    question.solution.keyClues.forEach((clue) => {
      validateLocalizedText(
        clue.explanation,
        `Question ${question.number} clue ${clue.key}`,
        errors,
      );
    });
    question.solution.hints.forEach((hint) => {
      validateLocalizedText(
        hint.title,
        `Question ${question.number} hint ${hint.key} title`,
        errors,
      );
      validateLocalizedText(
        hint.content,
        `Question ${question.number} hint ${hint.key} content`,
        errors,
      );
      hint.examples.forEach((example, exampleIndex) => {
        validateLocalizedText(
          example,
          `Question ${question.number} hint ${hint.key} example ${exampleIndex + 1}`,
          errors,
        );
      });
    });
  }

  for (const blueprint of TOPIK_READING_BLUEPRINT) {
    const group = groupsByCode.get(blueprint.code);
    const questions = sortedQuestions.filter(
      (question) => question.groupCode === blueprint.code,
    );

    if (!group) {
      errors.push(`Missing blueprint group: ${blueprint.code}`);
      continue;
    }
    if (
      group.startNumber !== blueprint.from ||
      group.endNumber !== blueprint.to
    ) {
      errors.push(`Range mismatch for group ${blueprint.code}`);
    }
    if (questions.length !== blueprint.to - blueprint.from + 1) {
      errors.push(`Question count mismatch for group ${blueprint.code}`);
    }

    questions.forEach((question, index) => {
      if (question.type !== blueprint.questionTypes[index]) {
        errors.push(`Question type mismatch for question ${question.number}`);
      }
    });

    if (blueprint.stimulusScope === TopikStimulusScope.NONE) {
      if (questions.some((question) => question.stimulus)) {
        errors.push(`Group ${blueprint.code} must not have question stimuli`);
      }
    }

    if (blueprint.stimulusScope === TopikStimulusScope.QUESTION) {
      questions.forEach((question, index) => {
        const expectedKind = blueprint.stimulusKinds?.[index];

        if (!question.stimulus || question.stimulus.kind !== expectedKind) {
          errors.push(
            `Stimulus mismatch for question ${question.number}: expected ${expectedKind ?? TopikStimulusKind.NONE}`,
          );
        }
      });
    }

    if (blueprint.stimulusScope === TopikStimulusScope.GROUP) {
      if (group.sharedStimulus?.kind !== blueprint.groupStimulusKind) {
        errors.push(`Shared stimulus mismatch for group ${blueprint.code}`);
      }
      if (questions.some((question) => question.stimulus)) {
        errors.push(`Group ${blueprint.code} must use only shared stimulus`);
      }
    }
  }

  const totalPoints = seed.questions.reduce(
    (sum, question) => sum + question.points,
    0,
  );
  if (totalPoints !== seed.exam.totalPoints) {
    errors.push(
      `Expected ${seed.exam.totalPoints} total points, received ${totalPoints}`,
    );
  }

  if (errors.length > 0) {
    throw new Error(`TOPIK seed validation failed:\n- ${errors.join('\n- ')}`);
  }

  return {
    groupCount: seed.groups.length,
    questionCount: seed.questions.length,
    totalPoints,
  };
}
