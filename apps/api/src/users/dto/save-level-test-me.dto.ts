import { IsArray, IsNumber } from 'class-validator';

export class SaveLevelTestMeDto {
  @IsNumber()
  correctAnswers: number;

  @IsNumber()
  totalQuestions: number;

  @IsNumber()
  score: number;

  @IsArray()
  wrongQuestionIds: string[];
}
