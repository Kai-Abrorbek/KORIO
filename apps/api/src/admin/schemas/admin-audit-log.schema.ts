import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AdminAuditLogDocument = AdminAuditLog & Document;

/**
 * 어드민이 한 일의 기록. **지우지 않고 고치지 않는다.**
 *
 * 운영 도구에서 감사 로그가 없으면 "누가 이 문제의 정답을 바꿨나" 에 아무도
 * 답할 수 없다. 특히 어드민이 여러 명이 되는 순간 이게 없으면 사고가 나도
 * 원인을 못 찾는다.
 *
 * before/after 를 통째로 넣지 않고 **바뀐 필드만** 담는다. 문제 문서 하나가
 * 크고, 전체를 두 벌 저장하면 로그가 본 데이터보다 커진다.
 */
@Schema({ timestamps: true })
export class AdminAuditLog {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  adminId: Types.ObjectId;

  /** 계정이 지워져도 누구였는지 남게 복사해 둔다 */
  @Prop({ default: '' })
  adminEmail: string;

  @Prop({ default: '' })
  adminRole: string;

  /** 점 표기 행동 이름. 예: user.ban, question.update, operations.maintenance_on */
  @Prop({ required: true })
  action: string;

  /** 무엇에 대한 행동인가. 예: user, question, lesson, subscription */
  @Prop({ default: '' })
  targetType: string;

  @Prop({ default: '' })
  targetId: string;

  /** 사람이 알아볼 이름 (이메일·문제 코드 등). id 만 있으면 나중에 못 읽는다 */
  @Prop({ default: '' })
  targetLabel: string;

  /** 바뀐 필드만: { answer: { from: '학교에 가요', to: '학교에 갑니다' } } */
  @Prop({ type: Object, default: {} })
  changes: Record<string, { from: unknown; to: unknown }>;

  /** 위험한 행동에서 받은 사유 */
  @Prop({ default: '' })
  reason: string;

  @Prop({ default: '' })
  ip: string;

  @Prop({ default: '' })
  userAgent: string;

  /** 실패한 시도도 남긴다 — 권한 없는 시도가 더 중요한 신호일 때가 있다 */
  @Prop({ default: true })
  success: boolean;

  @Prop({ default: '' })
  errorCode: string;

  @Prop({ default: Date.now })
  at: Date;
}

export const AdminAuditLogSchema = SchemaFactory.createForClass(AdminAuditLog);

// 최근 순 목록 (감사 로그 화면의 기본 조회)
AdminAuditLogSchema.index({ at: -1 });
// 특정 어드민이 한 일
AdminAuditLogSchema.index({ adminId: 1, at: -1 });
// 이 문제/유저에 무슨 일이 있었나 — 상세 화면에서 바로 본다
AdminAuditLogSchema.index({ targetType: 1, targetId: 1, at: -1 });
