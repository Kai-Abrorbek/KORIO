"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import { getTopikRecipes } from "../api/topik";
import { topikUzText, type TopikRecipeSummary } from "../model/topik";
import styles from "./topik-recipes-screen.module.css";

type Level = 3 | 4 | 5 | 6;
interface Chapter { key: string; level: Level; title: string; groupCodes: string[] }

const CHAPTERS: Chapter[] = [
  { key: "3-grammar", level: 3, title: "Grammatika va lug‘at", groupCodes: ["reading-01-02", "reading-03-04", "reading-05-08"] },
  { key: "3-situation", level: 3, title: "Vaziyat va mos javob", groupCodes: ["listening-01-02", "listening-04-08", "listening-09-12"] },
  { key: "3-detail", level: 3, title: "Mazmunning mosligi", groupCodes: ["listening-13", "listening-14", "listening-15", "listening-16", "reading-09-12", "reading-19-20"] },
  { key: "3-main", level: 3, title: "Asosiy fikr", groupCodes: ["listening-17-19", "listening-20"] },
  { key: "3-order", level: 3, title: "Ketma-ketlik", groupCodes: ["reading-13-15"] },
  { key: "3-blank", level: 3, title: "Bo‘sh joyni to‘ldirish", groupCodes: ["reading-16-18", "writing-51", "writing-52"] },
  { key: "3-graph", level: 3, title: "Grafiklar", groupCodes: ["listening-03", "writing-53"] },
  { key: "4-formal", level: 4, title: "Rasmiy suhbat", groupCodes: ["listening-21-22", "listening-25-26", "listening-29-30", "listening-23-24", "listening-27-28"] },
  { key: "4-main", level: 4, title: "Munozarali va izohli matn", groupCodes: ["reading-21-22"] },
  { key: "4-headline", level: 4, title: "Gazeta sarlavhalari", groupCodes: ["reading-25-27"] },
  { key: "4-personal", level: 4, title: "Shaxsiy matn", groupCodes: ["reading-23-24"] },
  { key: "4-info", level: 4, title: "Axborot yetkazish", groupCodes: ["reading-28-31"] },
  { key: "5-formal", level: 5, title: "Rasmiy nutq", groupCodes: ["listening-31-32", "listening-33-34", "listening-35-36", "listening-37-38", "listening-39-40"] },
  { key: "5-info", level: 5, title: "Axborot yetkazish", groupCodes: ["reading-32-34", "reading-35-38", "reading-39-41"] },
  { key: "6-fiction", level: 6, title: "Badiiy asar", groupCodes: ["reading-42-43"] },
  { key: "6-info", level: 6, title: "Axborot yetkazish", groupCodes: ["reading-44-45", "reading-46-47", "reading-48-50"] },
  { key: "6-formal", level: 6, title: "Rasmiy nutq", groupCodes: ["listening-41-42", "listening-45-46", "listening-49-50", "listening-47-48"] },
  { key: "6-documentary", level: 6, title: "Axborot va hujjatli dastur", groupCodes: ["listening-43-44"] },
  { key: "6-writing", level: 6, title: "Yozma ish", groupCodes: ["writing-54"] },
];

const SECTION_ICON: Record<string, IoniconName> = { reading: "book-outline", listening: "headset-outline", writing: "create-outline" };

export function TopikRecipesScreen() {
  const router = useRouter();
  const { request, user } = useTelegramAuth();
  const premium = Boolean(user?.isSuper && (!user.superExpiresAt || new Date(user.superExpiresAt).getTime() > Date.now()));
  const [items, setItems] = useState<TopikRecipeSummary[]>([]);
  const [level, setLevel] = useState<Level>(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    if (!premium) { setLoading(false); return; }
    setLoading(true); setError(false);
    try { const results = await Promise.all(["reading", "listening", "writing"].map((section) => getTopikRecipes(request, section))); setItems(results.flat()); }
    catch { setItems([]); setError(true); }
    finally { setLoading(false); }
  }, [premium, request]);
  useEffect(() => { void load(); }, [load]);

  const itemByCode = useMemo(() => new Map(items.map((item) => [item.groupCode, item])), [items]);
  const chapters = useMemo(() => CHAPTERS.filter((chapter) => chapter.level === level), [level]);
  const levelItems = useMemo(() => chapters.flatMap((chapter) => chapter.groupCodes.map((code) => itemByCode.get(code)).filter((item): item is TopikRecipeSummary => Boolean(item))), [chapters, itemByCode]);
  const readyCount = levelItems.filter((item) => item.ready).length;

  if (!premium) return <main className={styles.centered}><MobileIcon name="lock-closed" size={36} /><h1>TOPIK tayyorgarligi — Premium</h1><button onClick={() => router.replace("/premium")} type="button">Premiumni ko‘rish</button></main>;
  if (loading) return <main className={styles.centered}><i className={styles.spinner} /></main>;

  return <main className={styles.screen}>
    <header className={styles.header}><button aria-label="Orqaga" onClick={() => router.back()} type="button"><MobileIcon name="chevron-back" size={24} /></button><div><h1>Oltin retsept</h1><p>{readyCount}/{levelItems.length} tur tayyor</p></div></header>
    <nav className={styles.tabs}>{([3,4,5,6] as Level[]).map((item) => <button aria-pressed={item === level} className={item === level ? styles.activeTab : ""} key={item} onClick={() => setLevel(item)} type="button">{item}-daraja</button>)}</nav>
    <div className={styles.content}>{error ? <section className={styles.stateCard}><MobileIcon name="cloud-offline-outline" size={30} /><b>Imtihon variantlarini yuklab bo‘lmadi.</b><button onClick={() => void load()} type="button">Qayta urinish</button></section> : <><section className={styles.levelSummary}><span>{level}</span><div><small>TOPIK II</small><h2>{level}-daraja</h2><p>{readyCount}/{levelItems.length} tur tayyor</p></div></section>{chapters.map((chapter, chapterIndex) => { const chapterItems = chapter.groupCodes.map((code) => itemByCode.get(code)).filter((item): item is TopikRecipeSummary => Boolean(item)); if (!chapterItems.length) return null; return <section className={styles.chapter} key={chapter.key}><header><small>CHAPTER {String(chapterIndex + 1).padStart(2,"0")}</small><h2>{chapter.title}</h2></header><div>{chapterItems.map((item) => <button className={!item.ready ? styles.disabledCard : ""} disabled={!item.ready} key={item.groupCode} onClick={() => router.push(`/topik-recipe?groupCode=${encodeURIComponent(item.groupCode)}`)} type="button"><span><MobileIcon name={SECTION_ICON[item.section] ?? "document-text-outline"} size={16} /><b>{item.fromNumber}{item.toNumber !== item.fromNumber ? `~${item.toNumber}` : ""}</b></span><div><small>{topikUzText(item.label)}</small>{item.ready ? <><strong>{topikUzText(item.title)}</strong><p>{item.grammarCount} ta asosiy nuqta · {item.practiceCount} ta savol</p></> : <p>Tayyorlanmoqda</p>}</div><MobileIcon name={item.ready ? "chevron-forward" : "lock-closed"} size={item.ready ? 18 : 16} /></button>)}</div></section>; })}</>}</div>
  </main>;
}
