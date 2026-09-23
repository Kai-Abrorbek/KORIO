"use client";

import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { FriendAvatar, LinkCode, goBack, shareText } from "./social-parts";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import styles from "./social.module.css";

export function FollowLinkScreen() {
  const router = useRouter();
  const { user } = useTelegramAuth();
  const url = `https://korio.online/u/${user?.id ?? ""}`;
  const text = `KORIO’da meni kuzating!\n${url}`;
  return (
    <main className={styles.followOverlay}>
      <section className={styles.followCard}>
        <div className={styles.followAvatar}><FriendAvatar avatar={user?.avatar} imageUrl={user?.profileImage} name={user?.nickname || "User"} size={140} /></div>
        <div className={styles.followInfo}><div><h1>{user?.nickname}</h1><p>@{user?.username || user?.nickname}</p><b>KORIO</b></div><LinkCode size={92} value={url} /></div>
      </section>
      <section className={styles.followSheet}>
        <header><button aria-label="Yopish" onClick={() => goBack(router)} type="button"><MobileIcon name="close" size={28} /></button><h2>KORIO’da meni kuzating!</h2><span /></header>
        <button className={styles.shareButton} onClick={() => void shareText("KORIO", text)} type="button"><MobileIcon name="share-outline" size={22} />Follow havolasini ulashish</button>
      </section>
    </main>
  );
}
