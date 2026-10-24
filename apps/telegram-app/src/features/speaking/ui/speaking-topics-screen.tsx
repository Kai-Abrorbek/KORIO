"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { learnCourseOf } from "../../learning/model/learning-options";
import type { ExpressionProficiency } from "../../expressions/model/expressions";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { translateText } from "../../../shared/i18n/language-context";
import { uzt } from "../../../shared/i18n/uz-text";
import { getExpressionOverview } from "../api/speaking";
import type { ExpressionPackSummary } from "../model/speaking";
import { topicLookOf } from "../model/speaking";
import { TopicIllustration } from "./topic-illustration";
import styles from "./speaking-topics-screen.module.css";

type Phase = "error" | "loading" | "ready";
const PROFICIENCY_LEVELS: ExpressionProficiency[] = ["beginner", "intermediate", "advanced"];

export function SpeakingTopicsScreen() {
  const router = useRouter();
  const { request, user } = useTelegramAuth();
  const [phase, setPhase] = useState<Phase>("loading");
  const [packs, setPacks] = useState<ExpressionPackSummary[]>([]);
  const [query, setQuery] = useState("");
  const [revision, setRevision] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<ExpressionProficiency>("beginner");
  const isEnglish = learnCourseOf(user?.learnCourse) === "en";
  const premium = Boolean(user?.isSuper && (!user.superExpiresAt || new Date(user.superExpiresAt).getTime() > Date.now()));

  useEffect(() => {
    if (!premium) return;
    let active = true;
    setPhase("loading");
    void getExpressionOverview(request, isEnglish ? selectedLevel : undefined)
      .then((response) => {
        if (!active) return;
        setPacks(response.packs);
        setPhase("ready");
      })
      .catch(() => { if (active) setPhase("error"); });
    return () => { active = false; };
  }, [isEnglish, premium, request, revision, selectedLevel]);

  const topics = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return packs.filter((pack) => !normalized || `${pack.title} ${pack.description}`.toLocaleLowerCase().includes(normalized));
  }, [packs, query]);
  const featured = packs[0];
  const openTopic = (topic: ExpressionPackSummary) => {
    if (topic.count <= 0) return;
    window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
    const level = isEnglish ? `&proficiency=${selectedLevel}` : "";
    router.push(`/speaking-practice?pack=${encodeURIComponent(topic.code)}${level}`);
  };
  const back = () => window.history.length > 1 ? router.back() : router.replace("/practice");

  return (
    <main className={styles.page}>
      <header className={styles.topBar}>
        <button aria-label="Orqaga" className={styles.back} onClick={back} type="button"><MobileIcon name="arrow-back" size={21} /></button>
        <div className={styles.brand}><i /> <span>SPEAKING STUDIO</span></div>
        <span className={styles.back} />
      </header>

      <div className={styles.scroll}>
        <section className={styles.heading}>
          <div><h1>Bugun nima haqida<br /><em>gaplashamiz?</em></h1><p>Kundalik vaziyatlarda {isEnglish ? "inglizcha" : "koreyscha"} gapiring. O‘z ovozingiz bilan.</p></div>
          <span className={styles.micSeal}><MobileIcon name="mic" size={25} /><i><MobileIcon name="sparkles" size={13} /></i></span>
        </section>

        {isEnglish && premium ? (
          <div aria-label="Daraja" className={styles.levelTabs} role="tablist">
            {PROFICIENCY_LEVELS.map((level) => (
              <button
                aria-selected={selectedLevel === level}
                className={`${styles.levelTab} ${selectedLevel === level ? styles.levelTabSelected : ""}`}
                key={level}
                onClick={() => { setPhase("loading"); setSelectedLevel(level); }}
                role="tab"
                type="button"
              >
                {translateText(uzt(`voiceTutor.level.${level}`))}
              </button>
            ))}
          </div>
        ) : null}

        {!premium ? (
          <section className={styles.state}>
            <span><MobileIcon name="lock-closed" size={27} /></span>
            <h2>Bu mashq KORIO Premium bilan ochiladi</h2>
            <p>Barcha gapirish mavzulari va talaffuz tekshiruvini oching.</p>
            <button onClick={() => router.push("/premium")} type="button">Gapirishni boshlash</button>
          </section>
        ) : phase === "loading" ? <div className={styles.spinner} /> : phase === "error" ? (
          <section className={styles.state}>
            <span><MobileIcon name="cloud-offline-outline" size={28} /></span>
            <h2>Mavzularni yuklab bo‘lmadi. Qayta urinib ko‘ring.</h2>
            <button onClick={() => setRevision((value) => value + 1)} type="button">Qayta urinish</button>
          </section>
        ) : (
          <>
            {featured ? (
              <button className={styles.hero} disabled={featured.count <= 0} onClick={() => openTopic(featured)} type="button">
                <span className={styles.heroTop}><span><MobileIcon name="sparkles" size={13} /> BUGUNGI ILK SO‘ZLAR</span><MobileIcon className={styles.diagonal} name="arrow-forward" size={20} /></span>
                <span className={styles.heroBody}>
                  <span className={styles.heroCopy}><strong>{featured.title}</strong><small>{`${featured.count} ta ibora`}</small><span className={styles.heroAction}><MobileIcon name="mic-outline" size={16} /> Gapirishni boshlash <MobileIcon name="arrow-forward" size={16} /></span></span>
                  <span className={styles.heroArt}><i /><TopicIllustration code={featured.code} mark={isEnglish ? featured.title.charAt(0).toUpperCase() : undefined} size={112} /></span>
                </span>
              </button>
            ) : null}

            {packs.length ? (
              <>
                <label className={styles.search}><MobileIcon name="search-outline" size={19} /><input aria-label="Mashq uchun mavzu topish" onChange={(event) => setQuery(event.target.value)} placeholder="Mashq uchun mavzu topish" type="search" value={query} /></label>
                <div className={styles.sectionHeading}><h2>Kundalik suhbatlar</h2><span>{topics.length} ta mavzu</span></div>
                <section className={styles.grid}>
                  {topics.map((topic, index) => {
                    const look = topicLookOf(topic.code);
                    return (
                      <button className={styles.topic} disabled={topic.count <= 0} key={topic.code} onClick={() => openTopic(topic)} style={{ "--from": look.from, "--to": look.to } as CSSProperties} type="button">
                        <b className={styles.topicMark}>{isEnglish ? topic.title.charAt(0).toUpperCase() : look.mark}</b><span className={styles.topicIndex}>{String(index + 1).padStart(2, "0")}</span>
                        <span className={styles.topicFoot}><strong>{topic.title}</strong><span><small><MobileIcon name="mic" size={11} />{` ${topic.count} ta ibora`}</small><i><MobileIcon name="arrow-forward" size={15} /></i></span></span>
                      </button>
                    );
                  })}
                </section>
                {!topics.length ? <section className={styles.state}><span><MobileIcon name="chatbubbles-outline" size={28} /></span><h2>Hozircha mavzular yo‘q</h2><p>Boshqa so‘z bilan qidiring yoki birozdan keyin qayta tekshiring.</p></section> : null}
                {topics.length ? <aside className={styles.tip}><span><MobileIcon name="bulb-outline" size={21} /></span><div><strong>Mukammal bo‘lishi shart emas</strong><p>Avval tinglang, keyin bemalol takrorlang. Har bir jumla bilan ishonch ortadi.</p></div></aside> : null}
              </>
            ) : <section className={styles.state}><span><MobileIcon name="chatbubbles-outline" size={28} /></span><h2>Hozircha mavzular yo‘q</h2><p>Boshqa so‘z bilan qidiring yoki birozdan keyin qayta tekshiring.</p></section>}
          </>
        )}
      </div>
    </main>
  );
}
