"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { GeneratedAvatar, AVATAR_BACKGROUNDS, getAvatarHeaderContentColor } from "../../league/ui/generated-avatar";
import { getMe, logoutAll } from "../api/profile";
import { TIER_COLORS, TIER_LABELS, type UserMe } from "../model/profile";
import styles from "./profile-screen.module.css";

export function ProfileScreen() {
  const router = useRouter();
  const { request, updateUser, user } = useTelegramAuth();
  const [profile, setProfile] = useState<UserMe | null>(user as UserMe | null);

  useEffect(() => {
    let active = true;
    void getMe(request).then((me) => {
      if (!active) return;
      setProfile(me);
      updateUser(me);
    }).catch(() => undefined);
    return () => { active = false; };
  }, [request, updateUser]);

  if (!profile?.nickname) return null;

  const avatar = profile.avatar;
  const colors = AVATAR_BACKGROUNDS[avatar?.background ?? "background_lilac"];
  const contentColor = getAvatarHeaderContentColor(avatar);
  const friendStreaks = profile.friendStreaks ?? [];
  const placeholders = Math.max(0, 5 - friendStreaks.length);

  const logout = async () => {
    await logoutAll(request).catch(() => undefined);
    if (window.Telegram?.WebApp.close) window.Telegram.WebApp.close();
    else router.replace("/");
  };

  return (
    <main className={styles.screen}>
      <div className={styles.scroll}>
        <section className={styles.hero} style={{ "--hero-from": colors[0], "--hero-to": colors[1], "--hero-text": contentColor } as React.CSSProperties}>
          <header>
            <button aria-label="Orqaga" onClick={() => window.history.length > 1 ? router.back() : router.replace("/home")} type="button"><MobileIcon name="chevron-back" size={28} /></button>
            <h1>{profile.nickname}</h1>
            <div>
              <button aria-label="Ulashish" onClick={() => router.push("/follow-link")} type="button"><MobileIcon name="share-outline" size={26} /></button>
              <button aria-label="Sozlamalar" onClick={() => router.push("/settings")} type="button"><MobileIcon name="settings-outline" size={26} /></button>
            </div>
          </header>
          {profile.isSuper ? <span className={styles.superBadge}>SUPER</span> : null}
          <button aria-label="Avatarni tahrirlash" className={styles.avatarButton} onClick={() => router.push("/avatar-editor")} type="button">
            <GeneratedAvatar avatar={avatar} variant="full" />
          </button>
        </section>

        <p className={styles.meta}>@{profile.nickname} · {profile.joinedYear ?? new Date(profile.createdAt).getFullYear()}-yilda qo‘shildi</p>

        <section className={styles.statsRow}>
          <button onClick={() => router.push("/user-courses")} type="button"><span className={styles.flag}>{profile.coursePrimaryFlag || "🇰🇷"}</span>{profile.courseExtraCount > 0 ? <b className={styles.countBadge}>+{profile.courseExtraCount}</b> : null}<small>Kurslar</small></button>
          <button onClick={() => router.push("/friends?tab=following")} type="button"><strong>{profile.followingCount ?? 0}</strong><small>Obuna</small></button>
          <button onClick={() => router.push("/friends?tab=followers")} type="button"><strong>{profile.followersCount ?? 0}</strong><small>Obunachilar</small></button>
        </section>

        <button className={styles.outlineButton} onClick={() => router.push("/add-friends")} type="button"><MobileIcon name="person-add" size={20} />Do‘st qo‘shish</button>

        <section className={styles.learning}>
          <h2>O‘qish holati</h2>
          <div className={styles.learningGrid}>
            <Stat icon="flame" color="#FF7A00" value={`${profile.streak ?? 0} kun`} />
            <Stat emoji={profile.coursePrimaryFlag || "🇰🇷"} value={String(profile.languageLevel ?? 1)} />
            <Stat icon="trophy" color={TIER_COLORS[profile.league] ?? "#CD7F32"} value={TIER_LABELS[profile.league] ?? "Bronza"} />
            <Stat icon="flash" color="#FFCC00" value={`${profile.totalXP ?? 0} XP`} />
            <Stat icon="diamond" color="#45B7D1" value={`${profile.gems ?? 0} gavhar`} />
          </div>
        </section>

        <section className={styles.friendStreak}>
          <h2>Do‘st bilan ketma-ket o‘qish</h2>
          <div>
            {friendStreaks.map((friend) => <span className={styles.friendAvatar} key={friend.id}>{friend.name.charAt(0).toUpperCase()}</span>)}
            {Array.from({ length: placeholders }, (_, index) => <button aria-label="Do‘st qo‘shish" className={styles.placeholder} key={index} type="button"><MobileIcon name="add" size={24} /></button>)}
          </div>
        </section>

        <button className={`${styles.outlineButton} ${styles.logout}`} onClick={() => void logout()} type="button">Log Out</button>
      </div>
    </main>
  );
}

function Stat({ icon, color, emoji, value }: { icon?: "flame" | "trophy" | "flash" | "diamond"; color?: string; emoji?: string; value: string }) {
  return <div className={styles.stat}>{emoji ? <span>{emoji}</span> : icon ? <MobileIcon name={icon} size={26} style={{ color }} /> : null}<b>{value}</b></div>;
}
