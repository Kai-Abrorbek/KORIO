import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';
import { MAX_PLACEMENT_LEVEL } from '../../lessons/placement.const';

export class SetStudyLevelDto {
  /** 시작할 급수 (1~6). 콘텐츠가 없는 급은 서비스가 거부한다 */
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(MAX_PLACEMENT_LEVEL)
  level: number;
}
