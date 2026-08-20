import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  ExpressionPack,
  LocalizedExpressionText,
  LocalizedExpressionTextSchema,
} from './expression-pack.schema';

export const DEFAULT_EXPRESSION_EXPOSURES = 3;

@Schema({ timestamps: true })
export class ExpressionNode {
  @Prop({ required: true, trim: true })
  code: string;

  @Prop({ type: Types.ObjectId, ref: ExpressionPack.name, required: true })
  packId: Types.ObjectId;

  @Prop({ type: LocalizedExpressionTextSchema, required: true })
  title: LocalizedExpressionText;

  @Prop({ type: LocalizedExpressionTextSchema, required: true })
  description: LocalizedExpressionText;

  @Prop({ default: 'chatbubble-ellipses-outline', trim: true })
  icon: string;

  @Prop({ required: true, min: 1 })
  order: number;

  @Prop({ min: 1, max: 5, default: DEFAULT_EXPRESSION_EXPOSURES })
  requiredExposures: number;

  @Prop({ default: true })
  isActive: boolean;
}

export type ExpressionNodeDocument = HydratedDocument<ExpressionNode>;
export const ExpressionNodeSchema = SchemaFactory.createForClass(ExpressionNode);

ExpressionNodeSchema.index({ code: 1 }, { unique: true });
ExpressionNodeSchema.index(
  { packId: 1, order: 1 },
  { unique: true, partialFilterExpression: { isActive: true } },
);
