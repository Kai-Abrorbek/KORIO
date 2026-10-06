import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayReportKind = 'estimated_sales' | 'earnings';

/** One active version per Google Cloud Storage object. Old row versions remain
 * inert until a separately reviewed retention policy is introduced. */
@Schema({ timestamps: true })
export class PlayReportFile {
  @Prop({ required: true, unique: true })
  path: string;

  @Prop({ required: true })
  kind: PlayReportKind;

  @Prop({ required: true })
  month: string;

  @Prop({ required: true })
  generation: string;

  @Prop({ required: true })
  sha256: string;

  @Prop({ required: true })
  rowCount: number;

  @Prop({ required: true })
  importedAt: Date;
}

export type PlayReportFileDocument = PlayReportFile & Document;
export const PlayReportFileSchema =
  SchemaFactory.createForClass(PlayReportFile);
PlayReportFileSchema.index({ kind: 1, month: 1 });

@Schema({ timestamps: false })
export class PlayReportRow {
  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  sha256: string;

  @Prop({ required: true })
  rowIndex: number;

  @Prop({ required: true })
  kind: PlayReportKind;

  /** Estimated-sales dates are UTC; earnings dates are Google Play report dates (PT). */
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  amountMinor: number;

  @Prop({ required: true })
  category: 'charge' | 'refund' | 'fee' | 'tax' | 'other';

  @Prop({ default: '' })
  orderNumber: string;

  @Prop({ default: '' })
  skuId: string;
}

export type PlayReportRowDocument = PlayReportRow & Document;
export const PlayReportRowSchema = SchemaFactory.createForClass(PlayReportRow);
PlayReportRowSchema.index(
  { path: 1, sha256: 1, rowIndex: 1 },
  { unique: true },
);
PlayReportRowSchema.index({ kind: 1, currency: 1, date: 1 });

@Schema({ timestamps: false })
export class PlayReportSyncState {
  @Prop({ required: true, unique: true })
  key: string;

  @Prop({ type: Date, default: null })
  lastSuccessfulCheckAt: Date | null;

  @Prop({ type: Date, default: null })
  lastFailureAt: Date | null;

  @Prop({ type: Date, default: null })
  leaseUntil: Date | null;

  @Prop({ type: String, default: null })
  leaseOwner: string | null;
}

export type PlayReportSyncStateDocument = PlayReportSyncState & Document;
export const PlayReportSyncStateSchema =
  SchemaFactory.createForClass(PlayReportSyncState);
