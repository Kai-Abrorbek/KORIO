import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { ExpressionScopeQueryDto } from './expression-scope-query.dto';

export class ListExpressionsQueryDto extends ExpressionScopeQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  pack?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  cursor?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 50;
}
