"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { uzt } from "../../../shared/i18n/uz-text";
import { showToast } from "../../../shared/telegram/share";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
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

/**
 * 텔레그램 안에선 window.open 이 막히거나 바깥 브라우저로 튄다.
 * t.me 링크는 openTelegramLink(채팅이 바로 열림), 그 밖은 openLink(인앱 브라우저)로 연다
 */
function openExternal(url: string) {
  haptic();
  const webApp = window.Telegram?.WebApp;
  try {
    if (webApp?.initData && /^https:\/\/t\.me\//u.test(url) && webApp.openTelegramLink) {
      webApp.openTelegramLink(url);
      return;
    }
    if (webApp?.initData && webApp.openLink) {
      webApp.openLink(url);
      return;
    }
  } catch {
    // 아래로
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * 이메일 주소 복사. 예전엔 mailto: 로 window.location 을 넘겼는데, 텔레그램 웹뷰는
 * mailto 를 못 열어서 오류 페이지로 넘어가 버리고 뒤로도 못 나왔다(앱을 다시 켜야 했다).
 * 이제 문의는 앱 안(/support)에서 쓰고, 메일을 쓰고 싶은 사람에겐 주소만 복사해 준다.
 */
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    // 오래된 웹뷰 — 아래로
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  Object.assign(area.style, { left: "-9999px", position: "fixed", top: "0" });
  document.body.appendChild(area);
  area.select();
  try {
    document.execCommand("copy");
  } finally {
    area.remove();
  }
}

interface ContactRowProps {
  background: string;
  color: string;
  description?: string;
  /** 번역 키 (같은 우즈벡어 문장이 다른 뜻일 때 번역기가 헷갈리지 않게) */
  descriptionKey?: string;
  icon: IoniconName;
  label: string;
  labelKey?: string;
  onClick: () => void;
  trailing?: IoniconName;
}

function ContactRow({
  background,
  color,
  description,
  descriptionKey,
  icon,
  label,
  labelKey,
  onClick,
  trailing = "chevron-forward",
}: ContactRowProps) {
  return (
    <button className={styles.contactRow} onClick={onClick} type="button">
      <i className={styles.contactIcon} style={{ backgroundColor: background, color }}>
        <MobileIcon name={icon} size={20} />
      </i>
      <span>
        <b data-i18n={labelKey}>{label}</b>
        {description ? <small data-i18n={descriptionKey}>{description}</small> : null}
      </span>
      <MobileIcon name={trailing} size={19} />
    </button>
  );
}

export function HelpScreen() {
  const router = useRouter();
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

  const copyEmail = async () => {
    haptic();
    await copyText(SUPPORT.email).catch(() => undefined);
    showToast(uzt("help.emailCopied"));
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
            background="#EEE8FF"
            color="#7157D9"
            description={uzt("support.entryDesc")}
            descriptionKey="support.entryDesc"
            icon="chatbubble-ellipses"
            label={uzt("support.title")}
            labelKey="support.title"
            onClick={() => {
              haptic();
              router.push("/support");
            }}
          />
          <i className={styles.contactDivider} />
          <ContactRow
            background="#D5F0F5"
            color="#45B7D1"
            description={SUPPORT.email}
            icon="mail"
            label="Email orqali"
            onClick={() => void copyEmail()}
            trailing="copy-outline"
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
        <p className={styles.replyNote} data-i18n="help.replyNoteShort">
          {uzt("help.replyNoteShort")}
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

        <p className={styles.version}>{`Ilova versiyasi: ${APP_VERSION}`}</p>
      </div>
    </main>
  );
}
