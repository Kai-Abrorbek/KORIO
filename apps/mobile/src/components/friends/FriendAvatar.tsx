import { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AvatarPreview from "@/components/avatar/AvatarPreview";
import { AuraRing, isAura } from "@/components/avatar/AvatarAura";
import { SceneBackdrop, isScene } from "@/components/avatar/AvatarScene";
import type { AvatarConfig } from "@/types/avatar";
import { getAvatarColor, getInitial } from "@/utils/avatar";

interface Props {
  name: string;
  avatar?: Partial<AvatarConfig> | null;
  avatarUri?: string;
  size?: number;
  /** 지금 앱에 접속 중이면 인스타처럼 초록 점 */
  online?: boolean;
}

/**
 * 아바타 오른쪽 아래 초록 점.
 *
 * 배경색과 같은 테두리를 둘러야 아바타 위에 얹혀 보인다. 테두리가 없으면
 * 점이 아바타에 파묻혀서 아무도 못 알아본다.
 */
function OnlineDot({ size }: { size: number }) {
  const d = Math.max(10, Math.round(size * 0.26));
  return (
    <View
      style={[
        styles.dot,
        {
          width: d,
          height: d,
          borderRadius: d / 2,
          borderWidth: Math.max(2, Math.round(d * 0.18)),
        },
      ]}
    />
  );
}

function FriendAvatar({
  name,
  avatar,
  avatarUri,
  size = 56,
  online = false,
}: Props) {
  const body = renderBody(name, avatar, avatarUri, size);
  // 오라를 산 사람은 목록·리그에서도 테두리 빛이 돈다
  const hasAura = isAura(avatar?.aura);
  if (!online && !hasAura) return body;
  return (
    <View style={{ width: size, height: size }}>
      {body}
      {hasAura && <AuraRing aura={avatar?.aura} size={size} />}
      {online && <OnlineDot size={size} />}
    </View>
  );
}

function renderBody(
  name: string,
  avatar: Partial<AvatarConfig> | null | undefined,
  avatarUri: string | undefined,
  size: number,
) {
  if (avatar) {
    // 배경 장면을 고른 사람은 얼굴 뒤로 그 그림이 보인다 — 얼굴을 조금 줄이고 내려서 하늘·불빛이 보이게
    const scene = isScene(avatar.scene) ? avatar.scene : null;
    return (
      <View
        style={[
          styles.avatar,
          styles.generatedAvatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
        {scene && <SceneBackdrop scene={scene} focusY="38%" />}
        <View style={scene ? { transform: [{ translateY: size * 0.08 }] } : null}>
          <AvatarPreview
            avatar={avatar}
            size={size * (scene ? 0.96 : 1.1)}
            variant="head"
            showBackground={false}
          />
        </View>
      </View>
    );
  }

  if (avatarUri) {
    return (
      <Image
        source={{ uri: avatarUri }}
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: getAvatarColor(name),
        },
      ]}
    >
      <Text
        style={[
          styles.initial,
          {
            fontSize: size * 0.42,
          },
        ]}
      >
        {getInitial(name)}
      </Text>
    </View>
  );
}

export default memo(FriendAvatar);

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    justifyContent: "center",
  },
  generatedAvatar: {
    overflow: "hidden",
    backgroundColor: "#EEEAFB",
  },
  initial: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  dot: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#22C55E",
    // 아바타가 어떤 색이든 점이 떠 보이게 하는 테두리.
    // 다크모드에서도 흰 테두리가 자연스러워서 테마를 안 탄다.
    borderColor: "#FFFFFF",
  },
});
