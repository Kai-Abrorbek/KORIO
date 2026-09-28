"use client";

import { useEffect, useRef, useState } from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { getSuggestions, searchUsers } from "../api/social";
import type { SocialUser } from "../model/social";
import { ScreenHeader, SuggestionList } from "./social-parts";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import styles from "./social.module.css";

export function FriendSearchScreen({ contactsMode = false }: { contactsMode?: boolean }) {
  const { request } = useTelegramAuth();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SocialUser[]>([]);
  const [suggestions, setSuggestions] = useState<SocialUser[]>([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    let active = true;
    void getSuggestions(request).then((data) => { if (active) setSuggestions(data ?? []); }).catch(() => undefined);
    return () => { active = false; };
  }, [request]);
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (!query.trim()) { setResults([]); setLoading(false); return; }
    setLoading(true);
    timer.current = setTimeout(() => {
      void searchUsers(request, query.trim()).then(setResults).catch(() => setResults([])).finally(() => setLoading(false));
    }, 350);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [query, request]);
  return (
    <main className={styles.screen}>
      <ScreenHeader title={contactsMode ? "Kontaktlardagi KORIO foydalanuvchilari" : "Do‘st topish"} />
      {contactsMode ? <section className={styles.webContactsNotice}><i><MobileIcon name="lock-closed" size={22} /></i><div><b>Kontaktlaringiz qurilmada qoladi</b><p>Telegram mini ilovasi telefon kontaktlarini o‘qimaydi. Do‘stingizning ismi yoki KORIO ID sini xavfsiz qidiring.</p></div></section> : null}
      <label className={styles.searchBox}><MobileIcon name="search" size={22} /><input autoFocus={!contactsMode} onChange={(event) => setQuery(event.target.value)} placeholder="Ism yoki ID" value={query} />{query ? <button aria-label="Tozalash" onClick={() => setQuery("")} type="button"><MobileIcon name="close-circle" size={20} /></button> : null}</label>
      <div className={styles.scroll}><section className={styles.searchContent}>
        {/* 모바일처럼 스피너는 위에만 — 글자 칠 때마다 목록을 통째로 지웠다 그리면 깜빡인다 */}
        {loading ? <div className={styles.searchSpinner}><i className={styles.miniSpinner} /></div> : null}
        {query.trim() ? (loading && !results.length ? null : <SuggestionList dismissable={false} items={results} request={request} />) : <><h2>{contactsMode ? "Tavsiya qilingan foydalanuvchilar" : "Do‘st takliflari"}</h2><SuggestionList items={suggestions} request={request} /></>}
      </section></div>
    </main>
  );
}
