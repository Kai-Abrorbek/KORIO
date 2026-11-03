import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AdminLoginDto {
  @IsEmail()
  @MaxLength(200)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(200)
  password: string;

  /** 2단계 인증이 켜진 어드민만 — 인증 앱의 6자리 */
  @IsOptional()
  @IsString()
  @MaxLength(12)
  otp?: string;
}
