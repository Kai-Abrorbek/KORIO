"use client";

import type { CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import {
  MobileIcon,
  type IoniconName,
} from "../../../shared/ui/mobile-icon";
import styles from "./topik-sections-screen.module.css";

type TopikSection = "reading" | "listening" | "writing";

interface SectionOption {
  key: TopikSection;
  order: string;
  icon: IoniconName;
  title: string;
  description: string;
  features: string[];
}

const SECTIONS: SectionOption[] = [
  {
    key: "reading",
    order: "01",
    icon: "book-outline",
    title: "O‘qish",
    description:
      "Savol turlarini o‘rganing va haqiqiy imtihon tuzilishida bilimingizni tekshiring.",
    features: ["Bosqichli maslahat", "Sinov imtihoni", "Xatolar tahlili"],
  },
  {
    key: "listening",
    order: "02",
    icon: "headset-outline",
    title: "Tinglash",
    description:
      "Muhim iboralarni anglash strategiyasi va tinglash sezgisini rivojlantiring.",
    features: ["Qismni takrorlash", "Muhim ishora", "Tezlik nazorati"],
  },
  {
    key: "writing",
    order: "03",
    icon: "create-outline",
    title: "Yozish",
    description:
      "Gap tuzilishidan yuqori ball beradigan to‘liq javobgacha rivojlaning.",
    features: ["Javob tuzilishi", "Yozuv tahlili", "Ball strategiyasi"],
  },
];

export function TopikSectionsScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { user } = useTelegramAuth();
  const level = params.get("level") === "1" ? "1" : "2";
  const roman = level === "1" ? "I" : "II";
  const sections = SECTIONS.filter(
    (section) => level === "2" || section.key !== "writing",
  );
  const premium = Boolean(
    user?.isSuper &&
      (!user.superExpiresAt ||
        new Date(user.superExpiresAt).getTime() > Date.now()),
  );

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.replace("/course-categories");
  };

  if (!premium) {
    return (
      <main className={`${styles.screen} ${styles.lockedScreen}`}>
        <header className={styles.header}>
          <button aria-label="Orqaga" onClick={goBack} type="button">
            <MobileIcon name="chevron-back" size={24} />
          </button>
          <div>
            <small>IMTIHONGA TAYYORGARLIK</small>
            <strong>TOPIK {roman}</strong>
          </div>
          <span>
            <MobileIcon name="ribbon-outline" size={20} />
          </span>
        </header>
        <section className={styles.lockedCard}>
          <span>
            <MobileIcon name="lock-closed" size={34} />
          </span>
          <h1>TOPIK tayyorgarligi — Premium</h1>
          <p>
            TOPIK savollari, bosqichli izohlar va natija tahlili KORIO Premium
            bilan ochiladi.
          </p>
          <button onClick={() => router.push("/premium")} type="button">
            Premiumni ko&apos;rish
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.screen}>
      <header className={styles.header}>
        <button aria-label="Orqaga" onClick={goBack} type="button">
          <MobileIcon name="chevron-back" size={24} />
        </button>
        <div>
          <small>IMTIHONGA TAYYORGARLIK</small>
          <strong>TOPIK {roman}</strong>
        </div>
        <span>
          <MobileIcon name="ribbon-outline" size={20} />
        </span>
      </header>

      <div className={styles.content}>
        <section
          className={`${styles.hero} ${
            level === "1" ? styles.heroOne : styles.heroTwo
          }`}
        >
          <i className={styles.heroGlowLarge} />
          <i className={styles.heroGlowSmall} />
          <div className={styles.heroTop}>
            <span>TOPIK {roman}</span>
            <span>
              <MobileIcon name="sparkles" size={12} />
              Aqlli o‘quv reja
            </span>
          </div>
          <h1>Muvaffaqiyat strategiyasini{`\n`}har bir bo‘limda yarating.</h1>
          <p>
            Faqat savol yechmang — zaif tomonlaringizni topib, ularni kuchli
            tomonga aylantiring.
          </p>
          <div className={styles.heroFeatures}>
            <span>
              <MobileIcon name="analytics-outline" size={15} />
              Shaxsiy tahlil
            </span>
            <i />
            <span>
              <MobileIcon name="bulb-outline" size={15} />
              Bosqichli izoh
            </span>
            <i />
            <span>
              <MobileIcon name="repeat-outline" size={15} />
              Zaifliklarni takrorlash
            </span>
          </div>
        </section>

        <div className={styles.sectionHeading}>
          <div>
            <small>YO‘NALISHNI TANLANG</small>
            <h2>O‘rganish bo‘limini tanlang</h2>
          </div>
          <span>{sections.length} ta bo‘lim</span>
        </div>

        <section className={styles.sectionList}>
          {sections.map((section, index) => (
            <button
              className={styles.sectionCard}
              key={section.key}
              onClick={() => {
                window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
                router.push(`/topik?level=${level}&section=${section.key}`);
              }}
              style={{ "--delay": `${index * 90}ms` } as CSSProperties}
              type="button"
            >
              <span
                className={`${styles.sectionIcon} ${styles[section.key]}`}
              >
                <MobileIcon name={section.icon} size={27} />
              </span>
              <span className={styles.sectionCopy}>
                <small>
                  {section.order} · {section.title.toUpperCase()}
                </small>
                <strong>{section.title}</strong>
              </span>
              <span className={styles.liveBadge}>
                <i />
                Mavjud
              </span>
              <p>{section.description}</p>
              <span className={styles.featureRow}>
                {section.features.map((feature) => (
                  <i key={feature}>{feature}</i>
                ))}
              </span>
              <span className={styles.cardFooter}>
                <span>
                  <MobileIcon name="checkmark-circle" size={15} />
                  Hozir boshlash mumkin
                </span>
                <i>
                  <MobileIcon name="arrow-forward" size={18} />
                </i>
              </span>
            </button>
          ))}
        </section>

        <aside className={styles.recommendation}>
          <span>
            <MobileIcon name="bulb" size={18} />
          </span>
          <div>
            <strong>Endi boshlayapsizmi? O‘qishdan boshlang</strong>
            <p>
              Maslahatlar bilan savollarga yondashishni o‘rganing, keyin sinov
              imtihonida o‘zingizni tekshiring.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
