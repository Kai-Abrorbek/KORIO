import {
  ArrayMaxSize,
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  MAX_EXPLAIN_CHARS,
  MAX_TRANSCRIPT_TURN_CHARS,
  MAX_TRANSCRIPT_TURNS,
  MAX_TTS_TEXT_CHARS,
} from '../tutor.const';
import { ROLE_PLAY_SCENES, TUTOR_MODES, TUTOR_VOICES } from '../tutor.const';
import { TOPIC_IDS } from '../topics/tutor-topics';

export class CreateTutorSessionDto {
  @IsString()
  @IsIn(TUTOR_MODES)
  mode: string;

  /** 상황극일 때만 */
  @IsOptional()
  @IsString()
  @IsIn([...ROLE_PLAY_SCENES])
  scene?: string;

  /** 오늘 연습할 주제. 없으면 자유 대화 */
  @IsOptional()
  @IsString()
  @IsIn(TOPIC_IDS)
  topicId?: string;

  /**
   * 어느 선생님과 할지. 목소리·말투·속도가 여기서 정해진다.
   * 모르는 id 여도 서버가 기본 선생님으로 떨어뜨린다 — 세션을 실패시키지 않는다
   */
  @IsOptional()
  @IsString()
  @MaxLength(40)
  teacherId?: string;

  /** 목소리. 세션 시작 뒤에는 못 바꾼다 */
  @IsOptional()
  @IsString()
  @IsIn([...TUTOR_VOICES])
  voice?: string;

  /** 학습자 모국어 = 앱 UI 언어. 다른 API 들과 같은 규칙 */
  @IsOptional()
  @IsString()
  @IsIn(['uz', 'en', 'ru', 'ko'])
  lang?: string;
}

/**
 * 대화 한 마디.
 *
 * 앱이 자막으로 이미 받아둔 걸 종료할 때 한 번에 올린다. 서버가 Realtime
 * 세션을 따로 듣고 있지 않아서 이 경로 말고는 대화 내용을 알 방법이 없다.
 * 저장하지는 않는다 — 요약만 남기고 버린다.
 */
export class TranscriptTurnDto {
  @IsString()
  @IsIn(['user', 'tutor'])
  role: 'user' | 'tutor';

  @IsString()
  @MaxLength(MAX_TRANSCRIPT_TURN_CHARS)
  text: string;
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

  /** 요약을 쓸 언어. 없으면 우즈벡어 */
  @IsOptional()
  @IsString()
  @IsIn(['uz', 'en', 'ru', 'ko'])
  lang?: string;

  /**
   * 이번 대화 내용. 없으면 요약을 건너뛴다.
   * 상한은 서버에서 한 번 더 자르지만, 여기서 막아야 본문 크기 자체가 안 커진다.
   */
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(MAX_TRANSCRIPT_TURNS)
  @ValidateNested({ each: true })
  @Type(() => TranscriptTurnDto)
  transcript?: TranscriptTurnDto[];
}

export class TutorSpeakDto {
  @IsString()
  @MaxLength(MAX_TTS_TEXT_CHARS)
  text: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  teacherId?: string;

  /** 'ko' 가 기본. 우즈벡어 도움말을 소리로 듣고 싶을 때만 'uz' */
  @IsOptional()
  @IsIn(['ko', 'uz'])
  language?: string;

  /** 있으면 그 세션의 TTS 글자 수에 더한다 (미리듣기는 없다) */
  @IsOptional()
  @IsString()
  @MaxLength(40)
  sessionId?: string;
}

export class TutorExplainDto {
  @IsString()
  @MaxLength(MAX_EXPLAIN_CHARS)
  text: string;

  @IsOptional()
  @IsIn(['uz', 'ru', 'en', 'ko'])
  lang?: string;
}
