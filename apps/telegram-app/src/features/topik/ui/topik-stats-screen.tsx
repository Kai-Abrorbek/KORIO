"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import { getTopikHistory, getTopikStatsSummary, getTopikWeakQuestions } from "../api/topik";
import type { TopikHistoryItem, TopikQuestionPerformance, TopikStatsSummary, TopikTypePerformance } from "../model/topik";
import styles from "./topik-stats-screen.module.css";

type ExamType = "topik_i" | "topik_ii";
type StatsSection = "all" | "listening" | "reading" | "writing";

const SECTION: Record<StatsSection, { icon: IoniconName; label: string }> = {
  all: { icon: "apps-outline", label: "Barchasi" },
  listening: { icon: "headset-outline", label: "Tinglash" },
  reading: { icon: "book-outline", label: "O‘qish" },
  writing: { icon: "create-outline", label: "Yozish" },
};

const QUESTION_TYPES: Record<string, [string, string]> = {
  grammar_fill_blank: ["Grammatika bo‘shlig‘i", "문법 빈칸"], underlined_meaning: ["Tagi chizilgan ma’no", "밑줄 의미"], practical_text_topic: ["Amaliy matn mavzusi", "실용문 주제"], passage_content_match: ["Mazmun mosligi", "내용 일치"], sentence_ordering: ["Gaplar tartibi", "문장 순서"], passage_fill_blank: ["Matndagi bo‘shliq", "지문 빈칸"], passage_topic: ["Matn mavzusi", "글의 주제"], author_emotion: ["Muallif hissiyoti", "글쓴이 감정"], headline_interpretation: ["Sarlavha ma’nosi", "신문 제목"], sentence_insertion: ["Gapni joylashtirish", "문장 삽입"], author_attitude: ["Muallif munosabati", "글쓴이 태도"], author_purpose: ["Muallif maqsadi", "글쓴이 목적"], listening_visual_match: ["Rasm yoki grafik", "그림·그래프"], listening_response: ["Keyingi javob", "이어질 말"], listening_next_action: ["Keyingi harakat", "이어질 행동"], listening_content_match: ["Mazmun mosligi", "내용 일치"], listening_main_idea: ["Asosiy fikr", "중심 생각"], listening_speaker_action: ["So‘zlovchi harakati", "화자의 행동"], listening_intent: ["So‘zlash maqsadi", "말하는 의도"], listening_speaker_identity: ["So‘zlovchi kim", "화자 파악"], listening_attitude: ["So‘zlovchi munosabati", "화자의 태도"], listening_topic: ["Tinglash mavzusi", "듣기 주제"], listening_preceding_context: ["Oldingi mazmun", "앞선 내용"], writing_sentence_completion: ["Gapni tugatish", "문장 완성"], writing_data_description: ["Ma’lumotni tasvirlash", "자료 설명"], writing_argumentative_essay: ["Mavzuli insho", "주제 논술"],
};

const MODE = { guided: "Izohli o‘rganish", practice: "Mashq", mock_exam: "Sinov imtihoni" } as const;

export function TopikStatsScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { request, user } = useTelegramAuth();
  const premium = Boolean(user?.isSuper && (!user.superExpiresAt || new Date(user.superExpiresAt).getTime() > Date.now()));
  const [examType, setExamType] = useState<ExamType>(params.get("level") === "1" ? "topik_i" : "topik_ii");
  const initialSection = params.get("section");
  const [section, setSection] = useState<StatsSection>(initialSection === "listening" || initialSection === "reading" || initialSection === "writing" ? initialSection : "all");
  const [summary, setSummary] = useState<TopikStatsSummary | null>(null);
  const [weakQuestions, setWeakQuestions] = useState<TopikQuestionPerformance[]>([]);
  const [history, setHistory] = useState<TopikHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const activeSection = section === "all" ? undefined : section;

  const load = useCallback(async () => {
    if (!premium) { setLoading(false); return; }
    setLoading(true); setError(false);
    try {
      const [nextSummary, nextWeak, nextHistory] = await Promise.all([
        getTopikStatsSummary(request, examType, activeSection),
        getTopikWeakQuestions(request, examType, activeSection, 6),
        getTopikHistory(request, examType, activeSection, 6),
      ]);
      setSummary(nextSummary); setWeakQuestions(nextWeak); setHistory(nextHistory);
    } catch { setError(true); }
    finally { setLoading(false); }
  }, [activeSection, examType, premium, request]);
  useEffect(() => { void load(); }, [load]);

  const sortedTypes = useMemo(() => [...(summary?.questionTypes ?? [])].sort((a, b) => a.accuracy - b.accuracy || b.attempted - a.attempted), [summary]);
  const weakest = sortedTypes[0];
  const totalAttempts = summary ? summary.mockExamCount + summary.guidedCount + summary.practiceCount : 0;
  const independentRate = summary?.totalQuestions ? Math.round(summary.correctWithoutHintCount / summary.totalQuestions * 1000) / 10 : 0;
  const scoredHistory = useMemo(() => history.filter((item) => item.section !== "writing"), [history]);
  const trend = useMemo(() => [...scoredHistory].reverse(), [scoredHistory]);
  const insight = getInsight(summary, weakest, totalAttempts, section === "writing");
  const level = examType === "topik_i" ? "I" : "II";
  const sectionOptions: StatsSection[] = examType === "topik_i" ? ["all", "listening", "reading"] : ["all", "listening", "reading", "writing"];

  if (!premium) return <main className={styles.centered}><MobileIcon name="lock-closed" size={36} /><h1>TOPIK tayyorgarligi — Premium</h1><button onClick={() => router.replace("/premium")} type="button">Premiumni ko‘rish</button></main>;

  return <main className={styles.screen}>
    <section className={`${styles.headerShell} ${examType === "topik_i" ? styles.levelOne : styles.levelTwo}`}>
      <i className={styles.orbLarge} /><i className={styles.orbSmall} />
      <header><button aria-label="Orqaga" onClick={() => router.back()} type="button"><MobileIcon name="chevron-back" size={24} /></button><div><small>MENING TOPIK HISOBOTIM</small><h1>TOPIK o‘quv statistikasi</h1></div><button aria-label="Yangilash" onClick={() => void load()} type="button"><MobileIcon name="refresh" size={20} /></button></header>
      <div className={styles.levelTabs}>{(["topik_i", "topik_ii"] as const).map((type) => <button aria-pressed={type === examType} className={type === examType ? styles.activeLevel : ""} key={type} onClick={() => { setExamType(type); if (type === "topik_i" && section === "writing") setSection("all"); }} type="button">TOPIK {type === "topik_i" ? "I" : "II"}</button>)}</div>
      {!loading && !error && summary ? <div className={styles.hero}><div className={styles.heroMain}><div><small>Umumiy aniqlik</small><strong>{summary.accuracy}<i>%</i></strong></div><span className={styles[insight.tone]}><i />{insight.status}</span></div><div className={styles.scoreStrip}><HeroScore label="So‘nggi ball" value={summary.lastScore} /><i /><HeroScore label="Eng yuqori" value={summary.bestScore} /><i /><HeroScore label="O‘rtacha" value={summary.averageScore} /></div></div> : null}
    </section>

    {loading ? <section className={styles.centeredState}><i className={styles.spinner} /><p>O‘quv tarixingiz tahlil qilinmoqda…</p></section> : error || !summary ? <section className={styles.centeredState}><MobileIcon name="cloud-offline-outline" size={36} /><b>Statistikani yuklab bo‘lmadi.</b><button onClick={() => void load()} type="button">Qayta urinish</button></section> : <div className={styles.content}>
      <nav className={styles.sectionFilters}>{sectionOptions.map((option) => <button className={section === option ? styles.activeFilter : ""} key={option} onClick={() => setSection(option)} type="button"><MobileIcon name={SECTION[option].icon} size={15} />{SECTION[option].label}</button>)}</nav>
      <section className={`${styles.insight} ${styles[insight.tone]}`}><span><MobileIcon name={insight.icon} size={21} /></span><div><small>Bugungi o‘quv tavsiyasi</small><b>{insight.message}</b></div></section>
      <section className={styles.metricGrid}><Metric icon="checkmark-done-outline" label="Yakunlanganlar" tone="success" value={String(totalAttempts)} /><Metric icon="layers-outline" label="Yechilgan savollar" tone="primary" value={String(summary.totalQuestions)} /><Metric icon="time-outline" label="O‘qish vaqti" tone="warning" value={formatStudyTime(summary.totalStudySeconds)} /><Metric icon="flash-outline" label="Yordamsiz to‘g‘ri" tone="purple" value={`${independentRate}%`} /></section>
      <Heading caption="SO‘NGGI 6 TA" title="Ball dinamikasi" />
      <section className={styles.trendCard}>
        {trend.length ? (
          <>
            <header>
              <div><strong>{scoredHistory[0]?.score ?? 0}</strong><small>So‘nggi natija</small></div>
              <span><i />100 ballik tizim</span>
            </header>
            <div className={styles.chart}>
              {trend.map((item, index) => (
                <div key={item.attemptId}><b>{item.score}</b><span><i style={{ height: `${Math.max(6, Math.min(100, item.score))}%` }} /></span><small>{index + 1}</small></div>
              ))}
            </div>
          </>
        ) : (
          <Empty icon="analytics-outline" text={section === "writing" ? "Yozishda avtomatik ball o‘rniga yakunlangan ishlar va o‘qish vaqti ko‘rsatiladi." : "Testni yakunlaganingizdan so‘ng ballar dinamikasi shu yerda ko‘rinadi."} />
        )}
      </section>
      <Heading caption="PAST ANIQLIKDAN BOSHLAB" title="Savol turi bo‘yicha natija" />
      <section className={styles.card}>
        {sortedTypes.length ? (
          sortedTypes.map((type, index) => <TypeRow index={index} key={type.questionType} type={type} />)
        ) : (
          <Empty icon="grid-outline" text={section === "writing" ? "Tekshirilmagan yozma javoblar aniqlik yoki zaif savol turiga kiritilmaydi." : "Savol turi tahlilini boshlash uchun imtihonni yuboring."} />
        )}
      </section>
      <Heading caption="TAKRORIY XATOLAR" title="Ustuvor takrorlash" />
      <section className={styles.card}>{weakQuestions.length ? weakQuestions.map((item) => <div className={styles.weakRow} key={`${item.questionId}-${item.questionVersion}`}><span>{item.questionNumber}</span><div><b>{typeName(item.questionType)[0]}</b><small>{typeName(item.questionType)[1]}</small><p>{item.examRound ? `${item.examRound}-TOPIK` : `TOPIK ${level}`} · {SECTION[item.section].label}</p></div><aside><b>{item.accuracy}%</b><small>Ketma-ket {item.consecutiveWrong} xato</small></aside></div>) : <Empty icon="sparkles-outline" text="Hozircha zaif savollar aniqlanmadi." />}</section>
      <Heading caption="NATIJANI KO‘RISH UCHUN BOSING" title="So‘nggi yakunlanganlar" />
      <section className={styles.historyCard}>{history.length ? history.map((item) => <button key={item.attemptId} onClick={() => router.push(item.section === "writing" ? `/topik-writing?examCode=${encodeURIComponent(item.examCode)}&reviewAttemptId=${encodeURIComponent(item.attemptId)}` : `/topik-result?attemptId=${encodeURIComponent(item.attemptId)}`)} type="button"><span className={styles[item.section]}><MobileIcon name={SECTION[item.section].icon} size={19} /></span><div><b>{item.examRound ? `${item.examRound}-TOPIK` : `TOPIK ${level}`} · {SECTION[item.section].label}</b><small>{MODE[item.mode]} · {new Date(item.submittedAt).toLocaleDateString("uz", { month: "short", day: "numeric" })}</small></div>{item.section === "writing" ? <aside><MobileIcon name="checkmark-circle" size={20} /><small>Yakunlandi</small></aside> : <aside><b>{item.score}</b><small>{item.accuracy}%</small></aside>}<MobileIcon name="chevron-forward" size={17} /></button>) : <Empty icon="document-text-outline" text="Hali hech bir imtihon yuborilmagan." />}</section>
    </div>}
  </main>;
}

function typeName(type: string) { return QUESTION_TYPES[type] ?? [type, type]; }
function formatStudyTime(seconds: number) { const minutes = Math.round(seconds / 60); if (minutes < 60) return `${minutes} daq`; const hours = Math.floor(minutes / 60); const rest = minutes % 60; return rest ? `${hours} soat ${rest} daq` : `${hours} soat`; }
function HeroScore({ label, value }: { label: string; value: number }) { return <div><strong>{value}</strong><small>{label}</small></div>; }
function Heading({ caption, title }: { caption: string; title: string }) { return <header className={styles.heading}><h2>{title}</h2><span>{caption}</span></header>; }
function Empty({ icon, text }: { icon: IoniconName; text: string }) { return <div className={styles.empty}><span><MobileIcon name={icon} size={22} /></span><p>{text}</p></div>; }
function Metric({ icon, label, value, tone }: { icon: IoniconName; label: string; value: string; tone: "primary" | "purple" | "success" | "warning" }) { return <article className={styles.metric}><span className={styles[tone]}><MobileIcon name={icon} size={19} /></span><div><strong>{value}</strong><small>{label}</small></div></article>; }
function TypeRow({ type, index }: { type: TopikTypePerformance; index: number }) { const tone = type.accuracy >= 80 ? "success" : type.accuracy >= 60 ? "warning" : "danger"; const label = type.accuracy >= 80 ? "Kuchli" : type.accuracy >= 60 ? "O‘smoqda" : "E’tibor kerak"; return <article className={`${styles.typeRow} ${styles[tone]}`}><header><span>{String(index + 1).padStart(2, "0")}</span><div><b>{typeName(type.questionType)[0]}</b><small>{typeName(type.questionType)[1]}</small></div><em>{type.accuracy}%</em></header><div><i style={{ width: `${Math.min(100, type.accuracy)}%` }} /></div><footer><span>{type.correct}/{type.attempted} to‘g‘ri · o‘rtacha {Math.round(type.averageDurationMs / 1000)} son</span><b>{label}</b></footer></article>; }
function getInsight(summary: TopikStatsSummary | null, weakest: TopikTypePerformance | undefined, attempts: number, writing: boolean): { icon: IoniconName; message: string; status: string; tone: "danger" | "primary" | "purple" | "success" | "warning" } {
  if (writing) return { icon: "create-outline", status: "Yozuv qaydi", tone: "purple", message: attempts ? "Yozish yakunlari va o‘qish vaqti saqlanmoqda. Tekshirilmagan javoblar ball va aniqlikka qo‘shilmaydi." : "Yozish testini yakunlang — bajarilgan ish va o‘qish vaqtini shu yerda ko‘rasiz." };
  if (!summary?.totalQuestions) return { icon: "flag-outline", status: "Tahlilga tayyor", tone: "primary", message: attempts ? "Tinglash yoki o‘qish testini yakunlang — aniqlik va zaif tomonlar tahlili boshlanadi." : "Bitta testni yakunlang — kuchli va ustuvor yo‘nalishlaringizni tahlil qilamiz." };
  const name = weakest ? typeName(weakest.questionType)[0] : "";
  if (summary.accuracy >= 80) return { icon: "trophy-outline", status: "Barqaror", tone: "success", message: weakest ? `Natija barqaror. ${name} turini mustahkamlash ballingizni yanada oshiradi.` : "Yuqori aniqlikni barqaror saqlayapsiz. Imtihon sur’atini davom ettiring." };
  if (summary.accuracy >= 60) return { icon: "trending-up-outline", status: "O‘smoqda", tone: "warning", message: weakest ? `Natijangiz o‘smoqda. Avval ${name} turini (${weakest.accuracy}%) takrorlang.` : "Asosiy ko‘nikmalar rivojlanmoqda. So‘nggi xatolarni yana ko‘rib chiqing." };
  return { icon: "compass-outline", status: "Takrorlash kerak", tone: "danger", message: weakest ? `Eng tez o‘sish uchun ${name} turidan (${weakest.accuracy}%) boshlang.` : "Savol turlarini bosqichma-bosqich takrorlash aniqlikni tez oshiradi." };
}
