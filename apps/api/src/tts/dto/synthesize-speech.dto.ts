import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  Matches,
} from 'class-validator';

export type SpeechLanguage = 'ko-KR' | 'uz-UZ' | 'en-US' | 'ru-RU';

export class SynthesizeSpeechDto {
  @IsString()
  @Length(1, 1000)
  text: string;

  @IsOptional()
  @IsIn(['ko-KR', 'uz-UZ', 'en-US', 'ru-RU'])
  language?: SpeechLanguage;

  @IsOptional()
  @IsNumber()
  @Min(0.25)
  @Max(2)
  rate?: number;

  @IsOptional()
  @IsIn(['female', 'male'])
  gender?: 'female' | 'male';

  @IsOptional()
  @IsString()
  @MaxLength(120)
  @Matches(/^(?:ko-KR|uz-UZ|en-US|ru-RU)-[A-Za-z0-9:._-]+$/)
  voice?: string;
}
