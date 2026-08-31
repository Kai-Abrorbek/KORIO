import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

/**
 * 읽기/듣기 레슨 한 편에 대한 한 유저의 진도.
 *
 * 일반 레슨의 UserProgress 와 따로 두는 이유: 그쪽은 lessonId(ObjectId)와
 * 문제별 정오답을 전제로 짜여 있는데, 읽기 레슨은 문제가 문서 안에 박혀 있고
 * (Question 컬렉션을 안 쓴다) 낭독·쓰기처럼 성격이 다른 활동이 섞여 있다.
 * 억지로 한 스키마에 넣으면 양쪽 다 지저분해진다.
 *
 * 유저당 레슨당 한 문서. 다시 풀면 이 문서를 갱신한다.
 */
@Schema({ timestamps: true })
export class ReadingLessonProgress {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  /** ObjectId 가 아니라 code 로 잡는다 — 시드를 다시 밀어도 진도가 안 날아간다 */
  @Prop({ required: true })
  lessonCode: string;

  @Prop({ required: true })
  level: number;

  // ── 낭독 ──
  //
  // 이 두 값은 클라가 보내는 게 아니라 **서버가 발음 평가 중에 직접 관찰해서**
  // 찍는다. "다 읽었다" 를 클라가 주장하게 두면 그냥 눌러서 XP 를 받는다.

  /** 본문을 끝까지 읽어낸 시각 */
  @Prop()
  pronunciationCompletedAt?: Date;

  /** 지금까지 도달한 최대 단어 수 */
  @Prop({ default: 0 })
  bestReadWords: number;

  @Prop({ default: 0 })
  totalWords: number;

  // ── 확인 문제 ──

  /** 최고 기록. 다시 풀어서 더 못 맞혀도 깎지 않는다 */
  @Prop({ default: 0 })
  bestQuizCorrect: number;

  @Prop({ default: 0 })
  quizTotal: number;

  // ── 쓰기 ──

  /** 유저가 쓴 글. 나중에 첨삭에 쓸 수 있게 남긴다 (길이 제한은 서비스에서) */
  @Prop()
  writingText?: string;

  @Prop()
  writingSubmittedAt?: Date;

  // ── 집계 ──

  @Prop()
  completedAt?: Date;

  /** 몇 번 끝냈는지. 두 번째부터는 XP 를 깎는 근거 */
  @Prop({ default: 0 })
  completions: number;

  @Prop({ default: 0 })
  totalXpEarned: number;
}

export type ReadingLessonProgressDocument =
  HydratedDocument<ReadingLessonProgress>;
export const ReadingLessonProgressSchema = SchemaFactory.createForClass(
  ReadingLessonProgress,
);

/** 유저당 레슨당 하나. 동시 요청이 와도 문서가 둘로 갈라지지 않게 unique */
ReadingLessonProgressSchema.index(
  { userId: 1, lessonCode: 1 },
  { unique: true },
);
/** 목록 화면에서 "이 레벨에서 뭘 끝냈나" 를 한 번에 읽는다 */
ReadingLessonProgressSchema.index({ userId: 1, level: 1 });
