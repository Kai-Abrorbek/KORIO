import { IsIn, IsOptional, IsString } from 'class-validator';
import {
  LEARN_MODES,
  TOPIK_LEVELS,
  type LearnMode,
  type TopikLevel,
} from '../learn-mode.constants';

export class UpdateLearnModeDto {
  @IsString()
  @IsIn([...LEARN_MODES])
  learnMode: LearnMode;

  /** 토픽을 고를 때만 함께 온다 */
  @IsOptional()
  @IsString()
  @IsIn([...TOPIK_LEVELS])
  topikLevel?: TopikLevel;
}
