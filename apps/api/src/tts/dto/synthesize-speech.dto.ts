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

  /**
   * 가입 전 온보딩 세션 (mobile 의 store/onboarding.store.ts).
   *
   * 로그인한 요청은 안 보낸다. 신원 증명이 아니라 **게스트 상한을 걸 단위**다 —
   * 이게 없으면 IP 하나로 묶여서, 같은 와이파이를 쓰는 사람들이 서로의 몫을
   * 깎아먹는다.
   */
  @IsOptional()
  @IsString()
  @Matches(/^session_\d{10,16}_[A-Za-z0-9]{4,24}$/)
  sessionId?: string;
}
