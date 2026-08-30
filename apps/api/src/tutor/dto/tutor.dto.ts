import { IsIn, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { ROLE_PLAY_SCENES, TUTOR_MODES } from '../tutor.const';

export class CreateTutorSessionDto {
  @IsString()
  @IsIn(TUTOR_MODES)
  mode: string;

  /** 상황극일 때만 */
  @IsOptional()
  @IsString()
  @IsIn([...ROLE_PLAY_SCENES])
  scene?: string;

  /** 학습자 모국어 = 앱 UI 언어. 다른 API 들과 같은 규칙 */
  @IsOptional()
  @IsString()
  @IsIn(['uz', 'en', 'ru', 'ko'])
  lang?: string;
}

export class EndTutorSessionDto {
  @IsString()
  @MaxLength(64)
  sessionId: string;

  /** 클라가 잰 대화 시간. 서버가 시작 시각으로 상한을 잡아 검증한다 */
  @IsInt()
  @Min(0)
  @Max(24 * 60 * 60)
  durationSec: number;
}
