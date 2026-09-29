import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User, UserDocument } from '../users/schemas/user.schema';
import { findUserByEmail } from '../users/find-by-email';
import { hashPhone } from '../users/users.service';
import { normalizeEmail } from '../common/normalize-email';
import { jwtSecret } from '../config/secrets';
import { MailService } from '../mail/mail.service';
import { resolveMailLang } from '../mail/mail.types';
import { signupCodeMail } from '../mail/mail.templates';
import { AuthService } from './auth.service';
import {
  PendingSignup,
  PendingSignupDocument,
} from './schemas/pending-signup.schema';
import {
  RegisterDto,
  ResendSignupDto,
  VerifySignupDto,
} from './dto/register.dto';

/** 코드가 살아있는 시간 */
const CODE_TTL_MIN = 10;
/** 코드를 이만큼 틀리면 그 건은 죽는다. 처음부터 다시 */
const MAX_ATTEMPTS = 5;

/**
 * 이메일 인증 가입.
 *
 *   1) start  — 입력값 검사 → 대기 건 저장 → 6자리 코드 메일
 *   2) verify — 코드가 맞으면 그때 계정을 만들고 바로 로그인
 *   (resend  — 같은 대기 건에 새 코드)
 *
 * 비밀번호 찾기(PasswordResetService)와 같은 규칙: 코드는 CSPRNG, 저장은 HMAC,
 * 비교는 timingSafeEqual, 5회 틀리면 무효.
 */
@Injectable()
export class SignupVerificationService {
  private readonly logger = new Logger(SignupVerificationService.name);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(PendingSignup.name)
    private readonly pendingModel: Model<PendingSignupDocument>,
    private readonly mail: MailService,
    private readonly auth: AuthService,
  ) {}

  async start(dto: RegisterDto) {
    const email = normalizeEmail(dto.email);
    // 가입 화면이라 "이미 있는 주소" 는 알려준다 (옛 가입 API 도 그랬다)
    if (await findUserByEmail(this.userModel, email)) {
      throw new ConflictException('EMAIL_ALREADY_EXISTS');
    }

    let phone: { phoneHash?: string; phoneLast4?: string } = {};
    if (dto.phone?.trim()) {
      const e164 = dto.phone.replace(/[^\d+]/g, '');
      if (!/^\+[1-9]\d{7,14}$/.test(e164)) {
        throw new BadRequestException('INVALID_PHONE');
      }
      const hash = hashPhone(e164);
      if (await this.userModel.exists({ phoneHash: hash })) {
        throw new ConflictException('PHONE_ALREADY_REGISTERED');
      }
      phone = { phoneHash: hash, phoneLast4: e164.slice(-4) };
    }

    const code = this.newCode();
    const lang = resolveMailLang(dto.lang);
    // 같은 주소로 다시 시작하면 앞의 대기 건을 덮는다 (입력값을 고쳤을 수 있다)
    await this.pendingModel.findOneAndUpdate(
      { email },
      {
        $set: {
          email,
          passwordHash: await bcrypt.hash(dto.password, 10),
          nickname: dto.nickname.trim(),
          ...phone,
          sessionId: dto.sessionId,
          lang,
          codeHash: this.hash(code),
          attempts: 0,
          expiresAt: new Date(Date.now() + CODE_TTL_MIN * 60_000),
        },
        ...(dto.phone?.trim() ? {} : { $unset: { phoneHash: 1, phoneLast4: 1 } }),
      },
      { upsert: true },
    );

    const sent = await this.mail.send(signupCodeMail(email, lang, code, CODE_TTL_MIN));
    if (!sent) {
      this.logger.warn('가입 인증 메일이 안 나갔다. 유저는 코드를 못 받는다');
      throw new BadRequestException('MAIL_SEND_FAILED');
    }
    return { success: true as const, email, expiresInSec: CODE_TTL_MIN * 60 };
  }

  /**
   * 같은 대기 건에 새 코드를 보낸다. 대기 건이 없어도 성공으로 답한다
   * (주소 존재 여부를 흘리지 않는다). 대기 건이 이미 만료돼 지워졌으면
   * 앱이 가입 화면으로 돌아가야 하는데 — 그건 verify 에서 INVALID_CODE 로 안다.
   */
  async resend(dto: ResendSignupDto) {
    const email = normalizeEmail(dto.email);
    const doc = await this.pendingModel.findOne({ email });
    if (!doc) return { success: true as const };

    const code = this.newCode();
    doc.codeHash = this.hash(code);
    doc.attempts = 0;
    doc.expiresAt = new Date(Date.now() + CODE_TTL_MIN * 60_000);
    if (dto.lang) doc.lang = dto.lang;
    await doc.save();

    const lang = resolveMailLang(doc.lang);
    const sent = await this.mail.send(signupCodeMail(email, lang, code, CODE_TTL_MIN));
    if (!sent) this.logger.warn('가입 인증 메일(재전송)이 안 나갔다');
    return { success: true as const };
  }

  async verify(dto: VerifySignupDto) {
    const email = normalizeEmail(dto.email);
    const doc = await this.pendingModel.findOne({
      email,
      expiresAt: { $gt: new Date() },
    });
    if (!doc) throw new BadRequestException('INVALID_CODE');

    if (doc.attempts >= MAX_ATTEMPTS) {
      await doc.deleteOne();
      throw new BadRequestException('TOO_MANY_ATTEMPTS');
    }

    if (!this.sameHash(this.hash(dto.code), doc.codeHash)) {
      doc.attempts += 1;
      await doc.save();
      throw new BadRequestException(
        doc.attempts >= MAX_ATTEMPTS ? 'TOO_MANY_ATTEMPTS' : 'INVALID_CODE',
      );
    }

    // 먼저 지운다. 같은 코드로 두 요청이 겹쳐도 계정은 한 번만 만든다
    const claimed = await this.pendingModel.findOneAndDelete({ _id: doc._id });
    if (!claimed) throw new BadRequestException('INVALID_CODE');

    return this.auth.createVerifiedLocalUser({
      email,
      passwordHash: doc.passwordHash,
      nickname: doc.nickname,
      phoneHash: doc.phoneHash,
      phoneLast4: doc.phoneLast4,
      sessionId: doc.sessionId,
    });
  }

  /** 000000 도 유효한 코드다. Math.random 이 아니라 CSPRNG 를 쓴다 */
  private newCode(): string {
    return String(crypto.randomInt(0, 1_000_000)).padStart(6, '0');
  }

  /** 6자리는 100만 가지뿐이라 키 없는 해시는 DB 가 새면 바로 뒤집힌다 */
  private hash(value: string): string {
    return crypto.createHmac('sha256', jwtSecret()).update(value).digest('hex');
  }

  private sameHash(a: string, b: string): boolean {
    if (!a || !b || a.length !== b.length) return false;
    return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
  }
}
