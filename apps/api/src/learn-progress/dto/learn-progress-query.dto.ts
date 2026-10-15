import { IsIn, IsOptional } from 'class-validator';
import {
  EXPRESSION_LANGUAGES,
  type ExpressionLanguage,
} from '../../expressions/schemas/expression-pack.schema';
import {
  LEARN_COURSES,
  LEARN_MODES,
  STUDY_MODES,
  TOPIK_LEVELS,
  type LearnCourse,
  type LearnMode,
  type StudyMode,
  type TopikLevel,
} from '../../users/learn-mode.constants';

/** 앱이 지금 띄운 코스·모드. 비우면 계정에 저장된 값으로 센다 */
export class LearnProgressQueryDto {
  @IsOptional()
  @IsIn([...LEARN_COURSES])
  course?: LearnCourse;

  @IsOptional()
  @IsIn([...LEARN_MODES])
  mode?: LearnMode;

  @IsOptional()
  @IsIn([...STUDY_MODES])
  studyMode?: StudyMode;

  @IsOptional()
  @IsIn([...TOPIK_LEVELS])
  topikLevel?: TopikLevel;

  /** 주제 이름을 어느 말로 줄지 */
  @IsOptional()
  @IsIn([...EXPRESSION_LANGUAGES])
  lang: ExpressionLanguage = 'uz';
}
