import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { ExpressionLanguageQueryDto } from './expression-language-query.dto';

export class ExpressionScopeQueryDto extends ExpressionLanguageQueryDto {
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
