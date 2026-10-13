import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ExpressionPack } from './expression-pack.schema';

/**
 * 표현 로드맵에서 사용자가 고른 "지금 위치".
 *
 * 표현 로드맵은 진도만으로 열고 잠근다(앞 노드를 다 익혀야 다음이 열린다). 그런데 표현은
 * 상황별이라 순서 의존이 약해서, 목록이나 "이 주제로 넘어갈까요?" 로 원하는 주제로 바로
 * 가게 했다 — 고른 주제의 처음부터 길을 다시 연다. 없으면(null) 처음부터.
 * 진도(user-expression-progress)는 건드리지 않는다 — 다시 고르면 언제든 돌아간다.
 */
@Schema({ timestamps: true })
export class UserExpressionPath {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: ExpressionPack.name, default: null })
  focusPackId: Types.ObjectId | null;
}

export type UserExpressionPathDocument = HydratedDocument<UserExpressionPath>;
export const UserExpressionPathSchema =
  SchemaFactory.createForClass(UserExpressionPath);
