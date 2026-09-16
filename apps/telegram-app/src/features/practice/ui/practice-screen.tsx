"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon, type MaterialCommunityIconName } from "../../../shared/ui/mobile-icon";
import styles from "./practice-screen.module.css";

interface MistakeQuestion {
  id: string;
  instruction?: Partial<Record<"ko" | "uz" | "en" | "ru", string>>;
  npcText?: string;
  answer?: string;
}

interface MistakesResponse {
  count: number;
  questions: MistakeQuestion[];
}

interface SkillItem {
  key: string;
  label: string;
  hint: string;
  icon: MaterialCommunityIconName;
  color: string;
  route?: string;
  action?: "mistakes";
  badge?: number;
}

const MIN_MISTAKES = 10;

function MistakesModal({ onClose, request }: {
  onClose: () => void;
  request: <T>(path: string, init?: RequestInit) => Promise<T>;
}) {
  const router = useRouter();
  const [data, setData] = useState<MistakesResponse>({ count: 0, questions: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    void request<MistakesResponse>("/lessons/mistakes")
      .then((response) => { if (active) setData(response); })
      .catch(() => { if (active) setData({ count: 0, questions: [] }); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [request]);

  const canStart = data.count >= MIN_MISTAKES;
  const xp = Math.min(40, data.count * 2);
  const start = () => {
    if (!canStart) return;
    onClose();
    router.push("/lesson?mode=review");
  };

  return (
    <section className={styles.mistakesModal}>
      <header><button aria-label="Orqaga" onClick={onClose} type="button"><MobileIcon name="arrow-back" size={28} /></button></header>
      <div className={styles.mistakesScroll}>
        <div className={styles.modalTitleRow}>
          <h1>{canStart ? "Xatolarni takrorlaymizmi?" : `Takrorlash uchun ${MIN_MISTAKES} ta xato kerak!`}</h1>
          <span><MobileIcon name="refresh" size={32} /></span>
        </div>
        <button className={styles.startReview} disabled={!canStart} onClick={start} type="button">Boshlash +{xp} XP</button>
        <hr />
        <h2>{data.count} ta xato</h2>
        {loading ? <div className={styles.spinner} /> : (
          <div className={styles.mistakeList}>
            {data.questions.map((question) => (
              <article key={question.id}>
                <p>{question.instruction?.uz || question.instruction?.en || ""}</p>
                <strong>{question.npcText || question.answer || ""}</strong>
              </article>
            ))}
            {data.count === 0 ? <p className={styles.empty}>Hali xato yo&apos;q</p> : null}
          </div>
        )}
      </div>
    </section>
  );
}

export function PracticeScreen() {
  const router = useRouter();
  const { request } = useTelegramAuth();
  const [counts, setCounts] = useState({ mistakes: 0, words: 0 });
  const [mistakesOpen, setMistakesOpen] = useState(false);

  useEffect(() => {
    let active = true;
    void Promise.allSettled([
      request<MistakesResponse>("/lessons/mistakes"),
      request<{ count: number }>("/lessons/learned-words"),
    ]).then(([mistakes, words]) => {
      if (!active) return;
      setCounts({
        mistakes: mistakes.status === "fulfilled" ? mistakes.value.count : 0,
        words: words.status === "fulfilled" ? words.value.count : 0,
      });
    });
    return () => { active = false; };
  }, [request]);

  const skills: SkillItem[] = [
    { key: "mistakes", label: "Xatolar", hint: "Faqat xato qilganlaringizni qayta", icon: "sync", color: "#FF9600", action: "mistakes", badge: counts.mistakes },
    { key: "words", label: "So'zlar", hint: "O‘rgangan so‘zlar kartochkada", icon: "cards", color: "#1CB0F6", route: "/word-study", badge: counts.words },
    { key: "speaking", label: "Gapirish", hint: "Mavzu tanlab, ovoz chiqarib", icon: "microphone", color: "#2FBFA0", route: "/speaking" },
    { key: "listening", label: "Tinglash", hint: "O‘qib va tinglab o‘rganish", icon: "headphones", color: "#FF6B6B", route: "/reading-listening-levels" },
    { key: "pronunciation", label: "Talaffuz", hint: "Batchim va jamo tovushlarini sayqallash", icon: "waveform", color: "#CE82FF", route: "/pronunciation-practice" },
    { key: "games", label: "O‘yinlar", hint: "O‘ynab so‘zlarni mustahkamlash", icon: "gamepad-variant", color: "#776EE2", route: "/games" },
  ];

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.replace("/home");
  };

  const openSkill = (skill: SkillItem) => {
    if (skill.action === "mistakes") setMistakesOpen(true);
    else if (skill.route) router.push(skill.route);
  };

  return (
    <main className={styles.page}>
      <div className={styles.scroll}>
        <section className={styles.hero}>
          <button aria-label="Yopish" className={styles.close} onClick={goBack} type="button"><MobileIcon name="close" size={27} /></button>
          <div className={styles.heroHeading}>
            <h1>Mashq qilish</h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Hangulmon" height={66} src="/characters/hangulmon_focused.png" width={66} />
          </div>
          <div className={styles.heroCard}>
            <strong>{counts.mistakes > 0 ? `${counts.mistakes} ta xato` : "Mukammal talaffuz"}</strong>
            <button onClick={() => counts.mistakes > 0 ? setMistakesOpen(true) : router.push("/pronunciation-practice")} type="button">Boshlash</button>
          </div>
        </section>

        <section className={styles.content}>
          <h2>Ko&apos;nikmalar</h2>
          {skills.map((skill) => (
            <button className={styles.skillRow} key={skill.key} onClick={() => openSkill(skill)} type="button">
              <span className={styles.skillText}>
                <span className={styles.skillTitle}>
                  <strong>{skill.label}</strong>
                  {skill.badge ? <b style={{ "--skill-color": skill.color } as CSSProperties}>{skill.badge > 99 ? "99+" : skill.badge}</b> : null}
                </span>
                <small>{skill.hint}</small>
              </span>
              <span className={styles.skillIcon} style={{ "--skill-color": skill.color } as CSSProperties}><MobileIcon family="material-community" name={skill.icon} size={28} /></span>
            </button>
          ))}

          <div className={styles.conversationHeading}><h2>Suhbat</h2><span>MAX</span></div>
          <button className={`${styles.skillRow} ${styles.dimmed}`} disabled type="button">
            <span className={styles.skillText}><span className={styles.skillTitle}><strong>Video qo&apos;ng&apos;iroq</strong></span></span>
            <span className={styles.skillIcon} style={{ "--skill-color": "#CE82FF" } as CSSProperties}><MobileIcon family="material-community" name="video" size={28} /></span>
          </button>
        </section>
      </div>
      {mistakesOpen ? <MistakesModal onClose={() => setMistakesOpen(false)} request={request} /> : null}
    </main>
  );
}
