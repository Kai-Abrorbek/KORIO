import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ _id: false })
export class WordCollectionPosition {
  @Prop({ required: true })
  groupId: string;

  @Prop({ min: 0, required: true })
  cardIndex: number;

  @Prop({ type: String, default: null })
  lastWordId: string | null;
}

const WordCollectionPositionSchema = SchemaFactory.createForClass(
  WordCollectionPosition,
);

@Schema({ timestamps: true })
export class UserWordCollection {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  /** String accommodates both persisted ObjectIds and read-only course IDs. */
  @Prop({ required: true })
  collectionId: string;

  @Prop({ default: true })
  saved: boolean;

  @Prop({ type: WordCollectionPositionSchema, default: null })
  lastPosition: WordCollectionPosition | null;

  @Prop({ type: Date, default: null })
  lastStudiedAt: Date | null;
}

export type UserWordCollectionDocument = HydratedDocument<UserWordCollection>;
export const UserWordCollectionSchema =
  SchemaFactory.createForClass(UserWordCollection);
UserWordCollectionSchema.index(
  { userId: 1, collectionId: 1 },
  { unique: true },
);
