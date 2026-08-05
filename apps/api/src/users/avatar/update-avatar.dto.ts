import { Equals, IsIn, IsString } from 'class-validator';
import { AVATAR_OPTIONS, AVATAR_VERSION } from './avatar.constants';

export class UpdateAvatarDto {
  @Equals(AVATAR_VERSION)
  version: number;

  @IsString()
  @IsIn(AVATAR_OPTIONS.skinTone)
  skinTone: string;

  @IsString()
  @IsIn(AVATAR_OPTIONS.bodyShape)
  bodyShape: string;

  @IsString()
  @IsIn(AVATAR_OPTIONS.expression)
  expression: string;

  @IsString()
  @IsIn(AVATAR_OPTIONS.eyeColor)
  eyeColor: string;

  @IsString()
  @IsIn(AVATAR_OPTIONS.hairstyle)
  hairstyle: string;

  @IsString()
  @IsIn(AVATAR_OPTIONS.hairColor)
  hairColor: string;

  @IsString()
  @IsIn(AVATAR_OPTIONS.eyewear)
  eyewear: string;

  @IsString()
  @IsIn(AVATAR_OPTIONS.facialHair)
  facialHair: string;

  @IsString()
  @IsIn(AVATAR_OPTIONS.headwear)
  headwear: string;

  @IsString()
  @IsIn(AVATAR_OPTIONS.outfit)
  outfit: string;

  @IsString()
  @IsIn(AVATAR_OPTIONS.background)
  background: string;
}
