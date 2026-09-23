"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { getSuggestions } from "../api/social";
import type { SocialUser } from "../model/social";
import { FollowPill, FriendAvatar, ScreenHeader, SocialAction } from "./social-parts";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import styles from "./social.module.css";

export function AddFriendsScreen() {
  const router = useRouter();
  const { request } = useTelegramAuth();
  const [suggestions, setSuggestions] = useState<SocialUser[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  useEffect(() => {
    let active = true;
    void getSuggestions(request).then((data) => { if (active) setSuggestions(data ?? []); }).catch(() => undefined);
    return () => { active = false; };
  }, [request]);
  const shown = suggestions.filter((item) => !dismissed.has(item.id));
  return (
    <main className={`${styles.screen} ${styles.addFriends}`}>
      <ScreenHeader title="" />
      <div className={styles.scroll}>
        <h1 className={styles.pageTitle}>Do‘st qidiring</h1>
        <section className={styles.actions}>
          <SocialAction color="#F4B400" icon="book" label="Kontaktlardan tanlash" onClick={() => router.push("/contacts-friends")} />
          <SocialAction color="#1CB0F6" icon="search" label="Ism bo‘yicha qidirish" onClick={() => router.push("/friend-search")} />
          <SocialAction color="#58CC02" icon="share-outline" label="Follow havolasini ulashish" onClick={() => router.push("/follow-link")} />
          <SocialAction color="#776EE2" icon="gift" label="Do‘st taklif qiling va gavhar oling" onClick={() => router.push("/invite")} />
        </section>
        <div className={styles.sectionHead}><h2>Do‘st takliflari</h2><button onClick={() => router.push("/friend-suggestions")} type="button">Hammasini ko‘rish</button></div>
        <div className={styles.suggestionCards}>
          {shown.length ? shown.map((item) => (
            <article className={styles.suggestionCard} key={item.id}>
              <button aria-label="Yashirish" className={styles.cardClose} onClick={() => setDismissed((current) => new Set(current).add(item.id))} type="button"><MobileIcon name="close" size={20} /></button>
              <button className={styles.cardProfile} onClick={() => router.push(`/friend-profile?id=${item.id}`)} type="button"><FriendAvatar avatar={item.avatar} imageUrl={item.profileImage} name={item.nickname} size={64} /><b>{item.nickname}</b><small>{item.reasonName ? `${item.reasonName} kuzatmoqda` : item.username ? `@${item.username.replace(/^@/, "")}` : "KORIO o‘rganuvchisi"}</small></button>
              <FollowPill isFollowedBy={item.isFollowedBy} isFollowing={item.isFollowing} request={request} userId={item.id} />
            </article>
          )) : <p className={styles.emptyText}>Yangi takliflar hozircha yo‘q</p>}
        </div>
      </div>
    </main>
  );
}
