import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { LearningGoal } from '../../common/enums/learning-goal.enum';
import { HangulLevel } from '../../common/enums/hangul-level.enum';
import { SelfReportedLevel } from '../../common/enums/self-level.enum';
import { Interest } from '../../common/enums/interest.enum';

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

  @IsEnum(HangulLevel)
  hangulLevel: HangulLevel;

  @IsArray()
  interests: Interest[];

  @IsEnum(SelfReportedLevel)
  selfReportedLevel: SelfReportedLevel;

  @IsNumber()
  @IsOptional()
  reminderHour?: number;

  @IsBoolean()
  @IsOptional()
  reminderEnabled?: boolean;
}
