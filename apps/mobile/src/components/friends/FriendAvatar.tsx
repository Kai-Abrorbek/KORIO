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
}

function FriendAvatar({ name, avatar, avatarUri, size = 56 }: Props) {
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
});
