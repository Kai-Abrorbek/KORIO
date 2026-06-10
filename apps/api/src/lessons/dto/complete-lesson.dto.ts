import { IsString, IsNumber, IsArray, IsBoolean } from 'class-validator';

export class CompleteLessonDto {
  @IsNumber()
  correctAnswers: number;

  @IsNumber()
  totalAnswers: number;

  @IsNumber()
  xpEarned: number;

  @IsNumber()
  combo: number;

  @IsNumber()
  speedSeconds: number;

  @IsArray()
  wrongQuestionIds: string[];

  @IsBoolean()
  isCompleted: boolean;
}
