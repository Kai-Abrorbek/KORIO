import { IsIn, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class GradeAnswerDto {
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  answer: string;

  @IsOptional()
  @IsString()
  @IsIn(['ko', 'uz', 'en', 'ru'])
  lang?: 'ko' | 'uz' | 'en' | 'ru';
}
