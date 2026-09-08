import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserStatsDocument = UserStats & Document;

@Schema({ timestamps: true })
export class UserStats {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ default: 0 })
  studyTimeSeconds: number;

  @Prop({ default: 0 })
  totalQuestions: number;

  @Prop({ default: 0 })
  correctQuestions: number;

  @Prop({ default: 0 })
  xpEarned: number;

  // 기존 vocabularyCount ~ listeningCount 5개 @Prop 전부 삭제하고 ↓
  /**
   * 카테고리별 문제 수. { vocab: 12, grammar: 8, topik: 4, ... }
   * 컬럼 대신 Map 이라 카테고리를 추가/삭제해도 스키마 변경이 필요 없다.
   * 키는 StudyCategory 값과 동일.
   */
  @Prop({ type: Map, of: Number, default: {} })
  categoryCounts: Map<string, number>;

  /**
   * 카테고리별 **정답** 수. categoryCounts 와 짝이다.
   *
   * 예전엔 정답 수가 하루 총합(correctQuestions)에만 있어서 "어휘는 잘하는데
   * 듣기가 약하다" 를 말할 방법이 없었다. 통계 화면의 강점·약점 진단이
   * 이 필드 위에 선다.
   *
   * ⚠️ 이 필드가 생기기 전 기록에는 값이 없다. 읽는 쪽은 attempted 가
   * 있는데 correct 가 없으면 "정확도 모름"으로 다뤄야 한다 — 0 으로 보면
   * 옛날부터 쓰던 유저가 전부 정확도 0% 로 보인다.
   */
  @Prop({ type: Map, of: Number, default: {} })
  categoryCorrect: Map<string, number>;
}

export const UserStatsSchema = SchemaFactory.createForClass(UserStats);

// recordStudy가 하루 통계를 원자적으로 누적할 수 있도록 사용자·날짜를 유일하게 만든다.
UserStatsSchema.index({ userId: 1, date: 1 }, { unique: true });
