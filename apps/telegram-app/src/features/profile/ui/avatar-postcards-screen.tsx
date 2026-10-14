"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { GeneratedAvatar } from "../../league/ui/generated-avatar";
import { useAvatarStudy, type AvatarPostcard } from "../model/avatar-study";
import { uzt } from "../../../shared/i18n/uz-text";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { AvatarPet } from "../../../shared/ui/avatar-pet";
import { isScene, SCENE_LOOK, SceneBackdrop } from "../../../shared/ui/avatar-scene";
import styles from "./avatar-postcards-screen.module.css";

export function AvatarPostcardsScreen() {
  const router = useRouter();
  const { user } = useTelegramAuth();
  const { postcards } = useAvatarStudy();
  const mine = useMemo(() => postcards.filter((item) => item.userId === user?.id), [postcards, user?.id]);

  return (
    <main className={styles.screen}>
      <header className={styles.header}>
        <button
          aria-label="Orqaga"
          className={styles.back}
          onClick={() => { if (window.history.length > 1) router.back(); else router.replace("/avatar-editor"); }}
          type="button"
        >
          <MobileIcon name="arrow-back" size={22} />
        </button>
        <div>
          <h1 data-i18n="avatarPostcards.title">{uzt("avatarPostcards.title")}</h1>
          <small data-i18n="avatarPostcards.count">{uzt("avatarPostcards.count", { n: mine.length })}</small>
        </div>
      </header>
      <p className={styles.notice} data-i18n="avatarPostcards.localNotice">{uzt("avatarPostcards.localNotice")}</p>
      <section aria-label={uzt("avatarPostcards.title")} className={styles.list}>
        {mine.length === 0 ? (
          <div className={styles.empty}>
            <MobileIcon name="image-outline" size={42} />
            <h2 data-i18n="avatarPostcards.emptyTitle">{uzt("avatarPostcards.emptyTitle")}</h2>
            <p data-i18n="avatarPostcards.emptyBody">{uzt("avatarPostcards.emptyBody")}</p>
          </div>
        ) : mine.map((item) => <PostcardCard item={item} key={item.id} />)}
      </section>
    </main>
  );
}

function PostcardCard({ item }: { item: AvatarPostcard }) {
  if (!isScene(item.scene)) return null;
  const scene = SCENE_LOOK[item.scene];
  const titleKey = `avatarEditor.scene.items.${item.scene}.name`;
  return (
    <article className={styles.card}>
      <div className={styles.picture} style={{ background: `linear-gradient(180deg, ${scene.from}, ${scene.to})` }}>
        <SceneBackdrop scene={item.scene} />
        <div className={styles.avatar}>
          <GeneratedAvatar avatar={item.avatar} variant="full" />
          <AvatarPet pet={item.avatar.pet} streak={item.streak} />
        </div>
        <span className={styles.stamp} data-i18n={titleKey}>{uzt(titleKey)}</span>
      </div>
      <div className={styles.caption}>
        <div>
          <strong data-i18n={titleKey}>{uzt(titleKey)}</strong>
          {item.word ? (
            <p data-no-translate>{item.word}{item.meaning ? ` · ${item.meaning}` : ""}</p>
          ) : (
            <p data-i18n="avatarPostcards.memory">{uzt("avatarPostcards.memory")}</p>
          )}
        </div>
        <time dateTime={new Date(item.createdAt).toISOString()}>{new Date(item.createdAt).toLocaleDateString()}</time>
      </div>
    </article>
  );
}
