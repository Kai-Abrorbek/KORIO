"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { getPublicUser } from "../api/misc";
import type { PublicUser } from "../model/misc";
import styles from "./misc-screen.module.css";

export function UserCoursesScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const userId = params.get("userId");
  const { request, user } = useTelegramAuth();
  const [other, setOther] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(Boolean(userId));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!userId) return;
    let active = true;
    setLoading(true);
    setFailed(false);
    void getPublicUser(request, userId)
      .then((result) => { if (active) setOther(result); })
      .catch(() => { if (active) setFailed(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [request, userId]);

  const person = userId ? other : user;
  return (
    <main className={styles.coursesPage}>
      <header className={styles.coursesHeader}>
        <button aria-label="Orqaga" onClick={() => window.history.length > 1 ? router.back() : router.replace("/profile")} type="button">
          <MobileIcon name="arrow-back" size={26} />
        </button>
        <h1>{person?.nickname ? `${person.nickname}ning kurslari` : "Kurslar"}</h1>
        <span />
      </header>
      <section className={styles.coursesBody}>
        {loading ? <span className={styles.spinner} /> : failed || !person ? <p className={styles.emptyState}>Ma&apos;lumotni yuklab bo&apos;lmadi</p> : (
          <div className={styles.courseCard}>
            <div className={styles.courseRow}>
              <span className={styles.courseFlag}>{person.coursePrimaryFlag || "🇰🇷"}</span>
              <strong>Koreys tili</strong>
              <b>{(person.totalXP ?? 0).toLocaleString()} XP</b>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
