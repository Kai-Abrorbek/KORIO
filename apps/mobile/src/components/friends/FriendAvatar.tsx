import { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AvatarPreview from "@/components/avatar/AvatarPreview";
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
  if (!online) return body;
  return (
    <View style={{ width: size, height: size }}>
      {body}
      <OnlineDot size={size} />
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
        <AvatarPreview
          avatar={avatar}
          size={size * 1.1}
          variant="head"
          showBackground={false}
        />
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
