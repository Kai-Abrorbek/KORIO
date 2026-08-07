import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Notification,
  NotificationDocument,
  NotificationType,
} from './schemas/notification.schema';

/** 목록 한 번에 가져올 최대 개수 */
const PAGE_SIZE = 30;

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private readonly model: Model<NotificationDocument>,
  ) {}

  /**
   * 알림 생성.
   * 어떤 이벤트 흐름에서든 불리므로 실패해도 본 작업을 막지 않는다
   * (호출부에서 catch 로 삼킨다).
   */
  async create(
    userId: string | Types.ObjectId,
    type: NotificationType,
    opts: {
      params?: Record<string, any>;
      link?: string;
      imageUrl?: string;
    } = {},
  ) {
    return this.model.create({
      userId: new Types.ObjectId(userId),
      type,
      params: opts.params ?? {},
      link: opts.link ?? '',
      imageUrl: opts.imageUrl ?? '',
      isRead: false,
    });
  }

  /**
   * 같은 알림이 하루에 여러 번 쌓이는 걸 막는다.
   * 에너지 가득참·연속학습처럼 조건이 반복 충족되는 알림에 쓴다.
   */
  async createOncePerDay(
    userId: string | Types.ObjectId,
    type: NotificationType,
    opts: {
      params?: Record<string, any>;
      link?: string;
      imageUrl?: string;
    } = {},
  ) {
    const since = new Date();
    since.setHours(0, 0, 0, 0);

    const exists = await this.model.exists({
      userId: new Types.ObjectId(userId),
      type,
      createdAt: { $gte: since },
    });
    if (exists) return null;

    return this.create(userId, type, opts);
  }

  /** 목록 (최신순) + 안 읽은 개수 */
  async list(userId: string, limit = PAGE_SIZE) {
    const uId = new Types.ObjectId(userId);

    const [rows, unreadCount] = await Promise.all([
      this.model
        .find({ userId: uId })
        .sort({ createdAt: -1 })
        .limit(Math.min(limit, 100))
        .lean(),
      this.model.countDocuments({ userId: uId, isRead: false }),
    ]);

    return {
      unreadCount,
      notifications: rows.map((n: any) => ({
        id: n._id.toString(),
        type: n.type,
        params: n.params ?? {},
        link: n.link || null,
        imageUrl: n.imageUrl || null,
        isRead: !!n.isRead,
        createdAt: n.createdAt,
      })),
    };
  }

  /** 배지용 — 목록 없이 개수만 */
  async unreadCount(userId: string) {
    const count = await this.model.countDocuments({
      userId: new Types.ObjectId(userId),
      isRead: false,
    });
    return { count };
  }

  async markRead(userId: string, id: string) {
    await this.model.updateOne(
      { _id: new Types.ObjectId(id), userId: new Types.ObjectId(userId) },
      { $set: { isRead: true, readAt: new Date() } },
    );
    return { success: true };
  }

  async markAllRead(userId: string) {
    const res = await this.model.updateMany(
      { userId: new Types.ObjectId(userId), isRead: false },
      { $set: { isRead: true, readAt: new Date() } },
    );
    return { success: true, updated: res.modifiedCount };
  }

  async remove(userId: string, id: string) {
    await this.model.deleteOne({
      _id: new Types.ObjectId(id),
      userId: new Types.ObjectId(userId),
    });
    return { success: true };
  }

  async clearAll(userId: string) {
    const res = await this.model.deleteMany({
      userId: new Types.ObjectId(userId),
    });
    return { success: true, deleted: res.deletedCount };
  }
}
