"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { uzt } from "../../../shared/i18n/uz-text";
import { SwipePager } from "../../../shared/ui/swipe-pager";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { getFollowers, getFollowing } from "../api/social";
import { languageFlag, type SocialUser } from "../model/social";
import { FollowPill, FriendAvatar, LoadingState, ScreenHeader } from "./social-parts";
import styles from "./social.module.css";

type Tab = "following" | "followers";
/** 탭 순서 = 옆으로 넘기는 순서 */
const TABS: Tab[] = ["following", "followers"];

export function FriendsScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { request } = useTelegramAuth();
  const mainRef = useRef<HTMLElement>(null);
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

  // 미는 만큼 탭 밑줄·글자색이 따라온다 (--tab-progress: 0 팔로잉 ~ 1 팔로워)
  const handleProgress = useCallback((progress: number, dragging: boolean) => {
    const main = mainRef.current;
    if (!main) return;
    main.style.setProperty("--tab-progress", String(progress));
    main.toggleAttribute("data-swiping", dragging);
  }, []);

  const renderList = (list: SocialUser[], key: Tab) => (
    <section className={styles.friendsCard} key={key}>
      {list.length ? list.map((friend, index) => (
        <article className={styles.friendRow} key={friend.id}>
          <button className={styles.userMain} onClick={() => router.push(`/friend-profile?id=${friend.id}`)} type="button">
            <FriendAvatar avatar={friend.avatar} imageUrl={friend.profileImage} name={friend.nickname} online={friend.isOnline} />
            <span><b>{friend.nickname}</b><small>{languageFlag(friend.targetLanguage)} · {friend.totalXP ?? 0} XP</small></span>
          </button>
          {!friend.isMe ? <FollowPill isFollowedBy={friend.isFollowedBy} isFollowing={friend.isFollowing} request={request} userId={friend.id} /> : null}
          {index < list.length - 1 ? <i className={styles.rowDivider} /> : null}
        </article>
      )) : <p className={styles.emptyText} data-i18n="friends.empty">{uzt("friends.empty")}</p>}
    </section>
  );

  return (
    // 로딩 중(페이저가 아직 없을 때)에도 밑줄이 지금 탭 자리에 있게 기본값을 둔다
    <main className={styles.screen} ref={mainRef} style={{ "--tab-progress": TABS.indexOf(tab) } as CSSProperties}>
      <ScreenHeader title="Do‘stlar" />
      <nav className={styles.tabs}>
        {TABS.map((item) => (
          <button className={tab === item ? styles.activeTab : ""} data-i18n={`friends.tabs.${item}`} key={item} onClick={() => setTab(item)} type="button">
            {uzt(`friends.tabs.${item}`)}
          </button>
        ))}
        <i />
      </nav>
      {loading ? <LoadingState /> : (
        <SwipePager
          index={TABS.indexOf(tab)}
          onIndexChange={(next) => setTab(TABS[next] ?? "following")}
          onProgress={handleProgress}
          pages={[renderList(following, "following"), renderList(followers, "followers")]}
          paneClassName={styles.friendsPane}
        />
      )}
    </main>
  );
}
