import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  Optional,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AdminAuditService } from '../admin/admin-audit.service';
import type { AdminRequestContext } from '../admin/guards/admin.guard';
import { AuthProvider } from '../common/enums/provider.enum';
import { MailService } from '../mail/mail.service';
import { TelegramBotApi } from '../payments/providers/telegram-stars/telegram-bot.api';
import { botLang } from '../payments/providers/telegram-stars/telegram-stars.texts';
import { PushService } from '../push/push.service';
import { PushType } from '../push/push.types';
import { User, UserDocument } from '../users/schemas/user.schema';
import type { CreateSupportTicketDto } from './dto/support.dto';
import {
  SupportTicket,
  SupportTicketDocument,
  SupportReply,
  SUPPORT_STATUSES,
  type SupportReplyChannel,
  type SupportStatus,
} from './schemas/support-ticket.schema';
import { supportReplyBotText } from './support-bot-text';

const MAX_DAILY_TICKETS = 5;
const EMAIL_RE = /^\S+@\S+\.\S+$/;

type ReplyTarget = {
  email?: string | null;
  provider?: string | null;
  providerId?: string | null;
  appLanguage?: string | null;
};

/**
 * 답장이 갈 곳. 텔레그램 미니앱 유저는 이메일이 없어서 예전엔 답장 자체가
 * 막혔다(SUPPORT_USER_EMAIL_UNAVAILABLE) — 이제 봇 메시지로 간다.
 */
export function replyChannelOf(
  user: ReplyTarget | null | undefined,
): SupportReplyChannel {
  if (user?.provider === AuthProvider.TELEGRAM && user.providerId)
    return 'telegram';
  if (EMAIL_RE.test(user?.email?.trim() ?? '')) return 'email';
  return 'app';
}

const REPLY_AUDIT_REASON: Record<SupportReplyChannel, string> = {
  email: '사용자 문의 이메일 답변',
  telegram: '사용자 문의 텔레그램 답변',
  app: '사용자 문의 앱 내 답변',
};

const toId = (value: string) => {
  if (!Types.ObjectId.isValid(value))
    throw new BadRequestException('INVALID_SUPPORT_TICKET_ID');
  return new Types.ObjectId(value);
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    const escaped: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return escaped[char];
  });

@Injectable()
export class SupportService {
  constructor(
    @InjectModel(SupportTicket.name)
    private readonly tickets: Model<SupportTicketDocument>,
    @InjectModel(User.name)
    private readonly users: Model<UserDocument>,
    private readonly mail: MailService,
    private readonly audit: AdminAuditService,
    @Optional() private readonly bot?: TelegramBotApi,
    @Optional() private readonly push?: PushService,
  ) {}

  async create(userId: string, input: CreateSupportTicketDto) {
    const user = await this.users.findById(toId(userId)).select('email').lean();
    if (!user) throw new NotFoundException('USER_NOT_FOUND');
    const since = new Date(Date.now() - 24 * 60 * 60_000);
    if (
      (await this.tickets.countDocuments({
        userId: user._id,
        createdAt: { $gte: since },
      })) >= MAX_DAILY_TICKETS
    ) {
      throw new ConflictException('SUPPORT_DAILY_LIMIT');
    }
    const subject = input.subject?.trim();
    const message = input.message?.trim();
    if (!subject || subject.length < 4 || !message || message.length < 10)
      throw new BadRequestException('INVALID_SUPPORT_MESSAGE');
    const ticket = await this.tickets.create({
      userId: user._id,
      emailAtCreation: user.email ?? '',
      category: input.category,
      subject,
      message,
      status: 'open',
    });
    return this.publicTicket(ticket);
  }

  async listMine(userId: string) {
    const uid = toId(userId);
    const [rows, user] = await Promise.all([
      this.tickets
        .find({ userId: uid })
        .sort({ createdAt: -1, _id: -1 })
        .limit(30)
        .lean(),
      this.users
        .findById(uid)
        .select('email provider providerId')
        .lean<ReplyTarget>(),
    ]);
    const channel = replyChannelOf(user);
    return {
      items: rows.map((row) => this.publicTicket(row)),
      // 문의 화면이 "답변은 어디로 와요" 를 보여준다
      replyTo: {
        channel,
        email: channel === 'email' ? (user?.email?.trim() ?? null) : null,
      },
    };
  }

  async listForAdmin(query: {
    page?: string;
    pageSize?: string;
    status?: string;
  }) {
    const page = Number(query.page ?? 1);
    const pageSize = Number(query.pageSize ?? 20);
    const status = query.status?.trim() ?? '';
    if (
      !Number.isInteger(page) ||
      page < 1 ||
      !Number.isInteger(pageSize) ||
      pageSize < 1 ||
      pageSize > 50 ||
      (status && !SUPPORT_STATUSES.includes(status as SupportStatus))
    ) {
      throw new BadRequestException('INVALID_SUPPORT_FILTER');
    }
    const filter: { status?: SupportStatus } = status
      ? { status: status as SupportStatus }
      : {};
    const [rows, total] = await Promise.all([
      this.tickets
        .find(filter)
        .sort({ createdAt: -1, _id: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .select('-message -reply.body')
        .lean(),
      this.tickets.countDocuments(filter),
    ]);
    return {
      items: rows.map((row) => ({
        id: String(row._id),
        userId: String(row.userId),
        email: row.emailAtCreation,
        category: row.category,
        subject: row.subject,
        status: row.status,
        createdAt: row.createdAt?.toISOString() ?? null,
        updatedAt: row.updatedAt?.toISOString() ?? null,
        repliedAt: row.reply?.sentAt?.toISOString() ?? null,
      })),
      total,
      page,
      pageSize,
    };
  }

  async getForAdmin(ticketId: string) {
    const ticket = await this.tickets.findById(toId(ticketId)).lean();
    if (!ticket) throw new NotFoundException('SUPPORT_TICKET_NOT_FOUND');
    const user = await this.users
      .findById(ticket.userId)
      .select('email provider providerId')
      .lean<ReplyTarget>();
    return {
      ...this.publicTicket(ticket),
      userId: String(ticket.userId),
      email: ticket.emailAtCreation,
      replyAttemptedAt: ticket.replyAttemptedAt?.toISOString() ?? null,
      replyAdminEmail: ticket.reply?.adminEmail ?? null,
      /** 지금 답장하면 갈 곳 */
      replyChannel: replyChannelOf(user),
      /** 보낸 답장이 간 곳 · 전달 여부 */
      repliedVia: ticket.reply ? (ticket.reply.channel ?? 'email') : null,
      replyDelivered: ticket.reply ? ticket.reply.delivered !== false : null,
    };
  }

  async reply(
    ticketId: string,
    rawMessage: string,
    admin: AdminRequestContext,
    ip?: string,
    userAgent?: string,
  ) {
    const id = toId(ticketId);
    const message = rawMessage?.trim();
    if (!message || message.length < 2 || message.length > 4000)
      throw new BadRequestException('INVALID_SUPPORT_REPLY');

    // 어디로 보낼지 먼저 정한다 — 보낼 수 없는 건이면 잠그지도 않는다.
    const current = await this.tickets
      .findById(id)
      .select('userId status')
      .lean();
    if (!current) throw new NotFoundException('SUPPORT_TICKET_NOT_FOUND');
    if (current.status !== 'open')
      throw new ConflictException('SUPPORT_TICKET_ALREADY_HANDLED');
    const user = await this.users
      .findById(current.userId)
      .select('email provider providerId appLanguage')
      .lean<ReplyTarget>();
    const channel = replyChannelOf(user);
    if (channel === 'email' && !this.mail.isDeliveryConfigured())
      throw new ServiceUnavailableException('MAIL_NOT_CONFIGURED');

    // 잠금: 두 관리자가 동시에 답장해도 한 통만 시도한다.
    const ticket = await this.tickets.findOneAndUpdate(
      { _id: id, status: 'open' },
      { $set: { status: 'sending', replyAttemptedAt: new Date() } },
      { new: true },
    );
    if (!ticket) throw new ConflictException('SUPPORT_TICKET_ALREADY_HANDLED');

    // 메일은 유일한 통로라 실패하면 되돌린다. 텔레그램은 앱 "내 문의" 에도
    // 남으니 봇 전송이 실패해도 답장은 저장하고, 실패했다고만 적어 둔다.
    let delivered = true;
    if (channel === 'email') {
      const recipient = user?.email?.trim() ?? '';
      const subject = `Re: [KORIO #${String(id).slice(-8)}] ${ticket.subject}`;
      const text = `KORIO 고객지원 답변\n\n${message}\n\n문의 번호: ${String(id)}`;
      const html = `<div style="font-family:sans-serif;line-height:1.6"><h2>KORIO 고객지원 답변</h2><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p><hr><small>문의 번호: ${String(id)}</small></div>`;
      const sent = await this.mail.send({ to: recipient, subject, text, html });
      if (!sent) {
        await this.release(id);
        await this.audit.record({
          admin,
          action: 'support.reply',
          targetType: 'support_ticket',
          targetId: String(id),
          targetLabel: ticket.subject,
          reason: '메일 발송 실패',
          success: false,
          errorCode: 'MAIL_DELIVERY_FAILED',
          ip,
          userAgent,
        });
        throw new ServiceUnavailableException('MAIL_DELIVERY_FAILED');
      }
    } else if (channel === 'telegram') {
      delivered = await this.sendTelegram(user, ticket.subject, message);
    }

    const sentAt = new Date();
    const updated = await this.tickets.findOneAndUpdate(
      { _id: id, status: 'sending' },
      {
        $set: {
          status: 'answered',
          reply: {
            adminId: new Types.ObjectId(admin.userId),
            adminEmail: admin.email,
            body: message,
            sentAt,
            channel,
            delivered,
          },
        },
      },
      { new: true },
    );
    if (!updated) throw new ConflictException('SUPPORT_REPLY_STATE_CHANGED');
    await this.audit.record({
      admin,
      action: 'support.reply',
      targetType: 'support_ticket',
      targetId: String(id),
      targetLabel: ticket.subject,
      changes: { status: { from: 'open', to: 'answered' } },
      reason:
        REPLY_AUDIT_REASON[channel] +
        (delivered ? '' : ' (봇 전송 실패 · 앱에만 표시)'),
      ip,
      userAgent,
    });
    // 앱 유저는 푸시로도 알린다 (텔레그램 유저는 기기 토큰이 없어 그냥 지나간다)
    await this.push
      ?.send(current.userId, PushType.SUPPORT_REPLY, {
        params: { subject: ticket.subject },
        link: '/support',
        dedupKey: `support_reply:${String(id)}`,
      })
      .catch(() => false);
    return this.getForAdmin(String(id));
  }

  /** 텔레그램 봇으로 답장. 실패해도 던지지 않는다 (유저가 봇을 막았을 수 있다) */
  private async sendTelegram(
    user: ReplyTarget | null,
    subject: string,
    message: string,
  ): Promise<boolean> {
    if (!user?.providerId || !this.bot?.enabled) return false;
    try {
      await this.bot.call('sendMessage', {
        chat_id: user.providerId,
        text: supportReplyBotText(botLang(user.appLanguage), subject, message),
      });
      return true;
    } catch {
      return false;
    }
  }

  private async release(id: Types.ObjectId) {
    await this.tickets.updateOne(
      { _id: id, status: 'sending' },
      { $set: { status: 'open' } },
    );
  }

  private publicTicket(ticket: {
    _id: Types.ObjectId;
    category: string;
    subject: string;
    message: string;
    status: string;
    reply?: SupportReply | null;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return {
      id: String(ticket._id),
      category: ticket.category,
      subject: ticket.subject,
      message: ticket.message,
      status: ticket.status,
      reply: ticket.status === 'answered' ? (ticket.reply?.body ?? null) : null,
      repliedAt:
        ticket.status === 'answered'
          ? (ticket.reply?.sentAt?.toISOString() ?? null)
          : null,
      createdAt: ticket.createdAt?.toISOString() ?? null,
      updatedAt: ticket.updatedAt?.toISOString() ?? null,
    };
  }
}
