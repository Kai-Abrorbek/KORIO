import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class TelegramMiniAppLoginDto {
  @IsString()
  @MinLength(1)
  @MaxLength(16_384)
  initData: string;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  sessionId?: string;
}
