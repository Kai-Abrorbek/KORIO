import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AVATAR_VERSION, DEFAULT_AVATAR_CONFIG } from './avatar.constants';

@Schema({ _id: false })
export class AvatarConfig {
  @Prop({ default: AVATAR_VERSION })
  version: number;

  @Prop({ default: DEFAULT_AVATAR_CONFIG.skinTone })
  skinTone: string;

  @Prop({ default: DEFAULT_AVATAR_CONFIG.bodyShape })
  bodyShape: string;

  @Prop({ default: DEFAULT_AVATAR_CONFIG.expression })
  expression: string;

  @Prop({ default: DEFAULT_AVATAR_CONFIG.eyeColor })
  eyeColor: string;

  @Prop({ default: DEFAULT_AVATAR_CONFIG.hairstyle })
  hairstyle: string;

  @Prop({ default: DEFAULT_AVATAR_CONFIG.hairColor })
  hairColor: string;

  @Prop({ default: DEFAULT_AVATAR_CONFIG.eyewear })
  eyewear: string;

  @Prop({ default: DEFAULT_AVATAR_CONFIG.facialHair })
  facialHair: string;

  @Prop({ default: DEFAULT_AVATAR_CONFIG.headwear })
  headwear: string;

  @Prop({ default: DEFAULT_AVATAR_CONFIG.outfit })
  outfit: string;

  @Prop({ default: DEFAULT_AVATAR_CONFIG.background })
  background: string;
}

export const AvatarConfigSchema = SchemaFactory.createForClass(AvatarConfig);
