import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { TopikAttemptMode } from '../schemas/topik-attempt.schema';

export class StartTopikAttemptDto {
  @IsEnum(TopikAttemptMode)
  mode: TopikAttemptMode;

  @IsOptional()
  @IsBoolean()
  resume: boolean = true;
}
