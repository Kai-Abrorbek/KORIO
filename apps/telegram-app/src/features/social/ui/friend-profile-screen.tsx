"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { AVATAR_BACKGROUNDS, GeneratedAvatar, getAvatarHeaderContentColor } from "../../league/ui/generated-avatar";
import { followUser, getMyWeekly, getUser, getUserWeekly, unfollowUser } from "../api/social";
import { languageFlag, type FriendProfile, type WeeklyDay } from "../model/social";
import { ErrorState, FriendAvatar, LoadingState, goBack, shareText } from "./social-parts";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import styles from "./social.module.css";

const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];
const LEAGUE_LABELS: Record<string, string> = { bronze: "Bronza", silver: "Kumush", gold: "Oltin", sapphire: "Safir", ruby: "Yoqut", emerald: "Zumrad", amethyst: "Ametist", pearl: "Marvarid", obsidian: "Obsidian", diamond: "Olmos" };
const LEAGUE_COLORS: Record<string, string> = { bronze: "#CD7F32", silver: "#9AA0A6", gold: "#F4B400", sapphire: "#3282CE", ruby: "#E54B4B", emerald: "#2BA47F", amethyst: "#8E63CE", pearl: "#D7C9E3", obsidian: "#34343F", diamond: "#45B7D1" };

interface Point { label: string; themXp: number; meXp: number }

function mergeWeek(them: WeeklyDay[], me: WeeklyDay[]): Point[] {
  const source = them.length ? them : Array.from({ length: 7 }, (_, index) => ({ date: new Date(Date.now() - (6 - index) * 86400000).toISOString(), xpEarned: 0 }));
  return source.map((day, index) => ({ label: DAY_LABELS[new Date(day.date).getDay()] ?? "", themXp: day.xpEarned ?? 0, meXp: me[index]?.xpEarned ?? 0 }));
}

export function FriendProfileScreen() {
  const router = useRouter();
  const id = useSearchParams().get("id");
  const { request } = useTelegramAuth();
  const [profile, setProfile] = useState<FriendProfile | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [following, setFollowing] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    if (!id) { setStatus("error"); return; }
    setStatus("loading");
    void Promise.all([getUser(request, id), getUserWeekly(request, id), getMyWeekly(request)])
      .then(([user, them, me]) => { setProfile(user); setFollowing(Boolean(user.isFollowing)); setPoints(mergeWeek(them.days ?? [], me.days ?? [])); setStatus("ready"); })
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
  const themXp = points.reduce((sum, point) => sum + point.themXp, 0);
  const meXp = points.reduce((sum, point) => sum + point.meXp, 0);
  return (
    <main className={styles.screen}><div className={styles.scroll}>
      <section className={styles.friendHero} style={heroStyle}>
        <header><button aria-label="Orqaga" onClick={() => goBack(router)} type="button"><MobileIcon name="arrow-back" size={26} /></button><h1>{profile.nickname}</h1><button aria-label="Ulashish" onClick={() => void shareText(profile.nickname, `KORIO’da ${profile.nickname} profilini ko‘ring\nhttps://korio.online/u/${profile.id}`)} type="button"><MobileIcon name="share-outline" size={26} /></button></header>
        {profile.isSuper ? <span className={styles.superBadge}>SUPER</span> : null}
        {profile.isOnline ? <span className={styles.onlineBadge}>● Onlayn</span> : null}
        <div className={styles.heroAvatar}><GeneratedAvatar avatar={profile.avatar} variant="full" /></div>
      </section>
      <p className={styles.profileMeta}>@{profile.username || profile.nickname} · {profile.joinedYear ?? new Date().getFullYear()}-yilda qo‘shildi</p>
      <section className={styles.profileStats}>
        <button onClick={() => router.push(`/user-courses?userId=${id}`)} type="button"><strong className={styles.profileCourseFlag}><span>{flag}</span>{(profile.courseExtraCount ?? 0) > 0 ? <em>+{profile.courseExtraCount}</em> : null}</strong><small>Kurslar</small></button>
        <button onClick={() => router.push(`/friends?tab=following&userId=${id}`)} type="button"><strong>{profile.followingCount ?? 0}</strong><small>Obunalar</small></button>
        <button onClick={() => router.push(`/friends?tab=followers&userId=${id}`)} type="button"><strong>{profile.followersCount ?? 0}</strong><small>Obunachilar</small></button>
      </section>
      <FollowedBy profile={profile} />
      {!profile.isMe ? <button className={`${styles.profileFollow} ${following ? styles.profileFollowing : profile.isFollowedBy ? styles.profileFollowBack : ""}`} disabled={busy} onClick={() => void toggleFollow()} type="button"><MobileIcon name="person-add" size={20} />{following ? "Obuna bo‘lingan" : profile.isFollowedBy ? "Javoban kuzatish" : "Obuna bo‘lish"}</button> : null}
      <WeeklyChart meXp={meXp} name={profile.nickname} points={points} themXp={themXp} />
      <section className={styles.learningStatus}><h2>O‘qish holati</h2><div>
        <ProfileStat color="#FF7A00" icon="flame" value={`${profile.streak ?? 0} kun`} />
        <ProfileStat emoji={flag} value={String(profile.languageLevel ?? 1)} />
        <ProfileStat color={LEAGUE_COLORS[profile.league ?? "bronze"] ?? "#CD7F32"} icon="trophy" value={LEAGUE_LABELS[profile.league ?? "bronze"] ?? "Bronza"} />
        <ProfileStat color="#FFCC00" icon="flash" value={`${profile.totalXP ?? 0} XP`} />
      </div></section>
      <section className={styles.reportBlock}><button onClick={() => window.alert("Shikoyat yuborish Telegram ilovasida tez orada ochiladi.")} type="button"><MobileIcon name="flag-outline" size={20} />Foydalanuvchini xabar qilish</button><button onClick={() => window.alert("Bloklash Telegram ilovasida tez orada ochiladi.")} type="button"><MobileIcon name="close-circle" size={20} />Bloklash</button></section>
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

function WeeklyChart({ points, name, themXp, meXp }: { points: Point[]; name: string; themXp: number; meXp: number }) {
  const max = Math.max(1, ...points.flatMap((point) => [point.themXp, point.meXp]));
  const coords = (key: "themXp" | "meXp") => points.map((point, index) => ({ x: points.length === 1 ? 150 : 10 + index * (280 / (points.length - 1)), y: 12 + (1 - point[key] / max) * 136 }));
  const path = (values: Array<{ x: number; y: number }>) => values.map((point, index) => `${index ? "L" : "M"}${point.x},${point.y}`).join(" ");
  const them = coords("themXp"); const me = coords("meXp");
  return <section className={styles.weekly}><h2>Haftalik o‘sish</h2><div className={styles.chart}><div><span>{max}</span><span>{Math.round(max * 2 / 3)}</span><span>{Math.round(max / 3)}</span><span>0</span></div><svg aria-label="Haftalik XP grafigi" preserveAspectRatio="none" role="img" viewBox="0 0 300 160"><g className={styles.gridLines}><line x1="0" x2="300" y1="12" y2="12"/><line x1="0" x2="300" y1="57" y2="57"/><line x1="0" x2="300" y1="103" y2="103"/><line x1="0" x2="300" y1="148" y2="148"/></g><path className={styles.meLine} d={path(me)} /><path className={styles.themLine} d={path(them)} />{me.map((point, index) => <circle className={styles.mePoint} cx={point.x} cy={point.y} key={`me-${index}`} r="4" />)}{them.map((point, index) => <circle className={styles.themPoint} cx={point.x} cy={point.y} key={`them-${index}`} r="6" />)}</svg></div><div className={styles.chartLabels}>{points.map((point, index) => <span key={index}>{point.label}</span>)}</div><div className={styles.legend}><p><i className={styles.themDot}/><b>{name}</b><strong>{themXp}XP</strong></p><p><i className={styles.meDot}/><b>Men</b><strong>{meXp}XP</strong></p></div></section>;
}
