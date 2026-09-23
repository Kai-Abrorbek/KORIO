"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import {
  APP_VERSION,
  CHANGELOG,
  TAG_LOOK,
  compareVersions,
  parseChange,
} from "../model/changelog";
import styles from "./update-screen.module.css";

function goBack(router: ReturnType<typeof useRouter>) {
  if (window.history.length > 1) router.back();
  else router.replace("/settings");
}

export function UpdateScreen() {
  const router = useRouter();
  const latest = CHANGELOG[0]?.version ?? APP_VERSION;
  const upToDate = compareVersions(APP_VERSION, latest) >= 0;

  return (
    <main className={styles.screen}>
      <header className={styles.header}>
        <button aria-label="Orqaga" onClick={() => goBack(router)} type="button">
          <MobileIcon name="chevron-back" size={28} />
        </button>
        <h1>Yangilanish tarixi</h1>
      </header>

      <div className={styles.scroll}>
        <section className={styles.hero}>
          <Image
            alt="KORIO"
            className={styles.logo}
            height={86}
            priority
            src="/app-icon.png"
            width={86}
          />
          <strong>v{APP_VERSION}</strong>
          <span className={upToDate ? styles.currentStatus : styles.outdatedStatus}>
            <MobileIcon name={upToDate ? "checkmark-circle" : "arrow-up-circle"} size={15} />
            {upToDate ? "Eng so‘nggi versiyadasiz" : "v" + latest + " chiqdi"}
          </span>
        </section>

        <section className={styles.timeline}>
          {CHANGELOG.map((entry, index) => {
            const current = compareVersions(entry.version, APP_VERSION) === 0;
            return (
              <article className={styles.entry} key={entry.key}>
                <div className={styles.rail}>
                  <i className={current ? styles.currentDot : styles.dot} />
                  {index < CHANGELOG.length - 1 ? <i className={styles.line} /> : null}
                </div>
                <div className={styles.entryBody}>
                  <header>
                    <b>v{entry.version}</b>
                    {current ? <em>Joriy</em> : null}
                    <time>{entry.date}</time>
                  </header>
                  <div className={styles.card}>
                    {entry.items.length ? (
                      entry.items.map((raw) => {
                        const item = parseChange(raw);
                        const look = TAG_LOOK[item.tag];
                        return (
                          <div className={styles.item} key={raw}>
                            <i style={{ backgroundColor: look.background, color: look.color }}>
                              {look.label}
                            </i>
                            <p>{item.text}</p>
                          </div>
                        );
                      })
                    ) : (
                      <p>O‘zgarishlar yozilmagan.</p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <p className={styles.footer}>
          KORIO’ni yaxshilashda davom etamiz. Fikringizni yordam markazi orqali yuboring!
        </p>
      </div>
    </main>
  );
}
