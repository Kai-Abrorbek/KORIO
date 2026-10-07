import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AdminAuditService } from '../admin/admin-audit.service';
import type { AdminRequestContext } from '../admin/guards/admin.guard';
import { MailService } from '../mail/mail.service';
import { User, UserDocument } from '../users/schemas/user.schema';
import type { CreateSupportTicketDto } from './dto/support.dto';
import {
  SupportTicket,
  SupportTicketDocument,
  SupportReply,
  SUPPORT_STATUSES,
  type SupportStatus,
} from './schemas/support-ticket.schema';

const MAX_DAILY_TICKETS = 5;

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
    const rows = await this.tickets
      .find({ userId: toId(userId) })
      .sort({ createdAt: -1, _id: -1 })
      .limit(30)
      .lean();
    return { items: rows.map((row) => this.publicTicket(row)) };
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
    return {
      ...this.publicTicket(ticket),
      userId: String(ticket.userId),
      email: ticket.emailAtCreation,
      replyAttemptedAt: ticket.replyAttemptedAt?.toISOString() ?? null,
      replyAdminEmail: ticket.reply?.adminEmail ?? null,
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
    if (!this.mail.isDeliveryConfigured())
      throw new ServiceUnavailableException('MAIL_NOT_CONFIGURED');

    // 먼저 잠금: 두 관리자가 동시에 답장해도 한 통만 시도한다.
    const ticket = await this.tickets.findOneAndUpdate(
      { _id: id, status: 'open' },
      { $set: { status: 'sending', replyAttemptedAt: new Date() } },
      { new: true },
    );
    if (!ticket) {
      const exists = await this.tickets.exists({ _id: id });
      if (!exists) throw new NotFoundException('SUPPORT_TICKET_NOT_FOUND');
      throw new ConflictException('SUPPORT_TICKET_ALREADY_HANDLED');
    }

    const user = await this.users
      .findById(ticket.userId)
      .select('email')
      .lean();
    const recipient = user?.email?.trim() ?? '';
    if (!recipient || !/^\S+@\S+\.\S+$/.test(recipient)) {
      await this.release(id);
      throw new BadRequestException('SUPPORT_USER_EMAIL_UNAVAILABLE');
    }

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
      reason: '사용자 문의 이메일 답변',
      ip,
      userAgent,
    });
    return this.getForAdmin(String(id));
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
