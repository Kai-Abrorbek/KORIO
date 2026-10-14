import { Equals, IsIn, IsInt, IsOptional, IsString } from 'class-validator';
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

  /** 오라 — 없으면(예전 앱) 지금 장착한 걸 그대로 둔다. 산 것만 장착 가능 */
  @IsOptional()
  @IsString()
  @IsIn([...AVATAR_OPTIONS.aura])
  aura?: AvatarConfigValue['aura'];

  /** 장면 — 없으면(예전 앱) 지금 것을 그대로 둔다. 산 것·무료만 */
  @IsOptional()
  @IsString()
  @IsIn([...AVATAR_OPTIONS.scene])
  scene?: AvatarConfigValue['scene'];
}
