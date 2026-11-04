import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { CourseScopeQueryDto } from '../../common/dto/course-scope-query.dto';
import {
  STORY_OPTION_COUNT,
  STORY_QUERY_LANGUAGES,
  STORY_QUESTION_COUNT,
  type StoryQueryLanguage,
} from '../stories.const';

/** 목록: 어느 코스의 이야기를, 어느 설명 언어로 */
export class ListStoriesQueryDto extends CourseScopeQueryDto {
  @IsOptional()
  @IsIn([...STORY_QUERY_LANGUAGES])
  lang: StoryQueryLanguage = 'uz';
}

/** 한 편: 설명 언어만 */
export class StoryLangQueryDto {
  @IsOptional()
  @IsIn([...STORY_QUERY_LANGUAGES])
  lang: StoryQueryLanguage = 'uz';
}

export class StoryAnswerDto {
  @IsString()
  @MaxLength(16)
  questionId: string;

  /** 고른 보기 번호. 정답 여부는 서버가 DB 를 보고 판단한다 */
  @IsInt()
  @Min(0)
  @Max(STORY_OPTION_COUNT - 1)
  choiceIndex: number;
}

/**
 * 완료 보고. 고른 답만 받는다 — 점수도 XP 도 서버가 정한다.
 * 문제를 건너뛰었으면 answers 가 비어서 온다 (듣기 XP 는 그대로 받는다).
 */
export class CompleteStoryDto {
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(STORY_QUESTION_COUNT)
  @ValidateNested({ each: true })
  @Type(() => StoryAnswerDto)
  answers?: StoryAnswerDto[];
}
