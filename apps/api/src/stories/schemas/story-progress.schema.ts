import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

/**
 * 이야기 한 편에 대한 한 유저의 기록. 유저당 이야기당 한 문서.
 * ObjectId 가 아니라 code 로 잡는다 — 시드를 다시 밀어도 기록이 안 날아간다.
 */
@Schema({ timestamps: true })
export class StoryProgress {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  storyCode: string;

  @Prop({ required: true })
  courseId: string;

  /** 몇 번 끝까지 들었나. 두 번째부터는 XP 를 깎는 근거 */
  @Prop({ default: 0 })
  completions: number;

  @Prop()
  completedAt?: Date;

  /** 최고 기록. 다시 풀어서 더 못 맞혀도 깎지 않는다 */
  @Prop({ default: 0 })
  bestQuizCorrect: number;

  @Prop({ default: 0 })
  quizTotal: number;

  /**
   * 따라 읽기를 통과한 문장 id. 클라가 보내는 게 아니라 **서버가 발음 평가 중에
   * 직접 찍는다.** 여기 들어간 문장은 다시 통과해도 XP 를 안 준다.
   */
  @Prop({ type: [String], default: [] })
  shadowedSentenceIds: string[];

  @Prop({ default: 0 })
  totalXpEarned: number;
}

export type StoryProgressDocument = HydratedDocument<StoryProgress>;
export const StoryProgressSchema = SchemaFactory.createForClass(StoryProgress);

/** 동시 요청이 와도 문서가 둘로 갈라지지 않게 unique */
StoryProgressSchema.index({ userId: 1, storyCode: 1 }, { unique: true });
/** 목록 화면이 "이 코스에서 뭘 끝냈나" 를 한 번에 읽는다 */
StoryProgressSchema.index({ userId: 1, courseId: 1 });
