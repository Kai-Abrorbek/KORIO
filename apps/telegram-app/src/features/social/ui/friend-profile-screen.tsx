"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { AVATAR_BACKGROUNDS, GeneratedAvatar, getAvatarHeaderContentColor } from "../../league/ui/generated-avatar";
import { followUser, getUser, getVersusWeek, unfollowUser } from "../api/social";
import { languageFlag, type FriendProfile, type VersusWeek } from "../model/social";
import { ErrorState, FriendAvatar, LoadingState, goBack, shareText } from "./social-parts";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import styles from "./social.module.css";
import { QuestBadgesRow } from "../../retention/ui/home-retention";
import { alertDialog } from "../../../shared/telegram/dialogs";
import { WeeklyVersus } from "./weekly-versus";
import { AvatarAura } from "../../../shared/ui/avatar-aura";

const LEAGUE_LABELS: Record<string, string> = { bronze: "Bronza", silver: "Kumush", gold: "Oltin", sapphire: "Safir", ruby: "Yoqut", emerald: "Zumrad", amethyst: "Ametist", pearl: "Marvarid", obsidian: "Obsidian", diamond: "Olmos" };
const LEAGUE_COLORS: Record<string, string> = { bronze: "#CD7F32", silver: "#9AA0A6", gold: "#F4B400", sapphire: "#3282CE", ruby: "#E54B4B", emerald: "#2BA47F", amethyst: "#8E63CE", pearl: "#D7C9E3", obsidian: "#34343F", diamond: "#45B7D1" };

export function FriendProfileScreen() {
  const router = useRouter();
  const id = useSearchParams().get("id");
  const { request, user: me } = useTelegramAuth();
  const [profile, setProfile] = useState<FriendProfile | null>(null);
  // 이번 주 대결 — 못 불러와도 프로필은 보여 준다 (그 칸만 숨긴다)
  const [versus, setVersus] = useState<VersusWeek | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [following, setFollowing] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    if (!id) { setStatus("error"); return; }
    setStatus("loading");
    void Promise.all([getUser(request, id), getVersusWeek(request, id).catch(() => null)])
      .then(([user, week]) => { setProfile(user); setFollowing(Boolean(user.isFollowing)); setVersus(week?.days?.length === 7 ? week : null); setStatus("ready"); })
      .catch(() => setStatus("error"));
  }, [id, request]);
  useEffect(load, [load]);

  const toggleFollow = async () => {
    if (!id || busy) return;
    const next = !following;
    setFollowing(next); setBusy(true);
    window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
    try { if (next) await followUser(request, id); else await unfollowUser(request, id); }
    catch { setFollowing(!next); window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("error"); }
    finally { setBusy(false); }
  };

  if (status === "loading") return <main className={styles.screen}><LoadingState /></main>;
  if (status === "error" || !profile || !id) return <main className={styles.screen}><ErrorState onRetry={load} text="Foydalanuvchi profilini yuklab bo‘lmadi" /></main>;
  const avatarBackground = AVATAR_BACKGROUNDS[profile.avatar?.background ?? "background_lilac"];
  const heroStyle = { "--hero-from": avatarBackground[0], "--hero-to": avatarBackground[1], "--hero-text": getAvatarHeaderContentColor(profile.avatar) } as CSSProperties;
  const flag = profile.coursePrimaryFlag ?? languageFlag(profile.targetLanguage);
  return (
    <main className={styles.screen}><div className={styles.scroll}>
      <section className={styles.friendHero} style={heroStyle}>
        <header><button aria-label="Orqaga" onClick={() => goBack(router)} type="button"><MobileIcon name="arrow-back" size={26} /></button><h1>{profile.nickname}</h1><button aria-label="Ulashish" onClick={() => void shareText(profile.nickname, `KORIO’da ${profile.nickname} profilini ko‘ring\nhttps://korio.online/u/${profile.id}`)} type="button"><MobileIcon name="share-outline" size={26} /></button></header>
        {profile.isSuper ? <span className={styles.superBadge}>SUPER</span> : null}
        {profile.isOnline ? <span className={styles.onlineBadge}>● Onlayn</span> : null}
        <div className={styles.heroAvatar}><AvatarAura aura={profile.avatar?.aura}><GeneratedAvatar avatar={profile.avatar} variant="full" /></AvatarAura></div>
      </section>
      <p className={styles.profileMeta}>@{profile.username || profile.nickname} · {profile.joinedYear ?? new Date().getFullYear()}-yilda qo‘shildi</p>
      <section className={styles.profileStats}>
        <button onClick={() => router.push(`/user-courses?userId=${id}`)} type="button"><strong className={styles.profileCourseFlag}><span>{flag}</span>{(profile.courseExtraCount ?? 0) > 0 ? <em>+{profile.courseExtraCount}</em> : null}</strong><small>Kurslar</small></button>
        <button onClick={() => router.push(`/friends?tab=following&userId=${id}`)} type="button"><strong>{profile.followingCount ?? 0}</strong><small>Obunalar</small></button>
        <button onClick={() => router.push(`/friends?tab=followers&userId=${id}`)} type="button"><strong>{profile.followersCount ?? 0}</strong><small>Obunachilar</small></button>
      </section>
      <FollowedBy profile={profile} />
      {!profile.isMe ? <button className={`${styles.profileFollow} ${following ? styles.profileFollowing : profile.isFollowedBy ? styles.profileFollowBack : ""}`} disabled={busy} onClick={() => void toggleFollow()} type="button"><MobileIcon name="person-add" size={20} />{following ? "Obuna bo‘lingan" : profile.isFollowedBy ? "Javoban kuzatish" : "Obuna bo‘lish"}</button> : null}
      <QuestBadgesRow badges={profile.questBadges} />
      {versus ? <WeeklyVersus data={versus} meAvatar={me?.avatar} meImage={me?.profileImage} meName={me?.nickname ?? ""} name={profile.nickname} themAvatar={profile.avatar} themImage={profile.profileImage} /> : null}
      <section className={styles.learningStatus}><h2>O‘qish holati</h2><div>
        <ProfileStat color="#FF7A00" icon="flame" value={`${profile.streak ?? 0} kun`} />
        <ProfileStat emoji={flag} value={String(profile.languageLevel ?? 1)} />
        <ProfileStat color={LEAGUE_COLORS[profile.league ?? "bronze"] ?? "#CD7F32"} icon="trophy" value={LEAGUE_LABELS[profile.league ?? "bronze"] ?? "Bronza"} />
        <ProfileStat color="#FFCC00" icon="flash" value={`${profile.totalXP ?? 0} XP`} />
      </div></section>
      <section className={styles.reportBlock}><button onClick={() => void alertDialog("Shikoyat yuborish Telegram ilovasida tez orada ochiladi.")} type="button"><MobileIcon name="flag-outline" size={20} />Foydalanuvchini xabar qilish</button><button onClick={() => void alertDialog("Bloklash Telegram ilovasida tez orada ochiladi.")} type="button"><MobileIcon name="close-circle" size={20} />Bloklash</button></section>
    </div></main>
  );
}

function FollowedBy({ profile }: { profile: FriendProfile }) {
  const users = profile.followedBy ?? [];
  if (!users.length || !profile.followedByCount) return null;
  const label = profile.followedByCount === 1 ? `${users[0]?.nickname ?? ""} kuzatib boradi` : `${users[0]?.nickname ?? ""} va yana ${profile.followedByCount - 1} kishi kuzatib boradi`;
  return <div className={styles.followedBy}><span>{users.slice(0, 3).map((user) => <FriendAvatar imageUrl={user.profileImage} key={user.id} name={user.nickname} size={28} />)}</span><p>{label}</p></div>;
}

function ProfileStat({ color, emoji, icon, value }: { color?: string; emoji?: string; icon?: "flame" | "trophy" | "flash"; value: string }) {
  return <div>{emoji ? <span>{emoji}</span> : icon ? <MobileIcon name={icon} size={27} style={{ color }} /> : null}<b>{value}</b></div>;
}

