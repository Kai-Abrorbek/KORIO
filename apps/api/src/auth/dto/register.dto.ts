import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @MaxLength(254)
  email: string;

  // bcrypt 는 72바이트까지만 본다. 상한이 없으면 긴 문자열로 해싱 비용만
  // 키우는 요청을 계속 던질 수 있다.
  @IsString()
  @MinLength(6)
  @MaxLength(72)
  password: string;

  @IsString()
  @MinLength(1)
  @MaxLength(30)
  nickname: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  sessionId?: string; // 온보딩 데이터 연결용
}
