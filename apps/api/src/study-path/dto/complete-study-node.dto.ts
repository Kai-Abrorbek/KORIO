import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Min } from 'class-validator';
import {
  STUDY_COMPLETABLE_KINDS,
  type StudyCompletableKind,
} from '../study-path.types';

export class CompleteStudyNodeDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  section: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  unit: number;

  @IsIn([...STUDY_COMPLETABLE_KINDS])
  kind: StudyCompletableKind;

  /** 같은 종류가 여럿일 때 몇 번째 노드인지 (1-based) */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  group?: number;

  /** 노드 안의 몇 번째 링인지 (1-based). 쪼개지 않는 노드는 1 */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  lesson?: number;
}
