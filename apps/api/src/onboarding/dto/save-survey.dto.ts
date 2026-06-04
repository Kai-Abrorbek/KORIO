import { IsArray, IsNumber, IsString } from 'class-validator';
import { LearningGoal } from '../../common/enums/learning-goal.enum';

export class SaveSurveyDto {
  @IsString()
  targetLanguage: string;

  @IsArray()
  learningGoals: LearningGoal[];

  @IsString()
  learningStyle: string;

  @IsNumber()
  dailyGoalMinutes: number;

  @IsString()
  sessionId: string; // 비로그인 유저 식별용
}
