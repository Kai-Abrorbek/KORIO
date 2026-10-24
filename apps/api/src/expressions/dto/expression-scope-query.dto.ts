import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { ExpressionProficiencyQueryDto } from './expression-proficiency-query.dto';

export class ExpressionScopeQueryDto extends ExpressionProficiencyQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  section?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  unit?: number;
}
