"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import { listReadingLevels } from "../api/reading-listening";
import styles from "./reading-listening-level-screen.module.css";

const LEVELS: Array<{ colors: [string, string]; description: string; icon: IoniconName; level: number }> = [
  { level: 1, icon: "leaf-outline", colors: ["#5FAE8F", "#3C8069"], description: "Qisqa va tanish kundalik matnlar" },
  { level: 2, icon: "chatbubbles-outline", colors: ["#62A8D8", "#3F7FAD"], description: "Bog‘langan kundalik hikoyalar" },
  { level: 3, icon: "compass-outline", colors: ["#8178E6", "#6257C4"], description: "Amaliy ma’lumot va tajribalar" },
  { level: 4, icon: "newspaper-outline", colors: ["#E7A85A", "#C57C36"], description: "Uzun matn oqimi va asosiy fikr" },
  { level: 5, icon: "analytics-outline", colors: ["#DE7F72", "#B85B50"], description: "Mantiqiy izoh va qarashlar" },
  { level: 6, icon: "library-outline", colors: ["#5967B7", "#3E498D"], description: "Murakkab mavzu va ifodalar" },
];

export function ReadingListeningLevelScreen() {
  const router = useRouter();
  const { request, user } = useTelegramAuth();
  const [levels, setLevels] = useState<Array<{ level: number; total: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const premium = Boolean(user?.isSuper && (!user.superExpiresAt || new Date(user.superExpiresAt).getTime() > Date.now()));

  const load = useCallback(async () => {
    if (!premium) return;
    setLoading(true);
    setError(false);
    try { setLevels(await listReadingLevels(request)); }
    catch { setLevels([]); setError(true); }
    finally { setLoading(false); }
  }, [premium, request]);
  useEffect(() => { void load(); }, [load]);

  const totals = useMemo(() => new Map(levels.map((item) => [item.level, item.total])), [levels]);
  const availableCount = LEVELS.filter((item) => (totals.get(item.level) ?? 0) > 0).length;
  const close = () => window.history.length > 1 ? router.back() : router.replace("/practice");
  const open = (level: number) => {
    if ((totals.get(level) ?? 0) < 1) return;
    window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
    router.push(`/reading-listening?level=${level}`);
  };

  if (!premium) return <main className={styles.screen}><section className={styles.gate}><span><MobileIcon name="lock-closed" size={34} /></span><h1>Bu mashq KORIO Premium bilan ochiladi</h1><p>O‘qish va tinglash darslarining barcha darajalarini oching.</p><button onClick={() => router.replace("/premium")} type="button">KORIO Premium</button></section></main>;

  return (
    <main className={styles.screen}>
      <div className={styles.content}>
        <header className={styles.topBar}><button aria-label="Yopish" onClick={close} type="button"><MobileIcon name="close" size={24} /></button><span><MobileIcon name="headset-outline" size={16} /> Madaniy o‘qish · tinglash</span><i /></header>
        <section className={styles.hero}>
          <i className={styles.heroGlow} />
          <div className={styles.heroCopy}><span><MobileIcon name="book-outline" size={15} /> Madaniy o‘qish · tinglash</span><h1>Qaysi darajadan boshlaymiz?</h1><p>Darajangizga mos matnni o‘qing, tinglang va yangi so‘zlarni bosqichma-bosqich o‘rganing.</p><small>{loading ? <><b className={styles.miniSpinner} /> Darajalar tekshirilmoqda</> : <><i /> O‘rganish mumkin {availableCount} / {LEVELS.length}</>}</small></div>
          <span className={styles.heroImage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Kutubxonada kitob o‘qish" src="/reading-listening/library-reading-preview.webp" />
          </span>
        </section>

        {error ? <button className={styles.errorCard} onClick={() => void load()} type="button"><span><MobileIcon name="cloud-offline-outline" size={19} /></span><div><strong>Darajalar ma’lumotini yuklab bo‘lmadi.</strong><small>Qayta yuklash</small></div><MobileIcon name="refresh" size={19} /></button> : null}

        <section className={styles.grid}>
          {LEVELS.map((item, index) => {
            const total = totals.get(item.level) ?? 0;
            const available = total > 0;
            return <button className={`${styles.level} ${available ? "" : styles.locked}`} disabled={!available || loading} key={item.level} onClick={() => open(item.level)} style={{ "--delay": `${70 + index * 55}ms`, "--from": available ? item.colors[0] : "#F1F3EF", "--to": available ? item.colors[1] : "#E7EBE6" } as CSSProperties} type="button"><i className={styles.depth} style={{ background: available ? `${item.colors[1]}88` : "#D9DED8" }} /><span className={styles.card}><i className={styles.glow} /><span className={styles.cardTop}><i><MobileIcon name={available ? item.icon : "lock-closed-outline"} size={20} /></i><small>{String(item.level).padStart(2, "0")}</small></span><strong>{item.level}-daraja</strong><p>{item.description}</p><span className={styles.cardFoot}><b>{available ? `${total} ta matn` : "Tayyorlanmoqda"}</b>{available ? <i style={{ color: item.colors[1] }}><MobileIcon name="arrow-forward" size={16} /></i> : null}</span></span></button>;
          })}
        </section>
        <aside className={styles.footer}><MobileIcon name="sparkles-outline" size={16} /><span>Yangi daraja ma’lumotlari qo‘shilsa, bu yerda avtomatik ochiladi.</span></aside>
      </div>
    </main>
  );
}
