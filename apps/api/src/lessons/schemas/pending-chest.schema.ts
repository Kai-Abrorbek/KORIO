import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

/**
 * 받아갈 상자 하나.
 *
 * 예전에는 노드를 다 끝내는 순간 보석을 바로 넣어줬다. 안전하긴 한데 받는
 * 느낌이 없었다 — 알림 하나 뜨고 끝이라 유저는 보상을 받았다는 걸 거의 모른다.
 * 이제 여기 쌓아두고 로드맵의 상자를 눌러서 가져간다.
 *
 * ⚠️ 총 보상량은 그대로다. 주는 시점만 옮긴 것이지 경제를 바꾼 게 아니다.
 * 등급·보석은 **만들 때 서버가 굴려서 확정**한다. 받을 때 굴리면 앱을 껐다
 * 켜며 좋은 등급이 나올 때까지 다시 뽑을 수 있다.
 */
@Schema({ timestamps: true })
export class PendingChest {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  /**
   * 이 상자를 벌게 한 것의 키. 같은 것으로 두 번 벌 수 없게 하는 자물쇠다.
   *  - 자유 학습: 로드맵 노드 id
   *  - 학습 로드: 그 하루의 키 (`day:3-2`)
   */
  @Prop({ required: true })
  sourceKey: string;

  @Prop({ default: 1 })
  section: number;

  @Prop({ required: true })
  grade: string;

  @Prop({ required: true })
  gems: number;

  /** 무실수로 끝냈는지. 보석에 이미 반영돼 있고 화면 문구용으로 남긴다 */
  @Prop({ default: false })
  perfect: boolean;

  /**
   * 받아간 시각. null 이면 아직 안 받은 것.
   * ⚠️ type 을 명시해야 한다 — `Date | null` 은 유니온이라 Mongoose 가 타입을
   * 못 정하고 **서버가 부팅 중에 죽는다.** 타입체크로는 안 잡힌다.
   */
  @Prop({ type: Date, default: null })
  claimedAt: Date | null;
}

export type PendingChestDocument = HydratedDocument<PendingChest>;
export const PendingChestSchema = SchemaFactory.createForClass(PendingChest);

/** 같은 것으로 상자를 두 번 만들 수 없다. 동시 요청도 여기서 막힌다 */
PendingChestSchema.index({ userId: 1, sourceKey: 1 }, { unique: true });
/** 안 받은 것 조회 */
PendingChestSchema.index({ userId: 1, claimedAt: 1 });
