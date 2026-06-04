import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Onboarding, OnboardingDocument } from './schemas/onboarding.schema';
import { SaveSurveyDto } from './dto/save-survey.dto';
import { SaveLevelTestDto } from './dto/save-level-test.dto';

@Injectable()
export class OnboardingService {
  constructor(
    @InjectModel(Onboarding.name)
    private onboardingModel: Model<OnboardingDocument>,
  ) {}

  async saveSurvey(dto: SaveSurveyDto): Promise<Onboarding> {
    const existing = await this.onboardingModel.findOne({
      sessionId: dto.sessionId,
    });

    if (existing) {
      return this.onboardingModel.findOneAndUpdate(
        { sessionId: dto.sessionId },
        {
          targetLanguage: dto.targetLanguage,
          learningGoals: dto.learningGoals,
          learningStyle: dto.learningStyle,
          dailyGoalMinutes: dto.dailyGoalMinutes,
        },
        { new: true },
      ) as any;
    }

    return this.onboardingModel.create({
      sessionId: dto.sessionId,
      targetLanguage: dto.targetLanguage,
      learningGoals: dto.learningGoals,
      learningStyle: dto.learningStyle,
      dailyGoalMinutes: dto.dailyGoalMinutes,
    });
  }

  async saveLevelTest(dto: SaveLevelTestDto): Promise<Onboarding | null> {
    const detectedLevel = this.calculateLevel(dto.score);

    return this.onboardingModel.findOneAndUpdate(
      { sessionId: dto.sessionId },
      {
        correctAnswers: dto.correctAnswers,
        totalQuestions: dto.totalQuestions,
        levelTestScore: dto.score,
        detectedLevel,
        wrongQuestionIds: dto.wrongQuestionIds,
      },
      { new: true },
    );
  }

  private calculateLevel(score: number): string {
    if (score >= 90) return 'advanced';
    if (score >= 60) return 'intermediate';
    return 'beginner';
  }

  async updateGuestProgress(
    sessionId: string,
  ): Promise<{ shouldLogin: boolean; count: number }> {
    const onboarding = await this.onboardingModel.findOneAndUpdate(
      { sessionId },
      { $inc: { guestQuestionCount: 1 } },
      { new: true },
    );

    return {
      shouldLogin: (onboarding?.guestQuestionCount ?? 0) >= 30,
      count: onboarding?.guestQuestionCount ?? 0,
    };
  }

  async getSessionData(sessionId: string): Promise<Onboarding | null> {
    return this.onboardingModel.findOne({ sessionId });
  }
}
