"use client";

import { isTitle, TITLE_LOOK } from "../model/avatar-titles";
import { uzt } from "../i18n/uz-text";
import { MobileIcon } from "./mobile-icon";
import styles from "./name-title.module.css";

/**
 * 칭호 이름표 — 이름 밑에 붙는 작은 리본 알약. 모바일 NameTitle 과 같다.
 * 등급마다 색만 다르고 움직이지 않는다. 칭호가 없으면 아무것도 안 그린다.
 * - md: 프로필·친구 프로필·에디터 히어로
 * - sm: 리그 줄
 */
export function NameTitle({ title, size = "md", className }: { title?: string | null; size?: "md" | "sm"; className?: string }) {
  if (!isTitle(title)) return null;
  const look = TITLE_LOOK[title];
  return (
    <span className={`${styles.plate} ${size === "sm" ? styles.sm : ""} ${className ?? ""}`} data-rarity={look.rarity}>
      <MobileIcon name="ribbon" size={size === "sm" ? 10 : 13} />
      <span data-i18n={`avatarEditor.nameTitle.items.${title}`}>{uzt(`avatarEditor.nameTitle.items.${title}`)}</span>
    </span>
  );
}
