"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { apiRequest } from "../../../shared/api/client";
import { useAppLanguage } from "../../../shared/i18n/language-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { TAG_LOOK, type AppRelease } from "../model/changelog";
import styles from "./update-screen.module.css";

function goBack(router: ReturnType<typeof useRouter>) {
  if (window.history.length > 1) router.back();
  else router.replace("/settings");
}

/** "2026-09-30" → 지금 언어의 날짜. 시간대 때문에 하루 밀리지 않게 정오로 읽는다 */
function formatDate(date: string, language: string) {
  const value = new Date(`${date}T12:00:00`);
  if (Number.isNaN(value.getTime())) return date;
  try {
    return value.toLocaleDateString(language, { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return date;
  }
}

/**
 * 업데이트 기록. 서버(GET /app/releases)에서 받는다 — 모바일 앱과 같은 목록이고,
 * 미니앱에 해당 없는 항목(푸시 알림 등)은 서버가 platform=telegram 으로 걸러 준다.
 * 미니앱은 항상 최신 웹 버전이라 "업데이트하세요" 는 없다.
 */
export function UpdateScreen() {
  const router = useRouter();
  const { language } = useAppLanguage();
  const [releases, setReleases] = useState<AppRelease[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    setFailed(false);
    apiRequest<{ releases: AppRelease[] }>(`/app/releases?lang=${language}&platform=telegram`)
      .then((result) => { if (alive) setReleases(result.releases); })
      .catch(() => { if (alive) setFailed(true); });
    return () => { alive = false; };
  }, [attempt, language]);

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
          <Image alt="KORIO" className={styles.logo} height={86} priority src="/app-icon.png" width={86} />
          <strong>KORIO</strong>
          <span className={styles.currentStatus}>
            <MobileIcon name="checkmark-circle" size={15} />
            Eng so‘nggi versiyadasiz
          </span>
        </section>

        {failed ? (
          <div className={styles.state}>
            <MobileIcon name="cloud-offline-outline" size={30} />
            <p>Yangilanishlar tarixini yuklab bo‘lmadi</p>
            <button onClick={() => setAttempt((value) => value + 1)} type="button">Qayta urinish</button>
          </div>
        ) : !releases ? (
          <i className={styles.spinner} />
        ) : (
          <section className={styles.timeline}>
            {releases.map((entry, index) => (
              <article className={styles.entry} key={entry.id} style={{ animationDelay: `${Math.min(index, 6) * 60}ms` }}>
                <div className={styles.rail}>
                  <i className={index === 0 ? styles.currentDot : styles.dot} />
                  {index < releases.length - 1 ? <i className={styles.line} /> : null}
                </div>
                <div className={styles.entryBody}>
                  <header>
                    <b data-no-translate="">{formatDate(entry.date, language)}</b>
                    {entry.storeVersion ? <span className={styles.versionBadge} data-no-translate="">v{entry.storeVersion}</span> : null}
                    {index === 0 ? <em>Eng so‘nggi</em> : null}
                  </header>
                  <div className={styles.card}>
                    {entry.items.map((item, itemIndex) => {
                      const look = TAG_LOOK[item.tag] ?? TAG_LOOK.improve;
                      return (
                        <div className={styles.item} key={itemIndex}>
                          <i style={{ backgroundColor: look.background, color: look.color }}>{look.label}</i>
                          {/* 서버가 이미 지금 언어로 준 문장 — 화면 번역기가 건드리지 않게 */}
                          <p data-no-translate="">{item.text}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

        {releases ? (
          <p className={styles.footer}>
            KORIO’ni yaxshilashda davom etamiz. Fikringizni yordam markazi orqali yuboring!
          </p>
        ) : null}
      </div>
    </main>
  );
}
