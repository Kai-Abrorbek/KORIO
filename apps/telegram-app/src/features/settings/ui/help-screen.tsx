"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { APP_VERSION } from "../model/changelog";
import {
  HELP_CATEGORIES,
  HELP_CATEGORY_COLORS,
  HELP_CATEGORY_LABELS,
  HELP_FAQ,
  SUPPORT,
  type HelpCategory,
} from "../model/help";
import styles from "./help-screen.module.css";

function goBack(router: ReturnType<typeof useRouter>) {
  if (window.history.length > 1) router.back();
  else router.replace("/settings");
}

function haptic() {
  window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
}

function openExternal(url: string) {
  haptic();
  window.open(url, "_blank", "noopener,noreferrer");
}

interface ContactRowProps {
  background: string;
  color: string;
  description?: string;
  icon: IoniconName;
  label: string;
  onClick: () => void;
}

function ContactRow({ background, color, description, icon, label, onClick }: ContactRowProps) {
  return (
    <button className={styles.contactRow} onClick={onClick} type="button">
      <i className={styles.contactIcon} style={{ backgroundColor: background, color }}>
        <MobileIcon name={icon} size={20} />
      </i>
      <span>
        <b>{label}</b>
        {description ? <small>{description}</small> : null}
      </span>
      <MobileIcon name="chevron-forward" size={19} />
    </button>
  );
}

export function HelpScreen() {
  const router = useRouter();
  const { user } = useTelegramAuth();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<HelpCategory | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  const list = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("uz");
    return HELP_FAQ.filter((item) => {
      if (category && item.category !== category) return false;
      if (!normalized) return true;
      return (item.question + " " + item.answer).toLocaleLowerCase("uz").includes(normalized);
    });
  }, [category, query]);

  const sendMail = () => {
    haptic();
    const platform = window.Telegram?.WebApp.platform || navigator.platform || "web";
    const body = [
      "",
      "",
      "———————————",
      "App: KORIO " + APP_VERSION,
      "Platform: " + platform,
      "User: " + (user?.email ?? "-"),
    ].join("\n");
    const url =
      "mailto:" +
      SUPPORT.email +
      "?subject=" +
      encodeURIComponent("[KORIO] Savol") +
      "&body=" +
      encodeURIComponent(body);
    window.location.href = url;
  };

  return (
    <main className={styles.screen}>
      <header className={styles.header}>
        <button aria-label="Orqaga" onClick={() => goBack(router)} type="button">
          <MobileIcon name="chevron-back" size={28} />
        </button>
        <h1>Yordam markazi</h1>
      </header>

      <div className={styles.scroll}>
        <label className={styles.search}>
          <MobileIcon name="search" size={19} />
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Savolingizni qidiring"
            type="search"
            value={query}
          />
          {query ? (
            <button aria-label="Qidiruvni tozalash" onClick={() => setQuery("")} type="button">
              <MobileIcon name="close-circle" size={19} />
            </button>
          ) : null}
        </label>

        <div className={styles.chips}>
          <button
            aria-pressed={category === null}
            className={category === null ? styles.activeChip : undefined}
            onClick={() => {
              haptic();
              setCategory(null);
            }}
            type="button"
          >
            {HELP_CATEGORY_LABELS.all}
          </button>
          {HELP_CATEGORIES.map((item) => {
            const active = category === item;
            const color = HELP_CATEGORY_COLORS[item];
            return (
              <button
                aria-pressed={active}
                key={item}
                onClick={() => {
                  haptic();
                  setCategory(active ? null : item);
                }}
                style={active ? { backgroundColor: color, borderColor: color, color: "#fff" } : undefined}
                type="button"
              >
                {HELP_CATEGORY_LABELS[item]}
              </button>
            );
          })}
        </div>

        {list.length ? (
          <section className={styles.card}>
            {list.map((item, index) => {
              const expanded = open === item.id;
              const color = HELP_CATEGORY_COLORS[item.category];
              return (
                <div className={index ? styles.divided : undefined} key={item.id}>
                  <button
                    aria-expanded={expanded}
                    className={styles.question}
                    onClick={() => {
                      haptic();
                      setOpen(expanded ? null : item.id);
                    }}
                    type="button"
                  >
                    <i style={{ backgroundColor: color + "22", color }}>
                      <MobileIcon name={item.icon} size={17} />
                    </i>
                    <b>{item.question}</b>
                    <MobileIcon name={expanded ? "chevron-up" : "chevron-down"} size={18} />
                  </button>
                  {expanded ? <p className={styles.answer}>{item.answer}</p> : null}
                </div>
              );
            })}
          </section>
        ) : (
          <section className={styles.empty}>
            <MobileIcon name="search" size={38} />
            <h2>Javob topilmadi</h2>
            <p>Boshqacha yozib ko‘ring yoki pastdan biz bilan bog‘laning.</p>
          </section>
        )}

        <h2 className={styles.sectionLabel}>Biz bilan bog‘lanish</h2>
        <section className={styles.card}>
          <ContactRow
            background="#D5F0F5"
            color="#45B7D1"
            description={SUPPORT.email}
            icon="mail"
            label="Email orqali"
            onClick={sendMail}
          />
          <i className={styles.contactDivider} />
          <ContactRow
            background="#DCEDFD"
            color="#229ED9"
            description="Eng tez javob shu yerda"
            icon="paper-plane"
            label="Telegram"
            onClick={() => openExternal(SUPPORT.telegram)}
          />
        </section>
        <p className={styles.replyNote}>
          Odatda 1-2 kun ichida javob beramiz. Ilova versiyasi va qurilma ma’lumoti avtomatik qo‘shiladi.
        </p>

        <h2 className={styles.sectionLabel}>Hujjatlar</h2>
        <section className={styles.card}>
          <ContactRow
            background="#ECECEE"
            color="#A8A8B0"
            icon="document-text"
            label="Foydalanish shartlari"
            onClick={() => openExternal(SUPPORT.terms)}
          />
          <i className={styles.contactDivider} />
          <ContactRow
            background="#D7F5E5"
            color="#1DBB7F"
            icon="shield-checkmark"
            label="Maxfiylik siyosati"
            onClick={() => openExternal(SUPPORT.privacy)}
          />
        </section>

        <p className={styles.version}>Ilova versiyasi: {APP_VERSION}</p>
      </div>
    </main>
  );
}
