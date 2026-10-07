import type { AvatarConfig } from "../../../../shared/model/avatar";
import { GeneratedAvatar } from "../../../league/ui/generated-avatar";
import { AppIcon } from "./icon";
import styles from "./roadmap-map.module.css";

/** 현재 노드 옆에 서 있는 내 아바타 + 별 셋 (앱 CharacterMarker) */
export function CharacterMarker({
  avatar,
  offsetX,
}: {
  avatar?: Partial<AvatarConfig> | null;
  offsetX: number;
}) {
  return (
    <div className={styles.character} style={{ transform: `translateX(calc(-50% + ${offsetX}px))` }}>
      <span className={styles.characterAvatar}>
        <GeneratedAvatar avatar={avatar} variant="full" />
      </span>
      <span className={styles.characterStars}>
        <AppIcon name="star" size={14} />
        <AppIcon name="star" size={14} />
        <AppIcon name="star" size={14} />
      </span>
    </div>
  );
}
