"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import styles from "./notification-sheet.module.css";

/**
 * 홈 벨 → 알림함. 모바일 NotificationModal 과 같은 화면
 * (우상단 벨에서 펼쳐지는 카드, 오늘/이전 구분, 안 읽음 3중 표시, 모두 읽음).
 *
 * 문구는 우즈벡어 원문(locales/uz notifs.*)에 값을 채워 **한 덩어리**로 쓴다 —
 * 번역 카탈로그가 "{{nickname}} sizga obuna bo'ldi" 같은 틀을 통째로 맞춰서
 * 다른 언어로 바꾼다. 텍스트 노드를 쪼개면 번역이 안 걸린다.
 */
type NotificationType =
  | "follow" | "league_promoted" | "league_demoted" | "league_result" | "chest"
  | "streak" | "streak_risk" | "energy_full" | "level_up" | "super_expiring"
  | "referral" | "system";

interface AppNotification {
  id: string;
  type: NotificationType;
  params: Record<string, string | number | undefined>;
  link: string | null;
  isRead: boolean;
  createdAt: string;
}

const LOOK: Record<NotificationType, { icon: IoniconName; color: string }> = {
  follow: { icon: "person-add", color: "#776ee2" },
  league_promoted: { icon: "trophy", color: "#1DBB7F" },
  league_demoted: { icon: "trending-down", color: "#FF7A8A" },
  league_result: { icon: "trophy", color: "#1DBB7F" },
  chest: { icon: "gift", color: "#E2A83A" },
  streak: { icon: "flame", color: "#FF7A00" },
  streak_risk: { icon: "alert-circle", color: "#FF7A8A" },
  energy_full: { icon: "flash", color: "#45B7D1" },
  level_up: { icon: "arrow-up-circle", color: "#8C82F0" },
  super_expiring: { icon: "star", color: "#E2A83A" },
  referral: { icon: "gift", color: "#1DBB7F" },
  system: { icon: "megaphone", color: "#A6A6B3" },
};

/** locales/uz.ts notifs.type 와 같은 원문 */
const COPY: Record<NotificationType, { title: string; body: string }> = {
  follow: { title: "{{nickname}} sizga obuna bo'ldi", body: "" },
  league_promoted: { title: "{{toTier}} ligasiga ko'tarildingiz", body: "{{rank}}-o'rin · {{gems}} gavhar" },
  league_demoted: { title: "{{toTier}} ligasiga tushdingiz", body: "{{rank}}-o'rin · yana ko'tarilamiz" },
  league_result: { title: "Haftalik liga yakunlandi", body: "{{rank}}-o'rin · {{gems}} gavhar" },
  chest: { title: "Sandiq sizni kutmoqda", body: "Yo‘l xaritasidagi sandiqni bosib olmoslarni oling" },
  streak: { title: "{{days}} kun ketma-ket", body: "Olov yanada kuchaydi" },
  streak_risk: { title: "Seriya uzilishi mumkin", body: "Bugun o'rgansangiz davom etadi" },
  energy_full: { title: "Energiya to'ldi", body: "Hozir o'rganish uchun ayni vaqt" },
  level_up: { title: "Darajangiz oshdi", body: "" },
  super_expiring: { title: "Bepul sinov tugayapti", body: "{{days}} kun qoldi" },
  referral: { title: "{{nickname}} sizning kodingiz bilan qo'shildi", body: "{{gems}} ta gavhar hisobingizga tushdi" },
  system: { title: "{{message}}", body: "" },
};

function fill(template: string, params: AppNotification["params"]) {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, key: string) => String(params?.[key] ?? ""));
}

function timeAgo(iso: string) {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return "Hozir";
  if (minutes < 60) return `${minutes} daqiqa oldin`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} soat oldin`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Kecha";
  return `${days} kun oldin`;
}

/** 서버 링크는 앱 경로(expo-router)다. 탭 그룹만 걷어내면 여기 경로와 같다 */
function webPath(link: string) {
  const path = link.replace("/(tabs)", "") || "/home";
  return path === "/" ? "/home" : path;
}

export function NotificationSheet({
  onClose,
  onUnreadChange,
  visible,
}: {
  visible: boolean;
  onClose: () => void;
  onUnreadChange: (count: number) => void;
}) {
  const router = useRouter();
  const { request } = useTelegramAuth();
  const [items, setItems] = useState<AppNotification[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    request<{ unreadCount: number; notifications: AppNotification[] }>("/notifications?limit=30")
      .then((response) => {
        setItems(response.notifications ?? []);
        setUnread(response.unreadCount ?? 0);
        onUnreadChange(response.unreadCount ?? 0);
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, [onUnreadChange, request]);

  useEffect(() => {
    if (visible) load();
  }, [load, visible]);

  const sections = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const today: AppNotification[] = [];
    const older: AppNotification[] = [];
    items.forEach((item) => (new Date(item.createdAt) >= start ? today : older).push(item));
    return [
      { key: "today", title: "Bugun", data: today },
      { key: "older", title: "Oldingi", data: older },
    ].filter((section) => section.data.length > 0);
  }, [items]);

  const openItem = (item: AppNotification) => {
    if (!item.isRead) {
      setItems((current) => current.map((entry) => (entry.id === item.id ? { ...entry, isRead: true } : entry)));
      const next = Math.max(0, unread - 1);
      setUnread(next);
      onUnreadChange(next);
      void request(`/notifications/${encodeURIComponent(item.id)}/read`, { body: "{}", method: "POST" }).catch(() => undefined);
    }
    if (item.link) {
      onClose();
      const target = webPath(item.link);
      window.setTimeout(() => router.push(target), 220);
    }
  };

  const readAll = () => {
    if (!unread) return;
    setItems((current) => current.map((entry) => ({ ...entry, isRead: true })));
    setUnread(0);
    onUnreadChange(0);
    void request("/notifications/read-all", { body: "{}", method: "POST" }).catch(() => undefined);
  };

  if (!visible) return null;

  return (
    <div className={styles.root} role="dialog" aria-modal="true">
      <button aria-label="Yopish" className={styles.backdrop} onClick={onClose} type="button" />
      <section className={styles.card}>
        <header className={styles.header}>
          <div className={styles.titleRow}>
            <h2>Xabarlar</h2>
            {unread > 0 ? <span className={styles.headBadge}>{unread}</span> : null}
          </div>
          <div className={styles.headActions}>
            {unread > 0 ? (
              <button aria-label="Hammasini o'qilgan deb belgilash" className={styles.readAll} onClick={readAll} type="button">
                <MobileIcon name="checkmark-done" size={18} />
              </button>
            ) : null}
            <button aria-label="Yopish" onClick={onClose} type="button">
              <MobileIcon name="close" size={17} />
            </button>
          </div>
        </header>

        {loading ? (
          <div className={styles.center}><i className={styles.spinner} /></div>
        ) : items.length === 0 ? (
          <div className={styles.center}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src="/characters/hangulmon_sleepy.png" />
            <b>Hozircha bildirishnoma yo&apos;q</b>
            <p>O&apos;rganing va do&apos;st orttiring — yangiliklar shu yerda to&apos;planadi.</p>
          </div>
        ) : (
          <div className={styles.list}>
            {sections.map((section) => (
              <div key={section.key}>
                <h3>{section.title}</h3>
                {section.data.map((item) => {
                  const look = LOOK[item.type] ?? LOOK.system;
                  const copy = COPY[item.type] ?? COPY.system;
                  const isPerson = item.type === "follow" || item.type === "referral";
                  const initial = String(item.params?.nickname ?? "?").trim().charAt(0);
                  const title = fill(copy.title, item.params);
                  const body = fill(copy.body, item.params);
                  return (
                    <button
                      className={`${styles.row} ${item.isRead ? "" : styles.unread}`}
                      key={item.id}
                      onClick={() => openItem(item)}
                      type="button"
                    >
                      <span
                        className={styles.avatar}
                        style={{ background: isPerson ? "var(--ns-border)" : `${look.color}26`, color: look.color }}
                      >
                        {isPerson ? <b data-no-translate>{initial}</b> : <MobileIcon name={look.icon} size={21} />}
                      </span>
                      <span className={styles.rowBody}>
                        <strong className={item.isRead ? styles.titleRead : undefined}>{title}</strong>
                        {body ? <small>{body}</small> : null}
                        <em>{timeAgo(item.createdAt)}</em>
                      </span>
                      {!item.isRead ? <i className={styles.dot} /> : null}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
