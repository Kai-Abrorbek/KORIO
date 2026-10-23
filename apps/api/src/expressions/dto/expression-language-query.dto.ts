import { IsIn, IsOptional } from 'class-validator';
import { CourseScopeQueryDto } from '../../common/dto/course-scope-query.dto';
import {
  EXPRESSION_LANGUAGES,
  type ExpressionLanguage,
} from '../schemas/expression-pack.schema';

export class ExpressionLanguageQueryDto extends CourseScopeQueryDto {
  @IsOptional()
  @IsIn([...EXPRESSION_LANGUAGES])
  lang: ExpressionLanguage = 'uz';
}
