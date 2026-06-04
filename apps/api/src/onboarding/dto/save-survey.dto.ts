import { IsArray, IsNumber, IsString } from 'class-validator';

export class SaveSurveyDto {
  @IsString()
  targetLanguage: string;

  @IsArray()
  learningGoals: string[];

  @IsString()
  learningStyle: string;

  @IsNumber()
  dailyGoalMinutes: number;

  @IsString()
  sessionId: string; // 비로그인 유저 식별용
}
