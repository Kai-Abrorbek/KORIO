"use client";

import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { create as createQrCode } from "qrcode";

import { GeneratedAvatar } from "../../league/ui/generated-avatar";
import { followUser, unfollowUser } from "../api/social";
import type { SocialUser } from "../model/social";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import type { AvatarConfig } from "../../../shared/model/avatar";
import styles from "./social.module.css";

type Request = <T>(path: string, init?: RequestInit) => Promise<T>;

export function goBack(router: ReturnType<typeof useRouter>, fallback = "/profile") {
  if (window.history.length > 1) router.back();
  else router.replace(fallback);
}

export async function shareText(title: string, text: string) {
  window.Telegram?.WebApp.HapticFeedback?.impactOccurred("medium");
  if (navigator.share) {
    await navigator.share({ title, text }).catch(() => undefined);
    return;
  }
  await navigator.clipboard?.writeText(text).catch(() => undefined);
}

export function ScreenHeader({ title, fallback = "/profile", right }: { title: string; fallback?: string; right?: ReactNode }) {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <button aria-label="Orqaga" onClick={() => goBack(router, fallback)} type="button"><MobileIcon name="arrow-back" size={28} /></button>
      <h1>{title}</h1>
      <div className={styles.headerRight}>{right}</div>
    </header>
  );
}

export function LoadingState() {
  return <div aria-label="Yuklanmoqda" className={styles.loading}><span /></div>;
}

export function ErrorState({ onRetry, text = "Ma’lumotni yuklab bo‘lmadi" }: { onRetry?: () => void; text?: string }) {
  return <div className={styles.errorState}><MobileIcon name="cloud-offline-outline" size={34} /><b>{text}</b>{onRetry ? <button onClick={onRetry} type="button">Qayta urinish</button> : null}</div>;
}

function initialColor(name: string) {
  const palette = ["#776EE2", "#45B7D1", "#58CC02", "#E26D8A", "#F4B400", "#7E57C2"];
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return palette[Math.abs(hash) % palette.length];
}

export function FriendAvatar({ name, avatar, imageUrl, size = 56, online = false }: { name: string; avatar?: Partial<AvatarConfig> | null; imageUrl?: string; size?: number; online?: boolean }) {
  const boxStyle = { "--avatar-size": `${size}px`, "--avatar-color": initialColor(name) } as CSSProperties;
  return (
    <span className={styles.avatar} style={boxStyle}>
      {avatar ? <GeneratedAvatar avatar={avatar} variant="head" /> : imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt={name} src={imageUrl} />
      ) : <b>{name.trim().charAt(0).toUpperCase() || "?"}</b>}
      {online ? <i className={styles.onlineDot} /> : null}
    </span>
  );
}

export function FollowPill({ request, userId, isFollowing, isFollowedBy, onChange }: { request: Request; userId: string; isFollowing?: boolean; isFollowedBy?: boolean; onChange?: (following: boolean) => void }) {
  const [following, setFollowing] = useState(Boolean(isFollowing));
  const [busy, setBusy] = useState(false);
  useEffect(() => setFollowing(Boolean(isFollowing)), [isFollowing]);
  const toggle = async () => {
    if (busy) return;
    const next = !following;
    setFollowing(next);
    setBusy(true);
    onChange?.(next);
    window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
    try {
      if (next) await followUser(request, userId);
      else await unfollowUser(request, userId);
    } catch {
      setFollowing(!next);
      onChange?.(!next);
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("error");
    } finally {
      setBusy(false);
    }
  };
  const label = following ? "Kuzatilmoqda" : isFollowedBy ? "Javoban kuzatish" : "Kuzatish";
  return <button className={`${styles.followPill} ${following ? styles.following : ""}`} disabled={busy} onClick={(event) => { event.stopPropagation(); void toggle(); }} type="button">{label}</button>;
}

export function SuggestionList({ items, request, dismissable = true, emptyText = "Foydalanuvchi topilmadi" }: { items: SocialUser[]; request: Request; dismissable?: boolean; emptyText?: string }) {
  const router = useRouter();
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const shown = items.filter((item) => !dismissed.has(item.id));
  if (!shown.length) return <p className={styles.emptyText}>{emptyText}</p>;
  return (
    <div className={styles.suggestionList}>
      {shown.map((item) => {
        const sub = item.reasonName ? `${item.reasonName} kuzatmoqda` : item.username ? `@${item.username.replace(/^@/, "")}` : "";
        return (
          <article className={styles.suggestionRow} key={item.id}>
            <button className={styles.userMain} onClick={() => router.push(`/friend-profile?id=${item.id}`)} type="button">
              <FriendAvatar avatar={item.avatar} imageUrl={item.profileImage} name={item.nickname} online={item.isOnline} />
              <span><b>{item.nickname}</b>{sub ? <small>{sub}</small> : null}</span>
            </button>
            {!item.isMe ? <FollowPill isFollowedBy={item.isFollowedBy} isFollowing={item.isFollowing} request={request} userId={item.id} /> : null}
            {dismissable ? <button aria-label="Yashirish" className={styles.dismiss} onClick={() => setDismissed((current) => new Set(current).add(item.id))} type="button"><MobileIcon name="close" size={24} /></button> : null}
          </article>
        );
      })}
    </div>
  );
}

export function SocialAction({ color, icon, label, onClick }: { color: string; icon: IoniconName; label: string; onClick: () => void }) {
  return <button className={styles.actionRow} onClick={onClick} type="button"><i style={{ backgroundColor: `${color}22`, color }}><MobileIcon name={icon} size={26} /></i><b>{label}</b></button>;
}

export function LinkCode({ value, size = 92 }: { value: string; size?: number }) {
  const qr = useMemo(() => {
    const modules = createQrCode(value, { errorCorrectionLevel: "M" }).modules;
    const commands: string[] = [];
    for (let y = 0; y < modules.size; y += 1) {
      let x = 0;
      while (x < modules.size) {
        if (!modules.data[y * modules.size + x]) {
          x += 1;
          continue;
        }
        const start = x;
        while (x < modules.size && modules.data[y * modules.size + x]) x += 1;
        commands.push(`M${start} ${y}h${x - start}v1H${start}z`);
      }
    }
    return { path: commands.join(""), size: modules.size };
  }, [value]);
  const quietZone = 4;
  const viewSize = qr.size + quietZone * 2;
  return (
    <span aria-label="Follow havolasi kodi" className={styles.linkCode} style={{ width: size, height: size }}>
      <svg role="img" shapeRendering="crispEdges" viewBox={`0 0 ${viewSize} ${viewSize}`}>
        <rect fill="#fff" height={viewSize} width={viewSize} />
        <path d={qr.path} fill="#111" transform={`translate(${quietZone} ${quietZone})`} />
      </svg>
    </span>
  );
}
