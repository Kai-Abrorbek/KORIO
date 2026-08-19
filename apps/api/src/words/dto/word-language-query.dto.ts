import { IsIn, IsOptional } from 'class-validator';
import {
  WORD_LANGUAGES,
  type WordLanguage,
} from '../schemas/word.schema';

export class WordLanguageQueryDto {
  @IsOptional()
  @IsIn([...WORD_LANGUAGES])
  lang: WordLanguage = 'uz';
}
