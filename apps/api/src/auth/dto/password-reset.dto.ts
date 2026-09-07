import { Transform } from 'class-transformer';
import { normalizeEmail } from '../../common/normalize-email';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MAIL_LANGS } from '../../mail/mail.types';

export class ForgotPasswordDto {
  // 저장·조회를 같은 형태로 맞춘다. 안 하면 대소문자만 다른 계정이 갈라진다
  @Transform(({ value }) => normalizeEmail(value))
  @IsEmail()
  @MaxLength(254)
  email: string;

  /**
   * 메일을 어느 말로 쓸지. 로그인 전이라 서버가 유저 설정을 못 읽는 경우가
   * 있어서 앱이 현재 언어를 같이 보낸다 (계정이 있으면 그쪽 설정을 우선한다).
   */
  @IsOptional()
  @IsIn([...MAIL_LANGS])
  lang?: string;
}

export class VerifyResetCodeDto {
  // 저장·조회를 같은 형태로 맞춘다. 안 하면 대소문자만 다른 계정이 갈라진다
  @Transform(({ value }) => normalizeEmail(value))
  @IsEmail()
  @MaxLength(254)
  email: string;

  @IsString()
  @Length(6, 6)
  code: string;
}

export class ResetPasswordDto {
  @IsString()
  @Length(32, 128)
  resetToken: string;

  // bcrypt 는 72바이트까지만 본다 — 가입 DTO 와 같은 상한
  @IsString()
  @MinLength(6)
  @MaxLength(72)
  newPassword: string;
}
