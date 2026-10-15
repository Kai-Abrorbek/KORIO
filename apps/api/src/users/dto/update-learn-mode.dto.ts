import { IsIn, IsOptional, IsString } from 'class-validator';
import {
  LEARN_COURSES,
  LEARN_MODES,
  TOPIK_LEVELS,
  type LearnCourse,
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

  /** 어느 코스(언어)의 모드인지. 예전 앱은 안 보낸다 — 서버가 모드로 정한다 */
  @IsOptional()
  @IsString()
  @IsIn([...LEARN_COURSES])
  course?: LearnCourse;
}
