import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  nickname: string;

  @IsOptional()
  @IsString()
  sessionId?: string; // 온보딩 데이터 연결용
}
