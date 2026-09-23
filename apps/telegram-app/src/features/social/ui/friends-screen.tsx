"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { getFollowers, getFollowing } from "../api/social";
import { languageFlag, type SocialUser } from "../model/social";
import { FollowPill, FriendAvatar, LoadingState, ScreenHeader } from "./social-parts";
import styles from "./social.module.css";

type Tab = "following" | "followers";

export function FriendsScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { request } = useTelegramAuth();
  const [tab, setTab] = useState<Tab>(params.get("tab") === "followers" ? "followers" : "following");
  const [following, setFollowing] = useState<SocialUser[]>([]);
  const [followers, setFollowers] = useState<SocialUser[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = params.get("userId") ?? undefined;

  useEffect(() => {
    let active = true;
    setLoading(true);
    void Promise.all([getFollowing(request, userId), getFollowers(request, userId)])
      .then(([nextFollowing, nextFollowers]) => {
        if (!active) return;
        setFollowing(nextFollowing ?? []);
        setFollowers(nextFollowers ?? []);
      })
      .catch(() => {
        if (!active) return;
        setFollowing([]); setFollowers([]);
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [request, userId]);

  const list = tab === "following" ? following : followers;
  return (
    <main className={styles.screen}>
      <ScreenHeader title="Do‘stlar" />
      <nav className={styles.tabs}>
        <button className={tab === "following" ? styles.activeTab : ""} onClick={() => setTab("following")} type="button">Obunalar</button>
        <button className={tab === "followers" ? styles.activeTab : ""} onClick={() => setTab("followers")} type="button">Obunachilar</button>
        <i className={tab === "followers" ? styles.tabRight : ""} />
      </nav>
      {loading ? <LoadingState /> : (
        <div className={styles.scroll}><section className={styles.friendsCard}>
          {list.length ? list.map((friend, index) => (
            <article className={styles.friendRow} key={friend.id}>
              <button className={styles.userMain} onClick={() => router.push(`/friend-profile?id=${friend.id}`)} type="button">
                <FriendAvatar avatar={friend.avatar} imageUrl={friend.profileImage} name={friend.nickname} online={friend.isOnline} />
                <span><b>{friend.nickname}</b><small>{languageFlag(friend.targetLanguage)} · {friend.totalXP ?? 0} XP</small></span>
              </button>
              {!friend.isMe ? <FollowPill isFollowedBy={friend.isFollowedBy} isFollowing={friend.isFollowing} request={request} userId={friend.id} /> : null}
              {index < list.length - 1 ? <i className={styles.rowDivider} /> : null}
            </article>
          )) : <p className={styles.emptyText}>Hozircha bu yerda hech kim yo‘q</p>}
        </section></div>
      )}
    </main>
  );
}
