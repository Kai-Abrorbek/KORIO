import { IsIn, IsOptional } from 'class-validator';
import {
  EXPRESSION_LANGUAGES,
  type ExpressionLanguage,
} from '../schemas/expression-pack.schema';

export class ExpressionLanguageQueryDto {
  @IsOptional()
  @IsIn([...EXPRESSION_LANGUAGES])
  lang: ExpressionLanguage = 'uz';
}
