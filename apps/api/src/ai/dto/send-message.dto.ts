import { IsString, IsOptional, MaxLength } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @MaxLength(500)
  text: string;

  /** 번역·설명에 쓸 언어 (ko/uz/en/ru) */
  @IsString()
  @IsOptional()
  lang?: string;
}
