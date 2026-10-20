import { IsIn, IsOptional } from 'class-validator';
import { CourseScopeQueryDto } from '../../common/dto/course-scope-query.dto';
import { WORD_LANGUAGES, type WordLanguage } from '../schemas/word.schema';

export class WordLanguageQueryDto extends CourseScopeQueryDto {
  @IsOptional()
  @IsIn([...WORD_LANGUAGES])
  lang: WordLanguage = 'uz';
}
