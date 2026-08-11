import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { TopikExamType, TopikSection } from '../schemas/topik-content.schema';

export class TopikStatsQueryDto {
  @IsOptional()
  @IsEnum(TopikExamType)
  examType: TopikExamType = TopikExamType.TOPIK_II;

  @IsOptional()
  @IsEnum(TopikSection)
  section?: TopikSection;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit = 20;
}
