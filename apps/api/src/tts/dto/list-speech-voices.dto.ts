import { IsIn, IsOptional } from 'class-validator';
import type { SpeechLanguage } from './synthesize-speech.dto';

export class ListSpeechVoicesDto {
  @IsOptional()
  @IsIn(['ko-KR', 'uz-UZ', 'en-US', 'ru-RU'])
  language?: SpeechLanguage;
}
