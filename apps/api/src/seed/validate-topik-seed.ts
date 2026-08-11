import {
  TopikResponseType,
  TopikStimulusKind,
} from '../topik/schemas/topik-content.schema';
import {
  TOPIK_READING_BLUEPRINT,
  TopikStimulusScope,
} from '../topik/topik-reading-blueprint';
import { TopikExamSeed, TopikReadingSeed } from './data/topik';

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

export function validateTopikListeningSeed(seed: TopikExamSeed) {
  const errors: string[] = [];
  const sortedQuestions = [...seed.questions].sort(
    (left, right) => left.number - right.number,
  );
  const groupsByCode = new Map(seed.groups.map((group) => [group.code, group]));

  if (seed.exam.section !== 'listening') {
    errors.push('Listening seed must use the listening section');
  }
  if (sortedQuestions.length !== seed.exam.totalQuestions) {
    errors.push(
      `Listening seed must contain ${seed.exam.totalQuestions} questions`,
    );
  }

  sortedQuestions.forEach((question, index) => {
    if (question.number !== index + 1) {
      errors.push(`Listening question sequence mismatch: ${question.number}`);
    }
    if (question.choices.length !== 4) {
      errors.push(
        `Listening question ${question.number} must have four choices`,
      );
    }
    if (
      !question.choices.some(
        (choice) => choice.key === question.correctChoiceKey,
      )
    ) {
      errors.push(
        `Listening question ${question.number} has an invalid answer`,
      );
    }
    const group = groupsByCode.get(question.groupCode);
    if (!group) {
      errors.push(`Listening question ${question.number} has no group`);
    } else if (
      !group.sharedAudio?.transcript?.length &&
      !question.audio?.transcript?.length
    ) {
      errors.push(
        `Listening question ${question.number} has no audio transcript`,
      );
    }
    if (question.solution.hints.length < 3) {
      errors.push(
        `Listening question ${question.number} must have progressive hints`,
      );
    }
    validateLocalizedText(
      question.solution.explanation,
      `Listening question ${question.number} explanation`,
      errors,
    );
  });

  const coveredNumbers = seed.groups.flatMap((group) =>
    Array.from(
      { length: group.endNumber - group.startNumber + 1 },
      (_, index) => group.startNumber + index,
    ),
  );
  if (
    coveredNumbers.length !== seed.exam.totalQuestions ||
    coveredNumbers.some((number, index) => number !== index + 1)
  ) {
    errors.push(
      `Listening groups must cover questions 1 through ${seed.exam.totalQuestions} once`,
    );
  }

  const totalPoints = sortedQuestions.reduce(
    (sum, question) => sum + question.points,
    0,
  );
  if (totalPoints !== seed.exam.totalPoints) {
    errors.push(
      `Listening seed must total ${seed.exam.totalPoints} points, received ${totalPoints}`,
    );
  }

  if (errors.length > 0) {
    throw new Error(
      `TOPIK listening seed validation failed:\n- ${errors.join('\n- ')}`,
    );
  }

  return {
    groupCount: seed.groups.length,
    questionCount: sortedQuestions.length,
    totalPoints,
  };
}

export function validateTopikIReadingSeed(seed: TopikExamSeed) {
  const errors: string[] = [];
  const sortedQuestions = [...seed.questions].sort(
    (left, right) => left.number - right.number,
  );
  const groupsByCode = new Map(seed.groups.map((group) => [group.code, group]));
  const questionCodes = new Set<string>();
  const groupCodes = new Set<string>();

  if (seed.exam.examType !== 'topik_i') {
    errors.push('TOPIK I reading seed must use the topik_i exam type');
  }
  if (seed.exam.section !== 'reading') {
    errors.push('TOPIK I reading seed must use the reading section');
  }
  if (seed.exam.totalQuestions !== 40 || sortedQuestions.length !== 40) {
    errors.push('TOPIK I reading seed must contain 40 questions');
  }

  seed.groups.forEach((group) => {
    if (groupCodes.has(group.code)) {
      errors.push(`Duplicate TOPIK I reading group code: ${group.code}`);
    }
    groupCodes.add(group.code);
  });

  sortedQuestions.forEach((question, index) => {
    const expectedNumber = index + 31;

    if (question.number !== expectedNumber) {
      errors.push(
        `TOPIK I reading question sequence mismatch: expected ${expectedNumber}, received ${question.number}`,
      );
    }
    if (questionCodes.has(question.code)) {
      errors.push(`Duplicate TOPIK I reading question code: ${question.code}`);
    }
    questionCodes.add(question.code);

    const group = groupsByCode.get(question.groupCode);
    if (!group) {
      errors.push(`TOPIK I reading question ${question.number} has no group`);
    } else if (
      question.number < group.startNumber ||
      question.number > group.endNumber
    ) {
      errors.push(
        `TOPIK I reading question ${question.number} is outside group ${group.code}`,
      );
    }
    if (question.choices.length !== 4) {
      errors.push(
        `TOPIK I reading question ${question.number} must have four choices`,
      );
    }
    if (
      !question.choices.some(
        (choice) => choice.key === question.correctChoiceKey,
      )
    ) {
      errors.push(
        `TOPIK I reading question ${question.number} has an invalid answer`,
      );
    }
    if (question.solution.hints.length < 3) {
      errors.push(
        `TOPIK I reading question ${question.number} must have progressive hints`,
      );
    }
    if (question.solution.steps.length < 2) {
      errors.push(
        `TOPIK I reading question ${question.number} must have solution steps`,
      );
    }
    validateLocalizedText(
      question.solution.explanation,
      `TOPIK I reading question ${question.number} explanation`,
      errors,
    );
    validateLocalizedText(
      question.solution.strategy,
      `TOPIK I reading question ${question.number} strategy`,
      errors,
    );
  });

  const coveredNumbers = seed.groups
    .flatMap((group) =>
      Array.from(
        { length: group.endNumber - group.startNumber + 1 },
        (_, index) => group.startNumber + index,
      ),
    )
    .sort((left, right) => left - right);
  if (
    coveredNumbers.length !== 40 ||
    coveredNumbers.some((number, index) => number !== index + 31)
  ) {
    errors.push(
      'TOPIK I reading groups must cover questions 31 through 70 once',
    );
  }

  const totalPoints = sortedQuestions.reduce(
    (sum, question) => sum + question.points,
    0,
  );
  if (totalPoints !== seed.exam.totalPoints) {
    errors.push(
      `TOPIK I reading seed must total ${seed.exam.totalPoints} points, received ${totalPoints}`,
    );
  }

  if (errors.length > 0) {
    throw new Error(
      `TOPIK I reading seed validation failed:\n- ${errors.join('\n- ')}`,
    );
  }

  return {
    groupCount: seed.groups.length,
    questionCount: sortedQuestions.length,
    totalPoints,
  };
}

export function validateTopikWritingSeed(seed: TopikExamSeed) {
  const errors: string[] = [];
  const sortedQuestions = [...seed.questions].sort(
    (left, right) => left.number - right.number,
  );
  const expectedNumbers = [51, 52, 53, 54];

  if (seed.exam.section !== 'writing') {
    errors.push('Writing seed must use the writing section');
  }
  if (sortedQuestions.length !== 4 || seed.exam.totalQuestions !== 4) {
    errors.push('Writing seed must contain four questions');
  }

  sortedQuestions.forEach((question, index) => {
    if (question.number !== expectedNumbers[index]) {
      errors.push(`Writing question sequence mismatch: ${question.number}`);
    }
    if (question.responseType !== TopikResponseType.WRITTEN) {
      errors.push(`Writing question ${question.number} must be written`);
    }
    if (question.choices.length > 0 || question.correctChoiceKey) {
      errors.push(`Writing question ${question.number} must not have choices`);
    }
    if (!question.writingConfig?.fields.length) {
      errors.push(`Writing question ${question.number} has no response fields`);
    }
    const fieldKeys =
      question.writingConfig?.fields.map((field) => field.key) ?? [];
    if (new Set(fieldKeys).size !== fieldKeys.length) {
      errors.push(`Writing question ${question.number} has duplicate fields`);
    }
    validateLocalizedText(
      question.writingConfig?.guide ?? { ko: '', uz: '', en: '', ru: '' },
      `Writing question ${question.number} guide`,
      errors,
    );
    validateLocalizedText(
      question.solution.explanation,
      `Writing question ${question.number} explanation`,
      errors,
    );
    validateLocalizedText(
      question.solution.strategy,
      `Writing question ${question.number} strategy`,
      errors,
    );
    if (!question.solution.sampleAnswer?.trim()) {
      errors.push(`Writing question ${question.number} has no sample answer`);
    }
    if (!question.solution.rubric?.length) {
      errors.push(`Writing question ${question.number} has no rubric`);
    }
  });

  const totalPoints = sortedQuestions.reduce(
    (sum, question) => sum + question.points,
    0,
  );
  if (totalPoints !== 100 || seed.exam.totalPoints !== 100) {
    errors.push('Writing seed must total 100 points');
  }

  if (errors.length > 0) {
    throw new Error(
      `TOPIK writing seed validation failed:\n- ${errors.join('\n- ')}`,
    );
  }

  return {
    groupCount: seed.groups.length,
    questionCount: sortedQuestions.length,
    totalPoints,
  };
}
