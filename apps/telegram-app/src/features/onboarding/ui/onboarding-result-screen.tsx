"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { fallbackPlacement, safePlacement } from "../model/onboarding";
import styles from "./onboarding.module.css";

function safeNumber(value: string | null, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function OnboardingResultScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const score = Math.min(100, Math.max(0, Math.round(safeNumber(params.get("score")))));
  const correct = Math.max(0, Math.round(safeNumber(params.get("correct"))));
  const total = Math.max(1, Math.round(safeNumber(params.get("total"), 1)));
  const self = params.get("self") ?? "basic_greetings";
  const placement = safePlacement(
    {
      placementLevel: safeNumber(params.get("placement"), Number.NaN),
      recommendedSection: safeNumber(params.get("section"), Number.NaN),
    },
    fallbackPlacement(self, score),
  );
  const section = placement.recommendedSection;
  const journey = section === 1 ? [1, 2, 3] : [section - 1, section, section + 1];

  return (
    <main className={styles.resultPage}>
      <div className={styles.resultGlow} />
      {/* 앱의 Sparkles — 결과가 "축하받는 순간" 처럼 보이게 */}
      <div aria-hidden="true" className={styles.resultSparkles}>
        <i style={{ background: "#F8C85A", height: 10, left: "10%", top: 24, width: 10 }} />
        <i style={{ background: "#FF8AAE", height: 8, left: "84%", top: 72, width: 8 }} />
        <i style={{ background: "#7F77DD", height: 7, left: "6%", top: 152, width: 7 }} />
        <i style={{ background: "#5CC8BE", height: 11, left: "90%", top: 188, width: 11 }} />
      </div>
      <div className={styles.resultScroll}>
        <div className={styles.resultEyebrow}><i><MobileIcon name="checkmark" size={13} /></i> DARAJA ANIQLANDI</div>
        <div className={styles.resultMascot}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src="/characters/hangulmon_celebrating.png" />
        </div>
        <h1>Siz uchun mos boshlanish nuqtasini topdik</h1>
        <p className={styles.resultSubtitle}>Biladiganlaringizni tez o&apos;tib, aynan kerakli koreys tilidan boshlaysiz.</p>

        <section className={styles.recommendationCard}>
          <div className={styles.recommendationHeader}>
            <span><MobileIcon name="navigate" size={15} /></span>
            <strong>Shaxsiy o&apos;quv yo&apos;li</strong>
            <small><MobileIcon name="sparkles" size={12} /> Siz uchun</small>
          </div>
          <div className={styles.sectionBadge}>
            <div><small>BO&apos;LIM</small><b>{section}</b></div>
            <span><MobileIcon name="flag" size={30} /></span>
          </div>
          <div className={styles.journey}>
            {journey.map((value, index) => (
              <div className={styles.journeyItem} key={`journey-${index}-${value}`}>
                {index > 0 ? <i className={value <= section ? styles.journeyDone : ""} /> : null}
                <span className={value === section ? styles.journeyCurrent : value < section ? styles.journeyPrevious : ""}>
                  {value < section ? <MobileIcon name="checkmark" size={14} /> : value}
                </span>
              </div>
            ))}
          </div>
          <h2>{`${section}-bo'limdan boshlash sizga mos`}</h2>
          <p>Test javoblaringiz asosida eng mos joy tanlandi. Oldingi mavzularni istalgan payt takrorlashingiz mumkin.</p>
          <div className={styles.readyRow}>
            <span><MobileIcon name="checkmark" size={15} /></span>
            <div><strong>{`${section}-bo'lim o'qishga tayyor`}</strong><small>{section > 1 ? "Oldingi bo'limlarning barchasi ham ochiq" : "Poydevorni birinchi bosqichdan mustahkamlaymiz"}</small></div>
          </div>
        </section>

        <div className={styles.resultStats}>
          <div><span className={styles.greenStat}><MobileIcon name="checkmark-done" size={17} /></span><strong>{correct} <small>/ {total}</small></strong><p>To&apos;g&apos;ri javob</p></div>
          <div><span><MobileIcon name="analytics" size={17} /></span><strong>{score}%</strong><p>Aniqlik</p></div>
        </div>
      </div>
      <footer className={styles.resultFooter}>
        <button onClick={() => router.replace("/home")} type="button">
          <span>{`${section}-bo'limdan boshlash`}</span>
          <i><MobileIcon name="arrow-forward" size={18} /></i>
        </button>
      </footer>
    </main>
  );
}
