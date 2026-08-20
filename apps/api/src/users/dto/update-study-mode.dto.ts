import { IsIn, IsString } from 'class-validator';
import { STUDY_MODES, type StudyMode } from '../learn-mode.constants';

export class UpdateStudyModeDto {
  @IsString()
  @IsIn([...STUDY_MODES])
  studyMode: StudyMode;
}
