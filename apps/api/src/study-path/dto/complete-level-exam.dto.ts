import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CompleteLevelExamDto {
  /** 이번에 푼 문제들 */
  @IsArray()
  questionIds: string[];

  @IsArray()
  @IsOptional()
  wrongQuestionIds?: string[];

  @IsNumber()
  @IsOptional()
  speedSeconds?: number;

  @IsString()
  @IsOptional()
  lang?: string;
}
