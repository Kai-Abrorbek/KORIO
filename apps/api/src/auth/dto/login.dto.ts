import { Transform } from 'class-transformer';
import { normalizeEmail } from '../../common/normalize-email';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  // 저장·조회를 같은 형태로 맞춘다. 안 하면 대소문자만 다른 계정이 갈라진다
  @Transform(({ value }) => normalizeEmail(value))
  @IsEmail()
  @MaxLength(254)
  email: string;

  @IsString()
  @MaxLength(72)
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  sessionId?: string;
}
