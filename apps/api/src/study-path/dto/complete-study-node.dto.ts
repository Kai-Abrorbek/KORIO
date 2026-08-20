import { Type } from 'class-transformer';
import { IsIn, IsInt, Min } from 'class-validator';
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
}
