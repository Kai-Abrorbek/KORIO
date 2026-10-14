"use client";

import type { AvatarConfig } from "../../../shared/model/avatar";
import { useContentLanguage } from "../../../shared/i18n/language-context";
import { uzt } from "../../../shared/i18n/uz-text";
import { AvatarAura } from "../../../shared/ui/avatar-aura";
import { AvatarPet } from "../../../shared/ui/avatar-pet";
import { GeneratedAvatar } from "../../league/ui/generated-avatar";
import { todaysAvatarWord, useAvatarStudy } from "../model/avatar-study";
import styles from "./avatar-combo-stage.module.css";

export function hasNightGuardianCombo(avatar?: Partial<AvatarConfig> | null) {
  return avatar?.scene === "scene_gyeongbokgung" &&
    avatar?.aura === "aura_hangul" &&
    avatar?.pet === "pet_dokkaebi";
}

/** The same existing-item discovery and today's learned-word aura used by mobile. */
export function AvatarComboStage({
  avatar,
  streak,
  userId,
  onWordPress,
}: {
  avatar: AvatarConfig;
  streak?: number | null;
  userId?: string;
  onWordPress?: (word: string) => void;
}) {
  const language = useContentLanguage();
  const { recentWord } = useAvatarStudy();
  const learned = avatar.aura === "aura_hangul"
    ? todaysAvatarWord(recentWord, userId, language)
    : null;
  const active = hasNightGuardianCombo(avatar);

  return (
    <span className={`${styles.stage} ${active ? styles.active : ""}`}>
      {active ? <span aria-hidden="true" className={styles.portal}><i /><b>✦</b><b>✦</b><b>✦</b></span> : null}
      <span className={styles.arrival}>
        <AvatarAura aura={avatar.aura} hangulWord={learned?.word}>
          <GeneratedAvatar avatar={avatar} variant="full" />
        </AvatarAura>
        <AvatarPet pet={avatar.pet} streak={streak} />
      </span>
      {learned ? (
        onWordPress ? (
          <button
            aria-label={`${learned.word}, ${learned.meaning}`}
            className={styles.wordBadge}
            data-no-translate
            onClick={(event) => { event.stopPropagation(); onWordPress(learned.word); }}
            type="button"
          >
            <strong>{learned.word}</strong><span>{learned.meaning}</span><span aria-hidden="true">♪</span>
          </button>
        ) : (
          <span className={styles.wordBadge} data-no-translate>
            <strong>{learned.word}</strong><span>{learned.meaning}</span>
          </span>
        )
      ) : null}
      {active ? (
        <span aria-hidden="true" className={styles.caption} data-i18n="avatarEditor.secretCombo.nightGuardian">
          {uzt("avatarEditor.secretCombo.nightGuardian")}
        </span>
      ) : null}
    </span>
  );
}
