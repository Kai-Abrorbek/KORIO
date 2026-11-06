import { ForbiddenException } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { createHash } from 'crypto';
import { Model } from 'mongoose';
import { normalizeEmailOptional } from '../../common/normalize-email';

/**
 * 탈퇴한 계정의 지문.
 *
 * 탈퇴하면 유저 문서가 통째로 지워져서, 같은 텔레그램·구글·이메일로 바로
 * 새 계정을 만들 수 있었다 — 초대 코드를 같은 사람이 계속 다시 넣어 보석을
 * 받는 데 쓰였다. 탈퇴할 때 신원을 해시로만 남기고, 90일 동안 그 신원으로는
 * 새 계정을 못 만들게 한다. 원래 값(이메일·아이디)은 저장하지 않는다.
 * blockedUntil 이 지나면 몽고 TTL 이 문서를 지운다.
 */
@Schema({ timestamps: true, collection: 'deleted_identities' })
export class DeletedIdentity {
  /** sha256("p:<provider>:<providerId>") 또는 sha256("e:<email>") */
  @Prop({ required: true, unique: true })
  key: string;

  @Prop({ required: true })
  blockedUntil: Date;
}

export const DeletedIdentitySchema =
  SchemaFactory.createForClass(DeletedIdentity);
DeletedIdentitySchema.index({ blockedUntil: 1 }, { expireAfterSeconds: 0 });

export const REJOIN_BLOCK_DAYS = 90;
export const ACCOUNT_RECENTLY_DELETED = 'ACCOUNT_RECENTLY_DELETED';

export interface IdentityParts {
  provider?: string | null;
  providerId?: string | null;
  email?: string | null;
}

const sha = (s: string) => createHash('sha256').update(s).digest('hex');

/** 이 신원을 가리키는 지문들. 소셜 아이디와 이메일은 따로 막는다 */
export function identityKeys(parts: IdentityParts): string[] {
  const keys: string[] = [];
  const providerId = parts.providerId?.trim();
  // 이메일 가입(local)은 providerId 가 없거나 의미가 없다 — 이메일로 막는다
  if (parts.provider && parts.provider !== 'local' && providerId)
    keys.push(sha(`p:${parts.provider}:${providerId}`));
  const email = normalizeEmailOptional(parts.email ?? undefined);
  if (email) keys.push(sha(`e:${email}`));
  return keys;
}

/** 탈퇴할 때 부른다. 다시 탈퇴하는 경우(90일 뒤 재가입)엔 기간을 새로 잡는다 */
export async function recordDeletedIdentity(
  model: Model<DeletedIdentity>,
  parts: IdentityParts,
  now = new Date(),
) {
  const blockedUntil = new Date(
    now.getTime() + REJOIN_BLOCK_DAYS * 24 * 60 * 60 * 1000,
  );
  const keys = identityKeys(parts);
  if (!keys.length) return;
  await model.bulkWrite(
    keys.map((key) => ({
      updateOne: {
        filter: { key },
        update: { $set: { key, blockedUntil } },
        upsert: true,
      },
    })),
  );
}

/**
 * 새 계정을 만들기 직전에 부른다. 이미 있는 계정의 로그인에는 부르지 않는다.
 * TTL 은 1분 단위로 늦게 돌아서 blockedUntil 도 직접 본다.
 */
export async function assertCanRejoin(
  model: Model<DeletedIdentity>,
  parts: IdentityParts,
  now = new Date(),
) {
  const keys = identityKeys(parts);
  if (!keys.length) return;
  const hit = await model.exists({
    key: { $in: keys },
    blockedUntil: { $gt: now },
  });
  if (hit) throw new ForbiddenException(ACCOUNT_RECENTLY_DELETED);
}
