import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  AVATAR_VERSION,
  DEFAULT_AVATAR_CONFIG,
} from '../avatar/avatar.constants';

@Schema({
  _id: false,
  id: false,
})
export class AvatarConfig {
  @Prop({
    type: Number,
    default: AVATAR_VERSION,
  })
  version: number;

  @Prop({
    type: String,
    default: DEFAULT_AVATAR_CONFIG.skinTone,
  })
  skinTone: string;

  @Prop({
    type: String,
    default: DEFAULT_AVATAR_CONFIG.bodyShape,
  })
  bodyShape: string;

  @Prop({
    type: String,
    default: DEFAULT_AVATAR_CONFIG.expression,
  })
  expression: string;

  @Prop({
    type: String,
    default: DEFAULT_AVATAR_CONFIG.eyeColor,
  })
  eyeColor: string;

  @Prop({
    type: String,
    default: DEFAULT_AVATAR_CONFIG.hairstyle,
  })
  hairstyle: string;

  @Prop({
    type: String,
    default: DEFAULT_AVATAR_CONFIG.hairColor,
  })
  hairColor: string;

  @Prop({
    type: String,
    default: DEFAULT_AVATAR_CONFIG.eyewear,
  })
  eyewear: string;

  @Prop({
    type: String,
    default: DEFAULT_AVATAR_CONFIG.facialHair,
  })
  facialHair: string;

  @Prop({
    type: String,
    default: DEFAULT_AVATAR_CONFIG.headwear,
  })
  headwear: string;

  @Prop({
    type: String,
    default: DEFAULT_AVATAR_CONFIG.outfit,
  })
  outfit: string;

  @Prop({
    type: String,
    default: DEFAULT_AVATAR_CONFIG.background,
  })
  background: string;
}

export const AvatarConfigSchema = SchemaFactory.createForClass(AvatarConfig);
