import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ReportAnswerDto } from '../../analytics/dto/report-answer.dto';
import { MAX_ANSWERS_PER_REPORT } from '../../analytics/analytics.const';

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

  /**
   * 에너지로 칠 정답 수 — **본풀이**에서 맞힌 것만.
   * 틀린 문제 다시 풀기(복습 라운드)는 에너지를 안 쓴다. 없으면 correctAnswers.
   */
  @IsInt()
  @Min(0)
  @Max(1000)
  @IsOptional()
  energySpent?: number;

  /**
   * 이 판의 에너지 세션 id (앱이 레슨을 열 때 만든다). 레슨 도중 /energy/spend 로
   * 이미 깎은 만큼은 완료 때 다시 깎지 않는다.
   */
  @IsString()
  @MaxLength(64)
  @IsOptional()
  energySession?: string;

  /**
   * 이 판의 계측 id (`GET /lessons/:id` 응답의 attemptId).
   *
   * 선택값인 이유: 배포 직후에는 이걸 모르는 옛 앱이 남아 있다. 없으면 서버가
   * 열려 있는 가장 최근 판으로 떨어뜨린다 — 완료가 통계에서 통째로 사라지는
   * 것보다는 낫다.
   */
  @IsOptional()
  @IsString()
  @MaxLength(64)
  attemptId?: string;

  /**
   * 문제별 답안. **통계 전용이고 보상 계산에 일절 안 쓰인다.**
   *
   * 이게 있어야 문제별 정답률·풀이시간이 계산된다. 지금까지는 틀린 문제만
   * 누적 카운트로 남아서(UserMistake) 정답률의 분모 자체가 없었다.
   */
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(MAX_ANSWERS_PER_REPORT)
  @ValidateNested({ each: true })
  @Type(() => ReportAnswerDto)
  answers?: ReportAnswerDto[];
}
