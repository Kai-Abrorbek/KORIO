"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import {
  useNotificationPreferences,
  type NotificationPreferences,
} from "../model/preferences";
import styles from "./settings-detail.module.css";

interface ToggleRowProps {
  background: string;
  color: string;
  description?: string;
  disabled?: boolean;
  icon: IoniconName;
  label: string;
  onChange: (value: boolean) => void;
  value: boolean;
}

function Toggle({ value, disabled, onChange }: Pick<ToggleRowProps, "disabled" | "onChange" | "value">) {
  return (
    <button aria-checked={value} className={`${styles.toggle} ${value ? styles.toggleOn : ""}`} disabled={disabled} onClick={() => {
      window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
      onChange(!value);
    }} role="switch" type="button"><i /></button>
  );
}

function ToggleRow({ icon, color, background, label, description, value, disabled, onChange }: ToggleRowProps) {
  return (
    <div className={`${styles.row} ${disabled ? styles.disabled : ""}`}>
      <i className={styles.iconSquare} style={{ backgroundColor: background, color }}><MobileIcon name={icon} size={20} /></i>
      <span className={styles.rowText}><b>{label}</b>{description ? <small>{description}</small> : null}</span>
      <Toggle disabled={disabled} onChange={onChange} value={value} />
    </div>
  );
}

function Card({ children, top = false }: { children: ReactNode; top?: boolean }) {
  return <section className={`${styles.card} ${top ? styles.topCard : ""}`}>{children}</section>;
}

function goBack(router: ReturnType<typeof useRouter>) {
  if (window.history.length > 1) router.back();
  else router.replace("/settings");
}

export function NotificationsScreen() {
  const router = useRouter();
  const { request } = useTelegramAuth();
  const { value: notifications, patch: patchLocal } = useNotificationPreferences();
  const [pickerOpen, setPickerOpen] = useState(false);
  const off = !notifications.master;

  const patch = (value: Partial<NotificationPreferences>) => {
    patchLocal(value);
    void request("/push/settings", { body: JSON.stringify(value), method: "PATCH" }).catch(() => undefined);
  };

  return (
    <main className={styles.screen}>
      <header className={styles.header}>
        <button aria-label="Orqaga" onClick={() => goBack(router)} type="button"><MobileIcon name="chevron-back" size={28} /></button>
        <h1>Bildirishnomalar</h1>
      </header>
      <div className={styles.scroll}>
        <Card top><ToggleRow background="#D5F0F5" color="#45B7D1" description="Hamma bildirishnomalarni yoqish yoki o‘chirish" icon="notifications" label="Barcha bildirishnomalar" onChange={(master) => patch({ master })} value={notifications.master} /></Card>
        <h2>O‘quv</h2>
        <Card>
          <ToggleRow background="#FFF4D6" color="#F4B860" description="Har kuni belgilangan vaqtda eslatamiz" disabled={off} icon="alarm" label="Kunlik eslatma" onChange={(daily) => patch({ daily })} value={notifications.daily} />
          {notifications.master && notifications.daily ? <><i className={styles.divider} /><button className={styles.timeRow} onClick={() => setPickerOpen(true)} type="button"><span>Vaqt</span><b>{String(notifications.dailyHour).padStart(2, "0")}:00 <MobileIcon name="chevron-forward" size={18} /></b></button></> : null}
          <i className={styles.divider} />
          <ToggleRow background="#FFE3D6" color="#FF7043" description="Streak uzilishidan oldin ogohlantiramiz" disabled={off} icon="flame" label="Streak eslatmasi" onChange={(streak) => patch({ streak })} value={notifications.streak} />
        </Card>
        <h2>Musobaqa · Ijtimoiy</h2>
        <Card>
          <ToggleRow background="#D7F5E5" color="#1DBB7F" disabled={off} icon="trophy" label="Liga bildirishnomalari" onChange={(league) => patch({ league })} value={notifications.league} />
          <i className={styles.divider} />
          <ToggleRow background="#EBE5FA" color="#A78BFA" disabled={off} icon="people" label="Do‘stlar faoliyati" onChange={(friends) => patch({ friends })} value={notifications.friends} />
        </Card>
        <h2>Boshqa</h2>
        <Card><ToggleRow background="#FFE0EC" color="#FF7AAD" disabled={off} icon="sparkles" label="Tadbirlar · Yangiliklar" onChange={(events) => patch({ events })} value={notifications.events} /></Card>
      </div>
      {pickerOpen ? <div className={styles.modal}>
        <button aria-label="Yopish" onClick={() => setPickerOpen(false)} type="button" />
        <section className={styles.sheet}>
          <i className={styles.grabber} />
          <h2>Eslatma vaqtini tanlang</h2>
          <div className={styles.hourList}>
            {Array.from({ length: 24 }, (_, hour) => <button className={notifications.dailyHour === hour ? styles.activeHour : ""} key={hour} onClick={() => {
              window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
              patch({ dailyHour: hour });
              setPickerOpen(false);
            }} type="button"><span>{String(hour).padStart(2, "0")}:00</span>{notifications.dailyHour === hour ? <MobileIcon name="checkmark" size={20} /> : null}</button>)}
          </div>
        </section>
      </div> : null}
    </main>
  );
}
