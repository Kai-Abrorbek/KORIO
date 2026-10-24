import { IsIn, IsOptional } from 'class-validator';
import { ExpressionLanguageQueryDto } from './expression-language-query.dto';
import {
  ExpressionProficiency,
  type ExpressionProficiency as ExpressionProficiencyValue,
} from '../schemas/expression-node.schema';

export class ExpressionProficiencyQueryDto extends ExpressionLanguageQueryDto {
  @IsOptional()
  @IsIn(Object.values(ExpressionProficiency))
  proficiency?: ExpressionProficiencyValue;
}
