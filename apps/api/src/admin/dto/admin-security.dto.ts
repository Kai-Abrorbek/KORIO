import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ADMIN_PASSWORD_MIN_LENGTH } from '../admin.const';

/** 운영 콘솔 "내 보안" — 2단계 인증·비밀번호 */
export class AdminPasswordConfirmDto {
  @IsString()
  @MaxLength(200)
  password: string;
}

export class AdminOtpDto {
  @IsString()
  @MaxLength(12)
  otp: string;
}

export class AdminDisableTwoFactorDto {
  @IsString()
  @MaxLength(200)
  password: string;

  @IsString()
  @MaxLength(12)
  otp: string;
}

export class AdminChangePasswordDto {
  @IsString()
  @MaxLength(200)
  currentPassword: string;

  @IsString()
  @MinLength(ADMIN_PASSWORD_MIN_LENGTH, { message: 'PASSWORD_TOO_SHORT' })
  @MaxLength(200)
  newPassword: string;

  @IsOptional()
  @IsString()
  @MaxLength(12)
  otp?: string;
}
