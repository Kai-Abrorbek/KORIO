import { HangulLevel } from '../../common/enums/hangul-level.enum';
import { SelfReportedLevel } from '../../common/enums/self-level.enum';
import {
  ArrayMaxSize,
  IsBoolean,
  IsEnum,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  Validate,
  ValidateIf,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
} from 'class-validator';
import { isSafeImageUrl } from '../../common/safe-image-url';

@ValidatorConstraint({ name: 'safeImageUrl' })
class SafeImageUrlConstraint implements ValidatorConstraintInterface {
  validate(value: unknown) {
    return isSafeImageUrl(value);
  }
}

/**
 * PATCH /users/me.
 *
 * 예전엔 `@Body() dto: any` 였다. any 면 ValidationPipe 의 whitelist 가
 * 걸릴 스키마가 없어서 아무 타입이나 통과했다(권한 상승은 서비스단 allowlist
 * 덕에 막혀 있었지만, 10MB 짜리 bio 나 숫자 대신 객체는 그대로 들어갔다).
 */
export class UpdateMeDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  nickname?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9_.]+$/, { message: 'USERNAME_INVALID_CHARS' })
  username?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  bio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  country?: string;

  /** 빈 문자열 = 사진 지우기. 그 밖엔 소셜 제공자의 https 이미지만 (safe-image-url.ts) */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  @ValidateIf((_, value) => value !== '')
  @Validate(SafeImageUrlConstraint, { message: 'PROFILE_IMAGE_NOT_ALLOWED' })
  profileImage?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  targetLanguage?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(600)
  dailyGoalMinutes?: number;
}

/** POST /users/me/onboarding-survey */
export class SyncOnboardingSurveyDto {
  @IsOptional()
  @IsEnum(HangulLevel)
  hangulLevel?: HangulLevel;

  @IsOptional()
  @IsEnum(SelfReportedLevel)
  selfReportedLevel?: SelfReportedLevel;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(600)
  dailyGoalMinutes?: number;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  targetLanguage?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @MaxLength(40, { each: true })
  interests?: string[];

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(23)
  reminderHour?: number;

  @IsOptional()
  @IsBoolean()
  completeNow?: boolean;
}
