import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User, UserDocument } from '../users/schemas/user.schema';
import { AuthProvider } from '../common/enums/provider.enum';
import { jwtSecret } from '../config/secrets';
import { MailService } from '../mail/mail.service';
import { resolveMailLang } from '../mail/mail.types';
import {
  passwordResetMail,
  passwordResetSocialMail,
} from '../mail/mail.templates';
import {
  PasswordReset,
  PasswordResetDocument,
} from './schemas/password-reset.schema';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyResetCodeDto,
} from './dto/password-reset.dto';

/** 코드가 살아있는 시간 */
const CODE_TTL_MIN = 10;
/** 코드 확인을 통과한 뒤 새 비밀번호를 정할 때까지 주는 시간 */
const TOKEN_TTL_MIN = 10;
/** 코드를 이만큼 틀리면 그 건은 죽는다. 다시 받아야 한다 */
const MAX_ATTEMPTS = 5;

@Injectable()
export class PasswordResetService {
  private readonly logger = new Logger(PasswordResetService.name);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(PasswordReset.name)
    private readonly resetModel: Model<PasswordResetDocument>,
    private readonly mail: MailService,
    private readonly auth: AuthService,
  ) {}

  // ─────────────────────────── 1. 코드 발송 ───────────────────────────

  /**
   * 재설정 코드를 메일로 보낸다.
   *
   * ⚠️ 응답은 **무조건 성공**이다. "그런 계정 없다" 를 돌려주면 이 엔드포인트가
   * 곧 회원 목록 조회기가 된다 (아무 메일이나 넣어보면 가입 여부가 나온다).
   * 계정이 없든, 소셜 계정이든, 메일 발송이 실패했든 밖에서는 구분되지 않는다.
   */
  async forgot(dto: ForgotPasswordDto) {
    const user = await this.findByEmail(dto.email);
    if (!user) return { success: true as const };

    // 유저가 앱에서 고른 언어가 있으면 그게 우선. 없으면 지금 앱의 언어
    const lang = resolveMailLang(user.appLanguage || dto.lang);
    const email = user.email;

    // 소셜 계정은 비밀번호 자체가 없다. 코드를 보내봐야 바꿀 게 없으니
    // 어떻게 들어오면 되는지만 알려준다
    if (!user.password || user.provider !== AuthProvider.LOCAL) {
      void this.mail.send(
        passwordResetSocialMail(email, lang, String(user.provider ?? '')),
      );
      return { success: true as const };
    }

    // 새로 요청하면 앞의 건은 죽는다. 여러 개가 동시에 살아 있으면
    // "가장 최근 것" 을 고르는 규칙에 빈틈이 생긴다
    await this.resetModel.deleteMany({ userId: user._id });

    const code = this.newCode();
    await this.resetModel.create({
      userId: user._id,
      codeHash: this.hash(code),
      expiresAt: new Date(Date.now() + CODE_TTL_MIN * 60_000),
    });

    const sent = await this.mail.send(
      passwordResetMail(email, lang, code, CODE_TTL_MIN),
    );
    if (!sent) {
      this.logger.warn('재설정 코드 메일이 안 나갔다. 유저는 코드를 못 받는다');
    }
    return { success: true as const };
  }

  // ─────────────────────────── 2. 코드 확인 ───────────────────────────

  /**
   * 코드가 맞으면 1회용 토큰을 준다.
   *
   * 실패는 전부 같은 에러(INVALID_CODE)로 돌려준다 — "코드는 맞는데 만료됐다"
   * 같은 구분은 공격자에게만 정보가 된다. 단, 시도 횟수를 다 쓴 경우만
   * 따로 알려준다. 그건 유저가 다시 받아야 한다는 안내라서 필요하다.
   */
  async verify(dto: VerifyResetCodeDto) {
    const user = await this.findByEmail(dto.email);
    if (!user) throw new BadRequestException('INVALID_CODE');

    const doc = await this.resetModel
      .findOne({
        userId: user._id,
        consumedAt: null,
        codeHash: { $ne: '' },
        expiresAt: { $gt: new Date() },
      })
      .sort({ createdAt: -1 });
    if (!doc) throw new BadRequestException('INVALID_CODE');

    if (doc.attempts >= MAX_ATTEMPTS) {
      doc.consumedAt = new Date();
      await doc.save();
      throw new BadRequestException('TOO_MANY_ATTEMPTS');
    }

    // 길이가 같아서 timingSafeEqual 을 그대로 쓸 수 있다.
    // 문자열 === 는 앞자리부터 비교해서 맞은 자릿수만큼 시간이 늘어난다
    if (!this.sameHash(this.hash(dto.code), doc.codeHash)) {
      doc.attempts += 1;
      await doc.save();
      throw new BadRequestException(
        doc.attempts >= MAX_ATTEMPTS ? 'TOO_MANY_ATTEMPTS' : 'INVALID_CODE',
      );
    }

    const token = crypto.randomBytes(32).toString('hex');
    doc.codeHash = ''; // 맞힌 코드는 여기서 죽는다
    doc.tokenHash = this.hash(token);
    doc.expiresAt = new Date(Date.now() + TOKEN_TTL_MIN * 60_000);
    await doc.save();

    return { resetToken: token, expiresInSec: TOKEN_TTL_MIN * 60 };
  }

  // ─────────────────────────── 3. 새 비밀번호 ───────────────────────────

  /**
   * 토큰을 확인하고 비밀번호를 바꾼다. 바로 로그인까지 시켜준다 —
   * 메일을 열 수 있고 새 비밀번호까지 정한 사람이면 본인이 맞다.
   */
  async reset(dto: ResetPasswordDto) {
    const doc = await this.resetModel.findOne({
      tokenHash: this.hash(dto.resetToken),
      consumedAt: null,
      expiresAt: { $gt: new Date() },
    });
    if (!doc) throw new BadRequestException('INVALID_RESET_TOKEN');

    // 토큰을 먼저 태운다. 두 요청이 겹쳐 들어와도 비밀번호가 두 번 안 바뀐다
    const claimed = await this.resetModel.findOneAndUpdate(
      { _id: doc._id, consumedAt: null },
      { $set: { consumedAt: new Date(), tokenHash: '' } },
    );
    if (!claimed) throw new BadRequestException('INVALID_RESET_TOKEN');

    const user = await this.userModel.findById(doc.userId).select('+password');
    if (!user) throw new BadRequestException('INVALID_RESET_TOKEN');

    user.password = await bcrypt.hash(dto.newPassword, 10);
    // 비밀번호를 잊었다는 건 남이 쓰고 있을 수도 있다는 뜻이다.
    // 이 값을 올리면 기존에 나간 토큰이 전부 그 자리에서 죽는다
    user.tokenVersion = (user.tokenVersion ?? 0) + 1;
    await user.save();

    // 이 유저의 다른 재설정 건도 같이 정리한다
    await this.resetModel.deleteMany({ userId: user._id });

    return this.auth.generateToken(user);
  }

  // ─────────────────────────── 도구 ───────────────────────────

  /** 000000 도 유효한 코드다. Math.random 이 아니라 CSPRNG 를 쓴다 */
  private newCode(): string {
    return String(crypto.randomInt(0, 1_000_000)).padStart(6, '0');
  }

  /**
   * 키를 섞은 해시.
   *
   * 6자리는 경우의 수가 100만뿐이라, 평범한 sha256 이면 DB 만 새도 무지개표로
   * 즉시 뒤집힌다. JWT_SECRET 을 키로 쓰면 시크릿 없이는 못 돌린다.
   */
  private hash(value: string): string {
    return crypto.createHmac('sha256', jwtSecret()).update(value).digest('hex');
  }

  private sameHash(a: string, b: string): boolean {
    if (!a || !b || a.length !== b.length) return false;
    return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
  }

  /**
   * 메일로 유저를 찾는다.
   *
   * 가입 때 이메일을 소문자로 맞춰주지 않아서 'Kai@x.com' 과 'kai@x.com' 이
   * 서로 다른 문서로 들어갈 수 있다. 폰 자판이 첫 글자를 대문자로 올리는 일이
   * 흔해서, 정확히 안 맞으면 대소문자 무시로 한 번 더 본다.
   * 단 그렇게 해서 **둘 이상** 걸리면 누구 것인지 확신할 수 없으므로 아무것도
   * 하지 않는다 — 남의 계정으로 코드를 보내는 것보다 못 찾는 게 낫다.
   */
  private async findByEmail(raw: string): Promise<UserDocument | null> {
    const email = (raw ?? '').trim();
    if (!email) return null;

    const exact = await this.userModel.findOne({ email }).select('+password');
    if (exact) return exact;

    const rx = new RegExp(`^${email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');
    const matches = await this.userModel
      .find({ email: rx })
      .limit(2)
      .select('+password');
    return matches.length === 1 ? matches[0] : null;
  }
}
