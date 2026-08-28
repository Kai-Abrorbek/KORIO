import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CompleteLessonDto {
  // 서버가 다시 한 번 레슨 문제 수로 자르지만, 말도 안 되는 값은 여기서 먼저 막는다
  @IsInt()
  @Min(0)
  @Max(1000)
  correctAnswers: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  totalAnswers: number;

  /** ⚠️ 서버는 이 값을 쓰지 않는다. XP 는 서버가 계산한다 (호환용으로만 받음) */
  @IsInt()
  @Min(0)
  @Max(100000)
  xpEarned: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  combo: number;

  @IsInt()
  @Min(0)
  @Max(86400)
  speedSeconds: number;

  @IsArray()
  @ArrayMaxSize(200)
  @IsString({ each: true })
  @MaxLength(64, { each: true })
  wrongQuestionIds: string[];

  @IsBoolean()
  isCompleted: boolean;
}
