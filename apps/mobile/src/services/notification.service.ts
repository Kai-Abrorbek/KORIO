import api from "./api";

export type NotificationType =
  | "follow"
  | "league_promoted"
  | "league_demoted"
  | "league_result"
  | "chest"
  | "streak"
  | "streak_risk"
  | "energy_full"
  | "level_up"
  | "super_expiring"
  | "system";

export interface AppNotification {
  id: string;
  type: NotificationType;
  /** 문구 보간용 값. 서버는 문장이 아니라 값만 준다 (언어 바꿔도 따라옴) */
  params: Record<string, any>;
  link: string | null;
  imageUrl: string | null;
  isRead: boolean;
  createdAt: string;
}

export const NotificationService = {
  list: (
    limit = 30,
  ): Promise<{ unreadCount: number; notifications: AppNotification[] }> =>
    api.get(`/notifications?limit=${limit}`),

  /** 배지용 — 목록 없이 개수만 */
  unreadCount: (): Promise<{ count: number }> =>
    api.get(`/notifications/unread-count`),

  markRead: (id: string): Promise<{ success: boolean }> =>
    api.post(`/notifications/${id}/read`, {}),

  markAllRead: (): Promise<{ success: boolean; updated: number }> =>
    api.post(`/notifications/read-all`, {}),

  remove: (id: string): Promise<{ success: boolean }> =>
    api.delete(`/notifications/${id}`),

  clearAll: (): Promise<{ success: boolean; deleted: number }> =>
    api.delete(`/notifications/all`),
};
