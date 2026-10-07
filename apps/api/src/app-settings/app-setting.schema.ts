import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AppSettingDocument = AppSetting & Document;

@Schema({ timestamps: true })
export class AppSetting {
  @Prop({ type: String, required: true, unique: true })
  key: string;

  @Prop({ type: Number, required: true })
  value: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  updatedBy: Types.ObjectId;

  @Prop({ type: String, required: true })
  reason: string;

  updatedAt?: Date;
}

export const AppSettingSchema = SchemaFactory.createForClass(AppSetting);
