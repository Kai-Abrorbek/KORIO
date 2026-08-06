import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SaveTopikAnswersDto } from './dto/save-topik-answers.dto';
import { StartTopikAttemptDto } from './dto/start-topik-attempt.dto';
import {
  TopikAttempt,
  TopikAttemptDocument,
  TopikAttemptStatus,
} from './schemas/topik-attempt.schema';
import {
  TopikPublishStatus,
  TopikSection,
} from './schemas/topik-content.schema';
import { TopikExam, TopikExamDocument } from './schemas/topik-exam.schema';
import {
  TopikQuestionGroup,
  TopikQuestionGroupDocument,
} from './schemas/topik-question-group.schema';
import {
  TopikQuestion,
  TopikQuestionDocument,
} from './schemas/topik-question.schema';
import { scoreTopikAnswers } from './topik-score.util';
import { TopikStatsService } from './topik-stats.service';

@Injectable()
export class TopikService {
  constructor(
    @InjectModel(TopikExam.name)
    private readonly examModel: Model<TopikExamDocument>,
    @InjectModel(TopikQuestionGroup.name)
    private readonly groupModel: Model<TopikQuestionGroupDocument>,
    @InjectModel(TopikQuestion.name)
    private readonly questionModel: Model<TopikQuestionDocument>,
    @InjectModel(TopikAttempt.name)
    private readonly attemptModel: Model<TopikAttemptDocument>,
    private readonly topikStatsService: TopikStatsService,
  ) {}

  public async getExams() {
    const exams = await this.examModel
      .find({
        section: TopikSection.READING,
        status: TopikPublishStatus.PUBLISHED,
        isActive: true,
      })
      .sort({ publishedAt: -1, year: -1, round: 1 })
      .lean();

    return exams.map((exam) => ({
      id: exam._id.toString(),
      code: exam.code,
      title: exam.title,
      description: exam.description,
      examType: exam.examType,
      section: exam.section,
      year: exam.year,
      round: exam.round,
      durationMinutes: exam.durationMinutes,
      totalQuestions: exam.totalQuestions,
      totalPoints: exam.totalPoints,
      version: exam.version,
    }));
  }

  public async getExamSession(code: string, from = 1, to = 50) {
    if (from > to) {
      throw new BadRequestException('TOPIK_INVALID_QUESTION_RANGE');
    }

    const exam = await this.findPublishedExam(code);
    const groups = await this.groupModel
      .find({
        examId: exam._id,
        startNumber: { $lte: to },
        endNumber: { $gte: from },
        isActive: true,
      })
      .sort({ order: 1 })
      .lean();
    const groupIds = groups.map((group) => group._id);
    const questions = await this.questionModel
      .find({
        examId: exam._id,
        groupId: { $in: groupIds },
        number: { $gte: from, $lte: to },
        isActive: true,
      })
      .select('-correctChoiceKey -solution')
      .sort({ number: 1 })
      .lean();

    if (questions.length !== to - from + 1) {
      throw new BadRequestException('TOPIK_QUESTION_SET_INCOMPLETE');
    }

    const questionsByGroup = new Map<string, any[]>();

    for (const question of questions) {
      const groupId = question.groupId.toString();
      const groupQuestions = questionsByGroup.get(groupId) ?? [];
      groupQuestions.push(this.formatQuestion(question));
      questionsByGroup.set(groupId, groupQuestions);
    }

    return {
      exam: this.formatExam(exam),
      range: { from, to },
      groups: groups.map((group) => ({
        id: group._id.toString(),
        code: group.code,
        order: group.order,
        startNumber: group.startNumber,
        endNumber: group.endNumber,
        instruction: group.instruction,
        sharedStimulus: group.sharedStimulus ?? null,
        pointsPerQuestion: group.pointsPerQuestion,
        presentation: group.presentation,
        version: group.version,
        questions: questionsByGroup.get(group._id.toString()) ?? [],
      })),
    };
  }

  public async startAttempt(
    userId: string,
    examCode: string,
    dto: StartTopikAttemptDto,
  ) {
    const exam = await this.findPublishedExam(examCode);

    if (dto.resume) {
      const existingAttempt = await this.attemptModel
        .findOne({
          userId: new Types.ObjectId(userId),
          examId: exam._id,
          examVersion: exam.version,
          mode: dto.mode,
          status: TopikAttemptStatus.IN_PROGRESS,
        })
        .sort({ updatedAt: -1 });

      if (existingAttempt) {
        return this.formatAttempt(existingAttempt);
      }
    }

    const questions = await this.questionModel
      .find({ examId: exam._id, isActive: true })
      .select('_id number')
      .sort({ number: 1 })
      .lean();

    const hasCompleteNumberSequence = questions.every(
      (question, index) => question.number === index + 1,
    );

    if (
      questions.length !== exam.totalQuestions ||
      !hasCompleteNumberSequence
    ) {
      throw new BadRequestException('TOPIK_QUESTION_SET_INCOMPLETE');
    }

    const attempt = await this.attemptModel.create({
      userId: new Types.ObjectId(userId),
      examId: exam._id,
      examVersion: exam.version,
      mode: dto.mode,
      status: TopikAttemptStatus.IN_PROGRESS,
      questionIds: questions.map((question) => question._id),
      answers: [],
      currentQuestionNumber: 1,
      elapsedSeconds: 0,
    });

    return this.formatAttempt(attempt);
  }

  public async getAttempt(userId: string, attemptId: string) {
    const attempt = await this.findOwnedAttempt(userId, attemptId);
    return this.formatAttempt(attempt);
  }

  public async saveAnswers(
    userId: string,
    attemptId: string,
    dto: SaveTopikAnswersDto,
  ) {
    const attempt = await this.findOwnedAttempt(userId, attemptId);

    if (attempt.status !== TopikAttemptStatus.IN_PROGRESS) {
      throw new BadRequestException('TOPIK_ATTEMPT_NOT_IN_PROGRESS');
    }

    const allowedQuestionIds = new Set(
      attempt.questionIds.map((questionId) => questionId.toString()),
    );
    const answerQuestionIds = dto.answers.map(
      (answer) => new Types.ObjectId(answer.questionId),
    );
    const answerQuestions = await this.questionModel
      .find({ _id: { $in: answerQuestionIds } })
      .select('_id version')
      .lean();
    const questionVersionById = new Map(
      answerQuestions.map((question) => [
        question._id.toString(),
        question.version,
      ]),
    );

    for (const answer of dto.answers) {
      if (!allowedQuestionIds.has(answer.questionId)) {
        throw new BadRequestException('TOPIK_QUESTION_NOT_IN_ATTEMPT');
      }

      const questionVersion = questionVersionById.get(answer.questionId);
      if (!questionVersion) {
        throw new BadRequestException('TOPIK_QUESTION_NOT_FOUND');
      }

      const existingAnswer = attempt.answers.find(
        (item) => item.questionId.toString() === answer.questionId,
      );
      const answeredAt = answer.answeredAt
        ? new Date(answer.answeredAt)
        : new Date();

      if (existingAnswer) {
        existingAnswer.selectedChoiceKey = answer.selectedChoiceKey;
        existingAnswer.durationMs = answer.durationMs;
        existingAnswer.answeredAt = answeredAt;
        existingAnswer.isCorrect = null;
      } else {
        attempt.answers.push({
          questionId: new Types.ObjectId(answer.questionId),
          questionVersion,
          selectedChoiceKey: answer.selectedChoiceKey,
          durationMs: answer.durationMs,
          answeredAt,
          isCorrect: null,
        });
      }
    }

    if (dto.currentQuestionNumber !== undefined) {
      attempt.currentQuestionNumber = dto.currentQuestionNumber;
    }
    if (dto.elapsedSeconds !== undefined) {
      attempt.elapsedSeconds = dto.elapsedSeconds;
    }

    attempt.lastSavedAt = new Date();
    attempt.markModified('answers');
    await attempt.save();

    return {
      attemptId: attempt._id.toString(),
      answeredCount: attempt.answers.length,
      currentQuestionNumber: attempt.currentQuestionNumber,
      elapsedSeconds: attempt.elapsedSeconds,
      lastSavedAt: attempt.lastSavedAt,
    };
  }

  public async submitAttempt(userId: string, attemptId: string) {
    const attempt = await this.findOwnedAttempt(userId, attemptId);

    if (attempt.status === TopikAttemptStatus.SUBMITTED) {
      await this.topikStatsService.applySubmittedAttempt(
        attempt._id.toString(),
      );
      return this.formatSubmission(attempt);
    }
    if (attempt.status !== TopikAttemptStatus.IN_PROGRESS) {
      throw new BadRequestException('TOPIK_ATTEMPT_NOT_IN_PROGRESS');
    }

    const questions = await this.questionModel
      .find({ _id: { $in: attempt.questionIds } })
      .select('+correctChoiceKey points')
      .lean();
    const scoring = scoreTopikAnswers(
      questions.map((question) => ({
        id: question._id.toString(),
        correctChoiceKey: question.correctChoiceKey,
        points: question.points,
      })),
      attempt.answers.map((answer) => ({
        questionId: answer.questionId.toString(),
        selectedChoiceKey: answer.selectedChoiceKey,
      })),
    );

    for (const answer of attempt.answers) {
      answer.isCorrect = scoring.results.get(answer.questionId.toString()) ?? false;
    }

    attempt.correctCount = scoring.correctCount;
    attempt.score = scoring.score;
    attempt.status = TopikAttemptStatus.SUBMITTED;
    attempt.submittedAt = new Date();
    attempt.lastSavedAt = new Date();
    attempt.markModified('answers');
    await attempt.save();

    await this.topikStatsService.applySubmittedAttempt(
      attempt._id.toString(),
    );

    return this.formatSubmission(attempt);
  }

  public async getAttemptResult(userId: string, attemptId: string) {
    const attempt = await this.findOwnedAttempt(userId, attemptId);

    if (attempt.status !== TopikAttemptStatus.SUBMITTED) {
      throw new BadRequestException('TOPIK_ATTEMPT_NOT_SUBMITTED');
    }

    const questions = await this.questionModel
      .find({ _id: { $in: attempt.questionIds } })
      .select('+correctChoiceKey +solution')
      .sort({ number: 1 })
      .lean();
    const answerByQuestion = new Map(
      attempt.answers.map((answer) => [answer.questionId.toString(), answer]),
    );

    return {
      ...this.formatSubmission(attempt),
      questions: questions.map((question) => {
        const answer = answerByQuestion.get(question._id.toString());

        return {
          questionId: question._id.toString(),
          number: question.number,
          selectedChoiceKey: answer?.selectedChoiceKey ?? null,
          correctChoiceKey: question.correctChoiceKey,
          isCorrect: answer?.isCorrect ?? false,
          points: question.points,
          solution: question.solution,
        };
      }),
    };
  }

  private async findPublishedExam(code: string) {
    const exam = await this.examModel.findOne({
      code,
      section: TopikSection.READING,
      status: TopikPublishStatus.PUBLISHED,
      isActive: true,
    });

    if (!exam) {
      throw new NotFoundException('TOPIK_EXAM_NOT_FOUND');
    }

    return exam;
  }

  private async findOwnedAttempt(userId: string, attemptId: string) {
    if (!Types.ObjectId.isValid(attemptId)) {
      throw new NotFoundException('TOPIK_ATTEMPT_NOT_FOUND');
    }

    const attempt = await this.attemptModel.findOne({
      _id: new Types.ObjectId(attemptId),
      userId: new Types.ObjectId(userId),
    });

    if (!attempt) {
      throw new NotFoundException('TOPIK_ATTEMPT_NOT_FOUND');
    }

    return attempt;
  }

  private formatExam(exam: TopikExamDocument) {
    return {
      id: exam._id.toString(),
      code: exam.code,
      title: exam.title,
      description: exam.description,
      examType: exam.examType,
      section: exam.section,
      durationMinutes: exam.durationMinutes,
      totalQuestions: exam.totalQuestions,
      totalPoints: exam.totalPoints,
      version: exam.version,
    };
  }

  private formatQuestion(question: any) {
    return {
      id: question._id.toString(),
      code: question.code,
      number: question.number,
      order: question.order,
      type: question.type,
      points: question.points,
      prompt: question.prompt,
      stimulus: question.stimulus ?? null,
      choices: question.choices,
      presentation: question.presentation,
      tags: question.tags,
      difficulty: question.difficulty,
      version: question.version,
    };
  }

  private formatAttempt(attempt: TopikAttemptDocument) {
    return {
      id: attempt._id.toString(),
      examId: attempt.examId.toString(),
      examVersion: attempt.examVersion,
      mode: attempt.mode,
      status: attempt.status,
      currentQuestionNumber: attempt.currentQuestionNumber,
      elapsedSeconds: attempt.elapsedSeconds,
      answeredCount: attempt.answers.length,
      answers: attempt.answers.map((answer) => ({
        questionId: answer.questionId.toString(),
        selectedChoiceKey: answer.selectedChoiceKey,
        durationMs: answer.durationMs,
        answeredAt: answer.answeredAt,
      })),
      startedAt: attempt.startedAt,
      lastSavedAt: attempt.lastSavedAt,
    };
  }

  private formatSubmission(attempt: TopikAttemptDocument) {
    return {
      attemptId: attempt._id.toString(),
      status: attempt.status,
      correctCount: attempt.correctCount,
      totalQuestions: attempt.questionIds.length,
      score: attempt.score,
      elapsedSeconds: attempt.elapsedSeconds,
      submittedAt: attempt.submittedAt,
    };
  }
}
