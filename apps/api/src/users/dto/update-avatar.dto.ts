import { Equals, IsIn, IsInt, IsString } from 'class-validator';
import {
  AVATAR_OPTIONS,
  AVATAR_VERSION,
  type AvatarConfigValue,
} from '../avatar/avatar.constants';

export class UpdateAvatarDto {
  @IsInt()
  @Equals(AVATAR_VERSION)
  version: typeof AVATAR_VERSION;

  @IsString()
  @IsIn([...AVATAR_OPTIONS.skinTone])
  skinTone: AvatarConfigValue['skinTone'];

  @IsString()
  @IsIn([...AVATAR_OPTIONS.bodyShape])
  bodyShape: AvatarConfigValue['bodyShape'];

  @IsString()
  @IsIn([...AVATAR_OPTIONS.expression])
  expression: AvatarConfigValue['expression'];

  @IsString()
  @IsIn([...AVATAR_OPTIONS.eyeColor])
  eyeColor: AvatarConfigValue['eyeColor'];

  @IsString()
  @IsIn([...AVATAR_OPTIONS.hairstyle])
  hairstyle: AvatarConfigValue['hairstyle'];

  @IsString()
  @IsIn([...AVATAR_OPTIONS.hairColor])
  hairColor: AvatarConfigValue['hairColor'];

  @IsString()
  @IsIn([...AVATAR_OPTIONS.eyewear])
  eyewear: AvatarConfigValue['eyewear'];

  @IsString()
  @IsIn([...AVATAR_OPTIONS.facialHair])
  facialHair: AvatarConfigValue['facialHair'];

  @IsString()
  @IsIn([...AVATAR_OPTIONS.headwear])
  headwear: AvatarConfigValue['headwear'];

  @IsString()
  @IsIn([...AVATAR_OPTIONS.outfit])
  outfit: AvatarConfigValue['outfit'];

  @IsString()
  @IsIn([...AVATAR_OPTIONS.background])
  background: AvatarConfigValue['background'];
}
