import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Matches,
  ValidateNested,
} from 'class-validator';
import {
  VOICE_TUTOR_LANGUAGES,
  VOICE_TUTOR_STYLES,
} from '../voice-tutor.config';
import { VOICE_TUTOR_PERSONALITY_IDS } from '../personality/voice-tutor-personalities';

export class UpdateVoiceTutorSettingsDto {
  @IsOptional()
  @IsString()
  @MaxLength(40)
  voiceId?: string;

  @IsOptional()
  @IsIn(VOICE_TUTOR_STYLES)
  speechStyle?: 'polite' | 'casual';

  @IsOptional()
  @IsIn(VOICE_TUTOR_LANGUAGES)
  explanationLanguage?: 'en' | 'ru' | 'uz';

  @IsOptional()
  @IsString()
  @MaxLength(40)
  koreanLevel?: string;

  @IsOptional()
  @IsIn(VOICE_TUTOR_PERSONALITY_IDS)
  personality?: 'friendly' | 'close_friend' | 'savage' | 'chaotic_savage';

  @IsOptional()
  @IsIn(['female_01', 'male_01'])
  characterId?: 'female_01' | 'male_01';
}

export class CreateVoiceTutorSessionDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateVoiceTutorSettingsDto)
  settings?: UpdateVoiceTutorSettingsDto;
}

export class VoiceTutorAgentTurnDto {
  @IsString()
  @Matches(/^[A-Za-z0-9_-]{1,80}$/)
  turnId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(3000)
  transcript: string;
}
