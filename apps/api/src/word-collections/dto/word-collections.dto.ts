import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsIn,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { CourseScopeQueryDto } from '../../common/dto/course-scope-query.dto';
import {
  WORD_LANGUAGES,
  type WordLanguage,
} from '../../words/schemas/word.schema';
import {
  WORD_COLLECTION_COVERS,
  WORD_COLLECTION_KINDS,
  WORD_COLLECTION_LEVELS,
} from '../schemas/word-collection.schema';

export class WordCollectionsQueryDto extends CourseScopeQueryDto {
  @IsOptional()
  @IsIn([...WORD_LANGUAGES])
  lang: WordLanguage = 'uz';
}

export class CollectionWordsQueryDto extends WordCollectionsQueryDto {
  @IsString()
  @MaxLength(80)
  @Matches(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/)
  groupId: string;

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

export class CollectionPositionDto {
  @IsString()
  @MaxLength(80)
  @Matches(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/)
  groupId: string;

  @IsInt()
  @Min(0)
  @Max(99999)
  cardIndex: number;

  @IsOptional()
  @IsMongoId()
  lastWordId?: string;
}

class CollectionLocalizedTextDto {
  [language: string]: string;
  @IsString() @IsNotEmpty() @MaxLength(500) ko: string;
  @IsString() @IsNotEmpty() @MaxLength(500) en: string;
  @IsString() @IsNotEmpty() @MaxLength(500) uz: string;
  @IsString() @IsNotEmpty() @MaxLength(500) ru: string;
}

class CollectionGroupDto {
  @IsString()
  @MaxLength(80)
  @Matches(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/)
  id: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => CollectionLocalizedTextDto)
  title: CollectionLocalizedTextDto;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(500)
  @IsMongoId({ each: true })
  wordIds: string[];
}

export class WriteWordCollectionDto extends CourseScopeQueryDto {
  @IsString()
  @MaxLength(80)
  @Matches(/^(?!course-)[a-z][a-z0-9-]*$/)
  code: string;

  @IsIn([...WORD_COLLECTION_KINDS])
  kind: (typeof WORD_COLLECTION_KINDS)[number];

  @IsIn([...WORD_COLLECTION_LEVELS])
  level: (typeof WORD_COLLECTION_LEVELS)[number];

  @IsIn([...WORD_COLLECTION_COVERS])
  cover: (typeof WORD_COLLECTION_COVERS)[number];

  @IsDefined()
  @ValidateNested()
  @Type(() => CollectionLocalizedTextDto)
  title: CollectionLocalizedTextDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CollectionLocalizedTextDto)
  description?: CollectionLocalizedTextDto;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(200)
  @ValidateNested({ each: true })
  @Type(() => CollectionGroupDto)
  groups: CollectionGroupDto[];

  @IsOptional()
  @IsBoolean()
  isActive: boolean = false;
}
