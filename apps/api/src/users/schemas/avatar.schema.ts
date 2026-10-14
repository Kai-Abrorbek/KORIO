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

  /** 장착한 오라 (cosmetics) — 산 것만 */
  @Prop({ type: String, default: 'aura_none' })
  aura: string;

  /** 캐릭터 뒤 장면 (cosmetics, 예: scene_namsan) — 산 것·무료만 */
  @Prop({ type: String, default: 'scene_none' })
  scene: string;

  /** 캐릭터 옆 펫 (cosmetics, 예: pet_jindo) — 산 것·무료만 */
  @Prop({ type: String, default: 'pet_none' })
  pet: string;

  /** 기본 옷 대신 입는 의상 (cosmetics, 예: costume_stage) — 산 것·무료만 */
  @Prop({ type: String, default: 'costume_none' })
  costume: string;

  /** 오른손에 든 것 (cosmetics, 예: hand_lightstick) — 산 것·무료만 */
  @Prop({ type: String, default: 'hand_none' })
  hand: string;

  /** 기본 모자 대신 쓰는 모자 (cosmetics, 예: hat_gat) — 산 것·무료만 */
  @Prop({ type: String, default: 'hat_none' })
  hat: string;
}

export const AvatarConfigSchema = SchemaFactory.createForClass(AvatarConfig);
