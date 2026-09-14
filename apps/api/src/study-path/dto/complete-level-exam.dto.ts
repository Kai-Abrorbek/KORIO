import {
  ArrayMaxSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

/**
 * 급수 졸업 시험 결과.
 *
 * ⚠️ 여기 담긴 값은 전부 **앱이 보내는 값**이다. 서버는 questionIds 가 실제로
 *    이 급수 범위의 문제인지 대조한 뒤에 합격을 판정한다
 *    (study-path.service.completeLevelExam 참고). 이 DTO 는 그 앞에서
 *    형태만 막는다 — 예전엔 @IsArray() 뿐이라 원소 타입도 길이도 자유였다.
 */
export class CompleteLevelExamDto {
  /** 이번에 푼 문제들 */
  @IsArray()
  @ArrayMaxSize(200)
  @IsString({ each: true })
  @MaxLength(64, { each: true })
  questionIds: string[];

  @IsArray()
  @ArrayMaxSize(200)
  @IsString({ each: true })
  @MaxLength(64, { each: true })
  @IsOptional()
  wrongQuestionIds?: string[];

  @IsNumber()
  @IsOptional()
  speedSeconds?: number;

  @IsString()
  @IsOptional()
  @MaxLength(8)
  lang?: string;
}
