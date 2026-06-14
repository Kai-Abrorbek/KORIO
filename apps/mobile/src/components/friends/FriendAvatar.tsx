import { View, Text, Image, StyleSheet } from "react-native";
import { getAvatarColor, getInitial } from "@/utils/avatar";

interface Props {
  name: string;
  avatarUri?: string;
  size?: number;
}

export default function FriendAvatar({ name, avatarUri, size = 56 }: Props) {
  if (avatarUri) {
    return (
      <Image
        source={{ uri: avatarUri }}
        style={[
          styles.avatar,
          { width: size, height: size, borderRadius: size / 2 },
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
      <Text style={[styles.initial, { fontSize: size * 0.42 }]}>
        {getInitial(name)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    justifyContent: "center",
  },
  initial: {
    color: "#fff",
    fontWeight: "800",
  },
});
