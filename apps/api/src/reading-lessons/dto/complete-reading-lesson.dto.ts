import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { READING_WRITING_MAX_CHARS } from '../reading-lessons.const';

export class ReadingAnswerDto {
  @IsString()
  @MaxLength(64)
  questionId: string;

  /** 고른 보기 번호. 정답 여부는 서버가 DB 를 보고 판단한다 */
  @IsInt()
  @Min(0)
  @Max(20)
  choiceIndex: number;
}

export class ReadingVocabularyExerciseAnswerDto {
  @IsString()
  @MaxLength(64)
  exerciseId: string;

  @IsString()
  @MaxLength(64)
  blankId: string;

  /** 단어 상자에서 고른 기본형 */
  @IsString()
  @MaxLength(100)
  baseWord: string;

  /** 문장 빈칸에 실제로 넣은 형태 */
  @IsString()
  @MaxLength(200)
  response: string;
}

/**
 * 읽기 레슨 완료 보고.
 *
 * 점수도 XP 도 받지 않는다. 유저가 무엇을 골랐는지만 받고 채점은 서버가 한다.
 * 낭독 완료는 아예 여기로 안 온다 — 발음 평가 중에 서버가 직접 찍는다.
 */
export class CompleteReadingLessonDto {
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(30)
  @ValidateNested({ each: true })
  @Type(() => ReadingAnswerDto)
  answers?: ReadingAnswerDto[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(120)
  @ValidateNested({ each: true })
  @Type(() => ReadingVocabularyExerciseAnswerDto)
  exerciseAnswers?: ReadingVocabularyExerciseAnswerDto[];

  @IsOptional()
  @IsString()
  @MaxLength(READING_WRITING_MAX_CHARS)
  writingText?: string;
}
