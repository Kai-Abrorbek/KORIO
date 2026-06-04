import { IsArray, IsNumber, IsString } from 'class-validator';

export class SaveLevelTestDto {
  @IsString()
  sessionId: string;

  @IsNumber()
  correctAnswers: number;

  @IsNumber()
  totalQuestions: number;

  @IsNumber()
  score: number;

  @IsArray()
  wrongQuestionIds: string[];
}
