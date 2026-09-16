import type { CSSProperties } from "react";

import type { LeagueMember } from "../model/league";
import { GeneratedAvatar } from "./generated-avatar";
import styles from "./friend-avatar.module.css";

const PALETTE = [
  "#4FCB60", "#3AB8E0", "#776ee2", "#FF7AAD", "#F4B860",
  "#FF5C5C", "#1D9E75", "#A78BFA", "#5C9CE5", "#E89F4E",
];

function avatarColor(name: string) {
  let hash = 0;
  for (let index = 0; index < name.length; index += 1) {
    hash += name.charCodeAt(index);
  }
  return PALETTE[hash % PALETTE.length] ?? PALETTE[0]!;
}

export function FriendAvatar({ member, size = 52 }: { member: LeagueMember; size?: number }) {
  const avatar = !member.isBot ? member.avatar : undefined;
  return (
    <span
      className={styles.wrap}
      style={{ "--avatar-size": `${size}px` } as CSSProperties}
    >
      {avatar ? (
        <span className={styles.generated}><GeneratedAvatar avatar={avatar} /></span>
      ) : member.profileImage ? (
        // 서버 사용자의 프로필 주소는 호스트가 고정되지 않는다.
        // eslint-disable-next-line @next/next/no-img-element
        <img alt="" className={styles.image} src={member.profileImage} />
      ) : (
        <span className={styles.initial} style={{ backgroundColor: avatarColor(member.nickname) }}>
          {member.nickname.trim().charAt(0).toUpperCase()}
        </span>
      )}
      {member.online ? <i className={styles.online} /> : null}
    </span>
  );
}
