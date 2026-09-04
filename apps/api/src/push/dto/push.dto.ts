import {
  IsBoolean,
  IsIn,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { PUSH_LANGS } from '../push.types';

export class RegisterDeviceDto {
  @IsString()
  @MaxLength(200)
  token: string;

  @IsOptional()
  @IsIn(['android', 'ios'])
  platform?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  deviceName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  appVersion?: string;

  @IsOptional()
  @IsIn(PUSH_LANGS)
  appLanguage?: string;
}

export class UnregisterDeviceDto {
  @IsString()
  @MaxLength(200)
  token: string;
}

export class PushSettingsDto {
  @IsOptional() @IsBoolean() master?: boolean;
  @IsOptional() @IsBoolean() daily?: boolean;
  @IsOptional() @IsBoolean() streak?: boolean;
  @IsOptional() @IsBoolean() league?: boolean;
  @IsOptional() @IsBoolean() friends?: boolean;
  @IsOptional() @IsBoolean() events?: boolean;

  /** 학습 알림을 받을 로컬 시각 (0~23) */
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(23)
  dailyHour?: number;

  @IsOptional()
  @IsIn(PUSH_LANGS)
  appLanguage?: string;
}

/**
 * 어드민 공지.
 *
 * 언어별 문구를 받는다. 한 언어만 주면 전원에게 그 문구가 간다 —
 * 우즈벡 유저에게 한국어 공지를 보내는 건 안 보낸 것만 못하다.
 */
export class AnnounceDto {
  /** 중복 발송 방지 키. 같은 값으로 다시 부르면 안 나간다 */
  @IsString()
  @MaxLength(80)
  key: string;

  @IsObject()
  title: Record<string, string>;

  @IsObject()
  body: Record<string, string>;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  link?: string;
}

/** 테스트 발송 — 자기 자신에게만 나간다 */
export class TestPushDto {
  @IsOptional()
  @IsString()
  @MaxLength(40)
  type?: string;

  @IsOptional()
  @IsObject()
  params?: Record<string, any>;

  /** 문구 변형 번호. 안 넘기면 매번 다른 게 나온다 */
  @IsOptional()
  @IsInt()
  @Min(0)
  rotation?: number;
}

export class PreviewPushDto {
  /** 이 시각이라면 무엇이 나갈지 (0~23). 안 넘기면 지금 시각 */
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(23)
  hour?: number;
}
