import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserLeague } from '../../users/schemas/user.schema';

export type LeagueRoomDocument = LeagueRoom & Document;

@Schema({ timestamps: true })
export class LeagueRoom {
  @Prop({ enum: UserLeague, required: true })
  tier: UserLeague;

  @Prop({ required: true, index: true })
  weekKey: string; // "2026-W26" 형식

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  members: Types.ObjectId[];

  @Prop({ default: false })
  settled: boolean; // 정산 완료 여부
}

export const LeagueRoomSchema = SchemaFactory.createForClass(LeagueRoom);
LeagueRoomSchema.index({ tier: 1, weekKey: 1 });
