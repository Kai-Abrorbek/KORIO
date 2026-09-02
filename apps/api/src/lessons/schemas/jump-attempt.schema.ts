import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

/**
 * 유닛 점프 테스트 한 번의 응시 기록.
 *
 * 예전엔 서버가 점프 테스트를 기억하지 않아서, 클라가 그냥
 * `POST /lessons/jump-complete { section, unit }` 을 부르면 그 앞의 레슨이
 * 전부 완료 처리됐다. 시험을 봤다는 증거도, 합격 기준도 클라에 있었다.
 *
 * 이제 문제를 내줄 때 여기에 남기고, 완료 요청은 이 기록을 근거로만 처리한다.
 * - 어느 범위였는지(section/unit)를 서버가 안다 → 요청 body 의 범위를 안 믿는다
 * - 어떤 문제를 냈는지 안다 → 없는 문제 id 를 틀렸다고 보내면 걸러진다
 * - 합격 기준(heartLimit)이 서버에 있다 → 클라가 기준을 못 바꾼다
 * - 한 번 쓰면 닫힌다 → 같은 응시로 반복 통과 불가
 */
@Schema({ timestamps: true })
export class JumpAttempt {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  section: number;

  @Prop({ required: true })
  unit: number;

  /** 문제를 뽑고 진도를 열어 줄 로드맵 트랙 */
  @Prop({
    type: String,
    enum: ['vocabulary', 'grammar'],
    default: 'vocabulary',
  })
  category: 'vocabulary' | 'grammar';

  /** 이번 응시에 실제로 내준 문제들 */
  @Prop({ type: [Types.ObjectId], default: [] })
  questionIds: Types.ObjectId[];

  /** 틀려도 되는 개수. 이 수 이상 틀리면 불합격 */
  @Prop({ required: true })
  heartLimit: number;

  @Prop({ enum: ['open', 'passed', 'failed'], default: 'open' })
  status: string;

  @Prop({ default: 0 })
  wrongCount: number;

  /** 응시 만료 시각. 문제만 받아두고 며칠 뒤에 쓰는 걸 막는다 */
  @Prop({ required: true })
  expiresAt: Date;
}

export type JumpAttemptDocument = JumpAttempt & Document;
export const JumpAttemptSchema = SchemaFactory.createForClass(JumpAttempt);

// 오래된 응시는 알아서 지워진다
JumpAttemptSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
