import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import {
  READING_LANGUAGES,
  type ReadingLanguage,
} from '../schemas/reading-lesson.schema';

export class ListReadingLessonsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(6)
  level: number = 1;

  @IsOptional()
  @IsIn([...READING_LANGUAGES])
  lang: ReadingLanguage = 'uz';
}
