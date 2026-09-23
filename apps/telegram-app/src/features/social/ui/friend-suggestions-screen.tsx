"use client";

import { useCallback, useEffect, useState } from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { getSuggestions } from "../api/social";
import type { SocialUser } from "../model/social";
import { ErrorState, LoadingState, ScreenHeader, SuggestionList } from "./social-parts";
import styles from "./social.module.css";

export function FriendSuggestionsScreen() {
  const { request } = useTelegramAuth();
  const [items, setItems] = useState<SocialUser[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const load = useCallback(() => {
    setStatus("loading");
    void getSuggestions(request).then((data) => { setItems(data ?? []); setStatus("ready"); }).catch(() => setStatus("error"));
  }, [request]);
  useEffect(load, [load]);
  return <main className={styles.screen}><ScreenHeader title="Do‘st takliflari" /><div className={styles.scroll}><section className={styles.suggestionsPage}>{status === "loading" ? <LoadingState /> : status === "error" ? <ErrorState onRetry={load} /> : <SuggestionList items={items} request={request} />}</section></div></main>;
}
